import React, { useState, useEffect } from 'react';
import { StudentProgress, ClassroomScores } from './types';
import Header from './components/Header';
import FlashcardModule from './components/FlashcardModule';
import GrammarPractice from './components/GrammarPractice';
import ClassroomGames from './components/ClassroomGames';
import SATMockExam from './components/SATMockExam';
import ProgressTracker from './components/ProgressTracker';
import { sound } from './components/SoundManager';
import { FLASHCARDS } from './data/reviewData';
import { 
  ClipboardList, 
  Target, 
  Activity, 
  Sparkles, 
  HelpCircle, 
  Compass, 
  HeartPulse, 
  Gamepad2, 
  GraduationCap, 
  Users, 
  Trophy, 
  Layers, 
  CheckCircle, 
  AlertCircle 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const INITIAL_PROGRESS: StudentProgress = {
  unit7VocabReviewed: [],
  unit8VocabReviewed: [],
  grammarAccuracy: {},
  mockExamScore: null,
  mockExamCompleted: false,
  gamesPlayed: [],
  unlockedBadges: []
};

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isTeacherMode, setIsTeacherMode] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  
  // Aura Mode state
  const [genAlphaMode, setGenAlphaMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('tunas_iblam_alpha_mode');
      return saved === 'true';
    } catch {
      return false;
    }
  });
  
  // Progress tracker backed by localStorage
  const [progress, setProgress] = useState<StudentProgress>(() => {
    try {
      const saved = localStorage.getItem('tunas_iblam_review_progress');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('LocalStorage load failed', e);
    }
    return INITIAL_PROGRESS;
  });

  // Classroom team scores for presentation
  const [teamScores, setTeamScores] = useState<ClassroomScores>({ teamA: 0, teamB: 0 });

  // Header collapsed/expanded state for presentation view size
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState<boolean>(() => {
    try {
      return localStorage.getItem('tunas_iblam_header_collapsed') === 'true';
    } catch {
      return false;
    }
  });

  // Sync state to local storage
  useEffect(() => {
    try {
      localStorage.setItem('tunas_iblam_review_progress', JSON.stringify(progress));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [progress]);

  useEffect(() => {
    try {
      localStorage.setItem('tunas_iblam_alpha_mode', String(genAlphaMode));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [genAlphaMode]);

  useEffect(() => {
    try {
      localStorage.setItem('tunas_iblam_header_collapsed', String(isHeaderCollapsed));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [isHeaderCollapsed]);

  const handleMarkReviewed = (cardId: string, unit: 7 | 8, mastered: boolean) => {
    setProgress(prev => {
      const field = unit === 7 ? 'unit7VocabReviewed' : 'unit8VocabReviewed';
      const array = [...prev[field]];
      
      if (mastered) {
        if (!array.includes(cardId)) {
          array.push(cardId);
        }
      } else {
        const index = array.indexOf(cardId);
        if (index > -1) {
          array.splice(index, 1);
        }
      }

      return {
        ...prev,
        [field]: array
      };
    });
  };

  const handleSaveMockScore = (score: number) => {
    setProgress(prev => ({
      ...prev,
      mockExamScore: score,
      mockExamCompleted: true
    }));
  };

  const handleGamePlayed = (gameKey: string) => {
    setProgress(prev => {
      if (!prev.gamesPlayed.includes(gameKey)) {
        return {
          ...prev,
          gamesPlayed: [...prev.gamesPlayed, gameKey]
        };
      }
      return prev;
    });
  };

  const handleResetProgress = () => {
    setProgress(INITIAL_PROGRESS);
    setTeamScores({ teamA: 0, teamB: 0 });
  };

  const handleUpdateAccuracy = (category: string, accuracy: number) => {
    setProgress(prev => ({
      ...prev,
      grammarAccuracy: {
        ...prev.grammarAccuracy,
        [category]: accuracy
      }
    }));
  };

  // Mastery percentage calculation
  const calcMasteryPercentage = () => {
    const total7 = FLASHCARDS.filter(c => c.unit === 7).length;
    const total8 = FLASHCARDS.filter(c => c.unit === 8).length;
    
    const mastered7 = progress.unit7VocabReviewed.length;
    const mastered8 = progress.unit8VocabReviewed.length;

    const vocabPart = ((mastered7 + mastered8) / (total7 + total8)) * 70; // 70% of total
    const examPart = progress.mockExamCompleted ? 30 : (progress.gamesPlayed.length > 0 ? 10 : 0); // 30% of total

    return Math.min(100, Math.round(vocabPart + examPart));
  };

  const masteryPercent = calcMasteryPercentage();

  const agendaItems = [
    {
      id: 'agenda-u7',
      title: 'Unit 7 Review: Health & Medical 🩺',
      desc: 'Master illnesses (sore throat, cholera) and medical equipment (thermometer, bandage).',
      tab: 'flashcards-u7',
      difficulty: 'Grade 4 Core'
    },
    {
      id: 'agenda-u8',
      title: 'Unit 8 Review: Theme Parks & Feelings 🎢',
      desc: 'Study theme park rides, snacking names, and matching preposition pairs.',
      tab: 'flashcards-u8',
      difficulty: 'Grade 4 Core'
    },
    {
      id: 'agenda-grammar',
      title: 'Grammar Labs Focus ⚖️',
      desc: 'Solve Should/Shouldn’t advisors, Infinitive of Purpose, and Past/Present/Future timelines.',
      tab: 'grammar',
      difficulty: 'Grammar Heavy'
    },
    {
      id: 'agenda-games',
      title: 'Play Gamified Classroom Arcades 🎮',
      desc: 'Dodge incorrect buzzer choices in Kahoot, Spin the Wheel, and guess inside Hot Seat!',
      tab: 'arcade',
      difficulty: 'Interactive Practice'
    },
    {
      id: 'agenda-testprep',
      title: 'Final SAT Practice Simulator 📝',
      desc: 'Simulate the exact 40-question mock exam to score an A+ report card before finals!',
      tab: 'mock-sat',
      difficulty: 'Practice SAT Standard'
    }
  ];

  return (
    <div className="min-h-screen bg-amber-50 text-slate-900 font-sans antialiased pb-12 selection:bg-teal-300">
      
      {/* Visual Header */}
      <Header
        isTeacherMode={isTeacherMode}
        setIsTeacherMode={setIsTeacherMode}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        masteryPercentage={masteryPercent}
        genAlphaMode={genAlphaMode}
        setGenAlphaMode={setGenAlphaMode}
        isHeaderCollapsed={isHeaderCollapsed}
        setIsHeaderCollapsed={setIsHeaderCollapsed}
      />

      {/* Main Review Hub tab selector router */}
      <main className="py-6 md:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: DASHBOARD / WELCOME & AGENDA */}
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="space-y-8"
            >
              
              {/* Retro school banner */}
              <div className="bg-indigo-600 text-white rounded-[32px] p-8 relative overflow-hidden border-4 border-slate-900 shadow-[8px_8px_0px_0px_#0f172a]">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                  <span className="text-10xl">🎒</span>
                </div>
                
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div>
                    <span className="text-xs uppercase font-extrabold tracking-widest text-[#facc15] font-mono bg-slate-105 bg-black/35 px-2.5 py-1 rounded border border-slate-900/40">
                      {genAlphaMode ? "🏫 TUNAS IBLAM OHIOLOGY RESEARCH GROUP fr fr" : "TUNAS IBLAM ELEMENTARY SCHOOL"}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-black font-sans tracking-tight text-white mt-3.5 leading-none uppercase">
                      {genAlphaMode ? "⚡ ENGLISH HUB FOR SIGMA ACADEMY 🥦" : "English Review Hub: Units 7 & 8"}
                    </h2>
                    <p className="text-sm text-slate-100 mt-3 max-w-xl leading-relaxed font-medium">
                      {genAlphaMode
                        ? "Prepare for maximum points with 100% aura! Study Unit 7 & 8 with peak rizz. Infinite cooking zone, no cap, real sigmas solo the test! 📈 fr fr"
                        : "Welcome to your high-fidelity classroom study terminal! This environment compiles vocabulary words, grammar, scenarios, and gamified testing modeled nicely after your review materials."}
                    </p>
                  </div>
                  
                  {/* Floating scoreboard scorecard indicator */}
                  {isTeacherMode ? (
                    <div className="bg-white text-slate-950 border-4 border-slate-900 p-5 rounded-2xl md:w-72 shadow-[4px_4px_0px_0px_#0f172a]">
                      <div className="flex items-center justify-between text-xs font-black text-rose-500 mb-3">
                        <span className="uppercase tracking-widest font-mono">CLASS SCOREBOARD</span>
                        <Trophy className="h-4.5 w-4.5 text-rose-500 animate-bounce" />
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="bg-teal-100 border-2 border-slate-900 p-2 rounded-xl">
                          <p className="text-[10px] text-slate-700 font-extrabold uppercase font-mono">TEAM ALPHA</p>
                          <p className="text-2xl font-black text-slate-955 mt-1">{teamScores.teamA}</p>
                        </div>
                        <div className="bg-rose-100 border-2 border-slate-900 p-2 rounded-xl">
                          <p className="text-[10px] text-slate-700 font-extrabold uppercase font-mono">TEAM SIGMA</p>
                          <p className="text-2xl font-black text-slate-955 mt-1">{teamScores.teamB}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-[#fefaf0] text-slate-900 border-4 border-slate-900 p-5 rounded-2xl md:w-72 shadow-[4px_4px_0px_0px_#0f172a]">
                      <div className="flex items-center justify-between text-xs font-bold text-indigo-600 mb-2 font-mono">
                        <span className="uppercase tracking-wider font-extrabold">STUDY REWARD PROGRESS</span>
                        <span className="bg-emerald-400 text-slate-950 px-2 py-0.5 rounded text-[10px] border-2 border-slate-900 font-black">{masteryPercent}%</span>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed font-medium">
                        Complete vocabulary flashcards and practice SAT trials to fill up your progress meter and collect school stamps!
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Middle Section: Agenda checklist */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Agenda card roadmap */}
                <div className="lg:col-span-8 bg-white border-4 border-slate-900 p-6 rounded-[32px] shadow-[6px_6px_0px_0px_#0f172a]">
                  <div className="flex items-center justify-between pb-3 border-b-2 border-slate-300 mb-6 font-sans">
                    <h3 className="text-lg font-black text-slate-950 flex items-center gap-2 uppercase tracking-tight">
                      <ClipboardList className="h-5 w-5 text-indigo-600" />
                      <span>Review Modules Agenda</span>
                    </h3>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#8b5cf6] font-mono border-2 border-[#8b5cf6] px-2 py-0.5 rounded-full">Slide Index</span>
                  </div>

                  <div className="flex flex-col gap-4">
                    {agendaItems.map((agenda, index) => {
                      return (
                        <div
                          key={agenda.id}
                          onClick={() => {
                            setActiveTab(agenda.tab);
                            sound.playClick();
                          }}
                          className="p-5 rounded-2xl bg-white border-2 border-slate-900 transition-all flex items-start gap-4 cursor-pointer group hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_#0f172a]"
                        >
                          <div className="bg-amber-300 text-slate-900 w-10 h-10 rounded-xl font-mono font-black text-center flex items-center justify-center border-2 border-slate-900 text-sm shrink-0 shadow-[1px_1px_0px_0px_#0f172a]">
                            {index + 1}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex justify-between items-start flex-wrap gap-2">
                              <h4 className="text-sm font-black text-slate-950 group-hover:text-indigo-600 transition tracking-normal">
                                {agenda.title}
                              </h4>
                              <span className="text-[9px] font-black uppercase tracking-wider font-mono text-slate-700 leading-none py-1.5 px-3 border-2 border-slate-900 bg-slate-50 rounded-lg">
                                {agenda.difficulty}
                              </span>
                            </div>
                            <p className="text-xs text-slate-650 font-medium leading-relaxed mt-1.5">
                              {agenda.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right columns: Progress lockers & classroom widgets */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                  
                  {/* Floating scoreboard details */}
                  <div className="bg-white border-4 border-slate-900 rounded-[32px] p-6 shadow-[6px_6px_0px_0px_#0f172a]">
                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-1.5 font-mono">
                      <Layers className="h-4.5 w-4.5 text-indigo-600" /> STAMP BADGES LOCKER
                    </h4>
                    
                    <ProgressTracker
                      progress={progress}
                      onResetProgress={handleResetProgress}
                      isTeacherMode={isTeacherMode}
                      teamScores={teamScores}
                    />
                  </div>

                  {/* High contrast visual tips warning banner */}
                  <div className="bg-amber-200 border-4 border-slate-900 rounded-[32px] p-6 text-slate-900 shadow-[6px_6px_0px_0px_#0f172a]">
                    <h4 className="text-xs font-black uppercase tracking-widest text-[#b45309] mb-3 flex items-center gap-1.5">
                      <AlertCircle className="h-4.5 w-4.5 text-[#b45309]" />
                      {genAlphaMode ? "🧠 SIGMA GRAMMAR PRO TIPS!" : "⭐ HIGH-YIELD REVISION TIPS!"}
                    </h4>
                    
                    <ul className="text-xs font-semibold flex flex-col gap-3 mt-4 list-disc pl-4 leading-relaxed text-slate-900">
                      {genAlphaMode ? (
                        <>
                          <li>
                            <strong>To + Verb Purpose:</strong> We use an aura scanner (thermometer) <span className="underline font-bold bg-white px-1">TO TAKE</span> temperature, not to check our skibidi charisma!
                          </li>
                          <li>
                            <strong>Should vs Shouldn't:</strong> You <span className="underline font-bold bg-white px-1">SHOULDN'T</span> drink dirty swamp water unless you want to catch cholera and get a major L-tier debuff.
                          </li>
                          <li>
                            <strong>Preposition Match:</strong> excited or worried <span className="underline font-bold text-indigo-700 bg-white px-1">ABOUT</span>, scared <span className="underline font-bold text-indigo-700 bg-white px-1">OF</span>, interested <span className="underline font-bold text-indigo-700 bg-white px-1">IN</span>. Messing this up drops your verbal aura stats to -999.
                          </li>
                          <li>
                            <strong>Past Level Tense:</strong> Markers like <em>yesterday</em> or <em>last week</em> require past tense actions (e.g., we <em>rode</em> the roller coaster back when we were mewing, fr fr).
                          </li>
                        </>
                      ) : (
                        <>
                          <li>
                            <strong>Remember to + verb:</strong> We use a medical thermometer <span className="underline font-bold bg-white px-1">TO TAKE</span> our temperature.
                          </li>
                          <li>
                            <strong>Should vs Shouldn't:</strong> Use shouldn't for bad medical advice like "eating dirty food" or "drinking ice".
                          </li>
                          <li>
                            <strong>Preposition Match:</strong> excited / worried <span className="underline font-bold text-indigo-700 bg-white px-1">ABOUT</span>, scared <span className="underline font-bold text-indigo-700 bg-white px-1">OF</span>, interested <span className="underline font-bold text-indigo-700 bg-white px-1">IN</span>.
                          </li>
                          <li>
                            <strong>Past Words:</strong> <span className="italic font-bold">yesterday / last Sunday</span> calls for Past Verb like <em>went</em> or <em>rode</em>.
                          </li>
                        </>
                      )}
                    </ul>
                  </div>

                </div>

              </div>

            </motion.div>
          )}

          {/* TAB 2: FLASHCARDS VOCABULARY - UNIT 7 */}
          {activeTab === 'flashcards-u7' && (
            <motion.div
              key="flashcards-u7-tab"
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.2 }}
            >
              <FlashcardModule
                key="u7"
                forceUnit={7}
                progress={progress}
                onMarkReviewed={handleMarkReviewed}
                isTeacherMode={isTeacherMode}
                genAlphaMode={genAlphaMode}
              />
            </motion.div>
          )}

          {/* TAB 2: FLASHCARDS VOCABULARY - UNIT 8 */}
          {activeTab === 'flashcards-u8' && (
            <motion.div
              key="flashcards-u8-tab"
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.2 }}
            >
              <FlashcardModule
                key="u8"
                forceUnit={8}
                progress={progress}
                onMarkReviewed={handleMarkReviewed}
                isTeacherMode={isTeacherMode}
                genAlphaMode={genAlphaMode}
              />
            </motion.div>
          )}

          {/* TAB 3: GRAMMAR LABS */}
          {activeTab === 'grammar' && (
            <motion.div
              key="grammar-tab"
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.2 }}
            >
              <GrammarPractice
                progress={progress}
                onUpdateAccuracy={handleUpdateAccuracy}
                isTeacherMode={isTeacherMode}
                genAlphaMode={genAlphaMode}
              />
            </motion.div>
          )}

          {/* TAB 4: CLASSROOM ARCADE */}
          {activeTab === 'arcade' && (
            <motion.div
              key="arcade-tab"
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.2 }}
            >
              <ClassroomGames
                isTeacherMode={isTeacherMode}
                onGamePlayed={handleGamePlayed}
                teamScores={teamScores}
                setTeamScores={setTeamScores}
                genAlphaMode={genAlphaMode}
              />
            </motion.div>
          )}

          {/* TAB 5: MOCK SAT EXAM */}
          {activeTab === 'mock-sat' && (
            <motion.div
              key="mock-sat-tab"
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.2 }}
            >
              <SATMockExam
                progress={progress}
                onSaveMockScore={handleSaveMockScore}
                isTeacherMode={isTeacherMode}
                genAlphaMode={genAlphaMode}
              />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Footer footer information credit */}
      <footer className="mt-16 bg-white border-t-4 border-slate-900 py-8 text-slate-800 text-xs text-center shadow-[0px_-4px_0px_0px_rgba(15,23,42,1)]">
        <div className="max-w-7xl mx-auto px-4 leading-relaxed font-bold">
          <p className="uppercase tracking-wide">Tunas Iblam Elementary School English Academy · Revision Hub</p>
          <p className="mt-1.5 text-[11px] text-slate-500 font-mono font-medium">Academic Year 2025/2026 · Compiled Grade 4 Review Terminal</p>
        </div>
      </footer>

    </div>
  );
}
