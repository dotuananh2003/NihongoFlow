import { useState, useEffect } from 'react';
import { Moon, Sun, Search, Bell, Target, ChevronDown } from 'lucide-react';

export const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <header className="h-20 flex items-center justify-between px-8 bg-transparent z-10 w-full shrink-0">
      
      {/* Left: Search Bar */}
      <div className="flex-1 max-w-md relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[var(--primary)] transition-colors">
          <Search size={18} strokeWidth={2.5} />
        </div>
        <input
          type="text"
          placeholder="検索する..."
          className="block w-full pl-12 pr-4 py-3 bg-white/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800 focus:bg-white dark:focus:bg-slate-800 rounded-2xl text-sm placeholder-slate-400 focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10 transition-all duration-300 outline-none shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] font-jp"
        />
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4 md:gap-6 ml-auto">
        
        {/* Goal Button */}
        <button className="hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-full bg-rose-50 dark:bg-rose-500/10 text-[var(--primary)] dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-500/20 transition-colors font-bold text-sm font-jp border border-rose-100 dark:border-rose-500/20 shadow-sm">
          <Target size={18} strokeWidth={2.5} />
          <span>Mục tiêu hôm nay</span>
        </button>

        {/* Theme Toggle */}
        <div className="flex items-center bg-white/80 dark:bg-slate-900/80 rounded-full p-1 border border-slate-200/60 dark:border-slate-800 shadow-sm backdrop-blur-md">
          <button
            onClick={() => setIsDarkMode(false)}
            className={`p-2 rounded-full transition-all duration-300 ${!isDarkMode ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <Sun size={16} strokeWidth={2.5} />
          </button>
          <button
            onClick={() => setIsDarkMode(true)}
            className={`p-2 rounded-full transition-all duration-300 ${isDarkMode ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <Moon size={16} strokeWidth={2.5} />
          </button>
        </div>

        {/* Notification */}
        <button className="relative p-3 rounded-full bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 hover:text-[var(--primary)] hover:bg-white transition-all shadow-sm border border-slate-200/60 dark:border-slate-800 backdrop-blur-md">
          <Bell size={20} strokeWidth={2.5} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[var(--primary)] rounded-full border-2 border-white dark:border-slate-900"></span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 pl-2 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="w-12 h-12 rounded-full border-2 border-white dark:border-slate-800 shadow-sm overflow-hidden bg-slate-200 shrink-0">
            <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Haruki&backgroundColor=f8d7da" alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div className="hidden sm:flex flex-col">
            <p className="text-sm font-black font-jp text-slate-800 dark:text-slate-100">こんにちは！</p>
            <p className="text-[11px] font-semibold text-slate-500">Học vui vẻ nhé!</p>
          </div>
          <ChevronDown size={16} className="text-slate-400 hidden sm:block ml-1" />
        </div>

      </div>
    </header>
  );
};
