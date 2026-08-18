import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ChevronRight, Gift, GraduationCap, Layers3, Sparkles, Target } from 'lucide-react';

const COURSES = [
  {
    id: 'jpd113',
    code: 'JPD113',
    title: 'JAPANESE 1',
    subtitle: 'KANJI MASTERY',
    description: 'Lộ trình học Hán tự cơ bản dành cho người mới bắt đầu.',
    accentText: 'text-rose-600',
    accentBg: 'bg-rose-600',
    accentSoft: 'bg-rose-50 dark:bg-rose-500/10',
    accentBorder: 'border-rose-100 dark:border-rose-500/20',
    accentRing: 'ring-rose-100 dark:ring-rose-500/20',
    button: 'bg-rose-600 hover:bg-rose-700 shadow-rose-500/25',
    lessonHover: 'hover:border-rose-200 dark:hover:border-rose-500/30 hover:bg-rose-50/50 dark:hover:bg-rose-500/5',
    lessons: [
      { id: 1, title: 'Giới thiệu bản thân và Trường học', kanji: 10, vocab: 20 },
      { id: 2, title: 'Số đếm và Đơn vị tiền tệ', kanji: 14, vocab: 50 },
      { id: 3, title: 'Thời gian và Ngày trong tuần', kanji: 11, vocab: 28 },
    ],
  },
  {
    id: 'jpd123',
    code: 'JPD123',
    title: 'JAPANESE 2',
    subtitle: 'KANJI MASTERY',
    description: 'Nâng cao vốn Hán tự và từ vựng cho giao tiếp hằng ngày.',
    accentText: 'text-blue-600',
    accentBg: 'bg-blue-600',
    accentSoft: 'bg-blue-50 dark:bg-blue-500/10',
    accentBorder: 'border-blue-100 dark:border-blue-500/20',
    accentRing: 'ring-blue-100 dark:ring-blue-500/20',
    button: 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/25',
    lessonHover: 'hover:border-blue-200 dark:hover:border-blue-500/30 hover:bg-blue-50/50 dark:hover:bg-blue-500/5',
    lessons: [
      { id: 4, title: 'Địa điểm và Phương hướng', kanji: 10, vocab: 16 },
      { id: 5, title: 'Hành động và Nghỉ ngơi', kanji: 12, vocab: 30 },
      { id: 6, title: 'Giao tiếp và Sinh hoạt', kanji: 9, vocab: 56 },
      { id: 7, title: 'Tự nhiên và Cơ bản', kanji: 11, vocab: 33 },
    ],
  },
];

const statStyles = [
  {
    label: 'Tổng khóa học',
    icon: GraduationCap,
    className: 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-300',
  },
  {
    label: 'Tổng bài học',
    icon: BookOpen,
    className: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300',
  },
  {
    label: 'Tổng Hán tự',
    icon: Target,
    className: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300',
  },
  {
    label: 'Tổng từ vựng',
    icon: Gift,
    className: 'bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-300',
  },
];

