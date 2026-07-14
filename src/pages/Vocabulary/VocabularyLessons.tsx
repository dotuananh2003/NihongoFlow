import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Lock, Book, Layers, Check, Keyboard, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { KanjiVocabTyping } from '../../components/Kanji/KanjiVocabTyping';
import { vocabularyData, type VocabItem } from '../../data/vocabularyData';

export const VocabularyLessons = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [isMixMode, setIsMixMode] = useState(false);
  const [selectedLessons, setSelectedLessons] = useState<string[]>([]);
  const [isTypingMode, setIsTypingMode] = useState(false);

  const isJpd123 = courseId?.toLowerCase() === 'jpd123';
  const theme = {
    color: isJpd123 ? 'text-blue-600 dark:text-blue-400' : 'text-rose-500 dark:text-rose-400',
    bgLight: isJpd123 ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-rose-50 dark:bg-rose-900/20',
    border: isJpd123 ? 'border-blue-200 dark:border-blue-900/50' : 'border-rose-200 dark:border-rose-900/50',
    btn: isJpd123 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-rose-500 hover:bg-rose-600',
    progress: isJpd123 ? 'bg-blue-500' : 'bg-rose-500',
    badgeText: isJpd123 ? 'text-blue-500' : 'text-rose-500',
    themeColor: isJpd123 ? 'blue' : 'rose',
  };

  const getLessonIcon = () => {
    return <Book size={24} strokeWidth={1.5} />;
  };

  // Modern UI data with progress
  const lessons = isJpd123 ? [
    { id: '4-1', title: 'Phương hướng và phương tiện', desc: 'Học về các phương hướng và phương tiện giao thông', total: 20, learned: 12, locked: false },
    { id: '4-2', title: 'Địa điểm và tính từ', desc: 'Học về các địa điểm và tính từ miêu tả', total: 18, learned: 0, locked: false },
    { id: '4-3', title: 'Thời tiết và vị giác', desc: 'Học về thời tiết và các vị của thức ăn', total: 16, learned: 0, locked: false },
    { id: '5-1', title: 'Thời gian và hoạt động', desc: 'Học về các mốc thời gian và hoạt động hàng ngày', total: 25, learned: 0, locked: false },
    { id: '5-2', title: 'Thời tiết và cảm xúc', desc: 'Học về thời tiết và các tính từ chỉ cảm giác, trạng thái', total: 20, learned: 0, locked: false },
    { id: '5-3', title: 'Sở thích', desc: 'Học về các sở thích và hoạt động giải trí', total: 14, learned: 0, locked: false },
    { id: '6-1', title: 'Kế hoạch và sự kiện', desc: 'Học về kế hoạch, sự kiện và cách đếm vật mỏng', total: 24, learned: 0, locked: false },
    { id: '6-2', title: 'Ăn uống và giải trí', desc: 'Học về đồ ăn, thức uống và các hoạt động giải trí', total: 23, learned: 0, locked: false },
    { id: '6-3', title: 'Ẩm thực Nhật', desc: 'Học về các món ăn đặc trưng của Nhật Bản', total: 8, learned: 0, locked: false },
    { id: '7-1', title: 'Vị trí và địa điểm', desc: 'Học về các từ chỉ vị trí và địa điểm công cộng', total: 20, learned: 0, locked: false },
    { id: '7-2', title: 'Đồ dùng và hành động', desc: 'Học về các vật dụng trong nhà và các động từ liên quan', total: 20, learned: 0, locked: false },
    { id: '7-3', title: 'Hoạt động thường ngày', desc: 'Học về các hoạt động giải trí và sinh hoạt hàng ngày', total: 20, learned: 0, locked: false },
  ] : [
    { id: '1-1', title: 'Chào hỏi cơ bản', total: 15, learned: 5, locked: false },
    { id: '1-2', title: 'Số đếm và tuổi', total: 20, learned: 0, locked: true },
    { id: '1-3', title: 'Quốc tịch và nghề', total: 18, learned: 0, locked: true },
  ];

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
      <div className="max-w-5xl mx-auto pt-8 pb-32 px-4 relative min-h-[calc(100vh-80px)]">
      {/* Background aesthetics */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-300/10 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, slate-400 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
      {/* Small sakura branch decoration placeholder */}
      <div className="absolute top-10 right-10 w-32 h-32 opacity-20 pointer-events-none bg-rose-200 blur-3xl rounded-full" />

      <button 
        onClick={() => navigate('/vocabulary')}
        className={`flex items-center gap-2 text-sm font-bold ${theme.color} hover:underline mb-6 transition-all`}
      >
        <ArrowLeft size={16} /> Quay lại
      </button>

      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className={`text-3xl md:text-4xl font-black ${theme.color} uppercase tracking-wider mb-2`}>
            {courseId?.toUpperCase()} VOCABULARY
          </h1>
          <p className="text-sm font-bold text-slate-500">
            {isMixMode ? 'Chọn các bài học bạn muốn trộn để kiểm tra' : 'Chọn bài học để bắt đầu'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <AnimatePresence>
            {isMixMode && (
              <motion.div
                initial={{ opacity: 0, width: 0, scale: 0.9 }}
                animate={{ opacity: 1, width: 'auto', scale: 1 }}
                exit={{ opacity: 0, width: 0, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="flex items-center gap-2 overflow-visible"
              >
                <button
                  onClick={handleSelectAll}
                  className={`shrink-0 flex items-center gap-1.5 px-3 py-2 border rounded-xl text-sm font-bold transition-all shadow-sm ${selectedLessons.length > 0 && selectedLessons.length === lessons.filter(l => !l.locked).length ? `bg-${theme.themeColor}-500 border-${theme.themeColor}-500 text-white` : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                >
                  <Check size={16} className={selectedLessons.length > 0 && selectedLessons.length === lessons.filter(l => !l.locked).length ? 'opacity-100' : 'opacity-50'} />
                  Chọn tất cả
                </button>

                <div className="relative shrink-0">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`flex items-center gap-1.5 px-3 py-2 border rounded-xl text-sm font-bold transition-all shadow-sm ${isDropdownOpen ? `border-${theme.themeColor}-400 bg-${theme.themeColor}-50 dark:bg-${theme.themeColor}-900/20 text-${theme.themeColor}-600 dark:text-${theme.themeColor}-400` : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
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
                        className="absolute right-0 top-[calc(100%+8px)] w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-50 overflow-hidden"
                      >
                        <div className="py-1">
                          {mainLessons.map(main => {
                            const subLessons = lessons.filter(l => !l.locked && l.id.split('-')[0] === main).map(l => l.id);
                            const allSelected = subLessons.length > 0 && subLessons.every(id => selectedLessons.includes(id));
                            return (
                              <button
                                key={main}
                                onClick={() => handleSelectMainLesson(main)}
                                className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50 ${allSelected ? `text-${theme.themeColor}-600 dark:text-${theme.themeColor}-400 bg-${theme.themeColor}-50/50 dark:bg-${theme.themeColor}-900/10` : 'text-slate-700 dark:text-slate-300'}`}
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

          <button 
            onClick={() => {
              setIsMixMode(!isMixMode);
              if (isMixMode) {
                setSelectedLessons([]);
                setIsDropdownOpen(false);
              }
            }}
            className={`flex items-center gap-2 px-4 py-2 border rounded-xl text-sm font-bold transition-all shadow-sm ${isMixMode ? `bg-${theme.themeColor}-100 border-${theme.themeColor}-200 text-${theme.themeColor}-600 dark:bg-${theme.themeColor}-900/30 dark:border-${theme.themeColor}-800/50 dark:text-${theme.themeColor}-400` : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
          >
            {isMixMode ? <X size={16} /> : <Layers size={16} />} 
            {isMixMode ? 'Hủy Trộn' : 'Trộn Bài'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson, idx) => {
          const isSelected = selectedLessons.includes(lesson.id);
          return (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25, delay: idx * 0.05 }}
              onClick={() => handleLessonCardClick(lesson.id, lesson.locked)}
              className={`group relative ${lesson.locked ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className={`bg-white dark:bg-slate-900 rounded-[2rem] p-6 flex flex-col h-full transition-all duration-300 border-2 ${lesson.locked ? 'border-transparent opacity-75 grayscale-[0.3]' : isSelected ? `border-${theme.themeColor}-500 shadow-[0_8px_30px_rgba(0,0,0,0.12)] scale-[1.02]` : 'border-transparent hover:-translate-y-1 hover:shadow-[0_16px_40px_rgb(0,0,0,0.1)] shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)]'} ${!isSelected && lesson.learned > 0 ? theme.border : ''}`}>
                  
                  {isMixMode && !lesson.locked && (
                    <div className="absolute top-6 right-6 z-10">
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? `bg-${theme.themeColor}-500 border-${theme.themeColor}-500 text-white` : 'border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 text-transparent hover:border-slate-300'}`}>
                        <Check size={16} strokeWidth={3} />
                      </div>
                    </div>
                  )}

                  {/* Top: Lesson ID */}
                  <div className="text-center mb-6">
                    <span className={`text-xs font-bold ${theme.badgeText} uppercase tracking-widest ${theme.bgLight} px-4 py-1.5 rounded-full`}>
                      LESSON {lesson.id}
                    </span>
                  </div>

                  {/* Title & Icon */}
                  <div className="flex flex-col items-center text-center gap-4 mb-8 flex-1">
                    <div className={`w-14 h-14 rounded-[1.25rem] ${lesson.locked ? 'bg-slate-100 text-slate-400 dark:bg-slate-800' : `${theme.bgLight} ${theme.color}`} flex items-center justify-center`}>
                      {getLessonIcon()}
                    </div>
                    <div>
                      <h3 className={`font-bold text-slate-800 dark:text-slate-100 text-lg leading-tight mb-2 px-2`}>
                        {lesson.title}
                      </h3>
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 px-2 leading-relaxed">
                        {/* @ts-expect-error type error */}
                        {lesson.desc || `${lesson.total} từ vựng`}
                      </p>
                    </div>
                  </div>

                  {/* Button */}
                  {!isMixMode && (
                    <button 
                      disabled={lesson.locked}
                      className={`w-full py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${lesson.locked ? 'bg-slate-100 text-slate-400 dark:bg-slate-800' : `${theme.bgLight} ${theme.color} group-hover:${theme.btn} group-hover:text-white`}`}
                    >
                      Học ngay {lesson.locked ? <Lock size={16} /> : <Play size={16} fill="currentColor" />}
                    </button>
                  )}
                  {isMixMode && (
                    <div 
                      className={`w-full py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${isSelected ? `bg-${theme.themeColor}-100 text-${theme.themeColor}-600 dark:bg-${theme.themeColor}-900/30 dark:text-${theme.themeColor}-400` : 'bg-slate-50 text-slate-400 dark:bg-slate-800/50'}`}
                    >
                      {isSelected ? 'Đã chọn' : 'Chọn bài này'}
                    </div>
                  )}
                  
              </div>
            </motion.div>
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
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-[0_20px_40px_rgba(0,0,0,0.2)] rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 w-full max-w-3xl pointer-events-auto">
            <div className="flex items-center gap-3 pl-2">
              <div className={`w-12 h-12 rounded-xl bg-${theme.themeColor}-100 dark:bg-${theme.themeColor}-900/30 text-${theme.themeColor}-500 flex items-center justify-center shrink-0`}>
                <Layers size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 dark:text-slate-100 text-base">Đã chọn {selectedLessons.length} bài học</h4>
                <p className="text-sm font-medium text-slate-500">Tổng cộng {typingList.length} từ vựng đã được trộn ngẫu nhiên.</p>
              </div>
            </div>
            
            <button 
              onClick={startMixTyping}
              className={`px-8 py-3.5 rounded-xl font-bold text-white transition-all shadow-lg flex items-center gap-2 shrink-0 ${theme.btn} shadow-${theme.themeColor}-500/30 hover:shadow-${theme.themeColor}-500/50 hover:-translate-y-0.5`}
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
