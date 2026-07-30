import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpenCheck, Timer, ArrowRight } from 'lucide-react';

export const ExamHub = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();

  // Hiển thị tên khóa học dựa trên ID (giả lập đơn giản)
  const courseTitle = courseId?.toUpperCase() || 'KHÓA HỌC';

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        
        {/* Practice Mode */}
        <motion.div
          whileHover={{ y: -8, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-[0_20px_60px_rgb(0,0,0,0.04)] dark:shadow-[0_20px_60px_rgb(0,0,0,0.2)] overflow-hidden border border-emerald-100 dark:border-emerald-900/30 flex flex-col items-center text-center group cursor-pointer"
          onClick={() => navigate(`/exam/${courseId}/practice`)}
        >
          {/* Subtle decoration */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-50 dark:bg-emerald-900/20 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-150"></div>
          
          <div className="relative z-10 w-full h-full flex flex-col items-center">
            <div className="w-20 h-20 rounded-3xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300 shadow-[0_8px_30px_rgb(16,185,129,0.2)]">
              <BookOpenCheck size={40} strokeWidth={2} />
            </div>
            
            <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-3">Luyện tập</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-[280px]">
              Ôn luyện từng bài một cách chậm rãi. Có giải thích chi tiết ngay sau mỗi câu, không giới hạn thời gian.
            </p>
            
            <button className="w-full mt-auto relative bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white dark:bg-emerald-900/20 dark:hover:bg-emerald-600 dark:text-emerald-400 dark:hover:text-white font-bold py-4 rounded-2xl transition-all duration-300 flex items-center justify-center border border-emerald-200 dark:border-emerald-800 hover:border-transparent">
              <span>Vào luyện tập</span>
              <ArrowRight size={20} className="absolute right-8 group-hover:translate-x-1 transition-transform opacity-0 group-hover:opacity-100" />
            </button>
          </div>
        </motion.div>

        {/* Mock Exam Mode */}
        <motion.div
          whileHover={{ y: -8, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-[0_20px_60px_rgb(0,0,0,0.04)] dark:shadow-[0_20px_60px_rgb(0,0,0,0.2)] overflow-hidden border border-rose-100 dark:border-rose-900/30 flex flex-col items-center text-center group cursor-pointer"
          onClick={() => navigate(`/exam/${courseId}/mock`)}
        >
          {/* Subtle decoration */}
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-rose-50 dark:bg-rose-900/20 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-150"></div>
          
          <div className="relative z-10 w-full h-full flex flex-col items-center">
            <div className="w-20 h-20 rounded-3xl bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-6 group-hover:-rotate-12 transition-transform duration-300 shadow-[0_8px_30px_rgb(225,29,72,0.2)]">
              <Timer size={40} strokeWidth={2} />
            </div>
            
            <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-3">Thi thực chiến</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-[280px]">
              Trải nghiệm bài thi chuẩn JLPT với giới hạn thời gian nghiêm ngặt. Tổng kết và báo điểm sau khi hoàn thành.
            </p>
            
            <button className="w-full mt-auto relative bg-rose-600 hover:bg-rose-700 text-white font-bold py-4 rounded-2xl shadow-[0_8px_20px_rgba(225,29,72,0.3)] transition-all group-hover:shadow-[0_8px_25px_rgba(225,29,72,0.4)] flex items-center justify-center">
              <span>Bắt đầu làm bài</span>
              <ArrowRight size={20} className="absolute right-8 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
};
