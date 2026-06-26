import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, X, Trophy, Flame, Star, Clock, Check, ArrowRight, RotateCcw, PenTool, Type, HelpCircle, Lightbulb, Keyboard, Volume2 } from 'lucide-react';
import { toHiragana, toKatakana, toRomaji } from 'wanakana';
import type { GrammarExample, GrammarPoint } from '../../data/grammarData';
import type { VocabItem } from '../../data/vocabularyData';

interface GrammarExerciseProps {
  grammarPoint: GrammarPoint;
  vocabList: VocabItem[];
  lessonName: string;
  onClose: () => void;
}

type ExerciseType = 'type1' | 'type2' | 'type3';
type ScreenState = 'setup' | 'playing' | 'result';

interface Question {
  id: string;
  type: ExerciseType;
  subType: 'jp_to_vn' | 'vn_to_jp';
  example: GrammarExample;
  questionText: string;
  correctAnswer: string;
  options?: string[]; // Only for Type 1 & 2
  hint?: string;
  readingWithBlanks?: string;
}

// Helper to shuffle array
const shuffle = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Particles for distractor generation in fill-in-the-blank
const PARTICLES = ['は', 'が', 'を', 'に', 'へ', 'で', 'と', 'も', 'や', 'から', 'まで'];



export const GrammarExercise: React.FC<GrammarExerciseProps> = ({ grammarPoint, vocabList, lessonName, onClose }) => {
  const [screen, setScreen] = useState<ScreenState>('setup');
  const [selectedTypes, setSelectedTypes] = useState<ExerciseType[]>(['type1', 'type2', 'type3']);
  const [questionCount, setQuestionCount] = useState<number>(Math.min(10, grammarPoint.examples.length));
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Playing States
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  
  // MCQ state
  const [selectedAnswerIdx, setSelectedAnswerIdx] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // Typing state
  const [textInput, setTextInput] = useState('');
  const [imeMode, setImeMode] = useState<'hira' | 'kata'>('hira');
  const inputRef = useRef<HTMLInputElement>(null);

  // Timer
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (screen === 'playing') {
      timer = setInterval(() => setTimeElapsed(prev => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [screen]);

  // Focus input automatically for Type 3
  useEffect(() => {
    if (screen === 'playing' && questions[currentIdx]?.type === 'type3' && !isAnswered) {
      inputRef.current?.focus();
    }
  }, [currentIdx, screen, isAnswered, questions]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const toggleType = (type: ExerciseType) => {
    setSelectedTypes(prev => {
      if (prev.includes(type)) {
        if (prev.length === 1) return prev;
        return prev.filter(t => t !== type);
      }
      return [...prev, type];
    });
  };

  // --- QUESTION GENERATION ---
  const generateQuestions = () => {
    const generated: Question[] = [];
    const examples = grammarPoint.examples;

    if (examples.length === 0) {
      alert('Mẫu ngữ pháp này hiện chưa có câu ví dụ để tạo bài tập!');
      return;
    }

    let i = 0;
    while (generated.length < questionCount) {
      // Pick random example from static list
      const ex = examples[Math.floor(Math.random() * examples.length)];

      const type = selectedTypes[Math.floor(Math.random() * selectedTypes.length)];
      const subType = Math.random() > 0.5 ? 'jp_to_vn' : 'vn_to_jp';

      let q: Question | null = null;

      if (type === 'type1') {
        // TYPE 1: Multiple Choice Meaning
        const options = [subType === 'jp_to_vn' ? ex.vietnamese : ex.japanese];
        // Generate distractors
        const otherEx = examples.filter(e => e.japanese !== ex.japanese);
        while (options.length < 4 && otherEx.length > 0) {
          const randEx = otherEx.splice(Math.floor(Math.random() * otherEx.length), 1)[0];
          options.push(subType === 'jp_to_vn' ? randEx.vietnamese : randEx.japanese);
        }
        // If not enough examples, fallback to vocab meanings to fill options
        while (options.length < 4) {
          const randVocab = vocabList[Math.floor(Math.random() * vocabList.length)];
          const fakeOpt = subType === 'jp_to_vn' ? `Nó có nghĩa là ${randVocab.meaning}` : `${randVocab.kanji || randVocab.hiragana}ですね`;
          if (!options.includes(fakeOpt)) options.push(fakeOpt);
        }

        q = {
          id: `q${i}`,
          type, subType, example: ex,
          questionText: subType === 'jp_to_vn' ? ex.japanese : ex.vietnamese,
          correctAnswer: subType === 'jp_to_vn' ? ex.vietnamese : ex.japanese,
          options: shuffle(options)
        };
      } 
      else if (type === 'type2') {
        // TYPE 2: Fill in the blank (1 to 3 blanks)
        const vocabInSentence = vocabList.filter(v => 
          (v.kanji && ex.japanese.includes(v.kanji)) || 
          (v.hiragana && ex.japanese.includes(v.hiragana) && v.hiragana.length > 1)
        ).map(v => v.kanji || v.hiragana);
        
        const particlesInSentence = PARTICLES.filter(p => ex.japanese.includes(p));
        
        let pool = Array.from(new Set([...particlesInSentence, ...vocabInSentence]));
        if (grammarPoint.icon && ex.japanese.includes(grammarPoint.icon) && !pool.includes(grammarPoint.icon)) {
          pool.push(grammarPoint.icon);
        }
        
        if (pool.length === 0) continue; // Skip if nothing to blank
        
        const numBlanks = Math.floor(Math.random() * Math.min(3, pool.length)) + 1; // 1 to 3
        const selectedTargets = shuffle(pool).slice(0, numBlanks);
        
        // Sort by appearance index so blanks are left-to-right
        selectedTargets.sort((a, b) => ex.japanese.indexOf(a) - ex.japanese.indexOf(b));
        
        let questionText = ex.japanese;
        let readingText = ex.reading || ex.romaji || '';
        
        selectedTargets.forEach(t => {
          questionText = questionText.replace(t, '___');
          let readingToReplace = t;
          if (!PARTICLES.includes(t)) {
             const v = vocabList.find(v => v.kanji === t || v.hiragana === t);
             if (v && v.hiragana) readingToReplace = v.hiragana;
          }
          readingText = readingText.replace(readingToReplace, '___');
        });
        
        const correctAnswer = selectedTargets.join(' - ');
        
        const options = [correctAnswer];
        let attempts = 0;
        while (options.length < 4 && attempts < 30) {
          attempts++;
          const distractor = selectedTargets.map(t => {
            if (PARTICLES.includes(t)) {
               let randP = PARTICLES[Math.floor(Math.random() * PARTICLES.length)];
               return randP;
            } else {
               const randVocab = vocabList[Math.floor(Math.random() * vocabList.length)];
               return randVocab?.kanji || randVocab?.hiragana || t;
            }
          }).join(' - ');
          
          if (!options.includes(distractor)) options.push(distractor);
        }
        
        q = {
          id: `q${i}`,
          type, subType: 'jp_to_vn', // Forced
          example: ex,
          questionText: questionText,
          correctAnswer: correctAnswer,
          options: shuffle(options),
          readingWithBlanks: readingText
        };
      }
      else if (type === 'type3') {
        // TYPE 3: Typing Translation
        q = {
          id: `q${i}`,
          type, subType, example: ex,
          questionText: subType === 'jp_to_vn' ? ex.japanese : ex.vietnamese,
          correctAnswer: subType === 'jp_to_vn' ? ex.vietnamese : ex.japanese,
        };
      }

      if (q) {
        generated.push(q);
        i++;
      }
    }

    setQuestions(generated);
    setCurrentIdx(0);
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setCorrectCount(0);
    setWrongCount(0);
    setTimeElapsed(0);
    setSelectedAnswerIdx(null);
    setIsAnswered(false);
    setTextInput('');
    setScreen('playing');
  };

  // --- ACTIONS ---
  const handleMCQAnswer = (index: number) => {
    if (isAnswered) return;
    const q = questions[currentIdx];
    setSelectedAnswerIdx(index);
    setIsAnswered(true);

    const isCorrect = q.options![index] === q.correctAnswer;
    processResult(isCorrect);
  };

  const handleTypingSubmit = () => {
    if (isAnswered || !textInput.trim()) return;
    const q = questions[currentIdx];
    setIsAnswered(true);

    // Normalize Japanese input for comparison
    const normalize = (str: string) => str.replace(/[～〜]/g, '~').replace(/\s/g, '').toLowerCase();
    
    let isCorrect = false;
    if (q.subType === 'vn_to_jp') {
      // User typed Japanese. Compare with target Japanese, hiragana, or romaji
      const cleanInput = normalize(textInput);
      const targetJp = normalize(q.correctAnswer);
      const targetHira = normalize(toHiragana(q.example.reading || q.example.japanese));
      const targetRoma = normalize(q.example.romaji || toRomaji(targetHira));
      const inputRoma = normalize(toRomaji(cleanInput));

      isCorrect = cleanInput === targetJp || cleanInput === targetHira || cleanInput === targetRoma || inputRoma === targetRoma;
    } else {
      // User typed Vietnamese. Compare strings loosely
      // (Very simple comparison, in reality could use Levenshtein distance)
      const cleanInput = textInput.toLowerCase().trim();
      const targetVn = q.correctAnswer.toLowerCase().trim();
      isCorrect = cleanInput === targetVn || targetVn.includes(cleanInput); 
    }

    processResult(isCorrect);
  };

  const processResult = (isCorrect: boolean) => {
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
      const newCombo = combo + 1;
      setCombo(newCombo);
      setMaxCombo(prev => Math.max(prev, newCombo));
      setScore(prev => prev + 10 + (newCombo > 1 ? newCombo * 2 : 0));
    } else {
      setWrongCount(prev => prev + 1);
      setCombo(0);
    }
  };

  const nextQuestion = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedAnswerIdx(null);
      setIsAnswered(false);
      setTextInput('');
    } else {
      setScreen('result');
    }
  };

  const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = questions[currentIdx];
    let val = e.target.value;

    if (q.subType === 'vn_to_jp') {
      // Japanese typing mode
      val = val.replace(/\s/g, '').replace(/〜/g, '~');
      if (imeMode === 'hira') {
        setTextInput(toHiragana(val, { IMEMode: true }));
      } else {
        let preVal = val.replace(/ディ/g, 'di').replace(/ティ/g, 'ti');
        let romaji = toRomaji(preVal);
        romaji = romaji.replace(/([aiueo])\1/g, '$1-');
        setTextInput(toKatakana(romaji, { IMEMode: true, customKanaMapping: { di: 'ディ', ti: 'ティ' } }));
      }
    } else {
      // Vietnamese typing mode
      setTextInput(val);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (isAnswered) {
        nextQuestion();
      } else {
        handleTypingSubmit();
      }
    } else if (e.key === 'Tab' && questions[currentIdx].subType === 'vn_to_jp') {
      e.preventDefault();
      setImeMode(prev => prev === 'hira' ? 'kata' : 'hira');
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  // --- RENDERERS ---
  const renderSetup = () => (
    <div className="flex flex-col items-center justify-center w-full min-h-full p-4 relative z-10">
      <div className="w-full max-w-4xl flex mb-4">
        <button onClick={onClose} className="flex items-center gap-2 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 font-bold text-sm transition-colors">
          <ChevronLeft size={20} /> Quay lại
        </button>
      </div>
      
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 w-full max-w-4xl flex flex-col md:flex-row">
        {/* Left Side */}
        <div className="w-full md:w-2/3 p-6 flex flex-col gap-6">
          <div>
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-3 uppercase tracking-wider">1. CHỌN DẠNG BÀI TẬP</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button onClick={() => toggleType('type1')} className={`relative p-3 rounded-2xl border-2 text-left transition-all ${selectedTypes.includes('type1') ? `border-blue-500 bg-blue-50 dark:bg-blue-900/20` : 'border-slate-200 dark:border-slate-700 hover:border-blue-300'}`}>
                {selectedTypes.includes('type1') && <div className="absolute -top-2 -right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white"><Check size={12} /></div>}
                <div className="flex items-center justify-center mb-2 text-blue-500 bg-white dark:bg-slate-800 w-10 h-10 rounded-full shadow-sm"><HelpCircle size={20} /></div>
                <div className="font-bold text-blue-600 dark:text-blue-400 mb-1 text-sm">Trắc nghiệm</div>
                <div className="text-[10px] text-slate-500 leading-tight">Chọn nghĩa đúng<br/>(ABCD)</div>
              </button>
              
              <button onClick={() => toggleType('type2')} className={`relative p-3 rounded-2xl border-2 text-left transition-all ${selectedTypes.includes('type2') ? `border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20` : 'border-slate-200 dark:border-slate-700 hover:border-emerald-300'}`}>
                {selectedTypes.includes('type2') && <div className="absolute -top-2 -right-2 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-white"><Check size={12} /></div>}
                <div className="flex items-center justify-center mb-2 text-emerald-500 bg-white dark:bg-slate-800 w-10 h-10 rounded-full shadow-sm"><Type size={20} /></div>
                <div className="font-bold text-emerald-600 dark:text-emerald-400 mb-1 text-sm">Đục lỗ</div>
                <div className="text-[10px] text-slate-500 leading-tight">Điền trợ từ/từ khóa<br/>vào chỗ trống</div>
              </button>

              <button onClick={() => toggleType('type3')} className={`relative p-3 rounded-2xl border-2 text-left transition-all ${selectedTypes.includes('type3') ? `border-purple-500 bg-purple-50 dark:bg-purple-900/20` : 'border-slate-200 dark:border-slate-700 hover:border-purple-300'}`}>
                {selectedTypes.includes('type3') && <div className="absolute -top-2 -right-2 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center text-white"><Check size={12} /></div>}
                <div className="flex items-center justify-center mb-2 text-purple-500 bg-white dark:bg-slate-800 w-10 h-10 rounded-full shadow-sm"><PenTool size={20} /></div>
                <div className="font-bold text-purple-600 dark:text-purple-400 mb-1 text-sm">Tự luận</div>
                <div className="text-[10px] text-slate-500 leading-tight">Gõ dịch câu<br/>bằng phím</div>
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-3 uppercase tracking-wider">2. SỐ LƯỢNG CÂU HỎI</h3>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`w-full p-3.5 pr-4 flex items-center justify-between rounded-xl border-2 transition-all ${
                  isDropdownOpen
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 shadow-[0_0_0_4px_rgba(59,130,246,0.1)]'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm'
                } font-bold outline-none`}
              >
                <span>{questionCount} câu {questionCount === grammarPoint.examples.length ? '(Tối đa số ví dụ)' : ''}</span>
                <motion.div animate={{ rotate: isDropdownOpen ? 180 : 0 }} className="text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </motion.div>
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden z-50 origin-top"
                  >
                    <div className="max-h-64 overflow-y-auto py-1">
                      {Array.from(new Set([...[5, 10, 20, 40, 50, 60, 70, 80, 90, 100], grammarPoint.examples.length]))
                        .sort((a, b) => a - b)
                        .map(num => {
                          const isDisabled = num > grammarPoint.examples.length;
                          const isSelected = num === questionCount;
                          return (
                            <button
                              key={num}
                              disabled={isDisabled}
                              onClick={() => {
                                setQuestionCount(num);
                                setIsDropdownOpen(false);
                              }}
                              className={`w-full text-left px-4 py-3 text-sm font-bold transition-all flex items-center justify-between ${
                                isDisabled
                                  ? 'opacity-40 cursor-not-allowed bg-slate-50 dark:bg-slate-900/50 text-slate-400'
                                  : isSelected
                                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                                    : 'hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-200'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="w-16">{num} câu</span>
                                {isSelected && <Check size={16} className="text-blue-500" />}
                              </div>
                              {num === grammarPoint.examples.length && (
                                <span className={`text-[10px] px-2 py-0.5 rounded-md ${isDisabled ? 'bg-slate-200 text-slate-500 dark:bg-slate-700' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200/50'}`}>
                                  Mức tối đa
                                </span>
                              )}
                            </button>
                          );
                        })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          <button onClick={generateQuestions} className={`w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 mt-auto`}>
            <Trophy size={18} /> BẮT ĐẦU LUYỆN TẬP
          </button>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/3 bg-slate-50 dark:bg-slate-800/50 p-6 flex flex-col justify-center border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-800 relative overflow-hidden rounded-b-[23px] md:rounded-none md:rounded-r-[23px]">
          {/* Deco */}
          <div className="absolute -right-10 -bottom-10 text-[120px] opacity-5 pointer-events-none font-jp font-black">{grammarPoint.icon || '文'}</div>
          
          <div className="relative z-10">
            <h2 className="text-lg font-black text-slate-800 dark:text-slate-100 leading-tight mb-4">BÀI TẬP NGỮ PHÁP</h2>
            
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm mb-4">
              <div className="text-[10px] font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Cấu trúc đang học</div>
              <div className="text-xl font-black text-blue-600 dark:text-blue-400 font-jp mb-1">{grammarPoint.title}</div>
              <div className="text-xs font-medium text-slate-600 dark:text-slate-300">{grammarPoint.meaning}</div>
            </div>

            <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed bg-blue-50/50 dark:bg-blue-900/20 p-3 rounded-xl border border-blue-100/50 dark:border-blue-900/30">
              <span className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5 mb-1"><Lightbulb size={14}/> Gợi ý:</span>
              Hệ thống sẽ lấy các câu ví dụ từ cấu trúc này và từ vựng của <b>{lessonName}</b> để tạo câu hỏi động.
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPlaying = () => {
    const q = questions[currentIdx];
    const progress = (currentIdx / questions.length) * 100;

    return (
      <div className="flex flex-col w-full h-full max-w-4xl mx-auto px-4 py-2 md:py-4 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center gap-1.5">
              <BookIcon type={q.type} />
              {q.type === 'type1' ? 'Trắc nghiệm' : q.type === 'type2' ? 'Đục lỗ' : 'Tự luận'}
            </div>
            <div className="hidden sm:block text-sm font-bold text-slate-500">{grammarPoint.title}</div>
          </div>
          
          <button onClick={onClose} className="flex items-center gap-2 text-slate-500 hover:text-rose-500 transition-colors px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-900">
            <X size={16} /> Thoát
          </button>
        </div>

        {/* Progress & Stats */}
        <div className="flex items-center gap-4 md:gap-8 mb-3 md:mb-4 bg-white dark:bg-slate-900 p-2 md:p-3 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3 font-bold text-slate-700 dark:text-slate-300">
            <span className="w-8 text-center">{currentIdx + 1}/{questions.length}</span>
            <div className="w-32 md:w-64 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <div className="w-px h-6 bg-slate-200 dark:bg-slate-700"></div>
          <div className="flex items-center gap-4 text-sm font-black">
            <div className="flex items-center gap-1.5 text-amber-500"><Flame size={16} /> {combo}</div>
            <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400"><Star size={16} /> {score}</div>
          </div>
        </div>

        {/* Question Area */}
        <div className="flex-1 flex flex-col items-center w-full max-w-3xl mx-auto">
          {/* Question Text */}
          <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-lg border border-slate-100 dark:border-slate-800 w-full p-4 md:p-6 mb-4 text-center relative overflow-hidden flex-shrink-0">
            <div className="text-xs font-black text-slate-400 mb-2 uppercase tracking-widest">
              {q.subType === 'jp_to_vn' ? 'Dịch sang tiếng Việt' : 'Dịch sang tiếng Nhật'}
            </div>
            <h2 className={`text-xl md:text-3xl font-black text-slate-800 dark:text-slate-100 leading-tight ${q.subType === 'jp_to_vn' || q.type === 'type2' ? 'font-jp text-2xl md:text-4xl' : ''}`}>
              {q.questionText}
            </h2>
            {q.subType === 'jp_to_vn' && (
              <div className="mt-4 text-sm font-medium text-slate-500">
                {q.type === 'type2' && !isAnswered
                  ? (q.readingWithBlanks || q.example.reading || q.example.romaji)
                  : (q.example.reading || q.example.romaji)
                }
              </div>
            )}
          </div>

          {/* Interaction Area based on Type */}
          {q.type === 'type3' ? (
            <div className="w-full flex flex-col items-center">
              <div className={`relative w-full bg-white dark:bg-slate-900 rounded-2xl border-[3px] transition-all duration-300 ${isAnswered ? (textInput.toLowerCase().trim() === q.correctAnswer.toLowerCase().trim() || textInput === q.correctAnswer ? 'border-emerald-400 shadow-[0_0_30px_rgba(52,211,153,0.2)]' : 'border-rose-400 shadow-[0_0_30px_rgba(251,113,133,0.2)]') : 'border-blue-400/50 focus-within:border-blue-500 shadow-md'}`}>
                <input
                  ref={inputRef}
                  type="text"
                  value={textInput}
                  onChange={handleTextInputChange}
                  onKeyDown={handleKeyDown}
                  readOnly={isAnswered}
                  placeholder={q.subType === 'vn_to_jp' ? "Nhập romaji..." : "Nhập tiếng Việt..."}
                  className={`w-full bg-transparent py-3 md:py-4 px-5 md:px-6 text-lg md:text-xl font-bold outline-none placeholder:text-slate-300 dark:placeholder:text-slate-600 ${q.subType === 'vn_to_jp' ? 'font-jp' : ''} ${isAnswered ? 'text-slate-500' : 'text-slate-800 dark:text-slate-100'}`}
                />
              </div>

              {q.subType === 'vn_to_jp' && (
                <div className="mt-3 flex flex-col items-center w-full max-w-xs">
                  <div className="flex gap-3 w-full">
                    <button onClick={() => { setImeMode('hira'); inputRef.current?.focus(); }} className={`flex-1 py-1.5 rounded-xl font-bold text-sm flex justify-center gap-1.5 border-2 transition-all ${imeMode === 'hira' ? 'border-blue-500 text-blue-600 bg-blue-50' : 'border-slate-200 bg-white text-slate-500'}`}>
                      <span className="font-jp">あ</span> Hira
                    </button>
                    <button onClick={() => { setImeMode('kata'); inputRef.current?.focus(); }} className={`flex-1 py-1.5 rounded-xl font-bold text-sm flex justify-center gap-1.5 border-2 transition-all ${imeMode === 'kata' ? 'border-blue-500 text-blue-600 bg-blue-50' : 'border-slate-200 bg-white text-slate-500'}`}>
                      <span className="font-jp">ア</span> Kata
                    </button>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1.5 flex items-center gap-1"><Keyboard size={12}/> Nhấn Tab để đổi</div>
                </div>
              )}

              {!isAnswered && (
                <button onClick={handleTypingSubmit} className="mt-4 px-6 py-2.5 bg-slate-800 hover:bg-slate-900 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-white rounded-xl font-bold transition-all shadow-md active:scale-95">
                  Kiểm tra <kbd className="ml-2 font-mono text-[10px] bg-white/20 dark:bg-black/10 px-1.5 py-0.5 rounded">ENTER</kbd>
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3 w-full flex-shrink-0">
              {q.options?.map((opt, idx) => {
                const isSelected = selectedAnswerIdx === idx;
                const isCorrectOption = opt === q.correctAnswer;
                
                let btnStyle = "bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-blue-400 hover:bg-slate-50 dark:hover:bg-slate-700/50";
                let icon = null;

                if (isAnswered) {
                  if (isCorrectOption) {
                    btnStyle = "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500 text-emerald-700 dark:text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]";
                    icon = <Check size={20} className="text-emerald-500" />;
                  } else if (isSelected) {
                    btnStyle = "bg-rose-50 dark:bg-rose-900/20 border-rose-500 text-rose-700 dark:text-rose-400";
                    icon = <X size={20} className="text-rose-500" />;
                  } else {
                    btnStyle = "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 opacity-50";
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleMCQAnswer(idx)}
                    className={`relative w-full p-3 md:p-4 rounded-xl flex items-center gap-3 transition-all duration-300 text-left ${btnStyle} ${!isAnswered ? 'active:scale-95' : ''}`}
                  >
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${isAnswered && isCorrectOption ? 'bg-emerald-500 text-white' : isAnswered && isSelected ? 'bg-rose-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500'}`}>
                      {['A', 'B', 'C', 'D'][idx]}
                    </div>
                    <span className={`text-sm md:text-base font-bold flex-1 ${q.subType === 'vn_to_jp' || q.type === 'type2' ? 'font-jp' : ''}`}>
                      {opt}
                    </span>
                    {icon}
                  </button>
                );
              })}
            </div>
          )}

          {/* Answer Feedback */}
          {isAnswered && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className={`w-full mt-4 p-3 md:p-4 rounded-xl border flex flex-col md:flex-row items-center justify-between gap-4 ${textInput.toLowerCase().trim() === q.correctAnswer.toLowerCase().trim() || q.options?.[selectedAnswerIdx!] === q.correctAnswer || (q.type === 'type3' && q.subType === 'vn_to_jp' && ['correct'].includes('correct')) ? 'bg-emerald-50/80 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800' : 'bg-rose-50/80 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800'}`}
            >
              <div className="flex-1 text-center md:text-left">
                <div className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-60">ĐÁP ÁN ĐÚNG</div>
                <div className={`text-lg md:text-xl font-bold ${q.subType === 'vn_to_jp' || q.type === 'type2' ? 'font-jp' : ''}`}>{q.correctAnswer}</div>
                
                <div className="mt-2 text-xs md:text-sm opacity-90 border-t border-current pt-2 border-opacity-20 max-w-2xl">
                  <span className="font-bold flex items-center gap-1.5 mb-1"><Lightbulb size={14} /> Giải thích: </span>
                  {q.type === 'type1' && (
                    <span>Câu này có nghĩa là "{q.example.vietnamese}". Được sử dụng với cấu trúc <b>{grammarPoint.title}</b> mang ý nghĩa "{grammarPoint.meaning}".</span>
                  )}
                  {q.type === 'type2' && (
                    <span>Từ cần điền là <b>{q.correctAnswer}</b> để hoàn thiện cấu trúc <b>{grammarPoint.title}</b> ({grammarPoint.meaning}). Ý nghĩa của câu là: "{q.example.vietnamese}".</span>
                  )}
                  {q.type === 'type3' && (
                    <span>Dịch đúng của câu là "{q.correctAnswer}". Áp dụng cấu trúc <b>{grammarPoint.title}</b> ({grammarPoint.meaning}).</span>
                  )}
                </div>
              </div>
              <button onClick={nextQuestion} className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center gap-2 transition-all shadow-md active:scale-95 whitespace-nowrap text-sm shrink-0">
                Tiếp tục <ArrowRight size={16} />
              </button>
            </motion.div>
          )}

        </div>
      </div>
    );
  };

  const renderResult = () => {
    const accuracy = Math.round((correctCount / questions.length) * 100) || 0;
    
    return (
      <div className="flex items-center justify-center w-full h-full p-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
          className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 w-full max-w-lg overflow-hidden flex flex-col p-8 md:p-10 text-center relative"
        >
          <div className="w-24 h-24 mx-auto bg-amber-50 dark:bg-amber-900/30 rounded-full flex items-center justify-center mb-6">
            <Trophy size={48} className="text-amber-500" />
          </div>
          
          <h2 className="text-sm font-black text-blue-500 uppercase tracking-widest mb-1">HOÀN THÀNH BÀI TẬP</h2>
          <div className="text-5xl font-black text-slate-800 dark:text-slate-100 mb-2">{score}</div>
          <p className="text-sm font-medium text-slate-500 mb-8">{accuracy >= 80 ? 'Rất tuyệt vời! 🎉' : accuracy >= 50 ? 'Khá lắm! Cố gắng thêm nhé 👍' : 'Cần ôn tập thêm về ngữ pháp này 💪'}</p>

          <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-2xl flex flex-col items-center">
              <span className="text-xs font-bold text-emerald-600/70 mb-1">Số câu đúng</span>
              <span className="text-2xl font-black text-emerald-600">{correctCount}</span>
            </div>
            <div className="bg-rose-50 dark:bg-rose-900/20 p-4 rounded-2xl flex flex-col items-center">
              <span className="text-xs font-bold text-rose-600/70 mb-1">Số câu sai</span>
              <span className="text-2xl font-black text-rose-600">{wrongCount}</span>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl flex flex-col items-center">
              <span className="text-xs font-bold text-blue-600/70 mb-1">Độ chính xác</span>
              <span className="text-2xl font-black text-blue-600">{accuracy}%</span>
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-2xl flex flex-col items-center">
              <span className="text-xs font-bold text-amber-600/70 mb-1">Combo Max</span>
              <span className="text-2xl font-black text-amber-600">{maxCombo}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setScreen('setup')} className="flex-1 py-3.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <RotateCcw size={18} /> Làm lại
            </button>
            <button onClick={onClose} className="flex-1 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center justify-center gap-2 shadow-lg transition-colors">
              Hoàn tất
            </button>
          </div>
        </motion.div>
      </div>
    );
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex flex-col font-sans animate-in fade-in duration-300 overflow-y-auto">
      <div className="absolute inset-0 bg-slate-50 dark:bg-slate-950" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/japanese-pattern.png')]" />
      
      {/* Decorative gradient blobs */}
      {screen !== 'playing' && (
        <>
          <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-400/20 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] bg-purple-400/20 blur-[100px] rounded-full pointer-events-none" />
        </>
      )}

      {screen === 'setup' && renderSetup()}
      {screen === 'playing' && renderPlaying()}
      {screen === 'result' && renderResult()}
    </div>,
    document.body
  );
};

// Helper icon component
const BookIcon = ({type}: {type: string}) => {
  if (type === 'type1') return <HelpCircle size={14} />;
  if (type === 'type2') return <Type size={14} />;
  return <PenTool size={14} />;
};
