// components/RectangularPrism3D.tsx
'use client';

import { useRef } from 'react';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { ToggleState } from '@/lib/types';
import { VERTEX_LABELS } from '@/lib/constants';
import { ThickLine } from './ThickLine';

interface RectangularPrism3DProps {
  length: number;
  width: number;
  height: number;
  opacity: number;
  toggles: ToggleState;
  colors: {
    spaceDiagonal: string;
    faceDiagonal: string;
    diagonalPlane: string;
  };
}

export function RectangularPrism3D({
  length,
  width,
  height,
  opacity,
  toggles,
  colors,
}: RectangularPrism3DProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const halfL = length / 2;
  const halfW = width / 2;
  const halfH = height / 2;

  const vertices = [
    [-halfL, -halfH,  halfW], // A
    [ halfL, -halfH,  halfW], // B
    [ halfL,  halfH,  halfW], // C
    [-halfL,  halfH,  halfW], // D
    [-halfL, -halfH, -halfW], // E
    [ halfL, -halfH, -halfW], // F
    [ halfL,  halfH, -halfW], // G
    [-halfL,  halfH, -halfW], // H
  ];

  // Define edges for thick lines
  const edges = [
    // Bottom face
    [[-halfL, -halfH, halfW], [halfL, -halfH, halfW]], // A-B
    [[halfL, -halfH, halfW], [halfL, -halfH, -halfW]], // B-F
    [[halfL, -halfH, -halfW], [-halfL, -halfH, -halfW]], // F-E
    [[-halfL, -halfH, -halfW], [-halfL, -halfH, halfW]], // E-A
    
    // Top face
    [[-halfL, halfH, halfW], [halfL, halfH, halfW]], // D-C
    [[halfL, halfH, halfW], [halfL, halfH, -halfW]], // C-G
    [[halfL, halfH, -halfW], [-halfL, halfH, -halfW]], // G-H
    [[-halfL, halfH, -halfW], [-halfL, halfH, halfW]], // H-D
    
    // Vertical edges
    [[-halfL, -halfH, halfW], [-halfL, halfH, halfW]], // A-D
    [[halfL, -halfH, halfW], [halfL, halfH, halfW]], // B-C
    [[halfL, -halfH, -halfW], [halfL, halfH, -halfW]], // F-G
    [[-halfL, -halfH, -halfW], [-halfL, halfH, -halfW]], // E-H
  ];

  const faceDiagonals = [
    { vertices: [0, 2], toggle: toggles.faceDiagonalAC, name: 'AC' }, // A-C
    { vertices: [1, 3], toggle: toggles.faceDiagonalBD, name: 'BD' }, // B-D
    { vertices: [4, 6], toggle: toggles.faceDiagonalEG, name: 'EG' }, // E-G
    { vertices: [5, 7], toggle: toggles.faceDiagonalFH, name: 'FH' }, // F-H
    { vertices: [0, 5], toggle: toggles.faceDiagonalAF, name: 'AF' }, // A-F
    { vertices: [1, 4], toggle: toggles.faceDiagonalBE, name: 'BE' }, // B-E
    { vertices: [2, 7], toggle: toggles.faceDiagonalDG, name: 'DG' }, // D-G
    { vertices: [3, 6], toggle: toggles.faceDiagonalCH, name: 'CH' }, // C-H
    { vertices: [1, 6], toggle: toggles.faceDiagonalBG, name: 'BG' }, // B-G
    { vertices: [2, 5], toggle: toggles.faceDiagonalCF, name: 'CF' }, // C-F
    { vertices: [0, 7], toggle: toggles.faceDiagonalAH, name: 'AH' }, // A-H
    { vertices: [3, 4], toggle: toggles.faceDiagonalDE, name: 'DE' }, // D-E
  ];

  const spaceDiagonals = [
    { vertices: [0, 6], toggle: toggles.spaceDiagonalAE, name: 'AE' }, // A-G
    { vertices: [1, 7], toggle: toggles.spaceDiagonalBF, name: 'BF' }, // B-H
    { vertices: [2, 4], toggle: toggles.spaceDiagonalCG, name: 'CG' }, // C-E
    { vertices: [3, 5], toggle: toggles.spaceDiagonalDH, name: 'DH' }, // D-F
  ];

  const diagonalPlanes = [
    { vertices: [0, 1, 6, 7], toggle: toggles.diagonalPlaneABGH, name: 'ABGH' }, // Bidang diagonal ABGH
    { vertices: [3, 2, 5, 4], toggle: toggles.diagonalPlaneDCEF, name: 'DCEF' }, // Bidang diagonal DCEF
    { vertices: [3, 7, 5, 1], toggle: toggles.diagonalPlaneDBFH, name: 'DBFH' }, // Bidang diagonal DBFH
    { vertices: [0, 2, 6, 4], toggle: toggles.diagonalPlaneACGE, name: 'ACGE' }, // Bidang diagonal ACGE
  ];

  const createHatchLines = (planeVertices: number[], steps: number = 300) => {
    const lines = [];
    const [v0, v1, v2, v3] = planeVertices.map(idx => new THREE.Vector3(...vertices[idx]));
    
    // Vektor arah untuk arsiran
    const side1 = new THREE.Vector3().subVectors(v3, v0);
    const side2 = new THREE.Vector3().subVectors(v2, v1);
    
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      
      // Titik start dari garis pertama
      const start = new THREE.Vector3().addVectors(
        v0,
        side1.clone().multiplyScalar(t)
      );
      
      // Titik end dari garis kedua
      const end = new THREE.Vector3().addVectors(
        v1,
        side2.clone().multiplyScalar(t)
      );

      lines.push(
        <line key={`hatch-${planeVertices.join('-')}-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([
                start.x, start.y, start.z,
                end.x, end.y, end.z
              ])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color={colors.diagonalPlane} linewidth={2} />
        </line>
      );
    }
    return lines;
  };

  return (
    <group>
      <mesh ref={meshRef}>
        <boxGeometry args={[length, height, width]} />
        <meshStandardMaterial
          color="#10b981"
          transparent={toggles.transparency}
          opacity={toggles.transparency ? opacity : 1}
          side={THREE.DoubleSide}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>

      {/* Original edges untuk fallback */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(length, height, width)]} />
        <lineBasicMaterial color="#065f46" linewidth={1} />
      </lineSegments>

      {/* Enhanced thick edges */}
      {edges.map(([start, end], index) => (
        <ThickLine 
          key={`thick-edge-${index}`}
          start={start as [number, number, number]}
          end={end as [number, number, number]}
          color="#065f46"
          thickness={0.04}
        />
      ))}

      {vertices.map((pos, idx) => (
        <Text
          key={idx}
          position={[pos[0] * 1.4, pos[1] * 1.4, pos[2] * 1.4]}
          fontSize={0.5}
          color="#1e293b"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
        >
          {VERTEX_LABELS[idx]}
        </Text>
      ))}

      {/* Diagonal Ruang Individual */}
      {spaceDiagonals.map((diag, i) => (
        diag.toggle && (
          <ThickLine
            key={`space-diag-${diag.name}`}
            start={vertices[diag.vertices[0]] as [number, number, number]}
            end={vertices[diag.vertices[1]] as [number, number, number]}
            color={colors.spaceDiagonal}
            thickness={0.03}
          />
        )
      ))}

      {/* Diagonal Bidang Individual - PERBAIKAN: menggunakan faceDiagonals bukan spaceDiagonals */}
      {faceDiagonals.map((diag, i) => (
        diag.toggle && (
          <ThickLine
            key={`face-diag-${diag.name}`}
            start={vertices[diag.vertices[0]] as [number, number, number]}
            end={vertices[diag.vertices[1]] as [number, number, number]}
            color={colors.faceDiagonal}
            thickness={0.02}
          />
        )
      ))}

      {/* Render individual diagonal planes based on their toggles */}
      {diagonalPlanes.map((plane, planeIndex) => (
        plane.toggle && (
          <group key={`plane-${plane.name}`}>
            {/* Garis tepi bidang - menggunakan ThickLine */}
            {plane.vertices.map((startIdx, j) => {
              const endIdx = plane.vertices[(j + 1) % 4];
              return (
                <ThickLine
                  key={`plane-edge-${plane.name}-${j}`}
                  start={vertices[startIdx] as [number, number, number]}
                  end={vertices[endIdx] as [number, number, number]}
                  color={colors.diagonalPlane}
                  thickness={0.03}
                />
              );
            })}
            
            {/* Garis arsiran di dalam bidang */}
            {createHatchLines(plane.vertices)}
          </group>
        )
      ))}
    </group>
  );
}