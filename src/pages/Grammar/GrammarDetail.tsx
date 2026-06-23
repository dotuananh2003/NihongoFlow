import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { grammarCourses } from '../../data/grammarData';

export const GrammarDetail = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();

  const course = grammarCourses.find(c => c.id === courseId);
  const lesson = course?.lessons.find(l => l.id === lessonId);

  if (!course || !lesson) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-500">
        <p>Không tìm thấy bài học</p>
        <button onClick={() => navigate(`/grammar/${courseId}`)} className="mt-4 text-blue-500 font-bold flex items-center gap-2 hover:underline">
          <ArrowLeft size={16} /> Quay lại
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto pt-8 pb-20 px-4 md:px-8 relative min-h-[calc(100vh-80px)]">
      
      {/* HEADER & BREADCRUMB */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-slate-400 mb-6">
          <button onClick={() => navigate('/grammar')} className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors uppercase">
            {course.id}
          </button>
          <ChevronRight size={14} />
          <button onClick={() => navigate(`/grammar/${course.id}`)} className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
            Bài {lesson.id.replace('lesson-', '')}
          </button>
          <ChevronRight size={14} />
          <span className="text-slate-800 dark:text-slate-200">{lesson.title}</span>
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate(`/grammar/${course.id}`)}
            className="w-12 h-12 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 transition-colors shadow-sm shrink-0"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
              {lesson.title}
            </h1>
            <p className="text-slate-600 dark:text-slate-300 font-medium mt-3 inline-block border-b-2 border-yellow-400 pb-1">
              Học về tính từ đuôi い và な, phó từ mức độ, và cách diễn tả sự tồn tại với あります。
            </p>
          </div>
        </div>
      </div>

      {/* GRAMMAR LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {lesson.grammarPoints.map((point, index) => {
          const num = (index + 1).toString().padStart(2, '0');
          const isSpecialIcon = point.icon === '✨' || point.icon === '📦';
          
          return (
            <motion.div
              key={point.id}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={() => navigate(`/grammar/${course.id}/lesson/${lesson.id}/point/${point.id}`)}
              className="cursor-pointer bg-white dark:bg-slate-900 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 p-6 flex items-center gap-4 relative overflow-hidden group hover:shadow-md transition-shadow"
            >
              {/* Left: Icon */}
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${point.iconBg || 'bg-slate-100'} ${point.iconColor || 'text-slate-600'}`}>
                {isSpecialIcon ? (
                  <span className="text-3xl drop-shadow-sm">{point.icon}</span>
                ) : (
                  <span className={`font-black font-jp leading-none ${
                    (point.icon?.length || 0) > 2 ? 'text-lg' : 
                    (point.icon?.length || 0) > 1 ? 'text-2xl' : 'text-3xl'
                  }`}>{point.icon}</span>
                )}
              </div>

              {/* Center: Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                    {num}
                  </span>
                  <h3 className="text-base font-black text-slate-800 dark:text-slate-100 font-jp truncate group-hover:text-blue-600 transition-colors flex items-center gap-1">
                    {point.title} <ChevronRight size={14} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                  </h3>
                </div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 truncate">
                  {point.meaning}
                </p>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <button className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-800/50 transition-colors border border-blue-100 dark:border-blue-800/50">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                </button>
                <button className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors shadow-sm shadow-blue-500/20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* CHÚ THÍCH KÝ HIỆU (Bottom) */}
      <div className="bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 mt-12">
        <div className="text-sm font-black text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2">
          <span className="text-yellow-500"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7zM9 21a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1H9v1z"/></svg></span> 
          Chú thích ký hiệu
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <span className="bg-blue-100 text-blue-600 text-xs font-bold px-3 py-1 rounded-full">N</span>
            <span className="text-xs font-medium text-slate-500">Danh từ (名詞)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-emerald-100 text-emerald-600 text-xs font-bold px-3 py-1 rounded-full">V</span>
            <span className="text-xs font-medium text-slate-500">Động từ (動詞)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-orange-100 text-orange-600 text-xs font-bold px-3 py-1 rounded-full">A</span>
            <span className="text-xs font-medium text-slate-500">Tính từ (形容詞)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-pink-100 text-pink-600 text-xs font-bold px-3 py-1 rounded-full">Aい</span>
            <span className="text-xs font-medium text-slate-500">Tính từ đuôi い</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-yellow-100 text-yellow-600 text-xs font-bold px-3 py-1 rounded-full">Aな</span>
            <span className="text-xs font-medium text-slate-500">Tính từ đuôi な</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-purple-100 text-purple-600 text-xs font-bold px-3 py-1 rounded-full">S</span>
            <span className="text-xs font-medium text-slate-500">Câu (文)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-teal-100 text-teal-600 text-xs font-bold px-3 py-1 rounded-full">Thể-TT</span>
            <span className="text-xs font-medium text-slate-500">Thể thông thường (普通形)</span>
          </div>
        </div>
      </div>

    </div>
  );
};
