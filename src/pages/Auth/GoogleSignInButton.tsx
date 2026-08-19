import { useEffect, useRef, useState } from 'react';

type GoogleSignInButtonProps = {
  label: 'signin_with' | 'signup_with';
  onCredential: (credential: string) => void;
};

export const GoogleSignInButton = ({ label, onCredential }: GoogleSignInButtonProps) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined;

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
        width: 420,
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
      <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-center text-sm font-bold text-amber-700">
        Thêm VITE_GOOGLE_CLIENT_ID vào .env để bật Google login.
      </div>
    );
  }

  return (
    <div className="min-h-11">
      <div ref={buttonRef} className="flex justify-center" />
      {!isReady && (
        <div className="rounded-full border border-slate-200 bg-white px-4 py-3 text-center text-sm font-bold text-slate-400">
          Đang tải Google...
        </div>
      )}
    </div>
  );
};
