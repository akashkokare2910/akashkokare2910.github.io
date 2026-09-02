# Akash Kokare — portfolio

An evidence-first engineering portfolio built as a statically exported Next.js application. The signature Operating Map connects production AI, agent reliability, developer tooling, and product craft without repeating project copy across the page.

## Local development

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Verification

```bash
npm test
npm run typecheck
npm run copy-lint
npm run build
```

`npm run build` writes the GitHub Pages artifact to `out/`. Deployment runs only from `main` through `.github/workflows/deploy.yml`.
