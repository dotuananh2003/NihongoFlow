import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Lock, Map, Navigation, CloudRain, Clock, Heart, Book, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

export const VocabularyLessons = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const isJpd123 = courseId?.toLowerCase() === 'jpd123';
  const theme = {
    color: isJpd123 ? 'text-blue-600 dark:text-blue-400' : 'text-rose-500 dark:text-rose-400',
    bgLight: isJpd123 ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-rose-50 dark:bg-rose-900/20',
    border: isJpd123 ? 'border-blue-200 dark:border-blue-900/50' : 'border-rose-200 dark:border-rose-900/50',
    btn: isJpd123 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-rose-500 hover:bg-rose-600',
    progress: isJpd123 ? 'bg-blue-500' : 'bg-rose-500',
    badgeText: isJpd123 ? 'text-blue-500' : 'text-rose-500',
  };

  const getLessonIcon = () => {
    return <Book size={24} strokeWidth={1.5} />;
  };

  // Modern UI data with progress
  const lessons = isJpd123 ? [
    { id: '4-1', title: 'Phương hướng và phương tiện', total: 20, learned: 12, locked: false },
    { id: '4-2', title: 'Địa điểm và tính từ', total: 18, learned: 0, locked: false },
    { id: '4-3', title: 'Thời tiết và vị giác', total: 16, learned: 0, locked: false },
    { id: '5-1', title: 'Thời gian và hoạt động', total: 25, learned: 0, locked: false },
    { id: '5-2', title: 'Thời tiết và cảm xúc', total: 20, learned: 0, locked: false },
    { id: '5-3', title: 'Sở thích', total: 14, learned: 0, locked: false },
    { id: '6-1', title: 'Kế hoạch và sự kiện', total: 24, learned: 0, locked: false },
    { id: '6-2', title: 'Ăn uống và giải trí', total: 23, learned: 0, locked: false },
    { id: '6-3', title: 'Ẩm thực Nhật', total: 20, learned: 0, locked: true },
    { id: '7-1', title: 'Vị trí và địa điểm', total: 20, learned: 0, locked: true },
    { id: '7-2', title: 'Đồ dùng và hành động', total: 20, learned: 0, locked: true },
    { id: '7-3', title: 'Hoạt động thường ngày', total: 20, learned: 0, locked: true },
  ] : [
    { id: '1-1', title: 'Chào hỏi cơ bản', total: 15, learned: 5, locked: false },
    { id: '1-2', title: 'Số đếm và tuổi', total: 20, learned: 0, locked: true },
    { id: '1-3', title: 'Quốc tịch và nghề', total: 18, learned: 0, locked: true },
  ];

  return (
    <div className="max-w-[1400px] mx-auto pt-8 pb-20 px-4 relative min-h-[calc(100vh-80px)]">
      {/* Background aesthetics */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-300/10 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, slate-400 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
      {/* Small sakura branch decoration placeholder */}
      <div className="absolute top-10 right-10 w-32 h-32 opacity-20 pointer-events-none bg-rose-200 blur-3xl rounded-full" />

      <button 
        onClick={() => navigate('/vocabulary')}
        className={`flex items-center gap-2 text-sm font-bold ${theme.color} hover:underline mb-6 transition-all`}
      >
        <ArrowLeft size={16} /> Quay lại
      </button>

      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className={`text-3xl md:text-4xl font-black ${isJpd123 ? 'text-blue-600 dark:text-blue-400' : 'text-rose-500 dark:text-rose-400'} uppercase tracking-wider mb-2`}>
            {courseId?.toUpperCase()} VOCABULARY
          </h1>
          <p className="text-sm font-bold text-slate-500">
            Chọn bài học để bắt đầu
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 shadow-sm hover:bg-slate-50 transition-colors">
          <Book size={16} /> Tiến độ chung
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
        {lessons.map((lesson, idx) => {
          return (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25, delay: idx * 0.05 }}
              onClick={() => !lesson.locked && navigate(`/vocabulary/${courseId}/lesson/${lesson.id}`)}
              className={`group ${lesson.locked ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className={`bg-white dark:bg-slate-900 rounded-[2rem] p-6 flex flex-col h-full shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] transition-all duration-300 border-2 ${lesson.locked ? 'border-transparent opacity-75 grayscale-[0.3]' : `border-transparent hover:-translate-y-1 hover:shadow-[0_16px_40px_rgb(0,0,0,0.1)]`} ${lesson.learned > 0 ? theme.border : ''}`}>
                  
                  {/* Top: Lesson ID */}
                  <div className="text-center mb-6">
                    <span className={`text-[10px] font-bold ${theme.badgeText} uppercase tracking-widest ${theme.bgLight} px-3 py-1 rounded-full`}>
                      LESSON {lesson.id}
                    </span>
                  </div>

                  {/* Title & Icon */}
                  <div className="flex flex-col items-center text-center gap-4 mb-8 flex-1">
                    <div className={`w-14 h-14 rounded-[1.25rem] ${lesson.locked ? 'bg-slate-100 text-slate-400 dark:bg-slate-800' : `${theme.bgLight} ${theme.color}`} flex items-center justify-center`}>
                      {getLessonIcon()}
                    </div>
                    <div>
                      <h3 className={`font-bold text-slate-800 dark:text-slate-100 text-lg leading-tight mb-2 px-2`}>
                        {lesson.title}
                      </h3>
                      <p className="text-xs font-bold text-slate-400">
                        {lesson.total} từ vựng
                      </p>
                    </div>
                  </div>

                  {/* Button */}
                  <button 
                    disabled={lesson.locked}
                    className={`w-full py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${lesson.locked ? 'bg-slate-100 text-slate-400 dark:bg-slate-800' : `${theme.bgLight} ${theme.color} group-hover:${theme.btn} group-hover:text-white`}`}
                  >
                    Học ngay {lesson.locked ? <Lock size={16} /> : <Play size={16} fill="currentColor" />}
                  </button>
                  
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
