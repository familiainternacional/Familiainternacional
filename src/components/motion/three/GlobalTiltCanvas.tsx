'use client';

import { Canvas } from '@react-three/fiber';
import type { RefObject } from 'react';
import { AmbientScene, PageTiltRig } from './PageTiltRig';

type GlobalTiltCanvasProps = {
  shellRef: RefObject<HTMLDivElement | null>;
};

export default function GlobalTiltCanvas({ shellRef }: GlobalTiltCanvasProps) {
  return (
    <div className="global-tilt-canvas pointer-events-none fixed inset-0 -z-[1] h-full w-full" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <PageTiltRig shellRef={shellRef} />
        <AmbientScene />
      </Canvas>
    </div>
  );
}
