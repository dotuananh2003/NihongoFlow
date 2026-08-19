import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, LockKeyhole } from 'lucide-react';
import { AuthLayout } from './AuthLayout';
import { authApi } from '../../lib/authApi';

export const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState(searchParams.get('token') ?? '');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setMessage('');
    setIsSubmitting(true);

    try {
      const response = await authApi.resetPassword({ token, password });
      setMessage(response.message);
      window.setTimeout(() => navigate('/login'), 900);
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : 'Không thể đặt lại mật khẩu.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout eyebrow="Mật khẩu mới" title="Hoàn tất bảo mật" subtitle="Dán reset token và chọn mật khẩu mới cho tài khoản JP Forus.">
      <form onSubmit={submit} className="space-y-4">
        <label className="block">
          <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-500">Reset token</span>
          <textarea
            value={token}
            onChange={(event) => setToken(event.target.value)}
            className="h-28 w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-800 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
            placeholder="Dán token tại đây"
            required
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-500">Mật khẩu mới</span>
          <span className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-100">
            <LockKeyhole size={20} className="text-blue-500" />
            <input
              type="password"
              minLength={8}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full bg-transparent text-sm font-bold text-slate-800 outline-none"
              placeholder="Ít nhất 8 ký tự"
              required
            />
          </span>
        </label>

        {message && <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-600">{message}</p>}
        {error && <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-bold text-rose-500">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-2xl bg-blue-600 px-5 py-4 text-base font-black text-white shadow-lg shadow-blue-500/25 transition hover:-translate-y-0.5 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? 'Đang đổi mật khẩu...' : 'Đổi mật khẩu'}
        </button>

        <Link to="/login" className="flex items-center justify-center gap-2 text-sm font-black text-slate-500 hover:text-blue-600">
          <ArrowLeft size={18} />
          Quay lại đăng nhập
        </Link>
      </form>
    </AuthLayout>
  );
};
