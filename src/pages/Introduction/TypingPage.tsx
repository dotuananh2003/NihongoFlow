import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Trophy, 
  Zap, 
  Target, 
  Timer, 
  CheckCircle2, 
  RefreshCcw, 
  ArrowRight, 
  Check, 
  X, 
  Sparkles, 
  Keyboard, 
  Layers,
  ChevronRight,
  Volume2,
  VolumeX,
  Flame,
  Gauge,
  Sliders,
  Award,
  Play,
  RotateCcw,
  Star,
  CheckCircle,
  HelpCircle,
  Maximize,
  Minimize
} from 'lucide-react';
import { kanaData } from '../../data/kana';
import { Confetti } from '../../components/Kana/Confetti';

// ==========================================
// 1. TACTILE AUDIO SYNTHESIZER (WEB AUDIO API)
// ==========================================
class SoundSynth {
  private ctx: AudioContext | null = null;
  private enabled: boolean = true;

  constructor() {
    // AudioContext will be initialized on first user interaction
  }

  public setEnabled(val: boolean) {
    this.enabled = val;
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  private getContext(): AudioContext | null {
    if (!this.enabled) return null;
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Crisp mechanical key clack
  public playKey() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // Ignore audio failure
    }
  }

  // Sweet chime for correct typing (scales with combo)
  public playCorrect(combo: number = 0) {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const baseFreq = 523.25; // C5
      const noteOffset = Math.min(combo * 30, 400);
      const freq = baseFreq + noteOffset;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch {
      // Ignore
    }
  }

  // Soft thud for mistake
  public playWrong() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(130, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(65, ctx.currentTime + 0.18);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.18);
    } catch {
      // Ignore
    }
  }

  // Victory fanfare chord
  public playVictory() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0.2, ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.4);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.45);
      });
    } catch {
      // Ignore
    }
  }
}

const soundSynth = new SoundSynth();

// ==========================================
// 2. KANA DATA CHUNKING UTILITY
// ==========================================
const getChunks = (sys: 'hiragana' | 'katakana', grp: string) => {
  const data = (kanaData[sys] as any)[grp];
  if (!data) return [];
  const sizes = grp === 'extended' 
     ? (sys === 'hiragana' ? [4, 3, 2, 2, 4, 4, 4] : [4, 4, 3, 2, 2, 4, 3])
     : (grp === 'yoon' ? 3 : 5);
  
  const result: any[][] = [];
  let i = 0;
  if (Array.isArray(sizes)) {
    for (const s of sizes) {
      if (i < data.length) {
        result.push(data.slice(i, i + s));
        i += s;
      }
    }
  } else {
    while (i < data.length) {
      result.push(data.slice(i, i + sizes));
      i += sizes;
    }
  }
  return result;
};

