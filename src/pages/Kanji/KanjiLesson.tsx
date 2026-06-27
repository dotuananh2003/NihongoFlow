
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, LayoutGrid, List, Check, X } from 'lucide-react';
import { toRomaji } from 'wanakana';

import { kanjiLesson1, lesson1Vocab } from '../../data/kanjiData';
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

export const KanjiLesson = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [isFlashcardMode, setIsFlashcardMode] = useState(false);
  const [isVocabFlashcardMode, setIsVocabFlashcardMode] = useState(false);
  const [isVocabQuizMode, setIsVocabQuizMode] = useState(false);
  const [typingVocab, setTypingVocab] = useState<any[] | null>(null);
  const [selectedKanjiIds, setSelectedKanjiIds] = useState<string[]>([]);

  // In a real app, fetch data based on courseId and lessonId
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
  const theme = {
    btnBg: isJPD123 ? 'bg-blue-500 hover:bg-blue-600 shadow-blue-500/30' : 'bg-rose-500 hover:bg-rose-600 shadow-rose-500/30',
    textHover: isJPD123 ? 'group-hover:text-blue-500' : 'group-hover:text-rose-500',
    text: isJPD123 ? 'text-blue-500' : 'text-rose-500',
  };

  const otherVocab = vocabList.filter(vocab => {
    return !kanjiList.some(kanji => vocab.kanji.includes(kanji.char));
  });

  let selectedVocabList = vocabList;
  if (selectedKanjiIds.length > 0) {
    const selectedKanjis = kanjiList.filter(k => selectedKanjiIds.includes(k.id));
    const tempVocab = selectedKanjis.flatMap(k => k.vocab || []);
    if (selectedKanjiIds.includes('other')) {
      tempVocab.push(...otherVocab);
    }
    
    // remove duplicates by robust key
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

  return (
    <div className="relative min-h-full pb-20 bg-[#FAF8F5] dark:bg-slate-950 font-sans">
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 pt-8">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => navigate('/kanji')}
            className="w-10 h-10 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 shadow-sm border border-slate-200 dark:border-slate-700 hover:scale-105 transition-all"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">
            {courseId?.toUpperCase()} &bull; Lesson {lessonId}
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Column: Kanji Core */}
          <div className="w-full lg:w-[60%] flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <h2 className="text-sm font-black text-slate-800 dark:text-slate-100 uppercase tracking-widest flex items-center gap-2 shrink-0">
                KANJI CORE ({kanjiList.length})
                {isSelectMode && selectedKanjiIds.length > 0 && (
                  <span className={`px-2 py-0.5 rounded-md text-[10px] bg-slate-800 text-white dark:bg-white dark:text-slate-800`}>
                    Đã chọn {selectedKanjiIds.length}
                  </span>
                )}
              </h2>
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => {
                    if (isSelectMode) {
                      setIsSelectMode(false);
                      setSelectedKanjiIds([]);
                    } else {
                      setIsSelectMode(true);
                    }
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm border ${isSelectMode ? 'bg-slate-800 text-white dark:bg-white dark:text-slate-900 border-transparent' : `bg-white dark:bg-slate-900 ${theme.text} border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800`}`}
                >
                  {isSelectMode ? <><X size={14} /> Hủy chọn</> : <><List size={14} /> Chọn thủ công</>}
                </button>

                {isSelectMode && (
                  <button
                    onClick={() => {
                      const totalItems = kanjiList.length + (otherVocab.length > 0 ? 1 : 0);
                      if (selectedKanjiIds.length === totalItems) {
                        setSelectedKanjiIds([]);
                      } else {
                        setSelectedKanjiIds([...kanjiList.map(k => k.id), ...(otherVocab.length > 0 ? ['other'] : [])]);
                      }
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all bg-white dark:bg-slate-900 ${theme.text} border border-slate-200 dark:border-slate-700`}
                  >
                    {selectedKanjiIds.length === kanjiList.length + (otherVocab.length > 0 ? 1 : 0) ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
                  </button>
                )}
                {!isSelectMode && (
                  <>
                    <button 
                      onClick={() => setIsFlashcardMode(true)}
                      className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors shadow-sm"
                    >
                      <LayoutGrid size={14} /> FLASHCARD
                    </button>
                    <button 
                      onClick={() => setTypingVocab(vocabList)}
                      className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors shadow-sm"
                    >
                      <List size={14} /> GÕ
                    </button>
                  </>
                )}
                {isSelectMode && (
                  <>
                    <button 
                      onClick={() => setIsFlashcardMode(true)}
                      disabled={selectedKanjiIds.length === 0}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors shadow-sm border ${selectedKanjiIds.length === 0 ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50'}`}
                    >
                      <LayoutGrid size={14} /> FLASHCARD
                    </button>
                    <button 
                      onClick={() => setTypingVocab(selectedVocabList)}
                      disabled={selectedKanjiIds.length === 0}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors shadow-sm border ${selectedKanjiIds.length === 0 ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50'}`}
                    >
                      <List size={14} /> GÕ
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {kanjiList.map((kanji, idx) => (
                <motion.div
                  key={kanji.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25, delay: idx * 0.03 }}
                  onClick={() => {
                    if (isSelectMode) {
                      setSelectedKanjiIds(prev => prev.includes(kanji.id) ? prev.filter(id => id !== kanji.id) : [...prev, kanji.id]);
                    } else {
                      navigate(`/kanji/${courseId}/lesson/${lessonId}/${kanji.id}`);
                    }
                  }}
                  className={`p-4 rounded-[1.5rem] border shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all cursor-pointer flex items-center gap-5 group relative ${
                    isSelectMode && selectedKanjiIds.includes(kanji.id)
                      ? isJPD123 ? 'bg-blue-50 border-blue-400 dark:bg-blue-900/20 dark:border-blue-500' : 'bg-rose-50 border-rose-400 dark:bg-rose-900/20 dark:border-rose-500'
                      : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800'
                  }`}
                >
                  {isSelectMode && (
                    <div className={`absolute top-3 right-3 w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                      selectedKanjiIds.includes(kanji.id) 
                        ? (isJPD123 ? 'bg-blue-500 border-blue-500 text-white' : 'bg-rose-500 border-rose-500 text-white')
                        : 'border-slate-300 dark:border-slate-600 bg-white/50 dark:bg-slate-800/50'
                    }`}>
                      {selectedKanjiIds.includes(kanji.id) && <Check size={12} strokeWidth={3} />}
                    </div>
                  )}
                  <div className={`text-5xl font-jp font-medium text-slate-800 dark:text-slate-100 shrink-0 w-16 text-center transition-colors ${theme.textHover}`}>
                    {kanji.char}
                  </div>
                  <div className={`flex-1 min-w-0 flex flex-col justify-center ${isSelectMode ? 'pr-6' : ''}`}>
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-end gap-2 truncate pr-2">
                        <span className="font-bold text-sm text-slate-800 dark:text-slate-200 uppercase tracking-wider">{kanji.hanViet}</span>
                        <span className="text-xs text-slate-500 truncate">{kanji.meaning}</span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded-md shrink-0 whitespace-nowrap">
                        {kanji.vocab?.length || 0} từ
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {kanji.kunyomi.length > 0 && (
                        <span className="text-slate-600 dark:text-slate-400">{kanji.kunyomi.join('、')}</span>
                      )}
                      {kanji.onyomi.length > 0 && (
                        <span className={`font-medium ${theme.text}`}>{kanji.onyomi.join('、')}</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              {otherVocab.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25, delay: kanjiList.length * 0.03 }}
                  onClick={() => {
                    if (isSelectMode) {
                      setSelectedKanjiIds(prev => prev.includes('other') ? prev.filter(id => id !== 'other') : [...prev, 'other']);
                    } else {
                      navigate(`/kanji/${courseId}/lesson/${lessonId}/other`);
                    }
                  }}
                  className={`p-4 rounded-[1.5rem] border shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all cursor-pointer flex items-center gap-5 group relative ${
                    isSelectMode && selectedKanjiIds.includes('other')
                      ? isJPD123 ? 'bg-blue-50 border-blue-400 dark:bg-blue-900/20 dark:border-blue-500' : 'bg-rose-50 border-rose-400 dark:bg-rose-900/20 dark:border-rose-500'
                      : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {isSelectMode && (
                    <div className={`absolute top-3 right-3 w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                      selectedKanjiIds.includes('other') 
                        ? (isJPD123 ? 'bg-blue-500 border-blue-500 text-white' : 'bg-rose-500 border-rose-500 text-white')
                        : 'border-slate-300 dark:border-slate-600 bg-white/50 dark:bg-slate-800/50'
                    }`}>
                      {selectedKanjiIds.includes('other') && <Check size={12} strokeWidth={3} />}
                    </div>
                  )}
                  <div className={`text-4xl font-medium text-slate-400 shrink-0 w-16 text-center transition-colors ${
                    isSelectMode && selectedKanjiIds.includes('other') ? (isJPD123 ? 'text-blue-500' : 'text-rose-500') : 'group-hover:text-slate-600 dark:group-hover:text-slate-200'
                  }`}>
                    …
                  </div>
                  <div className={`flex-1 min-w-0 flex flex-col justify-center ${isSelectMode ? 'pr-6' : ''}`}>
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-end gap-2 truncate pr-2">
                        <span className="font-bold text-sm text-slate-700 dark:text-slate-300 uppercase tracking-wider">Từ vựng khác</span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded-md shrink-0 whitespace-nowrap">
                        {otherVocab.length} từ
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="text-slate-500">Từ vựng không chứa Kanji trong bài</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Right Column: Vocabulary */}
          <div className="w-full lg:w-[40%] flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <h2 className="text-sm font-black text-slate-800 dark:text-slate-100 uppercase tracking-widest shrink-0">
                VOCABULARY ({vocabList.length})
              </h2>
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => setIsVocabQuizMode(true)}
                  className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 px-3 py-2 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors shadow-sm"
                >
                  <LayoutGrid size={14} /> MULTIPLE CHOICE
                </button>
                <button 
                  onClick={() => setIsVocabFlashcardMode(true)}
                  className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 px-3 py-2 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors shadow-sm"
                >
                  <LayoutGrid size={14} /> FLASHCARD
                </button>
                <button 
                  onClick={() => setTypingVocab(vocabList)}
                  className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 px-3 py-2 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors shadow-sm"
                >
                  <List size={14} /> GÕ
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden">
              <div className="divide-y divide-slate-100 dark:divide-slate-800/50 max-h-[70vh] overflow-y-auto px-2">
                {vocabList.length === 0 ? (
                  <div className="p-8 text-center text-slate-500 font-medium">Chưa có từ vựng nào.</div>
                ) : vocabList.map((vocab, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25, delay: idx * 0.02 }}
                    className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-center justify-between rounded-2xl mx-2 my-1"
                  >
                    <div>
                      <div className="text-lg font-jp font-bold text-slate-800 dark:text-slate-100 mb-0.5">{vocab.kanji}</div>
                      <div className="flex flex-col">
                        <span className="text-xs text-slate-500 mb-0.5">{vocab.hiragana}</span>
                        <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{toRomaji(vocab.hiragana)}</span>
                      </div>
                    </div>
                    <div className="text-sm font-medium text-slate-600 dark:text-slate-300 text-right max-w-[50%]">
                      {vocab.meaning}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {typingVocab && (
        <KanjiVocabTyping 
          vocabList={typingVocab} 
          onClose={() => setTypingVocab(null)}
          isJPD123={isJPD123}
        />
      )}

      {isFlashcardMode && (
        <KanjiFlashcard 
          kanjiList={selectedKanjiIds.length > 0 ? kanjiList.filter(k => selectedKanjiIds.includes(k.id)) : kanjiList}
          onClose={() => setIsFlashcardMode(false)}
          isJPD123={isJPD123}
        />
      )}

      {isVocabFlashcardMode && (
        <VocabFlashcard 
          vocabList={vocabList}
          onClose={() => setIsVocabFlashcardMode(false)}
          isJPD123={isJPD123}
        />
      )}

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
