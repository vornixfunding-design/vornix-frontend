import Link from 'next/link';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/plans', label: 'Plans' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/dashboard/evaluation', label: 'Evaluation' },
  { href: '/dashboard/account', label: 'Account' },
  { href: '/admin', label: 'Admin' },
  { href: '/login', label: 'Login' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 md:px-8">
        <Link href="/" className="flex items-center gap-2 text-slate-100">
          <span className="h-2.5 w-2.5 rounded-full bg-brand-500" />
          <span className="text-lg font-semibold tracking-tight">Vornix</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-slate-100"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
