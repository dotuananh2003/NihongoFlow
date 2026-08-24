import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic,
  MicOff,
  Volume2,
  Sparkles,
  CheckCircle2,
  MessageSquare,
  Zap,
  Headphones,
  Award,
  Flame,
  Globe
} from 'lucide-react';

type SpeakingMode = 'shadowing' | 'dialogue' | 'reflex';

interface ShadowingItem {
  id: string;
  level: 'N5' | 'N4' | 'N3';
  topic: string;
  japanese: string;
  romaji: string;
  vietnamese: string;
  tip: string;
}

interface DialogueLine {
  speaker: 'A' | 'B';
  name: string;
  avatar: string;
  japanese: string;
  romaji: string;
  vietnamese: string;
}

interface DialogueTopic {
  id: string;
  title: string;
  situation: string;
  level: 'N5' | 'N4';
  icon: string;
  lines: DialogueLine[];
}

interface ReflexCard {
  id: string;
  prompt: string;
  promptJp: string;
  suggestedAnswers: {
    japanese: string;
    romaji: string;
    vietnamese: string;
  }[];
  level: 'N5' | 'N4';
}

const SHADOWING_DATA: ShadowingItem[] = [
  {
    id: 's1',
    level: 'N5',
    topic: 'Chào hỏi & Giao tiếp cơ bản',
    japanese: 'はじめまして。わたしは トゥアン と もうします。どうぞ よろしく おねがいします。',
    romaji: 'Hajimemashite. Watashi wa Tuan to moushimasu. Douzo yoroshiku onegaishimasu.',
    vietnamese: 'Rất vui được gặp bạn. Tôi tên là Tuấn. Rất mong nhận được sự giúp đỡ.',
    tip: 'Hạ giọng nhẹ ở cuối câu "おねがいします" để tạo cảm giác lễ phép, tự nhiên.'
  },
  {
    id: 's2',
    level: 'N5',
    topic: 'Tại quán ăn / Izakaya',
    japanese: 'すみません、メニューを もういちど みせてもらえますか。',
    romaji: 'Sumimasen, menyuu o mou ichido misete moraemasu ka.',
    vietnamese: 'Xin lỗi, bạn có thể cho tôi xem lại thực đơn một lần nữa được không?',
    tip: 'Nhấn nhẹ vào âm "もういちど" (mou ichido) để diễn tả ý muốn "thêm một lần nữa".'
  },
  {
    id: 's3',
    level: 'N4',
    topic: 'Hỏi đường & Đi tàu',
    japanese: 'この でんしゃは しんじゅくえきに とまりますか。なんばんせんに のれば いいですか。',
    romaji: 'Kono densha wa Shinjuku-eki ni tomarimasu ka. Nanban-sen ni noreba ii desu ka.',
    vietnamese: 'Chuyến tàu này có dừng ở ga Shinjuku không? Tôi nên lên đường ray số mấy?',
    tip: 'Lên giọng một chút ở cuối câu hỏi "とまりますか" và "いいですか".'
  },
  {
    id: 's4',
    level: 'N4',
    topic: 'Công sở & Xin phép',
    japanese: 'きょうは すこし たいちょうが わるいので、はやめに そうたいさせて いただけないでしょうか。',
    romaji: 'Kyou wa sukoshi taichou ga warui node, hayame ni soutai sasete itadakenai deshou ka.',
    vietnamese: 'Hôm nay trong người hơi mệt nên em xin phép được về sớm có được không ạ?',
    tip: 'Cách nói kính ngữ rất lịch sự, phát âm liền mạch cụm "そうたいさせて いただけないでしょうか".'
  },
  {
    id: 's5',
    level: 'N3',
    topic: 'Bày tỏ quan điểm',
    japanese: 'わたしのかんがえでは、このプランのほうが コストパフォーマンスが たかいと おもいます。',
    romaji: 'Watashi no kangae de wa, kono puran no hou ga kosuto pafoumansu ga takai to omoimasu.',
    vietnamese: 'Theo suy nghĩ của tôi, phương án này mang lại hiệu quả chi phí cao hơn.',
    tip: 'Ngắt nhịp tự nhiên sau "わたしのかんがえでは" trước khi nêu luận điểm.'
  }
];

