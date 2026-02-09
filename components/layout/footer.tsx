export function Footer() {
    return (
        <footer className="border-t border-slate-200 bg-white/80 py-8 backdrop-blur-md">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row text-sm text-slate-500 font-medium">
                    <p>© {new Date().getFullYear()} X Verified Estimator. All rights reserved.</p>
                    <div className="flex gap-6">
                        <span className="hover:text-slate-900 cursor-pointer transition-colors">Privacy</span>
                        <span className="hover:text-slate-900 cursor-pointer transition-colors">Terms</span>
                    </div>
                </div>
                <div className="mt-8 text-center text-[10px] text-slate-400 max-w-2xl mx-auto uppercase tracking-tighter leading-relaxed">
                    <p>
                        Disclaimer: This tool provides <strong>heuristic projections</strong> based on creator correlations.
                        Not affiliated with X (Twitter). Results are for informational purposes and vary based on niche.
                    </p>
                </div>
            </div>
        </footer>
    );
}
