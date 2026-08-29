import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Banknote,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clipboard,
  Clock,
  Crown,
  Download,
  ExternalLink,
  HelpCircle,
  Hourglass,
  Landmark,
  Loader2,
  LockOpen,
  Mic,
  QrCode,
  Radio,
  ReceiptText,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  WalletCards,
  Zap,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { paymentApi, type PaymentEntitlements, type PaymentOrder } from '../../lib/paymentApi';
import { Confetti } from '../../components/Kana/Confetti';
import { JapaneseMascot } from '../../components/mascot/JapaneseMascot';

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(value);

const compactOrderCode = (value: string) => (value.length > 14 ? `${value.slice(0, 11)}...` : value);

/**
 * Simple VietQR Badge
 */
const VietQRBadge = ({ className = '' }: { className?: string }) => (
  <div className={`inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50/80 px-3 py-1 text-xs font-black text-blue-600 shadow-xs ${className}`}>
    <QrCode size={13} strokeWidth={2.4} />
    <span>VietQR</span>
  </div>
);

export const Checkout = () => {
  const { orderCode } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<PaymentOrder | null>(null);
  const [, setEntitlements] = useState<PaymentEntitlements | null>(null);
  const [error, setError] = useState('');
  const [copiedKey, setCopiedKey] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isConfirming, setIsConfirming] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const totalTimeSeconds = 120;
  const remainingSeconds = Math.max(0, totalTimeSeconds - elapsedSeconds);
  const paymentProgress = Math.min(100, Math.round((elapsedSeconds / totalTimeSeconds) * 100));
  const isPaid = order?.status === 'paid';

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const planBadge = useMemo(() => {
    if (order?.planId === 'combo') return 'Combo Master (Hạn 2 Tháng)';
    if (order?.planId === 'jpd113') return 'Khóa Học Sơ Cấp I (Hạn 2 Tháng)';
    return 'Khóa Học Sơ Cấp II (Hạn 2 Tháng)';
  }, [order?.planId]);

  const targetCourseUrl = useMemo(() => {
    if (order?.planId === 'jpd113') return '/vocabulary/jpd113';
    return '/vocabulary/jpd123';
  }, [order?.planId]);

  // Ngày đăng ký (Ngày hiện tại khi thanh toán)
  const registrationDateFormatted = useMemo(() => {
    const d = new Date();
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, '0');
    const mins = String(d.getMinutes()).padStart(2, '0');
    return `${hours}:${mins} • ${day}/${month}/${year}`;
  }, []);

  // Ngày đến hạn (Đúng 2 tháng sau: +2 tháng / 60 ngày)
  const expiryDateFormatted = useMemo(() => {
    const d = new Date();
    d.setMonth(d.getMonth() + 2);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, '0');
    const mins = String(d.getMinutes()).padStart(2, '0');
    return `${hours}:${mins} • ${day}/${month}/${year}`;
  }, []);

  useEffect(() => {
    if (!orderCode) return;

    let mounted = true;
    let pollTimer: number | undefined;
    let secondTimer: number | undefined;

    const loadOrder = async () => {
      try {
        const response = await paymentApi.getOrder(orderCode);
        if (!mounted) return;

        setOrder(response.order);
        setEntitlements(response.entitlements);
        setError('');

        if (response.order.status === 'paid' || response.order.status === 'expired') {
          window.clearInterval(pollTimer);
          window.clearInterval(secondTimer);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Không thể tải đơn thanh toán.');
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    void loadOrder();
    pollTimer = window.setInterval(loadOrder, 5000);
    secondTimer = window.setInterval(() => {
      setElapsedSeconds(value => Math.min(totalTimeSeconds, value + 1));
    }, 1000);

    return () => {
      mounted = false;
      window.clearInterval(pollTimer);
      window.clearInterval(secondTimer);
    };
  }, [orderCode]);

  const copyText = async (label: string, text: string) => {
    await navigator.clipboard?.writeText(text);
    setCopiedKey(label);
    window.setTimeout(() => setCopiedKey(''), 1500);
  };

  const downloadQR = () => {
    if (!order?.qrImageUrl) return;
    const link = document.createElement('a');
    link.href = order.qrImageUrl;
    link.download = `VietQR-JPForus-${order.orderCode}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const confirmDemoPayment = async () => {
    if (!orderCode) return;
    setIsConfirming(true);
    try {
      const response = await paymentApi.devConfirmOrder(orderCode);
      setOrder(response.order);
      setEntitlements(response.entitlements);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không thể xác nhận thanh toán demo.');
    } finally {
      setIsConfirming(false);
    }
  };

  if (isLoading) {
    return (
      <div className="grid min-h-[calc(100vh-120px)] place-items-center bg-[#f8fbff] dark:bg-slate-950 font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4 rounded-3xl border border-blue-100 bg-white/90 p-8 shadow-xl backdrop-blur-xl"
        >
          <div className="relative grid h-14 w-14 place-items-center rounded-2xl bg-blue-50 text-blue-600">
            <Loader2 className="animate-spin text-blue-600" size={28} />
            <div className="absolute inset-0 rounded-2xl ring-4 ring-blue-500/20 animate-pulse" />
          </div>
          <div className="text-center">
            <p className="text-sm font-black text-slate-900">Đang chuẩn bị mã QR thanh toán</p>
            <p className="text-xs font-semibold text-slate-500 mt-1">Kết nối với hệ thống đối soát PayOS 24/7</p>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="mx-auto grid min-h-[calc(100vh-120px)] max-w-lg place-items-center px-4 font-sans">
        <div className="w-full rounded-[2rem] border border-slate-200/80 bg-white p-7 text-center shadow-xl">
          <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-2xl bg-rose-50 text-rose-500">
            <HelpCircle size={28} />
          </div>
          <p className="text-xl font-black text-slate-900">Không tìm thấy đơn thanh toán</p>
          <p className="mt-2 text-xs font-semibold text-slate-500">
            {error || 'Đơn thanh toán có thể đã hết hạn hoặc không tồn tại. Vui lòng tạo đơn mới.'}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="mt-5 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-slate-900 py-3 text-xs font-black text-white shadow-md hover:bg-slate-800 transition"
          >
            <ArrowLeft size={15} />
            Quay lại trang trước
          </button>
        </div>
      </div>
    );
  }

  const transferRows = [
    { label: 'Ngân hàng', value: order.bankBin || '970418', displayValue: 'BIDV (970418)', icon: Landmark },
    { label: 'Số tài khoản', value: order.accountNumber || 'Chưa cấu hình', displayValue: order.accountNumber || 'Chưa cấu hình', icon: WalletCards, isMono: true },
    { label: 'Tên tài khoản', value: order.accountName || 'JP FORUS', displayValue: order.accountName || 'JP FORUS', icon: Banknote },
    { label: 'Số tiền', value: String(order.amount), displayValue: formatCurrency(order.amount), icon: Banknote, isHighlight: true },
    { label: 'Nội dung CK', value: order.transferContent, displayValue: order.transferContent, icon: ReceiptText, isMono: true, isCode: true },
  ];

  return (
    <div className="min-h-screen bg-[#f8fbff] text-slate-800 font-sans selection:bg-blue-500 selection:text-white pb-10 pt-2.5 px-3 sm:px-5 relative overflow-hidden">
      
      {/* Background Japanese Aesthetic & Ambient Aurora Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-blue-400/20 to-sky-300/10 blur-[100px]" />
        <div className="absolute top-1/3 -right-40 h-[450px] w-[450px] rounded-full bg-gradient-to-bl from-cyan-400/15 via-blue-500/10 to-indigo-300/10 blur-[120px]" />
        <div className="absolute -bottom-40 left-1/3 h-[380px] w-[380px] rounded-full bg-gradient-to-tr from-sky-400/15 to-transparent blur-[90px]" />
        
        {/* Soft Japanese Calligraphy Watermarks */}
        <div className="absolute top-10 right-10 text-[12rem] font-black leading-none text-blue-900/[0.025] select-none font-jp">
          日本語
        </div>
        <div className="absolute bottom-8 left-8 text-[14rem] font-black leading-none text-blue-900/[0.02] select-none font-jp">
          {isPaid ? '合格' : '決済'}
        </div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(37,99,235,0.04)_1px,transparent_1px),linear-gradient(rgba(37,99,235,0.04)_1px,transparent_1px)] bg-[size:32px_32px] opacity-70" />
      </div>

      <div className="relative z-10 max-w-[1180px] mx-auto space-y-4 sm:space-y-5">
        
        {/* ========================================================================= */}
        {/* 1. TOP HEADER & TRUST BAR (COMPACT & CLEAN) */}
        {/* ========================================================================= */}
        <motion.header
          initial={{ y: -12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="flex flex-wrap items-center justify-between gap-3 rounded-[22px] border border-white/80 bg-white/80 px-4 py-2.5 shadow-[0_8px_24px_rgba(37,99,235,0.06)] backdrop-blur-xl"
        >
          {/* Left: Back button & Breadcrumb */}
          <div className="flex items-center gap-2.5">
            <motion.button
              onClick={() => navigate(-1)}
              whileHover={{ scale: 1.05, x: -2 }}
              whileTap={{ scale: 0.95 }}
              className="grid h-8 w-8 cursor-pointer place-items-center rounded-xl border border-blue-100 bg-white text-slate-600 shadow-xs hover:border-blue-300 hover:text-blue-600 transition-colors"
              aria-label="Quay lại"
            >
              <ArrowLeft size={16} strokeWidth={2.4} />
            </motion.button>

            <div className="flex items-center gap-2.5">
              <div className={`grid h-8 w-8 place-items-center rounded-xl ${
                isPaid 
                  ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-xs' 
                  : 'bg-gradient-to-br from-blue-600 to-sky-500 text-white shadow-xs'
              }`}>
                {isPaid ? <CheckCircle2 size={18} strokeWidth={2.4} /> : <QrCode size={17} strokeWidth={2.2} />}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className={`text-[11px] font-black uppercase tracking-[0.18em] ${isPaid ? 'text-emerald-600' : 'text-blue-600'}`}>
                    JP Forus Pay
                  </span>
                  <span className="h-1 w-1 rounded-full bg-slate-300" />
                  <span className="text-[11px] font-bold text-slate-400">{isPaid ? 'Thanh Toán Thành Công' : 'Checkout'}</span>
                </div>
                <h1 className="text-xs font-black text-slate-800">
                  {isPaid ? 'Kích Hoạt Tài Khoản Thành Công' : 'Cổng Thanh Toán Tự Động 24/7'}
                </h1>
              </div>
            </div>
          </div>

          {/* Right: Security & Gateway Badges */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-blue-100 bg-blue-50/80 px-3 py-1.5 text-[11px] font-black text-blue-700 shadow-xs">
              <ShieldCheck size={14} className="text-blue-600" />
              <span>Bảo mật 256-Bit SSL</span>
            </div>

            <div className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-[11px] font-black shadow-xs ${
              isPaid 
                ? 'border-emerald-200 bg-emerald-100 text-emerald-800' 
                : 'border-emerald-100 bg-emerald-50/80 text-emerald-700'
            }`}>
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              <span>{isPaid ? 'Đã kích hoạt 100%' : 'Đối soát PayOS tức thì'}</span>
            </div>
          </div>
        </motion.header>

        {/* ========================================================================= */}
        {/* 2. MAIN WORKSPACE: PAYMENT SUCCESS FULL VIEW vs 3-COLUMN CHECKOUT */}
        {/* ========================================================================= */}
        <AnimatePresence mode="wait">
          {isPaid ? (
            /* ===================================================================== */
            /* 🏆 COMPACT & ELEGANT FULL CELEBRATORY PAYMENT SUCCESS VIEW */
            /* ===================================================================== */
            <motion.div
              key="success-screen"
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -15 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative space-y-4 sm:space-y-5"
            >
              {/* Confetti Celebration Cannon */}
              <Confetti />

              {/* Top Victory Celebration Hero (Refined Size) */}
              <div className="relative overflow-hidden rounded-[28px] border border-emerald-100/90 bg-gradient-to-b from-emerald-50/90 via-white to-white p-5 sm:p-6 text-center shadow-[0_16px_36px_rgba(16,185,129,0.1)] backdrop-blur-2xl">
                
                {/* Background ambient radial circles */}
                <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-gradient-to-br from-emerald-400/20 to-teal-300/15 blur-2xl" />
                
                {/* 3D Animated Emerald Checked Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 14, stiffness: 220, delay: 0.05 }}
                  className="relative mx-auto mb-3.5 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 text-white shadow-[0_10px_24px_rgba(16,185,129,0.3)]"
                >
                  <CheckCircle2 size={36} strokeWidth={2.4} />
                  <div className="absolute inset-0 rounded-2xl ring-4 ring-emerald-500/20 animate-pulse" />
                </motion.div>

                {/* Congratulations Typography */}
                <div className="relative space-y-1.5 max-w-xl mx-auto">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100/80 border border-emerald-200 px-3 py-1 text-[10px] font-black text-emerald-800 uppercase tracking-widest shadow-xs">
                    <Sparkles size={12} className="text-amber-500 fill-amber-500" />
                    <span>Giao Dịch Hoàn Tất Thành Công</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 leading-tight">
                    Thanh Toán Thành Công!
                  </h2>

                  <p className="text-xs sm:text-sm font-semibold text-slate-600 leading-relaxed">
                    Hệ thống đã nhận được chuyển khoản và tự động kích hoạt quyền truy cập 2 tháng (60 ngày) cho gói{' '}
                    <span className="font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      {planBadge}
                    </span>
                    .
                  </p>
                </div>
              </div>

              {/* 2-Column Success Details Grid */}
              <div className="grid gap-4 sm:gap-5 lg:grid-cols-12 items-stretch">
                
                {/* LEFT (7 COLS): DIGITAL VIP MEMBERSHIP RECEIPT CARD */}
                <div className="lg:col-span-7 flex flex-col rounded-[26px] border border-blue-100/90 bg-white/95 shadow-[0_16px_36px_rgba(37,99,235,0.06)] backdrop-blur-2xl overflow-hidden">
                  
                  {/* Top VIP Pass Header */}
                  <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-700 text-white relative overflow-hidden flex items-center justify-between">
                    <div className="relative z-10 flex items-center gap-2.5">
                      <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/20 border border-white/30 backdrop-blur-md">
                        <Crown size={20} className="text-amber-300 fill-amber-300" />
                      </div>
                      <div>
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-200 block">
                          Biên Lai Xác Nhận Điện Tử
                        </span>
                        <h3 className="text-base font-black text-white">Thẻ Hội Viên VIP JP Forus</h3>
                      </div>
                    </div>

                    <div className="relative z-10 text-right">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/20 text-[11px] font-black border border-white/25">
                        <BadgeCheck size={13} className="text-emerald-300" />
                        <span>Đã Xác Thực</span>
                      </span>
                    </div>
                  </div>

                  {/* Receipt Items Breakdown (With Registration & Expiry Dates) */}
                  <div className="p-4 sm:p-5 space-y-2.5 flex-1">
                    
                    {/* Course name */}
                    <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-100 text-emerald-700 shrink-0">
                          <Crown size={16} />
                        </div>
                        <div className="min-w-0">
                          <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">Gói Khóa Học</span>
                          <span className="text-xs sm:text-sm font-black text-slate-900 truncate block">{planBadge}</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 shrink-0">
                        HẠN 2 THÁNG
                      </span>
                    </div>

                    {/* Paid amount */}
                    <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-2.5">
                        <div className="grid h-8 w-8 place-items-center rounded-lg bg-blue-100 text-blue-700 shrink-0">
                          <Banknote size={16} />
                        </div>
                        <div>
                          <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">Số Tiền Đã Thanh Toán</span>
                          <span className="text-sm sm:text-base font-black text-emerald-600">{formatCurrency(order.amount)}</span>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-slate-500">Đã thanh toán đủ 100%</span>
                    </div>

                    {/* Order code */}
                    <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="grid h-8 w-8 place-items-center rounded-lg bg-purple-100 text-purple-700 shrink-0">
                          <ReceiptText size={16} />
                        </div>
                        <div className="min-w-0">
                          <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">Mã Đơn Hàng</span>
                          <span className="text-xs sm:text-sm font-black text-slate-900 font-mono truncate block">{order.orderCode}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => copyText('receiptOrderCode', order.orderCode)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-600 text-[11px] font-black shadow-xs hover:bg-slate-50 transition-colors cursor-pointer shrink-0"
                      >
                        {copiedKey === 'receiptOrderCode' ? <CheckCircle2 size={12} className="text-emerald-600" /> : <Clipboard size={12} />}
                        <span>{copiedKey === 'receiptOrderCode' ? 'Đã chép' : 'Sao chép'}</span>
                      </button>
                    </div>

                    {/* Registration Date (Ngày đăng ký) */}
                    <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-2.5">
                        <div className="grid h-8 w-8 place-items-center rounded-lg bg-amber-100 text-amber-700 shrink-0">
                          <Calendar size={16} />
                        </div>
                        <div>
                          <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">Ngày Đăng Ký (Bắt Đầu)</span>
                          <span className="text-xs sm:text-sm font-black text-slate-900">{registrationDateFormatted}</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        Đã kích hoạt
                      </span>
                    </div>

                    {/* Expiration Date (Ngày đến hạn 2 tháng) */}
                    <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-amber-50/70 border border-amber-200/80">
                      <div className="flex items-center gap-2.5">
                        <div className="grid h-8 w-8 place-items-center rounded-lg bg-amber-500 text-white shrink-0 shadow-xs">
                          <Hourglass size={16} />
                        </div>
                        <div>
                          <span className="text-[9px] font-black uppercase tracking-wider text-amber-700 block">Ngày Đến Hạn (Thời Hạn 2 Tháng)</span>
                          <span className="text-xs sm:text-sm font-black text-amber-900 font-mono">{expiryDateFormatted}</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-black text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md border border-amber-300">
                        60 ngày
                      </span>
                    </div>

                  </div>
                </div>

                {/* RIGHT (5 COLS): UNLOCKED PRIVILEGES & CALL TO ACTION */}
                <div className="lg:col-span-5 flex flex-col justify-between rounded-[26px] border border-blue-100/90 bg-white/95 p-4 sm:p-5 shadow-[0_16px_36px_rgba(37,99,235,0.06)] backdrop-blur-2xl space-y-4">
                  
                  {/* Mascot & Privileges Header */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[9px] font-black uppercase tracking-wider text-emerald-600 block">
                          Đặc Quyền Kích Hoạt
                        </span>
                        <h4 className="text-base font-black text-slate-900">Quyền Lợi Gói 2 Tháng</h4>
                      </div>

                      <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center overflow-hidden">
                        <div className="scale-60 -mt-1">
                          <JapaneseMascot state="success" showSpeechBubble={false} />
                        </div>
                      </div>
                    </div>

                    {/* 4 Feature Items */}
                    <div className="space-y-2">
                      <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100">
                        <div className="grid h-6 w-6 place-items-center rounded-lg bg-emerald-500 text-white shrink-0 shadow-xs">
                          <BookOpen size={13} />
                        </div>
                        <div>
                          <p className="text-xs font-black text-slate-900">Mở Khóa Toàn Bộ Bài Học</p>
                          <p className="text-[10px] font-semibold text-slate-500">Giáo trình Minna no Nihongo & JPD113 / JPD123</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-blue-50/60 border border-blue-100">
                        <div className="grid h-6 w-6 place-items-center rounded-lg bg-blue-600 text-white shrink-0 shadow-xs">
                          <Mic size={13} />
                        </div>
                        <div>
                          <p className="text-xs font-black text-slate-900">Phòng Luyện Nói AI Shadowing 1-1</p>
                          <p className="text-[10px] font-semibold text-slate-500">Chấm điểm phát âm chuẩn giọng Tokyo 24/7</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-purple-50/60 border border-purple-100">
                        <div className="grid h-6 w-6 place-items-center rounded-lg bg-purple-600 text-white shrink-0 shadow-xs">
                          <Zap size={13} />
                        </div>
                        <div>
                          <p className="text-xs font-black text-slate-900">Kho Hán Tự & Trò Chơi Ôn Tập</p>
                          <p className="text-[10px] font-semibold text-slate-500">Flashcard thông minh, Quiz & WordFall Game</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-amber-50/60 border border-amber-100">
                        <div className="grid h-6 w-6 place-items-center rounded-lg bg-amber-500 text-white shrink-0 shadow-xs">
                          <Clock size={13} />
                        </div>
                        <div>
                          <p className="text-xs font-black text-slate-900">Thời Hạn Sử Dụng 2 Tháng (60 Ngày)</p>
                          <p className="text-[10px] font-semibold text-slate-500">Tự động đồng bộ tiến độ trên điện thoại & máy tính</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Primary Action Buttons */}
                  <div className="space-y-2 pt-1">
                    <motion.button
                      onClick={() => navigate(targetCourseUrl)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 py-3.5 px-5 text-xs sm:text-sm font-black text-white shadow-md shadow-emerald-500/25 hover:from-emerald-700 hover:to-teal-700 transition"
                    >
                      <LockOpen size={16} strokeWidth={2.4} />
                      <span>VÀO HỌC NGAY BÂY GIỜ</span>
                      <ArrowRight size={16} strokeWidth={2.4} />
                    </motion.button>

                    <button
                      onClick={() => navigate('/')}
                      className="w-full inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white py-2.5 px-3 text-[11px] font-black text-slate-700 shadow-xs hover:bg-slate-50 transition"
                    >
                      <span>Về Trang Chủ Khóa Học</span>
                    </button>
                  </div>

                </div>

              </div>

            </motion.div>
          ) : (
            /* ===================================================================== */
            /* 💳 3-COLUMN PENDING CHECKOUT INTERFACE */
            /* ===================================================================== */
            <motion.div
              key="checkout-pending-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid gap-4 sm:gap-5 lg:grid-cols-12 items-start"
            >
              {/* ------------------------------------------------------------------- */}
              {/* COLUMN 1 (4 COLS): LUXURY VIP MEMBERSHIP PASS TICKET */}
              {/* ------------------------------------------------------------------- */}
              <aside className="lg:col-span-4 relative flex flex-col rounded-[26px] border border-blue-100/90 bg-white/90 shadow-[0_16px_36px_rgba(37,99,235,0.06)] backdrop-blur-2xl overflow-hidden">
                {/* Top Sapphire Ticket Card */}
                <div className="relative p-5 bg-gradient-to-br from-blue-600 via-sky-600 to-indigo-700 text-white overflow-hidden rounded-b-[24px] shadow-md shadow-blue-600/20">
                  {/* Background Glows & Patterns */}
                  <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/15 blur-xl" />
                  <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-cyan-400/20 blur-xl" />
                  <div className="pointer-events-none absolute bottom-1 right-2 text-7xl font-black text-white/[0.07] select-none font-jp">
                    極
                  </div>

                  {/* VIP Badge */}
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-0.5 text-[11px] font-black tracking-wide backdrop-blur-md border border-white/25">
                      <Crown size={13} className="text-amber-300 fill-amber-300" />
                      <span>{planBadge}</span>
                    </div>
                  </div>

                  {/* Header Text */}
                  <div className="mt-4 space-y-0.5">
                    <p className="text-[11px] font-bold text-white/80 uppercase tracking-wider">Mở khóa nội dung</p>
                    <h2 className="text-xl sm:text-2xl font-black leading-tight tracking-tight text-white">
                      Mở Khóa Toàn Diện Khóa Học
                    </h2>
                  </div>

                  {/* Huge Price Tag */}
                  <div className="mt-4 pt-3.5 border-t border-white/15">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/70 block">
                      Số tiền thanh toán (Hạn 2 Tháng)
                    </span>
                    <div className="mt-0.5 flex items-baseline gap-2">
                      <span className="text-3xl sm:text-[2.2rem] font-black tracking-tight text-white drop-shadow-xs">
                        {formatCurrency(order.amount)}
                      </span>
                      <span className="text-[10px] font-black text-emerald-300 uppercase tracking-widest bg-emerald-500/25 px-1.5 py-0.5 rounded">
                        Giá Gốc
                      </span>
                    </div>
                  </div>

                  {/* Digital Countdown Timer Widget */}
                  <div className="mt-4 rounded-xl bg-black/20 p-3 border border-white/15 backdrop-blur-md">
                    <div className="flex items-center justify-between text-[11px] font-black text-white/80 mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <Clock size={13} className="text-amber-300 animate-pulse" />
                        Thời gian giữ mã QR:
                      </span>
                      <span className="font-mono text-amber-300 tracking-wider font-black">{formattedTime}</span>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="w-full h-1.5 rounded-full bg-white/20 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-amber-300 via-emerald-300 to-cyan-300"
                        style={{ width: `${100 - paymentProgress}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom Ticket Details & Features */}
                <div className="p-4 sm:p-5 space-y-3">
                  {/* Order Code Pill with Quick Copy */}
                  <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">Mã đơn hàng</span>
                      <span className="text-xs font-black text-slate-800 font-mono tracking-tight">{compactOrderCode(order.orderCode)}</span>
                    </div>
                    <button
                      onClick={() => copyText('orderCode', order.orderCode)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-blue-200 text-blue-600 text-[11px] font-black shadow-xs hover:bg-blue-50 transition-colors cursor-pointer"
                    >
                      {copiedKey === 'orderCode' ? <CheckCircle2 size={12} className="text-emerald-600" /> : <Clipboard size={12} />}
                      <span>{copiedKey === 'orderCode' ? 'Đã chép' : 'Sao chép'}</span>
                    </button>
                  </div>

                  {/* VIP Perks */}
                  <div className="space-y-2 pt-0.5">
                    <div className="flex items-center gap-2.5 text-[11px] font-bold text-slate-600">
                      <div className="grid h-5 w-5 place-items-center rounded-md bg-emerald-100 text-emerald-700 shrink-0">
                        <Zap size={12} strokeWidth={2.5} />
                      </div>
                      <span>Kích hoạt tự động ngay khi chuyển khoản</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-[11px] font-bold text-slate-600">
                      <div className="grid h-5 w-5 place-items-center rounded-md bg-blue-100 text-blue-700 shrink-0">
                        <BadgeCheck size={12} strokeWidth={2.5} />
                      </div>
                      <span>Mở khóa toàn bộ bài học & bài tập tương tác</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-[11px] font-bold text-slate-600">
                      <div className="grid h-5 w-5 place-items-center rounded-md bg-indigo-100 text-indigo-700 shrink-0">
                        <Sparkles size={12} strokeWidth={2.5} />
                      </div>
                      <span>Hạn dùng 2 tháng (60 ngày) trên mọi thiết bị</span>
                    </div>
                  </div>
                </div>
              </aside>

              {/* ------------------------------------------------------------------- */}
              {/* COLUMN 2 (4 COLS): CRYSTAL QR CODE SCANNING STATION & OFFICIAL VIETQR */}
              {/* ------------------------------------------------------------------- */}
              <main className="lg:col-span-4 flex flex-col items-center rounded-[26px] border border-blue-100/90 bg-white/95 p-5 shadow-[0_16px_36px_rgba(37,99,235,0.06)] backdrop-blur-2xl text-center space-y-3.5 relative">
                {/* Header with Simple VietQR Badge */}
                <div className="space-y-1">
                  <div className="inline-block">
                    <VietQRBadge />
                  </div>
                  <h2 className="text-base font-black text-slate-900">Quét Mã Để Thanh Toán</h2>
                  <p className="text-[11px] font-semibold text-slate-500 max-w-[240px] mx-auto">
                    Mở ứng dụng ngân hàng hoặc ví điện tử bất kỳ quét mã QR bên dưới
                  </p>
                </div>

                {/* QR Cyber Frame Box with Laser Scanning Animation */}
                <div className="relative mx-auto w-full max-w-[250px] aspect-square rounded-[22px] border-2 border-blue-100 bg-gradient-to-b from-slate-50 via-white to-blue-50/40 p-3 shadow-inner flex items-center justify-center group overflow-hidden">
                  
                  {/* Cyber Cyan Neon Corner Markers */}
                  <span className="absolute left-2.5 top-2.5 h-5 w-5 rounded-tl-lg border-l-[3px] border-t-[3px] border-blue-600" />
                  <span className="absolute right-2.5 top-2.5 h-5 w-5 rounded-tr-lg border-r-[3px] border-t-[3px] border-cyan-400" />
                  <span className="absolute bottom-2.5 left-2.5 h-5 w-5 rounded-bl-lg border-b-[3px] border-l-[3px] border-cyan-400" />
                  <span className="absolute bottom-2.5 right-2.5 h-5 w-5 rounded-br-lg border-b-[3px] border-r-[3px] border-blue-600" />

                  {/* Real QR Code Image */}
                  {order.qrImageUrl ? (
                    <div className="relative w-full h-full rounded-xl bg-white p-1 flex items-center justify-center shadow-xs">
                      <img
                        src={order.qrImageUrl}
                        alt="VietQR Thanh toán"
                        className="w-full h-full object-contain rounded-lg"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-3 text-slate-400">
                      <QrCode size={56} className="text-blue-500 mb-1.5" />
                      <p className="text-[11px] font-bold">Chưa cấu hình mã QR</p>
                    </div>
                  )}

                  {/* Animated Laser Scanning Line */}
                  <motion.div
                    className="absolute inset-x-3.5 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_10px_rgba(6,182,212,0.8)] z-20 pointer-events-none"
                    animate={{
                      top: ['10%', '90%', '10%'],
                      opacity: [0.6, 1, 0.6]
                    }}
                    transition={{
                      duration: 2.8,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  />
                </div>

                {/* Quick Actions Under QR */}
                <div className="w-full grid grid-cols-2 gap-2 pt-0.5">
                  <motion.button
                    onClick={downloadQR}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-1 py-2 px-2.5 rounded-xl border border-blue-200 bg-blue-50/80 text-blue-700 text-[11px] font-black shadow-xs hover:bg-blue-100 transition-colors cursor-pointer"
                  >
                    <Download size={13} />
                    <span>Lưu mã QR</span>
                  </motion.button>

                  <motion.button
                    onClick={() => copyText('amount', String(order.amount))}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-1 py-2 px-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-[11px] font-black shadow-xs hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    {copiedKey === 'amount' ? <CheckCircle2 size={13} className="text-emerald-600" /> : <Clipboard size={13} />}
                    <span>{copiedKey === 'amount' ? 'Đã sao chép' : 'Chép số tiền'}</span>
                  </motion.button>
                </div>

                {/* Info Pills */}
                <div className="w-full grid grid-cols-2 gap-2 text-left pt-1.5 border-t border-slate-100">
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-[9px] font-black uppercase text-slate-400 block">Cổng thanh toán</span>
                    <span className="text-[11px] font-black text-slate-800">PayOS VietQR</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-[9px] font-black uppercase text-slate-400 block">Tự động kiểm tra</span>
                    <span className="text-[11px] font-black text-emerald-600 flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                      Mỗi 5 giây
                    </span>
                  </div>
                </div>
              </main>

              {/* ------------------------------------------------------------------- */}
              {/* COLUMN 3 (4 COLS): BANK TRANSFER DRAWER & LIVE STATUS RADAR */}
              {/* ------------------------------------------------------------------- */}
              <aside className="lg:col-span-4 space-y-3.5">
                {/* Bank Transfer Details Cards */}
                <div className="rounded-[26px] border border-blue-100/90 bg-white/95 p-5 shadow-[0_16px_36px_rgba(37,99,235,0.06)] backdrop-blur-2xl">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="flex items-center gap-1.5 text-sm font-black text-slate-900">
                      <Landmark className="text-blue-600" size={17} />
                      <span>Thông Tin Chuyển Khoản</span>
                    </h3>
                    <span className="text-[9px] font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      Chính xác 100%
                    </span>
                  </div>

                  <div className="space-y-2">
                    {transferRows.map((row) => {
                      const Icon = row.icon;
                      const isCopied = copiedKey === row.label;

                      return (
                        <div
                          key={row.label}
                          className={`group flex items-center justify-between gap-2.5 p-2.5 rounded-xl border transition-all duration-200 ${
                            row.isCode 
                              ? 'bg-amber-50/60 border-amber-200/80 hover:bg-amber-50' 
                              : row.isHighlight 
                                ? 'bg-blue-50/50 border-blue-200/80 hover:bg-blue-50' 
                                : 'bg-slate-50/80 border-slate-100 hover:border-blue-200 hover:bg-white'
                          }`}
                        >
                          <div className="flex min-w-0 items-center gap-2.5">
                            <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg shadow-xs ${
                              row.isCode 
                                ? 'bg-amber-100 text-amber-700' 
                                : row.isHighlight 
                                  ? 'bg-blue-600 text-white' 
                                  : 'bg-white text-blue-600 border border-slate-100'
                            }`}>
                              <Icon size={13} />
                            </span>
                            <div className="min-w-0">
                              <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">{row.label}</p>
                              <p className={`truncate text-xs font-black ${
                                row.isCode ? 'text-amber-900 font-mono tracking-wider' : row.isHighlight ? 'text-blue-700' : 'text-slate-800'
                              }`}>
                                {row.displayValue}
                              </p>
                            </div>
                          </div>

                          <motion.button
                            onClick={() => copyText(row.label, row.value)}
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.92 }}
                            className={`grid h-7 w-7 shrink-0 cursor-pointer place-items-center rounded-lg shadow-xs transition-colors ${
                              isCopied 
                                ? 'bg-emerald-500 text-white' 
                                : 'bg-white border border-slate-200 text-slate-600 hover:bg-blue-600 hover:text-white hover:border-blue-600'
                            }`}
                            title={`Sao chép ${row.label}`}
                          >
                            {isCopied ? <CheckCircle2 size={13} /> : <Clipboard size={12} />}
                          </motion.button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Live Auto-Check Radar & Action Dock */}
                <div className="rounded-[26px] border border-blue-100/90 bg-white/95 p-5 shadow-[0_16px_36px_rgba(37,99,235,0.06)] backdrop-blur-2xl">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2.5">
                      <div className="relative grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                        <Radio size={18} className="animate-pulse" />
                        <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-white animate-ping" />
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-slate-900">Đang Tự Động Kiểm Tra</h4>
                        <p className="text-[11px] font-semibold text-slate-500 leading-relaxed mt-0.5">
                          Hệ thống đối soát đang chờ tín hiệu từ ngân hàng. Giữ nguyên trang để tự động mở khóa.
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="grid gap-2 pt-1">
                      {order.checkoutUrl && (
                        <motion.a
                          href={order.checkoutUrl}
                          target="_blank"
                          rel="noreferrer"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 via-sky-600 to-indigo-600 py-2.5 px-3.5 text-[11px] font-black text-white shadow-md shadow-blue-500/25 hover:from-blue-700 hover:to-indigo-700 transition"
                        >
                          <ExternalLink size={14} />
                          <span>Mở Cổng PayOS Trực Tiếp</span>
                        </motion.a>
                      )}

                      <motion.button
                        onClick={confirmDemoPayment}
                        disabled={isConfirming}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-900 hover:bg-slate-800 py-2.5 px-3.5 text-[11px] font-black text-white shadow-xs transition disabled:opacity-60 disabled:cursor-wait"
                      >
                        {isConfirming ? <Loader2 className="animate-spin" size={13} /> : <BadgeCheck size={13} />}
                        <span>Xác nhận Demo (Dành cho Test)</span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </aside>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Security Badges */}
        <footer className="pt-1 text-center text-[11px] font-bold text-slate-400 flex flex-wrap items-center justify-center gap-3">
          <span className="flex items-center gap-1">
            <ShieldCheck size={13} className="text-blue-500" />
            Hệ thống thanh toán bảo mật tiêu chuẩn ngân hàng
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <RefreshCw size={12} className="text-emerald-500" />
            Tự động kích hoạt khóa học trong 30s
          </span>
        </footer>

      </div>

      {/* Global Error Toast */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="fixed bottom-5 right-5 z-50 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-[11px] font-black text-rose-600 shadow-xl"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
