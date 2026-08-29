import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, Play, BookOpen, Brain, Mic, 
  ArrowRight, Zap, BookMarked, Target,
  Flame, Clock, CheckCircle2, ChevronRight,
  Volume2, RotateCcw, Keyboard, Compass,
  Crown, Layers, Sparkle, ArrowUpRight, GraduationCap,
  Gamepad2, Trophy
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

// Dữ liệu Kanji nổi bật mỗi ngày (Daily Featured Kanji)
const dailyKanjiList = [
  {
    kanji: '学',
    hanViet: 'HỌC',
    meaning: 'Học tập, trường học',
    onyomi: 'ガク (gaku)',
    kunyomi: 'まな・ぶ (mana-bu)',
    example: '学生 (がくせい) - Học sinh',
    level: 'N5',
    tagBg: 'bg-gradient-to-r from-blue-500/15 to-indigo-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/20'
  },
  {
    kanji: '桜',
    hanViet: 'ANH',
    meaning: 'Hoa anh đào',
    onyomi: 'オウ (ou)',
    kunyomi: 'さくら (sakura)',
    example: '桜の花 (さくらのはな) - Hoa anh đào',
    level: 'N4',
    tagBg: 'bg-gradient-to-r from-pink-500/15 to-rose-500/15 text-pink-600 dark:text-pink-400 border border-pink-500/20'
  },
  {
    kanji: '語',
    hanViet: 'NGỮ',
    meaning: 'Ngôn ngữ, lời nói',
    onyomi: 'ゴ (go)',
    kunyomi: 'かた・る (kata-ru)',
    example: '日本語 (にほんご) - Tiếng Nhật',
    level: 'N5',
    tagBg: 'bg-gradient-to-r from-emerald-500/15 to-teal-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
  },
  {
    kanji: '道',
    hanViet: 'ĐẠO',
    meaning: 'Con đường, đạo lý',
    onyomi: 'ドウ (dou)',
    kunyomi: 'みち (michi)',
    example: '帰り道 (かえりみち) - Đường về',
    level: 'N5',
    tagBg: 'bg-gradient-to-r from-amber-500/15 to-orange-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20'
  }
];

// Khóa học / Lộ trình đề xuất
const curatedPathways = [
  {
    id: 'jpd113',
    title: 'Tiếng Nhật Sơ Cấp 1 (N5)',
    subtitle: 'Nhập môn bài 1 - 25 Minna no Nihongo',
    level: 'N5',
    category: 'n5',
    progress: 68,
    totalLessons: 25,
    completedLessons: 17,
    route: '/vocabulary/jpd113',
    borderGlow: 'hover:border-blue-400/60 dark:hover:border-blue-500/60 hover:shadow-[0_16px_40px_rgba(59,130,246,0.12)]',
    accentColor: 'text-blue-600 dark:text-blue-400',
    tagColor: 'bg-blue-100/90 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300 border border-blue-200/50 dark:border-blue-700/50',
    barGradient: 'from-blue-500 via-sky-400 to-indigo-500 shadow-[0_0_12px_rgba(59,130,246,0.5)]',
    image: '/images/bg-jpd113-vocab.png'
  },
  {
    id: 'jpd123',
    title: 'Tiếng Nhật Sơ Cấp 2 (N4)',
    subtitle: 'Nâng cao bài 26 - 50 Minna no Nihongo',
    level: 'N4',
    category: 'n4',
    progress: 24,
    totalLessons: 25,
    completedLessons: 6,
    route: '/vocabulary/jpd123',
    borderGlow: 'hover:border-rose-400/60 dark:hover:border-rose-500/60 hover:shadow-[0_16px_40px_rgba(244,63,94,0.12)]',
    accentColor: 'text-rose-600 dark:text-rose-400',
    tagColor: 'bg-rose-100/90 text-rose-700 dark:bg-rose-900/60 dark:text-rose-300 border border-rose-200/50 dark:border-rose-700/50',
    barGradient: 'from-rose-500 via-pink-400 to-red-500 shadow-[0_0_12px_rgba(244,63,94,0.5)]',
    image: '/images/bg-jpd123-vocab.png'
  },
  {
    id: 'speaking-kaiwa',
    title: 'Luyện Phản Xạ & Giao Tiếp Thực Tế',
    subtitle: 'Phòng AI Shadowing chấm điểm 1-1',
    level: 'Kaiwa',
    category: 'kaiwa',
    progress: 45,
    totalLessons: 15,
    completedLessons: 7,
    route: '/speaking/jpd113/shadowing',
    borderGlow: 'hover:border-purple-400/60 dark:hover:border-purple-500/60 hover:shadow-[0_16px_40px_rgba(168,85,247,0.14)]',
    accentColor: 'text-purple-600 dark:text-purple-400',
    tagColor: 'bg-purple-100/90 text-purple-700 dark:bg-purple-900/60 dark:text-purple-300 border border-purple-200/50 dark:border-purple-700/50',
    barGradient: 'from-purple-500 via-fuchsia-400 to-violet-500 shadow-[0_0_12px_rgba(168,85,247,0.5)]',
    image: '/images/hero-landing.png'
  }
];

