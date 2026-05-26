import React, { useState } from 'react';
import { 
  BookOpen, 
  GraduationCap, 
  Users, 
  Play, 
  CheckCircle, 
  Volume2, 
  VolumeX, 
  Award, 
  Maximize2, 
  Minimize2, 
  Menu, 
  X 
} from 'lucide-react';
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
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
    sound.playClick();
  };

  return (
    <header className="bg-white text-slate-900 border-b-4 border-slate-900 sticky top-0 z-50 shadow-[0_4px_0_0_rgba(15,23,42,0.05)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP BRANDING BAR: Visible when NOT collapsed (Desktop) OR always styled on Mobile */}
        <div className={`flex items-center justify-between py-3 md:py-4 ${isHeaderCollapsed ? 'lg:hidden' : 'border-b-2 border-slate-900/10'}`}>
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 text-white p-2.5 rounded-xl border-2 border-slate-900 shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)] flex items-center justify-center">
              <GraduationCap className="h-5.5 w-5.5 text-white animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 block leading-none">Tunas Iblam</span>
              <h1 className="text-base md:text-xl font-black font-sans tracking-tight text-slate-950 uppercase flex items-center gap-1.5 mt-0.5">
                <span>English Hub</span>
                <span className="hidden sm:inline-block bg-rose-400 text-slate-950 text-[10px] font-black tracking-widest px-2.5 py-0.5 rounded-full border-2 border-slate-900 shadow-[1px_1px_0px_0px_#000]">U7 & 8</span>
              </h1>
            </div>
          </div>

          {/* Right Action Widgets for Desktop (hidden on mobile, stacked in dropdown) */}
          <div className="hidden lg:flex items-center space-x-3.5">
            {/* Mode Switcher */}
            <div className="bg-slate-100 p-0.5 rounded-xl border-2 border-slate-900 flex items-center shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)]">
              <button
                id="btn-student-mode-desktop"
                onClick={() => {
                  setIsTeacherMode(false);
                  sound.playClick();
                }}
                className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wide transition-all cursor-pointer ${
                  !isTeacherMode
                    ? 'bg-emerald-400 text-slate-950 border-2 border-slate-900 shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]'
                    : 'text-slate-600 hover:text-slate-950 border-2 border-transparent'
                }`}
              >
                <BookOpen className="h-3 w-3" />
                <span>Student</span>
              </button>
              
              <button
                id="btn-teacher-mode-desktop"
                onClick={() => {
                  setIsTeacherMode(true);
                  sound.playClick();
                }}
                className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wide transition-all cursor-pointer ${
                  isTeacherMode
                    ? 'bg-amber-400 text-slate-950 border-2 border-slate-900 shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]'
                    : 'text-slate-600 hover:text-slate-950 border-2 border-transparent'
                }`}
              >
                <Users className="h-3 w-3" />
                <span>Teacher</span>
              </button>
            </div>

            {/* Aura Mode Switch */}
            <button
              id="btn-alpha-mode-desktop"
              onClick={() => {
                const newValue = !genAlphaMode;
                setGenAlphaMode(newValue);
                if (newValue) {
                  sound.playCorrect();
                } else {
                  sound.playClick();
                }
              }}
              className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wide transition-all cursor-pointer border-2 border-slate-900 shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)] active:translate-y-[1px] active:shadow-none ${
                genAlphaMode
                  ? 'bg-purple-400 text-slate-950 font-black animate-pulse'
                  : 'bg-white hover:bg-slate-50 text-slate-800'
              }`}
            >
              <span>🧠⚡ Aura</span>
              <span className={`text-[8px] px-0.5 rounded border border-slate-900 font-extrabold ${genAlphaMode ? 'bg-white text-purple-705' : 'bg-slate-100 text-slate-400'}`}>
                {genAlphaMode ? 'ON' : 'OFF'}
              </span>
            </button>

            {/* Sound Toggler */}
            <button
              id="btn-sound-toggle-desktop"
              onClick={toggleSound}
              className={`p-2 rounded-lg border-2 border-slate-900 shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)] transition-all cursor-pointer active:translate-y-[1px] active:shadow-none ${
                soundEnabled
                  ? 'bg-teal-400 hover:bg-teal-300 text-slate-950'
                  : 'bg-slate-200 hover:bg-slate-300 text-slate-550'
              }`}
              title={soundEnabled ? 'Mute' : 'Unmute'}
            >
              {soundEnabled ? <Volume2 className="h-3.5 w-3.5 text-slate-950" /> : <VolumeX className="h-3.5 w-3.5 text-slate-500" />}
            </button>
            
            {/* Progress Bar Container */}
            <div className="flex items-center space-x-2 bg-white p-1.5 rounded-xl border-2 border-slate-900 shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)]">
              <div className="relative h-2.5 w-16 bg-slate-200 border border-slate-950 rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-emerald-400 border-r border-slate-900 transition-all duration-500"
                  style={{ width: `${masteryPercentage}%` }}
                />
              </div>
              <span className="text-[9px] font-black uppercase font-mono text-slate-800">{masteryPercentage}%</span>
            </div>
          </div>

          {/* Mobile Controller Triggers: Presentation trigger + Hamburger lines */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Sound toggle on main bar */}
            <button
              onClick={toggleSound}
              className={`p-1.5 rounded-lg border-2 border-slate-900 shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] transition-all cursor-pointer shrink-0 ${
                soundEnabled ? 'bg-teal-400 text-slate-950' : 'bg-slate-200 text-slate-500'
              }`}
            >
              {soundEnabled ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
            </button>

            {/* Presentation Mode Focus */}
            <button
              onClick={() => {
                setIsHeaderCollapsed(!isHeaderCollapsed);
                sound.playClick();
              }}
              className={`p-1.5 rounded-lg border-2 border-slate-900 shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] transition-all cursor-pointer shrink-0 ${
                isHeaderCollapsed ? 'bg-amber-400 text-slate-950' : 'bg-slate-900 text-amber-305 text-amber-300'
              }`}
              title="Compact View"
            >
              {isHeaderCollapsed ? <Maximize2 className="h-3.5 w-3.5" /> : <Minimize2 className="h-3.5 w-3.5" />}
            </button>

            {/* Mobile Hamburger Menu Toggle Button */}
            <button
              id="btn-mobile-menu-toggle"
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen);
                sound.playClick();
              }}
              className="p-1.5 rounded-lg border-2 border-slate-900 bg-indigo-50 hover:bg-indigo-100 text-slate-900 shadow-[1.5px_1.5px_0px_0px_#000] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer shrink-0"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-4.5 w-4.5 stroke-[2.5]" />
              ) : (
                <Menu className="h-4.5 w-4.5 stroke-[2.5]" />
              )}
            </button>
          </div>
        </div>

        {/* DESKTOP TABS BAR (Hidden on mobile, stays sticky inline) */}
        {!isHeaderCollapsed && (
          <div className="hidden lg:block py-2">
            <div className="flex items-center justify-between">
              <nav className="flex space-x-2.5 overflow-x-auto no-scrollbar py-1" aria-label="Tabs">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  
                  let tabBg = 'bg-white border-2 border-slate-900 text-slate-705 text-slate-700 font-bold shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]';
                  if (isActive) {
                    if (isTeacherMode) {
                      tabBg = 'bg-amber-405 bg-amber-400 text-slate-955 font-black border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] translate-y-[-1px]';
                    } else if (item.id.startsWith('flashcards')) {
                      tabBg = 'bg-orange-400 text-slate-950 font-black border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] translate-y-[-1px]';
                    } else if (item.id === 'grammar') {
                      tabBg = 'bg-rose-400 text-slate-950 font-black border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] translate-y-[-1px]';
                    } else if (item.id === 'arcade') {
                      tabBg = 'bg-emerald-400 text-slate-950 font-black border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] translate-y-[-1px]';
                    } else if (item.id === 'mock-sat') {
                      tabBg = 'bg-indigo-600 text-white font-black border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] translate-y-[-1px]';
                    } else {
                      tabBg = 'bg-teal-405 bg-teal-400 text-slate-950 font-black border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] translate-y-[-1px]';
                    }
                  }

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleTabClick(item.id)}
                      className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-tight transition-all duration-150 whitespace-nowrap cursor-pointer ${tabBg}`}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Focus mode toggler bar shortcut for desktop */}
              <button
                onClick={() => {
                  setIsHeaderCollapsed(!isHeaderCollapsed);
                  sound.playClick();
                }}
                className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer border-2 border-slate-900 bg-slate-900 text-amber-300 shadow-[1.5px_1.5px_0px_0px_#0f172a] active:translate-y-[1px] active:shadow-none shrink-0"
              >
                <Minimize2 className="h-3 w-3 shrink-0" />
                <span>FOCUS 📺</span>
              </button>
            </div>
          </div>
        )}

        {/* COMPACT PRESENTATION VIEW CONTROLLER BAR (only shown on wide screen when collapsed) */}
        {isHeaderCollapsed && (
          <div className="hidden lg:block py-2 select-none">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center space-x-2.5">
                <div className="flex items-center space-x-1.5 bg-indigo-600 text-white rounded-xl border-2 border-slate-900 px-3 py-1 shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] font-sans font-black text-xs shrink-0 uppercase tracking-tight">
                  🏫 English Hub
                </div>
                <nav className="flex space-x-2" aria-label="Tabs">
                  {menuItems.map((item) => {
                    const isActive = activeTab === item.id;
                    let tabBg = 'bg-white border-2 border-slate-900 text-slate-700 font-bold hover:bg-slate-50';
                    if (isActive) {
                      tabBg = 'bg-[#6366f1] text-white border-2 border-slate-900 font-black';
                    }

                    return (
                      <button
                        key={item.id}
                        onClick={() => handleTabClick(item.id)}
                        className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tight transition-all duration-100 whitespace-nowrap cursor-pointer ${tabBg}`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="flex items-center gap-2">
                <div className="px-2 py-1 bg-slate-100 border-2 border-slate-900 rounded-lg text-[9px] uppercase font-mono font-black text-slate-700 select-none">
                  {isTeacherMode ? "👑 TEACHER" : "👶 STUDENT"}
                </div>

                <button
                  onClick={toggleSound}
                  className={`p-1 rounded-lg border-2 border-slate-900 shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] transition-all cursor-pointer shrink-0 ${
                    soundEnabled ? 'bg-teal-400 text-slate-950' : 'bg-slate-200 text-slate-550'
                  }`}
                >
                  {soundEnabled ? <Volume2 className="h-3 w-3" /> : <VolumeX className="h-3 w-3" />}
                </button>

                <button
                  onClick={() => setIsHeaderCollapsed(false)}
                  className="flex items-center space-x-1 px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all cursor-pointer border-2 border-slate-900 bg-amber-400 text-slate-950 shadow-[1px_1px_0px_0px_#0f172a] active:translate-y-[1px] active:shadow-none shrink-0"
                >
                  <Maximize2 className="h-3 w-3 shrink-0" />
                  <span>EXPAND 📺</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MOBILE NAVIGATION DROPDOWN DRAWER: Toggled inside hamburger */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t-2 border-slate-900 py-4 pb-5 space-y-4 animate-fade-in select-none">
            
            {/* Nav Links Stack */}
            <div className="space-y-1.5">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 font-mono pl-1.5 mb-1">Navigation Menu</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  
                  let tabBg = 'bg-white border-2 border-slate-900 text-slate-700 font-extrabold hover:bg-slate-50 shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]';
                  if (isActive) {
                    if (isTeacherMode) {
                      tabBg = 'bg-amber-400 text-slate-950 border-2 border-slate-900 font-black shadow-[2px_2px_0px_0px_#000]';
                    } else if (item.id.startsWith('flashcards')) {
                      tabBg = 'bg-orange-400 text-slate-950 border-2 border-slate-900 font-black shadow-[2px_2px_0px_0px_#000]';
                    } else if (item.id === 'grammar') {
                      tabBg = 'bg-rose-455 bg-rose-400 text-slate-950 border-2 border-slate-900 font-black shadow-[2px_2px_0px_0px_#000]';
                    } else if (item.id === 'arcade') {
                      tabBg = 'bg-emerald-400 text-slate-950 border-2 border-slate-900 font-black shadow-[2px_2px_0px_0px_#000]';
                    } else if (item.id === 'mock-sat') {
                      tabBg = 'bg-indigo-600 text-white border-2 border-slate-900 font-black shadow-[2px_2px_0px_0px_#000]';
                    } else {
                      tabBg = 'bg-teal-400 text-slate-950 border-2 border-slate-900 font-black shadow-[2px_2px_0px_0px_#000]';
                    }
                  }

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleTabClick(item.id)}
                      className={`flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-tight transition-all cursor-pointer w-full text-left ${tabBg}`}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile Settings Row */}
            <div className="pt-3 border-t-2 border-dashed border-slate-205 border-slate-200 space-y-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 font-mono pl-1.5">Classroom & Engine Sync</p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Mobile teacher mode toggler */}
                <div className="bg-slate-100 p-1 rounded-xl border-2 border-slate-900 flex items-center justify-between flex-1 shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]">
                  <span className="text-[10px] uppercase font-mono font-black text-slate-500 pl-2">Role Select:</span>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => {
                        setIsTeacherMode(false);
                        sound.playClick();
                      }}
                      className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wide transition-all ${
                        !isTeacherMode ? 'bg-emerald-400 text-slate-950 border border-slate-900' : 'text-slate-605 text-slate-600'
                      }`}
                    >
                      Student
                    </button>
                    <button
                      onClick={() => {
                        setIsTeacherMode(true);
                        sound.playClick();
                      }}
                      className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wide transition-all ${
                        isTeacherMode ? 'bg-amber-400 text-slate-950 border border-slate-900' : 'text-slate-605 text-slate-600'
                      }`}
                    >
                      Teacher
                    </button>
                  </div>
                </div>

                {/* Aura mode switch on mobile */}
                <button
                  onClick={() => {
                    const newValue = !genAlphaMode;
                    setGenAlphaMode(newValue);
                    if (newValue) { sound.playCorrect(); } else { sound.playClick(); }
                  }}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-black uppercase tracking-wide transition-all border-2 border-slate-900 shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] flex-1 ${
                    genAlphaMode ? 'bg-purple-400 text-slate-950 animate-pulse' : 'bg-white text-slate-800'
                  }`}
                >
                  <span>🧠⚡ Toggles Aura Mode</span>
                  <span className="text-[9px] bg-black/10 px-1.5 py-0.5 rounded font-black">{genAlphaMode ? "ACTIVE" : "OFF"}</span>
                </button>
              </div>

              {/* Progress and Mastery indicator */}
              <div className="bg-slate-50 border-2 border-slate-900 p-3 rounded-xl flex items-center justify-between shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-600">Vocabulary Mastered</span>
                <div className="flex items-center space-x-3.5">
                  <div className="relative h-3 w-28 bg-slate-200 border border-slate-900 rounded-full overflow-hidden">
                    <div 
                      className="absolute top-0 left-0 h-full bg-emerald-400 border-r border-slate-900"
                      style={{ width: `${masteryPercentage}%` }}
                    />
                  </div>
                  <span className="text-xs font-black font-mono text-slate-950">{masteryPercentage}%</span>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </header>
  );
}
