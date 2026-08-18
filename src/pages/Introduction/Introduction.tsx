import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, ChevronRight, Volume2, Check, AlertCircle, BookOpen, RotateCcw, Clock, Keyboard, Lock } from 'lucide-react';

// ==========================================
// KANA DATA
// ==========================================
const kanaData = {
  hiragana: {
    seion: [
      { jp: 'あ', r: 'a' }, { jp: 'い', r: 'i' }, { jp: 'う', r: 'u' }, { jp: 'え', r: 'e' }, { jp: 'お', r: 'o' },
      { jp: 'か', r: 'ka' }, { jp: 'き', r: 'ki' }, { jp: 'く', r: 'ku' }, { jp: 'け', r: 'ke' }, { jp: 'こ', r: 'ko' },
      { jp: 'さ', r: 'sa' }, { jp: 'し', r: 'shi' }, { jp: 'す', r: 'su' }, { jp: 'せ', r: 'se' }, { jp: 'そ', r: 'so' },
      { jp: 'た', r: 'ta' }, { jp: 'ち', r: 'chi' }, { jp: 'つ', r: 'tsu' }, { jp: 'て', r: 'te' }, { jp: 'と', r: 'to' },
      { jp: 'な', r: 'na' }, { jp: 'に', r: 'ni' }, { jp: 'ぬ', r: 'nu' }, { jp: 'ね', r: 'ne' }, { jp: 'の', r: 'no' },
      { jp: 'は', r: 'ha' }, { jp: 'ひ', r: 'hi' }, { jp: 'ふ', r: 'fu' }, { jp: 'へ', r: 'he' }, { jp: 'ほ', r: 'ho' },
      { jp: 'ま', r: 'ma' }, { jp: 'み', r: 'mi' }, { jp: 'む', r: 'mu' }, { jp: 'め', r: 'me' }, { jp: 'も', r: 'mo' },
      { jp: 'や', r: 'ya' }, { jp: '', r: '' }, { jp: 'ゆ', r: 'yu' }, { jp: '', r: '' }, { jp: 'よ', r: 'yo' },
      { jp: 'ら', r: 'ra' }, { jp: 'り', r: 'ri' }, { jp: 'る', r: 'ru' }, { jp: 'れ', r: 're' }, { jp: 'ろ', r: 'ro' },
      { jp: 'わ', r: 'wa' }, { jp: '', r: '' }, { jp: '', r: '' }, { jp: '', r: '' }, { jp: 'を', r: 'wo' },
      { jp: 'ん', r: 'n' }, { jp: '', r: '' }, { jp: '', r: '' }, { jp: '', r: '' }, { jp: '', r: '' }
    ],
    dakuten: [
      { jp: 'が', r: 'ga' }, { jp: 'ぎ', r: 'gi' }, { jp: 'ぐ', r: 'gu' }, { jp: 'げ', r: 'ge' }, { jp: 'ご', r: 'go' },
      { jp: 'ざ', r: 'za' }, { jp: 'じ', r: 'ji' }, { jp: 'ず', r: 'zu' }, { jp: 'ぜ', r: 'ze' }, { jp: 'ぞ', r: 'zo' },
      { jp: 'だ', r: 'da' }, { jp: 'ぢ', r: 'ji' }, { jp: 'づ', r: 'zu' }, { jp: 'で', r: 'de' }, { jp: 'ど', r: 'do' },
      { jp: 'ば', r: 'ba' }, { jp: 'び', r: 'bi' }, { jp: 'ぶ', r: 'bu' }, { jp: 'べ', r: 'be' }, { jp: 'ぼ', r: 'bo' },
      { jp: 'ぱ', r: 'pa' }, { jp: 'ぴ', r: 'pi' }, { jp: 'ぷ', r: 'pu' }, { jp: 'ぺ', r: 'pe' }, { jp: 'ぽ', r: 'po' }
    ],
    yoon: [
      { jp: 'きゃ', r: 'kya' }, { jp: 'きゅ', r: 'kyu' }, { jp: 'きょ', r: 'kyo' },
      { jp: 'しゃ', r: 'sha' }, { jp: 'しゅ', r: 'shu' }, { jp: 'しょ', r: 'sho' },
      { jp: 'ちゃ', r: 'cha' }, { jp: 'ちゅ', r: 'chu' }, { jp: 'ちょ', r: 'cho' },
      { jp: 'にゃ', r: 'nya' }, { jp: 'にゅ', r: 'nyu' }, { jp: 'にょ', r: 'nyo' },
      { jp: 'ひゃ', r: 'hya' }, { jp: 'ひゅ', r: 'hyu' }, { jp: 'ひょ', r: 'hyo' },
      { jp: 'みゃ', r: 'mya' }, { jp: 'みゅ', r: 'myu' }, { jp: 'みょ', r: 'myo' },
      { jp: 'りゃ', r: 'rya' }, { jp: 'りゅ', r: 'ryu' }, { jp: 'りょ', r: 'ryo' },
      { jp: 'ぎゃ', r: 'gya' }, { jp: 'ぎゅ', r: 'gyu' }, { jp: 'ぎょ', r: 'gyo' },
      { jp: 'じゃ', r: 'ja' }, { jp: 'じゅ', r: 'ju' }, { jp: 'じょ', r: 'jo' },
      { jp: 'びゃ', r: 'bya' }, { jp: 'びゅ', r: 'byu' }, { jp: 'びょ', r: 'byo' },
      { jp: 'ぴゃ', r: 'pya' }, { jp: 'ぴゅ', r: 'pyu' }, { jp: 'ぴょ', r: 'pyo' }
    ],
    extended: [
      { jp: 'いぇ', r: 'ye' }, { jp: 'うぃ', r: 'wi' }, { jp: 'うぇ', r: 'we' }, { jp: 'うぉ', r: 'wo' },
      { jp: 'しぇ', r: 'she' }, { jp: 'じぇ', r: 'je' }, { jp: 'ちぇ', r: 'che' },
      { jp: 'てぃ', r: 'ti' }, { jp: 'でぃ', r: 'di' },
      { jp: 'とぅ', r: 'tu' }, { jp: 'どぅ', r: 'du' },
      { jp: 'ふぁ', r: 'fa' }, { jp: 'ふぃ', r: 'fi' }, { jp: 'ふぇ', r: 'fe' }, { jp: 'ふぉ', r: 'fo' },
      { jp: 'つぁ', r: 'tsa' }, { jp: 'つぃ', r: 'tsi' }, { jp: 'つぇ', r: 'tse' }, { jp: 'つぉ', r: 'tso' },
      { jp: 'ヴぁ', r: 'va' }, { jp: 'ヴぃ', r: 'vi' }, { jp: 'ヴぇ', r: 've' }, { jp: 'ヴぉ', r: 'vo' }
    ]
  },
  katakana: {
    seion: [
      { jp: 'ア', r: 'a' }, { jp: 'イ', r: 'i' }, { jp: 'ウ', r: 'u' }, { jp: 'エ', r: 'e' }, { jp: 'オ', r: 'o' },
      { jp: 'カ', r: 'ka' }, { jp: 'キ', r: 'ki' }, { jp: 'ク', r: 'ku' }, { jp: 'ケ', r: 'ke' }, { jp: 'コ', r: 'ko' },
      { jp: 'サ', r: 'sa' }, { jp: 'シ', r: 'shi' }, { jp: 'ス', r: 'su' }, { jp: 'セ', r: 'se' }, { jp: 'ソ', r: 'so' },
      { jp: 'タ', r: 'ta' }, { jp: 'チ', r: 'chi' }, { jp: 'ツ', r: 'tsu' }, { jp: 'テ', r: 'te' }, { jp: 'ト', r: 'to' },
      { jp: 'ナ', r: 'na' }, { jp: 'ニ', r: 'ni' }, { jp: 'ヌ', r: 'nu' }, { jp: 'ネ', r: 'ne' }, { jp: 'ノ', r: 'no' },
      { jp: 'ハ', r: 'ha' }, { jp: 'ヒ', r: 'hi' }, { jp: 'フ', r: 'fu' }, { jp: 'ヘ', r: 'he' }, { jp: 'ホ', r: 'ho' },
      { jp: 'マ', r: 'ma' }, { jp: 'ミ', r: 'mi' }, { jp: 'ム', r: 'mu' }, { jp: 'メ', r: 'me' }, { jp: 'モ', r: 'mo' },
      { jp: 'ヤ', r: 'ya' }, { jp: '', r: '' }, { jp: 'ユ', r: 'yu' }, { jp: '', r: '' }, { jp: 'ヨ', r: 'yo' },
      { jp: 'ラ', r: 'ra' }, { jp: 'リ', r: 'ri' }, { jp: 'ル', r: 'ru' }, { jp: 'レ', r: 're' }, { jp: 'ロ', r: 'ro' },
      { jp: 'ワ', r: 'wa' }, { jp: '', r: '' }, { jp: '', r: '' }, { jp: '', r: '' }, { jp: 'ヲ', r: 'wo' },
      { jp: 'ン', r: 'n' }, { jp: '', r: '' }, { jp: '', r: '' }, { jp: '', r: '' }, { jp: '', r: '' }
    ],
    dakuten: [
      { jp: 'ガ', r: 'ga' }, { jp: 'ギ', r: 'gi' }, { jp: 'グ', r: 'gu' }, { jp: 'ゲ', r: 'ge' }, { jp: 'ゴ', r: 'go' },
      { jp: 'ザ', r: 'za' }, { jp: 'ジ', r: 'ji' }, { jp: 'ズ', r: 'zu' }, { jp: 'ゼ', r: 'ze' }, { jp: 'ゾ', r: 'zo' },
      { jp: 'ダ', r: 'da' }, { jp: 'ヂ', r: 'ji' }, { jp: 'ヅ', r: 'zu' }, { jp: 'デ', r: 'de' }, { jp: 'ド', r: 'do' },
      { jp: 'バ', r: 'ba' }, { jp: 'ビ', r: 'bi' }, { jp: 'ブ', r: 'bu' }, { jp: 'ベ', r: 'be' }, { jp: 'ボ', r: 'bo' },
      { jp: 'パ', r: 'pa' }, { jp: 'ピ', r: 'pi' }, { jp: 'プ', r: 'pu' }, { jp: 'ペ', r: 'pe' }, { jp: 'ポ', r: 'po' },
      { jp: 'ヴ', r: 'vu' }, { jp: '', r: '' }, { jp: '', r: '' }, { jp: '', r: '' }, { jp: '', r: '' }
    ],
    yoon: [
      { jp: 'キャ', r: 'kya' }, { jp: 'キュ', r: 'kyu' }, { jp: 'キョ', r: 'kyo' },
      { jp: 'シャ', r: 'sha' }, { jp: 'シュ', r: 'shu' }, { jp: 'ショ', r: 'sho' },
      { jp: 'チャ', r: 'cha' }, { jp: 'チュ', r: 'chu' }, { jp: 'チョ', r: 'cho' },
      { jp: 'ニャ', r: 'nya' }, { jp: 'ニュ', r: 'nyu' }, { jp: 'ニョ', r: 'nyo' },
      { jp: 'ヒャ', r: 'hya' }, { jp: 'ヒュ', r: 'hyu' }, { jp: 'ヒョ', r: 'hyo' },
      { jp: 'ミャ', r: 'mya' }, { jp: 'ミュ', r: 'myu' }, { jp: 'ミョ', r: 'myo' },
      { jp: 'リャ', r: 'rya' }, { jp: 'リュ', r: 'ryu' }, { jp: 'リョ', r: 'ryo' },
      { jp: 'ギャ', r: 'gya' }, { jp: 'ギュ', r: 'gyu' }, { jp: 'ギョ', r: 'gyo' },
      { jp: 'ジャ', r: 'ja' }, { jp: 'ジュ', r: 'ju' }, { jp: 'ジョ', r: 'jo' },
      { jp: 'ビャ', r: 'bya' }, { jp: 'ビュ', r: 'byu' }, { jp: 'ビョ', r: 'byo' },
      { jp: 'ピャ', r: 'pya' }, { jp: 'ピュ', r: 'pyu' }, { jp: 'ピョ', r: 'pyo' }
    ],
    extended: [
      { jp: 'ヴァ', r: 'va' }, { jp: 'ヴィ', r: 'vi' }, { jp: 'ヴェ', r: 've' }, { jp: 'ヴォ', r: 'vo' },
      { jp: 'ファ', r: 'fa' }, { jp: 'フィ', r: 'fi' }, { jp: 'フェ', r: 'fe' }, { jp: 'フォ', r: 'fo' },
      { jp: 'シェ', r: 'she' }, { jp: 'ジェ', r: 'je' }, { jp: 'チェ', r: 'che' },
      { jp: 'ティ', r: 'ti' }, { jp: 'ディ', r: 'di' },
      { jp: 'トゥ', r: 'tu' }, { jp: 'ドゥ', r: 'du' },
      { jp: 'ツァ', r: 'tsa' }, { jp: 'ツィ', r: 'tsi' }, { jp: 'ツェ', r: 'tse' }, { jp: 'ツォ', r: 'tso' },
      { jp: 'ウィ', r: 'wi' }, { jp: 'ウェ', r: 'we' }, { jp: 'ウォ', r: 'wo' }
    ]
  }
};

