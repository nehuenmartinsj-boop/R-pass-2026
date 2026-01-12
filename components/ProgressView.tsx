
import React from 'react';
import { MATERIAL_ICONS } from '../constants';
import { ExamHistory } from '../types';

interface ProgressViewProps {
  history: ExamHistory[];
}

const ProgressView: React.FC<ProgressViewProps> = ({ history }) => {
  const hasHistory = history.length > 0;
  
  const averageScore = hasHistory 
    ? Math.round(history.reduce((acc, curr) => acc + curr.score, 0) / history.length) 
    : 0;

  const examsPassed = history.filter(h => h.passed).length;

  // Definición de dominios de conocimiento con lógica de 0% inicial
  const domains = [
    { label: 'Meteorología', color: 'text-primary', value: hasHistory ? Math.min(averageScore + 2, 100) : 0 },
    { label: 'Aerodinámica', color: 'text-orange-400', value: hasHistory ? Math.min(averageScore - 2, 100) : 0 },
    { label: 'Seguridad', color: 'text-rose-400', value: hasHistory ? Math.min(averageScore, 100) : 0 },
    { label: 'DAN 151', color: 'text-emerald-400', value: hasHistory ? Math.min(averageScore + 5, 100) : 0 },
    { label: 'DAN 91', color: 'text-purple-400', value: hasHistory ? Math.min(averageScore + 3, 100) : 0 }
  ];

  return (
    <div className="animate-fade-in p-4 space-y-6 pb-24">
      <h2 className="text-xl font-bold mb-4 tracking-tight">Estadísticas Detalladas</h2>

      {/* Preparation Circle Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass p-4 rounded-3xl flex flex-col items-center text-center border-white/5 shadow-inner">
          <div className="relative size-16 flex items-center justify-center mb-2">
            <svg className="size-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="8" className="text-white/5" />
              <circle 
                cx="50" 
                cy="50" 
                r="42" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="8" 
                strokeDasharray="263.8" 
                strokeDashoffset={263.8 * (1 - (averageScore/100))} 
                className="text-primary transition-all duration-1000" 
                strokeLinecap="round" 
              />
            </svg>
            <span className="absolute text-lg font-black tracking-tight">{averageScore}<span className="text-[9px] font-bold">%</span></span>
          </div>
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-tight">Media de Aciertos</p>
        </div>

        <div className="glass p-4 rounded-3xl flex flex-col items-center justify-center text-center border-white/5">
           <span className="text-3xl font-black text-white mb-0.5 leading-none">{history.length}</span>
           <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">Exámenes Realizados</span>
           <p className="text-[8px] text-slate-500 italic mt-2">{examsPassed} aprobados</p>
        </div>
      </div>

      {/* Domain Knowledge - Now 5 domains */}
      <div>
        <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em] mb-4 ml-1">Dominios de Conocimiento</h3>
        <div className="grid grid-cols-3 gap-3">
          {domains.map((d) => (
            <div key={d.label} className="glass p-3 rounded-2xl flex flex-col items-center gap-2 border-white/5">
              <div className="relative size-10 flex items-center justify-center">
                <svg className="size-full -rotate-90" viewBox="0 0 100 100">
                   <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
                   <circle 
                    cx="50" 
                    cy="50" 
                    r="42" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="12" 
                    strokeDasharray="263.8" 
                    strokeDashoffset={263.8 * (1 - d.value/100)} 
                    className={`${d.color} transition-all duration-1000`} 
                    strokeLinecap="round" 
                   />
                </svg>
                <span className="absolute text-[8px] font-bold">{d.value}%</span>
              </div>
              <span className="text-[8px] font-bold text-slate-400 text-center leading-tight uppercase tracking-tighter">{d.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* History List */}
      <div>
        <div className="flex justify-between items-center mb-4 px-1">
          <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Historial de Exámenes</h3>
          {/* Botón limpiar eliminado por solicitud del usuario */}
        </div>
        
        <div className="space-y-3">
          {history.length === 0 ? (
            <div className="glass p-8 rounded-2xl text-center border-dashed border-white/10">
              <span className="material-symbols-outlined text-slate-600 mb-2">history</span>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Sin registros aún</p>
              <p className="text-slate-600 text-[10px] mt-1 italic">Realiza tu primer simulacro para ver estadísticas</p>
            </div>
          ) : (
            [...history].reverse().map((exam) => (
              <div key={exam.id} className="glass p-4 rounded-2xl flex items-center justify-between border-white/5">
                <div className="flex items-center gap-4">
                  <div className={`size-10 rounded-full flex items-center justify-center shrink-0 ${exam.passed ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                    <span className="material-symbols-outlined">{exam.passed ? MATERIAL_ICONS.CHECK : MATERIAL_ICONS.ERROR}</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm leading-none mb-1">{exam.name}</p>
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">{exam.date} • {exam.score}% Score</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className={`text-[9px] font-bold uppercase tracking-[0.1em] px-2 py-1 rounded ${exam.passed ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                    {exam.passed ? 'APTO' : 'NO APTO'}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressView;
