# akashkokare.com

Personal site of Akash Kokare, AI engineer at Birla AI Labs. Static HTML, CSS and a little JavaScript; no framework and no build step beyond the Log.

- `index.html`, `styles.css`, `app.js`: the page.
- `notes/`: longer write-ups.
- `scripts/build-log.mjs`: rebuilds the Log from public activity (PRs, PyPI releases, notes) plus `log.manual.json`, and refreshes the Yug download count. Runs in `.github/workflows/deploy.yml` daily, on every push to `main`, and on demand.

Preview locally:

```bash
python3 -m http.server 8765
```
