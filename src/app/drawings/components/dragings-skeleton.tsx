import { Skeleton } from "@/components/ui/skeleton";

export const DrawingsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 9 }).map((_, index) => (
        <Skeleton key={index} className="h-[202px] w-[325px] rounded-xl" />
      ))}
    </div>
  );
};
