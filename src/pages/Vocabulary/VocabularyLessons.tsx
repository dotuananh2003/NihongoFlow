import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Lock, Layers, Check, Keyboard, X, 
  ChevronDown, Crown, Sparkles, Compass, MapPin, 
  CloudSun, Clock, Smile, Heart, Calendar, 
  ShoppingBag, Utensils, Coffee, BookOpen, ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { KanjiVocabTyping } from '../../components/Kanji/KanjiVocabTyping';
import { vocabularyData, type VocabItem } from '../../data/vocabularyData';
import { paymentApi } from '../../lib/paymentApi';
import { useAuth } from '../../context/AuthContext';
import { JapaneseMascot } from '../../components/mascot/JapaneseMascot';

interface VocabLesson {
  id: string;
  title: string;
  desc: string;
  total: number;
  locked: boolean;
  icon?: any;
}

export const VocabularyLessons = () => {
  const { user } = useAuth();
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [isMixMode, setIsMixMode] = useState(false);
  const [selectedLessons, setSelectedLessons] = useState<string[]>([]);
  const [isTypingMode, setIsTypingMode] = useState(false);
  const [unlockedPremiumLessons, setUnlockedPremiumLessons] = useState<string[]>([]);

  const isJpd123 = courseId?.toLowerCase() === 'jpd123';
  const normalizedCourseId = courseId?.toLowerCase() ?? '';
  const unlockedPremiumLessonSet = useMemo(() => new Set(unlockedPremiumLessons), [unlockedPremiumLessons]);
  const hasPremiumLesson = (lessonId: string) =>
    user?.hasPremium || unlockedPremiumLessonSet.has(`vocabulary:${normalizedCourseId}:lesson:${lessonId}`);

  const theme = isJpd123 ? {
    color: 'text-blue-600 dark:text-blue-400',
    softText: 'text-blue-500 dark:text-blue-300',
    bgLight: 'bg-blue-100/90 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300 border border-blue-200 dark:border-blue-800/80',
    border: 'border-blue-200/80 dark:border-slate-800',
    btn: 'from-blue-600 via-sky-500 to-indigo-600 hover:from-blue-700 hover:to-sky-600 shadow-[0_8px_20px_rgba(59,130,246,0.3)]',
    gradient: 'from-blue-600 via-sky-500 to-cyan-400',
    selected: 'border-blue-500 shadow-[0_12px_28px_rgba(37,99,235,0.18)]',
    selectedPill: 'bg-blue-500 border-blue-500 text-white',
    selectedSoft: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300',
    controlActive: 'bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-900/30 dark:border-blue-800/50 dark:text-blue-300',
    hoverBorder: 'hover:border-blue-300 dark:hover:border-blue-600/50 hover:ring-1 hover:ring-blue-100 dark:hover:ring-blue-900/40',
    shadow: 'shadow-blue-500/25',
    iconBg: 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-200/80 dark:border-blue-800',
    progressBar: 'from-blue-500 to-cyan-500'
  } : {
    color: 'text-rose-600 dark:text-rose-400',
    softText: 'text-rose-500 dark:text-rose-300',
    bgLight: 'bg-rose-100/90 text-rose-700 dark:bg-rose-950/70 dark:text-rose-300 border border-rose-200 dark:border-rose-800/80',
    border: 'border-rose-200/80 dark:border-slate-800',
    btn: 'from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-600 shadow-[0_8px_20px_rgba(244,63,94,0.3)]',
    gradient: 'from-rose-500 via-pink-500 to-amber-400',
    selected: 'border-rose-500 shadow-[0_12px_28px_rgba(244,63,94,0.18)]',
    selectedPill: 'bg-rose-500 border-rose-500 text-white',
    selectedSoft: 'bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-300',
    controlActive: 'bg-rose-50 border-rose-200 text-rose-600 dark:bg-rose-900/30 dark:border-rose-800/50 dark:text-rose-300',
    hoverBorder: 'hover:border-rose-300 dark:hover:border-rose-600/50 hover:ring-1 hover:ring-rose-100 dark:hover:ring-rose-900/40',
    shadow: 'shadow-rose-500/25',
    iconBg: 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400 border border-rose-200/80 dark:border-rose-800',
    progressBar: 'from-rose-500 to-pink-500'
  };

  const lessons: VocabLesson[] = isJpd123 ? [
    { id: '4-1', title: 'Phương hướng và phương tiện', desc: 'Học về các phương hướng và phương tiện giao thông phổ biến', total: 20, locked: false, icon: Compass },
    { id: '4-2', title: 'Địa điểm và tính từ', desc: 'Học về các địa điểm và tính từ miêu tả cảnh vật xung quanh', total: 18, locked: false, icon: MapPin },
    { id: '4-3', title: 'Thời tiết và vị giác', desc: 'Học về các hiện tượng thời tiết và các vị của món ăn', total: 16, locked: false, icon: CloudSun },
    { id: '5-1', title: 'Thời gian và hoạt động', desc: 'Học về các mốc thời gian và hoạt động sinh hoạt hàng ngày', total: 25, locked: false, icon: Clock },
    { id: '5-2', title: 'Thời tiết và cảm xúc', desc: 'Học về thời tiết và các tính từ chỉ cảm giác, trạng thái', total: 20, locked: false, icon: Smile },
    { id: '5-3', title: 'Sở thích & Đam mê', desc: 'Học về các sở thích cá nhân và hoạt động giải trí cuối tuần', total: 14, locked: false, icon: Heart },
    { id: '6-1', title: 'Kế hoạch và sự kiện', desc: 'Học về kế hoạch, sự kiện và cách đếm các đồ vật', total: 24, locked: false, icon: Calendar },
    { id: '6-2', title: 'Ăn uống và mua sắm', desc: 'Học về ẩm thực, gọi món và các hoạt động mua sắm', total: 23, locked: false, icon: ShoppingBag },
    { id: '6-3', title: 'Ẩm thực Nhật Bản', desc: 'Học về các món ăn truyền thống đặc trưng của xứ Phù Tang', total: 8, locked: false, icon: Utensils },
    { id: '7-1', title: 'Vị trí và địa điểm', desc: 'Học về các từ chỉ vị trí và địa điểm công cộng trong thành phố', total: 20, locked: !hasPremiumLesson('7-1'), icon: MapPin },
    { id: '7-2', title: 'Đồ dùng và hành động', desc: 'Học về các vật dụng trong nhà và các động từ thao tác liên quan', total: 20, locked: !hasPremiumLesson('7-2'), icon: Coffee },
    { id: '7-3', title: 'Hoạt động thường ngày', desc: 'Học về các hoạt động giải trí và sinh hoạt hàng ngày nâng cao', total: 20, locked: !hasPremiumLesson('7-3'), icon: BookOpen },
  ] : [
    { id: '1-1', title: 'Chào hỏi cơ bản', desc: 'Học các câu chào hỏi và mẫu giao tiếp nhập môn Minna no Nihongo', total: 15, locked: false, icon: Smile },
    { id: '1_2(1)', title: '1_2(1): Từ vựng đếm tháng - Tuổi', desc: 'Làm quen số đếm tháng và cách nói tuổi', total: 33, locked: false, icon: Clock },
    { id: '1_2(2)', title: '1_2(2): Còn lại', desc: 'Các từ vựng giao tiếp và thông tin cá nhân còn lại', total: 10, locked: false, icon: Clock },
    { id: '1-3', title: '1-3: Sở thích', desc: 'Học cách nói về sở thích cá nhân', total: 18, locked: false, icon: Compass },
    { id: '2-1', title: 'Đồ vật quanh ta', desc: 'Học cách gọi tên các đồ dùng học tập và vật dụng gia đình', total: 22, locked: false, icon: ShoppingBag },
    { id: '2-2', title: 'Sở hữu và vị trí', desc: 'Cách diễn đạt quyền sở hữu và vị trí của các đồ vật', total: 19, locked: false, icon: MapPin },
    { id: '3-1', title: 'Địa điểm & Mua sắm', desc: 'Học từ vựng về các cửa hàng, bách hóa và hỏi giá tiền', total: 21, locked: false, icon: Utensils },
    { id: '3-2', title: 'Phương tiện đi lại', desc: 'Tên các phương tiện giao thông và cách di chuyển tại Nhật', total: 20, locked: false, icon: Compass },
    { id: '4-1', title: 'Thời gian & Ngày tháng', desc: 'Cách đọc giờ giấc, các ngày trong tuần và tháng trong năm', total: 25, locked: false, icon: Calendar },
    { id: '4-2', title: 'Hoạt động trong ngày', desc: 'Các động từ chỉ hoạt động sinh hoạt từ sáng đến tối', total: 24, locked: false, icon: Clock },
    { id: '5-1', title: 'Đi đâu & Làm gì', desc: 'Cách nói về lịch trình đi lại, du lịch và gặp gỡ bạn bè', total: 20, locked: false, icon: Heart }
  ];

  const unlockedLessons = lessons.filter(l => !l.locked);
  const totalWords = lessons.reduce((sum, lesson) => sum + (vocabularyData[lesson.id]?.length || lesson.total), 0);
  const courseLabel = isJpd123 ? 'JPD123 VOCABULARY' : 'JPD113 VOCABULARY';
  const courseName = isJpd123 ? 'Tiếng Nhật Sơ Cấp 2' : 'Tiếng Nhật Sơ Cấp 1';
  const badgeText = isJpd123 ? '初級 II' : '初級 I';
  const completedCount = isJpd123 ? 4 : 7;
  const progressPercent = Math.round((completedCount / lessons.length) * 100);

  const handleLessonCardClick = (lessonId: string, locked: boolean) => {
    if (locked) {
      openUpgradeModal();
      return;
    }
    if (isMixMode) {
      setSelectedLessons(prev => 
        prev.includes(lessonId) ? prev.filter(id => id !== lessonId) : [...prev, lessonId]
      );
    } else {
      navigate(`/vocabulary/${courseId}/lesson/${lessonId}`);
    }
  };

  const openUpgradeModal = () => {
    window.dispatchEvent(new CustomEvent('jp-forus:open-upgrade'));
  };

  useEffect(() => {
    let mounted = true;
    const loadEntitlements = async () => {
      try {
        const entitlements = await paymentApi.getEntitlements();
        if (mounted) {
          setUnlockedPremiumLessons(entitlements.unlockedLessons);
        }
      } catch {
        if (mounted) {
          setUnlockedPremiumLessons([]);
        }
      }
    };
    void loadEntitlements();
    return () => {
      mounted = false;
    };
  }, []);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const mainLessons = useMemo(() => {
    const mains = Array.from(new Set(lessons.filter(l => !l.locked).map(l => l.id.split('-')[0])));
    return mains.sort((a, b) => Number(a) - Number(b));
  }, [lessons]);

  const handleSelectAll = () => {
    const unlockedIds = lessons.filter(l => !l.locked).map(l => l.id);
    setSelectedLessons(selectedLessons.length === unlockedIds.length ? [] : unlockedIds);
  };

  const handleSelectMainLesson = (main: string) => {
    const subLessons = lessons.filter(l => !l.locked && l.id.split('-')[0] === main).map(l => l.id);
    const allSelected = subLessons.length > 0 && subLessons.every(id => selectedLessons.includes(id));
    if (allSelected) {
      setSelectedLessons(prev => prev.filter(id => !subLessons.includes(id)));
    } else {
      setSelectedLessons(prev => Array.from(new Set([...prev, ...subLessons])));
    }
  };

  const startMixTyping = () => {
    if (selectedLessons.length === 0) return;
    setIsTypingMode(true);
    document.documentElement.requestFullscreen?.().catch(console.log);
  };

  const typingList = useMemo(() => {
    let combined: VocabItem[] = [];
    selectedLessons.forEach(id => {
      if (vocabularyData[id]) combined = [...combined, ...vocabularyData[id]];
    });
    for (let i = combined.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [combined[i], combined[j]] = [combined[j], combined[i]];
    }
    return combined;
  }, [selectedLessons, isTypingMode]);

  const exitFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen().catch(console.log);
  };

  return (
    <>
      <div className="smooth-scroll-area space-y-5 pb-16 max-w-[1440px] mx-auto pt-1 font-sans">
        
        {/* ========================================================================= */}
        {/* 1. TOP HERO STAGE: GỌN GÀNG, DỄ THAO TÁC, LINH VẬT FULL NGƯỜI NHỎ GỌN */}
        {/* ========================================================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className={`smooth-panel relative overflow-hidden rounded-[26px] bg-gradient-to-br from-white via-white to-slate-50/80 dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-950 border ${theme.border} p-4 sm:p-5 shadow-xs`}
        >
          {/* Ambient Subtle Glow */}
          <div className="pointer-events-none absolute -right-12 -top-12 w-48 h-48 rounded-full bg-blue-300/10 dark:bg-blue-600/5 blur-xl" />
          <div className="pointer-events-none absolute -left-12 -bottom-12 w-48 h-48 rounded-full bg-rose-300/10 dark:bg-rose-600/5 blur-xl" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Vùng bên trái: Breadcrumb + Tiêu đề + Thống kê inline */}
            <div className="space-y-2.5 flex-1 min-w-0">
              
              {/* Top row: Nút quay lại + Badge cấp độ + Nút Trộn bài */}
              <div className="flex flex-wrap items-center justify-between gap-2.5">
                <div className="flex flex-wrap items-center gap-2">
                  <motion.button 
                    onClick={() => navigate('/vocabulary')}
                    whileHover={{ scale: 1.03, x: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white dark:bg-slate-800 px-3 py-1 text-xs font-black text-slate-700 dark:text-slate-200 shadow-xs border border-slate-200 dark:border-slate-700 hover:border-blue-300 hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    <ArrowLeft size={13} strokeWidth={2.4} /> 
                    <span>Tất cả giáo trình</span>
                  </motion.button>

                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${theme.bgLight}`}>
                    <Sparkles size={12} strokeWidth={2.2} />
                    {badgeText} • {courseName}
                  </span>
                </div>

                <motion.button 
                  onClick={() => {
                    setIsMixMode(!isMixMode);
                    if (isMixMode) {
                      setSelectedLessons([]);
                      setIsDropdownOpen(false);
                    }
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1 text-xs font-black shadow-xs transition-colors cursor-pointer ${
                    isMixMode 
                      ? theme.controlActive 
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {isMixMode ? <X size={14} strokeWidth={2.4} /> : <Layers size={14} strokeWidth={2.2} />} 
                  <span>{isMixMode ? 'Hủy chọn' : 'Trộn bài học'}</span>
                </motion.button>
              </div>

              {/* Tiêu đề & Mô tả ngắn gọn */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                  {courseLabel}
                </h1>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                  {isMixMode 
                    ? 'Chọn nhiều bài học bên dưới để trộn từ vựng ngẫu nhiên và luyện phản xạ.' 
                    : 'Học từ vựng Minna no Nihongo với Flashcard, Trắc nghiệm và Luyện gõ.'}
                </p>
              </div>

              {/* Khối Thống kê dạng Pills ngang cực gọn */}
              <div className="pt-0.5 flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs font-bold text-slate-500 dark:text-slate-400">
                
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700">
                  <BookOpen size={14} strokeWidth={2.2} className={theme.color} />
                  <span><strong className="text-slate-900 dark:text-white">{lessons.length}</strong> bài</span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700">
                  <Layers size={14} strokeWidth={2.2} className={theme.color} />
                  <span><strong className="text-slate-900 dark:text-white">{totalWords}</strong> từ vựng</span>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700 flex-1 min-w-[200px] max-w-xs">
                  <span>Tiến độ: <strong className={theme.color}>{progressPercent}%</strong></span>
                  <div className="flex-1 h-2 rounded-full bg-slate-200/80 dark:bg-slate-700 overflow-hidden">
                    <div 
                      className={`h-full rounded-full bg-gradient-to-r ${theme.progressBar}`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

              </div>

            </div>

            {/* Vùng bên phải: Linh vật Kitsune FULL NGƯỜI thu nhỏ gọn gàng, hoàn toàn không bị cắt */}
            <div className="flex items-center justify-center shrink-0 self-center">
              <div className="w-[140px] h-[120px] flex items-center justify-center overflow-visible">
                <div className="scale-[0.55] sm:scale-[0.6] origin-center -mt-2">
                  <JapaneseMascot 
                    state="idle" 
                    showSpeechBubble={false} 
                  />
                </div>
              </div>
            </div>

          </div>

          <AnimatePresence>
            {isMixMode && (
              <motion.div
                initial={{ opacity: 0, y: -10, scaleY: 0.98 }}
                animate={{ opacity: 1, y: 0, scaleY: 1 }}
                exit={{ opacity: 0, y: -8, scaleY: 0.98 }}
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                style={{ willChange: 'transform, opacity', transformOrigin: 'top' }}
                className="smooth-panel relative z-10 mt-5 pt-4 border-t border-slate-200/70 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={handleSelectAll}
                    className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2 border rounded-xl text-xs font-bold transition-colors duration-150 shadow-xs ${
                      selectedLessons.length > 0 && selectedLessons.length === unlockedLessons.length 
                        ? theme.selectedPill 
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <Check size={14} className={selectedLessons.length > 0 && selectedLessons.length === unlockedLessons.length ? 'opacity-100' : 'opacity-50'} />
                    Chọn tất cả ({unlockedLessons.length} bài)
                  </button>

                  <div className="relative shrink-0">
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className={`flex items-center gap-1.5 px-3.5 py-2 border rounded-xl text-xs font-bold transition-colors duration-150 shadow-xs ${
                        isDropdownOpen 
                          ? theme.controlActive 
                          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <span>Chọn theo Lesson</span>
                      <ChevronDown size={14} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.95 }}
                          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                          style={{ willChange: 'transform, opacity' }}
                          className="smooth-panel absolute left-0 top-[calc(100%+8px)] w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-[0_14px_32px_rgba(15,23,42,0.14)] z-50 overflow-hidden"
                        >
                          <div className="py-1">
                            {mainLessons.map(main => {
                              const subLessons = lessons.filter(l => !l.locked && l.id.split('-')[0] === main).map(l => l.id);
                              const allSelected = subLessons.length > 0 && subLessons.every(id => selectedLessons.includes(id));
                              return (
                                <button
                                  key={main}
                                  onClick={() => handleSelectMainLesson(main)}
                                  className={`w-full flex items-center justify-between px-4 py-2.5 text-xs font-bold transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50 ${allSelected ? theme.selectedSoft : 'text-slate-700 dark:text-slate-300'}`}
                                >
                                  <span>Lesson {main}</span>
                                  {allSelected && <Check size={14} strokeWidth={2.5} />}
                                </button>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-500">
                    Đã chọn: <span className="font-black text-blue-600 dark:text-blue-400">{selectedLessons.length} bài</span>
                  </span>
                  <motion.button 
                    disabled={selectedLessons.length === 0}
                    onClick={startMixTyping}
                    whileHover={{ scale: selectedLessons.length > 0 ? 1.05 : 1 }}
                    whileTap={{ scale: selectedLessons.length > 0 ? 0.95 : 1 }}
                    className={`inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-black text-white shadow-sm transition-colors duration-150 ${
                      selectedLessons.length > 0 
                        ? `bg-gradient-to-r ${theme.btn} cursor-pointer` 
                        : 'bg-slate-300 dark:bg-slate-700 cursor-not-allowed opacity-60'
                    }`}
                  >
                    <Keyboard size={15} strokeWidth={2.2} />
                    <span>Luyện gõ từ đã chọn</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>


        {/* ========================================================================= */}
        {/* 2. LƯỚI 3 CỘT THẺ BÀI HỌC (LESSON CARDS GRID) */}
        {/* ========================================================================= */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2.5 tracking-tight">
              <BookOpen className={theme.color} size={24} strokeWidth={2.2} />
              Danh Sách Bài Học ({lessons.length} bài • {totalWords} từ vựng)
            </h2>
          </div>

          <div className="smooth-scroll-area grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {lessons.map((lesson) => {
              const isSelected = selectedLessons.includes(lesson.id);
              const Icon = lesson.icon || BookOpen;

              return (
                <article
                  key={lesson.id}
                  onClick={() => handleLessonCardClick(lesson.id, lesson.locked)}
                  className={`smooth-panel steady-scroll-row group relative overflow-hidden rounded-[30px] border bg-white dark:bg-slate-900 p-6 shadow-sm cursor-pointer flex flex-col justify-between transition-colors duration-150 ${
                    lesson.locked 
                      ? 'border-slate-200/60 dark:border-slate-800 opacity-85' 
                      : isSelected 
                        ? theme.selected 
                        : `${theme.hoverBorder} border-slate-200/80 dark:border-slate-800`
                  }`}
                >
                  {/* Top Bar Accent */}
                  <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${theme.gradient} ${lesson.locked ? 'opacity-30' : 'opacity-100'}`} />

                  <div className="space-y-4 flex-1 flex flex-col justify-between">
                    
                    {/* Header Card: Badges & Mix Checkbox */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${theme.bgLight}`}>
                          Lesson {lesson.id}
                        </span>
                        <span className="text-xs font-bold text-slate-400">
                          {vocabularyData[lesson.id]?.length || lesson.total} từ vựng
                        </span>
                      </div>

                      {isMixMode && !lesson.locked ? (
                        <div className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-colors ${
                          isSelected ? theme.selectedPill : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800'
                        }`}>
                          {isSelected && <Check size={14} strokeWidth={3} />}
                        </div>
                      ) : lesson.locked ? (
                        <span className="w-8 h-8 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-500 flex items-center justify-center">
                          <Lock size={15} strokeWidth={2.4} />
                        </span>
                      ) : (
                        <div className={`w-10 h-10 rounded-2xl ${theme.iconBg} flex items-center justify-center shadow-xs transition-colors`}>
                          <Icon size={19} strokeWidth={2.2} />
                        </div>
                      )}
                    </div>

                    {/* Lesson Title & Description */}
                    <div className="space-y-1">
                      <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {lesson.title}
                      </h3>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                        {lesson.desc}
                      </p>
                    </div>

                    {/* Progress & Action Button */}
                    <div className="space-y-3 pt-2">
                      {lesson.locked ? (
                        <div className="py-2.5 px-3.5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-800/50 flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
                            <Crown size={14} className="text-amber-500" /> Khóa Premium
                          </span>
                          <span className="text-[11px] font-black uppercase text-amber-600 underline">Mở khóa</span>
                        </div>
                      ) : (
                        <button 
                          className={`w-full py-2.5 rounded-2xl bg-gradient-to-r ${theme.btn} text-white font-black text-xs shadow-xs flex items-center justify-center gap-2 transition-colors`}
                        >
                          <span>{isMixMode ? (isSelected ? 'Đã chọn bài này' : 'Chạm để chọn') : 'Bắt đầu học'}</span>
                          <ArrowRight size={14} strokeWidth={2.2} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                      )}
                    </div>

                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Sticky Bottom Bar for Mix Mode */}
        <AnimatePresence>
          {isMixMode && selectedLessons.length > 0 && (
            <motion.div 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: 'transform, opacity' }}
              className="fixed bottom-6 left-0 right-0 z-40 p-4 flex justify-center pointer-events-none"
            >
              <div className="smooth-panel bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-700 shadow-[0_18px_44px_rgba(15,23,42,0.16)] rounded-3xl p-4 px-6 flex flex-col sm:flex-row items-center justify-between gap-4 w-full max-w-2xl pointer-events-auto">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-2xl ${theme.bgLight} flex items-center justify-center shrink-0`}>
                    <Layers size={20} />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-800 dark:text-slate-100 text-sm">Đã chọn {selectedLessons.length} bài học</h4>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Gồm {typingList.length} từ vựng được trộn ngẫu nhiên.</p>
                  </div>
                </div>
                
                <motion.button 
                  onClick={startMixTyping}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-2.5 rounded-2xl font-black text-xs text-white shadow-md flex items-center gap-2 bg-gradient-to-r ${theme.btn}`}
                >
                  <Keyboard size={16} /> 
                  <span>Luyện gõ ngay</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isTypingMode && (
          <KanjiVocabTyping 
            vocabList={typingList} 
            onClose={() => {
              setIsTypingMode(false);
              exitFullscreen();
            }}
            kanjiChar={`Mix ${selectedLessons.length} bài`}
            mode="vocab"
            isJPD123={isJpd123}
          />
        )}
      </AnimatePresence>
    </>
  );
};


