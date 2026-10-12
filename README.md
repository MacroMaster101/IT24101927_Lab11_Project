# CampusEats Lab 11

SE3090 DevOps and Cloud Hosting Platforms. Student number: **IT24101927**.

This single repository contains the React frontend and ASP.NET Core 8 API. Vercel deploys `campuseats-dashboard`; Render deploys `CampusEats.Api`; Neon hosts PostgreSQL. No second repository is needed.

```text
Browser -> Vercel frontend -> Render API -> Neon PostgreSQL
           VITE_API_URL       ConnectionStrings__Default
```

## Repository layout

| Path | Purpose |
| --- | --- |
| `campuseats-dashboard/` | React/Vite frontend and Vercel SPA configuration |
| `CampusEats.Api/` | .NET 8 API, EF migrations and Dockerfile |
| `.github/workflows/ci.yml` | Frontend lint/build and backend publish on pushes/PRs |
| `render.yaml` | Render blueprint for the API |
| `docs/DEPLOYMENT.md` | Exact deployment settings and verification steps |
| `docs/screenshots/` | Genuine screenshots captured during the lab |
| `scripts/Test-Deployment.ps1` | Live API, database readiness and CORS checks |

## Local checks

```powershell
cd campuseats-dashboard
npm ci
npm run lint
npm run build
npm run preview
```

The frontend clearly labels the bundled menu as demo data when `VITE_API_URL` is empty. Set the live API origin in the host, then rebuild to load PostgreSQL data. A configured API failure is shown as an error; it is not replaced with demo data.

```powershell
dotnet publish CampusEats.Api/CampusEats.Api.csproj -c Release
```

The API requires `ConnectionStrings__Default` and `Jwt__Key` at runtime. See the deployment guide for CORS and migrations. Keep secret values in host environment settings or local session variables. Never commit `.env`, a real database connection string, or a JWT key.

## Deployment and evidence

Follow [the deployment guide](docs/DEPLOYMENT.md). Actual URLs and completion status are recorded in `docs/lab-status.json`. The report must only claim deployments that have been verified. Environment screenshots must show names with values masked.
