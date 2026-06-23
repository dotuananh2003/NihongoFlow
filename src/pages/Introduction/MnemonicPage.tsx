import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, Volume2, Heart, PlayCircle } from 'lucide-react';
import { kanaData, groupMetadata } from '../../data/kana';
import { getAiMnemonic, type AiMnemonicData } from '../../utils/aiMnemonic';
import { motion, AnimatePresence } from 'framer-motion';

export const MnemonicPage = () => {
  const navigate = useNavigate();
  const [system, setSystem] = useState<'hiragana' | 'katakana' | null>(null);
  const [group, setGroup] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [learnedCount, setLearnedCount] = useState(0);
  const [learnedChars, setLearnedChars] = useState<Record<string, boolean>>({});

  // Load progress from local storage
  useEffect(() => {
    const saved = localStorage.getItem('mnemonicProgress');
    if (saved) {
      const parsed = JSON.parse(saved);
      setLearnedChars(parsed);
      setLearnedCount(Object.keys(parsed).length);
    }
  }, []);

  const toggleLearned = (char: string) => {
    const newSaved = { ...learnedChars };
    if (newSaved[char]) {
      delete newSaved[char];
    } else {
      newSaved[char] = true;
    }
    setLearnedChars(newSaved);
    setLearnedCount(Object.keys(newSaved).length);
    localStorage.setItem('mnemonicProgress', JSON.stringify(newSaved));
  };

  // Get characters for current selection
  const chars = React.useMemo(() => {
    if (!system || !group) return [];
    return (kanaData[system] as any)[group].filter((c: any) => c.jp && c.r);
  }, [system, group]);

  const handleNext = () => {
    if (currentIndex < chars.length - 1) setCurrentIndex(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  };

  const playAudio = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    window.speechSynthesis.speak(utterance);
  };

  if (!system) {
    return (
      <div className="space-y-6 pb-12 ">
        <button 
          onClick={() => navigate('/introduction')}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 transition-colors font-medium mb-6"
        >
          <ArrowLeft size={18} /> Nhập môn
        </button>

        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-800 dark:text-slate-100 font-jp mb-2">
            Học Nhớ Mẹo 📖
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">
            Sử dụng hình ảnh và sự liên tưởng để ghi nhớ mặt chữ dễ dàng hơn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          <button 
            onClick={() => setSystem('hiragana')}
            className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 text-center border-2 border-slate-100 dark:border-slate-800 hover:border-rose-300 transition-all hover:shadow-lg group"
          >
            <div className="w-20 h-20 mx-auto rounded-full bg-rose-50 dark:bg-rose-900/20 text-rose-500 flex items-center justify-center text-4xl font-jp font-bold mb-4 group-hover:scale-110 transition-transform">あ</div>
            <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">Hiragana</h3>
            <p className="text-slate-500 dark:text-slate-400">Học mẹo bảng chữ mềm</p>
          </button>
          
          <button 
            onClick={() => setSystem('katakana')}
            className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 text-center border-2 border-slate-100 dark:border-slate-800 hover:border-indigo-300 transition-all hover:shadow-lg group"
          >
            <div className="w-20 h-20 mx-auto rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-500 flex items-center justify-center text-4xl font-jp font-bold mb-4 group-hover:scale-110 transition-transform">ア</div>
            <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">Katakana</h3>
            <p className="text-slate-500 dark:text-slate-400">Học mẹo bảng chữ cứng</p>
          </button>
        </div>
      </div>
    );
  }

  if (!group) {
    const colorCls = system === 'hiragana' ? 'text-rose-500' : 'text-indigo-500';
    return (
      <div className="space-y-6 pb-12 ">
        <button 
          onClick={() => setSystem(null)}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 transition-colors font-medium mb-6"
        >
          <ArrowLeft size={18} /> Chọn hệ chữ
        </button>

        <div className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-slate-800 dark:text-slate-100 mb-2 uppercase flex items-center gap-2">
              <span className={colorCls}>{system}</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Chọn nhóm chữ muốn học</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-slate-400 uppercase">Đã học</p>
            <p className={`text-2xl font-black ${colorCls}`}>{learnedCount} / 104</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
          {groupMetadata.map((g) => (
            <div key={g.id} className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-1">{g.name}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">{g.count} ký tự</p>
              </div>
              <button 
                onClick={() => { setGroup(g.id); setCurrentIndex(0); }}
                className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors ${system === 'hiragana' ? 'bg-rose-50 text-rose-600 hover:bg-rose-100' : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'}`}
              >
                <PlayCircle size={18} /> Bắt đầu học
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const currentChar = chars[currentIndex];
  const colorCls = system === 'hiragana' ? 'rose' : 'indigo';
  const mnemonicData: AiMnemonicData = getAiMnemonic(system, currentChar.jp, currentChar.r);
  const isLearned = learnedChars[currentChar.jp];

  return (
    <div className="flex flex-col min-h-[85vh] ">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={() => setGroup(null)}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 transition-colors font-medium"
        >
          <ArrowLeft size={18} /> Trở về
        </button>

        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-xs font-bold text-slate-400 uppercase">Đã học</span>
            <span className={`font-black text-${colorCls}-500`}>{learnedCount} / 104</span>
          </div>
          <div className="h-2 w-32 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${(learnedCount / 104) * 100}%` }}
              className={`h-full bg-${colorCls}-500`}
            />
          </div>
        </div>
      </div>

      {/* Main Learning UI */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentChar.jp}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-10"
          >
            {/* Left: Kana Card */}
            <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 aspect-square flex flex-col items-center justify-center relative shadow-sm border border-slate-100 dark:border-slate-800">
              <button 
                onClick={(e) => playAudio(e, currentChar.r)}
                className="absolute top-6 right-6 w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400 hover:text-blue-500 transition-colors border border-slate-200 dark:border-slate-700 shadow-sm"
              >
                <Volume2 size={24} />
              </button>
              
              <div className={`text-9xl font-jp font-black text-${colorCls}-500 mb-8`}>
                {currentChar.jp}
              </div>

              <div className="px-6 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-2xl font-black text-slate-800 dark:text-slate-100 uppercase tracking-widest shadow-inner">
                {currentChar.r}
              </div>
            </div>

            {/* Middle: Arrow */}
            <div className="text-slate-300 dark:text-slate-600 hidden lg:block">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>

            {/* Right: Mnemonic Side */}
            <div className="w-full max-w-sm flex flex-col gap-4">
              
              {/* Image Card */}
              <div className="w-full bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 aspect-square flex flex-col items-center justify-center relative shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden group">
                <div className="flex-1 w-full flex items-center justify-center p-4 relative">
                  <div className="absolute inset-0 flex items-center justify-center spinner-container">
                    <div className="w-8 h-8 border-4 border-slate-100 dark:border-slate-800 border-t-slate-300 dark:border-t-slate-500 rounded-full animate-spin"></div>
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={mnemonicData.imageUrl} 
                    alt={mnemonicData.keyword} 
                    className="w-full h-full object-contain rounded-2xl group-hover:scale-105 transition-all duration-500 relative z-10"
                    loading="lazy"
                    onLoad={(e) => { 
                      e.currentTarget.style.opacity = '1'; 
                      const container = e.currentTarget.parentElement;
                      if (container) {
                        const spinner = container.querySelector('.spinner-container') as HTMLElement;
                        if (spinner) spinner.style.display = 'none';
                      }
                    }}
                    onError={(e) => { 
                      e.currentTarget.style.display = 'none'; 
                      const container = e.currentTarget.parentElement;
                      if (container) {
                        const spinner = container.querySelector('.spinner-container') as HTMLElement;
                        if (spinner) spinner.innerHTML = `<span class="text-7xl group-hover:scale-110 transition-transform">${mnemonicData.emoji || '🔮'}</span>`;
                      }
                    }}
                    style={{ opacity: 0 }}
                  />
                </div>
                <div className="mt-4 text-3xl font-black text-slate-300 dark:text-slate-600 tracking-[0.2em] uppercase text-center w-full relative z-10 bg-white dark:bg-slate-900 pt-2">
                  <span className={`text-${colorCls}-500`}>{mnemonicData.keyword.charAt(0)}</span>
                  {mnemonicData.keyword.slice(1)}
                </div>
              </div>

              {/* Meaning Box */}
              <div className="w-full bg-[#FAF8F5] dark:bg-slate-800/50 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 text-center flex flex-col justify-center shadow-sm relative">
                <button
                  onClick={() => toggleLearned(currentChar.jp)}
                  className="absolute -top-4 -right-2 w-12 h-12 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-md border border-slate-100 dark:border-slate-700 hover:scale-110 transition-transform z-10"
                >
                  <Heart size={24} className={isLearned ? `fill-rose-500 text-rose-500` : 'text-slate-300'} />
                </button>
                <div className="text-xl font-bold text-slate-700 dark:text-slate-200 mb-2">
                  {mnemonicData.meaning} ({mnemonicData.keyword.toLowerCase()})
                </div>
                <div className={`text-lg font-medium text-${colorCls}-500`}>
                  {mnemonicData.phonetic}
                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Navigation */}
      <div className="w-full flex items-center justify-center gap-6 mt-12 mb-6">
        <button 
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${
            currentIndex === 0 ? 'bg-slate-100 text-slate-300 dark:bg-slate-800/50 dark:text-slate-600 cursor-not-allowed' : 'bg-white dark:bg-slate-900 text-slate-600 hover:bg-slate-50 shadow-sm border border-slate-200 dark:border-slate-700 hover:scale-105'
          }`}
        >
          <ChevronLeft size={32} />
        </button>

        <div className="px-6 py-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 font-bold text-slate-500 text-lg min-w-[120px] text-center">
          {currentIndex + 1} / {chars.length}
        </div>
        
        <button 
          onClick={handleNext}
          disabled={currentIndex === chars.length - 1}
          className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${
            currentIndex === chars.length - 1 ? 'bg-slate-100 text-slate-300 dark:bg-slate-800/50 dark:text-slate-600 cursor-not-allowed' : `bg-${colorCls}-500 text-white hover:bg-${colorCls}-600 shadow-md shadow-${colorCls}-500/30 hover:scale-105`
          }`}
        >
          <ChevronRight size={32} />
        </button>
      </div>
      
    </div>
  );
};

