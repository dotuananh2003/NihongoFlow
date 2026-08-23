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
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-hidden">
          {/* Backdrop (High Performance GPU Quad) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 bg-slate-950/65"
            onClick={onClose}
          />

          {/* Modal Window Container with Apple/iOS Cinematic Expo-Out Deceleration */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 12 }}
            transition={{ 
              duration: 0.38, 
              ease: [0.16, 1, 0.3, 1] 
            }}
            style={{ willChange: 'transform, opacity' }}
            className="relative flex flex-col w-full max-w-[1040px] max-h-[calc(100vh-24px)] overflow-hidden rounded-[2.25rem] border border-white/90 bg-white/95 shadow-[0_25px_80px_rgba(15,23,42,0.22)] text-slate-900"
          >
            {/* ARTISTIC DAYTIME JAPANESE BACKGROUND (STATIC GPU PLANE) */}
            <div className="fixed-bg-plane pointer-events-none absolute inset-0 -z-10 overflow-hidden">
              <img
                src="/images/premium_modal_bg_light.jpg"
                alt="Japanese Sakura Spring Landscape"
                className="h-full w-full object-cover object-center opacity-30 scale-105"
              />
              {/* Soft Ivory Gradient Overlays for High Legibility */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/80 to-white/95" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(59,130,246,0.08),rgba(255,255,255,0))]" />
            </div>

            {/* SMOOTH SCROLLABLE MODAL BODY */}
            <div className="smooth-scroll-area flex-1 overflow-y-auto p-5 sm:p-7 md:p-8">
              {/* TOP HEADER SECTION */}
              <div className="relative flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
                <div>
                  <div className="mb-2.5 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/90 px-3.5 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-blue-600 shadow-sm">
                    <Gem size={13} className="text-blue-600 animate-pulse" />
                    <span>JP FORUS PREMIUM • BẢN QUYỀN TRỌN GÓI</span>
                  </div>
                  <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl md:text-4xl">
                    Mở Khóa Lộ Trình <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-rose-500 bg-clip-text text-transparent">Nhật Ngữ Toàn Diện</span>
                  </h2>
                  <p className="mt-1.5 max-w-xl text-xs font-semibold leading-relaxed text-slate-600 sm:text-sm">
                    Mở toàn bộ Kanji, Từ vựng, Ngữ pháp, Ngân hàng đề thi thử các kỳ và Luyện nói phản xạ không giới hạn.
                  </p>
                </div>

                {/* Close Button with Spring Micro-interaction */}
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  onClick={onClose}
                  className="absolute -top-1 -right-1 md:relative md:top-0 md:right-0 grid h-10 w-10 place-items-center rounded-full border border-slate-200/80 bg-white/90 text-slate-500 shadow-sm transition-colors hover:bg-slate-900 hover:text-white"
                  aria-label="Đóng"
                >
                  <X size={18} />
                </motion.button>
              </div>

              {/* ERROR NOTIFICATION IF ANY */}
              {checkoutError && (
                <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 p-3 text-center text-xs font-bold text-rose-600">
                  {checkoutError}
                </div>
              )}

              {/* THREE PRICING CARDS */}
              <div className="mt-6 grid grid-cols-1 gap-4.5 lg:grid-cols-3 lg:gap-5 items-stretch">
                {pricingPlans.map((plan) => {
                  const isCombo = plan.featured;

                  return (
                    <motion.div
                      key={plan.id}
                      initial={false}
                      whileHover={{ 
                        y: isCombo ? -8 : -5,
                        transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] }
                      }}
                      className={`smooth-panel group relative flex flex-col justify-between rounded-[2rem] overflow-hidden p-5 ${
                        isCombo
                          ? 'border-2 border-blue-400/90 bg-white/95 shadow-[0_16px_45px_rgba(37,99,235,0.16)] ring-4 ring-blue-100/80 hover:shadow-[0_22px_55px_rgba(37,99,235,0.25)] lg:-translate-y-2'
                          : plan.tone === 'rose'
                          ? 'border border-rose-100/90 bg-white/90 shadow-[0_8px_30px_rgba(244,63,94,0.06)] hover:border-rose-300 hover:shadow-[0_16px_40px_rgba(244,63,94,0.12)]'
                          : 'border border-indigo-100/90 bg-white/90 shadow-[0_8px_30px_rgba(79,70,229,0.06)] hover:border-indigo-300 hover:shadow-[0_16px_40px_rgba(79,70,229,0.12)]'
                      }`}
                    >
                      {/* COMBO MASTER TOP EMBEDDED RIBBON (CLEAN & NO CLIPPING) */}
                      {isCombo && (
                        <div className="-mx-5 -mt-5 mb-4 flex items-center justify-center gap-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 py-1.5 text-[10px] font-black uppercase tracking-wider text-white shadow-sm">
                          <Flame size={13} fill="currentColor" />
                          <span>{plan.popularTag}</span>
                        </div>
                      )}

                      <div>
                        {/* Card Header & Icon */}
                        <div className="flex items-start justify-between gap-3">
                          <div className={`grid h-12 w-12 place-items-center rounded-2xl font-black shadow-md ${
                            isCombo 
                              ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-blue-500/25 ring-2 ring-blue-100' 
                              : plan.tone === 'rose'
                              ? 'bg-rose-50 text-rose-600 ring-1 ring-rose-200'
                              : 'bg-indigo-50 text-indigo-600 ring-1 ring-indigo-200'
                          }`}>
                            {plan.icon}
                          </div>

                          <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider ${
                            isCombo
                              ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-200'
                              : plan.tone === 'rose'
                              ? 'bg-rose-50 text-rose-600 ring-1 ring-rose-200'
                              : 'bg-indigo-50 text-indigo-600 ring-1 ring-indigo-200'
                          }`}>
                            {plan.label}
                          </span>
                        </div>

                        {/* Title & Price */}
                        <h3 className="mt-4 text-xl font-black text-slate-900">
                          {plan.name}
                        </h3>

                        <div className="mt-2 flex items-baseline gap-1.5">
                          {plan.oldPrice && (
                            <span className="font-mono text-sm font-black text-slate-400 line-through">
                              {plan.oldPrice}
                            </span>
                          )}
                          <span className={`font-mono text-3xl font-black tracking-tight ${
                            isCombo ? 'text-blue-600' : plan.tone === 'rose' ? 'text-rose-600' : 'text-indigo-600'
                          }`}>
                            {plan.price}
                          </span>
                          <span className="text-xs font-bold text-slate-500">
                            {plan.period}
                          </span>
                        </div>

                        {/* Divider */}
                        <div className="my-4 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

                        {/* Features List */}
                        <ul className="space-y-2.5">
                          {plan.features.map((feature, idx) => (
                            <li key={idx} className="steady-scroll-row flex items-start gap-2.5 text-xs font-bold text-slate-700 leading-snug">
                              <CheckCircle2 size={15} className={`shrink-0 mt-0.5 ${
                                isCombo ? 'text-blue-600' : 'text-emerald-500'
                              }`} />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* CTA Button */}
                      <div className="mt-6 pt-2">
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.025 }}
                          whileTap={{ scale: 0.975 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                          onClick={() => onStartCheckout(plan.id)}
                          disabled={creatingPlanId === plan.id}
                          className={`group relative flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-xs font-black text-white shadow-md ${
                            isCombo
                              ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 shadow-blue-500/30 hover:shadow-blue-500/45'
                              : plan.tone === 'rose'
                              ? 'bg-gradient-to-r from-rose-500 to-pink-600 shadow-rose-500/20 hover:from-rose-600 hover:to-pink-700'
                              : 'bg-gradient-to-r from-indigo-600 to-blue-600 shadow-indigo-500/20 hover:from-indigo-700 hover:to-blue-700'
                          }`}
                        >
                          <CreditCard size={15} />
                          <span>{creatingPlanId === plan.id ? 'Đang tạo đơn...' : 'MUA GÓI NÀY'}</span>
                          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                        </motion.button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* BOTTOM TRUST & INSTANT ACTIVATION BAR */}
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white/90 px-5 py-3.5 text-xs font-bold text-slate-600 shadow-sm">
                <div className="flex items-center gap-2 text-slate-700">
                  <Clock size={16} className="text-blue-600" />
                  <span>Thanh toán tự động bằng mã VietQR / MoMo / Chuyển khoản 24/7</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-600 font-black">
                  <ShieldCheck size={18} />
                  <span>Mở khóa tài khoản ngay lập tức</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};
