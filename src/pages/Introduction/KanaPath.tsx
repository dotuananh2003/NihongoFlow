import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BookOpen, PenTool, CheckCircle, RotateCcw, Trophy, Star, X, AlertCircle } from 'lucide-react';
import { groupMetadata, kanaData } from '../../data/kana';
import { KanaGrid } from '../../components/Kana/KanaGrid';
import { KanaQuiz } from '../../components/Kana/KanaQuiz';
import { Confetti } from '../../components/Kana/Confetti';

export const KanaPath = () => {
  const { system } = useParams<{ system: 'hiragana' | 'katakana' }>();
  const navigate = useNavigate();

  const isHiragana = system === 'hiragana';
  const colorCls = isHiragana ? 'rose' : 'indigo';
  const title = isHiragana ? 'HIRAGANA ひらがな' : 'KATAKANA カタカナ';
  const subtitle = isHiragana ? 'Bảng chữ mềm dùng cho từ thuần Nhật.' : 'Bảng chữ góc cạnh dùng cho từ ngoại lai, tên riêng và nhấn mạnh.';

  // State
  const [stats, setStats] = useState<any>({});
  const [activeModal, setActiveModal] = useState<'study' | 'quiz' | 'result' | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [quizResult, setQuizResult] = useState<any>(null);

  // Load stats
  useEffect(() => {
    if (system) {
      const saved = localStorage.getItem(`jp-forus-stats-${system}`);
      if (saved) {
        setStats(JSON.parse(saved));
      }
    }
  }, [system]);

  // Save stats helper
  const updateStats = (groupId: string, newStats: any) => {
    setStats((prev: any) => {
      const updated = {
        ...prev,
        [groupId]: {
          ...prev[groupId],
          ...newStats
        }
      };
      if (system) {
        localStorage.setItem(`jp-forus-stats-${system}`, JSON.stringify(updated));
      }
      return updated;
    });
  };

  // Calculate global progress
  const totalChars = 104; // Approximation based on basic + dakuten + yoon
  const completedChars = groupMetadata.reduce((sum, g) => {
    const groupStat = stats[g.id];
    // If accuracy is >= 80%, consider the group completed
    if (groupStat && groupStat.maxAccuracy >= 80) {
      return sum + g.count;
    }
    return sum;
  }, 0);
  const progressPercent = Math.min(100, Math.round((completedChars / totalChars) * 100));

  const handleStudy = (groupId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedGroup(groupId);
    setActiveModal('study');
    
    // Update study count
    const count = (stats[groupId]?.studyCount || 0) + 1;
    updateStats(groupId, { studyCount: count });
  };

  const handleQuiz = (groupId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedGroup(groupId);
    setActiveModal('quiz');
  };

  const handleQuizComplete = (result: any) => {
    setQuizResult(result);
    setActiveModal('result');
    
    if (selectedGroup) {
      const prevStat = stats[selectedGroup] || {};
      const accuracy = Math.round((result.correct / result.total) * 100);
      
      updateStats(selectedGroup, {
        quizCount: (prevStat.quizCount || 0) + 1,
        highestScore: Math.max(prevStat.highestScore || 0, result.correct),
        maxAccuracy: Math.max(prevStat.maxAccuracy || 0, accuracy),
        lastQuizDate: new Date().toISOString()
      });
    }
  };

  const closeAll = () => {
    setActiveModal(null);
    setSelectedGroup(null);
    setQuizResult(null);
  };

  if (system !== 'hiragana' && system !== 'katakana') {
    return <div>Invalid system</div>;
  }

  return (
    <div className="space-y-6 pb-12 relative min-h-full ">
      <button 
        onClick={() => navigate('/introduction')}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 transition-colors font-medium mb-6"
      >
        <ArrowLeft size={18} /> Nhập môn &gt; {isHiragana ? 'Hiragana' : 'Katakana'}
      </button>

      {/* Header & Progress */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h2 className={`text-3xl md:text-4xl font-black tracking-tight text-${colorCls}-600 dark:text-${colorCls}-400 font-jp mb-2`}>
            {title}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            {subtitle}
          </p>
        </div>
        
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 min-w-[250px] shadow-sm">
          <div className="flex justify-between text-sm font-bold text-slate-600 dark:text-slate-300 mb-2">
            <span>Tiến độ tổng</span>
            <span>{completedChars} / {totalChars} ký tự</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              className={`bg-${colorCls}-500 h-full rounded-full transition-all duration-1000`}
            ></motion.div>
          </div>
          <div className="text-right text-xs font-bold text-slate-400 mt-1">{progressPercent}%</div>
        </div>
      </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {groupMetadata.map((g) => {
          const groupStat = stats[g.id] || { studyCount: 0, quizCount: 0, highestScore: 0, maxAccuracy: 0, lastQuizDate: null };
          
          return (
            <div key={g.id} className="bg-white dark:bg-slate-900 rounded-3xl p-6 border-2 border-slate-100 dark:border-slate-800 shadow-sm flex flex-col h-full hover:border-slate-200 dark:hover:border-slate-700 transition-colors">
              <div className="text-center mb-6">
                <span className={`text-[10px] font-bold text-${colorCls}-500 uppercase tracking-widest mb-1 block`}>Nhóm {groupMetadata.indexOf(g) + 1}</span>
                <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg mb-1">{g.name.split(': ')[1] || g.name}</h3>
                <p className="text-sm text-slate-500">{g.count} ký tự</p>
              </div>

              {/* Character preview */}
              <div className="flex justify-center mb-8">
                <div className={`w-16 h-16 rounded-2xl bg-${colorCls}-50 dark:bg-${colorCls}-500/10 text-${colorCls}-500 flex items-center justify-center text-3xl font-jp font-bold shadow-sm`}>
                  {(kanaData[system] as any)[g.id]?.[0]?.jp || 'あ'}
                </div>
              </div>

              <div className="flex gap-3 mb-6 mt-auto">
                <button 
                  onClick={(e) => handleStudy(g.id, e)}
                  className={`flex-1 py-3 rounded-xl font-bold text-${colorCls}-600 dark:text-${colorCls}-400 bg-${colorCls}-50 dark:bg-${colorCls}-900/20 hover:bg-${colorCls}-100 dark:hover:bg-${colorCls}-900/40 transition-colors flex items-center justify-center gap-2 text-sm`}
                >
                  <BookOpen size={16} /> Học
                </button>
                <button 
                  onClick={(e) => handleQuiz(g.id, e)}
                  className={`flex-1 py-3 rounded-xl font-bold text-white bg-${colorCls}-500 hover:bg-${colorCls}-600 shadow-sm shadow-${colorCls}-500/30 transition-all flex items-center justify-center gap-2 text-sm`}
                >
                  <PenTool size={16} /> Kiểm tra
                </button>
              </div>

              {/* Stats Footer */}
              <div className="grid grid-cols-2 gap-y-3 gap-x-2 border-t border-slate-100 dark:border-slate-800 pt-4 mt-auto">
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400 font-bold mb-0.5">Đã học</span>
                  <span className="text-sm font-black text-slate-700 dark:text-slate-300">{groupStat.studyCount} lần</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400 font-bold mb-0.5">Đã kiểm tra</span>
                  <span className="text-sm font-black text-slate-700 dark:text-slate-300">{groupStat.quizCount} lần</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400 font-bold mb-0.5">Độ chính xác</span>
                  <span className={`text-sm font-black ${groupStat.maxAccuracy >= 80 ? 'text-emerald-500' : 'text-slate-700 dark:text-slate-300'}`}>
                    {groupStat.maxAccuracy}%
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400 font-bold mb-0.5">Điểm cao nhất</span>
                  <span className="text-sm font-black text-slate-700 dark:text-slate-300">
                    {groupStat.highestScore} / {g.count}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modals */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center">
            {/* STUDY MODAL */}
            {activeModal === 'study' && selectedGroup && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="fixed inset-0 w-full h-full bg-[#FAF8F5] dark:bg-slate-950 flex flex-col overflow-hidden"
              >
                <div className={`px-4 sm:px-8 py-4 sm:py-5 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-20 flex justify-between items-center`}>
                  <h3 className={`text-xl font-bold text-${colorCls}-600 dark:text-${colorCls}-400 flex items-center gap-2`}>
                    <BookOpen size={20} /> Ôn tập nhóm chữ
                  </h3>
                  <button onClick={closeAll} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-500 transition-colors">
                    <X size={20} />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
                   <KanaGrid 
                     title={groupMetadata.find(g => g.id === selectedGroup)?.name || 'Characters'}
                     items={(kanaData[system] as any)[selectedGroup]}
                     columns={system === 'hiragana' && selectedGroup === 'seion' ? 5 : 5}
                     colorClass={`text-${colorCls}-500`}
                   />
                </div>
              </motion.div>
            )}

            {/* QUIZ MODAL */}
            {activeModal === 'quiz' && selectedGroup && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="fixed inset-0 w-full h-full bg-[#FAF8F5] dark:bg-slate-950 flex flex-col overflow-hidden"
              >
                <KanaQuiz 
                  system={system}
                  groups={[selectedGroup]}
                  onBack={closeAll}
                  onComplete={handleQuizComplete}
                />
              </motion.div>
            )}

            {/* RESULT MODAL */}
            {activeModal === 'result' && quizResult && (
              <>
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                  onClick={closeAll}
                />
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="relative z-10 w-full max-w-3xl max-h-[85vh] bg-white dark:bg-slate-950 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col border border-slate-200/50 dark:border-slate-800/50"
                >
                {quizResult.correct === quizResult.total && <Confetti />}
                
                <div className={`px-8 py-6 bg-${colorCls}-50 dark:bg-${colorCls}-900/20 border-b border-${colorCls}-100 dark:border-${colorCls}-800 text-center`}>
                  <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${quizResult.correct === quizResult.total ? 'bg-emerald-100 text-emerald-500' : `bg-${colorCls}-100 text-${colorCls}-500`}`}>
                    {quizResult.correct === quizResult.total ? <Trophy size={40} /> : <Star size={40} />}
                  </div>
                  <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-2">Kết quả kiểm tra</h2>
                  <p className="text-slate-500 dark:text-slate-400 font-medium">Bạn đã hoàn thành bài kiểm tra nhóm chữ.</p>
                </div>

                <div className="flex-1 overflow-y-auto p-8 bg-[#FAF8F5] dark:bg-slate-950">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 text-center shadow-sm">
                      <p className="text-xs font-bold text-slate-400 uppercase mb-1">Tổng số</p>
                      <p className="text-3xl font-black text-slate-800 dark:text-slate-100">{quizResult.total}</p>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-900/30 text-center shadow-sm">
                      <p className="text-xs font-bold text-emerald-500 uppercase mb-1">Đúng</p>
                      <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">{quizResult.correct}</p>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-rose-100 dark:border-rose-900/30 text-center shadow-sm">
                      <p className="text-xs font-bold text-rose-500 uppercase mb-1">Sai</p>
                      <p className="text-3xl font-black text-rose-600 dark:text-rose-400">{quizResult.wrong}</p>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-blue-100 dark:border-blue-900/30 text-center shadow-sm">
                      <p className="text-xs font-bold text-blue-500 uppercase mb-1">Chính xác</p>
                      <p className="text-3xl font-black text-blue-600 dark:text-blue-400">{Math.round((quizResult.correct/quizResult.total)*100)}%</p>
                    </div>
                  </div>

                  {quizResult.mistakes.length > 0 && (
                    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-rose-100 dark:border-rose-900/30 shadow-sm">
                      <h4 className="font-bold text-rose-600 dark:text-rose-400 mb-4 flex items-center gap-2">
                        <AlertCircle size={18} /> Các câu trả lời sai cần ôn tập lại:
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {quizResult.mistakes.map((m: any, i: number) => (
                          <div key={i} className="flex items-center gap-3 p-3 bg-rose-50 dark:bg-rose-900/20 rounded-xl">
                            <span className="text-2xl font-jp font-bold text-slate-800 dark:text-slate-100 w-8">{m.jp}</span>
                            <div className="flex flex-col">
                              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Đáp án: {m.correct}</span>
                              <span className="text-xs font-medium text-rose-500 line-through">Bạn nhập: {m.user || '(trống)'}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex gap-4">
                  <button onClick={closeAll} className={`flex-1 py-4 rounded-xl font-bold bg-${colorCls}-500 hover:bg-${colorCls}-600 text-white shadow-sm transition-colors flex items-center justify-center gap-2`}>
                    <CheckCircle size={20} /> Hoàn tất
                  </button>
                  <button onClick={() => { setQuizResult(null); setActiveModal('quiz'); }} className="flex-1 py-4 rounded-xl font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors flex items-center justify-center gap-2">
                    <RotateCcw size={20} /> Kiểm tra lại
                  </button>
                </div>
                </motion.div>
              </>
            )}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
