"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const hasErrored = useRef(false);
  const router = useRouter();

  useEffect(() => {
    if (!hasErrored.current) {
      toast.error(error?.message || "An unexpected error occurred.");
      hasErrored.current = true;
    }
  }, [error]);

  return (
    <section className="flex flex-col items-center pt-20 text-center gap-3">
      <h2 className="text-2xl font-semibold">Oops! Something went wrong.</h2>
      <p className="text-lg">
        {error?.message || "An unexpected error occurred."}
      </p>
      <div className="flex justify-center gap-2">
        <Button onClick={() => reset()}>Try again</Button>
        <Button variant="outline" onClick={() => router.push("/")}>
          Go Home
        </Button>
      </div>
    </section>
  );
}
