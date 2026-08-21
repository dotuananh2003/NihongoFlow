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
} from 'lucide-react';

type ExamMode = {
  id: 'practice' | 'mock';
  eyebrow: string;
  label: string;
  title: string;
  subtitle: string;
  description: string;
  stats: string[];
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
    icon: string;
  };
};

export const ExamHub = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [isMockModalOpen, setIsMockModalOpen] = useState(false);

  const courseTitle = courseId?.toUpperCase() || 'JPD';

  const mockExams = [
    { name: 'JPD123 - SP26 - C1FE', type: 'Final Exam', time: '30 phút' },
    { name: 'JPD123 - SP26 - C2FE', type: 'Final Exam', time: '30 phút' },
    { name: 'JPD123 - SP26 - RE', type: 'Retake', time: '30 phút' },
    { name: 'JPD123 - SU26 - FE', type: 'Final Exam', time: '30 phút' },
    { name: 'JPD123 - SU26 - RE', type: 'Retake', time: '30 phút' },
  ];

  const modes: ExamMode[] = [
    {
      id: 'practice',
      eyebrow: 'Chế độ tự do',
      label: 'Practice Mode',
      title: 'Luyện tập',
      subtitle: 'Không giới hạn thời gian',
      description: 'Ôn từng dạng câu hỏi theo nhịp riêng, xem giải thích ngay sau mỗi câu và quay lại phần còn yếu.',
      stats: ['Giải thích tức thì', 'Không áp lực giờ', 'Phù hợp ôn bài'],
      kana: '練',
      Icon: BookOpenCheck,
      buttonText: 'Vào luyện tập',
      action: () => navigate(`/exam/${courseId}/practice`),
      theme: {
        text: 'text-blue-600',
        soft: 'from-blue-50 via-white to-cyan-50',
        border: 'border-blue-100 hover:border-blue-300',
        button: 'from-blue-600 via-indigo-500 to-cyan-500 shadow-blue-500/25',
        glow: 'bg-blue-300/25',
        rail: 'from-blue-500 via-indigo-400 to-cyan-400',
        badge: 'bg-blue-100 text-blue-700 ring-blue-200',
        icon: 'bg-blue-50 text-blue-600 ring-blue-100',
      },
    },
    {
      id: 'mock',
      eyebrow: 'Chế độ nghiêm ngặt',
      label: 'Mock Test',
      title: 'Thi thử',
      subtitle: 'Áp lực thời gian thực',
      description: 'Mô phỏng bài thi JLPT với đồng hồ, điểm số và nhịp làm bài sát thực tế để kiểm tra phong độ.',
      stats: ['Tính giờ thật', 'Báo điểm cuối bài', 'Mô phỏng JLPT'],
      kana: '試',
      Icon: Timer,
      buttonText: 'Bắt đầu làm bài',
      action: () => setIsMockModalOpen(true),
      theme: {
        text: 'text-rose-500',
        soft: 'from-rose-50 via-white to-orange-50',
        border: 'border-rose-100 hover:border-rose-300',
        button: 'from-rose-500 via-pink-500 to-orange-400 shadow-rose-500/25',
        glow: 'bg-rose-300/25',
        rail: 'from-rose-500 via-pink-400 to-amber-300',
        badge: 'bg-rose-100 text-rose-700 ring-rose-200',
        icon: 'bg-rose-50 text-rose-600 ring-rose-100',
      },
    },
  ];

  return (
    <div className="relative mx-auto min-h-[calc(100vh-64px)] max-w-6xl overflow-hidden px-4 py-5 md:px-8">
      <div
        className="pointer-events-none absolute inset-0 -z-20 bg-cover bg-center opacity-45"
        style={{ backgroundImage: "url('/images/backgrounds/grammar-page-bg.png')" }}
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-sky-50/95 via-white/90 to-rose-50/90 dark:from-slate-950/95 dark:via-slate-950/92 dark:to-indigo-950/90" />
      <div className="pointer-events-none absolute left-1/2 top-8 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-200/30 blur-3xl" />

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

      <section className="mx-auto mb-6 max-w-3xl text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/75 px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-blue-600 shadow-sm backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/70 dark:text-blue-300">
          <Sparkles size={14} />
          {courseTitle} JLPT Exam
        </div>
        <h1 className="text-4xl font-black uppercase tracking-[0.06em] text-slate-950 drop-shadow-sm md:text-5xl dark:text-white">
          Luyện thi <span className="font-jp text-blue-600">試験</span>
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-base font-bold text-slate-600 dark:text-slate-300">
          Chọn không gian luyện đề phù hợp với mục tiêu hôm nay của bạn.
        </p>
      </section>

      <section className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-5 md:grid-cols-2">
        {modes.map((mode, index) => (
          <motion.button
            key={mode.id}
            type="button"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            onClick={mode.action}
            className={`group relative min-h-[300px] overflow-hidden rounded-[1.65rem] border bg-gradient-to-br ${mode.theme.soft} ${mode.theme.border} p-4 text-left shadow-[0_18px_42px_rgba(15,23,42,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_58px_rgba(15,23,42,0.16)] dark:border-slate-700 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800`}
          >
            <div className={`absolute inset-x-0 top-0 h-2 bg-gradient-to-r ${mode.theme.rail}`} />
            <div className={`absolute -right-16 -top-16 h-52 w-52 rounded-full ${mode.theme.glow} blur-3xl transition-transform duration-700 group-hover:scale-125`} />
            <div className={`absolute -bottom-8 right-3 font-jp text-[7.5rem] font-black leading-none ${mode.theme.text} opacity-[0.06] transition-transform duration-700 group-hover:rotate-6 group-hover:scale-110`}>
              {mode.kana}
            </div>

            <div className="relative z-10 flex h-full flex-col">
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] ring-1 ${mode.theme.badge}`}>
                    {mode.eyebrow}
                  </span>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.15em] text-slate-500 shadow-sm ring-1 ring-white/90 backdrop-blur dark:bg-slate-950/40 dark:text-slate-300 dark:ring-slate-700">
                    <Gauge size={12} />
                    {mode.label}
                  </div>
                </div>
                <div className={`grid h-10 w-10 place-items-center rounded-2xl shadow-sm ring-1 ${mode.theme.icon}`}>
                  <mode.Icon size={19} strokeWidth={2.5} />
                </div>
              </div>

              <div className="mt-6">
                <h2 className={`text-4xl font-black uppercase tracking-tight ${mode.theme.text}`}>{mode.title}</h2>
                <p className="mt-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-slate-600 dark:text-slate-300">
                  {mode.subtitle}
                </p>
              </div>

              <p className="mt-5 max-w-md text-[13px] font-semibold leading-relaxed text-slate-600 dark:text-slate-300">
                {mode.description}
              </p>

              <div className="mt-5 grid grid-cols-3 gap-2">
                {mode.stats.map((stat) => (
                  <div
                    key={stat}
                    className="rounded-xl border border-white/80 bg-white/62 px-2 py-2.5 text-center text-[9px] font-black uppercase tracking-[0.06em] text-slate-500 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-950/30 dark:text-slate-300"
                  >
                    {stat}
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-5">
                <div className={`relative flex w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r py-3.5 text-base font-black text-white shadow-xl ${mode.theme.button}`}>
                  <span>{mode.buttonText}</span>
                  <ArrowRight size={19} className="absolute right-5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </section>

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
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-rose-600 ring-1 ring-rose-100">
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
                    onClick={() => navigate(`/exam/${courseId}/mock/${encodeURIComponent(exam.name)}`)}
                    className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-4 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-rose-200 hover:shadow-[0_18px_36px_rgba(244,63,94,0.13)] dark:border-slate-700 dark:bg-slate-800"
                  >
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-rose-50 text-rose-500 ring-1 ring-rose-100">
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
                      <span className="inline-flex items-center gap-1.5 text-rose-500">
                        <CheckCircle2 size={14} />
                        Start
                      </span>
                    </div>
                  </button>
                ))}
                <div className="hidden rounded-3xl border border-dashed border-rose-200 bg-rose-50/60 p-4 text-sm font-bold text-rose-500 lg:flex lg:flex-col lg:justify-center">
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
