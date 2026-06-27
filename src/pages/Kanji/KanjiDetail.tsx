import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Volume2, ArrowRight, List, X, Check } from 'lucide-react';
import { toRomaji } from 'wanakana';
import { kanjiLesson1, lesson1Vocab, type KanjiDetail as IKanjiDetail, type RadicalNode } from '../../data/kanjiData';
import { kanjiLesson2, vocabLesson2 } from '../../data/kanjiDataLesson2';
import { kanjiLesson3, vocabLesson3 } from '../../data/kanjiDataLesson3';
import { kanjiLessonJPD123, vocabLessonJPD123 } from '../../data/kanjiDataJPD123';
import { kanjiLesson5JPD123, vocabLesson5JPD123 } from '../../data/kanjiDataJPD123Lesson5';
import { kanjiLesson6JPD123, vocabLesson6JPD123 } from '../../data/kanjiDataJPD123Lesson6';
import { kanjiLesson7JPD123, vocabLesson7JPD123 } from '../../data/kanjiDataJPD123Lesson7';
import { KanjiStrokeCanvas } from '../../components/Kanji/KanjiStrokeCanvas';
import { KanjiVocabTyping } from '../../components/Kanji/KanjiVocabTyping';

const RadicalTree = ({ node, theme }: { node?: RadicalNode, theme: any }) => {
  if (!node) return null;

  return (
    <div className="flex flex-col items-center">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 shadow-sm relative z-10 border-2 ${theme.bgLight} ${theme.text} ${theme.borderLight}`}>
        <span className="font-jp text-xl font-bold">{node.char}</span>
      </div>
      <div className="text-center mb-4">
        <div className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">{node.name}</div>
        <div className="text-[10px] text-slate-500">{node.meaning}</div>
      </div>

      {node.children && node.children.length > 0 && (
        <div className="relative flex justify-center gap-8 md:gap-16 mt-2 pt-4">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-6 bg-slate-200 dark:bg-slate-700 -mt-4"></div>
          <div className="absolute top-2 left-1/4 right-1/4 h-px bg-slate-200 dark:bg-slate-700"></div>

          {node.children.map((child, idx) => (
            <div key={idx} className="relative pt-4">
              <div className="absolute top-[-8px] left-1/2 -translate-x-1/2 w-px h-4 bg-slate-200 dark:bg-slate-700"></div>
              <RadicalTree node={child} theme={theme} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const KanjiDetail = () => {
  const { courseId, lessonId, kanjiId } = useParams();
  const navigate = useNavigate();

  const [kanjiData, setKanjiData] = useState<IKanjiDetail | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTypingMode, setIsTypingMode] = useState(false);
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedVocab, setSelectedVocab] = useState<number[]>([]);

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
    bgLight: isJPD123 ? 'bg-blue-50 dark:bg-blue-500/10' : 'bg-rose-50 dark:bg-rose-500/10',
    text: isJPD123 ? 'text-blue-500' : 'text-rose-500',
    borderLight: isJPD123 ? 'border-blue-100 dark:border-blue-500/20' : 'border-rose-100 dark:border-rose-500/20',
    hoverBgLight: isJPD123 ? 'hover:bg-blue-200' : 'hover:bg-rose-200',
    textHover: isJPD123 ? 'hover:text-blue-500' : 'hover:text-rose-500',
    textHoverBright: isJPD123 ? 'hover:text-blue-600' : 'hover:text-rose-600',
    highlightHex: isJPD123 ? '#3b82f6' : '#f43f5e',
    borderText: isJPD123 ? 'border-blue-200 text-blue-600' : 'border-rose-200 text-rose-600',
    hoverBgLightSoft: isJPD123 ? 'hover:bg-blue-50 dark:hover:bg-blue-500/10' : 'hover:bg-rose-50 dark:hover:bg-rose-500/10',
  };

  useEffect(() => {
    if (kanjiId === 'other') {
      const otherVocab = vocabList.filter(vocab => {
        return !kanjiList.some(kanji => vocab.kanji.includes(kanji.char));
      });
      setKanjiData({
        id: 'other',
        char: '…',
        hanViet: 'KHÁC',
        meaning: 'Các từ vựng khác trong bài',
        onyomi: [],
        kunyomi: [],
        strokes: 0,
        jlpt: courseId || '',
        mnemonic: 'Danh sách các từ vựng xuất hiện trong bài học này nhưng không chứa bất kỳ Kanji cốt lõi nào ở trên.',
        vocab: otherVocab
      });
      setCurrentIndex(-1);
      setIsSelectMode(false);
      setSelectedVocab([]);
    } else {
      const idx = kanjiList.findIndex(k => k.id === kanjiId);
      if (idx !== -1) {
        setKanjiData(kanjiList[idx]);
        setCurrentIndex(idx);
        setIsSelectMode(false);
        setSelectedVocab([]);
      }
    }
  }, [kanjiId, kanjiList, vocabList, courseId]);

  if (!kanjiData) return <div className="p-10 text-center">Loading...</div>;

  const handlePrev = () => {
    if (kanjiId === 'other') {
      // Go to last kanji from "other"
      navigate(`/kanji/${courseId}/lesson/${lessonId}/${kanjiList[kanjiList.length - 1].id}`);
    } else if (currentIndex > 0) {
      navigate(`/kanji/${courseId}/lesson/${lessonId}/${kanjiList[currentIndex - 1].id}`);
    }
  };

  const handleNext = () => {
    if (currentIndex >= 0 && currentIndex < kanjiList.length - 1) {
      navigate(`/kanji/${courseId}/lesson/${lessonId}/${kanjiList[currentIndex + 1].id}`);
    } else if (currentIndex === kanjiList.length - 1) {
      // If at last kanji, next goes to "other" if there is other vocab
      const otherVocab = vocabList.filter(vocab => {
        return !kanjiList.some(kanji => vocab.kanji.includes(kanji.char));
      });
      if (otherVocab.length > 0) {
        navigate(`/kanji/${courseId}/lesson/${lessonId}/other`);
      }
    }
  };

  const hasOtherVocab = vocabList.some(vocab => {
    return !kanjiList.some(kanji => vocab.kanji.includes(kanji.char));
  });

  return (
    <div className="relative min-h-full pb-20 bg-[#FAF8F5] dark:bg-slate-950 font-sans">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 pt-4">

        {/* Header */}
        <div className="relative flex items-center justify-between mb-4">
          <div className="flex items-center gap-3 text-sm font-medium text-slate-500 dark:text-slate-400">
            <button
              onClick={() => navigate(`/kanji/${courseId}/lesson/${lessonId}`)}
              className="flex items-center gap-2 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
            >
              <ArrowLeft size={16} /> <span className="hidden sm:inline">Quay lại</span>
            </button>
            <span className="hidden sm:inline">&bull;</span>
            <span className="text-slate-800 dark:text-slate-200 font-bold hidden sm:inline">Kanji Core</span>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full font-bold text-sm transition-all ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed bg-slate-100 dark:bg-slate-800 text-slate-400' : `bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md text-slate-700 dark:text-slate-200 ${theme.textHover}`}`}
            >
              <ArrowLeft size={14} /> {kanjiId === 'other' ? kanjiList[kanjiList.length - 1].char : (currentIndex > 0 ? kanjiList[currentIndex - 1].char : 'Trước')}
            </button>

            <button
              onClick={handleNext}
              disabled={kanjiId === 'other' || (currentIndex === kanjiList.length - 1 && !hasOtherVocab)}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full font-bold text-sm transition-all ${kanjiId === 'other' || (currentIndex === kanjiList.length - 1 && !hasOtherVocab) ? 'opacity-50 cursor-not-allowed bg-slate-100 dark:bg-slate-800 text-slate-400' : `bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md text-slate-700 dark:text-slate-200 ${theme.textHover}`}`}
            >
              {currentIndex >= 0 && currentIndex < kanjiList.length - 1 ? kanjiList[currentIndex + 1].char : (currentIndex === kanjiList.length - 1 && hasOtherVocab ? 'Khác' : 'Tiếp')} <ArrowRight size={14} />
            </button>
          </div>

          <div className="w-[100px]"></div> {/* spacer to balance the header */}
        </div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="flex items-center gap-3 mb-3"
        >
          <div className="text-4xl font-jp font-medium text-slate-800 dark:text-slate-100">{kanjiData.char}</div>
          <div className="text-xl font-black text-slate-800 dark:text-slate-100 uppercase tracking-widest">({kanjiData.hanViet})</div>
          {kanjiId !== 'other' && (
            <button className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-sm ${theme.bgLight} ${theme.text} ${theme.hoverBgLight}`}>
              <Volume2 size={16} />
            </button>
          )}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {kanjiData.radicalTree && kanjiId !== 'other' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0.05 }}
              className="bg-white dark:bg-slate-900 rounded-[2rem] p-4 shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col"
            >
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">BỘ THỦ / THÀNH PHẦN</h3>
              <div className="flex-1 flex items-center justify-center overflow-x-auto pb-4">
                <RadicalTree node={kanjiData.radicalTree} theme={theme} />
              </div>
            </motion.div>
          )}

          {kanjiId !== 'other' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0.1 }}
              className="bg-white dark:bg-slate-900 rounded-[2rem] p-4 shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col items-center"
            >
              <KanjiStrokeCanvas character={kanjiData.char} totalStrokes={kanjiData.strokes} theme={theme} />
            </motion.div>
          )}

          <div className="flex flex-col gap-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0.15 }}
              className="bg-white dark:bg-slate-900 rounded-[2rem] p-4 shadow-sm border border-slate-200 dark:border-slate-800 relative"
            >
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">THÔNG TIN CHI TIẾT</h3>

              <div className="space-y-3 text-sm">
                <div className="grid grid-cols-[100px_1fr] gap-3">
                  <div className="text-slate-500">Hán Việt:</div>
                  <div className="font-bold text-slate-800 dark:text-slate-100 uppercase text-base">{kanjiData.hanViet}</div>
                </div>
                <div className="grid grid-cols-[100px_1fr] gap-3">
                  <div className="text-slate-500">Ý nghĩa:</div>
                  <div className="font-medium text-slate-800 dark:text-slate-100">{kanjiData.meaning}</div>
                </div>
                <div className="grid grid-cols-[100px_1fr] gap-3">
                  <div className="text-slate-500">JLPT:</div>
                  <div className="font-bold text-slate-800 dark:text-slate-100 uppercase">{courseId}</div>
                </div>
                {kanjiId !== 'other' && (
                  <>
                    <div className="grid grid-cols-[100px_1fr] gap-3">
                      <div className="text-slate-500">Số nét:</div>
                      <div className="font-bold text-slate-800 dark:text-slate-100">{kanjiData.strokes}</div>
                    </div>
                    <div className="grid grid-cols-[100px_1fr] gap-3">
                      <div className="text-slate-500">Âm Kun:</div>
                      <div className="font-bold text-slate-800 dark:text-slate-100">{kanjiData.kunyomi.join('、')}</div>
                    </div>
                    <div className="grid grid-cols-[100px_1fr] gap-3">
                      <div className="text-slate-500">Âm On:</div>
                      <div className={`font-bold ${theme.text}`}>{kanjiData.onyomi.join('、')}</div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0.2 }}
              className={`rounded-[2rem] p-4 border flex flex-col ${theme.bgLight} ${theme.borderLight}`}
            >
              <div className={`flex items-center gap-2 mb-1 font-bold text-xs uppercase tracking-wider ${theme.text}`}>
                💡 Gợi ý cách nhớ
              </div>
              <p className="text-slate-700 dark:text-slate-200 text-xs font-medium leading-relaxed">
                {kanjiData.mnemonic}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Block 6: Vocabulary containing this Kanji */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0.25 }}
          className="mt-4"
        >
          <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-3 mb-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              TỪ VỰNG CHỨA KANJI {kanjiData.char}
              {isSelectMode && selectedVocab.length > 0 && (
                <span className="px-2 py-0.5 rounded-md text-[10px] bg-slate-800 text-white dark:bg-white dark:text-slate-800">
                  Đã chọn {selectedVocab.length}
                </span>
              )}
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  if (isSelectMode) {
                    setIsSelectMode(false);
                    setSelectedVocab([]);
                  } else {
                    setIsSelectMode(true);
                  }
                }}
                className={`font-bold text-[10px] sm:text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${isSelectMode ? 'bg-slate-800 text-white dark:bg-white dark:text-slate-900 border-transparent' : `bg-white dark:bg-slate-900 ${theme.text} ${theme.borderLight} hover:bg-slate-50 dark:hover:bg-slate-800`}`}
              >
                {isSelectMode ? <><X size={14} /> Hủy chọn</> : <><List size={14} /> Chọn thủ công</>}
              </button>
              
              {isSelectMode && (
                <button
                  onClick={() => {
                    if (selectedVocab.length === kanjiData.vocab.length) {
                      setSelectedVocab([]);
                    } else {
                      setSelectedVocab(kanjiData.vocab.map((_, i) => i));
                    }
                  }}
                  className={`font-bold text-[10px] sm:text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all bg-white dark:bg-slate-900 ${theme.text} ${theme.borderLight}`}
                >
                  {selectedVocab.length === kanjiData.vocab.length ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
                </button>
              )}

              <button
                onClick={() => setIsTypingMode(true)}
                disabled={isSelectMode && selectedVocab.length === 0}
                className={`font-bold text-[10px] sm:text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all shadow-sm ${
                  isSelectMode && selectedVocab.length === 0 
                    ? 'opacity-50 cursor-not-allowed bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400' 
                    : `bg-white dark:bg-slate-900 ${theme.text} ${theme.borderLight} hover:shadow-md ${theme.textHoverBright}`
                }`}
              >
                ⌨️ {isSelectMode && selectedVocab.length > 0 ? `Gõ (${selectedVocab.length})` : 'Gõ tất cả'}
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pb-4">
            {kanjiData.vocab.map((v, i) => (
              <div 
                key={i} 
                onClick={() => {
                  if (isSelectMode) {
                    if (selectedVocab.includes(i)) {
                      setSelectedVocab(prev => prev.filter(idx => idx !== i));
                    } else {
                      setSelectedVocab(prev => [...prev, i]);
                    }
                  }
                }}
                className={`relative rounded-2xl p-3 border shadow-sm transition-all ${
                  isSelectMode ? 'cursor-pointer hover:scale-[1.02] pr-9 min-w-[180px]' : 'min-w-[160px]'
                } ${
                  isSelectMode && selectedVocab.includes(i)
                    ? `${theme.bgLight} ${theme.borderLight}`
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                }`}
              >
                {isSelectMode && (
                  <div className={`absolute top-2 right-2 w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                    selectedVocab.includes(i) 
                      ? (isJPD123 ? 'bg-blue-500 border-blue-500 text-white' : 'bg-rose-500 border-rose-500 text-white')
                      : 'border-slate-300 dark:border-slate-600 bg-white/50 dark:bg-slate-800/50'
                  }`}>
                    {selectedVocab.includes(i) && <Check size={12} strokeWidth={3} />}
                  </div>
                )}
                <div className="flex items-end gap-3 mb-2">
                  <span className="text-xl font-jp font-bold text-slate-800 dark:text-slate-100">{v.kanji}</span>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 mb-0.5">{v.hiragana}</span>
                    <span className="text-[9px] text-slate-400 font-medium uppercase tracking-wider">{toRomaji(v.hiragana)}</span>
                  </div>
                </div>
                <div className="text-xs font-medium text-slate-700 dark:text-slate-300 truncate">{v.meaning}</div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>

      {isTypingMode && (
        <KanjiVocabTyping
          vocabList={isSelectMode && selectedVocab.length > 0 ? selectedVocab.map(i => kanjiData.vocab[i]) : kanjiData.vocab}
          onClose={() => setIsTypingMode(false)}
          kanjiChar={kanjiData.char}
          isJPD123={isJPD123}
        />
      )}
    </div>
  );
};
