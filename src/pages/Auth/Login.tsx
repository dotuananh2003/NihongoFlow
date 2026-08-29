import { useCallback, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Lock, Mail, Eye, EyeOff, 
  Sparkles, AlertCircle, Flower2
} from 'lucide-react';
import { JapaneseMascot } from '../../components/mascot/JapaneseMascot';
import type { MascotState } from '../../components/mascot/JapaneseMascot';
import { GoogleSignInButton } from './GoogleSignInButton';
import { useAuth } from '../../context/AuthContext';
import '../../components/mascot/mascot.css';

// Icon Núi Phú Sĩ & Mặt Trời Mọc chuẩn thương hiệu JP Forus
const FujiSunIcon = ({ size = 22, strokeWidth = 2.2, className = "" }: { size?: number | string, strokeWidth?: number, className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M 8.5 8.2 A 4 4 0 0 1 15.5 8.2" />
    <path d="M 12 1.5 V 3.5" />
    <path d="M 6.5 4 L 7.8 5.3" />
    <path d="M 17.5 4 L 16.2 5.3" />
    <path d="M 2.5 20.5 C 6.5 20, 8.8 15.5, 9.8 9.5 H 14.2 C 15.2 15.5, 17.5 20, 21.5 20.5" />
    <path d="M 7 14.5 Q 9.5 12.8, 12 14.5 Q 14.5 12.8, 17 14.5" />
    <path d="M 1.5 20.5 H 22.5" />
  </svg>
);

type RouteState = {
  from?: {
    pathname?: string;
  };
};

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loginWithGoogle } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Trạng thái biểu cảm của Linh vật Kitsune
  const [mascotState, setMascotState] = useState<MascotState>('idle');

  const redirectTo = (location.state as RouteState | null)?.from?.pathname ?? '/';

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await login({ email, password });
      setMascotState('success');
      // Chờ animation ăn mừng của linh vật trước khi chuyển trang
      setTimeout(() => {
        navigate(redirectTo, { replace: true });
      }, 700);
    } catch (nextError) {
      const errorMsg = nextError instanceof Error ? nextError.message : 'Không thể đăng nhập.';
      setError(errorMsg);
      setMascotState('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogle = useCallback(async (credential: string) => {
    setError('');
    setIsSubmitting(true);
    try {
      await loginWithGoogle(credential);
      setMascotState('success');
      setTimeout(() => {
        navigate(redirectTo, { replace: true });
      }, 700);
    } catch (nextError) {
      const errorMsg = nextError instanceof Error ? nextError.message : 'Không thể đăng nhập Google.';
      setError(errorMsg);
      setMascotState('error');
    } finally {
      setIsSubmitting(false);
    }
  }, [loginWithGoogle, navigate, redirectTo]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FFF8F3] text-slate-900 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      
      {/* ========================================================================= */}
      {/* 1. BACKGROUND NHẬT BẢN THƠ MỘNG: GPU CONTAINED VỚI TRANSLATE3D */}
      {/* ========================================================================= */}
      <div className="fixed inset-0 z-0 pointer-events-none auth-fixed-bg">
        {/* Lớp nền ảnh */}
        <img
          src="/images/backgrounds/auth-peach-bg.png"
          alt=""
          className="h-full w-full object-cover opacity-75 saturate-[1.05]"
          onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
        />

        {/* Ambient Gradient Mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(251,146,60,0.18),transparent_40%),radial-gradient(ellipse_at_80%_80%,rgba(244,114,182,0.15),transparent_45%),radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.7),transparent_60%)]" />

        {/* Cổng Torii mờ xa xăm phong cách Nhật Bản */}
        <div className="absolute -bottom-10 -left-12 w-80 h-80 opacity-[0.04] text-orange-950">
          <svg viewBox="0 0 100 100" fill="currentColor">
            <rect x="20" y="20" width="60" height="6" rx="2" />
            <rect x="25" y="32" width="50" height="4" rx="1" />
            <rect x="30" y="26" width="6" height="70" rx="1" />
            <rect x="64" y="26" width="6" height="70" rx="1" />
            <rect x="47" y="26" width="6" height="10" rx="1" />
          </svg>
        </div>

        {/* Những cánh hoa anh đào (Sakura) GPU-accelerated */}
        <div className="absolute top-12 left-[15%] text-pink-400 text-lg animate-sakura-1 pointer-events-none opacity-70">🌸</div>
        <div className="absolute top-1/4 right-[20%] text-rose-300 text-sm animate-sakura-2 pointer-events-none opacity-60">🌸</div>
        <div className="absolute bottom-1/3 left-[25%] text-pink-400 text-base animate-sakura-3 pointer-events-none opacity-75">🌸</div>
        <div className="absolute top-20 right-[10%] text-rose-400 text-xs animate-sakura-1 pointer-events-none opacity-50">🌸</div>
      </div>


      {/* ========================================================================= */}
      {/* 2. MAIN COMPOSITION: SÂN KHẤU LINH VẬT (TRÁI) & CARD ĐĂNG NHẬP (PHẢI) */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full max-w-[1080px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        
        {/* ----------------------------------------------------------------------- */}
        {/* CỘT TRÁI: SÂN KHẤU LINH VẬT CÁO KITSUNE & BRAND IDENTITY (5 COLS) */}
        {/* ----------------------------------------------------------------------- */}
        <motion.section 
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ willChange: 'transform, opacity', transform: 'translateZ(0)' }}
          className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left justify-center"
        >
          {/* Brand Pill Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-200/80 bg-white/85 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-orange-600 shadow-sm backdrop-blur-xl mb-3">
            <FujiSunIcon size={16} strokeWidth={2.5} className="text-orange-500" />
            JP FORUS • じぇいぴー
          </div>

          {/* Slogan Tiếng Nhật Sang Trọng */}
          <h1 className="text-2xl sm:text-3xl lg:text-[36px] font-black leading-tight tracking-tight text-slate-900 mb-1.5">
            日本語を、<br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-rose-500 to-pink-500">
              もっと楽しく。
            </span>
          </h1>

          <p className="text-sm font-semibold text-slate-600 max-w-sm mb-4 leading-relaxed">
            Học tiếng Nhật mỗi ngày cùng linh vật Kitsune và lộ trình học cá nhân hóa thông minh.
          </p>

          {/* Linh vật Cáo Kitsune tương tác thời gian thực */}
          <div className="my-1 sm:my-2 flex justify-center w-full lg:justify-start">
            <JapaneseMascot state={mascotState} showSpeechBubble={true} />
          </div>

          {/* Quick Perks / Mini badges */}
          <div className="hidden lg:flex items-center gap-3 mt-3 text-xs font-bold text-slate-500">
            <span className="flex items-center gap-1.5 bg-white/80 px-3.5 py-1.5 rounded-full border border-orange-100/90 shadow-xs">
              <Sparkles size={14} className="text-amber-500" /> Luyện nói AI 1-1
            </span>
            <span className="flex items-center gap-1.5 bg-white/80 px-3.5 py-1.5 rounded-full border border-orange-100/90 shadow-xs">
              <Flower2 size={14} className="text-pink-500" /> 50 Bài Minna
            </span>
          </div>
        </motion.section>


        {/* ----------------------------------------------------------------------- */}
        {/* CỘT PHẢI: LOGIN CARD GLASSMORPHISM CHUẨN HIỆN ĐẠI (7 COLS) */}
        {/* ----------------------------------------------------------------------- */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 w-full max-w-[500px] mx-auto auth-gpu-card"
        >
          <div className="relative overflow-hidden rounded-[34px] border border-white/90 bg-white/82 p-6 sm:p-9 shadow-[0_24px_70px_rgba(251,146,60,0.14)] backdrop-blur-2xl ring-1 ring-inset ring-white/90">
            
            {/* Ambient Corner Light Spotlights */}
            <div className="pointer-events-none absolute -right-16 -top-16 w-48 h-48 rounded-full bg-orange-300/30 blur-3xl" />
            <div className="pointer-events-none absolute -left-16 -bottom-16 w-48 h-48 rounded-full bg-rose-300/25 blur-3xl" />

            {/* Header Trong Card */}
            <div className="relative mb-6">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-orange-100/80 text-orange-700 border border-orange-200/80">
                  <Sparkles size={13} className="text-orange-500" />
                  Đăng nhập tài khoản
                </span>
                <span className="text-xs font-bold text-slate-400 font-mono">
                  JP-FORUS
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                おかえりなさい！
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
                Chào mừng bạn quay lại! Cùng tiếp tục bài học hôm nay nhé.
              </p>
            </div>

            {/* =================================================================== */}
            {/* LOGIN FORM */}
            {/* =================================================================== */}
            <form onSubmit={submit} className="relative space-y-4">
              
              {/* TRƯỜNG EMAIL */}
              <div>
                <label className="block mb-1.5 text-xs font-black uppercase tracking-[0.16em] text-slate-600">
                  Địa chỉ Email
                </label>
                <div className="relative flex items-center rounded-2xl border border-slate-200/90 bg-white/95 px-4 py-3.5 shadow-xs transition-colors duration-150 focus-within:border-orange-400 focus-within:ring-4 focus-within:ring-orange-100/70">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-orange-50 text-orange-500 mr-3">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setMascotState('email')}
                    onBlur={() => {
                      if (mascotState === 'email') setMascotState('idle');
                    }}
                    className="w-full bg-transparent text-sm font-bold text-slate-800 outline-none placeholder:text-slate-400"
                    placeholder="student@jp-forus.com"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* TRƯỜNG MẬT KHẨU */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-black uppercase tracking-[0.16em] text-slate-600">
                    Mật khẩu
                  </label>
                  <Link 
                    to="/forgot-password" 
                    className="text-xs font-bold text-orange-600 hover:text-orange-700 transition-colors"
                  >
                    Quên mật khẩu?
                  </Link>
                </div>
                <div className="relative flex items-center rounded-2xl border border-slate-200/90 bg-white/95 px-4 py-3.5 shadow-xs transition-colors duration-150 focus-within:border-rose-400 focus-within:ring-4 focus-within:ring-rose-100/70">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-rose-50 text-rose-500 mr-3">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setMascotState('password')}
                    onBlur={() => {
                      if (mascotState === 'password') setMascotState('idle');
                    }}
                    className="w-full bg-transparent text-sm font-bold text-slate-800 outline-none placeholder:text-slate-400 pr-2"
                    placeholder="Nhập mật khẩu của bạn"
                    required
                    autoComplete="current-password"
                  />
                  {/* Nút bật/tắt xem mật khẩu */}
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-slate-400 hover:text-slate-600 transition-colors p-1 cursor-pointer"
                    title={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </motion.button>
                </div>
              </div>

              {/* THÔNG BÁO LỖI (NẾU CÓ) */}
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-2.5 rounded-2xl bg-rose-50 border border-rose-200/80 px-4 py-3 text-xs sm:text-sm font-bold text-rose-600 shadow-xs"
                >
                  <AlertCircle size={17} className="shrink-0 text-rose-500" />
                  <span>{error}</span>
                </motion.div>
              )}

              {/* NÚT ĐĂNG NHẬP CHÍNH (TACTILE SPRING BUTTON) */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.015, y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="group relative overflow-hidden flex w-full items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-orange-500 via-rose-500 to-pink-500 px-6 py-4 text-base font-black text-white shadow-[0_12px_28px_rgba(249,115,22,0.35)] hover:shadow-[0_16px_36px_rgba(249,115,22,0.48)] transition-shadow disabled:cursor-not-allowed disabled:opacity-70 border border-orange-400/30 cursor-pointer"
              >
                {/* Shimmer sweep effect */}
                <div className="pointer-events-none absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shine" />
                
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    Đang đăng nhập...
                  </span>
                ) : (
                  <>
                    <span>Đăng nhập</span>
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1.5" />
                  </>
                )}
              </motion.button>
            </form>

            {/* PHÂN CÁCH "HOẶC" */}
            <div className="my-5 flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-slate-200" />
              <span>Hoặc</span>
              <span className="h-px flex-1 bg-gradient-to-l from-transparent via-slate-200 to-slate-200" />
            </div>

            {/* NÚT ĐĂNG NHẬP GOOGLE OAUTH */}
            <div className="relative">
              <GoogleSignInButton label="signin_with" onCredential={handleGoogle} />
            </div>

            {/* CHÂN THẺ: CHUYỂN HƯỚNG TẠO TÀI KHOẢN */}
            <div className="mt-6 pt-5 border-t border-slate-100 text-center">
              <p className="text-xs sm:text-sm font-semibold text-slate-500">
                Chưa có tài khoản JP Forus?{' '}
                <Link 
                  to="/register" 
                  className="font-black text-orange-600 hover:text-rose-600 transition-colors inline-flex items-center gap-1"
                >
                  Đăng ký ngay <ArrowRight size={13} />
                </Link>
              </p>
            </div>

          </div>
        </motion.section>

      </div>

    </main>
  );
};
