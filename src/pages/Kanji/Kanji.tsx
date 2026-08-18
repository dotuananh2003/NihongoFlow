import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ChevronRight, Gift, GraduationCap, PlayCircle, Sparkles, Target } from 'lucide-react';

const COURSES = [
  {
    id: 'jpd113',
    code: 'JPD113',
    title: 'JAPANESE 1',
    subtitle: 'KANJI MASTERY',
    description: 'Lộ trình Hán tự nền tảng cho người mới bắt đầu, đi từ nhận diện chữ đến từ vựng ứng dụng.',
    accentText: 'text-rose-600',
    accentBg: 'bg-rose-600',
    accentSoft: 'bg-rose-50 dark:bg-rose-500/10',
    accentBorder: 'border-rose-100 dark:border-rose-500/20',
    accentRing: 'ring-rose-100 dark:ring-rose-500/20',
    accentLine: 'from-rose-500 via-pink-400 to-amber-300',
    button: 'bg-rose-600 hover:bg-rose-700 shadow-rose-500/25',
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
    description: 'Mở rộng vốn Hán tự và từ vựng cho các chủ đề giao tiếp hằng ngày.',
    accentText: 'text-blue-600',
    accentBg: 'bg-blue-600',
    accentSoft: 'bg-blue-50 dark:bg-blue-500/10',
    accentBorder: 'border-blue-100 dark:border-blue-500/20',
    accentRing: 'ring-blue-100 dark:ring-blue-500/20',
    accentLine: 'from-blue-600 via-sky-400 to-cyan-300',
    button: 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/25',
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
    label: 'Khóa học',
    icon: GraduationCap,
    className: 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-300',
  },
  {
    label: 'Bài học',
    icon: BookOpen,
    className: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300',
  },
  {
    label: 'Hán tự',
    icon: Target,
    className: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300',
  },
  {
    label: 'Từ vựng',
    icon: Gift,
    className: 'bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-300',
  },
];

