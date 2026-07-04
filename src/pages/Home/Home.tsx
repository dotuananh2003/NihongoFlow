import { motion } from 'framer-motion';
import { 
  Sparkles, Play, BookOpen, Brain, Mic, 
  ArrowRight, Lightbulb, Zap, BookMarked, Target
} from 'lucide-react';

const quickModules = [
  { id: 'vocab', title: 'Từ vựng', icon: <div className="w-12 h-12 rounded-[14px] bg-rose-50 dark:bg-rose-500/10 text-rose-500 flex items-center justify-center group-hover:scale-110 transition-transform"><BookOpen size={24} /></div>, items: ['Học Flashcard', 'Trắc nghiệm', 'Ôn tập', 'Luyện gõ từ vựng'] },
  { id: 'kanji', title: 'Hán tự', icon: <div className="w-12 h-12 rounded-[14px] bg-blue-50 dark:bg-blue-500/10 text-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform"><BookMarked size={24} /></div>, items: ['Kanji', 'Flashcard', 'Bộ thủ', 'Viết'] },
  { id: 'grammar', title: 'Ngữ pháp', icon: <div className="w-12 h-12 rounded-[14px] bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform"><Brain size={24} /></div>, items: ['Cấu trúc', 'Ví dụ', 'Luyện tập'] },
  { id: 'speaking', title: 'Luyện nói', icon: <div className="w-12 h-12 rounded-[14px] bg-purple-50 dark:bg-purple-500/10 text-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform"><Mic size={24} /></div>, items: ['Shadowing', 'Phát âm', 'Hội thoại'] },
  { id: 'jlpt', title: 'Thi JLPT', icon: <div className="w-12 h-12 rounded-[14px] bg-amber-50 dark:bg-amber-500/10 text-amber-500 flex items-center justify-center group-hover:scale-110 transition-transform"><Target size={24} /></div>, items: ['Mini Test', 'Mock Test', 'N5'] },
];



const discoveries = [
  { id: 1, title: 'Từ vựng', desc: 'Học từ vựng qua hình ảnh và flashcard', bg: 'bg-rose-50', color: 'text-rose-500', icon: <BookOpen size={24} /> },
  { id: 2, title: 'Kanji', desc: 'Nhớ Kanji lâu hơn với hệ thống bộ thủ', bg: 'bg-blue-50', color: 'text-blue-500', icon: <BookMarked size={24} /> },
  { id: 3, title: 'Ngữ pháp', desc: 'Hàng ngàn cấu trúc ngữ pháp thực tế', bg: 'bg-emerald-50', color: 'text-emerald-500', icon: <Brain size={24} /> },
  { id: 4, title: 'Luyện nói', desc: 'Thực hành giao tiếp tiếng Nhật mỗi ngày', bg: 'bg-purple-50', color: 'text-purple-500', icon: <Mic size={24} /> },
];

const tips = [
  { id: 1, title: 'Ví dụ', desc: 'Cách dùng mẫu câu "~てもいいですか" trong thực tế.' },
  { id: 2, title: 'Kanji mỗi ngày', desc: 'Chữ 「食」 (Thực) - Khám phá Kanji về ăn uống.' },
  { id: 3, title: 'Ngữ pháp hôm nay', desc: 'Phân biệt "は" và "が" chi tiết và dễ hiểu nhất.' },
];

export const Home = () => {
  // Dynamically load any image from the welcome folder
  const welcomeImages = import.meta.glob('../../assets/images/welcome/*', { eager: true, import: 'default' });
  const imageUrls = Object.values(welcomeImages) as string[];
  const bgUrl = imageUrls.length > 0 ? imageUrls[0] : null;

  return (
    <div className="space-y-12 pb-8 max-w-[1400px] mx-auto pt-2">
      {/* 1. HERO BANNER */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative overflow-hidden bg-slate-900 rounded-[24px] shadow-[0_10px_40px_rgba(15,23,42,0.1)] h-[320px] md:h-[360px]"
      >
        {bgUrl && (
          <img 
            src={bgUrl} 
            alt="Hero Banner" 
            className="absolute inset-0 w-full h-full object-cover object-[center_30%]"
          />
        )}
        {/* Soft dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/40 to-transparent"></div>

        <div className="relative z-10 p-10 md:p-14 h-full flex flex-col justify-center max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4 font-jp flex items-center gap-3">
            おかえりなさい！ <Sparkles className="text-yellow-400" size={32} />
          </h2>
          <p className="text-lg md:text-xl text-slate-200 font-medium mb-8">
            Chúc bạn một ngày học tập hiệu quả.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <button className="bg-[var(--primary)] text-white px-8 py-3.5 rounded-full font-bold shadow-lg shadow-[var(--primary)]/30 hover:brightness-110 transition-all active:scale-95 flex items-center gap-2">
              Bắt đầu học <ArrowRight size={18} />
            </button>
            <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-3.5 rounded-full font-bold hover:bg-white/20 transition-all active:scale-95 flex items-center gap-2">
              <Play size={18} /> Tiếp tục bài học
            </button>
          </div>
        </div>
      </motion.div>

      {/* 2. QUICK LEARNING MODULES */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5"
      >
        {quickModules.map((mod) => (
          <motion.div 
            key={mod.id}
            whileHover={{ scale: 1.02, y: -2 }}
            className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-[0_10px_35px_rgba(15,23,42,0.04)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.2)] rounded-[20px] p-5 cursor-pointer transition-all duration-300"
          >
            <div className="mb-4">{mod.icon}</div>
            <h3 className="text-[17px] font-bold text-slate-800 dark:text-slate-100 mb-3">{mod.title}</h3>
            <ul className="space-y-2">
              {mod.items.map((item, i) => (
                <li key={i} className="text-[13px] text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.section>



      {/* 4. DISCOVERIES */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
      >
        <div className="flex items-center mb-6 px-1">
          <h3 className="font-bold text-xl text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Lightbulb size={22} className="text-amber-500" fill="currentColor" /> Khám phá
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {discoveries.map(item => (
            <motion.div 
              key={item.id}
              whileHover={{ scale: 1.02, y: -4 }}
              className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-[24px] shadow-[0_10px_35px_rgba(15,23,42,0.03)] dark:shadow-none cursor-pointer flex flex-col justify-between min-h-[160px]"
            >
              <div className={`w-14 h-14 rounded-2xl ${item.bg} ${item.color} dark:bg-opacity-10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {item.icon}
              </div>
              <div>
                <h4 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-2">{item.title}</h4>
                <p className="text-[13px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 5. TIPS */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
      >
        <div className="flex items-center mb-6 px-1">
          <h3 className="font-bold text-xl text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Zap size={20} className="text-indigo-500" fill="currentColor" /> Mẹo học tiếng Nhật
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {tips.map(tip => (
            <motion.div 
              key={tip.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-[20px] shadow-[0_8px_30px_rgba(15,23,42,0.03)] dark:shadow-none cursor-pointer"
            >
              <h4 className="font-bold text-slate-800 dark:text-slate-100 mb-2">{tip.title}</h4>
              <p className="text-[14px] text-slate-500 dark:text-slate-400 leading-relaxed">{tip.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 6. FOOTER */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="pt-16 pb-6 flex flex-col items-center justify-center mt-12"
      >
        <div className="flex flex-col items-center gap-3 opacity-60 hover:opacity-100 transition-opacity">
          <img src="/logo.png" alt="Logo" className="w-8 h-8 grayscale" />
          <p className="text-[11px] font-bold text-slate-400 tracking-wider">© 2026 NIHONGO 学習</p>
        </div>
      </motion.footer>
    </div>
  );
};
