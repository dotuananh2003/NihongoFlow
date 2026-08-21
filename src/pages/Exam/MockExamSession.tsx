import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronLeft,
  Clock3,
  ClipboardCheck,
  FileText,
  Flag,
  Gauge,
  ListChecks,
  Send,
  Sparkles,
  X,
  XCircle,
  Maximize,
} from 'lucide-react';
import { JPD123_SP26_C1FE, type MockQuestion } from '../../data/mockExams/JPD123_SP26_C1FE';
import { JPD123_SP26_C2FE } from '../../data/mockExams/JPD123_SP26_C2FE';
import { JPD123_SP26_RE } from '../../data/mockExams/JPD123_SP26_RE';

export const MockExamSession = () => {
  const { courseId, examId } = useParams();
  const navigate = useNavigate();

  const decodedExamName = examId ? decodeURIComponent(examId).toUpperCase() : 'JPD123 - MOCK TEST';

  const mockExamsMap: Record<string, MockQuestion[]> = {
    'JPD123 - SP26 - C1FE': JPD123_SP26_C1FE,
    'JPD123 - SP26 - C2FE': JPD123_SP26_C2FE,
    'JPD123 - SP26 - RE': JPD123_SP26_RE,
  };

  const examData: MockQuestion[] = mockExamsMap[decodedExamName] || JPD123_SP26_C1FE;

  const [hasStarted, setHasStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showResultsPopup, setShowResultsPopup] = useState(false);

  const startExamAndFullscreen = async () => {
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      }
    } catch (err) {
      console.warn("Could not activate fullscreen:", err);
    }
    setHasStarted(true);
  };

  useEffect(() => {
    if (isSubmitted || !hasStarted) return;

    const timer = window.setInterval(() => {
      setTimeLeft((previous) => {
        if (previous <= 1) {
          window.clearInterval(timer);
          setIsSubmitted(true);
          setShowResultsPopup(true);
          return 0;
        }
        return previous - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isSubmitted, hasStarted]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const restSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${restSeconds.toString().padStart(2, '0')}`;
  };

  const handleSelectAnswer = (questionId: number, optionIndex: number) => {
    if (isSubmitted) return;
    setAnswers((previous) => ({
      ...previous,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setShowResultsPopup(true);
  };

  const calculateScore = () => {
    let correctCount = 0;

    examData.forEach((question) => {
      if (answers[question.id] === question.correctAnswerIndex) {
        correctCount += 1;
      }
    });

    return {
      correct: correctCount,
      incorrect: examData.length - correctCount,
      score: Math.round((correctCount / examData.length) * 100),
    };
  };

  const currentQuestion = examData[currentQuestionIndex];
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / examData.length) * 100);
  const timePercent = Math.max(0, Math.min(100, (timeLeft / (30 * 60)) * 100));
  const { correct, incorrect, score } = calculateScore();

  const getQuestionButtonStyle = (question: MockQuestion, index: number) => {
    const isAnswered = answers[question.id] !== undefined;
    const isActive = currentQuestionIndex === index;

    if (isSubmitted) {
      const isCorrect = answers[question.id] === question.correctAnswerIndex;
      if (!isAnswered) return 'border-slate-200 bg-white text-slate-400';
      if (isCorrect) return 'border-emerald-300 bg-emerald-50 text-emerald-600 shadow-emerald-100';
      return 'border-rose-300 bg-rose-50 text-rose-600 shadow-rose-100';
    }

    if (isActive) return 'border-blue-500 bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-blue-500/30 ring-4 ring-blue-100';
    if (isAnswered) return 'border-sky-200 bg-sky-50 text-blue-600';
    return 'border-slate-100 bg-white text-slate-500 hover:border-blue-200 hover:text-blue-600';
  };

  const getOptionStyle = (optionIndex: number) => {
    const isSelected = answers[currentQuestion.id] === optionIndex;

    if (isSubmitted) {
      const isCorrectAnswer = currentQuestion.correctAnswerIndex === optionIndex;
      if (isCorrectAnswer) {
        return 'border-emerald-400 bg-emerald-50 text-emerald-800 shadow-[0_12px_28px_rgba(16,185,129,0.16)]';
      }
      if (isSelected && !isCorrectAnswer) {
        return 'border-rose-300 bg-rose-50 text-rose-700 opacity-80';
      }
      return 'border-slate-100 bg-slate-50/70 text-slate-400';
    }

    if (isSelected) {
      return 'border-blue-500 bg-blue-50 text-blue-900 shadow-[0_14px_30px_rgba(37,99,235,0.14)] ring-4 ring-blue-100';
    }

    return 'border-slate-100 bg-white/90 text-slate-700 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/50 hover:shadow-md';
  };

  const getOptionLetterStyle = (optionIndex: number) => {
    const isSelected = answers[currentQuestion.id] === optionIndex;

    if (isSubmitted && currentQuestion.correctAnswerIndex === optionIndex) return 'bg-emerald-500 text-white';
    if (isSubmitted && isSelected) return 'bg-rose-500 text-white';
    if (isSelected) return 'bg-blue-600 text-white';
    return 'bg-slate-100 text-slate-500';
  };

  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center relative overflow-hidden px-4">
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
          <div className="text-[25vw] font-bold text-white select-none whitespace-nowrap leading-none text-center">
            試験
          </div>
        </div>
        
        <div className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-[2rem] max-w-lg w-full text-center shadow-2xl">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg ring-8 ring-white/5">
            <Maximize className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-black text-white mb-3">Sẵn Sàng Làm Bài?</h1>
          <p className="text-slate-300 mb-8 leading-relaxed text-lg font-medium">
            Bài thi sẽ được bắt đầu trong chế độ <strong className="text-white font-black">Toàn Màn Hình</strong> để đảm bảo sự tập trung cao độ. Bộ đếm thời gian 30 phút sẽ kích hoạt ngay lập tức.
          </p>
          <div className="flex flex-col gap-4">
            <button
              onClick={startExamAndFullscreen}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-black text-lg shadow-[0_12px_26px_rgba(37,99,235,0.25)] hover:shadow-[0_18px_40px_rgba(37,99,235,0.4)] hover:-translate-y-1 transition-all"
            >
              Bắt Đầu Làm Bài
            </button>
            <button
              onClick={() => navigate(`/exam/${courseId}`)}
              className="w-full py-3 bg-white/5 hover:bg-white/10 text-slate-300 rounded-2xl font-bold transition-all"
            >
              Thoát
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen overflow-hidden bg-slate-50 text-slate-900 flex flex-col">
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-45"
        style={{ backgroundImage: "url('/images/backgrounds/grammar-page-bg.png')" }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/96 via-sky-50/90 to-indigo-50/92" />
      <div className="pointer-events-none absolute -right-32 top-12 h-80 w-80 rounded-full bg-cyan-200/35 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-rose-200/30 blur-3xl" />
      <div className="pointer-events-none absolute right-10 top-24 font-jp text-[14rem] font-black leading-none text-blue-950/[0.035]">
        試験
      </div>

      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
        <header className="mb-5 overflow-hidden rounded-[2rem] border border-white/80 bg-white/78 shadow-[0_18px_50px_rgba(15,23,42,0.1)] backdrop-blur-xl">
          <div className="h-1.5 bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-500" />
          <div className="flex flex-col gap-4 p-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={async () => {
                  if (document.fullscreenElement) {
                    await document.exitFullscreen().catch(console.warn);
                  }
                  navigate(`/exam/${courseId}`);
                }}
                className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-slate-600 shadow-sm ring-1 ring-slate-100 transition-all hover:-translate-x-0.5 hover:text-blue-600 hover:shadow-md"
                title="Quay lại"
              >
                <ArrowLeft size={21} />
              </button>

              <div>
                <div className="mb-1 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-blue-600 ring-1 ring-blue-100">
                  <Sparkles size={13} />
                  Thi thực chiến
                </div>
                <h1 className="text-xl font-black text-slate-900 sm:text-2xl">{decodedExamName}</h1>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:gap-3">
              <div className="rounded-2xl bg-white px-4 py-2.5 shadow-sm ring-1 ring-slate-100">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">
                  <ListChecks size={14} />
                  Đã làm
                </div>
                <div className="mt-0.5 text-lg font-black text-slate-900">
                  {answeredCount}/{examData.length}
                </div>
              </div>

              <div className={`rounded-2xl px-4 py-2.5 shadow-sm ring-1 ${timeLeft < 300 ? 'bg-rose-50 text-rose-600 ring-rose-100' : 'bg-blue-50 text-blue-600 ring-blue-100'}`}>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.15em] opacity-70">
                  <Clock3 size={14} />
                  Thời gian
                </div>
                <div className="mt-0.5 font-mono text-lg font-black">{formatTime(timeLeft)}</div>
              </div>

              {!isSubmitted && (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="col-span-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-black text-white shadow-[0_14px_30px_rgba(37,99,235,0.28)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(37,99,235,0.34)] sm:col-span-1"
                >
                  <Send size={18} />
                  Nộp bài
                </button>
              )}
            </div>
          </div>

          <div className="px-4 pb-4">
            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-500 transition-all duration-500"
                style={{ width: `${timePercent}%` }}
              />
            </div>
          </div>
        </header>

        <main className="flex min-h-0 flex-1 flex-col gap-4">
          <section className="rounded-[2rem] border border-white/80 bg-white/74 p-3 shadow-[0_18px_48px_rgba(15,23,42,0.1)] backdrop-blur-xl">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div>
                  <div className="text-[9px] font-black uppercase tracking-[0.18em] text-blue-500">Question map</div>
                  <h2 className="text-base font-black text-slate-900 leading-none mt-0.5">Danh sách câu</h2>
                </div>
                {/* Legend inline */}
                <div className="flex flex-wrap gap-2.5 text-[10px] font-bold text-slate-500 ml-3 border-l pl-3 border-slate-200">
                  {isSubmitted ? (
                    <>
                      <div className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />Đúng</div>
                      <div className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-rose-400" />Sai</div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-sky-400" />Đã làm</div>
                      <div className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-slate-200" />Chưa làm</div>
                    </>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="rounded-2xl bg-slate-50 px-4 py-2 ring-1 ring-slate-100">
                  <div className="flex items-center justify-between gap-4 text-xs font-black text-slate-500">
                    <span>Tiến độ</span>
                    <span>{progressPercent}%</span>
                  </div>
                  <div className="mt-1.5 h-2 w-40 overflow-hidden rounded-full bg-white">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-600 ring-1 ring-blue-100">
                  {examData.length} câu
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-2">
              {examData.map((question, index) => (
                <button
                  key={question.id}
                  type="button"
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={`grid h-7 w-7 place-items-center rounded-lg border text-[11px] font-black shadow-sm transition-all ${getQuestionButtonStyle(question, index)}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </section>

          <section className="grid min-h-0 flex-1 gap-4 xl:grid-cols-2 pb-2">
            <motion.article
              key={currentQuestion.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22 }}
              className={`${currentQuestion.attachedPassage ? '' : 'xl:col-span-2'} flex flex-col overflow-hidden rounded-3xl border border-white/80 bg-white/82 shadow-[0_18px_48px_rgba(15,23,42,0.1)] backdrop-blur-xl h-full`}
            >
              <div className="border-b border-slate-100 p-4 shrink-0">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-indigo-600 ring-1 ring-indigo-100">
                      <Flag size={13} />
                      Câu {currentQuestionIndex + 1}
                    </div>
                    <h2 className="text-xl font-black text-slate-900">Chọn đáp án đúng</h2>
                  </div>

                  {isSubmitted && (
                    <span className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-black ${
                      answers[currentQuestion.id] === currentQuestion.correctAnswerIndex
                        ? 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100'
                        : 'bg-rose-50 text-rose-600 ring-1 ring-rose-100'
                    }`}>
                      {answers[currentQuestion.id] === currentQuestion.correctAnswerIndex ? (
                        <>
                          <CheckCircle2 size={17} />
                          Chính xác
                        </>
                      ) : (
                        <>
                          <XCircle size={17} />
                          Chưa chính xác
                        </>
                      )}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                <div className="mb-4 rounded-2xl bg-slate-50/80 p-4 ring-1 ring-slate-100">
                  <p className="whitespace-pre-line text-base font-bold leading-relaxed text-slate-800">
                    {currentQuestion.questionText}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={option}
                      type="button"
                      disabled={isSubmitted}
                      onClick={() => handleSelectAnswer(currentQuestion.id, index)}
                      className={`group flex min-h-[74px] items-center gap-3 rounded-3xl border-2 p-4 text-left transition-all ${getOptionStyle(index)}`}
                    >
                      <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-2xl text-sm font-black transition-colors ${getOptionLetterStyle(index)}`}>
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="text-base font-black leading-relaxed">{option}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex shrink-0 items-center justify-between gap-3 border-t border-slate-100 p-4">
                <button
                  type="button"
                  onClick={() => setCurrentQuestionIndex((previous) => Math.max(0, previous - 1))}
                  disabled={currentQuestionIndex === 0}
                  className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-5 py-3 font-black text-slate-600 transition-colors hover:bg-slate-200 disabled:opacity-45"
                >
                  <ChevronLeft size={18} />
                  Câu trước
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentQuestionIndex((previous) => Math.min(examData.length - 1, previous + 1))}
                  disabled={currentQuestionIndex === examData.length - 1}
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-black text-white shadow-[0_12px_26px_rgba(37,99,235,0.25)] transition-all hover:-translate-y-0.5 disabled:opacity-45"
                >
                  Câu tiếp
                  <ArrowRight size={18} />
                </button>
              </div>
            </motion.article>

            {currentQuestion.attachedPassage && (
              <motion.aside
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.24 }}
                className="flex flex-col overflow-hidden rounded-3xl border border-white/80 bg-white/82 shadow-[0_18px_48px_rgba(15,23,42,0.1)] backdrop-blur-xl h-full"
              >
                <div className="border-b border-slate-100 p-4 shrink-0">
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-blue-600 ring-1 ring-blue-100">
                    <FileText size={13} />
                    Bài đọc
                  </div>
                  <h3 className="text-xl font-black text-slate-900">Đoạn văn tham khảo</h3>
                </div>

                <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
                  <p className="whitespace-pre-wrap text-base font-bold leading-loose text-slate-700">
                    {currentQuestion.attachedPassage}
                  </p>
                </div>
              </motion.aside>
            )}
          </section>
        </main>
      </div>

      <AnimatePresence>
        {showResultsPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/45 backdrop-blur-md"
              onClick={() => setShowResultsPopup(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              className="relative w-full max-w-lg overflow-hidden rounded-[2rem] border border-white/80 bg-white p-7 text-center shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setShowResultsPopup(false)}
                className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-slate-50 text-slate-500 ring-1 ring-slate-100 hover:text-rose-500"
              >
                <X size={20} />
              </button>

              <div className="mx-auto mb-5 grid h-24 w-24 place-items-center rounded-[2rem] bg-gradient-to-br from-blue-600 to-cyan-400 text-white shadow-[0_18px_40px_rgba(37,99,235,0.28)]">
                <ClipboardCheck size={34} />
              </div>

              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-blue-600 ring-1 ring-blue-100">
                <Gauge size={13} />
                Kết quả bài thi
              </div>
              <h2 className="text-3xl font-black text-slate-900">Hoàn thành bài thi</h2>
              <p className="mt-2 text-sm font-semibold text-slate-500">Điểm tổng quan của bạn trong phiên thi thực chiến này.</p>

              <div className="my-7 grid grid-cols-3 gap-3">
                <div className="rounded-3xl bg-blue-50 p-4 ring-1 ring-blue-100">
                  <div className="text-[10px] font-black uppercase tracking-widest text-blue-500">Điểm</div>
                  <div className="mt-1 text-3xl font-black text-blue-600">{score}</div>
                </div>
                <div className="rounded-3xl bg-emerald-50 p-4 ring-1 ring-emerald-100">
                  <div className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Đúng</div>
                  <div className="mt-1 text-3xl font-black text-emerald-600">{correct}</div>
                </div>
                <div className="rounded-3xl bg-rose-50 p-4 ring-1 ring-rose-100">
                  <div className="text-[10px] font-black uppercase tracking-widest text-rose-500">Sai</div>
                  <div className="mt-1 text-3xl font-black text-rose-600">{incorrect}</div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowResultsPopup(false)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 py-4 text-lg font-black text-white shadow-[0_16px_34px_rgba(37,99,235,0.25)] transition-all hover:-translate-y-0.5"
              >
                <Check size={20} />
                Xem chi tiết đáp án
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
