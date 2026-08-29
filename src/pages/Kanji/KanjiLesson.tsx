import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  LayoutGrid,
  List,
  Check,
  X,
  BookOpen,
  Keyboard,
  Sparkles,
  Volume2,
  Heart,
  Pencil,
  Search,
  Layers,
  Award,
  HelpCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toRomaji } from 'wanakana';

import { kanjiLesson1, lesson1Vocab, type VocabExample } from '../../data/kanjiData';
import { kanjiLesson2, vocabLesson2 } from '../../data/kanjiDataLesson2';
import { kanjiLesson3, vocabLesson3 } from '../../data/kanjiDataLesson3';
import { kanjiLessonJPD123, vocabLessonJPD123 } from '../../data/kanjiDataJPD123';
import { kanjiLesson5JPD123, vocabLesson5JPD123 } from '../../data/kanjiDataJPD123Lesson5';
import { kanjiLesson6JPD123, vocabLesson6JPD123 } from '../../data/kanjiDataJPD123Lesson6';
import { kanjiLesson7JPD123, vocabLesson7JPD123 } from '../../data/kanjiDataJPD123Lesson7';
import { KanjiVocabTyping } from '../../components/Kanji/KanjiVocabTyping';
import { KanjiFlashcard } from '../../components/Kanji/KanjiFlashcard';
import { VocabFlashcard } from '../../components/Kanji/VocabFlashcard';
import { VocabQuiz } from '../../components/Kanji/VocabQuiz';
import { JapaneseMascot } from '../../components/mascot/JapaneseMascot';

