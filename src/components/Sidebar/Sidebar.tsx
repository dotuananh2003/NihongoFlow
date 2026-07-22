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
  { path: '/exam', label: 'Luyện thi', sub: 'しけんたいさく', icon: FileText, locked: true },
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
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ type: "spring", stiffness: 350, damping: 28, mass: 0.8 }}
      className="relative flex flex-col z-20 shrink-0 h-full overflow-hidden rounded-[24px]"
      style={{
        background: 'rgba(255, 255, 255, 0.72)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(255, 255, 255, 0.45)',
        boxShadow: '0 10px 35px rgba(15, 23, 42, 0.08)',
        willChange: 'width',
        transform: 'translateZ(0)', // Force Hardware Acceleration
      }}
    >
      {/* Dark mode overlay override to keep the structure clean */}
      <div className="absolute inset-0 hidden dark:block bg-slate-900/70 pointer-events-none -z-10 rounded-[24px]" />
      <div className="absolute inset-0 hidden dark:block border border-slate-700/50 pointer-events-none -z-10 rounded-[24px]" />

      <div className={`shrink-0 flex items-center h-[88px] ${isCollapsed ? 'justify-center p-0' : 'gap-3 px-5'}`}>
        <div className={`shrink-0 flex items-center justify-center ${isCollapsed ? '' : 'pl-1'}`}>
          <img 
            src="/logo.png" 
            alt="Logo" 
            className={`object-contain transition-all duration-300 ${isCollapsed ? 'w-8 h-8' : 'w-10 h-10'}`}
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
              className="flex flex-col whitespace-nowrap overflow-hidden"
            >
              <span className="font-black text-xl text-slate-800 dark:text-slate-100 tracking-tight leading-tight">
                にほんご
              </span>
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-tight mt-0.5">
                NIHONGO • 学習
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <nav className="flex-1 overflow-y-auto overflow-x-hidden pt-4 pb-6 px-3 flex flex-col gap-[8px] relative scrollbar-hide">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.locked ? '#' : item.path}
              onClick={(e) => { if (item.locked) e.preventDefault(); }}
              replace={location.pathname !== '/'}
              className={() =>
                `relative flex items-center transition-all duration-250 ease-in-out group rounded-[16px] ${item.locked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`
              }
              title={isCollapsed ? item.label : undefined}
            >
              {({ isActive }) => (
                <div 
                  className="w-full flex items-center relative overflow-hidden transition-all duration-250 ease-in-out group-hover:bg-slate-50 dark:group-hover:bg-slate-800/50 rounded-[16px]"
                  style={isActive ? {
                    boxShadow: `0 4px 20px ${activeGlow}`
                  } : {}}
                >
                  {/* Dynamic background inject based on dark mode context using Tailwind classes to help, but we need exact colors. */}
                  {isActive && (
                    <>
                      <div className="absolute inset-0 dark:hidden" style={{ backgroundColor: activeBgLight }} />
                      <div className="absolute inset-0 hidden dark:block" style={{ backgroundColor: activeBgDark }} />
                      <motion.div
                        layoutId="sidebar-active-indicator"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-[4px] h-[60%] rounded-r-full"
                        style={{ backgroundColor: activeColor, boxShadow: `0 0 10px ${activeColor}40` }}
                        initial={false}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      />
                    </>
                  )}
                  
                  <div className={`relative flex items-center w-full px-[16px] py-[16px] gap-[14px]`}>
                    <div 
                      className={`relative z-10 shrink-0 flex items-center justify-center transition-transform duration-250 ease-in-out ${item.locked ? '' : 'group-hover:scale-[1.08]'}`}
                      style={{ color: isActive ? activeColor : undefined }}
                    >
                      <Icon size={22} strokeWidth={1.75} className={isActive ? '' : 'text-slate-500 dark:text-slate-400'} />
                    </div>

                    <AnimatePresence>
                      {!isCollapsed && (
                        <motion.div 
                          initial={{ opacity: 0, width: 0, filter: 'blur(2px)' }}
                          animate={{ opacity: 1, width: 'auto', filter: 'blur(0px)' }}
                          exit={{ opacity: 0, width: 0, filter: 'blur(2px)' }}
                          transition={{ type: "spring", stiffness: 350, damping: 28 }}
                          className="relative z-10 flex flex-col whitespace-nowrap overflow-hidden"
                          style={{ willChange: 'width, opacity' }}
                        >
                          <span 
                            className={`text-[16px] leading-[1.2] tracking-tight ${isActive ? 'font-bold' : 'font-semibold text-slate-800 dark:text-slate-200'}`}
                            style={isActive ? { color: activeColor } : { color: '#1E293B' }}
                          >
                            <span className="dark:hidden">{item.label}</span>
                            <span className="hidden dark:inline" style={isActive ? { color: activeColor } : { color: '#F8FAFC' }}>{item.label}</span>
                          </span>
                          <div className="flex items-center gap-1.5 mt-[2px]">
                            <span className="text-[11px] font-jp font-normal tracking-wide text-[#94A3B8] dark:text-slate-500">
                              {item.sub}
                            </span>
                            {item.locked && (
                              <div className="flex items-center gap-1 text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800/50 px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wider uppercase ml-1">
                                <Lock size={10} strokeWidth={2.5} />
                                <span>LOCKED</span>
                              </div>
                            )}
                          </div>
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
      <div className="relative z-30 p-4 mt-auto border-t border-slate-200/50 dark:border-slate-800/50">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`flex items-center gap-[14px] w-full py-[12px] px-[16px] rounded-[16px] transition-all duration-250 ease-in-out hover:bg-slate-50 dark:hover:bg-slate-800/50 text-[#94A3B8] hover:text-slate-700 dark:hover:text-slate-300 ${isCollapsed ? 'justify-center px-0' : ''}`}
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
                className="font-semibold text-[14px] whitespace-nowrap overflow-hidden text-slate-600 dark:text-slate-400"
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
