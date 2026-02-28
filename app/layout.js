import './globals.css';
import Header from '@/components/Header';
import { AuthProvider } from '@/lib/auth';

export const metadata = {
  title: 'Vornix',
  description: 'Fintech SaaS platform for modern finance teams.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        <AuthProvider>
          <div className="relative min-h-screen">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(46,121,255,0.2),_transparent_40%)]" />
            <Header />
            <main className="relative mx-auto w-full max-w-7xl px-6 pb-16 pt-10 md:px-8">
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
