
import React from 'react';
import { MATERIAL_ICONS } from '../constants';

interface HomeViewProps {
  onStartQuiz: (mode: 'fast' | 'official') => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onStartQuiz }) => {
  return (
    <div className="animate-fade-in p-4 space-y-6">
      {/* Header Profile */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="size-11 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
            <span className="material-symbols-outlined text-white">flight_takeoff</span>
          </div>
          <div>
            <h1 className="text-xl font-bold leading-none tracking-tight">R-Pass</h1>
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mt-1">RPAS Preparación</p>
          </div>
        </div>
        {/* Campanita eliminada por solicitud del usuario */}
      </div>

      {/* Hero Card - Cleaned Up */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-blue-600 to-blue-800 p-6 shadow-xl shadow-primary/20">
        <div className="absolute -right-8 -top-8 size-48 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <span className="inline-block px-2.5 py-1 rounded-full bg-white/20 text-[10px] font-bold text-white uppercase mb-3 tracking-wider">Dashboard Académico</span>
          <h2 className="text-2xl font-extrabold text-white mb-1">Certificación Operador</h2>
          <p className="text-blue-100 text-sm opacity-90">Prepárate con estándares actualizados 2024.</p>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass rounded-2xl p-4 flex flex-col justify-between">
          <div>
            <p className="text-slate-500 text-[11px] font-bold uppercase tracking-wider mb-1">Último Puntaje</p>
            <p className="text-3xl font-bold">85%</p>
          </div>
          <div className="mt-2 flex items-center gap-1 text-emerald-500 text-xs font-bold">
            <span className="material-symbols-outlined text-sm">trending_up</span>
            <span>+5% mejoría</span>
          </div>
        </div>
        <div className="glass rounded-2xl p-4 flex flex-col justify-between">
          <div>
            <p className="text-slate-500 text-[11px] font-bold uppercase tracking-wider mb-1">Total Intentos</p>
            <p className="text-3xl font-bold">12</p>
          </div>
          <div className="mt-2 flex items-center gap-1 text-primary text-xs font-bold">
            <span className="material-symbols-outlined text-sm">history</span>
            <span>1 realizado hoy</span>
          </div>
        </div>
      </div>

      {/* Simulation Options */}
      <div>
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">play_circle</span>
          Modos de Estudio
        </h3>
        <div className="space-y-3">
          <button onClick={() => onStartQuiz('fast')} className="w-full flex items-center justify-between px-5 py-4 glass rounded-2xl group active:scale-[0.98] transition-transform">
            <div className="flex items-center gap-4">
              <div className="size-10 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <span className="material-symbols-outlined">bolt</span>
              </div>
              <div className="text-left">
                <p className="font-bold">Modo Rápido</p>
                <p className="text-xs text-slate-500">15 preguntas aleatorias</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">chevron_right</span>
          </button>

          <button onClick={() => onStartQuiz('official')} className="w-full flex items-center justify-between px-5 py-4 bg-primary text-white rounded-2xl shadow-lg shadow-primary/30 active:scale-[0.98] transition-transform">
            <div className="flex items-center gap-4">
              <div className="size-10 rounded-full bg-white/20 text-white flex items-center justify-center">
                <span className="material-symbols-outlined">equalizer</span>
              </div>
              <div className="text-left">
                <p className="font-bold">Simulacro Oficial</p>
                <p className="text-xs text-blue-100/80">35 preguntas • Estándar Oficial</p>
              </div>
            </div>
            <span className="material-symbols-outlined">play_arrow</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
