import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Crown, 
  Zap, 
  BookOpen, 
  CheckCircle2, 
  CreditCard, 
  ShieldCheck, 
  Sparkles, 
  Gem, 
  ArrowRight,
  Clock,
  Flame
} from 'lucide-react';

interface PricingPlan {
  id: string;
  name: string;
  label: string;
  price: string;
  period: string;
  oldPrice?: string;
  tone: 'rose' | 'blue' | 'indigo';
  icon: React.ReactNode;
  popularTag?: string;
  features: string[];
  featured?: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    id: 'jpd113',
    name: 'Khóa Sơ Cấp I',
    label: 'JPD113 • N5 Cơ Bản',
    price: '40.000đ',
    period: '/ 2 tháng',
    tone: 'rose',
    icon: <Zap size={22} />,
    features: [
      'Toàn bộ Kanji & Flashcard JPD113',
      'Kho Từ vựng & Ngữ pháp Sơ cấp I',
      'Đề thi thử & Ôn tập trọn gói',
      'Phòng luyện phản xạ Kana & Phát âm',
      'Lộ trình học chuẩn 2 tháng'
    ],
  },
  {
    id: 'combo',
    name: 'Combo Master',
    label: 'JPD113 + JPD123 Toàn Diện',
    price: '70.000đ',
    period: '/ 2 tháng',
    oldPrice: '80.000đ',
    tone: 'blue',
    icon: <Crown size={26} />,
    popularTag: 'TIẾT KIỆM 10.000Đ • KHUYÊN DÙNG',
    features: [
      'Mở khóa trọn bộ 100% JPD113 & JPD123',
      'Kho đề thi thử Retake & Final Exam các kỳ',
      'Luyện nói & AI Chấm phát âm chuyên sâu',
      'Toàn bộ Mnemonic Hán tự & Bài giảng',
      'Tặng gói cập nhật ngân hàng đề thi mới'
    ],
    featured: true,
  },
  {
    id: 'jpd123',
    name: 'Khóa Sơ Cấp II',
    label: 'JPD123 • N5+ Nâng Cao',
    price: '40.000đ',
    period: '/ 2 tháng',
    tone: 'indigo',
    icon: <BookOpen size={22} />,
    features: [
      'Toàn bộ Kanji & Flashcard JPD123',
      'Kho Từ vựng & Ngữ pháp Sơ cấp II',
      'Đề thi thử chuyên sâu FE & RE',
      'Luyện phản xạ giao tiếp nâng cao',
      'Lộ trình bứt phá điểm số 2 tháng'
    ],
  },
];

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartCheckout: (planId: string) => void;
  creatingPlanId: string | null;
  checkoutError: string | null;
}

