import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, XCircle, ChevronRight, AlertCircle, RefreshCw } from 'lucide-react';
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
      setScore(prev => prev + 1);
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
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="max-w-3xl mx-auto pt-16 pb-20 px-4 min-h-[calc(100vh-80px)] flex flex-col items-center justify-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 md:p-14 shadow-2xl text-center w-full border border-emerald-100 dark:border-emerald-900/30"
        >
          <div className="w-24 h-24 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-500 flex items-center justify-center mb-6">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-4">Hoàn thành!</h2>
          <p className="text-xl text-slate-500 dark:text-slate-400 mb-8">Bạn đã trả lời đúng {score} / {questions.length} câu hỏi.</p>
          
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-4 mb-10 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="bg-emerald-500 h-full rounded-full"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button 
              onClick={() => {
                const shuffled = [...practiceData].sort(() => 0.5 - Math.random());
                const selected = count === 'all' ? shuffled : shuffled.slice(0, Number(count));
                setQuestions(selected);
                setCurrentIndex(0);
                setSelectedOption(null);
                setScore(0);
                setIsFinished(false);
              }}
              className="px-8 py-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-2xl font-bold transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw size={20} /> Làm lại
            </button>
            <button 
              onClick={() => navigate(`/exam/${courseId}`)}
              className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold transition-colors shadow-lg shadow-emerald-500/30"
            >
              Về trang chủ
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pt-8 pb-32 px-4 relative min-h-[calc(100vh-80px)]">
      {/* Header / Progress */}
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={() => navigate(`/exam/${courseId}/practice`)}
          className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1 mx-8">
          <div className="flex justify-between text-sm font-bold text-slate-500 mb-2">
            <span>Câu {currentIndex + 1}</span>
            <span>{questions.length} câu</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-emerald-500 h-full transition-all duration-300 rounded-full"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
        <div className="w-10"></div> {/* Spacer for balance */}
      </div>

      {/* Question Card */}
      <motion.div 
        key={currentQuestion.id}
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_60px_rgb(0,0,0,0.04)] dark:shadow-[0_20px_60px_rgb(0,0,0,0.2)] border border-slate-100 dark:border-slate-800 mb-8"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-8 leading-relaxed">
          {currentQuestion.question}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentQuestion.options.map((option, index) => {
            let optionStateClass = "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700 dark:bg-slate-800/50 dark:hover:bg-slate-800 dark:border-slate-700 dark:text-slate-200 cursor-pointer";
            
            if (isAnswered) {
              if (index === currentQuestion.correctAnswer) {
                // Correct option always shows green
                optionStateClass = "bg-emerald-50 border-emerald-500 text-emerald-700 dark:bg-emerald-900/30 dark:border-emerald-500 dark:text-emerald-300";
              } else if (index === selectedOption) {
                // Selected but wrong option shows red
                optionStateClass = "bg-rose-50 border-rose-500 text-rose-700 dark:bg-rose-900/30 dark:border-rose-500 dark:text-rose-300";
              } else {
                // Other unselected wrong options get muted
                optionStateClass = "bg-slate-50 border-slate-200 text-slate-400 opacity-50 dark:bg-slate-800/20 dark:border-slate-800 cursor-not-allowed";
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleSelectOption(index)}
                disabled={isAnswered}
                className={`relative w-full text-left p-6 rounded-2xl border-2 font-medium text-lg transition-all ${optionStateClass}`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {isAnswered && index === currentQuestion.correctAnswer && (
                    <CheckCircle2 className="text-emerald-500" />
                  )}
                  {isAnswered && index === selectedOption && index !== currentQuestion.correctAnswer && (
                    <XCircle className="text-rose-500" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Explanation Section */}
      <AnimatePresence>
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`rounded-2xl p-6 border ${isCorrect ? 'bg-emerald-50 border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-900/30' : 'bg-rose-50 border-rose-100 dark:bg-rose-900/20 dark:border-rose-900/30'}`}
          >
            <div className="flex gap-4">
              <div className="mt-1">
                <AlertCircle className={isCorrect ? "text-emerald-500" : "text-rose-500"} />
              </div>
              <div>
                <h3 className={`font-bold text-lg mb-2 ${isCorrect ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}`}>
                  {isCorrect ? 'Tuyệt vời! Đáp án chính xác.' : 'Rất tiếc! Đáp án chưa đúng.'}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {currentQuestion.explanation}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Next Button Footer */}
      <AnimatePresence>
        {isAnswered && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 flex justify-center z-50"
          >
            <div className="w-full max-w-4xl flex justify-end">
              <button
                onClick={handleNext}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold transition-colors shadow-lg shadow-blue-500/30 flex items-center gap-2"
              >
                {currentIndex < questions.length - 1 ? 'Câu tiếp theo' : 'Xem kết quả'} <ChevronRight size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
