'use client';

import { PUBLIC_ROUTES, ROUTES } from '@/app/constants/routes';
// components/ProtectedRoute.js
import { usePathname, useRouter } from 'next/navigation';
import { useLayoutEffect } from 'react';

interface ProtectedRouteProps {
  children: any;
}
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const router = useRouter();
  const isAuthenticated = false;
  const pathname = usePathname();

  useLayoutEffect(() => {
    // if (!isAuthenticated && ((!isAuthenticated && !PUBLIC_ROUTES.includes(pathname)) || (isAuthenticated && pathname == ROUTES.ROUTE_PATH_LOGIN))) {
    //   router.push('/login');
    // }
  }, [isAuthenticated, router]);

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;
