import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  Trophy,
  Flame,
  Star,
  Lightbulb,
  Check,
  X,
  Sparkles,
  ArrowLeft,
  RotateCcw,
  BookOpen,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import practiceData from '../../data/exam/jpd123_practice.json';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const PracticeTest = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const location = useLocation();
  const count = location.state?.count || 10;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const shuffled = [...practiceData].sort(() => 0.5 - Math.random());
    const selected = count === 'all' ? shuffled : shuffled.slice(0, Number(count));
    setQuestions(selected);
  }, [count]);

  if (questions.length === 0) return null;

  const currentQuestion = questions[currentIndex];
  const isAnswered = selectedOption !== null;
  const isCorrect = selectedOption === currentQuestion.correctAnswer;

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    if (index === currentQuestion.correctAnswer) {
      setCorrectCount((prev) => prev + 1);
      const newCombo = combo + 1;
      setCombo(newCombo);
      setMaxCombo((prev) => Math.max(prev, newCombo));
      setScore((prev) => prev + 10 + (newCombo > 1 ? newCombo * 2 : 0));
    } else {
      setWrongCount((prev) => prev + 1);
      setCombo(0);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    const shuffled = [...practiceData].sort(() => 0.5 - Math.random());
    const selected = count === 'all' ? shuffled : shuffled.slice(0, Number(count));
    setQuestions(selected);
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setCorrectCount(0);
    setWrongCount(0);
    setIsFinished(false);
  };

  const getOptionCardStyle = (index: number) => {
    const isSelected = selectedOption === index;
    const isCorrectOption = index === currentQuestion.correctAnswer;

    if (isAnswered) {
      if (isCorrectOption) {
        return 'border-emerald-500 bg-emerald-50/95 text-emerald-950 shadow-[0_8px_24px_rgba(16,185,129,0.18)] ring-2 ring-emerald-200 dark:border-emerald-400 dark:bg-emerald-950/70 dark:text-emerald-100 dark:ring-emerald-900';
      }
      if (isSelected && !isCorrectOption) {
        return 'border-rose-400 bg-rose-50/95 text-rose-950 shadow-[0_8px_24px_rgba(244,63,94,0.18)] ring-2 ring-rose-200 dark:border-rose-500 dark:bg-rose-950/70 dark:text-rose-100 dark:ring-rose-900';
      }
      return 'border-slate-200/70 bg-white/50 text-slate-400 opacity-45 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-600';
    }

    if (isSelected) {
      return 'border-blue-500 bg-blue-50/90 text-blue-950 shadow-[0_10px_25px_rgba(37,99,235,0.16)] ring-2 ring-blue-200 dark:border-blue-400 dark:bg-blue-950/60 dark:text-blue-100 dark:ring-blue-900';
    }

    return 'border-slate-200/90 bg-white/90 text-slate-800 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50/40 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/85 dark:text-slate-200 dark:hover:border-blue-700/60';
  };

  const getOptionLetterStyle = (index: number) => {
    const isSelected = selectedOption === index;
    const isCorrectOption = index === currentQuestion.correctAnswer;

    if (isAnswered && isCorrectOption) {
      return 'bg-emerald-500 text-white shadow-sm';
    }
    if (isAnswered && isSelected && !isCorrectOption) {
      return 'bg-rose-500 text-white shadow-sm';
    }
    if (isSelected) {
      return 'bg-blue-600 text-white shadow-sm';
    }
    return 'bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-600 dark:bg-slate-800 dark:text-slate-300';
  };

  if (isFinished) {
    const accuracy = Math.round((correctCount / questions.length) * 100) || 0;
    return (
      <div className="relative flex min-h-[calc(100vh-80px)] w-full flex-col items-center justify-center overflow-hidden">
        <div className="fixed-bg-plane pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-sky-50/95 via-white/95 to-blue-50/90 dark:from-slate-950/98 dark:via-slate-950/95 dark:to-indigo-950/90" />
        <div className="fixed-bg-plane pointer-events-none absolute left-1/2 top-10 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-200/30 blur-3xl dark:bg-cyan-900/20" />

        <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center px-4 py-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="smooth-panel relative w-full max-w-lg overflow-hidden rounded-[2.25rem] border border-white/80 bg-white/95 p-6 text-center shadow-[0_20px_50px_rgba(15,23,42,0.1)] md:p-8 dark:border-slate-800 dark:bg-slate-900/95"
          >
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400" />
          <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-blue-200/40 blur-2xl dark:bg-blue-900/20" />

          <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-[0_12px_28px_rgba(245,158,11,0.3)] ring-4 ring-amber-100/60 dark:ring-amber-950/40">
            <Trophy size={34} />
          </div>

          <div className="mb-1.5 inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-0.5 text-[10px] font-black uppercase tracking-[0.16em] text-blue-600 ring-1 ring-blue-100 dark:bg-blue-950/60 dark:text-blue-300 dark:ring-blue-900/40">
            <Sparkles size={12} />
            Kết quả luyện tập
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Hoàn thành bài luyện tập!
          </h2>
          <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
            {accuracy >= 80
              ? 'Phong độ tuyệt vời! Bạn đã nắm rất vững kiến thức. 🎉'
              : accuracy >= 50
              ? 'Khá tốt! Hãy ôn lại các câu sai để cải thiện thêm nhé. 👍'
              : 'Hãy kiên trì luyện tập đều đặn để bứt phá nhé. 💪'}
          </p>

          <div className="my-6 grid grid-cols-4 gap-2">
            <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-2.5 text-center dark:border-blue-900/40 dark:bg-blue-950/40">
              <div className="text-[9px] font-black uppercase text-blue-500">Điểm số</div>
              <div className="mt-0.5 text-xl font-black text-blue-600 dark:text-blue-400">{score}</div>
            </div>
            <div className="rounded-xl border border-emerald-100 bg-emerald-50/70 p-2.5 text-center dark:border-emerald-900/40 dark:bg-emerald-950/40">
              <div className="text-[9px] font-black uppercase text-emerald-500">Đúng</div>
              <div className="mt-0.5 text-xl font-black text-emerald-600 dark:text-emerald-400">
                {correctCount}/{questions.length}
              </div>
            </div>
            <div className="rounded-xl border border-rose-100 bg-rose-50/70 p-2.5 text-center dark:border-rose-900/40 dark:bg-rose-950/40">
              <div className="text-[9px] font-black uppercase text-rose-500">Sai</div>
              <div className="mt-0.5 text-xl font-black text-rose-600 dark:text-rose-400">{wrongCount}</div>
            </div>
            <div className="rounded-xl border border-amber-100 bg-amber-50/70 p-2.5 text-center dark:border-amber-900/40 dark:bg-amber-950/40">
              <div className="text-[9px] font-black uppercase text-amber-500">Max Combo</div>
              <div className="mt-0.5 text-xl font-black text-amber-600 dark:text-amber-400">{maxCombo} 🔥</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={handleRestart}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white py-3 px-4 text-xs font-black text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <RotateCcw size={15} />
              Luyện lại
            </button>

            <button
              type="button"
              onClick={() => navigate(`/exam/${courseId}`)}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 py-3 px-4 text-xs font-black text-white shadow-md transition-all hover:-translate-y-0.5"
            >
              <BookOpen size={15} />
              Về Hub
            </button>
          </div>
        </motion.div>
      </div>
      </div>
    );
  }

  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  return (
    <div className="relative flex min-h-[calc(100vh-64px)] w-full flex-col overflow-hidden">
      {/* Background decorations */}
      <div className="fixed-bg-plane pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-sky-50/95 via-white/95 to-blue-50/90 dark:from-slate-950/98 dark:via-slate-950/95 dark:to-indigo-950/90" />
      <div className="fixed-bg-plane pointer-events-none absolute left-1/2 top-8 -z-10 h-60 w-60 -translate-x-1/2 rounded-full bg-cyan-200/25 blur-3xl dark:bg-cyan-900/15" />
      <div className="fixed-bg-plane pointer-events-none absolute right-8 top-16 -z-10 h-56 w-56 rounded-full bg-blue-200/30 blur-3xl dark:bg-blue-900/15" />

      {/* Main Content Wrapper */}
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-3.5 px-4 py-3 sm:px-6">
        {/* Top Header & Live Stats */}
        <header className="smooth-panel flex items-center justify-between gap-3 rounded-2xl border border-white/90 bg-white/95 p-2.5 shadow-sm sm:px-4 sm:py-3 dark:border-slate-800 dark:bg-slate-900/95">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => navigate(`/exam/${courseId}/practice`)}
            className="grid h-9 w-9 place-items-center rounded-xl bg-white text-slate-600 shadow-sm ring-1 ring-slate-200/70 transition-all hover:-translate-x-0.5 hover:text-blue-600 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700"
            title="Quay lại cài đặt"
          >
            <ArrowLeft size={17} />
          </button>

          <span className="rounded-xl bg-blue-50 px-3 py-1 text-xs font-black text-blue-600 ring-1 ring-blue-100 dark:bg-blue-950/60 dark:text-blue-300 dark:ring-blue-900/40">
            Câu {currentIndex + 1} / {questions.length}
          </span>
        </div>

        {/* Progress bar in center */}
        <div className="hidden sm:flex flex-1 items-center max-w-xs mx-4">
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-500 shadow-sm"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Stats on right */}
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-1 rounded-xl px-2.5 py-1 text-xs font-black transition-all ${
            combo > 1 
              ? 'bg-amber-100 text-amber-700 ring-1 ring-amber-200 shadow-sm dark:bg-amber-950/60 dark:text-amber-300' 
              : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
          }`}>
            <Flame size={14} className={combo > 1 ? 'text-amber-600 fill-amber-500' : 'text-slate-400'} />
            <span>{combo}</span>
          </div>

          <div className="flex items-center gap-1 rounded-xl bg-blue-50 px-2.5 py-1 text-xs font-black text-blue-600 ring-1 ring-blue-100 dark:bg-blue-950/60 dark:text-blue-300">
            <Star size={14} className="fill-blue-500 text-blue-500" />
            <span>{score}</span>
          </div>

          <button
            type="button"
            onClick={() => navigate(`/exam/${courseId}`)}
            className="inline-flex items-center gap-1 rounded-xl border border-slate-200/80 bg-white px-3 py-1.5 text-xs font-black text-slate-500 shadow-sm hover:text-rose-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
          >
            <X size={14} />
            <span className="hidden sm:inline">Thoát</span>
          </button>
        </div>
      </header>

      {/* Main Question & Options Body */}
      <div className="flex flex-col gap-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.16 }}
            className="flex flex-col gap-3"
          >
            {/* Question Card */}
            <div className="smooth-panel relative overflow-hidden rounded-[1.75rem] border border-white/90 bg-white/95 px-6 py-5 text-center shadow-[0_12px_36px_rgba(15,23,42,0.06)] sm:px-8 sm:py-6 dark:border-slate-800 dark:bg-slate-900/95">
              <div className="mb-2.5 inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                Chọn đáp án đúng
              </div>
              <h2 className="text-xl sm:text-2xl md:text-[1.65rem] font-black leading-relaxed text-slate-900 dark:text-slate-100">
                {currentQuestion.question}
              </h2>
            </div>

            {/* Options 2x2 Grid */}
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {currentQuestion.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrectOption = idx === currentQuestion.correctAnswer;

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`steady-scroll-row group relative flex min-h-[58px] items-center gap-3.5 rounded-2xl border-2 p-3.5 text-left transition-colors duration-150 sm:min-h-[64px] sm:p-4 ${getOptionCardStyle(
                      idx
                    )}`}
                  >
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl text-sm font-black transition-colors ${getOptionLetterStyle(
                        idx
                      )}`}
                    >
                      {['A', 'B', 'C', 'D'][idx]}
                    </span>
                    <span className="flex-1 text-base sm:text-lg font-black leading-snug">
                      {opt}
                    </span>

                    {isAnswered && isCorrectOption && (
                      <Check size={20} className="shrink-0 text-emerald-500" />
                    )}
                    {isAnswered && isSelected && !isCorrectOption && (
                      <X size={20} className="shrink-0 text-rose-500" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Answer Feedback / Explanation Panel */}
      <AnimatePresence>
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.2 }}
            className={`smooth-panel overflow-hidden rounded-2xl border p-4 shadow-lg sm:p-5 ${
              isCorrect
                ? 'border-emerald-200 bg-emerald-50/95 dark:border-emerald-800 dark:bg-emerald-950/95'
                : 'border-rose-200 bg-rose-50/95 dark:border-rose-800 dark:bg-rose-950/95'
            }`}
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1 min-w-0">
                {/* Status header */}
                <div className="flex items-center gap-2 mb-1.5">
                  {isCorrect ? (
                    <div className="flex items-center gap-1.5 text-base sm:text-lg font-black text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 size={20} />
                      <span>Chính xác! (+10đ {combo > 1 ? `• Combo x${combo}` : ''})</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-base sm:text-lg font-black text-rose-600 dark:text-rose-400">
                      <XCircle size={20} />
                      <span>Chưa chính xác!</span>
                    </div>
                  )}
                </div>

                {/* Explanation text */}
                <div className="rounded-xl border border-white/80 bg-white/80 px-3.5 py-2.5 text-xs sm:text-sm font-semibold leading-relaxed text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-200">
                  <span className="font-black text-slate-900 dark:text-white mr-1.5 inline-flex items-center gap-1">
                    <Lightbulb size={14} className="text-amber-500" />
                    Giải thích:
                  </span>
                  {currentQuestion.explanation}
                </div>
              </div>

              {/* Continue button */}
              <button
                type="button"
                onClick={handleNext}
                className={`inline-flex items-center justify-center gap-2 rounded-xl py-3 px-6 text-sm sm:text-base font-black text-white shadow-md transition-all hover:-translate-y-0.5 whitespace-nowrap shrink-0 ${
                  isCorrect
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 shadow-emerald-500/25'
                    : 'bg-gradient-to-r from-rose-600 to-pink-600 shadow-rose-500/25'
                }`}
              >
                <span>{currentIndex < questions.length - 1 ? 'Câu tiếp theo' : 'Xem tổng kết'}</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
};
