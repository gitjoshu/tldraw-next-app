import Link from "next/link";
import { Button } from "@/components/ui/button";
import { unstable_ViewTransition as ViewTransition } from "react";

export default async function Home() {
  return (
    <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
      <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
        <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
          Create and Share Your Drawings
        </h2>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Welcome to our collaborative drawing space. Start drawing or explore
          existing creations.
        </p>
        <div className="space-x-4">
          <Link href="/drawings">
            <Button size="lg">Explore</Button>
          </Link>
        </div>
        <ViewTransition name="title-transition">
          <h3 className="text-2xl font-bold">Available Drawings</h3>
        </ViewTransition>
      </div>
    </section>
  );
}
