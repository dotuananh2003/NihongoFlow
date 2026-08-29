import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Gamepad2, Trophy, Sparkles, Zap, Flame, 
  Crown, Play, CheckCircle2,
  Clock, Volume2, Shield, Gem, Star,
  Swords, X, RotateCcw, Award, Check, Lock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { JapaneseMascot } from '../../components/mascot/JapaneseMascot';
import { WordFallModal } from '../../components/Games/WordFallModal';

// Định nghĩa dữ liệu các chế độ trò chơi tiếng Nhật
interface GameMode {
  id: string;
  title: string;
  jpTitle: string;
  subtitle: string;
  category: 'reflex' | 'memory' | 'listening' | 'kanji';
  badge: string;
  isFeatured?: boolean;
  image: string;
  coinsReward: number;
  xpReward: number;
  playersCount: string;
  accentGradient: string;
  tagColor: string;
}

const gameModesList: GameMode[] = [
  {
    id: 'speed-quiz',
    title: 'Chớp Nhoáng 60 Giây',
    jpTitle: '60秒スピードクイズ',
    subtitle: 'Trả lời nhanh trắc nghiệm từ vựng & ngữ pháp Minna; tích lũy Combo x1.5, x2.0.',
    category: 'reflex',
    badge: 'NỔI BẬT',
    isFeatured: true,
    image: '/images/games/game-speed-quiz-kitsune.jpg',
    coinsReward: 25,
    xpReward: 50,
    playersCount: '2.4k người đang chơi',
    accentGradient: 'from-amber-500 via-orange-500 to-rose-500',
    tagColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-200 dark:border-amber-800'
  },
  {
    id: 'kanji-match',
    title: 'Lật Thẻ Trí Nhớ Hán Tự',
    jpTitle: '漢字神経衰弱',
    subtitle: 'Lật mở các thẻ bài trùng khớp Chữ Hán với Âm Hán Việt, Nghĩa và Furigana.',
    category: 'kanji',
    badge: 'NỔI BẬT',
    isFeatured: true,
    image: '/images/games/game-kanji-match-kitsune.jpg',
    coinsReward: 30,
    xpReward: 60,
    playersCount: '1.8k người đang chơi',
    accentGradient: 'from-rose-500 via-pink-500 to-purple-500',
    tagColor: 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 border-rose-200 dark:border-rose-800'
  },
  {
    id: 'typing-rush',
    title: 'Gõ Romaji Tốc Độ',
    jpTitle: 'タイピング疾風',
    subtitle: 'Từ vựng & Kana xuất hiện, gõ Romaji sang Hiragana/Katakana thần tốc tính WPM.',
    category: 'reflex',
    badge: 'LUYỆN TẬP',
    image: '/images/games/game-typing-kitsune.jpg',
    coinsReward: 20,
    xpReward: 40,
    playersCount: '3.1k người đang chơi',
    accentGradient: 'from-blue-500 via-indigo-500 to-sky-500',
    tagColor: 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border-blue-200 dark:border-blue-800'
  },
  {
    id: 'word-fall',
    title: 'Thác Từ Vựng & Mưa Kana',
    jpTitle: '言葉の滝',
    subtitle: 'Chữ rơi như mưa hoa anh đào — chọn hoặc gõ nghĩa đúng trước khi chạm đất.',
    category: 'reflex',
    badge: 'NỔI BẬT',
    isFeatured: true,
    image: '/images/games/game-wordfall-kitsune.jpg',
    coinsReward: 25,
    xpReward: 45,
    playersCount: '1.5k người đang chơi',
    accentGradient: 'from-pink-500 via-rose-400 to-orange-400',
    tagColor: 'bg-pink-100 text-pink-800 dark:bg-pink-950/80 dark:text-pink-300 border-pink-200 dark:border-pink-800'
  },
  {
    id: 'listening-guess',
    title: 'Nghe Đoán Chữ & Âm Điệu',
    jpTitle: '耳利きクイズ',
    subtitle: 'Lắng nghe giọng đọc chuẩn Tokyo và chọn đúng chữ/nghĩa. Tối đa 3 lần sai!',
    category: 'listening',
    badge: 'LUYỆN TAI',
    image: '/images/games/game-listening-kitsune.jpg',
    coinsReward: 35,
    xpReward: 70,
    playersCount: '1.2k người đang chơi',
    accentGradient: 'from-purple-500 via-violet-500 to-fuchsia-500',
    tagColor: 'bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300 border-purple-200 dark:border-purple-800'
  },
  {
    id: 'sakura-collect',
    title: 'Thu Thập Hoa Anh Đào',
    jpTitle: 'サクラ集め',
    subtitle: 'Phản xạ nhanh tay bắt đúng các cánh hoa anh đào mang ký tự Kana được yêu cầu.',
    category: 'memory',
    badge: 'THƯ GIÃN',
    image: '/images/games/game-wordfall-kitsune.jpg',
    coinsReward: 20,
    xpReward: 35,
    playersCount: '980 người đang chơi',
    accentGradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    tagColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
  }
];

