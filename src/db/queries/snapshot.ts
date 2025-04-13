import { snapshot } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { TLStoreSnapshot } from "tldraw";
import { TLSessionStateSnapshot } from "tldraw";

export const getSnapshotById = async (id: number) => {
  return await db.select().from(snapshot).where(eq(snapshot.id, id)).limit(1);
};

export const getAllSnapshots = async () => {
  return await db.select().from(snapshot).orderBy(desc(snapshot.updatedAt));
};

export const createSnapshot = async ({
  document,
  session,
}: {
  document: TLStoreSnapshot;
  session: TLSessionStateSnapshot;
}) => {
  const [createdSnapshot] = await db
    .insert(snapshot)
    .values({
      document,
      session,
    })
    .returning();

  return createdSnapshot;
};

export const updateSnapshot = async ({
  id,
  document,
  session,
}: {
  id: number;
  document: TLStoreSnapshot;
  session: TLSessionStateSnapshot;
}) => {
  await db
    .update(snapshot)
    .set({ document, session, updatedAt: new Date() })
    .where(eq(snapshot.id, id));
};

export const deleteSnapshot = async (id: number) => {
  await db.delete(snapshot).where(eq(snapshot.id, id));
};
