import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BookOpenCheck, Timer, ArrowRight, X, FileText } from 'lucide-react';

export const ExamHub = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [isMockModalOpen, setIsMockModalOpen] = useState(false);

  // Hiển thị tên khóa học dựa trên ID (giả lập đơn giản)
  const courseTitle = courseId?.toUpperCase() || 'KHÓA HỌC';

  const mockExams = [
    'JPD123 - SP26 - C1FE',
    'JPD123 - SP26 - C2FE',
    'JPD123 - SP26 - RE',
    'JPD123 - SU26 - FE',
    'JPD123 - SU26 - RE',
  ];

  return (
    <div className="max-w-[1400px] mx-auto pt-8 pb-20 px-4 relative min-h-[calc(100vh-80px)]">
      {/* Background aesthetics */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-300/10 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rose-300/10 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, slate-400 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>

      {/* Header */}
      <button 
        onClick={() => navigate('/exam')}
        className="group flex items-center gap-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors mb-8"
      >
        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform">
          <ArrowLeft size={18} />
        </div>
        <span className="font-medium">Quay lại danh sách</span>
      </button>

      <div className="mb-12 text-center">
        <div className="px-4 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest inline-block mb-4">
          LUYỆN THI JLPT
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-800 dark:text-slate-100 tracking-tight mb-3">
          {courseTitle}
        </h1>
        <p className="text-slate-500 font-medium">Chọn chế độ học phù hợp với mục tiêu của bạn</p>
      </div>

      {/* Main Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        
        {/* Practice Mode */}
        <motion.div
          whileHover={{ y: -6, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 overflow-hidden border border-emerald-100 dark:border-emerald-900/30 flex flex-col items-center text-center group cursor-pointer"
          onClick={() => navigate(`/exam/${courseId}/practice`)}
        >
          {/* Subtle decoration */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-50 dark:bg-emerald-900/20 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-125"></div>
          
          <div className="relative z-10 w-full h-full flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-5 group-hover:rotate-12 transition-transform duration-300 shadow-sm">
              <BookOpenCheck size={32} strokeWidth={2} />
            </div>
            
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Luyện tập</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-[260px] leading-relaxed">
              Ôn luyện từng bài một cách chậm rãi. Có giải thích chi tiết ngay sau mỗi câu, không giới hạn thời gian.
            </p>
            
            <button className="w-full mt-auto relative bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white dark:bg-emerald-900/20 dark:hover:bg-emerald-600 dark:text-emerald-400 dark:hover:text-white font-semibold py-3 rounded-xl text-sm transition-all duration-300 flex items-center justify-center border border-emerald-200 dark:border-emerald-800 hover:border-transparent">
              <span>Vào luyện tập</span>
              <ArrowRight size={18} className="absolute right-6 group-hover:translate-x-1 transition-transform opacity-0 group-hover:opacity-100" />
            </button>
          </div>
        </motion.div>

        {/* Mock Exam Mode */}
        <motion.div
          whileHover={{ y: -6, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 overflow-hidden border border-rose-100 dark:border-rose-900/30 flex flex-col items-center text-center group cursor-pointer"
          onClick={() => setIsMockModalOpen(true)}
        >
          {/* Subtle decoration */}
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-rose-50 dark:bg-rose-900/20 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-125"></div>
          
          <div className="relative z-10 w-full h-full flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-5 group-hover:-rotate-12 transition-transform duration-300 shadow-sm">
              <Timer size={32} strokeWidth={2} />
            </div>
            
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Thi thực chiến</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-[260px] leading-relaxed">
              Trải nghiệm bài thi chuẩn JLPT với giới hạn thời gian nghiêm ngặt. Tổng kết và báo điểm sau khi hoàn thành.
            </p>
            
            <button className="w-full mt-auto relative bg-rose-600 hover:bg-rose-700 text-white font-semibold text-sm py-3 rounded-xl shadow-md transition-all group-hover:shadow-lg flex items-center justify-center">
              <span>Bắt đầu làm bài</span>
              <ArrowRight size={18} className="absolute right-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>

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
