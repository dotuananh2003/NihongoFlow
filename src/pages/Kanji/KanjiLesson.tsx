import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, LayoutGrid, List, Check, X, BookOpen, Keyboard, Sparkles } from 'lucide-react';
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

export const KanjiLesson = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [isFlashcardMode, setIsFlashcardMode] = useState(false);
  const [isVocabFlashcardMode, setIsVocabFlashcardMode] = useState(false);
  const [isVocabQuizMode, setIsVocabQuizMode] = useState(false);
  const [typingVocab, setTypingVocab] = useState<VocabExample[] | null>(null);
  const [selectedKanjiIds, setSelectedKanjiIds] = useState<string[]>([]);

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
    text: isJPD123 ? 'text-blue-500' : 'text-rose-500',
    textDark: isJPD123 ? 'text-blue-600' : 'text-rose-600',
    textHover: isJPD123 ? 'group-hover:text-blue-500' : 'group-hover:text-rose-500',
    accentBg: isJPD123 ? 'bg-blue-500' : 'bg-rose-500',
    accentSoft: isJPD123 ? 'bg-blue-50/90 dark:bg-blue-500/10' : 'bg-rose-50/90 dark:bg-rose-500/10',
    border: isJPD123 ? 'border-blue-200/80 dark:border-blue-500/25' : 'border-rose-200/80 dark:border-rose-500/25',
    ring: isJPD123 ? 'ring-blue-100 dark:ring-blue-500/20' : 'ring-rose-100 dark:ring-rose-500/20',
    shadow: isJPD123 ? 'shadow-blue-500/20' : 'shadow-rose-500/20',
    button: isJPD123 ? 'bg-blue-500 hover:bg-blue-600 shadow-blue-500/25' : 'bg-rose-500 hover:bg-rose-600 shadow-rose-500/25',
    selected: isJPD123 ? 'bg-blue-50 border-blue-400 dark:bg-blue-900/20 dark:border-blue-500' : 'bg-rose-50 border-rose-400 dark:bg-rose-900/20 dark:border-rose-500',
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
  const actionButton = 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl border border-white/80 bg-white/85 px-4 py-2.5 text-xs font-black text-slate-600 shadow-[0_8px_24px_rgba(15,23,42,0.08)] transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_12px_28px_rgba(15,23,42,0.12)] dark:border-slate-700 dark:bg-slate-900/85 dark:text-slate-300 dark:hover:bg-slate-800';
  const activeActionButton = isJPD123
    ? '!border-transparent !bg-blue-500 !text-white shadow-lg shadow-blue-500/25 hover:!bg-blue-600'
    : '!border-transparent !bg-rose-500 !text-white shadow-lg shadow-rose-500/25 hover:!bg-rose-600';
  const disabledActionButton = 'cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400 shadow-none hover:translate-y-0 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-600';

  return (
    <div className="relative min-h-full bg-transparent pb-20 font-sans">
      <div className="mx-auto max-w-[1500px] px-4 pt-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 26 }}
          className="mb-6 rounded-[2rem] border border-white/75 bg-white/70 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/55 md:p-5"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/kanji')}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/80 bg-white/90 text-slate-500 shadow-sm transition-all hover:-translate-x-0.5 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-white"
              >
                <ArrowLeft size={20} />
              </button>
              <div className="min-w-0">
                <div className={`mb-1 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] ${theme.accentSoft} ${theme.textDark} ring-1 ${theme.ring}`}>
                  <Sparkles size={12} />
                  {courseId?.toUpperCase()} · Lesson {lessonId}
                </div>
                <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-slate-50 md:text-3xl">
                  Hán tự & Từ vựng trọng tâm
                </h1>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:min-w-[360px]">
              <div className="rounded-2xl border border-white/75 bg-white/80 p-3 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
                <p className="text-xl font-black text-slate-900 dark:text-slate-50">{kanjiList.length}</p>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Kanji</p>
              </div>
              <div className="rounded-2xl border border-white/75 bg-white/80 p-3 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
                <p className="text-xl font-black text-slate-900 dark:text-slate-50">{vocabList.length}</p>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Từ vựng</p>
              </div>
              <div className="rounded-2xl border border-white/75 bg-white/80 p-3 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
                <p className="text-xl font-black text-slate-900 dark:text-slate-50">{selectedKanjiIds.length}</p>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Đã chọn</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_440px]">
          <section className="min-w-0">
            <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className={`mb-1 text-[11px] font-black uppercase tracking-[0.22em] ${theme.textDark}`}>
                  Kanji Core
                </p>
                <h2 className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xl font-black tracking-tight text-slate-900 dark:text-slate-50">
                  {kanjiList.length} chữ cần nắm trong bài
                  {isSelectMode && selectedKanjiIds.length > 0 && (
                    <span className="whitespace-nowrap rounded-full bg-slate-900 px-2.5 py-1 text-[10px] font-black text-white dark:bg-white dark:text-slate-900">
                      Đã chọn {selectedKanjiIds.length}
                    </span>
                  )}
                </h2>
              </div>

              <div className="flex flex-wrap gap-2 lg:justify-end">
                <button
                  onClick={() => {
                    if (isSelectMode) {
                      setIsSelectMode(false);
                      setSelectedKanjiIds([]);
                    } else {
                      setIsSelectMode(true);
                    }
                  }}
                  className={`${actionButton} ${isSelectMode ? activeActionButton : theme.textDark}`}
                >
                  {isSelectMode ? <><X size={15} /> Hủy chọn</> : <><List size={15} /> Chọn thủ công</>}
                </button>

                {isSelectMode && (
                  <button
                    onClick={() => {
                      if (selectedKanjiIds.length === totalSelectableItems) {
                        setSelectedKanjiIds([]);
                      } else {
                        setSelectedKanjiIds([...kanjiList.map(k => k.id), ...(otherVocab.length > 0 ? ['other'] : [])]);
                      }
                    }}
                    className={`${actionButton} ${theme.textDark}`}
                  >
                    {selectedKanjiIds.length === totalSelectableItems ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
                  </button>
                )}

                <button
                  onClick={() => setIsFlashcardMode(true)}
                  disabled={isSelectMode && selectedKanjiIds.length === 0}
                  className={`${actionButton} ${isSelectMode && selectedKanjiIds.length === 0 ? disabledActionButton : ''}`}
                >
                  <LayoutGrid size={15} /> Flashcard
                </button>
                <button
                  onClick={() => setTypingVocab(isSelectMode ? selectedVocabList : vocabList)}
                  disabled={isSelectMode && selectedKanjiIds.length === 0}
                  className={`${actionButton} ${isSelectMode && selectedKanjiIds.length === 0 ? disabledActionButton : ''}`}
                >
                  <Keyboard size={15} /> Gõ
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {kanjiList.map((kanji, idx) => {
                const isSelected = selectedKanjiIds.includes(kanji.id);

                return (
                  <motion.button
                    key={kanji.id}
                    type="button"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 340, damping: 28, delay: idx * 0.025 }}
                    onClick={() => {
                      if (isSelectMode) {
                        setSelectedKanjiIds(prev => prev.includes(kanji.id) ? prev.filter(id => id !== kanji.id) : [...prev, kanji.id]);
                      } else {
                        navigate(`/kanji/${courseId}/lesson/${lessonId}/${kanji.id}`);
                      }
                    }}
                    className={`group relative flex min-h-[104px] items-center gap-4 rounded-2xl border p-4 text-left shadow-[0_10px_28px_rgba(15,23,42,0.07)] backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(15,23,42,0.10)] ${
                      isSelectMode && isSelected
                        ? theme.selected
                        : 'border-white/80 bg-white/82 dark:border-slate-800 dark:bg-slate-950/70'
                    }`}
                  >
                    {isSelectMode && (
                      <div className={`absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${
                        isSelected
                          ? `${theme.accentBg} border-transparent text-white`
                          : 'border-slate-300 bg-white/80 dark:border-slate-600 dark:bg-slate-900/80'
                      }`}>
                        {isSelected && <Check size={12} strokeWidth={3} />}
                      </div>
                    )}

                    <div className={`w-16 shrink-0 text-center font-jp text-5xl font-medium leading-none text-slate-900 transition-colors dark:text-slate-50 ${theme.textHover}`}>
                      {kanji.char}
                    </div>

                    <div className={`min-w-0 flex-1 ${isSelectMode ? 'pr-6' : ''}`}>
                      <div className="mb-1.5 flex items-start justify-between gap-2.5">
                        <div className="min-w-0">
                          <h3 className="truncate text-base font-black uppercase tracking-[0.08em] text-slate-900 dark:text-slate-50">
                            {kanji.hanViet}
                          </h3>
                          <p className="truncate text-xs font-semibold text-slate-500 dark:text-slate-400">
                            {kanji.meaning}
                          </p>
                        </div>
                        <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-black text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                          {kanji.vocab?.length || 0} từ
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1.5 text-xs">
                        {kanji.kunyomi.length > 0 && (
                          <span className="rounded-full bg-slate-100/80 px-2 py-0.5 font-medium text-slate-600 dark:bg-slate-800/80 dark:text-slate-300">
                            {kanji.kunyomi.join('、')}
                          </span>
                        )}
                        {kanji.onyomi.length > 0 && (
                          <span className={`rounded-full px-2 py-0.5 font-black ${theme.accentSoft} ${theme.textDark}`}>
                            {kanji.onyomi.join('、')}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.button>
                );
              })}

              {otherVocab.length > 0 && (
                <motion.button
                  type="button"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 340, damping: 28, delay: kanjiList.length * 0.025 }}
                  onClick={() => {
                    if (isSelectMode) {
                      setSelectedKanjiIds(prev => prev.includes('other') ? prev.filter(id => id !== 'other') : [...prev, 'other']);
                    } else {
                      navigate(`/kanji/${courseId}/lesson/${lessonId}/other`);
                    }
                  }}
                  className={`group relative flex min-h-[104px] items-center gap-4 rounded-2xl border p-4 text-left shadow-[0_10px_28px_rgba(15,23,42,0.07)] backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(15,23,42,0.10)] ${
                    isSelectMode && selectedKanjiIds.includes('other')
                      ? theme.selected
                      : 'border-white/80 bg-white/72 dark:border-slate-800 dark:bg-slate-950/60'
                  }`}
                >
                  {isSelectMode && (
                    <div className={`absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${
                      selectedKanjiIds.includes('other')
                        ? `${theme.accentBg} border-transparent text-white`
                        : 'border-slate-300 bg-white/80 dark:border-slate-600 dark:bg-slate-900/80'
                    }`}>
                      {selectedKanjiIds.includes('other') && <Check size={12} strokeWidth={3} />}
                    </div>
                  )}
                  <div className={`w-16 shrink-0 text-center text-4xl font-black text-slate-400 transition-colors ${theme.textHover}`}>
                    …
                  </div>
                  <div className={`min-w-0 flex-1 ${isSelectMode ? 'pr-6' : ''}`}>
                    <div className="mb-1.5 flex items-start justify-between gap-2.5">
                      <div>
                        <h3 className="text-base font-black uppercase tracking-[0.08em] text-slate-900 dark:text-slate-50">
                          Từ vựng khác
                        </h3>
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                          Không chứa Kanji trọng tâm
                        </p>
                      </div>
                      <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-black text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                        {otherVocab.length} từ
                      </span>
                    </div>
                  </div>
                </motion.button>
              )}
            </div>
          </section>

          <aside className="w-full xl:sticky xl:top-24 xl:self-start">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between xl:flex-col xl:items-start">
              <div>
                <p className={`mb-1 text-[11px] font-black uppercase tracking-[0.22em] ${theme.textDark}`}>
                  Vocabulary
                </p>
                <h2 className="text-xl font-black tracking-tight text-slate-900 dark:text-slate-50">
                  {vocabList.length} từ trong bài
                </h2>
              </div>

              <div className="flex flex-wrap gap-2">
                <button onClick={() => setIsVocabQuizMode(true)} className={actionButton}>
                  <LayoutGrid size={15} /> Multiple Choice
                </button>
                <button onClick={() => setIsVocabFlashcardMode(true)} className={actionButton}>
                  <BookOpen size={15} /> Flashcard
                </button>
                <button onClick={() => setTypingVocab(vocabList)} className={actionButton}>
                  <Keyboard size={15} /> Gõ
                </button>
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/82 shadow-[0_24px_70px_rgba(15,23,42,0.12)] backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/75">
              <div className={`flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-slate-800 ${theme.accentSoft}`}>
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${theme.accentBg} text-white shadow-lg ${theme.shadow}`}>
                    <List size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-900 dark:text-slate-50">Danh sách từ vựng</p>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Kanji · Hiragana · Romaji · Nghĩa</p>
                  </div>
                </div>
              </div>

              <div className="max-h-[68vh] space-y-2 overflow-y-auto p-3">
                {vocabList.length === 0 ? (
                  <div className="p-8 text-center font-medium text-slate-500">Chưa có từ vựng nào.</div>
                ) : vocabList.map((vocab, idx) => (
                  <motion.div
                    key={`${vocab.kanji}-${vocab.hiragana}-${idx}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 28, delay: idx * 0.012 }}
                    className="rounded-2xl border border-slate-100 bg-white/78 p-4 shadow-sm transition-colors hover:bg-white dark:border-slate-800 dark:bg-slate-900/65 dark:hover:bg-slate-900"
                  >
                    <div className="mb-2 flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="truncate font-jp text-2xl font-black text-slate-900 dark:text-slate-50">{vocab.kanji}</p>
                        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{vocab.hiragana}</p>
                        <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
                          {toRomaji(vocab.hiragana)}
                        </p>
                      </div>
                      <p className="max-w-[48%] text-right text-sm font-bold text-slate-600 dark:text-slate-300">
                        {vocab.meaning}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </aside>
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
