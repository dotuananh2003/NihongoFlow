import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface KanaItem {
  jp: string;
  r: string;
}

interface KanaGridProps {
  title: string;
  items: KanaItem[];
  columns?: number;
  colorClass?: string;
  system?: 'hiragana' | 'katakana';
}

export const KanaGrid = ({ 
  title, 
  items, 
  columns = 5, 
  colorClass = 'text-rose-500',
  system = 'hiragana'
}: KanaGridProps) => {
  const [activeKana, setActiveKana] = useState<string | null>(null);

  // Check if system is hiragana based on colorClass or system prop
  const isHiragana = system === 'hiragana' || colorClass.includes('rose') || colorClass.includes('pink');

  const playAudio = (e: React.MouseEvent, charJp: string) => {
    e.stopPropagation();
    if (!charJp || charJp === '') return;

    setActiveKana(charJp);

    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // Stop any previous speech
        const utterance = new SpeechSynthesisUtterance(charJp);
        utterance.lang = 'ja-JP';
        utterance.rate = 0.85; // Slightly slower for clear learning pronunciation
        utterance.onend = () => setActiveKana(null);
        utterance.onerror = () => setActiveKana(null);
        window.speechSynthesis.speak(utterance);
      } else {
        setTimeout(() => setActiveKana(null), 600);
      }
    } catch (err) {
      console.log(err);
      setTimeout(() => setActiveKana(null), 600);
    }
  };

  const validCount = items.filter(c => c && c.jp !== '').length;

  const columnHeaders5 = isHiragana 
    ? [{ v: 'あ', r: 'Cột -a' }, { v: 'い', r: 'Cột -i' }, { v: 'う', r: 'Cột -u' }, { v: 'え', r: 'Cột -e' }, { v: 'お', r: 'Cột -o' }]
    : [{ v: 'ア', r: 'Cột -a' }, { v: 'イ', r: 'Cột -i' }, { v: 'ウ', r: 'Cột -u' }, { v: 'エ', r: 'Cột -e' }, { v: 'オ', r: 'Cột -o' }];

  const columnHeaders3 = isHiragana
    ? [{ v: 'ゃ', r: 'Cột -ya' }, { v: 'ゅ', r: 'Cột -yu' }, { v: 'ょ', r: 'Cột -yo' }]
    : [{ v: 'ャ', r: 'Cột -ya' }, { v: 'ュ', r: 'Cột -yu' }, { v: 'ョ', r: 'Cột -yo' }];

  return (
    <div className="mb-10">
      {/* Section Header */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 pb-3 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <span className={`grid h-7 w-7 place-items-center rounded-lg text-xs font-black shadow-sm ${
            isHiragana 
              ? 'bg-rose-100 text-rose-600 dark:bg-rose-950/60 dark:text-rose-300' 
              : 'bg-blue-100 text-blue-600 dark:bg-blue-950/60 dark:text-blue-300'
          }`}>
            <Sparkles size={14} />
          </span>
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              {title}
            </h3>
            <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500">
              Tổng cộng {validCount} ký tự
            </span>
          </div>
        </div>

        {/* Audio helper pill */}
        <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white/90 px-3 py-1 text-[11px] font-bold text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-900/90 dark:text-slate-400">
          <Volume2 size={13} className={isHiragana ? 'text-rose-500' : 'text-blue-500'} />
          <span>Bấm vào ô để nghe phát âm</span>
        </div>
      </div>

      {/* Optional Column Headers (Only for 5 or 3 columns) */}
      {(columns === 5 || columns === 3) && (
        <div 
          className="mb-2.5 hidden sm:grid gap-3" 
          style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
        >
          {(columns === 5 ? columnHeaders5 : columnHeaders3).map((col, i) => (
            <div 
              key={i} 
              className="flex items-center justify-center gap-1.5 rounded-xl border border-dashed border-slate-200 bg-slate-50/50 py-1.5 text-center dark:border-slate-800 dark:bg-slate-900/50"
            >
              <span className={`font-jp text-xs font-black ${isHiragana ? 'text-rose-500 dark:text-rose-400' : 'text-blue-600 dark:text-blue-400'}`}>
                {col.v}
              </span>
              <span className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500">
                {col.r}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Main Grid of Kana Tiles */}
      <div 
        className="grid gap-2.5 sm:gap-3.5" 
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {items.map((char, idx) => {
          const isValid = char && char.jp && char.jp !== '';
          const isPlaying = activeKana === char.jp;

          if (!isValid) {
            return (
              <div 
                key={`empty-${idx}`} 
                className="flex min-h-[90px] sm:min-h-[105px] items-center justify-center rounded-2xl border border-dashed border-slate-200/60 bg-slate-50/30 dark:border-slate-800/60 dark:bg-slate-900/20"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-slate-200 dark:bg-slate-800" />
              </div>
            );
          }

          return (
            <motion.button
              key={`${char.jp}-${idx}`}
              type="button"
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              onClick={(e) => playAudio(e, char.jp)}
              className={`group relative flex min-h-[95px] sm:min-h-[110px] cursor-pointer flex-col items-center justify-between overflow-hidden rounded-2xl border p-2.5 sm:p-3 text-center shadow-sm transition-all duration-200 ${
                isPlaying
                  ? isHiragana
                    ? 'border-rose-400 bg-rose-50/90 shadow-lg shadow-rose-500/20 ring-2 ring-rose-400/50 dark:border-rose-600 dark:bg-rose-950/60'
                    : 'border-blue-400 bg-blue-50/90 shadow-lg shadow-blue-500/20 ring-2 ring-blue-400/50 dark:border-blue-600 dark:bg-blue-950/60'
                  : isHiragana
                    ? 'border-slate-200/90 bg-white hover:border-rose-300 hover:bg-rose-50/30 hover:shadow-md hover:shadow-rose-500/10 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-rose-700/60 dark:hover:bg-rose-950/20'
                    : 'border-slate-200/90 bg-white hover:border-blue-300 hover:bg-blue-50/30 hover:shadow-md hover:shadow-blue-500/10 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-700/60 dark:hover:bg-blue-950/20'
              }`}
            >
              {/* Top Accent line when playing */}
              {isPlaying && (
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${
                  isHiragana ? 'from-rose-500 to-pink-500' : 'from-blue-600 to-cyan-500'
                }`} />
              )}

              {/* Speaker icon in top right */}
              <div className="absolute right-2 top-2">
                <div className={`grid h-5 w-5 place-items-center rounded-full transition-all ${
                  isPlaying
                    ? isHiragana ? 'bg-rose-500 text-white animate-pulse' : 'bg-blue-600 text-white animate-pulse'
                    : 'text-slate-300 opacity-0 group-hover:opacity-100 group-hover:text-slate-500 dark:text-slate-600 dark:group-hover:text-slate-400'
                }`}>
                  <Volume2 size={11} />
                </div>
              </div>

              {/* Kana Japanese Character */}
              <div className="flex flex-1 items-center justify-center">
                <span className={`font-jp text-3xl sm:text-4xl font-black transition-colors ${
                  isPlaying
                    ? isHiragana ? 'text-rose-600 dark:text-rose-300 scale-110' : 'text-blue-600 dark:text-blue-300 scale-110'
                    : isHiragana
                      ? 'text-slate-800 group-hover:text-rose-600 dark:text-slate-100 dark:group-hover:text-rose-300'
                      : 'text-slate-800 group-hover:text-blue-600 dark:text-slate-100 dark:group-hover:text-blue-300'
                }`}>
                  {char.jp}
                </span>
              </div>

              {/* Romaji Pronunciation Badge */}
              <div className="mt-1 w-full">
                <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-black uppercase tracking-wider transition-colors ${
                  isPlaying
                    ? isHiragana ? 'bg-rose-200/80 text-rose-800 dark:bg-rose-900/60 dark:text-rose-200' : 'bg-blue-200/80 text-blue-800 dark:bg-blue-900/60 dark:text-blue-200'
                    : 'bg-slate-100 text-slate-600 ring-1 ring-slate-200/60 group-hover:bg-white group-hover:text-slate-900 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700 dark:group-hover:bg-slate-800 dark:group-hover:text-white'
                }`}>
                  {char.r}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
