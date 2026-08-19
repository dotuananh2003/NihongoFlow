import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { authApi, getStoredAccessToken, storeAccessToken } from '../lib/authApi';
import type { AuthUser } from '../lib/authApi';

type AuthContextValue = {
  user: AuthUser | null;
  accessToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  register: (input: { fullName: string; email: string; password: string }) => Promise<void>;
  login: (input: { email: string; password: string }) => Promise<void>;
  loginWithGoogle: (credential: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(() => getStoredAccessToken());
  const [isLoading, setIsLoading] = useState(true);

  const applySession = useCallback((nextUser: AuthUser, token: string) => {
    setUser(nextUser);
    setAccessToken(token);
    storeAccessToken(token);
  }, []);

  const clearSession = useCallback(() => {
    setUser(null);
    setAccessToken(null);
    storeAccessToken(null);
  }, []);

  useEffect(() => {
    let mounted = true;

    const bootstrap = async () => {
      try {
        const stored = getStoredAccessToken();
        if (stored) {
          const me = await authApi.me(stored);
          if (mounted) {
            setUser(me.user);
            setAccessToken(stored);
          }
          return;
        }

        const refreshed = await authApi.refresh();
        if (mounted) {
          applySession(refreshed.user, refreshed.accessToken);
        }
      } catch {
        if (mounted) {
          clearSession();
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    void bootstrap();

    return () => {
      mounted = false;
    };
  }, [applySession, clearSession]);

  const register = useCallback(async (input: { fullName: string; email: string; password: string }) => {
    const response = await authApi.register(input);
    applySession(response.user, response.accessToken);
  }, [applySession]);

  const login = useCallback(async (input: { email: string; password: string }) => {
    const response = await authApi.login(input);
    applySession(response.user, response.accessToken);
  }, [applySession]);

  const loginWithGoogle = useCallback(async (credential: string) => {
    const response = await authApi.loginWithGoogle(credential);
    applySession(response.user, response.accessToken);
  }, [applySession]);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } finally {
      clearSession();
    }
  }, [clearSession]);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    accessToken,
    isLoading,
    isAuthenticated: Boolean(user),
    register,
    login,
    loginWithGoogle,
    logout,
  }), [accessToken, isLoading, login, loginWithGoogle, logout, register, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