// Mẹo học tiếng Nhật thú vị
const tipsList = [
  {
    id: 1,
    tag: 'Ngữ pháp',
    title: 'Phân biệt trợ từ 「は」 và 「が」 dễ hiểu nhất',
    desc: '「は」 dùng để nhấn mạnh thông tin ở vế sau vị ngữ, còn 「が」 nhấn mạnh chính xác chủ thể đứng ngay trước nó.',
    icon: <Brain size={18} />,
    color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    topBorder: 'from-emerald-400 to-teal-500'
  },
  {
    id: 2,
    tag: 'Phát âm',
    title: 'Bí quyết phát âm chuẩn âm ngắt 「っ」 (Sokuon)',
    desc: 'Hãy giữ hơi và dừng lại 1 nhịp ở cuống họng trước khi bật âm tiếp theo, ví dụ 「きって」 (kitte - tem thư).',
    icon: <Mic size={18} />,
    color: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
    topBorder: 'from-purple-400 to-fuchsia-500'
  },
  {
    id: 3,
    tag: 'Ghi nhớ',
    title: 'Học Kanji hiệu quả qua câu chuyện Bộ thủ',
    desc: 'Ghép các bộ thủ có ý nghĩa lại với nhau sẽ giúp não bộ ghi nhớ mặt chữ lâu hơn gấp 3 lần so với viết chép thông thường.',
    icon: <Sparkles size={18} />,
    color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    topBorder: 'from-amber-400 to-orange-500'
  }
];