// ==========================================
// 3. MAIN COMPONENT
// ==========================================
export const TypingPage = () => {
  const navigate = useNavigate();

  // Navigation & Config States
  const [system, setSystem] = useState<'hiragana' | 'katakana' | null>(null);
  const [activeGroups, setActiveGroups] = useState<string[]>([]);
  const [gameState, setGameState] = useState<'selection' | 'typing' | 'result'>('selection');
  const [playMode, setPlayMode] = useState<'focus' | 'grid'>('focus');
  const [autoAdvance, setAutoAdvance] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(Boolean(typeof document !== 'undefined' && document.fullscreenElement));

  // Listen to fullscreen changes
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
      }
    } catch (err) {
      console.warn("Fullscreen toggle failed:", err);
    }
  };

  const exitTypingToSelection = () => {
    try {
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    } catch {}
    setGameState('selection');
  };

  // Typing Session States
  const [chars, setChars] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentInput, setCurrentInput] = useState('');
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [charStatus, setCharStatus] = useState<('correct' | 'wrong' | null)[]>([]);
  const [shakeKey, setShakeKey] = useState(0);
  
  // Performance & Stats States
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const focusInputRef = useRef<HTMLInputElement>(null);
  const gridInputRef = useRef<HTMLInputElement>(null);

  // Sync sound settings
  useEffect(() => {
    soundSynth.setEnabled(soundEnabled);
  }, [soundEnabled]);

  // Live Timer during typing
  useEffect(() => {
    let timer: any;
    if (gameState === 'typing' && startTime > 0 && endTime === 0) {
      timer = setInterval(() => {
        setCurrentTime(Date.now());
      }, 200);
    }
    return () => clearInterval(timer);
  }, [gameState, startTime, endTime]);

  // Calculate live Kana Per Minute (KPM)
  const currentKpm = useMemo(() => {
    if (startTime === 0) return 0;
    const elapsedMinutes = Math.max((currentTime - startTime) / 60000, 0.05);
    return Math.round(correctCount / elapsedMinutes);
  }, [correctCount, startTime, currentTime]);

  // Accuracy calculation
  const accuracy = useMemo(() => {
    const total = correctCount + wrongCount;
    if (total === 0) return 100;
    return Math.round((correctCount / total) * 100);
  }, [correctCount, wrongCount]);

  // Auto focus input
  useEffect(() => {
    if (gameState === 'typing') {
      if (playMode === 'focus' && focusInputRef.current) {
        focusInputRef.current.focus();
      } else if (playMode === 'grid' && gridInputRef.current) {
        gridInputRef.current.focus();
        gridInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [gameState, currentIndex, playMode]);

  // ==========================================
  // 4. GAME START & RESET LOGIC
  // ==========================================
  const startTyping = (sys: 'hiragana' | 'katakana', selectedRows: string[], customChars?: any[]) => {
    // Automatically enter F11 full screen mode
    try {
      if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    } catch {
      // Ignore
    }

    setSystem(sys);
    setActiveGroups(selectedRows);
    
    let pool: any[] = [];
    if (customChars && customChars.length > 0) {
      pool = [...customChars];
    } else {
      const grouped: Record<string, number[]> = {};
      for (const r of selectedRows) {
        const [grp, idx] = r.split('-');
        if (!grouped[grp]) grouped[grp] = [];
        grouped[grp].push(parseInt(idx, 10));
      }
      
      for (const grp of Object.keys(grouped)) {
        const chunks = getChunks(sys, grp);
        for (const idx of grouped[grp]) {
          if (chunks[idx]) {
            pool.push(...chunks[idx].filter((c: any) => c.jp !== ''));
          }
        }
      }
    }
    
    // Shuffle pool
    const shuffled = [...pool];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    setChars(shuffled);
    setCharStatus(new Array(shuffled.length).fill(null));
    setCurrentIndex(0);
    setCurrentInput('');
    setAnswers({});
    setStatus('idle');
    setCorrectCount(0);
    setWrongCount(0);
    setCombo(0);
    setMaxCombo(0);
    setStartTime(Date.now());
    setEndTime(0);
    setCurrentTime(Date.now());
    setGameState('typing');
  };

  // Presets selector
  const applyPreset = (preset: 'seion' | 'dakuten' | 'yoon' | 'extended' | 'all') => {
    if (!system) return;
    const allRows: string[] = [];
    if (preset === 'all') {
      ['seion', 'dakuten', 'yoon', 'extended'].forEach(grp => {
        const chunks = getChunks(system, grp);
        chunks.forEach((_, idx) => allRows.push(`${grp}-${idx}`));
      });
    } else {
      const chunks = getChunks(system, preset);
      chunks.forEach((_, idx) => allRows.push(`${preset}-${idx}`));
    }
    setActiveGroups(allRows);
  };

  // ==========================================
  // 5. INPUT HANDLING ENGINE
  // ==========================================
  const handleCheckAnswer = useCallback((val: string, idx: number) => {
    const currentChar = chars[idx];
    if (!currentChar) return;

    const cleanVal = val.trim().toLowerCase();
    if (cleanVal === '') return;

    const isCorrect = cleanVal === currentChar.r.toLowerCase();
    const newStatus = isCorrect ? 'correct' : 'wrong';

    setStatus(newStatus);
    const nextStatuses = [...charStatus];
    nextStatuses[idx] = newStatus;
    setCharStatus(nextStatuses);

    setAnswers(prev => ({ ...prev, [idx]: cleanVal }));

    if (isCorrect) {
      soundSynth.playCorrect(combo + 1);
      setCorrectCount(prev => prev + 1);
      setCombo(prev => {
        const next = prev + 1;
        setMaxCombo(m => Math.max(m, next));
        return next;
      });
    } else {
      soundSynth.playWrong();
      setWrongCount(prev => prev + 1);
      setCombo(0);
      setShakeKey(prev => prev + 1);
    }

    // Auto advance to next unanswered card
    setTimeout(() => {
      let nextIdx = -1;
      for (let i = 0; i < chars.length; i++) {
        const checkIdx = (idx + 1 + i) % chars.length;
        if (nextStatuses[checkIdx] === null) {
          nextIdx = checkIdx;
          break;
        }
      }

      if (nextIdx !== -1) {
        setCurrentIndex(nextIdx);
        setCurrentInput('');
        setStatus('idle');
      } else {
        setEndTime(Date.now());
        setGameState('result');
        soundSynth.playVictory();
      }
    }, playMode === 'focus' ? 80 : 120);
  }, [chars, charStatus, combo, playMode]);

  // Focus mode real-time auto advance
  const handleFocusInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCurrentInput(val);
    soundSynth.playKey();

    if (status === 'wrong') setStatus('idle');

    if (autoAdvance) {
      const currentChar = chars[currentIndex];
      if (currentChar && val.trim().toLowerCase() === currentChar.r.toLowerCase()) {
        handleCheckAnswer(val, currentIndex);
      }
    }
  };

  const handleFocusKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCheckAnswer(currentInput, currentIndex);
    } else if (e.key === 'Escape') {
      exitTypingToSelection();
    }
  };

  // Grid mode input
  const handleGridInputChange = (idx: number, val: string) => {
    setAnswers(prev => ({ ...prev, [idx]: val }));
    soundSynth.playKey();
    if (status === 'wrong') setStatus('idle');

    if (autoAdvance) {
      const currentChar = chars[idx];
      if (currentChar && val.trim().toLowerCase() === currentChar.r.toLowerCase()) {
        handleCheckAnswer(val, idx);
      }
    }
  };

  const handleGridKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCheckAnswer(answers[idx] || '', idx);
    } else if (e.key === 'Escape') {
      exitTypingToSelection();
    }
  };

  // Format time utility
  const formatTime = (ms: number) => {
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    return `${m.toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;
  };

  // Total characters count for selected groups
  const selectedKanaCount = useMemo(() => {
    if (!system) return 0;
    let count = 0;
    const grouped: Record<string, number[]> = {};
    for (const r of activeGroups) {
      const [grp, idx] = r.split('-');
      if (!grouped[grp]) grouped[grp] = [];
      grouped[grp].push(parseInt(idx, 10));
    }
    for (const grp of Object.keys(grouped)) {
      const chunks = getChunks(system, grp);
      for (const idx of grouped[grp]) {
        if (chunks[idx]) {
          count += chunks[idx].filter((c: any) => c.jp !== '').length;
        }
      }
    }
    return count;
  }, [system, activeGroups]);

  // Previews
  const hiraganaPreview = ['あ', 'い', 'う', 'え', 'お', 'か', 'き', 'く'];
  const katakanaPreview = ['ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'キ', 'ク'];

  // Theme Helpers
  const isHira = system === 'hiragana';
  const themeGlow = isHira 
    ? 'from-rose-500/20 via-pink-500/10 to-amber-500/20' 
    : 'from-cyan-500/20 via-blue-500/10 to-indigo-500/20';

  const themeBorder = isHira 
    ? 'border-rose-500/40 hover:border-rose-400' 
    : 'border-cyan-500/40 hover:border-cyan-400';

  const themeBadge = isHira
    ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-rose-500/30'
    : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-cyan-500/30';

  // =========================================================================
  // VIEW 1: SELECTION DASHBOARD (TRANG CHỌN HỆ CHỮ & NHÓM ÂM)
  // =========================================================================
  if (gameState === 'selection') {
    return (
      <div className="relative min-h-[calc(100vh-64px)] w-full overflow-x-hidden bg-slate-50/50 pb-20 pt-6 dark:bg-slate-950">
        {/* Subtle Zen Background Ambient */}
        <div className="fixed-bg-plane pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(120,119,198,0.12),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(56,189,248,0.1),rgba(15,23,42,0))]" />

        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          {/* Top Bar Navigation */}
          <div className="mb-6 flex items-center justify-between">
            <button 
              type="button"
              onClick={() => {
                if (system) {
                  setSystem(null);
                  setActiveGroups([]);
                } else {
                  navigate('/introduction');
                }
              }}
              className="group inline-flex items-center gap-2.5 rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 text-xs font-black text-slate-700 shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:text-blue-600 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:text-cyan-400"
            >
              <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" />
              <span>{system ? 'Chọn hệ chữ khác' : 'Quay lại Nhập môn'}</span>
            </button>

            {/* Right: Sound toggle */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-bold transition-all ${
                  soundEnabled 
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-900/40 dark:bg-emerald-950/40 dark:text-emerald-400' 
                    : 'border-slate-200 bg-white text-slate-400 dark:border-slate-800 dark:bg-slate-900'
                }`}
              >
                {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
                <span>{soundEnabled ? 'Âm thanh: Bật' : 'Âm thanh: Tắt'}</span>
              </button>
            </div>
          </div>

          {/* Hero Header */}
          <div className="mb-8 text-center">
            <div className="mb-2.5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/80 px-4 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-blue-600 shadow-sm dark:border-blue-900/40 dark:bg-blue-950/50 dark:text-blue-400">
              <Sparkles size={13} /> Kana Reflex Typing Studio
            </div>
            <h1 className="text-3xl font-black uppercase tracking-tight text-slate-900 dark:text-white md:text-5xl">
              Luyện gõ <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-pink-500 bg-clip-text font-jp text-transparent dark:from-cyan-400 dark:via-sky-400 dark:to-rose-400">タイピング</span>
            </h1>
            <p className="mt-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
              {!system 
                ? 'Rèn luyện phản xạ gõ Romaji siêu tốc với âm thanh xúc giác và giao diện tập trung đỉnh cao' 
                : `Chọn các nhóm âm ${system === 'hiragana' ? 'Hiragana (Chữ mềm 🌸)' : 'Katakana (Chữ cứng ⚡)'} để bắt đầu thử thách`}
            </p>
          </div>

          {/* STEP 1: CHOOSE SYSTEM (HIRAGANA / KATAKANA HERO CARDS) */}
          {!system ? (
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
              {/* HIRAGANA SAKURA CARD */}
              <div
                onClick={() => setSystem('hiragana')}
                className="group relative flex min-h-[380px] cursor-pointer flex-col justify-between overflow-hidden rounded-[2rem] border border-rose-100 bg-white p-7 text-left shadow-[0_10px_30px_rgba(244,63,94,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:border-rose-300 hover:shadow-[0_20px_45px_rgba(244,63,94,0.15)] dark:border-rose-950/40 dark:bg-slate-900/90 dark:hover:border-rose-500/50"
              >
                {/* Top Accent Gradient Rail */}
                <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-rose-500 via-pink-400 to-amber-400" />

                {/* Giant Kanji Watermark */}
                <div className="pointer-events-none absolute -bottom-8 right-2 select-none font-jp text-[9rem] font-black leading-none text-rose-500/5 transition-transform duration-500 group-hover:scale-110 group-hover:text-rose-500/10 dark:text-rose-400/5">
                  あ
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3.5 py-1 text-[11px] font-black uppercase tracking-wider text-rose-600 ring-1 ring-rose-200/60 dark:bg-rose-950/60 dark:text-rose-300 dark:ring-rose-900/50">
                      🌸 HIRAGANA ひらがな
                    </span>
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 font-jp text-2xl font-black text-white shadow-md shadow-rose-500/30 transition-transform group-hover:scale-105">
                      あ
                    </span>
                  </div>

                  <h3 className="mt-5 text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                    Bảng Chữ Mềm
                  </h3>
                  <p className="mt-1.5 text-xs font-semibold leading-relaxed text-slate-500 dark:text-slate-400">
                    Phong cách Sakura Zen truyền thống. Luyện gõ từ gốc ngữ pháp, trợ từ và từ thuần Nhật.
                  </p>

                  {/* Kana Reel Preview */}
                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {hiraganaPreview.map((k) => (
                      <span key={k} className="grid h-9 w-9 place-items-center rounded-xl bg-rose-50/80 font-jp text-sm font-black text-rose-600 ring-1 ring-rose-100 transition-transform group-hover:scale-105 dark:bg-rose-950/40 dark:text-rose-300 dark:ring-rose-900/40">
                        {k}
                      </span>
                    ))}
                    <span className="grid h-9 px-2 place-items-center rounded-xl bg-rose-50/50 text-[10px] font-black text-rose-400 dark:bg-rose-950/20 dark:text-rose-500">
                      +96 âm
                    </span>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between pt-4 border-t border-rose-50 dark:border-rose-950/40">
                  <span className="text-xs font-black text-rose-600 dark:text-rose-400">Vào phòng luyện gõ</span>
                  <div className="grid h-9 w-9 place-items-center rounded-full bg-rose-500 text-white shadow-md shadow-rose-500/30 transition-transform group-hover:translate-x-1">
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>

              {/* KATAKANA NEO-CYBER CARD */}
              <div
                onClick={() => setSystem('katakana')}
                className="group relative flex min-h-[380px] cursor-pointer flex-col justify-between overflow-hidden rounded-[2rem] border border-cyan-100 bg-white p-7 text-left shadow-[0_10px_30px_rgba(6,182,212,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-300 hover:shadow-[0_20px_45px_rgba(6,182,212,0.15)] dark:border-cyan-950/40 dark:bg-slate-900/90 dark:hover:border-cyan-500/50"
              >
                {/* Top Accent Gradient Rail */}
                <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600" />

                {/* Giant Kanji Watermark */}
                <div className="pointer-events-none absolute -bottom-8 right-2 select-none font-jp text-[9rem] font-black leading-none text-cyan-500/5 transition-transform duration-500 group-hover:scale-110 group-hover:text-cyan-500/10 dark:text-cyan-400/5">
                  ア
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-50 px-3.5 py-1 text-[11px] font-black uppercase tracking-wider text-cyan-700 ring-1 ring-cyan-200/60 dark:bg-cyan-950/60 dark:text-cyan-300 dark:ring-cyan-900/50">
                      ⚡ KATAKANA カタカナ
                    </span>
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 font-jp text-2xl font-black text-white shadow-md shadow-cyan-500/30 transition-transform group-hover:scale-105">
                      ア
                    </span>
                  </div>

                  <h3 className="mt-5 text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                    Bảng Chữ Cứng
                  </h3>
                  <p className="mt-1.5 text-xs font-semibold leading-relaxed text-slate-500 dark:text-slate-400">
                    Phong cách Cyberpunk sắc bén. Luyện gõ từ mượn tiếng Anh, tên quốc tế và thuật ngữ hiện đại.
                  </p>

                  {/* Kana Reel Preview */}
                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {katakanaPreview.map((k) => (
                      <span key={k} className="grid h-9 w-9 place-items-center rounded-xl bg-cyan-50/80 font-jp text-sm font-black text-cyan-700 ring-1 ring-cyan-100 transition-transform group-hover:scale-105 dark:bg-cyan-950/40 dark:text-cyan-300 dark:ring-cyan-900/40">
                        {k}
                      </span>
                    ))}
                    <span className="grid h-9 px-2 place-items-center rounded-xl bg-cyan-50/50 text-[10px] font-black text-cyan-600 dark:bg-cyan-950/20 dark:text-cyan-400">
                      +96 âm
                    </span>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between pt-4 border-t border-cyan-50 dark:border-cyan-950/40">
                  <span className="text-xs font-black text-cyan-600 dark:text-cyan-400">Vào phòng luyện gõ</span>
                  <div className="grid h-9 w-9 place-items-center rounded-full bg-cyan-500 text-white shadow-md shadow-cyan-500/30 transition-transform group-hover:translate-x-1">
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* STEP 2: GROUP & MODE SELECTION DASHBOARD */
            <div className="space-y-6">
              {/* Top Controller Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-slate-200/80 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center gap-3">
                  <span className={`grid h-10 w-10 place-items-center rounded-2xl font-jp text-lg font-black text-white shadow-md ${
                    isHira ? 'bg-gradient-to-br from-rose-500 to-pink-600 shadow-rose-500/25' : 'bg-gradient-to-br from-cyan-500 to-blue-600 shadow-cyan-500/25'
                  }`}>
                    {isHira ? 'あ' : 'ア'}
                  </span>
                  <div>
                    <h3 className="text-base font-black text-slate-800 dark:text-slate-100">
                      {isHira ? 'Bảng Hiragana (Chữ mềm)' : 'Bảng Katakana (Chữ cứng)'}
                    </h3>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                      <span>Đã chọn {activeGroups.length} hàng</span>
                      <span>•</span>
                      <span className="font-extrabold text-blue-600 dark:text-cyan-400">{selectedKanaCount} ký tự</span>
                    </div>
                  </div>
                </div>

                {/* Mode Selector Toggle */}
                <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-1.5 dark:border-slate-800 dark:bg-slate-950">
                  <button
                    type="button"
                    onClick={() => setPlayMode('focus')}
                    className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-black transition-all ${
                      playMode === 'focus'
                        ? isHira
                          ? 'bg-rose-500 text-white shadow-sm'
                          : 'bg-cyan-500 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                    }`}
                  >
                    <Zap size={13} />
                    <span>Focus Flow (Tập trung)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPlayMode('grid')}
                    className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-black transition-all ${
                      playMode === 'grid'
                        ? isHira
                          ? 'bg-rose-500 text-white shadow-sm'
                          : 'bg-cyan-500 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                    }`}
                  >
                    <Layers size={13} />
                    <span>Grid Arena (Ma trận lưới)</span>
                  </button>
                </div>
              </div>

              {/* Quick Presets Bar */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-slate-400 mr-1">Chọn nhanh:</span>
                <button
                  type="button"
                  onClick={() => applyPreset('seion')}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-black text-slate-700 shadow-sm transition-colors hover:border-blue-400 hover:text-blue-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-cyan-500"
                >
                  🌟 Cơ bản Seion (46 âm)
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset('dakuten')}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-black text-slate-700 shadow-sm transition-colors hover:border-blue-400 hover:text-blue-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-cyan-500"
                >
                  ⚡ Biến âm Dakuten (25 âm)
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset('yoon')}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-black text-slate-700 shadow-sm transition-colors hover:border-blue-400 hover:text-blue-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-cyan-500"
                >
                  🎯 Âm ghép Yōon (33 âm)
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset('extended')}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-black text-slate-700 shadow-sm transition-colors hover:border-blue-400 hover:text-blue-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-cyan-500"
                >
                  💎 Âm mở rộng
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset('all')}
                  className={`rounded-xl px-3.5 py-1.5 text-xs font-black shadow-sm transition-all ${
                    isHira 
                      ? 'bg-rose-500 text-white hover:bg-rose-600' 
                      : 'bg-cyan-500 text-white hover:bg-cyan-600'
                  }`}
                >
                  🏆 Chọn tất cả
                </button>
                {activeGroups.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setActiveGroups([])}
                    className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-black text-rose-600 hover:bg-rose-100 dark:border-rose-900/40 dark:bg-rose-950/40 dark:text-rose-300"
                  >
                    Bỏ chọn
                  </button>
                )}
              </div>

              {/* 4 Group Columns Matrix */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[
                  { id: 'seion', name: 'CHỮ CƠ BẢN', sub: 'Seion', icon: isHira ? 'あ' : 'ア' },
                  { id: 'dakuten', name: 'BIẾN ÂM (ĐỤC)', sub: 'Dakuten', icon: isHira ? 'が' : 'ガ' },
                  { id: 'yoon', name: 'ÂM GHÉP', sub: 'Yōon', icon: isHira ? 'きゃ' : 'キャ' },
                  { id: 'extended', name: 'MỞ RỘNG', sub: 'Extended', icon: '✨' }
                ].map(col => {
                  const chunks = getChunks(system, col.id);
                  if (chunks.length === 0) return null;
                  const colRows = chunks.map((_, idx) => `${col.id}-${idx}`);
                  const isAllSelected = colRows.length > 0 && colRows.every(r => activeGroups.includes(r));

                  return (
                    <div 
                      key={col.id} 
                      className="flex flex-col rounded-3xl border border-slate-200/80 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                    >
                      {/* Column Header */}
                      <div className="mb-3.5 flex items-center justify-between border-b border-slate-100 pb-2.5 dark:border-slate-800">
                        <div className="flex items-center gap-2">
                          <div className={`grid h-8 w-8 place-items-center rounded-xl font-jp text-xs font-black ${
                            isHira ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-300' : 'bg-cyan-50 text-cyan-600 dark:bg-cyan-950/50 dark:text-cyan-300'
                          }`}>
                            {col.icon}
                          </div>
                          <div>
                            <h4 className="text-xs font-black text-slate-800 dark:text-slate-100 leading-none">{col.name}</h4>
                            <span className="text-[10px] font-bold text-slate-400">{col.sub}</span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            if (isAllSelected) {
                              setActiveGroups(prev => prev.filter(r => !colRows.includes(r)));
                            } else {
                              setActiveGroups(prev => [...new Set([...prev, ...colRows])]);
                            }
                          }}
                          className={`rounded-lg px-2 py-0.5 text-[10px] font-black uppercase tracking-wider transition-colors ${
                            isAllSelected
                              ? isHira
                                ? 'bg-rose-500 text-white'
                                : 'bg-cyan-500 text-white'
                              : 'bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400'
                          }`}
                        >
                          {isAllSelected ? 'Bỏ' : 'Cả cột'}
                        </button>
                      </div>

                      {/* Row List */}
                      <div className="flex flex-col gap-2">
                        {chunks.map((chunk, idx) => {
                          const rowId = `${col.id}-${idx}`;
                          const isSelected = activeGroups.includes(rowId);
                          const firstValid = chunk.find((c: any) => c.jp !== '');
                          const rowName = firstValid ? `Hàng「${firstValid.jp}」` : `Hàng ${idx + 1}`;
                          const charsDisplay = chunk.map((c: any) => c.jp !== '' ? c.jp : ' ').join(' ');

                          return (
                            <div
                              key={rowId}
                              onClick={() => setActiveGroups(prev => prev.includes(rowId) ? prev.filter(id => id !== rowId) : [...prev, rowId])}
                              className={`group/row flex cursor-pointer items-center justify-between rounded-xl border p-2.5 transition-all duration-150 ${
                                isSelected
                                  ? isHira
                                    ? 'border-rose-300 bg-rose-50/70 shadow-sm dark:border-rose-800 dark:bg-rose-950/40'
                                    : 'border-cyan-300 bg-cyan-50/70 shadow-sm dark:border-cyan-800 dark:bg-cyan-950/40'
                                  : 'border-slate-100 bg-slate-50/50 hover:border-slate-300 dark:border-slate-800/80 dark:bg-slate-800/40 dark:hover:border-slate-700'
                              }`}
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <div className={`grid h-4 w-4 shrink-0 place-items-center rounded-md border text-white transition-colors ${
                                  isSelected
                                    ? isHira ? 'border-rose-500 bg-rose-500' : 'border-cyan-500 bg-cyan-500'
                                    : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800'
                                }`}>
                                  {isSelected && <Check size={10} strokeWidth={3.5} />}
                                </div>
                                <span className={`font-jp text-xs font-black truncate ${
                                  isSelected
                                    ? isHira ? 'text-rose-700 dark:text-rose-300' : 'text-cyan-700 dark:text-cyan-300'
                                    : 'text-slate-700 dark:text-slate-300'
                                }`}>
                                  {rowName}
                                </span>
                              </div>

                              <span className="ml-2 truncate font-jp text-xs font-bold tracking-widest text-slate-400 dark:text-slate-500">
                                {charsDisplay}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Sticky Action Floating Bar */}
              <div className="sticky bottom-4 z-20 flex items-center justify-between rounded-3xl border border-slate-200/90 bg-white/95 p-4 shadow-xl backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Chế độ đang chọn:</span>
                    <span className="text-xs font-black text-slate-800 dark:text-slate-100">
                      {playMode === 'focus' ? '⚡ Focus Flow (Tập trung)' : '📋 Grid Arena (Ma trận lưới)'}
                    </span>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-bold text-slate-600 dark:text-slate-400">
                    <input 
                      type="checkbox" 
                      checked={autoAdvance} 
                      onChange={(e) => setAutoAdvance(e.target.checked)}
                      className="rounded accent-blue-600"
                    />
                    <span>Tự nhảy chữ khi gõ đúng (Siêu tốc)</span>
                  </label>
                </div>

                <button
                  type="button"
                  disabled={activeGroups.length === 0}
                  onClick={() => startTyping(system, activeGroups)}
                  className={`inline-flex items-center gap-2.5 rounded-2xl px-8 py-3.5 text-sm font-black text-white shadow-lg transition-all ${
                    activeGroups.length > 0
                      ? isHira
                        ? 'bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 shadow-rose-500/25 hover:shadow-rose-500/40 hover:-translate-y-0.5'
                        : 'bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5'
                      : 'cursor-not-allowed bg-slate-200 text-slate-400 shadow-none dark:bg-slate-800 dark:text-slate-600'
                  }`}
                >
                  <Play size={16} fill="currentColor" />
                  <span>Bắt đầu gõ ({selectedKanaCount} chữ)</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: TYPING PRACTICE SESSION (FOCUS FLOW & GRID ARENA)
  // =========================================================================
  if (gameState === 'typing' && chars.length > 0) {
    const total = chars.length;
    const currentChar = chars[currentIndex] || {};
    const upcomingChars = chars.slice(currentIndex + 1, currentIndex + 6);

    return createPortal(
      <div className={`fixed inset-0 z-[99999] flex h-screen w-screen flex-col overflow-hidden bg-slate-950 text-white ${
        isHira ? 'selection:bg-rose-500 selection:text-white' : 'selection:bg-cyan-500 selection:text-black'
      }`}>
        {/* Dynamic Theme Glow Background */}
        <div className={`pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b ${themeGlow}`} />

        {/* TOP HUD BAR */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-800/80 bg-slate-900/60 px-6 backdrop-blur-md">
          {/* Left: Back & Badge */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={exitTypingToSelection}
              className="grid h-9 w-9 place-items-center rounded-xl bg-slate-800 text-slate-400 transition-colors hover:bg-rose-500/20 hover:text-rose-400"
              title="Thoát về trang chọn (ESC)"
            >
              <X size={18} />
            </button>
            <div className="flex items-center gap-2">
              <span className={`rounded-lg px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider ${themeBadge}`}>
                {isHira ? 'HIRAGANA' : 'KATAKANA'}
              </span>
              <span className="hidden sm:inline text-xs font-bold text-slate-400">
                {playMode === 'focus' ? 'Focus Flow' : 'Grid Arena'}
              </span>
            </div>
          </div>

          {/* Center: Live Stats HUD */}
          <div className="flex items-center gap-6 sm:gap-10">
            {/* Progress */}
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tiến độ</span>
              <span className="font-mono text-sm font-black text-white">
                {currentIndex + 1}<span className="text-slate-400">/{total}</span>
              </span>
            </div>

            {/* Speed KPM */}
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tốc độ</span>
              <span className={`font-mono text-sm font-black flex items-center gap-1 ${isHira ? 'text-amber-400' : 'text-cyan-400'}`}>
                <Gauge size={13} />
                {currentKpm} <span className="text-[10px] font-normal">KPM</span>
              </span>
            </div>

            {/* Accuracy */}
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Chính xác</span>
              <span className="font-mono text-sm font-black text-emerald-400">{accuracy}%</span>
            </div>

            {/* Combo Streak */}
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Combo</span>
              <span className={`font-mono text-sm font-black flex items-center gap-1 ${combo > 2 ? 'text-amber-400' : 'text-slate-300'}`}>
                {combo > 2 && <Flame size={14} className="text-orange-500 animate-pulse" />}
                x{combo}
              </span>
            </div>
          </div>

          {/* Right: Sound, Switch Mode & Fullscreen */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="grid h-9 w-9 place-items-center rounded-xl bg-slate-800 text-slate-400 transition-colors hover:text-white"
              title={soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
            >
              {soundEnabled ? <Volume2 size={16} className="text-emerald-400" /> : <VolumeX size={16} />}
            </button>
            <button
              type="button"
              onClick={() => setPlayMode(playMode === 'focus' ? 'grid' : 'focus')}
              className="hidden sm:grid h-9 w-9 place-items-center rounded-xl bg-slate-800 text-slate-400 transition-colors hover:text-white"
              title="Đổi chế độ (Focus / Grid)"
            >
              {playMode === 'focus' ? <Layers size={16} /> : <Zap size={16} />}
            </button>
            <button
              type="button"
              onClick={toggleFullscreen}
              className="grid h-9 w-9 place-items-center rounded-xl bg-slate-800 text-slate-400 transition-colors hover:text-white"
              title={isFullscreen ? 'Thu nhỏ cửa sổ' : 'Toàn màn hình (F11)'}
            >
              {isFullscreen ? <Minimize size={16} className="text-cyan-400" /> : <Maximize size={16} />}
            </button>
          </div>
        </header>

        {/* PROGRESS TRACKER LINE */}
        <div className="h-1 w-full bg-slate-800/80">
          <div 
            className={`h-full transition-all duration-200 ${
              isHira 
                ? 'bg-gradient-to-r from-rose-500 to-amber-400 shadow-[0_0_12px_rgba(244,63,94,0.8)]' 
                : 'bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_12px_rgba(6,182,212,0.8)]'
            }`}
            style={{ width: `${((currentIndex) / total) * 100}%` }}
          />
        </div>

        {/* ========================================================================= */}
        {/* SUB-VIEW A: FOCUS FLOW MODE (MONKEYTYPE STYLE) */}
        {/* ========================================================================= */}
        {playMode === 'focus' ? (
          <div className="relative flex flex-1 flex-col items-center justify-center p-6 overflow-hidden">
            {/* MAIN CHARACTER STAGE */}
            <div className="relative flex flex-col items-center">
              {/* Combo Pop Indicator */}
              <AnimatePresence>
                {combo >= 5 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: -10, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute -top-12 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-1 text-xs font-black uppercase tracking-wider text-black shadow-lg shadow-orange-500/30"
                  >
                    <Flame size={14} fill="currentColor" />
                    <span>{combo >= 15 ? 'GODLIKE! 🔥' : combo >= 10 ? 'ON FIRE! ⚡' : 'STREAK! 💥'}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Central Floating Kana Card */}
              <motion.div
                key={shakeKey}
                animate={status === 'wrong' ? { x: [-10, 10, -10, 10, 0] } : {}}
                transition={{ duration: 0.3 }}
                className={`relative flex h-52 w-52 sm:h-64 sm:w-64 flex-col items-center justify-center rounded-[2.5rem] border-2 bg-slate-900/90 p-6 shadow-2xl backdrop-blur-xl transition-all duration-300 ${
                  status === 'correct' 
                    ? 'border-emerald-400 shadow-[0_0_50px_rgba(52,211,153,0.3)]' 
                    : status === 'wrong'
                    ? 'border-rose-500 shadow-[0_0_50px_rgba(244,63,94,0.3)]'
                    : themeBorder
                }`}
              >
                {/* Character number badge */}
                <span className="absolute top-4 left-5 font-mono text-xs font-bold text-slate-400">
                  #{currentIndex + 1}
                </span>

                {/* Pronunciation Mnemonic hint */}
                {currentChar.mnemonic && (
                  <span className="absolute top-4 right-5 text-slate-400" title={currentChar.mnemonic}>
                    <HelpCircle size={14} />
                  </span>
                )}

                {/* GIANT KANA GLYPH */}
                <span className={`font-jp text-7xl sm:text-8xl font-black transition-colors ${
                  status === 'correct' 
                    ? 'text-emerald-400' 
                    : status === 'wrong' 
                    ? 'text-rose-400' 
                    : 'text-white'
                }`}>
                  {currentChar.jp}
                </span>

                {/* Subtitle / Romaji Revealed on Mistake */}
                {status === 'wrong' && (
                  <div className="absolute bottom-4 flex items-center gap-1 text-xs font-black text-rose-400">
                    <span>Đ.án:</span>
                    <span className="font-mono uppercase text-sm underline">{currentChar.r}</span>
                  </div>
                )}
              </motion.div>

              {/* INPUT BOX */}
              <div className="mt-8 relative w-64 sm:w-80">
                <input
                  ref={focusInputRef}
                  type="text"
                  value={currentInput}
                  onChange={handleFocusInputChange}
                  onKeyDown={handleFocusKeyDown}
                  placeholder="Gõ Romaji..."
                  autoComplete="off"
                  spellCheck="false"
                  className={`w-full rounded-2xl border-2 bg-slate-900/90 py-3.5 text-center font-mono text-xl font-black text-white outline-none shadow-xl transition-all placeholder:text-slate-500 ${
                    status === 'correct'
                      ? 'border-emerald-400 shadow-emerald-500/20'
                      : status === 'wrong'
                      ? 'border-rose-500 shadow-rose-500/20'
                      : isHira 
                      ? 'border-rose-500/60 focus:border-rose-400 focus:shadow-[0_0_25px_rgba(244,63,94,0.35)]' 
                      : 'border-cyan-500/60 focus:border-cyan-400 focus:shadow-[0_0_25px_rgba(6,182,212,0.35)]'
                  }`}
                />
                <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <Keyboard size={18} />
                </div>
              </div>
            </div>

            {/* UPCOMING KANA CONVEYOR BELT */}
            <div className="mt-12 flex flex-col items-center">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2.5">
                Các chữ kế tiếp
              </span>
              <div className="flex items-center gap-3">
                {upcomingChars.map((item, idx) => (
                  <div 
                    key={idx}
                    className="flex h-14 w-14 flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/50 font-jp text-lg font-bold text-slate-400 opacity-60 transition-all hover:opacity-100"
                  >
                    <span>{item.jp}</span>
                  </div>
                ))}
                {upcomingChars.length === 0 && (
                  <span className="text-xs font-bold text-emerald-400">Sắp hoàn thành rồi! 🎉</span>
                )}
              </div>
            </div>

            {/* Bottom Keyboard Hint */}
            <div className="absolute bottom-4 flex items-center gap-4 text-[11px] font-bold text-slate-400">
              <span>Bấm <kbd className="rounded bg-slate-800 px-1.5 py-0.5 text-slate-300">Enter</kbd> để kiểm tra</span>
              <span>•</span>
              <span>Bấm <kbd className="rounded bg-slate-800 px-1.5 py-0.5 text-slate-300">ESC</kbd> để thoát</span>
            </div>
          </div>
        ) : (
          /* ========================================================================= */
          /* SUB-VIEW B: GRID ARENA MODE (ISOMETRIC MATRIX) */
          /* ========================================================================= */
          <div className="smooth-scroll-area flex-1 overflow-y-auto p-6 md:p-8">
            <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3.5 pb-20 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 md:gap-4">
              {chars.map((char: any, idx: number) => {
                const isCurrent = idx === currentIndex;
                const cStatus = charStatus[idx] || (isCurrent ? status : null);
                const val = answers[idx] || '';

                let cardBorder = 'border-slate-800 bg-slate-900/70 hover:border-slate-700';
                if (cStatus === 'correct') cardBorder = 'border-emerald-500/80 bg-emerald-950/20 shadow-emerald-500/10';
                else if (cStatus === 'wrong') cardBorder = 'border-rose-500/80 bg-rose-950/20 shadow-rose-500/10';
                else if (isCurrent) cardBorder = isHira ? 'border-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.3)] ring-2 ring-rose-400/40 bg-slate-900' : 'border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)] ring-2 ring-cyan-400/40 bg-slate-900';

                return (
                  <div
                    key={idx}
                    onClick={() => { if (charStatus[idx] === null) { setCurrentIndex(idx); setStatus('idle'); } }}
                    className={`relative flex flex-col justify-between overflow-hidden rounded-2xl border-2 p-3.5 transition-all ${cardBorder} ${isCurrent ? 'scale-[1.03]' : 'opacity-90'}`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono font-bold text-slate-400">
                      <span>#{idx + 1}</span>
                      {cStatus === 'correct' && <Check size={13} className="text-emerald-400" strokeWidth={3} />}
                      {cStatus === 'wrong' && <X size={13} className="text-rose-400" strokeWidth={3} />}
                    </div>

                    <div className="my-2 flex min-h-[50px] items-center justify-center">
                      <span className={`font-jp text-3xl font-black ${
                        cStatus === 'correct' ? 'text-emerald-400' : cStatus === 'wrong' ? 'text-rose-400' : 'text-white'
                      }`}>
                        {char.jp}
                      </span>
                    </div>

                    <input
                      ref={isCurrent ? gridInputRef : null}
                      type="text"
                      value={cStatus === 'correct' ? char.r : val}
                      disabled={charStatus[idx] !== null}
                      onChange={(e) => handleGridInputChange(idx, e.target.value)}
                      onKeyDown={(e) => handleGridKeyDown(e, idx)}
                      placeholder="..."
                      autoComplete="off"
                      spellCheck="false"
                      className={`w-full rounded-xl border py-1 text-center font-mono text-xs font-black outline-none transition-all ${
                        cStatus === 'correct' ? 'border-emerald-800 bg-slate-900 text-emerald-400' :
                        cStatus === 'wrong' ? 'border-rose-800 bg-slate-900 text-rose-400' :
                        isCurrent ? 'border-blue-400 bg-slate-900 text-white focus:border-blue-300' :
                        'border-slate-800 bg-slate-950 text-slate-400'
                      }`}
                    />

                    {cStatus === 'wrong' && (
                      <span className="mt-1 text-center font-mono text-[10px] font-black uppercase text-rose-400">
                        {char.r}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>,
      document.body
    );
  }

  // =========================================================================
  // VIEW 3: RESULT / VICTORY DASHBOARD (BẢNG TỔNG KẾT ĐẲNG CẤP)
  // =========================================================================
  if (gameState === 'result') {
    const timeSpent = endTime > 0 ? endTime - startTime : 0;
    const wrongChars = chars.map((c, idx) => ({ ...c, typed: answers[idx] })).filter((_, idx) => charStatus[idx] === 'wrong');

    // Rank evaluation
    let rank = 'B';
    let rankColor = 'from-blue-500 to-indigo-600 text-white';
    if (accuracy >= 98 && currentKpm >= 45) {
      rank = 'SSS';
      rankColor = 'from-amber-400 via-orange-500 to-rose-500 text-black shadow-orange-500/50';
    } else if (accuracy >= 95) {
      rank = 'SS';
      rankColor = 'from-amber-400 to-amber-600 text-black shadow-amber-500/40';
    } else if (accuracy >= 90) {
      rank = 'S';
      rankColor = 'from-emerald-400 to-teal-600 text-white shadow-emerald-500/30';
    } else if (accuracy >= 80) {
      rank = 'A';
      rankColor = 'from-blue-500 to-cyan-500 text-white shadow-blue-500/30';
    }

    return createPortal(
      <div className="fixed inset-0 z-[99999] flex items-center justify-center overflow-y-auto bg-slate-950/80 p-4 backdrop-blur-md">
        <Confetti />

        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ ease: [0.23, 1, 0.32, 1], duration: 0.4 }}
          className="relative w-full max-w-xl overflow-hidden rounded-[2.5rem] border border-slate-800 bg-slate-900 p-6 text-center shadow-2xl md:p-8 text-white"
        >
          {/* Top Theme Accent Line */}
          <div className={`absolute inset-x-0 top-0 h-2 bg-gradient-to-r ${
            isHira ? 'from-rose-500 via-pink-400 to-amber-400' : 'from-cyan-400 via-blue-500 to-indigo-500'
          }`} />

          {/* Rank Medal */}
          <div className="relative mx-auto mb-4 mt-2 flex flex-col items-center">
            <div className={`grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br ${rankColor} shadow-2xl font-black text-3xl tracking-tighter`}>
              {rank}
            </div>
            <span className="mt-2 text-xs font-black uppercase tracking-[0.2em] text-slate-400">
              ĐÁNH GIÁ CẤP ĐỘ
            </span>
          </div>

          <h2 className="text-2xl font-black uppercase tracking-wide text-white md:text-3xl">
            Hoàn Thành Bài Gõ!
          </h2>
          <p className="mt-1 text-xs font-semibold text-slate-400">
            {accuracy === 100 ? 'Tuyệt đỉnh! Bạn không phạm một lỗi sai nào 🎯' : 'Phản xạ rất tốt! Hãy tiếp tục rèn luyện để đạt cấp SSS.'}
          </p>

          {/* 4 Key Metrics Cards */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {/* Speed KPM */}
            <div className="flex flex-col items-center rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
              <Gauge size={18} className="mb-1 text-cyan-400" />
              <span className="text-[10px] font-black uppercase text-slate-400">Tốc độ</span>
              <span className="font-mono text-lg font-black text-cyan-400">{currentKpm} <span className="text-xs font-normal">KPM</span></span>
            </div>

            {/* Accuracy */}
            <div className="flex flex-col items-center rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
              <Target size={18} className="mb-1 text-emerald-400" />
              <span className="text-[10px] font-black uppercase text-slate-400">Chính xác</span>
              <span className="font-mono text-lg font-black text-emerald-400">{accuracy}%</span>
            </div>

            {/* Max Combo */}
            <div className="flex flex-col items-center rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
              <Flame size={18} className="mb-1 text-amber-400" />
              <span className="text-[10px] font-black uppercase text-slate-400">Max Combo</span>
              <span className="font-mono text-lg font-black text-amber-400">x{maxCombo}</span>
            </div>

            {/* Time Taken */}
            <div className="flex flex-col items-center rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
              <Timer size={18} className="mb-1 text-indigo-400" />
              <span className="text-[10px] font-black uppercase text-slate-400">Thời gian</span>
              <span className="font-mono text-lg font-black text-indigo-400">{formatTime(timeSpent)}</span>
            </div>
          </div>

          {/* Mistake Intelligence Review */}
          {wrongChars.length > 0 && (
            <div className="mt-5 rounded-2xl border border-rose-900/40 bg-rose-950/20 p-4 text-left">
              <p className="mb-2 text-[10px] font-black uppercase tracking-wider text-rose-400 flex items-center justify-between">
                <span>Danh sách chữ bị gõ sai ({wrongChars.length}):</span>
                <span className="text-slate-400 font-normal">Cần chú ý ôn tập</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {wrongChars.map((c: any, i: number) => (
                  <div key={i} className="flex items-center gap-2 rounded-xl border border-rose-900/50 bg-slate-900 px-2.5 py-1 shadow-sm">
                    <span className="font-jp text-sm font-black text-rose-400">{c.jp}</span>
                    <span className="text-[10px] text-slate-500">→</span>
                    <span className="font-mono text-xs font-black uppercase text-emerald-400">{c.r}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Hub Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={exitTypingToSelection}
              className="flex-1 rounded-2xl border border-slate-700 bg-slate-800 py-3.5 text-xs font-black text-slate-200 shadow-sm transition-all hover:bg-slate-700 hover:text-white"
            >
              Chọn bài tập khác
            </button>

            {wrongChars.length > 0 && (
              <button
                type="button"
                onClick={() => startTyping(system!, activeGroups, wrongChars)}
                className="flex-1 rounded-2xl border border-rose-500/50 bg-rose-950/50 py-3.5 text-xs font-black text-rose-300 shadow-lg shadow-rose-950/30 transition-all hover:bg-rose-900/60"
              >
                Chỉ luyện chữ sai ({wrongChars.length})
              </button>
            )}

            <button
              type="button"
              onClick={() => startTyping(system!, activeGroups)}
              className={`flex-1 rounded-2xl py-3.5 text-xs font-black text-white shadow-lg transition-all ${
                isHira 
                  ? 'bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 shadow-rose-500/30' 
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-cyan-500/30'
              }`}
            >
              Gõ lại bài này
            </button>
          </div>
        </motion.div>
      </div>,
      document.body
    );
  }

  return null;
};
