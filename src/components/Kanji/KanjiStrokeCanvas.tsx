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

    // Cleanup before creating a new one (fixes React 18 StrictMode double mount)
    writerContainerRef.current.innerHTML = '';

    // Initialize HanziWriter
    const writer = HanziWriter.create(writerContainerRef.current, character, {
      width: 260,
      height: 260,
      padding: 10,
      strokeAnimationSpeed: 1,
      strokeHighlightSpeed: 0.4, // Slower hint animation
      delayBetweenStrokes: 200,
      strokeColor: '#1e293b', // slate-800
      outlineColor: '#f1f5f9', // slate-100 (grid/outline)
      drawingColor: '#10b981', // emerald-500 for correct drawing
      highlightColor: theme?.highlightHex || '#f43f5e', // dynamic for hints
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
      // Cleanup DOM
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
        // Automatically switch to guided mode after playing once so they can practice
        handleGuided();
      }
    });
  };

  const handleGuided = () => {
    if (!writerRef.current) return;
    setMode('guided');
    setIsSuccess(false);
    setCurrentStroke(0);
    
    // Setup quiz mode (guided)
    writerRef.current.quiz({
      showHintAfterMisses: 1, // Show hint immediately after 1 mistake/touch
      onCorrectStroke: (strokeData) => {
        setCurrentStroke(strokeData.strokeNum + 1);
        // Automatically show hint for the next stroke after a short delay
        if (strokeData.strokeNum + 1 < totalStrokes) {
          setTimeout(() => {
            writerRef.current?.highlightStroke(strokeData.strokeNum + 1);
          }, 300);
        }
      },
      onComplete: () => {
        setIsSuccess(true);
      }
    });

    // Manually trigger the hint for the very first stroke
    setTimeout(() => {
      writerRef.current?.highlightStroke(0);
    }, 500);
  };

  const handlePractice = () => {
    if (!writerRef.current) return;
    setMode('practice');
    setIsSuccess(false);
    setCurrentStroke(0);
    
    // Setup quiz mode (practice)
    writerRef.current.quiz({
      showHintAfterMisses: 4, // Harder mode, fewer hints
      onCorrectStroke: (strokeData) => {
        setCurrentStroke(strokeData.strokeNum + 1);
      },
      onComplete: () => {
        setIsSuccess(true);
      }
    });
  };

  const handleUndo = () => {
    // In quiz mode, HanziWriter doesn't have an explicit Undo method.
    // We usually just let the user redraw if they fail, or restart the quiz.
    if (mode === 'guided') handleGuided();
    else if (mode === 'practice') handlePractice();
  };

  return (
    <div className="flex-1 flex flex-col items-center w-full">
      <div className="flex justify-between items-center w-full mb-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">THỨ TỰ NÉT</h3>
        <div className="flex items-center gap-2">
           {mode === 'guided' && (
             <span className={`font-bold px-2 py-0.5 rounded flex items-center gap-1 text-[10px] ${theme ? theme.bgLight + ' ' + theme.text : 'text-rose-500 bg-rose-50'}`}>
               <Lightbulb size={12} /> Có chỉ dẫn
             </span>
           )}
           {mode === 'practice' && (
             <span className="text-emerald-500 font-bold bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1 text-[10px]">
               <PenTool size={12} /> Tự do
             </span>
           )}
           <span className={`text-sm font-bold ${theme ? theme.text : 'text-rose-500'}`}>
             {mode !== 'play' ? `${currentStroke}/${totalStrokes}` : `${totalStrokes}/${totalStrokes}`}
           </span>
        </div>
      </div>
      
      {/* Canvas Area */}
      <div className="relative w-full flex-1 flex flex-col items-center justify-center min-h-[160px] mb-3">

        {/* The SVG Container */}
        <div 
          ref={containerRef} 
          className="relative w-[260px] h-[260px] border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900/50 flex items-center justify-center"
        >
          {/* Grid lines for kanji canvas */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none z-0">
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-slate-400"></div>
            <div className="absolute left-0 right-0 top-1/2 h-px bg-slate-400"></div>
            <div className="absolute top-0 bottom-0 left-0 right-0">
               {/* Diagonals could be added here if desired */}
            </div>
          </div>

          {/* Dedicated container for HanziWriter SVG */}
          <div ref={writerContainerRef} className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none [&>svg]:pointer-events-auto"></div>

          {/* Success Overlay */}
          {isSuccess && (
            <div className="absolute inset-0 z-20 bg-emerald-50 rounded-2xl border-2 border-emerald-500 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mb-1 text-emerald-500 shadow-sm">
                <Check size={20} strokeWidth={3} />
              </div>
              <h4 className="text-emerald-600 font-bold text-sm mb-0.5">Đỉnh nha</h4>
              <p className="text-slate-500 text-[10px] font-medium leading-tight">Có năng khiếu đấy :))</p>
            </div>
          )}
        </div>

        {/* Extra Practice Tools */}
        {(mode === 'practice' || mode === 'guided') && (
          <div className="flex gap-4 mt-3 animate-in fade-in slide-in-from-bottom-2">
            <button onClick={handleUndo} className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-700">
              <Undo2 size={14} /> Clear / Xóa nét
            </button>
            <button onClick={mode === 'guided' ? handleGuided : handlePractice} className={`flex items-center gap-1 text-xs font-bold ${theme ? theme.text + ' ' + theme.textHoverBright : 'text-rose-500 hover:text-rose-600'}`}>
              <Eraser size={14} /> Chơi lại
            </button>
          </div>
        )}
      </div>

      {/* Main Buttons */}
      <div className="flex justify-between gap-2 w-full">
         <button 
           onClick={handlePlay}
           className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg border-2 font-bold text-xs transition-colors shadow-sm ${theme ? theme.borderLight + ' ' + theme.text + ' ' + theme.hoverBgLightSoft : 'border-rose-100 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10'}`}
         >
           <Play size={14} fill="currentColor" /> Phát
         </button>
         
         <button 
           onClick={handleGuided}
           className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg border-2 font-bold text-xs transition-colors shadow-sm ${
             mode === 'guided' 
               ? (theme ? theme.bgLight + ' ' + theme.borderText : 'bg-rose-50 border-rose-200 text-rose-600') 
               : 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50'
           }`}
         >
           <Lightbulb size={14} /> Có chỉ dẫn
         </button>
         
         <button 
           onClick={handlePractice}
           className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg border-2 font-bold text-xs transition-colors shadow-sm ${
             mode === 'practice'
               ? 'bg-emerald-50 border-emerald-200 text-emerald-600'
               : 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50'
           }`}
         >
           <PenTool size={14} /> Tự do
         </button>
      </div>

    </div>
  );
};
