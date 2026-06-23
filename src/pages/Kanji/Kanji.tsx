import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, ChevronRight, Star, Target as TargetIcon, Gift } from 'lucide-react';

const COURSES = [
  {
    id: 'jpd113',
    code: 'JPD113',
    title: 'JAPANESE 1',
    subtitle: 'KANJI MASTERY',
    description: 'Lộ trình học Hán tự cơ bản dành cho người mới bắt đầu.',
    color: 'red',
    hex: '#BC002D',
    bgLight: 'bg-[#FFE4E6]',
    bgDark: 'bg-[#BC002D]',
    borderLight: 'border-[#FCA5A5]',
    textClass: 'text-[#BC002D]',
    iconColor: 'text-red-400',
    iconBorder: 'border-red-200',
    pillBg: 'bg-red-50',
    pillText: 'text-red-600',
    pillBorder: 'border-red-100',
    lessonHoverBorder: 'hover:border-red-200',
    lessonIconBg: 'bg-red-50',
    lessonIconText: 'text-red-500',
    lessonIconBorder: 'border-red-100',
    arrowBgHover: 'group-hover:bg-red-50',
    arrowTextHover: 'group-hover:text-red-500',
    progress: 0,
    lessons: [
      { id: 1, title: 'Giới thiệu bản thân và Trường học', kanji: 10, vocab: 20 },
      { id: 2, title: 'Số đếm và Đơn vị tiền tệ', kanji: 14, vocab: 50 },
      { id: 3, title: 'Thời gian và Ngày trong tuần', kanji: 11, vocab: 28 },
    ]
  },
  {
    id: 'jpd123',
    code: 'JPD123',
    title: 'JAPANESE 2',
    subtitle: 'KANJI MASTERY',
    description: 'Nâng cao vốn Hán tự và từ vựng cho giao tiếp hàng ngày.',
    color: 'blue',
    hex: '#2563EB',
    bgLight: 'bg-[#DBEAFE]',
    bgDark: 'bg-[#2563EB]',
    borderLight: 'border-[#93C5FD]',
    textClass: 'text-[#2563EB]',
    iconColor: 'text-blue-400',
    iconBorder: 'border-blue-200',
    pillBg: 'bg-blue-50',
    pillText: 'text-blue-600',
    pillBorder: 'border-blue-100',
    lessonHoverBorder: 'hover:border-blue-200',
    lessonIconBg: 'bg-blue-50',
    lessonIconText: 'text-blue-500',
    lessonIconBorder: 'border-blue-100',
    arrowBgHover: 'group-hover:bg-blue-50',
    arrowTextHover: 'group-hover:text-blue-500',
    progress: 0,
    lessons: [
      { id: 4, title: 'Địa điểm và Phương hướng', kanji: 10, vocab: 15 },
      { id: 5, title: 'Hành động và Nghỉ ngơi', kanji: 12, vocab: 31 },
      { id: 6, title: 'Giao tiếp và Sinh hoạt', kanji: 9, vocab: 42 },
      { id: 7, title: 'Tự nhiên và Cơ bản', kanji: 11, vocab: 22 },
    ]
  }
];

