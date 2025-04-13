import { trpc } from "@/tprc/server";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { connection } from 'next/server'

export const Drawings = async () => {
  await connection();
  const snapshots = await trpc.snapshot.getAllSnapshots();

  return (
    <>
      {snapshots.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {snapshots.map((snapshot) => (
            <Card key={snapshot.id}>
              <CardHeader className="flex justify-between">
                <CardTitle>Drawing {snapshot.id}</CardTitle>
                <CardDescription>
                  updated:{" "}
                  {snapshot.updatedAt.toLocaleDateString("es-ES", {
                    day: "numeric",
                    month: "numeric",
                    year: "numeric",
                  })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Click below to view or edit this drawing.</p>
              </CardContent>
              <CardFooter>
                <Link href={`/drawings/${snapshot.id}`} className="w-full">
                  <Button className="w-full">Open Drawing</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
          <Card className="bg-destructive">
            <CardHeader className="flex justify-between">
              <CardTitle>Drawing To Force Error</CardTitle>
              <CardDescription>updated: </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Click below to view the error server page</p>
            </CardContent>
            <CardFooter>
              <Link href={`/drawings/999999`} className="w-full">
                <Button className="w-full">Open Drawing</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <p>No drawings found. Start creating!</p>
      )}
    </>
  );
};
