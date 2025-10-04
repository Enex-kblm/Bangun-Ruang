// app/page.tsx
'use client';

import { useState } from 'react';
import { Viewer3D } from './components/Viewer3D';
import { InfoPanel } from './components/InfoPanel';
import { InputControls } from './components/InputControls';
import { ShapeType, ToggleState } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Box, Package } from 'lucide-react';

export default function Home() {
  const [shapeType, setShapeType] = useState<ShapeType>('cube');
  const [opacity, setOpacity] = useState(0.12);
  const [toggles, setToggles] = useState<ToggleState>({
    transparency: false,
    spaceDiagonal: false,
    // HAPUS: faceDiagonal: false, // ← DIHAPUS
    diagonalPlane: false,
    diagonalPlaneABGH: false,
    diagonalPlaneDCEF: false,
    diagonalPlaneDBFH: false,
    diagonalPlaneACGE: false,
    // Tambah state untuk diagonal bidang individual
    faceDiagonalAC: false,
    faceDiagonalBD: false,
    faceDiagonalEG: false,
    faceDiagonalFH: false,
    faceDiagonalAF: false,
    faceDiagonalBE: false,
    faceDiagonalDG: false,
    faceDiagonalCH: false,
    faceDiagonalBG: false,
    faceDiagonalCF: false,
    faceDiagonalAH: false,
    faceDiagonalDE: false,
  });
  
  const [colors, setColors] = useState({
    spaceDiagonal: '#ef4444',
    faceDiagonal: '#f59e0b',
    diagonalPlane: '#10b981',
  });

  const handleToggleChange = (key: keyof ToggleState) => {
    setToggles((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleReset = () => {
    setOpacity(0.12);
    setToggles({
      transparency: false,
      spaceDiagonal: false,
      // HAPUS: faceDiagonal: false, // ← DIHAPUS
      diagonalPlane: false,
      diagonalPlaneABGH: false,
      diagonalPlaneDCEF: false,
      diagonalPlaneDBFH: false,
      diagonalPlaneACGE: false,
      faceDiagonalAC: false,
      faceDiagonalBD: false,
      faceDiagonalEG: false,
      faceDiagonalFH: false,
      faceDiagonalAF: false,
      faceDiagonalBE: false,
      faceDiagonalDG: false,
      faceDiagonalCH: false,
      faceDiagonalBG: false,
      faceDiagonalCF: false,
      faceDiagonalAH: false,
      faceDiagonalDE: false,
    });
    setColors({
      spaceDiagonal: '#ef4444',
      faceDiagonal: '#f59e0b',
      diagonalPlane: '#10b981',
    });
  };

  const handleShapeChange = (newShape: ShapeType) => {
    setShapeType(newShape);
    setToggles({
      transparency: false,
      spaceDiagonal: false,
      // HAPUS: faceDiagonal: false, // ← DIHAPUS
      diagonalPlane: false,
      diagonalPlaneABGH: false,
      diagonalPlaneDCEF: false,
      diagonalPlaneDBFH: false,
      diagonalPlaneACGE: false,
      faceDiagonalAC: false,
      faceDiagonalBD: false,
      faceDiagonalEG: false,
      faceDiagonalFH: false,
      faceDiagonalAF: false,
      faceDiagonalBE: false,
      faceDiagonalDG: false,
      faceDiagonalCH: false,
      faceDiagonalBG: false,
      faceDiagonalCF: false,
      faceDiagonalAH: false,
      faceDiagonalDE: false,
    });
  };

  const handleColorChange = (type: 'spaceDiagonal' | 'faceDiagonal' | 'diagonalPlane', color: string) => {
    setColors(prev => ({
      ...prev,
      [type]: color
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-emerald-50">
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-4 mb-6">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
            Bangun Ruang
          </h1>
          <p className="text-slate-600 text-sm md:text-base text-center">
            Eksplorasi interaktif geometri 3D dengan visualisasi
          </p>

          <div className="flex gap-3 mt-2">
            <Button
              onClick={() => handleShapeChange('cube')}
              variant={shapeType === 'cube' ? 'default' : 'outline'}
              size="lg"
              className={`gap-2 transition-all duration-300 ${
                shapeType === 'cube'
                  ? 'bg-blue-600 hover:bg-blue-700 shadow-lg scale-105'
                  : 'hover:bg-blue-50'
              }`}
            >
              <Box className="w-5 h-5" />
              Kubus
            </Button>

            <Button
              onClick={() => handleShapeChange('rectangular-prism')}
              variant={shapeType === 'rectangular-prism' ? 'default' : 'outline'}
              size="lg"
              className={`gap-2 transition-all duration-300 ${
                shapeType === 'rectangular-prism'
                  ? 'bg-emerald-600 hover:bg-emerald-700 shadow-lg scale-105'
                  : 'hover:bg-emerald-50'
              }`}
            >
              <Package className="w-5 h-5" />
              Balok
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">
                Visualisasi 3D
              </h2>
              <div className="w-full aspect-video lg:aspect-square">
                <Viewer3D
                  shapeType={shapeType}
                  opacity={opacity}
                  toggles={toggles}
                  colors={colors}
                />
              </div>
              <div className="mt-4 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">
                <p className="font-semibold mb-1">Cara Interaksi:</p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>Klik dan drag untuk memutar objek 3D</li>
                  <li>Scroll atau pinch untuk zoom in/out</li>
                  <li>Gunakan kontrol di samping untuk mengubah visualisasi</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <InputControls
              opacity={opacity}
              toggles={toggles}
              onOpacityChange={setOpacity}
              onToggleChange={handleToggleChange}
              onReset={handleReset}
              colors={colors}
              onColorChange={handleColorChange}
            />

            <InfoPanel shapeType={shapeType}/>
          </div>
        </div>
      </main>

      <footer className="bg-white/80 backdrop-blur-sm border-t mt-12 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-slate-600">
          <p>
            Website Edukasi Interaktif Bangun Ruang &copy; {new Date().getFullYear()}
          </p>
          <p className="text-xs mt-2 text-slate-500">
            Dibuat dengan Next.js, Three.js, dan React Three Fiber
          </p>
        </div>
      </footer>
    </div>
  );
}