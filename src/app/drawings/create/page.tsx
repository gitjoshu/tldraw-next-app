import DrawingEditor from "@/components/drawing-editor";

export default function NewDrawingPage() {
  return (
    <div className="flex flex-col gap-4 h-full">
      <h2 className="text-2xl font-bold">New Drawing</h2>
      <DrawingEditor />
    </div>
  );
}
