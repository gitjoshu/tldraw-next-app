import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { cache } from "react";
import { createCallerFactory, createTRPCContext } from "@/app/api/trpc";
import { appRouter } from "@/app/api/root";
import { QueryClient } from "@tanstack/react-query";

const makeQueryClient = () => new QueryClient({});

const getQueryClient = cache(makeQueryClient);

const caller = createCallerFactory(appRouter)(createTRPCContext);

export const { trpc, HydrateClient } = createHydrationHelpers<typeof appRouter>(
  caller,
  getQueryClient
);
