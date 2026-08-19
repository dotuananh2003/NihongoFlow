import { useState, useEffect, type ComponentType } from 'react';
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
} from 'lucide-react';
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

const RadicalTree = ({ node, theme }: { node?: RadicalNode; theme: Record<string, string> }) => {
  if (!node) return null;

  return (
    <div className="flex flex-col items-center">
      <div className={`relative grid h-10 w-10 place-items-center overflow-hidden rounded-2xl border bg-white shadow-sm ${theme.text} ${theme.borderLight} dark:bg-slate-950/45`}>
        <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${theme.gradient}`} />
        <span className="font-jp text-base font-black">{node.char}</span>
      </div>
      <div className="mt-1 text-center">
        <div className="text-[9px] font-black uppercase tracking-[0.12em] text-slate-700 dark:text-slate-200">{node.name}</div>
        <div className="text-[9px] font-semibold text-slate-400">{node.meaning}</div>
      </div>

      {node.children && node.children.length > 0 && (
        <div className="relative mt-2 flex justify-center gap-4 pt-4 md:gap-6">
          <div className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-slate-200 dark:bg-slate-700" />
          <div className="absolute left-5 right-5 top-4 h-px bg-slate-200 dark:bg-slate-700" />
          {node.children.map((child, idx) => (
            <div key={idx} className="relative pt-3">
              <div className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-slate-200 dark:bg-slate-700" />
              <RadicalTree node={child} theme={theme} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const KanjiSeal = ({ theme, label = 'Kanji' }: { theme: Record<string, string>; label?: string }) => (
  <div className={`relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-2xl border bg-white shadow-sm ${theme.borderLight} dark:bg-slate-950/40`}>
    <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${theme.gradient}`} />
    <span className={`text-[9px] font-black uppercase leading-none tracking-tight ${theme.text}`}>{label}</span>
  </div>
);

