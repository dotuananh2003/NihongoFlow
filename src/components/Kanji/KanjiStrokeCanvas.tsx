import { useEffect, useRef, useState } from 'react';
import HanziWriter from 'hanzi-writer';
import { Play, PenTool, Eraser, Undo2, Check, Lightbulb } from 'lucide-react';

interface KanjiStrokeCanvasProps {
  character: string;
  totalStrokes: number;
  theme?: any;
}

export const KanjiStrokeCanvas = ({ character, totalStrokes, theme }: KanjiStrokeCanvasProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const writerContainerRef = useRef<HTMLDivElement>(null);
  const writerRef = useRef<HanziWriter | null>(null);

  const [currentStroke, setCurrentStroke] = useState(0);
  const [mode, setMode] = useState<'play' | 'guided' | 'practice'>('play');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!writerContainerRef.current) return;

    writerContainerRef.current.innerHTML = '';

    const writer = HanziWriter.create(writerContainerRef.current, character, {
      width: 218,
      height: 218,
      padding: 8,
      strokeAnimationSpeed: 1,
      strokeHighlightSpeed: 0.4,
      delayBetweenStrokes: 200,
      strokeColor: '#1e293b',
      outlineColor: '#f1f5f9',
      drawingColor: '#10b981',
      highlightColor: theme?.highlightHex || '#f43f5e',
      showOutline: true,
      showCharacter: true,
      delayBetweenLoops: 1000,
      showHintAfterMisses: 1,
      charDataLoader: (char, onComplete) => {
        fetch(`https://cdn.jsdelivr.net/npm/@jamsch/hanzi-writer-data-jp@0.0.3/${char}.json`)
          .then(res => {
            if (!res.ok) throw new Error('Not found in JP data');
            return res.json();
          })
          .then(onComplete)
          .catch(() => {
            fetch(`https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0.1/${char}.json`)
              .then(res => res.json())
              .then(onComplete)
              .catch(console.error);
          });
      },
    });

    writerRef.current = writer;

    return () => {
      if (writerContainerRef.current) {
        writerContainerRef.current.innerHTML = '';
      }
    };
  }, [character, theme?.highlightHex]);

  const handlePlay = () => {
    if (!writerRef.current) return;
    setMode('play');
    setIsSuccess(false);
    writerRef.current.cancelQuiz();
    writerRef.current.showCharacter();
    writerRef.current.animateCharacter({
      onComplete: () => {
        handleGuided();
      },
    });
  };

  const handleGuided = () => {
    if (!writerRef.current) return;
    setMode('guided');
    setIsSuccess(false);
    setCurrentStroke(0);

    writerRef.current.quiz({
      showHintAfterMisses: 1,
      onCorrectStroke: (strokeData) => {
        setCurrentStroke(strokeData.strokeNum + 1);
        if (strokeData.strokeNum + 1 < totalStrokes) {
          setTimeout(() => {
            writerRef.current?.highlightStroke(strokeData.strokeNum + 1);
          }, 300);
        }
      },
      onComplete: () => {
        setIsSuccess(true);
      },
    });

    setTimeout(() => {
      writerRef.current?.highlightStroke(0);
    }, 500);
  };

  const handlePractice = () => {
    if (!writerRef.current) return;
    setMode('practice');
    setIsSuccess(false);
    setCurrentStroke(0);

    writerRef.current.quiz({
      showHintAfterMisses: 4,
      onCorrectStroke: (strokeData) => {
        setCurrentStroke(strokeData.strokeNum + 1);
      },
      onComplete: () => {
        setIsSuccess(true);
      },
    });
  };

  const handleUndo = () => {
    if (mode === 'guided') handleGuided();
    else if (mode === 'practice') handlePractice();
  };

  return (
    <div className="flex w-full flex-1 flex-col items-center">
      <div className="mb-2 flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`grid h-8 w-8 place-items-center rounded-xl border bg-white shadow-sm ${theme ? `${theme.borderLight} ${theme.text}` : 'border-rose-100 text-rose-500'}`}>
            <PenTool size={15} />
          </span>
          <h3 className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-500">Stroke Lab</h3>
        </div>

        <div className="flex items-center gap-2">
          {mode === 'guided' && (
            <span className={`flex items-center gap-1 rounded-lg px-2 py-0.5 text-[10px] font-black ${theme ? `${theme.bgLight} ${theme.text}` : 'bg-rose-50 text-rose-500'}`}>
              <Lightbulb size={12} /> Guided
            </span>
          )}
          {mode === 'practice' && (
            <span className="flex items-center gap-1 rounded-lg bg-emerald-50 px-2 py-0.5 text-[10px] font-black text-emerald-600">
              <PenTool size={12} /> Free
            </span>
          )}
          <span className={`rounded-lg bg-slate-50 px-2 py-1 text-xs font-black dark:bg-slate-950/45 ${theme ? theme.text : 'text-rose-500'}`}>
            {mode !== 'play' ? `${currentStroke}/${totalStrokes}` : `${totalStrokes}/${totalStrokes}`}
          </span>
        </div>
      </div>

      <div className="relative mb-2 flex min-h-[140px] w-full flex-1 flex-col items-center justify-center">
        <div
          ref={containerRef}
          className="relative flex h-[218px] w-[218px] items-center justify-center overflow-hidden rounded-[1.25rem] border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-white shadow-inner dark:border-slate-800 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
        >
          <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${theme?.gradient || 'from-rose-600 via-pink-400 to-amber-300'}`} />
          <div className="pointer-events-none absolute inset-5 z-0 flex items-center justify-center opacity-20">
            <div className="absolute bottom-0 top-0 left-1/2 w-px bg-slate-300" />
            <div className="absolute left-0 right-0 top-1/2 h-px bg-slate-300" />
            <div className="absolute inset-0 rounded-2xl border border-dashed border-slate-300" />
          </div>

          <div ref={writerContainerRef} className="relative z-10 flex h-full w-full items-center justify-center pointer-events-none [&>svg]:pointer-events-auto" />

          {isSuccess && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center rounded-[1.25rem] border border-emerald-300 bg-emerald-50/95">
              <div className="mb-1 flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-emerald-500 shadow-sm">
                <Check size={20} strokeWidth={3} />
              </div>
              <h4 className="text-sm font-black text-emerald-600">Hoàn thành</h4>
              <p className="text-[10px] font-semibold text-slate-500">Nét viết đã khớp</p>
            </div>
          )}
        </div>

        {(mode === 'practice' || mode === 'guided') && (
          <div className="mt-2 flex gap-4">
            <button onClick={handleUndo} className="flex items-center gap-1 text-xs font-black text-slate-500 transition-colors hover:text-slate-700">
              <Undo2 size={14} /> Clear
            </button>
            <button onClick={mode === 'guided' ? handleGuided : handlePractice} className={`flex items-center gap-1 text-xs font-black ${theme ? `${theme.text} ${theme.textHoverBright}` : 'text-rose-500 hover:text-rose-600'}`}>
              <Eraser size={14} /> Replay
            </button>
          </div>
        )}
      </div>

      <div className="grid w-full grid-cols-3 gap-2 rounded-2xl bg-slate-50/80 p-1.5 ring-1 ring-slate-100 dark:bg-slate-950/35 dark:ring-slate-800">
        <button
          onClick={handlePlay}
          className={`flex items-center justify-center gap-1 rounded-xl py-1.5 text-xs font-black transition-colors ${
            mode === 'play' ? 'bg-white text-slate-800 shadow-sm dark:bg-slate-900 dark:text-slate-100' : theme ? `${theme.text} ${theme.hoverBgLightSoft}` : 'text-rose-500 hover:bg-rose-50'
          }`}
        >
          <Play size={14} fill="currentColor" /> Play
        </button>

        <button
          onClick={handleGuided}
          className={`flex items-center justify-center gap-1 rounded-xl py-1.5 text-xs font-black transition-colors ${
            mode === 'guided'
              ? theme ? `${theme.bgLight} ${theme.borderText} shadow-sm` : 'bg-rose-50 text-rose-600 shadow-sm'
              : 'text-slate-600 hover:bg-white dark:text-slate-300 dark:hover:bg-slate-900'
          }`}
        >
          <Lightbulb size={14} /> Guide
        </button>

        <button
          onClick={handlePractice}
          className={`flex items-center justify-center gap-1 rounded-xl py-1.5 text-xs font-black transition-colors ${
            mode === 'practice'
              ? 'bg-emerald-50 text-emerald-600 shadow-sm'
              : 'text-slate-600 hover:bg-white dark:text-slate-300 dark:hover:bg-slate-900'
          }`}
        >
          <PenTool size={14} /> Draw
        </button>
      </div>
    </div>
  );
};
