import type { Metadata } from 'next';
import './globals.css';
import { Inter, Outfit } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
    title: 'ImpreX AI - Check Your Verified Reach',
    description: 'Estimate your verified impressions, engagements, and expected revenue payload on X.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${inter.variable} ${outfit.variable} font-sans selection:bg-blue-500/30 selection:text-white`}>
                {children}
            </body>
        </html>
    );
}

