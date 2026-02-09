export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-black/40 py-8 backdrop-blur-md">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row text-sm text-gray-400">
                    <p>© {new Date().getFullYear()} X Verified Estimator. All rights reserved.</p>
                    <div className="flex gap-6">
                        <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
                        <span className="hover:text-white cursor-pointer transition-colors">Terms</span>
                    </div>
                </div>
                <div className="mt-8 text-center text-xs text-gray-500 max-w-2xl mx-auto">
                    <p>
                        Disclaimer: This tool provides broad <strong>estimates</strong> based on heuristic modeling and typical engagement patterns.
                        It is not affiliated with X (Twitter) and cannot access private analytics data.
                        Results are for informational purposes only and are not guaranteed to be accurate.
                        Use at your own discretion.
                    </p>
                </div>
            </div>
        </footer>
    );
}
