import { motion } from 'framer-motion';
import { Flame, Target, BookOpen, Brain, Sparkles, ChevronRight, CheckCircle2, ChevronDown } from 'lucide-react';
import { ToriiGate } from '../../components/Icons/ToriiGate';

// --- Dummy Data ---
const activities = [
  { id: 1, title: 'Ôn tập 20 từ vựng', sub: 'Đã hoàn thành 12/20', progress: 60, color: 'text-blue-500', bg: 'bg-blue-50' },
  { id: 2, title: 'Học 5 kanji mới', sub: 'Đã hoàn thành 3/5', progress: 60, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { id: 3, title: 'Luyện ngữ pháp N5', sub: 'Đã hoàn thành 1/3', progress: 33, color: 'text-orange-500', bg: 'bg-orange-50' },
  { id: 4, title: 'Luyện nói 10 phút', sub: 'Đã hoàn thành 0/1', progress: 0, color: 'text-indigo-500', bg: 'bg-indigo-50' },
];

const weeklyStats = [
  { day: 'T2', value: 35 },
  { day: 'T3', value: 60 },
  { day: 'T4', value: 30 },
  { day: 'T5', value: 55 },
  { day: 'T6', value: 75 },
  { day: 'T7', value: 90 },
  { day: 'CN', value: 20 },
];

const suggestions = [
  { id: 1, title: 'Học kanji theo bộ thủ', sub: 'Học hiệu quả hơn', icon: '字', color: 'text-rose-500', bg: 'bg-rose-50' },
  { id: 2, title: 'Từ vựng N5', sub: 'Phù hợp với trình độ của bạn', icon: <BookOpen size={20}/>, color: 'text-blue-500', bg: 'bg-blue-50' },
  { id: 3, title: 'Luyện phát âm', sub: 'Cải thiện kỹ năng nói', icon: '🎤', color: 'text-purple-500', bg: 'bg-purple-50' },
  { id: 4, title: 'Thi thử JLPT N5', sub: 'Kiểm tra trình độ', icon: '📝', color: 'text-indigo-500', bg: 'bg-indigo-50' },
];

// --- Sub Components ---
const CircularProgress = ({ value, color }: { value: number, color: string }) => {
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;
  
  return (
    <div className="relative w-10 h-10 flex items-center justify-center">
      <svg className="transform -rotate-90 w-10 h-10">
        <circle cx="20" cy="20" r={radius} stroke="currentColor" strokeWidth="3" fill="transparent" className="text-slate-100 dark:text-slate-800" />
        <circle 
          cx="20" cy="20" r={radius} 
          stroke="currentColor" strokeWidth="3" fill="transparent" 
          strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} 
          className={`${color} transition-all duration-1000 ease-out`} 
          strokeLinecap="round"
        />
      </svg>
      <span className={`absolute text-[10px] font-bold ${color}`}>{value}%</span>
    </div>
  );
};

