import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Volume2, 
  BookOpen, 
  Sparkles, 
  Clock, 
  ArrowRight,
  School,
  Calendar,
  Sun,
  Home,
  ShoppingCart
} from 'lucide-react';

const lessons = [
  {
    id: 'lesson-1',
    badge: 'LESSON 01',
    title: 'ワットさんと さくら大学',
    titleVi: 'Thầy Watt và Đại học Sakura',
    desc: 'Giới thiệu trường học, thời gian biểu làm việc giảng dạy và bữa trưa ở căn tin.',
    count: 10,
    time: '3-5p',
    icon: <School size={16} />,
    gradient: 'from-orange-500 to-amber-500',
    kanjiWatermark: '学',
    tags: ['🏫 Trường học', '🍛 Căn tin']
  },
  {
    id: 'lesson-2',
    badge: 'LESSON 02',
    title: '土曜日と日曜日',
    titleVi: 'Thứ Bảy và Chủ Nhật',
    desc: 'Lịch cuối tuần thư thái, chuẩn bị sách du lịch Kyoto và mua quà lưu niệm.',
    count: 10,
    time: '3-5p',
    icon: <Calendar size={16} />,
    gradient: 'from-rose-500 via-orange-500 to-amber-500',
    kanjiWatermark: '休',
    tags: ['📅 Cuối tuần', '📚 Thư viện']
  },
  {
    id: 'lesson-3',
    badge: 'LESSON 03',
    title: 'ミラーさんの一日',
    titleVi: 'Sinh hoạt hằng ngày',
    desc: 'Thói quen đi làm trong tuần và nghỉ ngơi.',
    count: 10,
    time: '3-5p',
    icon: <Sun size={16} />,
    gradient: 'from-amber-500 to-yellow-500',
    kanjiWatermark: '日',
    tags: ['☀️ Hằng ngày', '💼 Đi làm']
  },
  {
    id: 'lesson-4',
    badge: 'LESSON 04',
    title: 'あたらしい うち',
    titleVi: 'Nhà ở',
    desc: 'Khu phố yên tĩnh với công viên, thư viện và quán cà phê.',
    count: 10,
    time: '3-5p',
    icon: <Home size={16} />,
    gradient: 'from-orange-400 to-rose-500',
    kanjiWatermark: '家',
    tags: ['🏠 Nhà ở', '🌳 Công viên']
  },
  {
    id: 'lesson-5',
    badge: 'LESSON 05',
    title: 'スーパーを くらべる',
    titleVi: 'Mua sắm',
    desc: 'So sánh ba siêu thị gần nhà về giá cả và hàng hóa.',
    count: 10,
    time: '3-5p',
    icon: <ShoppingCart size={16} />,
    gradient: 'from-amber-600 to-orange-500',
    kanjiWatermark: '買',
    tags: ['🛒 Mua sắm', '🥩 Siêu thị']
  }
];

