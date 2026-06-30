import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, LayoutGrid, Keyboard, List, Brain, Search, Volume2, Heart, Check } from 'lucide-react';
import { motion } from 'framer-motion';
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



  // Mapping titles for display
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
    bgHeader: isJpd123 ? 'bg-blue-50/50 dark:bg-blue-900/10' : 'bg-rose-50/50 dark:bg-rose-900/10',
    btnPrimary: isJpd123 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-rose-500 hover:bg-rose-600',
  };

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

  return (
    <>
      <div className="max-w-[1400px] mx-auto pt-8 pb-20 px-4 relative min-h-[calc(100vh-80px)] overflow-x-hidden">
        {/* Background aesthetics */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-300/10 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, slate-400 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
      <div className="absolute top-10 right-10 w-48 h-48 opacity-20 pointer-events-none bg-rose-200 blur-3xl rounded-full" />

      <button 
        onClick={() => navigate(`/vocabulary/${courseId}`)}
        className={`flex items-center gap-2 text-sm font-bold ${theme.textAccent} hover:underline mb-6 transition-all`}
      >
        <ArrowLeft size={16} /> Quay lại
      </button>

      {/* Header Area */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 mb-8 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <h2 className={`text-[10px] md:text-xs font-black uppercase tracking-widest mb-1 ${theme.textAccentMuted}`}>
            LESSON {lessonId}
          </h2>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-800 dark:text-slate-100 mt-1 mb-2">
            {titleText}
          </h1>
          <p className="text-sm font-bold text-slate-500">
            {rawVocabList.length} từ vựng
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center gap-2 md:gap-3 flex-wrap lg:flex-nowrap">
          <button className="flex items-center gap-1.5 md:gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-5 py-2.5 rounded-2xl text-xs md:text-sm font-bold transition-all shadow-md shadow-blue-500/20 shrink-0 whitespace-nowrap">
            <LayoutGrid size={16} /> Flashcard
          </button>
          
          <button 
            onClick={() => {
              if (selectedWordIds.length > 0) {
                setTypingList(vocabList.filter(item => selectedWordIds.includes(item.id)));
              } else {
                setTypingList(vocabList);
              }
              setIsTypingMode(true);
              enterFullscreen();
            }}
            className="flex items-center gap-1.5 md:gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 px-4 md:px-5 py-2.5 rounded-2xl text-xs md:text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm shrink-0 whitespace-nowrap"
          >
            <Keyboard size={16} /> Gõ {selectedWordIds.length > 0 ? `(${selectedWordIds.length})` : ''}
          </button>
          
          <button 
            onClick={() => setIsVocabQuizMode(true)}
            className={`flex items-center gap-1.5 md:gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 px-4 md:px-5 py-2.5 rounded-2xl text-xs md:text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm shrink-0 whitespace-nowrap`}
          >
            <List size={16} /> Trắc nghiệm
          </button>

          <button className={`flex items-center gap-1.5 md:gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-emerald-600 dark:text-emerald-400 px-4 md:px-5 py-2.5 rounded-2xl text-xs md:text-sm font-bold hover:bg-emerald-50 dark:hover:bg-slate-700 transition-all shadow-sm shrink-0 whitespace-nowrap`}>
            <Brain size={16} /> Ghi nhớ
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row gap-8 relative">
        
        {/* Left Side: Vocabulary List */}
        <div className="flex-1 min-w-0">
          
          {/* Search Bar */}
          <div className="relative mb-8">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search size={20} className="text-slate-400" />
            </div>
            <input 
              type="text"
              placeholder="Tìm kiếm từ vựng..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-900 focus:border-blue-400 dark:focus:border-blue-500 focus:outline-none transition-colors font-medium text-slate-800 dark:text-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)]"
            />
          </div>

          {/* Cards List */}
          <div className="flex flex-col gap-3 mb-10">
            {vocabList.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: idx * 0.02 }}
                whileHover={{ scale: 1.01, y: -2 }}
                onClick={(e) => toggleWordSelection(item.id, e)}
                className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  {/* Checkbox */}
                  <div 
                    onClick={(e) => toggleWordSelection(item.id, e)}
                    className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 cursor-pointer transition-all ${selectedWordIds.includes(item.id) ? 'bg-blue-500 border-blue-500 text-white' : 'border-slate-300 dark:border-slate-600 hover:border-blue-400 bg-white dark:bg-slate-800'}`}
                  >
                    {selectedWordIds.includes(item.id) && <Check size={14} strokeWidth={4} />}
                  </div>

                  <span className={`text-sm font-black w-6 shrink-0 ${theme.textAccentMuted}`}>{item.id}.</span>
                  
                  <div className="flex items-center gap-6 md:gap-12 flex-1 min-w-0 pl-2 md:pl-4">
                    <div className="min-w-[120px] md:min-w-[160px] shrink-0 text-left">
                      <span className="text-2xl md:text-3xl font-jp font-bold text-slate-800 dark:text-slate-100 whitespace-nowrap">{item.kanji}</span>
                    </div>
                    
                    <div className="flex flex-col gap-0.5 min-w-[100px] md:min-w-[140px] shrink-0">
                      <span className="text-sm md:text-base font-jp font-medium text-slate-600 dark:text-slate-400">{item.hiragana !== item.kanji ? item.hiragana : ''}</span>
                      {item.romaji && <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">{item.romaji}</span>}
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
                      <span className={`shrink-0 text-[10px] font-bold ${theme.textAccent} ${theme.bgAccentLight} px-2 py-0.5 rounded-md uppercase w-max`}>{item.type}</span>
                      <div className="text-sm md:text-base font-bold text-slate-700 dark:text-slate-300 truncate">
                        {item.meaning}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 shrink-0 md:opacity-0 group-hover:opacity-100 transition-opacity justify-end ml-10 md:ml-0 border-t border-slate-50 md:border-0 pt-3 md:pt-0">
                  <button className="w-9 h-9 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-500 flex items-center justify-center hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-500 transition-colors" onClick={(e) => { e.stopPropagation(); /* Play Audio */ }}>
                    <Volume2 size={16} />
                  </button>
                  <button className="w-9 h-9 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-500 flex items-center justify-center hover:bg-rose-50 dark:hover:bg-rose-900/30 hover:text-rose-500 transition-colors" onClick={(e) => { e.stopPropagation(); /* Toggle Favorite */ }}>
                    <Heart size={16} />
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 font-bold text-xs hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors" onClick={(e) => { e.stopPropagation(); /* Memorize */ }}>
                    <Brain size={14} /> Ghi nhớ
                  </button>
                </div>
              </motion.div>
            ))}
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
