import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export function DialogDemo({ action }: { action: () => Promise<void> }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Drawing</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to delete the drawing?
          </DialogTitle>
          <DialogDescription>
            If you delete the drawing, you won&apos;t be able to recover it.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4"></div>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={async () => {
              await action();
              toast.success("Drawing deleted successfully");
            }}
          >
            Delete drawing
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
