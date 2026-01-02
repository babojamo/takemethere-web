'use client';

// hooks/useAuth.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode, useLayoutEffect } from 'react';
import { User } from '../types/users';
import { PUBLIC_ROUTES, ROUTES } from '../constants/routes';
import { usePathname, useRouter } from 'next/navigation';
import AuthService from '../services/AuthService';
import TokenService from '../services/TokenService';
import { LayoutContext } from '@/layout/context/layoutcontext';

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string, rememberMe?: boolean) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
  login: async () => {},
  logout: () => {}
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  const { showApiError } = useContext(LayoutContext);

  useLayoutEffect(() => {
    if (!loading && ((!user && !PUBLIC_ROUTES.includes(pathname)) || (user && pathname == ROUTES.ROUTE_PATH_LOGIN))) {
      router.push('/login');
    }
  }, [user, router, loading]);

  useEffect(() => {
    const loadUser = async () => {
      if (!AuthService.isAuthenticated()) {
        setLoading(false);
        return;
      }
      setUser(TokenService.getAuthUser());
      setLoading(false);
    };

    loadUser();
  }, []);

  const login = async (username: string, password: string, rememberMe: boolean = false) => {
    try {
      setLoading(true);

      const data = await AuthService.login({ username, password });

      if (rememberMe) {
        AuthService.setCookie(username);
      }

      TokenService.setAuthToken(data.token);
      TokenService.setAuthUser(data.user);

      // Redirect to dashboard
      router.push('/');
    } catch (error: any) {
      showApiError(error, 'Failed to login');
      //  mapExternalErrorsApi(error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
    router.push('/login');
  };

  return <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>;
};

// custom hook for easy usage
export const useAuth = () => useContext(AuthContext);
