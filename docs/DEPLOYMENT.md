# Lab 11 deployment guide

## 1 Prepare and push one repository

Run frontend lint/build and backend Release publish. The GitHub Actions workflow repeats these checks remotely. Push the entire repository root; do not initialise Git inside either application folder.

## 2 Deploy the frontend on Vercel

1. Add New Project and import the combined GitHub repository.
2. Root Directory: `campuseats-dashboard`.
3. Framework: Vite. Install: `npm ci`. Build: `npm run build`. Output: `dist`.
4. Add `VITE_API_URL` in Production. During initial setup it can be empty; the site then explicitly displays demo mode.
5. Deploy and record the stable production HTTPS URL. Test `/` and direct navigation to `/dish/1`.
6. After the backend is ready, replace the variable with the API HTTPS origin and redeploy. Vite embeds this value at build time.

Capture the project dashboard, successful deployment/build logs, environment names with values hidden, and running site.

## 3 Create Neon PostgreSQL

1. Create a project named `campuseats-it24101927` using the available free plan and an appropriate nearby region.
2. Use the created database and role. Keep credentials private.
3. Construct an Npgsql connection string using the actual dashboard values:

```text
Host=<host>;Port=5432;Database=<database>;Username=<role>;Password=<secret>;SSL Mode=VerifyFull
```

`VerifyFull` encrypts the connection and verifies the server certificate/hostname. Do not paste the `postgresql://` URL directly into Npgsql configuration. Use the non-pooled endpoint for migration work if a pooled connection causes migration problems.

Capture the database dashboard and tables after migration without exposing connection credentials.

## 4 Deploy the API on Render

Create a Web Service from the same GitHub repository, or import `render.yaml` as a Blueprint. If using the form manually:

| Setting | Value |
| --- | --- |
| Branch | main |
| Root directory | CampusEats.Api |
| Runtime | Docker |
| Dockerfile | ./Dockerfile |
| Docker context | . |
| Health check | /health/ready |
| Service plan | Free if available in your account |

Set these variables, keeping secret values masked:

| Variable | Value or purpose |
| --- | --- |
| ASPNETCORE_ENVIRONMENT | Production |
| ConnectionStrings__Default | Private Npgsql connection string for Neon |
| Jwt__Key | Random production secret of at least 32 bytes |
| Jwt__Issuer | CampusEats |
| Jwt__Audience | CampusEatsUsers |
| Cors__AllowedOrigins__0 | Exact stable Vercel HTTPS origin, no trailing slash |
| Database__ApplyMigrations | true |
| Database__SeedMenu | true |

The API reads Render's `PORT` and binds `0.0.0.0`. The Docker image uses .NET 8 and a non-root user. Startup applies the existing EF Core migrations before seeding the sample menu. This single-instance lab uses startup migrations; larger deployments should use a separate migration job to avoid concurrent migrations. Read the log `Database migrations applied successfully.` and confirm the tables exist. Alternatively apply migrations locally with `dotnet ef database update` using an environment connection string.

After a successful deploy, test `/health`, `/health/ready` and `/api/menu`. Swagger remains development-only; use the public menu endpoint for cloud evidence. Capture the dashboard, green status, masked environment settings, runtime logs, and API response.

## 5 Connect and verify all tiers

Update Vercel's `VITE_API_URL` to the Render service origin and redeploy. Verify the demo message disappears, database-backed menu items appear, and search and dish details work. A menu screenshot alone does not prove the database connection: also capture readiness, `/api/menu`, the browser request evidence and Neon tables.

```powershell
./scripts/Test-Deployment.ps1 -FrontendUrl 'https://<site>.vercel.app' -ApiUrl 'https://<api>.onrender.com'
```

Check the latest deployment commit and build duration on both hosts. In Vercel, review build logs; in Render, review startup/request logs. Record an actual meaningful log line in the report. If a request fails, check the exact CORS origin, API URL, HTTPS, database credentials/SSL, migration status and free-service cold starts.

## Screenshot checklist

| File | Required evidence |
| --- | --- |
| 01-github-repository.png | Both projects in one repository |
| 02-ci-success.png | Successful automated checks |
| 03-vercel-dashboard.png | Frontend project and production URL |
| 04-vercel-build.png | Successful frontend build/deploy |
| 05-vercel-environment.png | VITE_API_URL name with value hidden |
| 06-live-menu.png | Connected live app, no demo label |
| 07-render-dashboard.png | API URL and deploy status |
| 08-render-environment.png | Variable names, values hidden |
| 09-api-response.png | Real /api/menu response |
| 10-neon-dashboard.png | Managed PostgreSQL project |
| 11-neon-tables.png | Migrated MenuItems, Users and EF history |
| 12-render-logs.png | Actual startup and request logs |
| 13-readiness.png | Database readiness response |
| 14-live-dish.png | Direct SPA route and dish details |

Only real captures are evidence. Missing screenshots remain pending; do not fabricate dashboards or success results.

## References

- Supplied SE3090 Lab Practical 11 sheet. Lecture 11 was not supplied; add the lecture reference after reviewing the class material.
- https://vercel.com/docs/monorepos
- https://render.com/docs/docker
- https://render.com/docs/web-services
- https://render.com/docs/health-checks
- https://www.npgsql.org/doc/security.html
