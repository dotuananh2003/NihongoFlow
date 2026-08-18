import { useState, useMemo, useEffect, useRef, type ComponentType, type ReactNode } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  AlertCircle,
  ArrowLeft,
  BookOpen,
  BookmarkPlus,
  Check,
  ChevronDown,
  Edit3,
  Layers,
  Lightbulb,
  Loader2,
  MessageCircleQuestion,
  Play,
  Search,
  Sparkles,
  Volume2,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { grammarCourses, type GrammarExample, type RelatedGrammar } from '../../data/grammarData';
import { vocabularyData, type VocabItem } from '../../data/vocabularyData';
import { GrammarExercise } from '../../components/Grammar/GrammarExercise';

type AppVoice =
  | { type: 'os'; voice: SpeechSynthesisVoice }
  | { type: 'voicevox'; id: number; name: string };

type ParsedBlock = {
  text: string;
  type: 'kana' | 'kanji' | 'mixed';
  reading?: string;
};

type RenderBlock = ParsedBlock & {
  color?: string;
};

type ParsedExample = GrammarExample & {
  parsed: ParsedBlock[];
};

type ParsedRelatedGrammar = RelatedGrammar & {
  parsed: ParsedBlock[];
};

type SectionPanelProps = {
  title: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  accent: 'violet' | 'blue' | 'emerald' | 'amber' | 'rose' | 'indigo';
  children: ReactNode;
  highlight?: boolean;
};

const VOICEVOX_CHARACTERS = [
  { id: 3, name: 'Zundamon (Nữ - Đáng yêu)' },
  { id: 2, name: 'Shikoku Metan (Nữ - Truyền cảm)' },
  { id: 8, name: 'Kasukabe Tsumugi (Nữ - Trầm ấm)' },
  { id: 11, name: 'Kurono Takehiro (Nam - Trầm)' },
  { id: 1, name: 'Tsukuyomi Shouta (Nam - Bé trai)' },
];

const PARSE_COLORS = [
  'text-pink-500',
  'text-emerald-500',
  'text-amber-500',
  'text-indigo-500',
  'text-cyan-500',
  'text-rose-500',
  'text-violet-500',
];

const sectionThemes = {
  violet: {
    panel: 'border-violet-100 bg-gradient-to-br from-white via-white to-violet-50/80 dark:border-violet-500/20 dark:from-slate-900 dark:via-slate-900 dark:to-violet-500/10',
    icon: 'bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300',
    label: 'text-violet-600 dark:text-violet-300',
    strip: 'from-violet-500 to-fuchsia-400',
  },
  blue: {
    panel: 'border-blue-100 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 text-white dark:border-blue-500/30',
    icon: 'bg-white/15 text-white',
    label: 'text-blue-100',
    strip: 'from-white/60 to-cyan-100/60',
  },
  emerald: {
    panel: 'border-emerald-100 bg-gradient-to-br from-white via-white to-emerald-50/80 dark:border-emerald-500/20 dark:from-slate-900 dark:via-slate-900 dark:to-emerald-500/10',
    icon: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300',
    label: 'text-emerald-600 dark:text-emerald-300',
    strip: 'from-emerald-500 to-teal-400',
  },
  amber: {
    panel: 'border-amber-100 bg-gradient-to-br from-white via-white to-amber-50/90 dark:border-amber-500/20 dark:from-slate-900 dark:via-slate-900 dark:to-amber-500/10',
    icon: 'bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300',
    label: 'text-amber-600 dark:text-amber-300',
    strip: 'from-amber-400 to-orange-400',
  },
  rose: {
    panel: 'border-rose-100 bg-gradient-to-br from-rose-50 via-white to-orange-50/80 dark:border-rose-500/20 dark:from-rose-500/10 dark:via-slate-900 dark:to-orange-500/10',
    icon: 'bg-white/75 text-rose-600 dark:bg-slate-900/60 dark:text-rose-300',
    label: 'text-rose-600 dark:text-rose-300',
    strip: 'from-rose-500 to-orange-400',
  },
  indigo: {
    panel: 'border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-violet-50/90 dark:border-indigo-500/20 dark:from-indigo-500/10 dark:via-slate-900 dark:to-violet-500/10',
    icon: 'bg-white/75 text-indigo-600 dark:bg-slate-900/60 dark:text-indigo-300',
    label: 'text-indigo-600 dark:text-indigo-300',
    strip: 'from-indigo-500 to-violet-400',
  },
};