export const KanjiLesson = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [isFlashcardMode, setIsFlashcardMode] = useState(false);
  const [isVocabFlashcardMode, setIsVocabFlashcardMode] = useState(false);
  const [isVocabQuizMode, setIsVocabQuizMode] = useState(false);
  const [typingVocab, setTypingVocab] = useState<VocabExample[] | null>(null);
  const [selectedKanjiIds, setSelectedKanjiIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'memorized' | 'favorites'>('all');
  const [playingAudioKanji, setPlayingAudioKanji] = useState<string | null>(null);

  // Lưu trạng thái yêu thích & ghi nhớ vào localStorage
  const [favoriteKanjiIds, setFavoriteKanjiIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(`kanji_fav_${courseId}_${lessonId}`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [memorizedKanjiIds, setMemorizedKanjiIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(`kanji_memo_${courseId}_${lessonId}`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavoriteKanjiIds(prev => {
      const next = prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
      localStorage.setItem(`kanji_fav_${courseId}_${lessonId}`, JSON.stringify(next));
      return next;
    });
  };

  const toggleMemorized = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMemorizedKanjiIds(prev => {
      const next = prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
      localStorage.setItem(`kanji_memo_${courseId}_${lessonId}`, JSON.stringify(next));
      return next;
    });
  };

  // Phát âm chữ Hán / từ vựng chuẩn giọng Tokyo
  const playAudio = (text: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.85;
      setPlayingAudioKanji(text);
      utterance.onend = () => setPlayingAudioKanji(null);
      utterance.onerror = () => setPlayingAudioKanji(null);
      window.speechSynthesis.speak(utterance);
    }
  };

  let kanjiList = kanjiLesson1;
  let vocabList = lesson1Vocab;

  if (courseId?.toLowerCase() === 'jpd123') {
    if (lessonId === '5') {
      kanjiList = kanjiLesson5JPD123;
      vocabList = vocabLesson5JPD123;
    } else if (lessonId === '6') {
      kanjiList = kanjiLesson6JPD123;
      vocabList = vocabLesson6JPD123;
    } else if (lessonId === '7') {
      kanjiList = kanjiLesson7JPD123;
      vocabList = vocabLesson7JPD123;
    } else {
      kanjiList = kanjiLessonJPD123;
      vocabList = vocabLessonJPD123;
    }
  } else {
    if (lessonId === '2') {
      kanjiList = kanjiLesson2;
      vocabList = vocabLesson2;
    } else if (lessonId === '3') {
      kanjiList = kanjiLesson3;
      vocabList = vocabLesson3;
    }
  }

  const isJPD123 = courseId?.toLowerCase() === 'jpd123';
  const theme = isJPD123 ? {
    color: 'text-blue-600 dark:text-blue-400',
    bgLight: 'bg-blue-100/90 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300 border border-blue-200 dark:border-blue-800',
    border: 'border-blue-200/80 dark:border-slate-800',
    btn: 'from-blue-600 via-sky-500 to-indigo-600 hover:from-blue-700 hover:to-sky-600 shadow-[0_8px_20px_rgba(59,130,246,0.3)]',
    gradient: 'from-blue-600 via-sky-500 to-cyan-400',
    selected: 'border-blue-500 bg-blue-50/60 dark:bg-blue-950/40 shadow-md',
    selectedPill: 'bg-blue-500 text-white',
    hoverBorder: 'hover:border-blue-300 dark:hover:border-blue-600/50 hover:shadow-lg',
    progressBar: 'from-blue-500 to-cyan-500'
  } : {
    color: 'text-rose-600 dark:text-rose-400',
    bgLight: 'bg-rose-100/90 text-rose-700 dark:bg-rose-950/70 dark:text-rose-300 border border-rose-200 dark:border-rose-800',
    border: 'border-rose-200/80 dark:border-slate-800',
    btn: 'from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-600 shadow-[0_8px_20px_rgba(244,63,94,0.3)]',
    gradient: 'from-rose-500 via-pink-500 to-amber-400',
    selected: 'border-rose-500 bg-rose-50/60 dark:bg-rose-950/40 shadow-md',
    selectedPill: 'bg-rose-500 text-white',
    hoverBorder: 'hover:border-rose-300 dark:hover:border-rose-600/50 hover:shadow-lg',
    progressBar: 'from-rose-500 to-pink-500'
  };

  // Từ vựng mở rộng
  const otherVocab = vocabList.filter(vocab => {
    return !kanjiList.some(kanji => vocab.kanji.includes(kanji.char));
  });

  // Lọc Hán tự theo tìm kiếm & tabs
  const filteredKanjiList = useMemo(() => {
    return kanjiList.filter(k => {
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q || 
        k.char.includes(q) || 
        k.hanViet.toLowerCase().includes(q) || 
        k.meaning.toLowerCase().includes(q) || 
        k.onyomi.some(on => on.toLowerCase().includes(q)) || 
        k.kunyomi.some(kun => kun.toLowerCase().includes(q));

      if (!matchSearch) return false;

      if (activeTab === 'memorized') return memorizedKanjiIds.includes(k.id);
      if (activeTab === 'favorites') return favoriteKanjiIds.includes(k.id);
      return true;
    });
  }, [kanjiList, searchQuery, activeTab, memorizedKanjiIds, favoriteKanjiIds]);

  let selectedVocabList = vocabList;
  if (selectedKanjiIds.length > 0) {
    const selectedKanjis = kanjiList.filter(k => selectedKanjiIds.includes(k.id));
    const tempVocab = selectedKanjis.flatMap(k => k.vocab || []);
    if (selectedKanjiIds.includes('other')) {
      tempVocab.push(...otherVocab);
    }

    const seen = new Set();
    selectedVocabList = tempVocab.filter(v => {
      const kanjiClean = (v.kanji || '').replace(/\s/g, '');
      const hiraClean = (v.hiragana || '').replace(/\s/g, '');
      const key = kanjiClean + '_' + hiraClean;

      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  const totalSelectableItems = kanjiList.length + (otherVocab.length > 0 ? 1 : 0);

  return (
    <div className="relative min-h-full scroll-smooth bg-transparent pb-20 font-sans">
      <div className="mx-auto max-w-[1440px] px-4 py-4 sm:px-6 lg:px-8 space-y-6">

        {/* ========================================================================= */}
        {/* 1. TOP HERO BANNER: THU NHỎ GỌN GÀNG & LINH VẬT FULL NGƯỜI NHỎ GỌN */}
        {/* ========================================================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className={`relative overflow-hidden rounded-[26px] bg-gradient-to-br from-white via-white to-slate-50/80 dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-950 border ${theme.border} p-4 sm:p-5 shadow-xs`}
        >
          {/* Ambient Subtle Glow */}
          <div className="pointer-events-none absolute -right-12 -top-12 w-48 h-48 rounded-full bg-rose-300/15 dark:bg-rose-600/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-12 -bottom-12 w-48 h-48 rounded-full bg-blue-300/15 dark:bg-blue-600/10 blur-3xl" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Cột trái: Breadcrumb + Tiêu đề + Thống kê inline */}
            <div className="space-y-2.5 flex-1 min-w-0">
              
              {/* Top row: Nút quay lại + Badge bài học */}
              <div className="flex flex-wrap items-center gap-2">
                <motion.button 
                  onClick={() => navigate('/kanji')}
                  whileHover={{ scale: 1.03, x: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white dark:bg-slate-800 px-3 py-1 text-xs font-black text-slate-700 dark:text-slate-200 shadow-xs border border-slate-200 dark:border-slate-700 hover:border-blue-300 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  <ArrowLeft size={13} strokeWidth={2.4} /> 
                  <span>Tất cả bài học</span>
                </motion.button>

                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${theme.bgLight}`}>
                  <Sparkles size={12} strokeWidth={2.2} />
                  {courseId?.toUpperCase()} • Bài {lessonId}
                </span>
              </div>

              {/* Tiêu đề & Mô tả */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                  Danh Sách Hán Tự Bài {lessonId}
                </h1>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                  Luyện nhận diện mặt chữ, tra cứu âm Hán Việt, luyện thứ tự nét viết cọ và từ vựng ứng dụng.
                </p>
              </div>

              {/* Khối Thống kê dạng Pills ngang cực gọn */}
              <div className="pt-0.5 flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs font-bold text-slate-500 dark:text-slate-400">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700">
                  <Award size={14} strokeWidth={2.2} className={theme.color} />
                  <span><strong className="text-slate-900 dark:text-white">{kanjiList.length}</strong> Hán tự</span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700">
                  <Layers size={14} strokeWidth={2.2} className={theme.color} />
                  <span><strong className="text-slate-900 dark:text-white">{vocabList.length}</strong> Từ vựng</span>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700 flex-1 min-w-[180px] max-w-xs">
                  <span>Đã nhớ: <strong className={theme.color}>{memorizedKanjiIds.length}/{kanjiList.length} chữ</strong></span>
                  <div className="flex-1 h-2 rounded-full bg-slate-200/80 dark:bg-slate-700 overflow-hidden">
                    <div 
                      className={`h-full rounded-full bg-gradient-to-r ${theme.progressBar} transition-all`}
                      style={{ width: `${kanjiList.length > 0 ? (memorizedKanjiIds.length / kanjiList.length) * 100 : 0}%` }}
                    />
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
        {/* 2. THANH CÔNG CỤ LUYỆN TẬP NHANH & BỘ LỌC */}
        {/* ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          
          {/* Bộ nút luyện tập 4 công cụ */}
          <div className="flex flex-wrap items-center gap-2">
            <motion.button
              onClick={() => setIsFlashcardMode(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800 text-xs font-black hover:bg-rose-100 transition-colors cursor-pointer"
            >
              <LayoutGrid size={15} strokeWidth={2.2} />
              <span>Flashcard Kanji</span>
            </motion.button>

            <motion.button
              onClick={() => setIsVocabFlashcardMode(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 text-xs font-black hover:bg-blue-100 transition-colors cursor-pointer"
            >
              <BookOpen size={15} strokeWidth={2.2} />
              <span>Flashcard Từ vựng</span>
            </motion.button>

            <motion.button
              onClick={() => setTypingVocab(isSelectMode ? selectedVocabList : vocabList)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 text-xs font-black hover:bg-emerald-100 transition-colors cursor-pointer"
            >
              <Keyboard size={15} strokeWidth={2.2} />
              <span>Luyện Gõ ({isSelectMode && selectedKanjiIds.length > 0 ? selectedVocabList.length : vocabList.length})</span>
            </motion.button>

            <motion.button
              onClick={() => setIsVocabQuizMode(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800 text-xs font-black hover:bg-amber-100 transition-colors cursor-pointer"
            >
              <HelpCircle size={15} strokeWidth={2.2} />
              <span>Trắc Nghiệm</span>
            </motion.button>
          </div>

          {/* Ô Tìm kiếm & Chế độ chọn */}
          <div className="flex items-center gap-2.5">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
              <input
                type="text"
                placeholder="Tìm Hán tự, âm Hán Việt, On/Kun..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <X size={13} />
                </button>
              )}
            </div>

            <motion.button
              onClick={() => {
                setIsSelectMode(!isSelectMode);
                if (isSelectMode) setSelectedKanjiIds([]);
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-black transition-colors cursor-pointer ${
                isSelectMode 
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent' 
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              {isSelectMode ? <X size={14} /> : <List size={14} />}
              <span>{isSelectMode ? 'Hủy chọn' : 'Chọn nhiều'}</span>
            </motion.button>
          </div>

        </div>

        {/* Toolbar phụ khi ở chế độ Select Mode */}
        {isSelectMode && (
          <div className="flex items-center justify-between p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800 text-xs font-bold text-blue-700 dark:text-blue-300">
            <span>Đã chọn: <strong>{selectedKanjiIds.length} / {totalSelectableItems}</strong> chữ ({selectedVocabList.length} từ vựng)</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (selectedKanjiIds.length === totalSelectableItems) {
                    setSelectedKanjiIds([]);
                  } else {
                    setSelectedKanjiIds([...kanjiList.map(k => k.id), ...(otherVocab.length > 0 ? ['other'] : [])]);
                  }
                }}
                className="px-3 py-1 rounded-lg bg-blue-600 text-white font-black hover:bg-blue-700 cursor-pointer"
              >
                {selectedKanjiIds.length === totalSelectableItems ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
              </button>
            </div>
          </div>
        )}

        {/* Tabs Lọc: Tất cả • Đã nhớ • Yêu thích */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 text-xs font-bold">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'all' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-black' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Tất cả ({kanjiList.length})
          </button>
          <button
            onClick={() => setActiveTab('memorized')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'memorized' ? 'bg-emerald-600 text-white font-black' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Đã nhớ ({memorizedKanjiIds.length})
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'favorites' ? 'bg-rose-600 text-white font-black' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Yêu thích ({favoriteKanjiIds.length})
          </button>
        </div>

        {/* ========================================================================= */}
        {/* 3. LƯỚI THẺ HÁN TỰ HIỆN ĐẠI (KANJI CARDS GRID - 3 CỘT) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredKanjiList.map((kanji) => {
            const isSelected = selectedKanjiIds.includes(kanji.id);
            const isFav = favoriteKanjiIds.includes(kanji.id);
            const isMemo = memorizedKanjiIds.includes(kanji.id);

            return (
              <motion.div
                key={kanji.id}
                whileHover={{ y: -6, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
                whileTap={{ scale: 0.99 }}
                style={{ willChange: 'transform', transform: 'translateZ(0)' }}
                onClick={() => {
                  if (isSelectMode) {
                    setSelectedKanjiIds(prev => prev.includes(kanji.id) ? prev.filter(id => id !== kanji.id) : [...prev, kanji.id]);
                  } else {
                    navigate(`/kanji/${courseId}/lesson/${lessonId}/${kanji.id}`);
                  }
                }}
                className={`group relative overflow-hidden rounded-[26px] border bg-white dark:bg-slate-900 p-5 shadow-sm hover:shadow-xl cursor-pointer flex flex-col justify-between transition-all duration-300 ${
                  isSelectMode && isSelected 
                    ? theme.selected 
                    : `${theme.hoverBorder} border-slate-200/80 dark:border-slate-800`
                }`}
              >
                {/* Dải màu đỉnh thẻ */}
                <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${theme.gradient}`} />

                <div className="space-y-4">
                  
                  {/* Header Thẻ: Stage Chữ Hán & Âm Hán Việt */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      
                      {/* Khung Chữ Hán To Chuẩn Nét Cọ */}
                      <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                        <span className="font-jp text-4xl font-black text-slate-900 dark:text-white leading-none">
                          {kanji.char}
                        </span>
                      </div>

                      {/* Âm Hán Việt & Nghĩa */}
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-black uppercase text-slate-900 dark:text-white tracking-tight">
                            {kanji.hanViet}
                          </h3>
                        </div>
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                          {kanji.meaning}
                        </p>
                        <span className="inline-block text-[10px] font-bold text-slate-400 mt-1">
                          {kanji.strokes || 4} nét • {kanji.vocab?.length || 0} từ ghép
                        </span>
                      </div>

                    </div>

                    {/* Nút hành động nhanh: Yêu thích & Loa & Checkbox */}
                    <div className="flex items-center gap-1.5">
                      {isSelectMode ? (
                        <div className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-colors ${
                          isSelected ? theme.selectedPill : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800'
                        }`}>
                          {isSelected && <Check size={14} strokeWidth={3} />}
                        </div>
                      ) : (
                        <>
                          <button
                            onClick={(e) => playAudio(kanji.char, e)}
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-xs cursor-pointer ${
                              playingAudioKanji === kanji.char ? 'bg-rose-500 text-white animate-pulse' : 'bg-slate-50 dark:bg-slate-800 text-slate-500 hover:text-blue-600'
                            }`}
                            title="Nghe phát âm"
                          >
                            <Volume2 size={14} />
                          </button>
                          <button
                            onClick={(e) => toggleFavorite(kanji.id, e)}
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-xs cursor-pointer ${
                              isFav ? 'bg-rose-50 text-rose-500 dark:bg-rose-950/60' : 'bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-rose-500'
                            }`}
                            title="Yêu thích"
                          >
                            <Heart size={14} fill={isFav ? 'currentColor' : 'none'} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Âm On'yomi & Kun'yomi */}
                  <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                      <p className="text-[9px] font-bold text-slate-400 uppercase">On'yomi</p>
                      <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5 truncate">
                        {kanji.onyomi.length > 0 ? kanji.onyomi.join(', ') : '—'}
                      </p>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                      <p className="text-[9px] font-bold text-slate-400 uppercase">Kun'yomi</p>
                      <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5 truncate">
                        {kanji.kunyomi.length > 0 ? kanji.kunyomi.join(', ') : '—'}
                      </p>
                    </div>
                  </div>

                  {/* Từ vựng tiêu biểu */}
                  {kanji.vocab && kanji.vocab.length > 0 && (
                    <div className="space-y-1 pt-1">
                      <p className="text-[10px] font-black uppercase text-slate-400">Từ ghép mẫu:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {kanji.vocab.slice(0, 2).map((v, vIdx) => (
                          <span
                            key={vIdx}
                            onClick={(e) => playAudio(v.kanji, e)}
                            className="px-2.5 py-1 rounded-lg bg-slate-100/80 dark:bg-slate-800 text-[11px] font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center gap-1 transition-colors"
                          >
                            <span className="font-jp">{v.kanji}</span>
                            <span className="text-[10px] font-normal text-slate-400">({v.hiragana})</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Bottom Actions */}
                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <button
                      onClick={(e) => toggleMemorized(kanji.id, e)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                        isMemo 
                          ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800' 
                          : 'bg-slate-50 text-slate-500 hover:text-slate-800 dark:bg-slate-800 dark:text-slate-400'
                      }`}
                    >
                      <Check size={13} strokeWidth={2.5} />
                      <span>{isMemo ? 'Đã nhớ' : 'Chưa nhớ'}</span>
                    </button>

                    <button
                      onClick={() => navigate(`/kanji/${courseId}/lesson/${lessonId}/${kanji.id}`)}
                      className="inline-flex items-center gap-1 text-xs font-black text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                    >
                      <Pencil size={13} />
                      <span>Tập viết & Chi tiết</span>
                    </button>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* 4. TỪ VỰNG ỨNG DỤNG TRONG BÀI (COLLAPSIBLE / ACCORDION) */}
        {/* ========================================================================= */}
        <div className="p-6 rounded-[28px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className={theme.color} size={20} />
              Từ Vựng Ứng Dụng Trong Bài ({vocabList.length} từ)
            </h3>
            <button
              onClick={() => setTypingVocab(vocabList)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-200 cursor-pointer"
            >
              <Keyboard size={14} /> Luyện gõ danh sách này
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {vocabList.map((vocab, idx) => (
              <div
                key={idx}
                onClick={() => playAudio(vocab.kanji)}
                className="p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-800 flex items-center justify-between gap-3 cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-6 h-6 rounded-lg bg-white dark:bg-slate-700 text-[10px] font-black text-slate-400 flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="font-jp font-black text-sm text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                      {vocab.kanji}
                    </p>
                    <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                      {vocab.hiragana} • {toRomaji(vocab.hiragana)}
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-200">{vocab.meaning}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Modal Luyện Gõ */}
      {typingVocab && (
        <KanjiVocabTyping
          vocabList={typingVocab}
          onClose={() => setTypingVocab(null)}
          isJPD123={isJPD123}
        />
      )}

      {/* Modal Flashcard Kanji */}
      {isFlashcardMode && (
        <KanjiFlashcard
          kanjiList={selectedKanjiIds.length > 0 ? kanjiList.filter(k => selectedKanjiIds.includes(k.id)) : kanjiList}
          onClose={() => setIsFlashcardMode(false)}
          isJPD123={isJPD123}
        />
      )}

      {/* Modal Flashcard Từ Vựng */}
      {isVocabFlashcardMode && (
        <VocabFlashcard
          vocabList={vocabList}
          onClose={() => setIsVocabFlashcardMode(false)}
          isJPD123={isJPD123}
        />
      )}

      {/* Modal Trắc Nghiệm */}
      {isVocabQuizMode && (
        <VocabQuiz
          vocabList={vocabList}
          lessonName={`Lesson ${lessonId}`}
          onClose={() => setIsVocabQuizMode(false)}
          isJPD123={isJPD123}
        />
      )}

    </div>
  );
};
