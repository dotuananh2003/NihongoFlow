import { useNavigate } from 'react-router-dom';
import { ArrowRight, FileText, Lock, Sparkles, Target } from 'lucide-react';

const examCourseCards = [
  {
    id: 'jpd113',
    route: '/exam/jpd113',
    badge: '初級 I',
    code: 'JPD113',
    title: 'TIẾNG NHẬT SƠ CẤP 1',
    tests: 10,
    questions: 300,
    kana: '試',
    locked: true,
    bgImage: '/images/backgrounds/jpd113-bg.png',
    card: 'border-rose-100/80 dark:border-rose-500/20',
    text: 'text-rose-500 dark:text-rose-400',
    badgeClass: 'bg-rose-100 text-rose-600 dark:bg-rose-500/15 dark:text-rose-300',
    icon: 'bg-rose-50 text-rose-500 ring-rose-100 dark:bg-rose-500/10 dark:text-rose-300 dark:ring-rose-500/20',
    button: 'from-slate-200 to-slate-300 text-slate-500 dark:from-slate-800 dark:to-slate-800 dark:text-slate-500',
    accent: 'from-rose-500 via-pink-400 to-amber-300',
  },
  {
    id: 'jpd123',
    route: '/exam/jpd123',
    badge: '初級 II',
    code: 'JPD123',
    title: 'TIẾNG NHẬT SƠ CẤP 2',
    tests: 12,
    questions: 450,
    kana: '験',
    locked: false,
    bgImage: '/images/backgrounds/jpd123-bg.png',
    card: 'border-blue-100/80 dark:border-blue-500/20 hover:border-blue-300 dark:hover:border-blue-500/40 hover:shadow-[0_24px_52px_rgba(37,99,235,0.18)]',
    text: 'text-blue-600 dark:text-blue-400',
    badgeClass: 'bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-300',
    icon: 'bg-blue-50 text-blue-600 ring-blue-100 dark:bg-blue-500/10 dark:text-blue-300 dark:ring-blue-500/20',
    button: 'from-blue-600 to-cyan-500 text-white hover:from-blue-700 hover:to-cyan-600 shadow-blue-500/30',
    accent: 'from-blue-600 via-sky-400 to-cyan-300',
  },
];

export const Exam = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-5xl flex-col px-4 pb-4 pt-4 md:px-8">
      <div className="mb-5 shrink-0 text-center">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-3.5 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-blue-600 shadow-sm backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/70 dark:text-blue-300">
          <Sparkles size={14} /> JLPT Exam
        </div>
        <h1 className="flex flex-row items-center justify-center gap-3 text-3xl font-black uppercase tracking-wider text-slate-900 dark:text-slate-100 md:text-4xl">
          Luyện thi <span className="font-jp text-blue-600 dark:text-blue-400">試験</span>
        </h1>
        <p className="mt-1 text-sm font-semibold text-slate-600 dark:text-slate-400">
          Luyện thi JLPT theo giáo trình JPD
        </p>
      </div>

      <div className="mx-auto grid w-full max-w-3xl grid-cols-1 gap-5 md:grid-cols-2">
        {examCourseCards.map((course) => (
          <button
            key={course.id}
            type="button"
            disabled={course.locked}
            onClick={() => {
              if (!course.locked) {
                navigate(course.route);
              }
            }}
            className={`group relative flex min-h-[300px] flex-col overflow-hidden rounded-[1.75rem] border bg-white p-4 text-left shadow-[0_16px_38px_rgba(15,23,42,0.11)] transition-all dark:bg-slate-900 dark:shadow-[0_16px_38px_rgba(0,0,0,0.3)] ${
              course.locked ? 'cursor-not-allowed opacity-78 grayscale-[0.22]' : 'cursor-pointer'
            } ${course.card}`}
          >
            <div
              className="pointer-events-none absolute inset-0 bg-[length:100%_auto] bg-top bg-no-repeat opacity-100 transition-transform duration-700 group-hover:scale-105 dark:opacity-90"
              style={{ backgroundImage: `url('${course.bgImage}')` }}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/25 via-white/18 to-white/72 dark:from-slate-950/20 dark:via-slate-950/30 dark:to-slate-950/78" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white/88 to-transparent dark:from-slate-950/90" />
            <div className={`absolute inset-x-0 top-0 h-2 bg-gradient-to-r ${course.accent}`} />
            <div className={`absolute -right-4 -bottom-7 font-jp text-[6.5rem] font-black ${course.text} opacity-[0.08] transition-transform duration-700 group-hover:scale-110`}>
              {course.kana}
            </div>

            <div className="relative z-10 flex h-full flex-col">
              <div className="flex items-start justify-between gap-3">
                <div className={`rounded-full px-3 py-1 font-jp text-[11px] font-black uppercase tracking-widest ${course.badgeClass}`}>
                  {course.badge}
                </div>
                <div className={`grid h-9 w-9 place-items-center rounded-xl ring-1 ${course.icon}`}>
                  {course.locked ? <Lock size={17} /> : <FileText size={17} />}
                </div>
              </div>

              <div className="mt-6 text-center">
                <h2 className={`text-4xl font-black tracking-tight md:text-[2.6rem] ${course.text}`}>{course.code}</h2>
                <p className="mt-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-slate-600 dark:text-slate-300">
                  {course.title}
                </p>
                {course.locked && (
                  <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                    <Lock size={12} /> Locked
                  </div>
                )}
              </div>

              <div className="my-5 grid grid-cols-2 gap-3">
                <div className="p-2 text-center">
                  <div className={`mx-auto mb-1.5 flex h-8 w-8 items-center justify-center rounded-xl ring-1 ${course.icon}`}>
                    <FileText size={16} />
                  </div>
                  <div className="text-xl font-black text-slate-900 dark:text-slate-100">{course.tests}</div>
                  <div className="text-[9px] font-black uppercase tracking-widest text-slate-400">Đề thi</div>
                </div>
                <div className="p-2 text-center">
                  <div className={`mx-auto mb-1.5 flex h-8 w-8 items-center justify-center rounded-xl ring-1 ${course.icon}`}>
                    <Target size={16} />
                  </div>
                  <div className="text-xl font-black text-slate-900 dark:text-slate-100">{course.questions}</div>
                  <div className="text-[9px] font-black uppercase tracking-widest text-slate-400">Câu hỏi</div>
                </div>
              </div>

              <div className="mt-auto">
                <div className={`relative flex w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r py-3 font-black shadow-lg transition-all ${course.button}`}>
                  <span>{course.locked ? 'Đã khóa' : 'Luyện thi ngay'}</span>
                  {course.locked ? (
                    <Lock size={17} className="absolute right-6" />
                  ) : (
                    <ArrowRight size={18} className="absolute right-6 transition-transform group-hover:translate-x-1" />
                  )}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
