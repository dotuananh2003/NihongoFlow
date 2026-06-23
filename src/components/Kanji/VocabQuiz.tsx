import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, X, Trophy, Flame, Star, Clock, Check, ArrowRight, RotateCcw, List as ListIcon } from 'lucide-react';
import type { VocabExample } from '../../data/kanjiData';

interface VocabQuizProps {
  vocabList: VocabExample[];
  lessonName: string;
  onClose: () => void;
  isJPD123?: boolean;
}

type QuizMode = 'vn_to_jp' | 'jp_to_vn';
type ScreenState = 'setup' | 'playing' | 'result';

interface Question {
  type: QuizMode;
  correctVocab: VocabExample;
  options: VocabExample[];
}

export const VocabQuiz: React.FC<VocabQuizProps> = ({ vocabList, lessonName, onClose, isJPD123 = true }) => {
  const themeColor = isJPD123 ? 'blue' : 'rose';

  // Setup States
  const [screen, setScreen] = useState<ScreenState>('setup');
  const [selectedModes, setSelectedModes] = useState<QuizMode[]>(['vn_to_jp']);
  const [scope, setScope] = useState('lesson');
  const [questionCount, setQuestionCount] = useState<number>(10);

  // Playing States
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [selectedAnswerIdx, setSelectedAnswerIdx] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // Timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (screen === 'playing') {
      timer = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [screen]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const toggleMode = (mode: QuizMode) => {
    setSelectedModes(prev => {
      if (prev.includes(mode)) {
        if (prev.length === 1) return prev; // Don't allow empty
        return prev.filter(m => m !== mode);
      }
      return [...prev, mode];
    });
  };

  const startGame = () => {
    if (vocabList.length < 4) {
      alert('Danh sách từ vựng phải có ít nhất 4 từ để tạo trắc nghiệm!');
      return;
    }

    const availableVocabs = shuffleArray([...vocabList]);
    const actualCount = Math.min(questionCount, availableVocabs.length);
    const selectedVocabs = availableVocabs.slice(0, actualCount);

    const generatedQuestions: Question[] = selectedVocabs.map(vocab => {
      // Pick 3 distractors
      const distractors = shuffleArray(vocabList.filter(v => v.kanji !== vocab.kanji)).slice(0, 3);
      const options = shuffleArray([vocab, ...distractors]);
      
      // Random mode if both selected
      let type: QuizMode = selectedModes[0];
      if (selectedModes.length > 1) {
        type = Math.random() > 0.5 ? 'vn_to_jp' : 'jp_to_vn';
      }

      return {
        type,
        correctVocab: vocab,
        options
      };
    });

    setQuestions(generatedQuestions);
    setCurrentIdx(0);
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setCorrectCount(0);
    setWrongCount(0);
    setTimeElapsed(0);
    setSelectedAnswerIdx(null);
    setIsAnswered(false);
    setScreen('playing');
  };

  const handleAnswer = (index: number) => {
    if (isAnswered) return;
    
    setSelectedAnswerIdx(index);
    setIsAnswered(true);

    const isCorrect = questions[currentIdx].options[index].kanji === questions[currentIdx].correctVocab.kanji;
    
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
      const newCombo = combo + 1;
      setCombo(newCombo);
      setMaxCombo(prev => Math.max(prev, newCombo));
      setScore(prev => prev + 10 + (newCombo > 1 ? newCombo * 2 : 0)); // Bonus points for combo
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
    } else {
      setScreen('result');
    }
  };

  const renderSetup = () => (
    <div className="flex flex-col items-center justify-center w-full min-h-full p-2 md:p-4 relative">
      <div className="w-full max-w-4xl flex mb-4">
        <button 
          onClick={onClose}
          className={`flex items-center gap-2 text-slate-500 hover:text-${themeColor}-600 dark:hover:text-${themeColor}-400 font-bold text-sm transition-colors`}
        >
          <ChevronLeft size={20} /> Quay lại
        </button>
      </div>
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 w-full max-w-4xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side - Setup Options */}
        <div className="w-full md:w-2/3 p-4 md:p-6 flex flex-col gap-4 md:gap-5">
          <div>
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2.5 uppercase tracking-wider">1. CHỌN CHẾ ĐỘ ĐỀ</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <button 
                onClick={() => toggleMode('vn_to_jp')}
                className={`relative p-3 rounded-2xl border-2 text-left transition-all ${
                  selectedModes.includes('vn_to_jp') 
                    ? `border-${themeColor}-500 bg-${themeColor}-50 dark:bg-${themeColor}-900/20` 
                    : 'border-slate-200 dark:border-slate-700 hover:border-${themeColor}-300'
                }`}
              >
                {selectedModes.includes('vn_to_jp') && (
                  <div className={`absolute -top-2.5 -right-2.5 w-5 h-5 bg-${themeColor}-500 rounded-full flex items-center justify-center text-white`}>
                    <Check size={12} />
                  </div>
                )}
                <div className="flex items-center gap-2 mb-1 justify-center">
                  <span className="text-xl">🇻🇳</span>
                  <ArrowRight size={16} className="text-slate-400" />
                  <span className="text-xl">🇯🇵</span>
                </div>
                <div className={`font-bold text-center text-${themeColor}-600 dark:text-${themeColor}-400 mb-0.5 text-sm`}>Việt → Nhật</div>
                <div className="text-[10px] text-center text-slate-500 leading-tight">Đề tiếng Việt<br/>chọn tiếng Nhật</div>
              </button>

              <button 
                onClick={() => toggleMode('jp_to_vn')}
                className={`relative p-3 rounded-2xl border-2 text-left transition-all ${
                  selectedModes.includes('jp_to_vn') 
                    ? `border-${themeColor}-500 bg-${themeColor}-50 dark:bg-${themeColor}-900/20` 
                    : 'border-slate-200 dark:border-slate-700 hover:border-${themeColor}-300'
                }`}
              >
                {selectedModes.includes('jp_to_vn') && (
                  <div className={`absolute -top-2.5 -right-2.5 w-5 h-5 bg-${themeColor}-500 rounded-full flex items-center justify-center text-white`}>
                    <Check size={12} />
                  </div>
                )}
                <div className="flex items-center gap-2 mb-1 justify-center">
                  <span className="text-xl">🇯🇵</span>
                  <ArrowRight size={16} className="text-slate-400" />
                  <span className="text-xl">🇻🇳</span>
                </div>
                <div className={`font-bold text-center text-${themeColor}-600 dark:text-${themeColor}-400 mb-0.5 text-sm`}>Nhật → Việt</div>
                <div className="text-[10px] text-center text-slate-500 leading-tight">Đề tiếng Nhật<br/>chọn tiếng Việt</div>
              </button>
            </div>
            <p className="text-[10px] text-slate-400 mt-2 flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full bg-${themeColor}-500`} />
              Bạn có thể chọn 1 hoặc cả 2 chế độ
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2.5 uppercase tracking-wider">2. PHẠM VI TỪ VỰNG</h3>
            <div className="flex flex-col gap-1 bg-slate-50 dark:bg-slate-800/50 p-1.5 rounded-2xl border border-slate-100 dark:border-slate-700/50">
              {['all', 'lesson', 'selected', 'favorite'].map((opt, i) => (
                <label 
                  key={i} 
                  onClick={() => setScope(opt)}
                  className={`flex items-center gap-3 p-2 rounded-xl cursor-pointer transition-colors ${scope === opt ? 'bg-white dark:bg-slate-700 shadow-sm' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                >
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${scope === opt ? `border-${themeColor}-500` : 'border-slate-300 dark:border-slate-600'}`}>
                    {scope === opt && <div className={`w-2 h-2 rounded-full bg-${themeColor}-500`} />}
                  </div>
                  <span className={`text-xs font-medium ${scope === opt ? 'text-slate-800 dark:text-slate-200' : 'text-slate-500 dark:text-slate-400'}`}>
                    {opt === 'all' ? 'Tất cả từ vựng' : opt === 'lesson' ? `Lesson hiện tại (${lessonName})` : opt === 'selected' ? 'Các từ đã chọn' : 'Các từ yêu thích'}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2.5 uppercase tracking-wider">3. SỐ CÂU HỎI</h3>
            <div className="flex flex-wrap gap-2">
              {[10, 20, 30, 50, 100].map(num => (
                <button
                  key={num}
                  onClick={() => setQuestionCount(num)}
                  className={`flex-1 min-w-[50px] py-1.5 rounded-xl text-xs font-bold transition-all border-2 ${
                    questionCount === num 
                      ? `border-${themeColor}-500 text-${themeColor}-600 bg-${themeColor}-50 dark:bg-${themeColor}-900/20` 
                      : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:border-slate-300'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
          
          <button 
            onClick={startGame}
            className={`w-full py-3 bg-${themeColor}-500 hover:bg-${themeColor}-600 text-white rounded-2xl font-bold text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 mt-auto`}
          >
            <Trophy size={18} /> BẮT ĐẦU
          </button>
        </div>

        {/* Right Side - Info */}
        <div className={`w-full md:w-1/3 bg-slate-50 dark:bg-slate-800/50 p-4 md:p-6 flex flex-col justify-center border-l border-slate-100 dark:border-slate-800`}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-2xl bg-${themeColor}-100 dark:bg-${themeColor}-900/50 text-${themeColor}-500 flex items-center justify-center shrink-0`}>
              <ListIcon size={20} />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-800 dark:text-slate-100 leading-tight">TRẮC NGHIỆM TỪ VỰNG</h2>
              <p className="text-[10px] text-slate-500">Luyện tập và kiểm tra vốn từ vựng</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm mb-4">
            <div className="text-[10px] font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Thông tin bài học</div>
            <div className="text-xs text-slate-700 dark:text-slate-300 font-medium mb-1">{isJPD123 ? 'JPD123' : 'JPD113'} • {lessonName}</div>
            <div className="text-xs text-slate-700 dark:text-slate-300 font-medium">Tổng số: <span className={`text-${themeColor}-500 font-bold`}>{vocabList.length}</span> từ vựng</div>
          </div>

          <div className="text-[10px] text-slate-400 flex gap-1.5 leading-relaxed">
            <span>💡</span>
            <p>Hệ thống sẽ tự động tạo đề dựa trên lựa chọn của bạn và xáo trộn vị trí đáp án ngẫu nhiên.</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPlaying = () => {
    const q = questions[currentIdx];
    const progress = ((currentIdx) / questions.length) * 100;

    return (
      <div className="flex flex-col w-full h-full max-w-4xl mx-auto px-4 py-2 md:py-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setScreen('setup')} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors font-medium">
            <ChevronLeft size={20} /> Trắc nghiệm từ vựng
          </button>
          <div className={`px-4 py-1.5 rounded-full bg-${themeColor}-50 dark:bg-${themeColor}-900/30 text-${themeColor}-600 dark:text-${themeColor}-400 text-xs font-bold`}>
            {isJPD123 ? 'JPD123' : 'JPD113'} • {lessonName}
          </div>
          <button onClick={onClose} className="flex items-center gap-2 text-slate-500 hover:text-rose-500 transition-colors px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg text-sm">
            <X size={16} /> Thoát
          </button>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-sm font-bold text-slate-700 dark:text-slate-300 whitespace-nowrap">Câu {currentIdx + 1} / {questions.length}</span>
          <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div className={`h-full bg-${themeColor}-500 transition-all duration-300`} style={{ width: `${progress}%` }} />
          </div>
          <span className="text-sm font-bold text-slate-500">{Math.round(progress)}%</span>
        </div>

        {/* Main Card */}
        <div className="flex-1 flex flex-col items-center w-full max-w-2xl mx-auto">
          <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl border border-slate-100 dark:border-slate-800 w-full p-4 md:p-6 mb-4 relative overflow-hidden flex flex-col">
            
            <div className="flex justify-center mb-3">
              <div className={`px-3 py-0.5 rounded-full text-[10px] font-bold bg-${themeColor}-50 dark:bg-${themeColor}-900/30 text-${themeColor}-500 border border-${themeColor}-100 dark:border-${themeColor}-800`}>
                {q.type === 'vn_to_jp' ? 'Việt → Nhật' : 'Nhật → Việt'}
              </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center text-center mb-4 min-h-[80px]">
              {q.type === 'vn_to_jp' ? (
                <h2 className="text-2xl md:text-4xl font-black text-slate-800 dark:text-slate-100">{q.correctVocab.meaning}</h2>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <h2 className="text-4xl md:text-5xl font-jp font-bold text-slate-800 dark:text-slate-100">{q.correctVocab.kanji}</h2>
                  <span className="text-sm md:text-base font-medium text-slate-500">{q.correctVocab.hiragana}</span>
                </div>
              )}
            </div>

            {/* Options */}
            <div className="flex flex-col gap-2 w-full">
              {q.options.map((opt, idx) => {
                const isSelected = selectedAnswerIdx === idx;
                const isCorrectOption = opt.kanji === q.correctVocab.kanji;
                
                let btnStyle = `bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-${themeColor}-300 hover:bg-slate-50 dark:hover:bg-slate-700/50`;
                let icon = null;

                if (isAnswered) {
                  if (isCorrectOption) {
                    btnStyle = `bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500 text-emerald-700 dark:text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]`;
                    icon = <Check size={20} className="text-emerald-500" />;
                  } else if (isSelected) {
                    btnStyle = `bg-rose-50 dark:bg-rose-900/20 border-rose-500 text-rose-700 dark:text-rose-400 opacity-80`;
                    icon = <X size={20} className="text-rose-500" />;
                  } else {
                    btnStyle = `bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 opacity-50`;
                  }
                }

                const labels = ['A', 'B', 'C', 'D'];

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleAnswer(idx)}
                    className={`relative w-full p-3 rounded-2xl flex items-center gap-3 transition-all duration-300 text-left ${btnStyle} ${!isAnswered ? 'active:scale-[0.98]' : ''}`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                      isAnswered && isCorrectOption ? 'bg-emerald-500 text-white' :
                      isAnswered && isSelected ? 'bg-rose-500 text-white' :
                      `bg-slate-100 dark:bg-slate-700 text-slate-500`
                    }`}>
                      {labels[idx]}
                    </div>
                    
                    <div className="flex-1 flex flex-col">
                      {q.type === 'vn_to_jp' ? (
                        <>
                          <span className="text-base font-jp font-bold text-slate-800 dark:text-slate-100 leading-tight">{opt.kanji}</span>
                          <span className="text-[10px] text-slate-500">{opt.hiragana}</span>
                        </>
                      ) : (
                        <span className="text-base font-bold text-slate-800 dark:text-slate-100 capitalize">{opt.meaning}</span>
                      )}
                    </div>

                    {icon && <div className="shrink-0 scale-75">{icon}</div>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="w-full flex items-center justify-between">
            <div className="flex gap-4 md:gap-6 bg-white dark:bg-slate-900 px-4 py-2 md:py-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                  <Flame size={12} className={combo > 2 ? 'text-amber-500 animate-pulse' : 'text-slate-400'} /> Combo
                </div>
                <span className={`text-lg font-black leading-none ${combo > 0 ? 'text-amber-500' : 'text-slate-700 dark:text-slate-300'}`}>{combo}</span>
              </div>
              <div className="w-px bg-slate-200 dark:bg-slate-700" />
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                  <Star size={12} className="text-amber-400" /> Điểm
                </div>
                <span className="text-lg font-black leading-none text-slate-700 dark:text-slate-300">{score}</span>
              </div>
              <div className="w-px bg-slate-200 dark:bg-slate-700 hidden md:block" />
              <div className="flex flex-col items-center hidden md:flex">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                  <Clock size={12} className="text-blue-400" /> Thời gian
                </div>
                <span className="text-lg font-black leading-none text-slate-700 dark:text-slate-300 font-mono">{formatTime(timeElapsed)}</span>
              </div>
            </div>

            {isAnswered && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={nextQuestion}
                className={`px-6 py-3 rounded-xl bg-${themeColor}-500 hover:bg-${themeColor}-600 text-white font-bold shadow-lg flex items-center gap-2 transition-all text-sm`}
              >
                Câu tiếp <ArrowRight size={16} />
              </motion.button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderResult = () => {
    const accuracy = Math.round((correctCount / questions.length) * 100) || 0;
    
    return (
      <div className="flex items-center justify-center w-full h-full p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 w-full max-w-lg overflow-hidden flex flex-col p-8 md:p-12 text-center relative"
        >
          {/* Confetti simulation overlay could go here */}
          
          <div className="w-24 h-24 mx-auto bg-amber-50 dark:bg-amber-900/30 rounded-full flex items-center justify-center mb-6">
            <Trophy size={48} className="text-amber-500" />
          </div>
          
          <h2 className={`text-sm font-black text-${themeColor}-500 uppercase tracking-widest mb-2`}>KẾT QUẢ</h2>
          <div className="text-6xl font-black text-slate-800 dark:text-slate-100 mb-2">{score}</div>
          <p className="text-sm font-medium text-slate-500 mb-8">
            {accuracy >= 80 ? 'Rất tuyệt vời! 🎉' : accuracy >= 50 ? 'Khá lắm! Cố gắng thêm nhé 👍' : 'Cần ôn tập nhiều hơn 💪'}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="flex flex-col items-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
              <span className="text-xs font-bold text-slate-400 mb-1">Đúng</span>
              <span className="text-2xl font-black text-emerald-500">{correctCount}</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
              <span className="text-xs font-bold text-slate-400 mb-1">Sai</span>
              <span className="text-2xl font-black text-rose-500">{wrongCount}</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
              <span className="text-xs font-bold text-slate-400 mb-1">Accuracy</span>
              <span className={`text-2xl font-black text-${themeColor}-500`}>{accuracy}%</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
              <span className="text-xs font-bold text-slate-400 mb-1">Max Combo</span>
              <span className="text-2xl font-black text-amber-500">{maxCombo}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={() => setScreen('setup')}
              className="flex-1 py-3.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <RotateCcw size={18} /> Làm lại
            </button>
            <button 
              onClick={onClose}
              className={`flex-1 py-3.5 rounded-xl bg-${themeColor}-500 hover:bg-${themeColor}-600 text-white font-bold flex items-center justify-center gap-2 shadow-lg transition-colors`}
            >
              <ListIcon size={18} /> Quay lại
            </button>
          </div>
        </motion.div>
      </div>
    );
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-[#F8FAFC] dark:bg-slate-950 flex flex-col font-sans animate-in fade-in duration-300 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/japanese-pattern.png')]" />
      
      {screen === 'setup' && renderSetup()}
      {screen === 'playing' && renderPlaying()}
      {screen === 'result' && renderResult()}
    </div>,
    document.body
  );
};
