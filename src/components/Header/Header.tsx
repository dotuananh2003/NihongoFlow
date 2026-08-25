import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Bell,
  BookOpen,
  Bookmark,
  Camera,
  ChevronDown,
  ClipboardList,
  Crown,
  Flame,
  FolderCheck,
  Globe,
  HelpCircle,
  History,
  LogOut,
  MessageSquare,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  User,
  UserCircle,
  Volume2,
  X,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { paymentApi, type PlanId } from '../../lib/paymentApi';
import { PremiumModal } from '../Upgrade/PremiumModal';

type ProfileData = {
  name: string;
  email: string;
  level: string;
  goal: string;
  bio: string;
};

type MenuItemProps = {
  icon: ReactNode;
  title: string;
  subtitle: string;
  accent: string;
  onClick?: () => void;
};



const menuGroups = [
  {
    title: 'Tài khoản',
    items: [
      { icon: <UserCircle size={18} />, title: 'Hồ sơ cá nhân', subtitle: 'プロフィール', accent: 'blue' },
      { icon: <ClipboardList size={18} />, title: 'Mục tiêu học tập', subtitle: '学習目標', accent: 'emerald' },
      { icon: <FolderCheck size={18} />, title: 'Tiến độ học tập', subtitle: '学習の進捗', accent: 'cyan' },
    ],
  },
  {
    title: 'Học tập',
    items: [
      { icon: <Target size={18} />, title: 'JLPT mục tiêu', subtitle: 'JLPT目標', accent: 'rose' },
      { icon: <Bookmark size={18} />, title: 'Kana & Kanji đã lưu', subtitle: '保存したかな・漢字', accent: 'amber' },
      { icon: <BookOpen size={18} />, title: 'Từ vựng ghi nhớ', subtitle: '単語帳', accent: 'indigo' },
      { icon: <History size={18} />, title: 'Lịch sử làm bài', subtitle: '解いた問題の履歴', accent: 'violet' },
    ],
  },
  {
    title: 'Tùy chỉnh',
    items: [
      { icon: <Globe size={18} />, title: 'Ngôn ngữ hiển thị', subtitle: '表示言語', accent: 'sky' },
      { icon: <Volume2 size={18} />, title: 'Âm thanh & phát âm', subtitle: '音声と発音', accent: 'fuchsia' },
      { icon: <Bell size={18} />, title: 'Thông báo', subtitle: '通知設定', accent: 'orange' },
    ],
  },
  {
    title: 'Hệ thống',
    items: [
      { icon: <RefreshCw size={18} />, title: 'Đồng bộ dữ liệu', subtitle: 'データの同期', accent: 'teal' },
      { icon: <HelpCircle size={18} />, title: 'Trợ giúp', subtitle: 'ヘルプセンター', accent: 'slate' },
      { icon: <MessageSquare size={18} />, title: 'Phản hồi', subtitle: 'フィードバックを送る', accent: 'pink' },
    ],
  },
] as const;

const accentClasses: Record<string, string> = {
  amber: 'bg-amber-50 text-amber-500 group-hover:bg-amber-100',
  blue: 'bg-blue-50 text-blue-500 group-hover:bg-blue-100',
  cyan: 'bg-cyan-50 text-cyan-500 group-hover:bg-cyan-100',
  emerald: 'bg-emerald-50 text-emerald-500 group-hover:bg-emerald-100',
  fuchsia: 'bg-fuchsia-50 text-fuchsia-500 group-hover:bg-fuchsia-100',
  indigo: 'bg-indigo-50 text-indigo-500 group-hover:bg-indigo-100',
  orange: 'bg-orange-50 text-orange-500 group-hover:bg-orange-100',
  pink: 'bg-pink-50 text-pink-500 group-hover:bg-pink-100',
  rose: 'bg-rose-50 text-rose-500 group-hover:bg-rose-100',
  sky: 'bg-sky-50 text-sky-500 group-hover:bg-sky-100',
  slate: 'bg-slate-50 text-slate-500 group-hover:bg-slate-100',
  teal: 'bg-teal-50 text-teal-500 group-hover:bg-teal-100',
  violet: 'bg-violet-50 text-violet-500 group-hover:bg-violet-100',
};

