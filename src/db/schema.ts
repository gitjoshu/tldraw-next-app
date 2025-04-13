import { jsonb, pgTable, serial, timestamp } from "drizzle-orm/pg-core";
import { TLSessionStateSnapshot, TLStoreSnapshot } from "tldraw";

export const snapshot = pgTable("snapshot", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  document: jsonb("document").$type<TLStoreSnapshot>().notNull(),
  session: jsonb("session").$type<TLSessionStateSnapshot>().notNull(),
});
