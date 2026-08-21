import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Play,
  Sliders,
  BookOpenCheck,
  Check,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Clock,
  Lightbulb,
  Flame,
  Zap,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import practiceData from '../../data/exam/jpd123_practice.json';

export const PracticeConfig = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [selectedCount, setSelectedCount] = useState(10);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTotalQuestions(practiceData.length);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleStart = () => {
    navigate(`/exam/${courseId}/practice/test`, { state: { count: selectedCount } });
  };

  const presetOptions = [
    { count: 5, label: '5 câu', desc: 'Khởi động (~3p)', icon: Zap },
    { count: 10, label: '10 câu', desc: 'Tiêu chuẩn (~7p)', icon: Sparkles, recommended: true },
    { count: 20, label: '20 câu', desc: 'Nâng cao (~15p)', icon: Flame },
    { count: totalQuestions || 60, label: `Tất cả (${totalQuestions || 60})`, desc: 'Toàn diện', icon: BookOpenCheck },
  ];

  const allDropdownOptions = Array.from(
    new Set([5, 10, 15, 20, 30, 40, 50, totalQuestions || 60])
  ).sort((a, b) => a - b);

  return (
    <div className="relative mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-5xl flex-col items-center justify-center px-4 py-8 md:px-8">
      {/* Background decorations matching ExamHub & Grammar & Vocab */}
      <div
        className="pointer-events-none absolute inset-0 -z-20 bg-cover bg-center opacity-45"
        style={{ backgroundImage: "url('/images/backgrounds/grammar-page-bg.png')" }}
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-sky-50/95 via-white/90 to-blue-50/90 dark:from-slate-950/95 dark:via-slate-950/92 dark:to-indigo-950/90" />
      <div className="pointer-events-none absolute left-1/2 top-10 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-200/30 blur-3xl dark:bg-cyan-900/20" />
      <div className="pointer-events-none absolute right-12 top-20 -z-10 h-64 w-64 rounded-full bg-blue-200/35 blur-3xl dark:bg-blue-900/20" />

      {/* Top Back navigation */}
      <div className="w-full max-w-2xl mb-4">
        <button
          type="button"
          onClick={() => navigate(`/exam/${courseId}`)}
          className="group inline-flex items-center gap-3 rounded-full border border-white/80 bg-white/70 py-2 pl-2 pr-5 text-sm font-extrabold text-slate-600 shadow-sm backdrop-blur-md transition-all hover:-translate-y-0.5 hover:text-blue-600 hover:shadow-md dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300"
        >
          <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-slate-600 shadow-sm ring-1 ring-slate-100 transition-transform group-hover:-translate-x-0.5 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700">
            <ArrowLeft size={18} />
          </span>
          Quay lại danh sách
        </button>
      </div>

      {/* Main Glassmorphic Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-2xl overflow-hidden rounded-[2.5rem] border border-white/80 bg-white/85 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] backdrop-blur-2xl sm:p-10 md:p-12 dark:border-slate-800 dark:bg-slate-900/85"
      >
        {/* Top Decorative Rail */}
        <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-200/40 blur-3xl dark:bg-blue-900/20" />
        <div className="pointer-events-none absolute -bottom-10 right-4 select-none font-jp text-[11rem] font-black leading-none text-blue-600/[0.04] dark:text-blue-400/[0.03]">
          練
        </div>

        {/* Header Badge & Title */}
        <div className="relative z-10 mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/90 px-3.5 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-blue-600 shadow-sm backdrop-blur-md dark:border-blue-900/40 dark:bg-blue-950/50 dark:text-blue-300">
            <Sparkles size={14} />
            Chế độ tự do • Practice Mode
          </div>

          <div className="flex items-center gap-5 mt-2">
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-[0_12px_28px_rgba(37,99,235,0.28)] ring-4 ring-blue-50 shrink-0 dark:ring-blue-950/50">
              <BookOpenCheck size={32} strokeWidth={2.2} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
                Cấu hình Luyện tập
              </h1>
              <p className="text-slate-500 dark:text-slate-400 font-bold text-sm md:text-base mt-1">
                Tùy chỉnh số lượng câu hỏi phù hợp với thời gian học
              </p>
            </div>
          </div>
        </div>

        {/* Configuration Box */}
        <div className="relative z-10 mb-8 rounded-3xl border border-slate-100 bg-slate-50/80 p-5 md:p-6 ring-1 ring-slate-200/60 dark:border-slate-800 dark:bg-slate-800/40 dark:ring-slate-700/60 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5 text-slate-800 dark:text-slate-200">
              <div className="grid h-8 w-8 place-items-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300">
                <Sliders size={18} />
              </div>
              <span className="font-black text-base md:text-lg">Số lượng câu hỏi</span>
            </div>
            <div className="rounded-full bg-blue-50 px-3.5 py-1.5 text-xs font-black text-blue-600 ring-1 ring-blue-100 dark:bg-blue-950/50 dark:text-blue-300 dark:ring-blue-900/40">
              Ngân hàng: {totalQuestions} câu
            </div>
          </div>

          {/* Quick preset cards */}
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 mb-4">
            {presetOptions.map((opt) => {
              const isSelected = selectedCount === opt.count;
              const OptIcon = opt.icon;
              return (
                <button
                  key={opt.count}
                  type="button"
                  onClick={() => setSelectedCount(opt.count)}
                  className={`group relative flex flex-col items-start rounded-2xl border p-3.5 text-left transition-all ${
                    isSelected
                      ? 'border-blue-500 bg-blue-600 text-white shadow-[0_10px_24px_rgba(37,99,235,0.25)] ring-4 ring-blue-100 dark:ring-blue-900/40'
                      : 'border-slate-200/80 bg-white hover:border-blue-300 hover:bg-blue-50/40 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-blue-700'
                  }`}
                >
                  {opt.recommended && (
                    <span
                      className={`absolute -top-2.5 right-2 rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-wider shadow-sm ${
                        isSelected
                          ? 'bg-amber-400 text-amber-950'
                          : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                      }`}
                    >
                      Khuyên dùng
                    </span>
                  )}
                  <div
                    className={`mb-2.5 grid h-8 w-8 place-items-center rounded-xl transition-colors ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-600 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    <OptIcon size={16} />
                  </div>
                  <span
                    className={`text-sm font-black tracking-tight ${
                      isSelected ? 'text-white' : 'text-slate-900 dark:text-white'
                    }`}
                  >
                    {opt.label}
                  </span>
                  <span
                    className={`mt-0.5 text-[10px] font-bold ${
                      isSelected ? 'text-blue-100' : 'text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    {opt.desc}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Custom count dropdown option */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className={`flex w-full items-center justify-between rounded-2xl border bg-white px-5 py-3.5 text-left transition-all dark:bg-slate-900 ${
                isOpen
                  ? 'border-blue-500 ring-4 ring-blue-500/10'
                  : 'border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                  Tùy chỉnh:
                </span>
                <span className="text-base font-black text-slate-800 dark:text-slate-200">
                  {selectedCount} câu
                </span>
              </div>
              <div className={isOpen ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}>
                {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 right-0 z-30 mt-2 max-h-60 overflow-y-auto rounded-2xl border border-slate-100 bg-white/95 py-2 shadow-2xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/95 custom-scrollbar"
                >
                  {allDropdownOptions.map((opt) => {
                    if (opt === 0) return null;
                    const isDisabled = opt > totalQuestions && totalQuestions > 0;
                    const isSelected = opt === selectedCount;
                    const isMax = opt === totalQuestions;

                    return (
                      <button
                        key={opt}
                        type="button"
                        disabled={isDisabled}
                        onClick={() => {
                          setSelectedCount(opt);
                          setIsOpen(false);
                        }}
                        className={`flex w-full items-center justify-between px-5 py-3 text-left transition-colors ${
                          isDisabled
                            ? 'cursor-not-allowed opacity-40'
                            : 'cursor-pointer hover:bg-blue-50/70 dark:hover:bg-slate-800/60'
                        } ${isSelected ? 'bg-blue-50 font-black text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300'}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold">{opt} câu</span>
                          {isSelected && <Check size={16} className="text-blue-600 dark:text-blue-400" />}
                        </div>
                        {isMax && (
                          <span className="rounded-md bg-blue-100 px-2.5 py-0.5 text-[11px] font-black text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                            Tất cả câu hỏi
                          </span>
                        )}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Feature highlight badges */}
        <div className="relative z-10 mb-8 grid grid-cols-3 gap-2 sm:gap-3">
          <div className="flex flex-col items-center rounded-2xl border border-white/80 bg-white/60 p-3 text-center shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-800/40">
            <Clock size={18} className="mb-1 text-blue-500" />
            <span className="text-[11px] font-black text-slate-800 dark:text-slate-200">Không áp lực giờ</span>
            <span className="text-[9px] font-bold text-slate-400">Tự do làm bài</span>
          </div>
          <div className="flex flex-col items-center rounded-2xl border border-white/80 bg-white/60 p-3 text-center shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-800/40">
            <Lightbulb size={18} className="mb-1 text-amber-500" />
            <span className="text-[11px] font-black text-slate-800 dark:text-slate-200">Giải thích tức thì</span>
            <span className="text-[9px] font-bold text-slate-400">Hiểu rõ bản chất</span>
          </div>
          <div className="flex flex-col items-center rounded-2xl border border-white/80 bg-white/60 p-3 text-center shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-800/40">
            <Flame size={18} className="mb-1 text-rose-500" />
            <span className="text-[11px] font-black text-slate-800 dark:text-slate-200">Chuỗi Combo</span>
            <span className="text-[9px] font-bold text-slate-400">Tăng điểm thưởng</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="relative z-10">
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleStart}
            className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 py-4 px-6 text-lg font-black text-white shadow-[0_16px_36px_rgba(37,99,235,0.28)] transition-all hover:shadow-[0_20px_45px_rgba(37,99,235,0.38)]"
          >
            <div className="grid h-8 w-8 place-items-center rounded-xl bg-white/20 text-white backdrop-blur-sm transition-transform group-hover:scale-110">
              <Play size={18} fill="currentColor" />
            </div>
            <span>Bắt đầu luyện tập ngay</span>
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1.5" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