export const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // State cho Widget Kanji hôm nay
  const [currentKanjiIdx, setCurrentKanjiIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [pathwayTab, setPathwayTab] = useState<'all' | 'n5' | 'n4' | 'kaiwa'>('all');

  const currentKanji = dailyKanjiList[currentKanjiIdx];

  // Phát âm chữ Kanji
  const handleSpeak = (text: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  };

  const handleNextKanji = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(false);
    setCurrentKanjiIdx((prev) => (prev + 1) % dailyKanjiList.length);
  };

  const filteredPathways = pathwayTab === 'all' 
    ? curatedPathways 
    : curatedPathways.filter(p => p.category === pathwayTab);

  // Lấy ảnh nền welcome banner nếu có
  const welcomeImages = import.meta.glob('../../assets/images/welcome/*', { eager: true, import: 'default' });
  const imageUrls = Object.values(welcomeImages) as string[];
  const bgUrl = imageUrls.length > 0 ? imageUrls[0] : '/images/backgrounds/typing-bg.jpg';

  return (
    <div className="space-y-10 pb-16 max-w-[1440px] mx-auto pt-1">

      {/* ========================================================================= */}
      {/* 1. HERO BANNER: ÁNH SÁNG ĐIỆN ẢNH, WATERMARK THƯ PHÁP VÀ GLASS STATS */}
      {/* ========================================================================= */}
      <motion.div 
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ willChange: 'transform, opacity', transform: 'translateZ(0)' }}
        className="relative overflow-hidden rounded-[36px] bg-slate-950 border border-slate-800/90 shadow-[0_25px_60px_rgba(0,0,0,0.35)] min-h-[390px] lg:min-h-[420px] flex flex-col justify-between"
      >
        {/* Ảnh nền với hiệu ứng Cinematic Overlay */}
        {bgUrl && (
          <img 
            src={bgUrl} 
            alt="Hero Banner" 
            className="absolute inset-0 w-full h-full object-cover object-[center_35%] scale-105 opacity-65 pointer-events-none"
          />
        )}

        {/* Ambient Glow Orbs & Gradient Mesh (GPU-Only) */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-orange-500/25 blur-3xl" />
        <div className="pointer-events-none absolute left-1/3 top-10 h-64 w-64 rounded-full bg-rose-500/18 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-purple-600/20 blur-3xl" />

        {/* Thư pháp chìm tiếng Nhật tạo chiều sâu nghệ thuật (Kanji Artistic Watermark) */}
        <div className="pointer-events-none absolute right-12 top-6 select-none font-jp text-[140px] lg:text-[180px] font-black leading-none text-white/[0.04] dark:text-white/[0.03]">
          日本語
        </div>

        {/* Gradient overlays bảo vệ độ tương phản chữ */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/98 via-slate-950/80 to-slate-950/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />

        {/* Nội dung chính trong Hero Banner */}
        <div className="relative z-10 p-8 md:p-12 lg:p-14 flex-1 flex flex-col justify-center max-w-3xl">
          
          {/* Badge trạng thái học viên */}
          <div className="flex flex-wrap items-center gap-2.5 mb-5">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-gradient-to-r from-orange-500/25 to-rose-500/25 text-orange-300 border border-orange-400/30 backdrop-blur-xl shadow-[0_4px_16px_rgba(249,115,22,0.2)]">
              <Sparkles size={14} className="text-orange-400 animate-pulse" />
              Lộ trình tiếng Nhật JPD113 & JPD123 cá nhân hóa
            </span>

            {user?.hasPremium ? (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black tracking-wide bg-gradient-to-r from-amber-400/25 to-yellow-500/25 text-amber-300 border border-amber-400/40 backdrop-blur-xl shadow-[0_4px_16px_rgba(251,191,36,0.25)]">
                <Crown size={14} className="text-amber-400" />
                PREMIUM VIP
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-200 bg-white/10 border border-white/15 backdrop-blur-xl">
                Tài khoản Học viên
              </span>
            )}
          </div>

          {/* Lời chào mừng tiếng Nhật sang trọng */}
          <h1 className="text-3xl md:text-5xl lg:text-[54px] font-black tracking-tight text-white mb-3 font-jp leading-[1.12] drop-shadow-sm">
            おかえりなさい、<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-rose-400">{user?.fullName || 'bạn học'}</span>！
          </h1>

          <p className="text-base md:text-lg text-slate-200 font-semibold mb-8 leading-relaxed max-w-xl">
            Tiếp tục chinh phục tiếng Nhật mỗi ngày với nhịp học nhẹ nhàng, hiệu quả và phản xạ tự nhiên.
          </p>

          {/* Action buttons (Tactile Spring Buttons) */}
          <div className="flex flex-wrap items-center gap-4">
            <motion.button 
              onClick={() => navigate('/vocabulary/jpd113')}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="group relative overflow-hidden bg-gradient-to-r from-orange-500 via-rose-500 to-pink-500 text-white px-8 py-3.5 rounded-full font-black shadow-[0_12px_32px_rgba(249,115,22,0.38)] hover:shadow-[0_16px_40px_rgba(249,115,22,0.55)] transition-shadow flex items-center gap-2.5 text-sm md:text-base border border-orange-400/30 cursor-pointer"
            >
              {/* Shimmer light sweep */}
              <div className="pointer-events-none absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shine" />
              <Play size={18} className="fill-white" />
              Tiếp tục bài học N5
              <ArrowRight size={17} className="transition-transform group-hover:translate-x-1.5" />
            </motion.button>

            <motion.button 
              onClick={() => navigate('/speaking/jpd113/shadowing')}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/25 backdrop-blur-2xl px-6 py-3.5 rounded-full font-black transition-colors flex items-center gap-2.5 text-sm md:text-base shadow-sm hover:border-white/40 cursor-pointer"
            >
              <Mic size={18} className="text-purple-400" />
              Luyện nói AI Shadowing
            </motion.button>
          </div>
        </div>

        {/* Thanh Widget chỉ số học tập gắn ở chân Hero (Floating Glass Stats Bar) */}
        <div className="relative z-10 border-t border-white/15 bg-slate-950/75 backdrop-blur-2xl px-8 py-4.5 grid grid-cols-2 sm:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          
          <div className="group flex items-center gap-3.5 py-1 transition-transform">
            <div className="w-11 h-11 rounded-2xl bg-orange-500/20 border border-orange-500/30 text-orange-400 flex items-center justify-center shrink-0 shadow-[0_0_16px_rgba(249,115,22,0.25)] group-hover:scale-105 transition-transform">
              <Flame size={23} className="animate-bounce" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-300">Chuỗi ngày học</p>
              <p className="text-base font-black text-white tracking-tight">7 Ngày liên tiếp</p>
            </div>
          </div>

          <div className="group flex items-center gap-3.5 py-1 sm:pl-5 transition-transform">
            <div className="w-11 h-11 rounded-2xl bg-rose-500/20 border border-rose-500/30 text-rose-400 flex items-center justify-center shrink-0 shadow-[0_0_16px_rgba(244,63,94,0.25)] group-hover:scale-105 transition-transform">
              <BookOpen size={21} />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-300">Từ vựng đã thuộc</p>
              <p className="text-base font-black text-white tracking-tight">142 Từ</p>
            </div>
          </div>

          <div className="group flex items-center gap-3.5 py-1 sm:pl-5 transition-transform">
            <div className="w-11 h-11 rounded-2xl bg-purple-500/20 border border-purple-500/30 text-purple-400 flex items-center justify-center shrink-0 shadow-[0_0_16px_rgba(168,85,247,0.25)] group-hover:scale-105 transition-transform">
              <Sparkle size={21} />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-300">Điểm phát âm AI</p>
              <p className="text-base font-black text-white tracking-tight">92% Chuẩn</p>
            </div>
          </div>

          <div className="group flex items-center gap-3.5 py-1 sm:pl-5 transition-transform">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0 shadow-[0_0_16px_rgba(16,185,129,0.25)] group-hover:scale-105 transition-transform">
              <Clock size={21} />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-300">Thời gian tuần này</p>
              <p className="text-base font-black text-white tracking-tight">4.5 Giờ</p>
            </div>
          </div>

        </div>
      </motion.div>


      {/* ========================================================================= */}
      {/* 2. BENTO GRID ARCHITECTURE: 5 KỸ NĂNG TRỌNG TÂM (BLUEPRINT 3: SMOOTH ELEVATED CARDS) */}
      {/* ========================================================================= */}
      <section className="space-y-5">
        <div className="flex items-center justify-between px-1">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2.5 tracking-tight">
              <Compass className="text-orange-500" size={26} />
              Trung Tâm Học Tập (Learning Hub)
            </h2>
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mt-0.5">
              Truy cập nhanh vào toàn bộ kỹ năng trọng tâm và công cụ luyện tập
            </p>
          </div>
        </div>

        {/* Layout Bento Grid Đa Dạng Kích Thước Với GPU Composited Surfaces */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

          {/* BENTO CARD 1: TỪ VỰNG (VOCABULARY) */}
          <motion.div 
            whileHover={{ y: -6, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
            whileTap={{ scale: 0.99 }}
            style={{ willChange: 'transform', transform: 'translateZ(0)' }}
            onClick={() => navigate('/vocabulary')}
            className="group relative overflow-hidden rounded-[30px] border border-rose-100/90 dark:border-rose-950/70 bg-gradient-to-br from-rose-50/80 via-white to-white dark:from-rose-950/25 dark:via-slate-900 dark:to-slate-900 p-6 shadow-[0_8px_30px_rgba(244,63,94,0.04)] hover:shadow-[0_20px_45px_rgba(244,63,94,0.12)] cursor-pointer flex flex-col justify-between ring-1 ring-inset ring-white/80 dark:ring-white/5"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-rose-400/15 to-orange-400/10 rounded-full blur-2xl pointer-events-none group-hover:scale-130 transition-transform duration-500" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 text-white flex items-center justify-center shadow-[0_10px_25px_rgba(244,63,94,0.35)] group-hover:scale-105 group-hover:rotate-3 transition-transform">
                  <BookOpen size={24} />
                </div>
                <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300 border border-rose-200/60 dark:border-rose-800/60 shadow-sm">
                  1,200+ Từ N5-N4
                </span>
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors flex items-center gap-1.5 tracking-tight">
                Từ vựng (単語)
                <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 font-semibold leading-relaxed">
                Ghi nhớ từ vựng qua Flashcard thông minh, trắc nghiệm và hình ảnh sinh động.
              </p>
            </div>

            {/* Shortcuts con */}
            <div className="mt-6 pt-4 border-t border-rose-100/90 dark:border-slate-800/80 flex items-center justify-between text-xs font-extrabold text-rose-600 dark:text-rose-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} /> Flashcard • Trắc nghiệm • Gõ phím
              </span>
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>


          {/* BENTO CARD 2: HÁN TỰ (KANJI) */}
          <motion.div 
            whileHover={{ y: -6, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
            whileTap={{ scale: 0.99 }}
            style={{ willChange: 'transform', transform: 'translateZ(0)' }}
            onClick={() => navigate('/kanji')}
            className="group relative overflow-hidden rounded-[30px] border border-blue-100/90 dark:border-blue-950/70 bg-gradient-to-br from-blue-50/80 via-white to-white dark:from-blue-950/25 dark:via-slate-900 dark:to-slate-900 p-6 shadow-[0_8px_30px_rgba(59,130,246,0.04)] hover:shadow-[0_20px_45px_rgba(59,130,246,0.12)] cursor-pointer flex flex-col justify-between ring-1 ring-inset ring-white/80 dark:ring-white/5"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-400/15 to-indigo-400/10 rounded-full blur-2xl pointer-events-none group-hover:scale-130 transition-transform duration-500" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-[0_10px_25px_rgba(59,130,246,0.35)] group-hover:scale-105 group-hover:rotate-3 transition-transform">
                  <BookMarked size={24} />
                </div>
                <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60 shadow-sm">
                  512 Chữ Hán
                </span>
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center gap-1.5 tracking-tight">
                Hán tự Kanji (漢字)
                <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 font-semibold leading-relaxed">
                Học theo bộ thủ, nét bút thứ tự chuẩn, âm Hán Việt và ví dụ ngữ cảnh.
              </p>
            </div>

            {/* Shortcuts con */}
            <div className="mt-6 pt-4 border-t border-blue-100/90 dark:border-slate-800/80 flex items-center justify-between text-xs font-extrabold text-blue-600 dark:text-blue-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} /> Bộ thủ • Quy tắc bút thuận • Flashcard
              </span>
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>


          {/* BENTO CARD 3: NGỮ PHÁP (GRAMMAR LAB) */}
          <motion.div 
            whileHover={{ y: -6, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
            whileTap={{ scale: 0.99 }}
            style={{ willChange: 'transform', transform: 'translateZ(0)' }}
            onClick={() => navigate('/grammar')}
            className="group relative overflow-hidden rounded-[30px] border border-emerald-100/90 dark:border-emerald-950/70 bg-gradient-to-br from-emerald-50/80 via-white to-white dark:from-emerald-950/25 dark:via-slate-900 dark:to-slate-900 p-6 shadow-[0_8px_30px_rgba(16,185,129,0.04)] hover:shadow-[0_20px_45px_rgba(16,185,129,0.12)] cursor-pointer flex flex-col justify-between ring-1 ring-inset ring-white/80 dark:ring-white/5"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-emerald-400/15 to-teal-400/10 rounded-full blur-2xl pointer-events-none group-hover:scale-130 transition-transform duration-500" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 text-white flex items-center justify-center shadow-[0_10px_25px_rgba(16,185,129,0.35)] group-hover:scale-105 group-hover:rotate-3 transition-transform">
                  <Brain size={24} />
                </div>
                <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60 shadow-sm">
                  50 Bài Minna
                </span>
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors flex items-center gap-1.5 tracking-tight">
                Ngữ pháp (文法)
                <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 font-semibold leading-relaxed">
                Hệ thống cấu trúc mẫu câu chi tiết, phân tích điểm ngữ pháp và bài tập luyện tập.
              </p>
            </div>

            {/* Shortcuts con */}
            <div className="mt-6 pt-4 border-t border-emerald-100/90 dark:border-slate-800/80 flex items-center justify-between text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} /> Cấu trúc mẫu • Giải thích • Ví dụ
              </span>
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>


          {/* BENTO CARD 4: LUYỆN NÓI AI SHADOWING (DOUBLE FEATURE CARD) */}
          <motion.div 
            whileHover={{ y: -6, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
            whileTap={{ scale: 0.99 }}
            style={{ willChange: 'transform', transform: 'translateZ(0)' }}
            onClick={() => navigate('/speaking/jpd113/shadowing')}
            className="group relative overflow-hidden rounded-[30px] border border-purple-200/90 dark:border-purple-900/70 bg-gradient-to-br from-purple-500/12 via-violet-500/6 to-white dark:from-purple-950/40 dark:via-slate-900 dark:to-slate-900 p-6 md:col-span-2 shadow-[0_8px_30px_rgba(168,85,247,0.06)] hover:shadow-[0_20px_45px_rgba(168,85,247,0.15)] cursor-pointer flex flex-col justify-between ring-1 ring-inset ring-white/80 dark:ring-white/5"
          >
            <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-gradient-to-br from-purple-500/20 to-fuchsia-500/15 rounded-full blur-3xl pointer-events-none group-hover:scale-120 transition-transform duration-500" />
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-purple-600 via-violet-600 to-fuchsia-600 text-white flex items-center justify-center shadow-[0_10px_28px_rgba(168,85,247,0.4)] group-hover:scale-105 transition-transform">
                    <Mic size={24} />
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Công nghệ nhận diện giọng nói
                    </span>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2 mt-0.5 tracking-tight">
                      Phòng Luyện Nói AI (シャドーイング)
                      <ArrowUpRight size={20} className="opacity-0 group-hover:opacity-100 transition-opacity text-purple-600" />
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-gradient-to-r from-purple-100 to-fuchsia-100 dark:from-purple-900/60 dark:to-fuchsia-900/60 text-purple-700 dark:text-purple-300 px-4 py-1.5 rounded-full text-xs font-black border border-purple-200/80 dark:border-purple-700/80 shadow-sm">
                  <Sparkles size={14} className="text-purple-500 dark:text-purple-400" /> AI Chấm Điểm 1-1
                </div>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 font-semibold max-w-xl leading-relaxed mt-2">
                Thực hành Shadowing theo giọng người bản xứ. AI nhận diện từng từ, sửa ngữ điệu, trường âm và phát âm sai tức thì.
              </p>

              {/* Sóng âm GPU-Accelerated (ScaleY Compositor Animation - 0 Layout Reflows) */}
              <div className="flex items-center gap-2 mt-5 h-9">
                <div className="flex items-end gap-1.5 h-8">
                  {[8, 16, 24, 12, 28, 18, 32, 14, 22, 10, 26, 15, 30, 12, 20].map((h, idx) => (
                    <motion.div
                      key={idx}
                      animate={{ scaleY: [0.28, 1, 0.28] }}
                      transition={{ repeat: Infinity, duration: 1.15, delay: idx * 0.07, ease: "easeInOut" }}
                      style={{ 
                        height: `${h}px`, 
                        transformOrigin: 'bottom',
                        willChange: 'transform', 
                        transform: 'translateZ(0)' 
                      }}
                      className="w-1.5 rounded-full bg-gradient-to-t from-violet-600 via-purple-500 to-pink-400 shadow-[0_0_8px_rgba(168,85,247,0.35)]"
                    />
                  ))}
                </div>
                <span className="text-xs font-extrabold text-purple-600 dark:text-purple-400 ml-3 flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-purple-500 animate-ping" />
                  Sẵn sàng luyện tập ngay
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-purple-100/90 dark:border-slate-800/80 flex items-center justify-between text-xs font-extrabold text-purple-600 dark:text-purple-400">
              <span>Shadowing 5 bài học chuẩn • Đọc từng từ • Nhận diện giọng nói</span>
              <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Vào phòng luyện nói <ArrowRight size={14} />
              </span>
            </div>
          </motion.div>


          {/* BENTO CARD 5: THI THỬ JLPT (EXAM HUB) */}
          <motion.div 
            whileHover={{ y: -6, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
            whileTap={{ scale: 0.99 }}
            style={{ willChange: 'transform', transform: 'translateZ(0)' }}
            onClick={() => navigate('/exam')}
            className="group relative overflow-hidden rounded-[30px] border border-amber-100/90 dark:border-amber-950/70 bg-gradient-to-br from-amber-50/80 via-white to-white dark:from-amber-950/25 dark:via-slate-900 dark:to-slate-900 p-6 shadow-[0_8px_30px_rgba(245,158,11,0.04)] hover:shadow-[0_20px_45px_rgba(245,158,11,0.12)] cursor-pointer flex flex-col justify-between ring-1 ring-inset ring-white/80 dark:ring-white/5"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-amber-400/15 to-yellow-400/10 rounded-full blur-2xl pointer-events-none group-hover:scale-130 transition-transform duration-500" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-[0_10px_25px_rgba(245,158,11,0.35)] group-hover:scale-105 group-hover:rotate-3 transition-transform">
                  <Target size={24} />
                </div>
                <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/60 shadow-sm">
                  Chuẩn đề JLPT
                </span>
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors flex items-center gap-1.5 tracking-tight">
                Thi Thử JPD113 & JPD123 (模擬試験)
                <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 font-semibold leading-relaxed">
                Thi thử tính giờ như thi thật: Từ vựng, Chữ Hán, Ngữ pháp và Đọc hiểu.
              </p>
            </div>

            {/* Shortcuts con */}
            <div className="mt-6 pt-4 border-t border-amber-100/90 dark:border-slate-800/80 flex items-center justify-between text-xs font-extrabold text-amber-600 dark:text-amber-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} /> Mini Test 15p • Full Mock JPD113 & JPD123
              </span>
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* 3. INTERACTIVE SECTION: WIDGET KANJI HÔM NAY & BẢNG CHỮ CÁI TIỆN ÍCH */}
      {/* ========================================================================= */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* WIDGET 1: KANJI HÔM NAY (FLIP CARD TƯƠNG TÁC PHONG CÁCH WASHI) */}
        <div className="lg:col-span-1 flex flex-col">
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="font-black text-xl text-slate-900 dark:text-slate-100 flex items-center gap-2 tracking-tight">
              <Sparkles size={20} className="text-amber-500" />
              Kanji Hôm Nay
            </h3>
            <motion.button 
              onClick={handleNextKanji}
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.94 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="text-xs font-black text-orange-600 dark:text-orange-400 hover:text-orange-700 flex items-center gap-1.5 bg-orange-500/15 hover:bg-orange-500/20 border border-orange-500/30 px-3 py-1.5 rounded-xl transition-colors shadow-sm cursor-pointer"
            >
              <RotateCcw size={13} /> Đổi chữ khác
            </motion.button>
          </div>

          <motion.div 
            onClick={() => setIsFlipped(!isFlipped)}
            whileHover={{ y: -5, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
            whileTap={{ scale: 0.99 }}
            style={{ willChange: 'transform', transform: 'translateZ(0)' }}
            className="group relative flex-1 min-h-[270px] rounded-[30px] border border-slate-200/80 dark:border-slate-800 bg-gradient-to-b from-white via-orange-50/20 to-white dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-900 p-6 shadow-sm hover:shadow-xl cursor-pointer flex flex-col justify-between select-none ring-1 ring-inset ring-white/80 dark:ring-white/5"
          >
            {/* Hoa văn hình học mờ phong cách Nhật Bản */}
            <div className="pointer-events-none absolute right-4 top-4 w-32 h-32 rounded-full border border-orange-200/40 dark:border-orange-500/10 opacity-40" />
            <div className="pointer-events-none absolute right-8 top-8 w-24 h-24 rounded-full border border-orange-200/40 dark:border-orange-500/10 opacity-30" />

            {/* Tag Level */}
            <div className="relative z-10 flex items-center justify-between">
              <span className={`text-xs font-black uppercase px-3 py-1.5 rounded-lg ${currentKanji.tagBg}`}>
                Cấp độ {currentKanji.level}
              </span>
              <motion.button 
                onClick={(e) => handleSpeak(currentKanji.kanji, e)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-orange-500 hover:text-white flex items-center justify-center transition-colors shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md cursor-pointer"
                title="Nghe phát âm"
              >
                <Volume2 size={17} />
              </motion.button>
            </div>

            {/* Nội dung Mặt Trước / Mặt Sau (Smooth Flip Transition) */}
            <AnimatePresence mode="wait">
              {!isFlipped ? (
                <motion.div 
                  key="front"
                  initial={{ opacity: 0, scale: 0.94, y: 6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: -6 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  style={{ willChange: 'transform, opacity', transform: 'translateZ(0)' }}
                  className="my-auto text-center py-2 relative z-10"
                >
                  <span className="text-7xl font-black font-jp text-slate-900 dark:text-white tracking-wider block drop-shadow-[0_4px_10px_rgba(0,0,0,0.08)]">
                    {currentKanji.kanji}
                  </span>
                  <p className="text-base font-black uppercase tracking-[0.3em] text-orange-500 mt-2">
                    {currentKanji.hanViet}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-bold">
                    (Nhấp thẻ để lật xem Onyomi / Kunyomi)
                  </p>
                </motion.div>
              ) : (
                <motion.div 
                  key="back"
                  initial={{ opacity: 0, scale: 0.94, y: 6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: -6 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  style={{ willChange: 'transform, opacity', transform: 'translateZ(0)' }}
                  className="my-auto space-y-2.5 py-2 text-left relative z-10"
                >
                  <p className="text-sm font-black text-slate-900 dark:text-white">
                    Ý nghĩa: <span className="text-orange-500 font-black">{currentKanji.meaning}</span>
                  </p>
                  <div className="text-xs space-y-1.5 text-slate-800 dark:text-slate-100 font-mono font-bold">
                    <p><span className="font-black text-slate-950 dark:text-white">On:</span> {currentKanji.onyomi}</p>
                    <p><span className="font-black text-slate-950 dark:text-white">Kun:</span> {currentKanji.kunyomi}</p>
                  </div>
                  <div className="mt-2 p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 text-xs text-slate-900 dark:text-slate-100 font-bold">
                    <span className="font-black text-orange-500">Ví dụ:</span> {currentKanji.example}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative z-10 text-center text-xs font-black text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-3">
              {isFlipped ? 'Nhấp để quay lại mặt trước' : 'Nhấp để xem chi tiết âm đọc'}
            </div>
          </motion.div>
        </div>


        {/* WIDGET 2: BỘ CÔNG CỤ NHẬP MÔN & LUYỆN TẬP NHANH (3 CARDS) */}
        <div className="lg:col-span-2 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="font-black text-xl text-slate-900 dark:text-slate-100 flex items-center gap-2 tracking-tight">
              <Layers size={20} className="text-blue-500" />
              Công Cụ Nhập Môn & Luyện Tập Nhanh
            </h3>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              3 Công cụ luyện tập
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
            
            {/* THẺ 1: LUYỆN GÕ PHÍM 10 NGÓN (TYPING) */}
            <motion.div 
              onClick={() => navigate('/introduction/typing')}
              whileHover={{ y: -5, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
              whileTap={{ scale: 0.98 }}
              style={{ willChange: 'transform', transform: 'translateZ(0)' }}
              className="group relative overflow-hidden rounded-[28px] border border-indigo-100/90 dark:border-indigo-950/70 bg-gradient-to-br from-indigo-50/50 via-white to-white dark:from-indigo-950/20 dark:via-slate-900 dark:to-slate-900 p-5 sm:p-5.5 shadow-sm hover:shadow-xl cursor-pointer flex flex-col justify-between ring-1 ring-inset ring-white/80 dark:ring-white/5"
            >
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 text-white flex items-center justify-center shadow-[0_8px_20px_rgba(99,102,241,0.3)] group-hover:scale-105 transition-transform">
                  <Keyboard size={22} />
                </div>
                {/* Mini Visual Keyboard keys */}
                <div className="flex items-center gap-1 text-[11px] font-mono font-black text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/15 px-2.5 py-1 rounded-lg border border-indigo-200 dark:border-indigo-800 shadow-sm">
                  <span>[A]</span><span>[I]</span><span>[U]</span>
                </div>
              </div>
              <div className="my-3.5">
                <h4 className="font-black text-lg text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors tracking-tight">
                  Luyện Gõ Phím
                </h4>
                <p className="text-xs text-slate-700 dark:text-slate-200 mt-1 leading-relaxed font-bold">
                  Rèn luyện phản xạ gõ Romaji sang Kana thần tốc không cần nhìn phím.
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs font-black text-indigo-600 dark:text-indigo-400 pt-1">
                Gõ phím ngay <ArrowRight size={13} className="group-hover:translate-x-1.5 transition-transform" />
              </div>
            </motion.div>

            {/* THẺ 2: HỌC BẢNG CHỮ CÁI QUA HÌNH ẢNH (MNEMONICS) */}
            <motion.div 
              onClick={() => navigate('/introduction/mnemonic')}
              whileHover={{ y: -5, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
              whileTap={{ scale: 0.98 }}
              style={{ willChange: 'transform', transform: 'translateZ(0)' }}
              className="group relative overflow-hidden rounded-[28px] border border-pink-100/90 dark:border-pink-950/70 bg-gradient-to-br from-pink-50/50 via-white to-white dark:from-pink-950/20 dark:via-slate-900 dark:to-slate-900 p-5 sm:p-5.5 shadow-sm hover:shadow-xl cursor-pointer flex flex-col justify-between ring-1 ring-inset ring-white/80 dark:ring-white/5"
            >
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 text-white flex items-center justify-center shadow-[0_8px_20px_rgba(244,63,94,0.3)] group-hover:scale-105 transition-transform">
                  <Sparkles size={22} />
                </div>
                <span className="text-[11px] font-black text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-500/15 px-2.5 py-1 rounded-full border border-pink-200 dark:border-pink-800 shadow-sm">
                  Siêu Trí Nhớ
                </span>
              </div>
              <div className="my-3.5">
                <h4 className="font-black text-lg text-slate-900 dark:text-white group-hover:text-pink-600 transition-colors tracking-tight">
                  Hình Ảnh Mnemonics
                </h4>
                <p className="text-xs text-slate-700 dark:text-slate-200 mt-1 leading-relaxed font-bold">
                  Thuộc lòng 46 chữ cái Hiragana & Katakana qua phương pháp liên tưởng.
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs font-black text-pink-600 dark:text-pink-400 pt-1">
                Xem hình ảnh <ArrowRight size={13} className="group-hover:translate-x-1.5 transition-transform" />
              </div>
            </motion.div>

            {/* THẺ 3: TRÒ CHƠI & MINI-GAME THỬ THÁCH (GAMES) */}
            <motion.div 
              onClick={() => navigate('/games')}
              whileHover={{ y: -5, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
              whileTap={{ scale: 0.98 }}
              style={{ willChange: 'transform', transform: 'translateZ(0)' }}
              className="group relative overflow-hidden rounded-[28px] border border-amber-100/90 dark:border-amber-950/70 bg-gradient-to-br from-amber-50/50 via-white to-white dark:from-amber-950/20 dark:via-slate-900 dark:to-slate-900 p-5 sm:p-5.5 shadow-sm hover:shadow-xl cursor-pointer flex flex-col justify-between ring-1 ring-inset ring-white/80 dark:ring-white/5"
            >
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-[0_8px_20px_rgba(245,158,11,0.3)] group-hover:scale-105 group-hover:rotate-6 transition-transform">
                  <Gamepad2 size={22} />
                </div>
                <span className="text-[11px] font-black text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/15 px-2.5 py-1 rounded-full border border-amber-200 dark:border-amber-800 shadow-sm flex items-center gap-1">
                  <Trophy size={11} /> Mini-Game
                </span>
              </div>
              <div className="my-3.5">
                <h4 className="font-black text-lg text-slate-900 dark:text-white group-hover:text-amber-600 transition-colors tracking-tight">
                  Trò Chơi Thử Thách
                </h4>
                <p className="text-xs text-slate-700 dark:text-slate-200 mt-1 leading-relaxed font-bold">
                  Đố vui ghép chữ, tính điểm combo và đua tốc độ phản xạ nhận diện mặt chữ.
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs font-black text-amber-600 dark:text-amber-400 pt-1">
                Chơi game ngay <ArrowRight size={13} className="group-hover:translate-x-1.5 transition-transform" />
              </div>
            </motion.div>

          </div>
        </div>

      </section>


      {/* ========================================================================= */}
      {/* 4. LỘ TRÌNH KHÁM PHÁ ĐA TẦNG (CURATED LEARNING PATHWAYS VỚI SHARED LAYOUT TABS) */}
      {/* ========================================================================= */}
      <section className="space-y-6 pt-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-1">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2.5 tracking-tight">
              <GraduationCap className="text-orange-500" size={26} />
              Lộ Trình Đề Xuất Theo Cấp Độ
            </h2>
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mt-0.5">
              Chọn cấp độ phù hợp để tiếp tục lộ trình học có cấu trúc
            </p>
          </div>

          {/* Shared Layout Tabs Filter (Theo chuẩn SMOOTH_SCROLL_PLAN.md) */}
          <div className="flex items-center gap-1 p-1 bg-slate-100/90 dark:bg-slate-800/90 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 text-xs self-start sm:self-auto">
            {(
              [
                { id: 'all', label: 'Tất cả' },
                { id: 'n5', label: 'N5 Sơ cấp 1' },
                { id: 'n4', label: 'N4 Sơ cấp 2' },
                { id: 'kaiwa', label: 'Kaiwa Giao tiếp' }
              ] as const
            ).map((tab) => {
              const isActive = pathwayTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setPathwayTab(tab.id)}
                  className={`relative px-4 py-2 rounded-xl transition-colors font-bold z-10 cursor-pointer ${
                    isActive 
                      ? 'text-slate-900 dark:text-white font-black' 
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-pathway-tab-indicator"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                      style={{ willChange: 'transform', transform: 'translateZ(0)' }}
                      className="absolute inset-0 rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-200/60 dark:border-slate-700/60 -z-10"
                    />
                  )}
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Danh sách thẻ bài học phong cách Magazine Card với Framer Motion layout transition */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredPathways.map((item) => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
                whileTap={{ scale: 0.99 }}
                style={{ willChange: 'transform', transform: 'translateZ(0)' }}
                onClick={() => navigate(item.route)}
                className={`group overflow-hidden rounded-[30px] border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-2xl cursor-pointer flex flex-col justify-between ring-1 ring-inset ring-white/80 dark:ring-white/5 ${item.borderGlow}`}
              >
                {/* Header ảnh bìa */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                  
                  <span className={`absolute top-4 left-4 text-xs font-black uppercase px-3.5 py-1.5 rounded-full shadow-lg backdrop-blur-md ${item.tagColor}`}>
                    {item.level}
                  </span>

                  <div className="absolute bottom-3.5 left-4 right-4 text-white">
                    <h4 className="font-black text-lg leading-snug drop-shadow-md">{item.title}</h4>
                  </div>
                </div>

                {/* Thông tin tiến độ bài học */}
                <div className="p-6 space-y-4">
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold line-clamp-2 leading-relaxed">
                    {item.subtitle}
                  </p>

                  {/* Progress bar with Neon Glow */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-700 dark:text-slate-300">Tiến độ</span>
                      <span className={item.accentColor}>{item.completedLessons}/{item.totalLessons} bài ({item.progress}%)</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden p-[1px]">
                      <div 
                        className={`h-full rounded-full bg-gradient-to-r ${item.barGradient}`}
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-500 dark:text-slate-400">Tự động lưu tiến độ</span>
                    <span className={`flex items-center gap-1 ${item.accentColor} group-hover:translate-x-1.5 transition-transform`}>
                      Học tiếp ngay <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </section>


      {/* ========================================================================= */}
      {/* 5. GÓC MẸO HỌC & CÂU CHUYỆN VĂN HÓA (BITE-SIZED TIPS) */}
      {/* ========================================================================= */}
      <section className="space-y-4 pt-2">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-bold text-xl text-slate-900 dark:text-slate-100 flex items-center gap-2 tracking-tight">
            <Zap size={22} className="text-indigo-500" fill="currentColor" />
            Mẹo Học & Lưu Ý Ngữ Pháp
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {tipsList.map((tip) => (
            <motion.div 
              key={tip.id}
              whileHover={{ y: -4, transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } }}
              style={{ willChange: 'transform', transform: 'translateZ(0)' }}
              className="relative overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 rounded-[26px] shadow-sm hover:shadow-lg flex flex-col justify-between ring-1 ring-inset ring-white/80 dark:ring-white/5"
            >
              {/* Dải màu trang trí phía trên thẻ */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${tip.topBorder}`} />

              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <span className="text-xs font-black uppercase text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-900">
                    {tip.tag}
                  </span>
                  <div className={`w-8 h-8 rounded-xl ${tip.color} flex items-center justify-center border shadow-sm`}>
                    {tip.icon}
                  </div>
                </div>
                <h4 className="font-bold text-base text-slate-800 dark:text-slate-100 mb-2 leading-snug">
                  {tip.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-semibold">
                  {tip.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 6. FOOTER */}
      {/* ========================================================================= */}
      <footer className="pt-12 pb-4 flex flex-col items-center justify-center border-t border-slate-200/60 dark:border-slate-800/80">
        <div className="flex flex-col items-center gap-2.5 text-center">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Logo" className="w-6 h-6 object-contain" onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} />
            <span className="text-sm font-black tracking-wider text-slate-800 dark:text-slate-200">JP FORUS</span>
          </div>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Nền tảng học tiếng Nhật thông minh với lộ trình tinh gọn và phản xạ tự nhiên.
          </p>
          <p className="text-[11px] font-black text-slate-400 tracking-wider mt-1">
            © 2026 JP FORUS • All rights reserved
          </p>
        </div>
      </footer>

    </div>
  );
};
