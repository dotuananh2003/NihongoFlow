import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
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
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [isMockModalOpen, setIsMockModalOpen] = useState(false);

  const courseTitle = courseId?.toUpperCase() || 'JPD';

  const mockExams = [
    { name: 'JPD123 - SP26 - C1FE', type: 'Final Exam', time: '30 phút', locked: false },
    { name: 'JPD123 - SP26 - C2FE', type: 'Final Exam', time: '30 phút', locked: false },
    { name: 'JPD123 - SP26 - RE', type: 'Retake', time: '30 phút', locked: false },
    { name: 'JPD123 - SU26 - FE', type: 'Final Exam', time: '30 phút', locked: false },
    { name: 'JPD123 - SU26 - RE', type: 'Retake', time: '30 phút', locked: true },
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
    <div className="relative mx-auto min-h-[calc(100vh-64px)] max-w-6xl overflow-hidden px-4 py-5 md:px-8">
      {/* Background aesthetics */}
      <div
        className="pointer-events-none absolute inset-0 -z-20 bg-cover bg-center opacity-45"
        style={{ backgroundImage: "url('/images/backgrounds/grammar-page-bg.png')" }}
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-sky-50/95 via-white/90 to-rose-50/90 dark:from-slate-950/95 dark:via-slate-950/92 dark:to-indigo-950/90" />
      <div className="pointer-events-none absolute left-1/2 top-8 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-200/30 blur-3xl dark:bg-cyan-900/20" />
      <div className="pointer-events-none absolute right-10 top-20 -z-10 h-60 w-60 rounded-full bg-rose-200/25 blur-3xl dark:bg-rose-900/15" />

      {/* Back button */}
      <button
        type="button"
        onClick={() => navigate('/exam')}
        className="group mb-5 inline-flex items-center gap-3 rounded-full border border-white/80 bg-white/70 py-2 pl-2 pr-4 text-sm font-extrabold text-slate-600 shadow-sm backdrop-blur-md transition-all hover:-translate-y-0.5 hover:text-blue-600 hover:shadow-md dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300"
      >
        <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-slate-600 shadow-sm ring-1 ring-slate-100 transition-transform group-hover:-translate-x-0.5 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700">
          <ArrowLeft size={18} />
        </span>
        Quay lại danh sách
      </button>

      {/* Hero title */}
      <section className="mx-auto mb-8 max-w-3xl text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/75 px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-blue-600 shadow-sm backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/70 dark:text-blue-300">
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

      {/* Redesigned 2 Mode Cards (Compact & Elegant) */}
      <section className="mx-auto grid w-full max-w-3xl grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
        {modes.map((mode, index) => {
          const EyebrowIcon = mode.eyebrowIcon;
          return (
            <motion.div
              key={mode.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.3 }}
              onClick={mode.action}
              className={`group relative flex min-h-[350px] cursor-pointer flex-col justify-between overflow-hidden rounded-[1.75rem] border bg-gradient-to-br ${mode.theme.soft} ${mode.theme.border} p-5 sm:p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(15,23,42,0.12)]`}
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
                    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[9.5px] font-black uppercase tracking-[0.12em] shadow-sm backdrop-blur-sm ${mode.theme.badge}`}>
                      <EyebrowIcon size={11} />
                      {mode.eyebrow}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/80 px-2 py-0.5 text-[8.5px] font-black uppercase tracking-[0.12em] text-slate-500 shadow-sm ring-1 ring-slate-200/70 backdrop-blur dark:bg-slate-950/40 dark:text-slate-300 dark:ring-slate-700">
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
                    <span className="rounded-lg bg-white/85 dark:bg-slate-800/80 px-2 py-0.5 font-jp text-[11px] font-black text-slate-500 dark:text-slate-400 shadow-sm ring-1 ring-slate-200/60 dark:ring-slate-700">
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
                        className={`flex flex-col items-center justify-center rounded-xl border ${mode.theme.statBorder} ${mode.theme.statBg} p-2 text-center shadow-sm backdrop-blur-sm transition-all group-hover:border-blue-200 dark:group-hover:border-slate-700`}
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
                <div className={`relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r py-3 px-4 text-xs sm:text-sm font-black text-white transition-all duration-300 group-hover:shadow-lg ${mode.theme.button}`}>
                  <span>{mode.buttonText}</span>
                  <ArrowRight size={16} className="absolute right-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* Mock Exam Library Modal */}
      <AnimatePresence>
        {isMockModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-md"
            onClick={() => setIsMockModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 18 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 18 }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/80 bg-white/92 p-6 shadow-2xl backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/95"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-rose-500 via-pink-400 to-amber-300" />
              <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-rose-200/50 blur-3xl" />

              <button
                type="button"
                onClick={() => setIsMockModalOpen(false)}
                className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white text-slate-500 shadow-sm ring-1 ring-slate-100 transition-colors hover:text-rose-500 dark:bg-slate-800 dark:ring-slate-700"
              >
                <X size={22} />
              </button>

              <div className="mb-6 pr-14">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-rose-600 ring-1 ring-rose-100 dark:bg-rose-950/50 dark:text-rose-300 dark:ring-rose-900/40">
                  <ClipboardList size={14} />
                  Mock Exam Library
                </div>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white">Chọn bộ đề thi</h3>
                <p className="mt-2 max-w-2xl text-sm font-semibold text-slate-500 dark:text-slate-300">
                  Mỗi bộ đề có đồng hồ, điểm số và trạng thái hoàn thành riêng để bạn luyện như một buổi thi thật.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {mockExams.map((exam) => (
                  <button
                    key={exam.name}
                    type="button"
                    disabled={exam.locked}
                    onClick={() => {
                      if (!exam.locked) {
                        navigate(`/exam/${courseId}/mock/${encodeURIComponent(exam.name)}`);
                      }
                    }}
                    className={`group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-4 text-left shadow-sm transition-all ${
                      exam.locked 
                        ? 'opacity-60 cursor-not-allowed grayscale-[0.2]' 
                        : 'hover:-translate-y-1 hover:border-rose-200 hover:shadow-[0_18px_36px_rgba(244,63,94,0.13)]'
                    } dark:border-slate-700 dark:bg-slate-800`}
                  >
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <div className={`grid h-12 w-12 place-items-center rounded-2xl ${exam.locked ? 'bg-slate-50 text-slate-400 ring-slate-100' : 'bg-rose-50 text-rose-500 ring-rose-100'} ring-1`}>
                        <FileText size={22} />
                      </div>
                      <span className="rounded-full bg-slate-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-slate-500 ring-1 ring-slate-100 dark:bg-slate-900 dark:text-slate-300 dark:ring-slate-700">
                        {exam.time}
                      </span>
                    </div>
                    <h4 className="text-[15px] font-black text-slate-800 dark:text-white">{exam.name}</h4>
                    <div className="mt-3 flex items-center justify-between text-xs font-extrabold text-slate-500 dark:text-slate-300">
                      <span className="inline-flex items-center gap-1.5">
                        <Layers3 size={14} />
                        {exam.type}
                      </span>
                      {exam.locked ? (
                        <span className="inline-flex items-center gap-1.5 text-slate-400">
                          <Lock size={14} />
                          Đang cập nhật
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-rose-500">
                          <CheckCircle2 size={14} />
                          Start
                        </span>
                      )}
                    </div>
                  </button>
                ))}
                <div className="hidden rounded-3xl border border-dashed border-rose-200 bg-rose-50/60 p-4 text-sm font-bold text-rose-500 lg:flex lg:flex-col lg:justify-center dark:border-rose-900/40 dark:bg-rose-950/20">
                  <ShieldCheck className="mb-3" size={28} />
                  Đề mới sẽ được thêm theo từng học kỳ để bạn luyện đều hơn.
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
