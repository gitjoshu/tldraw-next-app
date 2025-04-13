import { snapshotRouter } from "./routes/snapshot-trpc/snapshot";
import { router } from "./trpc";

export const appRouter = router({
  snapshot: snapshotRouter,
});

export type AppRouter = typeof appRouter;