function parseKanjiReading(japanese: string, reading?: string): ParsedBlock[] {
  if (!reading || japanese === reading) return [{ text: japanese, type: 'kana' }];

  const kanjiRegex = /([\u4E00-\u9FAF]+)/g;
  const parts = japanese.split(kanjiRegex);
  if (parts.length === 1) return [{ text: japanese, type: 'kana' }];

  let regexStr = '^';
  parts.forEach((part, index) => {
    if (index % 2 === 0) {
      regexStr += part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    } else {
      regexStr += '(.*?)';
    }
  });
  regexStr += '$';

  try {
    const match = reading.match(new RegExp(regexStr));
    if (!match) return [{ text: japanese, type: 'mixed', reading }];

    const result: ParsedBlock[] = [];
    parts.forEach((part, index) => {
      if (index % 2 === 0) {
        if (part) result.push({ text: part, type: 'kana' });
      } else {
        result.push({ text: part, type: 'kanji', reading: match[(index + 1) / 2] });
      }
    });
    return result;
  } catch {
    return [{ text: japanese, type: 'mixed', reading }];
  }
}

function colorizeBlocks(parsed: ParsedBlock[]): RenderBlock[] {
  let colorIndex = 0;
  return parsed.map((item) => {
    if (item.type !== 'kanji') return item;
    const color = PARSE_COLORS[colorIndex % PARSE_COLORS.length];
    colorIndex += 1;
    return { ...item, color };
  });
}

