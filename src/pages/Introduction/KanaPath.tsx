import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  BookOpen, 
  PenTool, 
  RotateCcw, 
  Trophy, 
  Star, 
  X, 
  AlertCircle, 
  Sparkles, 
  Keyboard, 
  GraduationCap,
  ArrowRight
} from 'lucide-react';
import { groupMetadata, kanaData } from '../../data/kana';
import { KanaGrid } from '../../components/Kana/KanaGrid';
import { KanaQuiz } from '../../components/Kana/KanaQuiz';
import { Confetti } from '../../components/Kana/Confetti';

// Character previews for visual cards
const samplePreviews: Record<'hiragana' | 'katakana', Record<string, { jp: string; r: string }[]>> = {
  hiragana: {
    seion: [
      { jp: 'あ', r: 'a' },
      { jp: 'か', r: 'ka' },
      { jp: 'さ', r: 'sa' },
      { jp: 'た', r: 'ta' },
      { jp: 'な', r: 'na' },
    ],
    yoon: [
      { jp: 'きゃ', r: 'kya' },
      { jp: 'しゃ', r: 'sha' },
      { jp: 'ちゃ', r: 'cha' },
      { jp: 'にゃ', r: 'nya' },
      { jp: 'ひゃ', r: 'hya' },
    ],
    dakuten: [
      { jp: 'が', r: 'ga' },
      { jp: 'ざ', r: 'za' },
      { jp: 'だ', r: 'da' },
      { jp: 'ば', r: 'ba' },
      { jp: 'ぱ', r: 'pa' },
    ],
    extended: [
      { jp: 'いぇ', r: 'ye' },
      { jp: 'うぃ', r: 'wi' },
      { jp: 'しぇ', r: 'she' },
      { jp: 'てぃ', r: 'ti' },
      { jp: 'ふぁ', r: 'fa' },
    ],
  },
  katakana: {
    seion: [
      { jp: 'ア', r: 'a' },
      { jp: 'カ', r: 'ka' },
      { jp: 'サ', r: 'sa' },
      { jp: 'タ', r: 'ta' },
      { jp: 'ナ', r: 'na' },
    ],
    yoon: [
      { jp: 'キャ', r: 'kya' },
      { jp: 'シャ', r: 'sha' },
      { jp: 'チャ', r: 'cha' },
      { jp: 'ニャ', r: 'nya' },
      { jp: 'ヒャ', r: 'hya' },
    ],
    dakuten: [
      { jp: 'ガ', r: 'ga' },
      { jp: 'ザ', r: 'za' },
      { jp: 'ダ', r: 'da' },
      { jp: 'バ', r: 'ba' },
      { jp: 'パ', r: 'pa' },
    ],
    extended: [
      { jp: 'シェ', r: 'she' },
      { jp: 'ジェ', r: 'je' },
      { jp: 'チェ', r: 'che' },
      { jp: 'ティ', r: 'ti' },
      { jp: 'ファ', r: 'fa' },
    ],
  },
};

const groupDescriptions: Record<string, { desc: string; subtitle: string; iconKana: string }> = {
  seion: {
    subtitle: 'Âm cơ bản cốt lõi',
    desc: '46 ký tự nền tảng cần nắm vững trước tiên (hàng A, Ka, Sa, Ta, Na, Ha, Ma, Ya, Ra, Wa).',
    iconKana: 'あ',
  },
  yoon: {
    subtitle: 'Âm ghép với Ya, Yu, Yo',
    desc: 'Kết hợp chữ cột [i] với chữ nhỏ ゃ/ゅ/ょ (hoặc ャ/ュ/ョ) để tạo âm uốn lưỡi.',
    iconKana: 'きゃ',
  },
  dakuten: {
    subtitle: 'Biến âm đục & bán đục',
    desc: 'Thêm dấu tenten (゛) và maru (゜) để chuyển đổi âm Ka→Ga, Sa→Za, Ta→Da, Ha→Ba/Pa.',
    iconKana: 'が',
  },
  extended: {
    subtitle: 'Âm ghép mở rộng hiện đại',
    desc: 'Dùng biểu thị chính xác cách phát âm của các từ vay mượn từ tiếng nước ngoài (Fa, Ti, Di, She...).',
    iconKana: 'いぇ',
  },
};

