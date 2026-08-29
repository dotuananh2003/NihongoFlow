import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  GraduationCap,
  Sparkles,
  Target,
  Flame,
  Volume2,
  Layers,
  ArrowRight,
  Pencil,
  Keyboard,
  HelpCircle,
  Clock,
  Compass,
  Smile,
  Award
} from 'lucide-react';
import { motion } from 'framer-motion';
import { JapaneseMascot } from '../../components/mascot/JapaneseMascot';

// Dữ liệu các khóa học Hán tự
const COURSES = [
  {
    id: 'jpd113',
    code: 'JPD113',
    level: 'Sơ Cấp I',
    levelJp: '初級 I',
    title: 'Hán Tự Cơ Bản Minna I',
    desc: 'Lộ trình 35 Hán tự nền tảng (Số đếm, Thời gian, Trường học) cho người mới bắt đầu.',
    kanjiCount: 35,
    vocabCount: 98,
    progress: 75,
    theme: {
      accentText: 'text-rose-600 dark:text-rose-400',
      badgeBg: 'bg-rose-100/90 text-rose-700 dark:bg-rose-950/70 dark:text-rose-300 border border-rose-200 dark:border-rose-800',
      btn: 'from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-600 shadow-[0_8px_20px_rgba(244,63,94,0.3)]',
      gradient: 'from-rose-500 via-pink-500 to-amber-400',
      border: 'border-rose-200/80 dark:border-slate-800',
      hoverBorder: 'hover:border-rose-300 dark:hover:border-rose-600/50 hover:shadow-[0_20px_45px_rgba(244,63,94,0.12)]',
      progressBar: 'from-rose-500 to-pink-500',
      tagBg: 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-300'
    },
    lessons: [
      { id: 1, title: 'Giới thiệu bản thân & Trường học', kanji: 10, vocab: 20, icon: Smile },
      { id: 2, title: 'Số đếm & Đơn vị tiền tệ', kanji: 14, vocab: 50, icon: Award },
      { id: 3, title: 'Thời gian & Ngày trong tuần', kanji: 11, vocab: 28, icon: Clock },
    ],
  },
  {
    id: 'jpd123',
    code: 'JPD123',
    level: 'Sơ Cấp II',
    levelJp: '初級 II',
    title: 'Hán Tự Ứng Dụng Minna II',
    desc: 'Mở rộng 42 Hán tự trung cấp về Địa điểm, Phương hướng, Hành động và Tự nhiên.',
    kanjiCount: 42,
    vocabCount: 155,
    progress: 40,
    theme: {
      accentText: 'text-blue-600 dark:text-blue-400',
      badgeBg: 'bg-blue-100/90 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300 border border-blue-200 dark:border-blue-800',
      btn: 'from-blue-600 via-sky-500 to-indigo-600 hover:from-blue-700 hover:to-sky-600 shadow-[0_8px_20px_rgba(59,130,246,0.3)]',
      gradient: 'from-blue-600 via-sky-500 to-cyan-400',
      border: 'border-blue-200/80 dark:border-slate-800',
      hoverBorder: 'hover:border-blue-300 dark:hover:border-blue-600/50 hover:shadow-[0_20px_45px_rgba(59,130,246,0.12)]',
      progressBar: 'from-blue-500 to-cyan-500',
      tagBg: 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-300'
    },
    lessons: [
      { id: 4, title: 'Địa điểm & Phương hướng', kanji: 10, vocab: 16, icon: Compass },
      { id: 5, title: 'Hành động & Nghỉ ngơi', kanji: 12, vocab: 30, icon: Target },
      { id: 6, title: 'Giao tiếp & Sinh hoạt', kanji: 9, vocab: 56, icon: BookOpen },
      { id: 7, title: 'Tự nhiên & Cuộc sống', kanji: 11, vocab: 33, icon: Sparkles },
    ],
  },
];

