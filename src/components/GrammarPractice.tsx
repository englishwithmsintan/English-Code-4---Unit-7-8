import React, { useState } from 'react';
import { INFINITIVE_PAIRS } from '../data/reviewData';
import { sound } from './SoundManager';
import { Award, CheckCircle, AlertTriangle, RefreshCw, Layers, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GrammarPracticeProps {
  progress: { grammarAccuracy: { [key: string]: number } };
  onUpdateAccuracy: (category: string, accuracy: number) => void;
  isTeacherMode: boolean;
  genAlphaMode?: boolean;
}

export default function GrammarPractice({
  progress,
  onUpdateAccuracy,
  isTeacherMode,
  genAlphaMode = false
}: GrammarPracticeProps) {
  const [activeSubTab, setActiveSubTab] = useState<'should' | 'infinitive' | 'preposition' | 'timeline'>('should');

  // --- 1. SHOULD / SHOULDN'T CLINIC STATE ---
  const advices = [
    { text: 'Drink plenty of clean water.', correct: 'should', hint: 'Keeps you hydrated.' },
    { text: 'Drink dirty water.', correct: 'shouldn\'t', hint: 'Can cause cholera!' },
    { text: 'Stay in bed if you have a high fever.', correct: 'should', hint: 'To help your body heal.' },
    { text: 'Go outside and play with friends until you feel better.', correct: 'shouldn\'t', hint: 'You are still contagious!' },
    { text: 'Go to school with a high temperature.', correct: 'shouldn\'t', hint: 'You should stay home and rest.' },
    { text: 'Call a dentist if you have a broken tooth.', correct: 'should', hint: 'They can fix it for you.' }
  ];
  const [shouldIndex, setShouldIndex] = useState(0);
  const [shouldSelected, setShouldSelected] = useState<'should' | 'shouldn\'t' | null>(null);
  const [shouldScore, setShouldScore] = useState(0);
  const [shouldQuestionsSolved, setShouldQuestionsSolved] = useState(0);

  // --- 2. INFINITIVE OF PURPOSE STATE ---
  const [infinitiveStep, setInfinitiveStep] = useState(0); // index of INFINITIVE_PAIRS
  const [infinitiveSelectedVerb, setInfinitiveSelectedVerb] = useState('');
  const [infinitiveSelectedPurpose, setInfinitiveSelectedPurpose] = useState('');
  const [infinitiveVerbsPoll, setInfinitiveVerbsPoll] = useState(['to check', 'to feel', 'to fix', 'to see', 'to make']);
  const [infinitivePurposePoll, setInfinitivePurposePoll] = useState(['the fever', 'better', 'his tooth', 'our teeth', 'patients feel better']);
  const [infinitiveMatchesSolved, setInfinitiveMatchesSolved] = useState<number>(0);
  const [infinitiveErrors, setInfinitiveErrors] = useState(0);
  const [infinitiveCompletedState, setInfinitiveCompletedState] = useState(false);
  const [infinitiveAlertActive, setInfinitiveAlertActive] = useState(false);

  // --- 3. PREPOSITION SNAPPER STATE ---
  const prepositionScenarios = [
    { text: 'Yong is very interested ________ watching the magic show.', answer: 'in', translation: 'Yong sangat tertarik menonton pertunjukan sulap.' },
    { text: 'Meili is scared ________ the high and fast Ferris wheel.', answer: 'of', translation: 'Meili takut dengan kincir ria yang tinggi.' },
    { text: 'The children are excited ________ riding the bumper cars next.', answer: 'about', translation: 'Anak-anak gembira tentang menaiki mobil senggol nanti.' },
    { text: 'She felt worried ________ being lost in the theme park crowd.', answer: 'about', translation: 'Dia merasa khawatir tentang tersesat di keramaian.' },
    { text: 'Ethan is scared ________ the giant roller coaster.', answer: 'of', translation: 'Ethan takut dengan roller coaster raksasa.' }
  ];
  const [prepIndex, setPrepIndex] = useState(0);
  const [selectedPrep, setSelectedPrep] = useState<'in' | 'of' | 'about' | null>(null);
  const [prepQuestionsSolved, setPrepQuestionsSolved] = useState(0);
  const [prepScore, setPrepScore] = useState(0);

  // --- 4. TIMELINE STATE ---
  const timelineScenarios = [
    { text: 'They rode the roller coaster yesterday.', correct: 'past', marker: 'yesterday (go → went, ride → rode)' },
    { text: 'We are riding the Ferris wheel now.', correct: 'present', marker: 'now / right now (am/is/are + verb-ing)' },
    { text: 'We will go to the bumper cars next.', correct: 'future', marker: 'tomorrow / next ... / in ... hours (will + verb)' },
    { text: 'Ava and Ethan bought tickets before the ride started.', correct: 'past', marker: 'before / last (buy → bought)' },
    { text: 'I am taking some medicine right now for my stomachache.', correct: 'present', marker: 'right now (am/is/are + verb-ing)' },
    { text: 'He will see Dr. Jennifer Sanders tomorrow for a check-up.', correct: 'future', marker: 'tomorrow (will + verb)' }
  ];
  const [timelineIndex, setTimelineIndex] = useState(0);
  const [selectedTimeline, setSelectedTimeline] = useState<'past' | 'present' | 'future' | null>(null);
  const [timelineQuestionsSolved, setTimelineQuestionsSolved] = useState(0);
  const [timelineScore, setTimelineScore] = useState(0);

  const subTabs = [
    { id: 'should', label: 'Advice Clinic (Should) 🩺' },
    { id: 'infinitive', label: 'purpose Match (to + verb) 🖇️' },
    { id: 'preposition', label: 'Preposition Magnets 🧲' },
    { id: 'timeline', label: 'Tense Time Traveler ⏰' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-4">
      
      {/* Sub-Tab Selectors Header */}
      <div className="bg-white p-2 rounded-2xl flex flex-col md:flex-row gap-2 mb-8 border-4 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a]">
        {subTabs.map((tab) => {
          const isSelected = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveSubTab(tab.id as any);
                sound.playClick();
              }}
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-xs font-black uppercase tracking-tight transition-all text-center cursor-pointer ${
                isSelected 
                  ? 'bg-teal-400 text-slate-950 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border-2 border-transparent'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* --- SUBTAB CONTENT --- */}
      <AnimatePresence mode="wait">
        
        {/* TAB 1: SHOULD / SHOULDN'T CLINIC */}
        {activeSubTab === 'should' && (
          <motion.div
            key="tab-should"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.15 }}
            className="bg-white rounded-[32px] p-6 sm:p-8 border-4 border-slate-900 shadow-[8px_8px_0px_0px_#0f172a]"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-slate-200 pb-4 mb-6 gap-3">
              <div>
                <span className="text-xs font-black text-indigo-650 uppercase tracking-widest font-mono">Topic: Grammar Advice</span>
                <h3 className="text-xl font-black text-slate-950 mt-1 uppercase tracking-tight">Diagnosis Clinic: Should or Shouldn't?</h3>
              </div>
              <div className="bg-amber-300 border-2 border-slate-900 rounded-xl px-4 py-1.5 font-mono text-xs font-black text-slate-950 shadow-[2px_2px_0px_0px_#0f172a]">
                <span>SCORE: {shouldScore} / {shouldQuestionsSolved}</span>
              </div>
            </div>

            {shouldQuestionsSolved < advices.length ? (
              <div>
                <div className="bg-[#fefaf0] border-2 border-slate-900 rounded-2xl p-6 sm:p-8 mb-8 min-h-44 flex flex-col justify-between items-center text-center shadow-[2px_2px_0px_0px_#0f172a]">
                  <span className="p-1 px-4 bg-indigo-100 text-indigo-800 text-xs rounded-full font-black uppercase tracking-wider border-2 border-slate-900 shadow-[1px_1px_0px_0px_#000]">Scenario {shouldIndex + 1}</span>
                  <p className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 italic max-w-2xl font-sans mt-4">
                    "You ______________ {advices[shouldIndex].text}"
                  </p>
                  <p className="text-xs sm:text-sm text-indigo-700 bg-indigo-50/50 py-1.5 px-3 border border-indigo-200/50 inline-block rounded-xl font-bold mt-5">💡 Hint: {advices[shouldIndex].hint}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    id="btn-should"
                    disabled={shouldSelected !== null}
                    onClick={() => {
                      const isCorrect = advices[shouldIndex].correct === 'should';
                      setShouldSelected('should');
                      setShouldQuestionsSolved(s => s + 1);
                      if (isCorrect) {
                        setShouldScore(s => s + 1);
                        sound.playCorrect();
                        onUpdateAccuracy('should', Math.round(((shouldScore + 1) / advices.length) * 100));
                      } else {
                        sound.playWrong();
                      }
                    }}
                    className={`p-6 rounded-2xl font-black cursor-pointer transition-all border-2 flex flex-col items-center gap-2 ${
                      shouldSelected === 'should' && advices[shouldIndex].correct === 'should'
                        ? 'bg-emerald-450 bg-emerald-400 border-slate-900 text-slate-950 shadow-[2px_2px_0px_0px_#000]'
                        : shouldSelected === 'should' && advices[shouldIndex].correct !== 'should'
                        ? 'bg-rose-400 border-slate-900 text-slate-950 shadow-[2px_2px_0px_0px_#000]'
                        : 'bg-emerald-50 hover:bg-emerald-110 border-slate-900 text-emerald-900 shadow-[4px_4px_0px_0px_#0f172a] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#0f172a]'
                    }`}
                  >
                    <span className="text-2xl">✅</span>
                    <span className="text-base uppercase tracking-wider font-extrabold">SHOULD</span>
                    <span className="text-xs font-semibold">Good advice!</span>
                  </button>

                  <button
                    id="btn-shouldnt"
                    disabled={shouldSelected !== null}
                    onClick={() => {
                      const isCorrect = advices[shouldIndex].correct === 'shouldn\'t';
                      setShouldSelected('shouldn\'t');
                      setShouldQuestionsSolved(s => s + 1);
                      if (isCorrect) {
                        setShouldScore(s => s + 1);
                        sound.playCorrect();
                        onUpdateAccuracy('should', Math.round(((shouldScore + 1) / advices.length) * 100));
                      } else {
                        sound.playWrong();
                      }
                    }}
                    className={`p-6 rounded-2xl font-black cursor-pointer transition-all border-2 flex flex-col items-center gap-2 ${
                      shouldSelected === 'shouldn\'t' && advices[shouldIndex].correct === 'shouldn\'t'
                        ? 'bg-emerald-400 border-slate-900 text-slate-950 shadow-[2px_2px_0px_0px_#000]'
                        : shouldSelected === 'shouldn\'t' && advices[shouldIndex].correct !== 'shouldn\'t'
                        ? 'bg-rose-455 bg-rose-400 border-slate-900 text-slate-950 shadow-[2px_2px_0px_0px_#000]'
                        : 'bg-rose-50 hover:bg-rose-110 border-slate-900 text-rose-900 shadow-[4px_4px_0px_0px_#0f172a] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#0f172a]'
                    }`}
                  >
                    <span className="text-2xl">❌</span>
                    <span className="text-base uppercase tracking-wider font-extrabold">SHOULDN'T</span>
                    <span className="text-xs font-semibold">Avoid this action!</span>
                  </button>
                </div>

                {shouldSelected !== null && (
                  <div className="mt-8 text-center animate-fade-in flex flex-col items-center">
                    <p className="text-sm font-black flex items-center justify-center gap-1.5 mb-4">
                      {shouldSelected === advices[shouldIndex].correct ? (
                        <span className="text-emerald-650 text-emerald-600 flex items-center gap-1.5 bg-emerald-100 border-2 border-slate-900 px-3 py-1 rounded-xl shadow-[2px_2px_0px_0px_#000]">
                          {genAlphaMode ? "🔥 CHAT IS THIS REAL? Cooking with max sigma energy! Yes!" : "🎉 Correct Answer! Excellent Diagnoses!"}
                        </span>
                      ) : (
                        <span className="text-rose-650 text-rose-600 flex items-center gap-1.5 bg-rose-100 border-2 border-slate-900 px-3 py-1 text-opacity-95 rounded-xl shadow-[2px_2px_0px_0px_#000]">
                          {genAlphaMode ? "💀 ERROR 404: Bro is lost in Ohio! Big L, try again!" : "⚠️ Oops! Keep practicing!"}
                        </span>
                      )}
                    </p>
                    <button
                      id="btn-should-next"
                      onClick={() => {
                        setShouldSelected(null);
                        setShouldIndex(s => s + 1);
                        sound.playClick();
                      }}
                      className="px-6 py-3 bg-amber-400 hover:bg-amber-350 border-2 border-slate-900 text-slate-955 font-black rounded-xl text-xs uppercase shadow-[2px_2px_0px_0px_#0f172a] transition duration-150 active:translate-y-[2px] active:shadow-none cursor-pointer"
                    >
                      Next Health Scenario →
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="inline-block p-4 rounded-xl bg-teal-400 text-slate-950 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#000] mb-4 text-3xl">🏆</div>
                <h4 className="text-xl font-black text-slate-900 uppercase">Clinic Practice Complete!</h4>
                <p className="text-xs text-gray-600 mt-2 max-w-sm mx-auto font-bold">
                  You successfully diagnosed {shouldScore} out of {advices.length} advisor statements!
                </p>
                <div className="mt-6 bg-[#fefaf0] border-2 border-slate-900 p-4 rounded-2xl shadow-[3px_3px_0px_0px_#0f172a] inline-block">
                  <span className="text-xs font-black text-slate-500 font-mono block">FINAL ACCURACY</span>
                  <span className="text-3xl font-black text-indigo-600 font-mono">{Math.round((shouldScore / advices.length) * 100)}%</span>
                </div>
                <div className="mt-8">
                  <button
                    id="btn-should-restart"
                    onClick={() => {
                      setShouldIndex(0);
                      setShouldSelected(null);
                      setShouldScore(0);
                      setShouldQuestionsSolved(0);
                      sound.playClick();
                    }}
                    className="flex items-center gap-2 mx-auto px-6 py-3 bg-white border-2 border-slate-900 font-black rounded-xl text-xs uppercase shadow-[2px_2px_0px_0px_#0f172a] hover:bg-slate-50 cursor-pointer text-slate-800"
                  >
                    <RefreshCw className="h-4 w-4" /> Restart Advice Trainer
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* TAB 2: INFINITIVE OF PURPOSE MATCHMAKER */}
        {activeSubTab === 'infinitive' && (
          <motion.div
            key="tab-infinitive"
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.15 }}
            className="bg-white rounded-[32px] p-6 sm:p-8 border-4 border-slate-900 shadow-[8px_8px_0px_0px_#0f172a]"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-slate-200 pb-4 mb-6 gap-3">
              <div>
                <span className="text-sm font-black text-indigo-655 text-indigo-600 uppercase tracking-widest font-mono">Topic: Infinitive of Purpose (to + verb)</span>
                <h3 className="text-2xl font-black text-slate-905 mt-1 uppercase tracking-tight">Infinitive Connector: Link the Sentence</h3>
              </div>
              <div className="bg-amber-300 border-2 border-slate-900 rounded-xl px-4 py-2 font-mono text-sm font-black text-slate-950 shadow-[2px_2px_0px_0px_#0f172a]">
                <span>STAGE: {infinitiveMatchesSolved} / {INFINITIVE_PAIRS.length}</span>
              </div>
            </div>

            {!infinitiveCompletedState && infinitiveMatchesSolved < INFINITIVE_PAIRS.length ? (
              <div>
                {/* Visual Formula Header */}
                <div className="bg-amber-50 border-2 border-slate-900 rounded-2xl p-5 mb-6 shadow-[2px_2px_0px_0px_#0f172a]">
                  <span className="text-xs font-black tracking-widest text-amber-800 uppercase font-mono mb-2 block text-center sm:text-left">💡 GRAMMAR CONTEXT FORMULA</span>
                  <div className="flex flex-col sm:flex-row items-center justify-around gap-2 text-center">
                    <span className="px-3.5 py-1.5 bg-white border-2 border-slate-900 text-slate-800 text-sm font-black rounded-lg leading-none">Main Action Statement</span>
                    <span className="text-lg font-bold text-slate-900">+</span>
                    <span className="px-3.5 py-1.5 bg-rose-400 border-2 border-slate-900 text-slate-950 text-sm font-black rounded-lg leading-none">to + Verb (Purpose)</span>
                    <span className="text-lg font-bold text-slate-900">+</span>
                    <span className="px-3.5 py-1.5 bg-cyan-300 border-2 border-slate-900 text-slate-950 text-sm font-black rounded-lg leading-none">Reason Object</span>
                  </div>
                </div>

                {/* DYNAMIC PRESENTATION-FRIENDLY SENTENCE BUILDER */}
                <div className="bg-[#fefaf0] border-4 border-slate-900 rounded-[28px] p-6 sm:p-10 mb-8 text-center shadow-[4px_4px_0px_0px_#0f172a] relative overflow-hidden">
                  <div className="absolute top-2 left-4 text-[10px] font-black tracking-wider text-slate-400 font-mono">🖥️ LIVE SENTENCE BUILDER</div>
                  
                  <div className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-950 leading-relaxed font-sans max-w-4xl mx-auto flex flex-wrap justify-center items-center gap-x-4 gap-y-5 py-2">
                    <span className="text-slate-900 font-bold">{INFINITIVE_PAIRS[infinitiveStep].sentence}</span>
                    
                    {infinitiveSelectedVerb ? (
                      <motion.span 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="inline-block px-5 py-2.5 bg-rose-400 border-3 border-slate-900 rounded-2xl text-slate-950 font-black shadow-[2px_2px_0px_0px_#000] select-none"
                      >
                        {infinitiveSelectedVerb}
                      </motion.span>
                    ) : (
                      <span className="inline-block px-6 py-2.5 bg-rose-50 border-3 border-dashed border-rose-300 text-rose-300 font-extrabold rounded-2xl animate-pulse min-w-[160px] text-center text-xl select-none">
                        (to + Verb)
                      </span>
                    )}

                    {infinitiveSelectedPurpose ? (
                      <motion.span 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="inline-block px-5 py-2.5 bg-[#5f52ee] border-3 border-slate-900 rounded-2xl text-white font-black shadow-[2px_2px_0px_0px_#000] select-none"
                      >
                        {infinitiveSelectedPurpose}
                      </motion.span>
                    ) : (
                      <span className="inline-block px-6 py-2.5 bg-indigo-50 border-3 border-dashed border-indigo-200 text-indigo-300 font-extrabold rounded-2xl animate-pulse min-w-[180px] text-center text-xl select-none">
                        (Reason)
                      </span>
                    )}

                    <span className="text-slate-900 font-bold">.</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  
                  {/* Step A: Choose the "to + verb" */}
                  <div className="bg-slate-50 border-2 border-slate-900 p-5 rounded-2xl shadow-[2px_2px_0px_0px_#0f172a]">
                    <h4 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-1.5">
                      <span className="inline-block px-2.5 py-1 rounded bg-rose-400 border border-slate-900 text-slate-950 text-xs leading-none font-black font-mono">STEP 1</span> Choose Connector Verb
                    </h4>
                    
                    <div className="flex flex-col gap-3">
                      {infinitiveVerbsPoll.map((verb) => {
                        const isSelected = infinitiveSelectedVerb === verb;
                        return (
                          <button
                            key={verb}
                            id={`btn-verb-${verb.replace(' ', '-')}`}
                            onClick={() => {
                              setInfinitiveSelectedVerb(verb);
                              setInfinitiveAlertActive(false);
                              sound.playClick();
                            }}
                            className={`p-4 text-left rounded-xl text-base sm:text-lg font-black border-2 transition-all cursor-pointer shadow-[2px_2px_0px_0px_#0f172a] ${
                              isSelected
                                ? 'bg-rose-400 border-slate-900 text-slate-950 scale-[0.98] translate-y-[1px] shadow-none'
                                : 'bg-white border-slate-900 text-slate-705 hover:bg-slate-100'
                            }`}
                          >
                            {verb}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step B: Choose the "Reason" */}
                  <div className="bg-slate-50 border-2 border-slate-900 p-5 rounded-2xl shadow-[2px_2px_0px_0px_#0f172a]">
                    <h4 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-1.5">
                      <span className="inline-block px-2.5 py-1 rounded bg-indigo-400 border border-slate-900 text-white text-xs leading-none font-black font-mono">STEP 2</span> Choose Target Reason
                    </h4>
                    
                    <div className="flex flex-col gap-3">
                      {infinitivePurposePoll.map((purp) => {
                        const isSelected = infinitiveSelectedPurpose === purp;
                        return (
                          <button
                            key={purp}
                            id={`btn-purpose-${purp.replace(/[^a-zA-Z]/g, '-')}`}
                            onClick={() => {
                              setInfinitiveSelectedPurpose(purp);
                              setInfinitiveAlertActive(false);
                              sound.playClick();
                            }}
                            className={`p-4 text-left rounded-xl text-base sm:text-lg font-black border-2 transition-all cursor-pointer shadow-[2px_2px_0px_0px_#0f172a] ${
                              isSelected
                                ? 'bg-[#5f52ee] border-slate-900 text-white scale-[0.98] translate-y-[1px] shadow-none'
                                : 'bg-white border-slate-900 text-slate-705 hover:bg-slate-100'
                            }`}
                          >
                            {purp}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Matching Warning Banner */}
                {infinitiveAlertActive && (
                  <div className="mt-6 p-5 bg-rose-100 border-2 border-slate-900 rounded-xl text-sm font-extrabold text-rose-800 flex items-center gap-2 animate-bounce-slow">
                    <AlertTriangle className="h-6 w-6 text-rose-600 shrink-0" />
                    <span>
                      {genAlphaMode
                        ? "💀 OHIO VIBES! That link is absolute cap, bro! Review spelling pairings and lock in, fr fr!"
                        : "Whoops! That connector or reason does not fit grammatically! Check spelling pairs and try again!"}
                    </span>
                  </div>
                )}

                {/* Match submission button */}
                <button
                  id="btn-match-claim"
                  disabled={!infinitiveSelectedVerb || !infinitiveSelectedPurpose}
                  onClick={() => {
                    const target = INFINITIVE_PAIRS[infinitiveStep];
                    
                    // Strip and clean strings for complete bulletproof logic
                    const cleanSelected = infinitiveSelectedPurpose.trim().replace(/\.$/, '').toLowerCase();
                    const cleanTarget = target.purpose.trim().replace(/\.$/, '').toLowerCase();
                    const cleanVerbSelected = infinitiveSelectedVerb.trim().toLowerCase();
                    const cleanVerbTarget = target.verb.trim().toLowerCase();

                    if (cleanVerbSelected === cleanVerbTarget && cleanSelected === cleanTarget) {
                      setInfinitiveMatchesSolved(s => s + 1);
                      sound.playCorrect();
                      setInfinitiveAlertActive(false);
                      
                      // Clear and proceed
                      setInfinitiveSelectedVerb('');
                      setInfinitiveSelectedPurpose('');
                      onUpdateAccuracy('infinitive', Math.round(((infinitiveMatchesSolved + 1) / INFINITIVE_PAIRS.length) * 100));

                      if (infinitiveStep < INFINITIVE_PAIRS.length - 1) {
                        setInfinitiveStep(s => s + 1);
                      } else {
                        setInfinitiveCompletedState(true);
                      }
                    } else {
                      setInfinitiveErrors(s => s + 1);
                      sound.playWrong();
                      setInfinitiveAlertActive(true);
                    }
                  }}
                  className={`w-full mt-6 py-4 px-6 rounded-2xl font-black text-sm uppercase tracking-wider cursor-pointer transition flex items-center justify-center gap-2 border-2 ${
                    infinitiveSelectedVerb && infinitiveSelectedPurpose
                      ? 'bg-[#8b5cf6] border-slate-900 hover:bg-[#7c3aed] text-white shadow-[4px_4px_0px_0px_#0f172a] active:translate-y-[2px] active:shadow-none'
                      : 'bg-slate-100 text-slate-400 border-slate-350 cursor-not-allowed'
                  }`}
                >
                  <ArrowRight className="h-5 w-5" /> Link Sentence Components!
                </button>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="inline-block p-4 rounded-xl bg-indigo-600 text-white border-2 border-slate-900 shadow-[2px_2px_0px_0px_#000] mb-4 text-3xl">🖇️</div>
                <h4 className="text-2xl font-black text-slate-900 uppercase">Infinitive Connectors Complete!</h4>
                <p className="text-sm text-gray-650 mt-2 max-w-sm mx-auto font-bold text-gray-600">
                  You successfully constructed all {INFINITIVE_PAIRS.length} health purpose sentences!
                </p>
                <div className="mt-6 bg-[#fefaf0] border-2 border-slate-900 p-4 rounded-2xl shadow-[3px_3px_0px_0px_#0f172a] inline-block">
                  <span className="text-xs font-black text-slate-500 font-mono block">ERRORS ENCOUNTERED</span>
                  <span className="text-2xl font-black text-rose-500 font-mono">{infinitiveErrors} {infinitiveErrors === 1 ? 'Error' : 'Errors'}</span>
                </div>
                <div className="mt-8">
                  <button
                    id="btn-infinitive-restart"
                    onClick={() => {
                      setInfinitiveStep(0);
                      setInfinitiveSelectedVerb('');
                      setInfinitiveSelectedPurpose('');
                      setInfinitiveMatchesSolved(0);
                      setInfinitiveErrors(0);
                      setInfinitiveCompletedState(false);
                      sound.playClick();
                    }}
                    className="flex items-center gap-2 mx-auto px-6 py-3 bg-white border-2 border-slate-900 font-black rounded-xl text-xs uppercase shadow-[2px_2px_0px_0px_#0f172a] hover:bg-slate-50 cursor-pointer text-slate-800"
                  >
                    <RefreshCw className="h-4 w-4" /> Restart Matchmaker
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* TAB 3: PREPOSITION MAGNETS */}
        {activeSubTab === 'preposition' && (
          <motion.div
            key="tab-preposition"
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.15 }}
            className="bg-white rounded-[32px] p-6 sm:p-8 border-4 border-slate-900 shadow-[8px_8px_0px_0px_#0f172a]"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-slate-200 pb-4 mb-6 gap-3">
              <div>
                <span className="text-xs font-black text-rose-600 uppercase tracking-widest font-mono">Topic: Adjective + Preposition</span>
                <h3 className="text-xl font-black text-slate-900 mt-1 uppercase tracking-tight">Preposition Magnets: Fill in the Blank</h3>
              </div>
              <div className="bg-amber-300 border-2 border-slate-900 rounded-xl px-4 py-1.5 font-mono text-xs font-black text-slate-950 shadow-[2px_2px_0px_0px_#0f172a]">
                <span>SCORE: {prepScore} / {prepQuestionsSolved}</span>
              </div>
            </div>

            {prepQuestionsSolved < prepositionScenarios.length ? (
              <div>
                <div className="bg-[#fefaf0] border-2 border-slate-900 rounded-2xl p-6 mb-6 text-center shadow-[2px_2px_0px_0px_#000]">
                  <span className="p-1 px-3.5 bg-indigo-150 bg-indigo-100 text-[#4f46e5] border-2 border-slate-900 text-[10px] rounded-full font-black uppercase tracking-wider mb-4 inline-block font-mono">Scenario {prepIndex + 1} of {prepositionScenarios.length}</span>
                  <p className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-relaxed max-w-xl mx-auto">
                    "{prepositionScenarios[prepIndex].text}"
                  </p>
                  <p className="text-xs text-slate-500 mt-3 font-bold">
                    📦 Arti: {prepositionScenarios[prepIndex].translation}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center py-4">
                  {(['in', 'of', 'about'] as const).map((prep) => {
                    const isCorrect = prepositionScenarios[prepIndex].answer === prep;
                    const isSelected = selectedPrep === prep;
                    return (
                      <button
                        key={prep}
                        id={`btn-prep-${prep}`}
                        disabled={selectedPrep !== null}
                        onClick={() => {
                          setSelectedPrep(prep);
                          setPrepQuestionsSolved(s => s + 1);
                          if (isCorrect) {
                            setPrepScore(s => s + 1);
                            sound.playCorrect();
                            onUpdateAccuracy('preposition', Math.round(((prepScore + 1) / prepositionScenarios.length) * 100));
                          } else {
                            sound.playWrong();
                          }
                        }}
                        className={`w-full sm:w-32 py-5 rounded-2xl text-xl font-black uppercase tracking-widest border-2 transition-all cursor-pointer shadow-[4px_4px_0px_0px_#0f172a] active:translate-y-[2px] active:shadow-none ${
                          isSelected && isCorrect
                            ? 'bg-emerald-400 border-slate-900 text-slate-950'
                            : isSelected && !isCorrect
                            ? 'bg-rose-400 border-slate-900 text-slate-950'
                            : 'bg-white hover:bg-slate-50 border-slate-900 text-slate-900'
                        }`}
                      >
                        {prep}
                      </button>
                    );
                  })}
                </div>

                {selectedPrep !== null && (
                  <div className="mt-8 text-center animate-fade-in flex flex-col items-center">
                    <div className="p-5 bg-slate-50 border-2 border-slate-900 inline-block rounded-2xl text-xs sm:text-sm font-semibold max-w-md shadow-[3px_3px_0px_0px_#0f172a]">
                      <p className="font-extrabold mb-2.5">
                        {selectedPrep === prepositionScenarios[prepIndex].answer ? (
                          <span className="text-emerald-600">
                            {genAlphaMode ? "🔥 FR FR! You have maximum spelling rizz!" : "🎉 Correct! This matches our preposition grammar guidelines."}
                          </span>
                        ) : (
                          <span className="text-rose-500 font-extrabold">
                            {genAlphaMode ? "💀 OH MY GYATT! Bro got hit with negative aura!" : "⚠️ Uh-oh! Remember preposition guidelines."}
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-slate-500 leading-relaxed font-bold tracking-tight text-left">
                        Adjective pairing list rules:
                        <br />• interested + <span className="underline font-black text-rose-500 bg-white px-1 font-mono">IN</span>
                        <br />• scared + <span className="underline font-black text-rose-500 bg-white px-1 font-mono">OF</span>
                        <br />• excited / worried + <span className="underline font-black text-rose-500 bg-white px-1 font-mono">ABOUT</span>
                      </p>
                    </div>

                    <div className="mt-6">
                      <button
                        id="btn-prep-next"
                        onClick={() => {
                          setSelectedPrep(null);
                          setPrepIndex(s => s + 1);
                          sound.playClick();
                        }}
                        className="px-6 py-3 bg-amber-400 border-2 border-slate-900 text-slate-950 hover:bg-amber-350 font-black rounded-xl text-xs uppercase shadow-[2px_2px_0px_0px_#0f172a] cursor-pointer"
                      >
                        Next Spot / Blank →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="inline-block p-4 rounded-xl bg-teal-400 text-slate-950 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#000] mb-4 text-3xl">🧲</div>
                <h4 className="text-xl font-black text-slate-900 uppercase">Preposition Magnets Secured!</h4>
                <p className="text-xs text-gray-600 mt-2 max-w-sm mx-auto font-bold">
                  You successfully catalogued {prepScore} out of {prepositionScenarios.length} feeling pairings correctly!
                </p>
                <div className="mt-6 bg-[#fefaf0] border-2 border-slate-900 p-4 rounded-2xl border border-slate-200 inline-block shadow-[3px_3px_0px_0px_#0f172a]">
                  <span className="text-xs font-black text-slate-500 font-mono block">FINAL ACCURACY</span>
                  <span className="text-3xl font-black text-rose-500 font-mono">{Math.round((prepScore / prepositionScenarios.length) * 100)}%</span>
                </div>
                <div className="mt-8">
                  <button
                    id="btn-prep-restart"
                    onClick={() => {
                      setPrepIndex(0);
                      setSelectedPrep(null);
                      setPrepScore(0);
                      setPrepQuestionsSolved(0);
                      sound.playClick();
                    }}
                    className="flex items-center gap-2 mx-auto px-6 py-3 bg-white border-2 border-slate-900 font-black rounded-xl text-xs uppercase shadow-[2px_2px_0px_0px_#0f172a] hover:bg-slate-50 cursor-pointer text-slate-800"
                  >
                    <RefreshCw className="h-4 w-4" /> Restart Snapper Game
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* TAB 4: TENSE TIME TRAVELER */}
        {activeSubTab === 'timeline' && (
          <motion.div
            key="tab-timeline"
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.15 }}
            className="bg-white rounded-[32px] p-6 sm:p-8 border-4 border-slate-900 shadow-[8px_8px_0px_0px_#0f172a]"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-slate-200 pb-4 mb-6 gap-3">
              <div>
                <span className="text-xs font-black text-emerald-600 uppercase tracking-widest font-mono">Topic: Past, Present & Future Tenses</span>
                <h3 className="text-xl font-black text-slate-900 mt-1 uppercase tracking-tight">Tense Time Traveler: Identify Verb Tense</h3>
              </div>
              <div className="bg-amber-300 border-2 border-slate-900 rounded-xl px-4 py-1.5 font-mono text-xs font-black text-slate-950 shadow-[2px_2px_0px_0px_#0f172a]">
                <span>WARPED: {timelineScore} / {timelineQuestionsSolved}</span>
              </div>
            </div>

            {timelineQuestionsSolved < timelineScenarios.length ? (
              <div>
                <div className="bg-slate-900 text-white rounded-[24px] border-4 border-slate-900 p-8 sm:p-10 mb-6 relative overflow-hidden shadow-[4px_4px_0px_0px_#000]">
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                    <span className="text-8xl">🚀</span>
                  </div>
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <span className="px-4 py-1.5 bg-[#10b981] text-slate-950 border-2 border-slate-900 text-xs rounded-full font-black uppercase tracking-widest mb-5">Time Gate {timelineIndex + 1}</span>
                    <p className="text-xl sm:text-2xl md:text-3xl font-black text-teal-300 italic max-w-2xl leading-relaxed">
                      "{timelineScenarios[timelineIndex].text}"
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {(['past', 'present', 'future'] as const).map((tense) => {
                    const isSelected = selectedTimeline === tense;
                    const isCorrect = timelineScenarios[timelineIndex].correct === tense;
                    
                    let bgStyle = 'bg-white hover:bg-slate-50 border-slate-900 text-slate-900 shadow-[4px_4px_0px_0px_#0f172a]';
                    if (isSelected) {
                      bgStyle = isCorrect 
                        ? 'bg-emerald-400 border-slate-900 text-slate-950 shadow-[2px_2px_0px_0px_#000] translate-y-[1px]'
                        : 'bg-rose-455 bg-rose-400 border-slate-900 text-slate-950 shadow-[2px_2px_0px_0px_#000] translate-y-[1px]';
                    }

                    return (
                      <button
                        key={tense}
                        id={`btn-tense-${tense}`}
                        disabled={selectedTimeline !== null}
                        onClick={() => {
                          setSelectedTimeline(tense);
                          setTimelineQuestionsSolved(s => s + 1);
                          if (isCorrect) {
                            setTimelineScore(s => s + 1);
                            sound.playCorrect();
                            onUpdateAccuracy('timeline', Math.round(((timelineScore + 1) / timelineScenarios.length) * 100));
                          } else {
                            sound.playWrong();
                          }
                        }}
                        className={`py-5 rounded-2xl uppercase font-black text-sm tracking-widest border-2 transition-all cursor-pointer flex flex-col items-center gap-1.5 duration-100 ${bgStyle}`}
                      >
                        <span className="text-base font-extrabold">{tense}</span>
                        <span className="text-[10px] font-sans font-bold opacity-80 pt-1 border-t border-slate-300 w-full text-center">
                          {tense === 'past' ? 'Completed past' : tense === 'present' ? 'Happening now' : 'Future action'}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {selectedTimeline !== null && (
                  <div className="mt-8 text-center animate-fade-in flex flex-col items-center">
                    <div className="p-5 bg-slate-50 border-2 border-slate-900 inline-block rounded-2xl text-xs sm:text-sm font-semibold max-w-md shadow-[3px_3px_0px_0px_#0f172a]">
                      <p className="font-black text-slate-800 mb-2">
                        {selectedTimeline === timelineScenarios[timelineIndex].correct ? (
                          <span className="text-emerald-600 font-extrabold">
                            {genAlphaMode ? "🚀 ABSOLUTE SIGMA! Real temporal rizz, fr fr!" : "🚀 Brilliant! Temporal stream aligned."}
                          </span>
                        ) : (
                          <span className="text-rose-500 font-extrabold">
                            {genAlphaMode ? "⚠️ BRUHHH! Bro is glitching like an NPC!" : "⚠️ Wait! Temporal anomaly detected."}
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-slate-500 font-bold leading-relaxed">
                        Time Indicator Marker Word: <span className="underline font-black text-indigo-700 font-mono bg-white px-1.5">{timelineScenarios[timelineIndex].marker}</span>
                      </p>
                    </div>

                    <div className="mt-6">
                      <button
                        id="btn-timeline-next"
                        onClick={() => {
                          setSelectedTimeline(null);
                          setTimelineIndex(s => s + 1);
                          sound.playClick();
                        }}
                        className="px-6 py-3 bg-[#e2e8f0] border-2 border-slate-900 hover:bg-slate-300 text-slate-900 font-black rounded-xl text-xs uppercase shadow-[2px_2px_0px_0px_#0f172a] cursor-pointer"
                      >
                        Advance Time Traveler →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="inline-block p-4 rounded-xl bg-teal-400 text-slate-950 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#000] mb-4 text-3xl">⏰</div>
                <h4 className="text-xl font-black text-slate-800 uppercase">Tense Time Stream Secured!</h4>
                <p className="text-xs text-gray-600 mt-2 max-w-sm mx-auto font-bold">
                  You successfully catalogued {timelineScore} out of {timelineScenarios.length} chronological sentences correctly!
                </p>
                <div className="mt-6 bg-[#fefaf0] border-2 border-slate-900 p-4 rounded-2xl inline-block shadow-[3px_3px_0px_0px_#0f172a]">
                  <span className="text-xs font-black text-slate-500 font-mono block">ACCURACY SCORE</span>
                  <span className="text-3xl font-black text-emerald-500 font-mono">{Math.round((timelineScore / timelineScenarios.length) * 100)}%</span>
                </div>
                <div className="mt-8">
                  <button
                    id="btn-timeline-restart"
                    onClick={() => {
                      setTimelineIndex(0);
                      setSelectedTimeline(null);
                      setTimelineScore(0);
                      setTimelineQuestionsSolved(0);
                      sound.playClick();
                    }}
                    className="flex items-center gap-2 mx-auto px-6 py-3 bg-white border-2 border-slate-900 font-black rounded-xl text-xs uppercase shadow-[2px_2px_0px_0px_#0f172a] hover:bg-slate-50 cursor-pointer text-slate-800"
                  >
                    <RefreshCw className="h-4 w-4" /> Restart Time Traveler
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}

      </AnimatePresence>

      {/* Classroom scorecard projection warning */}
      {isTeacherMode && (
        <div className="mt-8 bg-amber-100 border-4 border-slate-900 rounded-[28px] p-5 text-slate-900 text-xs shadow-[4px_4px_0px_0px_#0f172a]">
          <span className="font-extrabold text-amber-800 uppercase tracking-widest text-[10px] block mb-2 font-mono">👨‍🏫 Teacher Active Screen projection mode</span>
          Projects perfectly on classrooms smartboards. Invite representatives to tap options while team classmates assist by vocalizing the should/shouldn't diagnostics and correct timelines!
        </div>
      )}

    </div>
  );
}
