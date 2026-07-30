import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight, FileText, Lock, Target } from 'lucide-react';

export const Exam = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-[1400px] mx-auto pt-8 pb-20 px-4 relative min-h-[calc(100vh-80px)]">
      {/* Background aesthetics */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-300/10 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-300/10 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, slate-400 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>

      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-slate-800 dark:text-slate-100 uppercase tracking-wider flex flex-row items-center justify-center gap-3">
          LUYỆN THI <span className="text-indigo-600 dark:text-indigo-400 font-jp text-5xl">試験</span>
        </h1>
        <p className="text-slate-500 font-medium mt-3">Luyện thi JLPT theo giáo trình JPD</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
        
        {/* JPD113 Card (LOCKED) */}
        <motion.div
          className="relative bg-[#FEF8F6] dark:bg-slate-900 rounded-[2.5rem] p-8 overflow-hidden border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center group opacity-75 grayscale-[0.3] cursor-not-allowed"
        >
          {/* User's Background Image */}
          <div className="absolute inset-0 bg-[url('/images/backgrounds/jpd113-bg.jpg')] bg-[length:100%_auto] bg-center bg-no-repeat opacity-100 dark:opacity-90 transition-transform duration-700 group-hover:scale-105 pointer-events-none"></div>

          <div className="relative z-10 w-full flex flex-col items-center">
            <div className="px-4 py-1.5 rounded-full bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 text-xs font-bold uppercase tracking-widest mb-6 font-jp">初級 I</div>
            <h2 className="text-5xl font-black text-rose-500 dark:text-rose-400 tracking-tight mb-2">JPD113</h2>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-sm mb-4">TIẾNG NHẬT SƠ CẤP 1</p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-8">
              <Lock size={14} strokeWidth={2.5} />
              <span>Locked</span>
            </div>
            
            <div className="flex items-center gap-8 mb-10 w-full justify-center">
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-900/20 text-rose-500 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                  <FileText size={24} />
                </div>
                <div className="text-2xl font-black text-slate-800 dark:text-slate-100">10</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ĐỀ THI</div>
              </div>
              <div className="w-px h-16 bg-slate-100 dark:bg-slate-800" />
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-900/20 text-rose-500 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                  <Target size={24} />
                </div>
                <div className="text-2xl font-black text-slate-800 dark:text-slate-100">300</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">CÂU HỎI</div>
              </div>
            </div>

            <button disabled className="w-full mt-6 bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 font-bold py-4 rounded-2xl flex items-center justify-center gap-3 cursor-not-allowed">
              <Lock size={18} /> Đã khóa
            </button>
          </div>
        </motion.div>

        {/* JPD123 Card */}
        <motion.div
          whileHover={{ y: -8, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative bg-[#FBFCFD] dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-[0_20px_60px_rgb(0,0,0,0.06)] dark:shadow-[0_20px_60px_rgb(0,0,0,0.3)] overflow-hidden border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center group cursor-pointer"
          onClick={() => navigate('/exam/jpd123')}
        >
          {/* User's Background Image */}
          <div className="absolute inset-0 bg-[url('/images/backgrounds/jpd123-bg.jpg')] bg-[length:100%_auto] bg-center bg-no-repeat opacity-100 dark:opacity-90 transition-transform duration-700 group-hover:scale-105 pointer-events-none"></div>

          <div className="relative z-10 w-full flex flex-col items-center">
            <div className="px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-6 font-jp">初級 II</div>
            <h2 className="text-5xl font-black text-blue-600 dark:text-blue-400 tracking-tight mb-2">JPD123</h2>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-sm mb-10">TIẾNG NHẬT SƠ CẤP 2</p>
            
            <div className="flex items-center gap-8 mb-10 w-full justify-center">
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                  <FileText size={24} />
                </div>
                <div className="text-2xl font-black text-slate-800 dark:text-slate-100">12</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ĐỀ THI</div>
              </div>
              <div className="w-px h-16 bg-slate-100 dark:bg-slate-800" />
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                  <Target size={24} />
                </div>
                <div className="text-2xl font-black text-slate-800 dark:text-slate-100">450</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">CÂU HỎI</div>
              </div>
            </div>

            <button className="w-full mt-6 relative bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-[0_8px_20px_rgba(37,99,235,0.3)] transition-all group-hover:shadow-[0_8px_25px_rgba(37,99,235,0.4)] flex items-center justify-center">
              <span>Luyện thi ngay</span>
              <ArrowRight size={20} className="absolute right-8 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
};
