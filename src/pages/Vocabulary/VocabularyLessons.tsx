import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Lock, Book, Layers, Check, Keyboard, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { KanjiVocabTyping } from '../../components/Kanji/KanjiVocabTyping';
import { vocabularyData, type VocabItem } from '../../data/vocabularyData';

interface VocabLesson {
  id: string;
  title: string;
  desc: string;
  total: number;
  locked: boolean;
}

export const VocabularyLessons = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [isMixMode, setIsMixMode] = useState(false);
  const [selectedLessons, setSelectedLessons] = useState<string[]>([]);
  const [isTypingMode, setIsTypingMode] = useState(false);

  const isJpd123 = courseId?.toLowerCase() === 'jpd123';
  const theme = isJpd123 ? {
    color: 'text-blue-600 dark:text-blue-400',
    softText: 'text-blue-500 dark:text-blue-300',
    bgLight: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-200 dark:border-blue-900/50',
    btn: 'bg-blue-600 hover:bg-blue-700',
    gradient: 'from-blue-600 via-sky-500 to-cyan-400',
    selected: 'border-blue-500 shadow-[0_8px_18px_rgba(37,99,235,0.14)]',
    selectedPill: 'bg-blue-500 border-blue-500 text-white',
    selectedSoft: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300',
    controlActive: 'bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-900/30 dark:border-blue-800/50 dark:text-blue-300',
    hoverBorder: 'hover:border-blue-300 dark:hover:border-blue-700',
    shadow: 'shadow-blue-500/25',
  } : {
    color: 'text-rose-500 dark:text-rose-400',
    softText: 'text-rose-500 dark:text-rose-300',
    bgLight: 'bg-rose-50 dark:bg-rose-900/20',
    border: 'border-rose-200 dark:border-rose-900/50',
    btn: 'bg-rose-500 hover:bg-rose-600',
    gradient: 'from-rose-500 via-pink-500 to-amber-400',
    selected: 'border-rose-500 shadow-[0_8px_18px_rgba(244,63,94,0.14)]',
    selectedPill: 'bg-rose-500 border-rose-500 text-white',
    selectedSoft: 'bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-300',
    controlActive: 'bg-rose-50 border-rose-200 text-rose-600 dark:bg-rose-900/30 dark:border-rose-800/50 dark:text-rose-300',
    hoverBorder: 'hover:border-rose-300 dark:hover:border-rose-700',
    shadow: 'shadow-rose-500/25',
  };

  const getLessonIcon = () => {
    return <Book size={24} strokeWidth={1.5} />;
  };

  // Modern UI data
  const lessons: VocabLesson[] = isJpd123 ? [
    { id: '4-1', title: 'Phương hướng và phương tiện', desc: 'Học về các phương hướng và phương tiện giao thông', total: 20, locked: false },
    { id: '4-2', title: 'Địa điểm và tính từ', desc: 'Học về các địa điểm và tính từ miêu tả', total: 18, locked: false },
    { id: '4-3', title: 'Thời tiết và vị giác', desc: 'Học về thời tiết và các vị của thức ăn', total: 16, locked: false },
    { id: '5-1', title: 'Thời gian và hoạt động', desc: 'Học về các mốc thời gian và hoạt động hàng ngày', total: 25, locked: false },
    { id: '5-2', title: 'Thời tiết và cảm xúc', desc: 'Học về thời tiết và các tính từ chỉ cảm giác, trạng thái', total: 20, locked: false },
    { id: '5-3', title: 'Sở thích', desc: 'Học về các sở thích và hoạt động giải trí', total: 14, locked: false },
    { id: '6-1', title: 'Kế hoạch và sự kiện', desc: 'Học về kế hoạch, sự kiện và cách đếm vật mỏng', total: 24, locked: false },
    { id: '6-2', title: 'Ăn uống và giải trí', desc: 'Học về đồ ăn, thức uống và các hoạt động giải trí', total: 23, locked: false },
    { id: '6-3', title: 'Ẩm thực Nhật', desc: 'Học về các món ăn đặc trưng của Nhật Bản', total: 8, locked: false },
    { id: '7-1', title: 'Vị trí và địa điểm', desc: 'Học về các từ chỉ vị trí và địa điểm công cộng', total: 20, locked: false },
    { id: '7-2', title: 'Đồ dùng và hành động', desc: 'Học về các vật dụng trong nhà và các động từ liên quan', total: 20, locked: false },
    { id: '7-3', title: 'Hoạt động thường ngày', desc: 'Học về các hoạt động giải trí và sinh hoạt hàng ngày', total: 20, locked: false },
  ] : [
    { id: '1-1', title: 'Chào hỏi cơ bản', desc: 'Học các câu chào hỏi và mẫu giao tiếp nhập môn', total: 15, locked: false },
    { id: '1-2', title: 'Số đếm và tuổi', desc: 'Làm quen số đếm, tuổi và cách hỏi thông tin cơ bản', total: 20, locked: true },
    { id: '1-3', title: 'Quốc tịch và nghề', desc: 'Từ vựng về quốc gia, quốc tịch và nghề nghiệp', total: 18, locked: true },
  ];

  const unlockedLessons = lessons.filter(l => !l.locked);
  const totalWords = lessons.reduce((sum, lesson) => sum + lesson.total, 0);
  const courseLabel = isJpd123 ? 'JPD123 VOCABULARY' : 'JPD113 VOCABULARY';
  const courseName = isJpd123 ? 'Tiếng Nhật sơ cấp 2' : 'Tiếng Nhật sơ cấp 1';
  const badgeText = isJpd123 ? '初級 II' : '初級 I';

  const handleLessonCardClick = (lessonId: string, locked: boolean) => {
    if (locked) return;
    if (isMixMode) {
      setSelectedLessons(prev => 
        prev.includes(lessonId) ? prev.filter(id => id !== lessonId) : [...prev, lessonId]
      );
    } else {
      navigate(`/vocabulary/${courseId}/lesson/${lessonId}`);
    }
  };

  const startMixTyping = () => {
    if (selectedLessons.length === 0) return;
    setIsTypingMode(true);
    enterFullscreen();
  };

  const typingList = useMemo(() => {
    let combined: VocabItem[] = [];
    selectedLessons.forEach(id => {
      if (vocabularyData[id]) {
        combined = [...combined, ...vocabularyData[id]];
      }
    });
    // Shuffle the combined list
    for (let i = combined.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [combined[i], combined[j]] = [combined[j], combined[i]];
    }
    return combined;
  }, [selectedLessons, isTypingMode]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const mainLessons = useMemo(() => {
    const mains = Array.from(new Set(lessons.filter(l => !l.locked).map(l => l.id.split('-')[0])));
    return mains.sort((a, b) => Number(a) - Number(b));
  }, [lessons]);

  const handleSelectAll = () => {
    const unlockedIds = lessons.filter(l => !l.locked).map(l => l.id);
    if (selectedLessons.length === unlockedIds.length) {
      setSelectedLessons([]);
    } else {
      setSelectedLessons(unlockedIds);
    }
  };

  const handleSelectMainLesson = (main: string) => {
    const subLessons = lessons.filter(l => !l.locked && l.id.split('-')[0] === main).map(l => l.id);
    const allSelected = subLessons.length > 0 && subLessons.every(id => selectedLessons.includes(id));
    if (allSelected) {
      setSelectedLessons(prev => prev.filter(id => !subLessons.includes(id)));
    } else {
      setSelectedLessons(prev => {
        const newSet = new Set([...prev, ...subLessons]);
        return Array.from(newSet);
      });
    }
  };

  const enterFullscreen = () => {
    const elem = document.documentElement as HTMLElement & {
      webkitRequestFullscreen?: () => Promise<void>;
      msRequestFullscreen?: () => Promise<void>;
    };
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch(console.log);
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  };

  const exitFullscreen = () => {
    const doc = document as Document & {
      webkitFullscreenElement?: Element;
      msFullscreenElement?: Element;
      webkitExitFullscreen?: () => Promise<void>;
      msExitFullscreen?: () => Promise<void>;
    };
    if (doc.fullscreenElement || doc.webkitFullscreenElement || doc.msFullscreenElement) {
      if (doc.exitFullscreen) {
        doc.exitFullscreen().catch(console.log);
      } else if (doc.webkitExitFullscreen) {
        doc.webkitExitFullscreen();
      } else if (doc.msExitFullscreen) {
        doc.msExitFullscreen();
      }
    }
  };

  return (
    <>
      <div className="max-w-6xl mx-auto pt-8 pb-32 px-4 relative min-h-[calc(100vh-80px)]">
        <div className="mb-6 flex items-center justify-between gap-3">
          <button 
            onClick={() => navigate('/vocabulary')}
            className={`inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 text-sm font-black ${theme.color} shadow-sm ring-1 ring-white/80 transition-colors hover:bg-white dark:bg-slate-900/90 dark:ring-slate-700`}
          >
            <ArrowLeft size={16} /> Quay lại
          </button>

          <button 
            onClick={() => {
              setIsMixMode(!isMixMode);
              if (isMixMode) {
                setSelectedLessons([]);
                setIsDropdownOpen(false);
              }
            }}
            className={`inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm font-black shadow-sm transition-colors ${isMixMode ? theme.controlActive : 'bg-white/90 dark:bg-slate-900/90 border-white/80 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-white'}`}
          >
            {isMixMode ? <X size={16} /> : <Layers size={16} />} 
            {isMixMode ? 'Hủy trộn' : 'Trộn bài'}
          </button>
        </div>

        <div className="mb-8 overflow-hidden rounded-[2rem] border border-white/70 bg-white/92 p-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] dark:border-slate-700 dark:bg-slate-950/90">
          <div className={`mb-5 h-1.5 rounded-full bg-gradient-to-r ${theme.gradient}`} />
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className={`mb-3 inline-flex rounded-full px-3 py-1 text-xs font-black tracking-widest ${theme.bgLight} ${theme.softText}`}>
                {badgeText} · {courseName}
              </div>
              <h1 className={`text-3xl md:text-5xl font-black ${theme.color} uppercase tracking-wider`}>
                {courseLabel}
              </h1>
              <p className="mt-2 text-sm font-bold text-slate-600 dark:text-slate-400">
                {isMixMode ? 'Chọn nhiều bài để trộn từ vựng và luyện phản xạ.' : 'Chọn bài học để bắt đầu luyện từ vựng.'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:min-w-[260px]">
              <div className="rounded-2xl bg-white/85 p-3 text-center shadow-sm ring-1 ring-slate-200/80 dark:bg-slate-900/70 dark:ring-slate-700">
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Bài mở</div>
                <div className="text-2xl font-black text-slate-900 dark:text-slate-100">{unlockedLessons.length}</div>
              </div>
              <div className="rounded-2xl bg-white/85 p-3 text-center shadow-sm ring-1 ring-slate-200/80 dark:bg-slate-900/70 dark:ring-slate-700">
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Từ vựng</div>
                <div className="text-2xl font-black text-slate-900 dark:text-slate-100">{totalWords}</div>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {isMixMode && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="mt-5 flex flex-wrap items-center gap-2 border-t border-slate-200/70 pt-4 dark:border-slate-800"
              >
                <button
                  onClick={handleSelectAll}
                  className={`shrink-0 flex items-center gap-1.5 px-3 py-2 border rounded-xl text-sm font-bold transition-all shadow-sm ${selectedLessons.length > 0 && selectedLessons.length === unlockedLessons.length ? theme.selectedPill : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                >
                  <Check size={16} className={selectedLessons.length > 0 && selectedLessons.length === unlockedLessons.length ? 'opacity-100' : 'opacity-50'} />
                  Chọn tất cả
                </button>

                <div className="relative shrink-0">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`flex items-center gap-1.5 px-3 py-2 border rounded-xl text-sm font-bold transition-all shadow-sm ${isDropdownOpen ? theme.controlActive : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                  >
                    Chọn theo Lesson <ChevronDown size={16} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                        className="absolute left-0 top-[calc(100%+8px)] w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-50 overflow-hidden"
                      >
                        <div className="py-1">
                          {mainLessons.map(main => {
                            const subLessons = lessons.filter(l => !l.locked && l.id.split('-')[0] === main).map(l => l.id);
                            const allSelected = subLessons.length > 0 && subLessons.every(id => selectedLessons.includes(id));
                            return (
                              <button
                                key={main}
                                onClick={() => handleSelectMainLesson(main)}
                                className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50 ${allSelected ? theme.selectedSoft : 'text-slate-700 dark:text-slate-300'}`}
                              >
                                <span>Lesson {main}</span>
                                {allSelected && <Check size={16} strokeWidth={2.5} />}
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {lessons.map((lesson, idx) => {
            const isSelected = selectedLessons.includes(lesson.id);
            return (
              <motion.button
                key={lesson.id}
                type="button"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25, delay: idx * 0.04 }}
                onClick={() => handleLessonCardClick(lesson.id, lesson.locked)}
                className={`vocab-lesson-card group relative h-full text-left ${lesson.locked ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className={`relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-[1.75rem] border-2 bg-white/94 p-5 shadow-[0_8px_20px_rgba(15,23,42,0.07)] transition-colors duration-200 dark:bg-slate-900/94 dark:shadow-[0_8px_20px_rgba(0,0,0,0.22)] ${lesson.locked ? 'border-white/70 opacity-75 grayscale-[0.25] dark:border-slate-800' : isSelected ? theme.selected : `${theme.hoverBorder} border-white/80 dark:border-slate-800`}`}>
                  <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${theme.gradient} ${lesson.locked ? 'opacity-25' : 'opacity-100'}`} />
                  
                  {isMixMode && !lesson.locked && (
                    <div className="absolute top-4 right-4 z-10">
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? theme.selectedPill : 'border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 text-transparent hover:border-slate-300'}`}>
                        <Check size={16} strokeWidth={3} />
                      </div>
                    </div>
                  )}

                  <div className="mb-5 flex items-start justify-between gap-3">
                    <span className={`text-xs font-black uppercase tracking-widest ${theme.softText} ${theme.bgLight} px-3 py-1.5 rounded-full`}>
                      Lesson {lesson.id}
                    </span>
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                      {lesson.locked ? 'Locked' : `${lesson.total} từ`}
                    </span>
                  </div>

                  <div className="mb-5 flex min-h-[104px] items-start gap-4">
                    <div className={`w-14 h-14 rounded-[1.25rem] ${lesson.locked ? 'bg-slate-100 text-slate-400 dark:bg-slate-800' : `${theme.bgLight} ${theme.color}`} flex items-center justify-center shrink-0 shadow-inner`}>
                      {lesson.locked ? <Lock size={23} /> : getLessonIcon()}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-black text-slate-900 dark:text-slate-100 text-lg leading-tight min-h-[46px]">
                        {lesson.title}
                      </h3>
                      <p className="mt-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                        {lesson.desc}
                      </p>
                    </div>
                  </div>

                  <div className="mt-auto">
                  {!isMixMode && (
                    <div className={`w-full py-3 rounded-2xl font-black flex items-center justify-center gap-2 transition-colors ${lesson.locked ? 'bg-slate-100 text-slate-400 dark:bg-slate-800' : `bg-gradient-to-r ${theme.gradient} text-white shadow-md ${theme.shadow}`}`}>
                      Học ngay {lesson.locked ? <Lock size={16} /> : <Play size={16} fill="currentColor" />}
                    </div>
                  )}
                  {isMixMode && (
                    <div className={`w-full py-3 rounded-2xl font-black flex items-center justify-center gap-2 transition-all ${isSelected ? theme.selectedSoft : 'bg-slate-50 text-slate-400 dark:bg-slate-800/50'}`}>
                      {isSelected ? 'Đã chọn' : lesson.locked ? 'Đang khóa' : 'Chọn bài này'}
                    </div>
                  )}
                  </div>
                </div>
              </motion.button>
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
          className="fixed bottom-0 left-0 right-0 z-40 p-4 md:p-6 flex justify-center pointer-events-none"
        >
          <div className="bg-white/95 dark:bg-slate-900/95 border border-white/80 dark:border-slate-700 shadow-[0_12px_28px_rgba(15,23,42,0.18)] rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 w-full max-w-3xl pointer-events-auto">
            <div className="flex items-center gap-3 pl-2">
              <div className={`w-12 h-12 rounded-xl ${theme.bgLight} ${theme.color} flex items-center justify-center shrink-0`}>
                <Layers size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 dark:text-slate-100 text-base">Đã chọn {selectedLessons.length} bài học</h4>
                <p className="text-sm font-medium text-slate-500">Tổng cộng {typingList.length} từ vựng đã được trộn ngẫu nhiên.</p>
              </div>
            </div>
            
            <button 
              onClick={startMixTyping}
              className={`px-8 py-3.5 rounded-xl font-bold text-white transition-all shadow-lg flex items-center gap-2 shrink-0 ${theme.btn} ${theme.shadow} hover:-translate-y-0.5`}
            >
              <Keyboard size={18} /> Luyện gõ ngay
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>

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
    </>
  );
};
