import { useLocation, useOutlet } from 'react-router-dom';
import { Sidebar } from '../Sidebar/Sidebar';
import { Header } from '../Header/Header';
import { motion, AnimatePresence } from 'framer-motion';

export const Layout = () => {
  const location = useLocation();
  const outlet = useOutlet();

  return (
    <div className="flex min-h-screen bg-[var(--background)] dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 relative antialiased p-0 lg:p-3 lg:gap-3">
      <div className="hidden lg:block sticky top-3 h-[calc(100vh-24px)] shrink-0 z-20">
        <Sidebar />
      </div>
      {/* Mobile sidebar (renders hamburger + drawer) */}
      <div className="lg:hidden">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col min-w-0 z-10 relative min-h-[calc(100vh-24px)]">
        <div className="sticky top-0 z-30 pt-1 pb-2 bg-[var(--background)]/50 dark:bg-slate-950/50 backdrop-blur-md">
          <Header />
        </div>
        <main className="flex-1 px-3 md:px-8 pb-8 relative">
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="max-w-[1600px] mx-auto min-h-full w-full will-change-transform transform-gpu"
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