function SectionPanel({ title, icon: Icon, accent, children, highlight = false }: SectionPanelProps) {
  const theme = sectionThemes[accent];

  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
      className={`relative overflow-hidden rounded-[1.5rem] border p-4 shadow-[0_10px_28px_rgba(15,23,42,0.07)] md:p-5 ${theme.panel}`}
    >
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${theme.strip}`} />
      {highlight && (
        <div className="pointer-events-none absolute right-4 bottom-2 font-jp text-[92px] font-black leading-none text-white/10">
          文
        </div>
      )}
      <div className={`relative mb-4 flex items-center gap-2.5 text-[11px] font-black uppercase tracking-widest ${theme.label}`}>
        <span className={`flex h-8 w-8 items-center justify-center rounded-xl ${theme.icon}`}>
          <Icon size={15} />
        </span>
        {title}
      </div>
      <div className="relative">{children}</div>
    </motion.section>
  );
}

export const GrammarPointDetail = () => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<AppVoice | null>(null);
  const [isVoiceMenuOpen, setIsVoiceMenuOpen] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [isExerciseOpen, setIsExerciseOpen] = useState(false);
  const voiceMenuRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { courseId, lessonId, pointId } = useParams();
  const navigate = useNavigate();

  const course = grammarCourses.find(c => c.id === courseId);
  const lesson = course?.lessons.find(l => l.id === lessonId);
  const point = lesson?.grammarPoints.find(p => p.id === pointId);

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      const jaVoices = voices.filter(voice => voice.lang.includes('ja'));
      setAvailableVoices(jaVoices);

      if (jaVoices.length > 0) {
        setSelectedVoice(prev => {
          if (prev) return prev;
          const defaultOs =
            jaVoices.find(voice => voice.name.toLowerCase().includes('haruka') || voice.name.toLowerCase().includes('kyoko')) ||
            jaVoices[0];
          return { type: 'os', voice: defaultOs };
        });
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
      window.speechSynthesis.cancel();
      audioRef.current?.pause();
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (voiceMenuRef.current && !voiceMenuRef.current.contains(event.target as Node)) {
        setIsVoiceMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const vocabList = useMemo<VocabItem[]>(() => {
    if (!lessonId) return [];
    const lessonNum = lessonId.replace('lesson-', '');
    const combinedVocab = Object.entries(vocabularyData).flatMap(([key, words]) => (
      key.startsWith(`${lessonNum}-`) ? words : []
    ));
    return combinedVocab.length > 0 ? combinedVocab : (vocabularyData['4-1'] || []);
  }, [lessonId]);

  const handleSpeak = async (text: string, rate: number = 0.85, id: string) => {
    window.speechSynthesis.cancel();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    if (selectedVoice?.type === 'voicevox') {
      setIsLoadingAudio(true);
      setPlayingId(id);

      try {
        const speed = rate < 0.5 ? 0.7 : 1.0;
        const res = await fetch(`https://api.tts.quest/v3/voicevox/synthesis?text=${encodeURIComponent(text)}&speaker=${selectedVoice.id}&speedScale=${speed}`);
        const data: { success?: boolean; audioStatusUrl?: string; mp3DownloadUrl?: string } = await res.json();

        if (!data.success || !data.audioStatusUrl) {
          setIsLoadingAudio(false);
          setPlayingId(null);
          return;
        }

        let isReady = false;
        let attempts = 0;
        while (!isReady && attempts < 30) {
          await new Promise(resolve => setTimeout(resolve, 500));
          try {
            const statusRes = await fetch(data.audioStatusUrl);
            const statusData: { isAudioReady?: boolean; isAudioError?: boolean } = await statusRes.json();
            if (statusData.isAudioReady) isReady = true;
            if (statusData.isAudioError) throw new Error('Voicevox API Error');
          } catch {
            // Keep polling while the generated file is not ready yet.
          }
          attempts += 1;
        }

        if (isReady && data.mp3DownloadUrl) {
          const audio = new Audio(data.mp3DownloadUrl);
          audioRef.current = audio;
          audio.onplay = () => setIsLoadingAudio(false);
          audio.onended = () => {
            setPlayingId(null);
            setIsLoadingAudio(false);
          };
          audio.onerror = () => {
            setPlayingId(null);
            setIsLoadingAudio(false);
          };
          audio.play().catch(() => {
            setPlayingId(null);
            setIsLoadingAudio(false);
          });
        } else {
          setIsLoadingAudio(false);
          setPlayingId(null);
        }
      } catch {
        setIsLoadingAudio(false);
        setPlayingId(null);
      }
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.rate = rate;
    if (selectedVoice?.type === 'os') utterance.voice = selectedVoice.voice;
    utterance.onstart = () => setPlayingId(id);
    utterance.onend = () => setPlayingId(null);
    utterance.onerror = () => setPlayingId(null);
    window.speechSynthesis.speak(utterance);
  };

  const colorizeGrammarTitle = (text: string) => {
    if (!text) return text;
    const regex = /(N[1-3]?|A[いな]?|V)/g;
    return text.split(regex).map((part, index) => {
      if (/^N[1-3]?$/.test(part)) return <span key={index} className="px-[2px] font-sans text-blue-500 dark:text-blue-400">{part}</span>;
      if (/^A[いな]?$/.test(part)) return <span key={index} className="px-[2px] font-sans text-orange-500 dark:text-orange-400">{part}</span>;
      if (part === 'V') return <span key={index} className="px-[2px] font-sans text-emerald-500 dark:text-emerald-400">{part}</span>;
      return part;
    });
  };

  const renderStructure = (structure?: ReactNode | string) => {
    if (!structure) return null;
    if (typeof structure !== 'string') return structure;

    return structure.split(' ').map((part, index) => {
      const clean = part.replace(/\[|\]/g, '');
      if (/^N[1-3]?$/.test(clean)) {
        return <span key={index} className="mx-0.5 rounded-lg bg-blue-100 px-2 py-0.5 font-sans text-base font-black text-blue-600 dark:bg-blue-500/15 dark:text-blue-300">{clean}</span>;
      }
      if (/^A[いな]?$/.test(clean)) {
        return <span key={index} className="mx-0.5 rounded-lg bg-orange-100 px-2 py-0.5 font-sans text-base font-black text-orange-600 dark:bg-orange-500/15 dark:text-orange-300">{clean}</span>;
      }
      if (clean === 'V') {
        return <span key={index} className="mx-0.5 rounded-lg bg-emerald-100 px-2 py-0.5 font-sans text-base font-black text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300">V</span>;
      }
      return <span key={index} className="mx-0.5">{part}</span>;
    });
  };

  const renderParsedSentence = (blocks: RenderBlock[], className: string) => (
    <div className={className}>
      {blocks.map((item, index) => (
        item.type === 'kanji'
          ? <span key={index} className={item.color}>{item.text}</span>
          : <span key={index}>{item.text}</span>
      ))}
    </div>
  );

  const renderParsedReading = (blocks: RenderBlock[], fallback: string) => {
    if (blocks.length === 1 && blocks[0].type === 'mixed') return fallback;

    return blocks.map((item, index) => (
      item.type === 'kanji'
        ? <span key={index} className={item.color}>{item.reading}</span>
        : <span key={index}>{item.text}</span>
    ));
  };

  if (!course || !lesson || !point) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-slate-500">
        <p>Không tìm thấy mẫu ngữ pháp</p>
        <button onClick={() => navigate(-1)} className="mt-4 flex items-center gap-2 font-bold text-blue-500 hover:underline">
          <ArrowLeft size={16} /> Quay lại
        </button>
      </div>
    );
  }

  const lessonNumber = lesson.id.replace('lesson-', '');
  const parsedExamples: ParsedExample[] = point.examples.map(example => ({
    ...example,
    parsed: parseKanjiReading(example.japanese, example.reading || example.japanese),
  }));
  const parsedRelatedGrammars: ParsedRelatedGrammar[] = (point.relatedGrammars || []).map(related => ({
    ...related,
    parsed: parseKanjiReading(related.example.japanese, related.example.reading || related.example.japanese),
  }));
  const selectedVoiceName = selectedVoice
    ? selectedVoice.type === 'voicevox'
      ? selectedVoice.name
      : selectedVoice.voice.name
    : 'Chọn giọng đọc';

  return (
    <div className="relative mx-auto min-h-[calc(100vh-80px)] max-w-[1080px] px-4 pb-16 pt-5 md:px-6">
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
        className="relative mb-6 overflow-hidden rounded-[2rem] border border-white/80 bg-white/80 shadow-[0_16px_48px_rgba(15,23,42,0.10)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/70"
      >
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400" />
        <div className="absolute right-6 top-6 font-jp text-[112px] font-black leading-none text-blue-100/70 dark:text-blue-500/10">
          文
        </div>

        <div className="relative grid gap-5 p-5 lg:grid-cols-[minmax(0,1fr)_280px] lg:p-6">
          <div className="min-w-0">
            <button
              onClick={() => navigate(`/grammar/${course.id}/lesson/${lesson.id}`)}
              className="mb-4 flex w-fit items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-sm font-black text-blue-600 transition-colors hover:bg-blue-100 dark:bg-blue-500/10 dark:text-blue-300 dark:hover:bg-blue-500/15"
            >
              <ArrowLeft size={16} /> {course.id.toUpperCase()} - Bài {lessonNumber}
            </button>

            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-slate-900 px-3 py-1 text-[11px] font-black uppercase tracking-widest text-white shadow-sm dark:bg-white dark:text-slate-900">
                {point.jlpt}
              </span>
              <span className="rounded-full bg-white px-3 py-1 text-[11px] font-black uppercase tracking-widest text-slate-500 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:ring-slate-800">
                {point.type}
              </span>
              <span className="rounded-full bg-amber-50 px-3 py-1 text-[11px] font-black uppercase tracking-widest text-amber-600 ring-1 ring-amber-100 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/20">
                {point.difficulty}
              </span>
            </div>

            <h1 className="mb-2 font-jp text-3xl font-black tracking-normal text-slate-900 dark:text-slate-50 md:text-4xl">
              {colorizeGrammarTitle(point.title)}
            </h1>
            <p className="max-w-2xl text-base font-extrabold leading-7 text-slate-600 dark:text-slate-300 md:text-lg">
              {point.explanationTitle || point.meaning}
            </p>
          </div>

          <div className="flex flex-col justify-end gap-3">
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-xl border border-blue-100 bg-blue-50/85 p-2.5 text-center dark:border-blue-500/20 dark:bg-blue-500/10">
                <p className="text-xl font-black text-blue-600 dark:text-blue-300">{point.examples.length}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Ví dụ</p>
              </div>
              <div className="rounded-xl border border-emerald-100 bg-emerald-50/85 p-2.5 text-center dark:border-emerald-500/20 dark:bg-emerald-500/10">
                <p className="text-xl font-black text-emerald-600 dark:text-emerald-300">{parsedRelatedGrammars.length}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Liên quan</p>
              </div>
              <div className="rounded-xl border border-amber-100 bg-amber-50/85 p-2.5 text-center dark:border-amber-500/20 dark:bg-amber-500/10">
                <p className="text-xl font-black text-amber-600 dark:text-amber-300">{point.qa?.length || 0}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Q&A</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <button className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-black text-slate-700 shadow-sm transition-colors hover:bg-blue-50 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-blue-500/10 dark:hover:text-blue-300">
                <BookmarkPlus size={18} /> Thêm vào ghi nhớ
              </button>
              <button
                onClick={() => setIsExerciseOpen(true)}
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2.5 text-sm font-black text-white shadow-lg shadow-blue-500/20 transition-colors hover:from-blue-700 hover:to-cyan-600"
              >
                <Edit3 size={18} /> Làm bài tập
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="mb-6 grid grid-cols-2 gap-2.5 md:grid-cols-4">
        {[
          { label: 'Cấu trúc', icon: Layers, href: '#structure', color: 'text-violet-600 bg-violet-50 border-violet-100 dark:bg-violet-500/10 dark:border-violet-500/20 dark:text-violet-300' },
          { label: 'Cách dùng', icon: Sparkles, href: '#usage', color: 'text-emerald-600 bg-emerald-50 border-emerald-100 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-300' },
          { label: 'Vấn đáp', icon: MessageCircleQuestion, href: '#qa', color: 'text-cyan-600 bg-cyan-50 border-cyan-100 dark:bg-cyan-500/10 dark:border-cyan-500/20 dark:text-cyan-300' },
          { label: 'Ví dụ', icon: BookOpen, href: '#examples', color: 'text-blue-600 bg-blue-50 border-blue-100 dark:bg-blue-500/10 dark:border-blue-500/20 dark:text-blue-300' },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.label}
              href={item.href}
              className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-black shadow-sm transition-all hover:-translate-y-0.5 ${item.color}`}
            >
              <Icon size={17} />
              {item.label}
            </a>
          );
        })}
      </div>

      <section id="structure" className="mb-8 grid grid-cols-1 gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <SectionPanel title="Cấu trúc" icon={Layers} accent="violet">
          <div className="mb-4 rounded-2xl border border-violet-100 bg-white/80 p-4 font-jp text-2xl font-black leading-snug text-slate-900 shadow-sm dark:border-violet-500/20 dark:bg-slate-950/45 dark:text-slate-100 md:text-3xl">
            {renderStructure(point.structure)}
          </div>
          <p className="text-sm font-bold leading-7 text-slate-600 dark:text-slate-300">
            {point.structureDetails || 'Danh từ + は + Tính từ + です'}
          </p>
        </SectionPanel>

        <SectionPanel title="Giải nghĩa" icon={BookOpen} accent="blue" highlight>
          <h2 className="mb-3 text-xl font-black leading-tight text-white">
            {point.explanationTitle || point.meaning}
          </h2>
          <p className="text-sm font-semibold leading-7 text-blue-50/95">
            {point.explanationDetails || point.type}
          </p>
        </SectionPanel>

        <SectionPanel title="Phạm vi sử dụng" icon={Sparkles} accent="emerald">
          <p className="text-sm font-bold leading-7 text-slate-700 dark:text-slate-300">
            {point.usage || 'Sử dụng trong giao tiếp hằng ngày.'}
          </p>
        </SectionPanel>

        <SectionPanel title="Lưu ý" icon={AlertCircle} accent="amber">
          <p className="text-sm font-bold leading-7 text-slate-700 dark:text-slate-300">
            {point.note || 'Không có lưu ý đặc biệt.'}
          </p>
        </SectionPanel>

        <SectionPanel title="Mẹo ghi nhớ" icon={Lightbulb} accent="rose">
          <p className="text-sm font-bold leading-7 text-rose-950 dark:text-rose-100">
            {point.memoryTip || 'Gắn liền mẫu ngữ pháp này với một ví dụ thực tế của bản thân để dễ nhớ hơn nhé!'}
          </p>
        </SectionPanel>

        <SectionPanel title="Dấu hiệu nhận biết & từ đi kèm" icon={Search} accent="indigo">
          <p className="text-sm font-bold leading-7 text-indigo-950 dark:text-indigo-100">
            {point.commonWords || 'Hãy chú ý vị trí của từ khóa trong câu để nhận diện cấu trúc này.'}
          </p>
        </SectionPanel>
      </section>

      {parsedRelatedGrammars.length > 0 && (
        <section className="mb-8" id="related">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="h-8 w-1.5 rounded-full bg-gradient-to-b from-violet-500 to-fuchsia-400" />
              <div>
                <h2 className="text-lg font-black text-slate-900 dark:text-slate-50">Cấu trúc liên quan</h2>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Các mẫu gần nghĩa để so sánh nhanh</p>
              </div>
            </div>
            <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-black text-violet-600 dark:bg-violet-500/10 dark:text-violet-300">
              {parsedRelatedGrammars.length} mẫu
            </span>
          </div>

          <div className="grid gap-4">
            {parsedRelatedGrammars.map((related, index) => {
              const renderBlocks = colorizeBlocks(related.parsed);
              return (
                <motion.div
                  key={`${related.name}-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 28, delay: index * 0.03 }}
                  className="overflow-hidden rounded-2xl border border-violet-100 bg-violet-50/70 shadow-sm dark:border-violet-500/20 dark:bg-violet-500/10"
                >
                  <div className="grid gap-3 p-4 lg:grid-cols-[240px_minmax(0,1fr)]">
                    <div>
                      <h3 className="font-jp text-base font-black text-violet-700 dark:text-violet-300">{colorizeGrammarTitle(related.name)}</h3>
                      <p className="mt-1 text-xs font-bold text-violet-900/70 dark:text-violet-100/80">{related.meaning}</p>
                    </div>
                    <div className="rounded-xl border border-white/80 bg-white/90 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
                      {renderParsedSentence(renderBlocks, 'mb-1 font-jp text-lg font-black text-slate-900 dark:text-slate-50')}
                      <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        {renderParsedReading(renderBlocks, related.example.reading || related.example.japanese)}
                      </div>
                      <p className="mt-2 text-xs font-bold text-slate-600 dark:text-slate-300">{related.example.vietnamese}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      )}

      {point.qa && point.qa.length > 0 && (
        <section className="mb-8" id="qa">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="h-8 w-1.5 rounded-full bg-gradient-to-b from-cyan-500 to-blue-400" />
              <div>
                <h2 className="text-lg font-black text-slate-900 dark:text-slate-50">Vấn đáp</h2>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Mẫu hỏi đáp và tình huống dùng trực tiếp</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {point.qa.map((qaItem, qaIndex) => (
              <motion.article
                key={`${qaItem.questionFormat}-${qaIndex}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 28, delay: qaIndex * 0.04 }}
                className="overflow-hidden rounded-2xl border border-cyan-100 bg-gradient-to-br from-cyan-50 via-white to-blue-50 p-4 shadow-[0_10px_28px_rgba(15,23,42,0.07)] dark:border-cyan-500/20 dark:from-cyan-500/10 dark:via-slate-900 dark:to-blue-500/10"
              >
                <div className="mb-4 grid gap-3 lg:grid-cols-2">
                  <div className="rounded-2xl border border-white/80 bg-white/90 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
                    <div className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-cyan-600 dark:text-cyan-300">
                      <Search size={14} /> Câu hỏi
                    </div>
                    <div className="font-jp text-lg font-black leading-relaxed text-slate-900 dark:text-slate-50">
                      {renderStructure(qaItem.questionFormat)}
                    </div>
                  </div>
                  <div className="rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 p-3 text-white shadow-lg shadow-cyan-500/15">
                    <div className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-cyan-100">
                      <Check size={14} /> Trả lời
                    </div>
                    <div className="font-jp text-lg font-black leading-relaxed">
                      {renderStructure(qaItem.answerFormat)}
                    </div>
                  </div>
                </div>

                <div className="mb-4 grid gap-3 lg:grid-cols-2">
                  <div className="rounded-xl bg-white/75 p-3 dark:bg-slate-900/55">
                    <div className="mb-1 text-xs font-black uppercase tracking-widest text-indigo-500">Dấu hiệu</div>
                    <p className="text-xs font-bold leading-5 text-slate-700 dark:text-slate-300">{qaItem.identifier}</p>
                  </div>
                  <div className="rounded-xl bg-white/75 p-3 dark:bg-slate-900/55">
                    <div className="mb-1 text-xs font-black uppercase tracking-widest text-amber-500">Mẹo trả lời</div>
                    <p className="text-xs font-bold leading-5 text-slate-700 dark:text-slate-300">{qaItem.tip}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {qaItem.examples.map((example, exampleIndex) => {
                    const parts = example.japanese.split('\n');
                    const readingParts = (example.reading || example.japanese).split('\n');
                    const vietnameseParts = example.vietnamese.split('\n');
                    const romajiParts = (example.romaji || '').split('\n');

                    return (
                      <div key={`${example.japanese}-${exampleIndex}`} className="rounded-xl border border-white/80 bg-white/90 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
                        {['Q', 'A'].map((label, partIndex) => {
                          const parsed = parseKanjiReading(parts[partIndex] || '', readingParts[partIndex] || parts[partIndex] || '');
                          const renderBlocks = colorizeBlocks(parsed);
                          return (
                            <div key={label} className={`flex items-start gap-2.5 ${partIndex === 1 ? 'border-t border-slate-100 pt-3 dark:border-slate-800' : 'pb-3'}`}>
                              <span className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-black ${label === 'Q' ? 'bg-slate-100 text-slate-500 dark:bg-slate-800' : 'bg-cyan-100 text-cyan-600 dark:bg-cyan-500/15 dark:text-cyan-300'}`}>
                                {label}
                              </span>
                              <div className="min-w-0 flex-1">
                                {renderParsedSentence(renderBlocks, 'mb-1 font-jp text-base font-black text-slate-900 dark:text-slate-50')}
                                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">{vietnameseParts[partIndex]}</p>
                                {romajiParts[partIndex] && <p className="mt-1 text-xs italic text-slate-400">{romajiParts[partIndex]}</p>}
                              </div>
                              <button
                                onClick={() => handleSpeak(readingParts[partIndex] || parts[partIndex], 0.85, `qa-${qaIndex}-${exampleIndex}-${label}`)}
                                className="rounded-full p-1.5 text-slate-400 transition-colors hover:bg-cyan-50 hover:text-cyan-500 dark:hover:bg-cyan-500/10"
                              >
                                {playingId === `qa-${qaIndex}-${exampleIndex}-${label}` ? <Loader2 size={18} className="animate-spin text-cyan-500" /> : <Volume2 size={18} />}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      )}

      <section className="mb-6" id="examples">
        <div className="relative mb-4 flex items-center justify-between gap-4" ref={voiceMenuRef}>
          <div className="flex items-center gap-3">
            <span className="h-8 w-1.5 rounded-full bg-gradient-to-b from-blue-500 to-cyan-400" />
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-slate-50">Ví dụ</h2>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Nghe phát âm chậm hoặc thường theo từng câu</p>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setIsVoiceMenuOpen(!isVoiceMenuOpen)}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <Volume2 size={16} className="shrink-0 text-purple-500" />
              <span className="max-w-[220px] truncate">{selectedVoiceName}</span>
              <ChevronDown size={14} className={`shrink-0 text-slate-400 transition-transform duration-300 ${isVoiceMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {isVoiceMenuOpen && (
              <div className="absolute right-0 top-full z-50 mt-2 w-[320px] max-w-[90vw] overflow-hidden rounded-2xl border border-slate-100 bg-white py-2 shadow-xl backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800">
                <div className="mb-2 border-b border-slate-100 px-3 pb-2 dark:border-slate-700">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Chọn giọng đọc</p>
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  <div className="border-y border-slate-100 bg-slate-50 px-3 py-1 dark:border-slate-700 dark:bg-slate-900">
                    <p className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                      <Sparkles size={12} className="text-amber-500" />
                      Giọng AI lồng tiếng
                    </p>
                  </div>
                  {VOICEVOX_CHARACTERS.map(character => (
                    <button
                      key={`vv-${character.id}`}
                      onClick={() => {
                        setSelectedVoice({ type: 'voicevox', id: character.id, name: character.name });
                        setIsVoiceMenuOpen(false);
                      }}
                      className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm transition-colors ${
                        selectedVoice?.type === 'voicevox' && selectedVoice.id === character.id
                          ? 'bg-purple-50 font-bold text-purple-600 dark:bg-purple-500/10 dark:text-purple-400'
                          : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700/50'
                      }`}
                    >
                      <span className="truncate pr-4">{character.name}</span>
                      {selectedVoice?.type === 'voicevox' && selectedVoice.id === character.id && <Check size={16} className="shrink-0" />}
                    </button>
                  ))}

                  {availableVoices.length > 0 && (
                    <>
                      <div className="mt-2 border-y border-slate-100 bg-slate-50 px-3 py-1 dark:border-slate-700 dark:bg-slate-900">
                        <p className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                          <Layers size={12} className="text-blue-500" />
                          Giọng hệ điều hành
                        </p>
                      </div>
                      {availableVoices.map(voice => (
                        <button
                          key={`os-${voice.name}`}
                          onClick={() => {
                            setSelectedVoice({ type: 'os', voice });
                            setIsVoiceMenuOpen(false);
                          }}
                          className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm transition-colors ${
                            selectedVoice?.type === 'os' && selectedVoice.voice.name === voice.name
                              ? 'bg-purple-50 font-bold text-purple-600 dark:bg-purple-500/10 dark:text-purple-400'
                              : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700/50'
                          }`}
                        >
                          <span className="truncate pr-4">{voice.name}</span>
                          {selectedVoice?.type === 'os' && selectedVoice.voice.name === voice.name && <Check size={16} className="shrink-0" />}
                        </button>
                      ))}
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-4">
          {parsedExamples.map((example, index) => {
            const renderBlocks = colorizeBlocks(example.parsed);
            const slowId = `${index}-slow`;
            const normalId = `${index}-normal`;

            return (
              <motion.article
                key={`${example.japanese}-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 28, delay: index * 0.025 }}
                className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition-all hover:-translate-y-[2px] hover:shadow-md dark:border-slate-800 dark:bg-slate-900 md:grid-cols-[minmax(0,1fr)_150px] md:p-4"
              >
                <div className="min-w-0">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[9px] font-black text-blue-600 dark:bg-blue-500/10 dark:text-blue-300">
                      EX {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Sentence</span>
                  </div>
                  {renderParsedSentence(renderBlocks, 'mb-1 font-jp text-lg font-black text-slate-900 dark:text-slate-50 md:text-xl')}
                  <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    {renderParsedReading(renderBlocks, example.reading || example.japanese)}
                  </div>
                  {example.romaji && <div className="mt-1 text-xs italic text-slate-400 dark:text-slate-500">{example.romaji}</div>}
                  <p className="mt-3 rounded-xl bg-slate-50 px-3 py-2.5 text-xs font-bold text-slate-600 dark:bg-slate-950/45 dark:text-slate-300">
                    {example.vietnamese}
                  </p>
                </div>

                <div className="flex items-center gap-2 md:flex-col md:items-stretch md:justify-center">
                  <button
                    onClick={() => handleSpeak(example.reading || example.japanese, 0.4, slowId)}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-xl border py-2 text-xs font-black shadow-sm transition-all active:scale-95 ${
                      playingId === slowId
                        ? 'border-blue-600 bg-blue-500 text-white shadow-[0_4px_12px_rgba(59,130,246,0.3)]'
                        : 'border-blue-100 bg-blue-50 text-blue-600 hover:bg-blue-100 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-300'
                    }`}
                  >
                    {playingId === slowId && isLoadingAudio ? <Loader2 size={16} className="animate-spin" /> : <Play size={14} />}
                    {playingId === slowId ? 'Đang phát' : 'Đọc chậm'}
                  </button>
                  <button
                    onClick={() => handleSpeak(example.reading || example.japanese, 0.85, normalId)}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-xl border py-2 text-xs font-black shadow-sm transition-all active:scale-95 ${
                      playingId === normalId
                        ? 'border-cyan-600 bg-cyan-500 text-white shadow-[0_4px_12px_rgba(6,182,212,0.28)]'
                        : 'border-cyan-100 bg-cyan-50 text-cyan-700 hover:bg-cyan-100 dark:border-cyan-500/20 dark:bg-cyan-500/10 dark:text-cyan-300'
                    }`}
                  >
                    {playingId === normalId && isLoadingAudio ? <Loader2 size={16} className="animate-spin" /> : <Volume2 size={14} />}
                    {playingId === normalId ? 'Đang phát' : 'Đọc thường'}
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {isExerciseOpen && (
        <GrammarExercise
          grammarPoint={point}
          vocabList={vocabList}
          lessonName={`Lesson ${lessonNumber}`}
          onClose={() => setIsExerciseOpen(false)}
        />
      )}
    </div>
  );
};