const groupMetadata = [
  { id: 'seion', name: 'Nhóm 1: Chữ cơ bản', count: 46 },
  { id: 'yoon', name: 'Nhóm 2: Chữ ghép (Yōon)', count: 33 },
  { id: 'dakuten', name: 'Nhóm 3: Chữ đục & bán đục', count: 25 },
  { id: 'extended', name: 'Nhóm 4: Chữ ghép mở rộng', count: 24 } // roughly
];

// ==========================================
// KANA GRID COMPONENT (Learning View)
// ==========================================
const KanaGrid = ({ title, items, columns, colorClass }: { title: string, items: any[], columns: number, colorClass: string }) => {
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
            >
              <span className={`text-2xl font-jp font-medium text-slate-800 dark:text-slate-100 transition-colors ${colorClass.replace('text-', 'group-hover:text-')}`}>{char.jp}</span>
              <span className="text-sm font-bold text-slate-500 mt-1">{char.r}</span>
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

// ==========================================
// CONFETTI COMPONENT
// ==========================================
const Confetti = () => {
  const pieces = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: -20 - Math.random() * 20,
    size: Math.random() * 8 + 4,
    color: ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'][Math.floor(Math.random() * 5)],
    delay: Math.random() * 0.5,
    duration: 1 + Math.random() * 2
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map(p => (
        <motion.div
          key={p.id}
          initial={{ opacity: 1, top: `${p.y}%`, left: `${p.x}%`, rotate: 0 }}
          animate={{ top: '120%', rotate: 360, left: `${p.x + (Math.random() * 20 - 10)}%` }}
          transition={{ duration: p.duration, delay: p.delay, ease: "easeIn" }}
          className="absolute rounded-sm"
          style={{ width: p.size, height: p.size, backgroundColor: p.color }}
        />
      ))}
    </div>
  );
};

