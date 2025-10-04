'use client';

import { Suspense, lazy, useEffect, useState } from 'react';
import { Loader as Loader2, CircleAlert as AlertCircle } from 'lucide-react';
import { isWebGLAvailable, getWebGLErrorMessage } from '@/lib/webgl-detection';
import { ShapeType, ToggleState } from '@/lib/types';

const Scene3D = lazy(() =>
  import('./Scene3D').then((mod) => ({ default: mod.Scene3D }))
);

interface Viewer3DProps {
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

function LoadingSkeleton() {
  return (
    <div className="w-full h-full min-h-[400px] bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl shadow-inner flex items-center justify-center">
      <div className="text-center space-y-4">
        <Loader2 className="w-12 h-12 animate-spin text-slate-400 mx-auto" />
        <p className="text-slate-600 text-sm">Memuat visualisasi 3D...</p>
      </div>
    </div>
  );
}

function WebGLFallback() {
  return (
    <div className="w-full h-full min-h-[400px] bg-gradient-to-br from-red-50 to-orange-50 rounded-xl shadow-inner flex items-center justify-center p-6">
      <div className="text-center space-y-4 max-w-md">
        <AlertCircle className="w-16 h-16 text-orange-500 mx-auto" />
        <h3 className="text-lg font-semibold text-slate-800">
          WebGL Tidak Tersedia
        </h3>
        <p className="text-slate-600 text-sm">{getWebGLErrorMessage()}</p>
        <p className="text-slate-500 text-xs">
          Browser yang disarankan: Chrome, Firefox, Safari, atau Edge versi
          terbaru.
        </p>
      </div>
    </div>
  );
}

export function Viewer3D(props: Viewer3DProps) {
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null);

  useEffect(() => {
    setWebglSupported(isWebGLAvailable());
  }, []);

  if (webglSupported === null) {
    return <LoadingSkeleton />;
  }

  if (!webglSupported) {
    return <WebGLFallback />;
  }

  const colors = props.colors || defaultColors;

  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <Scene3D {...props} colors={colors} />
    </Suspense>
  );
}