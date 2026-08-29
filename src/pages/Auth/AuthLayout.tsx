import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const FujiSunIcon = ({ size = 24, strokeWidth = 2, className = "" }: { size?: number | string, strokeWidth?: number, className?: string }) => (
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
    {/* Mặt trời mọc ló rạng trên đỉnh núi */}
    <path d="M 8.5 8.2 A 4 4 0 0 1 15.5 8.2" />
    
    {/* 3 tia sáng mặt trời bình minh tinh tế */}
    <path d="M 12 1.5 V 3.5" />
    <path d="M 6.5 4 L 7.8 5.3" />
    <path d="M 17.5 4 L 16.2 5.3" />

    {/* Núi Phú Sĩ với dáng dấp cong thoai thoải đặc trưng và miệng núi phẳng */}
    <path d="M 2.5 20.5 C 6.5 20, 8.8 15.5, 9.8 9.5 H 14.2 C 15.2 15.5, 17.5 20, 21.5 20.5" />

    {/* Vạt tuyết bồng bềnh phủ trên đỉnh núi */}
    <path d="M 7 14.5 Q 9.5 12.8, 12 14.5 Q 14.5 12.8, 17 14.5" />

    {/* Đường chân núi mượt mà */}
    <path d="M 1.5 20.5 H 22.5" />
  </svg>
);

type AuthMode = 'login' | 'register';

type AuthLayoutProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  mode?: AuthMode;
  children: ReactNode;
};

const introCopy: Record<AuthMode, { title: string; description: string; stats: Array<{ label: string; value: string; caption: string }> }> = {
  login: {
    title: 'Vào học nhẹ nhàng như một buổi sáng xanh.',
    description: 'JP Forus lưu lại hành trình học tiếng Nhật của bạn trong một không gian sạch, mềm và tập trung.',
    stats: [
      { label: 'Focus', value: '90%', caption: 'không gian học gọn' },
      { label: 'Sync', value: '24/7', caption: 'tài khoản cá nhân' },
    ],
  },
  register: {
    title: 'Tạo một khu vườn học tập của riêng bạn.',
    description: 'Bắt đầu với tài khoản mới để lưu bài học, theo dõi nhịp học và mở khóa trải nghiệm cá nhân hóa.',
    stats: [
      { label: 'Start', value: 'N5', caption: 'lộ trình đầu tiên' },
      { label: 'Grow', value: '毎日', caption: 'học đều mỗi ngày' },
    ],
  },
};

export const AuthLayout = ({ eyebrow, title, subtitle, mode = 'login', children }: AuthLayoutProps) => {
  const isRegister = mode === 'register';
  const copy = introCopy[mode];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fff1e8] text-slate-900">
      <div className="fixed inset-0 z-0">
        <img
          src="/images/backgrounds/auth-peach-bg.png"
          alt=""
          className="h-full w-full object-cover opacity-100 saturate-[0.98]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(251,146,60,0.10),transparent_28%),radial-gradient(circle_at_82%_14%,rgba(244,114,182,0.08),transparent_30%),linear-gradient(135deg,rgba(255,247,237,0.38),rgba(255,255,255,0.26)_48%,rgba(239,246,255,0.30))]" />
      </div>

      <section className={`relative z-10 mx-auto grid min-h-screen w-full max-w-[1180px] grid-cols-1 items-center gap-8 px-5 py-8 ${isRegister ? 'lg:grid-cols-[1fr_0.9fr]' : 'lg:grid-cols-[0.9fr_1fr]'}`}>
        <motion.aside
          key={`intro-${mode}`}
          initial={{ opacity: 0, x: isRegister ? 90 : -90 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 90, damping: 22 }}
          className={`hidden lg:flex flex-col justify-center ${isRegister ? 'lg:order-2 lg:items-end' : 'lg:order-1'}`}
        >
          <div className="max-w-[480px]">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-100 bg-white/68 px-5 py-3 text-xs font-black uppercase tracking-[0.22em] text-orange-500 shadow-sm backdrop-blur-xl">
              <FujiSunIcon size={17} strokeWidth={2.5} />
              JP Forus
            </div>

            <h1 className="mt-8 text-[58px] font-black leading-[0.95] tracking-normal text-slate-950">
              {copy.title}
            </h1>

            <p className="mt-6 max-w-md text-base font-semibold leading-8 text-slate-600">
              {copy.description}
            </p>

            <div className="mt-10 grid max-w-[390px] grid-cols-2 gap-3">
              {copy.stats.map((stat, index) => (
                <div key={stat.label} className="rounded-[28px] border border-white/80 bg-white/62 p-5 shadow-[0_18px_46px_rgba(154,52,18,0.08)] backdrop-blur-xl">
                  <p className={`text-[11px] font-black uppercase tracking-[0.2em] ${index === 0 ? 'text-orange-500' : 'text-rose-400'}`}>{stat.label}</p>
                  <p className="mt-3 text-3xl font-black text-slate-950">{stat.value}</p>
                  <p className="mt-1 text-xs font-bold text-slate-500">{stat.caption}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.aside>

        <motion.div
          key={`panel-${mode}`}
          initial={{ opacity: 0, x: isRegister ? 260 : -260, scale: 0.98 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 95, damping: 21 }}
          className={`mx-auto w-full max-w-[520px] ${isRegister ? 'lg:order-1' : 'lg:order-2'}`}
        >
          <div className="relative overflow-hidden rounded-[38px] border border-white/82 bg-white/76 p-5 shadow-[0_28px_80px_rgba(154,52,18,0.14)] backdrop-blur-2xl sm:p-7">
            <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-orange-200/45 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 left-10 h-44 w-44 rounded-full bg-rose-200/42 blur-3xl" />

            <div className="relative mb-7 rounded-[30px] border border-orange-100 bg-gradient-to-br from-white via-orange-50/78 to-rose-50/70 p-5">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/82 px-3 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-orange-500 shadow-sm">
                  <Sparkles size={15} />
                  {eyebrow}
                </div>
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-orange-400 to-rose-400 text-white shadow-lg shadow-orange-400/25">
                  <FujiSunIcon size={23} strokeWidth={2.5} />
                </div>
              </div>

              <h2 className="text-[34px] font-black leading-tight tracking-normal text-slate-950">{title}</h2>
              <p className="mt-3 max-w-sm text-sm font-semibold leading-6 text-slate-500">{subtitle}</p>
            </div>

            <div className="relative">{children}</div>
          </div>
        </motion.div>
      </section>
    </main>
  );
};
