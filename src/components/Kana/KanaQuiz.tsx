import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ChevronRight, AlertCircle } from 'lucide-react';
import { kanaData } from '../../data/kana';

interface KanaQuizProps {
  system: 'hiragana' | 'katakana';
  groups: string[];
  onBack: () => void;
  onComplete: (stats: { correct: number, wrong: number, total: number, mistakes: any[], timeElapsed: number }) => void;
}

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
};

export const KanaQuiz = ({ system, groups, onBack, onComplete }: KanaQuizProps) => {
  const validChars = React.useMemo(() => {
    const chars = groups.flatMap(group => (kanaData[system] as any)[group].filter((c: any) => c.jp !== ''));
    // Fisher-Yates shuffle
    for (let i = chars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    return chars;
  }, [system, groups]);
  
  const total = validChars.length;
  
  const [answers, setAnswers] = useState<{[key: number]: string}>({});
  const [status, setStatus] = useState<{[key: number]: 'correct'|'incorrect'}>({});
  const inputRefs = useRef<{[key: number]: HTMLInputElement | null}>({});
  
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  
  const correctCount = Object.values(status).filter(s => s === 'correct').length;
  const incorrectCount = Object.values(status).filter(s => s === 'incorrect').length;
  const doneCount = correctCount + incorrectCount;
  const isFinished = doneCount === total;
  
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isTimerRunning && !isFinished) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, isFinished]);
  
  const handleInput = (idx: number, val: string) => {
    if (status[idx]) return; // Locked
    if (!isTimerRunning && !isFinished) setIsTimerRunning(true);
    setAnswers(prev => ({ ...prev, [idx]: val }));
  };
  
  const handleBlurOrEnter = (idx: number, val: string) => {
    if (status[idx]) return;
    if (val.trim() !== '') {
      if (val.trim().toLowerCase() === validChars[idx].r.toLowerCase()) {
        setStatus(prev => ({ ...prev, [idx]: 'correct' }));
      } else {
        setStatus(prev => ({ ...prev, [idx]: 'incorrect' }));
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number, val: string) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleBlurOrEnter(idx, val);
      
      let nextIdx = idx + 1;
      while (nextIdx < total && status[nextIdx]) {
        nextIdx++;
      }
      
      if (nextIdx < total && inputRefs.current[nextIdx]) {
        inputRefs.current[nextIdx]?.focus();
      }
    }
  };

  const colorCls = system === 'hiragana' ? 'rose' : 'indigo';

  return (
    <div className="flex flex-col flex-1 h-full min-h-0 w-full bg-[#FAF8F5] dark:bg-slate-950 rounded-inherit overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 md:px-8 py-5 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-20 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            Kiểm tra: {groups.length} Nhóm ({system === 'hiragana' ? 'Hiragana' : 'Katakana'})
          </h2>
          <p className="text-sm font-medium text-slate-500 mt-1 flex items-center gap-2">
            <AlertCircle size={14} className="text-orange-400 shrink-0" />
            Nhập romaji tương ứng. Gõ đúng thẻ sẽ xanh, sai sẽ đỏ.
          </p>
        </div>
        <button onClick={onBack} className="w-10 h-10 shrink-0 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-500">
          <X size={20} />
        </button>
      </div>

      {/* Grid Body */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8 transform-gpu">
        <div className="max-w-[1200px] mx-auto grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 md:gap-6 pb-20">
          {validChars.map((char: any, idx: number) => {
             const st = status[idx];
             const val = answers[idx] || '';
             
             let boxBg = "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 shadow-sm";
             if (st === 'correct') boxBg = "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-400 dark:border-emerald-500 shadow-md shadow-emerald-500/10";
             if (st === 'incorrect') boxBg = "bg-rose-50 dark:bg-rose-900/20 border-rose-400 dark:border-rose-500 shadow-md shadow-rose-500/10";

             return (
               <motion.div 
                 key={idx}
                 animate={
                   st === 'correct' ? { scale: [1, 1.05, 1] } : 
                   st === 'incorrect' ? { x: [-5, 5, -5, 5, 0] } : 
                   {}
                 }
                 transition={{ duration: 0.3 }}
                 className={`rounded-2xl border-2 flex flex-col p-3 relative overflow-hidden transition-colors ${boxBg}`}
               >
                 <div className="flex-1 flex items-center justify-center min-h-[60px]">
                   <span className={`text-3xl font-jp font-medium ${st === 'incorrect' ? 'text-rose-500' : 'text-slate-800 dark:text-slate-100'}`}>
                     {char.jp}
                   </span>
                 </div>
                 
                 <div className="relative mt-2">
                   <input
                     ref={(el) => { inputRefs.current[idx] = el; }}
                     type="text"
                     value={val}
                     disabled={!!st}
                     onChange={(e) => handleInput(idx, e.target.value)}
                     onKeyDown={(e) => handleKeyDown(e, idx, val)}
                     onBlur={() => handleBlurOrEnter(idx, val)}
                     className={`w-full text-center text-sm font-bold py-1.5 rounded-lg border-2 outline-none transition-all ${
                       st === 'correct' ? 'border-emerald-200 bg-white text-emerald-600' :
                       st === 'incorrect' ? 'border-rose-200 bg-white text-rose-600' :
                       'border-slate-100 bg-slate-50 focus:border-blue-400 focus:bg-white text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200'
                     }`}
                     placeholder="..."
                     autoComplete="off"
                     spellCheck="false"
                   />
                   {st === 'correct' && (
                     <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-2 top-1/2 -translate-y-1/2 text-emerald-500">
                       <Check size={14} strokeWidth={4} />
                     </motion.div>
                   )}
                   {st === 'incorrect' && (
                     <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-2 top-1/2 -translate-y-1/2 text-rose-500">
                       <X size={14} strokeWidth={4} />
                     </motion.div>
                   )}
                 </div>

                 <AnimatePresence>
                   {st === 'incorrect' && (
                     <motion.div 
                       initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                       className="mt-2 text-center"
                     >
                       <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400">Đ.án: <span className="text-xs">{char.r}</span></span>
                     </motion.div>
                   )}
                 </AnimatePresence>

               </motion.div>
             );
          })}
        </div>
      </div>

      {/* Footer / Progress */}
      <div className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 md:px-8 flex items-center justify-between sticky bottom-0 z-20">
        <div className="flex-1 max-w-md">
           <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
             <span>Tiến độ: {doneCount} / {total}</span>
             <span className="text-emerald-500">Đúng: {correctCount}</span>
             <span className="text-rose-500">Sai: {incorrectCount}</span>
           </div>
           <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden flex">
             <div className="bg-emerald-500 h-full transition-all duration-300" style={{ width: `${(correctCount/total)*100}%` }}></div>
             <div className="bg-rose-500 h-full transition-all duration-300" style={{ width: `${(incorrectCount/total)*100}%` }}></div>
           </div>
        </div>
        
        <div className="flex items-center gap-4 sm:gap-6 ml-4 sm:ml-6">
          <div className="flex flex-col items-end hidden sm:flex">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Thời gian</span>
            <span className={`text-xl font-black font-mono leading-none ${isTimerRunning && !isFinished ? `text-${colorCls}-500` : 'text-slate-600 dark:text-slate-300'}`}>
              {formatTime(timeElapsed)}
            </span>
          </div>
          <button 
            disabled={!isFinished}
            onClick={() => {
              const mistakes = validChars.map((char: any, i: number) => ({
                jp: char.jp,
                user: answers[i] || '',
                correct: char.r,
                isWrong: status[i] === 'incorrect'
              })).filter((m: any) => m.isWrong);
              onComplete({ correct: correctCount, wrong: incorrectCount, total, mistakes, timeElapsed });
            }}
            className={`px-6 sm:px-8 py-3 rounded-xl font-bold text-sm shadow-sm transition-all flex items-center gap-2 ${
              isFinished 
              ? `bg-${colorCls}-500 hover:bg-${colorCls}-600 text-white hover:-translate-y-0.5 shadow-lg shadow-${colorCls}-500/30` 
              : 'bg-slate-100 text-slate-400 cursor-not-allowed border-2 border-transparent'
            }`}
          >
            Nộp bài <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
