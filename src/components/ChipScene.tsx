import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Line, RoundedBox, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { createLcdTexture, drawOledFrame } from '../utils/lcdBoot';

const PCB_BASE = '#0c2e22';
const PCB_MASK = '#14553f';
const COPPER = '#c87941';
const TRACE_GLOW = '#5eead4';
const SILK = '#d8d4cc';

type TracePath = {
  points: [number, number, number][];
};

function Trace({
  points,
  scrollProgress,
}: {
  points: [number, number, number][];
  scrollProgress: React.MutableRefObject<number>;
}) {
  const glowRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!glowRef.current) return;
    const line = glowRef.current.children[0] as THREE.Line;
    const mat = line.material as THREE.LineBasicMaterial;
    mat.opacity = 0.12 + scrollProgress.current * 0.18;
  });

  return (
    <group>
      <Line points={points} color={COPPER} lineWidth={1.35} transparent opacity={0.72} />
      <group ref={glowRef}>
        <Line points={points} color={TRACE_GLOW} lineWidth={0.65} transparent opacity={0.14} />
      </group>
    </group>
  );
}

function SmdComponent({
  position,
  size,
  color,
  rotation = 0,
}: {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  rotation?: number;
}) {
  return (
    <mesh position={position} rotation={[0, 0, rotation]}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} metalness={0.35} roughness={0.55} />
    </mesh>
  );
}

