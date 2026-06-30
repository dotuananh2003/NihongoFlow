import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, ArrowLeft, Trophy, Zap, Target, Timer, CheckCircle, RefreshCcw, Star, TrendingUp, ArrowRight, Check, X } from 'lucide-react';
import { kanaData } from '../../data/kana';
import { Confetti } from '../../components/Kana/Confetti';

const getChunks = (sys: 'hiragana'|'katakana', grp: string) => {
  const data = (kanaData[sys] as any)[grp];
  if (!data) return [];
  const sizes = grp === 'extended' 
     ? (sys === 'hiragana' ? [4, 3, 2, 2, 4, 4, 4] : [4, 4, 3, 2, 2, 4, 3])
     : (grp === 'yoon' ? 3 : 5);
  
  const result: any[][] = [];
  let i = 0;
  if (Array.isArray(sizes)) {
    for (const s of sizes) {
      if (i < data.length) {
        result.push(data.slice(i, i + s));
        i += s;
      }
    }
  } else {
    while (i < data.length) {
      result.push(data.slice(i, i + sizes));
      i += sizes;
    }
  }
  return result;
};

export const TypingPage = () => {
  const navigate = useNavigate();
  const [system, setSystem] = useState<'hiragana' | 'katakana' | null>(null);
  const [activeGroups, setActiveGroups] = useState<string[]>([]);
  const [gameState, setGameState] = useState<'selection' | 'typing' | 'result'>('selection');

  // Typing state
  const [chars, setChars] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{[key: number]: string}>({});
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [charStatus, setCharStatus] = useState<('correct'|'wrong'|null)[]>([]);
  
  // Stats
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);

  const inputRef = useRef<HTMLInputElement>(null);

  const requestFullscreen = () => {
    try {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch((e) => console.log(e));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const exitFullscreen = () => {
    try {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch((e) => console.log(e));
      }
    } catch (e) {
      console.log(e);
    }
  };

  // Initialize typing
  const startTyping = (sys: 'hiragana'|'katakana', selectedRows: string[]) => {
    requestFullscreen();
    setSystem(sys);
    setActiveGroups(selectedRows);
    
    const grouped: Record<string, number[]> = {};
    for (const r of selectedRows) {
      const [grp, idx] = r.split('-');
      if (!grouped[grp]) grouped[grp] = [];
      grouped[grp].push(parseInt(idx, 10));
    }
    
    const rawChars: any[] = [];
    for (const grp of Object.keys(grouped)) {
      const chunks = getChunks(sys, grp);
      for (const idx of grouped[grp]) {
        if (chunks[idx]) {
          rawChars.push(...chunks[idx].filter((c: any) => c.jp !== ''));
        }
      }
    }
    
    const shuffled = [...rawChars];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    setChars(shuffled);
    setCharStatus(new Array(shuffled.length).fill(null));
    setCurrentIndex(0);
    setAnswers({});
    setStatus('idle');
    setCorrectCount(0);
    setWrongCount(0);
    setCombo(0);
    setMaxCombo(0);
    setStartTime(Date.now());
    setGameState('typing');
  };

  useEffect(() => {
    if (gameState === 'typing' && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [gameState, currentIndex, status]);

  const handleInputChange = (idx: number, val: string) => {
    setAnswers(prev => ({ ...prev, [idx]: val.trim().toLowerCase() }));
    
    if (status === 'correct') return; // ignore if transitioning
    
    // Reset wrong status if they backspace or type
    if (status === 'wrong') setStatus('idle');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === 'Enter') {
      const currentChar = chars[idx];
      const val = (answers[idx] || '').trim().toLowerCase();
      if (val === '') return; // do not submit empty
      
      const isCorrect = val === currentChar.r.toLowerCase();
      const newStatus = isCorrect ? 'correct' : 'wrong';
      
      setStatus(newStatus);
      const nextStatuses = [...charStatus];
      nextStatuses[idx] = newStatus;
      setCharStatus(nextStatuses);

      if (isCorrect) {
        setCorrectCount(prev => prev + 1);
        setCombo(prev => {
          const newCombo = prev + 1;
          setMaxCombo(m => Math.max(m, newCombo));
          return newCombo;
        });
      } else {
        setWrongCount(prev => prev + 1);
        setCombo(0);
      }
      
      // Auto next to the first unanswered item after a brief delay
      setTimeout(() => {
        let nextIdx = -1;
        for (let i = 0; i < chars.length; i++) {
          const checkIdx = (idx + 1 + i) % chars.length;
          if (nextStatuses[checkIdx] === null) {
            nextIdx = checkIdx;
            break;
          }
        }
        
        if (nextIdx !== -1) {
          setCurrentIndex(nextIdx);
          setStatus('idle');
        } else {
          setEndTime(Date.now());
          setGameState('result');
        }
      }, 100);
    }
  };

  const formatTime = (ms: number) => {
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    return `${m.toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;
  };

  if (gameState === 'selection') {
    return (
      <div className="space-y-6 pb-12 ">
        {!system && (
          <button 
            onClick={() => navigate('/introduction')}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 transition-colors font-medium mb-6"
          >
            <ArrowLeft size={18} /> Nhập môn
          </button>
        )}

        <div className="mb-6">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-800 dark:text-slate-100 font-jp mb-2">
            {!system ? 'Luyện gõ Kana' : 'Luyện gõ Typing ⌨️'}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">
            {!system ? 'Chọn hệ chữ bạn muốn luyện.' : 'Chọn nhóm chữ để luyện gõ theo âm đọc.'}
          </p>
        </div>

        {system && (
          <div className="mb-8">
            <button 
              onClick={() => setSystem(null)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 font-bold transition-colors ${
                system === 'hiragana' 
                  ? 'border-rose-200 dark:border-rose-800/50 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/40 hover:border-rose-300 dark:hover:border-rose-700'
                  : 'border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 hover:border-blue-300 dark:hover:border-blue-700'
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-jp ${
                system === 'hiragana' ? 'bg-rose-200 dark:bg-rose-800' : 'bg-blue-200 dark:bg-blue-800'
              }`}>
                {system === 'hiragana' ? 'あ' : 'ア'}
              </div>
              {system === 'hiragana' ? 'Hiragana' : 'Katakana'}
            </button>
          </div>
        )}

        {!system ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            <button 
              onClick={() => setSystem('hiragana')}
              className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 text-center border-2 border-slate-100 dark:border-slate-800 hover:border-rose-300 transition-all hover:shadow-[0_20px_40px_rgb(225,29,72,0.1)] group flex flex-col items-center"
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-rose-50 dark:bg-rose-900/20 text-rose-500 flex items-center justify-center text-4xl font-jp font-black mb-4 group-hover:scale-110 transition-transform shadow-inner border border-rose-100 dark:border-rose-800">あ</div>
              <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2 uppercase tracking-wider">Hiragana</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium">Luyện gõ bảng chữ Hiragana</p>
              <div className="mt-auto px-10 py-3.5 rounded-2xl bg-rose-50 text-rose-600 font-black tracking-wide border border-rose-100 dark:bg-rose-900/20 dark:border-rose-800/50 group-hover:bg-rose-500 group-hover:text-white dark:group-hover:bg-rose-600 transition-all w-full md:w-auto shadow-sm">
                Bắt đầu
              </div>
            </button>
            <button 
              onClick={() => setSystem('katakana')}
              className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 text-center border-2 border-slate-100 dark:border-slate-800 hover:border-blue-300 transition-all hover:shadow-[0_20px_40px_rgb(59,130,246,0.1)] group flex flex-col items-center"
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-500 flex items-center justify-center text-4xl font-jp font-black mb-4 group-hover:scale-110 transition-transform shadow-inner border border-blue-100 dark:border-blue-800">ア</div>
              <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2 uppercase tracking-wider">Katakana</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium">Luyện gõ bảng chữ Katakana</p>
              <div className="mt-auto px-10 py-3.5 rounded-2xl bg-blue-50 text-blue-600 font-black tracking-wide border border-blue-100 dark:bg-blue-900/20 dark:border-blue-800/50 group-hover:bg-blue-500 group-hover:text-white dark:group-hover:bg-blue-600 transition-all w-full md:w-auto shadow-sm">
                Bắt đầu
              </div>
            </button>
          </div>
        ) : (
          <div className="">
            {/* Pill button is rendered above */}
            
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-4 md:p-6 shadow-sm">
              
              {/* ALL KANA Toggle */}
              <button 
                onClick={() => {
                  const allRows: string[] = [];
                  ['seion', 'dakuten', 'yoon', 'extended'].forEach(grp => {
                    const chunks = getChunks(system, grp);
                    chunks.forEach((_, idx) => allRows.push(`${grp}-${idx}`));
                  });
                  if (activeGroups.length === allRows.length) setActiveGroups([]);
                  else setActiveGroups(allRows);
                }}
                className={`w-full py-3 rounded-2xl font-black mb-6 border-2 transition-colors ${
                  activeGroups.length > 0 && activeGroups.length > 10 
                    ? `border-${system === 'hiragana' ? 'rose' : 'blue'}-500 bg-${system === 'hiragana' ? 'rose' : 'blue'}-50 text-${system === 'hiragana' ? 'rose' : 'blue'}-600 dark:bg-${system === 'hiragana' ? 'rose' : 'blue'}-900/20`
                    : 'border-slate-200 text-slate-500 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800'
                }`}
              >
                ALL KANA
              </button>

              {/* 4 Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {[
                  { id: 'seion', name: 'MAIN KANA', icon: <span className="font-jp text-lg">あ</span> },
                  { id: 'dakuten', name: 'DAKUTEN KANA', icon: <span className="text-xl">"</span> },
                  { id: 'yoon', name: 'COMBINATION KANA', icon: <span className="text-xl">∞</span> },
                  { id: 'extended', name: 'EXTENDED KANA', icon: <span className="text-lg">✨</span> }
                ].map(col => {
                  const chunks = getChunks(system, col.id);
                  if (chunks.length === 0) return null;
                  const color = system === 'hiragana' ? 'rose' : 'blue';
                  
                  return (
                    <div key={col.id} className="flex flex-col gap-3">
                      <div className="flex items-center justify-between mb-2 px-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-lg bg-${color}-50 dark:bg-${color}-900/20 text-${color}-500 flex items-center justify-center font-bold border border-${color}-100 dark:border-${color}-800`}>
                            {col.icon}
                          </div>
                          <h4 className={`font-bold text-sm text-${color}-600 dark:text-${color}-400`}>{col.name}</h4>
                        </div>
                        <button
                          onClick={() => {
                            const colRows = chunks.map((_, idx) => `${col.id}-${idx}`);
                            const allSelected = colRows.every(r => activeGroups.includes(r));
                            if (allSelected) {
                              setActiveGroups(prev => prev.filter(r => !colRows.includes(r)));
                            } else {
                              setActiveGroups(prev => [...new Set([...prev, ...colRows])]);
                            }
                          }}
                          className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-md transition-colors border ${
                            chunks.every((_, idx) => activeGroups.includes(`${col.id}-${idx}`))
                              ? `bg-${color}-100 text-${color}-600 border-${color}-200 dark:bg-${color}-900/40 dark:text-${color}-400 dark:border-${color}-800/50`
                              : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700 dark:hover:bg-slate-700'
                          }`}
                        >
                          Tất cả
                        </button>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        {chunks.map((chunk, idx) => {
                          const rowId = `${col.id}-${idx}`;
                          const isSelected = activeGroups.includes(rowId);
                          const firstValid = chunk.find((c: any) => c.jp !== '');
                          const rowName = firstValid ? `${firstValid.jp}-row` : `row-${idx}`;
                          const charsDisplay = chunk.map((c: any) => c.jp !== '' ? c.jp : '　').join('');
                          
                          return (
                            <div 
                              key={rowId}
                              onClick={() => setActiveGroups(prev => prev.includes(rowId) ? prev.filter(id => id !== rowId) : [...prev, rowId])}
                              className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                                isSelected 
                                  ? `border-${color}-500 bg-${color}-50 dark:bg-${color}-900/20` 
                                  : 'border-slate-100 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-600'
                              }`}
                            >
                              <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                                isSelected ? `border-${color}-500 bg-${color}-500 text-white` : 'border-slate-300 dark:border-slate-600'
                              }`}>
                                {isSelected && <Check size={12} strokeWidth={3} />}
                              </div>
                              <div className="flex-1 flex items-center justify-between min-w-0">
                                <span className={`font-bold font-jp text-base ${isSelected ? `text-${color}-700 dark:text-${color}-300` : 'text-slate-700 dark:text-slate-300'}`}>
                                  {rowName}
                                </span>
                                <span className="text-sm font-jp text-slate-400 dark:text-slate-500 truncate ml-2 tracking-widest whitespace-pre">
                                  {charsDisplay}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 max-w-md mx-auto">
              <button
                disabled={activeGroups.length === 0}
                onClick={() => startTyping(system, activeGroups)}
                className={`w-full py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 ${activeGroups.length > 0 ? `bg-${system === 'hiragana' ? 'rose' : 'blue'}-500 hover:bg-${system === 'hiragana' ? 'rose' : 'blue'}-600 shadow-lg shadow-${system === 'hiragana' ? 'rose' : 'blue'}-500/20` : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
              >
                <div className="w-5 h-5 mr-1 flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16v12H4z"></path><path d="M8 10h.01"></path><path d="M12 10h.01"></path><path d="M16 10h.01"></path><path d="M8 14h8"></path></svg></div>
                Bắt đầu gõ
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (gameState === 'typing' && chars.length > 0) {
    const total = chars.length;

    return (
      <div className="fixed inset-0 z-[100] flex flex-col w-full h-full bg-white dark:bg-slate-900 overflow-hidden">
        
        {/* Stats Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          <button onClick={() => {
            setGameState('selection');
            exitFullscreen();
          }} className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
            <X size={20} />
          </button>
          
          <div className="flex gap-6">
             <div className="flex flex-col items-center">
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tiến độ</span>
               <span className="text-sm font-black text-slate-700 dark:text-slate-300">{currentIndex + 1}/{total}</span>
             </div>
             <div className="flex flex-col items-center">
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Đúng</span>
               <span className="text-sm font-black text-emerald-500">{correctCount}</span>
             </div>
             <div className="flex flex-col items-center">
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sai</span>
               <span className="text-sm font-black text-rose-500">{wrongCount}</span>
             </div>
             <div className="flex flex-col items-center">
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Combo</span>
               <span className={`text-sm font-black ${combo > 2 ? 'text-amber-500' : 'text-slate-700 dark:text-slate-300'} flex items-center gap-1`}>
                 {combo} {combo > 2 && <Zap size={14} fill="currentColor" />}
               </span>
             </div>
          </div>
        </div>

        {/* Main Typing Area - Grid Layout */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#FAF8F5] dark:bg-slate-950">
          <div className="max-w-[1200px] mx-auto grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 md:gap-6 pb-20">
            {chars.map((char: any, idx: number) => {
              const isCurrent = idx === currentIndex;
              const cStatus = charStatus[idx] || (isCurrent ? status : null);
              const val = answers[idx] || '';
              
              let boxBg = "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 shadow-sm cursor-pointer hover:border-blue-300";
              if (cStatus === 'correct') boxBg = "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-400 dark:border-emerald-500 shadow-md shadow-emerald-500/10 cursor-default";
              else if (cStatus === 'wrong') boxBg = "bg-rose-50 dark:bg-rose-900/20 border-rose-400 dark:border-rose-500 shadow-md shadow-rose-500/10 cursor-default";
              else if (isCurrent) boxBg = "bg-blue-50 dark:bg-blue-900/20 border-blue-400 dark:border-blue-500 shadow-md shadow-blue-500/10 ring-2 ring-blue-500/20 cursor-default";

              return (
                <motion.div 
                  key={idx}
                  onClick={() => { if (charStatus[idx] === null) { setCurrentIndex(idx); setStatus('idle'); } }}
                  animate={
                    cStatus === 'correct' ? { scale: [1, 1.05, 1] } : 
                    cStatus === 'wrong' ? { x: [-5, 5, -5, 5, 0] } : 
                    isCurrent ? { scale: 1.05 } : { scale: 1, x: 0 }
                  }
                  transition={{ duration: 0.3 }}
                  className={`rounded-2xl border-2 flex flex-col p-3 relative overflow-hidden transition-colors ${boxBg} ${isCurrent ? 'opacity-100' : 'opacity-90'}`}
                >
                  <div className="flex-1 flex items-center justify-center min-h-[60px] pointer-events-none">
                    <span className={`text-3xl font-jp font-medium ${cStatus === 'wrong' ? 'text-rose-500' : 'text-slate-800 dark:text-slate-100'}`}>
                      {char.jp}
                    </span>
                  </div>
                  
                  <div className="relative mt-2">
                    <input
                      ref={isCurrent ? inputRef : null}
                      type="text"
                      value={cStatus === 'correct' ? char.r : val}
                      disabled={charStatus[idx] !== null}
                      onChange={(e) => handleInputChange(idx, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, idx)}
                      className={`w-full text-center text-sm font-bold py-1.5 rounded-lg border-2 outline-none transition-all ${
                        cStatus === 'correct' ? 'border-emerald-200 bg-white text-emerald-600' :
                        cStatus === 'wrong' ? 'border-rose-200 bg-white text-rose-600' :
                        isCurrent ? 'border-blue-300 bg-white text-blue-600 focus:border-blue-500' :
                        'border-slate-100 bg-slate-50 text-slate-400 dark:bg-slate-800 dark:border-slate-700'
                      }`}
                      placeholder="..."
                      autoComplete="off"
                      spellCheck="false"
                    />
                    {cStatus === 'correct' && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-2 top-1/2 -translate-y-1/2 text-emerald-500">
                        <Check size={14} strokeWidth={4} />
                      </motion.div>
                    )}
                    {cStatus === 'wrong' && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-2 top-1/2 -translate-y-1/2 text-rose-500">
                        <X size={14} strokeWidth={4} />
                      </motion.div>
                    )}
                  </div>

                  <AnimatePresence>
                    {cStatus === 'wrong' && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
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
      </div>
    );
  }

  if (gameState === 'result') {
    const accuracy = correctCount + wrongCount === 0 ? 0 : Math.round((correctCount / (correctCount + wrongCount)) * 100);
    const timeSpent = endTime - startTime;
    
    const wrongChars = chars.map((c, idx) => ({ ...c, typed: answers[idx] })).filter((_, idx) => charStatus[idx] === 'wrong');

    return (
      <div className="fixed inset-0 z-[9999] overflow-y-auto bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-500">
        <div className="flex min-h-full items-center justify-center p-2 sm:p-4">
          <Confetti />
          
          <div className="max-w-xl w-full bg-white dark:bg-slate-900 rounded-[2rem] p-5 md:p-6 text-center shadow-2xl relative overflow-hidden border border-white/20 dark:border-slate-800/50 animate-in zoom-in-95 duration-500 delay-150 fill-mode-both">
          {/* Faint sakura/confetti background pattern */}
          <div className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-blue-50/50 dark:from-blue-900/20 to-transparent pointer-events-none"></div>

          <div className="relative z-10 flex flex-col items-center">
            {/* Trophy Icon with Ribbon */}
            <div className="relative inline-flex flex-col items-center justify-center mb-4 mt-0">
              <div className="text-yellow-400 drop-shadow-md">
                <Trophy size={56} strokeWidth={1} fill="#FACC15" />
              </div>
              {/* Blue Ribbon underneath */}
              <div className="absolute -bottom-2 px-4 py-1 bg-blue-600 rounded shadow-md transform -skew-x-6 border-b-4 border-blue-800">
                <span className="text-white text-[8px] font-black uppercase tracking-[0.2em] transform skew-x-6 inline-block">Thành tích</span>
              </div>
              {/* Ribbon tails */}
              <div className="absolute -bottom-2 -left-2 w-2 h-4 bg-blue-700 -z-10 rounded-l skew-y-12"></div>
              <div className="absolute -bottom-2 -right-2 w-2 h-4 bg-blue-700 -z-10 rounded-r -skew-y-12"></div>
            </div>

            <h2 className="text-2xl md:text-3xl font-black mb-1 uppercase tracking-widest text-blue-600 dark:text-blue-500 drop-shadow-sm font-sans">
              HOÀN THÀNH!
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mb-4 font-medium text-xs md:text-sm">
              Bạn đã xuất sắc hoàn thành bài tập phản xạ gõ chữ
            </p>

            {/* 4 Stats Cards */}
            <div className="grid grid-cols-2 gap-2 md:gap-3 w-full mb-4">
              {/* Accuracy Card */}
              <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl border-2 border-emerald-50 dark:border-emerald-900/30 flex flex-col items-center shadow-[0_4px_20px_rgb(16,185,129,0.05)] hover:border-emerald-100 transition-colors">
                <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-500 flex items-center justify-center mb-1.5">
                  <Target size={16} strokeWidth={2.5} />
                </div>
                <div className="text-[9px] md:text-[10px] font-black text-emerald-600/70 dark:text-emerald-500/70 uppercase tracking-widest mb-0.5">Độ chính xác</div>
                <div className="text-xl md:text-2xl font-black text-emerald-500 flex items-center gap-1 mb-0.5">
                  {accuracy}% {accuracy === 100 && <Star size={14} fill="#FACC15" strokeWidth={0} />}
                </div>
                <div className="text-[9px] font-medium text-slate-400 leading-tight">
                  {accuracy === 100 ? 'Tuyệt vời! Không sai' : 'Bạn làm rất tốt!'}
                </div>
              </div>

              {/* Time Card */}
              <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl border-2 border-blue-50 dark:border-blue-900/30 flex flex-col items-center shadow-[0_4px_20px_rgb(59,130,246,0.05)] hover:border-blue-100 transition-colors">
                <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-500 flex items-center justify-center mb-1.5">
                  <Timer size={16} strokeWidth={2.5} />
                </div>
                <div className="text-[9px] md:text-[10px] font-black text-blue-600/70 dark:text-blue-500/70 uppercase tracking-widest mb-0.5">Thời gian</div>
                <div className="text-xl md:text-2xl font-black text-blue-600 dark:text-blue-500 mb-0.5">{formatTime(timeSpent)}</div>
                <div className="text-[9px] font-medium text-slate-400 flex items-center gap-1 leading-tight">
                  Nhanh hơn 20% <TrendingUp size={10} className="text-emerald-500" />
                </div>
              </div>

              {/* Correct Card */}
              <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl border-2 border-indigo-50 dark:border-indigo-900/30 flex flex-col items-center shadow-[0_4px_20px_rgb(99,102,241,0.05)] hover:border-indigo-100 transition-colors">
                <div className="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-500 flex items-center justify-center mb-1.5">
                  <CheckCircle size={16} strokeWidth={2.5} />
                </div>
                <div className="text-[9px] md:text-[10px] font-black text-indigo-600/70 dark:text-indigo-500/70 uppercase tracking-widest mb-0.5">Số ký tự đúng</div>
                <div className="text-xl md:text-2xl font-black text-slate-700 dark:text-slate-200 flex items-baseline gap-1 mb-0.5">
                  {correctCount} <span className="text-xs font-bold text-slate-400">chữ</span>
                </div>
                <div className="text-[9px] font-medium text-slate-400 leading-tight">
                  Combo Max: <span className="font-bold text-amber-500 flex items-center gap-1 inline-flex">{maxCombo} <Zap size={10} fill="currentColor" /></span>
                </div>
              </div>

              {/* Wrong Card */}
              <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl border-2 border-rose-50 dark:border-rose-900/30 flex flex-col items-center shadow-[0_4px_20px_rgb(244,63,94,0.05)] hover:border-rose-100 transition-colors">
                <div className="w-8 h-8 rounded-full bg-rose-50 dark:bg-rose-900/30 text-rose-500 flex items-center justify-center mb-1.5">
                  <RefreshCcw size={16} strokeWidth={2.5} />
                </div>
                <div className="text-[9px] md:text-[10px] font-black text-rose-500/70 dark:text-rose-400/70 uppercase tracking-widest mb-0.5">Số lỗi (sai)</div>
                <div className="text-xl md:text-2xl font-black text-rose-500 dark:text-rose-400 flex items-baseline gap-1 mb-0.5">
                  {wrongCount} <span className="text-xs font-bold text-rose-400/70">lần</span>
                </div>
                <div className="text-[9px] font-medium text-slate-400 leading-tight">
                  {wrongCount === 0 ? 'Không có lỗi sai! 🎉' : 'Cố gắng hơn nhé'}
                </div>
              </div>
            </div>

            {/* Detailed Errors if any */}
            {wrongChars.length > 0 && (
              <div className="w-full bg-rose-50/50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-900/30 rounded-xl p-2.5 text-left mb-3">
                <p className="text-[9px] font-bold text-rose-600 dark:text-rose-400 mb-1 uppercase tracking-wide">Chi tiết lỗi sai:</p>
                <div className="flex flex-wrap gap-1.5">
                  {wrongChars.map((c: any, i: number) => (
                    <div key={`wrong-${i}`} className="flex items-center gap-1.5 px-2 py-1 bg-white dark:bg-slate-800 border border-rose-100 dark:border-rose-800/50 rounded-lg shadow-sm">
                      <span className="font-bold text-xs font-jp leading-none text-rose-600 dark:text-rose-400">{c.jp}</span>
                      <div className="flex items-center gap-1 border-l border-rose-100 dark:border-rose-800/50 pl-1.5">
                        <span className="text-[8px] font-bold uppercase text-rose-400 line-through">{c.typed || '-'}</span>
                        <ArrowRight size={8} className="text-slate-400" />
                        <span className="text-[8px] font-black text-emerald-600 dark:text-emerald-400 uppercase">{c.r}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Golden Banner for Perfect Score */}
            {accuracy === 100 && (
              <div className="w-full bg-amber-50/80 dark:bg-amber-900/20 border border-amber-200/50 dark:border-amber-800/50 rounded-xl p-2.5 flex items-center justify-between shadow-sm mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-lg">👑</span>
                  <div className="flex flex-col md:flex-row md:items-center md:gap-2 text-left">
                    <span className="font-bold text-amber-700 dark:text-amber-500 text-xs md:text-sm">Thành tích hoàn hảo!</span>
                    <span className="text-[10px] font-medium text-amber-600/80 dark:text-amber-400/80 hidden sm:inline-block">Bạn thật tuyệt!</span>
                  </div>
                </div>
                <div className="flex gap-0.5 text-amber-400">
                  <Star size={14} fill="currentColor" strokeWidth={0} />
                  <Star size={14} fill="currentColor" strokeWidth={0} />
                  <Star size={14} fill="currentColor" strokeWidth={0} />
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-row gap-3 w-full mt-1">
              <button
                onClick={() => {
                  setGameState('selection');
                  exitFullscreen();
                }}
                className="flex-1 py-2.5 px-4 bg-white border-2 border-slate-100 hover:border-slate-200 text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700 dark:text-slate-200 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm"
              >
                <ArrowLeft size={16} /> Về danh sách
              </button>
              <button
                onClick={() => startTyping(system!, activeGroups)}
                className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-blue-500/30"
              >
                Gõ lại <RotateCcw size={16} />
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>
    );
  }

  return null;
};
