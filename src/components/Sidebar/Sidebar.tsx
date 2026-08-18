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
  Lock
} from 'lucide-react';
import { ToriiGate } from '../Icons/ToriiGate';

const navItems = [
  { path: '/', label: 'Trang chủ', sub: 'ホーム', icon: Home },
  { path: '/introduction', label: 'Nhập môn', sub: 'はじめての日本語', icon: ToriiGate },
  { path: '/kanji', label: 'Hán tự', sub: 'かんじを学ぶ', icon: Castle },
  { path: '/vocabulary', label: 'Từ vựng', sub: 'ことばを学ぶ', icon: ScrollText },
  { path: '/grammar', label: 'Ngữ pháp', sub: 'ぶんぽうを学ぶ', icon: Brain },
  { path: '/memory', label: 'Ghi nhớ', sub: 'おぼえておく', icon: Puzzle, locked: true },
  { path: '/active-vocabulary', label: 'Từ vựng chủ động', sub: '使える語彙', icon: Crown, locked: true },
  { path: '/speaking', label: 'Luyện nói', sub: 'かいわのれんしゅう', icon: Mic, locked: true },
  { path: '/exam', label: 'Luyện thi', sub: 'しけんたいさく', icon: FileText },
];

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebar_collapsed');
    return saved ? JSON.parse(saved) : false;
  });
  
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem('sidebar_collapsed', JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  const isJPD113 = location.pathname.includes('jpd113');
  // Define active colors based on route
  const activeColor = isJPD113 ? '#EF4444' : '#2563EB';
  const activeBgLight = isJPD113 ? '#FEF2F2' : '#EFF6FF';
  const activeBgDark = isJPD113 ? 'rgba(239, 68, 68, 0.1)' : 'rgba(37, 99, 235, 0.1)';
  const activeGlow = isJPD113 ? 'rgba(239, 68, 68, 0.12)' : 'rgba(37, 99, 235, 0.12)';

  return (
    <motion.aside 
      initial={false}
      animate={{ width: isCollapsed ? 80 : 240 }}
      transition={{ type: "spring", stiffness: 350, damping: 28, mass: 0.8 }}
      className="relative z-20 flex h-full shrink-0 flex-col overflow-hidden rounded-[28px]"
      style={{
        background: 'linear-gradient(180deg, rgba(255,255,255,0.82), rgba(255,255,255,0.64))',
        backdropFilter: 'blur(18px) saturate(1.15)',
        WebkitBackdropFilter: 'blur(18px) saturate(1.15)',
        border: '1px solid rgba(255, 255, 255, 0.62)',
        boxShadow: '0 18px 60px rgba(15, 23, 42, 0.12), inset 0 1px 0 rgba(255,255,255,0.75)',
        willChange: 'width',
        transform: 'translateZ(0)',
      }}
    >
      {/* Dark mode overlay override to keep the structure clean */}
      <div className="pointer-events-none absolute inset-0 -z-10 hidden rounded-[28px] bg-slate-950/82 dark:block" />
      <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-white/80" />
      <div className="pointer-events-none absolute inset-0 -z-10 hidden rounded-[28px] border border-slate-700/50 dark:block" />

      <div className={`flex h-[96px] shrink-0 items-center border-b border-white/45 dark:border-slate-800/70 ${isCollapsed ? 'justify-center p-0' : 'gap-3 px-5'}`}>
        <div className={`shrink-0 flex items-center justify-center ${isCollapsed ? '' : 'pl-1'}`}>
          <img 
            src="/logo.png" 
            alt="Logo" 
            className={`object-contain drop-shadow-sm transition-all duration-300 ${isCollapsed ? 'h-8 w-8' : 'h-11 w-11'}`}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div 
              initial={{ opacity: 0, x: -15, filter: 'blur(4px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -15, filter: 'blur(4px)' }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="flex flex-col overflow-hidden whitespace-nowrap"
            >
              <span className="text-xl font-black leading-tight tracking-tight text-slate-900 dark:text-slate-100">
                にほんご
              </span>
              <span className="mt-0.5 text-[10px] font-black uppercase leading-tight tracking-[0.22em] text-slate-500 dark:text-slate-400">
                NIHONGO • 学習
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <nav className="scrollbar-hide relative flex flex-1 flex-col gap-2 overflow-y-auto overflow-x-hidden px-3 py-5">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.locked ? '#' : item.path}
              onClick={(e) => { if (item.locked) e.preventDefault(); }}
              replace={location.pathname !== '/'}
              className={() =>
                `group relative flex items-center rounded-[18px] transition-all duration-200 ease-out ${item.locked ? 'cursor-not-allowed opacity-55' : 'cursor-pointer'}`
              }
              title={isCollapsed ? item.label : undefined}
            >
              {({ isActive }) => (
                <div 
                  className="relative flex w-full items-center overflow-hidden rounded-[18px] transition-all duration-200 ease-out group-hover:bg-white/55 dark:group-hover:bg-slate-800/55"
                  style={isActive ? {
                    boxShadow: `0 4px 20px ${activeGlow}`
                  } : {}}
                >
                  {/* Dynamic background inject based on dark mode context using Tailwind classes to help, but we need exact colors. */}
                  {isActive && (
                    <>
                      <motion.div 
                        layoutId="sidebar-active-bg-light"
                        className="absolute inset-0 rounded-[18px] dark:hidden"
                        style={{ backgroundColor: activeBgLight }} 
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                      <motion.div 
                        layoutId="sidebar-active-bg-dark"
                        className="absolute inset-0 hidden rounded-[18px] dark:block"
                        style={{ backgroundColor: activeBgDark }} 
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                      <motion.div
                        layoutId="sidebar-active-indicator"
                        className="absolute left-0 top-1/2 h-[56%] w-[4px] -translate-y-1/2 rounded-r-full"
                        style={{ backgroundColor: activeColor, boxShadow: `0 0 10px ${activeColor}40` }}
                        initial={false}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    </>
                  )}
                  
                  <div className={`relative flex w-full items-center gap-3.5 ${isCollapsed ? 'justify-center px-0 py-4' : 'px-4 py-3.5'}`}>
                    <div 
                      className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-200 ease-out ${item.locked ? 'bg-slate-100/50 dark:bg-slate-800/40' : isActive ? 'bg-white/65 dark:bg-white/10' : 'group-hover:scale-[1.05] group-hover:bg-white/50 dark:group-hover:bg-slate-700/50'}`}
                      style={{ color: isActive ? activeColor : undefined }}
                    >
                      <Icon size={21} strokeWidth={1.9} className={isActive ? '' : 'text-slate-500 dark:text-slate-400'} />
                    </div>

                    <AnimatePresence>
                      {!isCollapsed && (
                        <motion.div 
                          initial={{ opacity: 0, width: 0, filter: 'blur(2px)' }}
                          animate={{ opacity: 1, width: 'auto', filter: 'blur(0px)' }}
                          exit={{ opacity: 0, width: 0, filter: 'blur(2px)' }}
                          transition={{ type: "spring", stiffness: 350, damping: 28 }}
                          className="relative z-10 flex flex-col overflow-hidden whitespace-nowrap"
                          style={{ willChange: 'width, opacity' }}
                        >
                          <span 
                            className={`text-[15px] leading-[1.2] tracking-tight ${isActive ? 'font-black' : 'font-bold text-slate-800 dark:text-slate-200'}`}
                            style={isActive ? { color: activeColor } : { color: '#1E293B' }}
                          >
                            <span className="dark:hidden">{item.label}</span>
                            <span className="hidden dark:inline" style={isActive ? { color: activeColor } : { color: '#F8FAFC' }}>{item.label}</span>
                          </span>
                          {item.locked && (
                            <div className="mt-1 flex w-fit items-center gap-1 rounded-full bg-white/65 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-slate-400 dark:bg-slate-800/70 dark:text-slate-500">
                              <Lock size={10} strokeWidth={2.5} />
                              <span>LOCKED</span>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse Button */}
      <div className="relative z-30 mt-auto border-t border-white/45 p-4 dark:border-slate-800/70">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`flex w-full items-center gap-3.5 rounded-[18px] px-4 py-3 text-[#94A3B8] transition-all duration-200 ease-out hover:bg-white/60 hover:text-slate-700 dark:hover:bg-slate-800/60 dark:hover:text-slate-300 ${isCollapsed ? 'justify-center px-0' : ''}`}
          title={isCollapsed ? 'Mở rộng' : undefined}
        >
          {isCollapsed ? <ArrowRightToLine size={22} strokeWidth={1.75} /> : <ArrowLeftToLine size={22} strokeWidth={1.75} />}
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ type: "spring", stiffness: 350, damping: 28 }}
                className="overflow-hidden whitespace-nowrap text-[14px] font-bold text-slate-600 dark:text-slate-400"
              >
                Thu gọn
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  );
};
