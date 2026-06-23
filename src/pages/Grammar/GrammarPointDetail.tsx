import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookmarkPlus, Edit3, Volume2, Layers, BookOpen, AlertCircle, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { grammarCourses } from '../../data/grammarData';

export const GrammarPointDetail = () => {
  const { courseId, lessonId, pointId } = useParams();
  const navigate = useNavigate();

  const course = grammarCourses.find(c => c.id === courseId);
  const lesson = course?.lessons.find(l => l.id === lessonId);
  const point = lesson?.grammarPoints.find(p => p.id === pointId);

  const renderStructure = (structure?: React.ReactNode | string) => {
    if (!structure) return null;
    if (typeof structure !== 'string') return structure;
    
    return structure.split(' ').map((part, index) => {
      if (part === 'N' || part === '[N]') return <span key={index} className="bg-blue-100 text-blue-600 rounded-lg px-2 py-1 text-xl mx-0.5 font-sans">N</span>;
      if (part === 'A' || part === '[A]') return <span key={index} className="bg-orange-100 text-orange-600 rounded-lg px-2 py-1 text-xl mx-0.5 font-sans">A</span>;
      if (part === 'V' || part === '[V]') return <span key={index} className="bg-emerald-100 text-emerald-600 rounded-lg px-2 py-1 text-xl mx-0.5 font-sans">V</span>;
      return <span key={index} className="mx-0.5">{part}</span>;
    });
  };

  if (!course || !lesson || !point) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-500">
        <p>Không tìm thấy mẫu ngữ pháp</p>
        <button onClick={() => navigate(-1)} className="mt-4 text-blue-500 font-bold flex items-center gap-2 hover:underline">
          <ArrowLeft size={16} /> Quay lại
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[1000px] mx-auto pt-8 pb-20 px-4 md:px-8 relative min-h-[calc(100vh-80px)]">
      
      {/* HEADER */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <button 
            onClick={() => navigate(`/grammar/${course.id}/lesson/${lesson.id}`)}
            className="text-blue-500 font-bold flex items-center gap-2 hover:text-blue-600 transition-colors mb-4"
          >
            <ArrowLeft size={16} /> {course.id.toUpperCase()} - Bài {lesson.id.replace('lesson-', '')}
          </button>
          
          <h1 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-slate-100 tracking-tight font-jp mb-2">
            {point.title}
          </h1>
          <p className="text-slate-600 dark:text-slate-300 font-medium text-lg inline-block border-b-[3px] border-yellow-400 pb-1">
            {point.explanationTitle || point.meaning}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm text-sm">
            <BookmarkPlus size={18} /> Thêm vào ghi nhớ
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-sm text-sm">
            <Edit3 size={18} /> Làm bài tập
          </button>
        </div>
      </div>

      {/* GRID DETAILS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        
        {/* CẤU TRÚC */}
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-800 relative">
          <div className="text-xs font-black text-purple-500 dark:text-purple-400 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Layers size={16} /> CẤU TRÚC
          </div>
          
          <div className="text-2xl md:text-3xl font-black text-slate-800 dark:text-slate-100 font-jp mb-6 flex flex-wrap items-center gap-1">
            {renderStructure(point.structure)}
          </div>
          <div className="h-px w-full bg-slate-100 dark:bg-slate-800 mb-6" />
          <div className="text-sm font-bold text-slate-600 dark:text-slate-400">
            {point.structureDetails || 'Danh từ + は + Tính từ + です'}
          </div>
        </div>

        {/* GIẢI NGHĨA */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-[2rem] p-6 md:p-8 shadow-sm relative text-white overflow-hidden">
          {/* Decorative Pattern / Icon */}
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none text-[150px] leading-none translate-x-4 translate-y-8">
            ⛩️
          </div>
          <div className="text-xs font-black text-blue-100 uppercase tracking-widest mb-6 flex items-center gap-2 relative z-10">
            <BookOpen size={16} /> GIẢI NGHĨA
          </div>
          
          <div className="text-xl font-black mb-4">
            {point.explanationTitle || point.meaning}
          </div>
          <div className="text-sm font-medium text-slate-300">
            {point.explanationDetails || point.type}
          </div>
        </div>

        {/* PHẠM VI SỬ DỤNG */}
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-800 relative">
          <div className="text-xs font-black text-emerald-500 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Sparkles size={16} /> PHẠM VI SỬ DỤNG
          </div>
          
          <div className="text-sm font-bold text-slate-700 dark:text-slate-300 leading-relaxed">
            {point.usage || 'Sử dụng trong giao tiếp hàng ngày.'}
          </div>
        </div>

        {/* LƯU Ý */}
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-800 relative">
          <div className="text-xs font-black text-yellow-500 uppercase tracking-widest mb-6 flex items-center gap-2">
            <AlertCircle size={16} /> LƯU Ý
          </div>
          
          <div className="text-sm font-bold text-slate-700 dark:text-slate-300 leading-relaxed">
            {point.note || 'Không có lưu ý đặc biệt.'}
          </div>
        </div>

      </div>

      {/* VÍ DỤ */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1.5 h-6 bg-blue-500 rounded-full"></div>
          <h2 className="text-lg font-black text-slate-800 dark:text-slate-100 uppercase tracking-widest">VÍ DỤ</h2>
        </div>

        <div className="space-y-4">
          {point.examples.map((ex, idx) => {
            return (
              <motion.div 
                key={idx}
                whileHover={{ y: -2 }}
                className="bg-white dark:bg-slate-900 rounded-[1.5rem] p-5 md:p-6 shadow-sm border border-slate-200 dark:border-slate-800 relative flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="flex-1 min-w-0 flex flex-col md:flex-row md:items-center gap-4 md:gap-10">
                  <div className="flex-1">
                    <div className="text-xl md:text-2xl font-black text-slate-800 dark:text-slate-100 font-jp mb-1">{ex.japanese}</div>
                    <div className="text-xs font-medium text-slate-500 dark:text-slate-400">{ex.reading || ex.japanese}</div>
                    {ex.romaji && <div className="text-xs font-medium text-slate-400 dark:text-slate-500 italic mt-0.5">{ex.romaji}</div>}
                  </div>
                  <div className="flex-1 text-sm font-medium text-slate-600 dark:text-slate-300">
                    {ex.vietnamese}
                  </div>
                </div>

                <div className="flex flex-col items-center gap-2 shrink-0">
                  <button className="flex items-center justify-center gap-2 w-32 py-2 bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">
                    <Volume2 size={14} /> Đọc chậm
                  </button>
                  <button className="flex items-center justify-center gap-2 w-32 py-2 bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">
                    <Volume2 size={14} /> Đọc thường
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

    </div>
  );
};
