import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, ChevronRight, Volume2, Check, AlertCircle, BookOpen, RotateCcw, Clock, Keyboard } from 'lucide-react';

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
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md hover:-translate-y-1 hover:scale-105 transition-transform duration-300 cursor-pointer group will-change-transform transform-gpu relative overflow-hidden`}
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
      <div className="flex-1 overflow-y-auto p-6 md:p-8 transform-gpu">
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
      {/* Background Decor */}
      <div className="absolute top-0 right-0 left-0 h-64 pointer-events-none opacity-60 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-rose-100/50 via-transparent to-transparent transform-gpu will-change-transform">
         <div className="absolute right-64 top-4 w-32 h-32 bg-rose-200/40 rounded-full blur-xl transform-gpu will-change-transform"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto pt-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-800 dark:text-slate-100 font-jp flex items-center justify-center gap-3">
            📚 Bảng chữ cái tiếng Nhật
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-3 text-lg">
            Học Hiragana và Katakana trước khi bắt đầu Kanji.
          </p>
        </div>

        {/* 2 MAIN CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 mb-6">
          <button 
            onClick={() => navigate('/introduction/hiragana')}
            className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-left border-2 border-slate-100 dark:border-slate-800 hover:border-rose-300 dark:hover:border-rose-700 transition-all group hover:shadow-[0_20px_40px_rgb(225,29,72,0.1)] hover:-translate-y-1 relative overflow-hidden flex flex-col items-center text-center"
          >
            <div className="w-24 h-24 rounded-full bg-rose-50 dark:bg-rose-500/10 text-rose-500 flex items-center justify-center text-5xl font-jp font-bold mb-6 group-hover:scale-110 transition-transform duration-500">あ</div>
            <h3 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-2">Hiragana</h3>
            <p className="text-slate-500 dark:text-slate-400 font-medium mb-6">Bảng chữ mềm cơ bản</p>
            <div className="w-full bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 flex items-center justify-center gap-2 text-rose-600 dark:text-rose-400 font-bold group-hover:bg-rose-50 transition-colors">
              Bắt đầu học <ChevronRight size={20} />
            </div>
          </button>
          
          <button 
            onClick={() => navigate('/introduction/katakana')}
            className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-left border-2 border-slate-100 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all group hover:shadow-[0_20px_40px_rgb(99,102,241,0.1)] hover:-translate-y-1 relative overflow-hidden flex flex-col items-center text-center"
          >
            <div className="w-24 h-24 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 flex items-center justify-center text-5xl font-jp font-bold mb-6 group-hover:scale-110 transition-transform duration-500">ア</div>
            <h3 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-2">Katakana</h3>
            <p className="text-slate-500 dark:text-slate-400 font-medium mb-6">Bảng chữ cứng ngoại lai</p>
            <div className="w-full bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 flex items-center justify-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold group-hover:bg-indigo-50 transition-colors">
              Bắt đầu học <ChevronRight size={20} />
            </div>
          </button>
        </div>

        {/* 2 SUPPLEMENTARY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6">
          <button 
            onClick={() => navigate('/introduction/mnemonic')}
            className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 text-left border-2 border-slate-100 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all group flex items-center gap-6"
          >
            <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <BookOpen size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-1 uppercase tracking-wider">Học nhớ mẹo</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Dùng hình ảnh và liên tưởng để nhớ mặt chữ nhanh hơn.</p>
            </div>
          </button>
          
          <button 
            onClick={() => navigate('/introduction/typing')}
            className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 text-left border-2 border-slate-100 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all group flex items-center gap-6"
          >
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Keyboard size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-1 uppercase tracking-wider">Typing</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Gõ lại kana theo âm đọc để kiểm tra phản xạ nhận diện.</p>
            </div>
          </button>
        </div>
      </div>

      {/* MODAL SYSTEM */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-8 md:p-12">
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
                  <div className="flex items-center justify-between px-8 py-6 border-b border-slate-200 dark:border-slate-800 bg-[#FAF8F5] dark:bg-slate-950 sticky top-0 z-20 transform-gpu">
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
                  
                  <div className="flex-1 overflow-y-auto p-6 md:p-8 relative scrollbar-hide transform-gpu">
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
      </AnimatePresence>
    </div>
  );
};
