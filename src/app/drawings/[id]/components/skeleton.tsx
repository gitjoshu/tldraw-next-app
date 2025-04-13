import { Skeleton } from "@/components/ui/skeleton";

export const DrawingSkeleton = () => {
  return (
    <section className="flex flex-col gap-4 h-full">
      <Skeleton className="h-[32px] w-[1024px] rounded-xl" />
      <Skeleton className="h-[600px] w-[1024px] rounded-xl" />
    </section>
  );
};