// Danh sách chữ Hán tiêu biểu trong ngày
const DAILY_KANJIS = [
  {
    char: '学',
    sino: 'HỌC',
    meaning: 'Học tập, học thức',
    onyomi: 'ガク (gaku)',
    kunyomi: 'まな・ぶ (mana-bu)',
    strokes: 8,
    radical: '子 (Tử)',
    examples: [
      { word: '学生', reading: 'がくせい', mean: 'Học sinh, sinh viên' },
      { word: '大学', reading: 'だいがく', mean: 'Trường đại học' },
      { word: '学校', reading: 'がっこう', mean: 'Trường học' }
    ],
    mnemonic: 'Đứa trẻ (子) ở dưới mái nhà (冖) đang học tập chăm chỉ.'
  },
  {
    char: '日',
    sino: 'NHẬT',
    meaning: 'Mặt trời, ngày',
    onyomi: 'ニチ, ジツ (nichi, jitsu)',
    kunyomi: 'ひ, -び, -か (hi, -bi, -ka)',
    strokes: 4,
    radical: '日 (Nhật)',
    examples: [
      { word: '日本', reading: 'にほん', mean: 'Nước Nhật' },
      { word: '今日', reading: 'きょう', mean: 'Hôm nay' },
      { word: '日曜日', reading: 'にちようび', mean: 'Chủ nhật' }
    ],
    mnemonic: 'Hình dáng mặt trời tròn sáng rọi ranh giới ở giữa.'
  },
  {
    char: '語',
    sino: 'NGỮ',
    meaning: 'Ngôn ngữ, lời nói',
    onyomi: 'ゴ (go)',
    kunyomi: 'かた・る (kata-ru)',
    strokes: 14,
    radical: '言 (Ngôn)',
    examples: [
      { word: '日本語', reading: 'にほんご', mean: 'Tiếng Nhật' },
      { word: '英語', reading: 'えいご', mean: 'Tiếng Anh' },
      { word: '単語', reading: 'たんご', mean: 'Từ vựng' }
    ],
    mnemonic: 'Lời nói (言) của 5 người (五) từ miệng (口) tạo thành ngôn ngữ.'
  }
];

