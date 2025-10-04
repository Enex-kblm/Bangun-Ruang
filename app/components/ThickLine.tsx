// components/ThickLine.tsx
'use client';

import * as THREE from 'three';

interface ThickLineProps {
  start: [number, number, number];
  end: [number, number, number];
  color: string;
  thickness?: number;
}

export function ThickLine({ start, end, color, thickness = 0.06 }: ThickLineProps) {
  const startVec = new THREE.Vector3(...start);
  const endVec = new THREE.Vector3(...end);
  const direction = new THREE.Vector3().subVectors(endVec, startVec);
  const length = direction.length();
  const center = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5);
  
  // Orientation - rotate cylinder to point from start to end
  const up = new THREE.Vector3(0, 1, 0);
  const orientation = new THREE.Quaternion();
  orientation.setFromUnitVectors(up, direction.normalize());
  
  return (
    <mesh position={center} quaternion={orientation}>
      <cylinderGeometry args={[thickness, thickness, length, 8]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}