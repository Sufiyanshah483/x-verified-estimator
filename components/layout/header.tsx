import Link from 'next/link';
import { Github } from 'lucide-react';

export function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/20 backdrop-blur-lg">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <Link href="/" className="flex items-center space-x-2">
                    <div className="size-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 shimmer-effect" />
                    <span className="text-lg font-bold tracking-tight text-white">
                        X Verified Estimator
                    </span>
                </Link>

                <nav className="flex items-center gap-4">
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full p-2 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                    >
                        <Github className="size-5" />
                        <span className="sr-only">GitHub</span>
                    </a>
                </nav>
            </div>
        </header>
    );
}