export const Home = () => {
  return (
    <div className="space-y-6 pb-12">
      {/* 1. HERO BANNER */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-white dark:bg-slate-900 rounded-[2rem] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 dark:border-slate-800"
      >
        <div className="relative z-10 max-w-xl">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-800 dark:text-slate-100 mb-4 font-jp flex items-center gap-3">
            おかえりなさい！ <Sparkles className="text-rose-400" size={32} />
          </h2>
          <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 font-medium">
            Chúc bạn một ngày học tập hiệu quả!
          </p>
        </div>
        
        {/* Background Decorative Illustration via pure CSS/SVG */}
        <div className="absolute right-0 bottom-0 top-0 w-1/2 pointer-events-none opacity-80 mix-blend-multiply dark:mix-blend-screen hidden md:block">
           <div className="absolute inset-0 bg-gradient-to-l from-rose-100/40 to-transparent"></div>
           {/* Sun */}
           <div className="absolute right-64 top-4 w-32 h-32 bg-rose-200/40 rounded-full blur-xl transform-gpu will-change-transform"></div>
           <div className="absolute right-40 top-20 w-24 h-24 rounded-full bg-rose-400 shadow-[0_0_50px_rgba(251,113,133,0.6)]"></div>
           {/* Abstract Torii / Fuji placeholder */}
           <svg className="absolute bottom-0 right-10 w-64 h-64 text-rose-900/10 dark:text-rose-200/5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 6h16v2H4zm-1 0l1-2h16l1 2v2H3zm3 2v14h2V8zm10 0v14h2V8zM6 11h12v2H6zm6-5v5h2V6z" />
           </svg>
        </div>
      </motion.div>

      {/* 2. STATS CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Card 1: Kanji */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 dark:border-slate-800 hover:-translate-y-1 transition-transform duration-300 will-change-transform transform-gpu">
          <div className="flex justify-between items-start mb-3">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center text-2xl font-jp font-bold">字</div>
            <div className="text-right">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Hán tự đã học</p>
              <div className="flex items-baseline gap-1 justify-end">
                <span className="text-2xl font-black text-slate-800 dark:text-slate-100">245</span>
                <span className="text-xs text-slate-400 font-medium">/ 2.136</span>
              </div>
            </div>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 mt-4">
            <div className="bg-rose-500 h-1.5 rounded-full w-[11%]"></div>
          </div>
          <p className="text-right text-[10px] font-bold text-slate-400 mt-1">11%</p>
        </div>

        {/* Card 2: Vocab */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 dark:border-slate-800 border-b-4 border-b-blue-500 hover:-translate-y-1 transition-transform duration-300 will-change-transform transform-gpu">
          <div className="flex justify-between items-start mb-3">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center"><BookOpen size={20} strokeWidth={2.5}/></div>
            <div className="text-right">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Từ vựng đã học</p>
              <div className="flex items-baseline gap-1 justify-end">
                <span className="text-2xl font-black text-slate-800 dark:text-slate-100">1.245</span>
                <span className="text-xs text-slate-400 font-medium">/ 10.000</span>
              </div>
            </div>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 mt-4">
            <div className="bg-blue-500 h-1.5 rounded-full w-[12%]"></div>
          </div>
          <p className="text-right text-[10px] font-bold text-slate-400 mt-1">12%</p>
        </div>

        {/* Card 3: Grammar */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 dark:border-slate-800 border-b-4 border-b-emerald-500 hover:-translate-y-1 transition-transform duration-300 will-change-transform transform-gpu">
          <div className="flex justify-between items-start mb-3">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center"><Brain size={22} strokeWidth={2.5}/></div>
            <div className="text-right">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Ngữ pháp đã học</p>
              <div className="flex items-baseline gap-1 justify-end">
                <span className="text-2xl font-black text-slate-800 dark:text-slate-100">68</span>
                <span className="text-xs text-slate-400 font-medium">/ 300</span>
              </div>
            </div>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 mt-4">
            <div className="bg-emerald-500 h-1.5 rounded-full w-[22%]"></div>
          </div>
          <p className="text-right text-[10px] font-bold text-slate-400 mt-1">22%</p>
        </div>

        {/* Card 4: Streak */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 dark:border-slate-800 hover:-translate-y-1 transition-transform duration-300 will-change-transform transform-gpu">
          <div className="flex justify-between items-start mb-3">
            <div className="w-12 h-12 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center"><Flame size={24} strokeWidth={2.5}/></div>
            <div className="text-right">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Chuỗi ngày học</p>
              <div className="flex items-baseline gap-1 justify-end">
                <span className="text-2xl font-black text-slate-800 dark:text-slate-100">12</span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">ngày liên tiếp!</p>
            </div>
          </div>
          <div className="flex justify-between items-center mt-3 px-1">
             {[1,2,3,4,5,6,7].map(i => (
               <Flame key={i} size={14} className={i <= 4 ? "text-orange-500 fill-orange-500" : "text-slate-200 dark:text-slate-700"} />
             ))}
          </div>
        </div>

        {/* Card 5: JLPT */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 dark:border-slate-800 border-b-4 border-b-indigo-500 hover:-translate-y-1 transition-transform duration-300 will-change-transform transform-gpu">
          <div className="flex justify-between items-start mb-3">
            <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center"><Target size={22} strokeWidth={2.5}/></div>
            <div className="text-right">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Tiến độ JLPT</p>
              <div className="flex items-baseline gap-1 justify-end">
                <span className="text-2xl font-black text-slate-800 dark:text-slate-100">N5</span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">45% hoàn thành</p>
            </div>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 mt-4">
            <div className="bg-indigo-500 h-1.5 rounded-full w-[45%]"></div>
          </div>
        </div>
      </div>

      {/* 3. MAIN DASHBOARD CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* COLUMN 1: Learning Path (Span 5) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="col-span-1 lg:col-span-6 bg-white dark:bg-slate-900 rounded-[2rem] p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 dark:border-slate-800 relative overflow-hidden"
        >
          <div className="flex items-center gap-2 mb-8">
            <ToriiGate size={20} className="text-[var(--primary)]" />
            <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">Lộ trình học tập</h3>
          </div>
          
          {/* Path timeline */}
          <div className="flex items-center justify-between mb-10 relative">
            <div className="absolute left-6 right-6 top-6 h-[2px] bg-slate-100 dark:bg-slate-800 -z-10"></div>
            
            {/* Steps */}
            {[
              { id: 'intro', label: 'Nhập môn', jp: '入門', icon: <ToriiGate size={24} />, active: true },
              { id: 'kanji', label: 'Hán tự', jp: '漢字', icon: '漢', active: false },
              { id: 'vocab', label: 'Từ vựng', jp: '語彙', icon: '語', active: false },
              { id: 'grammar', label: 'Ngữ pháp', jp: '文法', icon: '文', active: false },
              { id: 'conversation', label: 'Luyện nói', jp: '会話', icon: '話', active: false },
              { id: 'exam', label: 'Thi thử', jp: '試験', icon: '試', active: false },
            ].map((step) => (
               <div key={step.id} className="flex flex-col items-center gap-2">
                 <div className={`w-12 h-12 rounded-full flex items-center justify-center font-jp font-bold text-lg shadow-sm border-2 ${step.active ? 'bg-white border-[var(--primary)] text-[var(--primary)]' : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-300 dark:text-slate-500'}`}>
                   {step.icon}
                 </div>
                 <div className="text-center">
                   <p className={`text-[11px] font-bold ${step.active ? 'text-slate-800 dark:text-slate-100' : 'text-slate-400'}`}>{step.label}</p>
                   <p className={`text-[9px] ${step.active ? 'text-slate-500' : 'text-slate-300 dark:text-slate-600'}`}>{step.jp}</p>
                 </div>
               </div>
            ))}
          </div>

          <div>
            <p className="font-medium text-slate-600 dark:text-slate-300 mb-1">Bạn đang ở giai đoạn: <span className="font-bold text-slate-800 dark:text-slate-100">Nhập môn</span></p>
            <p className="text-sm text-slate-400 mb-6">Hãy bắt đầu hành trình chinh phục tiếng Nhật của bạn!</p>
            <button className="bg-[var(--primary)] text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-md shadow-rose-500/20 hover:bg-rose-700 transition-colors flex items-center gap-2">
              Tiếp tục học <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>

        {/* COLUMN 2: Today's Activities (Span 3) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="col-span-1 lg:col-span-3 bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 dark:border-slate-800"
        >
          <div className="flex items-center gap-2 mb-6">
            <CheckCircle2 size={20} className="text-rose-500" />
            <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">Hoạt động hôm nay</h3>
          </div>

          <div className="space-y-4">
            {activities.map(act => (
              <div key={act.id} className="flex items-center justify-between p-3 rounded-2xl border border-slate-50 dark:border-slate-800/50 hover:shadow-sm transition-shadow bg-slate-50/50 dark:bg-slate-800/20">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-jp font-bold ${act.bg} ${act.color} dark:bg-opacity-10`}>
                     {act.title[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-700 dark:text-slate-200">{act.title}</h4>
                    <p className="text-[11px] text-slate-400">{act.sub}</p>
                  </div>
                </div>
                <CircularProgress value={act.progress} color={act.color} />
              </div>
            ))}
          </div>
        </motion.div>

        {/* COLUMN 3: Weekly Chart (Span 3) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="col-span-1 lg:col-span-3 bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 dark:border-slate-800 flex flex-col"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">Thống kê tuần này</h3>
            <button className="text-xs font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg flex items-center gap-1">
              Tuần này <ChevronDown size={14} />
            </button>
          </div>

          {/* CSS Bar Chart */}
          <div className="flex-1 flex items-end justify-between gap-2 h-40 pt-4 pb-2 border-b border-slate-100 dark:border-slate-800 relative">
             {/* Y-axis labels */}
             <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-[10px] text-slate-300 font-medium z-0">
               <span>100</span><span>75</span><span>50</span><span>25</span><span>0</span>
             </div>
             
             {/* Bars */}
             <div className="flex justify-between w-full pl-6 relative z-10">
               {weeklyStats.map(stat => (
                 <div key={stat.day} className="flex flex-col items-center gap-2 group">
                   <div className="w-8 h-32 flex items-end justify-center rounded-t-md">
                     <motion.div 
                       initial={{ height: 0 }}
                       animate={{ height: `${stat.value}%` }}
                       transition={{ duration: 1, type: "spring", delay: 0.4 }}
                       className={`w-6 rounded-md transition-colors ${stat.day === 'T7' ? 'bg-rose-400' : 'bg-rose-200 dark:bg-rose-900/40 group-hover:bg-rose-300 dark:group-hover:bg-rose-900/60'}`}
                     />
                   </div>
                   <span className="text-[10px] font-bold text-slate-400">{stat.day}</span>
                 </div>
               ))}
             </div>
          </div>

          {/* Quote */}
          <div className="mt-4 text-center">
            <p className="text-sm font-jp font-black text-rose-500 mb-1">継続は力なり。</p>
            <p className="text-[11px] text-slate-400 font-medium">Kiên trì là sức mạnh.</p>
          </div>
        </motion.div>
      </div>

      {/* 4. SUGGESTIONS ROW */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
      >
        <div className="flex items-center gap-2 mb-4 mt-8 px-2">
          <Sparkles size={20} className="text-rose-400" />
          <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">Gợi ý dành cho bạn</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {suggestions.map(sug => (
            <div key={sug.id} className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-800 flex items-center justify-between group cursor-pointer hover:border-rose-200 dark:hover:border-rose-500/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${sug.bg} ${sug.color} dark:bg-opacity-10`}>
                  {sug.icon}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-700 dark:text-slate-200">{sug.title}</h4>
                  <p className="text-[11px] text-slate-400">{sug.sub}</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-slate-300 group-hover:text-rose-400 transition-colors" />
            </div>
          ))}
        </div>
      </motion.div>
      
    </div>
  );
};