export const Kanji = () => {
  const navigate = useNavigate();

  const totals = useMemo(() => {
    const lessons = COURSES.flatMap(course => course.lessons);

    return [
      COURSES.length,
      lessons.length,
      lessons.reduce((sum, lesson) => sum + lesson.kanji, 0),
      lessons.reduce((sum, lesson) => sum + lesson.vocab, 0),
    ];
  }, []);

  const openLesson = (courseId: string, lessonId: number) => {
    navigate(`/kanji/${courseId}/lesson/${lessonId}`);
  };

  return (
    <div className="relative min-h-full overflow-hidden bg-transparent pb-20 font-sans">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-6 grid gap-5 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-rose-100 bg-white/80 px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-rose-600 shadow-sm backdrop-blur dark:border-rose-500/20 dark:bg-slate-900/70 dark:text-rose-300">
              <span className="font-jp text-sm">漢字</span>
              Hán tự
            </div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-slate-50 md:text-5xl">
              Kanji Study Hub
            </h1>
            <p className="mt-3 max-w-xl text-base font-medium leading-7 text-slate-600 dark:text-slate-300">
              Học Hán tự theo lộ trình rõ ràng, đi từ nhận diện chữ, âm đọc, nghĩa đến từ vựng ứng dụng trong từng bài.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {statStyles.map((stat, index) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/70 bg-white/70 p-4 shadow-[0_12px_30px_rgba(15,23,42,0.08)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/70"
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${stat.className}`}>
                      <Icon size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-[10px] font-black uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500">
                        {stat.label}
                      </p>
                      <p className="text-2xl font-black leading-none text-slate-900 dark:text-slate-50">
                        {totals[index]}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </header>

        <div className="grid gap-5">
          {COURSES.map((course) => {
            return (
              <section
                key={course.id}
                className="kanji-course-section overflow-visible rounded-[2rem]"
              >
                <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
                  <div className={`flex flex-col justify-between gap-6 rounded-[2rem] border border-white/55 p-6 shadow-[0_16px_46px_rgba(15,23,42,0.08)] backdrop-blur ${course.accentSoft} dark:border-slate-800/70`}>
                    <div>
                      <p className={`mb-3 text-[10px] font-black uppercase tracking-[0.22em] ${course.accentText}`}>
                        {course.subtitle}
                      </p>
                      <h2 className={`text-5xl font-black tracking-tight ${course.accentText}`}>
                        {course.code}
                      </h2>
                      <p className="mt-1 text-xs font-black uppercase tracking-[0.26em] text-slate-500 dark:text-slate-400">
                        {course.title}
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div className="rounded-2xl bg-white/70 p-3 text-center shadow-sm dark:bg-slate-950/30">
                        <p className="text-lg font-black text-slate-900 dark:text-slate-50">{course.lessons.length}</p>
                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Bài</p>
                      </div>
                      <div className="rounded-2xl bg-white/70 p-3 text-center shadow-sm dark:bg-slate-950/30">
                        <p className="text-lg font-black text-slate-900 dark:text-slate-50">
                          {course.lessons.reduce((sum, lesson) => sum + lesson.kanji, 0)}
                        </p>
                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Kanji</p>
                      </div>
                      <div className="rounded-2xl bg-white/70 p-3 text-center shadow-sm dark:bg-slate-950/30">
                        <p className="text-lg font-black text-slate-900 dark:text-slate-50">
                          {course.lessons.reduce((sum, lesson) => sum + lesson.vocab, 0)}
                        </p>
                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Từ</p>
                      </div>
                    </div>

                    <button
                      onClick={() => openLesson(course.id, 1)}
                      className={`flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-black text-white shadow-lg transition-all hover:-translate-y-0.5 ${course.button}`}
                    >
                      <BookOpen size={17} />
                      Bắt đầu học
                    </button>
                  </div>

                  <div className="p-4 sm:p-6">
                    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="mb-2 flex items-center gap-2">
                          <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${course.accentSoft} ${course.accentText} ring-1 ${course.accentRing}`}>
                            <Layers3 size={17} />
                          </span>
                          <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-slate-50">
                            {course.code} - {course.title}
                          </h3>
                        </div>
                        <p className="max-w-2xl text-sm font-medium leading-6 text-slate-500 dark:text-slate-400">
                          {course.description}
                        </p>
                      </div>

                      <div className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] ${course.accentBorder} ${course.accentText} ${course.accentSoft}`}>
                        <Sparkles size={13} />
                        {course.lessons.length} lessons
                      </div>
                    </div>

                    <div className="grid gap-3">
                      {course.lessons.map((lesson, lessonIndex) => (
                        <button
                          key={lesson.id}
                          onClick={() => openLesson(course.id, lesson.id)}
                          className={`kanji-lesson-row group flex w-full items-center gap-4 rounded-2xl border border-white/75 bg-white/82 p-4 text-left shadow-sm transition-colors hover:shadow-md dark:border-slate-800 dark:bg-slate-950/40 ${course.lessonHover}`}
                        >
                          <div className={`flex w-8 shrink-0 items-center justify-center ${course.accentText}`}>
                            {lessonIndex % 2 === 0 ? (
                              <span className="font-jp text-2xl font-black">漢</span>
                            ) : (
                              <BookOpen size={21} />
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                              Lesson {lesson.id}
                            </p>
                            <h4 className="mt-1 truncate text-base font-black text-slate-900 dark:text-slate-50">
                              {lesson.title}
                            </h4>
                          </div>

                          <div className="hidden shrink-0 items-center gap-3 sm:flex">
                            <div className="text-right">
                              <p className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                {lesson.kanji} Kanji
                              </p>
                              <p className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                {lesson.vocab} Vocab
                              </p>
                            </div>
                          </div>

                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-100 bg-slate-50 text-slate-400 transition-all group-hover:translate-x-0.5 group-hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-slate-500">
                            <ChevronRight size={18} />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
};
