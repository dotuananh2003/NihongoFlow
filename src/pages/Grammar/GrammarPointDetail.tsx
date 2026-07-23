import { useState, useMemo, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookmarkPlus, Edit3, Volume2, Layers, BookOpen, AlertCircle, Sparkles, Lightbulb, Search, ChevronDown, Check, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { grammarCourses } from '../../data/grammarData';
import { vocabularyData } from '../../data/vocabularyData';
import { GrammarExercise } from '../../components/Grammar/GrammarExercise';

type AppVoice = 
  | { type: 'os'; voice: SpeechSynthesisVoice }
  | { type: 'voicevox'; id: number; name: string };

const VOICEVOX_CHARACTERS = [
  { id: 3, name: 'Zundamon (Nữ - Đáng yêu)' },
  { id: 2, name: 'Shikoku Metan (Nữ - Truyền cảm)' },
  { id: 8, name: 'Kasukabe Tsumugi (Nữ - Trầm ấm)' },
  { id: 11, name: 'Kurono Takehiro (Nam - Trầm)' },
  { id: 1, name: 'Tsukuyomi Shouta (Nam - Bé trai)' }
];

const PARSE_COLORS = [
  'text-pink-500',
  'text-emerald-500',
  'text-amber-500',
  'text-indigo-500',
  'text-cyan-500',
  'text-rose-500',
  'text-violet-500'
];

interface ParsedBlock {
  text: string;
  type: 'kana' | 'kanji' | 'mixed';
  reading?: string;
}

function parseKanjiReading(japanese: string, reading?: string): ParsedBlock[] {
  if (!reading || japanese === reading) return [{ text: japanese, type: 'kana' }];
  const kanjiRegex = /([\u4E00-\u9FAF]+)/g;
  const parts = japanese.split(kanjiRegex);
  if (parts.length === 1) return [{ text: japanese, type: 'kana' }]; 

  let regexStr = '^';
  parts.forEach((part, i) => {
    if (i % 2 === 0) {
      const escaped = part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      regexStr += escaped;
    } else {
      regexStr += '(.*?)';
    }
  });
  regexStr += '$';

  try {
    const readingRegex = new RegExp(regexStr);
    const match = reading.match(readingRegex);

    if (!match) return [{ text: japanese, type: 'mixed', reading }];

    const result: ParsedBlock[] = [];
    parts.forEach((part, i) => {
      if (i % 2 === 0) {
        if (part) result.push({ text: part, type: 'kana' });
      } else {
        const kanjiReading = match[(i + 1) / 2];
        result.push({ text: part, type: 'kanji', reading: kanjiReading });
      }
    });
    return result;
  } catch (e) {
    return [{ text: japanese, type: 'mixed', reading }];
  }
}

export const GrammarPointDetail = () => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<AppVoice | null>(null);
  const [isVoiceMenuOpen, setIsVoiceMenuOpen] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const voiceMenuRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      const jaVoices = voices.filter(v => v.lang.includes('ja'));
      setAvailableVoices(jaVoices);
      if (jaVoices.length > 0) {
        setSelectedVoice(prev => {
          if (prev) return prev;
          const defaultOs = jaVoices.find(v => v.name.toLowerCase().includes('haruka') || v.name.toLowerCase().includes('kyoko')) || jaVoices[0];
          return { type: 'os', voice: defaultOs };
        });
      }
    };
    
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
      window.speechSynthesis.cancel();
      if (audioRef.current) {
        audioRef.current.pause();
      }
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
        const data = await res.json();
        
        if (data.success && data.audioStatusUrl) {
          let isReady = false;
          let attempts = 0;
          
          while (!isReady && attempts < 30) {
            await new Promise(r => setTimeout(r, 500));
            try {
              const statusRes = await fetch(data.audioStatusUrl);
              const statusData = await statusRes.json();
              if (statusData.isAudioReady) {
                isReady = true;
              } else if (statusData.isAudioError) {
                throw new Error("Voicevox API Error");
              }
            } catch (e) {
              // Ignore fetch errors during polling and try again
            }
            attempts++;
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
        } else {
          setIsLoadingAudio(false);
          setPlayingId(null);
        }
      } catch (err) {
        setIsLoadingAudio(false);
        setPlayingId(null);
      }
    } else {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = rate;
      if (selectedVoice && selectedVoice.type === 'os') {
        utterance.voice = selectedVoice.voice;
      }
      
      utterance.onstart = () => setPlayingId(id);
      utterance.onend = () => setPlayingId(null);
      utterance.onerror = () => setPlayingId(null);

      window.speechSynthesis.speak(utterance);
    }
  };

  const { courseId, lessonId, pointId } = useParams();
  const navigate = useNavigate();
  const [isExerciseOpen, setIsExerciseOpen] = useState(false);

  const course = grammarCourses.find(c => c.id === courseId);
  const lesson = course?.lessons.find(l => l.id === lessonId);
  const point = lesson?.grammarPoints.find(p => p.id === pointId);

  // Get vocabulary for this lesson
  const vocabList = useMemo(() => {
    if (!lessonId) return [];
    // Extract lesson number (e.g. 'lesson-4' -> '4')
    const lessonNum = lessonId.replace('lesson-', '');
    // Collect all sub-lessons vocabulary (e.g. '4-1', '4-2', '4-3')
    let combinedVocab: any[] = [];
    Object.keys(vocabularyData).forEach(key => {
      if (key.startsWith(`${lessonNum}-`)) {
        combinedVocab = [...combinedVocab, ...vocabularyData[key]];
      }
    });
    return combinedVocab.length > 0 ? combinedVocab : (vocabularyData['4-1'] || []);
  }, [lessonId]);

  const colorizeGrammarTitle = (text: string) => {
    if (!text) return text;
    const regex = /(N[1-3]?|A[いな]?|V)/g;
    const parts = text.split(regex);
    return parts.map((part, i) => {
      if (/^N[1-3]?$/.test(part)) return <span key={i} className="text-blue-500 dark:text-blue-400 font-sans px-[2px]">{part}</span>;
      if (/^A[いな]?$/.test(part)) return <span key={i} className="text-orange-500 dark:text-orange-400 font-sans px-[2px]">{part}</span>;
      if (part === 'V') return <span key={i} className="text-emerald-500 dark:text-emerald-400 font-sans px-[2px]">{part}</span>;
      return part;
    });
  };

  const renderStructure = (structure?: React.ReactNode | string) => {
    if (!structure) return null;
    if (typeof structure !== 'string') return structure;
    
    return structure.split(' ').map((part, index) => {
      if (/^\[?N[1-3]?\]?$/.test(part)) return <span key={index} className="bg-blue-100 text-blue-600 rounded-lg px-2 py-1 text-xl mx-0.5 font-sans font-black">{part.replace(/\[|\]/g, '')}</span>;
      if (/^\[?A[いな]?\]?$/.test(part)) return <span key={index} className="bg-orange-100 text-orange-600 rounded-lg px-2 py-1 text-xl mx-0.5 font-sans font-black">{part.replace(/\[|\]/g, '')}</span>;
      if (part === 'V' || part === '[V]') return <span key={index} className="bg-emerald-100 text-emerald-600 rounded-lg px-2 py-1 text-xl mx-0.5 font-sans font-black">V</span>;
      return <span key={index} className="mx-0.5">{part}</span>;
    });
  };

  if (!course || !lesson || !point) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-500">
        <p>Không tìm thấy mẫu ngữ pháp</p>
        <button onClick={() => navigate(-1)} className="mt-4 text-blue-500 font-bold flex items-center gap-2 hover:underline">
          <ArrowLeft size={16} /> Quay lại
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[1000px] mx-auto pt-8 pb-20 px-4 md:px-8 relative min-h-[calc(100vh-80px)]">
      
      {/* HEADER */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <button 
            onClick={() => navigate(`/grammar/${course.id}/lesson/${lesson.id}`)}
            className="text-blue-500 font-bold flex items-center gap-2 hover:text-blue-600 transition-colors mb-4"
          >
            <ArrowLeft size={16} /> {course.id.toUpperCase()} - Bài {lesson.id.replace('lesson-', '')}
          </button>
          
          <h1 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-slate-100 tracking-tight font-jp mb-2">
            {colorizeGrammarTitle(point.title)}
          </h1>
          <p className="text-slate-600 dark:text-slate-300 font-medium text-lg inline-block border-b-[3px] border-yellow-400 pb-1">
            {point.explanationTitle || point.meaning}
          </p>
        </div>

        <div className="flex items-center gap-3 w-full lg:w-auto">
          <button className="flex-1 lg:flex-none min-w-[160px] flex items-center justify-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm text-sm whitespace-nowrap">
            <BookmarkPlus size={18} /> Thêm vào ghi nhớ
          </button>
          <button 
            onClick={() => setIsExerciseOpen(true)}
            className="flex-1 lg:flex-none min-w-[160px] flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-sm text-sm whitespace-nowrap"
          >
            <Edit3 size={18} /> Làm bài tập
          </button>
        </div>
      </div>

      {/* GRID DETAILS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        
        {/* CẤU TRÚC */}
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-800 relative">
          <div className="text-xs font-black text-purple-500 dark:text-purple-400 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Layers size={16} /> CẤU TRÚC
          </div>
          
          <div className="text-2xl md:text-3xl font-black text-slate-800 dark:text-slate-100 font-jp mb-6 flex flex-wrap items-center gap-1">
            {renderStructure(point.structure)}
          </div>
          <div className="h-px w-full bg-slate-100 dark:bg-slate-800 mb-6" />
          <div className="text-sm font-bold text-slate-600 dark:text-slate-400">
            {point.structureDetails || 'Danh từ + は + Tính từ + です'}
          </div>
        </div>

        {/* GIẢI NGHĨA */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-[2rem] p-6 md:p-8 shadow-sm relative text-white overflow-hidden">
          {/* Decorative Pattern / Icon */}
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none text-[150px] leading-none translate-x-4 translate-y-8">
            ⛩️
          </div>
          <div className="text-xs font-black text-blue-100 uppercase tracking-widest mb-6 flex items-center gap-2 relative z-10">
            <BookOpen size={16} /> GIẢI NGHĨA
          </div>
          
          <div className="text-xl font-black mb-4">
            {point.explanationTitle || point.meaning}
          </div>
          <div className="text-sm font-medium text-slate-300">
            {point.explanationDetails || point.type}
          </div>
        </div>

        {/* PHẠM VI SỬ DỤNG */}
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-800 relative">
          <div className="text-xs font-black text-emerald-500 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Sparkles size={16} /> PHẠM VI SỬ DỤNG
          </div>
          
          <div className="text-sm font-bold text-slate-700 dark:text-slate-300 leading-relaxed">
            {point.usage || 'Sử dụng trong giao tiếp hàng ngày.'}
          </div>
        </div>

        {/* LƯU Ý */}
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-800 relative">
          <div className="text-xs font-black text-yellow-500 uppercase tracking-widest mb-6 flex items-center gap-2">
            <AlertCircle size={16} /> LƯU Ý
          </div>
          
          <div className="text-sm font-bold text-slate-700 dark:text-slate-300 leading-relaxed">
            {point.note || 'Không có lưu ý đặc biệt.'}
          </div>
        </div>

        {/* MẸO GHI NHỚ */}
        <div className="bg-amber-50 dark:bg-amber-900/10 rounded-[2rem] p-6 md:p-8 shadow-sm border border-amber-100 dark:border-amber-900/30 relative">
          <div className="text-xs font-black text-amber-500 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Lightbulb size={16} /> MẸO GHI NHỚ
          </div>
          
          <div className="text-sm font-bold text-amber-900 dark:text-amber-100 leading-relaxed">
            {/* @ts-ignore - memoryTip is added to interface */}
            {point.memoryTip || 'Gắn liền mẫu ngữ pháp này với một ví dụ thực tế của bản thân để dễ nhớ hơn nhé!'}
          </div>
        </div>

        {/* DẤU HIỆU NHẬN BIẾT */}
        <div className="bg-indigo-50 dark:bg-indigo-900/10 rounded-[2rem] p-6 md:p-8 shadow-sm border border-indigo-100 dark:border-indigo-900/30 relative">
          <div className="text-xs font-black text-indigo-500 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Search size={16} /> DẤU HIỆU NHẬN BIẾT & TỪ ĐI KÈM
          </div>
          
          <div className="text-sm font-bold text-indigo-900 dark:text-indigo-100 leading-relaxed">
            {/* @ts-ignore - commonWords is added to interface */}
            {point.commonWords || 'Hãy chú ý vị trí của từ khóa trong câu để nhận diện cấu trúc này.'}
          </div>
        </div>

      </div>

      {/* CẤU TRÚC LIÊN QUAN */}
      {/* @ts-ignore - relatedGrammars is added to interface */}
      {point.relatedGrammars && point.relatedGrammars.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-6 bg-purple-500 rounded-full"></div>
            <h2 className="text-lg font-black text-slate-800 dark:text-slate-100 uppercase tracking-widest">CẤU TRÚC LIÊN QUAN</h2>
          </div>
          <div className="space-y-4">
            {/* @ts-ignore */}
            {point.relatedGrammars.map((rg, idx) => (
              <div key={idx} className="bg-purple-50 dark:bg-purple-900/10 rounded-[1.5rem] p-4 md:p-5 shadow-sm border border-purple-100 dark:border-purple-900/30">
                <div className="mb-4">
                  <h3 className="text-base md:text-lg font-black text-purple-600 dark:text-purple-400 font-jp">{colorizeGrammarTitle(rg.name)}</h3>
                  <p className="text-sm font-bold text-purple-800 dark:text-purple-200 mt-1.5 font-jp">{rg.meaning}</p>
                </div>
                
                <div className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6">
                  <div className="flex-1 min-w-0 flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                    <div className="flex-[1.5] min-w-0">
                      {(() => {
                        const parsed = parseKanjiReading(rg.example.japanese, rg.example.reading || rg.example.japanese);
                        let colorIdx = 0;
                        const renderBlocks = parsed.map(item => {
                          if (item.type === 'kanji') {
                            const color = PARSE_COLORS[colorIdx % PARSE_COLORS.length];
                            colorIdx++;
                            return { ...item, color };
                          }
                          return item;
                        });

                        return (
                          <>
                            <div className="text-lg md:text-xl font-black text-slate-800 dark:text-slate-100 font-jp mb-1">
                              {renderBlocks.map((item, i) => (
                                item.type === 'kanji' 
                                  ? <span key={i} className={(item as any).color}>{item.text}</span>
                                  : <span key={i}>{item.text}</span>
                              ))}
                            </div>
                            <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                              {parsed.length === 1 && parsed[0].type === 'mixed' 
                                ? (rg.example.reading || rg.example.japanese)
                                : renderBlocks.map((item, i) => (
                                  item.type === 'kanji'
                                    ? <span key={i} className={(item as any).color}>{item.reading}</span>
                                    : <span key={i}>{item.text}</span>
                                ))
                              }
                            </div>
                          </>
                        );
                      })()}
                      {rg.example.romaji && <div className="text-xs font-medium text-slate-400 dark:text-slate-500 italic mt-0.5">{rg.example.romaji}</div>}
                    </div>
                    <div className="flex-1 min-w-0 text-sm font-medium text-slate-600 dark:text-slate-300">
                      {rg.example.vietnamese}
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2 shrink-0">
                    <button 
                      onClick={() => handleSpeak(rg.example.reading || rg.example.japanese, 0.85, `rg-${idx}-normal`)} 
                      className={`flex items-center justify-center gap-2 w-10 h-10 border rounded-full text-xs font-bold transition-all shadow-sm active:scale-95 ${
                        playingId === `rg-${idx}-normal` 
                          ? 'bg-purple-500 text-white border-purple-600 shadow-[0_4px_12px_rgba(168,85,247,0.3)]' 
                          : 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-900/50 hover:bg-purple-50 dark:hover:bg-purple-900/20'
                      }`}
                    >
                      {playingId === `rg-${idx}-normal` ? (
                        isLoadingAudio ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : (
                          <div className="relative flex items-center justify-center h-4 w-4">
                            <Volume2 size={16} className="relative z-10" />
                            <div className="absolute inset-0 rounded-full bg-white opacity-50 animate-ping"></div>
                          </div>
                        )
                      ) : (
                        <Volume2 size={16} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VÍ DỤ */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-6 relative" ref={voiceMenuRef}>
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-blue-500 rounded-full"></div>
            <h2 className="text-lg font-black text-slate-800 dark:text-slate-100 uppercase tracking-widest">VÍ DỤ</h2>
          </div>
          
          {/* Voice Selector */}
          {availableVoices.length > 0 && (
            <div className="relative">
              <button 
                onClick={() => setIsVoiceMenuOpen(!isVoiceMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
              >
                <Volume2 size={16} className="text-purple-500 shrink-0" />
                <span className="max-w-[200px] sm:max-w-[300px] truncate">
                  {selectedVoice 
                    ? (selectedVoice.type === 'voicevox' ? selectedVoice.name : selectedVoice.voice.name) 
                    : 'Chọn giọng đọc'}
                </span>
                <ChevronDown size={14} className={`text-slate-400 shrink-0 transition-transform duration-300 ${isVoiceMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isVoiceMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-[320px] max-w-[90vw] bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 py-2 z-50 overflow-hidden backdrop-blur-sm">
                  <div className="px-3 pb-2 mb-2 border-b border-slate-100 dark:border-slate-700">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Chọn Giọng Đọc</p>
                  </div>
                  <div className="max-h-[300px] overflow-y-auto">
                    {/* Voicevox API Category */}
                    <div className="px-3 py-1 bg-slate-50 dark:bg-slate-900 border-y border-slate-100 dark:border-slate-700">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
                        <Sparkles size={12} className="text-amber-500" />
                        Giọng AI Lồng Tiếng (Online)
                      </p>
                    </div>
                    {VOICEVOX_CHARACTERS.map((char) => (
                      <button
                        key={`vv-${char.id}`}
                        onClick={() => {
                          setSelectedVoice({ type: 'voicevox', id: char.id, name: char.name });
                          setIsVoiceMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between transition-colors ${
                          selectedVoice?.type === 'voicevox' && selectedVoice.id === char.id
                            ? 'bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold' 
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                        }`}
                      >
                        <span className="truncate pr-4">{char.name}</span>
                        {selectedVoice?.type === 'voicevox' && selectedVoice.id === char.id && <Check size={16} className="shrink-0" />}
                      </button>
                    ))}

                    {/* Web Speech API Category */}
                    <div className="px-3 py-1 bg-slate-50 dark:bg-slate-900 border-y border-slate-100 dark:border-slate-700 mt-2">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
                        <Layers size={12} className="text-blue-500" />
                        Giọng Hệ Điều Hành (Offline)
                      </p>
                    </div>
                    {availableVoices.map((voice, idx) => (
                      <button
                        key={`os-${idx}`}
                        onClick={() => {
                          setSelectedVoice({ type: 'os', voice });
                          setIsVoiceMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between transition-colors ${
                          selectedVoice?.type === 'os' && selectedVoice.voice.name === voice.name 
                            ? 'bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold' 
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                        }`}
                      >
                        <span className="truncate pr-4">{voice.name}</span>
                        {selectedVoice?.type === 'os' && selectedVoice.voice.name === voice.name && <Check size={16} className="shrink-0" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="space-y-4">
          {point.examples.map((ex, idx) => {
            return (
              <motion.div 
                key={idx}
                whileHover={{ y: -2 }}
                className="bg-white dark:bg-slate-900 rounded-[1.5rem] p-4 md:p-5 shadow-sm border border-slate-200 dark:border-slate-800 relative flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6"
              >
                <div className="flex-1 min-w-0 flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                  <div className="flex-[1.5] min-w-0">
                    {(() => {
                      const parsed = parseKanjiReading(ex.japanese, ex.reading || ex.japanese);
                      let colorIdx = 0;
                      const renderBlocks = parsed.map(item => {
                        if (item.type === 'kanji') {
                          const color = PARSE_COLORS[colorIdx % PARSE_COLORS.length];
                          colorIdx++;
                          return { ...item, color };
                        }
                        return item;
                      });

                      return (
                        <>
                          <div className="text-xl md:text-2xl font-black text-slate-800 dark:text-slate-100 font-jp mb-1">
                            {renderBlocks.map((item, i) => (
                              item.type === 'kanji' 
                                ? <span key={i} className={(item as any).color}>{item.text}</span>
                                : <span key={i}>{item.text}</span>
                            ))}
                          </div>
                          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                            {parsed.length === 1 && parsed[0].type === 'mixed' 
                              ? (ex.reading || ex.japanese)
                              : renderBlocks.map((item, i) => (
                                item.type === 'kanji'
                                  ? <span key={i} className={(item as any).color}>{item.reading}</span>
                                  : <span key={i}>{item.text}</span>
                              ))
                            }
                          </div>
                        </>
                      );
                    })()}
                    {ex.romaji && <div className="text-xs font-medium text-slate-400 dark:text-slate-500 italic mt-0.5">{ex.romaji}</div>}
                  </div>
                  <div className="flex-1 min-w-0 text-sm font-medium text-slate-600 dark:text-slate-300">
                    {ex.vietnamese}
                  </div>
                </div>

                <div className="flex flex-col items-center gap-2 shrink-0">
                  <button 
                    onClick={() => handleSpeak(ex.reading || ex.japanese, 0.4, `${idx}-slow`)} 
                    className={`flex items-center justify-center gap-2 w-32 py-2 border rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 ${
                      playingId === `${idx}-slow` 
                        ? 'bg-blue-500 text-white border-blue-600 shadow-[0_4px_12px_rgba(59,130,246,0.3)]' 
                        : 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    {playingId === `${idx}-slow` ? (
                      isLoadingAudio ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <>
                          <div className="relative flex items-center justify-center h-4 w-4">
                            <Volume2 size={14} className="relative z-10" />
                            <div className="absolute inset-0 rounded-full bg-white opacity-50 animate-ping"></div>
                          </div>
                          Đang phát
                        </>
                      )
                    ) : (
                      <><Volume2 size={14} /> Đọc chậm</>
                    )}
                  </button>
                  <button 
                    onClick={() => handleSpeak(ex.reading || ex.japanese, 0.85, `${idx}-normal`)} 
                    className={`flex items-center justify-center gap-2 w-32 py-2 border rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 ${
                      playingId === `${idx}-normal` 
                        ? 'bg-blue-500 text-white border-blue-600 shadow-[0_4px_12px_rgba(59,130,246,0.3)]' 
                        : 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    {playingId === `${idx}-normal` ? (
                      isLoadingAudio ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <>
                          <div className="relative flex items-center justify-center h-4 w-4">
                            <Volume2 size={14} className="relative z-10" />
                            <div className="absolute inset-0 rounded-full bg-white opacity-50 animate-ping"></div>
                          </div>
                          Đang phát
                        </>
                      )
                    ) : (
                      <><Volume2 size={14} /> Đọc thường</>
                    )}
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* EXERCISE MODAL */}
      {isExerciseOpen && (
        <GrammarExercise
          grammarPoint={point}
          vocabList={vocabList}
          lessonName={`Lesson ${lesson.id.replace('lesson-', '')}`}
          onClose={() => setIsExerciseOpen(false)}
        />
      )}

    </div>
  );
};
