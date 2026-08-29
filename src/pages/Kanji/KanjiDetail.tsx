import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  Info,
  Keyboard,
  Lightbulb,
  List,
  Volume2,
  X,
  Sparkles,
  Award
} from 'lucide-react';
import { motion } from 'framer-motion';
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

// Cây phân tích bộ thủ hiện đại
const RadicalTree = ({ node, theme }: { node?: RadicalNode; theme: Record<string, string> }) => {
  if (!node) return null;

  return (
    <div className="flex flex-col items-center">
      <div className={`relative grid h-11 w-11 place-items-center overflow-hidden rounded-2xl border bg-white dark:bg-slate-800 shadow-sm ${theme.border} ${theme.color}`}>
        <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${theme.gradient}`} />
        <span className="font-jp text-lg font-black">{node.char}</span>
      </div>
      <div className="mt-1 text-center">
        <div className="text-[10px] font-black uppercase text-slate-800 dark:text-slate-200">{node.name}</div>
        <div className="text-[9px] font-semibold text-slate-400">{node.meaning}</div>
      </div>

      {node.children && node.children.length > 0 && (
        <div className="relative mt-2 flex justify-center gap-4 pt-3 md:gap-6">
          <div className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-slate-300 dark:bg-slate-700" />
          <div className="absolute left-4 right-4 top-3 h-px bg-slate-300 dark:bg-slate-700" />
          {node.children.map((child, idx) => (
            <div key={idx} className="relative pt-3">
              <div className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-slate-300 dark:bg-slate-700" />
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
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

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
  } else if (lessonId === '2') {
    kanjiList = kanjiLesson2;
    vocabList = vocabLesson2;
  } else if (lessonId === '3') {
    kanjiList = kanjiLesson3;
    vocabList = vocabLesson3;
  }

  const isJPD123 = courseId?.toLowerCase() === 'jpd123';
  const theme = isJPD123 ? {
    color: 'text-blue-600 dark:text-blue-400',
    bgLight: 'bg-blue-50/90 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300 border border-blue-200 dark:border-blue-800',
    border: 'border-blue-200/80 dark:border-slate-800',
    btn: 'from-blue-600 via-sky-500 to-indigo-600 hover:from-blue-700 hover:to-sky-600 shadow-[0_8px_20px_rgba(59,130,246,0.3)]',
    gradient: 'from-blue-600 via-sky-500 to-cyan-400',
    hoverBorder: 'hover:border-blue-300 dark:hover:border-blue-600/50',
    selected: 'bg-blue-50 border-blue-400 dark:bg-blue-900/30 dark:border-blue-600'
  } : {
    color: 'text-rose-600 dark:text-rose-400',
    bgLight: 'bg-rose-100/90 text-rose-700 dark:bg-rose-950/70 dark:text-rose-300 border border-rose-200 dark:border-rose-800',
    border: 'border-rose-200/80 dark:border-slate-800',
    btn: 'from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-600 shadow-[0_8px_20px_rgba(244,63,94,0.3)]',
    gradient: 'from-rose-500 via-pink-500 to-amber-400',
    hoverBorder: 'hover:border-rose-300 dark:hover:border-rose-600/50',
    selected: 'bg-rose-50 border-rose-400 dark:bg-rose-900/30 dark:border-rose-600'
  };

  // Phát âm chuẩn Tokyo
  const playAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.85;
      setIsPlayingAudio(true);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    if (kanjiId === 'other') {
      const otherVocab = vocabList.filter(vocab => {
        return !kanjiList.some(kanji => vocab.kanji.includes(kanji.char));
      });

      setKanjiData({
        id: 'other',
        char: '…',
        hanViet: 'TỪ VỰNG KHÁC',
        meaning: 'Các từ vựng xuất hiện trong bài không chứa Kanji trọng tâm',
        onyomi: [],
        kunyomi: [],
        strokes: 0,
        jlpt: courseId || '',
        mnemonic: 'Danh sách các từ vựng bổ sung trong bài học.',
        vocab: otherVocab,
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

  if (!kanjiData) return <div className="p-10 text-center text-slate-500 font-bold">Đang tải Hán tự...</div>;

  const handlePrev = () => {
    if (kanjiId === 'other') {
      navigate(`/kanji/${courseId}/lesson/${lessonId}/${kanjiList[kanjiList.length - 1].id}`);
    } else if (currentIndex > 0) {
      navigate(`/kanji/${courseId}/lesson/${lessonId}/${kanjiList[currentIndex - 1].id}`);
    }
  };

  const handleNext = () => {
    if (currentIndex >= 0 && currentIndex < kanjiList.length - 1) {
      navigate(`/kanji/${courseId}/lesson/${lessonId}/${kanjiList[currentIndex + 1].id}`);
    } else if (currentIndex === kanjiList.length - 1) {
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
  const currentNumber = currentIndex >= 0 ? currentIndex + 1 : kanjiList.length + 1;
  const totalNumber = hasOtherVocab ? kanjiList.length + 1 : kanjiList.length;

  return (
    <div className="relative min-h-full bg-transparent pb-16 font-sans">
      <div className="mx-auto max-w-[1440px] px-4 py-4 sm:px-6 lg:px-8 space-y-5">

        {/* ========================================================================= */}
        {/* 1. TOP NAVIGATION BAR: BREADCRUMB & PREV/NEXT PUSH BUTTONS */}
        {/* ========================================================================= */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          
          {/* Breadcrumb quay lại */}
          <div className="flex items-center gap-2">
            <motion.button
              onClick={() => navigate(`/kanji/${courseId}/lesson/${lessonId}`)}
              whileHover={{ scale: 1.03, x: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 px-3.5 py-1.5 text-xs font-black text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-blue-300 hover:text-blue-600 transition-colors cursor-pointer"
            >
              <ArrowLeft size={14} strokeWidth={2.4} />
              <span>Danh sách Hán tự Bài {lessonId}</span>
            </motion.button>

            <span className={`hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${theme.bgLight}`}>
              <Sparkles size={12} />
              {courseId?.toUpperCase()} • Kanji {currentNumber}/{totalNumber}
            </span>
          </div>

          {/* Cụm Nút Chuyển Hán Tự Trước / Sau */}
          <div className="flex items-center gap-2">
            <motion.button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              whileHover={{ scale: currentIndex === 0 ? 1 : 1.03 }}
              whileTap={{ scale: currentIndex === 0 ? 1 : 0.97 }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-colors cursor-pointer ${
                currentIndex === 0
                  ? 'bg-slate-100 dark:bg-slate-800/50 text-slate-400 cursor-not-allowed border border-transparent'
                  : 'bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100'
              }`}
            >
              <ArrowLeft size={13} strokeWidth={2.4} />
              <span>{kanjiId === 'other' ? kanjiList[kanjiList.length - 1]?.char : currentIndex > 0 ? kanjiList[currentIndex - 1]?.char : 'Trước'}</span>
            </motion.button>

            <span className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-black text-slate-600 dark:text-slate-300">
              {currentNumber} / {totalNumber}
            </span>

            <motion.button
              onClick={handleNext}
              disabled={kanjiId === 'other' || (currentIndex === kanjiList.length - 1 && !hasOtherVocab)}
              whileHover={{ scale: kanjiId === 'other' ? 1 : 1.03 }}
              whileTap={{ scale: kanjiId === 'other' ? 1 : 0.97 }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-colors cursor-pointer ${
                kanjiId === 'other' || (currentIndex === kanjiList.length - 1 && !hasOtherVocab)
                  ? 'bg-slate-100 dark:bg-slate-800/50 text-slate-400 cursor-not-allowed border border-transparent'
                  : 'bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100'
              }`}
            >
              <span>{currentIndex >= 0 && currentIndex < kanjiList.length - 1 ? kanjiList[currentIndex + 1]?.char : currentIndex === kanjiList.length - 1 && hasOtherVocab ? 'Khác' : 'Tiếp'}</span>
              <ArrowRight size={13} strokeWidth={2.4} />
            </motion.button>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 2. SÂN KHẤU CHÍNH: 3 CỘT (CARD HÁN TỰ • CANVAS NÉT VẼ • THÔNG TIN & BỘ THỦ) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          {/* CỘT 1: THẺ CHỮ HÁN LỚN (4 CỘT) */}
          <div className="lg:col-span-4 rounded-[28px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-4 text-center relative overflow-hidden">
            <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${theme.gradient}`} />
            
            {/* Header Thẻ */}
            <div className="flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${theme.bgLight}`}>
                Kanji #{currentNumber}
              </span>
              {kanjiId !== 'other' && (
                <button
                  onClick={() => playAudio(kanjiData.char)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-xs cursor-pointer ${
                    isPlayingAudio ? 'bg-rose-500 text-white animate-pulse' : 'bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-300'
                  }`}
                  title="Nghe phát âm Tokyo"
                >
                  <Volume2 size={16} strokeWidth={2.2} />
                </button>
              )}
            </div>

            {/* Chữ Hán To Chuẩn Nét Cọ Thư Pháp */}
            <div className="py-6 bg-slate-50/80 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-700/60">
              <h2 className="font-jp text-8xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
                {kanjiData.char}
              </h2>
              <div className="mt-3">
                <p className="text-2xl font-black uppercase text-rose-600 dark:text-rose-400 tracking-tight">
                  {kanjiData.hanViet}
                </p>
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                  {kanjiData.meaning}
                </p>
              </div>
            </div>

            {/* 3 Thông số nhanh */}
            <div className="grid grid-cols-3 gap-2">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700">
                <p className="text-base font-black text-slate-900 dark:text-white">{kanjiData.strokes || 0}</p>
                <p className="text-[10px] font-bold uppercase text-slate-400">Nét vẽ</p>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700">
                <p className="text-base font-black text-slate-900 dark:text-white">{kanjiData.vocab?.length || 0}</p>
                <p className="text-[10px] font-bold uppercase text-slate-400">Từ ghép</p>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700">
                <p className="text-base font-black text-rose-600 dark:text-rose-400">{courseId?.toUpperCase()}</p>
                <p className="text-[10px] font-bold uppercase text-slate-400">Cấp độ</p>
              </div>
            </div>

          </div>

          {/* CỘT 2: CANVAS VẼ NÉT THỨ TỰ (4 CỘT) */}
          <div className="lg:col-span-4 rounded-[28px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen size={16} className={theme.color} />
                Thứ Tự Nét Vẽ (Stroke Order)
              </h3>
              <span className="text-xs font-bold text-slate-400">{kanjiData.strokes} nét chuẩn</span>
            </div>

            {kanjiId !== 'other' ? (
              <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 p-2">
                <KanjiStrokeCanvas character={kanjiData.char} totalStrokes={kanjiData.strokes} theme={theme} />
              </div>
            ) : (
              <div className="p-12 text-center text-slate-400 text-xs font-bold">
                Mục từ vựng mở rộng không có canvas vẽ nét.
              </div>
            )}
          </div>

          {/* CỘT 3: ÂM ON/KUN, BỘ THỦ & MẸO NHỚ (4 CỘT) */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Âm On'yomi & Kun'yomi */}
            <div className="rounded-[28px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2">
                <Info size={16} className={theme.color} />
                <h4 className="text-xs font-black uppercase text-slate-900 dark:text-white">Cách Đọc On & Kun</h4>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">On'yomi (Katakana)</p>
                  <p className="font-bold text-slate-800 dark:text-slate-100 mt-1">
                    {kanjiData.onyomi?.length ? kanjiData.onyomi.join(', ') : '—'}
                  </p>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Kun'yomi (Hiragana)</p>
                  <p className="font-bold text-slate-800 dark:text-slate-100 mt-1">
                    {kanjiData.kunyomi?.length ? kanjiData.kunyomi.join(', ') : '—'}
                  </p>
                </div>
              </div>
            </div>

            {/* Sơ đồ Phân Rã Bộ Thủ (Radical Tree) */}
            {kanjiData.radicalTree && kanjiId !== 'other' && (
              <div className="rounded-[28px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm space-y-3">
                <div className="flex items-center gap-2">
                  <Award size={16} className="text-blue-500" />
                  <h4 className="text-xs font-black uppercase text-slate-900 dark:text-white">Phân Tích Cấu Trúc Bộ Thủ</h4>
                </div>
                <div className="overflow-x-auto py-2 flex justify-center">
                  <RadicalTree node={kanjiData.radicalTree} theme={theme} />
                </div>
              </div>
            )}

            {/* Mẹo Nhớ Nhanh (Mnemonic Story) */}
            <div className="rounded-[28px] bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 p-5 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300">
                <Lightbulb size={16} className="text-amber-500" />
                <h4 className="text-xs font-black uppercase">Mẹo Gợi Ý Cách Nhớ</h4>
              </div>
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 leading-relaxed">
                {kanjiData.mnemonic || 'Học chữ Hán qua hình tượng và câu chuyện thực tế.'}
              </p>
            </div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* 3. DANH SÁCH TỪ VỰNG CHỨA KANJI NÀY (APPLICATION VOCABULARY) */}
        {/* ========================================================================= */}
        <div className="p-6 rounded-[28px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen size={18} className={theme.color} />
                Từ Vựng Ghép Chứa Chữ 「{kanjiData.char}」 ({kanjiData.vocab?.length || 0} từ)
              </h3>
              {isSelectMode && selectedVocab.length > 0 && (
                <p className="text-xs font-bold text-blue-600 dark:text-blue-400 mt-0.5">
                  Đã chọn {selectedVocab.length} từ để luyện gõ
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => {
                  setIsSelectMode(!isSelectMode);
                  if (isSelectMode) setSelectedVocab([]);
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-black transition-colors cursor-pointer ${
                  isSelectMode 
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent' 
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200'
                }`}
              >
                {isSelectMode ? <><X size={13} /> Hủy chọn</> : <><List size={13} /> Chọn từ</>}
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
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 cursor-pointer"
                >
                  {selectedVocab.length === kanjiData.vocab.length ? 'Bỏ chọn' : 'Chọn tất cả'}
                </button>
              )}

              <button
                onClick={() => setIsTypingMode(true)}
                disabled={isSelectMode && selectedVocab.length === 0}
                className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-black text-white shadow-xs transition-colors cursor-pointer ${
                  isSelectMode && selectedVocab.length === 0 
                    ? 'bg-slate-300 dark:bg-slate-700 cursor-not-allowed opacity-60' 
                    : `bg-gradient-to-r ${theme.btn}`
                }`}
              >
                <Keyboard size={14} />
                <span>{isSelectMode && selectedVocab.length > 0 ? `Luyện gõ (${selectedVocab.length})` : 'Luyện gõ tất cả'}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
            {kanjiData.vocab.map((v, i) => {
              const isSelected = selectedVocab.includes(i);

              return (
                <div
                  key={`${v.kanji}-${i}`}
                  onClick={() => {
                    if (isSelectMode) {
                      setSelectedVocab(prev => prev.includes(i) ? prev.filter(idx => idx !== i) : [...prev, i]);
                    } else {
                      playAudio(v.kanji);
                    }
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer group flex flex-col justify-between ${
                    isSelected 
                      ? theme.selected 
                      : 'bg-slate-50/70 dark:bg-slate-800/50 border-slate-200/70 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-jp text-xl font-black text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                        {v.kanji}
                      </p>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                        {v.hiragana} • {toRomaji(v.hiragana)}
                      </p>
                    </div>

                    {isSelectMode ? (
                      <div className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white dark:bg-slate-800'
                      }`}>
                        {isSelected && <Check size={12} strokeWidth={3} />}
                      </div>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          playAudio(v.kanji);
                        }}
                        className="w-7 h-7 rounded-full bg-white dark:bg-slate-700 text-slate-400 hover:text-blue-600 flex items-center justify-center shadow-xs cursor-pointer shrink-0"
                      >
                        <Volume2 size={13} />
                      </button>
                    )}
                  </div>

                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-2.5 pt-2 border-t border-slate-200/50 dark:border-slate-700/50">
                    {v.meaning}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>

      {/* Modal Luyện Gõ Từ Vựng Của Kanji Này */}
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
