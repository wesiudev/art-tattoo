"use client";

import { forwardRef, Suspense, useImperativeHandle, useRef } from "react";

import {
  OrbitControls,
  PerspectiveCamera,
  View as ViewImpl,
} from "@react-three/drei";
import { Three } from "../../helpers/components/Three";
import useWindowDimensions from "../../../../../../../utils/useWindowDimensions";

export const Common = ({ color }) => {
  const { width, height } = useWindowDimensions();
  function returnFov() {
    if (width <= 1366 && width >= 1024) {
      return 55;
    } else if (width > 1366) {
      return 45;
    } else if (width <= 1024) {
      return 40;
    } else if (width < 768) {
      return 55;
    }
  }
  return (
    <Suspense fallback={null}>
      {color && <color attach="background" args={[color]} />}
      <ambientLight intensity={1} />
      <pointLight position={[12, 12, 12]} intensity={2} />
      <pointLight position={[0, -2, -10]} color="gray" intensity={2} />
      <PerspectiveCamera makeDefault fov={returnFov()} position={[0, 0, 6]} />
    </Suspense>
  );
};

const View = forwardRef(({ children, orbit, ...props }, ref) => {
  const localRef = useRef(null);
  useImperativeHandle(ref, () => localRef.current);

  return (
    <>
      <div ref={localRef} {...props} />
      <Three>
        <ViewImpl track={localRef}>
          {children}
          {orbit && <OrbitControls />}
        </ViewImpl>
      </Three>
    </>
  );
});
View.displayName = "View";

export { View };
