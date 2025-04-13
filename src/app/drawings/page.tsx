import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import { unstable_ViewTransition as ViewTransition } from "react";
import { DrawingsSkeleton } from "@/app/drawings/components/dragings-skeleton";
import { Drawings } from "@/app/drawings/components/drawings";

export default async function DrawingsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <ViewTransition name="title-transition">
          <h3 className="text-2xl font-bold">Available Drawings</h3>
        </ViewTransition>
        <Link href="/drawings/create">
          <Button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="stroke-current mr-1"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
            New
          </Button>
        </Link>
      </div>
      <Suspense fallback={<DrawingsSkeleton />}>
        <Drawings />
      </Suspense>
    </div>
  );
}
