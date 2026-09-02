import { readdir, readFile, writeFile } from "node:fs/promises";
import { extname, resolve } from "node:path";
import { pathToFileURL } from "node:url";

export function stripClientRuntime(html) {
  const withoutScriptPreloads = html.replace(/<link\b[^>]*>/gi, (tag) => {
    const isScriptPreload = /\brel=["']preload["']/i.test(tag) && /\bas=["']script["']/i.test(tag);
    return isScriptPreload ? "" : tag;
  });

  return withoutScriptPreloads.replace(
    /<script\b([^>]*)>([\s\S]*?)<\/script>/gi,
    (tag, attributes, body) => {
      const isStructuredData = /\btype=["']application\/ld\+json["']/i.test(attributes);
      if (isStructuredData) return tag;

      const isNextAsset = /\bsrc=["']\/_next\//i.test(attributes);
      const isNextPayload = /self\.__next_[a-z]/i.test(body);
      return isNextAsset || isNextPayload ? "" : tag;
    },
  );
}

async function listHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const path = resolve(directory, entry.name);
      if (entry.isDirectory()) return listHtmlFiles(path);
      return extname(entry.name) === ".html" ? [path] : [];
    }),
  );
  return files.flat();
}

async function stripExportedPages(directory = "out") {
  const files = await listHtmlFiles(resolve(directory));
  await Promise.all(
    files.map(async (file) => {
      const html = await readFile(file, "utf8");
      await writeFile(file, stripClientRuntime(html));
    }),
  );
  console.log(`removed unused client runtime from ${files.length} static pages`);
}

const invokedDirectly = process.argv[1]
  ? pathToFileURL(resolve(process.argv[1])).href === import.meta.url
  : false;

if (invokedDirectly) await stripExportedPages();
