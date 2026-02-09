import Link from 'next/link';
import { Logo } from '@/components/ui/logo';

export function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b-4 border-black bg-[#fdfdfd] py-2">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <Link href="/" className="flex items-center">
                    <Logo />
                </Link>

                <div className="hidden md:block">
                    <span className="text-sm font-black text-black uppercase tracking-tighter bg-[#fde047] border-2 border-black px-3 py-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        Creator Intelligence
                    </span>
                </div>
            </div>
        </header>
    );
}