// ==========================================
// QUIZ SYSTEM COMPONENT
// ==========================================
const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
};
const KanaQuiz = ({ 
  system, groups, onBack, onComplete 
}: { 
  system: 'hiragana' | 'katakana', groups: string[], onBack: () => void, 
  onComplete: (stats: { correct: number, wrong: number, total: number, mistakes: any[], timeElapsed: number }) => void 
}) => {
  // Extract and shuffle valid characters for quizzing
  const validChars = React.useMemo(() => {
    const chars = groups.flatMap(group => (kanaData[system] as any)[group].filter((c: any) => c.jp !== ''));
    // Fisher-Yates shuffle
    for (let i = chars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    return chars;
  }, [system, groups]);
  const total = validChars.length;
  
  const [answers, setAnswers] = useState<{[key: number]: string}>({});
  const [status, setStatus] = useState<{[key: number]: 'correct'|'incorrect'}>({});
  const inputRefs = useRef<{[key: number]: HTMLInputElement | null}>({});
  
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  
  const correctCount = Object.values(status).filter(s => s === 'correct').length;
  const incorrectCount = Object.values(status).filter(s => s === 'incorrect').length;
  const doneCount = correctCount + incorrectCount;
  const isFinished = doneCount === total;
  
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isTimerRunning && !isFinished) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, isFinished]);
  
  const handleInput = (idx: number, val: string) => {
    if (status[idx]) return; // Locked
    if (!isTimerRunning && !isFinished) setIsTimerRunning(true);
    setAnswers(prev => ({ ...prev, [idx]: val }));
  };
  
  const handleBlurOrEnter = (idx: number, val: string) => {
    if (status[idx]) return;
    if (val.trim() !== '') {
      if (val.trim().toLowerCase() === validChars[idx].r) {
        setStatus(prev => ({ ...prev, [idx]: 'correct' }));
      } else {
        setStatus(prev => ({ ...prev, [idx]: 'incorrect' }));
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number, val: string) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleBlurOrEnter(idx, val);
      
      // Tìm ô tiếp theo chưa trả lời
      let nextIdx = idx + 1;
      while (nextIdx < total && status[nextIdx]) {
        nextIdx++;
      }
      
      if (nextIdx < total && inputRefs.current[nextIdx]) {
        inputRefs.current[nextIdx]?.focus();
      }
    }
  };

  // Prevent parent scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  const colorCls = system === 'hiragana' ? 'rose' : 'blue';

  return (
    <div className="flex flex-col flex-1 min-h-0 w-full bg-[#FAF8F5] dark:bg-slate-950">
      {/* Header */}
      <div className="flex items-center justify-between px-6 md:px-8 py-5 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-20 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            Kiểm tra: {groups.length} Nhóm ({system === 'hiragana' ? 'Hiragana' : 'Katakana'})
          </h2>
          <p className="text-sm font-medium text-slate-500 mt-1 flex items-center gap-2">
            <AlertCircle size={14} className="text-orange-400" />
            Nhập romaji tương ứng. Gõ đúng thẻ sẽ xanh, gõ sai sẽ đỏ và hiển thị đáp án.
          </p>
        </div>
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-500">
          <X size={20} />
        </button>
      </div>

      {/* Grid Body */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        <div className="max-w-[1200px] mx-auto grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 md:gap-6 pb-20">
          {validChars.map((char: any, idx: number) => {
             const st = status[idx];
             const val = answers[idx] || '';
             
             let boxBg = "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 shadow-sm";
             if (st === 'correct') boxBg = "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-400 dark:border-emerald-500 shadow-md shadow-emerald-500/10";
             if (st === 'incorrect') boxBg = "bg-rose-50 dark:bg-rose-900/20 border-rose-400 dark:border-rose-500 shadow-md shadow-rose-500/10";

             return (
               <motion.div 
                 key={idx}
                 animate={
                   st === 'correct' ? { scale: [1, 1.05, 1] } : 
                   st === 'incorrect' ? { x: [-5, 5, -5, 5, 0] } : 
                   {}
                 }
                 transition={{ duration: 0.3 }}
                 className={`rounded-2xl border-2 flex flex-col p-3 relative overflow-hidden transition-colors ${boxBg}`}
               >
                 <div className="flex-1 flex items-center justify-center min-h-[60px]">
                   <span className={`text-3xl font-jp font-medium ${st === 'incorrect' ? 'text-rose-500' : 'text-slate-800 dark:text-slate-100'}`}>
                     {char.jp}
                   </span>
                 </div>
                 
                 <div className="relative mt-2">
                   <input
                     ref={(el) => { inputRefs.current[idx] = el; }}
                     type="text"
                     value={val}
                     disabled={!!st}
                     onChange={(e) => handleInput(idx, e.target.value)}
                     onKeyDown={(e) => handleKeyDown(e, idx, val)}
                     onBlur={() => handleBlurOrEnter(idx, val)}
                     className={`w-full text-center text-sm font-bold py-1.5 rounded-lg border-2 outline-none transition-all ${
                       st === 'correct' ? 'border-emerald-200 bg-white text-emerald-600' :
                       st === 'incorrect' ? 'border-rose-200 bg-white text-rose-600' :
                       'border-slate-100 bg-slate-50 focus:border-blue-400 focus:bg-white text-slate-700'
                     }`}
                     placeholder="..."
                     autoComplete="off"
                     spellCheck="false"
                   />
                   {st === 'correct' && (
                     <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-2 top-1/2 -translate-y-1/2 text-emerald-500">
                       <Check size={14} strokeWidth={4} />
                     </motion.div>
                   )}
                   {st === 'incorrect' && (
                     <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-2 top-1/2 -translate-y-1/2 text-rose-500">
                       <X size={14} strokeWidth={4} />
                     </motion.div>
                   )}
                 </div>

                 <AnimatePresence>
                   {st === 'incorrect' && (
                     <motion.div 
                       initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                       className="mt-2 text-center"
                     >
                       <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400">Đ.án: <span className="text-xs">{char.r}</span></span>
                     </motion.div>
                   )}
                 </AnimatePresence>

               </motion.div>
             );
          })}
        </div>
      </div>

      {/* Footer / Progress */}
      <div className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 md:px-8 flex items-center justify-between sticky bottom-0 z-20">
        <div className="flex-1 max-w-md">
           <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
             <span>Tiến độ: {doneCount} / {total}</span>
             <span className="text-emerald-500">Đúng: {correctCount}</span>
             <span className="text-rose-500">Sai: {incorrectCount}</span>
           </div>
           <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden flex">
             <div className="bg-emerald-500 h-full transition-all duration-300" style={{ width: `${(correctCount/total)*100}%` }}></div>
             <div className="bg-rose-500 h-full transition-all duration-300" style={{ width: `${(incorrectCount/total)*100}%` }}></div>
           </div>
        </div>
        
        <div className="flex items-center gap-4 sm:gap-6 ml-4 sm:ml-6">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Thời gian</span>
            <span className={`text-xl font-black font-mono leading-none ${isTimerRunning && !isFinished ? `text-${colorCls}-500` : 'text-slate-600 dark:text-slate-300'}`}>
              {formatTime(timeElapsed)}
            </span>
          </div>
          <button 
            disabled={!isFinished}
            onClick={() => {
              const mistakes = validChars.map((char: any, i: number) => ({
                jp: char.jp,
                user: answers[i] || '',
                correct: char.r,
                isWrong: status[i] === 'incorrect'
              })).filter((m: any) => m.isWrong);
              onComplete({ correct: correctCount, wrong: incorrectCount, total, mistakes, timeElapsed });
            }}
            className={`px-6 sm:px-8 py-3 rounded-xl font-bold text-sm shadow-sm transition-all flex items-center gap-2 ${
              isFinished 
              ? `bg-${colorCls}-500 hover:bg-${colorCls}-600 text-white hover:-translate-y-0.5 shadow-${colorCls}-500/30` 
              : 'bg-slate-100 text-slate-400 cursor-not-allowed border-2 border-transparent'
            }`}
          >
            Nộp bài <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

const KanaStarterLanding = ({ navigate }: { navigate: (path: string) => void }) => {
  const hiraganaPreview = [
    ['あ', 'a'],
    ['い', 'i'],
    ['う', 'u'],
    ['え', 'e'],
    ['お', 'o'],
  ];

  const katakanaPreview = [
    ['ア', 'a'],
    ['イ', 'i'],
    ['ウ', 'u'],
    ['エ', 'e'],
    ['オ', 'o'],
  ];

  return (
    <div className="relative z-10 mx-auto max-w-5xl px-4 pt-5">
      <section className="mb-5 overflow-hidden rounded-[1.6rem] border border-white/75 bg-white/58 p-4 shadow-[0_16px_46px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-950/58">
        <div className="grid items-center gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="min-w-0">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/86 px-3.5 py-1.5 text-[11px] font-black uppercase tracking-[0.16em] text-blue-600 shadow-sm dark:border-slate-700 dark:bg-slate-900/80 dark:text-blue-300">
              <Sparkles size={13} /> Kana Starter
            </div>
            <h2 className="flex flex-wrap items-center gap-3 text-2xl font-black tracking-tight text-slate-900 dark:text-slate-100 md:text-4xl">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-rose-500 via-blue-500 to-emerald-400 font-jp text-2xl text-white shadow-lg shadow-blue-500/20">
                あ
              </span>
              Bảng chữ cái tiếng Nhật
            </h2>
            <p className="mt-2 max-w-2xl text-sm font-semibold leading-relaxed text-slate-600 dark:text-slate-400">
              Bắt đầu với Hiragana và Katakana qua lộ trình ngắn, có bảng chữ, nhóm âm và bài gõ phản xạ.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            {[
              ['92', 'kana'],
              ['4', 'nhóm âm'],
              ['2', 'bảng chữ'],
            ].map(([value, label]) => (
                <div key={label} className="rounded-[1.15rem] border border-white/80 bg-white/72 px-3 py-4 text-center shadow-sm dark:border-slate-700/70 dark:bg-slate-900/64">
                  <div className="text-xl font-black text-slate-900 dark:text-white">{value}</div>
                  <div className="mt-1 text-[9px] font-black uppercase tracking-[0.16em] text-slate-400">{label}</div>
                </div>
            ))}
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-5 px-2 md:grid-cols-2">
        <button
          onClick={() => navigate('/introduction/hiragana')}
          className="group relative min-h-[310px] overflow-hidden rounded-[1.6rem] border border-rose-100 bg-white p-5 text-left shadow-[0_18px_42px_rgba(244,63,94,0.10)] transition-all hover:-translate-y-1 hover:border-rose-300 hover:shadow-[0_22px_52px_rgba(244,63,94,0.16)] dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-rose-500 via-pink-400 to-amber-300" />
          <div className="absolute -right-14 -top-14 h-44 w-44 rounded-full bg-rose-100/80 blur-2xl dark:bg-rose-500/10" />
          <div className="absolute -bottom-10 right-4 font-jp text-[7rem] font-black leading-none text-rose-100/55 dark:text-rose-900/20">あ</div>

          <div className="relative z-10 flex h-full flex-col">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="inline-flex rounded-full bg-rose-50 px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-rose-600 ring-1 ring-rose-100 dark:bg-rose-950/30 dark:text-rose-300 dark:ring-rose-900/40">
                  First Script
                </span>
                <h3 className="mt-4 text-3xl font-black text-slate-900 dark:text-white">Hiragana</h3>
                <p className="mt-2 text-sm font-semibold text-slate-500 dark:text-slate-400">Bảng chữ mềm dùng cho âm thuần Nhật.</p>
              </div>
              <div className="grid h-16 w-16 shrink-0 place-items-center rounded-[1.25rem] bg-rose-50 font-jp text-4xl font-black text-rose-500 shadow-inner ring-1 ring-rose-100 transition-transform group-hover:scale-105 dark:bg-rose-500/10 dark:ring-rose-900/40">
                あ
              </div>
            </div>

            <div className="mt-5 grid grid-cols-5 gap-2">
              {hiraganaPreview.map(([kana, romaji]) => (
                <div key={kana} className="rounded-xl bg-rose-50/80 py-2 text-center ring-1 ring-rose-100 dark:bg-rose-950/20 dark:ring-rose-900/30">
                  <div className="font-jp text-xl font-black text-rose-500">{kana}</div>
                  <div className="mt-0.5 text-[9px] font-black uppercase text-rose-300">{romaji}</div>
                </div>
              ))}
            </div>

            <div className="mt-auto grid grid-cols-[1fr_auto] items-center gap-3 pt-5">
              <div className="rounded-xl bg-rose-50/80 px-3.5 py-2.5 ring-1 ring-rose-100 dark:bg-rose-950/20 dark:ring-rose-900/30">
                <div className="text-[10px] font-black uppercase tracking-[0.18em] text-rose-400">46 chữ</div>
                <div className="mt-1 text-xs font-black text-slate-700 dark:text-slate-200">A I U · KA SA · YA RA</div>
              </div>
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-rose-500 text-white shadow-lg shadow-rose-500/25 transition-transform group-hover:translate-x-1">
                <ChevronRight size={21} />
              </span>
            </div>
          </div>
        </button>

        <button
          onClick={() => navigate('/introduction/katakana')}
          className="group relative min-h-[310px] overflow-hidden rounded-[1.6rem] border border-blue-100 bg-white p-5 text-left shadow-[0_18px_42px_rgba(37,99,235,0.10)] transition-all hover:-translate-y-1 hover:border-blue-300 hover:shadow-[0_22px_52px_rgba(37,99,235,0.16)] dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-blue-600 via-sky-400 to-cyan-300" />
          <div className="absolute -right-14 -top-14 h-44 w-44 rounded-full bg-blue-100/80 blur-2xl dark:bg-blue-500/10" />
          <div className="absolute -bottom-10 right-4 font-jp text-[7rem] font-black leading-none text-blue-100/60 dark:text-blue-900/20">ア</div>

          <div className="relative z-10 flex h-full flex-col">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-blue-600 ring-1 ring-blue-100 dark:bg-blue-950/30 dark:text-blue-300 dark:ring-blue-900/40">
                  Second Script
                </span>
                <h3 className="mt-4 text-3xl font-black text-slate-900 dark:text-white">Katakana</h3>
                <p className="mt-2 text-sm font-semibold text-slate-500 dark:text-slate-400">Bảng chữ góc cạnh cho từ ngoại lai.</p>
              </div>
              <div className="grid h-16 w-16 shrink-0 place-items-center rounded-[1.25rem] bg-blue-50 font-jp text-4xl font-black text-blue-600 shadow-inner ring-1 ring-blue-100 transition-transform group-hover:scale-105 dark:bg-blue-500/10 dark:ring-blue-900/40">
                ア
              </div>
            </div>

            <div className="mt-5 grid grid-cols-5 gap-2">
              {katakanaPreview.map(([kana, romaji]) => (
                <div key={kana} className="rounded-xl bg-blue-50/80 py-2 text-center ring-1 ring-blue-100 dark:bg-blue-950/20 dark:ring-blue-900/30">
                  <div className="font-jp text-xl font-black text-blue-600">{kana}</div>
                  <div className="mt-0.5 text-[9px] font-black uppercase text-blue-300">{romaji}</div>
                </div>
              ))}
            </div>

            <div className="mt-auto grid grid-cols-[1fr_auto] items-center gap-3 pt-5">
              <div className="rounded-xl bg-blue-50/80 px-3.5 py-2.5 ring-1 ring-blue-100 dark:bg-blue-950/20 dark:ring-blue-900/30">
                <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-400">46 chữ</div>
                <div className="mt-1 text-xs font-black text-slate-700 dark:text-slate-200">A I U · KA SA · YA RA</div>
              </div>
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/25 transition-transform group-hover:translate-x-1">
                <ChevronRight size={21} />
              </span>
            </div>
          </div>
        </button>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 px-2 md:grid-cols-2">
        <button
          disabled
          className="relative min-h-[108px] cursor-not-allowed overflow-hidden rounded-[1.4rem] border border-amber-100/90 bg-white/76 p-4 text-left opacity-80 shadow-[0_14px_34px_rgba(15,23,42,0.07)] dark:border-slate-800 dark:bg-slate-900/78"
        >
          <div className="absolute inset-y-0 left-0 w-2 bg-gradient-to-b from-amber-300 via-orange-300 to-rose-300" />
          <div className="absolute -right-5 -bottom-10 font-jp text-8xl font-black text-amber-100 dark:text-amber-900/20">記</div>
          <div className="relative z-10 flex items-center gap-5">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-amber-50 text-amber-500 shadow-inner ring-1 ring-amber-100 dark:bg-amber-500/10 dark:ring-amber-900/40">
              <BookOpen size={27} />
            </div>
            <div className="min-w-0">
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-black uppercase tracking-[0.12em] text-slate-800 dark:text-slate-100">Học nhớ mẹo</h3>
                <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-amber-600 ring-1 ring-amber-100 dark:bg-slate-800 dark:text-amber-300 dark:ring-amber-900/40">
                  <Lock size={11} strokeWidth={2.5} />
                  Locked
                </span>
              </div>
              <p className="text-xs font-semibold leading-relaxed text-slate-500 dark:text-slate-400">Gợi nhớ mặt chữ bằng hình ảnh, nét viết và liên tưởng nhanh.</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => navigate('/introduction/typing')}
          className="group relative min-h-[108px] overflow-hidden rounded-[1.4rem] border border-emerald-100 bg-white/76 p-4 text-left shadow-[0_14px_34px_rgba(16,185,129,0.09)] transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-[0_18px_42px_rgba(16,185,129,0.14)] dark:border-slate-800 dark:bg-slate-900/78"
        >
          <div className="absolute inset-y-0 left-0 w-2 bg-gradient-to-b from-emerald-400 to-cyan-400" />
          <div className="absolute -right-4 -bottom-10 font-jp text-8xl font-black text-emerald-100 dark:text-emerald-900/20">打</div>
          <div className="relative z-10 flex items-center gap-5">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-500 shadow-inner ring-1 ring-emerald-100 transition-transform group-hover:scale-105 dark:bg-emerald-500/10 dark:ring-emerald-900/40">
              <Keyboard size={27} />
            </div>
            <div className="min-w-0">
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-black uppercase tracking-[0.12em] text-slate-900 dark:text-white">Typing</h3>
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-600 ring-1 ring-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-900/40">
                  Ready
                </span>
              </div>
              <p className="text-xs font-semibold leading-relaxed text-slate-500 dark:text-slate-400">Gõ lại kana theo âm đọc để luyện phản xạ nhận diện.</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

import { useNavigate } from 'react-router-dom';

export const Introduction = () => {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState<'hiragana' | 'katakana' | null>(null);
  
  // viewState: 
  // 'selection' = 4 groups list
  // 'learning' = fullscreen grid view
  // 'quiz' = active playing quiz
  // 'result' = score summary
  const [viewState, setViewState] = useState<'selection'|'learning'|'quiz'|'result'>('selection');
  const [activeGroups, setActiveGroups] = useState<string[]>([]);
  const [quizStats, setQuizStats] = useState<any>(null);

  // Prevent scroll when modal open
  React.useEffect(() => {
    if (activeModal) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [activeModal]);

  // Handle browser back button
  React.useEffect(() => {
    const handlePopState = () => {
      setActiveModal(null);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const closeAll = () => {
    if (window.history.state?.modalOpen) {
      window.history.back();
    } else {
      setActiveModal(null);
    }
  };

  const toggleGroup = (groupId: string) => {
    setActiveGroups(prev => 
      prev.includes(groupId) ? prev.filter(id => id !== groupId) : [...prev, groupId]
    );
  };

  const colorMap = { hiragana: 'rose', katakana: 'indigo' };
  const sysColor = activeModal ? colorMap[activeModal] : 'slate';

  const getModalMaxWidth = () => {
    switch (viewState) {
      case 'selection': return 'max-w-4xl';
      case 'result': return 'max-w-3xl';
      case 'learning': return 'max-w-5xl';
      case 'quiz': return 'max-w-4xl';
      default: return 'max-w-4xl';
    }
  };

  const getModalMaxHeight = () => {
    switch (viewState) {
      case 'selection': return 'max-h-[85vh]';
      case 'result': return 'max-h-[80vh]';
      case 'learning': return 'max-h-[90vh]';
      case 'quiz': return 'max-h-[90vh]';
      default: return 'max-h-[90vh]';
    }
  };

  return (
    <div className="space-y-6 pb-12 relative min-h-full">
      <div className="absolute top-0 right-0 left-0 h-64 pointer-events-none opacity-70 z-0 bg-gradient-to-b from-blue-50 via-rose-50/70 to-transparent dark:from-slate-900 dark:via-slate-900/70 dark:to-transparent" />

      <KanaStarterLanding navigate={navigate} />

      <div className="hidden">
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-blue-600 shadow-sm dark:border-slate-700 dark:bg-slate-900/80 dark:text-blue-300">
            <Sparkles size={14} /> Kana starter
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-800 dark:text-slate-100 font-jp flex items-center justify-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-blue-500 via-emerald-400 to-rose-400 text-2xl text-white shadow-lg">
              あ
            </span>
            Bảng chữ cái tiếng Nhật
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-3 text-lg">
            Học Hiragana và Katakana trước khi bắt đầu Kanji.
          </p>
        </div>

        {/* 2 MAIN CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 mb-6">
          <button 
            onClick={() => navigate('/introduction/hiragana')}
            className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-left border-2 border-rose-100 dark:border-slate-800 hover:border-rose-300 dark:hover:border-rose-700 transition-all group hover:shadow-[0_20px_40px_rgb(225,29,72,0.1)] hover:-translate-y-1 relative overflow-hidden flex flex-col items-center text-center"
          >
            <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-rose-500 via-pink-400 to-amber-300" />
            <div className="absolute left-8 top-8 rounded-full bg-rose-50 px-3 py-1 text-xs font-black text-rose-600 ring-1 ring-rose-100 dark:bg-rose-950/30 dark:text-rose-300 dark:ring-rose-900/50">46 chữ</div>
            <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-rose-50 to-pink-100 dark:from-rose-500/10 dark:to-pink-500/10 text-rose-500 flex items-center justify-center text-5xl font-jp font-bold mb-6 group-hover:scale-110 transition-transform duration-500 shadow-inner ring-1 ring-rose-100 dark:ring-rose-900/40">あ</div>
            <h3 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-2">Hiragana</h3>
            <p className="text-slate-500 dark:text-slate-400 font-medium mb-6">Bảng chữ mềm cơ bản</p>
            <div className="mb-5 grid w-full grid-cols-3 gap-2 text-center">
              {['A I U', 'KA SA', 'YA RA'].map(label => (
                <span key={label} className="rounded-xl bg-rose-50 py-2 text-[11px] font-black text-rose-500 ring-1 ring-rose-100 dark:bg-rose-950/30 dark:ring-rose-900/40">{label}</span>
              ))}
            </div>
            <div className="w-full bg-rose-50 dark:bg-rose-950/30 rounded-2xl p-4 flex items-center justify-center gap-2 text-rose-600 dark:text-rose-400 font-bold group-hover:bg-rose-100 dark:group-hover:bg-rose-950/50 transition-colors">
              Bắt đầu học <ChevronRight size={20} />
            </div>
          </button>
          
          <button 
            onClick={() => navigate('/introduction/katakana')}
            className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-left border-2 border-indigo-100 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all group hover:shadow-[0_20px_40px_rgb(99,102,241,0.1)] hover:-translate-y-1 relative overflow-hidden flex flex-col items-center text-center"
          >
            <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-indigo-500 via-sky-400 to-cyan-300" />
            <div className="absolute left-8 top-8 rounded-full bg-indigo-50 px-3 py-1 text-xs font-black text-indigo-600 ring-1 ring-indigo-100 dark:bg-indigo-950/30 dark:text-indigo-300 dark:ring-indigo-900/50">46 chữ</div>
            <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-indigo-50 to-sky-100 dark:from-indigo-500/10 dark:to-sky-500/10 text-indigo-500 flex items-center justify-center text-5xl font-jp font-bold mb-6 group-hover:scale-110 transition-transform duration-500 shadow-inner ring-1 ring-indigo-100 dark:ring-indigo-900/40">ア</div>
            <h3 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-2">Katakana</h3>
            <p className="text-slate-500 dark:text-slate-400 font-medium mb-6">Bảng chữ cứng ngoại lai</p>
            <div className="mb-5 grid w-full grid-cols-3 gap-2 text-center">
              {['A I U', 'KA SA', 'YA RA'].map(label => (
                <span key={label} className="rounded-xl bg-indigo-50 py-2 text-[11px] font-black text-indigo-500 ring-1 ring-indigo-100 dark:bg-indigo-950/30 dark:ring-indigo-900/40">{label}</span>
              ))}
            </div>
            <div className="w-full bg-indigo-50 dark:bg-indigo-950/30 rounded-2xl p-4 flex items-center justify-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold group-hover:bg-indigo-100 dark:group-hover:bg-indigo-950/50 transition-colors">
              Bắt đầu học <ChevronRight size={20} />
            </div>
          </button>
        </div>

        {/* 2 SUPPLEMENTARY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6">
          <button 
            disabled
            className="bg-gradient-to-br from-white via-slate-50 to-amber-50/70 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800/60 rounded-[2rem] p-6 text-left border-2 border-amber-100/80 dark:border-slate-800/50 transition-all flex items-center gap-6 opacity-85 cursor-not-allowed relative overflow-hidden"
          >
            <div className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-amber-300 via-slate-300 to-slate-400 dark:from-amber-900 dark:via-slate-700 dark:to-slate-700" />
            <div className="absolute -right-4 -bottom-7 font-jp text-8xl font-black text-amber-200/25 dark:text-slate-700/25">あ</div>
            <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-slate-700/50 text-amber-500 dark:text-slate-400 flex items-center justify-center shrink-0 ring-1 ring-amber-100 dark:ring-slate-700 shadow-inner">
              <BookOpen size={32} />
            </div>
            <div className="relative z-10 min-w-0">
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <h3 className="text-xl font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider">Học nhớ mẹo</h3>
                <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-amber-600 ring-1 ring-amber-100 dark:bg-slate-800 dark:text-slate-400 dark:ring-slate-700">
                  <Lock size={11} strokeWidth={2.5} />
                  Locked
                </span>
              </div>
              <p className="text-slate-500 dark:text-slate-500 text-sm">Dùng hình ảnh và liên tưởng để nhớ mặt chữ nhanh hơn.</p>
            </div>
          </button>
          
          <button 
            onClick={() => navigate('/introduction/typing')}
            className="bg-gradient-to-br from-white via-emerald-50/60 to-cyan-50/70 dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950/20 rounded-[2rem] p-6 text-left border-2 border-emerald-100 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all group flex items-center gap-6 relative overflow-hidden hover:shadow-[0_18px_34px_rgba(16,185,129,0.12)]"
          >
            <div className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-emerald-400 to-cyan-400" />
            <div className="absolute -right-4 -bottom-7 font-jp text-8xl font-black text-emerald-200/30 dark:text-emerald-900/20">ア</div>
            <div className="w-16 h-16 rounded-2xl bg-white dark:bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform ring-1 ring-emerald-100 dark:ring-emerald-900/40 shadow-inner">
              <Keyboard size={32} />
            </div>
            <div className="relative z-10 min-w-0">
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 uppercase tracking-wider">Typing</h3>
                <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-emerald-600 ring-1 ring-emerald-100 dark:bg-slate-800 dark:text-emerald-300 dark:ring-emerald-900/50">
                  Ready
                </span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Gõ lại kana theo âm đọc để kiểm tra phản xạ nhận diện.</p>
            </div>
          </button>
        </div>
      </div>

      {/* MODAL SYSTEM */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {activeModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-8 md:p-12">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={closeAll}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`relative w-full ${getModalMaxWidth()} ${getModalMaxHeight()} bg-white dark:bg-slate-950 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col border border-slate-200/50 dark:border-slate-800/50 transition-all duration-500`}
            >
              
              {/* VIEW 1: SELECTION */}
              {viewState === 'selection' && (
                <div className="flex flex-col flex-1 min-h-0 w-full bg-[#FAF8F5] dark:bg-slate-950">
                  <div className={`px-8 md:px-10 py-5 md:py-6 bg-${sysColor}-50 dark:bg-${sysColor}-500/10 border-b border-${sysColor}-100 dark:border-${sysColor}-900/30 flex justify-between items-start`}>
                    <div>
                      <h3 className={`text-3xl font-black text-${sysColor}-600 dark:text-${sysColor}-400 mb-2`}>
                        Học {activeModal === 'hiragana' ? 'Hiragana' : 'Katakana'}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 font-medium">Chọn nhóm chữ để ôn tập hoặc xem toàn bộ bảng chữ cái.</p>
                    </div>
                    <button onClick={closeAll} className="w-10 h-10 flex items-center justify-center rounded-full bg-white hover:bg-slate-100 dark:bg-slate-800 text-slate-500 shadow-sm transition-colors">
                      <X size={20} />
                    </button>
                  </div>

                  <div className="px-8 md:px-10 py-5 md:py-6 flex-1 overflow-y-auto space-y-3">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-slate-800 dark:text-slate-100">4 Nhóm chữ</h4>
                      <span className="text-sm font-bold text-slate-500">{activeGroups.length}/4 đã chọn</span>
                    </div>

                    {groupMetadata.map((g) => {
                      const isSelected = activeGroups.includes(g.id);
                      return (
                        <div 
                          key={g.id} 
                          onClick={() => toggleGroup(g.id)}
                          className={`group relative bg-white dark:bg-slate-900 p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-4 hover:border-${sysColor}-300 hover:shadow-md ${
                            isSelected ? `border-${sysColor}-500 shadow-[0_8px_20px_rgb(0,0,0,0.05)]` : 'border-slate-200 dark:border-slate-800'
                          }`}
                        >
                           {/* Checkbox */}
                           <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                             isSelected ? `border-${sysColor}-500 bg-${sysColor}-500 text-white` : 'border-slate-300'
                           }`}>
                             {isSelected && <Check size={14} strokeWidth={3} />}
                           </div>

                           {/* Icon Box */}
                           <div className={`w-10 h-10 rounded-xl bg-${sysColor}-50 text-${sysColor}-500 dark:bg-${sysColor}-500/10 flex items-center justify-center shrink-0`}>
                             <BookOpen size={20} />
                           </div>

                           {/* Content */}
                           <div className="flex-1">
                             <h4 className="font-bold text-slate-800 dark:text-slate-100 text-base mb-0.5">{g.name}</h4>
                             <p className="text-xs text-slate-500 font-medium">{g.count} ký tự</p>
                           </div>
                        </div>
                    )})}
                  </div>

                  <div className="px-8 md:px-10 py-5 md:py-6 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 space-y-3">
                    <button 
                      disabled={activeGroups.length === 0}
                      onClick={() => setViewState('quiz')}
                      className={`w-full py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 ${activeGroups.length > 0 ? `bg-${sysColor}-500 hover:bg-${sysColor}-600 shadow-lg shadow-${sysColor}-500/30` : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
                    >
                      Bắt đầu kiểm tra {activeGroups.length > 0 ? `(${activeGroups.length} nhóm)` : ''}
                    </button>
                    <button 
                      onClick={() => setViewState('learning')}
                      className={`w-full py-3 rounded-xl font-bold text-${sysColor}-500 bg-${sysColor}-50 hover:bg-${sysColor}-100 transition-colors flex items-center justify-center gap-2`}
                    >
                      <BookOpen size={20} /> Xem bảng chữ {activeModal === 'hiragana' ? 'Hiragana' : 'Katakana'}
                    </button>
                  </div>
                </div>
              )}

              {/* VIEW 2: FULL LEARNING GRID */}
              {viewState === 'learning' && (
                <div className="flex flex-col flex-1 min-h-0 w-full bg-[#FAF8F5] dark:bg-slate-950">
                  <div className="flex items-center justify-between px-8 py-6 border-b border-slate-200 dark:border-slate-800 bg-[#FAF8F5] dark:bg-slate-950 sticky top-0 z-20">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full text-white flex items-center justify-center text-2xl font-jp font-bold shadow-md bg-${sysColor}-500 shadow-${sysColor}-500/30`}>
                        {activeModal === 'hiragana' ? 'あ' : 'ア'}
                      </div>
                      <div>
                        <h2 className={`text-2xl font-black tracking-tight text-${sysColor}-500`}>Bảng chữ cái {activeModal}</h2>
                        <p className="text-sm font-semibold text-slate-500">Tổng cộng: 104 ký tự</p>
                      </div>
                    </div>
                    <button onClick={() => setViewState('selection')} className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-500 transition-colors">
                      <X size={24} />
                    </button>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-6 md:p-8 relative scrollbar-hide">
                    <div className="max-w-[1000px] mx-auto grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-16">
                        <div className="space-y-6">
                          <KanaGrid title="1. Chữ cơ bản (Seion)" items={(kanaData[activeModal] as any).seion} columns={5} colorClass={`text-${sysColor}-500`} />
                          <KanaGrid title="2. Chữ đục & Bán đục" items={(kanaData[activeModal] as any).dakuten} columns={5} colorClass={`text-${sysColor}-500`} />
                        </div>
                        <div className="space-y-6">
                          <KanaGrid title="3. Chữ ghép (Yoon)" items={(kanaData[activeModal] as any).yoon} columns={3} colorClass={`text-${sysColor}-500`} />
                          <div className="p-4 md:p-6 rounded-3xl bg-slate-100/50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/50">
                            <KanaGrid title="4. Chữ ghép mở rộng" items={(kanaData[activeModal] as any).extended} columns={4} colorClass="text-slate-600 dark:text-slate-400" />
                          </div>
                        </div>
                    </div>
                  </div>
                </div>
              )}

              {/* VIEW 3: QUIZ SYSTEM */}
              {viewState === 'quiz' && (
                <KanaQuiz 
                  system={activeModal} 
                  groups={activeGroups} 
                  onBack={() => setViewState('selection')} 
                  onComplete={(stats) => {
                    setQuizStats(stats);
                    setViewState('result');
                  }} 
                />
              )}

              {/* VIEW 4: RESULT SCREEN */}
              {viewState === 'result' && quizStats && (
                <div className="flex flex-col flex-1 min-h-0 w-full items-center justify-start md:justify-center p-6 md:p-8 bg-white dark:bg-slate-950 overflow-y-auto scrollbar-hide">
                  <Confetti />
                  <div className="text-center z-10 w-full max-w-5xl flex flex-col md:flex-row gap-6 md:gap-8 items-stretch justify-center my-auto">
                    
                    {/* Left: Score Circle */}
                    <div className="flex-1 w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-4">
                        <Sparkles size={32} />
                      </div>
                      <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-1">Kết quả bài kiểm tra</h2>
                      <p className="text-sm text-slate-500 font-medium mb-6">Đã kiểm tra {activeGroups.length} nhóm chữ</p>
                      
                      {/* Circular Progress */}
                      <div className="relative w-40 h-40 mb-6 shrink-0">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                          <circle className="text-slate-100 dark:text-slate-800 stroke-current" strokeWidth="8" cx="50" cy="50" r="40" fill="transparent"></circle>
                          <circle className="text-emerald-500 stroke-current" strokeWidth="8" strokeLinecap="round" cx="50" cy="50" r="40" fill="transparent" 
                            strokeDasharray={`${(quizStats.correct / quizStats.total) * 251.2} 251.2`} 
                            style={{ transition: 'stroke-dasharray 1s ease-out' }}>
                          </circle>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-3xl font-black text-slate-800 dark:text-slate-100">{quizStats.correct} / {quizStats.total}</span>
                          <span className="text-xs font-bold text-emerald-500 mt-0.5">{Math.round((quizStats.correct / quizStats.total) * 100)}% Chính xác</span>
                        </div>
                      </div>

                      {/* Thời gian làm bài */}
                      <div className="w-full max-w-xs mb-2 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 flex items-center justify-between border border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-2 text-slate-500 font-bold text-sm">
                          <Clock size={16} /> Thời gian
                        </div>
                        <span className="text-lg font-black font-mono text-slate-700 dark:text-slate-200">
                          {formatTime(quizStats.timeElapsed || 0)}
                        </span>
                      </div>

                      <div className="flex gap-4 w-full max-w-xs mt-2 shrink-0">
                        <div className="flex-1 bg-emerald-50 text-emerald-600 rounded-xl py-3 px-4 flex flex-col items-center">
                          <span className="text-xs uppercase font-bold mb-1">Đúng</span>
                          <span className="text-2xl font-black leading-none">{quizStats.correct}</span>
                        </div>
                        <div className="flex-1 bg-rose-50 text-rose-600 rounded-xl py-3 px-4 flex flex-col items-center">
                          <span className="text-xs uppercase font-bold mb-1">Sai</span>
                          <span className="text-2xl font-black leading-none">{quizStats.wrong}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Mistake List & Actions */}
                    <div className="flex-1 w-full flex flex-col h-full md:max-h-[80vh]">
                      <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm overflow-hidden flex flex-col">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                          <AlertCircle size={20} className="text-rose-500"/> Chi tiết lỗi sai ({quizStats.wrong})
                        </h3>
                        
                        <div className="flex-1 overflow-y-auto pr-2 space-y-3 scrollbar-hide">
                          {quizStats.mistakes.length > 0 ? quizStats.mistakes.map((m: any, i: number) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-rose-50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-900/30">
                              <div className="flex items-center gap-4">
                                <span className="text-3xl font-jp text-rose-500 font-medium">{m.jp}</span>
                                <div>
                                  <p className="text-xs font-bold text-slate-400 mb-0.5">Bạn nhập:</p>
                                  <p className="text-sm font-bold text-rose-600">{m.user || '(trống)'}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-xs font-bold text-slate-400 mb-0.5">Đáp án đúng:</p>
                                <p className="text-lg font-black text-emerald-500">{m.correct}</p>
                              </div>
                            </div>
                          )) : (
                            <div className="h-full flex flex-col items-center justify-center text-slate-400">
                              <Sparkles size={40} className="text-emerald-300 mb-3" />
                              <p className="font-semibold text-emerald-500">Tuyệt vời! Bạn không sai câu nào.</p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-4 mt-6">
                         <button onClick={() => setViewState('quiz')} className="flex-1 py-4 rounded-2xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
                           <RotateCcw size={20}/> Làm lại
                         </button>
                         <button onClick={() => setViewState('selection')} className={`flex-1 py-4 rounded-2xl font-bold text-white bg-${sysColor}-500 hover:bg-${sysColor}-600 transition-colors shadow-lg shadow-${sysColor}-500/30`}>
                           Đóng
                         </button>
                      </div>
                    </div>

                  </div>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>,
      document.body
    )}
    </div>
  );
};
