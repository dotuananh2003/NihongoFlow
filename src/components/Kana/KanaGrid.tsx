import React from 'react';
import { Volume2 } from 'lucide-react';

interface KanaGridProps {
  title: string;
  items: any[];
  columns: number;
  colorClass: string;
}

export const KanaGrid = ({ title, items, columns, colorClass }: KanaGridProps) => {
  const playAudio = (e: React.MouseEvent, char: string) => {
    e.stopPropagation();
    // Placeholder for actual audio playback
    console.log(`Playing audio for ${char}`);
  };

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <h4 className={`text-xs font-bold uppercase tracking-wider ${colorClass}`}>{title}</h4>
        <div className="h-px bg-slate-100 dark:bg-slate-800 flex-1"></div>
      </div>
      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
        {items.map((char, idx) => (
          char.jp ? (
            <div 
              key={idx}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md hover:-translate-y-1 hover:scale-105 transition-transform duration-300 cursor-pointer group relative overflow-hidden`}
              onClick={(e) => playAudio(e, char.r)}
            >
              <span className={`text-2xl font-jp font-medium text-slate-800 dark:text-slate-100 transition-colors ${colorClass.replace('text-', 'group-hover:text-')}`}>{char.jp}</span>
              <span className="text-[10px] font-semibold text-slate-400 mt-0.5">{char.r}</span>
              <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Volume2 size={10} className="text-slate-300" />
              </div>
            </div>
          ) : (
            <div key={idx} className="rounded-xl border border-transparent"></div>
          )
        ))}
      </div>
    </div>
  );
};
