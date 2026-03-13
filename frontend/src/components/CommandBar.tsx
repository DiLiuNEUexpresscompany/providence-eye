export default function CommandBar() {
  return (
    <div className="command-bar fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-[550px]">
      <div className="bg-black/40 backdrop-blur-2xl border border-white/10 rounded-[28px] p-3 flex items-center shadow-2xl relative">
        {/* Top shine */}
        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <input
          type="text"
          placeholder="Search ticker, endpoint, or data series..."
          className="bg-transparent border-none outline-none text-white placeholder-white/70 flex-1 px-4 text-lg font-light w-full"
        />

        <div className="flex items-center gap-2 pr-1">
          {/* Plus */}
          <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center transition">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>

          {/* File */}
          <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center transition">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-white/60">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 7V3.5L18.5 9H13z" />
            </svg>
          </button>

          {/* Auto */}
          <button className="h-10 px-4 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 flex items-center gap-2 transition text-sm font-medium">
            Auto
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <div className="w-2" />

          {/* Submit */}
          <button className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-200 transition transform hover:scale-105">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="19" x2="12" y2="5" />
              <polyline points="5 12 12 5 19 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
