import DrawingEditor from "@/components/drawing-editor";
import { trpc } from "@/tprc/server";

export const Drawing = async ({ id }: { id: number }) => {
  const { id: _, ...snapshot } = await trpc.snapshot.getSnapshotById({
    id,
  });

  return (
    <section className="flex flex-col gap-4 h-full">
      <h2 className="text-2xl font-bold space-y-3">Drawing {id}</h2>
      <DrawingEditor snapshot={snapshot} />
    </section>
  );
};
