import { CubeDimensions, RectangularPrismDimensions, CalculationResult } from './types';

export function calculateCube(dimensions: CubeDimensions): CalculationResult {
  const { side } = dimensions;
  const volume = Math.pow(side, 3);
  const surfaceArea = 6 * Math.pow(side, 2);
  const spaceDiagonal = side * Math.sqrt(3);
  const faceDiagonal = side * Math.sqrt(2);

  return {
    volume: parseFloat(volume.toFixed(2)),
    surfaceArea: parseFloat(surfaceArea.toFixed(2)),
    spaceDiagonal: parseFloat(spaceDiagonal.toFixed(2)),
    faceDiagonal: parseFloat(faceDiagonal.toFixed(2)),
  };
}

export function calculateRectangularPrism(
  dimensions: RectangularPrismDimensions
): CalculationResult {
  const { length, width, height } = dimensions;
  const volume = length * width * height;
  const surfaceArea = 2 * (length * width + length * height + width * height);
  const spaceDiagonal = Math.sqrt(
    Math.pow(length, 2) + Math.pow(width, 2) + Math.pow(height, 2)
  );

  return {
    volume: parseFloat(volume.toFixed(2)),
    surfaceArea: parseFloat(surfaceArea.toFixed(2)),
    spaceDiagonal: parseFloat(spaceDiagonal.toFixed(2)),
  };
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(num);
}
