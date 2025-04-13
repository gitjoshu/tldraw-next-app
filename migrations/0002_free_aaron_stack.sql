ALTER TABLE "snapshot" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "snapshot" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;