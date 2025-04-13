import { z } from "zod";
import { TLStoreSnapshot, TLSessionStateSnapshot } from "tldraw";
import { publicProcedure } from "../../trpc";
import { router } from "../../trpc";
import { TRPCError } from "@trpc/server";

import {
  createSnapshot,
  getAllSnapshots,
  getSnapshotById,
  deleteSnapshot,
  updateSnapshot,
} from "@/db/queries/snapshot";
import { generateGoogleImage } from "@/lib/google";

const TLStoreSnapshotSchema = z.custom<TLStoreSnapshot>();

const TLSessionStateSnapshotSchema = z.custom<TLSessionStateSnapshot>();

export const snapshotRouter = router({
  getSnapshotById: publicProcedure
    .input(
      z.object({
        id: z
          .number({
            message: "Invalid snapshot ID.",
          })
          .refine((id) => id > 0, {
            message: "Snapshot ID must be greater than 0.",
          })
          .transform((id) => Number(id))
          .catch(({ error }) => {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: error.errors.map((err) => err.message).join(", "),
            });
          }),
      })
    )
    .query(async ({ input }) => {
      try {
        const result = await getSnapshotById(input.id);

        if (result.length === 0) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: `Snapshot with ID ${input.id} not found.`,
          });
        }

        return result[0];
      } catch (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            err instanceof Error
              ? err.message
              : "An unexpected error occurred, please try again later.",
          cause: err instanceof Error ? err : undefined,
        });
      }
    }),
  getAllSnapshots: publicProcedure.query(async () => {
    try {
      return await getAllSnapshots();
    } catch (err) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message:
          err instanceof Error
            ? err.message
            : "An unexpected error occurred, please try again later.",
      });
    }
  }),
  createSnapshot: publicProcedure
    .input(
      z.object({
        document: TLStoreSnapshotSchema,
        session: TLSessionStateSnapshotSchema,
      })
    )
    .mutation(async ({ input }) => {
      try {
        const { document, session } = input;
        const createdSnapshot = await createSnapshot({ document, session });
        return createdSnapshot;
      } catch (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            "An unexpected error occurred while creating a snapshot, please try again later.",
          cause: err instanceof Error ? err : undefined,
        });
      }
    }),
  updateSnapshot: publicProcedure
    .input(
      z.object({
        id: z.number(),
        document: TLStoreSnapshotSchema,
        session: TLSessionStateSnapshotSchema,
      })
    )
    .mutation(async ({ input }) => {
      try {
        const { id, document, session } = input;
        await updateSnapshot({ id, document, session });
      } catch (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            "An unexpected error occurred while updating a snapshot, please try again later.",
          cause: err instanceof Error ? err : undefined,
        });
      }
    }),
  deleteSnapshot: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      try {
        await deleteSnapshot(input.id);
      } catch (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            "An unexpected error occurred while deleting a snapshot, please try again later.",
          cause: err instanceof Error ? err : undefined,
        });
      }
    }),
  generateImage: publicProcedure
    .input(z.object({ image: z.string().startsWith("data:image/") }))
    .mutation(async ({ input }) => {
      try {
        const { image } = input;
        const { text, image: generatedImage } = await generateGoogleImage({
          image,
        });
        return { text, image: generatedImage };
      } catch (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            err instanceof Error
              ? `Error generating image: ${err.message}`
              : "An unexpected error occurred while generating an image.",
          cause: err instanceof Error ? err : undefined,
        });
      }
    }),
});
