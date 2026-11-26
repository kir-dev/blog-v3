# Kir-Dev blog v3

The website and blog of [Kir-Dev](https://kir-dev.hu/), the web development student organization at BME VIK Schönherz Dormitory. Built with [Next.js 15](https://nextjs.org/) (App Router) and [PayloadCMS v3](https://payloadcms.com/) backed by PostgreSQL and S3/Garage media storage, deployed on Kir-Dev's Kubernetes cluster (`kir-dev/k8s`).

## Local development

### 1. Start PostgreSQL

```bash
docker compose up -d
```

### 2. Configure environment

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

`S3_*` variables are optional locally — when omitted, Payload stores uploaded media in `./media/`.

### 3. Install dependencies, run migrations, and start the dev server

```bash
corepack enable
yarn install
yarn migrate
yarn dev
```

- Website: [http://localhost:3000](http://localhost:3000)
- Payload Admin CMS: [http://localhost:3000/admin](http://localhost:3000/admin)

### Database migrations

Whenever Payload collection schemas change, create a migration and commit it:

```bash
yarn migrate:create
yarn types
```

In production, migrations run automatically on container startup via `prodMigrations`.

## Migrating data from Sanity

To import existing content and media from Sanity (idempotent; safe to re-run):

```bash
# Directly from Sanity API
SANITY_API_TOKEN=sk... yarn migrate:from-sanity

# Or from an exported NDJSON dump
yarn migrate:from-sanity --file /path/to/production.ndjson
```

## Deployment

Pushing to `main` builds and pushes `ghcr.io/kir-dev/blog-v3` via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) and triggers Renovate in [`kir-dev/k8s`](https://github.com/kir-dev/k8s) to update the `blog` deployment.

## Attributions

- Frontpage laptop illustration by [Fili Santillán](https://unsplash.com/@filisantillan) on Unsplash
