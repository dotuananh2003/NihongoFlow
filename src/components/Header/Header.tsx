import { useState, useEffect, useRef } from 'react';
import { 
  Moon, Sun, Search, Bell, Target, ChevronDown, User, LogOut,
  UserCircle, ClipboardList, FolderCheck, Bookmark, BookOpen, History,
  Globe, Volume2, RefreshCw, HelpCircle, MessageSquare, Flame, Camera, X
} from 'lucide-react';

export const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Mizuuuo',
    email: 'student@jp-forus.com',
    level: 'N4',
    goal: 'N3',
    bio: 'Người học tiếng Nhật'
  });
  const [avatarImage, setAvatarImage] = useState('https://api.dicebear.com/7.x/notionists/svg?seed=Mizuuuo&backgroundColor=f8d7da');
  const profileRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const MenuItem = ({ icon, title, subtitle, onClick }: { icon: React.ReactNode, title: string, subtitle: string, onClick?: () => void }) => (
    <button 
      onClick={onClick}
      className="w-full flex items-center gap-4 px-3 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left group"
    >
      <div className="text-slate-400 group-hover:text-[var(--primary)] transition-colors shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-[13px] font-bold text-slate-700 dark:text-slate-200 group-hover:text-[var(--primary)] transition-colors leading-tight">{title}</p>
        <p className="text-[10px] font-medium text-slate-400 mt-0.5">{subtitle}</p>
      </div>
    </button>
  );

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
        <div className="relative" ref={profileRef}>
          <div 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 pl-2 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <div className="w-12 h-12 rounded-full border-2 border-white dark:border-slate-800 shadow-sm overflow-hidden bg-slate-200 shrink-0">
              <img src={avatarImage} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div className="hidden sm:flex flex-col">
              <p className="text-sm font-black font-jp text-slate-800 dark:text-slate-100">こんにちは！</p>
              <p className="text-[11px] font-semibold text-slate-500">Học vui vẻ nhé!</p>
            </div>
            <ChevronDown size={16} className={`text-slate-400 hidden sm:block ml-1 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
          </div>

          {/* Mega Dropdown Menu */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-3 w-[600px] bg-white dark:bg-slate-900 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] border border-slate-100 dark:border-slate-800 p-6 z-50 animate-in fade-in slide-in-from-top-2 origin-top-right">
              {/* Header */}
              <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl mb-6">
                <div className="flex items-center gap-4">
                  <div 
                    className="relative group cursor-pointer shrink-0" 
                    onClick={() => fileInputRef.current?.click()}
                    title="Click để đổi Avatar"
                  >
                    <div className="w-16 h-16 rounded-full border-2 border-white dark:border-slate-700 shadow-sm overflow-hidden bg-slate-200">
                      <img src={avatarImage} alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                    {/* Hover overlay for changing avatar */}
                    <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera size={20} className="text-white" />
                    </div>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileChange} 
                      accept="image/*" 
                      className="hidden" 
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-800 dark:text-slate-100">{profileData.name}</h3>
                    <p className="text-sm font-medium text-slate-500 mb-2">{profileData.bio}</p>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-100 dark:bg-rose-500/20 text-rose-500 rounded-full text-xs font-bold">
                      <Flame size={14} className="fill-rose-500" /> 23 ngày liên tiếp
                    </div>
                  </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition-colors shadow-sm">
                  <User size={16} /> Xem hồ sơ
                </button>
              </div>

              {/* Grid 2 Columns */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                {/* Column 1 */}
                <div className="space-y-6">
                  {/* Tài khoản */}
                  <div>
                    <h4 className="text-[13px] font-black text-slate-800 dark:text-slate-100 mb-3 px-2">Tài khoản</h4>
                    <div className="space-y-1">
                      <MenuItem 
                        icon={<UserCircle size={20} />} 
                        title="Hồ sơ cá nhân" 
                        subtitle="プロフィール" 
                        onClick={() => {
                          setIsProfileOpen(false);
                          setIsProfileModalOpen(true);
                        }}
                      />
                      <MenuItem icon={<ClipboardList size={20} />} title="Mục tiêu học tập" subtitle="学習目標" />
                      <MenuItem icon={<FolderCheck size={20} />} title="Tiến độ học tập" subtitle="学習の進捗" />
                    </div>
                  </div>
                  {/* Học tập */}
                  <div>
                    <h4 className="text-[13px] font-black text-slate-800 dark:text-slate-100 mb-3 px-2">Học tập</h4>
                    <div className="space-y-1">
                      <MenuItem icon={<Target size={20} />} title="JLPT mục tiêu" subtitle="JLPT目標" />
                      <MenuItem icon={<Bookmark size={20} />} title="Kana & Kanji đã lưu" subtitle="保存したかな・漢字" />
                      <MenuItem icon={<BookOpen size={20} />} title="Từ vựng ghi nhớ" subtitle="単語帳" />
                      <MenuItem icon={<History size={20} />} title="Lịch sử làm bài" subtitle="解いた問題の履歴" />
                    </div>
                  </div>
                </div>

                {/* Column 2 */}
                <div className="space-y-6">
                  {/* Tùy chỉnh */}
                  <div>
                    <h4 className="text-[13px] font-black text-slate-800 dark:text-slate-100 mb-3 px-2">Tùy chỉnh</h4>
                    <div className="space-y-1">
                      <MenuItem 
                        icon={<Moon size={20} />} 
                        title="Giao diện sáng / tối" 
                        subtitle="ライト/ダークモード" 
                        onClick={() => setIsDarkMode(!isDarkMode)} 
                      />
                      <MenuItem icon={<Globe size={20} />} title="Ngôn ngữ hiển thị" subtitle="表示言語" />
                      <MenuItem icon={<Volume2 size={20} />} title="Âm thanh & phát âm" subtitle="音声と発音" />
                      <MenuItem icon={<Bell size={20} />} title="Thông báo" subtitle="通知設定" />
                    </div>
                  </div>
                  {/* Hệ thống */}
                  <div>
                    <h4 className="text-[13px] font-black text-slate-800 dark:text-slate-100 mb-3 px-2">Hệ thống</h4>
                    <div className="space-y-1">
                      <MenuItem icon={<RefreshCw size={20} />} title="Đồng bộ dữ liệu" subtitle="データの同期" />
                      <MenuItem icon={<HelpCircle size={20} />} title="Trợ giúp" subtitle="ヘルプセンター" />
                      <MenuItem icon={<MessageSquare size={20} />} title="Phản hồi" subtitle="フィードバックを送る" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-8 pt-4">
                <button className="w-full py-3.5 flex items-center justify-center gap-2 border border-rose-200 dark:border-rose-900/50 text-rose-500 rounded-xl font-bold hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors">
                  <LogOut size={18} /> Đăng xuất
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Profile Settings Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setIsProfileModalOpen(false)}></div>
          <div className="relative bg-white dark:bg-slate-900 w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
              <h2 className="text-lg font-black text-slate-800 dark:text-slate-100">Hồ sơ cá nhân</h2>
              <button 
                onClick={() => setIsProfileModalOpen(false)}
                className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Avatar Section */}
              <div className="flex flex-col items-center">
                <div 
                  className="relative group cursor-pointer" 
                  onClick={() => fileInputRef.current?.click()}
                  title="Click để đổi Avatar"
                >
                  <div className="w-24 h-24 rounded-full border-4 border-white dark:border-slate-800 shadow-lg overflow-hidden bg-slate-200">
                    <img src={avatarImage} alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera size={24} className="text-white" />
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-2 font-medium">Click vào ảnh để thay đổi</p>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">Tên hiển thị</label>
                  <input 
                    type="text" 
                    value={profileData.name}
                    onChange={e => setProfileData({...profileData, name: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[var(--primary)] outline-none transition-all dark:text-slate-100"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">Email (Không thể đổi)</label>
                  <input 
                    type="email" 
                    value={profileData.email}
                    disabled
                    className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-500 cursor-not-allowed outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">Trình độ hiện tại</label>
                    <select 
                      value={profileData.level}
                      onChange={e => setProfileData({...profileData, level: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[var(--primary)] outline-none transition-all dark:text-slate-100 appearance-none"
                    >
                      <option value="N5">N5 (Mới học)</option>
                      <option value="N4">N4</option>
                      <option value="N3">N3</option>
                      <option value="N2">N2</option>
                      <option value="N1">N1</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">Mục tiêu JLPT</label>
                    <select 
                      value={profileData.goal}
                      onChange={e => setProfileData({...profileData, goal: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[var(--primary)] outline-none transition-all dark:text-slate-100 appearance-none"
                    >
                      <option value="N5">N5</option>
                      <option value="N4">N4</option>
                      <option value="N3">N3</option>
                      <option value="N2">N2</option>
                      <option value="N1">N1</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">Giới thiệu ngắn</label>
                  <textarea 
                    rows={2}
                    value={profileData.bio}
                    onChange={e => setProfileData({...profileData, bio: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[var(--primary)] outline-none transition-all resize-none dark:text-slate-100"
                    placeholder="Viết một vài dòng về mục tiêu học tiếng Nhật của bạn..."
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button 
                  onClick={() => setIsProfileModalOpen(false)}
                  className="flex-1 py-3 rounded-xl font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Hủy bỏ
                </button>
                <button 
                  onClick={() => setIsProfileModalOpen(false)}
                  className="flex-1 py-3 rounded-xl font-bold text-white bg-rose-500 hover:bg-rose-600 transition-colors shadow-lg shadow-rose-500/30"
                >
                  Lưu thay đổi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
