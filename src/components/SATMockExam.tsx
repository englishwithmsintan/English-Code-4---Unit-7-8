import React, { useState, useEffect } from 'react';
import { MOCK_SAT_QUESTIONS, STORIES } from '../data/reviewData';
import { SATQuestion } from '../types';
import { sound } from './SoundManager';
import { Award, Clock, ChevronRight, ChevronLeft, RefreshCw, HelpCircle } from 'lucide-react';

interface SATMockExamProps {
  progress: { mockExamScore: number | null; mockExamCompleted: boolean };
  onSaveMockScore: (score: number) => void;
  isTeacherMode: boolean;
  genAlphaMode?: boolean;
}

export default function SATMockExam({
  progress,
  onSaveMockScore,
  isTeacherMode,
  genAlphaMode = false
}: SATMockExamProps) {
  const [examMode, setExamMode] = useState<'practice' | 'exam' | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qNum: number]: string | boolean }>({});
  const [submitted, setSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(1500); // 25 minutes
  const [timerActive, setTimerActive] = useState(false);
  const [examFinished, setExamFinished] = useState(false);

  // Filter or list all questions
  const totalQuestions = MOCK_SAT_QUESTIONS.length;
  const currentQuestion: SATQuestion = MOCK_SAT_QUESTIONS[currentQuestionIndex];

  // Timer logic for real exam mode
  useEffect(() => {
    let interval: any = null;
    if (timerActive && countdown > 0 && !examFinished) {
      interval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            setExamFinished(true);
            setSubmitted(true);
            sound.playWrong();
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerActive, countdown, examFinished]);

  const startExam = (mode: 'practice' | 'exam') => {
    sound.playCorrect();
    setExamMode(mode);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setSubmitted(false);
    setExamFinished(false);
    setCountdown(1500); // 25 mins
    if (mode === 'exam') {
      setTimerActive(true);
    } else {
      setTimerActive(false);
    }
  };

  const selectAnswer = (answer: string | boolean) => {
    if (examMode === 'practice' && submitted) return; // Locked on practice after check
    
    sound.playClick();
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.number]: answer
    });

    if (examMode === 'practice') {
      // In practice mode, we submit the answer instantly
      setSubmitted(true);
      const isCorrect = String(answer).toLowerCase() === String(currentQuestion.correctAnswer).toLowerCase();
      if (isCorrect) {
        sound.playCorrect();
      } else {
        sound.playWrong();
      }
    }
  };

  const handleNext = () => {
    sound.playClick();
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      // Reset submitted state for next question in Practice mode
      if (examMode === 'practice') {
        setSubmitted(selectedAnswers[MOCK_SAT_QUESTIONS[currentQuestionIndex + 1].number] !== undefined);
      }
    }
  };

  const handlePrev = () => {
    sound.playClick();
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      if (examMode === 'practice') {
        setSubmitted(true); // already answered
      }
    }
  };

  const finishExam = () => {
    sound.playFanfare();
    setTimerActive(false);
    setExamFinished(true);
    setSubmitted(true);

    // Calculate score
    let correctCount = 0;
    MOCK_SAT_QUESTIONS.forEach(q => {
      const playerAns = selectedAnswers[q.number];
      const targetAns = q.correctAnswer;
      if (playerAns !== undefined && String(playerAns).toLowerCase() === String(targetAns).toLowerCase()) {
        correctCount++;
      }
    });

    onSaveMockScore(correctCount);
  };

  // Score Calculations
  const calcExamScore = () => {
    let correctCount = 0;
    MOCK_SAT_QUESTIONS.forEach(q => {
      const playerAns = selectedAnswers[q.number];
      const targetAns = q.correctAnswer;
      if (playerAns !== undefined && String(playerAns).toLowerCase() === String(targetAns).toLowerCase()) {
        correctCount++;
      }
    });
    return correctCount;
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m < 10 ? `0${m}` : m}:${s < 10 ? `0${s}` : s}`;
  };

  const getReportGrade = (score: number) => {
    const accuracy = (score / totalQuestions) * 100;
    if (genAlphaMode) {
      if (accuracy >= 90) return { letter: '🏆 SIGMA+', color: 'text-emerald-600', note: '🔥 W COOKING! Bro has infinite aura and 1000% academic rizz. Absolutely certified sigma, fr fr!' };
      if (accuracy >= 80) return { letter: '⚡ RIZZLER', color: 'text-teal-650 text-indigo-500', note: '⚡ Bro is locking in with max spelling rizz and pure brain aura. Absolute gigachad energy!' };
      if (accuracy >= 70) return { letter: '🍳 COOKING', color: 'text-indigo-600', note: '🍳 Let him cook! A little bit more mewing and you will unlock ultimate sigma rank, no cap!' };
      if (accuracy >= 55) return { letter: '😐 NPC STATUS', color: 'text-amber-600', note: '😐 Average NPC behavior detected. Bro needs to escape the Ohio lobby and review card decks, fr.' };
      return { letter: '💀 COOKED L', color: 'text-rose-500', note: '💀 SKIBIDI DEBUFF! Direct ticket to the Ohio swamp. Go re-mew, lock in, and save your negative aura!' };
    }

    if (accuracy >= 90) return { letter: 'A+', color: 'text-emerald-600', note: 'Perfect score! You are extremely prepared for the final test!' };
    if (accuracy >= 80) return { letter: 'A', color: 'text-teal-600', note: 'Excellent review! Tunas Iblam is proud of you!' };
    if (accuracy >= 70) return { letter: 'B', color: 'text-indigo-600', note: 'Good job! A couple of revisions and you will get a perfect A.' };
    if (accuracy >= 55) return { letter: 'C', color: 'text-amber-600', note: 'Passable. Check flashcards and grammar practice to strengthen your basics.' };
    return { letter: 'F', color: 'text-rose-500', note: 'Keep practicing! Review the vocabulary and try the test simulator again!' };
  };

  const getSubCategoryTitle = (cat: string) => {
    switch (cat) {
      case 'reading-clinic': return 'Reading Passage 1: A Visit to the Clinic (Q1-5)';
      case 'grammar-mcq-1': return 'Grammar Focus MCQ Part I (Q6-15)';
      case 'reading-lost': return 'Reading Passage 2: Who’s Lost? (Q16-20)';
      case 'grammar-mcq-2': return 'Grammar Tense & Feelings MCQs (Q21-25)';
      case 'true-false-medical': return 'True or False Diagnosis (Q26-30)';
      case 'fill-preposition': return 'Fill Prep blanks: Adjective + Prepositions (Q31-35)';
      case 'arrange-sentence': return 'Arrange Sentence Word order (Q36-40)';
      default: return 'English Final SAT Prep';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-4">
      
      {/* Intro Home Selector */}
      {examMode === null && (
        <div className="bg-white rounded-[32px] border-4 border-slate-900 shadow-[8px_8px_0px_0px_#0f172a] p-8 max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#000]">
            <Award className="h-8 w-8 text-amber-900" />
          </div>
          <span className="text-xs uppercase font-black tracking-widest text-slate-500 font-mono">Tunas Iblam Practice SAT Grade 4</span>
          <h2 className="text-3xl font-black text-slate-950 mt-2 uppercase tracking-tight">Final Mock SAT Simulator</h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed font-bold">
            Prepare yourself for the upcoming Grade 4 Final English SAT with this compiled 40-question practice test, exactly matching the slide roadmap outline.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
            <button
              id="btn-sat-practice"
              onClick={() => startExam('practice')}
              className="p-6 border-4 border-slate-905 border-slate-900 bg-teal-100 hover:bg-teal-200 text-slate-950 rounded-2xl flex flex-col items-center gap-2 transition text-center cursor-pointer shadow-[4px_4px_0px_0px_#000] active:translate-y-[2px] active:shadow-none"
            >
              <span className="text-3xl">✏️</span>
              <span className="font-black text-slate-950 text-sm uppercase">Practice track</span>
              <span className="text-[10px] text-slate-705 leading-snug font-semibold mt-1">
                Answers, clues, and slide tricks are displayed immediately after choice selection. Good for classroom study.
              </span>
            </button>

            <button
              id="btn-sat-exam"
              onClick={() => startExam('exam')}
              className="p-6 border-4 border-slate-905 border-slate-900 bg-rose-100 hover:bg-rose-200 text-white rounded-2xl flex flex-col items-center gap-2 transition text-center cursor-pointer shadow-[4px_4px_0px_0px_#000] active:translate-y-[2px] active:shadow-none"
            >
              <span className="text-3xl">⏳</span>
              <span className="font-black text-slate-955 text-sm uppercase">Timed Exam Trial</span>
              <span className="text-[10px] text-slate-705 leading-snug font-semibold mt-1">
                25-minute ticking watch. Submissions logged silently without prompt reveal until a final Graded Report Card is issued.
              </span>
            </button>
          </div>

          {progress.mockExamCompleted && (
            <div className="mt-8 pt-6 border-t-2 border-slate-200 flex items-center justify-between text-xs text-slate-500 font-mono">
              <span>PREVIOUS SAT ATTEMPT:</span>
              <span className="bg-amber-305 bg-amber-200 text-slate-950 font-black border-2 border-slate-900 px-3 py-1 rounded-md shadow-[1px_1px_0px_0px_#000]">
                ACCURACY SCORE: {progress.mockExamScore} / {totalQuestions}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Main Practice / Exam Area */}
      {examMode !== null && !examFinished && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 animate-fade-in">
          
          {/* LEFT COLUMN: Passage (Only shown on Q1-5 and Q16-20 Reading Sections, and Doctor's Report for True/False section) */}
          {(currentQuestion.category === 'reading-clinic' || 
            currentQuestion.category === 'reading-lost' || 
            currentQuestion.category === 'true-false-medical') && (
            <div className="lg:col-span-4 bg-white border-4 border-slate-900 p-4 sm:p-5 rounded-[24px] sm:rounded-[32px] h-[22rem] lg:h-[36rem] overflow-y-auto shadow-[4px_4px_0px_0px_#0f172a]">
              {currentQuestion.category === 'true-false-medical' ? (
                <div className="font-sans">
                  <span className="p-1 px-3 bg-rose-100 text-rose-700 border-2 border-slate-900 text-[10px] rounded-full font-black uppercase tracking-wider font-mono block mb-3 w-fit">
                    Medical Report Context 🩺
                  </span>
                  
                  <h4 className="text-sm font-black text-slate-900 mb-3 tracking-tight uppercase">
                    Grade 4 Clinic Report
                  </h4>
                  <div className="text-[11px] sm:text-xs space-y-3.5 text-slate-800 font-bold bg-slate-50 border-2 border-slate-900 p-4 rounded-xl shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] leading-relaxed">
                    <div>
                      <p className="text-slate-400 font-mono text-[9px] uppercase tracking-wider">Patient Name:</p>
                      <p className="text-slate-950 font-black text-xs uppercase bg-white border border-slate-300 rounded px-1.5 py-0.5 mt-0.5 w-fit">Ryan Gosling</p>
                    </div>
                    <div>
                      <p className="text-slate-400 font-mono text-[9px] uppercase tracking-wider">Symptoms:</p>
                      <p className="text-slate-950 font-extrabold mt-0.5">High temperature, sore throat, cough</p>
                    </div>
                    <div>
                      <p className="text-slate-400 font-mono text-[9px] uppercase tracking-wider">Diagnosis:</p>
                      <p className="text-slate-950 font-extrabold bg-[#ecfdf5] text-emerald-800 border-2 border-emerald-300 px-1.5 py-0.5 rounded font-black w-fit mt-0.5">Common Flu</p>
                    </div>
                    <div>
                      <p className="text-slate-400 font-mono text-[9px] uppercase tracking-wider">Doctor's Advice:</p>
                      <p className="text-slate-950 font-extrabold mt-0.5">Drink water · Stay in bed · Don’t go outside</p>
                    </div>
                    <div>
                      <p className="text-slate-400 font-mono text-[9px] uppercase tracking-wider">Prescription:</p>
                      <p className="text-indigo-700 font-black mt-0.5">One pill twice a day after meals</p>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <span className="p-1 px-3 bg-indigo-100 text-indigo-700 border-2 border-slate-900 text-[10px] rounded-full font-black uppercase tracking-wider font-mono block mb-3 w-fit">
                    {currentQuestion.category === 'reading-clinic' ? 'Passage 1 Context 🩺' : 'Passage 2 Context 🎪'}
                  </span>
                  
                  <h4 className="text-base font-black text-slate-900 mb-3 tracking-tight uppercase">
                    {currentQuestion.category === 'reading-clinic' ? STORIES.clinic.title : STORIES.lost.title}
                  </h4>
                  <p className="text-xs sm:text-xs text-slate-700 leading-relaxed font-bold whitespace-pre-wrap select-text border-t border-slate-200 pt-3">
                    {currentQuestion.category === 'reading-clinic' ? STORIES.clinic.text : STORIES.lost.text}
                  </p>
                </>
              )}
            </div>
          )}

          {/* RIGHT COLUMN: Question MCQ panel */}
          <div className={`${(currentQuestion.category === 'reading-clinic' || currentQuestion.category === 'reading-lost' || currentQuestion.category === 'true-false-medical') ? 'lg:col-span-8' : 'lg:col-span-12'} bg-white border-4 border-slate-900 shadow-[8px_8px_0px_0px_#0f172a] rounded-[24px] sm:rounded-[32px] p-5 sm:p-6 flex flex-col justify-between min-h-[28rem] lg:min-h-[36rem]`}>
            
            {/* Top Tracker Info bar */}
            <div>
              <div className="flex justify-between items-center pb-4 border-b-2 border-slate-200 mb-6 flex-wrap gap-2 text-xs">
                <div>
                  <span className="font-extrabold text-slate-400 font-mono uppercase block">SECTION CODE & KEY</span>
                  <span className="font-mono text-indigo-700 font-black block sm:inline-block tracking-tight bg-slate-50 border-2 border-slate-900 px-2.5 py-1 rounded-md shadow-[1px_1px_0px_0px_#000] mt-1">
                    {getSubCategoryTitle(currentQuestion.category)}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-right">
                  {examMode === 'exam' && (
                    <div className="flex items-center gap-1.5 bg-rose-100 border-2 border-slate-900 p-1.5 px-3 rounded-xl text-rose-905 text-rose-800 font-mono font-black shadow-[1px_1px_0px_0px_#000]">
                      <Clock className="h-4 w-4 text-rose-500 animate-pulse" />
                      <span>{formatTime(countdown)}</span>
                    </div>
                  )}
                  <span className="bg-[#fefaf0] border-2 border-slate-900 font-mono font-black px-3 py-1.5 rounded-lg text-slate-700 shadow-[1px_1px_0px_0px_#000]">
                    Q: {currentQuestion.number} / {totalQuestions}
                  </span>
                </div>
              </div>

              {/* Question text */}
              <div className="mb-6">
                <h3 className="text-lg md:text-xl font-black text-slate-950 tracking-tight leading-relaxed font-sans select-none">
                  {currentQuestion.number}. {currentQuestion.question}
                </h3>
              </div>

              {/* Options choices loop */}
              {currentQuestion.options ? (
                <div className="flex flex-col gap-3">
                  {currentQuestion.options.map((option, idx) => {
                    const isSelected = selectedAnswers[currentQuestion.number] === option;
                    const isCorrect = String(option).toLowerCase() === String(currentQuestion.correctAnswer).toLowerCase();
                    
                    let bgClass = 'bg-white hover:bg-slate-50 border-slate-905 border-slate-900 text-slate-900 shadow-[2px_2px_0px_0px_#0f172a]';
                    if (submitted) {
                      if (isCorrect) {
                        bgClass = 'bg-emerald-400 border-slate-900 text-slate-950 font-black shadow-[2px_2px_0px_0px_#000]';
                      } else if (isSelected) {
                        bgClass = 'bg-rose-400 border-slate-900 text-slate-950 font-black shadow-[2px_2px_0px_0px_#000]';
                      } else {
                        bgClass = 'bg-white border-slate-200 text-slate-350 opacity-45 shadow-none';
                      }
                    } else if (isSelected) {
                      bgClass = examMode === 'exam' 
                        ? 'bg-slate-900 border-slate-900 text-white font-black shadow-[2px_2px_0px_0px_#000]'
                        : 'bg-amber-400 border-slate-900 text-slate-950 font-black shadow-[2px_2px_0px_0px_#000]';
                    }

                    return (
                      <button
                        key={idx}
                        id={`btn-sat-opt-${idx}`}
                        disabled={examMode === 'practice' && submitted}
                        onClick={() => selectAnswer(option)}
                        className={`w-full text-left p-4 rounded-xl border-2 text-xs sm:text-xs font-black transition-all cursor-pointer flex items-center justify-between ${bgClass} active:translate-y-[1px]`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`inline-block border-2 border-slate-900 text-[10px] px-2 py-0.5 rounded font-mono font-black ${isSelected ? 'bg-white text-slate-900' : 'bg-[#fefaf0] text-slate-700'}`}>{idx + 1}</span>
                          <span className="tracking-normal pr-2 leading-relaxed">{option}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                // True/False choice
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(['true', 'false'] as const).map((choice) => {
                    const isSelected = String(selectedAnswers[currentQuestion.number]).toLowerCase() === choice;
                    const isCorrect = String(currentQuestion.correctAnswer).toLowerCase() === choice;
                    
                    let bgClass = 'bg-white hover:bg-slate-50 border border-slate-905 border-slate-900 text-slate-900 shadow-[4px_4px_0px_0px_#0f172a]';
                    if (submitted) {
                      if (isCorrect) {
                        bgClass = 'bg-emerald-400 border-slate-900 text-slate-955 font-black shadow-[2px_2px_0px_0px_#000]';
                      } else if (isSelected) {
                        bgClass = 'bg-rose-400 border-slate-900 text-slate-955 font-black shadow-[2px_2px_0px_0px_#000]';
                      } else {
                        bgClass = 'bg-white border-slate-205 text-slate-350 opacity-45 shadow-none';
                      }
                    } else if (isSelected) {
                      bgClass = examMode === 'exam'
                        ? 'bg-slate-900 border-slate-900 text-white font-black shadow-[2px_2px_0px_0px_#000]'
                        : 'bg-amber-400 border-slate-900 text-slate-950 font-black shadow-[2px_2px_0px_0px_#000]';
                    }

                    return (
                      <button
                        key={choice}
                        id={`btn-sat-bool-${choice}`}
                        disabled={examMode === 'practice' && submitted}
                        onClick={() => selectAnswer(choice === 'true')}
                        className={`py-8 text-center text-lg uppercase font-black tracking-widest rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center gap-1.5 ${bgClass}`}
                      >
                        <span>{choice === 'true' ? '🧍‍♂️ TRUE' : '🧎‍♀️ FALSE'}</span>
                        <span className="text-[10px] font-bold tracking-tight text-slate-500 bg-[#fefaf0] p-1 px-3 border border-slate-300 rounded mt-2">
                          {choice === 'true' ? 'Stand Up!' : 'Sit Down!'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Practice mode hints */}
              {examMode === 'practice' && submitted && (
                <div className="mt-6 p-4 bg-amber-100 border-2 border-slate-900 rounded-xl animate-fade-in shadow-[2px_2px_0px_0px_#000]">
                  <span className="text-[9px] uppercase font-black text-[#b45309] flex items-center gap-1 font-mono"><HelpCircle className="h-4.5 w-4.5" /> SAT STUDY CLUE:</span>
                  <p className="text-xs text-slate-800 font-bold leading-relaxed mt-1">
                    {currentQuestion.explanation}
                    <br />
                    <span className="text-indigo-750 font-black bg-white inline-block px-1.5 py-0.5 border border-slate-300 rounded mt-2 text-[10px]">SLIDE METRIC: {currentQuestion.hint}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Navigation block */}
            <div className="flex justify-between items-center pt-6 border-t-2 border-slate-200 mt-8 flex-wrap gap-4">
              <button
                id="btn-sat-prev"
                onClick={handlePrev}
                disabled={currentQuestionIndex === 0}
                className="flex items-center gap-1.5 px-4 py-2 border-2 border-slate-905 border-slate-900 bg-white hover:bg-slate-50 text-slate-800 text-xs font-black rounded-xl disabled:opacity-30 cursor-pointer shadow-[2px_2px_0px_0px_#000]"
              >
                <ChevronLeft className="h-4.5 w-4.5" /> Prev
              </button>

              {examMode === 'exam' && currentQuestionIndex === totalQuestions - 1 ? (
                <button
                  id="btn-sat-submit-exam"
                  onClick={() => {
                    const unansweredCount = totalQuestions - Object.keys(selectedAnswers).length;
                    if (unansweredCount > 0) {
                      if (confirm(`You have ${unansweredCount} unanswered questions! Do you still want to hand in your paper?`)) {
                        finishExam();
                      }
                    } else if (confirm('Ready to turn in your exam paper?')) {
                      finishExam();
                    }
                  }}
                  className="px-6 py-3 bg-rose-400 hover:bg-rose-350 border-2 border-slate-900 text-slate-950 font-black rounded-xl text-xs sm:text-xs shadow-[2px_2px_0px_0px_#000] cursor-pointer"
                >
                  Turn In Exam Paper 📝
                </button>
              ) : (
                <button
                  id="btn-sat-next"
                  onClick={handleNext}
                  disabled={currentQuestionIndex === totalQuestions - 1}
                  className="flex items-center gap-1.5 px-6 py-3 bg-slate-900 border border-slate-950 hover:bg-slate-800 text-white text-xs font-black rounded-xl disabled:opacity-30 cursor-pointer shadow-[2px_2px_0px_0px_#000]"
                >
                  Next <ChevronRight className="h-4.5 w-4.5" />
                </button>
              )}
            </div>

          </div>

        </div>
      )}

      {/* COMPREHENSIVE REPORT CARD */}
      {examMode !== null && examFinished && (
        <div className="bg-white text-slate-900 rounded-[32px] p-8 max-w-2xl mx-auto border-4 border-slate-900 shadow-[8px_8px_0px_0px_#0f172a] text-center">
          
          <span className="text-[10px] uppercase font-black tracking-widest text-[#4f46e5] font-mono bg-indigo-50 border-2 border-slate-900 p-1 px-3 rounded-full">Tunas Iblam Final Results</span>
          <h2 className="text-3xl font-black mt-4 uppercase">Practice SAT Report Card</h2>
          
          <div className="my-8 py-6 rounded-2xl bg-amber-100 border-2 border-slate-900 inline-block px-10 shadow-[4px_4px_0px_0px_#0f172a]">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest font-mono">Exam Grade Issued</p>
            <h3 className={`text-6xl font-black font-sans my-2.5 leading-none ${getReportGrade(calcExamScore()).color}`}>
              {getReportGrade(calcExamScore()).letter}
            </h3>
            <p className="text-xs font-black text-slate-850 tracking-wide font-mono mt-1 uppercase">
              SCORE: {calcExamScore()} / {totalQuestions} Correct
            </p>
            <p className="text-[10px] text-indigo-700 font-black tracking-wide mt-1.5 font-mono">
              ({Math.round((calcExamScore() / totalQuestions) * 100)}% accuracy level)
            </p>
          </div>

          <div className="bg-[#fefaf0] border-2 border-slate-900 p-4 rounded-xl text-xs text-slate-705 max-w-md mx-auto leading-relaxed font-bold">
            Status note: "{getReportGrade(calcExamScore()).note}"
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              id="btn-result-review"
              onClick={() => {
                setExamMode('practice');
                setCurrentQuestionIndex(0);
                setSubmitted(true);
                setExamFinished(false);
                sound.playClick();
              }}
              className="px-6 py-3 bg-white border-2 border-slate-900 hover:bg-slate-55 text-slate-800 font-black rounded-xl text-xs cursor-pointer shadow-[2px_2px_0px_0px_#000]"
            >
              Review Study Clues
            </button>

            <button
              id="btn-exam-reset"
              onClick={() => {
                setExamMode(null);
                sound.playClick();
              }}
              className="px-6 py-3 bg-amber-400 border-2 border-slate-900 text-slate-950 font-black rounded-xl text-xs shadow-[2px_2px_0px_0px_#000] cursor-pointer hover:bg-amber-350"
            >
              Wipe & Return
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
