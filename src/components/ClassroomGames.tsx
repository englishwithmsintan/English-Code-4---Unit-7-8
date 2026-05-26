import React, { useState, useEffect, useRef } from 'react';
import { sound } from './SoundManager';
import { RefreshCw, Play, Timer, Trophy, ArrowRight, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ClassroomGamesProps {
  isTeacherMode: boolean;
  onGamePlayed: (gameKey: string) => void;
  teamScores: { teamA: number; teamB: number };
  setTeamScores: React.Dispatch<React.SetStateAction<{ teamA: number; teamB: number }>>;
  genAlphaMode?: boolean;
}

export default function ClassroomGames({
  isTeacherMode,
  onGamePlayed,
  teamScores,
  setTeamScores,
  genAlphaMode = false
}: ClassroomGamesProps) {
  const [activeGame, setActiveGame] = useState<'wheel' | 'showdown' | 'kahoot' | 'hotseat' | 'scramble'>('wheel');

  // Helper to append scores globally
  const awardPoint = (team: 'A' | 'B', pts: number) => {
    sound.playCorrect();
    setTeamScores(prev => ({
      ...prev,
      teamA: team === 'A' ? Math.max(0, prev.teamA + pts) : prev.teamA,
      teamB: team === 'B' ? Math.max(0, prev.teamB + pts) : prev.teamB
    }));
  };

  // ---------------------------------------------------------------------------
  // --- GAME 1: TRUE OR FALSE SHOWDOWN (Stand up = TRUE | Sit down = FALSE) ---
  // ---------------------------------------------------------------------------
  const showdownQuestions = [
    { text: 'We use a thermometer to take our temperature.', correct: true, slide: 'Q1' },
    { text: 'You should drink dirty water to feel better.', correct: false, slide: 'Q2' },
    { text: 'A bandage is used to check the fever.', correct: false, slide: 'Q3' },
    { text: "The doctor's diagnosis is written in a medical report.", correct: true, slide: 'Q4' },
    { text: 'You shouldn’t go to school if you have a high fever.', correct: true, slide: 'Q5' },
    { text: 'Pills are used to decorate your room.', correct: false, slide: 'Q6' }
  ];
  const [showdownIdx, setShowdownIdx] = useState(0);
  const [showdownAnswered, setShowdownAnswered] = useState<boolean | null>(null);

  // ---------------------------------------------------------------------------
  // --- GAME 2: SPIN THE WHEEL - SENTENCE CHALLENGE ---
  // ---------------------------------------------------------------------------
  const wheelCategories = [
    { label: 'Feelings + Prepo', desc: 'scared of, worried about, excited about, interested in', color: '#8b5cf6' },
    { label: 'PAST Sentence', desc: 'yesterday, ago, last (rode, went, saw, ate)', color: '#ef4444' },
    { label: 'FUTURE Sentence', desc: 'tomorrow, next (will go, will ride)', color: '#10b981' },
    { label: 'PRESENT Sentence', desc: 'now, right now (am/is/are + verb-ing)', color: '#0ea5e9' },
    { label: 'should / shouldn’t', desc: 'Give a health advice (should stay in bed, shouldn’t drink dirty water)', color: '#14b8a6' },
    { label: 'to + Infinitive', desc: 'Use Infinitive of Purpose (to check, to buy, to see)', color: '#f43f5e' }
  ];
  const [wheelDegree, setWheelDegree] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState<number | null>(null);
  const [wheelTimer, setWheelTimer] = useState(30);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerIntervalRef = useRef<any>(null);

  const startWheelTimer = () => {
    setWheelTimer(30);
    setIsTimerRunning(true);
    sound.playClick();
  };

  useEffect(() => {
    if (isTimerRunning) {
      timerIntervalRef.current = setInterval(() => {
        setWheelTimer(prev => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            sound.playWrong();
            clearInterval(timerIntervalRef.current);
            return 0;
          }
          if (prev <= 6) {
            sound.playTick();
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerIntervalRef.current);
    }
    return () => clearInterval(timerIntervalRef.current);
  }, [isTimerRunning]);

  const spinWheel = () => {
    if (isSpinning) return;
    onGamePlayed('wheel');
    setIsSpinning(true);
    setSelectedCategoryIdx(null);
    setIsTimerRunning(false);
    
    // Multi spins + randomized ending sector
    const randomSector = Math.floor(Math.random() * wheelCategories.length);
    const degreePerSector = 360 / wheelCategories.length;
    
    // Spin at least 5 entire rotations
    const spinDegrees = wheelDegree + (360 * 5) + (360 - (randomSector * degreePerSector)) - (wheelDegree % 360);
    setWheelDegree(spinDegrees);

    // Audio ticking simulation
    let tickCount = 0;
    const totalTicks = 35;
    const intervalTime = 70;
    const ticker = setInterval(() => {
      sound.playTick();
      tickCount++;
      if (tickCount >= totalTicks) {
        clearInterval(ticker);
      }
    }, intervalTime);

    setTimeout(() => {
      setIsSpinning(false);
      setSelectedCategoryIdx(randomSector);
      sound.playFanfare();
    }, 3000);
  };

  // ---------------------------------------------------------------------------
  // --- GAME 3: KAHOOT QUIZ ---
  // ---------------------------------------------------------------------------
  const kahootDeck = [
    {
      q: 'Which sentence is correct?',
      options: [
        { key: 'A', text: 'I take medicine for feel better.', bg: 'bg-rose-500' },
        { key: 'B', text: 'I take medicine to feel better.', bg: 'bg-amber-500', correct: true },
        { key: 'C', text: 'I take medicine feeling better.', bg: 'bg-emerald-500' },
        { key: 'D', text: 'I take medicine feel better.', bg: 'bg-indigo-650 bg-indigo-500' }
      ],
      hint: "Use 'to + verb' to say WHY!"
    },
    {
      q: '"We are riding the Ferris wheel NOW." What tense is this?',
      options: [
        { key: 'A', text: 'Past', bg: 'bg-rose-500' },
        { key: 'B', text: 'Future', bg: 'bg-amber-500' },
        { key: 'C', text: 'Present', bg: 'bg-emerald-500', correct: true },
        { key: 'D', text: 'Infinitive', bg: 'bg-indigo-650 bg-indigo-500' }
      ],
      hint: "'Now' = Present Tense (am/is/are + verb-ing)"
    },
    {
      q: 'Fill in: Ethan is scared _____ the roller coaster.',
      options: [
        { key: 'A', text: 'in', bg: 'bg-rose-500' },
        { key: 'B', text: 'at', bg: 'bg-amber-500' },
        { key: 'C', text: 'of', bg: 'bg-emerald-500', correct: true },
        { key: 'D', text: 'about', bg: 'bg-indigo-650 bg-indigo-500' }
      ],
      hint: 'scared OF · worried ABOUT · interested IN · excited ABOUT'
    },
    {
      q: 'What should you do if you have a fever?',
      options: [
        { key: 'A', text: 'Go to school', bg: 'bg-rose-500' },
        { key: 'B', text: 'Eat spicy food', bg: 'bg-amber-500' },
        { key: 'C', text: 'Stay in bed and drink water', bg: 'bg-emerald-505 bg-emerald-500', correct: true },
        { key: 'D', text: 'Run outside', bg: 'bg-indigo-650 bg-indigo-500' }
      ],
      hint: "You SHOULD stay in bed. You SHOULDN'T go to school!"
    }
  ];
  const [kahootIdx, setKahootIdx] = useState(0);
  const [kahootChoice, setKahootChoice] = useState<string | null>(null);
  const [kahootTimer, setKahootTimer] = useState(15);
  const [kahootTimerRunning, setKahootTimerRunning] = useState(true);
  const [kahootRevealed, setKahootRevealed] = useState(false);
  const kahootRef = useRef<any>(null);

  useEffect(() => {
    if (kahootTimerRunning && !kahootRevealed) {
      kahootRef.current = setInterval(() => {
        setKahootTimer(prev => {
          if (prev <= 1) {
            setKahootRevealed(true);
            sound.playWrong();
            clearInterval(kahootRef.current);
            return 0;
          }
          sound.playKahootBeep();
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(kahootRef.current);
    }
    return () => clearInterval(kahootRef.current);
  }, [kahootTimerRunning, kahootRevealed, kahootIdx]);

  const selectKahootOption = (option: any) => {
    if (kahootRevealed) return;
    onGamePlayed('kahoot');
    setKahootChoice(option.key);
    setKahootRevealed(true);
    setKahootTimerRunning(false);
    if (option.correct) {
      sound.playCorrect();
    } else {
      sound.playWrong();
    }
  };

  const nextKahoot = () => {
    setKahootIdx(p => (p < kahootDeck.length - 1 ? p + 1 : 0));
    setKahootRevealed(false);
    setKahootChoice(null);
    setKahootTimer(15);
    setKahootTimerRunning(true);
    sound.playClick();
  };

  // ---------------------------------------------------------------------------
  // --- GAME 4: HOT SEAT - DESCRIBE IT! ---
  // ---------------------------------------------------------------------------
  const hotseatIllness = ['Fever', 'Sore throat', 'Thermometer', 'Bandage', 'Stomachache', 'Cholera'];
  const hotseatThemePark = ['Roller coaster', 'Cotton candy', 'Ferris wheel', 'Bumper car', 'Excited', 'Worried'];
  const [hotseatDeckName, setHotseatDeckName] = useState<'illness' | 'themepark'>('illness');
  const [hotseatIdx, setHotseatIdx] = useState(0);
  const [isHotseatHidden, setIsHotseatHidden] = useState(true);
  const [hotseatScore, setHotseatScore] = useState(0);
  const [hotseatTimer, setHotseatTimer] = useState(60);
  const [hotseatRunning, setHotseatRunning] = useState(false);
  const hotseatRefRef = useRef<any>(null);

  const activeHotseatDeck = hotseatDeckName === 'illness' ? hotseatIllness : hotseatThemePark;

  const startHotseat = () => {
    setHotseatTimer(60);
    setHotseatScore(0);
    setHotseatIdx(0);
    setIsHotseatHidden(true);
    setHotseatRunning(true);
    sound.playCorrect();
  };

  useEffect(() => {
    if (hotseatRunning) {
      hotseatRefRef.current = setInterval(() => {
        setHotseatTimer(prev => {
          if (prev <= 1) {
            setHotseatRunning(false);
            sound.playWrong();
            clearInterval(hotseatRefRef.current);
            return 0;
          }
          if (prev <= 11) {
            sound.playTick();
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(hotseatRefRef.current);
    }
    return () => clearInterval(hotseatRefRef.current);
  }, [hotseatRunning]);

  const hotseatCorrect = () => {
    sound.playCorrect();
    setHotseatScore(s => s + 1);
    setIsHotseatHidden(true);
    if (hotseatIdx < activeHotseatDeck.length - 1) {
      setHotseatIdx(s => s + 1);
    } else {
      setHotseatRunning(false);
      sound.playFanfare();
    }
  };

  const hotseatPass = () => {
    sound.playClick();
    setIsHotseatHidden(true);
    if (hotseatIdx < activeHotseatDeck.length - 1) {
      setHotseatIdx(s => s + 1);
    } else {
      setHotseatRunning(false);
      sound.playWrong();
    }
  };

  // ---------------------------------------------------------------------------
  // --- GAME 5: ARRANGE SENTENCES (Slide 18) ---
  // ---------------------------------------------------------------------------
  const scrambleSentences = [
    { text: 'should / you / see / a / doctor / if / you / feel / sick', full: 'You should see a doctor if you feel sick.', words: ['should', 'you', 'see', 'a', 'doctor', 'if', 'you', 'feel', 'sick'] },
    { text: 'use / Nurses / a / thermometer / to / take / our / temperature', full: 'Nurses use a thermometer to take our temperature.', words: ['use', 'Nurses', 'a', 'thermometer', 'to', 'take', 'our', 'temperature'] },
    { text: 'roller / the / enjoyed / children / The / coaster', full: 'The children enjoyed the roller coaster.', words: ['roller', 'the', 'enjoyed', 'children', 'The', 'coaster'] },
    { text: 'bought / tickets / Ava and Ethan / before / the ride', full: 'Ava and Ethan bought tickets before the ride.', words: ['bought', 'tickets', 'Ava', 'and', 'Ethan', 'before', 'the', 'ride'] },
    { text: 'are / We / riding / the / Ferris / wheel / now', full: 'We are riding the Ferris wheel now.', words: ['are', 'We', 'riding', 'the', 'Ferris', 'wheel', 'now'] }
  ];
  const [scrambleIdx, setScrambleIdx] = useState(0);
  const [userConstruction, setUserConstruction] = useState<string[]>([]);
  const [shuffledPool, setShuffledPool] = useState<string[]>([]);
  const [scrambleAnswered, setScrambleAnswered] = useState<boolean | null>(null);

  useEffect(() => {
    const sentence = scrambleSentences[scrambleIdx];
    const pool = [...sentence.words].sort(() => Math.random() - 0.5);
    setShuffledPool(pool);
    setUserConstruction([]);
    setScrambleAnswered(null);
  }, [scrambleIdx]);

  const addWordToConstruction = (word: string, index: number) => {
    if (scrambleAnswered !== null) return;
    sound.playClick();
    setUserConstruction([...userConstruction, word]);
    const newPool = [...shuffledPool];
    newPool.splice(index, 1);
    setShuffledPool(newPool);
  };

  const removeWordFromConstruction = (word: string, index: number) => {
    if (scrambleAnswered !== null) return;
    sound.playClick();
    const newCon = [...userConstruction];
    newCon.splice(index, 1);
    setUserConstruction(newCon);
    setShuffledPool([...shuffledPool, word]);
  };

  const checkSentenceConstruction = () => {
    onGamePlayed('scramble');
    const playerFull = userConstruction.join(' ').toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    const targetFull = scrambleSentences[scrambleIdx].full.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    
    const isCorrect = playerFull === targetFull;
    setScrambleAnswered(isCorrect);
    if (isCorrect) {
      sound.playCorrect();
    } else {
      sound.playWrong();
    }
  };

  const classTitles = [
    { id: 'wheel', label: '🎡 Spin-The-Wheel' },
    { id: 'showdown', label: '🔴 T/F Showdown' },
    { id: 'kahoot', label: '🟣 Kahoot Quiz Arena' },
    { id: 'hotseat', label: '🔥 Hot Seat Game' },
    { id: 'scramble', label: '🔤 Sentence Scrambler' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-4 grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
      
      {/* Side menu selection */}
      <div className="lg:col-span-1 bg-white text-slate-900 rounded-[24px] lg:rounded-[32px] p-4 lg:p-5 shadow-[4px_4px_0px_0px_#0f172a] border-4 border-slate-900 flex flex-col justify-between">
        <div>
          <h3 className="text-xs font-black font-mono text-indigo-600 uppercase tracking-widest mb-3 lg:mb-4">Class Arcade Selection</h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 lg:flex lg:flex-col gap-2">
            {classTitles.map(game => (
              <button
                key={game.id}
                onClick={() => {
                  setActiveGame(game.id as any);
                  sound.playClick();
                }}
                className={`py-2 lg:py-3 px-2 lg:px-4 rounded-xl text-center lg:text-left text-[10px] sm:text-xs font-black transition-all cursor-pointer border-2 ${
                  activeGame === game.id
                    ? 'bg-amber-400 border-slate-900 text-slate-950 shadow-[1.5px_1.5px_0px_0px_#000] lg:shadow-[2px_2px_0px_0px_#000]'
                    : 'bg-white border-slate-300 text-slate-700 hover:border-slate-900 hover:bg-slate-50'
                }`}
              >
                {game.label}
              </button>
            ))}
          </div>
        </div>

        {/* Scoring board */}
        <div className="mt-4 lg:mt-8 pt-3 lg:pt-6 border-t-2 border-slate-200">
          <h4 className="text-xs font-black uppercase tracking-widest text-[#b45309] mb-4 flex items-center justify-between font-mono">
            <span>🏆 Team Scoreboard</span>
            <Trophy className="h-4 w-4 text-[#b45309] animate-pulse" />
          </h4>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className={`p-3 rounded-xl border-2 border-slate-900 text-center shadow-[2px_2px_0px_0px_#000] relative transition-all ${teamScores.teamA > teamScores.teamB ? 'bg-teal-100 border-dashed border-emerald-400' : 'bg-slate-50'}`}>
              {teamScores.teamA > teamScores.teamB && (
                <span className="absolute -top-2.5 right-1 text-xs animate-bounce" title="Leading Team!">👑</span>
              )}
              <p className="text-[10px] uppercase font-mono font-black text-teal-850">ALPHA TEAM</p>
              <p className="text-2xl font-black font-mono mt-1 text-slate-900">{teamScores.teamA}</p>
              <div className="flex justify-center gap-1.5 mt-2">
                <button onClick={() => awardPoint('A', 1)} className="px-2 py-0.5 rounded border border-slate-900 bg-white text-slate-950 text-xs font-black font-mono cursor-pointer shadow-[1px_1px_0px_0px_#000] active:translate-y-[1px] active:shadow-none">+1</button>
                <button onClick={() => awardPoint('A', -1)} className="px-2 py-0.5 rounded border border-slate-900 bg-slate-100 text-slate-950 text-xs font-black font-mono cursor-pointer shadow-[1px_1px_0px_0px_#000] active:translate-y-[1px] active:shadow-none">-1</button>
              </div>
            </div>

            <div className={`p-3 rounded-xl border-2 border-slate-900 text-center shadow-[2px_2px_0px_0px_#000] relative transition-all ${teamScores.teamB > teamScores.teamA ? 'bg-rose-100 border-dashed border-rose-450' : 'bg-slate-50'}`}>
              {teamScores.teamB > teamScores.teamA && (
                <span className="absolute -top-2.5 right-1 text-xs animate-bounce" title="Leading Team!">👑</span>
              )}
              <p className="text-[10px] uppercase font-mono font-black text-rose-850">SIGMA TEAM</p>
              <p className="text-2xl font-black font-mono mt-1 text-slate-900">{teamScores.teamB}</p>
              <div className="flex justify-center gap-1.5 mt-2">
                <button onClick={() => awardPoint('B', 1)} className="px-2 py-0.5 rounded border border-slate-900 bg-white text-slate-950 text-xs font-black font-mono cursor-pointer shadow-[1px_1px_0px_0px_#000] active:translate-y-[1px] active:shadow-none">+1</button>
                <button onClick={() => awardPoint('B', -1)} className="px-2 py-0.5 rounded border border-slate-900 bg-slate-100 text-slate-950 text-xs font-black font-mono cursor-pointer shadow-[1px_1px_0px_0px_#000] active:translate-y-[1px] active:shadow-none">-1</button>
              </div>
            </div>
          </div>
          
          <button
            id="btn-reset-teams"
            onClick={() => {
              setTeamScores({ teamA: 0, teamB: 0 });
              sound.playWrong();
            }}
            className="w-full text-center py-2.5 border-2 border-slate-900 hover:bg-slate-50 rounded-xl text-[10px] font-black tracking-widest text-[#ef4444] uppercase font-mono cursor-pointer bg-white shadow-[2px_2px_0px_0px_#000]"
          >
            Wipe Score Board
          </button>
        </div>
      </div>

      {/* Main Game panel visualizer */}
      <div className="lg:col-span-3 bg-white rounded-[32px] border-4 border-slate-900 shadow-[8px_8px_0px_0px_#0f172a] p-6 relative min-h-120 flex flex-col justify-between">
        
        {/* --- GAME 1: SPIN THE WHEEL --- */}
        {activeGame === 'wheel' && (
          <div className="flex flex-col items-center w-full h-full justify-between">
            <h3 className="text-xl font-black text-slate-950 border-b-2 border-slate-200 pb-3 mb-6 w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 uppercase tracking-tight">
              <span>🎡 Spin-the-Wheel Challenge</span>
              <span className="text-xs bg-purple-100 border-2 border-slate-900 text-purple-900 font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-[2px_2px_0px_0px_#000]">Sentence Challenge</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full items-center">
              
              {/* Spinner Wheel Graphic */}
              <div className="flex flex-col items-center relative">
                <div className="absolute top-0 z-20 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-slate-950 -mt-2.5" />
                
                <div className="w-60 h-60 rounded-full border-4 border-slate-900 relative shadow-[4px_4px_0px_0px_#000] overflow-hidden flex items-center justify-center transform"
                  style={{
                    transform: `rotate(${wheelDegree}deg)`,
                    transitionProperty: isSpinning ? 'transform' : 'none',
                    transitionDuration: '3000ms',
                    background: 'conic-gradient(#8b5cf6 0% 16.6%, #ef4444 16.6% 33.3%, #10b981 33.3% 50%, #0ea5e9 50% 66.6%, #14b8a6 66.6% 83.3%, #f43f5e 83.3% 100%)'
                  }}
                >
                  {wheelCategories.map((cat, idx) => (
                    <div
                      key={idx}
                      className="absolute text-[8px] sm:text-[9px] font-black text-white text-center w-28 uppercase tracking-wider leading-none"
                      style={{
                        transform: `rotate(${idx * 60 + 30}deg) translate(50px) rotate(-${idx * 60 + 30}deg)`
                      }}
                    >
                      {cat.label.replace(' Sentence', '')}
                    </div>
                  ))}
                  <div className="absolute w-12 h-12 bg-white rounded-full border-4 border-slate-900 shadow-md flex items-center justify-center font-black text-[10px] text-slate-900">
                    GO!
                  </div>
                </div>

                <button
                  id="btn-spin-wheel"
                  disabled={isSpinning}
                  onClick={spinWheel}
                  className="mt-6 px-10 py-3.5 bg-amber-400 hover:bg-amber-350 text-slate-955 font-black rounded-2xl cursor-pointer border-4 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a] disabled:cursor-not-allowed uppercase text-xs tracking-wider transition active:translate-y-[2px] active:shadow-none flex items-center gap-2"
                >
                  <RefreshCw className={`h-4.5 w-4.5 ${isSpinning ? 'animate-spin' : ''}`} />
                  <span>{isSpinning ? 'SPINNING...' : 'TAP TO SPIN!'}</span>
                </button>
              </div>

              {/* Instructions Panel */}
              <div className="flex flex-col bg-[#fefaf0] border-2 border-slate-900 p-5 rounded-2xl h-full justify-between shadow-[2px_2px_0px_0px_#0f172a]">
                <div>
                  <h4 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-2">Instructions</h4>
                  <p className="text-xs text-slate-700 leading-relaxed mb-4 font-bold">
                    - Invite student to spin target wheel.
                    <br />- Build high compliance sentence of category.
                    <br />- Clock counts 30 sec standard to reply!
                  </p>

                  <AnimatePresence mode="wait">
                    {selectedCategoryIdx !== null && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="p-4.5 rounded-xl border-2 border-slate-900 text-white shadow-[2px_2px_0px_0px_#000]"
                        style={{ backgroundColor: wheelCategories[selectedCategoryIdx].color }}
                      >
                        <span className="text-[10px] uppercase font-black text-amber-250 font-mono tracking-widest leading-none block">SELECTED SLOT:</span>
                        <h5 className="text-xl font-black mt-1 uppercase tracking-tight">{wheelCategories[selectedCategoryIdx].label}</h5>
                        <p className="text-xs md:text-sm text-white mt-2 font-bold bg-black/25 p-2 rounded border border-white/10 leading-relaxed text-left">
                          Clues: {wheelCategories[selectedCategoryIdx].desc}
                        </p>
                        
                        <div className="mt-4 pt-3 border-t border-white/25">
                          <p className="text-[10px] uppercase font-mono font-black text-amber-300 tracking-wider">AWARD POINT FOR COMPLETED CLAUSE:</p>
                          <div className="flex gap-2 mt-2">
                            <button onClick={(e) => { e.stopPropagation(); awardPoint('A', 1); }} className="flex-1 py-1.5 text-xs font-black uppercase font-mono bg-black/40 hover:bg-black/80 text-white border border-white/30 rounded cursor-pointer transition active:translate-y-[1px]">+1 Alpha</button>
                            <button onClick={(e) => { e.stopPropagation(); awardPoint('B', 1); }} className="flex-1 py-1.5 text-xs font-black uppercase font-mono bg-black/40 hover:bg-black/80 text-white border border-white/30 rounded cursor-pointer transition active:translate-y-[1px]">+1 Sigma</button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Timer Area */}
                <div className="mt-4 pt-4 border-t-2 border-slate-200 flex flex-col items-center gap-2.5">
                  <div className="bg-teal-300 border-2 border-slate-900 px-4 py-1.5 rounded-xl font-mono text-base font-black text-slate-950 shadow-[2px_2px_0px_0px_#000] flex items-center gap-1.5">
                    <span>Countdown Clock: 00:{wheelTimer < 10 ? `0${wheelTimer}` : wheelTimer}</span>
                  </div>
                  <div className="flex gap-2 w-full">
                    <button
                      id="btn-timer-start"
                      disabled={isSpinning}
                      onClick={startWheelTimer}
                      className="flex-1 text-center py-2 bg-slate-900 text-white rounded-xl text-xs font-black border-2 border-slate-900 hover:bg-slate-800 cursor-pointer shadow-[2px_2px_0px_0px_#000]"
                    >
                      Start Clock
                    </button>
                    <button
                      id="btn-timer-reset"
                      onClick={() => {
                        setIsTimerRunning(false);
                        setWheelTimer(30);
                        sound.playClick();
                      }}
                      className="px-3 py-2 bg-white border-2 border-slate-900 rounded-xl text-xs font-black text-slate-800 hover:bg-slate-50 cursor-pointer shadow-[2px_2px_0px_0px_#000]"
                    >
                      Reset
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* --- GAME 2: TRUE OR FALSE SHOWDOWN --- */}
        {activeGame === 'showdown' && (
          <div className="flex flex-col items-center w-full grow justify-between">
            <h3 className="text-xl font-black text-slate-950 border-b-2 border-slate-200 pb-3 mb-6 w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 uppercase tracking-tight">
              <span>🔴 True or False Showdown!</span>
              <span className="text-xs bg-rose-100 border-2 border-slate-900 text-rose-900 font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-[2px_2px_0px_0px_#000]">Stand Up = True | Sit Down = False</span>
            </h3>

            {showdownIdx < showdownQuestions.length ? (
              <div className="w-full text-center flex flex-col justify-between items-center">
                <div className="p-3 bg-slate-100 border-2 border-slate-900 rounded-xl w-full text-xs font-mono font-black text-slate-700 mb-6 flex justify-between shadow-[2px_2px_0px_0px_#000]">
                  <span>SHOWDOWN CARD {showdownIdx + 1}/{showdownQuestions.length}</span>
                  <span>SLIDE {showdownQuestions[showdownIdx].slide}</span>
                </div>

                <div className="bg-rose-50 border-4 border-slate-900 p-8 rounded-[30px] mb-8 min-h-40 flex flex-col justify-center items-center text-center w-full shadow-[6px_6px_0px_0px_#0f172a]">
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 italic font-mono max-w-3xl leading-relaxed">
                    "{showdownQuestions[showdownIdx].text}"
                  </p>
                </div>

                {showdownAnswered === null ? (
                  <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                    <button
                      id="btn-showdown-true"
                      onClick={() => {
                        onGamePlayed('showdown');
                        const isCorrect = showdownQuestions[showdownIdx].correct === true;
                        setShowdownAnswered(true);
                        if (isCorrect) {
                          sound.playCorrect();
                        } else {
                          sound.playWrong();
                        }
                      }}
                      className="w-full sm:w-64 py-5 bg-emerald-400 hover:bg-emerald-350 text-slate-955 text-sm font-black border-4 border-slate-900 uppercase rounded-2xl shadow-[4px_4px_0px_0px_#000] cursor-pointer flex flex-col items-center gap-1.5"
                    >
                      <span className="text-2xl">🧍‍♂️</span>
                      <span>STAND UP (TRUE)</span>
                    </button>

                    <button
                      id="btn-showdown-false"
                      onClick={() => {
                        onGamePlayed('showdown');
                        const isCorrect = showdownQuestions[showdownIdx].correct === false;
                        setShowdownAnswered(false);
                        if (isCorrect) {
                          sound.playCorrect();
                        } else {
                          sound.playWrong();
                        }
                      }}
                      className="w-full sm:w-64 py-5 bg-rose-455 bg-rose-400 hover:bg-rose-350 text-slate-955 text-sm font-black border-4 border-slate-900 uppercase rounded-2xl shadow-[4px_4px_0px_0px_#000] cursor-pointer flex flex-col items-center gap-1.5"
                    >
                      <span className="text-2xl">🧎‍♀️</span>
                      <span>SIT DOWN (FALSE)</span>
                    </button>
                  </div>
                ) : (
                  <div className="text-center w-full animate-fade-in flex flex-col items-center">
                    <div className="bg-slate-50 p-5 rounded-2xl border-2 border-slate-900 inline-block max-w-md w-full mb-6 shadow-[3px_3px_0px_0px_#0f172a]">
                      <p className="text-base font-black tracking-tight flex items-center justify-center gap-2 mb-2">
                        {showdownAnswered === showdownQuestions[showdownIdx].correct ? (
                          <span className="text-emerald-600">🎉 SUCCESSFUL DISCOVERY!</span>
                        ) : (
                          <span className="text-rose-500">⚠️ WRONG DECISION ACTION!</span>
                        )}
                      </p>
                      <p className="text-xs text-slate-650 leading-relaxed font-bold">
                        Correct statement state is: <span className="underline font-black text-indigo-700 bg-white px-1.5">{showdownQuestions[showdownIdx].correct ? 'TRUE (Stand Up!)' : 'FALSE (Sit Down!)'}</span>.
                      </p>

                      <div className="mt-4 pt-3 border-t border-slate-200">
                        <p className="text-[10px] uppercase font-mono font-black text-indigo-650 mb-1.5">Award survival point to team:</p>
                        <div className="flex gap-2 justify-center">
                          <button onClick={() => awardPoint('A', 1)} className="px-3 py-1 bg-teal-100 hover:bg-teal-200 text-teal-800 text-[10px] font-black font-mono border border-slate-900 rounded cursor-pointer shadow-[1px_1px_0px_0px_#000] active:translate-y-[1px] active:shadow-none">+1 Alpha</button>
                          <button onClick={() => awardPoint('B', 1)} className="px-3 py-1 bg-rose-100 hover:bg-rose-200 text-rose-800 text-[10px] font-black font-mono border border-slate-900 rounded cursor-pointer shadow-[1px_1px_0px_0px_#000] active:translate-y-[1px] active:shadow-none">+1 Sigma</button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <button
                        id="btn-showdown-next"
                        onClick={() => {
                          setShowdownAnswered(null);
                          setShowdownIdx(idx => idx + 1);
                          sound.playClick();
                        }}
                        className="px-8 py-3 bg-amber-400 hover:bg-amber-350 border-2 border-slate-900 text-slate-950 font-black rounded-xl text-xs uppercase shadow-[2px_2px_0px_0px_#000] cursor-pointer"
                      >
                        Next Showdown Clause →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-6 w-full animate-fade-in">
                <div className="inline-block p-4 rounded-xl bg-rose-400 text-slate-95 w-fit border-2 border-slate-900 shadow-[2px_2px_0px_0px_#000] mb-4 text-3xl">🔴</div>
                <h4 className="text-xl font-black text-slate-900 uppercase">Showdown Deck Cleared!</h4>
                <p className="text-xs text-gray-600 mt-2 max-w-sm mx-auto font-black uppercase">
                  Class completed all stand/sit health diagnosis trials. Reset loops below!
                </p>
                <div className="mt-8 flex justify-center">
                  <button
                    id="btn-showdown-restart"
                    onClick={() => {
                      setShowdownIdx(0);
                      setShowdownAnswered(null);
                      sound.playClick();
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-slate-900 font-black rounded-xl text-xs uppercase shadow-[2px_2px_0px_0px_#000] hover:bg-slate-50 cursor-pointer text-slate-800"
                  >
                    <RefreshCw className="h-4 w-4" /> Restart Showdown Loop
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* --- GAME 3: KAHOOT QUIZ --- */}
        {activeGame === 'kahoot' && (
          <div className="flex flex-col h-full justify-between w-full">
            <div className="flex justify-between items-center border-b-2 border-slate-200 pb-3 mb-6">
              <h3 className="text-xl font-black text-slate-950 uppercase tracking-tight">🟣 Kahoot Quiz Arena</h3>
              <div className="flex items-center gap-1 bg-rose-100 border-2 border-slate-900 px-3 py-1 rounded-full text-rose-900 font-mono font-black text-xs shadow-[2px_2px_0px_0px_#000]">
                <span>QUIZ CLOCK: {kahootTimer} SEC</span>
              </div>
            </div>

            <div className="bg-slate-900 text-white rounded-[24px] p-6 mb-6 text-center border-4 border-slate-900 shadow-[4px_4px_0px_0px_#000] relative min-h-32 flex flex-col justify-center items-center">
              <span className="text-[10px] uppercase font-black tracking-widest bg-emerald-500/10 border border-emerald-500/30 text-[#10b981] px-3 py-1 rounded-full mb-3 font-mono">QUESTION {kahootIdx + 1} OF {kahootDeck.length}</span>
              <p className="text-xl md:text-2xl font-black tracking-tight italic font-mono text-teal-105 text-amber-200">"{kahootDeck[kahootIdx].q}"</p>
            </div>

            {/* Answer color tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {kahootDeck[kahootIdx].options.map((option) => {
                const isSelected = kahootChoice === option.key;
                const isCorrect = option.correct === true;
                
                let borderStyle = 'border-slate-900 border-4 shadow-[4px_4px_0px_0px_#000]';
                if (kahootRevealed) {
                  if (isCorrect) borderStyle = 'border-emerald-400 border-4 shadow-[2px_2px_0px_0px_#000]';
                  else if (isSelected) borderStyle = 'border-rose-400 border-4 opacity-50 shadow-none';
                  else borderStyle = 'opacity-25 border-slate-900 border-2';
                }

                return (
                  <button
                    key={option.key}
                    id={`btn-kahoot-${option.key}`}
                    disabled={kahootRevealed}
                    onClick={() => selectKahootOption(option)}
                    className={`p-5 rounded-xl text-left text-white font-black flex items-center justify-between transition-all cursor-pointer border-2 duration-100 ${option.bg} ${borderStyle} active:translate-y-[2px]`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="p-1 px-2.5 bg-black/30 rounded-lg text-sm font-mono font-black border border-white/20">{option.key}</span>
                      <span className="text-sm sm:text-base tracking-normal uppercase font-black">{option.text}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {kahootRevealed && (
              <div className="mt-6 bg-[#fefaf0] border-2 border-slate-900 p-5 rounded-2xl flex flex-col gap-4 shadow-[3px_3px_0px_0px_#000]">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-wider text-indigo-650 font-mono block">GRAMMAR CRITICAL SUMMARY</span>
                    <p className="text-xs text-slate-700 font-bold mt-1">Rule: {kahootDeck[kahootIdx].hint}</p>
                  </div>
                  <button
                    id="btn-kahoot-next"
                    onClick={nextKahoot}
                    className="px-5 py-2.5 bg-amber-400 border-2 border-slate-900 hover:bg-amber-350 text-slate-950 text-xs font-black rounded-lg cursor-pointer shadow-[2px_2px_0px_0px_#000] uppercase shrink-0"
                  >
                    {kahootIdx < kahootDeck.length - 1 ? 'Next Question →' : 'Restart Loop ↺'}
                  </button>
                </div>
                
                <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 font-mono">Award point to quickest correct answer:</span>
                  <div className="flex gap-2">
                    <button onClick={() => awardPoint('A', 1)} className="px-3 py-1 bg-teal-100 hover:bg-teal-200 text-teal-850 text-[10px] font-black font-mono border border-slate-900 rounded-lg cursor-pointer shadow-[1px_1px_0px_0px_#000] active:translate-y-[1px] active:shadow-none">+1 Alpha</button>
                    <button onClick={() => awardPoint('B', 1)} className="px-3 py-1 bg-rose-100 hover:bg-rose-200 text-rose-855 text-rose-850 text-[10px] font-black font-mono border border-slate-900 rounded-lg cursor-pointer shadow-[1px_1px_0px_0px_#000] active:translate-y-[1px] active:shadow-none">+1 Sigma</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* --- GAME 4: HOT SEAT --- */}
        {activeGame === 'hotseat' && (
          <div className="flex flex-col items-center w-full grow justify-between">
            <h3 className="text-xl font-black text-slate-950 border-b-2 border-slate-200 pb-3 mb-6 w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 uppercase tracking-tight">
              <span>🔥 Hot Seat - Describe It!</span>
              <span className="text-xs bg-purple-100 border-2 border-slate-900 text-purple-900 font-black tracking-wider px-3 py-1 rounded-full shadow-[2px_2px_0px_0px_#000]">Active Class Presentation Play</span>
            </h3>

            {!hotseatRunning ? (
              <div className="text-center py-4 w-full flex flex-col items-center">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1 font-mono">Configure HotSeat Round</p>
                <h4 className="text-sm font-bold text-slate-700 mb-6">Choose vocab subset for classmate to define:</h4>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center w-full max-w-lg">
                  <button
                    id="btn-deck-illness"
                    onClick={() => { setHotseatDeckName('illness'); sound.playClick(); }}
                    className={`flex-1 py-4 px-6 rounded-2xl border-2 text-xs font-black cursor-pointer transition uppercase tracking-tight shadow-[2px_2px_0px_0px_#0f172a] ${
                      hotseatDeckName === 'illness' 
                        ? 'bg-rose-100 border-slate-900 text-slate-950 font-black' 
                        : 'bg-white border-slate-250 text-slate-700 hover:border-slate-900'
                    }`}
                  >
                    🤒 Unit 7 - Illness List
                  </button>
                  <button
                    id="btn-deck-themepark"
                    onClick={() => { setHotseatDeckName('themepark'); sound.playClick(); }}
                    className={`flex-1 py-4 px-6 rounded-2xl border-2 text-xs font-black cursor-pointer transition uppercase tracking-tight shadow-[2px_2px_0px_0px_#0f172a] ${
                      hotseatDeckName === 'themepark' 
                        ? 'bg-indigo-100 border-slate-900 text-slate-950 font-black' 
                        : 'bg-white border-slate-250 text-slate-700 hover:border-slate-900'
                    }`}
                  >
                    🎢 Unit 8 - Theme Park List
                  </button>
                </div>

                <button
                  id="btn-hotseat-launch"
                  onClick={startHotseat}
                  className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white text-xs border-2 border-slate-900 font-extrabold rounded-2xl transition shadow-[4px_4px_0px_0px_#000] cursor-pointer flex items-center justify-center gap-2 max-w-sm"
                >
                  <Play className="h-4 w-4 text-emerald-405 text-emerald-450" /> Start 60-Second Arena!
                </button>
              </div>
            ) : (
              <div className="w-full flex flex-col items-center animate-fade-in">
                
                {/* Stats board */}
                <div className="flex justify-between items-center bg-[#fefaf0] border-2 border-slate-900 rounded-xl p-4 w-full mb-6 shadow-[2px_2px_0px_0px_#000]">
                  <div className="flex items-center gap-1.5 font-mono font-black text-xs text-rose-700">
                    <span>COOLDOWN: {hotseatTimer < 10 ? `0${hotseatTimer}` : hotseatTimer} SEC</span>
                  </div>
                  <div className="text-xs font-black text-slate-900 font-mono uppercase">
                    SCORE: <span className="text-[#8b5cf6]">{hotseatScore} ACCUMULATED WORD</span>
                  </div>
                </div>

                {/* Secret word board */}
                <div className="bg-slate-950 text-white border-4 border-slate-900 rounded-3xl p-8 mb-6 min-h-44 w-full flex flex-col justify-center items-center text-center shadow-[4px_4px_0px_0px_#000]">
                  {isHotseatHidden ? (
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-3xl">👀</span>
                      <p className="text-xs font-black uppercase tracking-wider text-teal-400">Word is hidden from seated player</p>
                      <button
                        id="btn-hotseat-reveal"
                        onClick={() => { setIsHotseatHidden(false); sound.playClick(); }}
                        className="mt-3 text-[10px] bg-teal-400 border-2 border-slate-900 text-slate-950 shadow-[2px_2px_0px_0px_#000] px-4 py-1.5 rounded-lg font-black"
                      >
                        REVEAL SECRET WORD NOW
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <span className="text-xs font-black text-[#f43f5e] uppercase tracking-widest font-mono mb-2">DESCRIBE THIS DEFINITION:</span>
                      <h4 className="text-5xl md:text-6xl lg:text-7xl font-black text-teal-400 font-mono tracking-tight uppercase bg-black/40 border-2 border-slate-800 p-5 rounded-2xl shadow-[4px_4px_0px_0px_#000]">{activeHotseatDeck[hotseatIdx]}</h4>
                      <p className="text-xs text-slate-350 mt-4 font-black">Classmate must guess exact spelling! No saying root!</p>
                      <button
                        id="btn-hotseat-hide"
                        onClick={() => { setIsHotseatHidden(true); sound.playClick(); }}
                        className="mt-4 text-[9px] uppercase font-black text-slate-400 hover:text-white"
                      >
                        [Hide word again]
                      </button>
                    </div>
                  )}
                </div>

                {/* Descriptor triggers */}
                <div className="flex flex-col gap-3 w-full max-w-md">
                  <div className="flex gap-4 justify-center">
                    <button
                      id="btn-hotseat-correct"
                      onClick={hotseatCorrect}
                      className="flex-1 py-3.5 bg-emerald-400 border-2 border-slate-900 text-slate-900 font-black rounded-xl text-xs sm:text-xs shadow-[2px_2px_0px_0px_#000] hover:bg-emerald-300 cursor-pointer uppercase transition"
                    >
                      Guessed! ✅ (+1 Word Score)
                    </button>
                    <button
                      id="btn-hotseat-pass"
                      onClick={hotseatPass}
                      className="py-3.5 px-6 border-2 border-slate-900 bg-white text-slate-800 font-bold hover:bg-slate-50 rounded-xl text-xs sm:text-xs shadow-[2px_2px_0px_0px_#000] cursor-pointer uppercase"
                    >
                      Pass
                    </button>
                  </div>
                  
                  <div className="bg-slate-100 border-2 border-slate-900 p-3.5 rounded-2xl flex flex-col items-center gap-2">
                    <p className="text-[10px] uppercase font-mono font-black text-slate-650">Award point directly to team:</p>
                    <div className="flex gap-2 w-full">
                      <button onClick={() => awardPoint('A', 1)} className="flex-1 py-1 px-2.5 bg-teal-105 bg-teal-100 hover:bg-teal-200 text-teal-800 text-[10px] font-black font-mono border border-slate-900 rounded shadow-[1px_1px_0px_0px_#000] cursor-pointer active:translate-y-[1px] active:shadow-none">+1 Alpha</button>
                      <button onClick={() => awardPoint('B', 1)} className="flex-1 py-1 px-2.5 bg-rose-105 bg-rose-100 hover:bg-rose-200 text-rose-800 text-[10px] font-black font-mono border border-slate-900 rounded shadow-[1px_1px_0px_0px_#000] cursor-pointer active:translate-y-[1px] active:shadow-none">+1 Sigma</button>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>
        )}

        {/* --- GAME 5: WORD SCRAMBLER --- */}
        {activeGame === 'scramble' && (
          <div className="flex flex-col items-center h-full justify-between w-full">
            <h3 className="text-xl font-black text-slate-950 border-b-2 border-slate-200 pb-3 mb-6 w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 uppercase tracking-tight">
              <span>🔤 Interactive Word Scrambler</span>
              <span className="text-xs bg-teal-100 border-2 border-slate-900 text-teal-800 font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-[2px_2px_0px_0px_#000]">Sentence Construction</span>
            </h3>

            <div className="w-full">
              {/* Tracker */}
              <div className="flex justify-between text-xs font-mono font-black text-slate-555 mb-4 px-1">
                <span>SCRAMBLE CARD {scrambleIdx + 1}/{scrambleSentences.length}</span>
                <span>GRADE 4 GRAMMAR STANDARD</span>
              </div>

              {/* Clue sentence info */}
              <div className="bg-[#fefaf0] border-4 border-slate-900 rounded-[28px] p-6 sm:p-8 text-center text-slate-900 mb-8 shadow-[4px_4px_0px_0px_#0f172a]">
                <span className="text-xs uppercase font-extrabold tracking-widest text-[#4f46e5] font-mono block mb-2">🇮🇩 INDONESIAN CLUE (ARTI ALUR):</span>
                <span className="text-xl sm:text-2xl md:text-3xl font-black text-slate-950 block leading-relaxed select-none">
                  "{scrambleSentences[scrambleIdx].text}"
                </span>
              </div>

              {/* Working Board */}
              <div className="bg-white border-2 border-dashed border-slate-400 rounded-2xl p-6 min-h-24 flex flex-wrap gap-2.5 items-center justify-center mb-6 shadow-inner">
                {userConstruction.length === 0 ? (
                  <span className="text-sm text-slate-450 font-black uppercase tracking-wide">Tap scrambled options below to link the sentence block...</span>
                ) : (
                  userConstruction.map((word, index) => (
                    <button
                      key={index}
                      onClick={() => removeWordFromConstruction(word, index)}
                      className="px-4 py-2.5 bg-slate-900 hover:bg-rose-500 hover:text-white border-2 border-slate-900 text-white rounded-xl text-sm sm:text-base font-black transition flex items-center gap-1.5 cursor-pointer shadow-[2px_2px_0px_0px_#000]"
                      title="Tap item to remove"
                    >
                      <span>{word}</span>
                      <span className="text-xs text-rose-350 font-black">×</span>
                    </button>
                  ))
                )}
              </div>

              {/* Shuffled pool inputs */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {shuffledPool.map((word, index) => {
                  return (
                    <button
                      key={index}
                      onClick={() => addWordToConstruction(word, index)}
                      className="px-4 py-2.5 bg-yellow-105 bg-amber-100 hover:bg-[#facc15] text-slate-900 border-2 border-slate-900 rounded-xl text-sm sm:text-base font-black shadow-[2px_2px_0px_0px_#000] cursor-pointer transition-all"
                    >
                      {word}
                    </button>
                  );
                })}
              </div>

              {/* Action panels triggers */}
              {scrambleAnswered === null ? (
                <div className="flex gap-4 justify-center">
                  <button
                    id="btn-scramble-clear"
                    onClick={() => {
                      const sentence = scrambleSentences[scrambleIdx];
                      setShuffledPool([...sentence.words]);
                      setUserConstruction([]);
                      sound.playClick();
                    }}
                    className="px-6 py-3 border-2 border-slate-900 bg-white text-slate-800 font-black rounded-xl text-xs uppercase shadow-[2px_2px_0px_0px_#000] hover:bg-slate-50 cursor-pointer"
                  >
                    Wipe Slate
                  </button>
                  <button
                    id="btn-scramble-check"
                    disabled={userConstruction.length === 0}
                    onClick={checkSentenceConstruction}
                    className="px-8 py-3 bg-teal-400 border-2 border-slate-900 hover:bg-teal-350 disabled:bg-slate-105 disabled:text-slate-405 text-slate-955 font-black rounded-xl text-xs uppercase shadow-[2px_2px_0px_0px_#000] cursor-pointer disabled:cursor-not-allowed"
                  >
                    Submit Arrangement ✅
                  </button>
                </div>
              ) : (
                <div className="text-center animate-fade-in flex flex-col items-center">
                  <div className="bg-slate-50 border-2 border-slate-900 p-5 inline-block rounded-xl text-xs sm:text-sm font-bold max-w-lg w-full mb-6 shadow-[3px_3px_0px_0px_#0f172a]">
                    {scrambleAnswered ? (
                      <p className="text-emerald-600 font-black">🎉 Brilliant! Absolutely perfect sentence structure!</p>
                    ) : (
                      <div>
                        <p className="text-rose-500 font-black mb-2">⚠️ Not quite correct! Match structure carefully.</p>
                        <p className="text-[10px] font-extrabold text-[#5f52ee]">Target Grammar: "{scrambleSentences[scrambleIdx].full}"</p>
                      </div>
                    )}

                    <div className="mt-4 pt-3 border-t border-slate-200">
                      <p className="text-[10px] uppercase font-mono font-black text-[#6366f1] mb-1.5">Award sentence points to team:</p>
                      <div className="flex gap-2 justify-center">
                        <button onClick={() => awardPoint('A', 1)} className="px-3 py-1 bg-teal-100 hover:bg-teal-200 text-teal-850 text-[10px] font-black font-mono border border-slate-900 rounded cursor-pointer shadow-[1px_1px_0px_0px_#000] active:translate-y-[1px] active:shadow-none">+1 Alpha</button>
                        <button onClick={() => awardPoint('B', 1)} className="px-3 py-1 bg-rose-100 hover:bg-rose-200 text-rose-850 text-[10px] font-black font-mono border border-slate-900 rounded cursor-pointer shadow-[1px_1px_0px_0px_#000] active:translate-y-[1px] active:shadow-none">+1 Sigma</button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <button
                      id="btn-scramble-next"
                      onClick={() => {
                        if (scrambleIdx < scrambleSentences.length - 1) {
                          setScrambleIdx(idx => idx + 1);
                        } else {
                          setScrambleIdx(0);
                        }
                      }}
                      className="px-8 py-3 bg-[#facc15] hover:bg-amber-400 border-2 border-slate-900 text-slate-950 font-black rounded-xl text-xs uppercase shadow-[2px_2px_0px_0px_#000] cursor-pointer"
                    >
                      {scrambleIdx < scrambleSentences.length - 1 ? 'Next Scramble Task →' : 'Restart Scrambler ↺'}
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>

    </div>
  );
}
