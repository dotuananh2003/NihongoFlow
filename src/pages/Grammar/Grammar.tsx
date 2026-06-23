import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ChevronRight, BookMarked } from 'lucide-react';
import { ToriiGate } from '../../components/Icons/ToriiGate';
import { grammarCourses } from '../../data/grammarData';

export const Grammar = () => {
  const navigate = useNavigate();

  const handleCourseClick = (courseId: string) => {
    navigate(`/grammar/${courseId}`);
  };

  return (
    <div className="max-w-[1200px] mx-auto pt-8 pb-20 px-4 md:px-8 relative min-h-[calc(100vh-80px)]">
      
      {/* HEADER */}
      <div className="mb-12 relative z-10">
        <h1 className="text-4xl md:text-5xl font-black text-slate-800 dark:text-slate-100 mb-2 flex items-baseline gap-3 tracking-tight">
          NGỮ PHÁP <span className="text-[var(--primary)] dark:text-blue-400 text-5xl font-jp font-bold">文法</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-bold tracking-widest uppercase text-sm">
          JPD113 / JPD123 GRAMMAR MASTERY
        </p>
      </div>

      {/* CHÚ THÍCH KÝ HIỆU */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-3xl p-6 mb-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none">
        <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">
          KÝ HIỆU VIẾT TẮT TRONG CẤU TRÚC
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2 group hover:-translate-y-1 transition-transform">
            <span className="bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">N</span>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300 group-hover:text-slate-900 transition-colors">Danh từ <span className="text-xs text-slate-400">(名詞)</span></span>
          </div>
          <div className="flex items-center gap-2 group hover:-translate-y-1 transition-transform">
            <span className="bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">V</span>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300 group-hover:text-slate-900 transition-colors">Động từ <span className="text-xs text-slate-400">(動詞)</span></span>
          </div>
          <div className="flex items-center gap-2 group hover:-translate-y-1 transition-transform">
            <span className="bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">A</span>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300 group-hover:text-slate-900 transition-colors">Tính từ <span className="text-xs text-slate-400">(形容詞)</span></span>
          </div>
          <div className="flex items-center gap-2 group hover:-translate-y-1 transition-transform">
            <span className="bg-orange-100 text-orange-700 dark:bg-orange-800/40 dark:text-orange-300 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">Aい</span>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300 group-hover:text-slate-900 transition-colors">Tính từ đuôi い</span>
          </div>
          <div className="flex items-center gap-2 group hover:-translate-y-1 transition-transform">
            <span className="bg-orange-100 text-orange-700 dark:bg-orange-800/40 dark:text-orange-300 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">Aな</span>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300 group-hover:text-slate-900 transition-colors">Tính từ đuôi な</span>
          </div>
          <div className="flex items-center gap-2 group hover:-translate-y-1 transition-transform">
            <span className="bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">S</span>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300 group-hover:text-slate-900 transition-colors">Câu <span className="text-xs text-slate-400">(文)</span></span>
          </div>
          <div className="flex items-center gap-2 group hover:-translate-y-1 transition-transform">
            <span className="bg-teal-50 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">Thế-TT</span>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300 group-hover:text-slate-900 transition-colors">Thể thông thường <span className="text-xs text-slate-400">(普通形)</span></span>
          </div>
        </div>
      </div>

      {/* COURSE CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* JPD113 CARD */}
        <motion.div
          whileHover={{ y: -4, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          onClick={() => handleCourseClick('jpd113')}
          className="group relative cursor-pointer overflow-hidden bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_-15px_rgba(225,29,72,0.2)] transition-shadow duration-300"
        >
          {/* Decorative Background */}
          <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-rose-50 to-white dark:from-rose-900/20 dark:to-slate-900 pointer-events-none"></div>
          <div className="absolute top-8 left-8 text-rose-500/10 dark:text-rose-400/5 group-hover:scale-110 transition-transform duration-500">
            <ToriiGate size={120} />
          </div>

          <div className="relative z-10 p-8 md:p-10 flex flex-col h-full min-h-[320px]">
            <div className="flex flex-col items-center text-center mt-4 flex-1">
              <div className="text-xs font-bold text-rose-500 dark:text-rose-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                <BookOpen size={14} /> JPD113 • JAPANESE 1
              </div>
              <h2 className="text-5xl font-black text-rose-500 dark:text-rose-400 tracking-tight mb-6">JPD113</h2>
              
              <div className="text-rose-600 dark:text-rose-300 font-black text-xl mb-1">
                {grammarCourses.find(c => c.id === 'jpd113')?.lessons.length || 0}
              </div>
              <div className="text-[10px] font-black text-rose-400 dark:text-rose-500 uppercase tracking-widest mb-6">
                BÀI HỌC
              </div>
              <div className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-auto">
                MINNA NO NIHONGO SƠ CẤP 1 - NGỮ PHÁP (N5)
              </div>
            </div>

            <div className="mt-8 w-full bg-rose-500 text-white rounded-2xl py-4 flex items-center justify-center font-bold text-lg shadow-lg shadow-rose-500/20 group-hover:shadow-rose-500/40 transition-shadow">
              Bắt đầu học <ChevronRight className="ml-2" size={20} />
            </div>
          </div>
        </motion.div>

        {/* JPD123 CARD */}
        <motion.div
          whileHover={{ y: -4, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          onClick={() => handleCourseClick('jpd123')}
          className="group relative cursor-pointer overflow-hidden bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_-15px_rgba(37,99,235,0.2)] transition-shadow duration-300"
        >
          {/* Decorative Background */}
          <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-blue-50 to-white dark:from-blue-900/20 dark:to-slate-900 pointer-events-none"></div>
          <div className="absolute top-8 left-8 text-blue-500/10 dark:text-blue-400/5 group-hover:scale-110 transition-transform duration-500">
            <BookMarked size={120} />
          </div>

          <div className="relative z-10 p-8 md:p-10 flex flex-col h-full min-h-[320px]">
            <div className="flex flex-col items-center text-center mt-4 flex-1">
              <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                <BookOpen size={14} /> JPD123 • JAPANESE 2
              </div>
              <h2 className="text-5xl font-black text-blue-600 dark:text-blue-400 tracking-tight mb-6">JPD123</h2>
              
              <div className="text-blue-600 dark:text-blue-300 font-black text-xl mb-1">
                {grammarCourses.find(c => c.id === 'jpd123')?.lessons.length || 0}
              </div>
              <div className="text-[10px] font-black text-blue-400 dark:text-blue-500 uppercase tracking-widest mb-6">
                BÀI HỌC
              </div>
              <div className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-auto">
                N5 NÂNG CAO - NGỮ PHÁP (N5)
              </div>
            </div>

            <div className="mt-8 w-full bg-blue-600 text-white rounded-2xl py-4 flex items-center justify-center font-bold text-lg shadow-lg shadow-blue-600/20 group-hover:shadow-blue-600/40 transition-shadow">
              Bắt đầu học <ChevronRight className="ml-2" size={20} />
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};
