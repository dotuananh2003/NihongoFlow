import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

type GoogleSignInButtonProps = {
  label: 'signin_with' | 'signup_with';
  onCredential: (credential: string) => void;
  text?: string;
};

export const GoogleSignInButton = ({ label, onCredential, text }: GoogleSignInButtonProps) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined;

  const defaultText = label === 'signup_with' ? 'Đăng ký nhanh bằng Google' : 'Đăng nhập bằng Google';
  const buttonText = text ?? defaultText;

  useEffect(() => {
    if (!clientId || !buttonRef.current) {
      return;
    }

    const render = () => {
      if (!buttonRef.current || !window.google) {
        return;
      }

      buttonRef.current.innerHTML = '';
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: (response) => {
          if (response.credential) {
            onCredential(response.credential);
          }
        },
      });

      window.google.accounts.id.renderButton(buttonRef.current, {
        theme: 'outline',
        size: 'large',
        shape: 'pill',
        text: label,
        width: 400,
      });

      setIsReady(true);
    };

    if (window.google) {
      render();
      return;
    }

    const existingScript = document.querySelector<HTMLScriptElement>('script[src="https://accounts.google.com/gsi/client"]');
    const script = existingScript ?? document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = render;

    if (!existingScript) {
      document.head.appendChild(script);
    }

    return () => {
      script.onload = null;
    };
  }, [clientId, label, onCredential]);

  if (!clientId) {
    return (
      <div className="rounded-[22px] border border-amber-200/80 bg-amber-50/90 px-4 py-3 text-center text-xs font-bold text-amber-700 shadow-sm">
        Thêm <code className="rounded bg-amber-100 px-1.5 py-0.5 font-mono text-[11px]">VITE_GOOGLE_CLIENT_ID</code> vào <code className="font-mono">.env</code> để bật Google login.
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden rounded-[22px] group">
      {/* Custom Designed Luxury Button */}
      <motion.div
        whileHover={{ y: -1, scale: 1.01 }}
        whileTap={{ scale: 0.985 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="relative flex w-full items-center justify-center gap-3.5 rounded-[22px] border border-slate-200/90 bg-white/95 px-5 py-3.5 text-sm font-black text-slate-800 shadow-[0_4px_16px_rgba(15,23,42,0.05)] transition-all duration-200 group-hover:border-orange-300 group-hover:bg-white group-hover:shadow-[0_12px_28px_rgba(251,146,60,0.14)] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
      >
        {/* Google Multi-Color Vector Icon */}
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-xl bg-white shadow-sm ring-1 ring-slate-100 dark:bg-slate-900 dark:ring-slate-800">
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
        </span>

        {/* Text */}
        <span className="tracking-tight">{buttonText}</span>
      </motion.div>

      {/* Invisible Google GSI overlay covering 100% of the button area to trigger native popup */}
      <div
        ref={buttonRef}
        className="pointer-events-auto absolute inset-0 z-20 flex items-center justify-center opacity-0 cursor-pointer overflow-hidden [&>div]:w-full [&>div]:h-full [&_iframe]:w-full [&_iframe]:h-full [&_iframe]:min-w-full [&_iframe]:scale-[2] [&_iframe]:cursor-pointer"
        title={buttonText}
      />
    </div>
  );
};