export const PremiumModal: React.FC<PremiumModalProps> = ({
  isOpen,
  onClose,
  onStartCheckout,
  creatingPlanId,
  checkoutError,
}) => {
  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center overflow-y-auto px-3 py-4 sm:px-4 sm:py-6">
        {/* Dark Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 25 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 25 }}
          transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.35 }}
          className="relative w-full max-w-[1040px] overflow-hidden rounded-[2.25rem] border border-white/20 bg-slate-950 shadow-[0_30px_90px_rgba(0,0,0,0.85)] text-white"
        >
          {/* ARTISTIC JAPANESE BACKGROUND */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <img
              src="/images/premium_modal_bg.jpg"
              alt="Japanese Night Scene"
              className="h-full w-full object-cover object-center opacity-40 scale-105 filter brightness-90 saturate-125"
            />
            {/* Ambient Multi-layer Gradients for Maximum Legibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/80 to-slate-950/95" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(56,189,248,0.15),rgba(15,23,42,0))]" />
          </div>

          <div className="relative max-h-[calc(100vh-40px)] overflow-y-auto p-5 sm:p-7 md:p-8">
            {/* TOP HEADER SECTION */}
            <div className="relative flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
              <div>
                <div className="mb-2.5 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-950/50 px-3.5 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.25)] backdrop-blur-sm">
                  <Gem size={13} className="text-cyan-400 animate-pulse" />
                  <span>JP FORUS PREMIUM • 完全アクセス</span>
                </div>
                <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl md:text-4xl">
                  Mở Khóa Lộ Trình <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-pink-400 bg-clip-text text-transparent">Nhật Ngữ Toàn Diện</span>
                </h2>
                <p className="mt-1.5 max-w-xl text-xs font-semibold leading-relaxed text-slate-300 sm:text-sm">
                  Mở toàn bộ Kanji, Từ vựng, Ngữ pháp, Ngân hàng đề thi thử các kỳ và Luyện nói phản xạ không giới hạn.
                </p>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="absolute -top-1 -right-1 md:relative md:top-0 md:right-0 grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/10 text-slate-300 shadow-md backdrop-blur-md transition-all hover:scale-105 hover:bg-rose-500 hover:text-white"
                aria-label="Đóng"
              >
                <X size={18} />
              </button>
            </div>

            {/* ERROR NOTIFICATION IF ANY */}
            {checkoutError && (
              <div className="mt-4 rounded-2xl border border-rose-500/40 bg-rose-950/60 p-3 text-center text-xs font-bold text-rose-300 backdrop-blur-sm">
                {checkoutError}
              </div>
            )}

            {/* THREE PRICING CARDS */}
            <div className="mt-6 grid grid-cols-1 gap-4.5 lg:grid-cols-3 lg:gap-5 items-stretch">
              {pricingPlans.map((plan) => {
                const isCombo = plan.featured;

                return (
                  <div
                    key={plan.id}
                    className={`group relative flex flex-col justify-between rounded-[1.75rem] p-5 transition-all duration-300 ${
                      isCombo
                        ? 'border-2 border-cyan-400/80 bg-slate-900/90 shadow-[0_0_35px_rgba(6,182,212,0.25)] ring-1 ring-cyan-400/50 hover:shadow-[0_0_50px_rgba(6,182,212,0.4)] lg:-translate-y-2'
                        : 'border border-white/10 bg-slate-900/60 shadow-xl backdrop-blur-md hover:-translate-y-1 hover:border-white/20 hover:bg-slate-900/80'
                    }`}
                  >
                    {/* COMBO MASTER CROWN TAG */}
                    {isCombo && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 px-4 py-1 text-[10px] font-black uppercase tracking-wider text-black shadow-lg shadow-orange-500/30">
                        <Flame size={13} fill="currentColor" />
                        <span>{plan.popularTag}</span>
                      </div>
                    )}

                    <div>
                      {/* Card Header & Icon */}
                      <div className={`flex items-start justify-between gap-3 ${isCombo ? 'pt-2' : ''}`}>
                        <div className={`grid h-12 w-12 place-items-center rounded-2xl font-black shadow-lg ${
                          isCombo 
                            ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-black shadow-orange-500/30' 
                            : plan.tone === 'rose'
                            ? 'bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-rose-500/25'
                            : 'bg-gradient-to-br from-indigo-500 to-blue-600 text-white shadow-blue-500/25'
                        }`}>
                          {plan.icon}
                        </div>

                        <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider ${
                          isCombo
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                            : plan.tone === 'rose'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                        }`}>
                          {plan.label}
                        </span>
                      </div>

                      {/* Title & Price */}
                      <h3 className="mt-4 text-xl font-black text-white">
                        {plan.name}
                      </h3>

                      <div className="mt-2.5 flex items-baseline gap-1.5">
                        {plan.oldPrice && (
                          <span className="font-mono text-sm font-black text-slate-500 line-through">
                            {plan.oldPrice}
                          </span>
                        )}
                        <span className={`font-mono text-3xl font-black tracking-tight ${
                          isCombo ? 'text-cyan-400' : 'text-white'
                        }`}>
                          {plan.price}
                        </span>
                        <span className="text-xs font-bold text-slate-400">
                          {plan.period}
                        </span>
                      </div>

                      {/* Divider */}
                      <div className={`my-4 h-px ${
                        isCombo 
                          ? 'bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent' 
                          : 'bg-white/10'
                      }`} />

                      {/* Features List */}
                      <ul className="space-y-2.5">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs font-bold text-slate-300 leading-snug">
                            <CheckCircle2 size={15} className={`shrink-0 mt-0.5 ${
                              isCombo ? 'text-cyan-400' : 'text-emerald-400'
                            }`} />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <div className="mt-6 pt-2">
                      <button
                        type="button"
                        onClick={() => onStartCheckout(plan.id)}
                        disabled={creatingPlanId === plan.id}
                        className={`group relative flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-xs font-black text-white transition-all duration-200 ${
                          isCombo
                            ? 'bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-[1.02]'
                            : plan.tone === 'rose'
                            ? 'bg-gradient-to-r from-rose-500 to-pink-600 shadow-md shadow-rose-500/20 hover:bg-rose-600 hover:scale-[1.02]'
                            : 'bg-gradient-to-r from-indigo-500 to-blue-600 shadow-md shadow-blue-500/20 hover:bg-indigo-600 hover:scale-[1.02]'
                        }`}
                      >
                        <CreditCard size={15} />
                        <span>{creatingPlanId === plan.id ? 'Đang tạo đơn...' : 'MUA GÓI NÀY'}</span>
                        <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* BOTTOM TRUST & INSTANT ACTIVATION BAR */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl border border-white/10 bg-slate-900/60 px-5 py-3.5 text-xs font-bold text-slate-400 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-slate-300">
                <Clock size={16} className="text-cyan-400" />
                <span>Thanh toán tự động bằng mã VietQR / MoMo / Chuyển khoản 24/7</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400 font-black">
                <ShieldCheck size={18} />
                <span>Mở khóa tài khoản ngay lập tức</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
};
