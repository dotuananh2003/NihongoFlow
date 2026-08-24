import { useState, useEffect } from 'react';
import type { ComponentType } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeftToLine,
  ArrowRightToLine,
  Brain,
  Castle,
  Crown,
  FileText,
  Home,
  Lock,
  Mic,
  Puzzle,
  ScrollText,
} from 'lucide-react';
import { ToriiGate } from '../Icons/ToriiGate';

type SidebarNavItem = {
  path: string;
  label: string;
  sub: string;
  icon: ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  locked?: boolean;
};

type SidebarNavSection = {
  title: string;
  items: SidebarNavItem[];
};

const navSections: SidebarNavSection[] = [
  {
    title: 'Khởi đầu',
    items: [
      { path: '/', label: 'Trang chủ', sub: 'Home', icon: Home },
      { path: '/introduction', label: 'Nhập môn', sub: 'Basics', icon: ToriiGate },
    ],
  },
  {
    title: 'Bài học',
    items: [
      { path: '/kanji', label: 'Hán tự', sub: 'Kanji', icon: Castle },
      { path: '/vocabulary', label: 'Từ vựng', sub: 'Vocab', icon: ScrollText },
      { path: '/grammar', label: 'Ngữ pháp', sub: 'Grammar', icon: Brain },
      { path: '/exam', label: 'Luyện thi', sub: 'Exam', icon: FileText },
    ],
  },
  {
    title: 'Luyện thêm',
    items: [
      { path: '/memory', label: 'Ghi nhớ', sub: 'Memory', icon: Puzzle, locked: true },
      { path: '/active-vocabulary', label: 'Từ chủ động', sub: 'Active', icon: Crown, locked: true },
      { path: '/speaking', label: 'Luyện nói', sub: 'Speaking', icon: Mic },
    ],
  },
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
  const activeColor = isJPD113 ? '#F43F5E' : '#2563EB';
  const activeSoft = isJPD113 ? 'rgba(255, 228, 232, 0.96)' : 'rgba(219, 234, 254, 0.96)';
  const activeGlow = isJPD113 ? 'rgba(244, 63, 94, 0.22)' : 'rgba(37, 99, 235, 0.22)';

  const isActivePath = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 82 : 264 }}
      transition={{ type: 'spring', stiffness: 360, damping: 32, mass: 0.8 }}
      className="relative z-20 flex h-full shrink-0 flex-col overflow-hidden rounded-[32px]"
      style={{
        background: 'linear-gradient(180deg, rgba(255,255,255,0.92), rgba(248,251,255,0.78))',
        backdropFilter: 'blur(24px) saturate(1.25)',
        WebkitBackdropFilter: 'blur(24px) saturate(1.25)',
        border: '1px solid rgba(255, 255, 255, 0.72)',
        boxShadow: '0 24px 74px rgba(15, 23, 42, 0.12), inset 0 1px 0 rgba(255,255,255,0.9)',
        willChange: 'width',
        transform: 'translateZ(0)',
      }}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 hidden rounded-[32px] bg-slate-950/86 dark:block" />
      <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-white/95" />
      <div className="pointer-events-none absolute -right-12 top-24 h-40 w-40 rounded-full bg-sky-300/18 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-20 h-40 w-40 rounded-full bg-pink-300/14 blur-3xl" />

      <div className={isCollapsed ? 'px-2.5 pb-4 pt-4' : 'px-4 pb-4 pt-4'}>
        <div
          className={
            isCollapsed
              ? 'flex h-12 items-center justify-center rounded-full'
              : 'flex items-center gap-3 rounded-[26px] border border-white/72 bg-white/64 px-3.5 py-3 shadow-sm dark:border-slate-700/70 dark:bg-slate-900/58'
          }
        >
          <div className={`grid shrink-0 place-items-center bg-white ring-1 ring-white/90 dark:bg-slate-950 dark:ring-slate-700 ${isCollapsed ? 'h-12 w-12 rounded-full shadow-[0_10px_24px_rgba(15,23,42,0.10)]' : 'h-11 w-11 rounded-[18px] shadow-[0_12px_28px_rgba(15,23,42,0.1)]'}`}>
            <img
              src="/logo.png"
              alt="Logo"
              className="h-8 w-8 object-contain drop-shadow-sm"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>

          <AnimatePresence initial={false}>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.15 }}
                className="min-w-0"
              >
                <p className="truncate font-jp text-xl font-black leading-none text-slate-950 dark:text-white">
                  にほんご
                </p>
                <p className="mt-1 truncate text-[10px] font-black uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                  Japanese Learning
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <nav
        className={`scrollbar-hide relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${isCollapsed ? 'px-2.5 pb-2' : 'px-4 pb-3'}`}
        style={{ msOverflowStyle: 'none' }}
      >
        {navSections.map((section) => (
          <section key={section.title} className={isCollapsed ? 'mb-3' : 'mb-4'}>
            <AnimatePresence initial={false}>
              {!isCollapsed && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.12 }}
                  className="mb-2 px-2 text-[10px] font-black uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500"
                >
                  {section.title}
                </motion.p>
              )}
            </AnimatePresence>

            <div className={isCollapsed ? 'space-y-2' : 'space-y-2'}>
              {section.items.map((item) => {
                const Icon = item.icon;
                const active = isActivePath(item.path);

                if (isCollapsed) {
                  return (
                    <NavLink
                      key={item.path}
                      to={item.locked ? '#' : item.path}
                      onClick={(e) => {
                        if (item.locked) e.preventDefault();
                      }}
                      replace={location.pathname !== '/'}
                      title={item.label}
                      className={`mx-auto grid h-12 w-12 place-items-center rounded-full transition-colors duration-200 ${
                        item.locked ? 'cursor-not-allowed opacity-42' : 'cursor-pointer hover:bg-white/48 dark:hover:bg-slate-800/48'
                      }`}
                    >
                      <span
                        className={`grid h-11 w-11 place-items-center rounded-full transition-colors ${
                          active
                            ? 'bg-white shadow-[0_12px_24px_rgba(15,23,42,0.12)] ring-2 ring-white/80 dark:bg-white/12 dark:ring-white/10'
                            : 'bg-white/42 text-slate-500 dark:bg-slate-800/42 dark:text-slate-400'
                        }`}
                        style={
                          active
                            ? {
                                color: activeColor,
                                boxShadow: `0 12px 24px ${activeGlow}`,
                              }
                            : undefined
                        }
                      >
                        <Icon size={21} strokeWidth={2.05} />
                      </span>
                    </NavLink>
                  );
                }

                return (
                  <NavLink
                    key={item.path}
                    to={item.locked ? '#' : item.path}
                    onClick={(e) => {
                      if (item.locked) e.preventDefault();
                    }}
                    replace={location.pathname !== '/'}
                    title={isCollapsed ? item.label : undefined}
                    className={`group relative block ${item.locked ? 'cursor-not-allowed opacity-55' : 'cursor-pointer'}`}
                  >
                    <div
                      className={`relative flex w-full items-center overflow-hidden border transition-colors duration-200 ${
                        isCollapsed ? 'h-12 rounded-[20px]' : 'min-h-[64px] rounded-[24px]'
                      } ${
                        active
                          ? isCollapsed
                            ? 'border-transparent'
                            : 'border-white/90 dark:border-white/10'
                          : 'border-transparent hover:border-white/70 hover:bg-white/46 dark:hover:border-slate-700/70 dark:hover:bg-slate-800/46'
                      }`}
                      style={active && !isCollapsed ? { boxShadow: `0 12px 30px ${activeGlow}` } : undefined}
                    >
                      {active && !isCollapsed && (
                        <>
                          <motion.div
                            layoutId="sidebar-dock-active-bg"
                            className={`absolute inset-0 dark:hidden ${isCollapsed ? 'rounded-[23px]' : 'rounded-[24px]'}`}
                            style={{ backgroundColor: activeSoft }}
                            transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                          />
                          <motion.div
                            layoutId="sidebar-dock-active-bg-dark"
                            className={`absolute inset-0 hidden bg-white/10 dark:block ${isCollapsed ? 'rounded-[23px]' : 'rounded-[24px]'}`}
                            transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                          />
                          <motion.div
                            layoutId="sidebar-dock-active-line"
                            className={`absolute rounded-full ${isCollapsed ? 'left-1 top-1/2 h-8 w-1 -translate-y-1/2' : 'inset-y-3 left-2 w-1.5'}`}
                            style={{ backgroundColor: activeColor, boxShadow: `0 0 16px ${activeColor}7a` }}
                            transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                          />
                        </>
                      )}

                      <div className={`relative z-10 flex w-full items-center ${isCollapsed ? 'justify-center p-0' : 'gap-3.5 py-2.5 pl-5 pr-3'}`}>
                        <div
                          className={`grid shrink-0 place-items-center transition-colors ${isCollapsed ? 'h-11 w-11 rounded-[18px]' : 'h-11 w-11 rounded-[18px]'} ${
                            active
                              ? 'bg-white shadow-sm dark:bg-white/12'
                              : item.locked
                                ? 'bg-white/46 text-slate-400 dark:bg-slate-800/50'
                                : 'bg-white/52 text-slate-500 group-hover:bg-white/86 group-hover:text-slate-800 dark:bg-slate-800/46 dark:text-slate-400 dark:group-hover:text-slate-200'
                          }`}
                          style={
                            active
                              ? {
                                  color: activeColor,
                                  backgroundColor: isCollapsed ? activeSoft : undefined,
                                  boxShadow: isCollapsed ? `0 12px 24px ${activeGlow}` : undefined,
                                }
                              : undefined
                          }
                        >
                          <Icon size={21} strokeWidth={2.05} />
                        </div>

                        <AnimatePresence initial={false}>
                          {!isCollapsed && (
                            <motion.div
                              initial={{ opacity: 0, x: -6 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -6 }}
                              transition={{ duration: 0.13 }}
                              className="min-w-0 flex-1"
                            >
                              <div className="flex min-w-0 items-center justify-between gap-2">
                                <span
                                  className={`truncate text-[15px] leading-tight ${
                                    active ? 'font-black' : 'font-extrabold text-slate-800 dark:text-slate-200'
                                  }`}
                                  style={active ? { color: activeColor } : undefined}
                                >
                                  {item.label}
                                </span>
                                {item.locked && (
                                  <span className="inline-grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white/72 text-slate-400 shadow-sm dark:bg-slate-800 dark:text-slate-500">
                                    <Lock size={12} strokeWidth={2.5} />
                                  </span>
                                )}
                              </div>
                              <p className="mt-1 truncate text-[11px] font-black uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500">
                                {item.sub}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </NavLink>
                );
              })}
            </div>
          </section>
        ))}
      </nav>

      <div className={`relative z-30 mt-auto border-t border-white/50 dark:border-slate-800/70 ${isCollapsed ? 'p-2.5' : 'p-4'}`}>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`flex min-h-[54px] w-full items-center gap-3 border border-white/64 bg-white/52 text-slate-500 shadow-sm transition-colors hover:bg-white/86 hover:text-slate-800 dark:border-slate-700/70 dark:bg-slate-900/52 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200 ${
            isCollapsed ? 'justify-center rounded-[23px] px-0' : 'rounded-[24px] px-3'
          }`}
          title={isCollapsed ? 'Mở rộng' : undefined}
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[17px] bg-white/78 dark:bg-slate-800">
            {isCollapsed ? <ArrowRightToLine size={20} strokeWidth={2} /> : <ArrowLeftToLine size={20} strokeWidth={2} />}
          </span>
          <AnimatePresence initial={false}>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.13 }}
                className="overflow-hidden whitespace-nowrap text-sm font-black"
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
