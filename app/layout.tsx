'use client';
import { LayoutContext, LayoutProvider } from '../layout/context/layoutcontext';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '../styles/layout/layout.scss';
import { useContext } from 'react';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const { layoutConfig } = useContext(LayoutContext);

  return (
    <html lang="en" style={{ fontSize: '15px' }} suppressHydrationWarning>
      <head>
        <link id="theme-css" href={`/themes/${layoutConfig?.theme ?? 'lara-light-blue'}/theme.css`} rel="stylesheet"></link>
      </head>
      <body>
        <PrimeReactProvider>
          <LayoutProvider>{children}</LayoutProvider>
        </PrimeReactProvider>
      </body>
    </html>
  );
}
