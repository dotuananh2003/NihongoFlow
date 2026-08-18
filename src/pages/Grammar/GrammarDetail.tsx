import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpenText, ChevronRight, Lightbulb, Pencil, Plus, Sparkles } from 'lucide-react';
import { grammarCourses } from '../../data/grammarData';

const cardAccents = [
  {
    wash: 'from-blue-50/90 via-white to-sky-50/70 dark:from-blue-500/10 dark:via-slate-900 dark:to-sky-500/5',
    strip: 'from-blue-500 to-sky-400',
    number: 'bg-blue-600 text-white shadow-blue-500/25',
    soft: 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-500/10 dark:text-blue-300 dark:border-blue-500/20',
    hover: 'group-hover:text-blue-600 dark:group-hover:text-blue-300',
    action: 'text-blue-600 bg-blue-50 border-blue-100 hover:bg-blue-100 dark:bg-blue-500/10 dark:text-blue-300 dark:border-blue-500/20',
  },
  {
    wash: 'from-emerald-50/90 via-white to-teal-50/70 dark:from-emerald-500/10 dark:via-slate-900 dark:to-teal-500/5',
    strip: 'from-emerald-500 to-teal-400',
    number: 'bg-emerald-600 text-white shadow-emerald-500/25',
    soft: 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/20',
    hover: 'group-hover:text-emerald-600 dark:group-hover:text-emerald-300',
    action: 'text-emerald-600 bg-emerald-50 border-emerald-100 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/20',
  },
  {
    wash: 'from-fuchsia-50/90 via-white to-pink-50/70 dark:from-fuchsia-500/10 dark:via-slate-900 dark:to-pink-500/5',
    strip: 'from-fuchsia-500 to-pink-400',
    number: 'bg-fuchsia-600 text-white shadow-fuchsia-500/25',
    soft: 'bg-fuchsia-50 text-fuchsia-600 border-fuchsia-100 dark:bg-fuchsia-500/10 dark:text-fuchsia-300 dark:border-fuchsia-500/20',
    hover: 'group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-300',
    action: 'text-fuchsia-600 bg-fuchsia-50 border-fuchsia-100 hover:bg-fuchsia-100 dark:bg-fuchsia-500/10 dark:text-fuchsia-300 dark:border-fuchsia-500/20',
  },
  {
    wash: 'from-amber-50/90 via-white to-orange-50/70 dark:from-amber-500/10 dark:via-slate-900 dark:to-orange-500/5',
    strip: 'from-amber-400 to-orange-400',
    number: 'bg-amber-500 text-white shadow-amber-500/25',
    soft: 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/20',
    hover: 'group-hover:text-amber-700 dark:group-hover:text-amber-300',
    action: 'text-amber-700 bg-amber-50 border-amber-100 hover:bg-amber-100 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/20',
  },
  {
    wash: 'from-rose-50/90 via-white to-red-50/70 dark:from-rose-500/10 dark:via-slate-900 dark:to-red-500/5',
    strip: 'from-rose-500 to-red-400',
    number: 'bg-rose-600 text-white shadow-rose-500/25',
    soft: 'bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-500/10 dark:text-rose-300 dark:border-rose-500/20',
    hover: 'group-hover:text-rose-600 dark:group-hover:text-rose-300',
    action: 'text-rose-600 bg-rose-50 border-rose-100 hover:bg-rose-100 dark:bg-rose-500/10 dark:text-rose-300 dark:border-rose-500/20',
  },
];

