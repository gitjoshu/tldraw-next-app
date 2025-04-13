import { Drawing } from "@/app/drawings/[id]/components/drawing";
import { DrawingSkeleton } from "@/app/drawings/[id]/components/skeleton";
import { Suspense } from "react";

export default async function DrawPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense fallback={<DrawingSkeleton />}>
      <Drawing id={Number(id)} />
    </Suspense>
  );
}