const PanelBadge = ({ icon: Icon, theme }: { icon: ComponentType<{ size?: number; className?: string }>; theme: Record<string, string> }) => (
  <span className={`relative grid h-8 w-8 shrink-0 place-items-center overflow-hidden rounded-xl border bg-white shadow-sm ${theme.borderLight} dark:bg-slate-950/40`}>
    <span className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${theme.gradient}`} />
    <Icon size={15} className={theme.text} />
  </span>
);

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
  } else if (lessonId === '2') {
    kanjiList = kanjiLesson2;
    vocabList = vocabLesson2;
  } else if (lessonId === '3') {
    kanjiList = kanjiLesson3;
    vocabList = vocabLesson3;
  }

  const isJPD123 = courseId?.toLowerCase() === 'jpd123';
  const theme = {
    bgLight: isJPD123 ? 'bg-blue-50 dark:bg-blue-500/10' : 'bg-rose-50 dark:bg-rose-500/10',
    bgStrong: isJPD123 ? 'bg-blue-600' : 'bg-rose-600',
    text: isJPD123 ? 'text-blue-600' : 'text-rose-600',
    borderLight: isJPD123 ? 'border-blue-100 dark:border-blue-500/20' : 'border-rose-100 dark:border-rose-500/20',
    ringLight: isJPD123 ? 'ring-blue-100 dark:ring-blue-500/20' : 'ring-rose-100 dark:ring-rose-500/20',
    hoverBgLight: isJPD123 ? 'hover:bg-blue-100' : 'hover:bg-rose-100',
    textHover: isJPD123 ? 'hover:text-blue-600' : 'hover:text-rose-600',
    textHoverBright: isJPD123 ? 'hover:text-blue-700' : 'hover:text-rose-700',
    borderText: isJPD123 ? 'border-blue-200 text-blue-600' : 'border-rose-200 text-rose-600',
    hoverBgLightSoft: isJPD123 ? 'hover:bg-blue-50 dark:hover:bg-blue-500/10' : 'hover:bg-rose-50 dark:hover:bg-rose-500/10',
    highlightHex: isJPD123 ? '#2563eb' : '#e11d48',
    gradient: isJPD123 ? 'from-blue-600 via-sky-400 to-cyan-300' : 'from-rose-600 via-pink-400 to-amber-300',
  };

  useEffect(() => {
    if (kanjiId === 'other') {
      const otherVocab = vocabList.filter(vocab => {
        return !kanjiList.some(kanji => vocab.kanji.includes(kanji.char));
      });

      setKanjiData({
        id: 'other',
        char: '...',
        hanViet: 'KHÁC',
        meaning: 'Các từ vựng khác trong bài',
        onyomi: [],
        kunyomi: [],
        strokes: 0,
        jlpt: courseId || '',
        mnemonic: 'Danh sách các từ vựng xuất hiện trong bài học này nhưng không chứa bất kỳ Kanji cốt lõi nào ở trên.',
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

  if (!kanjiData) return <div className="p-10 text-center">Loading...</div>;

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
    <div className="relative min-h-full bg-transparent pb-8 font-sans">
      <div className="mx-auto max-w-[1200px] px-4 pt-3 md:px-6">
        <div className="mb-3 flex items-center justify-between gap-3">
          <button
            onClick={() => navigate(`/kanji/${courseId}/lesson/${lessonId}`)}
            className="inline-flex h-9 items-center gap-2 rounded-2xl border border-white/75 bg-white/72 px-3 text-xs font-black text-slate-600 shadow-sm backdrop-blur-md transition-colors hover:bg-white dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300"
          >
            <ArrowLeft size={15} />
            Quay lại
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`inline-flex h-9 items-center gap-1.5 rounded-2xl border px-3 text-xs font-black shadow-sm transition-colors ${
                currentIndex === 0
                  ? 'cursor-not-allowed border-slate-100 bg-slate-100/70 text-slate-400 dark:border-slate-800 dark:bg-slate-900/60'
                  : `border-white/75 bg-white/80 text-slate-700 hover:bg-white dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-200 ${theme.textHover}`
              }`}
            >
              <ArrowLeft size={14} />
              {kanjiId === 'other' ? kanjiList[kanjiList.length - 1].char : currentIndex > 0 ? kanjiList[currentIndex - 1].char : 'Trước'}
            </button>

            <div className={`hidden rounded-2xl border bg-white/70 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] shadow-sm sm:block ${theme.text} ${theme.borderLight} dark:bg-slate-950/40`}>
              {currentNumber}/{totalNumber}
            </div>

            <button
              onClick={handleNext}
              disabled={kanjiId === 'other' || (currentIndex === kanjiList.length - 1 && !hasOtherVocab)}
              className={`inline-flex h-9 items-center gap-1.5 rounded-2xl border px-3 text-xs font-black shadow-sm transition-colors ${
                kanjiId === 'other' || (currentIndex === kanjiList.length - 1 && !hasOtherVocab)
                  ? 'cursor-not-allowed border-slate-100 bg-slate-100/70 text-slate-400 dark:border-slate-800 dark:bg-slate-900/60'
                  : `border-white/75 bg-white/80 text-slate-700 hover:bg-white dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-200 ${theme.textHover}`
              }`}
            >
              {currentIndex >= 0 && currentIndex < kanjiList.length - 1 ? kanjiList[currentIndex + 1].char : currentIndex === kanjiList.length - 1 && hasOtherVocab ? 'Khác' : 'Tiếp'}
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        <section className="kanji-detail-panel mb-3 overflow-hidden rounded-[1.5rem] border border-white/75 bg-white/74 shadow-[0_12px_34px_rgba(15,23,42,0.07)] backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/64">
          <div className={`h-1.5 bg-gradient-to-r ${theme.gradient}`} />
          <div className="grid gap-3 p-3 lg:grid-cols-[220px_280px_1fr]">
            <div className={`relative overflow-hidden rounded-[1.25rem] border p-3 ${theme.bgLight} ${theme.borderLight}`}>
              <div className="absolute -right-7 -top-9 font-jp text-[6.5rem] font-black leading-none text-white/60 dark:text-white/5">
                {kanjiData.char}
              </div>
              <div className="relative z-10">
                <div className="mb-2 flex items-center justify-between">
                  <KanjiSeal theme={theme} label="Core" />
                  {kanjiId !== 'other' && (
                    <button className={`grid h-8 w-8 place-items-center rounded-xl border bg-white/80 shadow-sm transition-colors ${theme.text} ${theme.borderLight} ${theme.hoverBgLight} dark:bg-slate-950/30`}>
                      <Volume2 size={15} />
                    </button>
                  )}
                </div>

                <div className="relative grid place-items-center overflow-hidden rounded-[1.1rem] bg-white/78 py-4 shadow-inner ring-1 ring-white/80 dark:bg-slate-950/30 dark:ring-slate-800">
                  <div className={`absolute inset-x-5 top-3 h-1 rounded-full bg-gradient-to-r ${theme.gradient} opacity-70`} />
                  <div className="font-jp text-6xl font-black leading-none text-slate-900 dark:text-slate-50">
                    {kanjiData.char}
                  </div>
                  <div className="mt-2 text-base font-black uppercase tracking-[0.16em] text-slate-900 dark:text-slate-100">
                    {kanjiData.hanViet}
                  </div>
                  <div className="mt-0.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    {kanjiData.meaning}
                  </div>
                </div>

                <div className="mt-2 grid grid-cols-3 gap-1.5">
                  <div className="rounded-xl bg-white/74 p-2 text-center shadow-sm dark:bg-slate-950/30">
                    <div className="text-base font-black text-slate-900 dark:text-white">{kanjiData.strokes}</div>
                    <div className="text-[8px] font-black uppercase tracking-wider text-slate-400">nét</div>
                  </div>
                  <div className="rounded-xl bg-white/74 p-2 text-center shadow-sm dark:bg-slate-950/30">
                    <div className="text-base font-black text-slate-900 dark:text-white">{kanjiData.vocab.length}</div>
                    <div className="text-[8px] font-black uppercase tracking-wider text-slate-400">từ</div>
                  </div>
                  <div className="rounded-xl bg-white/74 p-2 text-center shadow-sm dark:bg-slate-950/30">
                    <div className={`text-base font-black uppercase ${theme.text}`}>{courseId}</div>
                    <div className="text-[8px] font-black uppercase tracking-wider text-slate-400">jlpt</div>
                  </div>
                </div>
              </div>
            </div>

            {kanjiId !== 'other' && (
              <div className="rounded-[1.25rem] border border-slate-200 bg-white/84 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
                <KanjiStrokeCanvas character={kanjiData.char} totalStrokes={kanjiData.strokes} theme={theme} />
              </div>
            )}

            <aside className="grid min-w-0 gap-2 lg:grid-rows-[auto_auto_1fr]">
              <div className="rounded-[1.25rem] border border-slate-200 bg-white/84 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
                <div className="mb-2 flex items-center gap-2">
                  <PanelBadge icon={Info} theme={theme} />
                  <h3 className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">Thông tin</h3>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {[
                    ['Hán Việt', kanjiData.hanViet],
                    ['Ý nghĩa', kanjiData.meaning],
                    ['Âm Kun', kanjiData.kunyomi.length ? kanjiData.kunyomi.join('、') : '-'],
                    ['Âm On', kanjiData.onyomi.length ? kanjiData.onyomi.join('、') : '-'],
                  ].map(([label, value]) => (
                    <div key={label} className="relative overflow-hidden rounded-xl bg-slate-50/80 px-2.5 py-2 ring-1 ring-slate-100 dark:bg-slate-950/35 dark:ring-slate-800">
                      <div className={`absolute inset-y-2 left-0 w-1 rounded-r-full bg-gradient-to-b ${theme.gradient}`} />
                      <div className="text-[9px] font-black uppercase tracking-[0.13em] text-slate-400">{label}</div>
                      <div className={`mt-0.5 truncate text-xs font-black text-slate-800 dark:text-slate-100 ${label === 'Âm On' ? theme.text : ''}`}>
                        {value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {kanjiData.radicalTree && kanjiId !== 'other' && (
                <div className="rounded-[1.25rem] border border-slate-200 bg-white/84 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
                  <div className="mb-2 flex items-center gap-2">
                    <PanelBadge icon={BookOpen} theme={theme} />
                    <h3 className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">Bộ thủ</h3>
                  </div>
                  <div className="overflow-x-auto pb-1">
                    <RadicalTree node={kanjiData.radicalTree} theme={theme} />
                  </div>
                </div>
              )}

              <div className={`rounded-[1.25rem] border p-3 shadow-sm ${theme.bgLight} ${theme.borderLight}`}>
                <div className={`mb-1.5 flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.14em] ${theme.text}`}>
                  <PanelBadge icon={Lightbulb} theme={theme} />
                  Gợi ý cách nhớ
                </div>
                <p className="line-clamp-3 text-xs font-semibold leading-5 text-slate-700 dark:text-slate-200">
                  {kanjiData.mnemonic}
                </p>
              </div>
            </aside>
          </div>
        </section>

        <section className="kanji-detail-panel rounded-[1.5rem] border border-white/75 bg-white/72 p-3 shadow-[0_10px_30px_rgba(15,23,42,0.06)] backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/62">
          <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                Từ vựng chứa Kanji {kanjiData.char}
              </h3>
              {isSelectMode && selectedVocab.length > 0 && (
                <p className={`mt-0.5 text-[11px] font-black ${theme.text}`}>Đã chọn {selectedVocab.length} từ</p>
              )}
            </div>

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
                className={`inline-flex items-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-[11px] font-black transition-colors ${
                  isSelectMode
                    ? 'border-transparent bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                    : `bg-white/84 ${theme.text} ${theme.borderLight} hover:bg-white dark:bg-slate-900/80`
                }`}
              >
                {isSelectMode ? <><X size={13} /> Hủy chọn</> : <><List size={13} /> Chọn thủ công</>}
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
                  className={`inline-flex items-center rounded-xl border bg-white/84 px-2.5 py-1.5 text-[11px] font-black transition-colors ${theme.text} ${theme.borderLight} hover:bg-white dark:bg-slate-900/80`}
                >
                  {selectedVocab.length === kanjiData.vocab.length ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
                </button>
              )}

              <button
                onClick={() => setIsTypingMode(true)}
                disabled={isSelectMode && selectedVocab.length === 0}
                className={`inline-flex items-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-[11px] font-black shadow-sm transition-colors ${
                  isSelectMode && selectedVocab.length === 0
                    ? 'cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400 dark:border-slate-800 dark:bg-slate-900/70'
                    : `border-transparent text-white ${theme.bgStrong}`
                }`}
              >
                <Keyboard size={13} />
                {isSelectMode && selectedVocab.length > 0 ? `Gõ (${selectedVocab.length})` : 'Gõ tất cả'}
              </button>
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
            {kanjiData.vocab.map((v, i) => {
              const selected = selectedVocab.includes(i);

              return (
                <button
                  key={`${v.kanji}-${i}`}
                  onClick={() => {
                    if (!isSelectMode) return;
                    if (selected) {
                      setSelectedVocab(prev => prev.filter(idx => idx !== i));
                    } else {
                      setSelectedVocab(prev => [...prev, i]);
                    }
                  }}
                  className={`kanji-vocab-row relative min-h-[82px] overflow-hidden rounded-[1.1rem] border bg-white/86 p-2.5 text-left shadow-sm transition-colors ${
                    isSelectMode ? 'cursor-pointer' : 'cursor-default'
                  } ${
                    selected
                      ? `${theme.bgLight} ${theme.borderLight}`
                      : 'border-slate-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900/64'
                  }`}
                >
                  <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${theme.gradient}`} />
                  {isSelectMode && (
                    <span className={`absolute right-2 top-2 grid h-5 w-5 place-items-center rounded-lg border ${
                      selected ? `${theme.bgStrong} border-transparent text-white` : 'border-slate-300 bg-white/70 text-transparent dark:border-slate-700 dark:bg-slate-950/40'
                    }`}>
                      <Check size={12} strokeWidth={3} />
                    </span>
                  )}

                  <div className="mb-2 inline-flex rounded-lg bg-slate-50 px-2 py-0.5 text-[8px] font-black uppercase tracking-[0.14em] text-slate-400 ring-1 ring-slate-100 dark:bg-slate-950/40 dark:ring-slate-800">
                    Kanji
                  </div>

                  <div className="flex items-end gap-2 pr-5">
                    <span className={`font-jp text-xl font-black leading-none ${theme.text}`}>{v.kanji}</span>
                    <div className="min-w-0">
                      <div className="truncate text-[10px] font-bold text-slate-500">{v.hiragana}</div>
                      <div className="truncate text-[8px] font-black uppercase tracking-[0.12em] text-slate-400">{toRomaji(v.hiragana)}</div>
                    </div>
                  </div>
                  <div className="mt-1.5 truncate text-xs font-bold text-slate-700 dark:text-slate-300">{v.meaning}</div>
                </button>
              );
            })}
          </div>
        </section>
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