export const KanaPath = () => {
  const { system } = useParams<{ system: 'hiragana' | 'katakana' }>();
  const navigate = useNavigate();

  const isHiragana = system === 'hiragana';
  
  // Theme styling tokens
  const theme = isHiragana ? {
    name: 'Hiragana',
    kana: 'ひらがな',
    kanji: '平仮名',
    primary: 'rose',
    titleGradient: 'from-rose-600 via-pink-600 to-rose-500 dark:from-rose-400 dark:via-pink-400 dark:to-rose-300',
    topRail: 'from-rose-500 via-pink-400 to-amber-300',
    badge: 'border-rose-100 bg-rose-50/90 text-rose-600 dark:border-rose-900/40 dark:bg-rose-950/60 dark:text-rose-300',
    cardBorder: 'border-rose-100/90 hover:border-rose-300 dark:border-slate-800 dark:hover:border-rose-700/60',
    accentText: 'text-rose-600 dark:text-rose-400',
    iconBox: 'bg-gradient-to-br from-rose-500 via-pink-500 to-amber-400 text-white shadow-rose-500/25 ring-rose-100 dark:ring-rose-950/50',
    buttonGrad: 'from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 shadow-rose-500/25',
    studyBtn: 'border-rose-200 bg-rose-50/70 text-rose-600 hover:bg-rose-100 dark:border-rose-900/40 dark:bg-rose-950/30 dark:text-rose-300 dark:hover:bg-rose-950/60',
    previewBox: 'bg-rose-50/80 ring-rose-100 text-rose-600 dark:bg-rose-950/30 dark:ring-rose-900/30 dark:text-rose-300',
    previewRomaji: 'text-rose-400 dark:text-rose-500',
    progressBg: 'bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400',
    glow: 'bg-rose-200/40 dark:bg-rose-900/20',
  } : {
    name: 'Katakana',
    kana: 'カタカナ',
    kanji: '片仮名',
    primary: 'blue',
    titleGradient: 'from-blue-600 via-indigo-600 to-cyan-500 dark:from-blue-400 dark:via-indigo-400 dark:to-cyan-300',
    topRail: 'from-blue-600 via-sky-400 to-cyan-300',
    badge: 'border-blue-100 bg-blue-50/90 text-blue-600 dark:border-blue-900/40 dark:bg-blue-950/60 dark:text-blue-300',
    cardBorder: 'border-blue-100/90 hover:border-blue-300 dark:border-slate-800 dark:hover:border-blue-700/60',
    accentText: 'text-blue-600 dark:text-blue-400',
    iconBox: 'bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-400 text-white shadow-blue-500/25 ring-blue-100 dark:ring-blue-950/50',
    buttonGrad: 'from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-blue-500/25',
    studyBtn: 'border-blue-200 bg-blue-50/70 text-blue-600 hover:bg-blue-100 dark:border-blue-900/40 dark:bg-blue-950/30 dark:text-blue-300 dark:hover:bg-blue-950/60',
    previewBox: 'bg-blue-50/80 ring-blue-100 text-blue-600 dark:bg-blue-950/30 dark:ring-blue-900/30 dark:text-blue-300',
    previewRomaji: 'text-blue-400 dark:text-blue-500',
    progressBg: 'bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400',
    glow: 'bg-blue-200/40 dark:bg-blue-900/20',
  };

  // State
  const [stats, setStats] = useState<any>({});
  const [activeModal, setActiveModal] = useState<'study' | 'quiz' | 'result' | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [quizResult, setQuizResult] = useState<any>(null);

  // Load stats
  useEffect(() => {
    if (system) {
      const saved = localStorage.getItem(`jp-forus-stats-${system}`);
      if (saved) {
        setStats(JSON.parse(saved));
      }
    }
  }, [system]);

  // Save stats helper
  const updateStats = (groupId: string, newStats: any) => {
    setStats((prev: any) => {
      const updated = {
        ...prev,
        [groupId]: {
          ...prev[groupId],
          ...newStats
        }
      };
      if (system) {
        localStorage.setItem(`jp-forus-stats-${system}`, JSON.stringify(updated));
      }
      return updated;
    });
  };

  // Calculate global progress
  const totalChars = 104;
  const completedChars = groupMetadata.reduce((sum, g) => {
    const groupStat = stats[g.id];
    if (groupStat && groupStat.maxAccuracy >= 80) {
      return sum + g.count;
    }
    return sum;
  }, 0);

  const completedGroupsCount = groupMetadata.filter(g => (stats[g.id]?.maxAccuracy || 0) >= 80).length;
  const totalQuizTimes = Object.values(stats).reduce((sum: number, s: any) => sum + (s?.quizCount || 0), 0);
  const progressPercent = Math.min(100, Math.round((completedChars / totalChars) * 100));

  const handleStudy = (groupId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedGroup(groupId);
    setActiveModal('study');
    
    const count = (stats[groupId]?.studyCount || 0) + 1;
    updateStats(groupId, { studyCount: count });
  };

  const handleQuiz = (groupId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedGroup(groupId);
    setActiveModal('quiz');
  };

  const handleQuizComplete = (result: any) => {
    setQuizResult(result);
    setActiveModal('result');
    
    if (selectedGroup) {
      const prevStat = stats[selectedGroup] || {};
      const accuracy = Math.round((result.correct / result.total) * 100);
      
      updateStats(selectedGroup, {
        quizCount: (prevStat.quizCount || 0) + 1,
        highestScore: Math.max(prevStat.highestScore || 0, result.correct),
        maxAccuracy: Math.max(prevStat.maxAccuracy || 0, accuracy),
        lastQuizDate: new Date().toISOString()
      });
    }
  };

  const closeAll = () => {
    setActiveModal(null);
    setSelectedGroup(null);
    setQuizResult(null);
  };

  if (system !== 'hiragana' && system !== 'katakana') {
    return <div>Invalid system</div>;
  }

  return (
    <div className="relative mx-auto flex min-h-[calc(100vh-64px)] max-w-6xl flex-col px-4 pb-16 pt-4 md:px-8">
      {/* Background ambient lighting */}
      <div className="fixed-bg-plane pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-blue-50/60 via-white/80 to-rose-50/50 dark:from-slate-950 dark:via-slate-950 dark:to-indigo-950/30" />
      <div className={`fixed-bg-plane pointer-events-none absolute right-10 top-20 -z-10 h-72 w-72 rounded-full ${theme.glow} blur-3xl`} />

      {/* Top Header Bar: Navigation + Quick Script Switcher */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <button 
          type="button"
          onClick={() => navigate('/introduction')}
          className="group inline-flex items-center gap-2.5 rounded-full border border-white/90 bg-white/95 py-2 pl-2 pr-4 text-xs sm:text-sm font-black text-slate-600 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:text-blue-600 hover:shadow-md dark:border-slate-700 dark:bg-slate-900/95 dark:text-slate-300"
        >
          <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-slate-600 shadow-sm ring-1 ring-slate-100 transition-transform group-hover:-translate-x-0.5 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700">
            <ArrowLeft size={16} />
          </span>
          Nhập môn
        </button>

        {/* Script Switcher & Typing Shortcut */}
        <div className="flex items-center gap-2">
          {/* Hiragana/Katakana Switcher Pill */}
          <div className="inline-flex rounded-full border border-white/80 bg-white/90 p-1 shadow-sm dark:border-slate-700 dark:bg-slate-900/90 backdrop-blur-md">
            <button
              type="button"
              onClick={() => navigate('/introduction/hiragana')}
              className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-black transition-all ${
                isHiragana
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-500/25'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <span className="font-jp text-xs">あ</span>
              <span>Hiragana</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/introduction/katakana')}
              className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-black transition-all ${
                !isHiragana
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <span className="font-jp text-xs">ア</span>
              <span>Katakana</span>
            </button>
          </div>

          {/* Quick Typing Shortcut */}
          <button
            type="button"
            onClick={() => navigate('/introduction/typing')}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/80 bg-white/90 px-3.5 py-2 text-xs font-black text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:text-emerald-600 hover:shadow-md dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-200 dark:hover:text-emerald-400"
          >
            <Keyboard size={14} className="text-emerald-500" />
            <span className="hidden sm:inline">Luyện gõ Typing</span>
          </button>
        </div>
      </div>

      {/* Hero Title & Master Dashboard */}
      <section className="mb-8 overflow-hidden rounded-[2rem] border border-white/80 bg-white/85 p-6 sm:p-8 shadow-[0_16px_46px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-900/85 backdrop-blur-xl">
        <div className="grid items-center gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1 text-[11px] font-black uppercase tracking-[0.16em] shadow-sm ${theme.badge}`}>
                <Sparkles size={12} /> {theme.name} Master Path
              </span>
              <span className="rounded-lg bg-slate-100 dark:bg-slate-800 px-2.5 py-1 font-jp text-[11px] font-black text-slate-600 dark:text-slate-300">
                {theme.kanji}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-slate-950 dark:text-white">
              Bảng chữ <span className={`bg-gradient-to-r ${theme.titleGradient} bg-clip-text text-transparent`}>{theme.name}</span>
            </h1>
            <p className="mt-2 text-xs sm:text-sm font-semibold leading-relaxed text-slate-600 dark:text-slate-400 max-w-xl">
              {isHiragana 
                ? 'Bảng chữ cái mềm dùng cho từ thuần Nhật, trợ từ và hậu tố ngữ pháp. Hãy hoàn thành cả 4 chặng để đạt chứng chỉ thành thạo!'
                : 'Bảng chữ cái góc cạnh dùng cho từ ngoại lai, tên riêng quốc tế và các từ ngữ nhấn mạnh. Luyện tập đều đặn để nhận diện tức thì!'}
            </p>
          </div>

          {/* Master Progress Statistics Card */}
          <div className="flex flex-col justify-between rounded-[1.5rem] border border-slate-100 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-800/60 shadow-inner">
            <div className="flex items-center justify-between gap-3 mb-2.5">
              <div className="flex items-center gap-2">
                <div className={`grid h-8 w-8 place-items-center rounded-xl bg-white dark:bg-slate-800 shadow-sm text-xs font-black ${theme.accentText}`}>
                  <GraduationCap size={16} />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tiến độ bảng chữ</span>
                  <div className="text-sm font-black text-slate-800 dark:text-slate-100">
                    {completedChars} / {totalChars} ký tự đã đạt
                  </div>
                </div>
              </div>

              <span className={`text-2xl font-black ${theme.accentText}`}>
                {progressPercent}%
              </span>
            </div>

            {/* Main Progress Bar */}
            <div className="w-full bg-slate-200/80 dark:bg-slate-700/80 rounded-full h-3 overflow-hidden p-0.5">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`h-full rounded-full ${theme.progressBg} shadow-sm`}
              />
            </div>

            {/* 3 Quick Metric Chips */}
            <div className="mt-3.5 grid grid-cols-3 gap-2 text-center pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
              <div>
                <div className="text-[9px] font-black uppercase tracking-wider text-slate-400">Thành thạo</div>
                <div className="text-xs font-black text-slate-700 dark:text-slate-200 mt-0.5">
                  {completedGroupsCount}/4 nhóm
                </div>
              </div>

              <div>
                <div className="text-[9px] font-black uppercase tracking-wider text-slate-400">Lượt kiểm tra</div>
                <div className="text-xs font-black text-slate-700 dark:text-slate-200 mt-0.5">
                  {totalQuizTimes} lần
                </div>
              </div>

              <div>
                <div className="text-[9px] font-black uppercase tracking-wider text-slate-400">Trạng thái</div>
                <div className={`text-xs font-black mt-0.5 ${progressPercent === 100 ? 'text-emerald-500' : theme.accentText}`}>
                  {progressPercent === 100 ? 'Xuất sắc' : 'Đang học'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Roadmap Stage Cards Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {groupMetadata.map((g, idx) => {
          const groupStat = stats[g.id] || { studyCount: 0, quizCount: 0, highestScore: 0, maxAccuracy: 0, lastQuizDate: null };
          const isMastered = groupStat.maxAccuracy >= 80;
          const isStudied = groupStat.studyCount > 0 || groupStat.quizCount > 0;
          const sampleList = samplePreviews[system][g.id] || [];
          const metaInfo = groupDescriptions[g.id] || { desc: '', subtitle: '', iconKana: 'あ' };
          const repKana = (kanaData[system] as any)[g.id]?.[0]?.jp || metaInfo.iconKana;

          return (
            <motion.div
              key={g.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.3 }}
              className={`group relative flex min-h-[460px] flex-col justify-between overflow-hidden rounded-[2rem] border bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(15,23,42,0.12)] dark:bg-slate-900 ${theme.cardBorder}`}
            >
              {/* Top Accent Rail */}
              <div className={`absolute inset-x-0 top-0 h-2 bg-gradient-to-r ${theme.topRail}`} />

              {/* Watermark Kana Background */}
              <div className="pointer-events-none absolute -bottom-10 -right-6 select-none font-jp text-[8.5rem] font-black leading-none text-slate-100 opacity-50 transition-transform duration-700 group-hover:rotate-6 group-hover:scale-110 dark:text-slate-800/40">
                {repKana}
              </div>

              {/* Card Main Content */}
              <div className="relative z-10 flex flex-col">
                {/* Top Row: Stage Badge + Mastery Indicator */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[9.5px] font-black uppercase tracking-[0.14em] shadow-sm ${theme.badge}`}>
                    Chặng 0{idx + 1}
                  </span>

                  {isMastered ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[9.5px] font-black text-emerald-600 ring-1 ring-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 dark:ring-emerald-900/40">
                      <Star size={10} fill="currentColor" /> Thành thạo
                    </span>
                  ) : isStudied ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[9.5px] font-black text-amber-600 ring-1 ring-amber-100 dark:bg-amber-950/40 dark:text-amber-300 dark:ring-amber-900/40">
                      Đang luyện
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[9.5px] font-black text-slate-400 dark:bg-slate-800 dark:text-slate-500">
                      Chưa học
                    </span>
                  )}
                </div>

                {/* Group Title & Subtitle */}
                <div className="mb-4">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                      {g.name.split(': ')[1] || g.name}
                    </h3>
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-black text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                      {g.count} chữ
                    </span>
                  </div>
                  <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 mt-0.5">
                    {metaInfo.subtitle}
                  </p>
                </div>

                {/* Iconic Character Centerpiece */}
                <div className="my-2 flex justify-center">
                  <div className={`grid h-20 w-20 place-items-center rounded-2xl text-4xl font-jp font-black shadow-lg ring-4 transition-transform duration-300 group-hover:scale-105 ${theme.iconBox}`}>
                    {repKana}
                  </div>
                </div>

                {/* Character Previews Pills Row */}
                <div className="my-3.5">
                  <div className="text-[9px] font-black uppercase tracking-wider text-slate-400 mb-1.5 text-center">
                    Ký tự tiêu biểu
                  </div>
                  <div className="grid grid-cols-5 gap-1">
                    {sampleList.map((item) => (
                      <div
                        key={item.jp}
                        className={`flex flex-col items-center rounded-xl py-1.5 ring-1 transition-colors ${theme.previewBox}`}
                      >
                        <span className="font-jp text-sm font-black leading-none">{item.jp}</span>
                        <span className={`text-[8.5px] font-black uppercase mt-0.5 leading-none ${theme.previewRomaji}`}>{item.r}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Accuracy & Score Mini Bar */}
                <div className="rounded-xl bg-slate-50 p-2.5 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 mb-4">
                  <div className="flex items-center justify-between text-[10px] font-black mb-1.5">
                    <span className="text-slate-400 uppercase tracking-wider">Độ chính xác</span>
                    <span className={groupStat.maxAccuracy >= 80 ? 'text-emerald-500' : theme.accentText}>
                      {groupStat.maxAccuracy}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${groupStat.maxAccuracy >= 80 ? 'bg-emerald-500' : theme.progressBg}`} 
                      style={{ width: `${groupStat.maxAccuracy}%` }} 
                    />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[10px] font-bold text-slate-500 dark:text-slate-400">
                    <span>Đã học: <strong>{groupStat.studyCount}</strong></span>
                    <span>Điểm: <strong>{groupStat.highestScore}/{g.count}</strong></span>
                  </div>
                </div>
              </div>

              {/* Bottom Interactive Dual Action Buttons */}
              <div className="relative z-10 grid grid-cols-2 gap-2 pt-1 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={(e) => handleStudy(g.id, e)}
                  className={`inline-flex items-center justify-center gap-1.5 rounded-xl border py-2.5 text-xs font-black transition-all duration-200 hover:-translate-y-0.5 shadow-sm ${theme.studyBtn}`}
                >
                  <BookOpen size={14} />
                  <span>Học chữ</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => handleQuiz(g.id, e)}
                  className={`inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r py-2.5 text-xs font-black text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${theme.buttonGrad}`}
                >
                  <PenTool size={14} />
                  <span>Kiểm tra</span>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Full-Screen & Floating Modals */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {activeModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center">
              {/* STUDY MODAL (Enhanced Luxury View) */}
              {activeModal === 'study' && selectedGroup && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="smooth-panel fixed inset-0 flex h-full w-full flex-col overflow-hidden bg-slate-50 dark:bg-slate-950"
                >
                  {/* Top Bar */}
                  <div className="smooth-panel sticky top-0 z-20 flex items-center justify-between border-b border-slate-200/80 bg-white px-6 py-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center gap-3">
                      <span className={`grid h-9 w-9 place-items-center rounded-xl text-white font-jp text-base font-black shadow-md ${theme.iconBox}`}>
                        {(kanaData[system] as any)[selectedGroup]?.[0]?.jp || (isHiragana ? 'あ' : 'ア')}
                      </span>
                      <div>
                        <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                          Ôn tập: {groupMetadata.find(g => g.id === selectedGroup)?.name || 'Bảng chữ'}
                        </h3>
                        <p className="text-xs font-semibold text-slate-400">
                          Nhấp vào từng ô ký tự để nghe cách phát âm chuẩn tiếng Nhật
                        </p>
                      </div>
                    </div>

                    <button 
                      type="button"
                      onClick={closeAll} 
                      className={`grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-500 transition-colors duration-150 ${
                        isHiragana ? 'hover:bg-rose-50 hover:text-rose-600' : 'hover:bg-blue-50 hover:text-blue-600'
                      } dark:bg-slate-800 dark:text-slate-400`}
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* Study Content Body */}
                  <div className="smooth-scroll-area flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
                    <div className="mx-auto max-w-4xl">
                      <KanaGrid 
                        title={groupMetadata.find(g => g.id === selectedGroup)?.name || 'Characters'}
                        items={(kanaData[system] as any)[selectedGroup]}
                        columns={5}
                        colorClass={theme.accentText}
                        system={system}
                      />
                    </div>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="smooth-panel sticky bottom-0 z-20 flex items-center justify-between border-t border-slate-200 bg-white px-6 py-3.5 dark:border-slate-800 dark:bg-slate-900">
                    <button
                      type="button"
                      onClick={closeAll}
                      className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-2.5 text-xs font-black text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    >
                      Đóng
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setActiveModal('quiz');
                      }}
                      className={`inline-flex items-center gap-2 rounded-xl bg-gradient-to-r px-6 py-2.5 text-xs font-black text-white shadow-md ${theme.buttonGrad}`}
                    >
                      <PenTool size={14} />
                      <span>Làm bài kiểm tra nhóm này</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* QUIZ MODAL */}
              {activeModal === 'quiz' && selectedGroup && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="fixed inset-0 flex h-full w-full flex-col overflow-hidden bg-slate-50 dark:bg-slate-950"
                >
                  <KanaQuiz 
                    system={system}
                    groups={[selectedGroup]}
                    onBack={closeAll}
                    onComplete={handleQuizComplete}
                  />
                </motion.div>
              )}

              {/* RESULT MODAL (State of the Art) */}
              {activeModal === 'result' && quizResult && (
                <>
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
                    onClick={closeAll}
                  />
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.92, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative z-10 flex max-h-[85vh] w-full max-w-xl flex-col overflow-hidden rounded-[2.5rem] border border-white/80 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900"
                  >
                    {quizResult.correct === quizResult.total && <Confetti />}
                    
                    {/* Top Result Banner */}
                    <div className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white px-6 py-6 text-center dark:from-slate-800/80 dark:to-slate-900 border-b border-slate-100 dark:border-slate-800">
                      <div className={`absolute inset-x-0 top-0 h-2 bg-gradient-to-r ${theme.topRail}`} />

                      <div className={`mx-auto mb-3 grid h-16 w-16 place-items-center rounded-2xl text-white shadow-lg ${
                        quizResult.correct === quizResult.total 
                          ? 'bg-gradient-to-br from-amber-400 to-amber-500 shadow-amber-500/25' 
                          : theme.iconBox
                      }`}>
                        {quizResult.correct === quizResult.total ? <Trophy size={32} /> : <Star size={32} />}
                      </div>

                      <h2 className="text-2xl font-black uppercase tracking-wider text-slate-900 dark:text-white">
                        {quizResult.correct === quizResult.total ? 'Xuất Sắc! 100% Chính Xác' : 'Hoàn Thành Bài Kiểm Tra'}
                      </h2>
                      <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
                        {groupMetadata.find(g => g.id === selectedGroup)?.name || 'Nhóm chữ'}
                      </p>
                    </div>

                    {/* Result Stats Grid */}
                    <div className="flex-1 overflow-y-auto p-6">
                      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3 text-center dark:border-slate-800 dark:bg-slate-800/60">
                          <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">Tổng câu</span>
                          <p className="mt-1 text-xl font-black text-slate-800 dark:text-slate-100">{quizResult.total}</p>
                        </div>

                        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-3 text-center dark:border-emerald-900/30 dark:bg-emerald-950/20">
                          <span className="text-[9px] font-black uppercase tracking-wider text-emerald-600">Đúng</span>
                          <p className="mt-1 text-xl font-black text-emerald-600 dark:text-emerald-400">{quizResult.correct}</p>
                        </div>

                        <div className="rounded-2xl border border-rose-100 bg-rose-50/60 p-3 text-center dark:border-rose-900/30 dark:bg-rose-950/20">
                          <span className="text-[9px] font-black uppercase tracking-wider text-rose-600">Sai</span>
                          <p className="mt-1 text-xl font-black text-rose-600 dark:text-rose-400">{quizResult.wrong}</p>
                        </div>

                        <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-3 text-center dark:border-blue-900/30 dark:bg-blue-950/20">
                          <span className="text-[9px] font-black uppercase tracking-wider text-blue-600">Chính xác</span>
                          <p className="mt-1 text-xl font-black text-blue-600 dark:text-blue-400">
                            {Math.round((quizResult.correct / quizResult.total) * 100)}%
                          </p>
                        </div>
                      </div>

                      {/* Mistakes List */}
                      {quizResult.mistakes.length > 0 && (
                        <div className="mt-4 rounded-2xl border border-rose-100 bg-rose-50/40 p-4 dark:border-rose-900/30 dark:bg-rose-950/20">
                          <h4 className="mb-2.5 flex items-center gap-1.5 text-xs font-black text-rose-600 dark:text-rose-400">
                            <AlertCircle size={14} /> Các câu cần lưu ý ôn lại:
                          </h4>
                          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                            {quizResult.mistakes.map((m: any, i: number) => (
                              <div key={i} className="flex items-center gap-2 rounded-xl border border-rose-100 bg-white p-2 shadow-sm dark:border-rose-900/40 dark:bg-slate-800">
                                <span className="font-jp text-lg font-black text-rose-600 dark:text-rose-400">{m.jp}</span>
                                <div className="flex flex-col text-[10px] leading-tight">
                                  <span className="font-black text-emerald-600 dark:text-emerald-400 uppercase">Đ.án: {m.correct}</span>
                                  <span className="font-medium text-slate-400 line-through">Bạn: {m.user || '-'}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Bottom Modal Actions */}
                    <div className="flex gap-3 border-t border-slate-100 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-800/80">
                      <button 
                        type="button"
                        onClick={closeAll} 
                        className="flex-1 rounded-xl border border-slate-200 bg-white py-3 text-xs font-black text-slate-700 shadow-sm transition-all hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                      >
                        Về lộ trình
                      </button>

                      <button 
                        type="button"
                        onClick={() => { setQuizResult(null); setActiveModal('quiz'); }} 
                        className={`flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r py-3 text-xs font-black text-white shadow-md transition-all ${theme.buttonGrad}`}
                      >
                        <RotateCcw size={14} />
                        <span>Kiểm tra lại</span>
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};
