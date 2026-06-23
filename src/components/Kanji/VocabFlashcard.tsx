import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, BookOpen, Frown, Meh, Smile, ArrowRight } from 'lucide-react';
import { toRomaji } from 'wanakana';
import type { VocabExample } from '../../data/kanjiData';

interface VocabFlashcardProps {
  vocabList: VocabExample[];
  onClose: () => void;
  isJPD123?: boolean;
}

type VocabStatus = 'unknown' | 'learning' | 'mastered' | 'unrated';

export const VocabFlashcard: React.FC<VocabFlashcardProps> = ({ vocabList, onClose, isJPD123 = true }) => {
  const [vocabQueue, setVocabQueue] = useState<VocabExample[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [vocabStatus, setVocabStatus] = useState<Record<string, VocabStatus>>({});
  const [direction, setDirection] = useState(0);

  const themeColor = isJPD123 ? 'blue' : 'rose';

  const getVocabId = (vocab: VocabExample) => `${vocab.kanji}_${vocab.hiragana}`;

  useEffect(() => {
    // 1. Read status from local storage
    const initialStatus: Record<string, VocabStatus> = {};
    vocabList.forEach(v => {
      const vId = getVocabId(v);
      const saved = localStorage.getItem(`vocab_status_${vId}`);
      if (saved === 'unknown' || saved === 'learning' || saved === 'mastered') {
        initialStatus[vId] = saved as VocabStatus;
      } else {
        initialStatus[vId] = 'unrated';
      }
    });
    setVocabStatus(initialStatus);

    // 2. Sort vocabList: unknown -> learning -> unrated -> mastered
    const statusOrder = { unknown: 0, learning: 1, unrated: 2, mastered: 3 };
    const sortedList = [...vocabList].sort((a, b) => {
      const orderA = statusOrder[initialStatus[getVocabId(a)]] ?? 2;
      const orderB = statusOrder[initialStatus[getVocabId(b)]] ?? 2;
      return orderA - orderB;
    });

    setVocabQueue(sortedList);
    setCurrentIndex(0);
  }, [vocabList]);

  if (vocabQueue.length === 0) return null;

  const currentVocab = vocabQueue[currentIndex];
  const currentVocabId = getVocabId(currentVocab);
  
  const romajiText = toRomaji(currentVocab.hiragana).toUpperCase();

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (isFlipped) setIsFlipped(false);
    setTimeout(() => {
      if (currentIndex < vocabQueue.length - 1) {
        setDirection(1);
        setCurrentIndex(prev => prev + 1);
      }
    }, isFlipped ? 150 : 0);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (isFlipped) setIsFlipped(false);
    setTimeout(() => {
      if (currentIndex > 0) {
        setDirection(-1);
        setCurrentIndex(prev => prev - 1);
      }
    }, isFlipped ? 150 : 0);
  };

  const handleSetStatus = (status: 'unknown' | 'learning' | 'mastered', e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Save to local storage
    localStorage.setItem(`vocab_status_${currentVocabId}`, status);
    
    // Update state
    setVocabStatus(prev => ({ ...prev, [currentVocabId]: status }));
    
    // Move to next card
    handleNext();
  };

  const totalCount = vocabQueue.length;
  const masteredCount = Object.values(vocabStatus).filter(s => s === 'mastered').length;
  const learningCount = Object.values(vocabStatus).filter(s => s === 'learning').length;
  const unknownCount = Object.values(vocabStatus).filter(s => s === 'unknown').length;
  const completedPercentage = Math.round((masteredCount / totalCount) * 100) || 0;

  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-[#F8FAFC] dark:bg-slate-950 flex flex-col font-sans animate-in fade-in duration-300">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/japanese-pattern.png')]" />
      
      {/* Header */}
      <div className="relative z-10 w-full px-4 md:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-4 w-full md:w-1/3">
          <button 
            onClick={onClose}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 font-bold text-sm transition-colors"
          >
            <ChevronLeft size={20} /> {isJPD123 ? 'JPD123' : 'JPD113'} - Từ vựng
          </button>
        </div>

        <div className="flex flex-col items-center w-full md:w-1/3">
          <div className={`flex items-center gap-2 font-black text-xl text-${themeColor}-600 dark:text-${themeColor}-500 tracking-wider`}>
            <BookOpen size={24} /> FLASHCARD
          </div>
          <div className="text-xs font-medium text-slate-500 mt-0.5">Từ vựng dễ nhớ</div>
        </div>

        <div className="flex items-center justify-end gap-6 w-full md:w-1/3">
          <div className="flex items-center gap-3 w-full max-w-[200px]">
            <span className="text-sm font-bold text-slate-600 dark:text-slate-300 whitespace-nowrap">{currentIndex + 1} / {totalCount}</span>
            <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-${themeColor}-500 transition-all duration-300`} 
                style={{ width: `${((currentIndex + 1) / totalCount) * 100}%` }}
              />
            </div>
          </div>
          <button 
            onClick={onClose}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm"
          >
            <X size={14} /> Thoát
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-2 md:p-4 overflow-y-auto">
        <div className="flex items-center justify-center w-full max-w-5xl gap-2 md:gap-6">
          
          {/* Left Arrow */}
          <button 
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`w-12 h-12 rounded-full flex items-center justify-center bg-white dark:bg-slate-800 shadow-md border border-slate-100 dark:border-slate-700 text-slate-400 hover:text-${themeColor}-500 hover:border-${themeColor}-200 transition-all disabled:opacity-30 disabled:cursor-not-allowed`}
          >
            <ChevronLeft size={24} />
          </button>

          {/* Flashcard 3D */}
          <div className="flex-1 max-w-2xl w-full perspective-1000 relative">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={{
                  enter: (dir: number) => ({
                    x: dir > 0 ? 60 : -60,
                    opacity: 0,
                    scale: 0.95,
                    rotateY: 0
                  }),
                  center: {
                    x: 0,
                    opacity: 1,
                    scale: 1,
                    rotateY: isFlipped ? 180 : 0
                  },
                  exit: (dir: number) => ({
                    x: dir < 0 ? 60 : -60,
                    opacity: 0,
                    scale: 0.95,
                    rotateY: 0
                  })
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ 
                  x: { type: "spring", stiffness: 400, damping: 35 },
                  opacity: { duration: 0.15 },
                  scale: { duration: 0.2 },
                  rotateY: { duration: 0.5, type: "spring", stiffness: 260, damping: 20 }
                }}
                style={{ transformStyle: 'preserve-3d' }}
                className="w-full h-[320px] md:h-[380px] relative cursor-pointer group"
                onClick={() => setIsFlipped(!isFlipped)}
              >
                {/* FRONT FACE */}
                <div 
                  style={{ backfaceVisibility: 'hidden' }}
                  className={`absolute inset-0 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border-2 border-${themeColor}-50/50 dark:border-slate-800 flex flex-col items-center justify-center p-4 md:p-6`}
                >
                  <div className={`absolute top-6 px-4 py-1 bg-${themeColor}-500 text-white text-[10px] font-black tracking-widest uppercase rounded-full shadow-sm`}>
                    Mặt trước
                  </div>

                  <div className={`text-6xl md:text-8xl font-jp font-bold text-slate-800 dark:text-slate-100 mb-6 group-hover:text-${themeColor}-600 transition-colors text-center`}>
                    {currentVocab.kanji}
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <div className="text-xl md:text-2xl font-bold text-slate-700 dark:text-slate-200">
                      {currentVocab.hiragana || '-'}
                    </div>
                    <div className={`text-sm md:text-base font-bold text-${themeColor}-500 tracking-widest uppercase`}>
                      {romajiText || '-'}
                    </div>
                  </div>

                  <div className="absolute bottom-4 flex items-center gap-2 text-slate-400 text-sm font-medium">
                    <span className="animate-bounce">👆</span> Nhấn vào thẻ để lật
                  </div>
                </div>

                {/* BACK FACE */}
                <div 
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  className={`absolute inset-0 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border-2 border-${themeColor}-50/50 dark:border-slate-800 flex flex-col items-center justify-center p-4 md:p-6 overflow-y-auto no-scrollbar`}
                >
                  <div className="absolute top-6 px-4 py-1 bg-slate-500 text-white text-[10px] font-black tracking-widest uppercase rounded-full shadow-sm">
                    Mặt sau
                  </div>

                  <div className={`w-12 h-12 rounded-full bg-${themeColor}-50 dark:bg-${themeColor}-900/30 text-${themeColor}-500 flex items-center justify-center mb-4`}>
                    <BookOpen size={24} />
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-slate-100 capitalize text-center px-4">
                    {currentVocab.meaning}
                  </h2>

                  <div className="absolute bottom-4 flex justify-center w-full">
                    <div className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px] font-bold flex items-center gap-1.5">
                      <ArrowRight size={12} className="rotate-180" /> Lật lại thẻ
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Arrow */}
          <button 
            onClick={handleNext}
            disabled={currentIndex === vocabQueue.length - 1}
            className={`w-12 h-12 rounded-full flex items-center justify-center bg-white dark:bg-slate-800 shadow-md border border-slate-100 dark:border-slate-700 text-slate-400 hover:text-${themeColor}-500 hover:border-${themeColor}-200 transition-all disabled:opacity-30 disabled:cursor-not-allowed`}
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Rating Buttons */}
        <div className="grid grid-cols-3 gap-2 md:gap-4 mt-4 w-full max-w-2xl px-4">
          <button 
            onClick={(e) => handleSetStatus('unknown', e)}
            className="flex flex-col items-center justify-center py-2 md:py-3 bg-rose-50 dark:bg-rose-900/20 border-2 border-rose-100 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 rounded-2xl hover:bg-rose-100 dark:hover:bg-rose-900/40 hover:border-rose-200 transition-all shadow-sm hover:shadow-md hover:-translate-y-1 group"
          >
            <Frown size={20} className="mb-1 group-hover:scale-110 transition-transform" />
            <span className="font-bold text-[10px] md:text-xs uppercase tracking-wide">Chưa thuộc</span>
            <span className="text-[8px] md:text-[10px] text-rose-500/70 dark:text-rose-400/70 mt-0.5">Cần học lại</span>
          </button>
          
          <button 
            onClick={(e) => handleSetStatus('learning', e)}
            className="flex flex-col items-center justify-center py-2 md:py-3 bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-100 dark:border-amber-900/50 text-amber-600 dark:text-amber-400 rounded-2xl hover:bg-amber-100 dark:hover:bg-amber-900/40 hover:border-amber-200 transition-all shadow-sm hover:shadow-md hover:-translate-y-1 group"
          >
            <Meh size={20} className="mb-1 group-hover:scale-110 transition-transform" />
            <span className="font-bold text-[10px] md:text-xs uppercase tracking-wide">Đang học</span>
            <span className="text-[8px] md:text-[10px] text-amber-500/70 dark:text-amber-400/70 mt-0.5">Vẫn còn mờ</span>
          </button>
          
          <button 
            onClick={(e) => handleSetStatus('mastered', e)}
            className="flex flex-col items-center justify-center py-2 md:py-3 bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-100 dark:border-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-2xl hover:bg-emerald-100 dark:hover:bg-emerald-900/40 hover:border-emerald-200 transition-all shadow-sm hover:shadow-md hover:-translate-y-1 group"
          >
            <Smile size={20} className="mb-1 group-hover:scale-110 transition-transform" />
            <span className="font-bold text-[10px] md:text-xs uppercase tracking-wide">Đã thuộc</span>
            <span className="text-[8px] md:text-[10px] text-emerald-500/70 dark:text-emerald-400/70 mt-0.5">Ghi nhớ tốt</span>
          </button>
        </div>
      </div>

      {/* Bottom Statistics Bar */}
      <div className="relative z-10 w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-3 px-6 shadow-[0_-4px_20px_rgb(0,0,0,0.02)]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm font-bold text-slate-600 dark:text-slate-300">
            Thống kê bài học: <span className={`text-${themeColor}-500`}>{totalCount} Từ vựng</span>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="text-xs font-medium text-slate-500"><b className="text-slate-700 dark:text-slate-200">{masteredCount}</b> Đã thuộc</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <span className="text-xs font-medium text-slate-500"><b className="text-slate-700 dark:text-slate-200">{learningCount}</b> Đang học</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-400" />
              <span className="text-xs font-medium text-slate-500"><b className="text-slate-700 dark:text-slate-200">{unknownCount}</b> Chưa thuộc</span>
            </div>
          </div>
          
          <div className="text-sm font-bold text-slate-600 dark:text-slate-300">
            Hoàn thành: <span className="text-emerald-500">{completedPercentage}%</span>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
