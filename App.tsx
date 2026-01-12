
import React, { useState, useEffect } from 'react';
import { AppView, ExamHistory } from './types';
import Navigation from './components/Navigation';
import HomeView from './components/HomeView';
import MetarView from './components/MetarView';
import ProgressView from './components/ProgressView';
import QuizSession from './components/QuizSession';

const STORAGE_KEY = 'rpas_history';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [quizConfig, setQuizConfig] = useState<{ active: boolean; count: number }>({ active: false, count: 35 });
  const [history, setHistory] = useState<ExamHistory[]>([]);

  // Cargar historial al inicio
  useEffect(() => {
    const savedHistory = localStorage.getItem(STORAGE_KEY);
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Error loading history", e);
      }
    }
  }, []);

  const saveExamResult = (result: Omit<ExamHistory, 'id' | 'date'>) => {
    const newEntry: ExamHistory = {
      ...result,
      id: crypto.randomUUID(),
      date: new Date().toLocaleDateString('es-CL', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    
    const updatedHistory = [...history, newEntry];
    setHistory(updatedHistory);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
  };

  const startQuiz = (mode: 'fast' | 'official') => {
    setQuizConfig({
      active: true,
      count: mode === 'fast' ? 15 : 35
    });
  };

  // Render view based on state
  const renderView = () => {
    switch (currentView) {
      case AppView.HOME:
        return <HomeView onStartQuiz={startQuiz} />;
      case AppView.METAR:
        return <MetarView />;
      case AppView.PROGRESS:
        return <ProgressView history={history} />;
      default:
        return <HomeView onStartQuiz={startQuiz} />;
    }
  };

  return (
    <div className="min-h-screen max-w-lg mx-auto bg-dark text-slate-100 flex flex-col relative shadow-2xl overflow-hidden">
      {/* App content */}
      <div className="flex-1 pb-24 overflow-y-auto hide-scrollbar">
        {renderView()}
      </div>

      {/* Footer Navigation */}
      {!quizConfig.active && (
        <Navigation 
          currentView={currentView} 
          onViewChange={setCurrentView} 
        />
      )}

      {/* Floating Action Button */}
      {!quizConfig.active && currentView === AppView.HOME && (
        <button 
          className="fixed bottom-28 right-6 size-14 bg-primary rounded-full shadow-2xl shadow-primary/40 flex items-center justify-center text-white z-40 active:scale-90 transition-transform"
          onClick={() => startQuiz('official')}
        >
          <span className="material-symbols-outlined text-3xl">add</span>
        </button>
      )}

      {/* Modals & Fullscreen Overlays */}
      {quizConfig.active && (
        <QuizSession 
          questionCount={quizConfig.count} 
          onClose={() => setQuizConfig({ ...quizConfig, active: false })} 
          onFinish={saveExamResult}
        />
      )}
    </div>
  );
};

export default App;