// Mẫu câu hỏi đố vui chớp nhoáng (Speed Quiz Questions)
const speedQuizQuestions = [
  {
    question: 'Từ nào sau đây có nghĩa là "Học sinh"?',
    options: ['せんせい', 'がくせい', 'かいしゃいん', 'いしゃ'],
    correct: 1,
    kanji: '学生'
  },
  {
    question: 'Chữ Hán 「桜」 có âm Hán Việt là gì?',
    options: ['ANH', 'HOA', 'QUẢ', 'MỘC'],
    correct: 0,
    kanji: '桜 (さくら)'
  },
  {
    question: 'Cách đọc đúng của từ 「日本語」 là gì?',
    options: ['にほんご', 'にっぽんじん', 'えいご', 'ちゅうごくご'],
    correct: 0,
    kanji: '日本語'
  },
  {
    question: 'Trợ từ nào dùng để chỉ địa điểm diễn ra hành động?',
    options: ['に', 'で', 'へ', 'を'],
    correct: 1,
    kanji: 'Trợ từ で'
  },
  {
    question: 'Từ 「ともだち」 viết bằng Hán tự là chữ nào?',
    options: ['友達', '家族', '先生', '医者'],
    correct: 0,
    kanji: '友達 (Bạn bè)'
  }
];

interface DailyQuestItem {
  id: number;
  title: string;
  progress: number;
  target: number;
  reward: number;
  claimed: boolean;
}

const DEFAULT_DAILY_QUESTS: DailyQuestItem[] = [
  { id: 1, title: 'Chơi 2 trò chơi bất kỳ', progress: 2, target: 2, reward: 10, claimed: false },
  { id: 2, title: 'Đạt 300 điểm trong một ván', progress: 300, target: 300, reward: 15, claimed: false },
  { id: 3, title: 'Đạt 600 điểm trong một ván', progress: 450, target: 600, reward: 20, claimed: false },
  { id: 4, title: 'Trả lời đúng 10 câu liên tiếp', progress: 7, target: 10, reward: 25, claimed: false }
];

const getTodayDateKey = (): string => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const getInitialDailyQuests = (): DailyQuestItem[] => {
  try {
    const raw = localStorage.getItem('jp_daily_quests_data_v1');
    const todayKey = getTodayDateKey();
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.dateKey === todayKey && Array.isArray(parsed.quests)) {
        return parsed.quests;
      }
    }
    const initialData = {
      dateKey: todayKey,
      quests: DEFAULT_DAILY_QUESTS
    };
    localStorage.setItem('jp_daily_quests_data_v1', JSON.stringify(initialData));
    return DEFAULT_DAILY_QUESTS;
  } catch (err) {
    return DEFAULT_DAILY_QUESTS;
  }
};

