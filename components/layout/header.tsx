import Link from 'next/link';
import { Logo } from '@/components/ui/logo';
import { Menu } from 'lucide-react';

export function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b-4 border-black bg-[#fdfdfd] py-2">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <Link href="/" className="flex items-center">
                    <Logo />
                </Link>

                <div className="hidden md:flex items-center gap-6">
                    <span className="text-sm font-black text-black uppercase tracking-tighter bg-[#fde047] border-2 border-black px-3 py-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-1px] cursor-pointer">
                        Creator Intelligence
                    </span>
                    <a href="#creator-menu" className="text-sm font-black uppercase italic border-b-2 border-black">The Menu</a>
                    <a href="#newsletter" className="text-sm font-black uppercase italic border-b-2 border-black">Pricing</a>
                </div>

                <div className="md:hidden">
                    <button className="p-2 bg-[#fde047] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                        <Menu size={24} />
                    </button>
                </div>
            </div>
        </header>
    );
}
