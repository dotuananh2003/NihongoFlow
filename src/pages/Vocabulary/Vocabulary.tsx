import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, Sparkles, ArrowRight, Volume2, 
  Bookmark, Check, RotateCcw, Brain, Zap, 
  Headphones, GraduationCap, Flame, 
  Layers, ArrowUpRight, BookMarked, 
  Gamepad2, CheckCircle2, BookmarkCheck,
  ChevronDown
} from 'lucide-react';
import { JapaneseMascot } from '../../components/mascot/JapaneseMascot';

// Dữ liệu ngân hàng từ vựng nổi bật mỗi ngày
const dailyVocabPool = [
  {
    id: 1,
    kanji: '語彙',
    hiragana: 'ごい',
    romaji: 'goi',
    hanViet: 'NGỮ VỰNG',
    meaning: 'Từ vựng, vốn từ ngữ',
    type: 'Danh từ',
    level: 'N5 - N4',
    exampleJp: '語彙を増やすために、毎日新しい単語を覚えます。',
    exampleVi: 'Để mở rộng vốn từ vựng, tôi học từ mới mỗi ngày.',
    accentColor: 'from-rose-500 via-pink-500 to-amber-400',
    themeText: 'text-rose-500 dark:text-rose-400',
    tagBg: 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
  },
  {
    id: 2,
    kanji: '友達',
    hiragana: 'ともだち',
    romaji: 'tomodachi',
    hanViet: 'HỮU ĐẠT',
    meaning: 'Bạn bè, người bạn',
    type: 'Danh từ',
    level: 'N5',
    exampleJp: '週末に友達と一緒に日本料理を食べに行きました。',
    exampleVi: 'Cuối tuần tôi đã đi ăn món Nhật cùng bạn bè.',
    accentColor: 'from-blue-500 via-sky-500 to-indigo-400',
    themeText: 'text-blue-500 dark:text-blue-400',
    tagBg: 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
  },
  {
    id: 3,
    kanji: '勉強',
    hiragana: 'べんきょう',
    romaji: 'benkyou',
    hanViet: 'MIỄN CƯỜNG',
    meaning: 'Học tập, nghiên cứu',
    type: 'Danh từ / Động từ Suru',
    level: 'N5',
    exampleJp: '毎日30分日本語を勉強しています。',
    exampleVi: 'Mỗi ngày tôi dành 30 phút để học tiếng Nhật.',
    accentColor: 'from-purple-500 via-fuchsia-500 to-violet-400',
    themeText: 'text-purple-500 dark:text-purple-400',
    tagBg: 'bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200 dark:border-purple-800'
  },
  {
    id: 4,
    kanji: '約束',
    hiragana: 'やくそく',
    romaji: 'yakusoku',
    hanViet: 'ƯỚC THÚC',
    meaning: 'Lời hứa, cuộc hẹn',
    type: 'Danh từ / Động từ Suru',
    level: 'N4',
    exampleJp: '友達と7時に駅で会う約束をしました。',
    exampleVi: 'Tôi đã hẹn gặp bạn ở nhà ga lúc 7 giờ.',
    accentColor: 'from-amber-500 via-orange-500 to-yellow-400',
    themeText: 'text-amber-500 dark:text-amber-400',
    tagBg: 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
  },
  {
    id: 5,
    kanji: '桜',
    hiragana: 'さくら',
    romaji: 'sakura',
    hanViet: 'ANH',
    meaning: 'Hoa anh đào Nhật Bản',
    type: 'Danh từ',
    level: 'N5',
    exampleJp: '春になると、公園の桜がとてもきれいに咲きます。',
    exampleVi: 'Khi mùa xuân đến, hoa anh đào trong công viên nở rộ tuyệt đẹp.',
    accentColor: 'from-pink-500 via-rose-400 to-red-400',
    themeText: 'text-pink-500 dark:text-pink-400',
    tagBg: 'bg-pink-100 text-pink-700 dark:bg-pink-950/60 dark:text-pink-300 border border-pink-200 dark:border-pink-800'
  }
];

