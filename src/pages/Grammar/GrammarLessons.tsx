import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpenText, ChevronRight, FileText, Layers3 } from 'lucide-react';
import { grammarCourses } from '../../data/grammarData';

const lessonAccents = [
  {
    icon: 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-500/10 dark:text-blue-300 dark:border-blue-500/20',
    pill: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300',
    ring: 'group-hover:border-blue-200 dark:group-hover:border-blue-500/35',
    strip: 'from-blue-500 via-sky-400 to-cyan-300',
    soft: 'from-blue-50/85 to-cyan-50/45 dark:from-blue-500/10 dark:to-cyan-500/5',
    hover: 'group-hover:text-blue-600 dark:group-hover:text-blue-300',
  },
  {
    icon: 'bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-500/10 dark:text-rose-300 dark:border-rose-500/20',
    pill: 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-300',
    ring: 'group-hover:border-rose-200 dark:group-hover:border-rose-500/35',
    strip: 'from-rose-500 via-pink-400 to-orange-300',
    soft: 'from-rose-50/85 to-orange-50/45 dark:from-rose-500/10 dark:to-orange-500/5',
    hover: 'group-hover:text-rose-600 dark:group-hover:text-rose-300',
  },
  {
    icon: 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/20',
    pill: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300',
    ring: 'group-hover:border-emerald-200 dark:group-hover:border-emerald-500/35',
    strip: 'from-emerald-500 via-teal-400 to-lime-300',
    soft: 'from-emerald-50/85 to-lime-50/45 dark:from-emerald-500/10 dark:to-lime-500/5',
    hover: 'group-hover:text-emerald-600 dark:group-hover:text-emerald-300',
  },
  {
    icon: 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/20',
    pill: 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300',
    ring: 'group-hover:border-amber-200 dark:group-hover:border-amber-500/35',
    strip: 'from-amber-400 via-yellow-300 to-orange-300',
    soft: 'from-amber-50/85 to-yellow-50/45 dark:from-amber-500/10 dark:to-yellow-500/5',
    hover: 'group-hover:text-amber-700 dark:group-hover:text-amber-300',
  },
];

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

  const totalPatterns = course.lessons.reduce((sum, lesson) => sum + lesson.grammarPoints.length, 0);
  const courseTheme = isJpd123
    ? {
        badge: 'bg-blue-600 text-white shadow-blue-500/25',
        header: 'from-blue-600 via-sky-500 to-cyan-400',
        headerSoft: 'from-blue-50 via-white to-cyan-50 dark:from-blue-500/15 dark:via-slate-950 dark:to-cyan-500/10',
        text: 'text-blue-600 dark:text-blue-300',
        button: 'text-blue-600 hover:border-blue-200 hover:bg-blue-50 dark:text-blue-300 dark:hover:border-blue-500/30 dark:hover:bg-blue-500/10',
      }
    : {
        badge: 'bg-rose-600 text-white shadow-rose-500/25',
        header: 'from-rose-600 via-pink-500 to-orange-400',
        headerSoft: 'from-rose-50 via-white to-orange-50 dark:from-rose-500/15 dark:via-slate-950 dark:to-orange-500/10',
        text: 'text-rose-600 dark:text-rose-300',
        button: 'text-rose-600 hover:border-rose-200 hover:bg-rose-50 dark:text-rose-300 dark:hover:border-rose-500/30 dark:hover:bg-rose-500/10',
      };

  return (
    <div className="mx-auto min-h-[calc(100vh-96px)] max-w-[1240px] px-1 pb-16 pt-2 md:px-0 md:pt-4">
      <header className={`mb-8 overflow-hidden rounded-[28px] border border-white/80 bg-gradient-to-br ${courseTheme.headerSoft} shadow-[0_18px_48px_rgba(15,23,42,0.10)] dark:border-slate-800/80`}>
        <div className={`h-2 bg-gradient-to-r ${courseTheme.header}`} />
        <div className="flex flex-col gap-5 p-5 md:flex-row md:items-center md:justify-between md:p-6">
          <div className="flex min-w-0 items-center gap-5">
            <button
              onClick={() => navigate('/grammar')}
              aria-label="Quay lại danh sách khóa ngữ pháp"
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/90 bg-white/90 shadow-sm transition-all hover:-translate-x-0.5 dark:border-slate-700 dark:bg-slate-900 ${courseTheme.button}`}
            >
              <ArrowLeft size={24} strokeWidth={2.4} />
            </button>

            <div className="min-w-0">
              <div className="mb-2 flex flex-wrap items-center gap-3">
                <span className={`rounded-xl px-3 py-1.5 text-xs font-black uppercase leading-none tracking-widest shadow-lg ${courseTheme.badge}`}>
                  {course.id.toUpperCase()}
                </span>
                <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-black text-slate-500 shadow-sm dark:bg-slate-900/70 dark:text-slate-400">
                  {course.lessons.length} bài học
                </span>
              </div>
              <h1 className="text-3xl font-black leading-tight tracking-normal text-slate-900 dark:text-slate-50 md:text-[40px]">
                {course.title}
              </h1>
              <p className="mt-1 text-base font-semibold text-slate-500 dark:text-slate-400 md:text-lg">
                {course.description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:min-w-[260px]">
            <div className="rounded-2xl border border-white/80 bg-white/75 px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
              <BookOpenText className={`mb-2 ${courseTheme.text}`} size={20} />
              <p className="text-2xl font-black leading-none text-slate-900 dark:text-slate-50">{totalPatterns}</p>
              <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-slate-400">Mẫu</p>
            </div>
            <div className="rounded-2xl border border-white/80 bg-white/75 px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
              <Layers3 className={`mb-2 ${courseTheme.text}`} size={20} />
              <p className="text-2xl font-black leading-none text-slate-900 dark:text-slate-50">{course.lessons.length}</p>
              <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-slate-400">Bài</p>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-x-5 md:gap-y-4">
        {course.lessons.map((lesson, index) => {
          const lessonNumber = lesson.id.replace('lesson-', '');
          const totalCount = lesson.grammarPoints.length;
          const accent = lessonAccents[index % lessonAccents.length];

          return (
            <button
              key={lesson.id}
              type="button"
              onClick={() => navigate(`/grammar/${course.id}/lesson/${lesson.id}`)}
              className={`grammar-lesson-row group relative flex min-h-[112px] w-full cursor-pointer overflow-hidden rounded-3xl border border-white/80 bg-white text-left shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition-colors duration-200 hover:shadow-[0_18px_42px_rgba(15,23,42,0.12)] dark:border-slate-800 dark:bg-slate-900 ${accent.ring}`}
            >
              <div className={`w-2 shrink-0 bg-gradient-to-b ${accent.strip}`} />

              <div className={`absolute inset-0 bg-gradient-to-br ${accent.soft} opacity-80 transition-opacity group-hover:opacity-100`} />

              <div className="relative flex w-full items-center gap-4 px-5 py-4">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border shadow-sm transition-transform group-hover:scale-105 ${accent.icon}`}>
                  <FileText size={25} strokeWidth={2.2} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="mb-1.5 flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-black ${accent.pill}`}>
                      第{lessonNumber}課
                    </span>
                    <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                      Lesson {lessonNumber}
                    </span>
                  </div>
                  <h3 className={`text-lg font-black leading-snug tracking-normal text-slate-900 transition-colors dark:text-slate-50 md:text-xl ${accent.hover}`}>
                    Bài {lessonNumber}: {lesson.title}
                  </h3>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <span className={`rounded-full px-3 py-1.5 text-sm font-black shadow-sm ${accent.pill}`}>
                    {totalCount} mẫu
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/85 text-slate-400 shadow-sm transition-all group-hover:translate-x-0.5 group-hover:text-slate-700 dark:bg-slate-950/65 dark:text-slate-500 dark:group-hover:text-slate-200">
                    <ChevronRight size={18} />
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