const notationItems = [
  { label: 'N', text: 'Danh từ', jp: '名詞', color: 'bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300' },
  { label: 'V', text: 'Động từ', jp: '動詞', color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300' },
  { label: 'A', text: 'Tính từ', jp: '形容詞', color: 'bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-300' },
  { label: 'Aい', text: 'Tính từ đuôi い', color: 'bg-pink-100 text-pink-600 dark:bg-pink-500/10 dark:text-pink-300' },
  { label: 'Aな', text: 'Tính từ đuôi な', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-300' },
  { label: 'S', text: 'Câu', jp: '文', color: 'bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-300' },
  { label: 'Thể-TT', text: 'Thể thông thường', jp: '普通形', color: 'bg-teal-100 text-teal-600 dark:bg-teal-500/10 dark:text-teal-300' },
];

export const GrammarDetail = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();

  const course = grammarCourses.find(c => c.id === courseId);
  const lesson = course?.lessons.find(l => l.id === lessonId);

  if (!course || !lesson) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-slate-500">
        <p>Không tìm thấy bài học</p>
        <button
          onClick={() => navigate(`/grammar/${courseId}`)}
          className="mt-4 flex items-center gap-2 font-bold text-blue-500 hover:underline"
        >
          <ArrowLeft size={16} /> Quay lại
        </button>
      </div>
    );
  }

  const lessonNumber = lesson.id.replace('lesson-', '');

  return (
    <div className="relative mx-auto min-h-[calc(100vh-80px)] max-w-[1200px] px-4 pb-20 pt-8 md:px-8">
      <div className="mb-8">
        <div className="mb-6 flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-slate-400">
          <button onClick={() => navigate('/grammar')} className="uppercase transition-colors hover:text-slate-800 dark:hover:text-slate-200">
            {course.id}
          </button>
          <ChevronRight size={14} />
          <button onClick={() => navigate(`/grammar/${course.id}`)} className="transition-colors hover:text-slate-800 dark:hover:text-slate-200">
            Bài {lessonNumber}
          </button>
          <ChevronRight size={14} />
          <span className="text-slate-800 dark:text-slate-200">{lesson.title}</span>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/75 shadow-[0_18px_48px_rgba(15,23,42,0.10)] backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/65">
          <div className="h-2 bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400" />
          <div className="flex flex-col gap-5 p-5 md:flex-row md:items-center md:justify-between md:p-6">
            <div className="flex min-w-0 items-center gap-5">
              <button
                onClick={() => navigate(`/grammar/${course.id}`)}
                aria-label="Quay lại danh sách bài ngữ pháp"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:-translate-x-0.5 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-blue-500/10 dark:hover:text-blue-300"
              >
                <ArrowLeft size={24} />
              </button>
              <div className="min-w-0">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-blue-500/20">
                    Bài {lessonNumber}
                  </span>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
                    {lesson.grammarPoints.length} mẫu ngữ pháp
                  </span>
                </div>
                <h1 className="text-3xl font-black tracking-normal text-slate-900 dark:text-slate-50 md:text-4xl">
                  {lesson.title}
                </h1>
                <p className="mt-2 max-w-3xl text-base font-semibold leading-7 text-slate-600 dark:text-slate-300">
                  {lesson.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:min-w-[250px]">
              <div className="rounded-2xl border border-blue-100 bg-blue-50/80 p-3 dark:border-blue-500/20 dark:bg-blue-500/10">
                <BookOpenText className="mb-2 text-blue-600 dark:text-blue-300" size={20} />
                <p className="text-xl font-black leading-none text-slate-900 dark:text-slate-50">{lesson.grammarPoints.length}</p>
                <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-slate-400">Cấu trúc</p>
              </div>
              <div className="rounded-2xl border border-amber-100 bg-amber-50/80 p-3 dark:border-amber-500/20 dark:bg-amber-500/10">
                <Sparkles className="mb-2 text-amber-600 dark:text-amber-300" size={20} />
                <p className="text-xl font-black leading-none text-slate-900 dark:text-slate-50">N5</p>
                <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-slate-400">Cấp độ</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {lesson.grammarPoints.map((point, index) => {
          const num = (index + 1).toString().padStart(2, '0');
          const accent = cardAccents[index % cardAccents.length];

          return (
            <div
              key={point.id}
              onClick={() => navigate(`/grammar/${course.id}/lesson/${lesson.id}/point/${point.id}`)}
              className={`grammar-point-card group relative flex cursor-pointer items-center gap-4 overflow-hidden rounded-[2rem] border border-slate-100 bg-gradient-to-br ${accent.wash} p-6 text-left shadow-sm transition-colors hover:shadow-md dark:border-slate-800`}
            >
              <div className={`absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b ${accent.strip}`} />

              <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border shadow-sm ${accent.soft}`}>
                <span
                  className={`font-jp font-black leading-none ${
                    (point.icon?.length || 0) > 2
                      ? 'text-lg'
                      : (point.icon?.length || 0) > 1
                        ? 'text-2xl'
                        : 'text-3xl'
                  }`}
                >
                  {point.icon}
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <div className="mb-2 flex items-center gap-2">
                  <span className={`rounded-lg px-2.5 py-1 text-[10px] font-black leading-none shadow-lg ${accent.number}`}>
                    {num}
                  </span>
                  <span className={`rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${accent.soft}`}>
                    {point.type}
                  </span>
                </div>
                <h3 className={`flex items-center gap-1 truncate font-jp text-base font-black text-slate-900 transition-colors dark:text-slate-50 ${accent.hover}`}>
                  {point.title}
                  <ChevronRight size={14} className="shrink-0 text-slate-400 transition-colors group-hover:text-current" />
                </h3>
                <p className="mt-1 truncate text-sm font-semibold text-slate-500 dark:text-slate-400">
                  {point.meaning}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  aria-label="Xem ghi chú ngữ pháp"
                  onClick={(event) => {
                    event.stopPropagation();
                    navigate(`/grammar/${course.id}/lesson/${lesson.id}/point/${point.id}`);
                  }}
                  className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-colors ${accent.action}`}
                >
                  <Pencil size={16} />
                </button>
                <button
                  type="button"
                  aria-label="Mở mẫu ngữ pháp"
                  onClick={(event) => {
                    event.stopPropagation();
                    navigate(`/grammar/${course.id}/lesson/${lesson.id}/point/${point.id}`);
                  }}
                  className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${accent.strip} text-white shadow-lg transition-transform hover:scale-105`}
                >
                  <Plus size={20} strokeWidth={2.6} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 rounded-3xl border border-white/80 bg-white/75 p-6 shadow-[0_14px_36px_rgba(15,23,42,0.08)] backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/65">
        <div className="mb-4 flex items-center gap-2 text-sm font-black text-slate-800 dark:text-slate-100">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-amber-50 text-amber-500 dark:bg-amber-500/10 dark:text-amber-300">
            <Lightbulb size={18} fill="currentColor" strokeWidth={0} />
          </span>
          Chú thích ký hiệu
        </div>
        <div className="flex flex-wrap gap-4">
          {notationItems.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <span className={`rounded-full px-3 py-1 text-xs font-bold ${item.color}`}>{item.label}</span>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {item.text}
                {item.jp && <span className="ml-1 text-slate-400">({item.jp})</span>}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