// Danh sách các khóa học giáo trình cốt lõi
const curriculumCourses = [
  {
    id: 'jpd113',
    code: 'JPD113',
    levelBadge: 'N5 • Sơ cấp 1',
    jpBadge: '初級 I',
    title: 'TIẾNG NHẬT SƠ CẤP 1',
    subtitle: 'Nhập môn bài 1 - 10 giáo trình Minna no Nihongo',
    lessons: 10,
    words: 334,
    progress: 70,
    completedLessons: 7,
    route: '/vocabulary/jpd113',
    kanaWatermark: '語',
    bgImage: '/images/backgrounds/jpd113-bg.png',
    accentGradient: 'from-rose-500 via-pink-500 to-amber-400',
    accentText: 'text-rose-500 dark:text-rose-400',
    tagClass: 'bg-rose-100/90 text-rose-700 dark:bg-rose-950/70 dark:text-rose-300 border border-rose-200 dark:border-rose-800/80',
    progressBar: 'from-rose-500 to-pink-500',
    cardBorder: 'border-rose-200/80 dark:border-rose-950/60 hover:border-rose-400 dark:hover:border-rose-600/70',
    buttonGradient: 'from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-600'
  },
  {
    id: 'jpd123',
    code: 'JPD123',
    levelBadge: 'N4 • Sơ cấp 2',
    jpBadge: '初級 II',
    title: 'TIẾNG NHẬT SƠ CẤP 2',
    subtitle: 'Nâng cao bài 11 - 22 giáo trình Minna no Nihongo',
    lessons: 12,
    words: 251,
    progress: 35,
    completedLessons: 4,
    route: '/vocabulary/jpd123',
    kanaWatermark: '彙',
    bgImage: '/images/backgrounds/jpd123-bg.png',
    accentGradient: 'from-blue-500 via-sky-500 to-cyan-400',
    accentText: 'text-blue-500 dark:text-blue-400',
    tagClass: 'bg-blue-100/90 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300 border border-blue-200 dark:border-blue-800/80',
    progressBar: 'from-blue-500 to-cyan-500',
    cardBorder: 'border-blue-200/80 dark:border-blue-950/60 hover:border-blue-400 dark:hover:border-blue-600/70',
    buttonGradient: 'from-blue-600 via-sky-500 to-indigo-600 hover:from-blue-700 hover:to-sky-600'
  }
];

