import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  BookOpenCheck,
  ClipboardList,
  FileText,
  Gauge,
  Layers3,
  ShieldCheck,
  Sparkles,
  Timer,
  X,
  Lock,
  Flame,
  Lightbulb,
  Clock,
  Trophy,
  BarChart3,
  Sliders,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

type FeatureStat = {
  icon: typeof Sparkles;
  label: string;
  desc: string;
};

type ExamMode = {
  id: 'practice' | 'mock';
  eyebrow: string;
  eyebrowIcon: typeof Sparkles;
  label: string;
  title: string;
  japanese: string;
  subtitle: string;
  description: string;
  stats: FeatureStat[];
  kana: string;
  Icon: typeof BookOpenCheck;
  buttonText: string;
  action: () => void;
  theme: {
    text: string;
    soft: string;
    border: string;
    button: string;
    glow: string;
    rail: string;
    badge: string;
    iconBox: string;
    statBg: string;
    statBorder: string;
  };
};

export const ExamHub = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [isMockModalOpen, setIsMockModalOpen] = useState(false);

  const courseTitle = courseId?.toUpperCase() || 'JPD';

  const mockExams = [
    { name: 'JPD123 - SU26 - RE', type: 'Retake', time: '30 phút', locked: false },
    { name: 'JPD123 - SU26 - FE', type: 'Final Exam', time: '30 phút', locked: false },
    { name: 'JPD123 - SP26 - RE', type: 'Retake', time: '30 phút', locked: false },
    { name: 'JPD123 - SP26 - C1FE', type: 'Final Exam', time: '30 phút', locked: !user?.hasPremium },
    { name: 'JPD123 - SP26 - C2FE', type: 'Final Exam', time: '30 phút', locked: !user?.hasPremium },
    { name: 'JPD123 - SU25 - RE', type: 'Retake', time: '30 phút', locked: !user?.hasPremium },
    { name: 'JPD123 - SU25 - FE', type: 'Final Exam', time: '30 phút', locked: !user?.hasPremium },
    { name: 'JPD123 - SP25 - RE', type: 'Retake', time: '30 phút', locked: !user?.hasPremium },
    { name: 'JPD123 - SP25 - FEC2', type: 'Final Exam', time: '30 phút', locked: !user?.hasPremium },
  ];

  const modes: ExamMode[] = [
    {
      id: 'practice',
      eyebrow: 'Chế độ tự do',
      eyebrowIcon: Sparkles,
      label: 'Practice Mode',
      title: 'Luyện tập',
      japanese: '自由練習',
      subtitle: 'Không giới hạn thời gian',
      description: 'Tự do ôn luyện từng dạng câu hỏi, xem giải thích chi tiết tức thì sau mỗi câu và rèn luyện theo nhịp độ của riêng bạn.',
      stats: [
        { icon: Clock, label: 'Tự do thời gian', desc: 'Không áp lực' },
        { icon: Lightbulb, label: 'Giải thích tức thì', desc: 'Hiểu rõ bản chất' },
        { icon: Sliders, label: 'Tùy chọn câu hỏi', desc: 'Linh hoạt số lượng' },
      ],
      kana: '練',
      Icon: BookOpenCheck,
      buttonText: 'Vào phòng luyện tập',
      action: () => navigate(`/exam/${courseId}/practice`),
      theme: {
        text: 'text-blue-600 dark:text-blue-400',
        soft: 'from-blue-50/90 via-white/95 to-indigo-50/70 dark:from-slate-900 dark:via-slate-900 dark:to-blue-950/30',
        border: 'border-blue-100/90 hover:border-blue-300 dark:border-slate-800 dark:hover:border-blue-700/60',
        button: 'from-blue-600 via-indigo-600 to-cyan-500 shadow-[0_14px_30px_rgba(37,99,235,0.28)] hover:shadow-[0_20px_42px_rgba(37,99,235,0.38)]',
        glow: 'bg-blue-300/30 dark:bg-blue-600/15',
        rail: 'from-blue-600 via-indigo-500 to-cyan-400',
        badge: 'border-blue-100 bg-blue-50/90 text-blue-600 dark:border-blue-900/40 dark:bg-blue-950/60 dark:text-blue-300',
        iconBox: 'bg-gradient-to-br from-blue-500 via-indigo-600 to-cyan-500 text-white shadow-[0_10px_25px_rgba(37,99,235,0.3)] ring-4 ring-blue-50 dark:ring-blue-950/50',
        statBg: 'bg-white/80 dark:bg-slate-800/60',
        statBorder: 'border-slate-100 dark:border-slate-800',
      },
    },
    {
      id: 'mock',
      eyebrow: 'Chế độ nghiêm ngặt',
      eyebrowIcon: Flame,
      label: 'Mock Test',
      title: 'Thi thử',
      japanese: '模擬試験',
      subtitle: 'Áp lực thời gian thực tế',
      description: 'Mô phỏng bài thi chuẩn format JLPT với đồng hồ đếm ngược, tổng kết điểm số và đánh giá toàn diện phong độ thi cử.',
      stats: [
        { icon: Timer, label: 'Đồng hồ 30 phút', desc: 'Đếm ngược chuẩn' },
        { icon: BarChart3, label: 'Báo điểm chi tiết', desc: 'Tổng kết tức thì' },
        { icon: Trophy, label: 'Mô phỏng thi thật', desc: 'Sát đề thi kỳ' },
      ],
      kana: '試',
      Icon: Timer,
      buttonText: 'Chọn đề & thi thử ngay',
      action: () => setIsMockModalOpen(true),
      theme: {
        text: 'text-rose-500 dark:text-rose-400',
        soft: 'from-rose-50/90 via-white/95 to-orange-50/70 dark:from-slate-900 dark:via-slate-900 dark:to-rose-950/30',
        border: 'border-rose-100/90 hover:border-rose-300 dark:border-slate-800 dark:hover:border-rose-700/60',
        button: 'from-rose-500 via-pink-500 to-orange-500 shadow-[0_14px_30px_rgba(244,63,94,0.28)] hover:shadow-[0_20px_42px_rgba(244,63,94,0.38)]',
        glow: 'bg-rose-300/30 dark:bg-rose-600/15',
        rail: 'from-rose-500 via-pink-400 to-amber-400',
        badge: 'border-rose-100 bg-rose-50/90 text-rose-600 dark:border-rose-900/40 dark:bg-rose-950/60 dark:text-rose-300',
        iconBox: 'bg-gradient-to-br from-rose-500 via-pink-500 to-orange-400 text-white shadow-[0_10px_25px_rgba(244,63,94,0.3)] ring-4 ring-rose-50 dark:ring-rose-950/50',
        statBg: 'bg-white/80 dark:bg-slate-800/60',
        statBorder: 'border-slate-100 dark:border-slate-800',
      },
    },
  ];

  return (
    <div className="relative flex min-h-[calc(100vh-64px)] w-full flex-col overflow-hidden">
      {/* Background aesthetics (Full width) */}
      <div
        className="fixed-bg-plane pointer-events-none absolute inset-0 -z-20 bg-cover bg-center opacity-45"
        style={{ backgroundImage: "url('/images/backgrounds/grammar-page-bg.png')" }}
      />
      <div className="fixed-bg-plane pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-sky-50/95 via-white/95 to-rose-50/90 dark:from-slate-950/98 dark:via-slate-950/95 dark:to-indigo-950/90" />
      <div className="fixed-bg-plane pointer-events-none absolute left-1/2 top-8 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-200/30 blur-3xl dark:bg-cyan-900/20" />
      <div className="fixed-bg-plane pointer-events-none absolute right-10 top-20 -z-10 h-60 w-60 rounded-full bg-rose-200/25 blur-3xl dark:bg-rose-900/15" />

      {/* Main Content Wrapper */}
      <div className="mx-auto w-full max-w-6xl px-4 py-5 md:px-8">
        {/* Back button */}
        <button
          type="button"
          onClick={() => navigate('/exam')}
          className="group mb-5 inline-flex items-center gap-3 rounded-full border border-white/90 bg-white/95 py-2 pl-2 pr-4 text-sm font-extrabold text-slate-600 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:text-blue-600 hover:shadow-md dark:border-slate-700 dark:bg-slate-900/95 dark:text-slate-300"
        >
          <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-slate-600 shadow-sm ring-1 ring-slate-100 transition-transform group-hover:-translate-x-0.5 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700">
            <ArrowLeft size={18} />
          </span>
          Quay lại danh sách
        </button>

      {/* Hero title */}
      <section className="mx-auto mb-8 max-w-3xl text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/90 bg-white/95 px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-blue-600 shadow-sm dark:border-slate-700 dark:bg-slate-900/95 dark:text-blue-300">
          <Sparkles size={14} />
          {courseTitle} JLPT Exam System
        </div>
        <h1 className="text-4xl font-black uppercase tracking-[0.06em] text-slate-950 drop-shadow-sm md:text-5xl dark:text-white">
          Luyện thi <span className="font-jp text-blue-600 dark:text-blue-400">試験</span>
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-base font-bold text-slate-600 dark:text-slate-300">
          Chọn không gian luyện đề phù hợp với mục tiêu hôm nay của bạn.
        </p>
      </section>

      {/* Redesigned 2 Mode Cards (Compact & Elegant - 90fps Optimized) */}
      <section className="mx-auto grid w-full max-w-3xl grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
        {modes.map((mode, index) => {
          const EyebrowIcon = mode.eyebrowIcon;
          return (
            <motion.div
              key={mode.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
              whileTap={{ scale: 0.98 }}
              transition={{ delay: index * 0.08, duration: 0.3 }}
              onClick={mode.action}
              className={`smooth-panel steady-scroll-row group relative flex min-h-[350px] cursor-pointer flex-col justify-between overflow-hidden rounded-[1.75rem] border bg-gradient-to-br ${mode.theme.soft} ${mode.theme.border} p-5 sm:p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)] hover:shadow-[0_22px_50px_rgba(15,23,42,0.14)]`}
            >
              {/* Top Accent Rail */}
              <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${mode.theme.rail}`} />
              
              {/* Ambient Glow */}
              <div className={`pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full ${mode.theme.glow} blur-2xl transition-transform duration-700 group-hover:scale-125`} />
              
              {/* Kanji Background Watermark */}
              <div className={`pointer-events-none absolute -bottom-6 right-1 select-none font-jp text-[7rem] font-black leading-none ${mode.theme.text} opacity-[0.05] transition-transform duration-700 group-hover:rotate-6 group-hover:scale-110`}>
                {mode.kana}
              </div>

              {/* Card Header & Content */}
              <div className="relative z-10">
                {/* Badges + Icon Box */}
                <div className="flex items-start justify-between gap-2.5 mb-3.5">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[9.5px] font-black uppercase tracking-[0.12em] shadow-sm ${mode.theme.badge}`}>
                      <EyebrowIcon size={11} />
                      {mode.eyebrow}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-0.5 text-[8.5px] font-black uppercase tracking-[0.12em] text-slate-500 shadow-sm ring-1 ring-slate-200/70 dark:bg-slate-900/90 dark:text-slate-300 dark:ring-slate-700">
                      <Gauge size={11} />
                      {mode.label}
                    </span>
                  </div>

                  <div className={`grid h-11 w-11 place-items-center rounded-xl transition-transform duration-300 group-hover:scale-105 ${mode.theme.iconBox}`}>
                    <mode.Icon size={20} strokeWidth={2.2} />
                  </div>
                </div>

                {/* Title & Subtitle */}
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className={`text-2xl sm:text-[1.75rem] font-black uppercase tracking-tight ${mode.theme.text}`}>
                      {mode.title}
                    </h2>
                    <span className="rounded-lg bg-white/95 dark:bg-slate-800/95 px-2 py-0.5 font-jp text-[11px] font-black text-slate-500 dark:text-slate-400 shadow-sm ring-1 ring-slate-200/60 dark:ring-slate-700">
                      {mode.japanese}
                    </span>
                  </div>
                  <p className="mt-1 text-[10px] font-black uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500">
                    {mode.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="mt-2.5 text-xs sm:text-[13px] font-semibold leading-relaxed text-slate-600 dark:text-slate-300">
                  {mode.description}
                </p>

                {/* 3 Interactive Feature Highlight Boxes */}
                <div className="mt-4 grid grid-cols-3 gap-1.5 sm:gap-2">
                  {mode.stats.map((stat) => {
                    const StatIcon = stat.icon;
                    return (
                      <div
                        key={stat.label}
                        className={`flex flex-col items-center justify-center rounded-xl border ${mode.theme.statBorder} ${mode.theme.statBg} p-2 text-center shadow-sm transition-colors group-hover:border-blue-200 dark:group-hover:border-slate-700`}
                      >
                        <StatIcon size={14} className={`mb-0.5 ${mode.theme.text}`} />
                        <span className="text-[9.5px] sm:text-[10px] font-black text-slate-800 dark:text-slate-100 leading-tight">
                          {stat.label}
                        </span>
                        <span className="mt-0.5 text-[8px] font-bold text-slate-400 dark:text-slate-500">
                          {stat.desc}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Button */}
              <div className="relative z-10 mt-4 pt-1">
                <div className={`relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r py-3 px-4 text-xs sm:text-sm font-black text-white transition-shadow duration-300 group-hover:shadow-lg ${mode.theme.button}`}>
                  <span>{mode.buttonText}</span>
                  <ArrowRight size={16} className="absolute right-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </section>

      </div>

      {/* Mock Exam Library Modal (Standard 120fps Cinematic Expo-Out Sheet with Portal) */}
      {createPortal(
        <AnimatePresence>
          {isMockModalOpen && (
            <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-hidden">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="fixed inset-0 bg-slate-950/65"
                onClick={() => setIsMockModalOpen(false)}
              />

              {/* Dialog Container */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 16 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.96, opacity: 0, y: 12 }}
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                style={{ willChange: 'transform, opacity' }}
                onClick={(event) => event.stopPropagation()}
                className="smooth-panel relative flex flex-col w-full max-w-4xl max-h-[calc(100vh-24px)] overflow-hidden rounded-[2.5rem] border border-white/90 bg-white p-6 shadow-[0_25px_80px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-900 sm:p-8 md:p-10"
              >
                {/* Top Accent Rail & Glow */}
                <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400" />
                <div className="pointer-events-none fixed-bg-plane absolute -bottom-10 right-4 select-none font-jp text-[12rem] font-black leading-none text-rose-500/[0.03] dark:text-rose-400/[0.02]">
                  試
                </div>

                {/* Close Button */}
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  onClick={() => setIsMockModalOpen(false)}
                  className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-500 shadow-sm ring-1 ring-slate-200/60 transition-colors hover:bg-rose-50 hover:text-rose-600 dark:bg-slate-800 dark:text-slate-400 dark:ring-slate-700 dark:hover:bg-rose-950/50 dark:hover:text-rose-300"
                  aria-label="Đóng"
                >
                  <X size={20} />
                </motion.button>

                {/* Modal Header */}
                <div className="relative z-10 mb-6 pr-12">
                  <div className="mb-2.5 inline-flex items-center gap-2 rounded-full border border-rose-100 bg-rose-50/90 px-3.5 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-rose-600 shadow-sm dark:border-rose-900/40 dark:bg-rose-950/60 dark:text-rose-300">
                    <ClipboardList size={14} />
                    Mock Exam Library • Thư viện đề thi
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
                    Chọn bộ đề thi thử
                  </h3>
                  <p className="mt-2 max-w-2xl text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 leading-relaxed">
                    Mỗi đề thi được thiết kế chuẩn cấu trúc JLPT với đồng hồ đếm ngược 30 phút, chấm điểm tự động và bảng đánh giá kết quả chi tiết.
                  </p>
                </div>

                {/* Exam Cards Grid */}
                <div className="smooth-scroll-area custom-scrollbar relative z-10 grid max-h-[60vh] grid-cols-1 gap-3.5 overflow-y-auto p-2.5 sm:grid-cols-2 lg:grid-cols-3">
                  {mockExams.map((exam) => (
                    <motion.button
                      key={exam.name}
                      type="button"
                      whileHover={{ y: -4, transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } }}
                      whileTap={{ scale: 0.985 }}
                      onClick={() => {
                        if (!exam.locked) {
                          navigate(`/exam/${courseId}/mock/${encodeURIComponent(exam.name)}`);
                        } else {
                          window.dispatchEvent(new CustomEvent('jp-forus:open-upgrade'));
                        }
                      }}
                      className={`smooth-panel steady-scroll-row group relative flex flex-col justify-between rounded-[1.5rem] p-4 sm:p-5 text-left transition-colors duration-150 ${
                        exam.locked
                          ? 'cursor-pointer border border-amber-200/70 bg-amber-50/20 opacity-90 hover:border-amber-400 dark:border-amber-900/40 dark:bg-amber-950/10 dark:hover:border-amber-600'
                          : 'border border-slate-200/80 bg-white hover:border-rose-400 hover:ring-1 hover:ring-rose-200/80 dark:border-slate-800 dark:bg-slate-800/90 dark:hover:border-rose-600 dark:hover:ring-rose-900/50'
                      }`}
                    >
                      <div>
                        {/* Top Header Row: Type Badge + Time Badge */}
                        <div className="flex items-center justify-between gap-2 mb-3.5">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-black ${
                              exam.type.includes('Final')
                                ? 'bg-blue-50 text-blue-600 ring-1 ring-blue-100 dark:bg-blue-950/60 dark:text-blue-300 dark:ring-blue-900/40'
                                : 'bg-amber-50 text-amber-600 ring-1 ring-amber-100 dark:bg-amber-950/60 dark:text-amber-300 dark:ring-amber-900/40'
                            }`}
                          >
                            <Layers3 size={11} />
                            {exam.type}
                          </span>

                          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-slate-600 dark:bg-slate-700/60 dark:text-slate-300">
                            <Clock size={11} />
                            {exam.time}
                          </span>
                        </div>

                        {/* Middle Row: 3D Icon + Exam Title */}
                        <div className="flex items-start gap-3">
                          <div
                            className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-transform duration-150 group-hover:scale-105 ${
                              exam.locked
                                ? 'bg-slate-200 text-slate-400 dark:bg-slate-800 dark:text-slate-500'
                                : 'bg-gradient-to-br from-rose-500 via-pink-500 to-orange-400 text-white shadow-md shadow-rose-500/25 ring-2 ring-rose-100 dark:ring-rose-950/50'
                            }`}
                          >
                            <FileText size={20} />
                          </div>

                          <div>
                            <h4 className="text-[15px] font-black text-slate-900 dark:text-white tracking-tight group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors duration-150 leading-snug">
                              {exam.name}
                            </h4>
                            <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 mt-0.5 inline-block">
                              30 câu hỏi trắc nghiệm
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Row: Full-width Interactive CTA */}
                      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60">
                        {exam.locked ? (
                          <div className="relative overflow-hidden flex w-full items-center justify-center gap-2 rounded-xl bg-amber-50 py-2.5 px-4 text-xs font-black text-amber-600 transition-colors duration-150 group-hover:bg-amber-100 group-hover:text-amber-700 dark:bg-amber-950/50 dark:text-amber-400 dark:group-hover:bg-amber-900/60">
                            <Lock size={14} className="relative z-10" />
                            <span className="relative z-10">Mở khóa đề thi</span>
                          </div>
                        ) : (
                          <div className="relative overflow-hidden flex w-full items-center justify-center gap-2 rounded-xl bg-rose-50 py-2.5 px-4 text-xs font-black text-rose-600 transition-colors duration-150 group-hover:text-white group-hover:shadow-md dark:bg-rose-950/50 dark:text-rose-300 dark:group-hover:text-white">
                            <div className="absolute inset-0 bg-gradient-to-r from-rose-500 via-pink-500 to-orange-500 opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
                            <span className="relative z-10">Bắt đầu làm bài</span>
                            <ArrowRight size={14} className="relative z-10 transition-transform duration-150 group-hover:translate-x-1" />
                          </div>
                        )}
                      </div>
                    </motion.button>
                  ))}

                  {/* Upcoming Notification Card */}
                  <div className="smooth-panel steady-scroll-row flex flex-col justify-between rounded-[1.5rem] border border-dashed border-rose-200 bg-rose-50/40 p-4 text-left dark:border-rose-900/40 dark:bg-rose-950/20 sm:p-5">
                    <div>
                      {/* Top Header Row */}
                      <div className="flex items-center justify-between gap-2 mb-3.5">
                        <span className="inline-flex items-center gap-1 rounded-full bg-rose-100/80 px-2.5 py-1 text-[10px] font-black text-rose-600 dark:bg-rose-950/60 dark:text-rose-300">
                          <Sparkles size={11} />
                          Mở rộng
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-slate-600 dark:bg-slate-700/60 dark:text-slate-300">
                          Định kỳ
                        </span>
                      </div>

                      {/* Middle Row: 3D Icon + Info */}
                      <div className="flex items-start gap-3">
                        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-amber-400 to-rose-500 text-white shadow-sm">
                          <ShieldCheck size={20} />
                        </div>
                        <div>
                          <h4 className="text-[15px] font-black text-rose-600 dark:text-rose-400 tracking-tight leading-snug">
                            Kho đề mở rộng
                          </h4>
                          <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 mt-0.5 inline-block">
                            Đang cập nhật thêm đề mới
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Row: Matching Button Height */}
                    <div className="mt-4 pt-3 border-t border-dashed border-rose-200/80 dark:border-rose-900/40">
                      <div className="flex w-full items-center justify-center gap-2 rounded-xl bg-rose-100/50 py-2.5 px-3 text-xs font-black text-rose-600/80 dark:bg-rose-950/40 dark:text-rose-400">
                        <Sparkles size={13} />
                        <span>Sắp ra mắt thêm</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};
