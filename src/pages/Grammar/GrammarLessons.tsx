import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { grammarCourses } from '../../data/grammarData';

export const GrammarLessons = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const course = grammarCourses.find(c => c.id === courseId);
  const isJpd123 = course?.id === 'jpd123';

  if (!course) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-slate-500">
        <p>Không tìm thấy khóa học</p>
        <button
          onClick={() => navigate('/grammar')}
          className="mt-4 flex items-center gap-2 font-bold text-blue-500 hover:underline"
        >
          <ArrowLeft size={16} /> Quay lại
        </button>
      </div>
    );
  }

  const theme = isJpd123
    ? {
        badge: 'bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-300',
        iconBox: 'bg-blue-50 text-blue-500 border-blue-100 dark:bg-blue-500/10 dark:text-blue-300 dark:border-blue-500/20',
        iconBoxHover: 'group-hover:bg-blue-100 dark:group-hover:bg-blue-500/15',
        titleHover: 'group-hover:text-blue-600 dark:group-hover:text-blue-300',
        cardHover: 'hover:border-blue-200 dark:hover:border-blue-500/40',
        chevronHover: 'group-hover:text-blue-500 dark:group-hover:text-blue-300',
      }
    : {
        badge: 'bg-rose-100 text-rose-600 dark:bg-rose-500/15 dark:text-rose-300',
        iconBox: 'bg-rose-50 text-rose-500 border-rose-100 dark:bg-rose-500/10 dark:text-rose-300 dark:border-rose-500/20',
        iconBoxHover: 'group-hover:bg-rose-100 dark:group-hover:bg-rose-500/15',
        titleHover: 'group-hover:text-rose-600 dark:group-hover:text-rose-300',
        cardHover: 'hover:border-rose-200 dark:hover:border-rose-500/40',
        chevronHover: 'group-hover:text-rose-500 dark:group-hover:text-rose-300',
      };

  return (
    <div className="mx-auto min-h-[calc(100vh-96px)] max-w-[1220px] px-1 pb-16 pt-2 md:px-0 md:pt-4">
      <div className="mb-10 flex items-start gap-5 md:mb-12">
        <button
          onClick={() => navigate('/grammar')}
          aria-label="Quay lại danh sách khóa ngữ pháp"
          className="mt-7 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-[0_2px_6px_rgba(15,23,42,0.12)] transition-all hover:-translate-x-0.5 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <ArrowLeft size={24} strokeWidth={2.4} />
        </button>

        <div className="min-w-0">
          <div className="mb-2.5 flex flex-wrap items-center gap-3">
            <span className={`rounded-lg px-3 py-1 text-xs font-black uppercase leading-none tracking-widest ${theme.badge}`}>
              {course.id.toUpperCase()}
            </span>
            <span className="text-sm font-extrabold text-slate-400 dark:text-slate-500">
              {course.lessons.length} bài học
            </span>
          </div>
          <h1 className="text-3xl font-black leading-tight tracking-normal text-slate-800 dark:text-slate-100 md:text-[40px]">
            {course.title}
          </h1>
          <p className="mt-1 text-base font-semibold text-slate-500 dark:text-slate-400 md:text-lg">
            {course.description}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-x-6 md:gap-y-5">
        {course.lessons.map((lesson) => {
          const lessonNumber = lesson.id.replace('lesson-', '');
          const totalCount = lesson.grammarPoints.length;

          return (
            <motion.button
              key={lesson.id}
              type="button"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.99 }}
              transition={{ type: 'spring', stiffness: 320, damping: 26 }}
              onClick={() => navigate(`/grammar/${course.id}/lesson/${lesson.id}`)}
              className={`group flex min-h-[104px] w-full cursor-pointer items-center gap-5 rounded-2xl border border-slate-200 bg-white px-6 py-5 text-left shadow-[0_2px_8px_rgba(15,23,42,0.08)] transition-all duration-300 hover:shadow-[0_10px_24px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-900 dark:shadow-none ${theme.cardHover}`}
            >
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition-colors ${theme.iconBox} ${theme.iconBoxHover}`}>
                <FileText size={25} strokeWidth={2.2} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="mb-1.5 text-xs font-black text-slate-400 dark:text-slate-500">
                  第{lessonNumber}課
                </div>
                <h3 className={`text-lg font-black leading-snug tracking-normal text-slate-800 transition-colors dark:text-slate-100 md:text-xl ${theme.titleHover}`}>
                  Bài {lessonNumber}: {lesson.title}
                </h3>
              </div>

              <div className="flex shrink-0 items-center gap-2.5 pl-1">
                <span className="text-sm font-black text-slate-500 dark:text-slate-400">
                  {totalCount} mẫu
                </span>
                <ChevronRight size={18} className={`text-slate-400 transition-colors ${theme.chevronHover}`} />
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
