import React, { useState, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  Sparkles,
  Zap,
  Flame,
  Heart,
  Trophy,
  Play,
  RotateCcw,
  BookOpen,
  ChevronDown,
  Timer,
  Maximize,
  Minimize,
  Volume2,
  VolumeX,
  Check,
  ArrowLeft,
  Keyboard,
  MousePointerClick,
  Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Confetti } from '../Kana/Confetti';
import { JapaneseMascot } from '../mascot/JapaneseMascot';
import { vocabularyData, type VocabItem } from '../../data/vocabularyData';
import { toRomaji } from 'wanakana';

interface WordFallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRewardCoins?: (coins: number) => void;
}

interface FallingWord {
  id: string;
  word: VocabItem;
  x: number; // Tọa độ X tính bằng % (10% - 84%)
  y: number; // Tọa độ Y tính bằng % (0% - 100%)
  speed: number;
  rotation: number;
  romajiKey: string; // Romaji chuẩn hóa để so khớp
}

interface LessonMeta {
  id: string;
  title: string;
  category: string;
  count: number;
}

// 12 BÀI HỌC CHUẨN CỦA JPD123 (LESSON 4-1 ĐẾN 7-3)
const JPD123_LESSONS: LessonMeta[] = [
  { id: '4-1', title: 'Hướng đi & Phương tiện', category: 'Bài 4', count: 16 },
  { id: '4-2', title: 'Địa danh & Khách sạn', category: 'Bài 4', count: 27 },
  { id: '4-3', title: 'Thời tiết & Vị giác', category: 'Bài 4', count: 24 },
  { id: '5-1', title: 'Thời gian & Đặt hẹn', category: 'Bài 5', count: 25 },
  { id: '5-2', title: 'Thời tiết & Cảm xúc', category: 'Bài 5', count: 20 },
  { id: '5-3', title: 'Sở thích & Đam mê', category: 'Bài 5', count: 14 },
  { id: '6-1', title: 'Kế hoạch & Sự kiện', category: 'Bài 6', count: 24 },
  { id: '6-2', title: 'Ăn uống & Mua sắm', category: 'Bài 6', count: 23 },
  { id: '6-3', title: 'Ẩm thực Nhật Bản', category: 'Bài 6', count: 8 },
  { id: '7-1', title: 'Vị trí & Địa điểm', category: 'Bài 7', count: 20 },
  { id: '7-2', title: 'Đồ dùng & Hành động', category: 'Bài 7', count: 34 },
  { id: '7-3', title: 'Hoạt động thường ngày', category: 'Bài 7', count: 16 },
];

// DANH SÁCH BÀI HỌC CỦA JPD113
const JPD113_LESSONS: LessonMeta[] = [
  { id: 'basic', title: 'Bài 1: Chào hỏi & Làm quen', category: 'Bài 1', count: 29 },
  { id: '4-1', title: 'Bài 4: Vị trí & Phương tiện', category: 'Bài 4', count: 16 },
  { id: '4-2', title: 'Bài 4: Địa điểm & Tính từ', category: 'Bài 4', count: 27 },
  { id: '5-1', title: 'Bài 5: Thời gian & Lịch trình', category: 'Bài 5', count: 25 },
  { id: '5-2', title: 'Bài 5: Địa điểm & Di chuyển', category: 'Bài 5', count: 20 },
  { id: '6-1', title: 'Bài 6: Mua sắm & Ăn uống', category: 'Bài 6', count: 24 },
  { id: '7-1', title: 'Bài 7: Hoạt động hàng ngày', category: 'Bài 7', count: 20 },
];

// Hàm tạo chuỗi gợi ý chữ cái (vd: "w _ _ _ _" cho "watashi")
const getRomajiHint = (romaji: string) => {
  const clean = romaji.replace(/[^a-zA-Z]/g, '');
  if (!clean) return romaji;
  const first = clean[0].toLowerCase();
  const blanks = ' _'.repeat(Math.max(0, clean.length - 1));
  return `${first}${blanks}`;
};