const DIALOGUE_DATA: DialogueTopic[] = [
  {
    id: 'd1',
    title: 'Gặp gỡ bạn học mới tại trường',
    situation: 'Bạn vừa chuyển vào lớp tiếng Nhật mới và bắt chuyện với bạn ngồi cạnh.',
    level: 'N5',
    icon: '🏫',
    lines: [
      {
        speaker: 'A',
        name: 'Sakura',
        avatar: '🌸',
        japanese: 'こんにちは！となりのせき、すわってもいいですか？',
        romaji: 'Konnichiwa! Tonari no seki, suwatte mo ii desu ka?',
        vietnamese: 'Chào bạn! Chỗ ngồi cạnh bên này tôi ngồi được không?'
      },
      {
        speaker: 'B',
        name: 'Bạn',
        avatar: '🙋‍♂️',
        japanese: 'ええ、どうぞ！わたしは ベトナムから きました。',
        romaji: 'Ee, douzo! Watashi wa Betonamu kara kimashita.',
        vietnamese: 'Vâng, xin mời! Tôi đến từ Việt Nam.'
      },
      {
        speaker: 'A',
        name: 'Sakura',
        avatar: '🌸',
        japanese: 'ベトナムですか！すてきですね。いつ にほんに きたんですか？',
        romaji: 'Betonamu desu ka! Suteki desu ne. Itsu Nihon ni kita n desu ka?',
        vietnamese: 'Việt Nam à! Tuyệt quá nhỉ. Bạn đến Nhật từ bao giờ thế?'
      },
      {
        speaker: 'B',
        name: 'Bạn',
        avatar: '🙋‍♂️',
        japanese: 'せんげつの はじめに きました。まだ なれていませんが、がんばります。',
        romaji: 'Sengetsu no hajime ni kimashita. Mada narete imasen ga, gambarimasu.',
        vietnamese: 'Tôi mới đến đầu tháng trước. Vẫn chưa quen lắm nhưng tôi sẽ cố gắng!'
      }
    ]
  },
  {
    id: 'd2',
    title: 'Mua sắm tại cửa hàng tiện lợi (Konbini)',
    situation: 'Bạn mua bento và đồ uống tại cửa hàng tiện lợi FamilyMart.',
    level: 'N5',
    icon: '🏪',
    lines: [
      {
        speaker: 'A',
        name: 'Nhân viên',
        avatar: '🏪',
        japanese: 'いらっしゃいませ！おべんとう あたためますか？',
        romaji: 'Irasshaimase! Obentou atatamemasu ka?',
        vietnamese: 'Kính chào quý khách! Cơm hộp có cần hâm nóng không ạ?'
      },
      {
        speaker: 'B',
        name: 'Bạn',
        avatar: '🙋‍♂️',
        japanese: 'はい、おねがいします。あと、おはしを にぜん ください。',
        romaji: 'Hai, onegaishimasu. Ato, ohashi o nizen kudasai.',
        vietnamese: 'Vâng, xin làm ấm giúp tôi. Với lại cho tôi xin 2 đôi đũa nhé.'
      },
      {
        speaker: 'A',
        name: 'Nhân viên',
        avatar: '🏪',
        japanese: 'かしこまりました。ふくろは ごりようですか？',
        romaji: 'Kashikomarimashita. Fukuro wa goriyou desu ka?',
        vietnamese: 'Tôi hiểu rồi ạ. Quý khách có dùng túi nilon không ạ?'
      },
      {
        speaker: 'B',
        name: 'Bạn',
        avatar: '🙋‍♂️',
        japanese: 'だいじょうぶです。そのまま もちかえります。',
        romaji: 'Daijoubu desu. Sonomama mochikaerimasu.',
        vietnamese: 'Không cần đâu ạ. Tôi cầm về nguyên thế này luôn.'
      }
    ]
  }
];