export const Kanji = () => {
  const navigate = useNavigate();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [currentDailyIndex] = useState(0);
  const dailyKanji = DAILY_KANJIS[currentDailyIndex];

  // Phát âm chữ Hán chuẩn giọng Tokyo
  const playAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.85;
      setIsPlayingAudio(true);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const openLesson = (courseId: string, lessonId: number) => {
    navigate(`/kanji/${courseId}/lesson/${lessonId}`);
  };

  const openFirstKanjiDetail = (courseId: string, lessonId: number) => {
    navigate(`/kanji/${courseId}/lesson/${lessonId}/kanji/1`);
  };

  return (
    <div className="relative min-h-full overflow-hidden bg-transparent pb-20 font-sans">
      <div className="mx-auto max-w-[1440px] px-4 py-4 sm:px-6 lg:px-8 space-y-6">

        {/* ========================================================================= */}
        {/* 1. TOP HERO BANNER: THU NHỎ, TINH TẾ, LINH VẬT FULL NGƯỜI NHỎ GỌN */}
        {/* ========================================================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-white via-white to-slate-50/80 dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-950 border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-sm"
        >
          {/* Ambient Subtle Glow */}
          <div className="pointer-events-none absolute -right-16 -top-16 w-52 h-52 rounded-full bg-rose-300/15 dark:bg-rose-600/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-16 -bottom-16 w-52 h-52 rounded-full bg-blue-300/15 dark:bg-blue-600/10 blur-3xl" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
            
            {/* Cột trái: Badge, Tiêu đề & Thông số */}
            <div className="space-y-2.5 flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-rose-100/90 text-rose-700 dark:bg-rose-950/70 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                  <Sparkles size={13} strokeWidth={2.2} />
                  漢字学習 • Kanji Study Hub
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/50">
                  <Flame size={13} className="text-amber-500" />
                  Chuỗi học 5 ngày
                </span>
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                  Chinh Phục Hán Tự & Bộ Thủ N5 - N4
                </h1>
                <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                  Lộ trình 77 Hán tự trọng tâm, phân tích bộ thủ, luyện nét viết cọ thư pháp và ứng dụng từ vựng Minna no Nihongo.
                </p>
              </div>

              {/* Hàng thống kê dạng Pills cực gọn */}
              <div className="pt-1 flex flex-wrap items-center gap-3 text-xs font-bold text-slate-500 dark:text-slate-400">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700">
                  <GraduationCap size={14} strokeWidth={2.2} className="text-rose-500" />
                  <span><strong className="text-slate-900 dark:text-white">2</strong> Khóa học</span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700">
                  <BookOpen size={14} strokeWidth={2.2} className="text-blue-500" />
                  <span><strong className="text-slate-900 dark:text-white">7</strong> Bài học</span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700">
                  <Target size={14} strokeWidth={2.2} className="text-emerald-500" />
                  <span><strong className="text-slate-900 dark:text-white">77</strong> Hán tự</span>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700 flex-1 min-w-[200px] max-w-xs">
                  <span>Tiến độ: <strong className="text-rose-600 dark:text-rose-400">58%</strong></span>
                  <div className="flex-1 h-2 rounded-full bg-slate-200/80 dark:bg-slate-700 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 w-[58%]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Cột phải: Linh vật Kitsune FULL NGƯỜI thu nhỏ gọn gàng */}
            <div className="flex items-center justify-center shrink-0 self-center">
              <div className="w-[140px] h-[120px] flex items-center justify-center overflow-visible">
                <div className="scale-[0.55] sm:scale-[0.6] origin-center -mt-2">
                  <JapaneseMascot state="idle" showSpeechBubble={false} />
                </div>
              </div>
            </div>

          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* 2. BỐ CỤC 2 CỘT: 8 CỘT TRÁI (COURSES + PRACTICE) • 4 CỘT PHẢI (DAILY KANJI) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ======================================================================= */}
          {/* CỘT TRÁI (8 CỘT): KHÓA HỌC JPD113 / JPD123 & QUICK PRACTICE HUB */}
          {/* ======================================================================= */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Header Mục Khóa Học */}
            <div className="flex items-center justify-between px-1">
              <h2 className="text-xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2 tracking-tight">
                <BookOpen className="text-rose-500" size={22} strokeWidth={2.2} />
                Lộ Trình Khóa Học Hán Tự
              </h2>
              <span className="text-xs font-bold text-slate-400">2 Giáo trình chuẩn</span>
            </div>

            {/* Danh sách 2 Thẻ Khóa Học Lớn */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {COURSES.map((course) => {
                const theme = course.theme;

                return (
                  <motion.div
                    key={course.id}
                    whileHover={{ y: -6, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
                    whileTap={{ scale: 0.99 }}
                    style={{ willChange: 'transform', transform: 'translateZ(0)' }}
                    className={`group relative overflow-hidden rounded-[28px] border bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between ${theme.border} ${theme.hoverBorder}`}
                  >
                    {/* Dải màu trang trí đỉnh thẻ */}
                    <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${theme.gradient}`} />

                    <div className="space-y-4">
                      
                      {/* Badge cấp độ & Mã môn */}
                      <div className="flex items-center justify-between">
                        <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${theme.badgeBg}`}>
                          {course.levelJp} • {course.code}
                        </span>
                        <span className="text-xs font-bold text-slate-400">
                          {course.lessons.length} bài học
                        </span>
                      </div>

                      {/* Tiêu đề & Mô tả */}
                      <div>
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {course.title}
                        </h3>
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                          {course.desc}
                        </p>
                      </div>

                      {/* Thống kê Hán tự & Từ vựng */}
                      <div className="grid grid-cols-2 gap-2.5 pt-1">
                        <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 flex items-center gap-2.5">
                          <div className={`w-8 h-8 rounded-xl ${theme.tagBg} flex items-center justify-center shrink-0`}>
                            <Target size={15} strokeWidth={2.2} />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase">Hán tự</p>
                            <p className="text-sm font-black text-slate-800 dark:text-slate-100">{course.kanjiCount} chữ</p>
                          </div>
                        </div>

                        <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 flex items-center gap-2.5">
                          <div className={`w-8 h-8 rounded-xl ${theme.tagBg} flex items-center justify-center shrink-0`}>
                            <Layers size={15} strokeWidth={2.2} />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase">Từ vựng</p>
                            <p className="text-sm font-black text-slate-800 dark:text-slate-100">{course.vocabCount} từ</p>
                          </div>
                        </div>
                      </div>

                      {/* Danh sách bài học con */}
                      <div className="space-y-1.5 pt-1">
                        <p className="text-[11px] font-black uppercase tracking-wider text-slate-400 px-0.5">Danh sách bài học:</p>
                        <div className="space-y-1.5">
                          {course.lessons.map((lesson) => {
                            const LessonIcon = lesson.icon || BookOpen;
                            return (
                              <button
                                key={lesson.id}
                                onClick={() => openLesson(course.id, lesson.id)}
                                className="w-full p-2.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 text-left transition-colors cursor-pointer"
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <div className={`w-7 h-7 rounded-lg ${theme.tagBg} flex items-center justify-center shrink-0`}>
                                    <LessonIcon size={13} strokeWidth={2.2} />
                                  </div>
                                  <div className="min-w-0">
                                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                                      Bài {lesson.id}: {lesson.title}
                                    </p>
                                  </div>
                                </div>
                                <span className="text-[10px] font-bold text-slate-400 shrink-0">
                                  {lesson.kanji} Kanji
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Nút hành động chính */}
                      <div className="pt-2">
                        <motion.button
                          onClick={() => openLesson(course.id, course.lessons[0].id)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`w-full py-2.5 rounded-2xl bg-gradient-to-r ${theme.btn} text-white font-black text-xs shadow-xs flex items-center justify-center gap-2 cursor-pointer`}
                        >
                          <span>Bắt đầu học {course.code}</span>
                          <ArrowRight size={14} strokeWidth={2.2} className="group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                      </div>

                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Quick Practice Hub (4 Công Cụ Luyện Tập Nhanh) */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-lg font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Sparkles className="text-amber-500" size={18} strokeWidth={2.2} />
                  Trung Tâm Luyện Tập Nhanh
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                
                {/* 1. Kanji Flashcards */}
                <motion.div
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => openLesson('jpd113', 1)}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-rose-300 dark:hover:border-rose-700 shadow-xs hover:shadow-md cursor-pointer transition-all space-y-2.5 group text-center"
                >
                  <div className="w-11 h-11 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-500 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Layers size={20} strokeWidth={2.2} />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-800 dark:text-slate-100">Flashcard Hán Tự</h4>
                    <p className="text-[10px] font-semibold text-slate-400 mt-0.5">Lật thẻ nhớ mặt chữ</p>
                  </div>
                </motion.div>

                {/* 2. Stroke Drawing Canvas */}
                <motion.div
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => openFirstKanjiDetail('jpd113', 1)}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 shadow-xs hover:shadow-md cursor-pointer transition-all space-y-2.5 group text-center"
                >
                  <div className="w-11 h-11 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-500 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Pencil size={20} strokeWidth={2.2} />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-800 dark:text-slate-100">Luyện Viết Nét</h4>
                    <p className="text-[10px] font-semibold text-slate-400 mt-0.5">Canvas viết cọ chuẩn</p>
                  </div>
                </motion.div>

                {/* 3. Typing Drill */}
                <motion.div
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => openLesson('jpd113', 1)}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700 shadow-xs hover:shadow-md cursor-pointer transition-all space-y-2.5 group text-center"
                >
                  <div className="w-11 h-11 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-500 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Keyboard size={20} strokeWidth={2.2} />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-800 dark:text-slate-100">Luyện Gõ Phản Xạ</h4>
                    <p className="text-[10px] font-semibold text-slate-400 mt-0.5">Gõ âm Hán & Từ vựng</p>
                  </div>
                </motion.div>

                {/* 4. Kanji Quiz */}
                <motion.div
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => openLesson('jpd113', 1)}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-amber-300 dark:hover:border-amber-700 shadow-xs hover:shadow-md cursor-pointer transition-all space-y-2.5 group text-center"
                >
                  <div className="w-11 h-11 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-500 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform">
                    <HelpCircle size={20} strokeWidth={2.2} />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-800 dark:text-slate-100">Trắc Nghiệm</h4>
                    <p className="text-[10px] font-semibold text-slate-400 mt-0.5">Kiểm tra On / Kun</p>
                  </div>
                </motion.div>

              </div>
            </div>

          </div>

          {/* ======================================================================= */}
          {/* CỘT PHẢI (4 CỘT): DAILY FEATURED KANJI & RADICAL MASTERY TRACKER */}
          {/* ======================================================================= */}
          <div className="lg:col-span-4 space-y-5">
            
            {/* Card 1: Hán Tự Tiêu Biểu Trong Ngày (Daily Featured Kanji) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-white via-white to-rose-50/50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 border border-rose-200/80 dark:border-slate-800 p-6 shadow-sm space-y-4"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-400/10 rounded-full blur-2xl pointer-events-none" />

              {/* Header Card */}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-rose-100 text-rose-700 dark:bg-rose-950/70 dark:text-rose-300">
                  <Sparkles size={12} /> Hán Tự Hôm Nay
                </span>
                <span className="text-[11px] font-bold text-slate-400">
                  {dailyKanji.strokes} nét • Bộ {dailyKanji.radical}
                </span>
              </div>

              {/* Stage Chữ Hán To Rõ Nét Cọ */}
              <div className="text-center py-3 bg-white/80 dark:bg-slate-800/60 rounded-2xl border border-rose-100 dark:border-slate-700/60 relative group shadow-xs">
                <h3 className="text-7xl font-black font-jp text-slate-900 dark:text-white tracking-tight leading-none">
                  {dailyKanji.char}
                </h3>
                <div className="mt-2 flex items-center justify-center gap-2">
                  <span className="text-sm font-black text-rose-600 dark:text-rose-400 uppercase tracking-wider">
                    {dailyKanji.sino}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">• {dailyKanji.meaning}</span>
                </div>

                {/* Nút Loa Phát Âm */}
                <button
                  onClick={() => playAudio(dailyKanji.char)}
                  className={`absolute bottom-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-xs cursor-pointer ${
                    isPlayingAudio ? 'bg-rose-500 text-white animate-pulse' : 'bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-300'
                  }`}
                  title="Nghe phát âm"
                >
                  <Volume2 size={15} strokeWidth={2.2} />
                </button>
              </div>

              {/* Âm On & Kun */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Âm On'yomi</p>
                  <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">{dailyKanji.onyomi}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Âm Kun'yomi</p>
                  <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">{dailyKanji.kunyomi}</p>
                </div>
              </div>

              {/* Mẹo Nhớ Hán Tự */}
              <div className="p-3 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-800/50">
                <p className="text-[11px] font-black uppercase text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
                  <Award size={13} className="text-amber-500" /> Mẹo Nhớ Nhanh:
                </p>
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {dailyKanji.mnemonic}
                </p>
              </div>

              {/* Từ Vựng Ứng Dụng */}
              <div className="space-y-1.5">
                <p className="text-[11px] font-black uppercase text-slate-400 px-0.5">Từ vựng ứng dụng:</p>
                <div className="space-y-1">
                  {dailyKanji.examples.map((ex, idx) => (
                    <div
                      key={idx}
                      onClick={() => playAudio(ex.word)}
                      className="p-2 rounded-xl bg-white dark:bg-slate-800/70 border border-slate-100 dark:border-slate-700 flex items-center justify-between gap-2 hover:border-rose-200 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-white font-jp text-xs">{ex.word}</span>
                        <span className="text-[11px] font-semibold text-slate-400">({ex.reading})</span>
                      </div>
                      <span className="text-xs font-medium text-slate-600 dark:text-slate-300">{ex.mean}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Luyện Viết Chữ Này */}
              <motion.button
                onClick={() => openFirstKanjiDetail('jpd113', 1)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-black text-xs shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Pencil size={14} strokeWidth={2.2} />
                <span>Luyện Viết Chữ 「{dailyKanji.char}」 Ngay</span>
              </motion.button>

            </motion.div>

            {/* Card 2: Bộ Theo Dõi Bộ Thủ Cốt Lõi (Radical Mastery Tracker) */}
            <div className="p-5 rounded-[28px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3.5">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Award size={16} className="text-blue-500" />
                  Tiến Độ Bộ Thủ Cốt Lõi
                </h4>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400">4/12 Bộ</span>
              </div>

              <div className="space-y-2.5">
                {[
                  { radical: '日 (Nhật - Mặt trời)', percent: 100, color: 'bg-rose-500' },
                  { radical: '月 (Nguyệt - Mặt trăng)', percent: 90, color: 'bg-blue-500' },
                  { radical: '木 (Mộc - Cây cối)', percent: 85, color: 'bg-emerald-500' },
                  { radical: '門 (Môn - Cửa cổng)', percent: 65, color: 'bg-amber-500' },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-600 dark:text-slate-300">{item.radical}</span>
                      <span className="text-slate-400">{item.percent}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.percent}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
