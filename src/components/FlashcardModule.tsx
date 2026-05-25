import React, { useState } from 'react';
import { FLASHCARDS } from '../data/reviewData';
import { Flashcard } from '../types';
import { sound } from './SoundManager';
import { ChevronLeft, ChevronRight, RefreshCw, CheckCircle2, Circle, Eye, BookOpen, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const ALPHAZ_LINGO: { [word: string]: { slang: string, desc: string, eg: string } } = {
  'Sore throat': {
    slang: 'Choked Aura 🔇',
    desc: 'When your vocal cords lose their skibidi rizz because your throat is cooked from coughing too hard.',
    eg: 'My throat is so cooked that I have absolute negative rizz when singing, fr fr.'
  },
  'High temperature / Fever': {
    slang: 'Max Overheat Cooking 🔥',
    desc: 'When your body temperature hits max overheat and starts cooking. No cap, your brain is melting.',
    eg: 'Bro is cooking at 39°C. Total overheat, needs some ice, fr fr.'
  },
  'Stomachache': {
    slang: 'Tummy Skibidi Bloat 🤢',
    desc: 'When the spicy food backfires and does a Fanum Tax on your digesting vibes.',
    eg: 'My stomach is crying after eating those spicy chips. Pure Ohio vibes.'
  },
  'Headache': {
    slang: 'Lagging Intel Node 🤯',
    desc: 'When your brain has 999+ ping and is literally glitching. Bro is lagging.',
    eg: 'This lesson is so high-ping my brain is literally lagging with a headache.'
  },
  'Cholera': {
    slang: 'The Uncertified Poisoning 💀',
    desc: 'Catching the dirtiest germs from un-sigma swamp water. Absolute L-tier illness.',
    eg: 'Bro drank the Ohio river water and caught cholera, which is NOT sigma.'
  },
  'Flu': {
    slang: 'Low HP Debuff 🤧',
    desc: 'A common seasonal nerf. Your speed is slowed, your nose is running, and you have low aura.',
    eg: 'I got hit with the flu debuff. Current HP is literally 10, fr fr.'
  },
  'Thermometer': {
    slang: 'Aura Level Scanner 🌡️',
    desc: 'The tool that measures if your fever is too hyped or if your temp is chilling.',
    eg: 'The nurse took out the scanner to check if I was too hot-headed.'
  },
  'Bandage': {
    slang: 'Tough Guy Decal 🩹',
    desc: 'A sticky shield you slap on your battle scars to keep the dirt from taxes.',
    eg: 'Wrap a cool sticker around that cut so you look like a sigma.'
  },
  'Pills': {
    slang: 'Vibe Boosters 💊',
    desc: 'Small medicine nuggets you swallow to get your HP status bar back to green.',
    eg: 'Taking a yellow pill twice a day to cure my low-HP state.'
  },
  'Cream': {
    slang: 'Skin Polish Sauce 🧪',
    desc: 'The magical goop you rub on a skin nerf to restore your smooth textures.',
    eg: 'Bro is applying cream because his skin barrier lost its glow.'
  },
  'X-ray': {
    slang: 'Skeleton Reveal Scan 🦴',
    desc: 'Laser vision that takes a snapshot of your inner calcium structure. Super cool vibes.',
    eg: 'The dentist scanned me with lasers to see if my teeth are mewing correctly.'
  },
  'Cut': {
    slang: 'Battle Nerf 🩸',
    desc: 'A scratch on your skin barrier after falling down. Needs temporary patch.',
    eg: 'I got a cut while escaping a bumper car pileup, big L.'
  },
  'Roller coaster': {
    slang: 'Max Gravity Yeeter 🎢',
    desc: 'The fast rail ride that goes zoom-zoom and sends your stomach into the stratosphere.',
    eg: 'We rode the roller coaster and bro was screaming in lowercase, fr fr!'
  },
  'Ferris wheel': {
    slang: 'Slow Sky Looper 🎡',
    desc: 'A slowly turning wheel that takes you high so you can scout the whole lobby.',
    eg: 'Riding the slow sky looper to inspect if there are sigmas down below.'
  },
  'Bumper car': {
    slang: 'Destruction Derby Lobby 🚗',
    desc: 'Tiniest cars made for bumping into others with absolute legal crash physics. Peak fun!',
    eg: 'Bashing into my classmates in the bumper car lobby was pure peak entertainment.'
  },
  'Popcorn': {
    slang: 'Crunchy Cinema Nuggets 🍿',
    desc: 'Puffed corn that you munch on while watching the drama unfold.',
    eg: 'Spilling my popcorn because bro did an absolute fail on the roller coaster.'
  },
  'Hot dog': {
    slang: 'Glizzy Deluxe 🌭',
    desc: 'The legendary sausage-in-a-bun snack. Best glizzy in the park lobby.',
    eg: 'I ate a quick hot dog glizzy to recover my energy bar.'
  },
  'Cotton candy': {
    slang: 'Sweet Floof Cloud 🍭',
    desc: 'Spun sugar that dissolves instantly when it touches water. Sticky fingers but peak sweetness.',
    eg: 'Eating cotton candy. It is a cloud of pure sugar, no cap.'
  },
  'Potato chips': {
    slang: 'Crunchy Salt Crisps 🥔',
    desc: 'Thin salty slices of potato. Gives +5 crunches per bite.',
    eg: 'Sharing potato chips is real bro behavior, highly sigma.'
  },
  'Interested in': {
    slang: 'Fully Locked In 🎯',
    desc: 'When you are extremely hyped and paying 100% focus attention on something. You are invested!',
    eg: 'Yong is fully locked in watching the magic show, fr fr.'
  },
  'Worried about': {
    slang: 'Stressin’ fr fr 😰',
    desc: 'When your anxiety bar goes too high because someone got lost in the crowd.',
    eg: 'Uncle Bohai is stressin’ about Meili wanderin’ off into Ohio.'
  },
  'Scared of': {
    slang: 'Shooketh by 😱',
    desc: 'When a ride has too much speed or height and you lose your cool composure.',
    eg: 'Meili is shooketh by the roller coaster speed. Absolute jump scare.'
  },
  'Excited about': {
    slang: 'Hyped Up for 🎉',
    desc: 'Infinite energy levels for an upcoming activity. Max vibes activated.',
    eg: 'All the kids are extremely hyped up for the bumper car derby.'
  },
  'Stand in line': {
    slang: 'Queuing like an NPC 🚶‍♂️',
    desc: 'Waiting patiently in a straight line before entering. Real sigmas do not cut.',
    eg: 'We had to stand in line to buy rides passes like absolute NPCs.'
  },
  'Take a seat': {
    slang: 'Occupying the spot 🧎',
    desc: 'Sitting down and securing your buckle before the game starts.',
    eg: 'Please take a seat and prepare for extreme gravity loops!'
  },
  'Scream loudly': {
    slang: 'Main Character Sheesh 🗣️',
    desc: 'Letting out a huge yell when the coaster drops. Sheesh!',
    eg: 'When the bumper car hit me, I had to scream loudly, fr.'
  }
};

interface FlashcardModuleProps {
  progress: { unit7VocabReviewed: string[]; unit8VocabReviewed: string[] };
  onMarkReviewed: (id: string, unit: 7 | 8, mastered: boolean) => void;
  isTeacherMode: boolean;
  genAlphaMode?: boolean;
  forceUnit?: 7 | 8;
  key?: React.Key;
}

export default function FlashcardModule({
  progress,
  onMarkReviewed,
  isTeacherMode,
  genAlphaMode = false,
  forceUnit
}: FlashcardModuleProps) {
  const [selectedUnit, setSelectedUnit] = useState<'all' | 7 | 8>(forceUnit || 'all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Filter cards
  const filteredCards = FLASHCARDS.filter(card => {
    const matchesUnit = selectedUnit === 'all' || card.unit === selectedUnit;
    const matchesCategory = selectedCategory === 'all' || card.category === selectedCategory;
    return matchesUnit && matchesCategory;
  });

  const activeCard: Flashcard | undefined = filteredCards[currentIndex];

  const handleNext = () => {
    sound.playClick();
    setIsFlipped(false);
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Loop back
    }
  };

  const handlePrev = () => {
    sound.playClick();
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(filteredCards.length - 1); // Loop to end
    }
  };

  const handleFlip = () => {
    sound.playClick();
    setIsFlipped(!isFlipped);
  };

  const toggleMastery = (cardId: string, unit: 7 | 8) => {
    const isMastered = selectedUnit === 7 
      ? progress.unit7VocabReviewed.includes(cardId) 
      : progress.unit8VocabReviewed.includes(cardId);
      
    if (!isMastered) {
      sound.playCorrect();
    } else {
      sound.playClick();
    }
    onMarkReviewed(cardId, unit, !isMastered);
  };

  const categories = [
    { id: 'all', label: 'All Words' },
    { id: 'illness', label: 'Illnesses 🤒' },
    { id: 'medical-item', label: 'Medical Items 🩺' },
    { id: 'ride', label: 'Theme Park Rides 🎢' },
    { id: 'food', label: 'Food & Snacks 🍿' },
    { id: 'feeling', label: 'Feelings & Prepositions 🥰' },
    { id: 'activity', label: 'Park Activities 🎪' }
  ];

  const getCategoryThemeClass = (cat: string) => {
    switch (cat) {
      case 'illness': return 'bg-rose-100 text-rose-700 border-rose-400';
      case 'medical-item': return 'bg-cyan-155 bg-cyan-100 text-cyan-700 border-cyan-400';
      case 'ride': return 'bg-purple-100 text-purple-700 border-purple-400';
      case 'food': return 'bg-amber-100 text-amber-700 border-amber-400';
      case 'feeling': return 'bg-indigo-100 text-[#4f46e5] border-indigo-400';
      case 'activity': return 'bg-emerald-100 text-emerald-700 border-emerald-400';
      default: return 'bg-slate-100 text-slate-700 border-slate-400';
    }
  };

  const isCurrentMastered = activeCard 
    ? (activeCard.unit === 7 
        ? progress.unit7VocabReviewed.includes(activeCard.id) 
        : progress.unit8VocabReviewed.includes(activeCard.id))
    : false;

  return (
    <div className="max-w-4xl mx-auto px-4 py-4">
      
      {/* Intro section */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-black text-slate-950 flex items-center justify-center gap-2 uppercase tracking-tight">
          <span>🎴</span> Interactive Review Flashcards
        </h2>
        <p className="text-sm font-semibold text-slate-650 mt-1.5">
          Flip cards to study spelling, definitions, interactive prepositions, and contextual sentence examples!
        </p>
      </div>

      {/* Filter panel */}
      <div className="bg-white rounded-[32px] p-6 shadow-[6px_6px_0px_0px_#0f172a] border-4 border-slate-900 mb-8">
        
        {/* Unit Selector */}
        {!forceUnit && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b-2 border-slate-200 pb-4 mb-4 gap-3">
            <span className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-1.5 font-mono">
              <Layers className="h-4 w-4 text-indigo-650" /> Filter by Unit
            </span>
            <div className="flex bg-slate-100 border-2 border-slate-900 rounded-2xl p-1 gap-1 w-fit">
              <button
                id="filter-unit-all"
                onClick={() => { setSelectedUnit('all'); setCurrentIndex(0); setSelectedCategory('all'); sound.playClick(); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-tight cursor-pointer transition-all ${selectedUnit === 'all' ? 'bg-slate-905 bg-slate-900 text-white shadow-[1px_1px_0px_0px_#000]' : 'text-slate-600 hover:text-slate-900'}`}
              >
                All Units
              </button>
              <button
                id="filter-unit-7"
                onClick={() => { setSelectedUnit(7); setCurrentIndex(0); setSelectedCategory('all'); sound.playClick(); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-tight cursor-pointer transition-all ${selectedUnit === 7 ? 'bg-[#22c55e] text-slate-950 shadow-[1px_1px_0px_0px_#000] border border-slate-900' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Unit 7: Health 🩺
              </button>
              <button
                id="filter-unit-8"
                onClick={() => { setSelectedUnit(8); setCurrentIndex(0); setSelectedCategory('all'); sound.playClick(); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-tight cursor-pointer transition-all ${selectedUnit === 8 ? 'bg-indigo-600 text-white shadow-[1px_1px_0px_0px_#000] border border-slate-900' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Unit 8: Parks 🎢
              </button>
            </div>
          </div>
        )}

        {/* Category Scroll Filter */}
        <div className="flex space-x-2 overflow-x-auto py-1.5 no-scrollbar">
          {categories
            .filter(cat => cat.id === 'all' || FLASHCARDS.filter(c => selectedUnit === 'all' || c.unit === selectedUnit).some(c => c.category === cat.id))
            .map((cat) => {
              const isSel = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`filter-cat-${cat.id}`}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setCurrentIndex(0);
                    setIsFlipped(false);
                    sound.playClick();
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-tight whitespace-nowrap cursor-pointer transition-all border-2 ${
                    isSel 
                      ? 'bg-amber-400 border-slate-900 text-slate-950 shadow-[2px_2px_0px_0px_#0f172a]' 
                      : 'bg-white border-slate-900 text-slate-700 hover:bg-slate-50 shadow-[2px_2px_0px_0px_#0f172a]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
        </div>
      </div>

      {/* Main Flashcard View */}
      {filteredCards.length > 0 && activeCard ? (
        <div className="flex flex-col items-center">
          
          {/* Deck Counter */}
          <div className="w-full max-w-2xl flex justify-between items-center px-1 mb-3 text-xs text-slate-500 font-mono font-black">
            <span>DECK: {selectedCategory === 'all' ? 'Vocabulary Complete' : categories.find(c => c.id === selectedCategory)?.label}</span>
            <span className="bg-slate-200 border-2 border-slate-900 text-slate-900 px-2.5 py-1 rounded-lg">CARD {currentIndex + 1} OF {filteredCards.length}</span>
          </div>

          {/* Flashcard Component */}
          <div 
            id={`flashcard-${activeCard.id}`}
            onClick={handleFlip}
            className="w-full max-w-3xl h-[420px] md:h-[480px] relative cursor-pointer group mb-4"
            style={{ perspective: '1200px' }}
          >
            <div 
              className={`w-full h-full relative transition-all duration-500 rounded-[40px] border-4 border-slate-900 transform-gpu shadow-[8px_8px_0px_0px_#0f172a] ${isFlipped ? 'rotate-y-180' : ''}`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              
              {/* CARD FRONT */}
              <div 
                className="absolute inset-0 w-full h-full p-8 rounded-[36px] flex flex-col justify-between bg-white text-slate-950 backface-hidden"
              >
                <div className="flex justify-between items-center">
                  <span className={`px-5 py-2 rounded-full text-xs font-black border-2 uppercase tracking-wider ${getCategoryThemeClass(activeCard.category)}`}>
                    {activeCard.category.replace('-', ' ')}
                  </span>
                  <span className="text-sm font-black px-3 py-1.5 bg-slate-100 border-2 border-slate-900 rounded-xl">
                    UNIT {activeCard.unit}
                  </span>
                </div>

                <div className="flex-1 flex flex-col justify-center items-center text-center py-4">
                  <h3 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-slate-950 uppercase font-sans select-none">
                    {activeCard.word}
                  </h3>
                  {genAlphaMode && ALPHAZ_LINGO[activeCard.word] && (
                    <span className="mt-4 px-4 py-1.5 bg-purple-100 text-purple-700 animate-pulse border-2 border-purple-350 text-xs sm:text-sm rounded-full font-black uppercase font-mono shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                      ⚡ Aura definition available inside!
                    </span>
                  )}
                  {activeCard.category === 'feeling' && !genAlphaMode && (
                    <div className="mt-4 px-4 py-2 text-xs sm:text-sm font-mono font-black bg-indigo-50 text-indigo-700 rounded-xl border-2 border-indigo-200 animate-pulse-slow">
                      HINT: Prep pairings! (e.g. afraid of)
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center text-sm text-slate-500 font-bold border-t-2 border-slate-100 pt-4">
                  <span className="flex items-center gap-1.5"><Eye className="h-5 w-5 text-indigo-500" /> Click to view Bahasa translation</span>
                  <span className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 border-2 border-slate-900 text-slate-950 px-4 py-2 rounded-2xl transition-all font-mono font-black select-none"><RefreshCw className="h-4 w-4" /> FLIP</span>
                </div>
              </div>

              {/* CARD BACK */}
              <div 
                className={`absolute inset-0 w-full h-full p-8 rounded-[36px] flex flex-col justify-between text-white rotate-y-180 backface-hidden ${genAlphaMode ? 'bg-[#9333ea]' : 'bg-[#4f46e5]'}`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black bg-white/25 border-2 border-white/40 text-[#facc15] px-5 py-2 rounded-full uppercase tracking-widest">
                    {genAlphaMode ? '🧠 AURA DECODED' : '🇮🇩 BAHAZA INDONESIA'}
                  </span>
                  <span className="text-sm font-bold px-3 py-1.5 bg-white text-slate-950 border-2 border-slate-900 rounded-xl font-mono">
                    UNIT {activeCard.unit}
                  </span>
                </div>

                <div className="flex-1 flex flex-col justify-center items-center text-center py-2">
                  {genAlphaMode && ALPHAZ_LINGO[activeCard.word] ? (
                    <>
                      <p className="text-xs font-black uppercase tracking-wider text-purple-200">
                        Aura Definition & Pairing:
                      </p>
                      <h4 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#facc15] tracking-tight mt-1 mb-2 uppercase select-none">
                        {ALPHAZ_LINGO[activeCard.word].slang}
                      </h4>
                      <p className="text-xs font-black uppercase tracking-wider text-purple-200 mt-1">
                        Indonesian Translation (Arti Kata):
                      </p>
                      <span className="inline-block mt-0.5 mb-2 px-4 py-1.5 bg-white/20 hover:bg-white/30 border-2 border-white/30 rounded-2xl text-white font-black text-sm md:text-base transition">
                        🇮🇩 {activeCard.translation}
                      </span>
                    </>
                  ) : (
                    <>
                      <p className="text-xs font-black uppercase tracking-wider text-blue-200">
                        Indonesian Translation (Arti Kata):
                      </p>
                      <h4 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#facc15] tracking-tight mt-1 mb-4 uppercase select-none">
                        {activeCard.translation}
                      </h4>
                    </>
                  )}
                  
                  <div className="w-full max-w-xl bg-black/30 p-4 rounded-2xl border-2 border-indigo-400 text-sm md:text-base">
                    <p className="text-indigo-200 text-xs font-black uppercase tracking-wider text-left font-mono">
                      {genAlphaMode ? 'Aura explanation:' : 'Example in sentence:'}
                    </p>
                    <p className="text-white text-center font-bold italic mt-1.5 leading-relaxed text-sm sm:text-base md:text-lg">
                      {genAlphaMode && ALPHAZ_LINGO[activeCard.word]
                        ? `"${ALPHAZ_LINGO[activeCard.word].desc}"`
                        : `"${activeCard.example}"`}
                    </p>
                    {genAlphaMode && ALPHAZ_LINGO[activeCard.word] && (
                      <div className="mt-3 border-t border-white/10 pt-2.5 text-left">
                        <span className="text-[#facc15] text-[10px] sm:text-xs font-black uppercase tracking-wider font-mono">Example:</span>
                        <p className="text-white text-xs sm:text-sm font-semibold mt-0.5 italic">"{ALPHAZ_LINGO[activeCard.word].eg}"</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs sm:text-sm text-indigo-200 font-bold border-t border-indigo-500 pt-3 select-none">
                  <span>Click anywhere to hide translation</span>
                  <span className={`flex items-center gap-1.5 text-white px-3 py-1.5 rounded-xl font-mono font-bold ${genAlphaMode ? 'bg-purple-750 bg-purple-700' : 'bg-[#4338ca]'}`}><RefreshCw className="h-4 w-4 animate-spin-slow" /> FLIP BACK</span>
                </div>
              </div>

            </div>
          </div>

          {/* Card Control Panel */}
          <div className="flex items-center justify-between w-full max-w-md mt-6 gap-4">
            <button
              id="btn-prev-card"
              onClick={handlePrev}
              className="w-14 h-14 bg-white border-4 border-slate-900 text-slate-900 rounded-full flex items-center justify-center hover:bg-slate-50 shadow-[4px_4px_0px_0px_#0f172a] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#0f172a] transition-all cursor-pointer shrink-0"
              title="Previous Word"
            >
              <ChevronLeft className="h-6 w-6 stroke-[3px]" />
            </button>

            {/* Tap to flip button */}
            <button
              id="btn-flip-card"
              onClick={handleFlip}
              className="flex-1 bg-orange-400 text-slate-950 font-black text-sm uppercase tracking-tight py-4 px-4 rounded-2xl hover:bg-orange-350 transition-all border-4 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a] active:translate-y-[2px] active:hover:translate-y-[2px] cursor-pointer flex items-center justify-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Reveal / Flip Card</span>
            </button>

            <button
              id="btn-next-card"
              onClick={handleNext}
              className="w-14 h-14 bg-white border-4 border-slate-900 text-slate-900 rounded-full flex items-center justify-center hover:bg-slate-50 shadow-[4px_4px_0px_0px_#0f172a] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#0f172a] transition-all cursor-pointer shrink-0"
              title="Next Word"
            >
              <ChevronRight className="h-6 w-6 stroke-[3px]" />
            </button>
          </div>

          {/* Self-Study Mastery Tracker Button */}
          {!isTeacherMode && (
            <div className="mt-8 bg-[#fefaf0] border-4 border-slate-900 rounded-3xl p-5 w-full max-w-md text-center shadow-[4px_4px_0px_0px_#0f172a] flex flex-col items-center">
              <span className="text-xs font-black uppercase tracking-wider text-indigo-650 font-mono mb-1">Self-Mastery Check</span>
              <p className="text-xs font-bold text-slate-600 mb-4">Do you know this spelling & meaning by heart?</p>
              
              <button
                id={`btn-toggle-mastered-${activeCard.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMastery(activeCard.id, activeCard.unit);
                }}
                className={`w-full py-3 px-4 rounded-xl text-xs font-black uppercase tracking-tight flex items-center justify-center gap-2 border-2 transition-all cursor-pointer ${
                  isCurrentMastered
                    ? 'bg-emerald-400 border-slate-900 text-slate-950 shadow-[2px_2px_0px_0px_#0f172a]'
                    : 'bg-white border-slate-900 text-slate-700 hover:bg-slate-50 shadow-[2px_2px_0px_0px_#0f1000]'
                }`}
              >
                {isCurrentMastered ? (
                  <>
                    <CheckCircle2 className="h-5 w-5 text-slate-950 block" />
                    <span>Mastered! (Saved to Stamp Book)</span>
                  </>
                ) : (
                  <>
                    <Circle className="h-5 w-5 text-slate-400 block" />
                    <span>Still Practicing (Mark Mastered)</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Teacher presentation advice prompt */}
          {isTeacherMode && (
            <div className="mt-8 bg-amber-100 border-4 border-slate-900 rounded-[30px] p-5 w-full max-w-2xl text-slate-900 text-xs shadow-[4px_4px_0px_0px_#0f172a]">
              <span className="font-extrabold text-amber-800 uppercase tracking-widest text-[10px] block mb-1.5 font-mono">👨‍🏫 Teacher Review Activity Idea</span>
              Show the card spelling. Ask kids to define or translate the word as a team to score team points on the Board! Then click anywhere to verify.
            </div>
          )}

        </div>
      ) : (
        <div className="text-center bg-white border-4 border-slate-900 rounded-[32px] p-12 max-w-2xl mx-auto shadow-[6px_6px_0px_0px_#0f172a]">
          <BookOpen className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-900 font-extrabold uppercase">No words match the selected filters</p>
          <button
            onClick={() => { setSelectedCategory('all'); setSelectedUnit('all'); sound.playClick(); }}
            className="mt-4 px-4 py-2 bg-amber-400 border-2 border-slate-900 font-black rounded-xl text-xs uppercase hover:bg-amber-350 cursor-pointer text-slate-950"
          >
            Reset Filters
          </button>
        </div>
      )}

    </div>
  );
}
