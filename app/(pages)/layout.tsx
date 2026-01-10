import { Metadata } from 'next';
import React from 'react';
import { AuthProvider } from '../contexts/useAuth';

interface DefaultLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Sun Pleats',
  description: 'The ultimate collection of design-agnostic, flexible and accessible React UI Components.'
};

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <AuthProvider>
      <React.Fragment>{children}</React.Fragment>
    </AuthProvider>
  );
}
