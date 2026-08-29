import { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  LayoutGrid,
  Keyboard,
  List,
  Brain,
  Search,
  Volume2,
  Heart,
  Check,
  BookOpen,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { KanjiVocabTyping } from '../../components/Kanji/KanjiVocabTyping';
import { VocabQuiz } from '../../components/Kanji/VocabQuiz';
import { VocabFlashcard } from '../../components/Kanji/VocabFlashcard';
import { vocabularyData } from '../../data/vocabularyData';

export const VocabularyDetail = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();

  const [isTypingMode, setIsTypingMode] = useState(false);
  const [isVocabQuizMode, setIsVocabQuizMode] = useState(false);
  const [isFlashcardMode, setIsFlashcardMode] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterTab, setFilterTab] = useState<'all' | 'memorized' | 'learning' | 'bookmarked'>('all');
  const [selectedWordIds, setSelectedWordIds] = useState<number[]>([]);
  const [speakingWordId, setSpeakingWordId] = useState<number | null>(null);

  // Lưu trạng thái Yêu thích & Đã nhớ vào LocalStorage
  const storageKeyMemorized = `jp_vocab_memorized_${courseId}_${lessonId}`;
  const storageKeyBookmarks = `jp_vocab_bookmarks_${courseId}_${lessonId}`;

  const [memorizedWordIds, setMemorizedWordIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(storageKeyMemorized);
      return saved ? JSON.parse(saved) : [1, 2]; // mặc định demo 2 từ đã nhớ
    } catch {
      return [1, 2];
    }
  });

  const [bookmarkedWordIds, setBookmarkedWordIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(storageKeyBookmarks);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(storageKeyMemorized, JSON.stringify(memorizedWordIds));
  }, [memorizedWordIds, storageKeyMemorized]);

  useEffect(() => {
    localStorage.setItem(storageKeyBookmarks, JSON.stringify(bookmarkedWordIds));
  }, [bookmarkedWordIds, storageKeyBookmarks]);

  const rawVocabList = useMemo(() => {
    return lessonId && vocabularyData[lessonId] ? vocabularyData[lessonId] : vocabularyData['4-1'] || [];
  }, [lessonId]);

  // Bộ lọc từ vựng theo Tìm kiếm + Tab
  const filteredVocabList = useMemo(() => {
    return rawVocabList.filter(item => {
      // 1. Lọc theo tab
      if (filterTab === 'memorized' && !memorizedWordIds.includes(item.id)) return false;
      if (filterTab === 'learning' && memorizedWordIds.includes(item.id)) return false;
      if (filterTab === 'bookmarked' && !bookmarkedWordIds.includes(item.id)) return false;

      // 2. Lọc theo text search
      if (!searchQuery.trim()) return true;
      const lowerQuery = searchQuery.toLowerCase();
      return (
        item.kanji.toLowerCase().includes(lowerQuery) ||
        item.hiragana.toLowerCase().includes(lowerQuery) ||
        (item.romaji && item.romaji.toLowerCase().includes(lowerQuery)) ||
        item.meaning.toLowerCase().includes(lowerQuery)
      );
    });
  }, [rawVocabList, searchQuery, filterTab, memorizedWordIds, bookmarkedWordIds]);

  const titleMapping: Record<string, string> = {
    '4-1': 'Phương hướng và phương tiện',
    '4-2': 'Địa điểm và tính từ',
    '4-3': 'Thời tiết và vị giác',
    '5-1': 'Thời gian và hoạt động',
    '5-2': 'Thời tiết và cảm xúc',
    '5-3': 'Sở thích & Đam mê',
    '6-1': 'Kế hoạch và sự kiện',
    '6-2': 'Ăn uống và mua sắm',
    '6-3': 'Ẩm thực Nhật Bản',
    '7-1': 'Vị trí và địa điểm',
    '7-2': 'Đồ dùng và hành động',
    '7-3': 'Hoạt động thường ngày',
    '1-1': 'Chào hỏi cơ bản',
    '1-2': 'Số đếm và tuổi',
    '1-3': 'Quốc tịch và nghề nghiệp',
  };
  const titleText = lessonId && titleMapping[lessonId] ? titleMapping[lessonId] : 'Danh sách từ vựng';

  const isJpd123 = courseId?.toLowerCase() === 'jpd123';
  const theme = {
    textAccent: isJpd123 ? 'text-blue-600 dark:text-blue-400' : 'text-rose-600 dark:text-rose-400',
    bgAccentLight: isJpd123 ? 'bg-blue-100/90 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300 border border-blue-200 dark:border-blue-800/80' : 'bg-rose-100/90 text-rose-700 dark:bg-rose-950/70 dark:text-rose-300 border border-rose-200 dark:border-rose-800/80',
    btn: isJpd123 ? 'from-blue-600 via-sky-500 to-indigo-600 hover:from-blue-700 hover:to-sky-600 shadow-[0_8px_20px_rgba(59,130,246,0.3)]' : 'from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-600 shadow-[0_8px_20px_rgba(244,63,94,0.3)]',
    gradient: isJpd123 ? 'from-blue-600 via-sky-500 to-cyan-400' : 'from-rose-500 via-pink-500 to-amber-300',
    softGradient: isJpd123 ? 'from-blue-50/90 via-white to-sky-50/70 dark:from-slate-900 dark:via-slate-900/90 dark:to-blue-950/30' : 'from-rose-50/90 via-white to-amber-50/70 dark:from-slate-900 dark:via-slate-900/90 dark:to-rose-950/30',
    borderAccent: isJpd123 ? 'border-blue-200/80 dark:border-slate-800' : 'border-rose-200/80 dark:border-slate-800',
    hoverBorder: isJpd123 ? 'hover:border-blue-300 dark:hover:border-blue-600/50' : 'hover:border-rose-300 dark:hover:border-rose-600/50',
    tagPill: isJpd123 ? 'bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300 border border-sky-200/80 dark:border-sky-800' : 'bg-pink-50 text-pink-700 dark:bg-pink-950/60 dark:text-pink-300 border border-pink-200/80 dark:border-pink-800'
  };

  const selectedCount = selectedWordIds.length;

  // Phát âm tiếng Nhật chuẩn
  const handleSpeak = (kanji: string, id: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    setSpeakingWordId(id);
    const utterance = new SpeechSynthesisUtterance(kanji);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.85;
    utterance.onend = () => setSpeakingWordId(null);
    utterance.onerror = () => setSpeakingWordId(null);
    window.speechSynthesis.speak(utterance);
  };

  // Toggle Bookmark
  const toggleBookmark = (id: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setBookmarkedWordIds(prev => 
      prev.includes(id) ? prev.filter(wId => wId !== id) : [...prev, id]
    );
  };

  // Toggle Đã nhớ
  const toggleMemorize = (id: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setMemorizedWordIds(prev => 
      prev.includes(id) ? prev.filter(wId => wId !== id) : [...prev, id]
    );
  };

  // Toggle chọn từ để luyện tập
  const toggleWordSelection = (id: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedWordIds(prev =>
      prev.includes(id) ? prev.filter(wordId => wordId !== id) : [...prev, id]
    );
  };

  // Đánh dấu tất cả từ đã chọn thành Đã nhớ
  const handleBatchMemorize = () => {
    if (selectedWordIds.length === 0) return;
    setMemorizedWordIds(prev => Array.from(new Set([...prev, ...selectedWordIds])));
    setSelectedWordIds([]);
  };

  const startTyping = () => {
    setIsTypingMode(true);
  };

  const typingList = useMemo(() => {
    if (selectedCount > 0) {
      return rawVocabList.filter(item => selectedWordIds.includes(item.id));
    }
    return rawVocabList;
  }, [rawVocabList, selectedCount, selectedWordIds]);

  return (
    <>
      <div className="vocab-list-surface space-y-8 pb-16 max-w-[1440px] mx-auto pt-1 font-sans">
        
        {/* ========================================================================= */}
        {/* 1. TOP HEADER & ACTION TOOLBAR */}
        {/* ========================================================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className={`smooth-panel relative overflow-hidden rounded-[34px] bg-gradient-to-br ${theme.softGradient} border ${theme.borderAccent} p-7 sm:p-8 shadow-[0_12px_34px_rgba(15,23,42,0.055)]`}
        >
          {/* Top Back Button */}
          <div className="relative z-10 flex items-center justify-between gap-3 mb-4">
            <button 
              onClick={() => navigate(`/vocabulary/${courseId}`)}
              className="inline-flex items-center gap-2 rounded-full bg-white dark:bg-slate-800 px-4 py-2 text-xs sm:text-sm font-black text-slate-800 dark:text-slate-100 shadow-xs border border-slate-200 dark:border-slate-700 hover:border-blue-300 hover:text-blue-600 transition-colors cursor-pointer"
            >
              <ArrowLeft size={16} strokeWidth={2.2} /> 
              <span>Danh sách bài học</span>
            </button>

            <div className="flex items-center gap-2">
              <span className={`px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${theme.bgAccentLight}`}>
                Lesson {lessonId}
              </span>
              <span className="px-3.5 py-1.5 rounded-full text-xs font-black bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 shadow-xs">
                {rawVocabList.length} từ vựng
              </span>
            </div>
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            {/* Tiêu đề & Thông tin bài */}
            <div className="space-y-1.5">
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                {titleText}
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
                Học từ vựng theo bài, nghe phát âm chuẩn Tokyo và luyện tập phản xạ với bộ 4 công cụ tương tác.
              </p>
            </div>

            {/* 4 Nút Hành Động Nhanh (Action Toolbar) */}
            <div className="flex items-center gap-2.5 flex-wrap">
              
              {/* Nút 1: Flashcard */}
              <button 
                onClick={() => setIsFlashcardMode(true)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r ${theme.btn} text-white font-black text-xs sm:text-sm shadow-sm cursor-pointer`}
              >
                <LayoutGrid size={16} strokeWidth={2.2} />
                <span>Flashcard</span>
              </button>

              {/* Nút 2: Luyện gõ Typing */}
              <button 
                onClick={startTyping}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-300 text-slate-800 dark:text-slate-100 font-black text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
              >
                <Keyboard size={16} strokeWidth={2.2} className="text-blue-500" />
                <span>Luyện gõ {selectedCount > 0 ? `(${selectedCount})` : ''}</span>
              </button>

              {/* Nút 3: Trắc nghiệm Quiz */}
              <button 
                onClick={() => setIsVocabQuizMode(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-amber-300 text-slate-800 dark:text-slate-100 font-black text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
              >
                <List size={16} strokeWidth={2.2} className="text-amber-500" />
                <span>Trắc nghiệm</span>
              </button>

              {/* Nút 4: Ghi nhớ đã chọn */}
              <button 
                onClick={handleBatchMemorize}
                disabled={selectedCount === 0}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm shadow-xs transition-colors duration-150 ${
                  selectedCount > 0 
                    ? 'bg-emerald-500 text-white shadow-emerald-500/30 cursor-pointer' 
                    : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800/80 cursor-default opacity-80'
                }`}
              >
                <Brain size={16} strokeWidth={2.2} />
                <span>Ghi nhớ {selectedCount > 0 ? `(${selectedCount})` : ''}</span>
              </button>

            </div>

          </div>
        </motion.div>


        {/* ========================================================================= */}
        {/* 2. THANH TÌM KIẾM & BỘ LỌC THÔNG MINH */}
        {/* ========================================================================= */}
        <div className="space-y-3">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Ô tìm kiếm */}
            <div className="relative flex-1 w-full">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm kiếm từ vựng, Hiragana, Romaji hoặc nghĩa tiếng Việt..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-24 py-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 focus:border-blue-400 dark:focus:border-blue-500 focus:outline-none text-sm font-bold text-slate-800 dark:text-slate-100 shadow-xs transition-colors"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                )}
                <span className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] font-black text-slate-400">
                  {filteredVocabList.length}/{rawVocabList.length}
                </span>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700 shrink-0">
              
              <button
                onClick={() => setFilterTab('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-colors duration-150 cursor-pointer ${
                  filterTab === 'all' 
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
                }`}
              >
                Tất cả ({rawVocabList.length})
              </button>

              <button
                onClick={() => setFilterTab('memorized')}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-colors duration-150 cursor-pointer ${
                  filterTab === 'memorized' 
                    ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
                }`}
              >
                Đã nhớ ({memorizedWordIds.length})
              </button>

              <button
                onClick={() => setFilterTab('learning')}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-colors duration-150 cursor-pointer ${
                  filterTab === 'learning' 
                    ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-xs' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
                }`}
              >
                Cần ôn ({rawVocabList.length - memorizedWordIds.length})
              </button>

              <button
                onClick={() => setFilterTab('bookmarked')}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-colors duration-150 cursor-pointer ${
                  filterTab === 'bookmarked' 
                    ? 'bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 shadow-xs' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
                }`}
              >
                Yêu thích ({bookmarkedWordIds.length})
              </button>

            </div>

          </div>
        </div>


        {/* ========================================================================= */}
        {/* 3. DANH SÁCH THẺ TỪ VỰNG CHI TIẾT (VOCABULARY ROW CARDS) */}
        {/* ========================================================================= */}
        <div className="vocab-list-surface space-y-3">
          {filteredVocabList.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-[30px] border border-slate-200/80 dark:border-slate-800 space-y-3">
              <BookOpen size={36} className="mx-auto text-slate-300 dark:text-slate-600" />
              <p className="text-base font-black text-slate-700 dark:text-slate-300">Không tìm thấy từ vựng phù hợp</p>
              <p className="text-xs text-slate-400">Hãy thử đổi từ khóa tìm kiếm hoặc chọn tab khác</p>
            </div>
          ) : (
            filteredVocabList.map((item, index) => {
              const isSelected = selectedWordIds.includes(item.id);
              const isMemorized = memorizedWordIds.includes(item.id);
              const isBookmarked = bookmarkedWordIds.includes(item.id);
              const isSpeaking = speakingWordId === item.id;

              return (
                <div
                  key={item.id}
                  onClick={(e) => toggleWordSelection(item.id, e)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      toggleWordSelection(item.id);
                    }
                  }}
                  className={`vocab-detail-row relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 p-4 border transition-colors duration-150 cursor-pointer shadow-none outline-none focus-visible:ring-4 focus-visible:ring-blue-500/20 ${
                    isSelected 
                      ? 'border-blue-400 dark:border-blue-500 ring-2 ring-blue-100 dark:ring-blue-900/50' 
                      : 'border-slate-200/80 dark:border-slate-800 hover:border-slate-300 hover:bg-slate-50/70 dark:hover:border-slate-700 dark:hover:bg-slate-800/70'
                  }`}
                >
                  {/* Left Accent Bar */}
                  <div className={`absolute inset-y-0 left-0 w-1 bg-gradient-to-b ${theme.gradient} ${isSelected ? 'opacity-100' : 'opacity-60'}`} />

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    
                    {/* Cột trái: Checkbox + Số thứ tự + Kanji + Cách đọc + Nghĩa */}
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      
                      {/* Checkbox */}
                      <div 
                        onClick={(e) => toggleWordSelection(item.id, e)}
                        className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 transition-colors ${
                          isSelected 
                            ? 'bg-blue-500 border-blue-500 text-white' 
                            : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800'
                        }`}
                      >
                        {isSelected && <Check size={14} strokeWidth={3} />}
                      </div>

                      {/* Số thứ tự */}
                      <span className="text-xs font-black text-slate-400 w-6 shrink-0 font-mono">
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      {/* Thông tin từ vựng */}
                      <div className="grid grid-cols-1 md:grid-cols-[140px_160px_minmax(0,1fr)] items-center gap-3 md:gap-6 flex-1 min-w-0">
                        
                        {/* Kanji & Romaji */}
                        <div className="min-w-0">
                          <span className="block text-2xl font-black text-slate-900 dark:text-white font-jp tracking-tight truncate">
                            {item.kanji}
                          </span>
                          <span className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] font-mono truncate">
                            {item.romaji || item.hiragana}
                          </span>
                        </div>

                        {/* Cách đọc Hiragana */}
                        <div className="min-w-0">
                          <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Cách đọc:</span>
                          <span className={`text-base font-black font-jp truncate ${theme.textAccent}`}>
                            {item.hiragana}
                          </span>
                        </div>

                        {/* Loại từ + Nghĩa tiếng Việt + Ghi chú phân biệt */}
                        <div className="min-w-0 flex items-center gap-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 px-3.5 py-2">
                          <span className={`shrink-0 text-[10px] font-black uppercase px-2 py-0.5 rounded-lg ${theme.tagPill}`}>
                            {item.type || 'DANH TỪ'}
                          </span>
                          <span className="text-sm font-black text-slate-800 dark:text-slate-200 truncate">
                            {item.meaning}
                          </span>
                          {item.note && (
                            <span className="shrink-0 text-[10px] font-black px-2 py-0.5 rounded-lg bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800">
                              {item.note}
                            </span>
                          )}
                        </div>

                      </div>

                    </div>

                    {/* Cột phải: Loa phát âm + Bookmark Tim + Trạng thái Đã nhớ */}
                    <div className="flex items-center gap-2 shrink-0 justify-end border-t border-slate-100 dark:border-slate-800 md:border-0 pt-3 md:pt-0">
                      
                      {/* Loa phát âm */}
                      <button 
                        onClick={(e) => handleSpeak(item.hiragana || item.kanji, item.id, e)}
                        title="Phát âm chuẩn tiếng Nhật"
                        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
                          isSpeaking 
                            ? 'bg-blue-600 text-white animate-pulse' 
                            : 'bg-slate-50 dark:bg-slate-800 text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/60'
                        }`}
                      >
                        <Volume2 size={16} strokeWidth={2.2} />
                      </button>

                      {/* Bookmark Trái tim */}
                      <button 
                        onClick={(e) => toggleBookmark(item.id, e)}
                        title={isBookmarked ? 'Bỏ lưu yêu thích' : 'Lưu vào từ vựng yêu thích'}
                        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
                          isBookmarked 
                            ? 'bg-rose-50 dark:bg-rose-950 text-rose-500 border border-rose-200 dark:border-rose-800' 
                            : 'bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-rose-500 hover:bg-rose-50'
                        }`}
                      >
                        <Heart size={16} strokeWidth={2.2} className={isBookmarked ? 'fill-current' : ''} />
                      </button>

                      {/* Trạng thái Đã nhớ */}
                      <button 
                        onClick={(e) => toggleMemorize(item.id, e)}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black transition-colors cursor-pointer ${
                          isMemorized 
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800' 
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                        }`}
                      >
                        <Brain size={14} strokeWidth={2.2} className={isMemorized ? 'text-emerald-500' : 'text-slate-400'} />
                        <span>{isMemorized ? 'Đã nhớ' : 'Chưa nhớ'}</span>
                      </button>

                    </div>

                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 4. CÁC MODAL LUYỆN TẬP TƯƠNG TÁC (TYPING, QUIZ, FLASHCARD) */}
      {/* ========================================================================= */}
      
      {/* Modal Luyện Gõ Phím */}
      <AnimatePresence>
        {isTypingMode && (
          <KanjiVocabTyping
            vocabList={typingList}
            onClose={() => setIsTypingMode(false)}
            kanjiChar={`Bài ${lessonId}`}
            mode="vocab"
            isJPD123={isJpd123}
          />
        )}
      </AnimatePresence>

      {/* Modal Trắc Nghiệm */}
      <AnimatePresence>
        {isVocabQuizMode && (
          <VocabQuiz
            vocabList={rawVocabList}
            lessonName={titleText}
            onClose={() => setIsVocabQuizMode(false)}
            isJPD123={isJpd123}
          />
        )}
      </AnimatePresence>

      {/* Modal Flashcard */}
      <AnimatePresence>
        {isFlashcardMode && (
          <VocabFlashcard
            vocabList={rawVocabList as any}
            onClose={() => setIsFlashcardMode(false)}
            isJPD123={isJpd123}
          />
        )}
      </AnimatePresence>
    </>
  );
};