export const ShadowingLessons = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();

  const courseCode = courseId?.toUpperCase() || 'JPD113';

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col px-4 md:px-8 pt-4 pb-14 max-w-7xl mx-auto">
      {/* Luxury Ambient Glow Background */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-50/50 via-white to-amber-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-orange-950/20" />
      <div className="pointer-events-none fixed top-16 left-10 -z-10 h-72 w-72 rounded-full bg-orange-300/15 blur-3xl dark:bg-orange-900/10" />

      {/* Top Header & Breadcrumbs */}
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={() => navigate(`/speaking/${courseId}`)}
          className="group inline-flex items-center gap-1.5 rounded-xl border border-slate-200/80 bg-white/80 px-3 py-1.5 text-xs font-bold text-slate-700 shadow-xs backdrop-blur-md transition-all hover:border-orange-300 hover:bg-white hover:text-orange-600 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:border-orange-500/40 dark:hover:text-orange-400"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
          <span>Quay lại chọn chế độ</span>
        </button>

        <div className="inline-flex items-center gap-1.5 rounded-full border border-orange-200/70 bg-orange-50/90 px-3 py-1 text-[11px] font-black text-orange-700 shadow-xs dark:border-orange-900/50 dark:bg-orange-950/50 dark:text-orange-300">
          <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-ping" />
          {courseCode} • Luyện đọc Shadowing
        </div>
      </div>

      {/* Left-aligned Title Header */}
      <motion.div 
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mb-6 space-y-1"
      >
        <div className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-orange-600 dark:text-orange-400">
          <Sparkles size={12} className="text-orange-500" />
          DANH SÁCH BÀI ĐỌC THÀNH TIẾNG ({lessons.length})
        </div>

        <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight uppercase flex items-center gap-2">
          LUYỆN ĐỌC SHADOWING <span className="font-jp text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500">音読</span>
        </h1>

        <p className="text-slate-500 dark:text-slate-400 font-medium text-xs">
          Chọn bài học bên dưới để nghe mẫu giọng Tokyo và luyện đọc nhại theo từng câu.
        </p>
      </motion.div>

      {/* Compact Top-Left Grid Layout for Many Lessons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4.5 w-full">
        {lessons.map((lesson, index) => (
          <motion.div
            key={lesson.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.06 }}
            whileHover={{ y: -4 }}
            onClick={() => navigate(`/speaking/${courseId}/shadowing/${lesson.id}`)}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-orange-200/70 bg-gradient-to-b from-white/95 via-orange-50/20 to-white/90 p-4.5 shadow-[0_6px_20px_rgba(249,115,22,0.06)] backdrop-blur-xl transition-all duration-300 cursor-pointer dark:border-orange-500/20 dark:bg-gradient-to-b dark:from-slate-900 dark:via-slate-900 dark:to-orange-950/20 hover:border-orange-400 dark:hover:border-orange-500/50 hover:shadow-[0_12px_28px_rgba(249,115,22,0.14)]"
          >
            {/* Top Accent Ribbon */}
            <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${lesson.gradient}`} />

            {/* Kanji Watermark */}
            <div className="pointer-events-none absolute -right-2 -bottom-3 select-none font-jp text-[5.5rem] font-black leading-none text-orange-600/[0.04] dark:text-orange-400/[0.03] transition-transform duration-300 group-hover:scale-105">
              {lesson.kanjiWatermark}
            </div>

            <div className="relative z-10 flex flex-col h-full">
              {/* Card Top Row: Badge & Time & Icon */}
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-orange-100 text-orange-700 dark:bg-orange-950/80 dark:text-orange-300 border border-orange-200/60 dark:border-orange-800">
                    {lesson.badge}
                  </span>
                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200/50">
                    <Clock size={9} /> {lesson.time}
                  </span>
                </div>

                <div className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-orange-400 to-amber-500 text-white shadow-xs ring-1 ring-orange-100 dark:ring-orange-950 transition-transform duration-300 group-hover:scale-110">
                  <Volume2 size={13} strokeWidth={2.5} />
                </div>
              </div>

              {/* Titles */}
              <div className="mb-2">
                <h2 className="text-base font-black text-slate-900 dark:text-white font-jp tracking-tight line-clamp-1 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                  {lesson.title}
                </h2>
                <p className="text-[11px] font-bold text-orange-600/90 dark:text-orange-400/90 mt-0.5 line-clamp-1">
                  {lesson.titleVi}
                </p>
                <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-1 leading-snug line-clamp-2">
                  {lesson.desc}
                </p>
              </div>

              {/* Bottom Row */}
              <div className="mt-auto pt-2.5 flex items-center justify-between gap-2 border-t border-orange-100/70 dark:border-slate-800">
                <div className="flex items-center gap-1 text-[11px] font-black text-orange-700 dark:text-orange-300">
                  <BookOpen size={12} />
                  <span>{lesson.count} CÂU</span>
                </div>

                <div className="inline-flex items-center gap-1 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 px-2.5 py-1 text-[11px] font-black text-white shadow-xs transition-all duration-300 group-hover:shadow-orange-500/25 group-hover:brightness-105 active:scale-95">
                  <span>Luyện ngay</span>
                  <ArrowRight size={11} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};


