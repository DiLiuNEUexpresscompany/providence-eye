export default function Header() {
  return (
    <header className="w-full h-16 px-8 flex items-center justify-between z-40 relative">
      {/* Left: icon buttons */}
      <div className="flex items-center gap-4">
        <button className="w-10 h-10 rounded-full glass-pill flex items-center justify-center hover:bg-white/10 transition">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l8.29-8.29c.94-.94.94-2.48 0-3.42L12 2Z" />
            <path d="M7 7h.01" />
          </svg>
        </button>
        <button className="w-10 h-10 rounded-full glass-pill flex items-center justify-center hover:bg-white/10 transition">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <button className="w-10 h-10 rounded-full glass-pill flex items-center justify-center hover:bg-white/10 transition">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </div>

      {/* Right: date + timeline + email + bell */}
      <div className="flex items-center gap-4">
        {/* Date pill */}
        <div className="px-4 py-2 rounded-full glass-pill flex items-center gap-2 text-sm font-light">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          January 12
        </div>

        {/* Meeting timeline */}
        <div className="h-10 rounded-full bg-gradient-to-r from-[rgba(104,231,142,0.2)] to-[rgba(104,231,142,0.05)] border border-app-green/30 flex items-center px-2 relative overflow-hidden backdrop-blur-md">
          <div className="absolute left-0 top-0 h-full w-[60%] bg-gradient-to-r from-transparent via-app-green/20 to-transparent" />
          <div className="flex items-center gap-6 text-xs z-10">
            <div className="flex items-center gap-2 pl-2">
              <img src="https://i.pravatar.cc/100?img=11" alt="User" className="w-6 h-6 rounded-full border border-white/20" />
              <span className="text-white/60 font-light">30 min</span>
            </div>
            <div className="h-4 w-px bg-white/20" />
            <div className="flex items-center gap-2">
              <span className="text-white/80 font-medium">09:00 AM</span>
              <div className="flex -space-x-2">
                <img src="https://i.pravatar.cc/100?img=1" alt="User" className="w-6 h-6 rounded-full border border-white/20" />
                <img src="https://i.pravatar.cc/100?img=2" alt="User" className="w-6 h-6 rounded-full border border-white/20 z-10" />
              </div>
              <span className="text-white font-medium pl-1">Market Open Briefing</span>
            </div>
            <div className="h-4 w-px bg-white/20" />
            <div className="flex items-center gap-2 pr-2 opacity-50">
              <span className="text-white/80 font-medium">10:00 AM</span>
              <div className="flex -space-x-2">
                <img src="https://i.pravatar.cc/100?img=3" alt="User" className="w-6 h-6 rounded-full border border-white/20" />
                <img src="https://i.pravatar.cc/100?img=4" alt="User" className="w-6 h-6 rounded-full border border-white/20 z-10" />
              </div>
            </div>
          </div>
        </div>

        {/* Email */}
        <button className="w-10 h-10 rounded-full glass-pill flex items-center justify-center relative">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          <span className="absolute top-0 right-0 w-2 h-2 bg-app-red rounded-full" />
        </button>

        {/* Bell */}
        <button className="w-10 h-10 rounded-full glass-pill flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>
      </div>
    </header>
  )
}