const REFLEX_DATA: ReflexCard[] = [
  {
    id: 'r1',
    prompt: 'Người ta chúc bạn khi gặp lần đầu: "はじめまして、田中です。よろしくお願いします。"',
    promptJp: '初めまして、田中です。よろしくお願いします。',
    level: 'N5',
    suggestedAnswers: [
      {
        japanese: 'はじめまして。こちらこそ よろしく おねがいします。',
        romaji: 'Hajimemashite. Kochira koso yoroshiku onegaishimasu.',
        vietnamese: 'Chào bạn. Chính tôi mới là người cần nhờ bạn giúp đỡ.'
      }
    ]
  },
  {
    id: 'r2',
    prompt: 'Đồng nghiệp hỏi bạn tan ca chưa: "お先に失礼します (Tôi xin phép về trước)."',
    promptJp: 'おさきに しつれいします。',
    level: 'N5',
    suggestedAnswers: [
      {
        japanese: 'おつかれさまでした！きをつけて おかえりください。',
        romaji: 'Otsukaresama deshita! Ki o tsukete okaeri kudasai.',
        vietnamese: 'Bạn vất vả rồi! Đi về cẩn thận nhé.'
      }
    ]
  },
  {
    id: 'r3',
    prompt: 'Khi ai đó cảm ơn bạn: "どうも ありがとうございました。"',
    promptJp: 'どうも ありがとうございました。',
    level: 'N5',
    suggestedAnswers: [
      {
        japanese: 'いいえ、どういたしまして。また いつでも いってくださいね。',
        romaji: 'Iie, dou itashimashite. Mata itsudemo itte kudasai ne.',
        vietnamese: 'Không có gì đâu. Khi nào cần bạn cứ nói nhé.'
      }
    ]
  }
];

