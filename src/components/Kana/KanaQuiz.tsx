import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Check, 
  ChevronRight, 
  AlertCircle, 
  Timer, 
  Sparkles, 
  Zap, 
  CheckCircle2, 
  XCircle,
  HelpCircle,
  Keyboard,
  ArrowRight
} from 'lucide-react';
import { kanaData } from '../../data/kana';

interface KanaQuizProps {
  system: 'hiragana' | 'katakana';
  groups: string[];
  onBack: () => void;
  onComplete: (stats: { correct: number; wrong: number; total: number; mistakes: any[]; timeElapsed: number }) => void;
}

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
};

export const KanaQuiz = ({ system, groups, onBack, onComplete }: KanaQuizProps) => {
  const isHiragana = system === 'hiragana';

  const theme = isHiragana ? {
    name: 'Hiragana',
    kana: 'ひらがな',
    badge: 'border-rose-100 bg-rose-50 text-rose-600 dark:border-rose-900/40 dark:bg-rose-950/60 dark:text-rose-300',
    topRail: 'from-rose-500 via-pink-400 to-amber-400',
    iconBox: 'bg-gradient-to-br from-rose-500 to-pink-500 text-white shadow-rose-500/25',
    accentText: 'text-rose-600 dark:text-rose-400',
    focusRing: 'focus:border-rose-400 focus:ring-2 focus:ring-rose-400/20',
    submitBtn: 'from-rose-500 via-pink-500 to-amber-500 hover:from-rose-600 hover:to-pink-600 shadow-rose-500/25',
    progressBg: 'bg-rose-500',
  } : {
    name: 'Katakana',
    kana: 'カタカナ',
    badge: 'border-blue-100 bg-blue-50 text-blue-600 dark:border-blue-900/40 dark:bg-blue-950/60 dark:text-blue-300',
    topRail: 'from-blue-600 via-sky-400 to-cyan-400',
    iconBox: 'bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-blue-500/25',
    accentText: 'text-blue-600 dark:text-blue-400',
    focusRing: 'focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20',
    submitBtn: 'from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-700 hover:to-indigo-700 shadow-blue-500/25',
    progressBg: 'bg-blue-600',
  };

  const validChars = React.useMemo(() => {
    const chars = groups.flatMap(group => (kanaData[system] as any)[group]?.filter((c: any) => c.jp !== '') || []);
    // Fisher-Yates shuffle
    const shuffled = [...chars];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, [system, groups]);
  
  const total = validChars.length;
  
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [status, setStatus] = useState<{ [key: number]: 'correct' | 'incorrect' }>({});
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const inputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});
  
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  
  const correctCount = Object.values(status).filter(s => s === 'correct').length;
  const incorrectCount = Object.values(status).filter(s => s === 'incorrect').length;
  const doneCount = correctCount + incorrectCount;
  const isFinished = total > 0 && doneCount === total;
  
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isTimerRunning && !isFinished) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, isFinished]);

  // Focus the first item on load
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 150);
    return () => clearTimeout(timer);
  }, []);
  
  const handleInput = (idx: number, val: string) => {
    if (status[idx]) return; // Locked if answered
    if (!isTimerRunning && !isFinished) setIsTimerRunning(true);
    setAnswers(prev => ({ ...prev, [idx]: val.trim().toLowerCase() }));
  };
  
  const handleBlurOrEnter = (idx: number, val: string) => {
    if (status[idx]) return;
    const cleanVal = val.trim().toLowerCase();
    if (cleanVal !== '') {
      if (cleanVal === validChars[idx].r.toLowerCase()) {
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
      
      // Auto move to next unanswered box
      let nextIdx = -1;
      for (let i = 1; i <= total; i++) {
        const checkIdx = (idx + i) % total;
        if (!status[checkIdx] && (idx + i < total || checkIdx !== idx)) {
          nextIdx = checkIdx;
          break;
        }
      }
      
      if (nextIdx !== -1 && inputRefs.current[nextIdx]) {
        setFocusedIndex(nextIdx);
        inputRefs.current[nextIdx]?.focus();
      }
    }
  };

  const accuracy = doneCount === 0 ? 0 : Math.round((correctCount / doneCount) * 100);

  return (
    <div className="relative flex h-full min-h-0 w-full flex-1 flex-col overflow-hidden bg-[#FAF9F6] dark:bg-slate-950">
      {/* Top Accent Rail */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${theme.topRail}`} />

      {/* Modern Glassmorphic Header */}
      <div className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 py-3.5 sm:px-8 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90">
        <div className="flex items-center gap-3">
          <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-2xl font-jp text-lg font-black shadow-md ${theme.iconBox}`}>
            {isHiragana ? 'あ' : 'ア'}
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                Kiểm tra phản xạ Kana
              </h2>
              <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider ${theme.badge}`}>
                {theme.name}
              </span>
            </div>
            <p className="hidden text-xs font-semibold text-slate-500 dark:text-slate-400 sm:block">
              Nhập âm đọc Romaji tương ứng rồi bấm <kbd className="rounded bg-slate-100 px-1 py-0.5 font-mono text-[10px] dark:bg-slate-800">Enter</kbd> để kiểm tra
            </p>
          </div>
        </div>

        {/* Live Top Stats Tracker & Exit */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="hidden items-center gap-4 md:flex">
            <div className="flex flex-col items-center">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Tiến độ</span>
              <span className="text-sm font-black text-slate-800 dark:text-slate-100">{doneCount} / {total}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500">Đúng</span>
              <span className="text-sm font-black text-emerald-600">{correctCount}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[9px] font-black uppercase tracking-widest text-rose-500">Sai</span>
              <span className="text-sm font-black text-rose-600">{incorrectCount}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Thời gian</span>
              <span className={`font-mono text-sm font-black ${isTimerRunning ? theme.accentText : 'text-slate-700 dark:text-slate-300'}`}>
                {formatTime(timeElapsed)}
              </span>
            </div>
          </div>

          <button 
            type="button"
            onClick={onBack} 
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-rose-50 hover:text-rose-600 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-rose-950/40 dark:hover:text-rose-300"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Main Quiz Grid */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
        <div className="mx-auto grid max-w-[1100px] grid-cols-3 gap-3 pb-24 sm:grid-cols-4 sm:gap-4 md:grid-cols-5 lg:grid-cols-6">
          {validChars.map((char: any, idx: number) => {
            const st = status[idx];
            const val = answers[idx] || '';
            const isFocused = focusedIndex === idx;

            let cardTheme = 'border-slate-200/90 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-sm';
            if (st === 'correct') {
              cardTheme = 'border-emerald-400 bg-emerald-50/80 shadow-md shadow-emerald-500/10 dark:border-emerald-600 dark:bg-emerald-950/40';
            } else if (st === 'incorrect') {
              cardTheme = 'border-rose-400 bg-rose-50/80 shadow-md shadow-rose-500/10 dark:border-rose-600 dark:bg-rose-950/40';
            } else if (isFocused) {
              cardTheme = isHiragana
                ? 'border-rose-400 bg-white ring-2 ring-rose-400/30 shadow-md shadow-rose-500/10 dark:border-rose-600 dark:bg-slate-900'
                : 'border-blue-400 bg-white ring-2 ring-blue-400/30 shadow-md shadow-blue-500/10 dark:border-blue-600 dark:bg-slate-900';
            }

            return (
              <motion.div 
                key={idx}
                animate={
                  st === 'correct' ? { scale: [1, 1.05, 1] } : 
                  st === 'incorrect' ? { x: [-6, 6, -4, 4, 0] } : 
                  {}
                }
                transition={{ duration: 0.25 }}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border-2 p-2.5 sm:p-3.5 transition-all duration-200 ${cardTheme}`}
              >
                {/* Top Number indicator */}
                <div className="flex items-center justify-between text-[9px] font-black text-slate-300 dark:text-slate-600">
                  <span>#{idx + 1}</span>
                  {st === 'correct' && (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-emerald-500">
                      <Check size={13} strokeWidth={3.5} />
                    </motion.span>
                  )}
                  {st === 'incorrect' && (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-rose-500">
                      <X size={13} strokeWidth={3.5} />
                    </motion.span>
                  )}
                </div>

                {/* Kana Japanese Character */}
                <div className="my-1.5 flex min-h-[50px] items-center justify-center sm:min-h-[58px]">
                  <span className={`font-jp text-3xl sm:text-4xl font-black transition-colors ${
                    st === 'incorrect' ? 'text-rose-600 dark:text-rose-400' :
                    st === 'correct' ? 'text-emerald-600 dark:text-emerald-400' :
                    'text-slate-800 dark:text-slate-100'
                  }`}>
                    {char.jp}
                  </span>
                </div>
                
                {/* Romaji Input Field */}
                <div className="relative mt-1">
                  <input
                    ref={(el) => { inputRefs.current[idx] = el; }}
                    type="text"
                    value={val}
                    disabled={!!st}
                    onFocus={() => setFocusedIndex(idx)}
                    onChange={(e) => handleInput(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, idx, val)}
                    onBlur={() => handleBlurOrEnter(idx, val)}
                    className={`w-full rounded-xl border-2 py-1 text-center text-xs font-black outline-none transition-all ${
                      st === 'correct' ? 'border-emerald-200 bg-white text-emerald-600 dark:border-emerald-800 dark:bg-slate-800' :
                      st === 'incorrect' ? 'border-rose-200 bg-white text-rose-600 dark:border-rose-800 dark:bg-slate-800' :
                      `border-slate-100 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-100 ${theme.focusRing} focus:bg-white dark:focus:bg-slate-900`
                    }`}
                    placeholder="..."
                    autoComplete="off"
                    spellCheck="false"
                  />
                </div>

                {/* Wrong Answer Reveal */}
                <AnimatePresence>
                  {st === 'incorrect' && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }} 
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-1.5 text-center"
                    >
                      <span className="text-[10px] font-black text-rose-600 dark:text-rose-400">
                        Đ.án: <span className="text-xs uppercase font-bold">{char.r}</span>
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modern Floating Bottom Progress Bar */}
      <div className="sticky bottom-0 z-20 border-t border-slate-200/80 bg-white/95 px-4 py-3.5 shadow-lg backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95 sm:px-8">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4">
          {/* Dual Segment Progress Bar */}
          <div className="min-w-[200px] flex-1">
            <div className="mb-1.5 flex items-center justify-between text-xs font-black">
              <span className="text-slate-500 dark:text-slate-400">
                Tiến độ hoàn thành: <strong className="text-slate-900 dark:text-white">{doneCount} / {total}</strong>
              </span>
              <span className="text-slate-500 dark:text-slate-400">
                Đúng: <strong className="text-emerald-500">{correctCount}</strong> • Sai: <strong className="text-rose-500">{incorrectCount}</strong> ({accuracy}%)
              </span>
            </div>

            <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div 
                className="h-full bg-emerald-500 transition-all duration-300" 
                style={{ width: `${total ? (correctCount / total) * 100 : 0}%` }} 
              />
              <div 
                className="h-full bg-rose-500 transition-all duration-300" 
                style={{ width: `${total ? (incorrectCount / total) * 100 : 0}%` }} 
              />
            </div>
          </div>
          
          {/* Submit Action Button */}
          <div className="flex items-center gap-3">
            <button 
              type="button"
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
              className={`inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-xs font-black transition-all ${
                isFinished 
                  ? `bg-gradient-to-r text-white shadow-lg ${theme.submitBtn} hover:-translate-y-0.5` 
                  : 'cursor-not-allowed border border-slate-200 bg-slate-100 text-slate-400 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-500'
              }`}
            >
              <span>{isFinished ? 'Nộp bài & Xem kết quả' : 'Chưa hoàn thành hết'}</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
