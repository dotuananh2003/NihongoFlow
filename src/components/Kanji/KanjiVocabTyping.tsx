import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Check, ChevronRight, X, Timer, Target, Trophy, RefreshCcw, Star, CheckCircle, TrendingUp, ArrowRight, Flame, Volume2, Lightbulb } from 'lucide-react';
import { toHiragana, toKatakana, toRomaji } from 'wanakana';
import { Confetti } from '../Kana/Confetti';
import type { VocabExample } from '../../data/kanjiData';

interface KanjiVocabTypingProps {
  vocabList: VocabExample[];
  onClose: () => void;
  kanjiChar?: string;
  mode?: 'kanji' | 'vocab';
}

export const KanjiVocabTyping: React.FC<KanjiVocabTypingProps> = ({ vocabList, onClose, kanjiChar, mode = 'kanji' }) => {
  const [shuffledVocabList, setShuffledVocabList] = useState<VocabExample[]>(() => {
    return [...vocabList].sort(() => Math.random() - 0.5);
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState('');
  const [imeMode, setImeMode] = useState<'hira' | 'kata'>('hira');
  const [status, setStatus] = useState<'correct' | 'wrong' | null>(null);
  
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ((status === 'correct' || status === 'wrong') && feedbackRef.current) {
      feedbackRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [status]);

  // Request fullscreen on mount, exit on unmount
  useEffect(() => {
    try {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch((e) => console.log(e));
      }
    } catch (e) {
      console.log(e);
    }
    return () => {
      try {
        if (document.fullscreenElement) {
          document.exitFullscreen().catch((e) => console.log(e));
        }
      } catch (e) {
        console.log(e);
      }
    };
  }, []);

  useEffect(() => {
    let timer: any;
    if (startTime && !isFinished) {
      timer = setInterval(() => {
        setElapsedSeconds(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [startTime, isFinished]);

  // Focus input automatically
  useEffect(() => {
    if (!isFinished) {
      inputRef.current?.focus();
    }
  }, [currentIndex, isFinished]);

  // Handle Enter key on finish screen
  useEffect(() => {
    let timeout: any;
    let canClose = false;

    if (isFinished) {
      timeout = setTimeout(() => {
        canClose = true;
      }, 500);
    }

    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (isFinished && canClose && e.key === 'Enter') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [isFinished, onClose]);

  const currentVocab = shuffledVocabList[currentIndex];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!startTime) {
      setStartTime(Date.now());
    }
    
    // Wanakana IMEMode fails to convert if there are spaces or full-width tildes mixed with romaji.
    // We strip spaces and convert full-width tilde to half-width before processing.
    const val = e.target.value.replace(/\s/g, '').replace(/〜/g, '~');
    
    // Auto convert based on imeMode
    if (imeMode === 'hira') {
      setInput(toHiragana(val, { IMEMode: true }));
    } else {
      let romaji = toRomaji(val);
      // Auto convert double vowels (aa, ii, uu, ee, oo) to a hyphen to naturally produce Katakana long vowels
      romaji = romaji.replace(/([aiueo])\1/g, '$1-');
      setInput(toKatakana(romaji, { IMEMode: true }));
    }
    setStatus(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (status !== null) {
        nextQuestion();
      } else if (input.trim() !== '') {
        checkAnswer();
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      setImeMode(prev => {
        const nextMode = prev === 'hira' ? 'kata' : 'hira';
        // Use timeout to ensure focus happens after state update
        setTimeout(() => inputRef.current?.focus(), 0);
        return nextMode;
      });
    }
  };

  const checkAnswer = () => {
    if (!currentVocab) return;
    
    // Normalize full-width tilde and wave dash to half-width tilde for comparison
    const normalizeTilde = (str: string) => str.replace(/[～〜]/g, '~');
    const cleanInput = normalizeTilde(input.trim().toLowerCase());
    const targetHira = normalizeTilde(toHiragana(currentVocab.hiragana));
    const targetKata = normalizeTilde(toKatakana(currentVocab.hiragana));
    const targetRoma = normalizeTilde(toRomaji(currentVocab.hiragana.replace(/ー/g, '-')).toLowerCase());
    const inputRoma = normalizeTilde(toRomaji(cleanInput).toLowerCase());

    const isCorrect = cleanInput === targetHira || cleanInput === targetKata || cleanInput === targetRoma || inputRoma === targetRoma;

    if (isCorrect) {
      setStatus('correct');
      setCorrectCount(prev => prev + 1);
      setCombo(prev => {
        const newCombo = prev + 1;
        setMaxCombo(m => Math.max(m, newCombo));
        return newCombo;
      });
      setScore(prev => prev + Math.floor(10 * (1 + combo * 0.1)));
    } else {
      setStatus('wrong');
      setWrongCount(prev => prev + 1);
      setCombo(0);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < vocabList.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setInput('');
      setStatus(null);
    } else {
      setIsFinished(true);
    }
  };

  const skipQuestion = () => {
    if (status === null) {
      setStatus('wrong');
      setWrongCount(prev => prev + 1);
      setCombo(0);
    } else {
      nextQuestion();
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setInput('');
    setStatus(null);
    setCorrectCount(0);
    setWrongCount(0);
    setCombo(0);
    setMaxCombo(0);
    setScore(0);
    setIsFinished(false);
    setStartTime(null);
    setElapsedSeconds(0);
    setShuffledVocabList([...vocabList].sort(() => Math.random() - 0.5));
  };

  if (isFinished) {
    const accuracy = Math.round((correctCount / vocabList.length) * 100);
    const isPerfect = accuracy === 100;
    
    return createPortal(
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
              Bạn đã xuất sắc hoàn thành {kanjiChar ? `bài tập luyện gõ ${kanjiChar}` : 'bài luyện gõ'}
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
                  {accuracy}% {isPerfect && <Star size={14} fill="#FACC15" strokeWidth={0} />}
                </div>
                <div className="text-[9px] font-medium text-slate-400 leading-tight">
                  {isPerfect ? 'Tuyệt vời! Không sai' : 'Bạn làm rất tốt!'}
                </div>
              </div>

              {/* Time Card */}
              <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl border-2 border-blue-50 dark:border-blue-900/30 flex flex-col items-center shadow-[0_4px_20px_rgb(59,130,246,0.05)] hover:border-blue-100 transition-colors">
                <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-500 flex items-center justify-center mb-1.5">
                  <Timer size={16} strokeWidth={2.5} />
                </div>
                <div className="text-[9px] md:text-[10px] font-black text-blue-600/70 dark:text-blue-500/70 uppercase tracking-widest mb-0.5">Thời gian</div>
                <div className="text-xl md:text-2xl font-black text-blue-600 dark:text-blue-500 mb-0.5">{formatTime(elapsedSeconds)}</div>
                <div className="text-[9px] font-medium text-slate-400 flex items-center gap-1 leading-tight">
                  Nhanh hơn 20% <TrendingUp size={10} className="text-emerald-500" />
                </div>
              </div>

              {/* Correct Card */}
              <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl border-2 border-indigo-50 dark:border-indigo-900/30 flex flex-col items-center shadow-[0_4px_20px_rgb(99,102,241,0.05)] hover:border-indigo-100 transition-colors">
                <div className="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-500 flex items-center justify-center mb-1.5">
                  <CheckCircle size={16} strokeWidth={2.5} />
                </div>
                <div className="text-[9px] md:text-[10px] font-black text-indigo-600/70 dark:text-indigo-500/70 uppercase tracking-widest mb-0.5">Số từ đúng</div>
                <div className="text-xl md:text-2xl font-black text-slate-700 dark:text-slate-200 flex items-baseline gap-1 mb-0.5">
                  {correctCount} <span className="text-xs font-bold text-slate-400">từ</span>
                </div>
                <div className="text-[9px] font-medium text-slate-400 leading-tight">
                  {correctCount === vocabList.length ? 'Đúng tất cả' : `Đúng ${correctCount}/${vocabList.length} từ`}
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

            {/* Golden Banner for Perfect Score */}
            {isPerfect && (
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
                onClick={handleRestart}
                className="flex-1 py-2.5 px-4 bg-white border-2 border-slate-100 hover:border-slate-200 text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700 dark:text-slate-200 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm"
              >
                <RefreshCcw size={16} /> Gõ lại
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-blue-500/30"
              >
                Hoàn tất <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>,
      document.body
    );
  }

  // UI FOR TYPING INTERFACE
  const accuracy = currentIndex > 0 ? Math.round((correctCount / currentIndex) * 100) : 100;
  
  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-slate-50 dark:bg-slate-950 flex flex-col font-sans overflow-hidden">
      <div className="w-full h-full flex flex-col relative">
        
        {/* Decorative Background */}
        <div className="absolute inset-0 pointer-events-none">
          {/* User's Background Image */}
          <div className="absolute inset-0 bg-[url('/images/backgrounds/typing-bg.jpg')] bg-cover bg-center bg-no-repeat opacity-100 dark:opacity-90 transition-all duration-500"></div>
          
          {/* Blur & Gradients */}
          <div className="absolute inset-0 opacity-20 dark:opacity-5">
            <div className="absolute top-0 right-0 w-96 h-96 bg-rose-300 blur-[100px] rounded-full mix-blend-multiply"></div>
          <div className="absolute bottom-0 left-0 w-full h-64 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-200 via-transparent to-transparent"></div>
          {/* We can use CSS patterns for the Japanese waves later */}
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, slate-400 1px, transparent 0)', backgroundSize: '32px 32px', opacity: 0.1 }}></div>
          </div>
        </div>

        {/* Top Header */}
        <div className="relative h-20 flex items-center justify-between px-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shrink-0">
          
          {/* Left: Progress */}
          <div className="flex items-center gap-6">
            <div>
              <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-0.5">TIẾN ĐỘ</div>
              <div className="text-xl font-black text-slate-800 dark:text-slate-100">{currentIndex + 1} <span className="text-base text-slate-400">/ {vocabList.length}</span></div>
            </div>
            <div className="w-48 h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden hidden sm:block">
              <div 
                className="h-full bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / vocabList.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Right: Stats & Close */}
          <div className="flex items-center gap-8">
            <div className="hidden md:flex flex-col items-center">
              <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-0.5">ĐIỂM</div>
              <div className="text-xl font-black text-blue-600 dark:text-blue-400 flex items-center gap-1.5"><Star size={16} fill="currentColor" /> {score}</div>
            </div>
            <div className="hidden md:flex flex-col items-center">
              <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-0.5">COMBO</div>
              <div className="text-xl font-black text-rose-500 dark:text-rose-400 flex items-center gap-1.5"><Flame size={16} fill={combo > 0 ? "currentColor" : "none"} className={combo > 3 ? "animate-pulse" : ""} /> {combo}</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-0.5">THỜI GIAN</div>
              <div className="text-xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-1.5">{formatTime(elapsedSeconds)}</div>
            </div>
            
            <div className="w-px h-10 bg-slate-200 dark:bg-slate-800 mx-2"></div>
            
            <button 
              onClick={onClose}
              className="px-4 py-2 bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl font-bold text-sm transition-colors flex items-center gap-2 shadow-sm"
            >
              <X size={16} /> Thoát
            </button>
          </div>
        </div>

        {/* Main Workspace */}
        <div className="relative flex-1 flex flex-col items-center px-4 md:px-8 pt-4 lg:pt-8 pb-4 gap-6 min-h-0 overflow-y-auto w-full">
          
          {/* Main Content: Prompt & Input */}
          <div className="w-full max-w-3xl flex flex-col items-center justify-center flex-1">
            
            {/* White Card: Prompt */}
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 w-full max-w-2xl p-6 md:p-8 flex flex-col items-center text-center relative z-10">
              <div className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.25em] mb-4">
                {mode === 'vocab' ? 'NGHĨA TIẾNG VIỆT' : 'KANJI'}
              </div>
              <div className={`font-black text-slate-800 dark:text-slate-100 mb-4 leading-tight ${mode === 'vocab' ? 'text-4xl md:text-5xl' : 'text-5xl md:text-6xl font-jp'}`}>
                {mode === 'vocab' ? currentVocab?.meaning : currentVocab?.kanji}
              </div>
              
              <button className="w-12 h-12 rounded-full bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 text-blue-500 flex items-center justify-center transition-colors">
                <Volume2 size={24} />
              </button>
            </div>

            {/* Input Wrapper */}
            <div className="w-full max-w-2xl mt-6 relative z-10">
              <div className={`relative bg-white dark:bg-slate-900 rounded-2xl border-[3px] transition-all duration-300 ${
                status === 'correct' ? 'border-emerald-400 shadow-[0_0_40px_rgba(52,211,153,0.3)]' :
                status === 'wrong' ? 'border-rose-400 animate-shake shadow-[0_0_40px_rgba(251,113,133,0.3)]' :
                'border-blue-400/50 focus-within:border-blue-500 shadow-lg'
              }`}>
                <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                  <span className="text-blue-400 font-black animate-pulse">|</span>
                </div>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  readOnly={status !== null}
                  placeholder={`Nhập romaji...`}
                  className={`w-full bg-transparent py-5 px-12 text-2xl font-jp font-bold outline-none placeholder:text-slate-300 dark:placeholder:text-slate-600 transition-colors ${
                    status === 'correct' ? 'text-emerald-600 dark:text-emerald-400' :
                    status === 'wrong' ? 'text-rose-600 dark:text-rose-400' :
                    'text-slate-800 dark:text-slate-100'
                  }`}
                />
              </div>
              
              <div className="text-center mt-4 text-slate-500 dark:text-slate-400 text-sm font-medium flex items-center justify-center gap-1.5">
                <Lightbulb size={14} className="text-amber-500" /> Gõ romaji
              </div>
            </div>

            {/* Support Keyboard Toggle */}
            <div className="mt-6 flex flex-col items-center w-full max-w-md">
              <div className="flex items-center w-full gap-4 mb-4 opacity-50">
                <div className="flex-1 h-px bg-slate-300 dark:bg-slate-700"></div>
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">BẢNG CHỮ HỖ TRỢ</div>
                <div className="flex-1 h-px bg-slate-300 dark:bg-slate-700"></div>
              </div>
              
              <div className="flex gap-4 w-full">
                <button 
                  onClick={() => { setImeMode('hira'); inputRef.current?.focus(); }}
                  className={`flex-1 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 border-2 transition-all ${
                    imeMode === 'hira' ? 'border-blue-500 text-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'border-white dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-slate-200 shadow-sm'
                  }`}
                >
                  <span className="text-xl font-jp text-blue-500">あ</span> Hiragana
                </button>
                <button 
                  onClick={() => { setImeMode('kata'); inputRef.current?.focus(); }}
                  className={`flex-1 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 border-2 transition-all ${
                    imeMode === 'kata' ? 'border-blue-500 text-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'border-white dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-slate-200 shadow-sm'
                  }`}
                >
                  <span className="text-xl font-jp text-blue-500">ア</span> Katakana
                </button>
              </div>
            </div>
            
          </div>

            {/* Inline Feedback */}
            {status === 'correct' && (
              <div ref={feedbackRef} className="mt-4 w-full max-w-2xl bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-4 border border-emerald-100 dark:border-emerald-800 animate-in fade-in slide-in-from-bottom-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center shrink-0">
                    <Check size={20} strokeWidth={3} />
                  </div>
                  <div>
                    <h4 className="text-emerald-700 dark:text-emerald-400 font-bold text-lg">Chính xác!</h4>
                    <p className="text-emerald-600/80 dark:text-emerald-500 text-sm">Tuyệt vời! Bạn đã gõ đúng.</p>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end gap-1">
                  <div className="flex items-center gap-3 bg-emerald-100/50 dark:bg-emerald-800/30 rounded-xl px-4 py-2 border border-emerald-200/50 dark:border-emerald-700/30">
                    <span className="text-emerald-800 dark:text-emerald-200 font-bold text-sm mr-2">{toRomaji((currentVocab?.hiragana || '').replace(/ー/g, '-')).toLowerCase()}</span>
                    <span className="text-emerald-600 dark:text-emerald-400 text-2xl font-jp font-bold">{currentVocab?.hiragana}</span>
                    <button className="w-8 h-8 rounded-full bg-white/50 dark:bg-slate-900/50 text-emerald-600 flex items-center justify-center"><Volume2 size={16}/></button>
                  </div>
                  <div className="text-base font-bold text-emerald-700 dark:text-emerald-300 mr-2">{currentVocab?.meaning}</div>
                </div>
              </div>
            )}

            {status === 'wrong' && (
              <div ref={feedbackRef} className="mt-4 w-full max-w-2xl bg-rose-50 dark:bg-rose-900/20 rounded-2xl p-4 border border-rose-100 dark:border-rose-800 animate-in fade-in slide-in-from-bottom-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-rose-500 text-white rounded-full flex items-center justify-center shrink-0">
                    <X size={20} strokeWidth={3} />
                  </div>
                  <div>
                    <h4 className="text-rose-700 dark:text-rose-400 font-bold text-lg">Chưa chính xác!</h4>
                    <p className="text-rose-600/80 dark:text-rose-500 text-sm">Đáp án đúng là:</p>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end gap-1">
                  <div className="flex items-center gap-3 bg-rose-100/50 dark:bg-rose-800/30 rounded-xl px-4 py-2 border border-rose-200/50 dark:border-rose-700/30">
                    <span className="text-rose-800 dark:text-rose-200 font-bold text-sm mr-2">{toRomaji((currentVocab?.hiragana || '').replace(/ー/g, '-')).toLowerCase()}</span>
                    <span className="text-rose-600 dark:text-rose-400 text-2xl font-jp font-bold">{currentVocab?.hiragana}</span>
                    <button className="w-8 h-8 rounded-full bg-white/50 dark:bg-slate-900/50 text-rose-600 flex items-center justify-center"><Volume2 size={16}/></button>
                  </div>
                  <div className="text-base font-bold text-rose-700 dark:text-rose-300 mr-2">{currentVocab?.meaning}</div>
                </div>
              </div>
            )}

            {/* Shortcuts Guide Inline */}
            <div className="mt-4 mb-2 flex items-center justify-center gap-6 text-slate-400 dark:text-slate-500">
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-[10px] font-bold border border-slate-200 dark:border-slate-700">Enter</kbd>
                <span className="text-xs font-medium">Xác nhận / Tiếp tục</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-[10px] font-bold border border-slate-200 dark:border-slate-700">Tab</kbd>
                <span className="text-xs font-medium">Đổi bảng chữ</span>
              </div>
            </div>


        </div>

        {/* Footer Stats Bar */}
        <div className="relative z-10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-4 lg:p-6 mb-6 mt-2 rounded-[2rem] shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 shrink-0 w-full max-w-5xl self-center">
          
          <div className="flex items-center gap-6 md:gap-12 w-full md:w-auto justify-between md:justify-start px-2">
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center border border-emerald-100 hidden sm:flex"><Check size={20} strokeWidth={3} /></div>
              <div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ĐÚNG</div>
                <div className="text-2xl font-black text-slate-800 dark:text-slate-100 leading-none">{correctCount}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center border border-rose-100 hidden sm:flex"><X size={20} strokeWidth={3} /></div>
              <div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">SAI</div>
                <div className="text-2xl font-black text-slate-800 dark:text-slate-100 leading-none">{wrongCount}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center border border-blue-100 hidden sm:flex"><Target size={20} /></div>
              <div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ĐỘ CHÍNH XÁC</div>
                <div className="text-2xl font-black text-blue-600 dark:text-blue-400 leading-none">{accuracy}%</div>
              </div>
            </div>

            <div className="flex items-center gap-3 hidden lg:flex">
              <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center border border-purple-100"><Trophy size={20} /></div>
              <div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">COMBO CAO NHẤT</div>
                <div className="text-2xl font-black text-slate-800 dark:text-slate-100 leading-none">{maxCombo}</div>
              </div>
            </div>
            
          </div>

          <button 
            onClick={skipQuestion}
            className="w-full md:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20"
          >
            {status !== null ? 'Tiếp tục' : 'Bỏ qua'} <ChevronRight size={20} />
          </button>
        </div>

      </div>
    </div>,
    document.body
  );
};
