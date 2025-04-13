"use client";

import Image from "next/image";

export default function GeneratedImagePage() {
  const generatedImage = localStorage.getItem("generatedImage");

  if (!generatedImage) {
    return <h2 className="text-2xl font-bold">No generated image found</h2>;
  }

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Generated Image</h2>
      <Image
        src={generatedImage}
        alt="Generated Image"
        width={100}
        height={100}
        className="w-full h-full object-contain"
      />
    </>
  );
}
