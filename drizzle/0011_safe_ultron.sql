ALTER TABLE "blog" ALTER COLUMN "title" SET DATA TYPE jsonb USING title::jsonb;
