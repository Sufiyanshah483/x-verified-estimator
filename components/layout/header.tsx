import Link from 'next/link';
import { Logo } from '@/components/ui/logo';

export function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-lg">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <Link href="/" className="flex items-center">
                    <Logo />
                </Link>

                <div className="hidden md:block">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                        Creator Intelligence
                    </span>
                </div>
            </div>
        </header>
    );
}