function OledScreen({
  screenRef,
  scrollProgress,
}: {
  screenRef: React.RefObject<THREE.Mesh | null>;
  scrollProgress: React.MutableRefObject<number>;
}) {
  const bootStart = useRef(-1);
  const display = useMemo(() => createLcdTexture(), []);

  useFrame((state) => {
    if (bootStart.current < 0) bootStart.current = state.clock.elapsedTime;
    const bootT = state.clock.elapsedTime - bootStart.current;
    const ctx = display.canvas.getContext('2d');
    if (!ctx) return;

    drawOledFrame(ctx, display.canvas.width, display.canvas.height, bootT, scrollProgress.current);
    display.texture.needsUpdate = true;
  });

  return (
    <group position={[0, 0.02, 0.09]}>
      <mesh position={[0, 0, -0.002]}>
        <boxGeometry args={[0.34, 0.34, 0.006]} />
        <meshStandardMaterial color="#141418" metalness={0.5} roughness={0.55} />
      </mesh>

      <mesh ref={screenRef} position={[0, 0, 0.004]} renderOrder={2}>
        <planeGeometry args={[0.34, 0.34]} />
        <meshBasicMaterial
          map={display.texture}
          color="#ffffff"
          toneMapped={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function Chip({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const boardRef = useRef<THREE.Group>(null);
  const dieRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const spinYaw = useRef(0.35);
  const smoothScroll = useRef(0);

  const traces = useMemo<TracePath[]>(
    () => [
      {
        points: [
          [-0.58, 0.3, 0.062],
          [-0.24, 0.3, 0.062],
          [-0.24, 0.06, 0.062],
          [0.06, 0.06, 0.062],
          [0.06, -0.26, 0.062],
          [0.34, -0.26, 0.062],
        ],
      },
      {
        points: [
          [0.58, 0.2, 0.062],
          [0.26, 0.2, 0.062],
          [0.26, -0.04, 0.062],
          [-0.06, -0.04, 0.062],
          [-0.06, -0.38, 0.062],
        ],
      },
      {
        points: [
          [-0.46, -0.14, 0.062],
          [-0.46, 0.14, 0.062],
          [0.2, 0.14, 0.062],
          [0.2, 0.38, 0.062],
        ],
      },
      {
        points: [
          [0.52, -0.36, 0.062],
          [0.14, -0.36, 0.062],
          [0.14, -0.1, 0.062],
          [-0.34, -0.1, 0.062],
        ],
      },
    ],
    [],
  );

  const pins = useMemo(() => {
    const result: [number, number, number][] = [];
    const count = 8;
    const spacing = 0.17;
    const offset = ((count - 1) * spacing) / 2;

    for (let i = 0; i < count; i++) {
      const y = offset - i * spacing;
      result.push([-0.76, y, 0.03], [0.76, y, 0.03]);
    }
    return result;
  }, []);

  useFrame((state, delta) => {
    smoothScroll.current = THREE.MathUtils.lerp(smoothScroll.current, scrollProgress.current, 0.14);
    const scroll = smoothScroll.current;

    if (boardRef.current) {
      spinYaw.current += delta * 0.14;
      boardRef.current.rotation.order = 'YXZ';
      boardRef.current.rotation.y = spinYaw.current + scroll * Math.PI * 2;
      boardRef.current.rotation.x = THREE.MathUtils.lerp(
        boardRef.current.rotation.x,
        -(0.44 + scroll * 0.1),
        0.06,
      );
      boardRef.current.rotation.z = 0;
      boardRef.current.scale.setScalar(THREE.MathUtils.lerp(boardRef.current.scale.x, 1 + scroll * 0.06, 0.06));
    }


    if (wireRef.current) {
      wireRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group>
      <mesh ref={wireRef} position={[0, 0, 0.02]}>
        <icosahedronGeometry args={[0.95, 1]} />
        <meshBasicMaterial color={TRACE_GLOW} wireframe transparent opacity={0.07} />
      </mesh>

      <Sparkles count={28} scale={2.2} size={1.2} speed={0.35} color={TRACE_GLOW} opacity={0.35} />

      <group ref={boardRef}>
        <RoundedBox args={[1.42, 1.0, 0.09]} radius={0.035} smoothness={4} position={[0, 0, -0.025]}>
          <meshStandardMaterial color={PCB_BASE} metalness={0.12} roughness={0.88} />
        </RoundedBox>

        <RoundedBox args={[1.36, 0.94, 0.02]} radius={0.03} smoothness={4} position={[0, 0, 0.018]}>
          <meshStandardMaterial color={PCB_MASK} metalness={0.08} roughness={0.82} />
        </RoundedBox>

        {traces.map((trace, i) => (
          <Trace key={i} points={trace.points} scrollProgress={scrollProgress} />
        ))}

        <SmdComponent position={[-0.36, 0.26, 0.07]} size={[0.14, 0.06, 0.035]} color="#2a2a30" />
        <SmdComponent position={[0.3, 0.3, 0.07]} size={[0.08, 0.08, 0.035]} color="#1e3a5f" />
        <SmdComponent position={[0.06, -0.26, 0.07]} size={[0.18, 0.09, 0.035]} color="#3d3428" rotation={0.25} />
        <SmdComponent position={[-0.2, -0.34, 0.07]} size={[0.06, 0.11, 0.035]} color="#4a4a52" />
        <OledScreen screenRef={dieRef} scrollProgress={scrollProgress} />

        <group position={[-0.34, 0.44, 0.06]}>
          {[0, 1, 2, 3, 4].map((i) => (
            <mesh key={i} position={[i * 0.052, 0, 0]}>
              <boxGeometry args={[0.038, 0.016, 0.004]} />
              <meshStandardMaterial color={SILK} transparent opacity={0.3} />
            </mesh>
          ))}
        </group>

        {pins.map((pos, i) => (
          <mesh key={i} position={pos}>
            <boxGeometry args={[0.055, 0.038, 0.045]} />
            <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.15} />
          </mesh>
        ))}

        {[
          [-0.64, 0.44],
          [0.64, 0.44],
          [-0.64, -0.44],
          [0.64, -0.44],
        ].map(([x, y], i) => (
          <mesh key={i} position={[x, y, 0.055]}>
            <cylinderGeometry args={[0.038, 0.038, 0.018, 12]} />
            <meshStandardMaterial color="#060a08" roughness={0.92} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

type ChipSceneProps = {
  scrollProgress: React.MutableRefObject<number>;
};

export function ChipScene({ scrollProgress }: ChipSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0.12, 3.15], fov: 38 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
    >
      <ambientLight intensity={0.48} />
      <directionalLight position={[3, 5, 4]} intensity={1.05} color="#fff8f0" />
      <directionalLight position={[-4, -1, 3]} intensity={0.5} color="#5eead4" />
      <pointLight position={[0, 0, 2.5]} intensity={0.65} color={COPPER} />
      <pointLight position={[-2, 2, 1]} intensity={0.28} color="#3d9b8f" />
      <Float speed={1.1} rotationIntensity={0.1} floatIntensity={0.18}>
        <Chip scrollProgress={scrollProgress} />
      </Float>
    </Canvas>
  );
}
