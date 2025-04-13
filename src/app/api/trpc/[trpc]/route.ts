import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@/app/api/root";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
  });

export { handler as GET, handler as POST };
