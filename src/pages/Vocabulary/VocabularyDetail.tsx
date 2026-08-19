import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  LayoutGrid,
  Keyboard,
  List,
  Brain,
  Search,
  Volume2,
  Heart,
  Check,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { KanjiVocabTyping } from '../../components/Kanji/KanjiVocabTyping';
import { VocabQuiz } from '../../components/Kanji/VocabQuiz';
import { vocabularyData, type VocabItem } from '../../data/vocabularyData';

export const VocabularyDetail = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const [isTypingMode, setIsTypingMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [typingList, setTypingList] = useState<VocabItem[]>([]);
  const [selectedWordIds, setSelectedWordIds] = useState<number[]>([]);
  const [isVocabQuizMode, setIsVocabQuizMode] = useState(false);

  const rawVocabList = useMemo(() => {
    return lessonId && vocabularyData[lessonId] ? vocabularyData[lessonId] : vocabularyData['4-1'] || [];
  }, [lessonId]);

  const vocabList = useMemo(() => {
    if (!searchQuery.trim()) return rawVocabList;
    const lowerQuery = searchQuery.toLowerCase();
    return rawVocabList.filter(item =>
      item.kanji.toLowerCase().includes(lowerQuery) ||
      item.hiragana.toLowerCase().includes(lowerQuery) ||
      (item.romaji && item.romaji.toLowerCase().includes(lowerQuery)) ||
      item.meaning.toLowerCase().includes(lowerQuery)
    );
  }, [rawVocabList, searchQuery]);

  const titleMapping: Record<string, string> = {
    '4-1': 'Phương hướng và phương tiện',
    '4-2': 'Địa điểm và tính từ',
    '4-3': 'Thời tiết và vị giác',
    '5-1': 'Thời gian và hoạt động',
    '5-2': 'Thời tiết và cảm xúc',
    '5-3': 'Sở thích',
    '6-1': 'Kế hoạch và sự kiện',
    '6-2': 'Ăn uống và giải trí',
    '6-3': 'Ẩm thực Nhật',
    '7-1': 'Vị trí và địa điểm',
    '7-2': 'Đồ dùng và hành động',
    '7-3': 'Hoạt động thường ngày',
    '1-1': 'Chào hỏi cơ bản',
    '1-2': 'Số đếm và tuổi',
    '1-3': 'Quốc tịch và nghề',
  };
  const titleText = lessonId && titleMapping[lessonId] ? titleMapping[lessonId] : 'Danh sách từ vựng';

  const isJpd123 = courseId?.toLowerCase() === 'jpd123';
  const theme = {
    textAccent: isJpd123 ? 'text-blue-500 dark:text-blue-400' : 'text-rose-500 dark:text-rose-400',
    bgAccentLight: isJpd123 ? 'bg-blue-50 dark:bg-blue-900/30' : 'bg-rose-50 dark:bg-rose-900/30',
    textAccentMuted: isJpd123 ? 'text-blue-400 dark:text-blue-400' : 'text-rose-400 dark:text-rose-400',
    gradient: isJpd123 ? 'from-blue-600 via-sky-500 to-cyan-400' : 'from-rose-500 via-pink-500 to-amber-300',
    softGradient: isJpd123 ? 'from-blue-50/95 via-white/90 to-cyan-50/80 dark:from-blue-950/40 dark:via-slate-950 dark:to-cyan-950/20' : 'from-rose-50/95 via-white/90 to-amber-50/80 dark:from-rose-950/40 dark:via-slate-950 dark:to-amber-950/20',
    borderAccent: isJpd123 ? 'border-blue-200/80 dark:border-blue-800/60' : 'border-rose-200/80 dark:border-rose-800/60',
    ringAccent: isJpd123 ? 'ring-blue-100/80 dark:ring-blue-900/50' : 'ring-rose-100/80 dark:ring-rose-900/50',
    activeShadow: isJpd123 ? 'shadow-blue-500/25' : 'shadow-rose-500/25',
  };

  const selectedCount = selectedWordIds.length;
  const visibleCount = vocabList.length;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const toggleWordSelection = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedWordIds(prev =>
      prev.includes(id) ? prev.filter(wordId => wordId !== id) : [...prev, id]
    );
  };

  const enterFullscreen = () => {
    const elem = document.documentElement as HTMLElement & {
      webkitRequestFullscreen?: () => Promise<void>;
      msRequestFullscreen?: () => Promise<void>;
    };
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch(console.log);
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  };

  const exitFullscreen = () => {
    const doc = document as Document & {
      webkitFullscreenElement?: Element;
      msFullscreenElement?: Element;
      webkitExitFullscreen?: () => Promise<void>;
      msExitFullscreen?: () => Promise<void>;
    };
    if (doc.fullscreenElement || doc.webkitFullscreenElement || doc.msFullscreenElement) {
      if (doc.exitFullscreen) {
        doc.exitFullscreen().catch(console.log);
      } else if (doc.webkitExitFullscreen) {
        doc.webkitExitFullscreen();
      } else if (doc.msExitFullscreen) {
        doc.msExitFullscreen();
      }
    }
  };

  const startTyping = () => {
    setTypingList(selectedCount > 0 ? vocabList.filter(item => selectedWordIds.includes(item.id)) : vocabList);
    setIsTypingMode(true);
    enterFullscreen();
  };

  return (
    <>
      <div className="max-w-[1400px] mx-auto pt-8 pb-20 px-4 relative min-h-[calc(100vh-80px)] overflow-x-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-300/10 rounded-full blur-[100px] pointer-events-none -z-10" />
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, slate-400 1px, transparent 0)', backgroundSize: '24px 24px' }}
        />
        <div className="absolute top-10 right-10 w-48 h-48 opacity-20 pointer-events-none bg-rose-200 blur-3xl rounded-full" />

        <button
          onClick={() => navigate(`/vocabulary/${courseId}`)}
          className="group flex items-center gap-2 text-sm font-black text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 mb-4 transition-all"
        >
          <span className="w-8 h-8 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-white/80 dark:border-slate-800 shadow-sm flex items-center justify-center group-hover:-translate-x-0.5 transition-transform">
            <ArrowLeft size={16} />
          </span>
          Quay lại
        </button>

        <div className={`relative overflow-hidden rounded-[28px] bg-gradient-to-br ${theme.softGradient} border ${theme.borderAccent} shadow-[0_18px_45px_rgba(15,23,42,0.08)] mb-8 p-5 md:p-6`}>
          <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${theme.gradient}`} />
          <div className="absolute -right-10 -top-16 w-52 h-52 rounded-full bg-white/50 blur-2xl pointer-events-none" />
          <div className="relative flex flex-col xl:flex-row xl:items-center justify-between gap-5">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className={`inline-flex items-center gap-1.5 rounded-full ${theme.bgAccentLight} ${theme.textAccent} px-3 py-1 text-[11px] font-black uppercase tracking-widest`}>
                  <Sparkles size={13} /> Lesson {lessonId}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 dark:bg-slate-900/70 px-3 py-1 text-[11px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 border border-white/90 dark:border-slate-800">
                  <BookOpen size={13} /> {rawVocabList.length} từ vựng
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 dark:text-slate-50 leading-tight truncate">
                {titleText}
              </h1>
              <p className="mt-2 text-sm md:text-base font-bold text-slate-500 dark:text-slate-400">
                Chọn từ để luyện gõ, làm trắc nghiệm hoặc lưu vào ghi nhớ.
              </p>
            </div>

            <div className="flex items-center gap-2 md:gap-3 flex-wrap lg:flex-nowrap rounded-[22px] bg-white/65 dark:bg-slate-950/45 border border-white/80 dark:border-slate-800 p-2 shadow-inner">
              <button className={`flex items-center gap-1.5 md:gap-2 bg-gradient-to-r ${theme.gradient} text-white px-4 md:px-5 py-2.5 rounded-2xl text-xs md:text-sm font-black transition-all shadow-lg ${theme.activeShadow} shrink-0 whitespace-nowrap`}>
                <LayoutGrid size={16} /> Flashcard
              </button>

              <button
                onClick={startTyping}
                className="flex items-center gap-1.5 md:gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 px-4 md:px-5 py-2.5 rounded-2xl text-xs md:text-sm font-black hover:-translate-y-0.5 hover:shadow-md transition-all shrink-0 whitespace-nowrap"
              >
                <Keyboard size={16} /> Gõ {selectedCount > 0 ? `(${selectedCount})` : ''}
              </button>

              <button
                onClick={() => setIsVocabQuizMode(true)}
                className="flex items-center gap-1.5 md:gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 px-4 md:px-5 py-2.5 rounded-2xl text-xs md:text-sm font-black hover:-translate-y-0.5 hover:shadow-md transition-all shrink-0 whitespace-nowrap"
              >
                <List size={16} /> Trắc nghiệm
              </button>

              <button className="flex items-center gap-1.5 md:gap-2 bg-white dark:bg-slate-900 border border-emerald-100 dark:border-emerald-900/60 text-emerald-600 dark:text-emerald-400 px-4 md:px-5 py-2.5 rounded-2xl text-xs md:text-sm font-black hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:-translate-y-0.5 hover:shadow-md transition-all shrink-0 whitespace-nowrap">
                <Brain size={16} /> Ghi nhớ
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 relative">
          <div className="flex-1 min-w-0">
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search size={20} className={theme.textAccentMuted} />
              </div>
              <input
                type="text"
                placeholder="Tìm kiếm từ vựng, romaji hoặc nghĩa..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full pl-12 pr-36 py-4 rounded-2xl border-2 border-white/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 focus:border-blue-300 dark:focus:border-blue-500 focus:outline-none transition-colors font-bold text-slate-800 dark:text-slate-100 shadow-[0_12px_30px_rgba(15,23,42,0.07)] backdrop-blur"
              />
              <div className="absolute inset-y-0 right-3 flex items-center">
                <span className={`rounded-xl ${theme.bgAccentLight} ${theme.textAccent} px-3 py-1.5 text-xs font-black`}>
                  {selectedCount || visibleCount}/{rawVocabList.length}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3 mb-10">
              {vocabList.map((item) => {
                const isSelected = selectedWordIds.includes(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={(e) => toggleWordSelection(item.id, e)}
                    className={`vocab-detail-row relative overflow-hidden bg-white/94 dark:bg-slate-900/94 rounded-2xl p-4 shadow-sm border ${isSelected ? `${theme.borderAccent} ring-4 ${theme.ringAccent}` : 'border-white/80 dark:border-slate-800'} flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-md transition-colors group cursor-pointer`}
                  >
                    <div className={`absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b ${theme.gradient} opacity-80`} />
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div
                        onClick={(e) => toggleWordSelection(item.id, e)}
                        className={`w-7 h-7 rounded-xl border-2 flex items-center justify-center shrink-0 cursor-pointer transition-all ${isSelected ? `bg-gradient-to-br ${theme.gradient} border-transparent text-white shadow-lg ${theme.activeShadow}` : 'border-slate-300 dark:border-slate-600 hover:border-blue-400 bg-white dark:bg-slate-800'}`}
                      >
                        {isSelected && <Check size={14} strokeWidth={4} />}
                      </div>

                      <span className={`text-sm font-black w-8 shrink-0 ${theme.textAccentMuted}`}>
                        {String(item.id).padStart(2, '0')}
                      </span>

                      <div className="grid grid-cols-1 md:grid-cols-[150px_170px_minmax(0,1fr)] items-center gap-3 md:gap-6 flex-1 min-w-0">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="min-w-0">
                            <span className="block text-xl md:text-2xl font-jp font-black text-slate-900 dark:text-slate-50 truncate">
                              {item.kanji}
                            </span>
                            <span className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.18em] truncate">
                              {item.romaji || item.hiragana}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col gap-1 min-w-0">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.18em]">Cách đọc</span>
                          <span className="text-sm md:text-base font-jp font-black text-slate-700 dark:text-slate-300 truncate">
                            {item.hiragana}
                          </span>
                        </div>

                        <div className="min-w-0 flex items-center gap-3 rounded-2xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800 px-3 py-2">
                          <span className={`shrink-0 text-[10px] font-black ${theme.textAccent} ${theme.bgAccentLight} px-2.5 py-1 rounded-lg uppercase w-max`}>
                            {item.type}
                          </span>
                          <div className="text-sm md:text-base font-black text-slate-800 dark:text-slate-200 truncate">
                            {item.meaning}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 shrink-0 justify-end ml-10 md:ml-0 border-t border-slate-100 dark:border-slate-800 md:border-0 pt-3 md:pt-0">
                      <button
                        className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-500 flex items-center justify-center hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-500 transition-colors"
                        onClick={(e) => { e.stopPropagation(); }}
                      >
                        <Volume2 size={16} />
                      </button>
                      <button
                        className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-500 flex items-center justify-center hover:bg-rose-50 dark:hover:bg-rose-900/30 hover:text-rose-500 transition-colors"
                        onClick={(e) => { e.stopPropagation(); }}
                      >
                        <Heart size={16} />
                      </button>
                      <button
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 font-black text-xs hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors"
                        onClick={(e) => { e.stopPropagation(); }}
                      >
                        <Brain size={14} /> Ghi nhớ
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {isTypingMode && (
          <KanjiVocabTyping
            vocabList={typingList}
            onClose={() => {
              setIsTypingMode(false);
              exitFullscreen();
            }}
            kanjiChar={`Bài ${lessonId}`}
            mode="vocab"
            isJPD123={isJpd123}
          />
        )}
        {isVocabQuizMode && (
          <VocabQuiz
            vocabList={vocabList}
            lessonName={titleText}
            onClose={() => setIsVocabQuizMode(false)}
            isJPD123={isJpd123}
          />
        )}
      </div>
    </>
  );
};
