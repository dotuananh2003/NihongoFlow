import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Mic, 
  Sparkles, 
  Headphones, 
  MessageSquare, 
  Zap, 
  Award,
  Volume2
} from 'lucide-react';

const courseCards = [
  {
    id: 'jpd113',
    route: '/speaking/jpd113',
    badge: '初級 I',
    level: 'N5 Cơ Bản',
    code: 'JPD113',
    title: 'TIẾNG NHẬT SƠ CẤP 1',
    subtitle: 'Nền tảng giao tiếp & Shadowing nhập môn',
    kana: '話',
    lessons: 10,
    topics: 30,
    modesCount: '3 Chế độ',
    features: ['Shadowing từng câu', 'Hội thoại đời sống', 'Phản xạ cấp tốc 3s'],
    bgImage: "/images/backgrounds/jpd113-bg.png",
    card: 'border-rose-100/80 dark:border-rose-500/20 hover:border-rose-300 dark:hover:border-rose-500/40 hover:shadow-[0_24px_52px_rgba(244,63,94,0.18)]',
    text: 'text-rose-500 dark:text-rose-400',
    badgeClass: 'bg-rose-100 text-rose-600 dark:bg-rose-500/15 dark:text-rose-300 border border-rose-200/60 dark:border-rose-500/20',
    levelClass: 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200/50',
    icon: 'bg-rose-50 text-rose-500 ring-rose-100 dark:bg-rose-500/10 dark:text-rose-300 dark:ring-rose-500/20',
    button: 'from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-600 shadow-rose-500/30',
    accent: 'from-rose-500 via-pink-400 to-amber-300',
    soft: 'bg-white/80 dark:bg-slate-800/80 text-slate-800 dark:text-slate-100 border border-rose-100 dark:border-rose-900/30',
  },
  {
    id: 'jpd123',
    route: '/speaking/jpd123',
    badge: '初級 II',
    level: 'N5 Nâng Cao',
    code: 'JPD123',
    title: 'TIẾNG NHẬT SƠ CẤP 2',
    subtitle: 'Giao tiếp tình huống công sở & đời thực',
    kana: '会',
    lessons: 12,
    topics: 36,
    modesCount: '3 Chế độ',
    features: ['Hội thoại đàm thoại dài', 'Kính ngữ & xin phép', 'Luyện giọng điệu tự nhiên'],
    bgImage: "/images/backgrounds/jpd123-bg.png",
    card: 'border-blue-100/80 dark:border-blue-500/20 hover:border-blue-300 dark:hover:border-blue-500/40 hover:shadow-[0_24px_52px_rgba(37,99,235,0.18)]',
    text: 'text-blue-600 dark:text-blue-400',
    badgeClass: 'bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-300 border border-blue-200/60 dark:border-blue-500/20',
    levelClass: 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200/50',
    icon: 'bg-blue-50 text-blue-600 ring-blue-100 dark:bg-blue-500/10 dark:text-blue-300 dark:ring-blue-500/20',
    button: 'from-blue-600 via-cyan-500 to-blue-700 hover:from-blue-700 hover:to-cyan-600 shadow-blue-500/30',
    accent: 'from-blue-600 via-sky-400 to-cyan-300',
    soft: 'bg-white/80 dark:bg-slate-800/80 text-slate-800 dark:text-slate-100 border border-blue-100 dark:border-blue-900/30',
  },
];

