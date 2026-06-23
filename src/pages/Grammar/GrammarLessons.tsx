import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { grammarCourses } from '../../data/grammarData';

export const GrammarLessons = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const course = grammarCourses.find(c => c.id === courseId);

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-500">
        <p>Không tìm thấy khóa học</p>
        <button onClick={() => navigate('/grammar')} className="mt-4 text-blue-500 font-bold flex items-center gap-2 hover:underline">
          <ArrowLeft size={16} /> Quay lại
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto pt-8 pb-20 px-4 md:px-8 relative min-h-[calc(100vh-80px)]">
      
      {/* HEADER */}
      <div className="mb-12 flex items-start justify-between">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate('/grammar')}
            className="w-12 h-12 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 transition-colors shadow-sm"
          >
            <ArrowLeft size={24} />
          </button>
          
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className={`px-3 py-1 text-xs font-black uppercase tracking-widest rounded-lg ${course.id === 'jpd113' ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400' : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'}`}>
                {course.id.toUpperCase()}
              </span>
              <span className="text-sm font-bold text-slate-400 dark:text-slate-500">
                {course.lessons.length} bài học
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
              {course.title}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">
              {course.description}
            </p>
          </div>
        </div>
      </div>

      {/* GRID LESSONS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {course.lessons.map((lesson) => {
          const totalCount = lesson.grammarPoints.length;

          return (
            <motion.div
              key={lesson.id}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={() => navigate(`/grammar/${course.id}/lesson/${lesson.id}`)}
              className="cursor-pointer bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 p-5 md:p-6 flex relative overflow-hidden group items-center gap-5"
            >
              {/* Left: Icon */}
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center shrink-0 border border-blue-100 dark:border-blue-800/50 group-hover:bg-blue-100 dark:group-hover:bg-blue-800/40 transition-colors">
                <FileText className="text-blue-500 dark:text-blue-400" size={24} />
              </div>

              {/* Center: Title */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="text-[11px] font-black text-slate-400 dark:text-slate-500 tracking-widest mb-1">
                  第{lesson.id.replace('lesson-', '')}課
                </div>
                <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  Bài {lesson.id.replace('lesson-', '')}: {lesson.title}
                </h3>
              </div>

              {/* Right: Mẫu */}
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-sm font-bold text-slate-500 dark:text-slate-400">
                  {totalCount} mẫu
                </span>
                <ChevronRight size={16} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
