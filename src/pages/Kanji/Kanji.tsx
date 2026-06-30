import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ChevronRight, Target as TargetIcon, Gift, ChevronDown } from 'lucide-react';

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
      { id: 4, title: 'Địa điểm và Phương hướng', kanji: 10, vocab: 16 },
      { id: 5, title: 'Hành động và Nghỉ ngơi', kanji: 12, vocab: 30 },
      { id: 6, title: 'Giao tiếp và Sinh hoạt', kanji: 9, vocab: 56 },
      { id: 7, title: 'Tự nhiên và Cơ bản', kanji: 11, vocab: 33 },
    ]
  }
];

export const Kanji = () => {
  const navigate = useNavigate();
  const [isTipsOpen, setIsTipsOpen] = useState(false);

  return (
    <div className="relative min-h-full pb-20 overflow-hidden bg-transparent font-sans">
      
      {/* =========================================
          BACKGROUND DECORATION (JAPANESE THEME)
      ========================================= */}
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.4] dark:opacity-[0.1] transform-gpu z-0" 
        style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      ></div>

      {/* Watermark Kanji */}
      <div className="absolute top-20 right-10 pointer-events-none opacity-[0.03] dark:opacity-[0.02] transform rotate-12 select-none transform-gpu">
        <span className="font-jp text-[400px] font-black">漢</span>
      </div>

      {/* Minimal Mount Fuji SVG */}
      <div className="absolute top-0 right-0 w-[600px] h-[400px] pointer-events-none opacity-20 dark:opacity-10 mix-blend-multiply dark:mix-blend-lighten transform-gpu">
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
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }}
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
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0.05 }}
          className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 mb-12 flex overflow-x-auto"
        >
          <div className="flex gap-4 md:gap-8 divide-x divide-slate-200 dark:divide-slate-800 w-full justify-between pb-2 md:pb-0">
            <div className="flex items-center gap-4 px-2 md:px-4 min-w-max">
              <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center font-jp font-bold text-lg">漢</div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Tổng khóa học</p>
                <p className="text-2xl font-black text-slate-800 dark:text-slate-100 leading-none">2</p>
              </div>
            </div>
            <div className="flex items-center gap-4 px-4 md:px-6 min-w-max">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center"><BookOpen size={18} /></div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Tổng bài học</p>
                <p className="text-2xl font-black text-slate-800 dark:text-slate-100 leading-none">7</p>
              </div>
            </div>
            <div className="flex items-center gap-4 px-4 md:px-6 min-w-max">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-500 flex items-center justify-center"><TargetIcon size={18} /></div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Tổng Hán tự</p>
                <p className="text-2xl font-black text-slate-800 dark:text-slate-100 leading-none">77</p>
              </div>
            </div>
            <div className="flex items-center gap-4 px-4 md:px-6 min-w-max">
              <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-500 flex items-center justify-center"><Gift size={18} /></div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Tổng từ vựng</p>
                <p className="text-2xl font-black text-slate-800 dark:text-slate-100 leading-none">208</p>
              </div>
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
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
              <div className="flex-1 bg-white dark:bg-slate-900 rounded-3xl p-4 lg:p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
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

                 {/* Lessons List (Horizontal Layout) */}
                 <div className="flex flex-col gap-3 h-[350px] xl:h-[260px] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-200 dark:[&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-thumb]:rounded-full">
                   {course.lessons.map(lesson => (
                     <div 
                       key={lesson.id} 
                       onClick={() => navigate(`/kanji/${course.id}/lesson/${lesson.id}`)}
                       className={`bg-white/80 dark:bg-slate-800/80  p-4 rounded-[20px] border border-slate-100 dark:border-slate-700 ${course.lessonHoverBorder} transition-all cursor-pointer group  shadow-sm hover:shadow-md flex items-center justify-between`}
                     >
                       <div className="flex items-center gap-4">
                         <div className={`w-12 h-12 rounded-[14px] ${course.lessonIconBg} dark:bg-slate-700 ${course.lessonIconText} flex items-center justify-center shrink-0 border ${course.lessonIconBorder}`}>
                           {lesson.id % 2 === 0 ? <BookOpen size={20} /> : <span className="font-jp font-bold text-lg">漢</span>}
                         </div>
                         <div className="flex flex-col">
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Lesson {lesson.id}</p>
                           <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm leading-snug line-clamp-1">{lesson.title}</h4>
                         </div>
                       </div>
                       
                       <div className="flex items-center gap-4 shrink-0 ml-2">
                         <div className="flex flex-col items-end gap-1">
                           <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{lesson.kanji} Kanji</span>
                           <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{lesson.vocab} Vocab</span>
                         </div>
                         <div className={`w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center ${course.arrowBgHover} text-slate-400 ${course.arrowTextHover} transition-colors border border-slate-100 dark:border-slate-700`}>
                           <ChevronRight size={16} />
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
        <div className="mt-12 mb-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm transition-all duration-300">
          <div 
            className="p-6 flex items-center gap-4 cursor-pointer hover:bg-white/60 dark:hover:bg-slate-800/50 transition-colors"
            onClick={() => setIsTipsOpen(!isTipsOpen)}
          >
            <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-slate-800 dark:text-slate-100 mb-1">Mẹo học Hán tự hiệu quả</h4>
              <p className="text-sm text-slate-500 font-medium line-clamp-1 md:line-clamp-none">Nhấn để khám phá các phương pháp giúp bạn chinh phục Kanji dễ dàng hơn!</p>
            </div>
            <div className="shrink-0 hidden md:block opacity-20 mr-4">
              <span className="font-jp text-4xl font-black">漢字</span>
            </div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${isTipsOpen ? 'rotate-180 bg-orange-100 text-orange-500' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
              <ChevronDown size={18} />
            </div>
          </div>
          
          <AnimatePresence>
            {isTipsOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="px-6 pb-6 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                    {/* Tip 1 */}
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold">1</div>
                        <h5 className="font-bold text-slate-800 dark:text-slate-100 leading-tight">Học theo bộ thủ (Radicals)</h5>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-auto">Kanji được cấu tạo từ 214 bộ thủ. Nắm vững bộ thủ giúp bạn đoán được ý nghĩa và cách đọc của các chữ phức tạp (VD: Bộ Thủy 氵 thường chỉ các từ liên quan đến nước).</p>
                    </div>
                    {/* Tip 2 */}
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">2</div>
                        <h5 className="font-bold text-slate-800 dark:text-slate-100 leading-tight">Học qua câu chuyện (Mnemonics)</h5>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-auto">Tưởng tượng ra một câu chuyện kết nối các nét chữ Hán với ý nghĩa của nó. Não bộ ghi nhớ hình ảnh và câu chuyện tốt hơn rất nhiều so với học vẹt từng nét chữ.</p>
                    </div>
                    {/* Tip 3 */}
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center font-bold">3</div>
                        <h5 className="font-bold text-slate-800 dark:text-slate-100 leading-tight">Học theo cụm từ vựng</h5>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-auto">Đừng học Kanji đứng một mình. Hãy học luôn cả từ vựng chứa Kanji đó để biết chính xác khi nào dùng âm On (âm Hán), khi nào dùng âm Kun (âm Nhật).</p>
                    </div>
                    {/* Tip 4 */}
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center font-bold">4</div>
                        <h5 className="font-bold text-slate-800 dark:text-slate-100 leading-tight">Ôn tập ngắt quãng</h5>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-auto">Sử dụng Flashcard để ôn lại các Kanji bạn đã học vào các khoảng thời gian tăng dần. Đây là chìa khóa để chuyển Kanji vào trí nhớ dài hạn của bạn.</p>
                    </div>
                    {/* Tip 5 */}
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center font-bold">5</div>
                        <h5 className="font-bold text-slate-800 dark:text-slate-100 leading-tight">Luyện viết đúng thứ tự nét</h5>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-auto">Việc viết tay đúng quy tắc (Trái trước phải sau, trên trước dưới sau) sẽ rèn luyện trí nhớ cơ bắp, giúp bạn nhớ cấu trúc chữ tự nhiên hơn rất nhiều.</p>
                    </div>
                    {/* Tip 6 */}
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-cyan-100 text-cyan-600 flex items-center justify-center font-bold">6</div>
                        <h5 className="font-bold text-slate-800 dark:text-slate-100 leading-tight">Đọc nhiều tài liệu thực tế</h5>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-auto">Đọc sách, báo, truyện tranh (Manga) có chứa Furigana sẽ giúp bạn gặp lại Kanji nhiều lần trong các ngữ cảnh đa dạng, củng cố phản xạ nhận diện chữ.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};