export const Speaking = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col px-4 md:px-8 pt-4 pb-12 max-w-5xl mx-auto">
      {/* Background Japanese Aesthetic Orbs */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-50/40 via-transparent to-transparent dark:from-purple-950/20" />

      {/* Header Banner */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8 shrink-0 text-center space-y-2.5"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-200/70 bg-purple-50/80 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-purple-600 shadow-sm backdrop-blur-md dark:border-purple-900/40 dark:bg-purple-950/60 dark:text-purple-300">
          <Sparkles size={14} className="text-purple-500 animate-pulse" />
          JPD Speaking & Kaiwa
        </div>
        
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-wider flex flex-row items-center justify-center gap-3">
          LUYỆN NÓI <span className="font-jp text-purple-600 dark:text-purple-400">会話</span>
        </h1>
        
        <p className="text-slate-600 dark:text-slate-300 font-semibold max-w-xl mx-auto text-sm md:text-base leading-relaxed">
          Thực hành hội thoại nhập vai, luyện Shadowing theo nhịp và rèn phản xạ giao tiếp tức thì với chấm điểm giọng đọc chuẩn bản xứ.
        </p>
      </motion.div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full">
        {courseCards.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: index * 0.12 }}
            whileHover={{ y: -6 }}
            onClick={() => navigate(course.route)}
            className={`group relative min-h-[460px] flex flex-col justify-between overflow-hidden rounded-[2rem] border bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-[0_16px_40px_rgba(15,23,42,0.08)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all duration-500 cursor-pointer ${course.card}`}
          >
            {/* Background Course Cover Art */}
            <div
              className="absolute inset-0 bg-[length:100%_auto] bg-top bg-no-repeat opacity-85 transition-transform duration-700 group-hover:scale-105 pointer-events-none dark:opacity-40"
              style={{ backgroundImage: `url('${course.bgImage}')` }}
            />
            {/* Ambient Gradient Overlays for Readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/85 to-white/98 dark:from-slate-900/80 dark:via-slate-900/90 dark:to-slate-900/98 pointer-events-none" />
            <div className={`absolute inset-x-0 top-0 h-2 bg-gradient-to-r ${course.accent}`} />

            {/* Kanji Watermark */}
            <div className={`pointer-events-none absolute -right-3 -bottom-8 font-jp text-[8.5rem] font-black ${course.text} opacity-[0.07] transition-all duration-700 group-hover:opacity-[0.14] group-hover:scale-105 dark:opacity-[0.04]`}>
              {course.kana}
            </div>

            {/* CARD CONTENT */}
            <div className="relative z-10 flex flex-col h-full">
              {/* Top Meta Bar */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider font-jp shadow-sm ${course.badgeClass}`}>
                    {course.badge}
                  </span>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold ${course.levelClass}`}>
                    <Award size={12} />
                    {course.level}
                  </span>
                </div>

                <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-2xl shadow-sm ring-1 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 ${course.icon}`}>
                  <Mic size={20} strokeWidth={2.5} />
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="mt-6 mb-4 text-center">
                <h2 className={`text-4xl sm:text-[2.6rem] font-black tracking-tight font-jp ${course.text}`}>
                  {course.code}
                </h2>
                <h3 className="mt-1 text-base sm:text-lg font-black text-slate-800 dark:text-slate-100 tracking-wide uppercase">
                  {course.title}
                </h3>
                <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {course.subtitle}
                </p>
              </div>

              {/* 3-Col Stats Counter Cards */}
              <div className="my-4 grid grid-cols-3 gap-2.5">
                <div className={`rounded-2xl p-3 text-center shadow-xs backdrop-blur-sm transition-transform duration-300 group-hover:scale-[1.02] ${course.soft}`}>
                  <div className={`mx-auto mb-1 flex h-7 w-7 items-center justify-center rounded-xl ring-1 ${course.icon}`}>
                    <Headphones size={15} />
                  </div>
                  <div className="text-lg font-black text-slate-900 dark:text-slate-100">{course.lessons}</div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Bài học</div>
                </div>

                <div className={`rounded-2xl p-3 text-center shadow-xs backdrop-blur-sm transition-transform duration-300 group-hover:scale-[1.02] ${course.soft}`}>
                  <div className={`mx-auto mb-1 flex h-7 w-7 items-center justify-center rounded-xl ring-1 ${course.icon}`}>
                    <MessageSquare size={15} />
                  </div>
                  <div className="text-lg font-black text-slate-900 dark:text-slate-100">{course.topics}</div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Chủ đề</div>
                </div>

                <div className={`rounded-2xl p-3 text-center shadow-xs backdrop-blur-sm transition-transform duration-300 group-hover:scale-[1.02] ${course.soft}`}>
                  <div className={`mx-auto mb-1 flex h-7 w-7 items-center justify-center rounded-xl ring-1 ${course.icon}`}>
                    <Zap size={15} />
                  </div>
                  <div className="text-lg font-black text-slate-900 dark:text-slate-100">3 Mode</div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Luyện tập</div>
                </div>
              </div>

              {/* Feature Highlights Pills */}
              <div className="my-2 space-y-1.5">
                {course.features.map((feat, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300"
                  >
                    <Volume2 size={13} className={course.text} />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <div className="mt-auto pt-4">
                <div className={`relative flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r ${course.button} px-6 py-3.5 text-sm font-black text-white shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:brightness-105 active:scale-[0.98]`}>
                  <span>Vào luyện nói ngay</span>
                  <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1.5" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

