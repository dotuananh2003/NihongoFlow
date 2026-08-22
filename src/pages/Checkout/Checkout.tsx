import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  BadgeCheck,
  Banknote,
  CheckCircle2,
  ExternalLink,
  Clipboard,
  Clock3,
  Crown,
  Loader2,
  LockOpen,
  QrCode,
  ShieldCheck,
} from 'lucide-react';
import { paymentApi, type PaymentEntitlements, type PaymentOrder } from '../../lib/paymentApi';

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(value);

const statusText: Record<PaymentOrder['status'], string> = {
  pending: 'Đang chờ chuyển khoản',
  paid: 'Thanh toán thành công',
  expired: 'Đơn đã hết hạn',
  cancelled: 'Đơn đã hủy',
};

export const Checkout = () => {
  const { orderCode } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<PaymentOrder | null>(null);
  const [entitlements, setEntitlements] = useState<PaymentEntitlements | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isConfirming, setIsConfirming] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const paymentProgress = Math.min(100, Math.round((elapsedSeconds / 120) * 100));
  const isPaid = order?.status === 'paid';
  const hasUnlockedContent = Boolean(order && entitlements?.activePlans.includes(order.planId));

  const planTone = useMemo(() => {
    if (order?.planId === 'combo') return 'from-blue-600 via-sky-500 to-cyan-400';
    if (order?.planId === 'jpd113') return 'from-rose-500 via-pink-500 to-amber-400';
    return 'from-blue-600 via-indigo-500 to-violet-500';
  }, [order?.planId]);

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
      setElapsedSeconds(value => Math.min(120, value + 1));
    }, 1000);

    return () => {
      mounted = false;
      window.clearInterval(pollTimer);
      window.clearInterval(secondTimer);
    };
  }, [orderCode]);

  const copyText = async (text: string) => {
    await navigator.clipboard?.writeText(text);
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
      <div className="grid min-h-[calc(100vh-120px)] place-items-center">
        <div className="flex items-center gap-3 rounded-full border border-white/80 bg-white/90 px-5 py-3 text-sm font-black text-slate-600 shadow-lg">
          <Loader2 className="animate-spin text-blue-600" size={20} />
          Đang chuẩn bị thanh toán
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="mx-auto grid min-h-[calc(100vh-120px)] max-w-xl place-items-center px-4">
        <div className="rounded-[2rem] border border-rose-100 bg-white/92 p-6 text-center shadow-xl">
          <p className="text-lg font-black text-slate-900">Không tìm thấy đơn thanh toán</p>
          <p className="mt-2 text-sm font-semibold text-slate-500">{error || 'Vui lòng tạo đơn mới từ mục Nâng Cấp.'}</p>
          <button onClick={() => navigate(-1)} className="mt-5 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white">
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 pb-14 pt-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/90 px-4 py-2.5 text-sm font-black text-slate-600 shadow-sm transition hover:bg-white"
        >
          <ArrowLeft size={17} />
          Quay lại
        </button>
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/90 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-blue-600 shadow-sm">
          <ShieldCheck size={15} />
          Thanh toán an toàn
        </div>
      </div>

      <section className="relative overflow-hidden rounded-[2.2rem] border border-white/80 bg-white/90 p-5 shadow-[0_24px_70px_rgba(15,23,42,0.12)] backdrop-blur-2xl md:p-7">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(59,130,246,0.07)_1px,transparent_1px),linear-gradient(rgba(59,130,246,0.07)_1px,transparent_1px)] bg-[size:34px_34px]" />
        <div className="relative grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
          <div className={`overflow-hidden rounded-[2rem] bg-gradient-to-br ${planTone} p-5 text-white shadow-xl`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/18 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.16em]">
                  <Crown size={15} />
                  {order.planName}
                </div>
                <h1 className="mt-5 text-4xl font-black leading-tight tracking-normal">
                  Quét QR để mở khóa bài học
                </h1>
                <p className="mt-3 max-w-md text-sm font-semibold leading-6 text-white/82">
                  Hệ thống sẽ tự kiểm tra giao dịch trong khoảng 30 giây đến 2 phút. Thanh toán PayOS thật sẽ tự mở khóa bài học.
                </p>
              </div>
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/18">
                <QrCode size={28} />
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white/16 p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/68">Số tiền</p>
                <p className="mt-1 text-2xl font-black">{formatCurrency(order.amount)}</p>
              </div>
              <div className="rounded-2xl bg-white/16 p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/68">Mã đơn</p>
                <p className="mt-1 truncate text-2xl font-black">{order.orderCode}</p>
              </div>
            </div>

            <div className="mt-5 rounded-2xl bg-white/14 p-4">
              <div className="mb-2 flex items-center justify-between text-xs font-black uppercase tracking-[0.16em] text-white/72">
                <span>{statusText[order.status]}</span>
                <span>{paymentProgress}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/18">
                <div className="h-full rounded-full bg-white transition-all duration-500" style={{ width: `${isPaid ? 100 : paymentProgress}%` }} />
              </div>
            </div>
          </div>

          <div className="grid gap-5 xl:grid-cols-[320px_1fr]">
            <div className="rounded-[2rem] border border-slate-100 bg-white/92 p-4 text-center shadow-sm">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.16em] text-slate-500">
                <QrCode size={14} />
                VietQR
              </div>
              <div className="mx-auto grid aspect-square w-full max-w-[250px] place-items-center rounded-[1.6rem] border border-slate-100 bg-white p-3 shadow-inner">
                {order.qrImageUrl ? (
                  <img src={order.qrImageUrl} alt="QR chuyển khoản" className="h-full w-full object-contain" />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center rounded-[1.2rem] bg-slate-50 px-5 text-slate-500">
                    <QrCode size={54} className="mb-4 text-blue-500" />
                    <p className="text-sm font-black">Chưa cấu hình tài khoản nhận tiền</p>
                    <p className="mt-2 text-xs font-semibold leading-5">Thêm `PAYMENT_BANK_BIN` và `PAYMENT_ACCOUNT_NUMBER` vào file `.env`.</p>
                  </div>
                )}
              </div>
              <p className="mt-3 text-xs font-bold leading-5 text-slate-500">
                Nội dung chuyển khoản phải đúng mã đơn để hệ thống đối soát.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="rounded-[2rem] border border-slate-100 bg-white/88 p-4 shadow-sm">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-black text-slate-950">
                  <Banknote className="text-blue-600" size={22} />
                  Thông tin chuyển khoản
                </h2>
                {[
                  ['Ngân hàng', order.bankBin || 'Chưa cấu hình'],
                  ['Số tài khoản', order.accountNumber || 'Chưa cấu hình'],
                  ['Tên tài khoản', order.accountName || 'JP FORUS'],
                  ['Số tiền', formatCurrency(order.amount)],
                  ['Nội dung', order.transferContent],
                ].map(([label, value]) => (
                  <div key={label} className="mb-2 flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">{label}</p>
                      <p className="mt-1 text-sm font-black text-slate-800">{value}</p>
                    </div>
                    <button
                      onClick={() => copyText(value)}
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-blue-600 shadow-sm transition hover:bg-blue-600 hover:text-white"
                      aria-label={`Sao chép ${label}`}
                    >
                      <Clipboard size={16} />
                    </button>
                  </div>
                ))}
              </div>

              <div className={`rounded-[2rem] border p-4 shadow-sm ${isPaid ? 'border-emerald-100 bg-emerald-50/90' : 'border-blue-100 bg-blue-50/80'}`}>
                <div className="flex items-center gap-3">
                  <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${isPaid ? 'bg-emerald-500 text-white' : 'bg-white text-blue-600'}`}>
                    {isPaid ? <CheckCircle2 size={24} /> : <Clock3 size={24} />}
                  </div>
                  <div>
                    <p className={`text-base font-black ${isPaid ? 'text-emerald-700' : 'text-slate-900'}`}>
                      {isPaid ? (hasUnlockedContent ? 'Đã mở khóa thành công' : 'Thanh toán demo thành công') : 'Đang tự động kiểm tra giao dịch'}
                    </p>
                    <p className="mt-1 text-sm font-semibold leading-5 text-slate-500">
                      {isPaid
                        ? hasUnlockedContent
                          ? 'Bạn có thể quay lại bài học và tiếp tục học ngay.'
                          : 'Demo chỉ kiểm tra trạng thái thành công, không cấp quyền mở khóa lesson.'
                        : 'Giữ nguyên mã chuyển khoản, hệ thống sẽ cập nhật trạng thái mỗi 5 giây.'}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                {isPaid ? (
                  <button
                      onClick={() => hasUnlockedContent ? navigate('/vocabulary/jpd123') : navigate('/')}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-emerald-500/20"
                    >
                      <LockOpen size={18} />
                      {hasUnlockedContent ? 'Vào học ngay' : 'Quay lại trang chủ'}
                    </button>
                  ) : (
                    <>
                      {order.checkoutUrl && (
                        <a
                          href={order.checkoutUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5"
                        >
                          <ExternalLink size={18} />
                          Mở PayOS
                        </a>
                      )}
                      <button
                        onClick={confirmDemoPayment}
                        disabled={isConfirming}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white shadow-lg shadow-slate-900/15 transition hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60"
                      >
                        {isConfirming ? <Loader2 className="animate-spin" size={18} /> : <BadgeCheck size={18} />}
                        Xác nhận demo
                      </button>
                    </>
                  )}

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {error && (
        <div className="mt-4 rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm font-bold text-rose-500">
          {error}
        </div>
      )}
    </div>
  );
};
