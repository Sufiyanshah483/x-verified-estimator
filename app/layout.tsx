import type { Metadata } from 'next';
import './globals.css';
import { Inter, Outfit } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
    title: 'X Verified Estimator - Check Your Verified Reach',
    description: 'Estimate your verified impressions, engagements, and expected revenue payload on X.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🥪</text></svg>" />
            </head>
            <body className={`${inter.variable} ${outfit.variable} font-sans selection:bg-blue-500/30 selection:text-white`}>
                {children}
            </body>
        </html>
    );
}

