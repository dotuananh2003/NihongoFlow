import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ArrowRight, BookOpen, Flame, Sparkles, Target, Keyboard, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Landing = () => {
  const { scrollY } = useScroll();
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Parallax for Hero Background restored
  const yHeroBg = useTransform(scrollY, [0, 1000], [0, 300]);
  const yHeroContent = useTransform(scrollY, [0, 1000], [0, 150]);
  const opacityHero = useTransform(scrollY, [0, 800], [1, 0]);

  // For Theme Toggle simulation in Vocab section
  const [vocabTheme, setVocabTheme] = useState<'jpd113' | 'jpd123'>('jpd113');

  useEffect(() => {
    const interval = setInterval(() => {
      setVocabTheme(prev => prev === 'jpd113' ? 'jpd123' : 'jpd113');
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[var(--background)] dark:bg-slate-950 min-h-screen text-slate-800 dark:text-slate-100 font-sans overflow-x-hidden selection:bg-rose-500/30 selection:text-rose-900 dark:selection:text-rose-100">
      
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 transition-colors">
        <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-rose-500 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-rose-500/20">N</div>
            <span className="font-extrabold text-xl md:text-2xl tracking-tight text-slate-900 dark:text-white">NIHONGO</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 font-semibold text-sm text-slate-500 dark:text-slate-400">
            <a href="#" className="hover:text-rose-500 transition-colors">Trang chủ</a>
            <a href="#vocab" className="hover:text-rose-500 transition-colors">Từ vựng</a>
            <a href="#kanji" className="hover:text-rose-500 transition-colors">Hán tự</a>
            <a href="#grammar" className="hover:text-rose-500 transition-colors">Ngữ pháp</a>
            <a href="#practice" className="hover:text-rose-500 transition-colors">Luyện tập</a>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/" className="hidden sm:block text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Đăng nhập</Link>
            <Link to="/" className="bg-rose-500 hover:bg-rose-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-rose-500/25 transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2">
              Bắt đầu học <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </nav>

      {/* SECTION 1: HERO */}
      <section ref={heroRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden pt-20">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: yHeroBg, opacity: opacityHero }}
        >
          <img src="/images/hero-landing.png" alt="Japan Scenery" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/50 to-transparent dark:from-slate-950/95 dark:via-slate-950/60"></div>
        </motion.div>

        <motion.div 
          className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          style={{ y: yHeroContent, opacity: opacityHero }}
        >
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 text-rose-600 dark:text-rose-400 font-bold text-sm mb-6 shadow-sm"
            >
              <Sparkles size={16} /> Phương pháp học mới 2026
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="font-black text-5xl md:text-7xl leading-[1.15] tracking-tight mb-6 text-slate-900 dark:text-white"
            >
              Học tiếng Nhật <br/>
              theo cách <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-rose-400">trực quan</span><br/>
              và hiện đại.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="text-lg md:text-xl text-slate-500 dark:text-slate-400 mb-10 max-w-lg leading-relaxed font-medium"
            >
              Học Kanji, Từ vựng, Ngữ pháp và Luyện tập với AI. Hệ thống thiết kế đồng bộ mang lại trải nghiệm học tập mượt mà nhất.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="flex flex-wrap items-center gap-4"
            >
              <button className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-4 rounded-2xl font-bold shadow-[0_10px_30px_rgba(244,63,94,0.3)] transition-all hover:-translate-y-1 flex items-center gap-2">
                Bắt đầu học ngay <ArrowRight size={20} />
              </button>
              <button className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-800 px-8 py-4 rounded-2xl font-bold shadow-sm transition-all hover:-translate-y-1 flex items-center gap-2">
                Khám phá <Play size={20} className="fill-current" />
              </button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* SECTION 2: TỪ VỰNG */}
      <section id="vocab" className="py-24 md:py-32 relative overflow-hidden bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-200/50 dark:border-slate-800/50">
        {/* OPTIMIZATION: Thay thế blur-[100px] bằng radial-gradient để triệt tiêu tính toán GPU khi cuộn */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(244,63,94,0.06)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(244,63,94,0.12)_0%,transparent_70%)] -z-10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Restored X, Y animations with once: false */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, margin: "-100px" }} transition={{ duration: 0.6 }}
            >
              <h2 className="font-black text-4xl md:text-5xl mb-6 leading-tight text-slate-900 dark:text-white">
                Học từ vựng <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-rose-400">hiệu quả và nhớ lâu.</span>
              </h2>
              <p className="text-lg text-slate-500 dark:text-slate-400 mb-8 font-medium">
                Hệ thống Flashcard thông minh kết hợp với các bài tập luyện gõ và trắc nghiệm giúp não bộ ghi nhớ sâu hơn gấp 3 lần so với cách học truyền thống.
              </p>
              
              <div className="space-y-4">
                {['Flashcard Spaced Repetition', 'Luyện gõ tiếng Nhật (Typing)', 'Trắc nghiệm thông minh', 'Ôn tập theo chủ đề'].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50">
                    <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-500/10 text-rose-500 flex items-center justify-center font-bold">0{idx+1}</div>
                    <span className="font-bold text-slate-700 dark:text-slate-200">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false, margin: "-100px" }} transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* OPTIMIZATION: Thay thế blur-3xl bằng radial-gradient cực nhẹ cho GPU */}
              <div className={`absolute inset-0 rounded-[2.5rem] transition-colors duration-700 ${vocabTheme === 'jpd113' ? 'bg-[radial-gradient(circle,rgba(244,63,94,0.4)_0%,transparent_80%)]' : 'bg-[radial-gradient(circle,rgba(59,130,246,0.4)_0%,transparent_80%)]'} -m-10`}></div>
              
              {/* Mockup Container */}
              <div className={`relative bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-700/50 p-6 md:p-8 rounded-[2.5rem] shadow-2xl transition-colors duration-700 ${vocabTheme === 'jpd113' ? 'shadow-rose-500/10' : 'shadow-blue-500/10'}`}>
                {/* Header Mockup */}
                <div className="flex justify-between items-center mb-8">
                  <div className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors duration-700 ${vocabTheme === 'jpd113' ? 'bg-rose-50 text-rose-600 dark:bg-rose-500/10' : 'bg-blue-50 text-blue-600 dark:bg-blue-500/10'}`}>
                    Theme: {vocabTheme.toUpperCase()}
                  </div>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                  </div>
                </div>

                {/* Flashcard Mockup */}
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-[2rem] border border-slate-100 dark:border-slate-700/50 aspect-[4/3] flex flex-col items-center justify-center p-8 text-center relative overflow-hidden group hover:shadow-md transition-shadow">
                  <h3 className="font-jp text-6xl md:text-7xl font-bold text-slate-800 dark:text-white mb-4 group-hover:-translate-y-2 transition-transform">学生</h3>
                  <p className="font-jp text-xl text-slate-500 dark:text-slate-400 mb-2 font-medium">がくせい</p>
                  <p className={`text-sm font-bold transition-colors duration-700 ${vocabTheme === 'jpd113' ? 'text-rose-500' : 'text-blue-500'}`}>Học sinh, sinh viên</p>
                </div>

                {/* Buttons Mockup */}
                <div className="flex justify-between mt-6 gap-3">
                  <div className="flex-1 py-3.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-center font-bold text-slate-500 dark:text-slate-400 text-sm">Chưa thuộc</div>
                  <div className={`flex-1 py-3.5 rounded-xl text-center font-bold text-white text-sm shadow-md transition-colors duration-700 ${vocabTheme === 'jpd113' ? 'bg-rose-500 shadow-rose-500/25' : 'bg-blue-500 shadow-blue-500/25'}`}>Đã thuộc</div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTION 3: HÁN TỰ */}
      <section id="kanji" className="py-24 md:py-32 relative overflow-hidden bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, margin: "-100px" }} transition={{ duration: 0.6 }}
              className="relative order-2 lg:order-1"
            >
              {/* OPTIMIZATION: Thay thế blur-3xl bằng radial-gradient */}
              <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(16,185,129,0.2)_0%,transparent_80%)] rounded-[2.5rem] -m-10"></div>
              
              <div className="relative bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/50 p-6 md:p-8 rounded-[2.5rem] shadow-xl flex flex-col gap-5">
                
                {/* Kanji List Header */}
                <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50">
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 rounded-xl flex items-center justify-center font-jp text-xl font-bold">漢</div>
                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-slate-100">Bộ thủ & Hán tự</h4>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">JLPT N5 - N1</p>
                    </div>
                  </div>
                  <div className="px-3 py-1.5 bg-emerald-500 text-white text-[11px] font-bold rounded-lg shadow-sm">45% hoàn thành</div>
                </div>

                {/* Kanji Detail Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 flex flex-col items-center justify-center aspect-square">
                    <span className="font-jp text-6xl font-black text-slate-800 dark:text-white mb-3">語</span>
                    <span className="text-sm font-bold text-slate-500 dark:text-slate-400">NGỮ</span>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 h-full flex flex-col justify-center">
                      <p className="text-[11px] text-slate-400 dark:text-slate-500 mb-1.5 font-bold uppercase">Âm KUN</p>
                      <p className="font-jp font-bold text-slate-800 dark:text-slate-200">かた.る</p>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 h-full flex flex-col justify-center">
                      <p className="text-[11px] text-slate-400 dark:text-slate-500 mb-1.5 font-bold uppercase">Âm ON</p>
                      <p className="font-jp font-bold text-slate-800 dark:text-slate-200">ゴ</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50">
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 mb-2 font-bold uppercase">Ví dụ nổi bật</p>
                  <p className="font-jp text-sm font-medium text-slate-700 dark:text-slate-300"><span className="text-emerald-500 font-bold">日本<span className="text-slate-800 dark:text-white">語</span></span> (Tiếng Nhật)</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, margin: "-100px" }} transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <h2 className="font-black text-4xl md:text-5xl mb-6 leading-tight text-slate-900 dark:text-white">
                Chinh phục Hán tự <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">khoa học và bài bản.</span>
              </h2>
              <p className="text-lg text-slate-500 dark:text-slate-400 mb-8 font-medium">
                Học Hán tự không còn là nỗi ám ảnh. Hệ thống phân loại theo cấp độ JLPT, bộ thủ và ý nghĩa kết hợp với luyện viết và nhận diện giúp bạn nhớ lâu hơn.
              </p>
              
              <div className="grid grid-cols-2 gap-x-4 gap-y-5">
                {[
                  { icon: <BookOpen size={18}/>, text: 'Phân loại cấp độ' },
                  { icon: <Target size={18}/>, text: 'Flashcard & Quiz' },
                  { icon: <Keyboard size={18}/>, text: 'Âm On & Âm Kun' },
                  { icon: <Sparkles size={18}/>, text: 'Ví dụ thực tế' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <span className="font-bold text-sm text-slate-700 dark:text-slate-300">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTION 4: NGỮ PHÁP */}
      <section id="grammar" className="py-24 md:py-32 relative overflow-hidden bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-200/50 dark:border-slate-800/50">
        {/* OPTIMIZATION: Thay thế blur-[100px] bằng radial-gradient */}
        <div className="absolute left-0 bottom-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(245,158,11,0.06)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(245,158,11,0.12)_0%,transparent_70%)] -z-10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, margin: "-100px" }} transition={{ duration: 0.6 }}
            >
              <h2 className="font-black text-4xl md:text-5xl mb-6 leading-tight text-slate-900 dark:text-white">
                Nắm vững ngữ pháp <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-400">qua bài học dễ hiểu.</span>
              </h2>
              <p className="text-lg text-slate-500 dark:text-slate-400 mb-8 font-medium">
                Hệ thống ngữ pháp từ N5 đến N1 được giải thích rõ ràng, chi tiết, kèm theo nhiều ví dụ thực tế và bài tập đi kèm để củng cố kiến thức.
              </p>
              <button className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 px-6 py-3.5 rounded-xl font-bold shadow-sm hover:shadow-md transition-all flex items-center gap-2 hover:border-slate-300 dark:hover:border-slate-600">
                Khám phá hệ thống Ngữ pháp <ArrowRight size={18} />
              </button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false, margin: "-100px" }} transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-700/50 p-6 md:p-8 rounded-[2.5rem] shadow-xl">
                
                <div className="bg-gradient-to-br from-amber-50 dark:from-amber-900/20 to-white dark:to-slate-800 p-6 rounded-2xl mb-5 border border-amber-100/50 dark:border-amber-800/30">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/40 px-3 py-1 rounded-md uppercase tracking-wide">Bài 23</span>
                    <Flame className="text-amber-500" size={18} />
                  </div>
                  <h3 className="font-jp text-2xl font-bold text-slate-800 dark:text-white mb-2">〜ています</h3>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Diễn tả hành động đang diễn ra.</p>
                </div>

                <div className="space-y-3">
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 flex items-center gap-4 hover:border-amber-300 dark:hover:border-amber-700/50 transition-colors cursor-pointer group">
                    <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-700 flex items-center justify-center shrink-0 group-hover:bg-amber-50 dark:group-hover:bg-amber-900/40 transition-colors"><Play size={12} className="text-slate-400 dark:text-slate-300 ml-0.5 group-hover:text-amber-500" /></div>
                    <div>
                      <p className="font-jp font-bold text-slate-700 dark:text-slate-200">日本語<span className="text-amber-500">を勉強しています</span>。</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Tôi đang học tiếng Nhật.</p>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 flex items-center gap-4 hover:border-amber-300 dark:hover:border-amber-700/50 transition-colors cursor-pointer group">
                    <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-700 flex items-center justify-center shrink-0 group-hover:bg-amber-50 dark:group-hover:bg-amber-900/40 transition-colors"><Play size={12} className="text-slate-400 dark:text-slate-300 ml-0.5 group-hover:text-amber-500" /></div>
                    <div>
                      <p className="font-jp font-bold text-slate-700 dark:text-slate-200">音楽<span className="text-amber-500">を聞いています</span>。</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Tôi đang nghe nhạc.</p>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTION 5: LUYỆN TẬP */}
      <section id="practice" className="py-24 md:py-32 relative overflow-hidden bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.6 }}
          >
            <h2 className="font-black text-4xl md:text-5xl mb-6 leading-tight text-slate-900 dark:text-white">
              Luyện tập đa dạng, <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500">kiểm tra kiến thức.</span>
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">
              Trắc nghiệm, bài tập, kiểm tra theo chủ đề và cấp độ. Theo dõi tiến độ và cải thiện mỗi ngày.
            </p>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative h-[450px]">
          <motion.div 
            initial={{ opacity: 0, y: 50, rotate: -3 }}
            whileInView={{ opacity: 1, y: 0, rotate: -2 }}
            viewport={{ once: false }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="absolute left-[5%] md:left-[15%] top-10 w-[280px] md:w-80 bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 z-10"
          >
            <div className="flex justify-between items-center mb-6">
              <span className="font-bold text-sm text-slate-800 dark:text-slate-200">Trắc nghiệm</span>
              <span className="text-[11px] font-bold text-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 px-2.5 py-1 rounded-md">Câu 5/20</span>
            </div>
            <p className="font-jp text-lg font-bold mb-6 text-center text-slate-700 dark:text-slate-300">次の言葉の意味は？<br/><span className="text-2xl text-rose-500 mt-2 block">学生</span></p>
            <div className="space-y-2.5">
              {['Giáo viên', 'Học sinh', 'Bác sĩ', 'Giám đốc'].map((opt, i) => (
                <div key={i} className={`p-3.5 rounded-xl border font-bold text-sm text-center transition-colors cursor-pointer ${i === 1 ? 'bg-indigo-500 text-white border-indigo-500 shadow-md' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}`}>
                  {opt}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50, rotate: 3 }}
            whileInView={{ opacity: 1, y: 0, rotate: 2 }}
            viewport={{ once: false }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
            className="absolute right-[5%] md:right-[15%] top-16 md:top-20 w-[260px] md:w-72 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-slate-200/50 dark:border-slate-700/50 z-20 flex flex-col items-center"
          >
            <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-6">Kết quả</h4>
            <div className="relative w-32 h-32 flex items-center justify-center mb-6">
              <svg className="transform -rotate-90 w-32 h-32">
                <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100 dark:text-slate-800" />
                <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray="351" strokeDashoffset="70" className="text-emerald-500" strokeLinecap="round" />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-black text-slate-800 dark:text-white">80%</span>
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">Chính xác</span>
              </div>
            </div>
            <div className="w-full flex justify-between text-sm font-bold bg-slate-50 dark:bg-slate-800 px-4 py-3 rounded-xl border border-slate-100 dark:border-slate-700">
              <span className="text-emerald-500">Đúng: 16</span>
              <span className="text-rose-500">Sai: 4</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 6: THỐNG KÊ */}
      <section className="py-24 relative overflow-hidden bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-200/50 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 md:p-12 border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
            <div className="text-center mb-10">
              <h2 className="font-black text-3xl md:text-4xl mb-4 text-slate-900 dark:text-white">Theo dõi tiến độ của bạn</h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium">Thống kê chi tiết quá trình học tập mỗi ngày.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[
                { title: 'Từ vựng', value: '1,200+', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-500/10' },
                { title: 'Ngữ pháp', value: '350+', color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-500/10' },
                { title: 'Hán tự', value: '2,000+', color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
                { title: 'Chuỗi học', value: '23', suffix: 'ngày', color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-500/10' },
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ delay: i*0.1 }}
                  className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-5 md:p-6 border border-slate-100 dark:border-slate-700/50 flex flex-col items-center text-center hover:-translate-y-1 transition-transform"
                >
                  <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4 font-bold text-xl shadow-sm`}>
                    {stat.title[0]}
                  </div>
                  <h4 className="text-[13px] font-bold text-slate-500 dark:text-slate-400 mb-1">{stat.title}</h4>
                  <div className="flex items-baseline gap-1">
                    <span className={`text-2xl md:text-3xl font-black ${stat.color}`}>{stat.value}</span>
                    {stat.suffix && <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{stat.suffix}</span>}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: LOGIN / CTA */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <img src="/images/hero-landing.png" alt="Japan Night" className="w-full h-full object-cover object-bottom" style={{ filter: 'hue-rotate(20deg) brightness(0.6) contrast(1.1)' }} />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 to-slate-950/60"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }}
              className="font-black text-4xl md:text-5xl text-white mb-6 leading-tight"
            >
              Đăng nhập để bắt đầu hành trình học tiếng Nhật.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ delay: 0.1 }}
              className="text-slate-300 text-lg mb-10 font-medium"
            >
              Tham gia cùng hàng ngàn người học khác và chinh phục tiếng Nhật mỗi ngày!
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ delay: 0.2 }}
              className="space-y-5"
            >
              <div className="flex items-center gap-4 text-white font-semibold bg-white/5 p-3 rounded-xl border border-white/10 w-fit backdrop-blur-sm"><Sparkles className="text-rose-400" size={20} /> Học mọi lúc mọi nơi</div>
              <div className="flex items-center gap-4 text-white font-semibold bg-white/5 p-3 rounded-xl border border-white/10 w-fit backdrop-blur-sm"><Target className="text-emerald-400" size={20} /> Lộ trình cá nhân hóa</div>
              <div className="flex items-center gap-4 text-white font-semibold bg-white/5 p-3 rounded-xl border border-white/10 w-fit backdrop-blur-sm"><Flame className="text-amber-400" size={20} /> Theo dõi tiến độ chi tiết</div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }} transition={{ duration: 0.6 }}
          >
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 md:p-10 rounded-[2rem] shadow-2xl">
              <div className="text-center mb-8">
                <h3 className="font-black text-2xl text-white mb-2">Đăng nhập</h3>
                <p className="text-slate-300 text-sm font-medium">Chào mừng bạn quay trở lại!</p>
              </div>

              <form className="space-y-5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-2 uppercase tracking-widest">Email</label>
                  <input type="email" placeholder="Nhập email của bạn" className="w-full px-5 py-4 rounded-xl bg-white/10 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:border-rose-500 focus:bg-white/20 transition-all font-medium" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-2 uppercase tracking-widest">Mật khẩu</label>
                  <input type="password" placeholder="Nhập mật khẩu" className="w-full px-5 py-4 rounded-xl bg-white/10 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:border-rose-500 focus:bg-white/20 transition-all font-medium" />
                </div>
                
                <div className="flex justify-end">
                  <a href="#" className="text-sm font-bold text-rose-400 hover:text-rose-300 transition-colors">Quên mật khẩu?</a>
                </div>

                <button type="button" className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-rose-500/30 transition-all hover:-translate-y-0.5 active:translate-y-0">
                  Đăng nhập
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-white/10 text-center">
                <p className="text-sm text-slate-300 font-medium">Chưa có tài khoản? <a href="#" className="text-white font-bold hover:underline">Đăng ký ngay</a></p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};
