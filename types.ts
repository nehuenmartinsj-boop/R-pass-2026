
export enum AppView {
  HOME = 'home',
  PROGRESS = 'progress',
  QUIZ = 'quiz',
  METAR = 'metar',
  SETTINGS = 'settings'
}

export interface QuizQuestion {
  id: string;
  category: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ExamHistory {
  id: string;
  name: string;
  date: string;
  score: number;
  totalQuestions: number;
  passed: boolean;
  type: 'fast' | 'official';
}

export interface MetarData {
  raw: string;
  wind?: string;
  visibility?: string;
  clouds?: string;
  temp?: string;
  qnh?: string;
}
