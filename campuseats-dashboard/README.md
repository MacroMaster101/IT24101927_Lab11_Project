# CampusEats Frontend

React and Vite frontend for the CampusEats menu. The production site reads menu data from the API hosted on Render.

## Local checks

```powershell
npm ci
npm audit --audit-level=high
npm run lint
npm run build
```

The production build is written to `dist`. GitHub Actions runs the audit, lint and build checks on each push to `main` and on pull requests.

## Hosting

Vercel uses this folder as the project root, `npm run build` as the build command and `dist` as the output directory. Set `VITE_API_URL` to the backend HTTPS origin before building. This is public browser configuration; passwords and JWT signing secrets belong in the backend host environment.

When `VITE_API_URL` is empty, the bundled menu is labelled as demo data. When it is configured, API errors are shown instead of falling back to the demo menu. The route rewrite in `vercel.json` supports direct links to dish pages.

Live site: https://campuseats-it24101927.vercel.app
