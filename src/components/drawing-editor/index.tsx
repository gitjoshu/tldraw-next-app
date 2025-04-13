"use client";

import { trpc } from "@/tprc/client";
import { TLEditorSnapshot, TLStoreSnapshot, Tldraw } from "tldraw";
import "tldraw/tldraw.css";
import { TopPanel } from "./top-panel";
import { useTheme } from "next-themes";

type Props = {
  snapshot?: TLStoreSnapshot | TLEditorSnapshot | undefined;
};

const DrawingEditor: React.FC<Props> = ({ snapshot }) => {
  const { theme } = useTheme();

  return (
    <div className="w-full h-full">
      <Tldraw
        key={theme}
        inferDarkMode={theme === "dark"}
        snapshot={snapshot}
        components={{
          TopPanel: () => <TopPanel hasSnapshot={Boolean(snapshot)} />,
        }}
      />
    </div>
  );
};

export default trpc.withTRPC(DrawingEditor) as React.FC<Props>;
