// lib/types.ts
export type ShapeType = 'cube' | 'rectangular-prism';

export interface CubeDimensions {
  side: number;
}

export interface RectangularPrismDimensions {
  length: number;
  width: number;
  height: number;
}

export type ShapeDimensions = CubeDimensions | RectangularPrismDimensions;

export interface CalculationResult {
  volume: number;
  surfaceArea: number;
  spaceDiagonal?: number;
  faceDiagonal?: number;
}

export interface ShapeInfo {
  name: string;
  nameIndonesian: string;
  faces: number;
  edges: number;
  vertices: number;
  volumeFormula: string;
  surfaceAreaFormula: string;
  perimeterFormula: string;
  faceDiagonalFormula: string;
  spaceDiagonalFormula: string;
  diagonalPlaneAreaFormula: string;
}

// lib/types.ts
export interface ToggleState {
  transparency: boolean;
  spaceDiagonal: boolean;
  diagonalPlane: boolean;
  diagonalPlaneABGH: boolean;
  diagonalPlaneDCEF: boolean;
  diagonalPlaneDBFH: boolean;
  diagonalPlaneACGE: boolean;
  // Diagonal bidang individual
  faceDiagonalAC: boolean;
  faceDiagonalBD: boolean;
  faceDiagonalEG: boolean;
  faceDiagonalFH: boolean;
  faceDiagonalAF: boolean;
  faceDiagonalBE: boolean;
  faceDiagonalDG: boolean;
  faceDiagonalCH: boolean;
  faceDiagonalBG: boolean;
  faceDiagonalCF: boolean;
  faceDiagonalAH: boolean;
  faceDiagonalDE: boolean;
  // Diagonal ruang individual
  spaceDiagonalAE: boolean;  // A-E (A ke G)
  spaceDiagonalBF: boolean;  // B-F (B ke H) 
  spaceDiagonalCG: boolean;  // C-G (C ke E)
  spaceDiagonalDH: boolean;  // D-H (D ke F)
  spaceDiagonalAF: boolean;  // A-F (A ke F)
  spaceDiagonalBE: boolean;  // B-E (B ke E)
  spaceDiagonalDG: boolean;  // D-G (D ke G)
  spaceDiagonalCH: boolean;  // C-H (C ke H)
}

export interface ViewerControls {
  opacity: number;
  autoRotate: boolean;
  showLabels: boolean;
}