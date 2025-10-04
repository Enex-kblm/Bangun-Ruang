// components/InputControls.tsx
'use client';

import { ToggleState } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { RotateCcw, Eye, EyeOff, ChevronDown, ChevronRight, Palette } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

interface InputControlsProps {
  opacity: number;
  toggles: ToggleState;
  onOpacityChange: (value: number) => void;
  onToggleChange: (key: keyof ToggleState) => void;
  onReset: () => void;
  colors: {
    spaceDiagonal: string;
    faceDiagonal: string;
    diagonalPlane: string;
  };
  onColorChange: (type: 'spaceDiagonal' | 'faceDiagonal' | 'diagonalPlane', color: string) => void;
}

export function InputControls({
  opacity,
  toggles,
  onOpacityChange,
  onToggleChange,
  onReset,
  colors,
  onColorChange,
}: InputControlsProps) {
  const [showDiagonalPlanes, setShowDiagonalPlanes] = useState(false);
  const [showFaceDiagonals, setShowFaceDiagonals] = useState(false);
  const [showSpaceDiagonals, setShowSpaceDiagonals] = useState(false);
  const [showColorPickers, setShowColorPickers] = useState(false);

  const colorPresets = {
    spaceDiagonal: ['#ef4444', '#dc2626', '#b91c1c', '#991b1b'],
    faceDiagonal: ['#f59e0b', '#d97706', '#b45309', '#92400e'],
    diagonalPlane: ['#10b981', '#059669', '#047857', '#065f46'],
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-800">
          Kontrol Visualisasi
        </h3>
        <Button
          onClick={onReset}
          variant="outline"
          size="sm"
          className="gap-2 hover:bg-slate-100 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </Button>
      </div>

      <div className="space-y-4">
        {/* Transparansi */}
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
          <div className="flex items-center gap-2">
            {toggles.transparency ? (
              <Eye className="w-4 h-4 text-slate-600" />
            ) : (
              <EyeOff className="w-4 h-4 text-slate-600" />
            )}
            <Label className="text-sm cursor-pointer">Transparansi</Label>
          </div>
          <Switch
            checked={toggles.transparency}
            onCheckedChange={() => onToggleChange('transparency')}
          />
        </div>

        {toggles.transparency && (
          <div className="pl-6 pr-2 animate-in fade-in slide-in-from-top duration-200">
            <Label className="text-xs text-slate-600">
              Tingkat Transparansi: {Math.round(opacity * 100)}%
            </Label>
            <Slider
              min={5}
              max={50}
              step={1}
              value={[opacity * 100]}
              onValueChange={(value) => onOpacityChange(value[0] / 100)}
              className="w-full"
            />
          </div>
        )}

        {/* Custom Warna Garis */}
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-slate-600" />
            <Label className="text-sm cursor-pointer">Custom Warna Garis</Label>
          </div>
          <button
            onClick={() => setShowColorPickers(!showColorPickers)}
            className="p-1 hover:bg-slate-200 rounded transition-colors"
          >
            {showColorPickers ? (
              <ChevronDown className="w-3 h-3" />
            ) : (
              <ChevronRight className="w-3 h-3" />
            )}
          </button>
        </div>

        {showColorPickers && (
          <div className="ml-6 space-y-4 animate-in fade-in slide-in-from-top duration-200">
            {/* Warna Diagonal Ruang */}
            <div className="space-y-2">
              <Label className="text-xs text-slate-600 flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded border border-slate-300"
                  style={{ backgroundColor: colors.spaceDiagonal }}
                />
                Diagonal Ruang
              </Label>
              <div className="flex gap-2">
                {colorPresets.spaceDiagonal.map((color) => (
                  <button
                    key={color}
                    onClick={() => onColorChange('spaceDiagonal', color)}
                    className={`w-6 h-6 rounded border-2 transition-all ${
                      colors.spaceDiagonal === color ? 'border-slate-800 scale-110' : 'border-slate-300'
                    }`}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
                <input
                  type="color"
                  value={colors.spaceDiagonal}
                  onChange={(e) => onColorChange('spaceDiagonal', e.target.value)}
                  className="w-6 h-6 rounded border border-slate-300 cursor-pointer"
                />
              </div>
            </div>

            {/* Warna Diagonal Bidang */}
            <div className="space-y-2">
              <Label className="text-xs text-slate-600 flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded border border-slate-300"
                  style={{ backgroundColor: colors.faceDiagonal }}
                />
                Diagonal Bidang
              </Label>
              <div className="flex gap-2">
                {colorPresets.faceDiagonal.map((color) => (
                  <button
                    key={color}
                    onClick={() => onColorChange('faceDiagonal', color)}
                    className={`w-6 h-6 rounded border-2 transition-all ${
                      colors.faceDiagonal === color ? 'border-slate-800 scale-110' : 'border-slate-300'
                    }`}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
                <input
                  type="color"
                  value={colors.faceDiagonal}
                  onChange={(e) => onColorChange('faceDiagonal', e.target.value)}
                  className="w-6 h-6 rounded border border-slate-300 cursor-pointer"
                />
              </div>
            </div>

            {/* Warna Bidang Diagonal */}
            <div className="space-y-2">
              <Label className="text-xs text-slate-600 flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded border border-slate-300"
                  style={{ backgroundColor: colors.diagonalPlane }}
                />
                Bidang Diagonal
              </Label>
              <div className="flex gap-2">
                {colorPresets.diagonalPlane.map((color) => (
                  <button
                    key={color}
                    onClick={() => onColorChange('diagonalPlane', color)}
                    className={`w-6 h-6 rounded border-2 transition-all ${
                      colors.diagonalPlane === color ? 'border-slate-800 scale-110' : 'border-slate-300'
                    }`}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
                <input
                  type="color"
                  value={colors.diagonalPlane}
                  onChange={(e) => onColorChange('diagonalPlane', e.target.value)}
                  className="w-6 h-6 rounded border border-slate-300 cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        {/* Diagonal Ruang - Main Toggle */}
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSpaceDiagonals(!showSpaceDiagonals)}
              className="p-1 hover:bg-slate-200 rounded transition-colors"
            >
              {showSpaceDiagonals ? (
                <ChevronDown className="w-3 h-3" />
              ) : (
                <ChevronRight className="w-3 h-3" />
              )}
            </button>
            <Label className="text-sm cursor-pointer">Diagonal Ruang</Label>
          </div>
        </div>

        {/* Sub-menu Diagonal Ruang */}
        {showSpaceDiagonals && (
          <div className="ml-6 space-y-3 animate-in fade-in slide-in-from-top duration-200">
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center justify-between p-2 bg-slate-40 rounded-lg hover:bg-slate-50 transition-colors">
                <Label className="text-xs cursor-pointer">A-G</Label>
                <Switch
                  checked={toggles.spaceDiagonalAE}
                  onCheckedChange={() => onToggleChange('spaceDiagonalAE')}
                  className="scale-75"
                />
              </div>
              <div className="flex items-center justify-between p-2 bg-slate-40 rounded-lg hover:bg-slate-50 transition-colors">
                <Label className="text-xs cursor-pointer">B-H</Label>
                <Switch
                  checked={toggles.spaceDiagonalBF}
                  onCheckedChange={() => onToggleChange('spaceDiagonalBF')}
                  className="scale-75"
                />
              </div>
              <div className="flex items-center justify-between p-2 bg-slate-40 rounded-lg hover:bg-slate-50 transition-colors">
                <Label className="text-xs cursor-pointer">C-E</Label>
                <Switch
                  checked={toggles.spaceDiagonalCG}
                  onCheckedChange={() => onToggleChange('spaceDiagonalCG')}
                  className="scale-75"
                />
              </div>
              <div className="flex items-center justify-between p-2 bg-slate-40 rounded-lg hover:bg-slate-50 transition-colors">
                <Label className="text-xs cursor-pointer">D-F</Label>
                <Switch
                  checked={toggles.spaceDiagonalDH}
                  onCheckedChange={() => onToggleChange('spaceDiagonalDH')}
                  className="scale-75"
                />
              </div>
            </div>
          </div>
        )}

        {/* Diagonal Bidang - Main Toggle */}
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFaceDiagonals(!showFaceDiagonals)}
              className="p-1 hover:bg-slate-200 rounded transition-colors"
            >
              {showFaceDiagonals ? (
                <ChevronDown className="w-3 h-3" />
              ) : (
                <ChevronRight className="w-3 h-3" />
              )}
            </button>
            <Label className="text-sm cursor-pointer">Diagonal Bidang</Label>
          </div>
        </div>

        {/* Sub-menu Diagonal Bidang */}
        {showFaceDiagonals && (
          <div className="ml-6 space-y-3 animate-in fade-in slide-in-from-top duration-200">
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center justify-between p-2 bg-slate-40 rounded-lg hover:bg-slate-50 transition-colors">
                <Label className="text-xs cursor-pointer">AC</Label>
                <Switch
                  checked={toggles.faceDiagonalAC}
                  onCheckedChange={() => onToggleChange('faceDiagonalAC')}
                  className="scale-75"
                />
              </div>
              <div className="flex items-center justify-between p-2 bg-slate-40 rounded-lg hover:bg-slate-50 transition-colors">
                <Label className="text-xs cursor-pointer">BD</Label>
                <Switch
                  checked={toggles.faceDiagonalBD}
                  onCheckedChange={() => onToggleChange('faceDiagonalBD')}
                  className="scale-75"
                />
              </div>
              <div className="flex items-center justify-between p-2 bg-slate-40 rounded-lg hover:bg-slate-50 transition-colors">
                <Label className="text-xs cursor-pointer">EG</Label>
                <Switch
                  checked={toggles.faceDiagonalEG}
                  onCheckedChange={() => onToggleChange('faceDiagonalEG')}
                  className="scale-75"
                />
              </div>
              <div className="flex items-center justify-between p-2 bg-slate-40 rounded-lg hover:bg-slate-50 transition-colors">
                <Label className="text-xs cursor-pointer">FH</Label>
                <Switch
                  checked={toggles.faceDiagonalFH}
                  onCheckedChange={() => onToggleChange('faceDiagonalFH')}
                  className="scale-75"
                />
              </div>
              <div className="flex items-center justify-between p-2 bg-slate-40 rounded-lg hover:bg-slate-50 transition-colors">
                <Label className="text-xs cursor-pointer">AF</Label>
                <Switch
                  checked={toggles.faceDiagonalAF}
                  onCheckedChange={() => onToggleChange('faceDiagonalAF')}
                  className="scale-75"
                />
              </div>
              <div className="flex items-center justify-between p-2 bg-slate-40 rounded-lg hover:bg-slate-50 transition-colors">
                <Label className="text-xs cursor-pointer">BE</Label>
                <Switch
                  checked={toggles.faceDiagonalBE}
                  onCheckedChange={() => onToggleChange('faceDiagonalBE')}
                  className="scale-75"
                />
              </div>
              <div className="flex items-center justify-between p-2 bg-slate-40 rounded-lg hover:bg-slate-50 transition-colors">
                <Label className="text-xs cursor-pointer">DG</Label>
                <Switch
                  checked={toggles.faceDiagonalDG}
                  onCheckedChange={() => onToggleChange('faceDiagonalDG')}
                  className="scale-75"
                />
              </div>
              <div className="flex items-center justify-between p-2 bg-slate-40 rounded-lg hover:bg-slate-50 transition-colors">
                <Label className="text-xs cursor-pointer">CH</Label>
                <Switch
                  checked={toggles.faceDiagonalCH}
                  onCheckedChange={() => onToggleChange('faceDiagonalCH')}
                  className="scale-75"
                />
              </div>
              <div className="flex items-center justify-between p-2 bg-slate-40 rounded-lg hover:bg-slate-50 transition-colors">
                <Label className="text-xs cursor-pointer">BG</Label>
                <Switch
                  checked={toggles.faceDiagonalBG}
                  onCheckedChange={() => onToggleChange('faceDiagonalBG')}
                  className="scale-75"
                />
              </div>
              <div className="flex items-center justify-between p-2 bg-slate-40 rounded-lg hover:bg-slate-50 transition-colors">
                <Label className="text-xs cursor-pointer">CF</Label>
                <Switch
                  checked={toggles.faceDiagonalCF}
                  onCheckedChange={() => onToggleChange('faceDiagonalCF')}
                  className="scale-75"
                />
              </div>
              <div className="flex items-center justify-between p-2 bg-slate-40 rounded-lg hover:bg-slate-50 transition-colors">
                <Label className="text-xs cursor-pointer">AH</Label>
                <Switch
                  checked={toggles.faceDiagonalAH}
                  onCheckedChange={() => onToggleChange('faceDiagonalAH')}
                  className="scale-75"
                />
              </div>
              <div className="flex items-center justify-between p-2 bg-slate-40 rounded-lg hover:bg-slate-50 transition-colors">
                <Label className="text-xs cursor-pointer">DE</Label>
                <Switch
                  checked={toggles.faceDiagonalDE}
                  onCheckedChange={() => onToggleChange('faceDiagonalDE')}
                  className="scale-75"
                />
              </div>
            </div>
          </div>
        )}

        {/* Bidang Diagonal - Main Toggle */}
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDiagonalPlanes(!showDiagonalPlanes)}
              className="p-1 hover:bg-slate-200 rounded transition-colors"
            >
              {showDiagonalPlanes ? (
                <ChevronDown className="w-3 h-3" />
              ) : (
                <ChevronRight className="w-3 h-3" />
              )}
            </button>
            <Label className="text-sm cursor-pointer">Bidang Diagonal</Label>
          </div>
        </div>

        {/* Sub-menu Bidang Diagonal */}
        {showDiagonalPlanes && (
          <div className="ml-6 space-y-3 animate-in fade-in slide-in-from-top duration-200">
            <div className="flex items-center justify-between p-2 bg-slate-40 rounded-lg hover:bg-slate-50 transition-colors">
              <Label className="text-xs cursor-pointer">Bidang ABGH</Label>
              <Switch
                checked={toggles.diagonalPlaneABGH}
                onCheckedChange={() => onToggleChange('diagonalPlaneABGH')}
                className="scale-75"
              />
            </div>

            <div className="flex items-center justify-between p-2 bg-slate-40 rounded-lg hover:bg-slate-50 transition-colors">
              <Label className="text-xs cursor-pointer">Bidang DCEF</Label>
              <Switch
                checked={toggles.diagonalPlaneDCEF}
                onCheckedChange={() => onToggleChange('diagonalPlaneDCEF')}
                className="scale-75"
              />
            </div>

            <div className="flex items-center justify-between p-2 bg-slate-40 rounded-lg hover:bg-slate-50 transition-colors">
              <Label className="text-xs cursor-pointer">Bidang DBFH</Label>
              <Switch
                checked={toggles.diagonalPlaneDBFH}
                onCheckedChange={() => onToggleChange('diagonalPlaneDBFH')}
                className="scale-75"
              />
            </div>

            <div className="flex items-center justify-between p-2 bg-slate-40 rounded-lg hover:bg-slate-50 transition-colors">
              <Label className="text-xs cursor-pointer">Bidang ACGE</Label>
              <Switch
                checked={toggles.diagonalPlaneACGE}
                onCheckedChange={() => onToggleChange('diagonalPlaneACGE')}
                className="scale-75"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}