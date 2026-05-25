import React from 'react';
import { BookOpen, GraduationCap, Users, Play, CheckCircle, Volume2, VolumeX, Award, Maximize2, Minimize2 } from 'lucide-react';
import { sound } from './SoundManager';

interface HeaderProps {
  isTeacherMode: boolean;
  setIsTeacherMode: (val: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  masteryPercentage: number;
  genAlphaMode: boolean;
  setGenAlphaMode: (val: boolean) => void;
  isHeaderCollapsed: boolean;
  setIsHeaderCollapsed: (val: boolean) => void;
}

export default function Header({
  isTeacherMode,
  setIsTeacherMode,
  soundEnabled,
  setSoundEnabled,
  activeTab,
  setActiveTab,
  masteryPercentage,
  genAlphaMode,
  setGenAlphaMode,
  isHeaderCollapsed,
  setIsHeaderCollapsed
}: HeaderProps) {
  
  const toggleSound = () => {
    const newVal = !soundEnabled;
    setSoundEnabled(newVal);
    sound.enabled = newVal;
    sound.playClick();
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard 🏠', icon: GraduationCap },
    { id: 'flashcards-u7', label: 'Unit 7 Vocab 🩺', icon: BookOpen },
    { id: 'flashcards-u8', label: 'Unit 8 Vocab 🎢', icon: BookOpen },
    { id: 'grammar', label: 'Grammar Labs ⚙️', icon: CheckCircle },
    { id: 'arcade', label: 'Class Games 🎮', icon: Play },
    { id: 'mock-sat', label: 'Mock SAT 📝', icon: Award }
  ];

  return (
    <header className="bg-white text-slate-900 border-b-4 border-slate-900 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Logo / Branding: Hides when collapsed */}
        {!isHeaderCollapsed && (
          <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 gap-4 animate-fade-in">
            
            {/* Top Logo / Branding */}
            <div className="flex items-center space-x-4">
              <div className="bg-indigo-600 text-white p-3 rounded-2xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] flex items-center justify-center">
                <GraduationCap className="h-7 w-7 text-white animate-pulse" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 block">Tunas Iblam Elementary</span>
                <h1 className="text-xl md:text-2xl font-black font-sans tracking-tight text-slate-950 flex items-center gap-2 flex-wrap uppercase">
                  English Hub: <span className="bg-rose-450 bg-rose-400 text-slate-950 text-xs font-black tracking-tight px-3 py-1 rounded-full border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">Units 7 & 8</span>
                </h1>
              </div>
            </div>

            <div className="flex items-center flex-wrap gap-4">
              {/* Mode Switcher */}
              <div className="bg-slate-100 p-1 rounded-2xl border-2 border-slate-900 flex items-center shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                <button
                  id="btn-student-mode"
                  onClick={() => {
                    setIsTeacherMode(false);
                    sound.playClick();
                  }}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wide transition-all cursor-pointer ${
                    !isTeacherMode
                      ? 'bg-emerald-400 text-slate-950 border-2 border-slate-900 shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]'
                      : 'text-slate-600 hover:text-slate-950 border-2 border-transparent'
                  }`}
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>Student</span>
                </button>
                
                <button
                  id="btn-teacher-mode"
                  onClick={() => {
                    setIsTeacherMode(true);
                    sound.playClick();
                  }}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wide transition-all cursor-pointer ${
                    isTeacherMode
                      ? 'bg-amber-400 text-slate-950 border-2 border-slate-900 shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]'
                      : 'text-slate-600 hover:text-slate-950 border-2 border-transparent'
                  }`}
                >
                  <Users className="h-3.5 w-3.5" />
                  <span>Teacher</span>
                </button>
              </div>

              {/* Aura Mode Switch */}
              <button
                id="btn-alpha-mode-toggle"
                onClick={() => {
                  const newValue = !genAlphaMode;
                  setGenAlphaMode(newValue);
                  if (newValue) {
                    sound.playCorrect();
                  } else {
                    sound.playClick();
                  }
                }}
                className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-black uppercase tracking-wide transition-all cursor-pointer border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] ${
                  genAlphaMode
                    ? 'bg-purple-400 text-slate-950 font-black animate-pulse'
                    : 'bg-white hover:bg-slate-50 text-slate-800'
                }`}
                title="Toggle Aura Mode Translation"
              >
                <span>🧠⚡</span>
                <span className="hidden sm:inline">Aura Mode</span>
                <span className="inline sm:hidden">Aura</span>
                <span className={`text-[9px] px-1 rounded border border-slate-900 font-extrabold ${genAlphaMode ? 'bg-white text-purple-700' : 'bg-slate-100 text-slate-400'}`}>
                  {genAlphaMode ? 'ON' : 'OFF'}
                </span>
              </button>

              {/* Sound Toggler */}
              <button
                id="btn-sound-toggle"
                onClick={toggleSound}
                className={`p-2.5 rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] transition-all cursor-pointer duration-150 active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] ${
                  soundEnabled
                    ? 'bg-teal-400 hover:bg-teal-300 text-slate-950'
                    : 'bg-slate-200 hover:bg-slate-350 text-slate-500'
                }`}
                title={soundEnabled ? 'Mute Sounds' : 'Unmute Sounds'}
              >
                {soundEnabled ? <Volume2 className="h-4.5 w-4.5" /> : <VolumeX className="h-4.5 w-4.5" />}
              </button>
              
              {/* Mastery Tracker Header */}
              <div className="hidden sm:flex items-center space-x-3 bg-white p-2 rounded-2xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                <div className="relative h-4 w-24 bg-slate-200 border-2 border-slate-900 rounded-full overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full bg-emerald-400 border-r-2 border-slate-900 transition-all duration-500"
                    style={{ width: `${masteryPercentage}%` }}
                  />
                </div>
                <span className="text-xs font-black uppercase font-sans text-slate-900">{masteryPercentage}% Progress</span>
              </div>
            </div>
          </div>
        )}

        {/* Global Tab & Collapser Navigation */}
        <div className={`py-2.5 ${!isHeaderCollapsed ? 'border-t-2 border-slate-900/10' : ''}`}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 flex-wrap">
            <div className="flex items-center space-x-2.5 overflow-x-auto no-scrollbar py-1 flex-1">
              {isHeaderCollapsed && (
                <div className="flex items-center space-x-1.5 bg-indigo-600 text-white rounded-xl border-2 border-slate-900 px-3 py-1.5 shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] font-sans font-black text-xs shrink-0 select-none uppercase tracking-tight">
                  🏫 English Hub
                </div>
              )}
              <nav className="flex space-x-2 sm:space-x-3 overflow-x-auto no-scrollbar" aria-label="Tabs">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  
                  // Neo-brutalist tab colors
                  let tabBg = 'bg-white border-2 border-slate-900 text-slate-700 font-bold shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]';
                  if (isActive) {
                    if (isTeacherMode) {
                      tabBg = 'bg-amber-400 text-slate-950 font-black border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] translate-y-[-2px]';
                    } else if (item.id === 'flashcards' || item.id === 'flashcards-u7' || item.id === 'flashcards-u8') {
                      tabBg = 'bg-orange-400 text-slate-950 font-black border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] translate-y-[-2px]';
                    } else if (item.id === 'grammar') {
                      tabBg = 'bg-rose-450 bg-rose-400 text-slate-950 font-black border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] translate-y-[-2px]';
                    } else if (item.id === 'arcade') {
                      tabBg = 'bg-emerald-400 text-slate-950 font-black border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] translate-y-[-2px]';
                    } else if (item.id === 'mock-sat') {
                      tabBg = 'bg-indigo-600 text-white font-black border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] translate-y-[-2px]';
                    } else {
                      tabBg = 'bg-teal-400 text-slate-950 font-black border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] translate-y-[-2px]';
                    }
                  }

                  return (
                    <button
                      key={item.id}
                      id={`nav-${item.id}`}
                      onClick={() => {
                        setActiveTab(item.id);
                        sound.playClick();
                      }}
                      className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs md:text-sm font-bold uppercase tracking-tight transition-all duration-150 whitespace-nowrap cursor-pointer ${tabBg}`}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Right side controllers */}
            <div className="flex items-center gap-2 shrink-0 justify-end">
              {isHeaderCollapsed && (
                <>
                  {/* Dense mode info indicator */}
                  <div className="px-2.5 py-1.5 bg-slate-100 border-2 border-slate-900 rounded-lg text-[10px] uppercase font-mono font-black text-slate-700 hidden sm:block shrink-0 shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] select-none">
                    {isTeacherMode ? "👑 TEACHER" : "👶 STUDENT"}
                  </div>

                  {/* Dense sound controller */}
                  <button
                    id="btn-sound-toggle-collapsed"
                    onClick={toggleSound}
                    className={`p-1.5 rounded-lg border-2 border-slate-900 shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] transition-all cursor-pointer duration-150 active:translate-y-[1px] active:shadow-none shrink-0 ${
                      soundEnabled ? 'bg-teal-400 text-slate-950' : 'bg-slate-200 text-slate-500'
                    }`}
                    title={soundEnabled ? 'Mute Sounds' : 'Unmute Sounds'}
                  >
                    {soundEnabled ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
                  </button>

                  {/* Dense aura controller */}
                  <button
                    id="btn-alpha-mode-toggle-collapsed"
                    onClick={() => {
                      const newValue = !genAlphaMode;
                      setGenAlphaMode(newValue);
                      if (newValue) { sound.playCorrect(); } else { sound.playClick(); }
                    }}
                    className={`px-2 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wide border-2 border-slate-900 shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] transition-all cursor-pointer shrink-0 active:translate-y-[1px] active:shadow-none ${
                      genAlphaMode ? 'bg-purple-400 text-slate-950 animate-pulse' : 'bg-white text-slate-800'
                    }`}
                    title="Aura Mode"
                  >
                    <span>🧠⚡</span>
                  </button>
                </>
              )}

              {/* Expand / Collapse trigger */}
              <button
                id="btn-header-collapse-toggle"
                onClick={() => {
                  setIsHeaderCollapsed(!isHeaderCollapsed);
                  sound.playClick();
                }}
                className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer border-2 border-slate-900 shadow-[1.5px_1.5px_0px_0px_#0f172a] active:translate-y-[1px] active:shadow-none shrink-0 ${
                  isHeaderCollapsed 
                    ? 'bg-amber-400 text-slate-950' 
                    : 'bg-slate-900 text-amber-300'
                }`}
                title={isHeaderCollapsed ? "Expand Navigation Menu" : "Collapse Menu for Presentation Focus"}
              >
                {isHeaderCollapsed ? (
                  <>
                    <Maximize2 className="h-3 w-3 shrink-0" />
                    <span>📺 EXPAND</span>
                  </>
                ) : (
                  <>
                    <Minimize2 className="h-3 w-3 shrink-0" />
                    <span>📺 FOCUS</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}
