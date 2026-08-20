import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BookOpenCheck, Timer, ArrowRight, X, FileText, Sparkles } from 'lucide-react';

export const ExamHub = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [isMockModalOpen, setIsMockModalOpen] = useState(false);

  const courseTitle = courseId?.toUpperCase() || 'KHÓA HỌC';

  const mockExams = [
    'JPD123 - SP26 - C1FE',
    'JPD123 - SP26 - C2FE',
    'JPD123 - SP26 - RE',
    'JPD123 - SU26 - FE',
    'JPD123 - SU26 - RE',
  ];

  const modes = [
    {
      id: 'practice',
      badge: 'CHẾ ĐỘ TỰ DO',
      code: 'LUYỆN TẬP',
      title: 'KHÔNG GIỚI HẠN THỜI GIAN',
      kana: '練',
      description: 'Ôn luyện từng bài một cách chậm rãi. Có giải thích chi tiết ngay sau mỗi câu.',
      card: 'border-emerald-100/80 dark:border-emerald-500/20 hover:border-emerald-300 dark:hover:border-emerald-500/40 hover:shadow-[0_24px_52px_rgba(16,185,129,0.18)]',
      text: 'text-emerald-500 dark:text-emerald-400',
      badgeClass: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300',
      icon: 'bg-emerald-50 text-emerald-600 ring-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/20',
      button: 'from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-emerald-500/30',
      accent: 'from-emerald-500 via-teal-400 to-green-300',
      Icon: BookOpenCheck,
      buttonText: 'Vào luyện tập',
      action: () => navigate(`/exam/${courseId}/practice`)
    },
    {
      id: 'mock',
      badge: 'CHẾ ĐỘ NGHIÊM NGẶT',
      code: 'THI THỬ',
      title: 'ÁP LỰC THỜI GIAN THỰC',
      kana: '試',
      description: 'Trải nghiệm bài thi chuẩn JLPT với giới hạn thời gian nghiêm ngặt. Có báo điểm.',
      card: 'border-rose-100/80 dark:border-rose-500/20 hover:border-rose-300 dark:hover:border-rose-500/40 hover:shadow-[0_24px_52px_rgba(244,63,94,0.18)]',
      text: 'text-rose-500 dark:text-rose-400',
      badgeClass: 'bg-rose-100 text-rose-600 dark:bg-rose-500/15 dark:text-rose-300',
      icon: 'bg-rose-50 text-rose-500 ring-rose-100 dark:bg-rose-500/10 dark:text-rose-300 dark:ring-rose-500/20',
      button: 'from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 shadow-rose-500/30',
      accent: 'from-rose-500 via-pink-400 to-amber-300',
      Icon: Timer,
      buttonText: 'Bắt đầu làm bài',
      action: () => setIsMockModalOpen(true)
    },
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col px-4 md:px-8 pt-4 pb-4 max-w-5xl mx-auto relative">
      {/* Background aesthetics */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-300/10 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rose-300/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Header */}
      <button 
        onClick={() => navigate('/exam')}
        className="group flex items-center gap-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors mb-6 self-start"
      >
        <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm border border-slate-100 dark:border-slate-700">
          <ArrowLeft size={16} />
        </div>
        <span className="font-semibold text-sm">Quay lại danh sách</span>
      </button>

      <div className="mb-8 shrink-0 text-center">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-3.5 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-indigo-600 shadow-sm backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/70 dark:text-indigo-300">
          <Sparkles size={14} /> {courseTitle} JLPT EXAM
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-wider flex flex-row items-center justify-center gap-3">
          LUYỆN THI <span className="font-jp text-indigo-600 dark:text-indigo-400">試験</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 font-semibold mt-2 text-sm">Chọn chế độ học phù hợp với mục tiêu của bạn</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto w-full">
        {modes.map((mode) => (
          <button
            key={mode.id}
            type="button"
            className={`relative min-h-[300px] bg-white dark:bg-slate-900 rounded-[1.75rem] p-4 shadow-[0_16px_38px_rgba(15,23,42,0.11)] dark:shadow-[0_16px_38px_rgba(0,0,0,0.3)] overflow-hidden border flex flex-col text-left group cursor-pointer ${mode.card}`}
            onClick={mode.action}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-white/18 to-white/72 dark:from-slate-950/20 dark:via-slate-950/30 dark:to-slate-950/78 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white/88 to-transparent dark:from-slate-950/90 pointer-events-none" />
            <div className={`absolute inset-x-0 top-0 h-2 bg-gradient-to-r ${mode.accent}`} />
            <div className={`absolute -right-4 -bottom-7 font-jp text-[6.5rem] font-black ${mode.text} opacity-[0.08] transition-transform duration-700 group-hover:scale-110`}>
              {mode.kana}
            </div>

            <div className="relative z-10 flex h-full flex-col">
              <div className="flex items-start justify-between gap-3">
                <div className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest font-jp ${mode.badgeClass}`}>{mode.badge}</div>
                <div className={`grid h-9 w-9 place-items-center rounded-xl ring-1 ${mode.icon}`}>
                  <mode.Icon size={17} />
                </div>
              </div>

              <div className="mt-8 text-center">
                <h2 className={`text-4xl md:text-[2.6rem] font-black tracking-tight ${mode.text}`}>{mode.code}</h2>
                <p className="mt-2 text-slate-600 dark:text-slate-300 font-black uppercase tracking-[0.15em] text-[10px] sm:text-[11px]">{mode.title}</p>
              </div>

              <div className="my-6 flex-grow flex items-center justify-center text-center">
                <p className="text-[13px] md:text-[14px] font-medium text-slate-600 dark:text-slate-400 px-4 leading-relaxed">
                  {mode.description}
                </p>
              </div>

              <div className="mt-auto">
                <div className={`relative w-full bg-gradient-to-r ${mode.button} text-white font-black py-3.5 rounded-2xl shadow-lg transition-all flex items-center justify-center overflow-hidden`}>
                  <span>{mode.buttonText}</span>
                  <ArrowRight size={18} className="absolute right-6 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Mock Exam Selection Modal */}
      <AnimatePresence>
        {isMockModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setIsMockModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-200 dark:border-slate-800"
            >
              <button 
                onClick={() => setIsMockModalOpen(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className="mb-8">
                <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">Chọn bộ đề thi</h3>
                <p className="text-slate-500">Vui lòng chọn một đề thi thực chiến dưới đây để bắt đầu làm bài.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {mockExams.map((exam) => (
                  <motion.div
                    key={exam}
                    whileHover={{ y: -4, scale: 1.02 }}
                    onClick={() => navigate(`/exam/${courseId}/mock/${encodeURIComponent(exam)}`)}
                    className="group cursor-pointer bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 hover:border-rose-400 dark:hover:border-rose-500 transition-all shadow-sm hover:shadow-[0_8px_20px_rgba(225,29,72,0.1)] flex flex-col items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_4px_10px_rgba(225,29,72,0.1)]">
                      <FileText size={22} strokeWidth={2.5} />
                    </div>
                    <span className="font-bold text-slate-700 dark:text-slate-200 text-[15px]">{exam}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
