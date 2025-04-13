import { useCallback, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { trpc } from "@/tprc/client";
import { getSnapshot, useEditor } from "tldraw";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { DialogDemo } from "./delete-draw";

export const TopPanel = ({ hasSnapshot }: { hasSnapshot: boolean }) => {
  const { id } = useParams();
  const router = useRouter();

  const editor = useEditor();

  const {
    mutateAsync: updateSnapshot,
    error: updateSnapshotError,
    isPending: isUpdatingSnapshot,
  } = trpc.snapshot.updateSnapshot.useMutation();
  const {
    mutateAsync: createSnapshot,
    error: createSnapshotError,
    isPending: isCreatingSnapshot,
  } = trpc.snapshot.createSnapshot.useMutation();
  const {
    mutateAsync: deleteSnapshot,
    error: deleteSnapshotError,
    isPending: isDeletingSnapshot,
  } = trpc.snapshot.deleteSnapshot.useMutation();

  const { mutateAsync: generateImageMutate, isPending: isGeneratingImage } =
    trpc.snapshot.generateImage.useMutation();

  const snapshotExists = hasSnapshot;

  const handleGenerateImage = useCallback(async () => {
    const shapeIds = editor.getCurrentPageShapeIds();
    if (shapeIds.size === 0) return toast.error("No shapes on the canvas");

    const promise = async () => {
      const { blob } = await editor.toImage([...shapeIds], {
        format: "png",
      });

      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });

      const response = await generateImageMutate({ image: base64 });

      if (!response?.image) {
        toast.error("No image generated in the response");
        return;
      }

      localStorage.setItem("generatedImage", response.image);

      router.push(`/drawings/generated-image`);
    };

    toast.promise(promise(), {
      loading: "Generating image...",
      success: "Image generated successfully!",
      error: (err: unknown) => {
        if (err instanceof Error) {
          return err.message;
        }
        return "Failed to generate image";
      },
    });
  }, [editor, generateImageMutate, router]);

  const handleSnapshot = useCallback(async () => {
    const { document, session } = getSnapshot(editor.store);
    if (snapshotExists) {
      await updateSnapshot({
        id: Number(id),
        document,
        session,
      });
      toast.success("Drawing saved successfully");
      return;
    }

    const { id: newSnapshotId } = await createSnapshot({
      document,
      session,
    });
    toast.success("Drawing created successfully");
    router.push(`/drawings/${newSnapshotId}`);
  }, [
    createSnapshot,
    editor.store,
    id,
    router,
    snapshotExists,
    updateSnapshot,
  ]);

  const handleDeleteSnapshot = useCallback(async () => {
    await deleteSnapshot({
      id: Number(id),
    });
    router.push("/drawings");
  }, [deleteSnapshot, id, router]);

  useEffect(() => {
    if (updateSnapshotError) {
      toast.error(updateSnapshotError.message);
    }
  }, [updateSnapshotError]);

  useEffect(() => {
    if (createSnapshotError) {
      toast.error(createSnapshotError.message);
    }
  }, [createSnapshotError]);

  useEffect(() => {
    if (deleteSnapshotError) {
      toast.error(deleteSnapshotError.message);
    }
  }, [deleteSnapshotError]);

  const isUpdating =
    isUpdatingSnapshot ||
    isCreatingSnapshot ||
    isDeletingSnapshot ||
    isGeneratingImage;

  return (
    <div className="pointer-events-auto flex gap-2 p-2">
      <Button
        onClick={() => {
          handleSnapshot();
        }}
        variant="outline"
        size="sm"
        disabled={isUpdating}
      >
        {snapshotExists ? "Save Drawing" : "Create Drawing"}
      </Button>
      <Button
        onClick={() => {
          handleGenerateImage();
        }}
        variant="outline"
        size="sm"
        disabled={isUpdating}
      >
        Generate Image
      </Button>
      {snapshotExists && <DialogDemo action={handleDeleteSnapshot} />}
    </div>
  );
};
