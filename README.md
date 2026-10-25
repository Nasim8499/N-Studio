# N Studio

AI agent workspace for visa, work-permit and overseas-job paperwork — a single-file PWA with a live in-app browser preview.

- Live app: https://nasim8499.github.io/N-Studio/
- Source: `index.html` (one file, no build step needed to run) + `app/` (manifest, service worker, icons)
- Editable source modules live in `work/v2/` in the private workspace; `index.html` is the built bundle.

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8080
```

## Deploy

Git push to `main`. GitHub Pages serves the root of the branch.