export const GamesHub = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'all' | 'reflex' | 'memory' | 'listening' | 'kanji'>('all');
  const [userCoins, setUserCoins] = useState<number>(() => {
    const saved = localStorage.getItem('jp_user_coins');
    return saved ? parseInt(saved, 10) : 150;
  });

  // State cho Modal Mini-Game Chớp Nhoáng 60s
  const [isPlayingSpeedQuiz, setIsPlayingSpeedQuiz] = useState(false);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizCombo, setQuizCombo] = useState(0);
  const [quizTimeLeft, setQuizTimeLeft] = useState(60);
  const [quizFinished, setQuizFinished] = useState(false);

  // State cho Modal Đấu Trường PK 1v1
  const [isMatchingPK, setIsMatchingPK] = useState(false);
  const [pkMatchFound, setPkMatchFound] = useState(false);

  // State cho Modal Hướng Dẫn Chơi
  const [showGuideModal, setShowGuideModal] = useState(false);

  // State cho Modal Thác Từ Vựng & Mưa Kana
  const [showWordFallModal, setShowWordFallModal] = useState(false);

  // Nhiệm vụ hàng ngày được lưu trữ bền vững theo ngày (Daily Persistent State)
  const [quests, setQuests] = useState<DailyQuestItem[]>(() => getInitialDailyQuests());

  // Đồng hồ đếm ngược giờ làm mới nhiệm vụ hàng ngày (Tự động reset khi chạm 00:00:00)
  const [countdown, setCountdown] = useState('00:00:00');
  useEffect(() => {
    const updateCountdownAndCheckReset = () => {
      const now = new Date();
      const hours = 23 - now.getHours();
      const minutes = 59 - now.getMinutes();
      const seconds = 59 - now.getSeconds();
      
      const formatted = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      setCountdown(formatted);

      // Kiểm tra nếu đã hết thời gian reset (bước sang ngày mới)
      const todayKey = getTodayDateKey();
      try {
        const raw = localStorage.getItem('jp_daily_quests_data_v1');
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed && parsed.dateKey !== todayKey) {
            const newDayData = {
              dateKey: todayKey,
              quests: DEFAULT_DAILY_QUESTS
            };
            localStorage.setItem('jp_daily_quests_data_v1', JSON.stringify(newDayData));
            setQuests(DEFAULT_DAILY_QUESTS);
          }
        }
      } catch (e) {
        // ignore
      }
    };

    updateCountdownAndCheckReset();
    const timer = setInterval(updateCountdownAndCheckReset, 1000);
    return () => clearInterval(timer);
  }, []);

  // Countdown timer cho mini-game chớp nhoáng
  useEffect(() => {
    let timer: any;
    if (isPlayingSpeedQuiz && quizTimeLeft > 0 && !quizFinished) {
      timer = setInterval(() => {
        setQuizTimeLeft((prev) => {
          if (prev <= 1) {
            setQuizFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlayingSpeedQuiz, quizTimeLeft, quizFinished]);

  // Xử lý trả lời câu hỏi trong mini-game
  const handleAnswerQuiz = (chosenIdx: number) => {
    const isCorrect = chosenIdx === speedQuizQuestions[quizIdx].correct;
    if (isCorrect) {
      const newCombo = quizCombo + 1;
      setQuizCombo(newCombo);
      const points = 100 * (1 + newCombo * 0.2);
      setQuizScore((prev) => Math.round(prev + points));
    } else {
      setQuizCombo(0);
    }

    if (quizIdx + 1 < speedQuizQuestions.length) {
      setQuizIdx((prev) => prev + 1);
    } else {
      setQuizFinished(true);
      // Thưởng xu
      const earnedCoins = 15;
      setUserCoins((prev) => {
        const next = prev + earnedCoins;
        localStorage.setItem('jp_user_coins', next.toString());
        return next;
      });
    }
  };

  // Khởi tạo lại mini-game
  const startSpeedQuiz = () => {
    setQuizIdx(0);
    setQuizScore(0);
    setQuizCombo(0);
    setQuizTimeLeft(60);
    setQuizFinished(false);
    setIsPlayingSpeedQuiz(true);
  };

  // Nhận thưởng nhiệm vụ: Lưu vĩnh viễn trạng thái đã nhận vào localStorage cho đến hết ngày
  const handleClaimQuest = (questId: number, reward: number) => {
    const todayKey = getTodayDateKey();
    setQuests((prev) => {
      const updated = prev.map((q) => (q.id === questId ? { ...q, claimed: true } : q));
      try {
        localStorage.setItem('jp_daily_quests_data_v1', JSON.stringify({
          dateKey: todayKey,
          quests: updated
        }));
      } catch (e) {}
      return updated;
    });

    setUserCoins((prev) => {
      const next = prev + reward;
      localStorage.setItem('jp_user_coins', next.toString());
      return next;
    });
  };

  // Lọc danh sách game theo tab
  const filteredGames = activeTab === 'all' 
    ? gameModesList 
    : gameModesList.filter((g) => g.category === activeTab);

  return (
    <div className="space-y-8 pb-16 max-w-[1440px] mx-auto pt-1 font-sans">
      
      {/* ========================================================================= */}
      {/* 2-COLUMN UNIFIED GAME HUB LAYOUT (8 COLS MAIN ARENA + 4 COLS SIDEBAR) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        
        {/* ========================================== */}
        {/* CỘT TRÁI (8 COLS): HERO BANNER + 1V1 ARENA + GAME CATALOG */}
        {/* ========================================== */}
        <div className="lg:col-span-8 space-y-7">
          
          {/* 1. TOP HERO BANNER (HỌC MÀ CHƠI - CHƠI MÀ GIỎI & THỐNG KÊ HÔM NAY) */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ willChange: 'transform, opacity', transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
            className="game-hub-card relative overflow-hidden rounded-[34px] bg-gradient-to-br from-orange-50/90 via-white to-pink-50/70 dark:from-slate-900 dark:via-slate-900/90 dark:to-orange-950/30 border border-orange-200/80 dark:border-slate-800 p-7 sm:p-8 shadow-[0_16px_45px_rgba(251,146,60,0.12)] flex flex-col justify-between"
          >
            {/* Ambient Glows */}
            <div className="fixed-bg-plane pointer-events-none absolute -right-16 -top-16 w-56 h-56 rounded-full bg-orange-300/35 dark:bg-orange-600/15 blur-3xl" />
            <div className="fixed-bg-plane pointer-events-none absolute -left-16 -bottom-16 w-56 h-56 rounded-full bg-pink-300/30 dark:bg-pink-600/10 blur-3xl" />

            {/* Cánh hoa anh đào trang trí */}
            <div className="absolute top-6 left-1/2 text-pink-400 text-sm animate-sakura-1 pointer-events-none opacity-60">🌸</div>
            <div className="absolute bottom-8 right-1/3 text-rose-400 text-xs animate-sakura-2 pointer-events-none opacity-50">🌸</div>

            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              {/* Lời chào & Nút Hướng Dẫn (7 COLS) */}
              <div className="sm:col-span-7 space-y-3.5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-orange-100 text-orange-700 dark:bg-orange-950/80 dark:text-orange-300 border border-orange-200 dark:border-orange-800 shadow-xs">
                  <Gamepad2 size={15} strokeWidth={2.2} className="text-orange-500" />
                  Đấu Trường Trò Chơi Tiếng Nhật
                </div>

                <div className="space-y-1">
                  <p className="text-xs sm:text-sm font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest font-jp">
                    遊びながら学ぶ • 楽しく上達！
                  </p>
                  <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                    Học mà chơi — <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-rose-500 to-pink-500">
                      Chơi mà giỏi! 🎉
                    </span>
                  </h1>
                </div>

                <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 max-w-md leading-relaxed">
                  Vừa chơi game vừa ôn tập Hiragana, Katakana, Từ vựng & Hán tự. Tích lũy Xu thưởng đổi quà và thăng hạng!
                </p>

                <div className="pt-1">
                  <motion.button 
                    onClick={() => setShowGuideModal(true)}
                    whileHover={{ scale: 1.03, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="inline-flex items-center gap-2 rounded-2xl bg-white dark:bg-slate-800 px-5 py-2.5 text-xs sm:text-sm font-black text-slate-800 dark:text-slate-100 shadow-sm border border-slate-200 dark:border-slate-700 hover:border-orange-300 hover:text-orange-600 transition-colors cursor-pointer"
                  >
                    <Sparkles size={16} strokeWidth={2.2} className="text-amber-500" />
                    Hướng dẫn chơi & Thưởng Xu
                  </motion.button>
                </div>
              </div>

              {/* Linh vật Cáo Kitsune Vua Game (5 COLS) */}
              <div className="sm:col-span-5 flex justify-center items-center">
                <div className="scale-90 sm:scale-95">
                  <JapaneseMascot 
                    state="idle" 
                    showSpeechBubble={true} 
                    customMessage="一緒にゲームしよう！ (Cùng chơi game với tớ nhé!)" 
                  />
                </div>
              </div>
            </div>

            {/* Widget Thống kê phần thưởng hôm nay gắn ở đáy Card */}
            <div className="relative z-10 mt-6 pt-5 border-t border-orange-200/60 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                {/* Kỷ lục */}
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-500 dark:text-amber-400 flex items-center justify-center border border-amber-200/80 dark:border-amber-800 shadow-xs">
                    <Trophy size={19} strokeWidth={2.2} />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Tổng kỷ lục</p>
                    <p className="text-base font-black text-slate-900 dark:text-white flex items-center gap-1">
                      1,420 <Star size={14} strokeWidth={2.2} className="text-amber-500 fill-none" />
                    </p>
                  </div>
                </div>

                {/* Xu đang có */}
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-500 dark:text-purple-400 flex items-center justify-center border border-purple-200/80 dark:border-purple-800 shadow-xs">
                    <Gem size={19} strokeWidth={2.2} />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Xu đang có</p>
                    <p className="text-base font-black text-purple-600 dark:text-purple-400 flex items-center gap-1">
                      {userCoins} <Gem size={14} strokeWidth={2.2} className="text-purple-500" />
                    </p>
                  </div>
                </div>

                {/* Cấp độ */}
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-500 dark:text-rose-400 flex items-center justify-center border border-rose-200/80 dark:border-rose-800 shadow-xs">
                    <Shield size={19} strokeWidth={2.2} />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Cấp độ</p>
                    <p className="text-base font-black text-rose-600 dark:text-rose-400">Cấp 3 • Kitsune</p>
                  </div>
                </div>
              </div>

              {/* Tiến độ ngày */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  <span className="font-black text-orange-600 dark:text-orange-400">2/6</span> trò đã chơi hôm nay
                </span>
                <div className="w-24 h-2 rounded-full bg-slate-200/80 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-orange-500 to-pink-500 rounded-full w-1/3" />
                </div>
              </div>
            </div>
          </motion.div>


          {/* 2. BANNER ĐẤU TRƯỜNG PK TIẾNG NHẬT (FEATURED BATTLE ARENA) */}
          <motion.div 
            whileHover={{ y: -4, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
            style={{ willChange: 'transform', transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
            className="game-hub-card relative overflow-hidden rounded-[32px] border border-orange-200/90 dark:border-orange-950/80 bg-slate-950 text-white shadow-xl group"
          >
            {/* Ảnh nền Samurai vs Ninja Kitsune */}
            <img 
              src="/images/games/pk-kitsune-battle.jpg" 
              alt="1v1 Battle Arena" 
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
            />
            {/* Gradient phủ bảo vệ chữ */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />

            <div className="relative z-10 p-7 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="space-y-2 max-w-md">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase bg-red-500/20 text-red-400 border border-red-500/40 backdrop-blur-md">
                  <Swords size={14} strokeWidth={2.2} className="text-red-400 animate-pulse" />
                  Đấu Trường Trực Tiếp 1v1
                </div>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-jp">
                  Đấu trường PK tiếng Nhật (1v1 バトル)
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-slate-300 leading-relaxed">
                  Đấu trực tiếp 1v1 với người chơi khác hoặc thách đấu AI Kitsune — ai nhanh và chuẩn xác hơn sẽ thắng!
                </p>
              </div>

              <button 
                disabled
                className="shrink-0 flex items-center gap-2.5 rounded-2xl bg-slate-800/80 px-7 py-4 text-sm sm:text-base font-black text-slate-400 cursor-not-allowed border border-slate-700/50 backdrop-blur-md"
              >
                <Lock size={18} strokeWidth={2.2} />
                <span>Sắp ra mắt</span>
              </button>
            </div>
          </motion.div>


          {/* 3. BỘ LỌC CHẾ ĐỘ CHƠI & LƯỚI THẺ GAME */}
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-1">
              <div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2.5 tracking-tight">
                  <Gamepad2 className="text-orange-500" size={26} strokeWidth={2.2} />
                  Chọn Chế Độ Chơi (ゲームモード)
                </h2>
                <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 mt-0.5">
                  Lựa chọn thể loại luyện tập ưa thích: Phản xạ nhanh, Trí nhớ hay Nghe hiểu
                </p>
              </div>

              {/* Shared Layout Tabs Filter */}
              <div className="flex items-center gap-1 p-1 bg-slate-100/90 dark:bg-slate-800/90 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 text-xs self-start sm:self-auto">
                {(
                  [
                    { id: 'all', label: 'Tất cả', icon: Sparkles },
                    { id: 'reflex', label: 'Phản xạ', icon: Zap },
                    { id: 'memory', label: 'Ghi nhớ', icon: Flame },
                    { id: 'listening', label: 'Nghe hiểu', icon: Volume2 },
                    { id: 'kanji', label: 'Hán tự', icon: Crown }
                  ] as const
                ).map((tab) => {
                  const isActive = activeTab === tab.id;
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-colors font-bold z-10 cursor-pointer ${
                        isActive 
                          ? 'text-slate-900 dark:text-white font-black' 
                          : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="active-game-tab-indicator"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                          style={{ willChange: 'transform', transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
                          className="absolute inset-0 rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-200/60 dark:border-slate-700/60 -z-10"
                        />
                      )}
                      <Icon size={14} strokeWidth={2.2} className={isActive ? 'text-orange-500' : ''} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* LƯỚI THẺ GAME TIẾNG NHẬT */}
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <AnimatePresence mode="popLayout">
                {filteredGames.map((game) => (
                  <motion.div
                    key={game.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -6, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
                    whileTap={{ scale: 0.99 }}
                    style={{ willChange: 'transform', transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
                    onClick={() => {
                      if (game.id === 'speed-quiz') {
                        startSpeedQuiz();
                      } else if (game.id === 'word-fall') {
                        setShowWordFallModal(true);
                      } else if (game.id === 'typing-rush') {
                        navigate('/introduction/typing');
                      } else if (game.id === 'kanji-match') {
                        navigate('/kanji');
                      } else {
                        navigate('/introduction/hiragana');
                      }
                    }}
                    className="game-hub-card group relative overflow-hidden rounded-[30px] border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl cursor-pointer flex flex-col justify-between ring-1 ring-inset ring-white/80 dark:ring-white/5"
                  >
                    {/* Ảnh minh họa Kitsune */}
                    <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                      <img 
                        src={game.image} 
                        alt={game.title}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />
                      
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        {game.isFeatured && (
                          <span className="text-[11px] font-black uppercase px-3 py-1 rounded-full shadow-md bg-gradient-to-r from-orange-500 to-rose-500 text-white flex items-center gap-1">
                            <Sparkles size={12} strokeWidth={2.2} /> {game.badge}
                          </span>
                        )}
                        <span className={`text-[11px] font-black uppercase px-3 py-1 rounded-full shadow-md backdrop-blur-md flex items-center gap-1 ${game.tagColor}`}>
                          +{game.coinsReward} <Gem size={11} strokeWidth={2.2} />
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-4 right-4 text-white">
                        <span className="text-[11px] font-black text-orange-300 font-jp tracking-wider">
                          {game.jpTitle}
                        </span>
                        <h4 className="font-black text-xl leading-tight drop-shadow-md">{game.title}</h4>
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                        {game.subtitle}
                      </p>

                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-400">
                          {game.playersCount}
                        </span>
                        
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r ${game.accentGradient} text-white text-xs font-black shadow-sm group-hover:shadow-md transition-shadow`}
                        >
                          <Play size={13} strokeWidth={2.4} className="fill-white" />
                          Chơi ngay
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

        </div>


        {/* ========================================== */}
        {/* CỘT PHẢI (4 COLS): SIDEBAR NGƯỜI CHƠI (PROFILE + QUESTS + EVENTS) */}
        {/* ========================================== */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* 1. THẺ HỒ SƠ NGƯỜI HỌC (COMPACT & GỌN GÀNG) */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            style={{ willChange: 'transform, opacity', transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
            className="game-hub-card rounded-[32px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-4"
          >
            {/* Avatar + Tên + Cấp độ */}
            <div className="flex items-center gap-4">
              <div className="relative shrink-0">
                <div className="w-16 h-16 rounded-full p-[3px] bg-gradient-to-tr from-amber-400 via-yellow-400 to-amber-300 shadow-[0_0_16px_rgba(251,191,36,0.38)] flex items-center justify-center">
                  <div className="w-full h-full rounded-full p-[2px] bg-white dark:bg-slate-900 flex items-center justify-center">
                    <div className="w-full h-full rounded-full bg-[#ede9fe] dark:bg-purple-950/60 flex items-center justify-center">
                      <span className="font-black text-2xl text-[#7c3aed] dark:text-purple-300">
                        {user?.fullName?.charAt(0) || 'H'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-0.5 -right-0.5 w-6 h-6 rounded-full bg-gradient-to-b from-amber-400 to-amber-500 border-2 border-white dark:border-slate-900 flex items-center justify-center shadow-xs">
                  <Crown size={12} className="text-white fill-white" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-black text-slate-900 dark:text-white truncate">
                    {user?.fullName || 'Hero Học Viên'}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300 border border-orange-200 dark:border-orange-800">
                    VIP
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1.5">
                  <Shield size={13} strokeWidth={2.2} className="text-blue-500 shrink-0" />
                  <span>Cấp độ 3 • Thợ Săn Từ Vựng</span>
                </p>
              </div>
            </div>

            {/* XP Progress Bar */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-600 dark:text-slate-300">Tiến độ lên Cấp 4</span>
                <span className="text-orange-600 dark:text-orange-400 font-black">180 / 250 XP</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-orange-500 via-rose-500 to-pink-500 w-[72%]" />
              </div>
              <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 text-right">
                Còn 70 XP nữa để mở khóa danh hiệu mới!
              </p>
            </div>

            {/* Mini Stats Grid */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-2xl bg-purple-50/80 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/60 text-center">
                <div className="flex items-center justify-center gap-1.5 text-purple-600 dark:text-purple-400 mb-1">
                  <Gem size={15} strokeWidth={2.2} />
                  <span className="text-xs font-bold">Ví Xu</span>
                </div>
                <span className="text-lg font-black text-purple-700 dark:text-purple-300 flex items-center justify-center gap-1">
                  {userCoins} <Gem size={15} strokeWidth={2.2} className="text-purple-500 inline" />
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/60 text-center">
                <div className="flex items-center justify-center gap-1.5 text-amber-600 dark:text-amber-400 mb-1">
                  <Trophy size={15} strokeWidth={2.2} />
                  <span className="text-xs font-bold">Xếp hạng</span>
                </div>
                <span className="text-lg font-black text-amber-700 dark:text-amber-300">Top 5%</span>
              </div>
            </div>
          </motion.div>


          {/* 2. NHIỆM VỤ HÀNG NGÀY (DAILY QUESTS) */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            style={{ willChange: 'transform, opacity', transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
            className="game-hub-card rounded-[32px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3.5">
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Award size={20} strokeWidth={2.2} className="text-orange-500" />
                  Nhiệm Vụ Hàng Ngày
                </h3>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                  Làm mới sau: <span className="font-mono font-bold text-orange-600 dark:text-orange-400">{countdown}</span>
                </p>
              </div>
              <span className="w-8 h-8 rounded-full bg-orange-50 dark:bg-orange-950/60 text-orange-600 flex items-center justify-center">
                <Clock size={16} strokeWidth={2.2} />
              </span>
            </div>

            {/* Danh sách nhiệm vụ */}
            <div className="space-y-3.5">
              {quests.map((quest) => {
                const isDone = quest.progress >= quest.target;
                return (
                  <div 
                    key={quest.id} 
                    className="p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/60 space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                        {quest.title}
                      </p>
                      
                      {quest.claimed ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-lg border border-emerald-200 dark:border-emerald-800">
                          <Check size={12} strokeWidth={2.5} /> Đã nhận
                        </span>
                      ) : isDone ? (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleClaimQuest(quest.id, quest.reward)}
                          className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 text-white text-[11px] font-black shadow-xs cursor-pointer animate-pulse flex items-center gap-1"
                        >
                          Nhận +{quest.reward} <Gem size={11} strokeWidth={2.2} />
                        </motion.button>
                      ) : (
                        <span className="text-xs font-bold text-purple-600 dark:text-purple-400 font-mono flex items-center gap-0.5">
                          +{quest.reward} <Gem size={12} strokeWidth={2.2} />
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                        <div 
                          className="h-full rounded-full bg-gradient-to-r from-orange-400 to-purple-500 transition-all"
                          style={{ width: `${Math.min(100, (quest.progress / quest.target) * 100)}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-mono font-bold text-slate-500">
                        {quest.progress}/{quest.target}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>


          {/* 3. SỰ KIỆN ĐANG DIỄN RA (LIVE EVENTS) */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            style={{ willChange: 'transform, opacity', transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
            className="game-hub-card rounded-[32px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-4"
          >
            <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles size={20} strokeWidth={2.2} className="text-purple-500" />
              Sự Kiện Đang Diễn Ra
            </h3>

            <div className="space-y-3">
              {/* Event 1 */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50/50 dark:from-purple-950/30 dark:to-indigo-950/20 border border-purple-100 dark:border-purple-900/60 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-purple-500 text-white flex items-center justify-center shrink-0 shadow-md">
                  <Swords size={20} strokeWidth={2.2} />
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900 dark:text-white">Đua Top Tổng Điểm Tuần</h4>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                    Mọi ván thắng đều cộng dồn điểm tích lũy. Top 10 nhận danh hiệu Cáo Huyền Thoại.
                  </p>
                </div>
              </div>

              {/* Event 2 */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50/50 dark:from-amber-950/30 dark:to-orange-950/20 border border-amber-100 dark:border-amber-900/60 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md">
                  <Sparkles size={20} strokeWidth={2.2} />
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900 dark:text-white">Xu x2 Cuối Tuần</h4>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                    Nhận gấp đôi số lượng Xu khi chơi game vào Thứ Bảy & Chủ Nhật hàng tuần.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

      </div>


      {/* ========================================================================= */}
      {/* 3. MODAL MINI-GAME PLAYABLE: CHỚP NHOÁNG 60 GIÂY (SPEED QUIZ GAME MODAL) */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isPlayingSpeedQuiz && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 overflow-hidden">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={() => setIsPlayingSpeedQuiz(false)}
              className="fixed inset-0 bg-slate-950/75"
            />

            {/* Modal Dialog */}
            <motion.div 
              initial={{ scale: 0.94, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: 'transform, opacity', transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
              className="relative w-full max-w-xl rounded-[34px] border border-white/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-2xl overflow-hidden z-10"
            >
              {/* Header Modal */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md">
                    <Zap size={22} strokeWidth={2.2} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white">Chớp Nhoáng 60 Giây</h3>
                    <p className="text-xs font-bold text-orange-600 dark:text-orange-400 font-mono">
                      Thời gian: {quizTimeLeft}s • Điểm: {quizScore}
                    </p>
                  </div>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsPlayingSpeedQuiz(false)}
                  className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white flex items-center justify-center cursor-pointer"
                >
                  <X size={18} strokeWidth={2.2} />
                </motion.button>
              </div>

              {/* Nội dung Gameplay */}
              {!quizFinished ? (
                <div className="py-6 space-y-6">
                  
                  {/* Thanh tiến độ thời gian */}
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-orange-500 to-pink-500 transition-all duration-1000"
                      style={{ width: `${(quizTimeLeft / 60) * 100}%` }}
                    />
                  </div>

                  {/* Combo Badge */}
                  {quizCombo > 1 && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md"
                    >
                      <Flame size={14} strokeWidth={2.2} className="animate-bounce" />
                      COMBO x{quizCombo}! (+{quizCombo * 20}%)
                    </motion.div>
                  )}

                  {/* Câu hỏi */}
                  <div className="text-center py-4 bg-orange-50/50 dark:bg-slate-800/50 rounded-2xl border border-orange-100 dark:border-slate-700/60 p-4">
                    <span className="text-xs font-black uppercase text-orange-600 dark:text-orange-400">
                      Câu {quizIdx + 1} / {speedQuizQuestions.length}
                    </span>
                    <h4 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
                      {speedQuizQuestions[quizIdx].question}
                    </h4>
                    <p className="text-sm font-black text-slate-400 mt-1 font-jp">
                      {speedQuizQuestions[quizIdx].kanji}
                    </p>
                  </div>

                  {/* 4 Lựa chọn trả lời */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {speedQuizQuestions[quizIdx].options.map((opt, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAnswerQuiz(i)}
                        className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-orange-400 hover:bg-orange-50/50 dark:hover:bg-orange-950/20 text-left font-black text-slate-800 dark:text-slate-100 transition-colors flex items-center justify-between cursor-pointer"
                      >
                        <span className="text-base font-jp">{opt}</span>
                        <span className="w-7 h-7 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-500 flex items-center justify-center">
                          {String.fromCharCode(65 + i)}
                        </span>
                      </motion.button>
                    ))}
                  </div>

                </div>
              ) : (
                /* Kết quả trận đấu */
                <div className="py-8 text-center space-y-5">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 text-white flex items-center justify-center mx-auto shadow-xl">
                    <Trophy size={40} strokeWidth={2.2} />
                  </div>

                  <div>
                    <h4 className="text-2xl font-black text-slate-900 dark:text-white">Hoàn Thành Thử Thách!</h4>
                    <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1">
                      Bạn đã hoàn thành xuất sắc bài đố vui 60 giây.
                    </p>
                  </div>

                  <div className="flex justify-center gap-6 p-4 rounded-2xl bg-orange-50 dark:bg-slate-800/60 max-w-sm mx-auto">
                    <div>
                      <p className="text-xs font-bold text-slate-500">Tổng điểm</p>
                      <p className="text-xl font-black text-orange-600 dark:text-orange-400 flex items-center justify-center gap-1">
                        {quizScore} <Star size={16} strokeWidth={2.2} className="text-amber-500 fill-none" />
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500">Thưởng Xu</p>
                      <p className="text-xl font-black text-purple-600 dark:text-purple-400 flex items-center justify-center gap-1">
                        +15 <Gem size={16} strokeWidth={2.2} className="text-purple-500" />
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-center gap-3 pt-2">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={startSpeedQuiz}
                      className="px-5 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 font-black text-slate-700 dark:text-slate-200 text-xs flex items-center gap-2 cursor-pointer"
                    >
                      <RotateCcw size={14} strokeWidth={2.2} /> Chơi lại
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setIsPlayingSpeedQuiz(false)}
                      className="px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-rose-500 text-white font-black text-xs shadow-md cursor-pointer"
                    >
                      Xác nhận
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>


      {/* ========================================================================= */}
      {/* 4. MODAL ĐẤU TRƯỜNG PK 1V1 (MATCHMAKING MODAL) */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isMatchingPK && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 overflow-hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={() => {
                setIsMatchingPK(false);
                setPkMatchFound(false);
              }}
              className="fixed inset-0 bg-slate-950/75"
            />

            <motion.div 
              initial={{ scale: 0.94, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: 'transform, opacity', transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
              className="relative w-full max-w-lg rounded-[34px] border border-white/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center shadow-2xl z-10 space-y-6"
            >
              {!pkMatchFound ? (
                <>
                  <div className="w-20 h-20 rounded-full border-4 border-orange-500 border-t-transparent animate-spin mx-auto flex items-center justify-center">
                    <Swords size={32} strokeWidth={2.2} className="text-orange-500" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-black text-slate-900 dark:text-white">Đang Tìm Đối Thủ...</h4>
                    <p className="text-xs font-semibold text-slate-500 mt-1">
                      Hệ thống đang ghép cặp bạn với đối thủ cùng cấp độ N5/N4
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setIsMatchingPK(false)}
                    className="px-6 py-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-black text-slate-600 dark:text-slate-300 cursor-pointer"
                  >
                    Hủy ghép
                  </motion.button>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-center gap-6 py-4">
                    <div className="text-center">
                      <div className="relative inline-block">
                        <div className="w-16 h-16 rounded-full p-[3px] bg-gradient-to-tr from-amber-400 via-yellow-400 to-amber-300 shadow-[0_0_16px_rgba(251,191,36,0.38)] flex items-center justify-center">
                          <div className="w-full h-full rounded-full p-[2px] bg-white dark:bg-slate-900 flex items-center justify-center">
                            <div className="w-full h-full rounded-full bg-[#ede9fe] dark:bg-purple-950/60 flex items-center justify-center">
                              <span className="font-black text-2xl text-[#7c3aed] dark:text-purple-300">
                                {user?.fullName?.charAt(0) || 'H'}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 w-6 h-6 rounded-full bg-gradient-to-b from-amber-400 to-amber-500 border-2 border-white dark:border-slate-900 flex items-center justify-center shadow-xs">
                          <Crown size={12} className="text-white fill-white" />
                        </div>
                      </div>
                      <p className="text-xs font-black text-slate-800 dark:text-white mt-2">{user?.fullName || 'Bạn'}</p>
                    </div>

                    <div className="w-11 h-11 rounded-full bg-red-600 text-white font-black flex items-center justify-center text-sm shadow-md animate-pulse">
                      VS
                    </div>

                    <div className="text-center">
                      <div className="relative inline-block">
                        <div className="w-16 h-16 rounded-full p-[3px] bg-gradient-to-tr from-blue-400 via-indigo-400 to-cyan-300 shadow-[0_0_16px_rgba(99,102,241,0.38)] flex items-center justify-center">
                          <div className="w-full h-full rounded-full p-[2px] bg-white dark:bg-slate-900 flex items-center justify-center">
                            <div className="w-full h-full rounded-full bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center">
                              <span className="font-black text-2xl text-blue-600 dark:text-blue-300">
                                🦊
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 w-6 h-6 rounded-full bg-gradient-to-b from-blue-500 to-indigo-600 border-2 border-white dark:border-slate-900 flex items-center justify-center shadow-xs">
                          <Crown size={12} className="text-white fill-white" />
                        </div>
                      </div>
                      <p className="text-xs font-black text-slate-800 dark:text-white mt-2">Samurai Kitsune (AI)</p>
                    </div>
                  </div>

                  <h4 className="text-xl font-black text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-2">
                    <CheckCircle2 size={20} strokeWidth={2.2} /> Đã Ghép Cặp Thành Công!
                  </h4>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setIsMatchingPK(false);
                      setPkMatchFound(false);
                      startSpeedQuiz();
                    }}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 via-rose-500 to-purple-600 text-white font-black text-base shadow-lg cursor-pointer"
                  >
                    Vào Trận Đấu Ngay ⚔️
                  </motion.button>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>


      {/* ========================================================================= */}
      {/* 5. MODAL HƯỚNG DẪN CHƠI (GUIDE MODAL) */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {showGuideModal && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 overflow-hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={() => setShowGuideModal(false)}
              className="fixed inset-0 bg-slate-950/75"
            />

            <motion.div 
              initial={{ scale: 0.94, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: 'transform, opacity', transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
              className="relative w-full max-w-lg rounded-[34px] border border-white/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-7 shadow-2xl z-10 space-y-5"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Sparkles size={20} strokeWidth={2.2} className="text-amber-500" />
                  Hướng Dẫn Chơi & Nhận Xu Thưởng
                </h3>
                <button 
                  onClick={() => setShowGuideModal(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center cursor-pointer"
                >
                  <X size={16} strokeWidth={2.2} />
                </button>
              </div>

              <div className="space-y-3.5 text-xs font-semibold text-slate-600 dark:text-slate-300 leading-relaxed">
                <div className="p-3.5 rounded-2xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200/80 dark:border-orange-800/80">
                  <p className="font-black text-orange-700 dark:text-orange-300 text-sm mb-1 flex items-center gap-1.5">
                    <Gem size={15} strokeWidth={2.2} className="text-cyan-500" /> Cách nhận Xu (JP Coins):
                  </p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Hoàn thành mỗi ván game: Nhận từ 20 đến 35 Xu tùy chế độ.</li>
                    <li>Hoàn thành Nhiệm vụ hàng ngày: Nhận tới 70 Xu mỗi ngày.</li>
                    <li>Chơi vào Thứ Bảy & Chủ Nhật: Tự động x2 toàn bộ Xu nhận được.</li>
                  </ul>
                </div>

                <div className="p-3.5 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200/80 dark:border-purple-800/80">
                  <p className="font-black text-purple-700 dark:text-purple-300 text-sm mb-1 flex items-center gap-1.5">
                    <Gamepad2 size={15} strokeWidth={2.2} className="text-purple-500" /> Mẹo đạt điểm cao:
                  </p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Duy trì chuỗi Combo đúng liên tiếp để nhân hệ số điểm (lên tới x2.0).</li>
                    <li>Gõ Romaji chuẩn và chú ý trường âm, âm ngắt để không mất điểm tốc độ.</li>
                  </ul>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowGuideModal(false)}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-black text-xs shadow-md cursor-pointer"
              >
                Đã hiểu, bắt đầu chơi!
              </motion.button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal Thác Từ Vựng & Mưa Kana với 2 Thẻ JPD113 & JPD123 */}
      <WordFallModal
        isOpen={showWordFallModal}
        onClose={() => setShowWordFallModal(false)}
        onRewardCoins={(coins) => {
          setUserCoins((prev) => {
            const next = prev + coins;
            localStorage.setItem('jp_user_coins', next.toString());
            return next;
          });
        }}
      />

    </div>
  );
};
