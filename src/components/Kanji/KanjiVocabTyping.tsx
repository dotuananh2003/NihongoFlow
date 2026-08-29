import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  ArrowRight,
  Check,
  Flame,
  Lightbulb,
  RefreshCcw,
  Target,
  Timer,
  Trophy,
  Volume2,
  X,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toHiragana, toKatakana, toRomaji } from 'wanakana';
import { Confetti } from '../Kana/Confetti';
import { JapaneseMascot } from '../mascot/JapaneseMascot';
import type { VocabExample } from '../../data/kanjiData';

interface KanjiVocabTypingProps {
  vocabList: VocabExample[];
  onClose: () => void;
  kanjiChar?: string;
  mode?: 'kanji' | 'vocab';
  isJPD123?: boolean;
}

export const KanjiVocabTyping: React.FC<KanjiVocabTypingProps> = ({
  vocabList,
  onClose,
  kanjiChar,
  mode = 'kanji',
  isJPD123 = false,
}) => {
  const theme = isJPD123 ? {
    color: 'text-blue-600 dark:text-blue-400',
    bgLight: 'bg-blue-100/90 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300 border border-blue-200 dark:border-blue-800',
    btn: 'from-blue-600 via-sky-500 to-indigo-600 hover:from-blue-700 hover:to-sky-600 shadow-[0_8px_20px_rgba(59,130,246,0.3)]',
    gradient: 'from-blue-600 via-sky-500 to-cyan-400',
    border: 'border-blue-200/80 dark:border-slate-800',
    progressBar: 'from-blue-500 to-cyan-500',
    activeTab: 'bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-[0_4px_14px_rgba(37,99,235,0.25)] border-transparent'
  } : {
    color: 'text-rose-600 dark:text-rose-400',
    bgLight: 'bg-rose-100/90 text-rose-700 dark:bg-rose-950/70 dark:text-rose-300 border border-rose-200 dark:border-rose-800',
    btn: 'from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-600 shadow-[0_8px_20px_rgba(244,63,94,0.3)]',
    gradient: 'from-rose-500 via-pink-500 to-amber-400',
    border: 'border-rose-200/80 dark:border-slate-800',
    progressBar: 'from-rose-500 to-pink-500',
    activeTab: 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-[0_4px_14px_rgba(244,63,94,0.25)] border-transparent'
  };

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
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const currentVocab = shuffledVocabList[currentIndex];

  // Phát âm giọng Tokyo chuẩn (Ưu tiên Hiragana để tránh TTS đọc sai âm Onyomi như 町 -> ちょう)
  const playAudio = (text?: string) => {
    const targetText = text || currentVocab?.hiragana || currentVocab?.kanji;
    if (!targetText) return;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(targetText);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.85;
      setIsPlayingAudio(true);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    if ((status === 'correct' || status === 'wrong') && feedbackRef.current) {
      feedbackRef.current.scrollIntoView({ block: 'nearest' });
    }
  }, [status]);

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
    let timer: ReturnType<typeof setInterval>;
    if (startTime && !isFinished) {
      timer = setInterval(() => {
        setElapsedSeconds(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [startTime, isFinished]);

  useEffect(() => {
    if (!isFinished) {
      inputRef.current?.focus();
    }
  }, [currentIndex, isFinished]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let canClose = false;

    if (isFinished) {
      timeout = setTimeout(() => {
        canClose = true;
      }, 500);
    }

    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (isFinished && canClose && e.key === 'Enter') {
        e.preventDefault();
        try { if (document.fullscreenElement) document.exitFullscreen().catch(() => {}); } catch(e) {}
        onClose();
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [isFinished, onClose]);

  const getRomajiHint = (vocab: VocabExample | undefined) => {
    if (!vocab) return '';
    return toRomaji(vocab.hiragana.replace(/ー/g, '-')).toLowerCase();
  };

  // Hàm chuyển đổi IME phân tách token để bảo toàn hoàn hảo dấu ~ / 〜 / ～ và các ký tự phân cách
  const convertImeWithPunctuation = (text: string, mode: 'hira' | 'kata') => {
    return text.split(/([~〜～／/・\s]+)/).map(part => {
      if (/^[~〜～／/・\s]+$/.test(part)) return part.replace(/・/g, '/');
      if (mode === 'hira') {
        return toHiragana(part, { IMEMode: true }).replace(/・/g, '/');
      } else {
        const preVal = part.replace(/ディ/g, 'di').replace(/ティ/g, 'ti');
        let romaji = toRomaji(preVal, {
          customRomajiMapping: {
            'ふぉ': 'fo',
            'フォ': 'fo',
            'ふぁ': 'fa',
            'ファ': 'fa',
            'ふぃ': 'fi',
            'フィ': 'fi',
            'ふぇ': 'fe',
            'フェ': 'fe',
            'ディ': 'di',
            'ティ': 'ti',
            'でぃ': 'di',
            'てぃ': 'ti',
          },
        });
        romaji = romaji.replace(/([aiueo])\1/g, '$1-');
        return toKatakana(romaji, {
          IMEMode: true,
          customKanaMapping: { di: 'ディ', ti: 'ティ' },
        }).replace(/・/g, '/');
      }
    }).join('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!startTime) {
      setStartTime(Date.now());
    }

    const val = e.target.value;
    setInput(convertImeWithPunctuation(val, imeMode));
    setStatus(null);
  };

  const checkAnswer = () => {
    if (!currentVocab) return;

    const normalizeChars = (str: string) => str.replace(/[～〜]/g, '~').replace(/[／・]/g, '/');
    const stripTilde = (str: string) => str.replace(/^[~～〜\s]+|[~～〜\s]+$/g, '');

    const cleanInput = normalizeChars(input.trim().toLowerCase());
    const cleanInputNoTilde = stripTilde(cleanInput);

    const targetHira = normalizeChars(toHiragana(currentVocab.hiragana));
    const targetHiraNoTilde = stripTilde(targetHira);

    const targetKata = normalizeChars(toKatakana(currentVocab.hiragana));
    const targetKataNoTilde = stripTilde(targetKata);

    const targetRoma = normalizeChars(getRomajiHint(currentVocab));
    const targetRomaNoTilde = stripTilde(targetRoma);

    const inputRoma = normalizeChars(toRomaji(cleanInput, {
      customRomajiMapping: {
        'ふぉ': 'fo',
        'フォ': 'fo',
        'ふぁ': 'fa',
        'ファ': 'fa',
        'ふぃ': 'fi',
        'フィ': 'fi',
        'ふぇ': 'fe',
        'フェ': 'fe',
        'ディ': 'di',
        'ティ': 'ti',
        'でぃ': 'di',
        'てぃ': 'ti',
      },
    }).toLowerCase());
    const inputRomaNoTilde = stripTilde(inputRoma);

    const isCorrect = 
      cleanInput === targetHira || 
      cleanInput === targetKata || 
      cleanInput === targetRoma || 
      inputRoma === targetRoma ||
      // Cho phép linh hoạt khi người dùng gõ có hoặc không có dấu ~
      (cleanInputNoTilde !== '' && (
        cleanInputNoTilde === targetHiraNoTilde ||
        cleanInputNoTilde === targetKataNoTilde ||
        cleanInputNoTilde === targetRomaNoTilde ||
        inputRomaNoTilde === targetRomaNoTilde
      ));

    if (isCorrect) {
      setStatus('correct');
      setCorrectCount(prev => prev + 1);
      setCombo(prev => {
        const newCombo = prev + 1;
        setMaxCombo(m => Math.max(m, newCombo));
        return newCombo;
      });
      setScore(prev => prev + Math.floor(10 * (1 + combo * 0.1)));
      playAudio(currentVocab.hiragana || currentVocab.kanji);
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
        setTimeout(() => inputRef.current?.focus(), 0);
        return nextMode;
      });
    } else if (e.key === '~' || (e.key === '`' && e.shiftKey) || e.key === '～' || e.key === '〜') {
      e.preventDefault();
      if (!startTime) setStartTime(Date.now());
      const target = e.currentTarget;
      const start = target.selectionStart ?? input.length;
      const end = target.selectionEnd ?? input.length;
      const nextVal = input.slice(0, start) + '~' + input.slice(end);
      setInput(nextVal);
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.selectionStart = start + 1;
          inputRef.current.selectionEnd = start + 1;
        }
      }, 0);
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

  // =========================================================================
  // MÀN HÌNH TỔNG KẾT HOÀN THÀNH (VICTORY MODAL)
  // =========================================================================
  if (isFinished) {
    const accuracy = Math.round((correctCount / vocabList.length) * 100);

    return createPortal(
      <div className="smooth-scroll-area fixed inset-0 z-[9999] overflow-y-auto bg-slate-950/65 p-4 flex items-center justify-center font-sans">
        <Confetti />
        <motion.div 
          initial={{ scale: 0.96, opacity: 0, y: 18 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.97, opacity: 0, y: 14 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          style={{ willChange: 'transform, opacity' }}
          className="smooth-panel relative w-full max-w-xl overflow-hidden rounded-[32px] border border-white/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-7 text-center shadow-[0_18px_52px_rgba(15,23,42,0.22)] space-y-5"
        >
          <div className={`absolute inset-x-0 top-0 h-2 bg-gradient-to-r ${theme.gradient}`} />
          
          {/* Trophy & Mascot Celebration */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-3xl bg-amber-50 dark:bg-amber-950/60 text-amber-500 flex items-center justify-center shadow-inner ring-1 ring-amber-100 dark:ring-amber-900/50 mb-2">
              <Trophy size={34} />
            </div>
            <h2 className="text-3xl font-black uppercase text-slate-900 dark:text-white tracking-tight">
              Hoàn Thành Luyện Gõ!
            </h2>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
              {kanjiChar ? `Bạn đã hoàn thành bài gõ ${kanjiChar}` : 'Bạn đã xuất sắc hoàn thành toàn bộ danh sách từ vựng'}
            </p>
          </div>

          {/* Khối Thống kê 4 Chỉ số */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-3 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/50">
              <p className="text-xl font-black text-emerald-600 dark:text-emerald-400">{accuracy}%</p>
              <p className="text-[10px] font-bold uppercase text-slate-400">Độ chính xác</p>
            </div>

            <div className="p-3 rounded-2xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-800/50">
              <p className="text-xl font-black text-blue-600 dark:text-blue-400">{formatTime(elapsedSeconds)}</p>
              <p className="text-[10px] font-bold uppercase text-slate-400">Thời gian</p>
            </div>

            <div className="p-3 rounded-2xl bg-rose-50/80 dark:bg-rose-950/40 border border-rose-200/60 dark:border-rose-800/50">
              <p className="text-xl font-black text-rose-600 dark:text-rose-400">{maxCombo}</p>
              <p className="text-[10px] font-bold uppercase text-slate-400">Combo đỉnh</p>
            </div>

            <div className="p-3 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-800/50">
              <p className="text-xl font-black text-amber-600 dark:text-amber-400">{score}</p>
              <p className="text-[10px] font-bold uppercase text-slate-400">Tổng điểm</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <motion.button
              onClick={handleRestart}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-black text-slate-700 dark:text-slate-200 flex items-center justify-center gap-2 hover:bg-slate-50 cursor-pointer shadow-xs"
            >
              <RefreshCcw size={15} />
              <span>Gõ lại</span>
            </motion.button>

            <motion.button
              onClick={() => {
                try { if (document.fullscreenElement) document.exitFullscreen().catch(() => {}); } catch(e) {}
                onClose();
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`py-3 rounded-2xl bg-gradient-to-r ${theme.btn} text-xs font-black text-white flex items-center justify-center gap-2 shadow-md cursor-pointer`}
            >
              <span>Hoàn tất</span>
              <ArrowRight size={15} />
            </motion.button>
          </div>

        </motion.div>
      </div>,
      document.body
    );
  }

  const accuracy = currentIndex > 0 ? Math.round((correctCount / currentIndex) * 100) : 100;
  const progressPercent = ((currentIndex + 1) / vocabList.length) * 100;
  const promptLabel = mode === 'vocab' ? 'Nghĩa tiếng Việt' : 'Hán tự & Từ vựng';

  return createPortal(
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 14, scale: 0.985 }}
      transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
      style={{ willChange: 'transform, opacity' }}
      className="smooth-panel fixed inset-0 z-[9999] overflow-hidden bg-slate-50 dark:bg-slate-950 font-sans flex flex-col justify-between p-4 sm:p-6 select-none"
    >
      
      {/* Background Japanese Aesthetic Elements */}
      <div className="fixed-bg-plane absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-rose-400/10 dark:bg-rose-600/5 blur-2xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-blue-400/10 dark:bg-blue-600/5 blur-2xl" />
      </div>

      {/* ========================================================================= */}
      {/* 1. FLOATING GLASS HEADER */}
      {/* ========================================================================= */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
        style={{ willChange: 'transform, opacity' }}
        className="smooth-panel relative z-10 mx-auto w-full max-w-5xl rounded-[24px] bg-white/95 dark:bg-slate-900/95 border border-slate-200/80 dark:border-slate-800 px-5 py-3 shadow-[0_10px_26px_rgba(15,23,42,0.07)] flex flex-wrap items-center justify-between gap-4"
      >
        {/* Left: Mascot Avatar & Title & Progress Bar */}
        <div className="flex items-center gap-4 flex-1 min-w-[240px]">
          <div className="w-10 h-10 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200/80 dark:border-rose-800 flex items-center justify-center shrink-0 overflow-hidden">
            <div className="scale-55 -mt-1">
              <JapaneseMascot state="idle" showSpeechBubble={false} />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">
              <span className="font-black text-slate-800 dark:text-slate-100 truncate">
                {kanjiChar ? `Luyện Gõ: ${kanjiChar}` : 'Phòng Luyện Gõ Phản Xạ'}
              </span>
              <span className="font-black text-blue-600 dark:text-blue-400">
                {currentIndex + 1} / {vocabList.length}
              </span>
            </div>

            <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <motion.div 
                className={`h-full rounded-full bg-gradient-to-r ${theme.progressBar}`}
                style={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>

        {/* Right Stats Pills: Combo, Accuracy, Timer & Exit Button */}
        <div className="flex items-center gap-2.5 shrink-0">
          
          {/* Combo Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200/60 dark:border-amber-800/50 text-xs font-black text-amber-600 dark:text-amber-400 shadow-xs">
            <Flame size={15} className={`${combo > 1 ? 'animate-bounce text-amber-500' : 'text-amber-400'}`} />
            <span>Combo {combo}</span>
          </div>

          {/* Accuracy Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/60 dark:border-emerald-800/50 text-xs font-black text-emerald-600 dark:text-emerald-400 shadow-xs">
            <Target size={14} />
            <span>{accuracy}%</span>
          </div>

          {/* Timer Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 text-xs font-black text-slate-700 dark:text-slate-200 shadow-xs">
            <Timer size={14} />
            <span>{formatTime(elapsedSeconds)}</span>
          </div>

          {/* Close Button */}
          <motion.button
            onClick={() => {
              try { if (document.fullscreenElement) document.exitFullscreen().catch(() => {}); } catch(e) {}
              onClose();
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black shadow-sm transition-colors cursor-pointer"
          >
            <X size={14} strokeWidth={2.4} />
            <span>Thoát</span>
          </motion.button>

        </div>
      </motion.header>

      {/* ========================================================================= */}
      {/* 2. SÂN KHẤU CÂU HỎI TRUNG TÂM & Ô NHẬP LIỆU */}
      {/* ========================================================================= */}
      <main className="relative z-10 flex flex-col items-center justify-center gap-4 my-auto w-full max-w-3xl mx-auto">
        
        {/* Elevated Question Stage Card */}
        <motion.div 
          key={currentIndex}
          initial={{ scale: 0.95, opacity: 0, y: 12 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ willChange: 'transform, opacity' }}
          className="smooth-panel relative w-full overflow-hidden rounded-[32px] bg-white/96 dark:bg-slate-900/96 border border-slate-200/80 dark:border-slate-800 p-7 text-center shadow-[0_16px_40px_rgba(15,23,42,0.08)] space-y-3"
        >
          <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${theme.gradient}`} />

          {/* Badge Loại Câu Hỏi */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-xs">
            <Sparkles size={12} className={theme.color} />
            <span>{promptLabel}</span>
          </div>

          {/* Chữ Hán / Từ Vựng To Rõ */}
          <div className="py-2">
            <h2 className={`font-jp font-black text-slate-900 dark:text-white tracking-tight leading-tight ${
              mode === 'vocab' ? 'text-4xl sm:text-5xl' : 'text-6xl sm:text-7xl'
            }`}>
              {mode === 'vocab' ? currentVocab?.meaning : currentVocab?.kanji}
            </h2>
            {currentVocab?.note && (
              <div className="mt-2 inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-black bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800 shadow-xs">
                <span>{currentVocab.note}</span>
              </div>
            )}
          </div>

          {/* Nút Loa Phát Âm Tokyo */}
          <div className="flex justify-center pt-1">
            <motion.button
              onClick={() => playAudio()}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`w-11 h-11 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 shadow-xs hover:border-blue-300 hover:text-blue-600 transition-colors cursor-pointer ${
                isPlayingAudio ? 'ring-4 ring-blue-400/20 text-blue-600 animate-pulse' : ''
              }`}
              title="Nghe phát âm chuẩn Tokyo"
            >
              <Volume2 size={20} strokeWidth={2.2} />
            </motion.button>
          </div>
        </motion.div>

        {/* Khung Nhập Liệu Romaji -> Kana */}
        <div className="w-full space-y-2.5">
          <div className="smooth-panel relative rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 shadow-sm focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/15 transition-colors duration-150">
            <span className={`absolute left-4 top-1/2 -translate-y-1/2 w-1.5 h-6 rounded-full bg-gradient-to-b ${theme.gradient}`} />
            
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              readOnly={status !== null}
              placeholder="Nhập romaji (vd: konnichiwa)..."
              className="w-full bg-transparent pl-8 pr-12 py-4 font-jp text-2xl font-black text-slate-900 dark:text-white outline-none placeholder:text-slate-300 dark:placeholder:text-slate-600 placeholder:text-base placeholder:font-sans"
            />

            {input && (
              <button 
                onClick={() => setInput('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Feedback Kết Quả Trực Quan (Real-time Feedback) */}
          <div ref={feedbackRef} className="min-h-[64px]">
            {status === null && (
              <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-bold text-slate-400 dark:text-slate-500 py-1">
                <div className="flex items-center gap-1.5">
                  <Lightbulb size={14} className="text-amber-500" />
                  <span>Gõ romaji để hệ thống tự chuyển sang Hiragana/Katakana.</span>
                </div>
                {(currentVocab?.hiragana?.includes('～') || currentVocab?.hiragana?.includes('~') || currentVocab?.meaning?.includes('~')) && (
                  <button
                    type="button"
                    onClick={() => {
                      if (!startTime) setStartTime(Date.now());
                      setInput(prev => (prev.startsWith('~') ? prev : '~' + prev));
                      inputRef.current?.focus();
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-pink-100 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 hover:bg-pink-200 border border-pink-300 dark:border-pink-800 text-[11px] font-black cursor-pointer transition-colors"
                  >
                    <span>🌸 Chèn dấu ~</span>
                  </button>
                )}
              </div>
            )}

            {/* Banner Khi Gõ Đúng */}
            {status === 'correct' && (
              <motion.div 
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                style={{ willChange: 'transform, opacity' }}
                className="p-3.5 rounded-2xl bg-emerald-50/90 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 text-emerald-800 dark:text-emerald-300 flex items-center justify-between gap-4 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-xs shrink-0">
                    <Check size={20} strokeWidth={3} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase text-emerald-600 dark:text-emerald-400">Chính xác!</p>
                    <p className="font-jp text-base font-black text-slate-900 dark:text-white">{currentVocab?.hiragana}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">{getRomajiHint(currentVocab)}</p>
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-200">{currentVocab?.meaning}</p>
                </div>
              </motion.div>
            )}

            {/* Banner Khi Gõ Chưa Đúng */}
            {status === 'wrong' && (
              <motion.div 
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                style={{ willChange: 'transform, opacity' }}
                className="p-3.5 rounded-2xl bg-rose-50/90 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800/80 text-rose-800 dark:text-rose-300 flex items-center justify-between gap-4 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-rose-500 text-white flex items-center justify-center shadow-xs shrink-0">
                    <X size={20} strokeWidth={3} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase text-rose-600 dark:text-rose-400">Đáp án đúng:</p>
                    <p className="font-jp text-base font-black text-slate-900 dark:text-white">{currentVocab?.hiragana}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-[11px] font-bold text-rose-600 dark:text-rose-400 uppercase">{getRomajiHint(currentVocab)}</p>
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-200">{currentVocab?.meaning}</p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Bộ Chọn Bảng Chữ Hỗ Trợ: Hiragana / Katakana Toggle Pills */}
          <div className="flex items-center justify-center gap-3 pt-1">
            <button
              type="button"
              onClick={() => {
                setImeMode('hira');
                inputRef.current?.focus();
              }}
              className={`flex items-center gap-2 px-5 py-2 rounded-2xl text-xs font-black border transition-colors duration-150 cursor-pointer ${
                imeMode === 'hira'
                  ? theme.activeTab
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50'
              }`}
            >
              <span className="font-jp text-sm font-black">あ</span>
              <span>Hiragana</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setImeMode('kata');
                inputRef.current?.focus();
              }}
              className={`flex items-center gap-2 px-5 py-2 rounded-2xl text-xs font-black border transition-colors duration-150 cursor-pointer ${
                imeMode === 'kata'
                  ? theme.activeTab
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50'
              }`}
            >
              <span className="font-jp text-sm font-black">ア</span>
              <span>Katakana</span>
            </button>
          </div>

          {/* Phím tắt gợi ý */}
          <div className="flex items-center justify-center gap-3 text-[11px] font-bold text-slate-400 pt-1">
            <span><kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[10px]">Enter</kbd> Xác nhận / Tiếp tục</span>
            <span>•</span>
            <span><kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[10px]">Tab</kbd> Đổi bảng chữ</span>
          </div>

        </div>

      </main>

      {/* ========================================================================= */}
      {/* 3. BOTTOM STATS & ACTION BAR */}
      {/* ========================================================================= */}
      <motion.footer 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
        style={{ willChange: 'transform, opacity' }}
        className="smooth-panel relative z-10 mx-auto w-full max-w-4xl rounded-[24px] bg-white/95 dark:bg-slate-900/95 border border-slate-200/80 dark:border-slate-800 px-6 py-3 shadow-[0_10px_26px_rgba(15,23,42,0.07)] flex flex-wrap items-center justify-between gap-4"
      >
        <div className="flex items-center gap-6 text-xs font-bold">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
              <Check size={14} strokeWidth={3} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase text-slate-400">Đúng</p>
              <p className="text-sm font-black text-slate-900 dark:text-white leading-none">{correctCount}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center">
              <X size={14} strokeWidth={3} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase text-slate-400">Sai</p>
              <p className="text-sm font-black text-slate-900 dark:text-white leading-none">{wrongCount}</p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center">
              <Target size={14} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase text-slate-400">Độ chính xác</p>
              <p className="text-sm font-black text-slate-900 dark:text-white leading-none">{accuracy}%</p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center">
              <Flame size={14} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase text-slate-400">Combo đỉnh</p>
              <p className="text-sm font-black text-slate-900 dark:text-white leading-none">{maxCombo}</p>
            </div>
          </div>
        </div>

        {/* Nút Bỏ Qua (Skip) */}
        <motion.button
          onClick={skipQuestion}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className={`px-6 py-2.5 rounded-2xl bg-gradient-to-r ${theme.btn} text-white font-black text-xs shadow-sm flex items-center gap-2 cursor-pointer`}
        >
          <span>{status !== null ? 'Câu tiếp theo' : 'Bỏ qua'}</span>
          <ArrowRight size={14} strokeWidth={2.4} />
        </motion.button>
      </motion.footer>

    </motion.div>,
    document.body
  );
};
