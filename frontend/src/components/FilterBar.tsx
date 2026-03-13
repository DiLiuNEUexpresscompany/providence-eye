export default function FilterBar() {
  return (
    <div className="px-8 flex items-center gap-3 z-30 relative">
      <button className="glass-pill px-4 py-1.5 rounded-full flex items-center gap-2 text-sm text-white/80 hover:bg-white/10 transition">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a10 10 0 0 1 10 10" />
          <path d="M12 22a10 10 0 0 1-10-10" />
        </svg>
        Markets (14)
      </button>
      <button className="glass-pill px-4 py-1.5 rounded-full flex items-center gap-2 text-sm text-white/80 hover:bg-white/10 transition">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
          <polyline points="16 7 22 7 22 13" />
        </svg>
        Symbols (44)
      </button>
      <button className="glass-pill px-4 py-1.5 rounded-full flex items-center gap-2 text-sm text-white/80 hover:bg-white/10 transition">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
        1D
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
    </div>
  )
}
