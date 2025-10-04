import { ShapeInfo } from './types';

export const SHAPE_INFO: Record<'cube' | 'rectangular-prism', ShapeInfo> = {
  cube: {
    name: 'Cube',
    nameIndonesian: 'Kubus',
    faces: 6,
    edges: 12,
    vertices: 8,
    volumeFormula: 'V = s³',
    surfaceAreaFormula: 'L = 6s²',
    perimeterFormula: 'K = 12 × s',
    faceDiagonalFormula: 'd = s√2',
    spaceDiagonalFormula: 'D = s√3',
    diagonalPlaneAreaFormula: 'L = s²√2'
  },
  'rectangular-prism': {
    name: 'Rectangular Prism',
    nameIndonesian: 'Balok',
    faces: 6,
    edges: 12,
    vertices: 8,
    volumeFormula: 'V = p × l × t',
    surfaceAreaFormula: 'L = 2(pl + pt + lt)',
    perimeterFormula: 'K = 4(p + l + t)',
    faceDiagonalFormula: 'd₁ = √(p² + l²), d₂ = √(p² + t²), d₃ = √(l² + t²)',
    spaceDiagonalFormula: 'D = √(p² + l² + t²)',
    diagonalPlaneAreaFormula: 'L = √(p² + l² + t²) × t'
  },
};

export const DEFAULT_CUBE_SIDE = 3;
export const DEFAULT_PRISM_DIMENSIONS = {
  length: 4,
  width: 3,
  height: 2,
};

export const MIN_DIMENSION = 0.5;
export const MAX_DIMENSION = 20;

export const VERTEX_LABELS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];