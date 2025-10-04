'use client';

import { ShapeType } from '@/lib/types';
import { SHAPE_INFO } from '@/lib/constants';
import { Box, Package, Layers, GitBranch, Maximize2, Calculator, Ruler, Square } from 'lucide-react';

interface InfoPanelProps {
  shapeType: ShapeType;
}

export function InfoPanel({ shapeType }: InfoPanelProps) {
  const info = SHAPE_INFO[shapeType];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6 animate-in fade-in slide-in-from-right duration-300">
      <div className="flex items-center gap-3 pb-4 border-b">
        {shapeType === 'cube' ? (
          <Box className="w-8 h-8 text-blue-600" />
        ) : (
          <Package className="w-8 h-8 text-emerald-600" />
        )}
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            {info.nameIndonesian}
          </h2>
          <p className="text-sm text-slate-500">{info.name}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <Layers className="w-5 h-5 text-blue-600 mx-auto mb-1" />
          <p className="text-xs text-slate-600 mb-1">Sisi</p>
          <p className="text-xl font-bold text-slate-800">{info.faces}</p>
        </div>
        <div className="text-center p-3 bg-emerald-50 rounded-lg">
          <GitBranch className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
          <p className="text-xs text-slate-600 mb-1">Rusuk</p>
          <p className="text-xl font-bold text-slate-800">{info.edges}</p>
        </div>
        <div className="text-center p-3 bg-amber-50 rounded-lg">
          <Maximize2 className="w-5 h-5 text-amber-600 mx-auto mb-1" />
          <p className="text-xs text-slate-600 mb-1">Titik Sudut</p>
          <p className="text-xl font-bold text-slate-800">{info.vertices}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Square className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-semibold text-slate-700">
              Luas Permukaan
            </h3>
          </div>
          <p className="text-lg font-mono text-blue-900">
            {info.surfaceAreaFormula}
          </p>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Calculator className="w-4 h-4 text-purple-600" />
            <h3 className="text-sm font-semibold text-slate-700">
              Volume
            </h3>
          </div>
          <p className="text-lg font-mono text-purple-900">
            {info.volumeFormula}
          </p>
        </div>

        <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Ruler className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-semibold text-slate-700">
              Keliling (Jumlah Rusuk)
            </h3>
          </div>
          <p className="text-lg font-mono text-emerald-900">
            {info.perimeterFormula}
          </p>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Maximize2 className="w-4 h-4 text-orange-600" />
            <h3 className="text-sm font-semibold text-slate-700">
              Diagonal Bidang
            </h3>
          </div>
          <p className="text-lg font-mono text-orange-900">
            {info.faceDiagonalFormula}
          </p>
        </div>

        <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Box className="w-4 h-4 text-red-600" />
            <h3 className="text-sm font-semibold text-slate-700">
              Diagonal Ruang
            </h3>
          </div>
          <p className="text-lg font-mono text-red-900">
            {info.spaceDiagonalFormula}
          </p>
        </div>

        <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Calculator className="w-4 h-4 text-indigo-600" />
            <h3 className="text-sm font-semibold text-slate-700">
              Luas Bidang Diagonal
            </h3>
          </div>
          <p className="text-lg font-mono text-indigo-900">
            {info.diagonalPlaneAreaFormula}
          </p>
        </div>
      </div>

      <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
        <p className="text-xs text-slate-600 text-center">
          <strong>Keterangan:</strong><br />
          {shapeType === 'cube' ? (
            <>s = sisi kubus</>
          ) : (
            <>p = panjang, l = lebar, t = tinggi</>
          )}
        </p>
      </div>
    </div>
  );
}