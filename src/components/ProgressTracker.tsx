import React from 'react';
import { StudentProgress, ClassroomScores } from '../types';
import { sound } from './SoundManager';
import { Award, BookOpen, RotateCcw } from 'lucide-react';
import { FLASHCARDS } from '../data/reviewData';

interface ProgressTrackerProps {
  progress: StudentProgress;
  onResetProgress: () => void;
  isTeacherMode: boolean;
  teamScores: ClassroomScores;
}

export default function ProgressTracker({
  progress,
  onResetProgress,
  isTeacherMode,
  teamScores
}: ProgressTrackerProps) {
  
  // Calculate vocab count ratio
  const totalUnit7 = FLASHCARDS.filter(n => n.unit === 7).length;
  const totalUnit8 = FLASHCARDS.filter(n => n.unit === 8).length;

  const unit7Mastered = progress.unit7VocabReviewed.length;
  const unit8Mastered = progress.unit8VocabReviewed.length;

  const unit7Pct = Math.round((unit7Mastered / totalUnit7) * 100);
  const unit8Pct = Math.round((unit8Mastered / totalUnit8) * 100);

  // Unlocked stickers checklist
  const stickers = [
    {
      id: 'badge-h7',
      title: 'Health Clinician 🩺',
      desc: 'Mastered 3+ Unit 7 health words.',
      unlocked: unit7Mastered >= 3,
      badgeColor: 'bg-rose-400 text-slate-950 border-rose-500 shadow-rose-900/10'
    },
    {
      id: 'badge-p8',
      title: 'Park Ranger 🎡',
      desc: 'Mastered 3+ Unit 8 ride terms.',
      unlocked: unit8Mastered >= 3,
      badgeColor: 'bg-indigo-400 text-white border-indigo-500 shadow-indigo-900/10'
    },
    {
      id: 'badge-sat-champ',
      title: 'SAT Exam Hero 📝',
      desc: 'Completed Mock SAT simulator.',
      unlocked: progress.mockExamCompleted,
      badgeColor: 'bg-teal-400 text-slate-950 border-teal-500 shadow-teal-900/10'
    },
    {
      id: 'badge-arc',
      title: 'Arcade Champ 🎮',
      desc: 'Played interactive classroom games.',
      unlocked: progress.gamesPlayed.length > 0,
      badgeColor: 'bg-amber-400 text-slate-950 border-amber-500 shadow-amber-900/10'
    }
  ];

  const totalBadgesEarned = stickers.filter(s => s.unlocked).length;

  return (
    <div className="w-full space-y-6">
      
      {/* Lesson Progress Breakdown */}
      <div className="space-y-4">
        {/* Unit 7 bar */}
        <div>
          <div className="flex justify-between text-xs font-black text-slate-900 mb-1">
            <span>UNIT 7 (HEALTH)</span>
            <span className="font-mono">{unit7Mastered}/{totalUnit7} words</span>
          </div>
          <div className="h-4 w-full bg-slate-200 border-2 border-slate-900 rounded-full overflow-hidden">
            <div 
              className="h-full bg-orange-400 border-r-2 border-slate-900 transition-all duration-700"
              style={{ width: `${unit7Pct}%` }}
            />
          </div>
        </div>

        {/* Unit 8 bar */}
        <div>
          <div className="flex justify-between text-xs font-black text-slate-900 mb-1">
            <span>UNIT 8 (PARKS)</span>
            <span className="font-mono">{unit8Mastered}/{totalUnit8} words</span>
          </div>
          <div className="h-4 w-full bg-slate-200 border-2 border-slate-900 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#8b5cf6] border-r-2 border-slate-900 transition-all duration-700"
              style={{ width: `${unit8Pct}%` }}
            />
          </div>
        </div>

        {/* Exam track log */}
        <div className="bg-slate-100 border-2 border-slate-900 rounded-xl p-3 flex justify-between items-center text-xs shadow-[2px_2px_0px_0px_#0f172a]">
          <div>
            <span className="font-black text-slate-500 font-mono text-[10px] block uppercase leading-none">SAT SIMULATOR</span>
            <span className="font-bold text-slate-900 mt-1 block leading-none">
              {progress.mockExamCompleted ? `${progress.mockExamScore}/40 CORRECT` : 'NO RECORD LOGGED'}
            </span>
          </div>
          {progress.mockExamCompleted ? (
            <span className="bg-teal-350 bg-teal-300 text-slate-950 px-2.5 py-1 font-mono font-black border-2 border-slate-900 rounded text-[10px] uppercase">
              {Math.round((progress.mockExamScore! / 40) * 100)}% ACC
            </span>
          ) : (
            <span className="bg-amber-300 text-slate-950 px-2.5 py-1 font-mono font-black border-2 border-slate-900 rounded text-[10px]">PENDING</span>
          )}
        </div>
      </div>

      {/* Grid of Badges */}
      <div className="border-t-2 border-slate-200 pt-4">
        <div className="flex justify-between items-center mb-3">
          <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase font-mono">My STAMPS ({totalBadgesEarned}/{stickers.length})</span>
        </div>
        
        <div className="grid grid-cols-1 gap-2.5">
          {stickers.map(stamp => {
            return (
              <div 
                key={stamp.id}
                className={`flex items-center gap-2.5 p-2 rounded-xl border-2 transition-all ${
                  stamp.unlocked
                    ? 'bg-[#fefaf0] border-slate-900 text-slate-900 shadow-[2px_2px_0px_0px_#0f172a]'
                    : 'bg-slate-50 border-slate-200 text-slate-400 opacity-55'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg border-2 ${stamp.unlocked ? `${stamp.badgeColor} border-slate-900 shadow-[1px_1px_0px_0px_#0f172a]` : 'bg-slate-200 border-slate-300 text-slate-400'} flex items-center justify-center shrink-0`}>
                  <Award className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-black tracking-tight leading-none ${stamp.unlocked ? 'text-slate-900' : 'text-slate-400'}`}>{stamp.title}</p>
                  <p className="text-[10px] text-slate-500 truncate mt-0.5 leading-tight font-medium">{stamp.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reset progress */}
      <div className="border-t-2 border-slate-200 pt-3 flex justify-end">
        <button
          id="btn-wipe-analytics"
          onClick={() => {
            if (confirm('Are you sure you want to completely erase your vocabulary reviews and exam scores?')) {
              onResetProgress();
              sound.playWrong();
            }
          }}
          className="flex items-center gap-1.5 text-rose-500 hover:text-rose-600 text-[10px] font-black uppercase font-mono tracking-tight cursor-pointer"
        >
          <RotateCcw className="h-3 w-3" /> Reset Workspace Log
        </button>
      </div>

    </div>
  );
}
