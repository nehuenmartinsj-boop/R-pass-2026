
import React, { useState, useEffect } from 'react';
import { BANCO_PREGUNTAS_REALES, MATERIAL_ICONS } from '../constants';
import { QuizQuestion, ExamHistory } from '../types';

interface QuizSessionProps {
  onClose: () => void;
  onFinish: (result: Omit<ExamHistory, 'id' | 'date'>) => void;
  questionCount: number;
}

const QuizSession: React.FC<QuizSessionProps> = ({ onClose, onFinish, questionCount }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(questionCount === 15 ? 900 : 2100); 
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const shuffled = [...BANCO_PREGUNTAS_REALES]
      .sort(() => Math.random() - 0.5)
      .slice(0, questionCount);
    setQuestions(shuffled);
  }, [questionCount]);

  useEffect(() => {
    if (isFinished) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isFinished]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const question = questions[currentIdx];

  const handleSelect = (idx: number) => {
    if (showFeedback) return;
    setSelectedIdx(idx);
  };

  const handleNext = () => {
    if (!showFeedback) {
      if (selectedIdx === question.correctIndex) {
        setScore(s => s + 1);
      }
      setShowFeedback(true);
    } else {
      if (currentIdx < questions.length - 1) {
        setShowFeedback(false);
        setSelectedIdx(null);
        setCurrentIdx((prev) => prev + 1);
      } else {
        const finalPercent = Math.round((score / questions.length) * 100);
        onFinish({
          name: questionCount === 15 ? 'Modo Rápido' : 'Simulacro Oficial',
          score: finalPercent,
          totalQuestions: questions.length,
          passed: finalPercent >= 75,
          type: questionCount === 15 ? 'fast' : 'official'
        });
        setIsFinished(true);
      }
    }
  };

  if (!questions.length) return null;

  if (isFinished) {
    const finalPercent = Math.round((score / questions.length) * 100);
    const passed = finalPercent >= 75;

    return (
      <div className="fixed inset-0 z-[100] bg-dark flex flex-col items-center justify-center p-6 animate-fade-in">
        <div className="glass p-8 rounded-[40px] w-full max-w-sm text-center border-white/10 shadow-2xl">
          <div className={`size-24 rounded-full mx-auto mb-6 flex items-center justify-center ${passed ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
            <span className="material-symbols-outlined text-5xl">{passed ? 'check_circle' : 'error'}</span>
          </div>
          <h2 className="text-3xl font-black mb-2">{passed ? '¡Aprobado!' : 'Reprobado'}</h2>
          <p className="text-slate-400 text-sm mb-6">Obtuviste un {finalPercent}% de aciertos en este simulacro.</p>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white/5 p-4 rounded-3xl">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Correctas</p>
              <p className="text-2xl font-bold">{score}</p>
            </div>
            <div className="bg-white/5 p-4 rounded-3xl">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Total</p>
              <p className="text-2xl font-bold">{questions.length}</p>
            </div>
          </div>

          <button onClick={onClose} className="w-full bg-primary py-4 rounded-2xl font-bold text-white shadow-xl shadow-primary/20 active:scale-95 transition-transform">
            Volver al Inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-dark flex flex-col animate-fade-in">
      <header className="p-4 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="size-10 rounded-full flex items-center justify-center hover:bg-white/5">
            <span className="material-symbols-outlined">close</span>
          </button>
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">
              {questionCount === 15 ? 'Modo Rápido' : 'Simulacro Oficial'}
            </p>
            <h2 className="text-sm font-bold">R-Pass Prep</h2>
          </div>
        </div>
        <div className="bg-primary/20 text-primary px-3 py-1.5 rounded-full border border-primary/30 flex items-center gap-1.5">
          <span className="material-symbols-outlined text-sm">{MATERIAL_ICONS.TIMER}</span>
          <span className="text-sm font-mono font-bold">{formatTime(timeLeft)}</span>
        </div>
      </header>

      <div className="px-6 py-4">
        <div className="flex justify-between items-end mb-2">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Pregunta actual</span>
          <span className="text-lg font-black">{currentIdx + 1} <span className="text-xs font-medium text-slate-500">/ {questions.length}</span></span>
        </div>
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500" 
            style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <main className="flex-1 px-4 py-4 overflow-y-auto space-y-6">
        <div className="glass p-6 rounded-3xl shadow-2xl relative border-white/5">
          <span className="inline-block px-2 py-1 rounded bg-primary/20 text-primary text-[9px] font-bold uppercase tracking-widest mb-4">
            {question.category}
          </span>
          <h3 className="text-xl font-bold leading-tight tracking-tight text-white/90">
            {question.text}
          </h3>
        </div>

        <div className="space-y-3">
          {question.options.map((option, idx) => {
            let stateClass = "glass border-white/5";
            if (showFeedback) {
              if (idx === question.correctIndex) stateClass = "border-emerald-500/50 bg-emerald-500/10 text-emerald-400";
              else if (idx === selectedIdx) stateClass = "border-rose-500/50 bg-rose-500/10 text-rose-400";
            } else if (selectedIdx === idx) {
              stateClass = "border-primary/50 bg-primary/10";
            }

            return (
              <button 
                key={idx}
                disabled={showFeedback}
                onClick={() => handleSelect(idx)}
                className={`w-full p-4 rounded-2xl border flex items-center gap-4 transition-all text-left ${stateClass}`}
              >
                <div className={`size-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  (showFeedback && idx === question.correctIndex) || (!showFeedback && selectedIdx === idx) 
                    ? 'border-primary' : 'border-white/10'
                }`}>
                  {((showFeedback && idx === question.correctIndex) || (!showFeedback && selectedIdx === idx)) && (
                    <div className="size-2.5 rounded-full bg-primary" />
                  )}
                </div>
                <span className="text-sm font-medium">{option}</span>
              </button>
            );
          })}
        </div>

        {showFeedback && (
          <div className="animate-fade-in glass p-5 rounded-3xl border-emerald-500/20 bg-emerald-500/5">
            <div className="flex items-start gap-4">
              <div className="size-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                <span className="material-symbols-outlined">lightbulb</span>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Explicación Oficial</p>
                <p className="text-xs text-slate-300 leading-relaxed italic">{question.explanation}</p>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="p-6 pt-2 pb-10 flex gap-4 border-t border-white/5 bg-dark">
        <button 
          disabled={selectedIdx === null}
          onClick={handleNext}
          className={`w-full py-4 rounded-2xl font-bold text-white shadow-xl shadow-primary/20 active:scale-95 transition-transform ${
            selectedIdx === null ? 'bg-slate-700 opacity-50' : 'bg-primary'
          }`}
        >
          {showFeedback ? (currentIdx === questions.length - 1 ? 'Finalizar Examen' : 'Siguiente Pregunta') : 'Comprobar'}
        </button>
      </footer>
    </div>
  );
};

export default QuizSession;
