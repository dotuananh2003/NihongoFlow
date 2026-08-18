import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Play, Settings2, BookOpenCheck, Check, ChevronDown, ChevronUp } from 'lucide-react';
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
    // Lấy tổng số câu thực tế từ file data
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

  const options = Array.from(new Set([5, 10, 20, totalQuestions, 40, 50])).sort((a, b) => a - b);

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

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`w-full flex items-center justify-between bg-white dark:bg-slate-900 border-2 rounded-xl py-4 px-5 transition-all ${
                isOpen 
                  ? 'border-blue-500 ring-4 ring-blue-500/10' 
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <span className={`font-bold text-lg ${isOpen ? 'text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-200'}`}>
                {selectedCount} câu
              </span>
              <div className={isOpen ? 'text-blue-500' : 'text-slate-400'}>
                {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden z-20 py-2"
                >
                  {options.map((opt) => {
                    if (opt === 0) return null; // Ẩn option 0 nếu có
                    
                    const isDisabled = opt > totalQuestions;
                    const isSelected = opt === selectedCount;
                    const isMax = opt === totalQuestions;

                    return (
                      <button
                        key={opt}
                        disabled={isDisabled}
                        onClick={() => {
                          setSelectedCount(opt);
                          setIsOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-5 py-3 transition-colors ${
                          isDisabled 
                            ? 'opacity-40 cursor-not-allowed' 
                            : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer'
                        } ${isSelected ? 'bg-blue-50/50 dark:bg-blue-900/20' : ''}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`font-semibold ${
                            isSelected 
                              ? 'text-blue-600 dark:text-blue-400' 
                              : 'text-slate-700 dark:text-slate-300'
                          }`}>
                            {opt} câu
                          </span>
                          {isSelected && !isDisabled && (
                            <Check size={18} className="text-blue-500" />
                          )}
                        </div>
                        {isMax && (
                          <span className="text-xs font-bold text-amber-600 bg-amber-100 dark:bg-amber-900/30 px-2.5 py-1 rounded-md">
                            Mức tối đa
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