const MenuItem = ({ icon, title, subtitle, accent, onClick }: MenuItemProps) => (
  <button
    onClick={onClick}
    className="group flex w-full items-center gap-3 rounded-2xl border border-transparent px-3 py-2 text-left transition-all duration-200 hover:border-slate-100 hover:bg-white hover:shadow-sm"
  >
    <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-2xl transition-colors ${accentClasses[accent] ?? accentClasses.blue}`}>
      {icon}
    </span>
    <span className="min-w-0">
      <span className="block truncate text-[13px] font-black leading-tight text-slate-800">{title}</span>
      <span className="mt-0.5 block truncate text-[10px] font-bold leading-tight text-slate-400">{subtitle}</span>
    </span>
  </button>
);

export const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);
  const [creatingPlanId, setCreatingPlanId] = useState<PlanId | null>(null);
  const [checkoutError, setCheckoutError] = useState('');
  const [profileData, setProfileData] = useState<ProfileData>({
    name: 'Học viên',
    email: 'student@jp-forus.com',
    level: 'N4',
    goal: 'N3',
    bio: 'Người học tiếng Nhật',
  });
  const [avatarImage, setAvatarImage] = useState('https://api.dicebear.com/7.x/notionists/svg?seed=jp-forus&backgroundColor=f8d7da');
  const profileRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!user) {
      return;
    }

    setProfileData((current) => ({
      ...current,
      name: user.fullName ?? user.email,
      email: user.email,
      bio: user.provider === 'google' ? 'Đăng nhập bằng Google' : 'Người học tiếng Nhật',
    }));

    if (user.avatarUrl) {
      setAvatarImage(user.avatarUrl);
    }
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setAvatarImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleLogout = async () => {
    await logout();
    setIsProfileOpen(false);
    navigate('/login', { replace: true });
  };

  const handleStartCheckout = async (planId: PlanId) => {
    setCreatingPlanId(planId);
    setCheckoutError('');

    try {
      const response = await paymentApi.createOrder(planId);
      setIsUpgradeOpen(false);
      navigate(`/checkout/${response.order.orderCode}`);
    } catch (error) {
      setCheckoutError(error instanceof Error ? error.message : 'Không thể tạo đơn thanh toán.');
    } finally {
      setCreatingPlanId(null);
    }
  };

  useEffect(() => {
    const openUpgradeModal = () => {
      setIsProfileOpen(false);
      setIsUpgradeOpen(true);
    };

    window.addEventListener('jp-forus:open-upgrade', openUpgradeModal);
    return () => window.removeEventListener('jp-forus:open-upgrade', openUpgradeModal);
  }, []);

  return (
    <header className="h-20 flex items-center justify-between px-8 bg-transparent z-10 w-full shrink-0">
      <div className="flex-1 max-w-md relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[var(--primary)] transition-colors">
          <Search size={18} strokeWidth={2.5} />
        </div>
        <input
          type="text"
          placeholder="Tìm kiếm..."
          className="block w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 focus:bg-white dark:focus:bg-slate-800 rounded-full text-sm placeholder-slate-400 focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10 transition-all duration-300 outline-none shadow-sm font-jp"
        />
      </div>

      <div className="flex items-center gap-3 md:gap-5 ml-auto rounded-[28px] border border-white/65 dark:border-slate-700/60 bg-white/35 dark:bg-slate-950/35 px-3 py-2 shadow-[0_12px_34px_rgba(15,23,42,0.08)] backdrop-blur-xl">
        <motion.button
          whileHover={{ scale: 1.04, y: -1 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          onClick={() => setIsUpgradeOpen(true)}
          className="hidden sm:flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 px-4 py-3 text-sm font-black text-white shadow-lg shadow-amber-400/25 border border-white/60 hover:shadow-xl hover:shadow-amber-400/30"
        >
          <Crown size={18} strokeWidth={2.5} />
          Nâng Cấp
        </motion.button>

        <button className="relative p-3 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-600 dark:text-slate-300 hover:text-[var(--primary)] transition-all shadow-sm border border-white/80 dark:border-slate-800">
          <Bell size={20} strokeWidth={2.5} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900" />
        </button>

        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen((value) => !value)}
            className="flex items-center gap-3 rounded-full py-1 pl-1 pr-2 hover:bg-white/45 transition-all"
          >
            <span className="w-12 h-12 rounded-full border-2 border-white dark:border-slate-800 shadow-sm overflow-hidden bg-slate-200 shrink-0">
              <img src={avatarImage} alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" onError={(e) => { (e.target as HTMLImageElement).src = 'https://api.dicebear.com/7.x/notionists/svg?seed=jp-forus&backgroundColor=f8d7da'; }} />
            </span>
            <span className="hidden sm:flex flex-col text-left">
              <span className="text-sm font-black font-jp text-slate-800 dark:text-slate-100">こんにちは!</span>
              <span className="text-[11px] font-semibold text-slate-500">Học vui vẻ nhé!</span>
            </span>
            <ChevronDown size={16} className={`text-slate-400 hidden sm:block transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-4 w-[680px] max-h-[calc(100vh-112px)] overflow-y-auto overscroll-contain rounded-[30px] border border-white/75 bg-white/92 p-4 shadow-[0_28px_80px_rgba(15,23,42,0.18)] backdrop-blur-2xl z-50 animate-in fade-in slide-in-from-top-2 origin-top-right [scrollbar-width:thin] [scrollbar-color:rgba(148,163,184,0.55)_transparent]">
              <div className="relative overflow-hidden rounded-[26px] border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-rose-50 p-4">
                <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-blue-300/20 blur-2xl" />
                <div className="absolute -bottom-10 left-32 h-24 w-24 rounded-full bg-rose-300/25 blur-2xl" />
                <div className="relative flex items-center justify-between gap-5">
                  <div className="flex min-w-0 items-center gap-4">
                    <button
                      className="relative group shrink-0"
                      onClick={() => fileInputRef.current?.click()}
                      title="Đổi avatar"
                    >
                      <span className="block h-[74px] w-[74px] overflow-hidden rounded-[26px] border-4 border-white bg-slate-100 shadow-lg">
                        <img src={avatarImage} alt="Avatar" className="h-full w-full object-cover" referrerPolicy="no-referrer" onError={(e) => { (e.target as HTMLImageElement).src = 'https://api.dicebear.com/7.x/notionists/svg?seed=jp-forus&backgroundColor=f8d7da'; }} />
                      </span>
                      <span className="absolute inset-0 grid place-items-center rounded-[26px] bg-slate-950/45 text-white opacity-0 transition-opacity group-hover:opacity-100">
                        <Camera size={20} />
                      </span>
                      <input ref={fileInputRef} onChange={handleFileChange} type="file" accept="image/*" className="hidden" />
                    </button>

                    <div className="min-w-0">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <h3 className="truncate text-xl font-black text-slate-900">{profileData.name}</h3>
                        {user?.hasPremium ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-white shadow-sm shadow-amber-500/25 ring-1 ring-white/40">
                            <Crown size={12} strokeWidth={2.5} className="text-amber-100 shrink-0" />
                            PREMIUM
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-slate-600 dark:text-slate-300">
                            <ShieldCheck size={12} strokeWidth={2.2} className="text-slate-400 shrink-0" />
                            FREE
                          </span>
                        )}
                      </div>
                      <p className="truncate text-sm font-bold text-slate-500">{profileData.email}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 px-3 py-1.5 text-xs font-black text-rose-500">
                          <Flame size={14} className="fill-rose-500" />
                          23 ngày liên tiếp
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-black text-emerald-600">
                          <Sparkles size={14} />
                          Mục tiêu {profileData.goal}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-col gap-2">
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        setIsProfileModalOpen(true);
                      }}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white bg-white/90 px-4 py-3 text-sm font-black text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <User size={17} />
                      Xem hồ sơ
                    </button>
                    <button
                      onClick={handleLogout}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-black text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-rose-500 hover:shadow-rose-500/25"
                    >
                      <LogOut size={17} />
                      Đăng xuất
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3 pb-1">
                {menuGroups.map((group) => (
                  <section key={group.title} className="rounded-[24px] border border-slate-100 bg-slate-50/70 p-2.5">
                    <h4 className="mb-2 px-2 text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">{group.title}</h4>
                    <div className="space-y-1">
                      {group.items.map((item) => (
                        <MenuItem
                          key={item.title}
                          {...item}
                          onClick={item.title === 'Hồ sơ cá nhân' ? () => {
                            setIsProfileOpen(false);
                            setIsProfileModalOpen(true);
                          } : undefined}
                        />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {isProfileModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setIsProfileModalOpen(false)} />
          <div className="relative bg-white dark:bg-slate-900 w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
              <h2 className="text-lg font-black text-slate-800 dark:text-slate-100">Hồ sơ cá nhân</h2>
              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex flex-col items-center">
                <button
                  className="relative group"
                  onClick={() => fileInputRef.current?.click()}
                  title="Đổi avatar"
                >
                  <span className="block w-24 h-24 rounded-full border-4 border-white dark:border-slate-800 shadow-lg overflow-hidden bg-slate-200">
                    <img src={avatarImage} alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" onError={(e) => { (e.target as HTMLImageElement).src = 'https://api.dicebear.com/7.x/notionists/svg?seed=jp-forus&backgroundColor=f8d7da'; }} />
                  </span>
                  <span className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera size={24} className="text-white" />
                  </span>
                </button>
                <p className="text-xs text-slate-500 mt-2 font-medium">Click vào ảnh để thay đổi</p>
              </div>

              <div className="space-y-4">
                <label className="block">
                  <span className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">Tên hiển thị</span>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(event) => setProfileData({ ...profileData, name: event.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[var(--primary)] outline-none transition-all dark:text-slate-100"
                  />
                </label>

                <label className="block">
                  <span className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">Email</span>
                  <input
                    type="email"
                    value={profileData.email}
                    disabled
                    className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-500 cursor-not-allowed outline-none"
                  />
                </label>

                <div className="grid grid-cols-2 gap-4">
                  <label className="block">
                    <span className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">Trình độ hiện tại</span>
                    <select
                      value={profileData.level}
                      onChange={(event) => setProfileData({ ...profileData, level: event.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[var(--primary)] outline-none transition-all dark:text-slate-100 appearance-none"
                    >
                      <option value="N5">N5</option>
                      <option value="N4">N4</option>
                      <option value="N3">N3</option>
                      <option value="N2">N2</option>
                      <option value="N1">N1</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">Mục tiêu JLPT</span>
                    <select
                      value={profileData.goal}
                      onChange={(event) => setProfileData({ ...profileData, goal: event.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[var(--primary)] outline-none transition-all dark:text-slate-100 appearance-none"
                    >
                      <option value="N5">N5</option>
                      <option value="N4">N4</option>
                      <option value="N3">N3</option>
                      <option value="N2">N2</option>
                      <option value="N1">N1</option>
                    </select>
                  </label>
                </div>

                <label className="block">
                  <span className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">Giới thiệu ngắn</span>
                  <textarea
                    rows={2}
                    value={profileData.bio}
                    onChange={(event) => setProfileData({ ...profileData, bio: event.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[var(--primary)] outline-none transition-all resize-none dark:text-slate-100"
                    placeholder="Viết một vài dòng về mục tiêu học tiếng Nhật của bạn..."
                  />
                </label>
              </div>

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

      <PremiumModal
        isOpen={isUpgradeOpen}
        onClose={() => setIsUpgradeOpen(false)}
        onStartCheckout={handleStartCheckout}
        creatingPlanId={creatingPlanId}
        checkoutError={checkoutError}
      />
    </header>
  );
};
