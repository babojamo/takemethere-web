import { Metadata } from 'next';
import Layout from '../../layout/layout';
import { AuthProvider } from '../contexts/useAuth';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Sun Pleats Corporation',
  description: 'The ultimate collection of design-agnostic, flexible and accessible React UI Components.',
  robots: { index: false, follow: false },
  viewport: { initialScale: 1, width: 'device-width' },
  openGraph: {
    type: 'website',
    title: 'PrimeReact Sun Pleats Corporation',
    url: 'https://sakai.primereact.org/',
    description: 'The ultimate collection of design-agnostic, flexible and accessible React UI Components.',
    images: ['https://www.primefaces.org/static/social/sakai-react.png'],
    ttl: 604800
  },
  icons: {
    icon: '/favicon.ico'
  }
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <AuthProvider>
      <Layout>{children}</Layout>
    </AuthProvider>
  );
}
