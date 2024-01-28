"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductImages({ product }: { product: any }) {
  const [currentOpen, setCurrentOpen] = useState(-1);
  return (
    <div className="grid grid-cols-3 lg:grid-cols-5 gap-2 mb-3">
      {currentOpen !== -1 && (
        <div
          onClick={() => setCurrentOpen(-1)}
          className="z-[500] fixed left-0 top-0 bg-black bg-opacity-50 flex items-center justify-center w-full h-full"
        >
          <div className="max-h-[80vh] w-[90%] overflow-y-scroll">
            <Image
              src={product.images[currentOpen]}
              width={1024}
              height={1024}
              alt=""
              className="w-full mx-auto"
            />
          </div>
        </div>
      )}
      {product.images.map((image: any, i: any) => (
        <div
          onClick={() => setCurrentOpen(i)}
          key={i}
          className="aspect-square cursor-pointer"
        >
          <Image
            src={image}
            width={244}
            height={244}
            alt="Obraz namalowany na płótnie"
            className="w-full h-full object-cover drop-shadow-lg shadow-black"
          />
        </div>
      ))}
    </div>
  );
}
