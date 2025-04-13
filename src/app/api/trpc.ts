import { initTRPC } from "@trpc/server";
import { cache } from "react";

export const createTRPCContext = cache(async () => {});

const t = initTRPC.create();

export const router = t.router;
export const publicProcedure = t.procedure;
export const createCallerFactory = t.createCallerFactory;
export const mergeRouters = t.mergeRouters;