export const Kanji = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-full pb-20 overflow-hidden bg-[#FAF8F5] dark:bg-slate-950 font-sans">
      
      {/* =========================================
          BACKGROUND DECORATION (JAPANESE THEME)
      ========================================= */}
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.4] dark:opacity-[0.1]" 
        style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      ></div>

      {/* Watermark Kanji */}
      <div className="absolute top-20 right-10 pointer-events-none opacity-[0.03] dark:opacity-[0.02] transform rotate-12 select-none">
        <span className="font-jp text-[400px] font-black">漢</span>
      </div>

      {/* Minimal Mount Fuji SVG */}
      <div className="absolute top-0 right-0 w-[600px] h-[400px] pointer-events-none opacity-20 dark:opacity-10 mix-blend-multiply dark:mix-blend-lighten">
        <svg viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M300 150 L500 350 L100 350 Z" fill="#94a3b8" />
          <path d="M300 150 L360 210 L330 230 L300 200 L270 230 L240 210 Z" fill="#f8fafc" />
          {/* Torii Gate minimal */}
          <path d="M430 250 L470 250 M440 250 L440 290 M460 250 L460 290 M435 260 L465 260" stroke="#fca5a5" strokeWidth="4" />
        </svg>
      </div>

      {/* =========================================
          MAIN CONTENT
      ========================================= */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-8 pt-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-3">
             <div className="w-10 h-10 bg-rose-600 rounded-lg flex items-center justify-center text-white font-jp font-bold text-xl shadow-lg shadow-rose-500/30">
               漢
             </div>
             <h1 className="text-4xl md:text-5xl font-black text-slate-800 dark:text-slate-100 tracking-tight">Hán tự <span className="font-jp text-3xl font-bold text-slate-300 dark:text-slate-700 ml-2">漢字</span></h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-lg ml-14">
            Học Hán tự theo lộ trình chuẩn từ cơ bản đến nâng cao
          </p>
        </motion.div>

        {/* Global Stats Dashboard */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0.05 }}
          className="bg-white/80 backdrop-blur-xl dark:bg-slate-900/80 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 mb-12 flex flex-wrap gap-8 items-center justify-between"
        >
          <div className="flex gap-8 divide-x divide-slate-200 dark:divide-slate-800 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <div className="flex items-center gap-4 px-4 min-w-max">
              <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center font-jp font-bold text-lg">漢</div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Tổng khóa học</p>
                <p className="text-2xl font-black text-slate-800 dark:text-slate-100 leading-none">2</p>
              </div>
            </div>
            <div className="flex items-center gap-4 px-6 min-w-max">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center"><BookOpen size={18} /></div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Tổng bài học</p>
                <p className="text-2xl font-black text-slate-800 dark:text-slate-100 leading-none">7</p>
              </div>
            </div>
            <div className="flex items-center gap-4 px-6 min-w-max">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-500 flex items-center justify-center"><TargetIcon size={18} /></div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Tổng Hán tự</p>
                <p className="text-2xl font-black text-slate-800 dark:text-slate-100 leading-none">77</p>
              </div>
            </div>
            <div className="flex items-center gap-4 px-6 min-w-max">
              <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-500 flex items-center justify-center"><Gift size={18} /></div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Tổng từ vựng</p>
                <p className="text-2xl font-black text-slate-800 dark:text-slate-100 leading-none">208</p>
              </div>
            </div>
          </div>
          
          {/* Progress Bar overall */}
          <div className="flex-1 min-w-[200px] md:pl-8 border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-800 pt-4 md:pt-0 mt-4 md:mt-0">
             <div className="flex justify-between items-center mb-2">
               <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider"><Star size={14} className="text-orange-400" /> Tiến độ chung</div>
               <div className="text-lg font-black text-slate-800 dark:text-slate-100">0%</div>
             </div>
             <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
               <div className="bg-slate-800 dark:bg-slate-100 rounded-full h-2 w-[0%]"></div>
             </div>
          </div>
        </motion.div>

        {/* =========================================
            COURSE PATHS
        ========================================= */}
        <div className="space-y-5">
          {COURSES.map((course, idx) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0.1 + idx * 0.05 }}
              className="flex flex-col lg:flex-row items-start gap-4"
            >
              {/* Left Side: Course Identifier Card */}
              <div className="lg:w-[280px] shrink-0 sticky top-4">
                <div className="rounded-3xl overflow-hidden shadow-[0_10px_30px_rgb(0,0,0,0.04)] border border-slate-200 dark:border-slate-800 flex flex-col">
                  {/* Card Top */}
                  <div className={`${course.bgLight} dark:bg-slate-900 py-8 px-4 text-center relative flex flex-col items-center justify-center`}>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1">
                      {course.subtitle}
                    </p>
                    <h2 className={`text-5xl font-black ${course.textClass} tracking-tighter mb-1`}>
                      {course.code}
                    </h2>
                    <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${course.textClass} opacity-80`}>
                      {course.title}
                    </p>
                    
                    {/* Floating Icon */}
                    <div className={`mt-3 w-8 h-8 rounded-full border-2 ${course.iconBorder} ${course.iconColor} flex items-center justify-center`}>
                      <BookOpen size={14} />
                    </div>
                  </div>
                  {/* Card Bottom */}
                  <div className={`${course.bgDark} p-4 text-white`}>
                    <button 
                      onClick={() => navigate(`/kanji/${course.id}/lesson/1`)}
                      className={`w-full py-2.5 rounded-xl bg-white ${course.textClass} font-bold text-sm flex items-center justify-center gap-2 hover:bg-white/90 transition-all shadow-lg shadow-black/10 hover:-translate-y-0.5 transform duration-200`}
                    >
                      <BookOpen size={16} /> Bắt đầu học
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Side: Learning Path / Lessons */}
              <div className="flex-1 bg-white/80 backdrop-blur-md dark:bg-slate-900/50 rounded-3xl p-4 lg:p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
                 {/* Header Row */}
                 <div className="flex justify-between items-start mb-4">
                   <div>
                     <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
                       {course.code} &ndash; {course.title}
                     </h3>
                     <p className="text-[11px] font-medium text-slate-500 mt-1">{course.description}</p>
                   </div>
                   <div className={`px-3 py-1.5 rounded-xl font-bold text-[10px] ${course.pillBg} ${course.pillText} uppercase tracking-wider border ${course.pillBorder} shrink-0 hidden sm:block`}>
                     {course.lessons.length} Lessons
                   </div>
                 </div>

                 {/* Lessons Grid */}
                 <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 h-[350px] xl:h-[155px] overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-200 dark:[&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-thumb]:rounded-full">
                   {course.lessons.map(lesson => (
                     <div 
                       key={lesson.id} 
                       onClick={() => navigate(`/kanji/${course.id}/lesson/${lesson.id}`)}
                       className={`bg-white dark:bg-slate-800 p-5 rounded-[1.5rem] border-2 border-slate-100 dark:border-slate-700 ${course.lessonHoverBorder} transition-all cursor-pointer group hover:-translate-y-1 shadow-sm hover:shadow-[0_10px_20px_rgb(0,0,0,0.04)] flex flex-col`}
                     >
                       <div className="flex items-start gap-3 mb-3">
                         <div className={`w-10 h-10 rounded-xl ${course.lessonIconBg} dark:bg-slate-700 ${course.lessonIconText} flex items-center justify-center shrink-0 border ${course.lessonIconBorder}`}>
                           {lesson.id % 2 === 0 ? <BookOpen size={18} /> : <span className="font-jp font-bold text-base">漢</span>}
                         </div>
                         <div>
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Lesson {lesson.id}</p>
                           <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm leading-snug line-clamp-2">{lesson.title}</h4>
                         </div>
                       </div>
                       
                       {/* Card Footer */}
                       <div className="mt-auto flex items-center justify-between border-t border-slate-50 dark:border-slate-700 pt-4">
                         <div className="flex gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                           <span>{lesson.kanji} Hán tự</span>
                           <span className="w-1 h-1 rounded-full bg-slate-300 self-center"></span>
                           <span>{lesson.vocab} Từ vựng</span>
                         </div>
                         <div className={`w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center ${course.arrowBgHover} text-slate-400 ${course.arrowTextHover} transition-colors`}>
                           <ChevronRight size={14} />
                         </div>
                       </div>
                     </div>
                   ))}
                 </div>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Footer info/tips */}
        <div className="mt-12 mb-8 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 dark:border-slate-800 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          </div>
          <div>
            <h4 className="font-bold text-slate-800 dark:text-slate-100 mb-1">Mẹo học Hán tự</h4>
            <p className="text-sm text-slate-500 font-medium">Học đều mỗi ngày sẽ giúp bạn ghi nhớ lâu hơn và ứng dụng tốt hơn trong giao tiếp. Cố gắng hoàn thành ít nhất 1 bài học mỗi tuần nhé!</p>
          </div>
          <div className="ml-auto shrink-0 hidden md:block opacity-20">
            <span className="font-jp text-5xl font-black">漢字</span>
          </div>
        </div>

      </div>
    </div>
  );
};
