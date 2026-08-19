import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail } from 'lucide-react';
import { AuthLayout } from './AuthLayout';
import { authApi } from '../../lib/authApi';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setMessage('');
    setResetToken('');
    setIsSubmitting(true);

    try {
      const response = await authApi.forgotPassword(email);
      setMessage(response.message);
      setResetToken(response.resetToken ?? '');
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : 'Không thể tạo yêu cầu đặt lại mật khẩu.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout eyebrow="Bảo mật" title="Đặt lại mật khẩu" subtitle="Nhập email để tạo liên kết đổi mật khẩu. Bản dev sẽ hiện token để test nhanh.">
      <form onSubmit={submit} className="space-y-4">
        <label className="block">
          <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-500">Email</span>
          <span className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-100">
            <Mail size={20} className="text-blue-500" />
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full bg-transparent text-sm font-bold text-slate-800 outline-none"
              placeholder="student@jp-forus.com"
              required
            />
          </span>
        </label>

        {message && <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-600">{message}</p>}
        {resetToken && (
          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm font-bold text-blue-700">
            Dev reset token:
            <code className="mt-2 block break-all rounded-xl bg-white p-3 text-xs text-slate-700">{resetToken}</code>
            <Link to={`/reset-password?token=${encodeURIComponent(resetToken)}`} className="mt-3 inline-block text-blue-600 hover:text-blue-700">
              Mở trang reset
            </Link>
          </div>
        )}
        {error && <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-bold text-rose-500">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-2xl bg-blue-600 px-5 py-4 text-base font-black text-white shadow-lg shadow-blue-500/25 transition hover:-translate-y-0.5 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? 'Đang gửi...' : 'Tạo yêu cầu đặt lại'}
        </button>

        <Link to="/login" className="flex items-center justify-center gap-2 text-sm font-black text-slate-500 hover:text-blue-600">
          <ArrowLeft size={18} />
          Quay lại đăng nhập
        </Link>
      </form>
    </AuthLayout>
  );
};
