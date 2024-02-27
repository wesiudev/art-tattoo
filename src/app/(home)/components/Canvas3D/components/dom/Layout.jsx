"use client";
import { useRef } from "react";
import dynamic from "next/dynamic";
const Scene = dynamic(() => import("../../components/canvas/Scene"), {
  ssr: false,
});

const Layout = ({ children }) => {
  const ref = useRef();

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        overflow: "auto",
        touchAction: "auto",
        left: "0px",
        top: "0px",
      }}
    >
      {children}
      <Scene
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
        }}
        eventSource={ref}
        eventPrefix="client"
      />
    </div>
  );
};

export { Layout };
