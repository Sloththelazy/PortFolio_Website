"use client";

import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Float, Environment } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export function Shapes() {
  return (
    <div className="row-span-1 row-start-1 -mt-9 aspect-square  md:col-span-1 md:col-start-2 md:mt-0">
      <Canvas
        className="z-0"
        shadows
        gl={{ antialias: false }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 25], fov: 30, near: 1, far: 40 }}
      >
        <Suspense fallback={null}>
          <Geometries />
          <ContactShadows
            position={[0, -3.5, 0]}
            opacity={0.65}
            scale={40}
            blur={1}
            far={9}
          />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
}

function Geometries() {
  const geometries = [
    {
      position: [0, 0, 0],
      r: 0.3,
      geometry: new THREE.IcosahedronGeometry(3), // Gem
    },
    {
      position: [1, -0.75, 4],
      r: 0.4,
      geometry: new THREE.CapsuleGeometry(0.5, 1.6, 2, 16), // Pill
    },
    {
      position: [-1.4, 2, -4],
      r: 0.6,
      geometry: new THREE.DodecahedronGeometry(1.5), // Soccer ball
    },
    {
      position: [-0.8, -0.75, 5],
      r: 0.5,
      geometry: new THREE.TorusGeometry(0.6, 0.25, 16, 32), // Donut
    },
    {
      position: [1.6, 1.6, -4],
      r: 0.7,
      geometry: new THREE.OctahedronGeometry(1.5), // Diamond
    },
  ];

  const soundEffects = [
    new Audio("/sounds/hit2.ogg"),
    new Audio("/sounds/hit3.ogg"),
    new Audio("/sounds/hit4.ogg"),
  ];

  const materials = [
    new THREE.MeshNormalMaterial(),
    new THREE.MeshStandardMaterial({ color: 0xFFA500,roughness: 0.987 , metalness: 1 }), // Metallic Orange
    new THREE.MeshStandardMaterial({ color: 0x00BFFF,roughness: 0.789 , metalness: 1 }), // Metallic Cyan
    new THREE.MeshStandardMaterial({ color: 0x800080,roughness: 0.777 , metalness: 1 }), // Metallic Purple
    new THREE.MeshStandardMaterial({ color: 0xFFFF00,roughness: 0.888 , metalness: 1 }), // Metallic Yellow
    new THREE.MeshStandardMaterial({ color: 0xD3D3D3,roughness: 1 , metalness: 1 }), // Metallic Light Gray
    new THREE.MeshStandardMaterial({ color: 0xFFD700,roughness: 0.5 , metalness: 1 }), // Metallic Gold
    new THREE.MeshStandardMaterial({ color: 0xCD7F32,roughness: 0.5 , metalness: 1 }), // Metallic Bronze
    new THREE.MeshStandardMaterial({ color: 0xB76E79,roughness: 0.5 , metalness: 1 }), // Metallic Rose Gold
    new THREE.MeshStandardMaterial({ color: 0x0077BE,roughness: 0.5 , metalness: 1 }), // Metallic Blue
    new THREE.MeshStandardMaterial({ color: 0x4CAF50,roughness: 0.44 , metalness: 1 }), // Metallic Green
    new THREE.MeshStandardMaterial({ color: 0xFF4500,roughness: 0.66, metalness: 1 }), // Metallic Red
    new THREE.MeshStandardMaterial({ color: 0x00008B,roughness: 0.5543 , metalness: 1 }), // Metallic Deep Blue
    new THREE.MeshStandardMaterial({ color: 0x008080,roughness: 0.76 , metalness: 1 }), // Metallic Teal
    new THREE.MeshStandardMaterial({ color: 0xFF69B4,roughness: 0.987 , metalness: 1 }), // Metallic Pink
    new THREE.MeshStandardMaterial({ color: 0x006400,roughness: 0.643 , metalness: 1 }), // Metallic Dark Green
    new THREE.MeshStandardMaterial({ color: 0xFF00FF,roughness: 0.9888 , metalness: 1 }), // Metallic Magenta
    new THREE.MeshStandardMaterial({ color: 0xE6E6FA,roughness: 0.234 , metalness: 1 }), // Metallic Lavender
    new THREE.MeshStandardMaterial({ color: 0xF5F5DC,roughness: 0.553 , metalness: 1 }), // Metallic Beige
    new THREE.MeshStandardMaterial({ color: 0x4B0082,roughness: 0.567 , metalness: 1 }), // Metallic Indigo
    new THREE.MeshStandardMaterial({ color: 0xA9A9A9,roughness: 0.86 , metalness: 1 })  // Metallic Dark Gray
  ];

  return geometries.map(({ position, r, geometry }) => (
    <Geometry
      key={JSON.stringify(position)} // Unique key
      position={position.map((p) => p * 2)}
      geometry={geometry}
      soundEffects={soundEffects}
      materials={materials}
      r={r}
    />
  ));
}

function Geometry({ r, position, geometry, soundEffects, materials }) {
  const meshRef = useRef();
  const [visible, setVisible] = useState(false);

  const startingMaterial = getRandomMaterial();

  function getRandomMaterial() {
    return gsap.utils.random(materials);
  }

  function handleClick(e) {
    const mesh = e.object;

    gsap.utils.random(soundEffects).play();

    gsap.to(mesh.rotation, {
      x: `+=${gsap.utils.random(0, 2)}`,
      y: `+=${gsap.utils.random(0, 2)}`,
      z: `+=${gsap.utils.random(0, 2)}`,
      duration: 1.3,
      ease: "elastic.out(1,0.3)",
      yoyo: true,
    });

    mesh.material = getRandomMaterial();
  }

  const handlePointerOver = () => {
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = () => {
    document.body.style.cursor = "default";
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      setVisible(true);
      gsap.from(meshRef.current.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: gsap.utils.random(0.8, 1.2),
        ease: "elastic.out(1,0.3)",
        delay: gsap.utils.random(0, 0.5),
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <group position={position} ref={meshRef}>
      <Float speed={5 * r} rotationIntensity={6 * r} floatIntensity={5 * r}>
        <mesh
          geometry={geometry}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          visible={visible}
          material={startingMaterial}
        ></mesh>
      </Float>
    </group>
  );
}
