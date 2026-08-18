import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight, BookMarked, Lock } from 'lucide-react';

export const Vocabulary = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col px-4 md:px-8 pt-6 pb-4 max-w-5xl mx-auto">

      {/* HEADER */}
      <div className="mb-6 shrink-0 text-center">
        <h1 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-slate-100 uppercase tracking-wider flex flex-row items-center justify-center gap-3">
          TỪ VỰNG <span className="text-blue-600 dark:text-blue-400 font-jp text-4xl">語彙</span>
        </h1>
        <p className="text-slate-500 font-medium mt-1 text-sm">Học từ vựng theo giáo trình JPD</p>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto w-full">

        {/* JPD113 Card (LOCKED) */}
        <motion.div
          className="relative bg-[#FEF8F6] dark:bg-slate-900 rounded-[2rem] p-6 overflow-hidden border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center group opacity-75 grayscale-[0.3] cursor-not-allowed"
        >
          <div className="absolute inset-0 bg-[url('/images/backgrounds/jpd113-bg.png')] bg-[length:100%_auto] bg-top bg-no-repeat opacity-100 dark:opacity-90 transition-transform duration-700 group-hover:scale-105 pointer-events-none"></div>

          <div className="relative z-10 w-full h-full flex flex-col items-center">
            <div className="px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 text-xs font-bold uppercase tracking-widest mb-4 font-jp">初級 I</div>
            <h2 className="text-4xl font-black text-rose-500 dark:text-rose-400 tracking-tight mb-1">JPD113</h2>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-3">TIẾNG NHẬT SƠ CẤP 1</p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-6">
              <Lock size={12} strokeWidth={2.5} />
              <span>Locked</span>
            </div>

            <div className="flex items-center gap-6 mb-6 w-full justify-center">
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-900/20 text-rose-500 flex items-center justify-center">
                  <BookOpen size={20} />
                </div>
                <div className="text-xl font-black text-slate-800 dark:text-slate-100">10</div>
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">LESSONS</div>
              </div>
              <div className="w-px h-12 bg-slate-100 dark:bg-slate-800" />
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-900/20 text-rose-500 flex items-center justify-center">
                  <BookMarked size={20} />
                </div>
                <div className="text-xl font-black text-slate-800 dark:text-slate-100">334</div>
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">TỪ VỰNG</div>
              </div>
            </div>

            <button disabled className="w-full mt-6 bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 cursor-not-allowed">
              <Lock size={16} /> Đã khóa
            </button>
          </div>
        </motion.div>

        {/* JPD123 Card */}
        <motion.div
          whileHover={{ y: -6, scale: 1.015 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative bg-[#FBFCFD] dark:bg-slate-900 rounded-[2rem] p-6 shadow-[0_20px_60px_rgb(0,0,0,0.06)] dark:shadow-[0_20px_60px_rgb(0,0,0,0.3)] overflow-hidden border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center group cursor-pointer"
          onClick={() => navigate('/vocabulary/jpd123')}
        >
          <div className="absolute inset-0 bg-[url('/images/backgrounds/jpd123-bg.png')] bg-[length:100%_auto] bg-top bg-no-repeat opacity-100 dark:opacity-90 transition-transform duration-700 group-hover:scale-105 pointer-events-none"></div>

          <div className="relative z-10 w-full h-full flex flex-col items-center">
            <div className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-4 font-jp">初級 II</div>
            <h2 className="text-4xl font-black text-blue-600 dark:text-blue-400 tracking-tight mb-1">JPD123</h2>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-8">TIẾNG NHẬT SƠ CẤP 2</p>

            <div className="flex items-center gap-6 mb-6 w-full justify-center">
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BookOpen size={20} />
                </div>
                <div className="text-xl font-black text-slate-800 dark:text-slate-100">12</div>
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">LESSONS</div>
              </div>
              <div className="w-px h-12 bg-slate-100 dark:bg-slate-800" />
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BookMarked size={20} />
                </div>
                <div className="text-xl font-black text-slate-800 dark:text-slate-100">251</div>
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">TỪ VỰNG</div>
              </div>
            </div>

            <button className="w-full mt-6 relative bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-2xl shadow-[0_8px_20px_rgba(37,99,235,0.3)] transition-all flex items-center justify-center">
              <span>Bắt đầu học</span>
              <ArrowRight size={18} className="absolute right-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
};