export const Vocabulary = () => {
  const navigate = useNavigate();

  // State quản lý khóa học đang chọn (JPD113 / JPD123)
  const [selectedCourseId, setSelectedCourseId] = useState<'jpd113' | 'jpd123'>(() => {
    const saved = localStorage.getItem('vocab_selected_course');
    return saved === 'jpd123' ? 'jpd123' : 'jpd113';
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  useEffect(() => {
    document.body.classList.add('vocab-performance-scroll');
    return () => {
      document.body.classList.remove('vocab-performance-scroll', 'is-smooth-scrolling');
    };
  }, []);

  const handleSelectCourse = (courseId: 'jpd113' | 'jpd123') => {
    setSelectedCourseId(courseId);
    localStorage.setItem('vocab_selected_course', courseId);
    setIsDropdownOpen(false);
    navigate(`/vocabulary/${courseId}`);
  };

  // Cấu hình thông tin giao diện cho từng khóa học
  const courseConfigs = {
    jpd113: {
      id: 'jpd113' as const,
      label: 'Bắt đầu học ngay (JPD113)',
      shortLabel: 'JPD113',
      subTitle: 'Nhập môn N5 • Minna 1-25',
      badge: 'N5',
      totalWords: '315+ từ vựng',
      gradient: 'from-rose-500 via-pink-500 to-amber-500',
      shadow: 'shadow-sm',
      border: 'border-rose-200 dark:border-rose-800',
      textAccent: 'text-rose-600 dark:text-rose-400',
      hoverBg: 'hover:bg-rose-50 dark:hover:bg-rose-950/40',
      iconColor: 'text-rose-500',
    },
    jpd123: {
      id: 'jpd123' as const,
      label: 'Bắt đầu học ngay (JPD123)',
      shortLabel: 'JPD123',
      subTitle: 'Sơ cấp N4 • Minna 26-50',
      badge: 'N4',
      totalWords: '270+ từ vựng',
      gradient: 'from-blue-600 via-sky-500 to-indigo-600',
      shadow: 'shadow-sm',
      border: 'border-blue-200 dark:border-blue-800',
      textAccent: 'text-blue-600 dark:text-blue-400',
      hoverBg: 'hover:bg-blue-50 dark:hover:bg-blue-950/40',
      iconColor: 'text-blue-500',
    },
  };

  const currentConfig = courseConfigs[selectedCourseId];
  const alternateCourseId: 'jpd113' | 'jpd123' = selectedCourseId === 'jpd113' ? 'jpd123' : 'jpd113';
  const alternateConfig = courseConfigs[alternateCourseId];

  // State cho Thẻ từ vựng hôm nay
  const [dailyIdx, setDailyIdx] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const currentDailyVocab = dailyVocabPool[dailyIdx];

  // Phát âm từ vựng bằng SpeechSynthesis
  const handleSpeak = (text: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.85;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  // Đổi từ vựng ngẫu nhiên
  const handleNextDailyVocab = () => {
    setIsSaved(false);
    setDailyIdx((prev) => (prev + 1) % dailyVocabPool.length);
  };

  return (
    <div className="vocab-main-surface space-y-8 pb-16 max-w-[1440px] mx-auto pt-1 font-sans">
      
      {/* ========================================================================= */}
      {/* 1. TOP HERO STAGE: KHO TÀNG TỪ VỰNG TIẾNG NHẬT - HỌC VUI NHỚ LÂU */}
      {/* ========================================================================= */}
      <div 
        className="smooth-panel relative overflow-visible rounded-[34px] bg-gradient-to-br from-rose-50/90 via-white to-amber-50/70 dark:from-slate-900 dark:via-slate-900/90 dark:to-rose-950/30 border border-rose-200/80 dark:border-slate-800 p-7 sm:p-9 shadow-sm flex flex-col justify-between"
      >
        {/* Ambient Glows */}
        <div className="pointer-events-none absolute -right-16 -top-16 w-56 h-56 rounded-full bg-rose-300/15 dark:bg-rose-600/5 blur-xl" />
        <div className="pointer-events-none absolute -left-16 -bottom-16 w-56 h-56 rounded-full bg-amber-300/15 dark:bg-amber-600/5 blur-xl" />

        {/* Cánh hoa anh đào trang trí */}
        <div className="absolute top-6 left-1/3 text-pink-400 text-sm pointer-events-none opacity-40">🌸</div>
        <div className="absolute bottom-8 right-1/4 text-rose-400 text-xs pointer-events-none opacity-35">🌸</div>

        <div className="relative z-30 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
          
          {/* Lời chào & Thống kê tiến độ (7 COLS) */}
          <div className="sm:col-span-7 space-y-3.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-rose-100 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300 border border-rose-200 dark:border-rose-800 shadow-xs">
              <BookMarked size={15} strokeWidth={2.2} className="text-rose-500" />
              Kho Tàng Từ Vựng Tiếng Nhật • 語彙の宝庫
            </div>

            <div className="space-y-1">
              <p className="text-xs sm:text-sm font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest font-jp">
                言葉を広げよう • 自信を持って話そう！
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                Kho Tàng Từ Vựng — <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500">
                  Học Vui Nhớ Lâu! 🌸
                </span>
              </h1>
            </div>

            <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 max-w-md leading-relaxed">
              Hệ thống 585+ từ vựng cốt lõi Minna no Nihongo chuẩn N5 & N4. Học qua Flashcard, phát âm giọng Tokyo và làm chủ ngữ cảnh.
            </p>

            {/* Quick Actions với Split Dropdown Button */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <div ref={dropdownRef} className="relative z-50 inline-flex items-stretch">
                {/* Nút chính */}
                <div
                  className={`inline-flex items-stretch rounded-2xl bg-gradient-to-r ${currentConfig.gradient} p-[1px] shadow-sm transition-colors duration-150`}
                >
                  {/* Nhánh trái: Điều hướng trực tiếp khóa học hiện tại */}
                  <button
                    onClick={() => navigate(`/vocabulary/${selectedCourseId}`)}
                    className="inline-flex items-center gap-2 rounded-l-2xl px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-black text-white cursor-pointer hover:bg-white/10 transition-colors"
                  >
                    <Zap size={16} strokeWidth={2.2} />
                    <span>{currentConfig.label}</span>
                  </button>

                  {/* Nhánh phải: Mũi tên mở Dropdown */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsDropdownOpen((prev) => !prev);
                    }}
                    className="inline-flex items-center justify-center rounded-r-2xl border-l border-white/25 px-2.5 text-white cursor-pointer hover:bg-white/20 transition-colors"
                    title="Chọn khóa học khác"
                    aria-label="Mở danh sách khóa học"
                  >
                    <ChevronDown
                      size={16}
                      strokeWidth={2.5}
                      className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                </div>

                {/* Dropdown Menu Chuyển Đổi Khóa Học (Nổi hoàn toàn trên lớp thống kê) */}
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.96 }}
                      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                      style={{ willChange: 'transform, opacity' }}
                      className="absolute left-0 top-full mt-2 w-[310px] sm:w-[330px] rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-2.5 shadow-md z-50 flex flex-col gap-1.5"
                    >
                      <div className="px-2.5 py-1 flex items-center justify-between text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        <span>Chuyển đổi khóa học</span>
                        <span className="text-[10px] font-bold text-slate-400">Từ vựng Minna</span>
                      </div>

                      {/* Thẻ khóa học đối ứng */}
                      <button
                        onClick={() => handleSelectCourse(alternateCourseId)}
                        className={`w-full text-left p-3 rounded-xl border ${alternateConfig.border} ${alternateConfig.hoverBg} transition-colors duration-150 cursor-pointer group flex items-center justify-between gap-3 bg-slate-50/90 dark:bg-slate-800/80`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`w-9 h-9 shrink-0 rounded-xl bg-gradient-to-br ${alternateConfig.gradient} flex items-center justify-center text-white shadow-xs`}>
                            <Zap size={16} strokeWidth={2.4} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs sm:text-sm font-black text-slate-900 dark:text-white group-hover:text-slate-950 dark:group-hover:text-white transition-colors truncate">
                              {alternateConfig.label}
                            </p>
                            <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 truncate">
                              {alternateConfig.subTitle}
                            </p>
                          </div>
                        </div>

                        <div className="shrink-0 flex items-center text-slate-400 group-hover:translate-x-0.5 transition-transform">
                          <ArrowRight size={15} strokeWidth={2.5} className={alternateConfig.textAccent} />
                        </div>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button 
                onClick={() => navigate('/games')}
                className="inline-flex items-center gap-2 rounded-2xl bg-white dark:bg-slate-800 px-4 py-2.5 text-xs sm:text-sm font-black text-slate-800 dark:text-slate-100 shadow-sm border border-slate-200 dark:border-slate-700 hover:border-rose-300 hover:text-rose-600 transition-colors duration-150 cursor-pointer"
              >
                <Gamepad2 size={16} strokeWidth={2.2} className="text-orange-500" />
                Game Ôn Từ Vựng
              </button>
            </div>
          </div>

          {/* Linh vật Cáo Kitsune Vui Vẻ (5 COLS) */}
          <div className="sm:col-span-5 flex justify-center items-center">
            <div className="scale-90 sm:scale-100">
              <JapaneseMascot 
                state="idle" 
                showSpeechBubble={true} 
                disableMotion
                customMessage="毎日少しずつ、語彙マスターになろう！ (Mỗi ngày một chút, cùng trở thành bậc thầy từ vựng nhé!)" 
              />
            </div>
          </div>

        </div>

        {/* Thanh Thống Kê Tổng Quan Gắn Ở Đáy Card */}
        <div className="relative z-10 mt-6 pt-5 border-t border-rose-200/60 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            
            {/* Tổng từ đã học */}
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-500 dark:text-rose-400 flex items-center justify-center border border-rose-200/80 dark:border-rose-800 shadow-xs">
                <BookOpen size={19} strokeWidth={2.2} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Tổng từ vựng</p>
                <p className="text-base font-black text-slate-900 dark:text-white flex items-center gap-1">
                  585 <span className="text-xs font-bold text-slate-400">từ</span>
                </p>
              </div>
            </div>

            {/* Đã thuộc */}
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-500 dark:text-emerald-400 flex items-center justify-center border border-emerald-200/80 dark:border-emerald-800 shadow-xs">
                <CheckCircle2 size={19} strokeWidth={2.2} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Đã thuộc làu</p>
                <p className="text-base font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  350 <span className="text-xs font-bold text-slate-400">/ 585</span>
                </p>
              </div>
            </div>

            {/* Streak */}
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-500 dark:text-amber-400 flex items-center justify-center border border-amber-200/80 dark:border-amber-800 shadow-xs">
                <Flame size={19} strokeWidth={2.2} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Chuỗi ngày học</p>
                <p className="text-base font-black text-amber-600 dark:text-amber-400">5 ngày 🔥</p>
              </div>
            </div>

          </div>

          {/* Tiến độ tổng thể */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              Tiến độ chung: <span className="font-black text-rose-600 dark:text-rose-400">60%</span>
            </span>
            <div className="w-28 h-2 rounded-full bg-slate-200/80 dark:bg-slate-800 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-rose-500 to-amber-500 rounded-full w-[60%]" />
            </div>
          </div>
        </div>
      </div>


      {/* ========================================================================= */}
      {/* 2. MAIN 2-COLUMN GRID (8 COLS CURRICULUM & PRACTICE + 4 COLS DAILY WIDGETS) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        
        {/* ========================================== */}
        {/* CỘT TRÁI (8 COLS): CURRICULUM + QUICK PRACTICE */}
        {/* ========================================== */}
        <div className="lg:col-span-8 space-y-7">
          
          {/* 1. KHÓA HỌC THEO GIÁO TRÌNH (JPD113 & JPD123) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2.5 tracking-tight">
                  <GraduationCap className="text-rose-500" size={26} strokeWidth={2.2} />
                  Lộ Trình Giáo Trình Minna no Nihongo
                </h2>
                <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 mt-0.5">
                  Chọn cấp độ sơ cấp để bắt đầu hành trình ghi nhớ từ vựng có hệ thống
                </p>
              </div>
            </div>

            {/* LƯỚI 2 THẺ KHÓA HỌC JPD113 & JPD123 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {curriculumCourses.map((course) => (
                <div
                  key={course.id}
                  onClick={() => navigate(course.route)}
                  className={`smooth-panel steady-scroll-row group relative overflow-hidden rounded-[32px] border bg-white dark:bg-slate-900 p-6 shadow-xs cursor-pointer flex flex-col justify-between transition-colors duration-150 ${course.cardBorder}`}
                >
                  {/* Background Illustration */}
                  <div
                    className="absolute inset-0 bg-[length:100%_auto] bg-top bg-no-repeat opacity-80 pointer-events-none dark:opacity-40"
                    style={{ backgroundImage: `url('${course.bgImage}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/70 to-white dark:from-slate-950/40 dark:via-slate-950/80 dark:to-slate-950 pointer-events-none" />
                  
                  {/* Watermark Kanji */}
                  <div className={`absolute -right-4 -bottom-6 font-jp text-[7rem] font-black ${course.accentText} opacity-[0.06] select-none pointer-events-none`}>
                    {course.kanaWatermark}
                  </div>

                  <div className="relative z-10 space-y-4 flex-1 flex flex-col justify-between">
                    
                    {/* Header Thẻ: Badges */}
                    <div className="flex items-start justify-between gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider font-jp ${course.tagClass}`}>
                        {course.jpBadge} • {course.levelBadge}
                      </span>
                      <span className="w-8 h-8 rounded-full bg-white/80 dark:bg-slate-800 shadow-xs border border-slate-200/60 dark:border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-rose-500 group-hover:border-rose-200 transition-colors">
                        <ArrowUpRight size={16} strokeWidth={2.2} />
                      </span>
                    </div>

                    {/* Tiêu đề & Thông tin */}
                    <div className="space-y-1">
                      <span className="text-xs font-black text-slate-400 uppercase tracking-widest font-mono">
                        {course.code}
                      </span>
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-snug">
                        {course.title}
                      </h3>
                      <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                        {course.subtitle}
                      </p>
                    </div>

                    {/* Thống kê bài học & từ vựng */}
                    <div className="grid grid-cols-2 gap-3 py-2 border-y border-slate-100 dark:border-slate-800">
                      <div className="p-2.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 text-center">
                        <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Số bài học</p>
                        <p className="text-lg font-black text-slate-900 dark:text-white flex items-center justify-center gap-1">
                          <BookOpen size={16} strokeWidth={2.2} className={course.accentText} />
                          {course.lessons} bài
                        </p>
                      </div>
                      <div className="p-2.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 text-center">
                        <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Số từ vựng</p>
                        <p className="text-lg font-black text-slate-900 dark:text-white flex items-center justify-center gap-1">
                          <BookMarked size={16} strokeWidth={2.2} className={course.accentText} />
                          {course.words} từ
                        </p>
                      </div>
                    </div>

                    {/* Thanh Tiến Độ */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-slate-500 dark:text-slate-400">Đã học {course.completedLessons}/{course.lessons} bài</span>
                        <span className={`font-black ${course.accentText}`}>{course.progress}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                        <div 
                          className={`h-full rounded-full bg-gradient-to-r ${course.progressBar}`}
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Action Button */}
                    <button 
                      className={`w-full py-3 rounded-2xl bg-gradient-to-r ${course.buttonGradient} text-white font-black text-sm shadow-sm flex items-center justify-center gap-2 transition-colors duration-150 cursor-pointer`}
                    >
                      <span>Vào học ngay</span>
                      <ArrowRight size={16} strokeWidth={2.2} className="group-hover:translate-x-1 transition-transform" />
                    </button>

                  </div>
                </div>
              ))}
            </div>
          </div>


          {/* 2. BỘ CÔNG CỤ LUYỆN TẬP TỪ VỰNG NHANH */}
          <div className="space-y-4 pt-2">
            <div className="px-1">
              <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2 tracking-tight">
                <Sparkles className="text-amber-500" size={22} strokeWidth={2.2} />
                Phương Pháp Luyện Tập Toàn Diện
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 mt-0.5">
                Đa dạng hóa cách tiếp cận giúp tăng tốc độ ghi nhớ gấp 3 lần
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Công cụ 1: Flashcard */}
              <div
                onClick={() => navigate('/vocabulary/jpd113')}
                className="group smooth-panel steady-scroll-row p-5 rounded-[28px] bg-gradient-to-br from-purple-50 to-pink-50/50 dark:from-purple-950/40 dark:to-pink-950/20 border border-purple-100 dark:border-purple-900/60 shadow-xs hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-[0_14px_30px_rgba(168,85,247,0.18)] dark:hover:shadow-[0_14px_30px_rgba(168,85,247,0.25)] hover:-translate-y-1.5 active:scale-[0.98] cursor-pointer space-y-3 transition-all duration-300 ease-out"
              >
                <div className="w-11 h-11 rounded-2xl bg-purple-500 text-white flex items-center justify-center shadow-md group-hover:scale-110 group-hover:-rotate-3 group-hover:shadow-purple-500/30 transition-transform duration-300 ease-out">
                  <Layers size={22} strokeWidth={2.2} />
                </div>
                <div>
                  <h4 className="font-black text-base text-slate-900 dark:text-white group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors duration-200">Flashcard Thông Minh</h4>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    Lật thẻ 2 mặt kèm phiên âm Furigana & ví dụ trực quan.
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-black text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                  Luyện ngay <ArrowRight size={13} strokeWidth={2.5} className="group-hover:translate-x-1.5 transition-transform duration-200 ease-out" />
                </span>
              </div>

              {/* Công cụ 2: Luyện Phản Xạ Kaiwa */}
              <div
                onClick={() => navigate('/speaking/jpd113/shadowing')}
                className="group smooth-panel steady-scroll-row p-5 rounded-[28px] bg-gradient-to-br from-blue-50 to-indigo-50/50 dark:from-blue-950/40 dark:to-indigo-950/20 border border-blue-100 dark:border-blue-900/60 shadow-xs hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-[0_14px_30px_rgba(59,130,246,0.18)] dark:hover:shadow-[0_14px_30px_rgba(59,130,246,0.25)] hover:-translate-y-1.5 active:scale-[0.98] cursor-pointer space-y-3 transition-all duration-300 ease-out"
              >
                <div className="w-11 h-11 rounded-2xl bg-blue-500 text-white flex items-center justify-center shadow-md group-hover:scale-110 group-hover:-rotate-3 group-hover:shadow-blue-500/30 transition-transform duration-300 ease-out">
                  <Headphones size={22} strokeWidth={2.2} />
                </div>
                <div>
                  <h4 className="font-black text-base text-slate-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-200">Phòng Luyện Phản Xạ</h4>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    Shadowing 1-1 với trợ lý AI và chấm điểm phát âm.
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-black text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                  Thực hành <ArrowRight size={13} strokeWidth={2.5} className="group-hover:translate-x-1.5 transition-transform duration-200 ease-out" />
                </span>
              </div>

              {/* Công cụ 3: Đấu Trường Game */}
              <div
                onClick={() => navigate('/games')}
                className="group smooth-panel steady-scroll-row p-5 rounded-[28px] bg-gradient-to-br from-amber-50 to-orange-50/50 dark:from-amber-950/40 dark:to-orange-950/20 border border-amber-100 dark:border-amber-900/60 shadow-xs hover:border-amber-300 dark:hover:border-amber-600 hover:shadow-[0_14px_30px_rgba(245,158,11,0.18)] dark:hover:shadow-[0_14px_30px_rgba(245,158,11,0.25)] hover:-translate-y-1.5 active:scale-[0.98] cursor-pointer space-y-3 transition-all duration-300 ease-out"
              >
                <div className="w-11 h-11 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md group-hover:scale-110 group-hover:-rotate-3 group-hover:shadow-amber-500/30 transition-transform duration-300 ease-out">
                  <Gamepad2 size={22} strokeWidth={2.2} />
                </div>
                <div>
                  <h4 className="font-black text-base text-slate-900 dark:text-white group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors duration-200">Đấu Trường Game</h4>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    Vừa chơi 6 mini-game vừa tích lũy Xu thưởng đổi quà.
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-black text-amber-600 dark:text-amber-400 group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
                  Vào chơi <ArrowRight size={13} strokeWidth={2.5} className="group-hover:translate-x-1.5 transition-transform duration-200 ease-out" />
                </span>
              </div>

            </div>
          </div>

        </div>


        {/* ========================================== */}
        {/* CỘT PHẢI (4 COLS): DAILY VOCAB FLASHCARD + MEMORY TRACKER */}
        {/* ========================================== */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* WIDGET 1: THẺ TỪ VỰNG NỔI BẬT HÔM NAY */}
          <div 
            className="smooth-panel rounded-[32px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-5"
          >
            {/* Header Widget */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-500 flex items-center justify-center">
                  <Sparkles size={17} strokeWidth={2.2} />
                </span>
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    Từ Vựng Hôm Nay
                  </h3>
                  <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                    Cấp độ {currentDailyVocab.level}
                  </p>
                </div>
              </div>

              <button 
                onClick={handleNextDailyVocab}
                title="Đổi từ khác"
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-rose-500 flex items-center justify-center cursor-pointer transition-colors duration-150"
              >
                <RotateCcw size={15} strokeWidth={2.2} />
              </button>
            </div>

            {/* Thẻ Từ Vựng Chính */}
            <div className="relative overflow-hidden rounded-[26px] bg-gradient-to-br from-rose-50/60 via-pink-50/30 to-amber-50/40 dark:from-slate-800/80 dark:via-slate-800/50 dark:to-rose-950/30 border border-rose-100/90 dark:border-slate-700/80 p-6 text-center space-y-4">
              
              {/* Furigana + Chữ Hán */}
              <div className="space-y-1">
                <p className="text-xs font-black text-rose-600 dark:text-rose-400 font-jp tracking-widest">
                  {currentDailyVocab.hiragana} ({currentDailyVocab.romaji})
                </p>
                <h4 className="text-4xl font-black text-slate-900 dark:text-white font-jp tracking-tight">
                  {currentDailyVocab.kanji}
                </h4>
                <p className="text-xs font-black text-slate-500 dark:text-slate-400 tracking-wider">
                  [{currentDailyVocab.hanViet}]
                </p>
              </div>

              {/* Nghĩa & Từ loại */}
              <div className="py-2.5 px-4 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-rose-100/80 dark:border-slate-800 shadow-xs inline-block max-w-full">
                <p className="text-sm font-black text-slate-800 dark:text-slate-100">
                  {currentDailyVocab.meaning}
                </p>
                <span className="text-[10px] font-bold text-slate-400 block mt-0.5">
                  {currentDailyVocab.type}
                </span>
              </div>

              {/* Nút phát âm to nổi bật */}
              <div className="flex items-center justify-center gap-3 pt-1">
                <button 
                  onClick={() => handleSpeak(currentDailyVocab.hiragana || currentDailyVocab.kanji)}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl font-black text-xs shadow-sm transition-colors duration-150 cursor-pointer ${
                    isSpeaking 
                      ? 'bg-rose-600 text-white' 
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:text-rose-600 border border-slate-200 dark:border-slate-700 shadow-xs'
                  }`}
                >
                  <Volume2 size={16} strokeWidth={2.2} className={isSpeaking ? 'text-white' : 'text-rose-500'} />
                  <span>{isSpeaking ? 'Đang phát âm...' : 'Nghe phát âm chuẩn'}</span>
                </button>

                <button 
                  onClick={() => setIsSaved(!isSaved)}
                  className={`p-2.5 rounded-2xl border transition-colors duration-150 cursor-pointer ${
                    isSaved 
                      ? 'bg-amber-100 dark:bg-amber-950 border-amber-300 text-amber-600' 
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 hover:text-amber-500'
                  }`}
                  title={isSaved ? 'Đã lưu vào sổ tay' : 'Lưu từ vựng này'}
                >
                  {isSaved ? <BookmarkCheck size={18} strokeWidth={2.2} /> : <Bookmark size={18} strokeWidth={2.2} />}
                </button>
              </div>

              {/* Ví dụ minh họa */}
              <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 text-left space-y-1">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Ví dụ ngữ cảnh:</p>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 font-jp leading-relaxed">
                  {currentDailyVocab.exampleJp}
                </p>
                <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  {currentDailyVocab.exampleVi}
                </p>
              </div>

            </div>
          </div>


          {/* WIDGET 2: HIỆU SUẤT TRÍ NHỚ (SPACED REPETITION TRACKER) */}
          <div 
            className="smooth-panel rounded-[32px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3.5">
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Brain size={19} strokeWidth={2.2} className="text-purple-500" />
                Hiệu Suất Ghi Nhớ
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                Tốt (92%)
              </span>
            </div>

            <div className="space-y-3">
              {/* Stat 1 */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
                    <Check size={16} strokeWidth={2.4} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Từ vựng đã thuộc</p>
                    <p className="text-[10px] font-semibold text-slate-400">Ghi nhớ dài hạn</p>
                  </div>
                </div>
                <span className="text-base font-black text-emerald-600 dark:text-emerald-400">350 từ</span>
              </div>

              {/* Stat 2 */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center">
                    <RotateCcw size={16} strokeWidth={2.4} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Từ cần ôn lại</p>
                    <p className="text-[10px] font-semibold text-slate-400">Theo chu kỳ quên</p>
                  </div>
                </div>
                <span className="text-base font-black text-amber-600 dark:text-amber-400">42 từ</span>
              </div>
            </div>

            <button 
              onClick={() => navigate('/vocabulary/jpd113')}
              className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-purple-50 hover:text-purple-600 dark:hover:bg-purple-950/60 dark:hover:text-purple-300 text-xs font-black text-slate-700 dark:text-slate-300 transition-colors duration-150 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Zap size={14} strokeWidth={2.2} className="text-purple-500" />
              Ôn tập 42 từ ngay hôm nay
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