// THẺ TỪ RƠI NHỎ GỌN CUTE (COMPACT CUTE RAIN CARD) - CHUẨN 120FPS GPU ACCELERATION
const CuteRainWordCard: React.FC<{
  word: VocabItem;
  isNearBottom: boolean;
  isTarget: boolean;
  gameMode: 'typing' | 'choice';
}> = ({ word, isNearBottom, isTarget, gameMode }) => {
  const romaji = word.romaji || toRomaji(word.hiragana);
  const hint = getRomajiHint(romaji);

  return (
    <div
      className={`relative w-36 sm:w-44 px-3 py-2.5 rounded-3xl select-none transition-transform duration-200 ${
        isNearBottom
          ? 'bg-rose-50/95 dark:bg-rose-950/90 border-2 border-rose-500 shadow-[0_0_25px_rgba(244,63,94,0.65)] scale-105 animate-pulse'
          : isTarget && gameMode === 'choice'
          ? 'bg-white/95 dark:bg-slate-850/95 border-2 border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.5)] scale-105'
          : 'bg-white/95 dark:bg-slate-850/95 border border-slate-200/90 dark:border-slate-700 shadow-xl'
      }`}
    >
      {/* 2 Chấm tai thỏ / Mắt cute ở đỉnh card ● ● */}
      <div className="flex items-center justify-center gap-1.5 pb-1">
        <span className="w-1.5 h-1.5 rounded-full bg-slate-800 dark:bg-slate-300 inline-block" />
        <span className="w-1.5 h-1.5 rounded-full bg-slate-800 dark:bg-slate-300 inline-block" />
      </div>

      {/* Nội dung câu hỏi / từ vựng */}
      <div className="text-center">
        {gameMode === 'typing' ? (
          <>
            {/* Nghĩa tiếng Việt */}
            <p className="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-100 leading-tight line-clamp-2 px-1">
              {word.meaning}
            </p>
            
            {/* Thanh gợi ý gõ chữ cái (w _ _ _ _) */}
            <div className="mt-1.5 py-0.5 px-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200/60 dark:border-purple-800/50 inline-block">
              <span className="text-[11px] font-mono font-black text-purple-700 dark:text-purple-300 tracking-wider">
                {hint}
              </span>
            </div>
          </>
        ) : (
          <>
            {/* Tiếng Nhật Kanji / Hiragana */}
            <p className="text-sm sm:text-base font-jp font-black text-slate-900 dark:text-white leading-tight">
              {word.kanji || word.hiragana}
            </p>
            <div className="mt-1 py-0.5 px-2 rounded-xl bg-pink-50 dark:bg-pink-950/60 border border-pink-200/60 dark:border-pink-800/50 inline-block">
              <span className="text-[10px] font-black text-pink-700 dark:text-pink-300">
                {word.hiragana}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Răng cưa / Hoa văn pastel nhỏ ở đáy thẻ */}
      <div className="flex justify-center gap-1 pt-1 opacity-70">
        <span className="text-[9px] text-pink-400">▲</span>
        <span className="text-[9px] text-purple-400">▲</span>
        <span className="text-[9px] text-sky-400">▲</span>
      </div>
    </div>
  );
};

export const WordFallModal: React.FC<WordFallModalProps> = ({
  isOpen,
  onClose,
  onRewardCoins
}) => {
  // Trạng thái màn hình: 'selection' | 'playing' | 'gameover'
  const [stage, setStage] = useState<'selection' | 'playing' | 'gameover'>('selection');

  // Lựa chọn giáo trình & bài học đa nhiệm
  const [selectedCourse, setSelectedCourse] = useState<'jpd113' | 'jpd123' | 'kana'>('jpd123');
  const [selectedLessonsJPD123, setSelectedLessonsJPD123] = useState<string[]>(() => JPD123_LESSONS.map(l => l.id));
  const [selectedLessonsJPD113, setSelectedLessonsJPD113] = useState<string[]>(() => JPD113_LESSONS.map(l => l.id));
  
  // 2 CHẾ ĐỘ CHƠI: 'typing' (Gõ từ) HOẶC 'choice' (Trắc nghiệm 4 đáp án)
  const [gameMode, setGameMode] = useState<'typing' | 'choice'>('typing');
  const [typingInput, setTypingInput] = useState('');

  // Trạng thái Dropdown mở/đóng
  const [isDropdownOpenJPD123, setIsDropdownOpenJPD123] = useState(false);
  const [isDropdownOpenJPD113, setIsDropdownOpenJPD113] = useState(false);

  // Trạng thái Fullscreen F11 & Âm thanh
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Refs Dropdown click outside & Input ref
  const dropdownRefJPD123 = useRef<HTMLDivElement>(null);
  const dropdownRefJPD113 = useRef<HTMLDivElement>(null);
  const typingInputRef = useRef<HTMLInputElement>(null);

  // Game Engine State - 5 MẠNG SỐNG (5 LIVES)
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [lives, setLives] = useState(5);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [fallingWords, setFallingWords] = useState<FallingWord[]>([]);
  const [options, setOptions] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  // Refs đảm bảo loop hoạt động mượt mà không race-condition
  const livesRef = useRef(5);
  const animFrameRef = useRef<number | null>(null);
  const fallingWordsRef = useRef<FallingWord[]>([]);
  const lastSpawnTimeRef = useRef<number>(0);
  const lastXRef = useRef<number>(50);

  // Kỷ lục cá nhân trong localStorage
  const [highScore, setHighScore] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('jp_wordfall_highscore');
      return saved ? parseInt(saved, 10) : 680;
    } catch {
      return 680;
    }
  });

  // Tự động dọn dẹp Fullscreen khi đóng modal
  useEffect(() => {
    if (!isOpen) {
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setStage('selection');
    }
  }, [isOpen]);

  // Xử lý đóng Dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRefJPD123.current && !dropdownRefJPD123.current.contains(e.target as Node)) {
        setIsDropdownOpenJPD123(false);
      }
      if (dropdownRefJPD113.current && !dropdownRefJPD113.current.contains(e.target as Node)) {
        setIsDropdownOpenJPD113(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lắng nghe sự kiện Fullscreen của trình duyệt (F11 / Native Fullscreen)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Bật/tắt Fullscreen chuẩn F11
  const toggleNativeFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
      }
    } catch (err) {
      console.warn('Fullscreen toggle failed:', err);
    }
  };

  // Thoát khỏi màn hình chơi về màn hình chọn và thoát F11
  const exitToSelection = () => {
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
    setStage('selection');
  };

  // Đóng toàn bộ modal và thoát F11
  const handleCloseModal = () => {
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
    setStage('selection');
    onClose();
  };

  // Tạo kho từ vựng theo lựa chọn đa bài học
  const pool = useMemo(() => {
    if (selectedCourse === 'kana') {
      const hiraKana: VocabItem[] = [
        { id: 1, kanji: 'あ', hiragana: 'あ', romaji: 'a', type: 'Kana', meaning: 'Chữ a' },
        { id: 2, kanji: 'い', hiragana: 'い', romaji: 'i', type: 'Kana', meaning: 'Chữ i' },
        { id: 3, kanji: 'う', hiragana: 'う', romaji: 'u', type: 'Kana', meaning: 'Chữ u' },
        { id: 4, kanji: 'え', hiragana: 'え', romaji: 'e', type: 'Kana', meaning: 'Chữ e' },
        { id: 5, kanji: 'お', hiragana: 'お', romaji: 'o', type: 'Kana', meaning: 'Chữ o' },
        { id: 6, kanji: 'か', hiragana: 'か', romaji: 'ka', type: 'Kana', meaning: 'Chữ ka' },
        { id: 7, kanji: 'き', hiragana: 'き', romaji: 'ki', type: 'Kana', meaning: 'Chữ ki' },
        { id: 8, kanji: 'く', hiragana: 'く', romaji: 'ku', type: 'Kana', meaning: 'Chữ ku' },
        { id: 9, kanji: 'け', hiragana: 'け', romaji: 'ke', type: 'Kana', meaning: 'Chữ ke' },
        { id: 10, kanji: 'こ', hiragana: 'こ', romaji: 'ko', type: 'Kana', meaning: 'Chữ ko' },
        { id: 11, kanji: 'さ', hiragana: 'さ', romaji: 'sa', type: 'Kana', meaning: 'Chữ sa' },
        { id: 12, kanji: 'し', hiragana: 'し', romaji: 'shi', type: 'Kana', meaning: 'Chữ shi' },
        { id: 13, kanji: 'す', hiragana: 'す', romaji: 'su', type: 'Kana', meaning: 'Chữ su' },
        { id: 14, kanji: 'せ', hiragana: 'せ', romaji: 'se', type: 'Kana', meaning: 'Chữ se' },
        { id: 15, kanji: 'そ', hiragana: 'そ', romaji: 'so', type: 'Kana', meaning: 'Chữ so' },
        { id: 16, kanji: 'た', hiragana: 'た', romaji: 'ta', type: 'Kana', meaning: 'Chữ ta' },
        { id: 17, kanji: 'ち', hiragana: 'ち', romaji: 'chi', type: 'Kana', meaning: 'Chữ chi' },
        { id: 18, kanji: 'つ', hiragana: 'つ', romaji: 'tsu', type: 'Kana', meaning: 'Chữ tsu' },
        { id: 19, kanji: 'て', hiragana: 'て', romaji: 'te', type: 'Kana', meaning: 'Chữ te' },
        { id: 20, kanji: 'と', hiragana: 'と', romaji: 'to', type: 'Kana', meaning: 'Chữ to' },
        { id: 21, kanji: 'な', hiragana: 'な', romaji: 'na', type: 'Kana', meaning: 'Chữ na' },
        { id: 22, kanji: 'に', hiragana: 'に', romaji: 'ni', type: 'Kana', meaning: 'Chữ ni' },
        { id: 23, kanji: 'ぬ', hiragana: 'ぬ', romaji: 'nu', type: 'Kana', meaning: 'Chữ nu' },
        { id: 24, kanji: 'ね', hiragana: 'ね', romaji: 'ne', type: 'Kana', meaning: 'Chữ ne' },
        { id: 25, kanji: 'の', hiragana: 'の', romaji: 'no', type: 'Kana', meaning: 'Chữ no' },
        { id: 26, kanji: 'は', hiragana: 'は', romaji: 'ha', type: 'Kana', meaning: 'Chữ ha' },
        { id: 27, kanji: 'ひ', hiragana: 'ひ', romaji: 'hi', type: 'Kana', meaning: 'Chữ hi' },
        { id: 28, kanji: 'ふ', hiragana: 'ふ', romaji: 'fu', type: 'Kana', meaning: 'Chữ fu' },
        { id: 29, kanji: 'へ', hiragana: 'へ', romaji: 'he', type: 'Kana', meaning: 'Chữ he' },
        { id: 30, kanji: 'ほ', hiragana: 'ほ', romaji: 'ho', type: 'Kana', meaning: 'Chữ ho' },
        { id: 31, kanji: 'ま', hiragana: 'ま', romaji: 'ma', type: 'Kana', meaning: 'Chữ ma' },
        { id: 32, kanji: 'み', hiragana: 'み', romaji: 'mi', type: 'Kana', meaning: 'Chữ mi' },
        { id: 33, kanji: 'む', hiragana: 'む', romaji: 'mu', type: 'Kana', meaning: 'Chữ mu' },
        { id: 34, kanji: 'め', hiragana: 'め', romaji: 'me', type: 'Kana', meaning: 'Chữ me' },
        { id: 35, kanji: 'も', hiragana: 'も', romaji: 'mo', type: 'Kana', meaning: 'Chữ mo' },
        { id: 36, kanji: 'や', hiragana: 'や', romaji: 'ya', type: 'Kana', meaning: 'Chữ ya' },
        { id: 37, kanji: 'ゆ', hiragana: 'ゆ', romaji: 'yu', type: 'Kana', meaning: 'Chữ yu' },
        { id: 38, kanji: 'よ', hiragana: 'よ', romaji: 'yo', type: 'Kana', meaning: 'Chữ yo' },
        { id: 39, kanji: 'ら', hiragana: 'ら', romaji: 'ra', type: 'Kana', meaning: 'Chữ ra' },
        { id: 40, kanji: 'り', hiragana: 'り', romaji: 'ri', type: 'Kana', meaning: 'Chữ ri' },
        { id: 41, kanji: 'る', hiragana: 'る', romaji: 'ru', type: 'Kana', meaning: 'Chữ ru' },
        { id: 42, kanji: 'れ', hiragana: 'れ', romaji: 're', type: 'Kana', meaning: 'Chữ re' },
        { id: 43, kanji: 'ろ', hiragana: 'ろ', romaji: 'ro', type: 'Kana', meaning: 'Chữ ro' },
        { id: 44, kanji: 'わ', hiragana: 'わ', romaji: 'wa', type: 'Kana', meaning: 'Chữ wa' },
        { id: 45, kanji: 'を', hiragana: 'wo', romaji: 'wo', type: 'Kana', meaning: 'Chữ wo' },
        { id: 46, kanji: 'ん', hiragana: 'ん', romaji: 'n', type: 'Kana', meaning: 'Chữ n' }
      ];
      return hiraKana;
    }

    let allItems: VocabItem[] = [];
    if (selectedCourse === 'jpd113') {
      const activeIds = selectedLessonsJPD113.length > 0 
        ? selectedLessonsJPD113 
        : JPD113_LESSONS.map(l => l.id);

      activeIds.forEach(id => {
        if (vocabularyData[id]) {
          allItems.push(...vocabularyData[id]);
        }
      });
    } else {
      // JPD123: Lấy từ tất cả các bài đã chọn trong 4-1 -> 7-3
      const activeIds = selectedLessonsJPD123.length > 0 
        ? selectedLessonsJPD123 
        : JPD123_LESSONS.map(l => l.id);

      activeIds.forEach(id => {
        if (vocabularyData[id]) {
          allItems.push(...vocabularyData[id]);
        }
      });
    }

    return allItems.length > 0 ? allItems : (vocabularyData['4-1'] || []);
  }, [selectedCourse, selectedLessonsJPD123, selectedLessonsJPD113]);

  // Phát âm giọng Tokyo chuẩn
  const playAudio = (text: string) => {
    if (isMuted) return;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Từ rơi thấp nhất (Target Word) trong chế độ Trắc nghiệm
  const targetWord = useMemo(() => {
    if (fallingWords.length === 0) return null;
    return [...fallingWords].sort((a, b) => b.y - a.y)[0]?.word || null;
  }, [fallingWords]);

  // Cập nhật 4 đáp án khi targetWord thay đổi trong Chế độ Trắc nghiệm
  useEffect(() => {
    if (gameMode !== 'choice' || !targetWord || pool.length === 0) return;

    const wrongOptions = pool
      .filter(item => item.meaning !== targetWord.meaning)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(item => item.meaning);

    const allOptions = [targetWord.meaning, ...wrongOptions].sort(() => Math.random() - 0.5);
    setOptions(allOptions);
  }, [targetWord, gameMode, pool]);

  // Sinh 1 hạt mưa từ vựng mới vào luồng rơi liên tục
  const spawnSingleRainWord = () => {
    if (pool.length === 0) return;
    const randomWord = pool[Math.floor(Math.random() * pool.length)];
    
    // Tọa độ X ngẫu nhiên (12% đến 82%) đảm bảo cách xa hạt mưa trước ít nhất 16%
    let newX = Math.floor(Math.random() * 70) + 12;
    if (Math.abs(newX - lastXRef.current) < 18) {
      newX = (lastXRef.current + 35) % 70 + 12;
    }
    lastXRef.current = newX;

    // Tốc độ rơi: chuẩn 17 giây từ 0% đến 88% (tương đương 0.0863% mỗi frame ở 60fps)
    const speed = 0.0863;
    const rotation = (Math.random() - 0.5) * 6; // -3deg đến +3deg
    const romajiKey = (randomWord.romaji || toRomaji(randomWord.hiragana)).toLowerCase().replace(/[^a-z0-9]/g, '');

    const newFallingWord: FallingWord = {
      id: Math.random().toString(),
      word: randomWord,
      x: newX,
      y: 0,
      speed,
      rotation,
      romajiKey
    };

    fallingWordsRef.current = [...fallingWordsRef.current, newFallingWord];
    setFallingWords(fallingWordsRef.current);
  };

  // Xử lý mất mạng khi 1 từ rơi chạm đáy vạch nguy hiểm
  const handleMissWord = (missedId: string) => {
    const nextLives = Math.max(0, livesRef.current - 1);
    livesRef.current = nextLives;
    setLives(nextLives);
    setCombo(0);
    setFeedback('wrong');

    // Xóa từ chạm đáy khỏi danh sách
    fallingWordsRef.current = fallingWordsRef.current.filter(w => w.id !== missedId);
    setFallingWords(fallingWordsRef.current);

    setTimeout(() => {
      setFeedback(null);
    }, 450);

    if (nextLives <= 0) {
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setStage('gameover');
    }
  };

  // Xử lý khi tiêu diệt thành công 1 từ (Gõ đúng hoặc Chọn đáp án đúng)
  const handleDestroyWord = (destroyedWord: VocabItem, wordId: string) => {
    setCombo(prev => {
      const newCombo = prev + 1;
      setMaxCombo(m => Math.max(m, newCombo));
      const points = 100 * (1 + newCombo * 0.15);
      setScore(s => Math.round(s + points));
      return newCombo;
    });

    setFeedback('correct');
    playAudio(destroyedWord.kanji || destroyedWord.hiragana);

    // Xóa từ bị bắn trúng
    fallingWordsRef.current = fallingWordsRef.current.filter(w => w.id !== wordId);
    setFallingWords(fallingWordsRef.current);

    setTimeout(() => {
      setFeedback(null);
    }, 350);
  };

  // Bắt đầu game: Reset các chỉ số và chuyển sang chế độ F11
  const startGame = () => {
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    livesRef.current = 5;
    setLives(5);
    setElapsedTime(0);
    setStage('playing');
    setFeedback(null);
    setTypingInput('');
    fallingWordsRef.current = [];
    setFallingWords([]);
    lastSpawnTimeRef.current = Date.now();

    // Sinh ngay 1 từ đầu tiên
    spawnSingleRainWord();

    // Tự động kích hoạt F11 Toàn màn hình
    if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {});
    }

    // Auto focus ô input nếu ở chế độ Gõ từ
    setTimeout(() => {
      typingInputRef.current?.focus();
    }, 300);
  };

  // Game Loop: Rơi luân phiên liên tục (17s) & Spawner luân phiên
  useEffect(() => {
    let timerInterval: ReturnType<typeof setInterval>;

    if (stage === 'playing') {
      timerInterval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);

      const updateLoop = () => {
        const now = Date.now();

        // Spawner luân phiên: Cứ mỗi ~3.2s sinh ra 1 hạt mưa mới nếu trên màn hình < 5 từ
        if (now - lastSpawnTimeRef.current > 3200 && fallingWordsRef.current.length < 5) {
          lastSpawnTimeRef.current = now;
          spawnSingleRainWord();
        }

        // Cập nhật vị trí rơi cho tất cả các từ
        const nextWords: FallingWord[] = [];
        let hasMissed = false;
        let missedId = '';

        for (const item of fallingWordsRef.current) {
          const nextY = item.y + item.speed;
          if (nextY >= 88) {
            hasMissed = true;
            missedId = item.id;
          } else {
            nextWords.push({ ...item, y: nextY });
          }
        }

        if (hasMissed) {
          handleMissWord(missedId);
        } else {
          fallingWordsRef.current = nextWords;
          setFallingWords(nextWords);
        }

        animFrameRef.current = requestAnimationFrame(updateLoop);
      };

      animFrameRef.current = requestAnimationFrame(updateLoop);
    }

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      clearInterval(timerInterval);
    };
  }, [stage, pool]);

  // Xử lý gõ phím trong Chế độ Gõ Từ (Typing Mode)
  const handleTypingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    setTypingInput(rawVal);

    const normalizeWord = (str: string) => str.toLowerCase().replace(/[^a-z0-9ぁ-んァ-ヶー]/g, '');
    const cleanVal = normalizeWord(rawVal);
    if (!cleanVal) return;

    // Tìm từ đang rơi khớp với nội dung gõ (Romaji, Hiragana hoặc toRomaji)
    const matchedWord = fallingWordsRef.current.find(item => {
      const romaji = item.romajiKey;
      const hira = normalizeWord(item.word.hiragana);
      const wRomaji = normalizeWord(toRomaji(item.word.hiragana));
      return cleanVal === romaji || cleanVal === hira || cleanVal === wRomaji;
    });

    if (matchedWord) {
      handleDestroyWord(matchedWord.word, matchedWord.id);
      setTypingInput('');
    }
  };

  // Xử lý phím Enter để xóa nhanh input gõ từ
  const handleTypingKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setTypingInput('');
    }
  };

  // Xử lý khi chọn đáp án trong Chế độ Trắc nghiệm (Choice Mode)
  const handleSelectOption = (chosenMeaning: string) => {
    if (!targetWord || stage !== 'playing') return;

    const lowestWordItem = [...fallingWordsRef.current].sort((a, b) => b.y - a.y)[0];
    if (!lowestWordItem) return;

    if (chosenMeaning === targetWord.meaning) {
      handleDestroyWord(targetWord, lowestWordItem.id);
    } else {
      handleMissWord(lowestWordItem.id);
    }
  };

  // Phím tắt 1..4 (trong Choice Mode) & Phím ESC
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (stage !== 'playing') return;
      if (e.key === 'Escape') exitToSelection();

      if (gameMode === 'choice') {
        if (e.key === '1' && options[0]) handleSelectOption(options[0]);
        if (e.key === '2' && options[1]) handleSelectOption(options[1]);
        if (e.key === '3' && options[2]) handleSelectOption(options[2]);
        if (e.key === '4' && options[3]) handleSelectOption(options[3]);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [stage, options, targetWord, gameMode]);

  // Cập nhật kỷ lục khi kết thúc game & thưởng Xu
  useEffect(() => {
    if (stage === 'gameover') {
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem('jp_wordfall_highscore', score.toString());
      }
      // Thưởng Xu
      const reward = score >= 500 ? 30 : score >= 200 ? 20 : 10;
      if (onRewardCoins) {
        onRewardCoins(reward);
      }
    }
  }, [stage, score, highScore, onRewardCoins]);

  // Format thời gian hiển thị (vd: 01:24)
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Helper hàm toggle bài học JPD123
  const toggleLessonJPD123 = (id: string) => {
    setSelectedLessonsJPD123(prev => 
      prev.includes(id) ? (prev.length > 1 ? prev.filter(item => item !== id) : prev) : [...prev, id]
    );
  };

  // Helper hàm toggle bài học JPD113
  const toggleLessonJPD113 = (id: string) => {
    setSelectedLessonsJPD113(prev => 
      prev.includes(id) ? (prev.length > 1 ? prev.filter(item => item !== id) : prev) : [...prev, id]
    );
  };

  // Helper hàm chọn theo nhóm bài (Bài 4, 5, 6, 7) cho JPD123
  const toggleCategoryJPD123 = (cat: string) => {
    const catLessonIds = JPD123_LESSONS.filter(l => l.category === cat).map(l => l.id);
    const allSelected = catLessonIds.every(id => selectedLessonsJPD123.includes(id));
    if (allSelected) {
      const remaining = selectedLessonsJPD123.filter(id => !catLessonIds.includes(id));
      setSelectedLessonsJPD123(remaining.length > 0 ? remaining : [catLessonIds[0]]);
    } else {
      setSelectedLessonsJPD123(prev => Array.from(new Set([...prev, ...catLessonIds])));
    }
  };

  // Tính tổng số từ đã chọn của JPD123
  const selectedWordsCountJPD123 = useMemo(() => {
    return JPD123_LESSONS
      .filter(l => selectedLessonsJPD123.includes(l.id))
      .reduce((sum, l) => sum + l.count, 0);
  }, [selectedLessonsJPD123]);

  // Tính tổng số từ đã chọn của JPD113
  const selectedWordsCountJPD113 = useMemo(() => {
    return JPD113_LESSONS
      .filter(l => selectedLessonsJPD113.includes(l.id))
      .reduce((sum, l) => sum + l.count, 0);
  }, [selectedLessonsJPD113]);

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* ========================================================================= */}
          {/* 1. MÀN HÌNH CHỌN BÀI & MÀN HÌNH TỔNG KẾT: GIAO DIỆN MODAL DIALOG TIÊU CHUẨN */}
          {/* ========================================================================= */}
          {(stage === 'selection' || stage === 'gameover') && (
            <div className="fixed inset-0 z-[9999] p-3 sm:p-5 flex items-center justify-center font-sans overflow-hidden">
              
              {/* BACKDROP OVERLAY (GPU-FADE, KHÔNG CÓ BLUR TRÊN LỚP ANIMATE ĐỂ ĐẢM BẢO 120FPS) */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                onClick={handleCloseModal}
                className="fixed inset-0 bg-slate-950/70"
              />

              {/* MÀN HÌNH 1: CHỌN GIÁO TRÌNH & CHẾ ĐỘ CHƠI (CHUẨN BLUEPRINT 1: FLEX-COL + MAX-H) */}
              {stage === 'selection' && (
                <motion.div 
                  initial={{ scale: 0.95, opacity: 0, y: 16 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.96, opacity: 0, y: 12 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  style={{ willChange: 'transform, opacity' }}
                  className="relative flex flex-col w-full max-w-5xl max-h-[min(92vh,780px)] overflow-hidden rounded-[32px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xl z-10"
                >
                  {/* Header Modal - Cố định ở đỉnh */}
                  <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 shrink-0 bg-white/95 dark:bg-slate-900/95 z-20">
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-pink-500 via-rose-500 to-rose-600 text-white flex items-center justify-center shadow-md">
                        <Zap size={22} strokeWidth={2.4} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
                            Thác Từ Vựng & Mưa Kana
                          </h2>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300 border border-pink-200 dark:border-pink-800">
                            +30💎 Xu
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5 font-jp">
                          言葉の滝 • Mưa từ vựng rơi liên tục 17s phản xạ siêu tốc F11
                        </p>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleCloseModal}
                      className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <X size={18} strokeWidth={2.4} />
                    </motion.button>
                  </div>

                  {/* Body Content - Cuộn mượt và có đủ padding đáy để dropdown mở thoải mái */}
                  <div className="smooth-scroll-area flex-1 overflow-y-auto p-5 sm:p-6 pb-36 space-y-5">

                  {/* Lời chào Mascot Kitsune */}
                  <motion.div 
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08, duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="p-4 rounded-2xl bg-gradient-to-r from-pink-50/90 via-rose-50/70 to-amber-50/80 dark:from-slate-800/90 dark:to-slate-800/50 border border-pink-200/80 dark:border-slate-700/80 flex items-center gap-4 shadow-xs"
                  >
                    <motion.div 
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                      className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 border border-pink-200 dark:border-slate-700 flex items-center justify-center shrink-0 overflow-hidden shadow-xs"
                    >
                      <div className="scale-60 -mt-1">
                        <JapaneseMascot state="idle" showSpeechBubble={false} />
                      </div>
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 leading-relaxed">
                        🌸 Cùng luyện phản xạ nào! Chọn chế độ <span className="text-purple-600 dark:text-purple-400 font-black">Gõ Từ Siêu Tốc</span> hoặc <span className="text-blue-600 dark:text-blue-400 font-black">Trắc Nghiệm</span>, sau đó chọn giáo trình <span className="text-rose-600 dark:text-rose-400 font-black">JPD113 / JPD123</span> để bắt đầu nhé!
                      </p>
                    </div>
                  </motion.div>

                  {/* CHỌN CHẾ ĐỘ CHƠI (SHARED LAYOUT ANIMATION SPRING LIQUID TOGGLE) */}
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                      <Zap size={14} className="text-amber-500" /> Chọn Chế Độ Chơi
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      
                      {/* Mode 1: Gõ từ siêu tốc */}
                      <motion.div
                        whileHover={{ y: -2, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setGameMode('typing')}
                        className={`relative p-4 rounded-2xl border-2 cursor-pointer flex items-center justify-between overflow-hidden transition-colors ${
                          gameMode === 'typing'
                            ? 'border-purple-500 bg-purple-50/80 dark:bg-purple-950/40 shadow-xs ring-2 ring-purple-400/20'
                            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-purple-200'
                        }`}
                      >
                        {gameMode === 'typing' && (
                          <motion.div
                            layoutId="game-mode-active-pill"
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            className="absolute inset-0 bg-purple-500/5 dark:bg-purple-500/10 pointer-events-none"
                          />
                        )}
                        <div className="flex items-center gap-3 relative z-10">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg transition-colors ${
                            gameMode === 'typing'
                              ? 'bg-purple-600 text-white shadow-sm'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                          }`}>
                            <Keyboard size={20} />
                          </div>
                          <div>
                            <p className="text-sm font-black text-slate-900 dark:text-white">
                              Gõ Từ Siêu Tốc (Mưa Rơi)
                            </p>
                            <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                              Nhìn nghĩa & gõ Romaji/Hiragana để bắt hạt mưa rơi
                            </p>
                          </div>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center relative z-10 transition-colors ${
                          gameMode === 'typing' ? 'border-purple-500 bg-purple-500 text-white' : 'border-slate-300'
                        }`}>
                          {gameMode === 'typing' && <Check size={12} strokeWidth={3} />}
                        </div>
                      </motion.div>

                      {/* Mode 2: Trắc nghiệm 4 đáp án */}
                      <motion.div
                        whileHover={{ y: -2, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setGameMode('choice')}
                        className={`relative p-4 rounded-2xl border-2 cursor-pointer flex items-center justify-between overflow-hidden transition-colors ${
                          gameMode === 'choice'
                            ? 'border-blue-500 bg-blue-50/80 dark:bg-blue-950/40 shadow-xs ring-2 ring-blue-400/20'
                            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-200'
                        }`}
                      >
                        {gameMode === 'choice' && (
                          <motion.div
                            layoutId="game-mode-active-pill"
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            className="absolute inset-0 bg-blue-500/5 dark:bg-blue-500/10 pointer-events-none"
                          />
                        )}
                        <div className="flex items-center gap-3 relative z-10">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg transition-colors ${
                            gameMode === 'choice'
                              ? 'bg-blue-600 text-white shadow-sm'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                          }`}>
                            <MousePointerClick size={20} />
                          </div>
                          <div>
                            <p className="text-sm font-black text-slate-900 dark:text-white">
                              Trắc Nghiệm Phản Xạ
                            </p>
                            <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                              Chọn 1 trong 4 đáp án hoặc phím 1..4 cho từ gần đáy nhất
                            </p>
                          </div>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center relative z-10 transition-colors ${
                          gameMode === 'choice' ? 'border-blue-500 bg-blue-500 text-white' : 'border-slate-300'
                        }`}>
                          {gameMode === 'choice' && <Check size={12} strokeWidth={3} />}
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* LƯỚI 2 THẺ GIÁO TRÌNH TỪ VỰNG CHỦ LỰC (JPD113 & JPD123) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    
                    {/* THẺ 1: JPD113 (SAKURA / TORII THEME) */}
                    <motion.div
                      whileHover={{ y: -4, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => setSelectedCourse('jpd113')}
                      className={`relative overflow-visible rounded-[28px] border-2 p-6 cursor-pointer flex flex-col justify-between space-y-4 transition-colors z-20 ${
                        selectedCourse === 'jpd113'
                          ? 'border-rose-400 bg-rose-50/60 dark:bg-rose-950/30 shadow-[0_12px_30px_rgba(244,63,94,0.15)] ring-2 ring-rose-400/20'
                          : 'border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-rose-200'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                            Sơ Cấp 1 (N5)
                          </span>
                          <span className="text-xl">🌸</span>
                        </div>

                        <div>
                          <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                            Khóa Học JPD113
                          </h3>
                          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                            {JPD113_LESSONS.length} Bài học • {JPD113_LESSONS.reduce((s, l) => s + l.count, 0)} Từ vựng Minna no Nihongo I
                          </p>
                        </div>

                        {/* BỘ CHỌN ĐA BÀI HỌC (MULTI-SELECT DROPDOWN) JPD113 */}
                        <div className="space-y-1.5 pt-2" ref={dropdownRefJPD113}>
                          <label className="text-[11px] font-black uppercase tracking-wider text-slate-400 flex items-center justify-between">
                            <span className="flex items-center gap-1"><BookOpen size={13} /> Phạm vi bài học</span>
                            <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400">
                              Đã chọn {selectedLessonsJPD113.length}/{JPD113_LESSONS.length} bài ({selectedWordsCountJPD113} từ)
                            </span>
                          </label>

                          <div className="relative">
                            <motion.button
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedCourse('jpd113');
                                setIsDropdownOpenJPD113(prev => !prev);
                                setIsDropdownOpenJPD123(false);
                              }}
                              className="w-full px-3.5 py-2.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 outline-none flex items-center justify-between shadow-xs hover:border-rose-400 transition-colors"
                            >
                              <span className="truncate">
                                {selectedLessonsJPD113.length === JPD113_LESSONS.length
                                  ? `Toàn bộ ${JPD113_LESSONS.length} bài học (${selectedWordsCountJPD113} từ vựng)`
                                  : selectedLessonsJPD113.length === 1
                                  ? `${JPD113_LESSONS.find(l => l.id === selectedLessonsJPD113[0])?.title} (${selectedWordsCountJPD113} từ)`
                                  : `Đã chọn ${selectedLessonsJPD113.length} bài học (${selectedWordsCountJPD113} từ)`}
                              </span>
                              <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 ${isDropdownOpenJPD113 ? 'rotate-180 text-rose-500' : ''}`} />
                            </motion.button>

                            {/* MENU POPUP SCROLLDOWN (DROPDOWN EASING CHUẨN BLUEPRINT 4: 0.22, 1, 0.36, 1) */}
                            <AnimatePresence>
                              {isDropdownOpenJPD113 && (
                                <motion.div
                                  initial={{ opacity: 0, y: -6, scale: 0.98 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                                  transition={{ duration: 0.20, ease: [0.22, 1, 0.36, 1] }}
                                  style={{ willChange: 'transform, opacity' }}
                                  className="absolute z-50 left-0 right-0 top-full mt-1.5 p-2.5 rounded-2xl bg-white dark:bg-slate-850 border border-rose-200 dark:border-slate-700 shadow-2xl space-y-2"
                                >
                                  <div className="flex items-center justify-between px-1 text-[11px] font-bold">
                                    <span className="text-slate-400">Chọn nhanh:</span>
                                    <div className="flex items-center gap-1.5">
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setSelectedLessonsJPD113(JPD113_LESSONS.map(l => l.id));
                                        }}
                                        className="px-2 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-300 font-bold hover:bg-rose-100 transition-colors"
                                      >
                                        Tất cả
                                      </button>
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setSelectedLessonsJPD113([JPD113_LESSONS[0].id]);
                                        }}
                                        className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-200 transition-colors"
                                      >
                                        Bài 1
                                      </button>
                                    </div>
                                  </div>

                                  <div className="smooth-scroll-area max-h-52 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                                    {JPD113_LESSONS.map((lesson) => {
                                      const isChecked = selectedLessonsJPD113.includes(lesson.id);
                                      return (
                                        <motion.div
                                          key={lesson.id}
                                          whileHover={{ x: 2, transition: { duration: 0.15 } }}
                                          whileTap={{ scale: 0.98 }}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            toggleLessonJPD113(lesson.id);
                                          }}
                                          className={`steady-scroll-row p-2 rounded-xl flex items-center justify-between cursor-pointer transition-colors text-xs ${
                                            isChecked
                                              ? 'bg-rose-50/80 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 font-black'
                                              : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium'
                                          }`}
                                        >
                                          <div className="flex items-center gap-2 min-w-0">
                                            <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${
                                              isChecked
                                                ? 'bg-rose-500 border-rose-500 text-white'
                                                : 'border-slate-300 dark:border-slate-600'
                                            }`}>
                                              {isChecked && <Check size={12} strokeWidth={3} />}
                                            </div>
                                            <span className="truncate">{lesson.title}</span>
                                          </div>
                                          <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 shrink-0 font-bold">
                                            {lesson.count} từ
                                          </span>
                                        </motion.div>
                                      );
                                    })}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
                          <span>Phần thưởng vượt ải</span>
                          <span className="font-black text-rose-600 dark:text-rose-400">+25💎 Xu • +45 XP</span>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.02, y: -1, transition: { type: "spring", stiffness: 400, damping: 25 } }}
                          whileTap={{ scale: 0.98 }}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCourse('jpd113');
                            startGame();
                          }}
                          className="w-full py-3 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 hover:shadow-lg transition-shadow cursor-pointer"
                        >
                          <Play size={16} className="fill-white" />
                          <span>Bắt đầu chơi JPD113 ({gameMode === 'typing' ? 'Gõ Từ' : 'Trắc Nghiệm'})</span>
                        </motion.button>
                      </div>
                    </motion.div>


                    {/* THẺ 2: JPD123 (OCEAN BLUE / FUJI THEME) */}
                    <motion.div
                      whileHover={{ y: -4, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => setSelectedCourse('jpd123')}
                      className={`relative overflow-visible rounded-[28px] border-2 p-6 cursor-pointer flex flex-col justify-between space-y-4 transition-colors z-20 ${
                        selectedCourse === 'jpd123'
                          ? 'border-blue-400 bg-blue-50/60 dark:bg-blue-950/30 shadow-[0_12px_30px_rgba(59,130,246,0.15)] ring-2 ring-blue-400/20'
                          : 'border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-200'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                            Sơ Cấp 2 (N4-N5)
                          </span>
                          <span className="text-xl">🌊</span>
                        </div>

                        <div>
                          <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                            Khóa Học JPD123
                          </h3>
                          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                            12 Bài học (Lesson 4-1 ➔ 7-3) • 231 Từ vựng Minna no Nihongo II
                          </p>
                        </div>

                        {/* BỘ CHỌN ĐA BÀI HỌC (MULTI-SELECT DROPDOWN) JPD123 */}
                        <div className="space-y-1.5 pt-2" ref={dropdownRefJPD123}>
                          <label className="text-[11px] font-black uppercase tracking-wider text-slate-400 flex items-center justify-between">
                            <span className="flex items-center gap-1"><BookOpen size={13} /> Phạm vi bài học</span>
                            <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400">
                              Đã chọn {selectedLessonsJPD123.length}/12 bài ({selectedWordsCountJPD123} từ)
                            </span>
                          </label>

                          <div className="relative">
                            <motion.button
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedCourse('jpd123');
                                setIsDropdownOpenJPD123(prev => !prev);
                                setIsDropdownOpenJPD113(false);
                              }}
                              className="w-full px-3.5 py-2.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 outline-none flex items-center justify-between shadow-xs hover:border-blue-400 transition-colors"
                            >
                              <span className="truncate">
                                {selectedLessonsJPD123.length === JPD123_LESSONS.length
                                  ? `Toàn bộ 12 bài học (231 từ vựng)`
                                  : selectedLessonsJPD123.length === 1
                                  ? `Bài ${selectedLessonsJPD123[0]}: ${JPD123_LESSONS.find(l => l.id === selectedLessonsJPD123[0])?.title} (${selectedWordsCountJPD123} từ)`
                                  : `Đã chọn ${selectedLessonsJPD123.length} bài học (${selectedWordsCountJPD123} từ vựng)`}
                              </span>
                              <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 ${isDropdownOpenJPD123 ? 'rotate-180 text-blue-500' : ''}`} />
                            </motion.button>

                            {/* MENU POPUP SCROLLDOWN JPD123 (DROPDOWN EASING CHUẨN BLUEPRINT 4: 0.22, 1, 0.36, 1) */}
                            <AnimatePresence>
                              {isDropdownOpenJPD123 && (
                                <motion.div
                                  initial={{ opacity: 0, y: -6, scale: 0.98 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                                  transition={{ duration: 0.20, ease: [0.22, 1, 0.36, 1] }}
                                  style={{ willChange: 'transform, opacity' }}
                                  className="absolute z-50 left-0 right-0 top-full mt-1.5 p-2.5 rounded-2xl bg-white dark:bg-slate-850 border border-blue-200 dark:border-slate-700 shadow-2xl space-y-2"
                                >
                                  {/* THANH CHỌN NHANH THEO NHÓM BÀI */}
                                  <div className="space-y-1.5 pb-1 border-b border-slate-100 dark:border-slate-750">
                                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
                                      <span>Chọn nhanh:</span>
                                      <div className="flex items-center gap-1">
                                        <button
                                          type="button"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedLessonsJPD123(JPD123_LESSONS.map(l => l.id));
                                          }}
                                          className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-300 font-bold hover:bg-blue-100 transition-colors"
                                        >
                                          Tất cả (12 bài)
                                        </button>
                                        <button
                                          type="button"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedLessonsJPD123(['4-1']);
                                          }}
                                          className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-200 transition-colors"
                                        >
                                          Chỉ bài 4-1
                                        </button>
                                      </div>
                                    </div>

                                    {/* NÚT CHỌN THEO NHÓM (BÀI 4, 5, 6, 7) */}
                                    <div className="grid grid-cols-4 gap-1 pt-0.5">
                                      {['Bài 4', 'Bài 5', 'Bài 6', 'Bài 7'].map(cat => {
                                        const catIds = JPD123_LESSONS.filter(l => l.category === cat).map(l => l.id);
                                        const isAllCat = catIds.every(id => selectedLessonsJPD123.includes(id));
                                        return (
                                          <button
                                            key={cat}
                                            type="button"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              toggleCategoryJPD123(cat);
                                            }}
                                            className={`py-1 px-1.5 rounded-lg text-[10px] font-black transition-colors ${
                                              isAllCat
                                                ? 'bg-blue-600 text-white shadow-xs'
                                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-50'
                                            }`}
                                          >
                                            {cat}
                                          </button>
                                        );
                                      })}
                                    </div>
                                  </div>

                                  {/* DANH SÁCH 12 BÀI HỌC CUỘN MƯỢT */}
                                  <div className="smooth-scroll-area max-h-56 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                                    {JPD123_LESSONS.map((lesson) => {
                                      const isChecked = selectedLessonsJPD123.includes(lesson.id);
                                      return (
                                        <motion.div
                                          key={lesson.id}
                                          whileHover={{ x: 2, transition: { duration: 0.15 } }}
                                          whileTap={{ scale: 0.98 }}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            toggleLessonJPD123(lesson.id);
                                          }}
                                          className={`steady-scroll-row p-2 rounded-xl flex items-center justify-between cursor-pointer transition-colors text-xs ${
                                            isChecked
                                              ? 'bg-blue-50/90 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 font-black'
                                              : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium'
                                          }`}
                                        >
                                          <div className="flex items-center gap-2 min-w-0">
                                            <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${
                                              isChecked
                                                ? 'bg-blue-500 border-blue-500 text-white'
                                                : 'border-slate-300 dark:border-slate-600'
                                            }`}>
                                              {isChecked && <Check size={12} strokeWidth={3} />}
                                            </div>
                                            <span className="font-mono text-[11px] font-bold text-blue-600 dark:text-blue-400 shrink-0">
                                              {lesson.id}
                                            </span>
                                            <span className="truncate">{lesson.title}</span>
                                          </div>
                                          <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 shrink-0 font-bold">
                                            {lesson.count} từ
                                          </span>
                                        </motion.div>
                                      );
                                    })}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
                          <span>Phần thưởng vượt ải</span>
                          <span className="font-black text-blue-600 dark:text-blue-400">+30💎 Xu • +50 XP</span>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.02, y: -1, transition: { type: "spring", stiffness: 400, damping: 25 } }}
                          whileTap={{ scale: 0.98 }}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCourse('jpd123');
                            startGame();
                          }}
                          className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 text-white font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 hover:shadow-lg transition-shadow cursor-pointer"
                        >
                          <Play size={16} className="fill-white" />
                          <span>Bắt đầu chơi JPD123 ({gameMode === 'typing' ? 'Gõ Từ' : 'Trắc Nghiệm'})</span>
                        </motion.button>
                      </div>
                    </motion.div>

                  </div>

                  {/* DÒNG BỔ TRỢ: KANA RAIN & KỶ LỤC CÁ NHÂN */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    {/* Chế độ Mưa Bảng Chữ Cái Kana */}
                    <motion.div 
                      whileHover={{ y: -3, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSelectedCourse('kana');
                        startGame();
                      }}
                      className="p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200/80 dark:border-purple-800/60 flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow group"
                    >
                      <div>
                        <p className="text-xs font-black uppercase text-purple-700 dark:text-purple-300 flex items-center gap-1">
                          <Sparkles size={13} /> Mưa Kana (Khởi Động)
                        </p>
                        <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                          46 Chữ Hiragana phản xạ mưa rơi
                        </p>
                      </div>
                      <ChevronDown size={18} className="text-purple-500 group-hover:translate-x-1 -rotate-90 transition-transform" />
                    </motion.div>

                    {/* Kỷ lục cá nhân */}
                    <motion.div 
                      whileHover={{ y: -3, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
                      className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/60 flex items-center gap-3"
                    >
                      <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                        <Trophy size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase text-slate-400">Kỷ lục của bạn</p>
                        <p className="text-lg font-black text-amber-600 dark:text-amber-400 leading-none mt-0.5">
                          {highScore.toLocaleString()} điểm
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
              )}

              {/* MÀN HÌNH 3: TỔNG KẾT GAME (GAME OVER / VICTORY MODAL) */}
              {stage === 'gameover' && (
                <motion.div 
                  initial={{ scale: 0.92, opacity: 0, y: 18 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.94, opacity: 0, y: 12 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  style={{ willChange: 'transform, opacity' }}
                  className="relative w-full max-w-md max-h-[min(92vh,600px)] overflow-y-auto rounded-[32px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-7 text-center shadow-2xl space-y-5 z-10 smooth-scroll-area"
                >
                  <Confetti />
                  
                  <div className="w-16 h-16 rounded-3xl bg-amber-50 dark:bg-amber-950/60 text-amber-500 flex items-center justify-center shadow-inner mx-auto">
                    <Trophy size={34} />
                  </div>

                  <div>
                    <h2 className="text-2xl font-black uppercase text-slate-900 dark:text-white tracking-tight">
                      {score >= highScore ? 'Kỷ Lục Mới! 🎉' : 'Hoàn Thành Lượt Chơi 🌸'}
                    </h2>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                      Bạn đã xuất sắc phản xạ các đợt mưa từ vựng rơi liên tục!
                    </p>
                  </div>

                  {/* 3 Chỉ số kết quả */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700">
                      <p className="text-base font-black text-slate-900 dark:text-white">{score.toLocaleString()}</p>
                      <p className="text-[10px] font-bold uppercase text-slate-400">Tổng điểm</p>
                    </div>

                    <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200/60 dark:border-amber-800/50">
                      <p className="text-base font-black text-amber-600 dark:text-amber-400">x{maxCombo}</p>
                      <p className="text-[10px] font-bold uppercase text-slate-400">Combo đỉnh</p>
                    </div>

                    <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/50 border border-purple-200/60 dark:border-purple-800/50">
                      <p className="text-base font-black text-purple-600 dark:text-purple-400">+{score >= 500 ? 30 : 20}💎</p>
                      <p className="text-[10px] font-bold uppercase text-slate-400">Xu thưởng</p>
                    </div>
                  </div>

                  {/* Nút hành động */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => startGame()}
                      className="py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-black flex items-center justify-center gap-2 hover:bg-slate-200 cursor-pointer shadow-xs transition-colors"
                    >
                      <RotateCcw size={15} />
                      <span>Chơi lại (F11)</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={exitToSelection}
                      className="py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 text-white text-xs font-black flex items-center justify-center gap-2 shadow-md hover:shadow-lg cursor-pointer"
                    >
                      <span>Chọn bài khác</span>
                    </motion.button>
                  </div>

                </motion.div>
              )}

            </div>
          )}


          {/* ========================================================================= */}
          {/* 2. MÀN HÌNH 2: ĐẤU TRƯỜNG CHƠI GAME TOÀN MÀN HÌNH F11 (FULL VIEWPORT ARCADE) */}
          {/* ========================================================================= */}
          {stage === 'playing' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="fixed inset-0 w-screen h-screen z-[99999] overflow-hidden bg-slate-950 flex flex-col justify-between p-4 sm:p-6 select-none font-sans"
            >
              {/* Ambient Cyber-Zen Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-[#0B0F19] to-slate-950 pointer-events-none" />
              <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-pink-500/10 via-transparent to-transparent pointer-events-none" />
              
              {/* Cánh hoa anh đào trôi nổi */}
              <div className="absolute top-12 left-10 text-pink-400/25 text-3xl animate-pulse pointer-events-none">🌸</div>
              <div className="absolute top-28 right-16 text-rose-400/20 text-2xl animate-pulse pointer-events-none">🌸</div>
              <div className="absolute bottom-32 left-1/4 text-pink-400/15 text-xl animate-pulse pointer-events-none">🌸</div>
              <div className="absolute bottom-40 right-1/4 text-pink-400/20 text-2xl animate-pulse pointer-events-none">🌸</div>

              {/* ========================================== */}
              {/* TOP HUD BAR: CONTROL CENTER & 5 LIVES */}
              {/* ========================================== */}
              <header className="relative z-30 flex items-center justify-between bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl px-4 sm:px-6 py-3 shadow-2xl">
                
                {/* CỘT TRÁI: MASCOT & SCOPE BADGE */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 overflow-hidden shadow-inner">
                    <div className="scale-65 -mt-0.5">
                      <JapaneseMascot state={lives <= 2 ? 'error' : combo >= 3 ? 'success' : 'idle'} showSpeechBubble={false} />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        gameMode === 'typing'
                          ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                          : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      }`}>
                        {gameMode === 'typing' ? '⌨️ GÕ TỪ' : '🎮 TRẮC NGHIỆM'}
                      </span>
                      <span className="text-xs font-bold text-slate-300 hidden md:inline">
                        {selectedCourse === 'jpd123'
                          ? `JPD123 (${selectedLessonsJPD123.length} bài • ${pool.length} từ)`
                          : selectedCourse === 'jpd113'
                          ? `JPD113 (${selectedLessonsJPD113.length} bài • ${pool.length} từ)`
                          : 'Kana (46 chữ)'}
                      </span>
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 mt-0.5">
                      Thời gian rơi: <span className="text-amber-400 font-black">17 GIÂY / HẠT MƯA</span>
                    </p>
                  </div>
                </div>

                {/* CỘT GIỮA: NEON SCORE, COMBO FLAME & SURVIVAL TIMER */}
                <div className="flex items-center gap-4 sm:gap-8">
                  {/* Điểm số */}
                  <div className="text-center">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">ĐIỂM SỐ</p>
                    <p className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 leading-none">
                      {score.toLocaleString()}
                    </p>
                  </div>

                  {/* Combo Flame Badge */}
                  <AnimatePresence>
                    {combo > 1 && (
                      <motion.div
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.6, opacity: 0 }}
                        className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white text-xs font-black flex items-center gap-1.5 shadow-lg shadow-orange-500/20 animate-pulse"
                      >
                        <Flame size={15} className="fill-white animate-bounce" />
                        <span>x{combo} Combo!</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Đồng hồ sống sót */}
                  <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/90 text-xs font-mono font-bold text-slate-300 border border-slate-700">
                    <Timer size={14} className="text-rose-400" />
                    <span>{formatTime(elapsedTime)}</span>
                  </div>
                </div>

                {/* CỘT PHẢI: 5 MẠNG SỐNG & CÁC NÚT ĐIỀU KHIỂN */}
                <div className="flex items-center gap-3">
                  {/* 5 Trái tim mạng sống (5 Lives) */}
                  <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700">
                    {[1, 2, 3, 4, 5].map((heartIndex) => (
                      <Heart
                        key={heartIndex}
                        size={20}
                        className={`transition-all duration-300 ${
                          heartIndex <= lives 
                            ? 'text-rose-500 fill-rose-500 scale-110 drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]' 
                            : 'text-slate-600 fill-none scale-90 opacity-40'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Bật/Tắt âm thanh */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsMuted(m => !m)}
                    title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
                    className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer border border-slate-700"
                  >
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </motion.button>

                  {/* Nút Toàn màn hình F11 */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleNativeFullscreen}
                    title={isFullscreen ? 'Thu nhỏ cửa sổ' : 'Toàn màn hình (F11)'}
                    className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer border border-slate-700"
                  >
                    {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
                  </motion.button>

                  {/* Nút Thoát / ESC */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={exitToSelection}
                    className="px-3.5 py-1.5 rounded-xl bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/30 text-xs font-black cursor-pointer transition-colors flex items-center gap-1.5"
                  >
                    <ArrowLeft size={14} />
                    <span className="hidden sm:inline">Thoát (ESC)</span>
                  </motion.button>
                </div>

              </header>


              {/* ========================================== */}
              {/* MAIN SAKURA WATERFALL FALLING STAGE */}
              {/* ========================================== */}
              <main className="relative z-10 flex-1 w-full overflow-hidden my-2 sm:my-3">
                
                {/* Vạch cảnh báo nguy hiểm laser đáy (Danger Line) */}
                <div className="absolute inset-x-0 bottom-3 h-3 flex items-center justify-between px-6 pointer-events-none">
                  <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-rose-500/80 to-transparent shadow-[0_0_12px_rgba(244,63,94,0.8)]" />
                </div>
                <div className="absolute inset-x-0 bottom-4 text-center pointer-events-none">
                  <span className="text-[10px] font-black uppercase tracking-widest text-rose-500/70 drop-shadow-md">
                    ⚠️ VẠCH NGUY HIỂM (Chạm đáy mất 1 mạng)
                  </span>
                </div>

                {/* Các hạt mưa từ vựng rơi liên tục (Compact Cute Cards) */}
                {fallingWords.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      position: 'absolute',
                      left: `${item.x}%`,
                      top: `${item.y}%`,
                      transform: `translate3d(-50%, 0, 0) rotate(${item.rotation}deg)`,
                      willChange: 'top, left, transform'
                    }}
                    className="flex items-center justify-center cursor-pointer select-none pointer-events-auto"
                  >
                    <CuteRainWordCard
                      word={item.word}
                      isNearBottom={item.y > 65}
                      isTarget={targetWord?.meaning === item.word.meaning}
                      gameMode={gameMode}
                    />
                  </div>
                ))}

                {/* Hiệu ứng Flash Feedback khi gõ đúng */}
                {feedback === 'correct' && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <motion.div
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1.15, opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="px-8 py-4 rounded-3xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white font-black text-xl sm:text-2xl shadow-[0_0_40px_rgba(16,185,129,0.5)] flex items-center gap-3 border border-emerald-300/40"
                    >
                      <Sparkles size={28} />
                      <span>🌸 CHÍNH XÁC! +{Math.round(100 * (1 + combo * 0.15))}</span>
                    </motion.div>
                  </div>
                )}
              </main>


              {/* ========================================== */}
              {/* BOTTOM REACTION PANEL: 2 MODES INTERACTION */}
              {/* ========================================== */}
              <footer className="relative z-30 space-y-2">
                
                {/* CHẾ ĐỘ 1: GÕ TỪ (TYPING MODE INPUT) */}
                {gameMode === 'typing' ? (
                  <div className="max-w-2xl mx-auto w-full space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 px-3">
                      <span className="flex items-center gap-1.5">
                        <Keyboard size={13} className="text-purple-400" />
                        Gõ <strong className="text-purple-300">Romaji</strong> hoặc <strong className="text-purple-300">Hiragana</strong> của từ đang rơi
                      </span>
                      <span className="text-slate-500">Nhấn <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">Enter</kbd> để xoá nhanh</span>
                    </div>

                    <div className="relative flex items-center">
                      <input
                        ref={typingInputRef}
                        type="text"
                        value={typingInput}
                        onChange={handleTypingChange}
                        onKeyDown={handleTypingKeyDown}
                        placeholder="Gõ romaji (vd: watashi) hoặc hiragana... [Enter để xoá]"
                        className="w-full py-4 pl-6 pr-14 rounded-full bg-slate-900/95 border-2 border-purple-500/50 focus:border-purple-400 text-white font-bold text-base sm:text-lg shadow-[0_0_30px_rgba(168,85,247,0.25)] outline-none transition-colors placeholder:text-slate-500 font-sans"
                        autoFocus
                      />
                      <motion.button
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.92 }}
                        type="button"
                        onClick={() => setTypingInput('')}
                        className="absolute right-3.5 w-9 h-9 rounded-full bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center transition-colors shadow-md cursor-pointer"
                      >
                        <Send size={15} />
                      </motion.button>
                    </div>
                  </div>
                ) : (
                  /* CHẾ ĐỘ 2: TRẮC NGHIỆM 4 ĐÁP ÁN (CHOICE MODE) */
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 px-2">
                      <span className="flex items-center gap-1.5">
                        <Zap size={13} className="text-amber-400" />
                        Gõ phím số <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-amber-300 font-mono">[1]</kbd> <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-amber-300 font-mono">[2]</kbd> <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-amber-300 font-mono">[3]</kbd> <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-amber-300 font-mono">[4]</kbd> cho từ đang rơi gần đáy nhất:
                      </span>
                      <span className="hidden sm:inline text-pink-400 font-medium">🌸 Bắt hạt mưa trước khi chạm đáy!</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {options.map((optionText, idx) => (
                        <motion.button
                          key={idx}
                          onClick={() => handleSelectOption(optionText)}
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                          className={`relative p-4 sm:p-5 rounded-2xl bg-slate-900/90 border-2 text-white font-black text-sm sm:text-base shadow-lg transition-colors text-center cursor-pointer flex items-center justify-center min-h-[68px] group backdrop-blur-xl ${
                            selectedCourse === 'jpd123'
                              ? 'border-slate-800 hover:border-blue-400 hover:shadow-[0_0_25px_rgba(59,130,246,0.3)]'
                              : 'border-slate-800 hover:border-pink-500 hover:shadow-[0_0_25px_rgba(244,63,94,0.3)]'
                          }`}
                        >
                          {/* Badge số phím tắt cơ học (Keycap 1..4) */}
                          <span className="absolute top-2 left-2.5 w-6 h-6 rounded-lg bg-slate-800 border border-slate-700 text-[11px] font-mono font-black text-slate-400 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-rose-500 group-hover:text-white transition-colors shadow-inner">
                            {idx + 1}
                          </span>
                          <span className="px-3 leading-snug">{optionText}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}
              </footer>

            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};