const KanjiWordmark = ({ accentText, accentSoft, accentRing }: { accentText: string; accentSoft: string; accentRing: string }) => (
  <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${accentSoft} ring-1 ${accentRing} shadow-sm`}>
    <span className={`text-[11px] font-black leading-none tracking-tight ${accentText}`}>
      Kanji
    </span>
  </div>
);

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
        <header className="mb-5 overflow-hidden rounded-[2rem] border border-white/75 bg-white/68 p-5 shadow-[0_14px_38px_rgba(15,23,42,0.07)] backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/64">
          <div className="grid gap-5 lg:grid-cols-[1fr_440px] lg:items-center">
            <div className="min-w-0">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-rose-100 bg-white/85 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-rose-600 shadow-sm dark:border-rose-500/20 dark:bg-slate-900/70 dark:text-rose-300">
                <Sparkles size={13} />
                Hán tự
              </div>
              <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-slate-50 md:text-5xl">
                Kanji Study Hub
              </h1>
              <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-slate-600 dark:text-slate-300">
                Chọn course, đi theo roadmap từng lesson và luyện Hán tự cùng từ vựng theo đúng nhịp học.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {statStyles.map((stat, index) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/75 bg-white/78 p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${stat.className}`}>
                        <Icon size={18} />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-[9px] font-black uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
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
          </div>
        </header>

        <div className="grid gap-5">
          {COURSES.map((course) => {
            const totalKanji = course.lessons.reduce((sum, lesson) => sum + lesson.kanji, 0);
            const totalVocab = course.lessons.reduce((sum, lesson) => sum + lesson.vocab, 0);

            return (
              <section
                key={course.id}
                className="kanji-course-section overflow-hidden rounded-[2rem] border border-white/75 bg-white/76 shadow-[0_12px_34px_rgba(15,23,42,0.07)] backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/62"
              >
                <div className={`h-2 bg-gradient-to-r ${course.accentLine}`} />

                <div className="grid gap-4 p-5 lg:grid-cols-[250px_1fr]">
                  <div className={`relative overflow-hidden rounded-[1.6rem] border ${course.accentBorder} ${course.accentSoft} p-5`}>
                    <div className="absolute -right-9 -top-9 h-28 w-28 rounded-full bg-white/55 blur-2xl dark:bg-white/5" />
                    <div className="relative z-10 flex h-full flex-col">
                      <div className="mb-8">
                        <p className={`mb-2 text-[10px] font-black uppercase tracking-[0.22em] ${course.accentText}`}>
                          {course.subtitle}
                        </p>
                        <h2 className={`text-5xl font-black tracking-tight ${course.accentText}`}>
                          {course.code}
                        </h2>
                        <p className="mt-1 text-[11px] font-black uppercase tracking-[0.26em] text-slate-500 dark:text-slate-400">
                          {course.title}
                        </p>
                      </div>

                      <div className="mt-auto grid grid-cols-3 gap-2">
                        {[
                          [course.lessons.length, 'bài'],
                          [totalKanji, 'kanji'],
                          [totalVocab, 'từ'],
                        ].map(([value, label]) => (
                          <div key={label} className="rounded-2xl bg-white/76 p-3 text-center shadow-sm dark:bg-slate-950/32">
                            <p className="text-lg font-black leading-none text-slate-900 dark:text-slate-50">{value}</p>
                            <p className="mt-1 text-[9px] font-black uppercase tracking-widest text-slate-400">{label}</p>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => openLesson(course.id, course.lessons[0].id)}
                        className={`mt-4 flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-black text-white shadow-md transition-colors ${course.button}`}
                      >
                        <PlayCircle size={17} />
                        Bắt đầu học
                      </button>
                    </div>
                  </div>

                  <div className="min-w-0">
                    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex min-w-0 items-center gap-3">
                        <KanjiWordmark accentText={course.accentText} accentSoft={course.accentSoft} accentRing={course.accentRing} />
                        <div className="min-w-0">
                          <h3 className="truncate text-2xl font-black tracking-tight text-slate-900 dark:text-slate-50">
                            {course.code} Roadmap
                          </h3>
                          <p className="mt-1 max-w-2xl text-sm font-semibold leading-6 text-slate-500 dark:text-slate-400">
                            {course.description}
                          </p>
                        </div>
                      </div>

                      <div className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] ${course.accentBorder} ${course.accentText} ${course.accentSoft}`}>
                        <Sparkles size={13} />
                        {course.lessons.length} lessons
                      </div>
                    </div>

                    <div className={`grid gap-3 ${course.lessons.length > 3 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
                      {course.lessons.map((lesson) => (
                        <button
                          key={lesson.id}
                          onClick={() => openLesson(course.id, lesson.id)}
                          className="kanji-lesson-row group relative min-h-[172px] overflow-hidden rounded-[1.4rem] border border-white/75 bg-white/84 p-4 text-left shadow-sm transition-colors hover:border-slate-200 hover:bg-white/95 dark:border-slate-800 dark:bg-slate-900/58 dark:hover:border-slate-700"
                        >
                          <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${course.accentLine}`} />
                          <div className="flex items-start justify-between gap-3">
                            <KanjiWordmark accentText={course.accentText} accentSoft={course.accentSoft} accentRing={course.accentRing} />
                            <span className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.14em] ${course.accentSoft} ${course.accentText} ring-1 ${course.accentRing}`}>
                              L{lesson.id}
                            </span>
                          </div>

                          <div className="mt-4">
                            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
                              Lesson {lesson.id}
                            </p>
                            <h4 className="mt-1 line-clamp-2 min-h-[44px] text-base font-black leading-snug text-slate-900 dark:text-slate-50">
                              {lesson.title}
                            </h4>
                          </div>

                          <div className="mt-4 flex items-center justify-between gap-3">
                            <div className="flex gap-2">
                              <span className="rounded-xl bg-slate-50 px-2.5 py-1.5 text-[10px] font-black uppercase text-slate-500 ring-1 ring-slate-100 dark:bg-slate-950/50 dark:text-slate-400 dark:ring-slate-800">
                                {lesson.kanji} Kanji
                              </span>
                              <span className="rounded-xl bg-slate-50 px-2.5 py-1.5 text-[10px] font-black uppercase text-slate-500 ring-1 ring-slate-100 dark:bg-slate-950/50 dark:text-slate-400 dark:ring-slate-800">
                                {lesson.vocab} Vocab
                              </span>
                            </div>
                            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-slate-50 text-slate-400 ring-1 ring-slate-100 transition-colors group-hover:bg-white dark:bg-slate-950/50 dark:text-slate-500 dark:ring-slate-800">
                              <ChevronRight size={17} />
                            </span>
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
