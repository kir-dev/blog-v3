import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "media_sanity_asset_id_idx";
  DROP INDEX "posts_sanity_id_idx";
  DROP INDEX "projects_sanity_id_idx";
  DROP INDEX "members_sanity_id_idx";
  DROP INDEX "courses_sanity_id_idx";
  ALTER TABLE "media" DROP COLUMN "sanity_asset_id";
  ALTER TABLE "posts" DROP COLUMN "sanity_id";
  ALTER TABLE "projects" DROP COLUMN "sanity_id";
  ALTER TABLE "members" DROP COLUMN "sanity_id";
  ALTER TABLE "courses" DROP COLUMN "sanity_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "media" ADD COLUMN "sanity_asset_id" varchar;
  ALTER TABLE "posts" ADD COLUMN "sanity_id" varchar;
  ALTER TABLE "projects" ADD COLUMN "sanity_id" varchar;
  ALTER TABLE "members" ADD COLUMN "sanity_id" varchar;
  ALTER TABLE "courses" ADD COLUMN "sanity_id" varchar;
  CREATE UNIQUE INDEX "media_sanity_asset_id_idx" ON "media" USING btree ("sanity_asset_id");
  CREATE UNIQUE INDEX "posts_sanity_id_idx" ON "posts" USING btree ("sanity_id");
  CREATE UNIQUE INDEX "projects_sanity_id_idx" ON "projects" USING btree ("sanity_id");
  CREATE UNIQUE INDEX "members_sanity_id_idx" ON "members" USING btree ("sanity_id");
  CREATE UNIQUE INDEX "courses_sanity_id_idx" ON "courses" USING btree ("sanity_id");`)
}