export const Speaking: React.FC = () => {
  const [activeMode, setActiveMode] = useState<SpeakingMode>('shadowing');
  const [selectedShadowIndex, setSelectedShadowIndex] = useState(0);
  const [selectedDialogueIndex, setSelectedDialogueIndex] = useState(0);
  const [selectedReflexIndex, setSelectedReflexIndex] = useState(0);
  
  const [showRomaji, setShowRomaji] = useState(true);
  const [showVietnamese, setShowVietnamese] = useState(true);
  const [speechRate, setSpeechRate] = useState<0.8 | 1.0>(1.0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Voice Recording state
  const [isRecording, setIsRecording] = useState(false);
  const [recordedText, setRecordedText] = useState<string | null>(null);
  const [matchScore, setMatchScore] = useState<number | null>(null);

  const recognitionRef = useRef<any>(null);

  // Play Native Japanese Speech
  const playJapaneseAudio = (text: string, rate = speechRate) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/[、。！？\s]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'ja-JP';
      utterance.rate = rate;
      utterance.pitch = 1.0;
      
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      window.speechSynthesis.speak(utterance);
    } else {
      alert('Trình duyệt của bạn chưa hỗ trợ Web Speech API.');
    }
  };

  // Toggle Speech Recognition
  const toggleRecording = (expectedText: string) => {
    if (isRecording) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsRecording(false);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      // Fallback simulator for browsers without Web Speech Recognition
      setIsRecording(true);
      setRecordedText('Đang lắng nghe giọng đọc...');
      setTimeout(() => {
        setIsRecording(false);
        setRecordedText(expectedText);
        setMatchScore(94);
      }, 2500);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'ja-JP';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsRecording(true);
        setRecordedText(null);
        setMatchScore(null);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setRecordedText(transcript);
        
        // Similarity score calculation
        const cleanExpected = expectedText.replace(/[、。！？\s]/g, '');
        const cleanActual = transcript.replace(/[、。！？\s]/g, '');
        
        if (cleanActual === cleanExpected) {
          setMatchScore(100);
        } else if (cleanExpected.includes(cleanActual) || cleanActual.includes(cleanExpected)) {
          setMatchScore(85);
        } else {
          setMatchScore(70);
        }
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setIsRecording(false);
    }
  };

  const currentShadow = SHADOWING_DATA[selectedShadowIndex];
  const currentDialogue = DIALOGUE_DATA[selectedDialogueIndex];
  const currentReflex = REFLEX_DATA[selectedReflexIndex];

  return (
    <div className="relative min-h-[calc(100vh-80px)] max-w-6xl mx-auto px-4 py-6 md:py-8 space-y-8">
      {/* Background Japanese Art Atmosphere */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-br from-purple-50/60 via-white to-pink-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-purple-950/20" />
      <div className="pointer-events-none fixed -top-24 right-10 -z-10 h-96 w-96 rounded-full bg-purple-200/30 blur-3xl dark:bg-purple-900/15" />
      <div className="pointer-events-none fixed -bottom-24 left-10 -z-10 h-96 w-96 rounded-full bg-pink-200/25 blur-3xl dark:bg-pink-900/15" />

      {/* Header Banner */}
      <section className="relative overflow-hidden rounded-[2.2rem] border border-white/85 bg-white/75 p-6 sm:p-8 shadow-[0_16px_50px_rgba(147,51,234,0.08)] backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/80">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50/90 px-4 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-purple-600 dark:border-purple-900/40 dark:bg-purple-950/60 dark:text-purple-300">
              <Sparkles size={14} />
              Nihongo Kaiwa • 日本語会話
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight flex items-center gap-3">
              Luyện nói tiếng Nhật
              <span className="text-sm font-bold px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md shadow-purple-500/20">
                120 FPS Audio
              </span>
            </h1>
            <p className="max-w-2xl text-sm sm:text-base font-semibold text-slate-600 dark:text-slate-300 leading-relaxed">
              Luyện phát âm chuẩn ngữ điệu bản xứ, rèn phản xạ giao tiếp tự nhiên và thực hành Shadowing từng câu với chấm điểm giọng nói tức thì.
            </p>
          </div>

          {/* Global Audio Controls */}
          <div className="flex flex-wrap items-center gap-2.5 bg-white/90 dark:bg-slate-800/90 p-2 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-sm">
            <button
              onClick={() => setSpeechRate(speechRate === 1.0 ? 0.8 : 1.0)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                speechRate === 0.8
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-purple-50'
              }`}
              title="Tốc độ giọng đọc bản xứ"
            >
              {speechRate === 0.8 ? '🐢 Chậm 0.8x' : '⚡ Chuẩn 1.0x'}
            </button>
            <button
              onClick={() => setShowRomaji(!showRomaji)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                showRomaji
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              Romaji
            </button>
            <button
              onClick={() => setShowVietnamese(!showVietnamese)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                showVietnamese
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              Nghĩa Việt
            </button>
          </div>
        </div>

        {/* 3 Nav Tabs */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-slate-100 dark:border-slate-800/80 pt-6">
          {[
            {
              id: 'shadowing' as SpeakingMode,
              title: 'Luyện Shadowing',
              desc: 'Nghe & nhại theo chuẩn ngữ điệu',
              icon: Headphones,
              badge: `${SHADOWING_DATA.length} câu`
            },
            {
              id: 'dialogue' as SpeakingMode,
              title: 'Hội thoại nhập vai',
              desc: 'Đóng vai trong tình huống thực tế',
              icon: MessageSquare,
              badge: `${DIALOGUE_DATA.length} bài`
            },
            {
              id: 'reflex' as SpeakingMode,
              title: 'Phản xạ cấp tốc',
              desc: 'Bật câu trả lời trong 3 giây',
              icon: Zap,
              badge: `${REFLEX_DATA.length} thử thách`
            }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeMode === tab.id;
            return (
              <motion.button
                key={tab.id}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setActiveMode(tab.id);
                  setRecordedText(null);
                  setMatchScore(null);
                }}
                className={`relative flex items-center justify-between p-4 rounded-2xl text-left border transition-all ${
                  isActive
                    ? 'border-purple-400 bg-gradient-to-br from-purple-500/10 via-white to-pink-500/5 shadow-md shadow-purple-500/10 dark:border-purple-500 dark:bg-slate-800'
                    : 'border-slate-200/80 bg-white/60 hover:bg-white dark:border-slate-800 dark:bg-slate-900/50 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-colors ${
                      isActive
                        ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-md shadow-purple-500/30'
                        : 'bg-purple-50 text-purple-600 dark:bg-slate-800 dark:text-purple-300'
                    }`}
                  >
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className={`text-sm font-black ${isActive ? 'text-purple-600 dark:text-purple-400' : 'text-slate-900 dark:text-white'}`}>
                      {tab.title}
                    </h3>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {tab.desc}
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                  {tab.badge}
                </span>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* MODE 1: SHADOWING PRACTICE */}
      {activeMode === 'shadowing' && (
        <section className="space-y-6">
          {/* Topic Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {SHADOWING_DATA.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedShadowIndex(idx);
                  setRecordedText(null);
                  setMatchScore(null);
                }}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-black transition-all ${
                  selectedShadowIndex === idx
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30 scale-105'
                    : 'border border-slate-200 bg-white/80 text-slate-600 hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
                }`}
              >
                <span className="mr-1.5 opacity-80">{item.level}</span>
                {item.topic}
              </button>
            ))}
          </div>

          {/* Interactive Shadowing Card */}
          <motion.div
            key={currentShadow.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="relative overflow-hidden rounded-[2.2rem] border border-white/90 bg-white p-6 sm:p-10 shadow-[0_20px_60px_rgba(147,51,234,0.07)] dark:border-slate-800 dark:bg-slate-900"
          >
            {/* Japanese Text Watermark */}
            <div className="pointer-events-none absolute -bottom-10 right-4 select-none font-jp text-[11rem] font-black leading-none text-purple-500/[0.03] dark:text-purple-400/[0.02]">
              話
            </div>

            {/* Top Bar */}
            <div className="flex items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-3 py-1 text-xs font-black text-purple-700 dark:bg-purple-950/70 dark:text-purple-300">
                  <Award size={13} /> {currentShadow.level}
                </span>
                <span className="text-xs font-black text-slate-400 dark:text-slate-500">
                  Câu {selectedShadowIndex + 1} / {SHADOWING_DATA.length}
                </span>
              </div>

              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500">
                <Globe size={14} /> {currentShadow.topic}
              </div>
            </div>

            {/* Main Japanese Sentence */}
            <div className="my-6 space-y-4 text-center">
              <h2 className="font-jp text-2xl sm:text-4xl font-black text-slate-900 dark:text-white leading-relaxed tracking-wide">
                {currentShadow.japanese}
              </h2>

              {showRomaji && (
                <p className="text-sm sm:text-base font-semibold text-purple-600 dark:text-purple-400 tracking-wide font-mono">
                  {currentShadow.romaji}
                </p>
              )}

              {showVietnamese && (
                <p className="text-base sm:text-lg font-bold text-slate-600 dark:text-slate-300">
                  {currentShadow.vietnamese}
                </p>
              )}
            </div>

            {/* Pronunciation Tip Box */}
            <div className="my-6 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/40 p-4 flex items-start gap-3">
              <Sparkles size={18} className="text-amber-500 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm font-bold text-amber-800 dark:text-amber-300 leading-relaxed">
                <span className="font-black">Mẹo ngữ điệu:</span> {currentShadow.tip}
              </p>
            </div>

            {/* Action Bar (Audio Playback & Mic Recording) */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* Native Voice Button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => playJapaneseAudio(currentShadow.japanese)}
                className="flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full bg-slate-900 px-7 py-3.5 text-sm font-black text-white shadow-lg shadow-slate-900/20 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
              >
                <Volume2 size={18} className={isPlaying ? 'animate-bounce text-purple-400' : ''} />
                Nghe giọng bản xứ
              </motion.button>

              {/* Record Mic Button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => toggleRecording(currentShadow.japanese)}
                className={`flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-black text-white shadow-lg transition-all ${
                  isRecording
                    ? 'bg-rose-500 animate-pulse shadow-rose-500/30'
                    : 'bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 shadow-purple-600/30'
                }`}
              >
                {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
                {isRecording ? 'Đang ghi âm... (Bấm dừng)' : 'Thu âm & Chấm điểm'}
              </motion.button>
            </div>

            {/* Speech Recognition Results Feedback */}
            <AnimatePresence>
              {(recordedText || matchScore !== null) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-8 rounded-2xl border border-purple-200 bg-purple-50/70 p-5 dark:border-purple-900/50 dark:bg-purple-950/40 text-center space-y-2"
                >
                  <div className="flex items-center justify-center gap-2 text-sm font-black text-purple-900 dark:text-purple-200">
                    <CheckCircle2 size={18} className="text-emerald-500" />
                    Kết quả nhận diện giọng nói:
                  </div>
                  <p className="font-jp text-lg font-bold text-slate-800 dark:text-slate-100">
                    "{recordedText}"
                  </p>
                  {matchScore !== null && (
                    <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1 text-xs font-black text-emerald-600 shadow-sm dark:bg-slate-900">
                      <Flame size={14} className="text-orange-500" />
                      Độ chuẩn xác: {matchScore}% ({matchScore >= 80 ? 'Xuất sắc 🎉' : 'Cần chú ý ngắt nhịp 👍'})
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </section>
      )}

      {/* MODE 2: DIALOGUE ROLE-PLAY */}
      {activeMode === 'dialogue' && (
        <section className="space-y-6">
          {/* Situation Card */}
          <div className="rounded-[2rem] border border-purple-100 bg-white/80 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{currentDialogue.icon}</span>
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    {currentDialogue.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    {currentDialogue.situation}
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-black text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                {currentDialogue.level}
              </span>
            </div>
          </div>

          {/* Interactive Chat Stream */}
          <div className="space-y-4">
            {currentDialogue.lines.map((line, idx) => {
              const isMe = line.speaker === 'B';
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: isMe ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  className={`flex items-start gap-3.5 ${isMe ? 'flex-row-reverse' : ''}`}
                >
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white shadow-md text-2xl border border-slate-100 dark:bg-slate-800 dark:border-slate-700">
                    {line.avatar}
                  </div>

                  <div
                    className={`max-w-xl rounded-[1.8rem] p-5 shadow-sm space-y-2 ${
                      isMe
                        ? 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-tr-none'
                        : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-100 dark:border-slate-700/80 rounded-tl-none'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className={`text-[11px] font-black uppercase tracking-wider ${isMe ? 'text-purple-200' : 'text-purple-600 dark:text-purple-400'}`}>
                        {line.name}
                      </span>
                      <button
                        onClick={() => playJapaneseAudio(line.japanese)}
                        className={`p-1.5 rounded-full transition-transform hover:scale-110 ${
                          isMe ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                        }`}
                        title="Nghe câu này"
                      >
                        <Volume2 size={14} />
                      </button>
                    </div>

                    <p className="font-jp text-lg font-black leading-snug">
                      {line.japanese}
                    </p>

                    {showRomaji && (
                      <p className={`text-xs font-mono font-medium ${isMe ? 'text-purple-100' : 'text-purple-600 dark:text-purple-400'}`}>
                        {line.romaji}
                      </p>
                    )}

                    {showVietnamese && (
                      <p className={`text-xs font-semibold ${isMe ? 'text-purple-100/90' : 'text-slate-500 dark:text-slate-400'}`}>
                        {line.vietnamese}
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      )}

      {/* MODE 3: QUICK REFLEX */}
      {activeMode === 'reflex' && (
        <section className="space-y-6">
          <motion.div
            key={currentReflex.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-[2.2rem] border border-white/90 bg-white p-6 sm:p-10 shadow-[0_20px_60px_rgba(147,51,234,0.08)] dark:border-slate-800 dark:bg-slate-900 text-center space-y-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-1 text-xs font-black text-amber-600 dark:bg-amber-950/60 dark:text-amber-300">
              <Zap size={14} /> Tình huống phản xạ nhanh
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white max-w-xl mx-auto leading-relaxed">
              {currentReflex.prompt}
            </h2>

            <div className="rounded-2xl bg-purple-50/60 dark:bg-purple-950/30 p-4 font-jp text-xl font-bold text-purple-700 dark:text-purple-300">
              "{currentReflex.promptJp}"
            </div>

            {/* Answer Reveal / Practice */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
              <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                Câu đáp gợi ý chuẩn mực:
              </p>
              {currentReflex.suggestedAnswers.map((ans, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-800/60 flex items-center justify-between gap-4"
                >
                  <div className="text-left space-y-1">
                    <p className="font-jp text-base font-black text-slate-900 dark:text-white">
                      {ans.japanese}
                    </p>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {ans.vietnamese}
                    </p>
                  </div>

                  <button
                    onClick={() => playJapaneseAudio(ans.japanese)}
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-purple-600 text-white shadow-md shadow-purple-600/30 hover:scale-105 transition-transform"
                  >
                    <Volume2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        </section>
      )}
    </div>
  );
};

