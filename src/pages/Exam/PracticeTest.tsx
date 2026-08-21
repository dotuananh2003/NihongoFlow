import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  RefreshCw,
  Trophy,
  Flame,
  Star,
  Lightbulb,
  Check,
  X,
  Sparkles,
  ArrowLeft,
  Target,
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

  // Option Styling logic matching modern theme
  const getOptionCardStyle = (index: number) => {
    const isSelected = selectedOption === index;
    const isCorrectOption = index === currentQuestion.correctAnswer;

    if (isAnswered) {
      if (isCorrectOption) {
        return 'border-emerald-500 bg-emerald-50/90 text-emerald-950 shadow-[0_10px_25px_rgba(16,185,129,0.18)] ring-4 ring-emerald-100 dark:border-emerald-400 dark:bg-emerald-950/60 dark:text-emerald-100 dark:ring-emerald-950';
      }
      if (isSelected && !isCorrectOption) {
        return 'border-rose-400 bg-rose-50/90 text-rose-950 shadow-[0_10px_25px_rgba(244,63,94,0.18)] ring-4 ring-rose-100 dark:border-rose-500 dark:bg-rose-950/60 dark:text-rose-100 dark:ring-rose-950';
      }
      return 'border-slate-200/70 bg-white/60 text-slate-400 opacity-50 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-600';
    }

    if (isSelected) {
      return 'border-blue-500 bg-blue-50/90 text-blue-950 shadow-[0_12px_28px_rgba(37,99,235,0.16)] ring-4 ring-blue-100 dark:border-blue-400 dark:bg-blue-950/60 dark:text-blue-100 dark:ring-blue-950';
    }

    return 'border-slate-200/90 bg-white/85 text-slate-800 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50/40 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/85 dark:text-slate-200 dark:hover:border-blue-700/60';
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

  // Render Finished State
  if (isFinished) {
    const accuracy = Math.round((correctCount / questions.length) * 100) || 0;
    return (
      <div className="relative mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-4xl flex-col items-center justify-center px-4 py-8 md:px-8">
        {/* Background decorations */}
        <div
          className="pointer-events-none absolute inset-0 -z-20 bg-cover bg-center opacity-45"
          style={{ backgroundImage: "url('/images/backgrounds/grammar-page-bg.png')" }}
        />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-sky-50/95 via-white/90 to-blue-50/90 dark:from-slate-950/95 dark:via-slate-950/92 dark:to-indigo-950/90" />
        <div className="pointer-events-none absolute left-1/2 top-10 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-200/30 blur-3xl dark:bg-cyan-900/20" />

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="relative w-full max-w-xl overflow-hidden rounded-[2.5rem] border border-white/80 bg-white/90 p-8 md:p-10 text-center shadow-[0_24px_60px_rgba(15,23,42,0.1)] backdrop-blur-2xl dark:border-slate-800 dark:bg-slate-900/90"
        >
          {/* Top Decorative Rail */}
          <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400" />
          <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-200/40 blur-3xl dark:bg-blue-900/20" />

          <div className="mx-auto mb-6 grid h-24 w-24 place-items-center rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-[0_16px_36px_rgba(245,158,11,0.3)] ring-8 ring-amber-100/60 dark:ring-amber-950/40">
            <Trophy size={48} />
          </div>

          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3.5 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-blue-600 ring-1 ring-blue-100 dark:bg-blue-950/60 dark:text-blue-300 dark:ring-blue-900/40">
            <Sparkles size={14} />
            Kết quả luyện tập
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Hoàn thành xuất sắc!
          </h2>
          <p className="mt-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
            {accuracy >= 80
              ? 'Phong độ tuyệt vời! Bạn đã nắm rất vững kiến thức phần này. 🎉'
              : accuracy >= 50
              ? 'Khá tốt! Hãy ôn lại các câu sai để bứt phá điểm số cao hơn nhé. 👍'
              : 'Đừng nản lòng! Luyện tập đều đặn sẽ giúp bạn tiến bộ vượt bậc. 💪'}
          </p>

          {/* Stats Grid */}
          <div className="my-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-3.5 text-center dark:border-blue-900/40 dark:bg-blue-950/40">
              <div className="text-[10px] font-black uppercase tracking-wider text-blue-500">Điểm số</div>
              <div className="mt-1 text-2xl md:text-3xl font-black text-blue-600 dark:text-blue-400">{score}</div>
            </div>
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-3.5 text-center dark:border-emerald-900/40 dark:bg-emerald-950/40">
              <div className="text-[10px] font-black uppercase tracking-wider text-emerald-500">Đúng</div>
              <div className="mt-1 text-2xl md:text-3xl font-black text-emerald-600 dark:text-emerald-400">
                {correctCount}/{questions.length}
              </div>
            </div>
            <div className="rounded-2xl border border-rose-100 bg-rose-50/70 p-3.5 text-center dark:border-rose-900/40 dark:bg-rose-950/40">
              <div className="text-[10px] font-black uppercase tracking-wider text-rose-500">Sai</div>
              <div className="mt-1 text-2xl md:text-3xl font-black text-rose-600 dark:text-rose-400">{wrongCount}</div>
            </div>
            <div className="rounded-2xl border border-amber-100 bg-amber-50/70 p-3.5 text-center dark:border-amber-900/40 dark:bg-amber-950/40">
              <div className="text-[10px] font-black uppercase tracking-wider text-amber-500">Max Combo</div>
              <div className="mt-1 text-2xl md:text-3xl font-black text-amber-600 dark:text-amber-400">{maxCombo} 🔥</div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={handleRestart}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white py-3.5 px-5 text-sm font-black text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              <RotateCcw size={18} />
              Luyện tập lại
            </button>

            <button
              type="button"
              onClick={() => navigate(`/exam/${courseId}`)}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 py-3.5 px-5 text-sm font-black text-white shadow-[0_12px_28px_rgba(37,99,235,0.25)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(37,99,235,0.35)]"
            >
              <BookOpen size={18} />
              Hoàn tất & Về Hub
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  return (
    <div className="relative mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-4xl flex-col px-4 py-5 md:px-8">
      {/* Background decorations */}
      <div
        className="pointer-events-none absolute inset-0 -z-20 bg-cover bg-center opacity-45"
        style={{ backgroundImage: "url('/images/backgrounds/grammar-page-bg.png')" }}
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-sky-50/95 via-white/90 to-blue-50/90 dark:from-slate-950/95 dark:via-slate-950/92 dark:to-indigo-950/90" />
      <div className="pointer-events-none absolute left-1/2 top-10 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-200/30 blur-3xl dark:bg-cyan-900/20" />
      <div className="pointer-events-none absolute right-10 top-20 -z-10 h-64 w-64 rounded-full bg-blue-200/35 blur-3xl dark:bg-blue-900/20" />

      {/* Top Header Bar */}
      <header className="mb-4 flex items-center justify-between gap-3 rounded-2xl border border-white/80 bg-white/80 p-3 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(`/exam/${courseId}/practice`)}
            className="grid h-10 w-10 place-items-center rounded-xl bg-white text-slate-600 shadow-sm ring-1 ring-slate-200/70 transition-all hover:-translate-x-0.5 hover:text-blue-600 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700"
            title="Quay lại cài đặt"
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-blue-600 ring-1 ring-blue-100 dark:bg-blue-950/60 dark:text-blue-300 dark:ring-blue-900/40">
                <Sparkles size={12} />
                Luyện tập tự do
              </span>
              <span className="hidden sm:inline-block text-xs font-bold text-slate-400">
                • JPD123 Practice
              </span>
            </div>
          </div>
        </div>

        {/* Top Exit button */}
        <button
          type="button"
          onClick={() => navigate(`/exam/${courseId}`)}
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200/80 bg-white px-3.5 py-2 text-xs font-black text-slate-600 shadow-sm transition-all hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-rose-950/40 dark:hover:text-rose-400"
        >
          <X size={15} />
          Thoát
        </button>
      </header>

      {/* Progress & Live Stats Bar */}
      <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-white/80 bg-white/85 p-3.5 sm:p-4 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/85">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-black text-blue-600 ring-1 ring-blue-100 dark:bg-blue-950/60 dark:text-blue-300 dark:ring-blue-900/40">
              Câu {currentIndex + 1} / {questions.length}
            </span>
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500">
              ({progressPercent}%)
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Combo tag */}
            <div className={`flex items-center gap-1 rounded-xl px-2.5 py-1 text-xs font-black transition-all ${
              combo > 1 
                ? 'bg-amber-100 text-amber-700 ring-1 ring-amber-200 scale-105 shadow-sm dark:bg-amber-950/60 dark:text-amber-300 dark:ring-amber-900/40' 
                : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
            }`}>
              <Flame size={15} className={combo > 1 ? 'text-amber-600 fill-amber-500' : 'text-slate-400'} />
              <span>{combo} Combo</span>
            </div>

            {/* Score tag */}
            <div className="flex items-center gap-1 rounded-xl bg-blue-50 px-2.5 py-1 text-xs font-black text-blue-600 ring-1 ring-blue-100 dark:bg-blue-950/60 dark:text-blue-300 dark:ring-blue-900/40">
              <Star size={15} className="fill-blue-500 text-blue-500" />
              <span>{score} đ</span>
            </div>

            {/* Accuracy tracker */}
            <div className="hidden sm:flex items-center gap-1 rounded-xl bg-emerald-50 px-2.5 py-1 text-xs font-black text-emerald-600 ring-1 ring-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-300 dark:ring-emerald-900/40">
              <Target size={15} />
              <span>{correctCount} đúng</span>
            </div>
          </div>
        </div>

        {/* Progress bar line */}
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-500 shadow-[0_0_12px_rgba(37,99,235,0.4)]"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Main Question & Options Section */}
      <div className="flex flex-1 flex-col justify-between">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-4"
          >
            {/* Question Card */}
            <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/90 p-6 md:p-8 shadow-[0_18px_45px_rgba(15,23,42,0.07)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/90 text-center">
              <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                Chọn đáp án đúng
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black leading-relaxed text-slate-900 dark:text-slate-100">
                {currentQuestion.question}
              </h2>
            </div>

            {/* Options 2x2 Grid */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {currentQuestion.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrectOption = idx === currentQuestion.correctAnswer;

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`group relative flex min-h-[72px] items-center gap-3.5 rounded-2xl border-2 p-4 text-left transition-all duration-200 ${getOptionCardStyle(
                      idx
                    )}`}
                  >
                    <span
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl text-sm font-black transition-colors ${getOptionLetterStyle(
                        idx
                      )}`}
                    >
                      {['A', 'B', 'C', 'D'][idx]}
                    </span>
                    <span className="flex-1 text-base sm:text-lg font-black leading-snug">
                      {opt}
                    </span>

                    {/* Result Icon on option card */}
                    {isAnswered && isCorrectOption && (
                      <Check size={22} className="shrink-0 text-emerald-500" />
                    )}
                    {isAnswered && isSelected && !isCorrectOption && (
                      <X size={22} className="shrink-0 text-rose-500" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Floating Answer Explanation & Next Button Drawer */}
        <AnimatePresence>
          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className={`mt-5 overflow-hidden rounded-[2rem] border p-5 md:p-6 shadow-[0_20px_50px_rgba(15,23,42,0.12)] backdrop-blur-2xl ${
                isCorrect
                  ? 'border-emerald-200 bg-emerald-50/95 dark:border-emerald-800 dark:bg-emerald-950/80'
                  : 'border-rose-200 bg-rose-50/95 dark:border-rose-800 dark:bg-rose-950/80'
              }`}
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                  {/* Status header */}
                  <div className="flex items-center gap-2 mb-2">
                    {isCorrect ? (
                      <div className="flex items-center gap-2 text-lg sm:text-xl font-black text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 size={24} />
                        <span>Chính xác! (+10 điểm {combo > 1 ? `+ Combo x${combo}` : ''})</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-lg sm:text-xl font-black text-rose-600 dark:text-rose-400">
                        <XCircle size={24} />
                        <span>Chưa chính xác!</span>
                      </div>
                    )}
                  </div>

                  {/* Detailed explanation box */}
                  <div className="rounded-xl border border-white/80 bg-white/80 p-3.5 text-xs sm:text-sm font-bold leading-relaxed text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-200">
                    <div className="mb-1 flex items-center gap-1.5 font-black text-slate-900 dark:text-white">
                      <Lightbulb size={15} className="text-amber-500" />
                      <span>Giải thích chi tiết:</span>
                    </div>
                    {currentQuestion.explanation}
                  </div>
                </div>

                {/* Continue button */}
                <button
                  type="button"
                  onClick={handleNext}
                  className={`inline-flex items-center justify-center gap-2 rounded-2xl py-4 px-8 text-base font-black text-white shadow-lg transition-all hover:-translate-y-0.5 ${
                    isCorrect
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 shadow-emerald-500/30 hover:shadow-emerald-500/40'
                      : 'bg-gradient-to-r from-rose-600 to-pink-600 shadow-rose-500/30 hover:shadow-rose-500/40'
                  }`}
                >
                  <span>{currentIndex < questions.length - 1 ? 'Câu tiếp theo' : 'Xem tổng kết'}</span>
                  <ArrowRight size={20} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
