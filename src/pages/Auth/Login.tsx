import { useCallback, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Lock, Mail } from 'lucide-react';
import { AuthLayout } from './AuthLayout';
import { GoogleSignInButton } from './GoogleSignInButton';
import { useAuth } from '../../context/AuthContext';

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
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const redirectTo = (location.state as RouteState | null)?.from?.pathname ?? '/';

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await login({ email, password });
      navigate(redirectTo, { replace: true });
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : 'Không thể đăng nhập.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogle = useCallback(async (credential: string) => {
    setError('');
    setIsSubmitting(true);
    try {
      await loginWithGoogle(credential);
      navigate(redirectTo, { replace: true });
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : 'Không thể đăng nhập Google.');
    } finally {
      setIsSubmitting(false);
    }
  }, [loginWithGoogle, navigate, redirectTo]);

  return (
    <AuthLayout
      mode="login"
      eyebrow="Đăng nhập"
      title="Chào mừng quay lại"
      subtitle="Tiếp tục bài học của bạn với nhịp học nhẹ, sạch và tập trung."
    >
      <form onSubmit={submit} className="space-y-4">
        <label className="block">
          <span className="mb-2 block text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">Email</span>
          <span className="flex items-center gap-3 rounded-[22px] border border-orange-100 bg-white/86 px-4 py-3.5 shadow-sm transition focus-within:border-orange-300 focus-within:ring-4 focus-within:ring-orange-100">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-orange-50 text-orange-500">
              <Mail size={19} />
            </span>
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

        <label className="block">
          <span className="mb-2 block text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">Mật khẩu</span>
          <span className="flex items-center gap-3 rounded-[22px] border border-rose-100 bg-white/86 px-4 py-3.5 shadow-sm transition focus-within:border-rose-300 focus-within:ring-4 focus-within:ring-rose-100">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-rose-50 text-rose-400">
              <Lock size={19} />
            </span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full bg-transparent text-sm font-bold text-slate-800 outline-none"
              placeholder="Nhập mật khẩu"
              required
            />
          </span>
        </label>

        <div className="flex items-center justify-between text-sm font-bold">
          <Link to="/forgot-password" className="text-slate-500 transition hover:text-orange-500">Quên mật khẩu?</Link>
          <Link to="/register" className="text-orange-500 transition hover:text-rose-500">Tạo tài khoản</Link>
        </div>

        {error && <p className="rounded-[22px] bg-rose-50 px-4 py-3 text-sm font-bold text-rose-500">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-3 rounded-[24px] bg-gradient-to-r from-orange-400 via-rose-400 to-sky-400 px-5 py-4 text-base font-black text-white shadow-lg shadow-orange-400/22 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-rose-400/24 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
          <ArrowRight size={20} />
        </button>
      </form>

      <div className="my-6 flex items-center gap-4 text-xs font-black uppercase tracking-[0.18em] text-slate-300">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent to-slate-200" />
        Hoặc
        <span className="h-px flex-1 bg-gradient-to-l from-transparent to-slate-200" />
      </div>

      <GoogleSignInButton label="signin_with" onCredential={handleGoogle} />
    </AuthLayout>
  );
};
