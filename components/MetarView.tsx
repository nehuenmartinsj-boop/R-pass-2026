
import React, { useState } from 'react';
import { MATERIAL_ICONS } from '../constants';

const MetarView: React.FC = () => {
  const [metar, setMetar] = useState('SCEL 121800Z 25015KT 9999 FEW030 22/10 Q1013');
  const [isDecoded, setIsDecoded] = useState(false);

  return (
    <div className="animate-fade-in p-4 space-y-6">
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-bold tracking-tight">Interpretador METAR</h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-bold text-slate-500 uppercase tracking-widest ml-1">Reporte Bruto</label>
        </div>
        
        <textarea 
          value={metar}
          onChange={(e) => setMetar(e.target.value)}
          className="w-full h-24 glass rounded-2xl p-4 font-mono text-sm leading-relaxed focus:ring-1 focus:ring-primary outline-none border-none resize-none"
          placeholder="Ingrese código METAR..."
        />

        <button 
          onClick={() => setIsDecoded(true)}
          className="w-full bg-primary py-4 rounded-2xl font-bold text-white shadow-lg shadow-primary/20 flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined">auto_fix_high</span>
          Decodificar Reporte
        </button>
      </div>

      {isDecoded && (
        <div className="space-y-3 pb-24">
          <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2 ml-1">Análisis Educativo</h3>
          
          {/* Viento */}
          <div className="glass p-4 rounded-2xl border-l-4 border-l-primary flex gap-4">
            <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined">air</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-0.5">
                <span className="font-bold text-xs">Viento</span>
                <span className="bg-white/5 px-2 py-0.5 rounded text-[9px] font-mono">25015KT</span>
              </div>
              <p className="text-sm font-semibold text-white/90">250° a 15 nudos</p>
            </div>
          </div>

          {/* Visibilidad */}
          <div className="glass p-4 rounded-2xl border-l-4 border-l-emerald-500 flex gap-4">
            <div className="size-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
              <span className="material-symbols-outlined">visibility</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-0.5">
                <span className="font-bold text-xs">Visibilidad</span>
                <span className="bg-white/5 px-2 py-0.5 rounded text-[9px] font-mono">9999</span>
              </div>
              <p className="text-sm font-semibold text-white/90">Mayor a 10 km (Ilimitada)</p>
            </div>
          </div>

          {/* Nubosidad */}
          <div className="glass p-4 rounded-2xl border-l-4 border-l-blue-400 flex gap-4">
            <div className="size-10 rounded-full bg-blue-400/10 flex items-center justify-center text-blue-400 shrink-0">
              <span className="material-symbols-outlined">cloud</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-0.5">
                <span className="font-bold text-xs">Nubosidad</span>
                <span className="bg-white/5 px-2 py-0.5 rounded text-[9px] font-mono">FEW030</span>
              </div>
              <p className="text-sm font-semibold text-white/90">Pocas nubes a 3,000 ft</p>
            </div>
          </div>

          {/* Temperatura */}
          <div className="glass p-4 rounded-2xl border-l-4 border-l-orange-400 flex gap-4">
            <div className="size-10 rounded-full bg-orange-400/10 flex items-center justify-center text-orange-400 shrink-0">
              <span className="material-symbols-outlined">thermostat</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-0.5">
                <span className="font-bold text-xs">Temp / Rocío</span>
                <span className="bg-white/5 px-2 py-0.5 rounded text-[9px] font-mono">22/10</span>
              </div>
              <p className="text-sm font-semibold text-white/90">22°C (Rocío: 10°C)</p>
            </div>
          </div>

          {/* QNH */}
          <div className="glass p-4 rounded-2xl border-l-4 border-l-purple-400 flex gap-4">
            <div className="size-10 rounded-full bg-purple-400/10 flex items-center justify-center text-purple-400 shrink-0">
              <span className="material-symbols-outlined">compress</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-0.5">
                <span className="font-bold text-xs">Altímetro (QNH)</span>
                <span className="bg-white/5 px-2 py-0.5 rounded text-[9px] font-mono">Q1013</span>
              </div>
              <p className="text-sm font-semibold text-white/90">1013 hPa (Estandar)</p>
            </div>
          </div>

          <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 flex gap-3">
             <span className="material-symbols-outlined text-primary shrink-0">school</span>
             <p className="text-[11px] leading-snug italic">
               Nota: Los datos meteorológicos reales pueden variar. Siempre consulte fuentes oficiales de la DGAC antes de volar.
             </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MetarView;
