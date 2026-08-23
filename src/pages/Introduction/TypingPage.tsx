import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  RotateCcw, 
  ArrowLeft, 
  Trophy, 
  Zap, 
  Target, 
  Timer, 
  CheckCircle, 
  RefreshCcw, 
  Star, 
  TrendingUp, 
  ArrowRight, 
  Check, 
  X, 
  Sparkles, 
  Keyboard, 
  Layers,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { kanaData } from '../../data/kana';
import { Confetti } from '../../components/Kana/Confetti';

const getChunks = (sys: 'hiragana' | 'katakana', grp: string) => {
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
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [charStatus, setCharStatus] = useState<('correct' | 'wrong' | null)[]>([]);
  
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
  const startTyping = (sys: 'hiragana' | 'katakana', selectedRows: string[]) => {
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
    
    if (status === 'correct') return;
    if (status === 'wrong') setStatus('idle');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === 'Enter') {
      const currentChar = chars[idx];
      const val = (answers[idx] || '').trim().toLowerCase();
      if (val === '') return;
      
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

  // Preview arrays for the cards
  const hiraganaPreview = [
    { jp: 'あ', r: 'a' },
    { jp: 'い', r: 'i' },
    { jp: 'う', r: 'u' },
    { jp: 'え', r: 'e' },
    { jp: 'お', r: 'o' },
  ];

  const katakanaPreview = [
    { jp: 'ア', r: 'a' },
    { jp: 'イ', r: 'i' },
    { jp: 'ウ', r: 'u' },
    { jp: 'エ', r: 'e' },
    { jp: 'オ', r: 'o' },
  ];

  // ==========================================
  // VIEW: SELECTION
  // ==========================================
  if (gameState === 'selection') {
    return (
      <div className="relative mx-auto flex min-h-[calc(100vh-64px)] max-w-5xl flex-col px-4 pb-12 pt-4 md:px-8">
        {/* Background ambient lighting */}
        <div className="fixed-bg-plane pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-blue-50/70 via-white/80 to-rose-50/60 dark:from-slate-950 dark:via-slate-950 dark:to-indigo-950/40" />

        {/* Navigation / Back Button */}
        <div className="mb-4">
          <button 
            type="button"
            onClick={() => {
              if (system) {
                setSystem(null);
                setActiveGroups([]);
              } else {
                navigate('/introduction');
              }
            }}
            className="group inline-flex items-center gap-3 rounded-full border border-white/90 bg-white/95 py-2 pl-2 pr-4 text-sm font-extrabold text-slate-600 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:text-blue-600 hover:shadow-md dark:border-slate-700 dark:bg-slate-900/95 dark:text-slate-300"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-slate-600 shadow-sm ring-1 ring-slate-100 transition-transform group-hover:-translate-x-0.5 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700">
              <ArrowLeft size={16} />
            </span>
            {system ? 'Chọn hệ chữ khác' : 'Quay lại Nhập môn'}
          </button>
        </div>

        {/* Hero Title Section */}
        <div className="mb-7 text-center">
          <div className="mb-2.5 inline-flex items-center gap-2 rounded-full border border-white/90 bg-white/90 px-3.5 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-blue-600 shadow-sm dark:border-slate-700 dark:bg-slate-900/90 dark:text-blue-300">
            <Sparkles size={13} /> Kana Typing Practice
          </div>
          <h1 className="flex flex-row items-center justify-center gap-3 text-3xl font-black uppercase tracking-wider text-slate-900 dark:text-slate-100 md:text-4xl">
            Luyện gõ <span className="font-jp text-blue-600 dark:text-blue-400">タイピング</span>
          </h1>
          <p className="mt-1.5 text-sm font-semibold text-slate-600 dark:text-slate-400">
            {!system 
              ? 'Chọn hệ chữ cái bạn muốn rèn luyện phản xạ gõ Romaji' 
              : `Chọn các nhóm âm ${system === 'hiragana' ? 'Hiragana (ひらがな)' : 'Katakana (カタカナ)'} để bắt đầu bài gõ`}
          </p>
        </div>

        {/* MODE 1: CHOOSE SYSTEM (HIRAGANA / KATAKANA) */}
        {!system ? (
          <div className="mx-auto grid w-full max-w-3xl grid-cols-1 gap-5 md:grid-cols-2">
            {/* HIRAGANA CARD */}
            <motion.button
              type="button"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSystem('hiragana')}
              className="group relative flex min-h-[340px] cursor-pointer flex-col justify-between overflow-hidden rounded-[1.75rem] border border-rose-100/90 bg-white p-5 text-left shadow-[0_16px_40px_rgba(244,63,94,0.09)] transition-all duration-300 hover:-translate-y-1 hover:border-rose-300 hover:shadow-[0_24px_50px_rgba(244,63,94,0.16)] dark:border-slate-800 dark:bg-slate-900"
            >
              {/* Top Accent Rail */}
              <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-rose-500 via-pink-400 to-amber-300" />
              
              {/* Ambient Glow */}
              <div className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full bg-rose-100/80 blur-2xl transition-transform duration-700 group-hover:scale-125 dark:bg-rose-500/10" />

              {/* Watermark Kana */}
              <div className="pointer-events-none absolute -bottom-10 right-4 select-none font-jp text-[8rem] font-black leading-none text-rose-100/60 opacity-60 transition-transform duration-700 group-hover:rotate-6 group-hover:scale-110 dark:text-rose-900/20">
                あ
              </div>

              <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                  {/* Badge & Icon Row */}
                  <div className="flex items-start justify-between gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 font-jp text-[11px] font-black uppercase tracking-[0.14em] text-rose-600 ring-1 ring-rose-100 dark:bg-rose-950/40 dark:text-rose-300 dark:ring-rose-900/40">
                      HIRAGANA ひらがな
                    </span>
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-rose-500 to-pink-500 font-jp text-2xl font-black text-white shadow-md shadow-rose-500/25 ring-2 ring-rose-100 transition-transform duration-300 group-hover:scale-105 dark:ring-rose-950/50">
                      あ
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="mt-4">
                    <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                      Bảng chữ mềm
                    </h3>
                    <p className="mt-1 text-xs font-semibold leading-relaxed text-slate-500 dark:text-slate-400">
                      Luyện gõ các nhóm âm cơ bản, biến âm dakuten và âm ghép yoon thuần Nhật.
                    </p>
                  </div>

                  {/* Kana Character Previews */}
                  <div className="mt-5 grid grid-cols-5 gap-1.5">
                    {hiraganaPreview.map((item) => (
                      <div 
                        key={item.jp}
                        className="flex flex-col items-center rounded-xl bg-rose-50/80 py-2 ring-1 ring-rose-100 transition-colors group-hover:bg-rose-100/70 dark:bg-rose-950/20 dark:ring-rose-900/30 dark:group-hover:bg-rose-950/40"
                      >
                        <span className="font-jp text-lg font-black text-rose-500">{item.jp}</span>
                        <span className="text-[9px] font-black uppercase text-rose-300 dark:text-rose-400">{item.r}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA Button */}
                <div className="mt-6 pt-2">
                  <div className="relative flex w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 py-3 px-4 text-xs font-black text-white shadow-lg shadow-rose-500/25 transition-all duration-300 group-hover:from-rose-600 group-hover:to-pink-600 group-hover:shadow-rose-500/35">
                    <span>Bắt đầu luyện gõ</span>
                    <ArrowRight size={16} className="absolute right-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </motion.button>

            {/* KATAKANA CARD */}
            <motion.button
              type="button"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.08 }}
              onClick={() => setSystem('katakana')}
              className="group relative flex min-h-[340px] cursor-pointer flex-col justify-between overflow-hidden rounded-[1.75rem] border border-blue-100/90 bg-white p-5 text-left shadow-[0_16px_40px_rgba(37,99,235,0.09)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-[0_24px_50px_rgba(37,99,235,0.16)] dark:border-slate-800 dark:bg-slate-900"
            >
              {/* Top Accent Rail */}
              <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-blue-600 via-sky-400 to-cyan-300" />
              
              {/* Ambient Glow */}
              <div className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full bg-blue-100/80 blur-2xl transition-transform duration-700 group-hover:scale-125 dark:bg-blue-500/10" />

              {/* Watermark Kana */}
              <div className="pointer-events-none absolute -bottom-10 right-4 select-none font-jp text-[8rem] font-black leading-none text-blue-100/60 opacity-60 transition-transform duration-700 group-hover:rotate-6 group-hover:scale-110 dark:text-blue-900/20">
                ア
              </div>

              <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                  {/* Badge & Icon Row */}
                  <div className="flex items-start justify-between gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 font-jp text-[11px] font-black uppercase tracking-[0.14em] text-blue-600 ring-1 ring-blue-100 dark:bg-blue-950/40 dark:text-blue-300 dark:ring-blue-900/40">
                      KATAKANA カタカナ
                    </span>
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 font-jp text-2xl font-black text-white shadow-md shadow-blue-500/25 ring-2 ring-blue-100 transition-transform duration-300 group-hover:scale-105 dark:ring-blue-950/50">
                      ア
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="mt-4">
                    <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                      Bảng chữ cứng
                    </h3>
                    <p className="mt-1 text-xs font-semibold leading-relaxed text-slate-500 dark:text-slate-400">
                      Luyện gõ các ký tự góc cạnh dùng cho từ ngoại lai, tên riêng và từ mượn.
                    </p>
                  </div>

                  {/* Kana Character Previews */}
                  <div className="mt-5 grid grid-cols-5 gap-1.5">
                    {katakanaPreview.map((item) => (
                      <div 
                        key={item.jp}
                        className="flex flex-col items-center rounded-xl bg-blue-50/80 py-2 ring-1 ring-blue-100 transition-colors group-hover:bg-blue-100/70 dark:bg-blue-950/20 dark:ring-blue-900/30 dark:group-hover:bg-blue-950/40"
                      >
                        <span className="font-jp text-lg font-black text-blue-600">{item.jp}</span>
                        <span className="text-[9px] font-black uppercase text-blue-300 dark:text-blue-400">{item.r}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA Button */}
                <div className="mt-6 pt-2">
                  <div className="relative flex w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3 px-4 text-xs font-black text-white shadow-lg shadow-blue-500/25 transition-all duration-300 group-hover:from-blue-700 group-hover:to-cyan-600 group-hover:shadow-blue-500/35">
                    <span>Bắt đầu luyện gõ</span>
                    <ArrowRight size={16} className="absolute right-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </motion.button>
          </div>
        ) : (
          /* MODE 2: GROUP SELECTION (SEION, DAKUTEN, YOON, EXTENDED) */
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {/* Control Bar */}
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center gap-2.5">
                <span className={`grid h-8 w-8 place-items-center rounded-xl font-jp text-sm font-black ${
                  system === 'hiragana' ? 'bg-rose-100 text-rose-600 dark:bg-rose-950/60 dark:text-rose-300' : 'bg-blue-100 text-blue-600 dark:bg-blue-950/60 dark:text-blue-300'
                }`}>
                  {system === 'hiragana' ? 'あ' : 'ア'}
                </span>
                <div>
                  <h3 className="text-sm font-black text-slate-800 dark:text-slate-100">
                    {system === 'hiragana' ? 'Bảng Hiragana' : 'Bảng Katakana'}
                  </h3>
                  <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500">
                    Đã chọn {activeGroups.length} hàng ký tự
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const allRows: string[] = [];
                    ['seion', 'dakuten', 'yoon', 'extended'].forEach(grp => {
                      const chunks = getChunks(system, grp);
                      chunks.forEach((_, idx) => allRows.push(`${grp}-${idx}`));
                    });
                    if (activeGroups.length === allRows.length) setActiveGroups([]);
                    else setActiveGroups(allRows);
                  }}
                  className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-1.5 text-xs font-black transition-all ${
                    activeGroups.length > 0
                      ? system === 'hiragana'
                        ? 'border-rose-200 bg-rose-50 text-rose-600 dark:border-rose-900/40 dark:bg-rose-950/50 dark:text-rose-300'
                        : 'border-blue-200 bg-blue-50 text-blue-600 dark:border-blue-900/40 dark:bg-blue-950/50 dark:text-blue-300'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  <Layers size={13} />
                  {activeGroups.length > 0 ? 'Bỏ chọn tất cả' : 'Chọn tất cả Kana'}
                </button>
              </div>
            </div>

            {/* 4 Group Columns */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                { id: 'seion', name: 'CHỮ CƠ BẢN', sub: 'Seion', icon: system === 'hiragana' ? 'あ' : 'ア' },
                { id: 'dakuten', name: 'BIẾN ÂM (ĐỤC)', sub: 'Dakuten', icon: 'が' },
                { id: 'yoon', name: 'ÂM GHÉP', sub: 'Yōon', icon: 'きゃ' },
                { id: 'extended', name: 'MỞ RỘNG', sub: 'Extended', icon: '✨' }
              ].map(col => {
                const chunks = getChunks(system, col.id);
                if (chunks.length === 0) return null;
                const isHira = system === 'hiragana';
                const colRows = chunks.map((_, idx) => `${col.id}-${idx}`);
                const isAllSelected = colRows.length > 0 && colRows.every(r => activeGroups.includes(r));

                return (
                  <div 
                    key={col.id} 
                    className="smooth-panel flex flex-col rounded-[1.5rem] border border-slate-200/80 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                  >
                    {/* Header */}
                    <div className="mb-3.5 flex items-center justify-between border-b border-slate-100 pb-2.5 dark:border-slate-800">
                      <div className="flex items-center gap-2">
                        <div className={`grid h-7 w-7 place-items-center rounded-lg font-jp text-xs font-black ${
                          isHira ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-300' : 'bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-300'
                        }`}>
                          {col.icon}
                        </div>
                        <div>
                          <h4 className="text-xs font-black text-slate-800 dark:text-slate-100 leading-none">{col.name}</h4>
                          <span className="text-[9px] font-bold text-slate-400">{col.sub}</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          if (isAllSelected) {
                            setActiveGroups(prev => prev.filter(r => !colRows.includes(r)));
                          } else {
                            setActiveGroups(prev => [...new Set([...prev, ...colRows])]);
                          }
                        }}
                        className={`rounded-lg px-2 py-0.5 text-[9.5px] font-black uppercase tracking-wider transition-colors ${
                          isAllSelected
                            ? isHira
                              ? 'bg-rose-500 text-white'
                              : 'bg-blue-600 text-white'
                            : 'bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400'
                        }`}
                      >
                        {isAllSelected ? 'Bỏ chọn' : 'Tất cả'}
                      </button>
                    </div>

                    {/* Rows */}
                    <div className="flex flex-col gap-2">
                      {chunks.map((chunk, idx) => {
                        const rowId = `${col.id}-${idx}`;
                        const isSelected = activeGroups.includes(rowId);
                        const firstValid = chunk.find((c: any) => c.jp !== '');
                        const rowName = firstValid ? `${firstValid.jp}-row` : `row-${idx + 1}`;
                        const charsDisplay = chunk.map((c: any) => c.jp !== '' ? c.jp : ' ').join(' ');

                        return (
                          <div
                            key={rowId}
                            onClick={() => setActiveGroups(prev => prev.includes(rowId) ? prev.filter(id => id !== rowId) : [...prev, rowId])}
                            className={`steady-scroll-row group/row flex cursor-pointer items-center justify-between rounded-xl border p-2.5 transition-colors duration-150 ${
                              isSelected
                                ? isHira
                                  ? 'border-rose-300 bg-rose-50/70 shadow-sm dark:border-rose-800 dark:bg-rose-950/40'
                                  : 'border-blue-300 bg-blue-50/70 shadow-sm dark:border-blue-800 dark:bg-blue-950/40'
                                : 'border-slate-100 bg-slate-50/50 hover:border-slate-300 dark:border-slate-800/80 dark:bg-slate-800/40 dark:hover:border-slate-700'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className={`grid h-4 w-4 shrink-0 place-items-center rounded-md border text-white transition-colors ${
                                isSelected
                                  ? isHira ? 'border-rose-500 bg-rose-500' : 'border-blue-600 bg-blue-600'
                                  : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800'
                              }`}>
                                {isSelected && <Check size={10} strokeWidth={3} />}
                              </div>
                              <span className={`font-jp text-xs font-black ${
                                isSelected
                                  ? isHira ? 'text-rose-700 dark:text-rose-300' : 'text-blue-700 dark:text-blue-300'
                                  : 'text-slate-700 dark:text-slate-300'
                              }`}>
                                {rowName}
                              </span>
                            </div>

                            <span className="ml-2 truncate font-jp text-xs font-bold tracking-widest text-slate-400 dark:text-slate-500">
                              {charsDisplay}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Launch Bar */}
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                disabled={activeGroups.length === 0}
                onClick={() => startTyping(system, activeGroups)}
                className={`inline-flex items-center justify-center gap-2.5 rounded-2xl px-10 py-3.5 text-sm font-black text-white shadow-xl transition-all duration-300 ${
                  activeGroups.length > 0
                    ? system === 'hiragana'
                      ? 'bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 shadow-rose-500/25 hover:shadow-rose-500/40 hover:-translate-y-0.5'
                      : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5'
                    : 'cursor-not-allowed bg-slate-200 text-slate-400 dark:bg-slate-800 dark:text-slate-600 shadow-none'
                }`}
              >
                <Keyboard size={18} />
                <span>Bắt đầu gõ ({activeGroups.length} nhóm đã chọn)</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    );
  }

  // ==========================================
  // VIEW: TYPING SESSION
  // ==========================================
  if (gameState === 'typing' && chars.length > 0) {
    const total = chars.length;

    return (
      <div className="fixed inset-0 z-[100] flex h-full w-full flex-col overflow-hidden bg-slate-50 dark:bg-slate-950">
        {/* Top Header & Stats */}
        <div className="flex items-center justify-between border-b border-slate-200/80 bg-white px-6 py-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <button 
            type="button"
            onClick={() => {
              setGameState('selection');
              exitFullscreen();
            }} 
            className="grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-rose-50 hover:text-rose-600 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-rose-950/50 dark:hover:text-rose-300"
          >
            <X size={18} />
          </button>
          
          <div className="flex items-center gap-5 sm:gap-8">
            <div className="flex flex-col items-center">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Tiến độ</span>
              <span className="text-sm font-black text-slate-800 dark:text-slate-100">{currentIndex + 1} / {total}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Đúng</span>
              <span className="text-sm font-black text-emerald-500">{correctCount}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Sai</span>
              <span className="text-sm font-black text-rose-500">{wrongCount}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Combo</span>
              <span className={`flex items-center gap-1 text-sm font-black ${combo > 2 ? 'text-amber-500' : 'text-slate-800 dark:text-slate-200'}`}>
                {combo} {combo > 2 && <Zap size={13} fill="currentColor" />}
              </span>
            </div>
          </div>

          <div className="w-9" />
        </div>

        {/* Main Typing Area */}
        <div className="smooth-scroll-area flex-1 overflow-y-auto p-6 md:p-8">
          <div className="mx-auto grid max-w-[1100px] grid-cols-3 gap-3.5 pb-20 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 md:gap-5">
            {chars.map((char: any, idx: number) => {
              const isCurrent = idx === currentIndex;
              const cStatus = charStatus[idx] || (isCurrent ? status : null);
              const val = answers[idx] || '';
              
              let boxBg = "bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 shadow-sm cursor-pointer hover:border-blue-300";
              if (cStatus === 'correct') boxBg = "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-400 dark:border-emerald-500/80 shadow-md shadow-emerald-500/10 cursor-default";
              else if (cStatus === 'wrong') boxBg = "bg-rose-50 dark:bg-rose-950/30 border-rose-400 dark:border-rose-500/80 shadow-md shadow-rose-500/10 cursor-default";
              else if (isCurrent) boxBg = "bg-blue-50/80 dark:bg-blue-950/30 border-blue-500 shadow-lg shadow-blue-500/15 ring-2 ring-blue-400/30 cursor-default";

              return (
                <motion.div 
                  key={idx}
                  onClick={() => { if (charStatus[idx] === null) { setCurrentIndex(idx); setStatus('idle'); } }}
                  animate={
                    cStatus === 'correct' ? { scale: [1, 1.06, 1] } : 
                    cStatus === 'wrong' ? { x: [-5, 5, -5, 5, 0] } : 
                    isCurrent ? { scale: 1.04 } : { scale: 1, x: 0 }
                  }
                  transition={{ duration: 0.25 }}
                  className={`steady-scroll-row relative flex flex-col overflow-hidden rounded-2xl border-2 p-3 transition-colors ${boxBg} ${isCurrent ? 'opacity-100' : 'opacity-90'}`}
                >
                  <div className="pointer-events-none flex min-h-[58px] flex-1 items-center justify-center">
                    <span className={`font-jp text-3xl font-bold ${cStatus === 'wrong' ? 'text-rose-500' : 'text-slate-800 dark:text-slate-100'}`}>
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
                      className={`w-full rounded-xl border-2 py-1.5 text-center text-xs font-black outline-none transition-all ${
                        cStatus === 'correct' ? 'border-emerald-200 bg-white text-emerald-600 dark:border-emerald-800 dark:bg-slate-900' :
                        cStatus === 'wrong' ? 'border-rose-200 bg-white text-rose-600 dark:border-rose-800 dark:bg-slate-900' :
                        isCurrent ? 'border-blue-400 bg-white text-blue-600 focus:border-blue-600 dark:border-blue-600 dark:bg-slate-900 dark:text-blue-300' :
                        'border-slate-100 bg-slate-50 text-slate-400 dark:border-slate-800 dark:bg-slate-800'
                      }`}
                      placeholder="..."
                      autoComplete="off"
                      spellCheck="false"
                    />
                    {cStatus === 'correct' && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-2 top-1/2 -translate-y-1/2 text-emerald-500">
                        <Check size={13} strokeWidth={3.5} />
                      </motion.div>
                    )}
                    {cStatus === 'wrong' && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-2 top-1/2 -translate-y-1/2 text-rose-500">
                        <X size={13} strokeWidth={3.5} />
                      </motion.div>
                    )}
                  </div>

                  <AnimatePresence>
                    {cStatus === 'wrong' && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }} 
                        animate={{ opacity: 1, height: 'auto' }} 
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-1.5 text-center"
                      >
                        <span className="text-[10px] font-black text-rose-500 dark:text-rose-400">Đ.án: <span className="text-xs uppercase">{char.r}</span></span>
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

  // ==========================================
  // VIEW: RESULT SUMMARY
  // ==========================================
  if (gameState === 'result') {
    const accuracy = correctCount + wrongCount === 0 ? 0 : Math.round((correctCount / (correctCount + wrongCount)) * 100);
    const timeSpent = endTime - startTime;
    const wrongChars = chars.map((c, idx) => ({ ...c, typed: answers[idx] })).filter((_, idx) => charStatus[idx] === 'wrong');

    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-md">
        <Confetti />
        
        <motion.div 
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ ease: [0.23, 1, 0.32, 1], duration: 0.4 }}
          className="relative w-full max-w-lg overflow-hidden rounded-[2.5rem] border border-white/80 bg-white p-6 text-center shadow-2xl dark:border-slate-800 dark:bg-slate-900 md:p-8"
        >
          {/* Top Accent Rail */}
          <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-blue-600 via-sky-400 to-emerald-400" />

          {/* Trophy Icon */}
          <div className="relative mx-auto mb-3.5 mt-2 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 text-white shadow-lg shadow-amber-500/25">
            <Trophy size={32} />
          </div>

          <h2 className="text-2xl font-black uppercase tracking-wider text-slate-900 dark:text-white md:text-3xl">
            Hoàn thành!
          </h2>
          <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
            Bạn đã xuất sắc hoàn thành bài tập phản xạ gõ Kana
          </p>

          {/* 4 Stats Cards */}
          <div className="mt-6 grid grid-cols-2 gap-2.5">
            {/* Accuracy */}
            <div className="flex flex-col items-center rounded-2xl border border-emerald-100 bg-emerald-50/50 p-3 dark:border-emerald-900/30 dark:bg-emerald-950/20">
              <Target size={18} className="mb-1 text-emerald-500" />
              <span className="text-[9px] font-black uppercase tracking-wider text-emerald-600/80 dark:text-emerald-400">Độ chính xác</span>
              <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">{accuracy}%</span>
            </div>

            {/* Time */}
            <div className="flex flex-col items-center rounded-2xl border border-blue-100 bg-blue-50/50 p-3 dark:border-blue-900/30 dark:bg-blue-950/20">
              <Timer size={18} className="mb-1 text-blue-500" />
              <span className="text-[9px] font-black uppercase tracking-wider text-blue-600/80 dark:text-blue-400">Thời gian</span>
              <span className="text-xl font-black text-blue-600 dark:text-blue-400">{formatTime(timeSpent)}</span>
            </div>

            {/* Correct Count */}
            <div className="flex flex-col items-center rounded-2xl border border-indigo-100 bg-indigo-50/50 p-3 dark:border-indigo-900/30 dark:bg-indigo-950/20">
              <CheckCircle size={18} className="mb-1 text-indigo-500" />
              <span className="text-[9px] font-black uppercase tracking-wider text-indigo-600/80 dark:text-indigo-400">Số chữ đúng</span>
              <span className="text-xl font-black text-indigo-600 dark:text-indigo-400">{correctCount}</span>
            </div>

            {/* Wrong Count */}
            <div className="flex flex-col items-center rounded-2xl border border-rose-100 bg-rose-50/50 p-3 dark:border-rose-900/30 dark:bg-rose-950/20">
              <RefreshCcw size={18} className="mb-1 text-rose-500" />
              <span className="text-[9px] font-black uppercase tracking-wider text-rose-600/80 dark:text-rose-400">Lỗi sai</span>
              <span className="text-xl font-black text-rose-600 dark:text-rose-400">{wrongCount}</span>
            </div>
          </div>

          {/* Mistakes Preview */}
          {wrongChars.length > 0 && (
            <div className="mt-4 rounded-2xl border border-rose-100 bg-rose-50/40 p-3 text-left dark:border-rose-900/30 dark:bg-rose-950/20">
              <p className="mb-1.5 text-[9.5px] font-black uppercase tracking-wider text-rose-600 dark:text-rose-400">Chi tiết lỗi sai:</p>
              <div className="flex flex-wrap gap-1.5">
                {wrongChars.map((c: any, i: number) => (
                  <div key={i} className="flex items-center gap-1.5 rounded-lg border border-rose-100 bg-white px-2 py-1 shadow-sm dark:border-rose-900/40 dark:bg-slate-800">
                    <span className="font-jp text-xs font-bold text-rose-600 dark:text-rose-400">{c.jp}</span>
                    <span className="text-[9px] font-bold text-slate-400">→</span>
                    <span className="text-[9px] font-black uppercase text-emerald-600 dark:text-emerald-400">{c.r}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={() => {
                setGameState('selection');
                exitFullscreen();
              }}
              className="flex-1 rounded-2xl border border-slate-200 bg-white py-3 text-xs font-black text-slate-700 shadow-sm transition-all hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              Về danh sách
            </button>
            <button
              type="button"
              onClick={() => startTyping(system!, activeGroups)}
              className="flex-1 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3 text-xs font-black text-white shadow-lg shadow-blue-500/25 transition-all hover:from-blue-700 hover:to-cyan-600"
            >
              Gõ lại ngay
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return null;
};
