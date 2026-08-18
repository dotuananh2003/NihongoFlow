import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ChevronRight } from 'lucide-react';
import { grammarCourses } from '../../data/grammarData';

export const Grammar = () => {
  const navigate = useNavigate();

  const handleCourseClick = (courseId: string) => {
    navigate(`/grammar/${courseId}`);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col px-4 md:px-8 pt-6 pb-4 max-w-5xl mx-auto">

      {/* HEADER */}
      <div className="mb-4 shrink-0">
        <h1 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-slate-100 flex items-baseline gap-3 tracking-tight">
          NGỮ PHÁP <span className="text-[var(--primary)] dark:text-blue-400 text-4xl font-jp font-bold">文法</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-bold tracking-widest uppercase text-xs mt-1">
          JPD113 / JPD123 GRAMMAR MASTERY
        </p>
      </div>

      {/* CHÚ THÍCH KÝ HIỆU */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-3 mb-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none shrink-0">
        <div className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">
          KÝ HIỆU VIẾT TẮT TRONG CẤU TRÚC
        </div>
        <div className="flex flex-wrap gap-3">
          {[
            { label: 'N', text: 'Danh từ', jp: '名詞', color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' },
            { label: 'V', text: 'Động từ', jp: '動詞', color: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' },
            { label: 'A', text: 'Tính từ', jp: '形容詞', color: 'bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' },
            { label: 'Aい', text: 'Tính từ đuôi い', jp: '', color: 'bg-orange-100 text-orange-700 dark:bg-orange-800/40 dark:text-orange-300' },
            { label: 'Aな', text: 'Tính từ đuôi な', jp: '', color: 'bg-orange-100 text-orange-700 dark:bg-orange-800/40 dark:text-orange-300' },
            { label: 'S', text: 'Câu', jp: '文', color: 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' },
            { label: 'Thể-TT', text: 'Thể thông thường', jp: '普通形', color: 'bg-teal-50 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <span className={`${item.color} text-xs font-bold px-2 py-1 rounded-full`}>{item.label}</span>
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                {item.text}{item.jp && <span className="text-slate-400 ml-1">({item.jp})</span>}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* COURSE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto w-full">

        {/* JPD113 CARD */}
        <motion.div
          whileHover={{ y: -6, scale: 1.015 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          onClick={() => handleCourseClick('jpd113')}
          className="relative bg-[#FEF8F6] dark:bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-[0_20px_60px_rgb(0,0,0,0.06)] flex flex-col items-center text-center group cursor-pointer"
        >
          <div className="absolute inset-0 bg-[url('/images/backgrounds/jpd113-bg.png')] bg-[length:100%_auto] bg-top bg-no-repeat opacity-100 dark:opacity-90 transition-transform duration-700 group-hover:scale-105 pointer-events-none"></div>
          <div className="relative z-10 w-full flex flex-col items-center p-6">
            <div className="px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 text-xs font-bold uppercase tracking-widest mb-4 font-jp">初級 I</div>
            <h2 className="text-4xl font-black text-rose-500 dark:text-rose-400 tracking-tight mb-1">JPD113</h2>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-6">MINNA NO NIHONGO SƠ CẤP 1</p>

            <div className="flex items-center gap-6 mb-6 w-full justify-center">
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-900/20 text-rose-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BookOpen size={20} />
                </div>
                <div className="text-xl font-black text-slate-800 dark:text-slate-100">
                  {grammarCourses.find(c => c.id === 'jpd113')?.lessons.length || 0}
                </div>
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">LESSONS</div>
              </div>
            </div>

            <button className="w-full mt-6 relative bg-rose-500 hover:bg-rose-600 text-white font-bold py-3.5 rounded-2xl shadow-[0_8px_20px_rgba(244,63,94,0.3)] transition-all flex items-center justify-center">
              <span>Bắt đầu học</span>
              <ChevronRight size={18} className="absolute right-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* JPD123 CARD */}
        <motion.div
          whileHover={{ y: -6, scale: 1.015 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          onClick={() => handleCourseClick('jpd123')}
          className="relative bg-[#FBFCFD] dark:bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-[0_20px_60px_rgb(0,0,0,0.06)] flex flex-col items-center text-center group cursor-pointer"
        >
          <div className="absolute inset-0 bg-[url('/images/backgrounds/jpd123-bg.png')] bg-[length:100%_auto] bg-top bg-no-repeat opacity-100 dark:opacity-90 transition-transform duration-700 group-hover:scale-105 pointer-events-none"></div>
          <div className="relative z-10 w-full flex flex-col items-center p-6">
            <div className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-4 font-jp">初級 II</div>
            <h2 className="text-4xl font-black text-blue-600 dark:text-blue-400 tracking-tight mb-1">JPD123</h2>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-6">N5 NÂNG CAO - NGỮ PHÁP</p>

            <div className="flex items-center gap-6 mb-6 w-full justify-center">
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BookOpen size={20} />
                </div>
                <div className="text-xl font-black text-slate-800 dark:text-slate-100">
                  {grammarCourses.find(c => c.id === 'jpd123')?.lessons.length || 0}
                </div>
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">LESSONS</div>
              </div>
            </div>

            <button className="w-full mt-6 relative bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-2xl shadow-[0_8px_20px_rgba(37,99,235,0.3)] transition-all flex items-center justify-center">
              <span>Bắt đầu học</span>
              <ChevronRight size={18} className="absolute right-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
};
