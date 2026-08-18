import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookMarked, BookOpen, Sparkles } from 'lucide-react';

const courseCards = [
  {
    id: 'jpd113',
    route: '/vocabulary/jpd113',
    badge: '初級 I',
    code: 'JPD113',
    title: 'TIẾNG NHẬT SƠ CẤP 1',
    lessons: 10,
    words: 334,
    kana: '語',
    bgImage: "/images/backgrounds/jpd113-bg.png",
    card: 'border-rose-100/80 dark:border-rose-500/20 hover:border-rose-300 dark:hover:border-rose-500/40 hover:shadow-[0_24px_52px_rgba(244,63,94,0.18)]',
    text: 'text-rose-500 dark:text-rose-400',
    badgeClass: 'bg-rose-100 text-rose-600 dark:bg-rose-500/15 dark:text-rose-300',
    icon: 'bg-rose-50 text-rose-500 ring-rose-100 dark:bg-rose-500/10 dark:text-rose-300 dark:ring-rose-500/20',
    button: 'from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 shadow-rose-500/30',
    accent: 'from-rose-500 via-pink-400 to-amber-300',
    soft: 'bg-rose-50/80 text-rose-600 ring-rose-100 dark:bg-rose-500/10 dark:text-rose-300 dark:ring-rose-500/20',
  },
  {
    id: 'jpd123',
    route: '/vocabulary/jpd123',
    badge: '初級 II',
    code: 'JPD123',
    title: 'TIẾNG NHẬT SƠ CẤP 2',
    lessons: 12,
    words: 251,
    kana: '彙',
    bgImage: "/images/backgrounds/jpd123-bg.png",
    card: 'border-blue-100/80 dark:border-blue-500/20 hover:border-blue-300 dark:hover:border-blue-500/40 hover:shadow-[0_24px_52px_rgba(37,99,235,0.18)]',
    text: 'text-blue-600 dark:text-blue-400',
    badgeClass: 'bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-300',
    icon: 'bg-blue-50 text-blue-600 ring-blue-100 dark:bg-blue-500/10 dark:text-blue-300 dark:ring-blue-500/20',
    button: 'from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-blue-500/30',
    accent: 'from-blue-600 via-sky-400 to-cyan-300',
    soft: 'bg-blue-50/80 text-blue-600 ring-blue-100 dark:bg-blue-500/10 dark:text-blue-300 dark:ring-blue-500/20',
  },
];

export const Vocabulary = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col px-4 md:px-8 pt-4 pb-4 max-w-5xl mx-auto">

      <div className="mb-5 shrink-0 text-center">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-3.5 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-blue-600 shadow-sm backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/70 dark:text-blue-300">
          <Sparkles size={14} /> JPD Vocabulary
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-wider flex flex-row items-center justify-center gap-3">
          TỪ VỰNG <span className="font-jp text-blue-600 dark:text-blue-400">語彙</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 font-semibold mt-1 text-sm">Học từ vựng theo giáo trình JPD</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto w-full">
        {courseCards.map((course) => (
          <button
            key={course.id}
            type="button"
            className={`relative min-h-[300px] bg-white dark:bg-slate-900 rounded-[1.75rem] p-4 shadow-[0_16px_38px_rgba(15,23,42,0.11)] dark:shadow-[0_16px_38px_rgba(0,0,0,0.3)] overflow-hidden border flex flex-col text-left group cursor-pointer ${course.card}`}
            onClick={() => navigate(course.route)}
          >
            <div
              className="absolute inset-0 bg-[length:100%_auto] bg-top bg-no-repeat opacity-100 transition-transform duration-700 group-hover:scale-105 pointer-events-none dark:opacity-90"
              style={{ backgroundImage: `url('${course.bgImage}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-white/18 to-white/72 dark:from-slate-950/20 dark:via-slate-950/30 dark:to-slate-950/78 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white/88 to-transparent dark:from-slate-950/90 pointer-events-none" />
            <div className={`absolute inset-x-0 top-0 h-2 bg-gradient-to-r ${course.accent}`} />
            <div className={`absolute -right-4 -bottom-7 font-jp text-[6.5rem] font-black ${course.text} opacity-[0.08] transition-transform duration-700 group-hover:scale-110`}>
              {course.kana}
            </div>

            <div className="relative z-10 flex h-full flex-col">
              <div className="flex items-start justify-between gap-3">
                <div className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest font-jp ${course.badgeClass}`}>{course.badge}</div>
                <div className={`grid h-9 w-9 place-items-center rounded-xl ring-1 ${course.icon}`}>
                  <BookMarked size={17} />
                </div>
              </div>

              <div className="mt-6 text-center">
                <h2 className={`text-4xl md:text-[2.6rem] font-black tracking-tight ${course.text}`}>{course.code}</h2>
                <p className="mt-1.5 text-slate-600 dark:text-slate-300 font-black uppercase tracking-[0.2em] text-[11px]">{course.title}</p>
              </div>

              <div className="my-5 grid grid-cols-2 gap-3">
                <div className="p-2 text-center">
                  <div className={`mx-auto mb-1.5 flex h-8 w-8 items-center justify-center rounded-xl ring-1 ${course.icon}`}>
                    <BookOpen size={16} />
                  </div>
                  <div className="text-xl font-black text-slate-900 dark:text-slate-100">{course.lessons}</div>
                  <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Lessons</div>
                </div>
                <div className="p-2 text-center">
                  <div className={`mx-auto mb-1.5 flex h-8 w-8 items-center justify-center rounded-xl ring-1 ${course.icon}`}>
                    <BookMarked size={16} />
                  </div>
                  <div className="text-xl font-black text-slate-900 dark:text-slate-100">{course.words}</div>
                  <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Từ vựng</div>
                </div>
              </div>

              <div className="mt-auto">
                <div className={`relative w-full bg-gradient-to-r ${course.button} text-white font-black py-3 rounded-2xl shadow-lg transition-all flex items-center justify-center overflow-hidden`}>
                  <span>Bắt đầu học</span>
                  <ArrowRight size={18} className="absolute right-6 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
