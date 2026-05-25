export interface Flashcard {
  id: string;
  word: string;
  translation: string;
  category: 'illness' | 'medical-item' | 'ride' | 'food' | 'feeling' | 'activity';
  example: string;
  unit: 7 | 8;
  imageUrl?: string;
}

export interface MatchPair {
  id: string;
  sentence: string;
  purpose: string;
  verb: string;
}

export interface PrepositionQuestion {
  id: string;
  feeling: string;
  correctPreposition: 'in' | 'of' | 'about';
  example: string;
}

export interface SentenceArrangeQuestion {
  id: string;
  scrambled: string[];
  correct: string;
}

export type QuestionCategory = 
  | 'reading-clinic' 
  | 'grammar-mcq-1' 
  | 'reading-lost' 
  | 'grammar-mcq-2' 
  | 'true-false-medical' 
  | 'fill-preposition' 
  | 'arrange-sentence';

export interface SATQuestion {
  id: number;
  number: number;
  category: QuestionCategory;
  question: string;
  options?: string[]; // Multiple choice options
  correctAnswer: string | boolean; // Option text or true/false
  explanation: string;
  hint: string;
}

export interface StudentProgress {
  unit7VocabReviewed: string[]; // Set of Flashcard IDs
  unit8VocabReviewed: string[]; // Set of Flashcard IDs
  grammarAccuracy: { [key: string]: number }; // Practice category -> percentage
  mockExamScore: number | null;
  mockExamCompleted: boolean;
  gamesPlayed: string[]; // Set of game keys
  unlockedBadges: string[];
}

export interface ClassroomScores {
  teamA: number;
  teamB: number;
}
