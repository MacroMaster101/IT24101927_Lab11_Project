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
| `.github/workflows/ci.yml` | Frontend audit/lint/build and backend publish on pushes/PRs |
| `render.yaml` | Render blueprint for the API |

## Local checks

```powershell
cd campuseats-dashboard
npm ci
npm audit --audit-level=high
npm run lint
npm run build
npm run preview
```

The frontend clearly labels the bundled menu as demo data when `VITE_API_URL` is empty. Set the live API origin in the host, then rebuild to load PostgreSQL data. A configured API failure is shown as an error; it is not replaced with demo data.

```powershell
dotnet publish CampusEats.Api/CampusEats.Api.csproj -c Release
```

The API requires `ConnectionStrings__Default` and `Jwt__Key` at runtime. Set `Cors__AllowedOrigins__0` to the frontend HTTPS origin. For this lab, `Database__ApplyMigrations=true` and `Database__SeedMenu=true` apply EF Core migrations and seed the initial menu at startup. Keep secret values in host environment settings or local session variables. Never commit `.env`, a real database connection string, or a JWT key.

## Deployment and evidence

Vercel: root `campuseats-dashboard`, framework Vite, build `npm run build`, output `dist`. Set `VITE_API_URL` to the Render API origin and redeploy.

Render: root `CampusEats.Api`, runtime Docker, Dockerfile `./Dockerfile`, context `.`, health check `/health/ready`. Import `render.yaml` or configure the service manually. PostgreSQL is hosted on Neon with TLS certificate verification.

Set `Swagger__Enabled=true` for the lab's interactive API checks at `/swagger`. API write endpoints remain protected by JWT roles.

Frontend: https://campuseats-it24101927.vercel.app

API: https://campuseats-api-it24101927.onrender.com/api/menu

The Word report and screenshots are kept locally for submission and excluded from this repository.
