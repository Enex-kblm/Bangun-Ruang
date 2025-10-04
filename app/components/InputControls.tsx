// components/InputControls.tsx
'use client';

import { ToggleState } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { RotateCcw, Eye, EyeOff, ChevronDown, ChevronRight, Palette } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { cn } from '@/lib/utils';

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

  // Animasi untuk sub-menu
  const subMenuAnimation = "transition-all duration-300 ease-in-out overflow-hidden";
  const chevronAnimation = "transition-transform duration-300 ease-in-out";

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
          className="gap-2 hover:bg-slate-100 transition-all duration-200 active:scale-95"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </Button>
      </div>

      <div className="space-y-4">
        {/* Transparansi */}
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-all duration-200">
          <div className="flex items-center gap-2">
            {toggles.transparency ? (
              <Eye className="w-4 h-4 text-slate-600 transition-all duration-300" />
            ) : (
              <EyeOff className="w-4 h-4 text-slate-600 transition-all duration-300" />
            )}
            <Label className="text-sm cursor-pointer transition-colors duration-200">Transparansi</Label>
          </div>
          <Switch
            checked={toggles.transparency}
            onCheckedChange={() => onToggleChange('transparency')}
            className="transition-all duration-200"
          />
        </div>

        <div className={cn(
          subMenuAnimation,
          toggles.transparency ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
        )}>
          <div className="pl-6 pr-2 pt-2">
            <Label className="text-xs text-slate-600 transition-colors duration-200">
              Tingkat Transparansi: {Math.round(opacity * 100)}%
            </Label>
            <Slider
              min={5}
              max={50}
              step={1}
              value={[opacity * 100]}
              onValueChange={(value) => onOpacityChange(value[0] / 100)}
              className="w-full transition-all duration-200"
            />
          </div>
        </div>

        {/* Custom Warna Garis */}
        <div 
          className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-all duration-200 cursor-pointer"
          onClick={() => setShowColorPickers(!showColorPickers)}
        >
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-slate-600 transition-all duration-300" />
            <Label className="text-sm cursor-pointer transition-colors duration-200">Custom Warna Garis</Label>
          </div>
          <button className="p-1 hover:bg-slate-200 rounded transition-all duration-200">
            <ChevronDown 
              className={cn(
                chevronAnimation,
                showColorPickers ? "rotate-0" : "-rotate-90"
              )} 
            />
          </button>
        </div>

        <div className={cn(
          subMenuAnimation,
          showColorPickers ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}>
          <div className="ml-6 space-y-4 pt-2">
            {/* Warna Diagonal Ruang */}
            <div className="space-y-2 transition-all duration-300">
              <Label className="text-xs text-slate-600 flex items-center gap-2 transition-colors duration-200">
                <div 
                  className="w-3 h-3 rounded border border-slate-300 transition-all duration-300"
                  style={{ backgroundColor: colors.spaceDiagonal }}
                />
                Diagonal Ruang
              </Label>
              <div className="flex gap-2">
                {colorPresets.spaceDiagonal.map((color) => (
                  <button
                    key={color}
                    onClick={() => onColorChange('spaceDiagonal', color)}
                    className={cn(
                      "w-6 h-6 rounded border-2 transition-all duration-300 hover:scale-110 active:scale-95",
                      colors.spaceDiagonal === color ? 'border-slate-800 scale-110' : 'border-slate-300 hover:border-slate-500'
                    )}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
                <input
                  type="color"
                  value={colors.spaceDiagonal}
                  onChange={(e) => onColorChange('spaceDiagonal', e.target.value)}
                  className="w-6 h-6 rounded border border-slate-300 cursor-pointer transition-all duration-300 hover:scale-110"
                />
              </div>
            </div>

            {/* Warna Diagonal Bidang */}
            <div className="space-y-2 transition-all duration-300">
              <Label className="text-xs text-slate-600 flex items-center gap-2 transition-colors duration-200">
                <div 
                  className="w-3 h-3 rounded border border-slate-300 transition-all duration-300"
                  style={{ backgroundColor: colors.faceDiagonal }}
                />
                Diagonal Bidang
              </Label>
              <div className="flex gap-2">
                {colorPresets.faceDiagonal.map((color) => (
                  <button
                    key={color}
                    onClick={() => onColorChange('faceDiagonal', color)}
                    className={cn(
                      "w-6 h-6 rounded border-2 transition-all duration-300 hover:scale-110 active:scale-95",
                      colors.faceDiagonal === color ? 'border-slate-800 scale-110' : 'border-slate-300 hover:border-slate-500'
                    )}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
                <input
                  type="color"
                  value={colors.faceDiagonal}
                  onChange={(e) => onColorChange('faceDiagonal', e.target.value)}
                  className="w-6 h-6 rounded border border-slate-300 cursor-pointer transition-all duration-300 hover:scale-110"
                />
              </div>
            </div>

            {/* Warna Bidang Diagonal */}
            <div className="space-y-2 transition-all duration-300">
              <Label className="text-xs text-slate-600 flex items-center gap-2 transition-colors duration-200">
                <div 
                  className="w-3 h-3 rounded border border-slate-300 transition-all duration-300"
                  style={{ backgroundColor: colors.diagonalPlane }}
                />
                Bidang Diagonal
              </Label>
              <div className="flex gap-2">
                {colorPresets.diagonalPlane.map((color) => (
                  <button
                    key={color}
                    onClick={() => onColorChange('diagonalPlane', color)}
                    className={cn(
                      "w-6 h-6 rounded border-2 transition-all duration-300 hover:scale-110 active:scale-95",
                      colors.diagonalPlane === color ? 'border-slate-800 scale-110' : 'border-slate-300 hover:border-slate-500'
                    )}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
                <input
                  type="color"
                  value={colors.diagonalPlane}
                  onChange={(e) => onColorChange('diagonalPlane', e.target.value)}
                  className="w-6 h-6 rounded border border-slate-300 cursor-pointer transition-all duration-300 hover:scale-110"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Diagonal Ruang - Main Toggle */}
        <div 
          className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-all duration-200 cursor-pointer"
          onClick={() => setShowSpaceDiagonals(!showSpaceDiagonals)}
        >
          <div className="flex items-center gap-2">
            <button className="p-1 hover:bg-slate-200 rounded transition-all duration-200">
              <ChevronDown 
                className={cn(
                  chevronAnimation,
                  showSpaceDiagonals ? "rotate-0" : "-rotate-90"
                )} 
              />
            </button>
            <Label className="text-sm cursor-pointer transition-colors duration-200">Diagonal Ruang</Label>
          </div>
        </div>

        {/* Sub-menu Diagonal Ruang */}
        <div className={cn(
          subMenuAnimation,
          showSpaceDiagonals ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        )}>
          <div className="ml-6 space-y-3 pt-2">
            <div className="grid grid-cols-2 gap-2">
              {[
                { key: 'spaceDiagonalAE' as keyof ToggleState, label: 'A-G' },
                { key: 'spaceDiagonalBF' as keyof ToggleState, label: 'B-H' },
                { key: 'spaceDiagonalCG' as keyof ToggleState, label: 'C-E' },
                { key: 'spaceDiagonalDH' as keyof ToggleState, label: 'D-F' },
              ].map(({ key, label }) => (
                <div 
                  key={key}
                  className="flex items-center justify-between p-2 bg-slate-40 rounded-lg hover:bg-slate-50 transition-all duration-200"
                >
                  <Label className="text-xs cursor-pointer transition-colors duration-200">{label}</Label>
                  <Switch
                    checked={toggles[key]}
                    onCheckedChange={() => onToggleChange(key)}
                    className="scale-75 transition-all duration-200"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Diagonal Bidang - Main Toggle */}
        <div 
          className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-all duration-200 cursor-pointer"
          onClick={() => setShowFaceDiagonals(!showFaceDiagonals)}
        >
          <div className="flex items-center gap-2">
            <button className="p-1 hover:bg-slate-200 rounded transition-all duration-200">
              <ChevronDown 
                className={cn(
                  chevronAnimation,
                  showFaceDiagonals ? "rotate-0" : "-rotate-90"
                )} 
              />
            </button>
            <Label className="text-sm cursor-pointer transition-colors duration-200">Diagonal Bidang</Label>
          </div>
        </div>

        {/* Sub-menu Diagonal Bidang */}
        <div className={cn(
          subMenuAnimation,
          showFaceDiagonals ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        )}>
          <div className="ml-6 space-y-3 pt-2">
            <div className="grid grid-cols-2 gap-2">
              {[
                { key: 'faceDiagonalAC' as keyof ToggleState, label: 'AC' },
                { key: 'faceDiagonalBD' as keyof ToggleState, label: 'BD' },
                { key: 'faceDiagonalEG' as keyof ToggleState, label: 'EG' },
                { key: 'faceDiagonalFH' as keyof ToggleState, label: 'FH' },
                { key: 'faceDiagonalAF' as keyof ToggleState, label: 'AF' },
                { key: 'faceDiagonalBE' as keyof ToggleState, label: 'BE' },
                { key: 'faceDiagonalDG' as keyof ToggleState, label: 'DG' },
                { key: 'faceDiagonalCH' as keyof ToggleState, label: 'CH' },
                { key: 'faceDiagonalBG' as keyof ToggleState, label: 'BG' },
                { key: 'faceDiagonalCF' as keyof ToggleState, label: 'CF' },
                { key: 'faceDiagonalAH' as keyof ToggleState, label: 'AH' },
                { key: 'faceDiagonalDE' as keyof ToggleState, label: 'DE' },
              ].map(({ key, label }) => (
                <div 
                  key={key}
                  className="flex items-center justify-between p-2 bg-slate-40 rounded-lg hover:bg-slate-50 transition-all duration-200"
                >
                  <Label className="text-xs cursor-pointer transition-colors duration-200">{label}</Label>
                  <Switch
                    checked={toggles[key]}
                    onCheckedChange={() => onToggleChange(key)}
                    className="scale-75 transition-all duration-200"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bidang Diagonal - Main Toggle */}
        <div 
          className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-all duration-200 cursor-pointer"
          onClick={() => setShowDiagonalPlanes(!showDiagonalPlanes)}
        >
          <div className="flex items-center gap-2">
            <button className="p-1 hover:bg-slate-200 rounded transition-all duration-200">
              <ChevronDown 
                className={cn(
                  chevronAnimation,
                  showDiagonalPlanes ? "rotate-0" : "-rotate-90"
                )} 
              />
            </button>
            <Label className="text-sm cursor-pointer transition-colors duration-200">Bidang Diagonal</Label>
          </div>
        </div>

        {/* Sub-menu Bidang Diagonal */}
        <div className={cn(
          subMenuAnimation,
          showDiagonalPlanes ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        )}>
          <div className="ml-6 space-y-3 pt-2">
            {[
              { key: 'diagonalPlaneABGH' as keyof ToggleState, label: 'Bidang ABGH' },
              { key: 'diagonalPlaneDCEF' as keyof ToggleState, label: 'Bidang DCEF' },
              { key: 'diagonalPlaneDBFH' as keyof ToggleState, label: 'Bidang DBFH' },
              { key: 'diagonalPlaneACGE' as keyof ToggleState, label: 'Bidang ACGE' },
            ].map(({ key, label }) => (
              <div 
                key={key}
                className="flex items-center justify-between p-2 bg-slate-40 rounded-lg hover:bg-slate-50 transition-all duration-200"
              >
                <Label className="text-xs cursor-pointer transition-colors duration-200">{label}</Label>
                <Switch
                  checked={toggles[key]}
                  onCheckedChange={() => onToggleChange(key)}
                  className="scale-75 transition-all duration-200"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}