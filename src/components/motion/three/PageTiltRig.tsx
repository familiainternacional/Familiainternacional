'use client';

import { useEffect, useRef, type RefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import { useLenis } from 'lenis/react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

type PageTiltRigProps = {
  shellRef: RefObject<HTMLDivElement | null>;
};

function lerp(current: number, target: number, factor: number) {
  return current + (target - current) * factor;
}

/**
 * Drives global DOM tilt from the R3F render loop, synced with Lenis scroll + pointer.
 */
export function PageTiltRig({ shellRef }: PageTiltRigProps) {
  const lenis = useLenis();
  const prefersReducedMotion = usePrefersReducedMotion();
  const state = useRef({ rotateX: 0, rotateY: 0, rotateZ: 0 });
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const onPointerMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.current.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', onPointerMove);
  }, [prefersReducedMotion]);

  useFrame(() => {
    const shell = shellRef.current;
    if (!shell || prefersReducedMotion) {
      return;
    }

    const scroll = lenis?.scroll ?? window.scrollY;
    const limit = lenis?.limit ?? document.documentElement.scrollHeight - window.innerHeight;
    const progress = limit > 0 ? scroll / limit : 0;
    const velocity = lenis?.velocity ?? 0;

    const targetX = -progress * 4.5 + velocity * 0.0018;
    const targetY = pointer.current.x * 2.8 + Math.sin(progress * Math.PI) * 1.8;
    const targetZ = pointer.current.y * -0.6;

    state.current.rotateX = lerp(state.current.rotateX, targetX, 0.08);
    state.current.rotateY = lerp(state.current.rotateY, targetY, 0.08);
    state.current.rotateZ = lerp(state.current.rotateZ, targetZ, 0.08);

    shell.style.transform = [
      'perspective(1600px)',
      `rotateX(${state.current.rotateX.toFixed(3)}deg)`,
      `rotateY(${state.current.rotateY.toFixed(3)}deg)`,
      `rotateZ(${state.current.rotateZ.toFixed(3)}deg)`,
    ].join(' ');
    shell.style.transformOrigin = '50% 50%';
    shell.style.willChange = 'transform';
  });

  return null;
}

function AmbientOrb({
  position,
  color,
  scale,
  speed,
}: {
  position: [number, number, number];
  color: string;
  scale: number;
  speed: number;
}) {
  return (
    <Float speed={speed} rotationIntensity={0.35} floatIntensity={0.6}>
      <mesh position={position} scale={scale}>
        <sphereGeometry args={[1, 32, 32]} />
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.22}
          distort={0.35}
          speed={1.5}
          roughness={0.85}
        />
      </mesh>
    </Float>
  );
}

export function AmbientScene() {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 8]} intensity={0.35} color="#6b8fd4" />
      <AmbientOrb position={[-3.5, 1.2, -4]} color="#07234c" scale={1.8} speed={1.2} />
      <AmbientOrb position={[4.2, -0.8, -5]} color="#0d3566" scale={2.2} speed={0.9} />
      <AmbientOrb position={[0.5, 2.4, -6]} color="#405070" scale={1.4} speed={1.5} />
      <mesh rotation={[-Math.PI / 2.2, 0, 0]} position={[0, -2.5, -3]}>
        <planeGeometry args={[18, 18, 24, 24]} />
        <meshBasicMaterial color="#051830" wireframe transparent opacity={0.08} />
      </mesh>
    </>
  );
}
