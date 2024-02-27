/* eslint-disable @next/next/no-img-element */
"use client";
import dynamic from "next/dynamic";
import React from "react";
const Blob = dynamic(() => import("./canvas/Shapes").then((mod) => mod.Blob), {
  ssr: false,
});
const View = dynamic(
  () => import("../components/canvas/View").then((mod) => mod.View),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[50vh] lg:h-screen w-full flex-col items-center justify-center bg-gradient-radial from-yellow-300 via-blue-300 to-blue-400">
        <div className="bg-white w-16 h-16 mx-auto rounded-md flex flex-col items-center justify-center">
          <img
            className="h-12 w-12"
            src="https://raw.githubusercontent.com/n3r4zzurr0/svg-spinners/abfa05c49acf005b8b1e0ef8eb25a67a7057eb20/svg-css/blocks-shuffle-2.svg"
            alt=""
          />
        </div>
        <h2 className="text-sm font-bold mt-3 text-zinc-800 drop-shadow-lg shadow-black">
          Wczytywanie płótna
        </h2>
      </div>
    ),
  }
);
const Common = dynamic(
  () => import("../components/canvas/View").then((mod) => mod.Common),
  { ssr: false }
);

export default function Canvas3D({ image, shape }) {
  return (
    <div className="w-full lg:w-1/2 z-[55] bg-white overflow-x-hidden mt-[25px] lg:mt-0">
      <View
        orbit
        className="!h-[50vh] lg:!h-[100vh] block lg:fixed  left-0   lg:top-[66px] w-full lg:w-1/2 bg-gradient-radial from-yellow-300 via-blue-300 to-blue-400
        "
      >
        <React.Suspense fallback={null}>
          <Blob image={image} shape={shape} />
        </React.Suspense>
        <Common />
      </View>
    </div>
  );
}
