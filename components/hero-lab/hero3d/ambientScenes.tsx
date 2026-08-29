"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Group, Mesh } from "three";
import { CatmullRomCurve3, DoubleSide, Vector3 } from "three";
import { HERO_3D_ACCENT } from "./Hero3dCanvasShell";
import type { MouseParallax } from "./useHero3dMouse";

function applyMouseParallax(group: Group, mouse: MouseParallax, strength = 0.12) {
  group.rotation.y = mouse.x * strength;
  group.rotation.x = -mouse.y * strength * 0.55;
}

/** C5 — split-panel torus knot */
export function TorusKnotScene({ mouse }: { mouse: MouseParallax }) {
  const knot = useRef<Mesh>(null);
  const inner = useRef<Mesh>(null);
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    if (knot.current) {
      knot.current.rotation.x += delta * 0.12;
      knot.current.rotation.y += delta * 0.18;
    }
    if (inner.current) inner.current.rotation.y -= delta * 0.35;
    if (group.current) applyMouseParallax(group.current, mouse, 0.14);
  });

  return (
    <group ref={group}>
      <mesh ref={knot}>
        <torusKnotGeometry args={[1.1, 0.28, 128, 16]} />
        <meshBasicMaterial color={HERO_3D_ACCENT} wireframe transparent opacity={0.75} />
      </mesh>
      <mesh ref={inner}>
        <octahedronGeometry args={[0.55, 0]} />
        <meshBasicMaterial color={HERO_3D_ACCENT} wireframe transparent opacity={0.95} />
      </mesh>
    </group>
  );
}

/** W4 — portal arch framing the hero block */
export function AmbientPortalArchScene({ mouse }: { mouse: MouseParallax }) {
  const group = useRef<Group>(null);
  const arch = useRef<Group>(null);

  const mainArch = useMemo(() => {
    const points: Vector3[] = [];
    for (let i = 0; i <= 40; i++) {
      const t = (i / 40) * Math.PI;
      points.push(new Vector3(Math.cos(t) * 3.1 - 0.4, Math.sin(t) * 2.4 - 0.8, 0));
    }
    return new CatmullRomCurve3(points);
  }, []);

  const sideArcs = useMemo(() => {
    const left: Vector3[] = [];
    const right: Vector3[] = [];
    for (let i = 0; i <= 24; i++) {
      const t = (i / 24) * Math.PI * 0.55 + Math.PI * 0.22;
      left.push(new Vector3(-2.2 + Math.cos(t) * 0.8, -1.2 + i * 0.14, Math.sin(t) * 0.4));
      right.push(new Vector3(2.8 - Math.cos(t) * 0.8, -1.2 + i * 0.14, Math.sin(t) * 0.4));
    }
    return {
      left: new CatmullRomCurve3(left),
      right: new CatmullRomCurve3(right),
    };
  }, []);

  useFrame((_, delta) => {
    if (arch.current) arch.current.rotation.y = Math.sin(delta * 0.5) * 0.03;
    if (group.current) applyMouseParallax(group.current, mouse, 0.09);
  });

  return (
    <group ref={group} position={[0.85, 0.1, 0]}>
      <group ref={arch}>
        <mesh>
          <tubeGeometry args={[mainArch, 80, 0.028, 8, false]} />
          <meshBasicMaterial color={HERO_3D_ACCENT} transparent opacity={0.95} />
        </mesh>
        <mesh>
          <tubeGeometry args={[mainArch, 80, 0.055, 8, false]} />
          <meshBasicMaterial color={HERO_3D_ACCENT} wireframe transparent opacity={0.22} />
        </mesh>
        <mesh>
          <tubeGeometry args={[sideArcs.left, 48, 0.018, 6, false]} />
          <meshBasicMaterial color={HERO_3D_ACCENT} transparent opacity={0.65} />
        </mesh>
        <mesh>
          <tubeGeometry args={[sideArcs.right, 48, 0.018, 6, false]} />
          <meshBasicMaterial color={HERO_3D_ACCENT} transparent opacity={0.65} />
        </mesh>
        {[-2.1, 2.7].map((x, i) => (
          <mesh key={i} position={[x, -1.35, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 2.6, 6]} />
            <meshBasicMaterial color={HERO_3D_ACCENT} transparent opacity={0.55} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/** W5 — geodesic dome cage wrapping the hero */
export function AmbientGeodesicCageScene({ mouse }: { mouse: MouseParallax }) {
  const group = useRef<Group>(null);
  const outer = useRef<Mesh>(null);
  const inner = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (outer.current) outer.current.rotation.y += delta * 0.05;
    if (inner.current) inner.current.rotation.y -= delta * 0.08;
    if (group.current) applyMouseParallax(group.current, mouse, 0.1);
  });

  return (
    <group ref={group} position={[0.9, 0.05, 0]} rotation={[0, -0.25, 0]}>
      <mesh ref={outer} scale={1.55}>
        <icosahedronGeometry args={[1.65, 2]} />
        <meshBasicMaterial color={HERO_3D_ACCENT} wireframe transparent opacity={0.52} />
      </mesh>
      <mesh ref={inner} scale={1.15}>
        <icosahedronGeometry args={[1.65, 1]} />
        <meshBasicMaterial color={HERO_3D_ACCENT} wireframe transparent opacity={0.85} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -1.05, 0]}>
        <ringGeometry args={[2.1, 2.16, 64]} />
        <meshBasicMaterial color={HERO_3D_ACCENT} transparent opacity={0.65} side={DoubleSide} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -1.05, 0]}>
        <ringGeometry args={[2.45, 2.5, 64]} />
        <meshBasicMaterial color={HERO_3D_ACCENT} transparent opacity={0.35} side={DoubleSide} />
      </mesh>
    </group>
  );
}
