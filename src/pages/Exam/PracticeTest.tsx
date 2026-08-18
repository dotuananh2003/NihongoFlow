import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Book, CheckCircle2, XCircle, ArrowRight, AlertCircle, RefreshCw, X, Trophy, Flame, Star, Lightbulb, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Sử dụng dữ liệu giả lập
import practiceData from '../../data/exam/jpd123_practice.json';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const PracticeTest = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const location = useLocation();
  const count = location.state?.count || 10;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Shuffle and slice
    const shuffled = [...practiceData].sort(() => 0.5 - Math.random());
    const selected = count === 'all' ? shuffled : shuffled.slice(0, Number(count));
    setQuestions(selected);
  }, [count]);

  if (questions.length === 0) return null;

  const currentQuestion = questions[currentIndex];
  const isAnswered = selectedOption !== null;
  const isCorrect = selectedOption === currentQuestion.correctAnswer;

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    if (index === currentQuestion.correctAnswer) {
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

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    const accuracy = Math.round((correctCount / questions.length) * 100) || 0;
    return (
      <div className="flex items-center justify-center w-full min-h-[calc(100vh-80px)] p-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
          className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 w-full max-w-lg overflow-hidden flex flex-col p-8 md:p-10 text-center relative"
        >
          <div className="w-24 h-24 mx-auto bg-amber-50 dark:bg-amber-900/30 rounded-full flex items-center justify-center mb-6">
            <Trophy size={48} className="text-amber-500" />
          </div>
          
          <h2 className="text-sm font-black text-blue-500 uppercase tracking-widest mb-1">HOÀN THÀNH BÀI LUYỆN TẬP</h2>
          <div className="text-5xl font-black text-slate-800 dark:text-slate-100 mb-2">{score}</div>
          <p className="text-sm font-medium text-slate-500 mb-8">{accuracy >= 80 ? 'Rất tuyệt vời! 🎉' : accuracy >= 50 ? 'Khá lắm! Cố gắng thêm nhé 👍' : 'Cần ôn tập thêm về bài này 💪'}</p>

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
            <button 
              onClick={() => {
                const shuffled = [...practiceData].sort(() => 0.5 - Math.random());
                const selected = count === 'all' ? shuffled : shuffled.slice(0, Number(count));
                setQuestions(selected);
                setCurrentIndex(0);
                setSelectedOption(null);
                setScore(0);
                setCombo(0);
                setMaxCombo(0);
                setCorrectCount(0);
                setWrongCount(0);
                setIsFinished(false);
              }}
              className="flex-1 py-3.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <RefreshCw size={18} /> Làm lại
            </button>
            <button 
              onClick={() => navigate(`/exam/${courseId}`)}
              className="flex-1 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center justify-center gap-2 shadow-lg transition-colors"
            >
              Hoàn tất
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const progress = (currentIndex / questions.length) * 100;

  return (
    <div className="flex flex-col w-full min-h-[calc(100vh-80px)] max-w-4xl mx-auto px-4 py-6 md:py-8 relative z-10">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="px-3.5 py-1.5 rounded-full font-bold text-xs flex items-center gap-1.5 shadow-sm border bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800 shadow-[0_0_8px_rgba(59,130,246,0.3)]">
            <Book size={16} />
            Trắc nghiệm
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>
            <div className="text-sm font-black text-slate-400 dark:text-slate-500 tracking-wide uppercase">Luyện tập tổng hợp JPD123</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigate(`/exam/${courseId}/practice`)}
            className="flex items-center gap-2 text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 transition-all px-4 py-1.5 border-x border-t border-b-[3px] border-slate-200 dark:border-slate-700 hover:border-rose-200 dark:hover:border-rose-900/50 hover:border-b-rose-300 dark:hover:border-b-rose-700 rounded-full text-sm font-bold bg-white dark:bg-slate-900 hover:bg-rose-50 dark:hover:bg-rose-900/20 active:translate-y-[2px] active:border-b active:border-slate-200 dark:active:border-slate-700 shadow-sm hover:shadow-md"
          >
            <X size={16} strokeWidth={2.5} /> Thoát
          </button>
        </div>
      </div>

      {/* Progress & Stats */}
      <div className="flex items-center justify-between mb-6 md:mb-8 bg-white dark:bg-slate-900 p-3 md:p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
        <div className="flex-1 flex items-center gap-3 md:gap-4 text-slate-700 dark:text-slate-300 mr-4 md:mr-8">
          <span className="min-w-[3rem] text-center text-sm md:text-base font-black shrink-0">{currentIndex + 1}/{questions.length}</span>
          <div className="flex-1 h-3 md:h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner relative">
            <div 
              className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 transition-all duration-500 ease-out shadow-[0_0_12px_rgba(59,130,246,0.6)]" 
              style={{ width: `${progress}%` }} 
            >
              <div className="absolute inset-0 bg-white/20 w-full h-1/3"></div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-sm md:text-base font-black shrink-0">
          <div className="flex items-center gap-1.5 text-amber-500 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-lg"><Flame size={18} /> {combo}</div>
          <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-lg"><Star size={18} /> {score}</div>
        </div>
      </div>

      {/* Question Area */}
      <div className="flex-1 flex flex-col items-center w-full max-w-3xl mx-auto">
        <motion.div 
          key={currentQuestion.id}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-lg border border-slate-100 dark:border-slate-800 w-full p-6 md:p-10 mb-8 text-center relative overflow-hidden flex-shrink-0"
        >
          <div className="text-xs font-black text-slate-400 mb-4 uppercase tracking-widest">
            CHỌN ĐÁP ÁN ĐÚNG
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-slate-100 leading-tight">
            {currentQuestion.question}
          </h2>
        </motion.div>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 w-full flex-shrink-0 mb-4">
          {currentQuestion.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrectOption = idx === currentQuestion.correctAnswer;
            
            let btnStyle = "";
            let icon = null;

            if (isAnswered) {
              if (isCorrectOption) {
                btnStyle = "bg-emerald-50 dark:bg-emerald-900/20 border-2 border-l-[4px] border-emerald-500 border-b-[6px] active:border-b-[2px] active:translate-y-[4px] text-emerald-700 dark:text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]";
                icon = <Check size={20} className="text-emerald-500 shrink-0" />;
              } else if (isSelected) {
                btnStyle = "bg-rose-50 dark:bg-rose-900/20 border-2 border-l-[4px] border-rose-500 border-b-[6px] active:border-b-[2px] active:translate-y-[4px] text-rose-700 dark:text-rose-400 opacity-90";
                icon = <X size={20} className="text-rose-500 shrink-0" />;
              } else {
                btnStyle = "bg-white dark:bg-slate-800 border-2 border-l-[4px] border-slate-200 dark:border-slate-700 border-b-[6px] opacity-50";
              }
            } else {
              btnStyle = "bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 border-l-[4px] border-l-slate-300 dark:border-l-slate-600 border-b-[6px] hover:border-blue-400 hover:border-l-blue-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 active:border-b-[2px] active:translate-y-[4px] shadow-sm";
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleSelectOption(idx)}
                className={`group relative w-full p-4 md:p-5 rounded-xl flex items-center gap-3 transition-all duration-200 text-left overflow-hidden ${btnStyle}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm shrink-0 transition-colors ${
                  isAnswered && isCorrectOption 
                    ? 'bg-emerald-500 text-white' 
                    : isAnswered && isSelected 
                      ? 'bg-rose-500 text-white' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600 dark:group-hover:bg-blue-900 dark:group-hover:text-blue-400'
                }`}>
                  {['A', 'B', 'C', 'D'][idx]}
                </div>
                <span className={`text-base md:text-lg font-bold flex-1`}>
                  {opt}
                </span>
                {icon}
              </button>
            );
          })}
        </div>

        {/* Answer Feedback */}
        <AnimatePresence>
          {isAnswered && (
            <motion.div 
              initial={{ opacity: 0, y: 20, height: 0 }} 
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`w-full mt-4 p-5 md:p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 border-2 border-b-[6px] overflow-hidden ${isCorrect ? 'bg-emerald-100/50 dark:bg-emerald-900/20 border-emerald-500' : 'bg-rose-100/50 dark:bg-rose-900/20 border-rose-500'}`}
            >
              <div className="flex-1 text-center md:text-left">
                <div className={`flex items-center justify-center md:justify-start gap-2 text-xl md:text-2xl font-black mb-4 ${isCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                  {isCorrect ? <><CheckCircle2 size={28} /> Tuyệt vời!</> : <><XCircle size={28} /> Rất tiếc!</>}
                </div>
                
                <div className={`text-sm md:text-base p-4 rounded-xl bg-white/60 dark:bg-black/20 ${isCorrect ? 'text-emerald-900 dark:text-emerald-100' : 'text-rose-900 dark:text-rose-100'}`}>
                  <span className="font-bold flex items-center gap-1.5 mb-2"><Lightbulb size={16} /> Giải thích: </span>
                  <div className="leading-relaxed font-bold text-[15px] md:text-base">
                    {currentQuestion.explanation}
                  </div>
                </div>
              </div>
              
              <button 
                onClick={handleNext} 
                className={`w-full md:w-auto px-8 py-4 rounded-xl text-white font-black text-lg flex items-center justify-center gap-2 transition-all active:translate-y-[4px] active:border-b-[2px] border-b-[6px] shadow-sm ${
                  isCorrect 
                    ? 'bg-emerald-500 hover:bg-emerald-400 border-emerald-600 dark:border-emerald-700' 
                    : 'bg-rose-500 hover:bg-rose-400 border-rose-600 dark:border-rose-700'
                }`}
              >
                {currentIndex < questions.length - 1 ? 'TIẾP TỤC' : 'KẾT QUẢ'} <ArrowRight size={20} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
