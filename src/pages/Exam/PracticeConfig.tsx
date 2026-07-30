import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Play, Settings2, BookOpenCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export const PracticeConfig = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [selectedCount, setSelectedCount] = useState(10);

  // Giả lập load dữ liệu để lấy tổng số câu
  useEffect(() => {
    // Trong thực tế sẽ fetch từ API hoặc import json
    // Hiện tại chúng ta biết file jpd123_practice.json có 5 câu, 
    // nhưng ta giả lập hiển thị 219 câu như yêu cầu (sau này update file thật)
    setTotalQuestions(219); 
  }, []);

  const handleStart = () => {
    navigate(`/exam/${courseId}/practice/test`, { state: { count: selectedCount } });
  };

  const options = [10, 20, 30, 40, 50, 'all'];

  return (
    <div className="max-w-[1400px] mx-auto pt-8 pb-20 px-4 relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-center">
      {/* Background aesthetics */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-300/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_60px_rgb(0,0,0,0.04)] dark:shadow-[0_20px_60px_rgb(0,0,0,0.2)] border border-emerald-100 dark:border-emerald-900/30">
        
        <button 
          onClick={() => navigate(`/exam/${courseId}`)}
          className="group flex items-center gap-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors mb-8"
        >
          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform">
            <ArrowLeft size={18} />
          </div>
          <span className="font-medium">Quay lại</span>
        </button>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-[0_8px_30px_rgb(16,185,129,0.2)]">
            <BookOpenCheck size={32} strokeWidth={2} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight">Cấu hình Luyện tập</h1>
            <p className="text-slate-500 font-medium">Tùy chỉnh số lượng câu hỏi phù hợp</p>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 mb-8 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
              <Settings2 size={20} className="text-emerald-500" />
              <span className="font-bold text-lg">Số lượng câu hỏi</span>
            </div>
            <div className="text-sm font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/40 px-3 py-1 rounded-full">
              Tổng cộng: {totalQuestions} câu
            </div>
          </div>

          <div className="relative">
            <select
              value={selectedCount}
              onChange={(e) => setSelectedCount(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              className="w-full appearance-none bg-white dark:bg-slate-900 border-2 border-emerald-200 dark:border-emerald-800/50 hover:border-emerald-400 dark:hover:border-emerald-600 text-slate-800 dark:text-slate-100 font-bold text-lg rounded-xl py-4 px-5 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 transition-all cursor-pointer"
            >
              {options.map(opt => (
                <option key={opt} value={opt}>
                  {opt === 'all' ? `Làm tất cả (${totalQuestions} câu)` : `${opt} câu`}
                </option>
              ))}
            </select>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-emerald-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </div>
          </div>
        </div>

        <motion.button 
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleStart}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg py-4 rounded-2xl shadow-[0_8px_20px_rgba(16,185,129,0.3)] transition-all hover:shadow-[0_8px_25px_rgba(16,185,129,0.4)] flex items-center justify-center gap-3"
        >
          <Play size={22} fill="currentColor" /> Bắt đầu luyện tập
        </motion.button>

      </div>
    </div>
  );
};
