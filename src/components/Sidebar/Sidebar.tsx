import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Castle, 
  ScrollText, 
  Brain, 
  Puzzle, 
  Crown, 
  Mic, 
  FileText,
  ArrowLeftToLine,
  ArrowRightToLine,
  Home,
  Menu,
  X
} from 'lucide-react';
import { ToriiGate } from '../Icons/ToriiGate';

const navItems = [
  { path: '/', label: 'Trang chủ', sub: 'ホーム', icon: Home },
  { path: '/introduction', label: 'Nhập môn', sub: 'はじめての日本語', icon: ToriiGate },
  { path: '/kanji', label: 'Hán tự', sub: 'かんじを学ぶ', icon: Castle },
  { path: '/vocabulary', label: 'Từ vựng', sub: 'ごいを増やす', icon: ScrollText },
  { path: '/grammar', label: 'Ngữ pháp', sub: 'ぶんぽうを学ぶ', icon: Brain },
  { path: '/memory', label: 'Ghi nhớ', sub: 'おぼえておく', icon: Puzzle },
  { path: '/active-vocabulary', label: 'Từ vựng chủ động', sub: '使える語彙', icon: Crown },
  { path: '/speaking', label: 'Luyện nói', sub: 'かいわのれんしゅう', icon: Mic },
  { path: '/exam', label: 'Luyện thi', sub: 'しけんたいさく', icon: FileText },
];

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  const NavContent = ({ mobile = false }: { mobile?: boolean }) => {
    const showLabels = mobile || !isCollapsed;
    return (
      <>
        <div className={`flex items-center h-20 border-b border-slate-100/50 dark:border-slate-800/50 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md transition-all ${!showLabels ? 'justify-center p-0' : 'gap-3 px-5 py-3'}`}>
          <div className={`shrink-0 flex items-center justify-center ${!showLabels ? '' : 'pl-1'}`}>
            <img 
              src="/logo.png" 
              alt="Logo" 
              className={`object-contain transition-all duration-300 ${!showLabels ? 'w-10 h-10' : 'w-14 h-14 scale-110'}`}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
          <AnimatePresence>
            {showLabels && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex flex-col whitespace-nowrap overflow-hidden"
              >
                <span className="font-black text-xl text-slate-800 dark:text-slate-100 tracking-tight leading-tight">
                  にほんご
                </span>
                <span className="text-[10px] font-bold text-[var(--primary)] uppercase tracking-widest leading-tight">
                  NIHONGO • 学習
                </span>
              </motion.div>
            )}
          </AnimatePresence>
          {mobile && (
            <button 
              onClick={() => setIsMobileOpen(false)}
              className="ml-auto p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500"
            >
              <X size={22} />
            </button>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto pt-4 pb-6 space-y-1.5 relative scrollbar-hide h-full w-full">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                replace={location.pathname !== '/'}
                className={({ isActive }) =>
                  `relative flex items-center gap-3 py-2.5 px-3 mx-3 transition-all duration-300 group rounded-2xl ${
                    isActive
                      ? 'text-[var(--primary)] bg-white dark:bg-slate-800 shadow-[0_8px_24px_rgba(148,163,184,0.35)] dark:shadow-none'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`
                }
                title={!showLabels ? item.label : undefined}
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.div
                        layoutId={mobile ? "sidebar-active-indicator-mobile" : "sidebar-active-indicator"}
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-[var(--primary)] rounded-r-full shadow-[0_0_8px_var(--primary)]"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    
                    <div className={`relative z-10 w-10 h-10 flex items-center justify-center rounded-xl transition-transform duration-300 will-change-transform group-hover:scale-110 ${isActive ? 'bg-[var(--primary)]/10 text-[var(--primary)] scale-110' : ''}`}>
                      <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                    </div>

                    <AnimatePresence>
                      {showLabels && (
                        <motion.div 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, width: 0 }}
                          className="relative z-10 flex flex-col whitespace-nowrap overflow-hidden"
                        >
                          <span className={`text-[15px] ${isActive ? 'font-bold' : 'font-semibold'}`}>
                            {item.label}
                          </span>
                          <span className="text-[10px] font-jp text-slate-400 dark:text-slate-500 font-medium tracking-wide">
                            {item.sub}
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Collapse Button - only on desktop */}
        {!mobile && (
          <div className="relative z-30 p-4 mt-auto border-t border-slate-100 dark:border-slate-800/50 bg-white dark:bg-slate-900">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={`flex items-center gap-3 w-full py-2.5 px-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 ${isCollapsed ? 'justify-center' : ''}`}
            >
              {isCollapsed ? <ArrowRightToLine size={20} /> : <ArrowLeftToLine size={20} />}
              {!isCollapsed && <span className="font-semibold text-sm">Thu gọn</span>}
            </button>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button 
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        aria-label="Menu"
      >
        <Menu size={22} />
      </button>

      {/* Mobile Overlay + Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="lg:hidden fixed top-0 left-0 bottom-0 w-[280px] bg-white dark:bg-slate-900 z-50 flex flex-col shadow-2xl"
            >
              <NavContent mobile={true} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isCollapsed ? 80 : 260 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="hidden lg:flex relative flex-col bg-white dark:bg-slate-900 rounded-[24px] z-20 shrink-0 shadow-sm border border-slate-100 dark:border-slate-800 will-change-transform transform-gpu h-full overflow-hidden"
      >
        <NavContent mobile={false} />
      </motion.aside>
    </>
  );
};
