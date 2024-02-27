"use client";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { useRef, useState } from "react";

export const Blob = ({ image, shape }) => {
  const [rotation, setRotation] = useState(0.003);
  const mesh = useRef();
  function returnShape(shape) {
    if (shape === "horizontal") {
      return [5, 3, 0.2];
    } else if (shape === "horizontal-thin") {
      return [4, 1.5, 0.2];
    } else if (shape === "vertical-thin") {
      return [1.2, 3, 0.2];
    } else if (shape === "vertical") {
      return [2.1, 2.97, 0.2];
    } else if (shape === "square") {
      return [3, 3, 0.2];
    }
  }
  const imageTexture = new THREE.TextureLoader().load(image);
  const backOfCanvas = new THREE.TextureLoader().load(
    "/images/shop/backOfTheCanvas.webp"
  );
  useFrame(() => (mesh.current.rotation.y += rotation));
  return (
    <mesh ref={mesh} onClick={() => setRotation(0)}>
      <boxGeometry args={returnShape(shape)} />
      <meshBasicMaterial attach="material-0" color="gray" />
      <meshBasicMaterial attach="material-1" color="gray" />
      <meshBasicMaterial attach="material-2" color="gray" />
      <meshBasicMaterial attach="material-3" color="gray" />
      <meshStandardMaterial attach="material-4" map={imageTexture} />
      <meshStandardMaterial attach="material-5" map={backOfCanvas} />
    </mesh>
  );
};
