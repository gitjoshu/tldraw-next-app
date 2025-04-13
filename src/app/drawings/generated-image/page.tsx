"use client";

import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";

export default function GeneratedImagePage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const generatedImage = localStorage.getItem("generatedImage");
    setImageUrl(generatedImage);
  }, []);

  if (!imageUrl) {
    return <h2 className="text-2xl font-bold">No generated image found</h2>;
  }

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Generated Image</h2>
      <Image
        src={imageUrl}
        alt="Generated Image"
        width={100}
        height={100}
        className="w-full h-full object-contain"
      />
    </>
  );
}
