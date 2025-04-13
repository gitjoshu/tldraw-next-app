CREATE TABLE "snapshot" (
	"id" integer PRIMARY KEY NOT NULL,
	"document" jsonb NOT NULL,
	"session" jsonb NOT NULL
);
