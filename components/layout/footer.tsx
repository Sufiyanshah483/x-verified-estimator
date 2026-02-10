export function Footer() {
    return (
        <footer className="border-t-4 border-black bg-white py-12">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-between gap-8 md:flex-row text-sm font-black text-black">
                    <p className="uppercase italic">© {new Date().getFullYear()} ImpreX AI. All Rights Reserved.</p>
                    <div className="flex gap-8">
                        <span className="hover:bg-[#fde047] cursor-pointer transition-all px-2 border-2 border-transparent hover:border-black uppercase">Privacy</span>
                        <span className="hover:bg-[#fde047] cursor-pointer transition-all px-2 border-2 border-transparent hover:border-black uppercase">Terms</span>
                    </div>
                </div>
                <div className="mt-12 text-center text-[10px] text-black font-black max-w-2xl mx-auto uppercase tracking-tighter leading-snug bg-[#f7f3eb] p-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rotate-[-1deg]">
                    <p>
                        Disclaimer: This tool provides <span className="underline decoration-4 decoration-[#fde047]">heuristic projections</span> based on creator correlations.
                        Not affiliated with X (Twitter). Results are for informational purposes and vary based on niche. NO GUARANTEES.
                    </p>
                </div>
            </div>
        </footer>
    );
}
