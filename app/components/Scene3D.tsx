'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Cube3D } from './Cube3D';
import { RectangularPrism3D } from './RectangularPrism3D';
import { ShapeType, ToggleState } from '@/lib/types';

interface Scene3DProps {
  shapeType: ShapeType;
  cubeSide?: number;
  prismLength?: number;
  prismWidth?: number;
  prismHeight?: number;
  opacity: number;
  toggles: ToggleState;
  colors?: {
    spaceDiagonal: string;
    faceDiagonal: string;
    diagonalPlane: string;
  };
}

const defaultColors = {
  spaceDiagonal: '#ef4444',
  faceDiagonal: '#f59e0b',
  diagonalPlane: '#10b981',
};

export function Scene3D({
  shapeType,
  cubeSide = 3,
  prismLength = 4,
  prismWidth = 3,
  prismHeight = 2,
  opacity,
  toggles,
  colors = defaultColors,
}: Scene3DProps) {
  return (
    <div className="w-full h-full min-h-[400px] bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl shadow-inner">
      <Canvas>
        <PerspectiveCamera makeDefault position={[8, 6, 8]} />
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          minDistance={5}
          maxDistance={20}
        />

        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.3} />

        <group>
          {shapeType === 'cube' ? (
            <Cube3D 
              size={cubeSide} 
              opacity={opacity} 
              toggles={toggles} 
              colors={colors}
            />
          ) : (
            <RectangularPrism3D
              length={prismLength}
              width={prismWidth}
              height={prismHeight}
              opacity={opacity}
              toggles={toggles}
              colors={colors}
            />
          )}
        </group>

        <gridHelper args={[20, 20, '#cbd5e1', '#e2e8f0']} />
      </Canvas>
    </div>
  );
}