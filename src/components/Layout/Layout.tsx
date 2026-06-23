import { useLocation, useOutlet } from 'react-router-dom';
import { Sidebar } from '../Sidebar/Sidebar';
import { Header } from '../Header/Header';
import { motion, AnimatePresence } from 'framer-motion';

export const Layout = () => {
  const location = useLocation();
  const outlet = useOutlet();

  return (
    <div className="flex h-screen overflow-hidden bg-[#FAF8F5] dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 relative antialiased">
      <div className="absolute inset-0 bg-washi pointer-events-none z-0 opacity-40 transform-gpu will-change-transform"></div>
      
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 z-10 relative h-full">
        <Header />
        <main className="flex-1 overflow-y-auto px-4 md:px-8 pb-8 relative scrollbar-hide h-full">
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
        </main>
      </div>
    </div>
  );
};
