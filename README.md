# kir-dev.hu

The website of [Kir-Dev](https://kir-dev.hu/), a web development group at the [Schönherz Dormitory](https://sch.bme.hu) of [BME](https://bme.hu) [VIK](https://vik.bme.hu). Built with [Next.js](https://nextjs.org/) and [PayloadCMS](https://payloadcms.com/).

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

## Deployment

Pushing to `main` builds and pushes `ghcr.io/kir-dev/kir-dev.hu` via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) and triggers Renovate in [`kir-dev/k8s`](https://github.com/kir-dev/k8s) to update the `kir-dev.hu` deployment.
