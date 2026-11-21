// Builds the Log section from public activity plus log.manual.json, and stamps the
// "Updated" date. Runs in CI before each deploy (daily and on push); no dependencies.
//
//   node scripts/build-log.mjs            # fetch, render into index.html, write log.json
//   node scripts/build-log.mjs --offline  # skip network, re-render from log.json cache
//
// Sources: GitHub PRs you opened in other people's public repos (opened, merged),
// PyPI releases, and notes/*.html (<meta name="date">). If a source fails, the last
// good data in log.json is kept, so a GitHub outage never empties the Log.

import { readFile, writeFile, readdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const offline = process.argv.includes("--offline");
const config = JSON.parse(await readFile(join(root, "log.config.json"), "utf8"));
const manual = JSON.parse(await readFile(join(root, "log.manual.json"), "utf8")).entries;
const cachePath = join(root, "log.json");
const cache = await readFile(cachePath, "utf8").then(JSON.parse).catch(() => ({ sources: {} }));

const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const code = (s) => esc(s).replace(/`([^`]+)`/g, "<code>$1</code>");
const day = (iso) => iso.slice(0, 10);

async function getJson(url) {
  const headers = { "User-Agent": "portfolio-log", Accept: "application/vnd.github+json" };
  if (process.env.GITHUB_TOKEN && url.startsWith("https://api.github.com")) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
}

async function githubPrs() {
  const user = config.github_user;
  const q = encodeURIComponent(`author:${user} type:pr is:public created:>=${config.since}`);
  const data = await getJson(`https://api.github.com/search/issues?q=${q}&sort=created&order=desc&per_page=100`);
  const out = [];
  for (const pr of data.items) {
    const repo = pr.repository_url.split("/repos/")[1];
    const owner = repo.split("/")[0];
    if (owner.toLowerCase() === user.toLowerCase()) continue; // housekeeping in my own repos
    if (config.ignore_repo_patterns.some((p) => repo.toLowerCase().includes(p))) continue;
    const merged = pr.pull_request?.merged_at;
    if (pr.state === "closed" && !merged && !config.include_closed_unmerged_prs) continue;
    const stripped = pr.title.replace(/^\w+(\([^)]*\))?!?:\s*/, ""); // drop "fix(scope): "
    const title = stripped.charAt(0).toUpperCase() + stripped.slice(1);
    const link = `<a href="${esc(pr.html_url)}">${esc(repo)} #${pr.number}</a>`;
    out.push({ date: day(pr.created_at), kind: "Opened", html: `${link}: ${code(title)}`, source: "github" });
    if (merged) out.push({ date: day(merged), kind: "Merged", html: `${link}: ${code(title)}`, source: "github" });
  }
  return out;
}

async function pypiReleases() {
  const out = [];
  for (const [pkg, name] of Object.entries(config.pypi)) {
    const data = await getJson(`https://pypi.org/pypi/${pkg}/json`);
    for (const [version, files] of Object.entries(data.releases)) {
      if (!files.length || files.every((f) => f.yanked)) continue;
      const date = day(files[0].upload_time_iso_8601 || files[0].upload_time);
      if (date < config.since) continue;
      out.push({ date, kind: "Released", html: `<a href="https://pypi.org/project/${pkg}/${version}/">${esc(name)} ${esc(version)}</a> on PyPI.`, source: "pypi" });
    }
  }
  return out;
}

async function notes() {
  const dir = join(root, "notes");
  const out = [];
  for (const file of (await readdir(dir)).filter((f) => f.endsWith(".html"))) {
    const html = await readFile(join(dir, file), "utf8");
    const date = html.match(/<meta name="date" content="(\d{4}-\d{2}-\d{2})">/)?.[1];
    const title = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1].trim();
    if (date && title) out.push({ date, kind: "Wrote", html: `<a href="notes/${file}">${title}</a>`, source: "notes" });
  }
  return out;
}

const sources = { github: githubPrs, pypi: pypiReleases, notes };
const fresh = {};
for (const [name, fn] of Object.entries(sources)) {
  if (offline && name !== "notes") { fresh[name] = cache.sources[name] ?? []; continue; }
  try {
    fresh[name] = await fn();
  } catch (err) {
    console.warn(`log: ${name} failed (${err.message}); keeping last good data`);
    fresh[name] = cache.sources[name] ?? [];
  }
}

const all = [...manual.map((e) => ({ ...e, source: "manual" })), ...Object.values(fresh).flat()]
  .sort((a, b) => b.date.localeCompare(a.date));

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const label = (e) => {
  const [y, m, d] = e.date.split("-").map(Number);
  return e.precision === "month" ? `${months[m - 1]} ${y}` : `${d} ${months[m - 1]} ${y}`;
};
const li = (e) => `      <li><time datetime="${e.precision === "month" ? e.date.slice(0, 7) : e.date}">${label(e)}</time><span class="kind">${e.kind}</span><p>${e.html}</p></li>`;
const shown = all.slice(0, config.visible);
const rest = all.slice(config.visible);
const block = [
  `<ol class="log-list">`, ...shown.map(li), `    </ol>`,
  ...(rest.length ? [`    <details class="log-more">`, `      <summary>Earlier entries (${rest.length})</summary>`, `      <ol class="log-list">`, ...rest.map((e) => "  " + li(e)), `      </ol>`, `    </details>`] : []),
].join("\n");

const today = new Date();
const stamp = `${today.getUTCDate()} ${["January","February","March","April","May","June","July","August","September","October","November","December"][today.getUTCMonth()]} ${today.getUTCFullYear()}`;
const indexPath = join(root, "index.html");
let index = await readFile(indexPath, "utf8");
const swap = (html, name, body) => {
  const re = new RegExp(`(<!-- ${name}:start -->)[\\s\\S]*?(<!-- ${name}:end -->)`);
  if (!re.test(html)) throw new Error(`index.html is missing <!-- ${name}:start/end --> markers`);
  return html.replace(re, `$1\n    ${body}\n    $2`);
};
index = swap(index, "log", block);
// Hugging Face stats for the Yug card; on failure the last rendered numbers stay.
if (!offline && config.huggingface) {
  try {
    const m = await getJson(`https://huggingface.co/api/models/${config.huggingface}`);
    const n = (x) => Number(x).toLocaleString("en-US");
    index = index.replace(/(<!-- hf:stats:start -->)[\s\S]*?(<!-- hf:stats:end -->)/, `$1${n(m.downloads)} downloads · ${n(m.likes)} likes$2`);
  } catch (err) {
    console.warn(`log: huggingface failed (${err.message}); keeping last numbers`);
  }
}
index = index.replace(/(<!-- updated:start -->)[\s\S]*?(<!-- updated:end -->)/, `$1Updated <time datetime="${today.toISOString().slice(0, 10)}">${stamp}</time>$2`);
await writeFile(indexPath, index);
await writeFile(cachePath, JSON.stringify({ built: today.toISOString(), sources: fresh }, null, 2) + "\n");
console.log(`log: ${all.length} entries (${Object.entries(fresh).map(([k, v]) => `${k} ${v.length}`).join(", ")}, manual ${manual.length})`);
