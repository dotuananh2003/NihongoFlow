import { useLocation, useOutlet } from 'react-router-dom';
import { Sidebar } from '../Sidebar/Sidebar';
import { Header } from '../Header/Header';
import { motion, AnimatePresence } from 'framer-motion';

export const Layout = () => {
  const location = useLocation();
  const outlet = useOutlet();

  const isVocabPage = location.pathname.startsWith('/vocabulary/') && location.pathname !== '/vocabulary';
  const isKanjiPage = location.pathname.startsWith('/kanji');
  const isTransparentHeader = isVocabPage || isKanjiPage;

  return (
    <div className="flex min-h-screen bg-[var(--background)] dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 relative antialiased p-3 gap-3">
      <div className="sticky top-3 h-[calc(100vh-24px)] shrink-0 z-20">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col min-w-0 z-10 relative min-h-[calc(100vh-24px)]">
        {/* Nền đặc cho Header ở các trang thường để che nội dung cuộn. Trang Vocab và Kanji dùng nền trong suốt để hiện ảnh. */}
        <div className={`sticky top-0 z-30 pt-1 pb-2 ${!isTransparentHeader ? 'bg-[var(--background)] dark:bg-slate-950' : 'bg-transparent'}`}>
          <Header />
        </div>
        <main id="layout-main" className="flex-1 px-4 md:px-8 pb-8 relative">
          {isVocabPage && (
            <>
              {/* Lớp nền gốc (z-[-20]) */}
              <div className="fixed top-0 left-0 w-full pointer-events-none -z-20">
                <img 
                  src={location.pathname.includes('jpd113') ? "/images/bg-jpd113-vocab.png" : "/images/bg-jpd123-vocab.png"}
                  alt="Background"
                  className="w-full h-auto opacity-50 dark:opacity-20"
                  style={{ 
                    maskImage: 'linear-gradient(to bottom, black 60%, transparent 95%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 95%)'
                  }}
                />
              </div>

              {/* Lớp che Header (z-[20]): Nền màu đặc để giấu nội dung scroll, vẽ lại ảnh lên trên để không bị đứt đoạn */}
              <div className="fixed top-0 left-0 w-full h-[76px] md:h-[92px] bg-[var(--background)] dark:bg-slate-950 overflow-hidden z-[20] pointer-events-none">
                <img 
                  src={location.pathname.includes('jpd113') ? "/images/bg-jpd113-vocab.png" : "/images/bg-jpd123-vocab.png"}
                  alt="Background"
                  className="w-full h-auto opacity-50 dark:opacity-20"
                />
              </div>
            </>
          )}

          {isKanjiPage && (
            <>
              {/* Lớp nền gốc của Kanji (z-[-20]) */}
              <div className="fixed inset-0 z-[-20] pointer-events-none">
                <img 
                  src="/images/backgrounds/kanji-bg.jpg"
                  alt="Kanji Background"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-white/40 dark:bg-slate-950/60"></div>
              </div>

              {/* Mask Header */}
              <div className="fixed top-0 left-0 w-full h-[76px] md:h-[92px] bg-[var(--background)] dark:bg-slate-950 overflow-hidden z-[15] pointer-events-none">
                <img 
                  src="/images/backgrounds/kanji-bg.jpg"
                  alt=""
                  className="absolute top-0 left-0 w-screen h-screen object-cover object-center"
                />
                <div className="absolute top-0 left-0 w-screen h-screen bg-white/40 dark:bg-slate-950/60"></div>
              </div>
            </>
          )}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="max-w-[1600px] mx-auto min-h-full w-full"
              >
                {outlet}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};
