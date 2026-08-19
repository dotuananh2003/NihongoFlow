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
  const promptLabel = mode === 'vocab' ? 'Nghĩa tiếng Việt' : 'Kanji prompt';

  return createPortal(
    <div className="fixed inset-0 z-[9999] overflow-hidden bg-slate-50 font-sans dark:bg-slate-950">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/images/backgrounds/typing-bg.jpg')] bg-cover bg-center bg-no-repeat opacity-90 dark:opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/58 to-blue-50/70 dark:from-slate-950/86 dark:via-slate-950/72 dark:to-slate-900/82" />
      </div>

      <div className="relative flex h-full flex-col px-4 py-4 md:px-8">
        <header className="mx-auto grid w-full max-w-6xl grid-cols-[1fr_auto] items-center gap-3 rounded-[1.75rem] border border-white/75 bg-white/76 p-3 shadow-[0_16px_44px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/76 lg:grid-cols-[1fr_auto_1fr]">
          <div className="min-w-0">
            <div className="mb-2 flex items-center justify-between gap-3">
              <span className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] ${theme.progressSoft}`}>
                {currentIndex + 1} / {vocabList.length}
              </span>
              <span className="hidden text-[10px] font-black uppercase tracking-[0.18em] text-slate-400 sm:block">Practice route</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-200/80 dark:bg-slate-800">
              <div className={`h-full rounded-full ${theme.progressFill}`} style={{ width: `${progressPercent}%` }} />
            </div>
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            {[
              [Star, 'Điểm', score, 'text-blue-600 bg-blue-50'],
              [Flame, 'Combo', combo, 'text-rose-600 bg-rose-50'],
              [Timer, 'Thời gian', formatTime(elapsedSeconds), 'text-slate-700 bg-slate-50'],
            ].map(([Icon, label, value, className]) => {
              const StatIcon = Icon as typeof Star;
              return (
                <div key={label as string} className="flex min-w-[104px] items-center gap-2 rounded-2xl bg-white/78 px-3 py-2 ring-1 ring-slate-100 dark:bg-slate-900/72 dark:ring-slate-800">
                  <span className={`grid h-8 w-8 place-items-center rounded-xl ${className as string}`}>
                    <StatIcon size={16} />
                  </span>
                  <div>
                    <div className="text-[9px] font-black uppercase tracking-[0.16em] text-slate-400">{label as string}</div>
                    <div className="text-base font-black text-slate-900 dark:text-slate-50">{value as string | number}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="inline-flex h-11 items-center gap-2 rounded-2xl bg-slate-900 px-4 text-sm font-black text-white shadow-lg transition-colors hover:bg-slate-800 dark:bg-white dark:text-slate-950"
            >
              <X size={17} strokeWidth={2.6} /> Thoát
            </button>
          </div>
        </header>

        <main className="mx-auto grid w-full max-w-6xl flex-1 grid-rows-[1fr_auto] gap-4 py-4">
          <div className="grid min-h-0 gap-4 lg:grid-cols-[1fr_0.92fr]">
            <section className="relative flex min-h-[300px] flex-col justify-center overflow-hidden rounded-[2rem] border border-white/75 bg-white/72 p-5 text-center shadow-[0_18px_52px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/72">
              <div className={`absolute inset-x-0 top-0 h-2 bg-gradient-to-r ${theme.accentGradient}`} />
              <div className={`absolute -right-16 -top-20 font-jp text-[12rem] font-black leading-none ${theme.accentText} opacity-5`}>
                {mode === 'vocab' ? '語' : currentVocab?.kanji}
              </div>

              <div className="relative z-10">
                <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full bg-slate-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-slate-400 ring-1 ring-slate-100 dark:bg-slate-900 dark:ring-slate-800">
                  <Keyboard size={14} />
                  {promptLabel}
                </div>
                <div className={`mx-auto max-w-xl font-black leading-tight text-slate-900 dark:text-slate-50 ${mode === 'vocab' ? 'text-4xl md:text-5xl' : 'font-jp text-6xl md:text-7xl'}`}>
                  {mode === 'vocab' ? currentVocab?.meaning : currentVocab?.kanji}
                </div>
                <button className={`mx-auto mt-5 grid h-12 w-12 place-items-center rounded-2xl border bg-white shadow-sm ${theme.accentText} ${theme.accentBorder} dark:bg-slate-900`}>
                  <Volume2 size={22} />
                </button>
              </div>
            </section>

            <section className="flex min-h-[300px] flex-col overflow-hidden rounded-[2rem] border border-white/75 bg-white/78 p-5 shadow-[0_18px_52px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/76">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Câu trả lời</div>
                  <div className="mt-1 text-sm font-black text-slate-700 dark:text-slate-200">Nhập romaji hoặc kana</div>
                </div>
                <div className="grid grid-cols-2 gap-1 rounded-2xl bg-slate-50 p-1 ring-1 ring-slate-100 dark:bg-slate-900 dark:ring-slate-800">
                  <button
                    onClick={() => {
                      setImeMode('hira');
                      inputRef.current?.focus();
                    }}
                    className={`rounded-xl px-3 py-2 text-xs font-black transition-colors ${imeMode === 'hira' ? `${theme.tabActive} shadow-lg` : theme.tabIdle}`}
                  >
                    <span className="font-jp text-base">あ</span> Hira
                  </button>
                  <button
                    onClick={() => {
                      setImeMode('kata');
                      inputRef.current?.focus();
                    }}
                    className={`rounded-xl px-3 py-2 text-xs font-black transition-colors ${imeMode === 'kata' ? `${theme.tabActive} shadow-lg` : theme.tabIdle}`}
                  >
                    <span className="font-jp text-base">ア</span> Kata
                  </button>
                </div>
              </div>

              <div className={`relative rounded-[1.4rem] border-2 bg-white shadow-inner ring-4 ring-transparent transition-colors dark:bg-slate-900 ${
                status === 'correct'
                  ? 'border-emerald-400 ring-emerald-100'
                  : status === 'wrong'
                    ? 'border-rose-400 ring-rose-100'
                    : `border-slate-200 ${theme.inputBorder}`
              }`}>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  readOnly={status !== null}
                  placeholder="Nhập romaji..."
                  className={`w-full bg-transparent px-5 py-5 font-jp text-2xl font-black outline-none placeholder:text-slate-300 dark:placeholder:text-slate-600 ${
                    status === 'correct'
                      ? 'text-emerald-600'
                      : status === 'wrong'
                        ? 'text-rose-600'
                        : 'text-slate-900 dark:text-slate-100'
                  }`}
                />
              </div>

              <div ref={feedbackRef} className="mt-4 min-h-[112px]">
                {status === null && (
                  <div className="flex h-full items-center gap-3 rounded-[1.4rem] border border-slate-100 bg-slate-50/80 p-4 text-slate-500 dark:border-slate-800 dark:bg-slate-900/50">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-amber-50 text-amber-500 ring-1 ring-amber-100">
                      <Lightbulb size={18} />
                    </span>
                    <div>
                      <div className="text-sm font-black text-slate-700 dark:text-slate-200">Gõ bằng romaji</div>
                      <div className="mt-1 text-xs font-semibold">Enter để kiểm tra, Tab để đổi bảng chữ.</div>
                    </div>
                  </div>
                )}

                {status === 'correct' && (
                  <div className="grid gap-3 rounded-[1.4rem] border border-emerald-100 bg-emerald-50/92 p-4 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/30 md:grid-cols-[1fr_auto]">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-emerald-500 text-white">
                        <Check size={20} strokeWidth={3} />
                      </span>
                      <div>
                        <div className="text-base font-black">Chính xác</div>
                        <div className="text-xs font-semibold opacity-80">Bạn đã gõ đúng từ này.</div>
                      </div>
                    </div>
                    <AnswerPreview vocab={currentVocab} hint={getRomajiHint(currentVocab)} />
                  </div>
                )}

                {status === 'wrong' && (
                  <div className="grid gap-3 rounded-[1.4rem] border border-rose-100 bg-rose-50/92 p-4 text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/30 md:grid-cols-[1fr_auto]">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-rose-500 text-white">
                        <X size={20} strokeWidth={3} />
                      </span>
                      <div>
                        <div className="text-base font-black">Chưa chính xác</div>
                        <div className="text-xs font-semibold opacity-80">Xem đáp án rồi tiếp tục.</div>
                      </div>
                    </div>
                    <AnswerPreview vocab={currentVocab} hint={getRomajiHint(currentVocab)} />
                  </div>
                )}
              </div>
            </section>
          </div>

          <footer className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/74 p-2.5 shadow-[0_22px_60px_rgba(15,23,42,0.10)] backdrop-blur-2xl dark:border-slate-800 dark:bg-slate-950/76">
            <div className={`absolute inset-x-6 top-0 h-1.5 rounded-b-full bg-gradient-to-r ${theme.accentGradient}`} />
            <div className="absolute -left-16 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-white/70 blur-2xl" />
            <div className="relative grid items-center gap-2 lg:grid-cols-[1fr_auto]">
              <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                <StatTile icon={Check} label="Đúng" value={correctCount} subLabel="đã qua" tone="emerald" />
                <StatTile icon={X} label="Sai" value={wrongCount} subLabel="cần ôn" tone="rose" />
                <StatTile icon={Target} label="Chính xác" value={`${accuracy}%`} subLabel="hiện tại" tone="blue" />
                <StatTile icon={Trophy} label="Combo" value={maxCombo} subLabel="cao nhất" tone="violet" />
              </div>

              <button
                onClick={skipQuestion}
                className={`group inline-flex min-h-[62px] items-center justify-center gap-4 rounded-[1.55rem] bg-gradient-to-r ${theme.accentGradient} px-6 text-base font-black text-white shadow-[0_16px_36px_rgba(37,99,235,0.24)] transition-transform hover:-translate-y-0.5 active:translate-y-0`}
              >
                <span>{status !== null ? 'Tiếp tục' : 'Bỏ qua'}</span>
                <span className="grid h-9 w-9 place-items-center rounded-2xl bg-white/18 ring-1 ring-white/25 transition-transform group-hover:translate-x-0.5">
                  <ChevronRight size={19} strokeWidth={3} />
                </span>
              </button>
            </div>
          </footer>
        </main>
      </div>
    </div>,
    document.body
  );
};

const AnswerPreview = ({ vocab, hint }: { vocab?: VocabExample; hint: string }) => (
  <div className="flex items-center gap-3 rounded-2xl bg-white/72 px-3 py-2 text-slate-800 shadow-sm ring-1 ring-white/80 dark:bg-slate-950/45 dark:text-slate-100 dark:ring-slate-800">
    <div className="text-right">
      <div className="text-xs font-black uppercase tracking-[0.14em] text-slate-400">{hint}</div>
      <div className="font-jp text-2xl font-black">{vocab?.hiragana}</div>
    </div>
    <div className="h-10 w-px bg-slate-200 dark:bg-slate-800" />
    <div className="max-w-[150px] truncate text-sm font-black">{vocab?.meaning}</div>
  </div>
);

const statTone = {
  emerald: {
    shell: 'border-emerald-100/80 from-emerald-50/95 to-white text-emerald-600',
    icon: 'bg-emerald-500 text-white shadow-emerald-500/25',
    rail: 'from-emerald-500 to-teal-400',
  },
  rose: {
    shell: 'border-rose-100/80 from-rose-50/95 to-white text-rose-600',
    icon: 'bg-rose-500 text-white shadow-rose-500/25',
    rail: 'from-rose-500 to-pink-400',
  },
  blue: {
    shell: 'border-blue-100/80 from-blue-50/95 to-white text-blue-600',
    icon: 'bg-blue-600 text-white shadow-blue-500/25',
    rail: 'from-blue-600 to-cyan-400',
  },
  violet: {
    shell: 'border-violet-100/80 from-violet-50/95 to-white text-violet-600',
    icon: 'bg-violet-500 text-white shadow-violet-500/25',
    rail: 'from-violet-500 to-fuchsia-400',
  },
};

type StatTone = keyof typeof statTone;

const StatTile = ({
  icon: Icon,
  label,
  value,
  subLabel,
  tone,
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  label: string;
  value: number | string;
  subLabel: string;
  tone: StatTone;
}) => {
  const colors = statTone[tone];

  return (
    <div className={`relative overflow-hidden rounded-[1.35rem] border bg-gradient-to-br px-3 py-2.5 ${colors.shell}`}>
      <div className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${colors.rail}`} />
      <div className="flex items-center gap-3">
        <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl shadow-lg ${colors.icon}`}>
          <Icon size={19} strokeWidth={2.8} />
        </span>
        <div className="min-w-0">
          <div className="truncate text-[9px] font-black uppercase tracking-[0.18em] opacity-70">{label}</div>
          <div className="mt-0.5 flex items-end gap-1">
            <span className="text-2xl font-black leading-none">{value}</span>
            <span className="pb-0.5 text-[10px] font-black uppercase tracking-[0.12em] opacity-55">{subLabel}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
