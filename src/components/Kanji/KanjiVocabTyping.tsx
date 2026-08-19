import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  ArrowRight,
  Check,
  CheckCircle,
  ChevronRight,
  Flame,
  Keyboard,
  Lightbulb,
  RefreshCcw,
  Star,
  Target,
  Timer,
  Trophy,
  Volume2,
  X,
} from 'lucide-react';
import { toHiragana, toKatakana, toRomaji } from 'wanakana';
import { Confetti } from '../Kana/Confetti';
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
  const theme = {
    progressFill: isJPD123 ? 'bg-blue-600' : 'bg-rose-600',
    progressSoft: isJPD123 ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-rose-50 text-rose-600 border-rose-100',
    accentText: isJPD123 ? 'text-blue-600' : 'text-rose-600',
    accentBg: isJPD123 ? 'bg-blue-600' : 'bg-rose-600',
    accentBorder: isJPD123 ? 'border-blue-200' : 'border-rose-200',
    accentRing: isJPD123 ? 'ring-blue-100' : 'ring-rose-100',
    accentGradient: isJPD123 ? 'from-blue-600 via-sky-400 to-cyan-300' : 'from-rose-600 via-pink-400 to-amber-300',
    inputBorder: isJPD123 ? 'focus-within:border-blue-500 focus-within:ring-blue-100' : 'focus-within:border-rose-500 focus-within:ring-rose-100',
    tabActive: isJPD123 ? 'bg-blue-600 text-white shadow-blue-500/25' : 'bg-rose-600 text-white shadow-rose-500/25',
    tabIdle: 'bg-white/78 text-slate-600 ring-1 ring-slate-100 hover:bg-white dark:bg-slate-900/72 dark:text-slate-300 dark:ring-slate-800',
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

  const inputRef = useRef<HTMLInputElement>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const currentVocab = shuffledVocabList[currentIndex];

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!startTime) {
      setStartTime(Date.now());
    }

    const val = e.target.value.replace(/\s/g, '').replace(/〜/g, '~');

    if (imeMode === 'hira') {
      setInput(toHiragana(val, { IMEMode: true }).replace(/・/g, '/'));
    } else {
      let romaji = toRomaji(val, {
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
      setInput(toKatakana(romaji, {
        IMEMode: true,
        customKanaMapping: { di: 'ディ', ti: 'ティ' },
      }).replace(/・/g, '/'));
    }
    setStatus(null);
  };

  const checkAnswer = () => {
    if (!currentVocab) return;

    const normalizeChars = (str: string) => str.replace(/[～〜]/g, '~').replace(/[／・]/g, '/');
    const cleanInput = normalizeChars(input.trim().toLowerCase());
    const targetHira = normalizeChars(toHiragana(currentVocab.hiragana));
    const targetKata = normalizeChars(toKatakana(currentVocab.hiragana));
    const targetRoma = normalizeChars(getRomajiHint(currentVocab));
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
      <div className="fixed inset-0 z-[9999] overflow-y-auto bg-slate-950/72 p-4 backdrop-blur-md">
        <div className="flex min-h-full items-center justify-center">
          <Confetti />
          <div className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/70 bg-white/92 p-6 text-center shadow-2xl dark:border-slate-800 dark:bg-slate-950/94">
            <div className={`absolute inset-x-0 top-0 h-2 bg-gradient-to-r ${theme.accentGradient}`} />
            <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-3xl bg-amber-50 text-amber-500 shadow-inner ring-1 ring-amber-100">
              <Trophy size={34} />
            </div>
            <h2 className={`text-3xl font-black uppercase tracking-[0.18em] ${theme.accentText}`}>Hoàn thành</h2>
            <p className="mt-2 text-sm font-semibold text-slate-500">
              {kanjiChar ? `Bạn đã hoàn thành bài gõ ${kanjiChar}` : 'Bạn đã hoàn thành bài luyện gõ'}
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
              {[
                [Target, 'Độ chính xác', `${accuracy}%`, 'text-emerald-600 bg-emerald-50 border-emerald-100'],
                [Timer, 'Thời gian', formatTime(elapsedSeconds), 'text-blue-600 bg-blue-50 border-blue-100'],
                [CheckCircle, 'Đúng', `${correctCount}`, 'text-indigo-600 bg-indigo-50 border-indigo-100'],
                [RefreshCcw, 'Sai', `${wrongCount}`, 'text-rose-600 bg-rose-50 border-rose-100'],
              ].map(([Icon, label, value, className]) => {
                const StatIcon = Icon as typeof Target;
                return (
                  <div key={label as string} className={`rounded-2xl border p-3 ${className}`}>
                    <StatIcon size={20} className="mx-auto mb-2" />
                    <div className="text-xl font-black">{value as string}</div>
                    <div className="mt-1 text-[9px] font-black uppercase tracking-[0.16em] opacity-70">{label as string}</div>
                  </div>
                );
              })}
            </div>

            {isPerfect && (
              <div className="mt-4 rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm font-black text-amber-700">
                Thành tích hoàn hảo, không có lỗi sai.
              </div>
            )}

            <div className="mt-5 grid grid-cols-2 gap-3">
              <button
                onClick={handleRestart}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-700 transition-colors hover:bg-slate-50"
              >
                <RefreshCcw size={16} /> Gõ lại
              </button>
              <button
                onClick={onClose}
                className={`inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-black text-white shadow-lg ${theme.accentBg}`}
              >
                Hoàn tất <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>,
      document.body
    );
  }

  const accuracy = currentIndex > 0 ? Math.round((correctCount / currentIndex) * 100) : 100;
  const progressPercent = ((currentIndex + 1) / vocabList.length) * 100;
  const promptLabel = mode === 'vocab' ? 'Nghĩa tiếng Việt' : 'Kanji';
  const statusTone =
    status === 'correct'
      ? 'border-emerald-300 bg-emerald-50/92 text-emerald-700 shadow-emerald-500/10'
      : status === 'wrong'
        ? 'border-rose-300 bg-rose-50/92 text-rose-700 shadow-rose-500/10'
        : 'border-blue-300 bg-white/92 text-slate-900 shadow-blue-500/12';

  return createPortal(
    <div className="fixed inset-0 z-[9999] overflow-hidden bg-slate-50 font-sans dark:bg-slate-950">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/images/backgrounds/typing-bg.jpg')] bg-cover bg-center bg-no-repeat opacity-88 dark:opacity-42" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_24%,rgba(255,255,255,0.96),rgba(255,255,255,0.64)_42%,rgba(219,234,254,0.46)_100%)] dark:bg-[radial-gradient(circle_at_50%_22%,rgba(15,23,42,0.72),rgba(15,23,42,0.9)_62%,rgba(2,6,23,0.96)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-sky-100/70 via-white/35 to-transparent dark:from-slate-950" />
      </div>

      <div className="relative flex h-full flex-col items-center px-4 py-4 md:px-8">
        <header className="mx-auto w-full max-w-[1040px] rounded-[2rem] border border-white/85 bg-white/76 p-2.5 shadow-[0_22px_58px_rgba(15,23,42,0.11)] backdrop-blur-2xl dark:border-slate-800 dark:bg-slate-950/80">
          <div className="grid items-center gap-2 md:grid-cols-[1.35fr_auto]">
            <div className="grid items-center gap-2 sm:grid-cols-[minmax(220px,1fr)_auto]">
              <div className="relative overflow-hidden rounded-[1.5rem] border border-white/80 bg-white/68 px-4 py-3 ring-1 ring-slate-100/70 dark:border-slate-800 dark:bg-slate-900/62 dark:ring-slate-800">
                <div className={`absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b ${theme.accentGradient}`} />
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Tiến độ</div>
                    <div className="mt-1 flex items-end gap-2">
                      <span className="text-2xl font-black leading-none text-slate-950 dark:text-white">{currentIndex + 1}</span>
                      <span className="pb-0.5 text-sm font-black text-slate-400">/ {vocabList.length}</span>
                    </div>
                  </div>
                  <span className={`shrink-0 rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] ${theme.progressSoft}`}>
                    {accuracy}% đúng
                  </span>
                </div>
                <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-200/80 dark:bg-slate-800">
                  <div className={`h-full rounded-full bg-gradient-to-r ${theme.accentGradient} shadow-[0_0_18px_rgba(37,99,235,0.24)]`} style={{ width: `${progressPercent}%` }} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[
                  [Star, 'Điểm', score, 'bg-blue-50 text-blue-600 ring-blue-100'],
                  [Flame, 'Combo', `${combo}/${maxCombo}`, 'bg-rose-50 text-rose-600 ring-rose-100'],
                  [Timer, 'Thời gian', formatTime(elapsedSeconds), 'bg-slate-50 text-slate-800 ring-slate-100 dark:bg-slate-800 dark:text-slate-100 dark:ring-slate-700'],
                ].map(([Icon, label, value, className]) => {
                  const StatIcon = Icon as typeof Star;
                  return (
                    <div key={label as string} className="min-w-[92px] rounded-[1.35rem] border border-white/80 bg-white/58 px-3 py-2.5 ring-1 ring-slate-100/70 dark:border-slate-800 dark:bg-slate-900/58 dark:ring-slate-800">
                      <div className="flex items-center gap-2">
                        <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-2xl ring-1 ${className as string}`}>
                          <StatIcon size={16} strokeWidth={2.6} />
                        </span>
                        <div className="min-w-0">
                          <div className="truncate text-[9px] font-black uppercase tracking-[0.16em] text-slate-400">{label as string}</div>
                          <div className="mt-0.5 text-xl font-black leading-none text-slate-950 dark:text-white">{value as string | number}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="group inline-flex h-[68px] items-center justify-center gap-3 rounded-full bg-rose-600 px-7 text-base font-black text-white shadow-[0_16px_32px_rgba(225,29,72,0.28)] outline-none transition-transform hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-4 focus-visible:ring-rose-100"
            >
              <span className="grid h-9 w-9 place-items-center rounded-2xl bg-white/16 ring-1 ring-white/24 transition-transform group-hover:rotate-90">
                <X size={18} strokeWidth={3} />
              </span>
              Thoát
            </button>
          </div>
        </header>

        <main className="flex w-full flex-1 flex-col items-center justify-center gap-3 pb-24 pt-2">
          <section className="relative w-full max-w-[840px] overflow-hidden rounded-[2.25rem] border border-white/85 bg-white/78 px-6 py-7 text-center shadow-[0_20px_54px_rgba(15,23,42,0.09)] backdrop-blur-2xl dark:border-slate-800 dark:bg-slate-950/78">
            <div className={`absolute inset-x-24 top-0 h-1.5 rounded-b-full bg-gradient-to-r ${theme.accentGradient}`} />
            <div className={`absolute -right-10 -top-16 font-jp text-[11rem] font-black leading-none ${theme.accentText} opacity-[0.04]`}>
              {mode === 'vocab' ? '語' : currentVocab?.kanji}
            </div>
            <div className={`mx-auto mb-4 inline-flex items-center gap-2 rounded-full border bg-white/70 px-4 py-2 text-[10px] font-black uppercase tracking-[0.26em] ${theme.accentText} ${theme.accentBorder}`}>
              <Keyboard size={14} />
              {promptLabel}
            </div>
            <div className={`relative mx-auto max-w-2xl font-black leading-tight text-slate-900 dark:text-slate-50 ${mode === 'vocab' ? 'text-4xl md:text-5xl' : 'font-jp text-6xl md:text-7xl'}`}>
              {mode === 'vocab' ? currentVocab?.meaning : currentVocab?.kanji}
            </div>
            <button className={`mx-auto mt-5 grid h-13 w-13 place-items-center rounded-full border bg-white/82 shadow-[0_12px_28px_rgba(15,23,42,0.08)] ${theme.accentText} ${theme.accentBorder} dark:bg-slate-900`}>
              <Volume2 size={22} />
            </button>
          </section>

          <div className="w-full max-w-[840px]">
            <div className={`relative rounded-[1.25rem] border-2 shadow-[0_18px_42px_rgba(15,23,42,0.10)] ring-4 ring-white/60 backdrop-blur-xl transition-colors dark:bg-slate-950/80 ${statusTone}`}>
              <span className={`absolute left-8 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-gradient-to-b ${theme.accentGradient}`} />
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                readOnly={status !== null}
                placeholder="Nhập romaji..."
                className={`w-full bg-transparent px-14 py-5 font-jp text-2xl font-black outline-none placeholder:text-slate-300 dark:placeholder:text-slate-600 ${
                  status === 'correct'
                    ? 'text-emerald-600'
                    : status === 'wrong'
                      ? 'text-rose-600'
                      : 'text-slate-900 dark:text-slate-100'
                }`}
              />
            </div>

            <div ref={feedbackRef} className="mt-2 min-h-[58px]">
              {status === null && (
                <div className="flex items-center justify-center gap-2 text-sm font-semibold text-slate-500">
                  <Lightbulb size={15} className="text-amber-500" />
                  Gõ romaji để hệ thống tự đổi sang kana.
                </div>
              )}

              {status === 'correct' && (
                <div className="mx-auto grid max-w-[820px] items-center gap-3 overflow-hidden rounded-[1.6rem] border border-emerald-200/80 bg-white/78 p-2 text-emerald-700 shadow-[0_14px_34px_rgba(16,185,129,0.12)] backdrop-blur-xl md:grid-cols-[1fr_auto]">
                  <div className="flex min-h-[72px] items-center gap-3 rounded-[1.25rem] bg-emerald-50/92 px-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-emerald-500 text-white shadow-[0_12px_24px_rgba(16,185,129,0.24)]">
                      <Check size={22} strokeWidth={3} />
                    </span>
                    <div className="min-w-0 text-left">
                      <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Kết quả</div>
                      <div className="mt-0.5 text-base font-black">Chính xác</div>
                      <div className="text-xs font-semibold opacity-75">Câu trả lời đã khớp với đáp án.</div>
                    </div>
                  </div>
                  <div className="rounded-[1.25rem] border border-white/80 bg-white/92 px-4 py-3 shadow-sm ring-1 ring-emerald-100/80">
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-500">{getRomajiHint(currentVocab)}</div>
                        <div className="font-jp text-3xl font-black leading-none text-slate-900">{currentVocab?.hiragana}</div>
                      </div>
                      <div className="h-11 w-px bg-emerald-100" />
                      <div className="max-w-[180px] truncate text-sm font-black text-slate-800">{currentVocab?.meaning}</div>
                    </div>
                  </div>
                </div>
              )}

              {status === 'wrong' && (
                <div className="mx-auto grid max-w-[820px] items-center gap-3 overflow-hidden rounded-[1.6rem] border border-rose-200/80 bg-white/78 p-2 text-rose-700 shadow-[0_14px_34px_rgba(244,63,94,0.12)] backdrop-blur-xl md:grid-cols-[1fr_auto]">
                  <div className="flex min-h-[72px] items-center gap-3 rounded-[1.25rem] bg-rose-50/92 px-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-rose-500 text-white shadow-[0_12px_24px_rgba(244,63,94,0.24)]">
                      <X size={22} strokeWidth={3} />
                    </span>
                    <div className="min-w-0 text-left">
                      <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Cần sửa</div>
                      <div className="mt-0.5 text-base font-black">Chưa chính xác</div>
                      <div className="text-xs font-semibold opacity-75">Đáp án đúng nằm ở thẻ bên phải.</div>
                    </div>
                  </div>
                  <div className="rounded-[1.25rem] border border-white/80 bg-white/92 px-4 py-3 shadow-sm ring-1 ring-rose-100/80">
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-[10px] font-black uppercase tracking-[0.18em] text-rose-500">{getRomajiHint(currentVocab)}</div>
                        <div className="font-jp text-3xl font-black leading-none text-slate-900">{currentVocab?.hiragana}</div>
                      </div>
                      <div className="h-11 w-px bg-rose-100" />
                      <div className="max-w-[180px] truncate text-sm font-black text-slate-800">{currentVocab?.meaning}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-1 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200/80 dark:bg-slate-800" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Bảng chữ hỗ trợ</span>
              <div className="h-px flex-1 bg-slate-200/80 dark:bg-slate-800" />
            </div>

            <div className="mx-auto mt-4 grid max-w-[560px] grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setImeMode('hira');
                  inputRef.current?.focus();
                }}
                className={`flex h-16 items-center justify-center gap-3 overflow-hidden rounded-2xl border-2 text-sm font-black shadow-sm outline-none transition-all focus-visible:ring-4 ${theme.accentRing} ${
                  imeMode === 'hira'
                    ? `border-white/80 ${theme.accentBg} text-white shadow-[0_12px_28px_rgba(37,99,235,0.18)]`
                    : 'border-white/80 bg-white/76 text-slate-600 hover:bg-white dark:border-slate-800 dark:bg-slate-950/72 dark:text-slate-300'
                }`}
              >
                <span className="font-jp text-xl">あ</span> Hiragana
              </button>
              <button
                type="button"
                onClick={() => {
                  setImeMode('kata');
                  inputRef.current?.focus();
                }}
                className={`flex h-16 items-center justify-center gap-3 overflow-hidden rounded-2xl border-2 text-sm font-black shadow-sm outline-none transition-all focus-visible:ring-4 ${theme.accentRing} ${
                  imeMode === 'kata'
                    ? `border-white/80 ${theme.accentBg} text-white shadow-[0_12px_28px_rgba(37,99,235,0.18)]`
                    : 'border-white/80 bg-white/76 text-slate-600 hover:bg-white dark:border-slate-800 dark:bg-slate-950/72 dark:text-slate-300'
                }`}
              >
                <span className="font-jp text-xl">ア</span> Katakana
              </button>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-slate-400">
              <span className="rounded-lg border border-slate-200 bg-white/72 px-2 py-1 text-[10px] font-black">Enter</span>
              <span>Xác nhận / Tiếp tục</span>
              <span className="rounded-lg border border-slate-200 bg-white/72 px-2 py-1 text-[10px] font-black">Tab</span>
              <span>Đổi bảng chữ</span>
            </div>
          </div>

        </main>

        <footer className="absolute inset-x-4 bottom-4 mx-auto w-[min(100%,1060px)] rounded-full border border-white/85 bg-white/78 p-2 shadow-[0_20px_54px_rgba(15,23,42,0.14)] backdrop-blur-2xl dark:border-slate-800 dark:bg-slate-950/80">
          <div className={`absolute inset-x-12 -top-px h-1 rounded-b-full bg-gradient-to-r ${theme.accentGradient}`} />
          <div className="grid items-center gap-2 md:grid-cols-[1fr_auto]">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {[
                [Check, 'Đúng', correctCount, 'bg-emerald-50 text-emerald-600 ring-emerald-100'],
                [X, 'Sai', wrongCount, 'bg-rose-50 text-rose-600 ring-rose-100'],
                [Target, 'Độ chính xác', `${accuracy}%`, 'bg-blue-50 text-blue-600 ring-blue-100'],
                [Trophy, 'Combo cao nhất', maxCombo, 'bg-violet-50 text-violet-600 ring-violet-100'],
              ].map(([Icon, label, value, className]) => {
                const MetricIcon = Icon as typeof Check;

                return (
                  <div key={label as string} className="group flex min-h-[58px] items-center gap-3 rounded-full bg-white/58 px-3 ring-1 ring-white/80 transition-colors hover:bg-white/80 dark:bg-slate-900/56 dark:ring-slate-800">
                    <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ring-1 ${className as string}`}>
                      <MetricIcon size={18} strokeWidth={2.8} />
                    </span>
                    <div className="min-w-0">
                      <div className="truncate text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">{label as string}</div>
                      <div className="text-xl font-black leading-none text-slate-900 dark:text-white">{value as string | number}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={skipQuestion}
              className={`group inline-flex min-h-[58px] items-center justify-center gap-3 rounded-full bg-gradient-to-r ${theme.accentGradient} px-7 text-base font-black text-white shadow-[0_14px_34px_rgba(37,99,235,0.24)] transition-transform hover:-translate-y-0.5 active:translate-y-0`}
            >
              {status !== null ? 'Tiếp tục' : 'Bỏ qua'}
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white/18 ring-1 ring-white/24 transition-transform group-hover:translate-x-0.5">
                <ChevronRight size={18} strokeWidth={3} />
              </span>
            </button>
          </div>
        </footer>
      </div>
    </div>,
    document.body
  );
};
