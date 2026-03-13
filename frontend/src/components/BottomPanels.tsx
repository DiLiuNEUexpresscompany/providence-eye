export default function BottomPanels() {
  return (
    <div className="w-full px-8 pb-32 pt-4 flex gap-6 h-[300px] z-20 relative">

      {/* Market Events panel */}
      <div className="w-1/3 glass-panel rounded-[32px] p-6 flex flex-col relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none" />

        <div className="mb-4">
          <h2 className="text-xl font-medium tracking-wide">Market Events</h2>
          <p className="text-xs text-white/40 mt-1 font-light">Scheduled releases · High impact</p>
        </div>

        <div className="grid grid-cols-[auto_1fr] gap-6 px-4 py-2 border-b border-white/10 text-xs text-white/50 font-medium tracking-wider uppercase">
          <div>When</div>
          <div>Event</div>
        </div>

        <div className="flex-1 overflow-y-auto mt-2 space-y-1">
          <div className="grid grid-cols-[auto_1fr] gap-6 items-center px-4 py-3 hover:bg-white/5 rounded-xl transition cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-app-green shrink-0" />
              <div>
                <div className="text-sm font-medium text-white">2 Weeks</div>
                <div className="text-[10px] text-white/40 mt-0.5">Jan 29, 2025</div>
              </div>
            </div>
            <div className="text-sm text-white/80">FOMC Rate Decision</div>
          </div>

          <div className="grid grid-cols-[auto_1fr] gap-6 items-center px-4 py-3 hover:bg-white/5 rounded-xl transition cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-white/20 shrink-0" />
              <div>
                <div className="text-sm font-medium text-white/60">3 Weeks</div>
                <div className="text-[10px] text-white/30 mt-0.5">Feb 07, 2025</div>
              </div>
            </div>
            <div className="text-sm text-white/50">NFP Jobs Report</div>
          </div>

          <div className="grid grid-cols-[auto_1fr] gap-6 items-center px-4 py-3 hover:bg-white/5 rounded-xl transition cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-white/20 shrink-0" />
              <div>
                <div className="text-sm font-medium text-white/60">6 Weeks</div>
                <div className="text-[10px] text-white/30 mt-0.5">Feb 28, 2025</div>
              </div>
            </div>
            <div className="text-sm text-white/50">Q4 Earnings Season</div>
          </div>
        </div>
      </div>

      {/* Market Pulse panel */}
      <div className="w-2/3 glass-panel-green rounded-[32px] p-8 relative overflow-hidden shadow-2xl">
        {/* Glow */}
        <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-white/10 rounded-full blur-[60px] pointer-events-none" />

        {/* WebSocket endpoint card top-right */}
        <div className="absolute top-6 right-8 flex items-end gap-2 z-10">
          <div className="px-4 py-1.5 rounded-t-xl bg-white/5 border border-white/10 border-b-0 text-[10px] text-white/60 transform translate-y-2">REST</div>
          <div className="px-4 py-1.5 rounded-t-xl bg-white/10 border border-white/20 border-b-0 text-[10px] text-white/80 transform translate-y-1">gRPC</div>
          <div className="w-64 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 p-4 shadow-lg transform translate-x-4 -translate-y-2">
            <div className="flex justify-between items-start mb-3">
              <span className="text-xs font-bold tracking-wider">WS / v2</span>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-app-green animate-pulse" />
                <span className="text-[10px] text-white/70">Live</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-[10px]">
              <div>
                <div className="text-white/60 mb-1">Latency</div>
                <div className="font-semibold text-white">12 ms</div>
              </div>
              <div>
                <div className="text-white/60 mb-1">Throughput</div>
                <div className="font-semibold text-white">2.4k <span className="font-normal opacity-60">msg/s</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="relative z-20 h-full flex flex-col justify-between max-w-[60%]">
          <div>
            <h2 className="text-3xl font-light tracking-tight">Market Pulse</h2>
            <p className="text-sm text-white/70 mt-1 font-medium">Live feed activity</p>
          </div>

          <div className="space-y-6 mt-8">
            {/* Feed progress */}
            <div>
              <div className="flex justify-between text-sm mb-3">
                <span className="font-medium">S&amp;P 500 Real-time Feed</span>
                <span className="text-white/80 text-xs mt-1">Streaming</span>
              </div>
              <div className="w-full relative flex items-center h-2">
                <div className="absolute w-full border-t border-dashed border-white/30" />
                <div className="absolute w-[98%] border-t-[2px] border-white z-10" />
                <div className="absolute left-[98%] transform -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-transparent border-t-white z-20 mt-[-3px]" />
              </div>
            </div>

            {/* Data snapshot row */}
            <div className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-3 flex items-center gap-4 hover:bg-white/15 transition cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <ellipse cx="12" cy="5" rx="9" ry="3" />
                  <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                  <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                </svg>
              </div>
              <div className="flex-1 truncate">
                <div className="text-lg font-medium truncate">equities_snapshot_v3.json</div>
                <div className="text-sm text-white/60 font-light truncate">feeds@apex.market</div>
              </div>
              <div className="shrink-0 text-right">
                <div className="text-xs font-semibold text-white">4,218</div>
                <div className="text-[10px] text-white/50">symbols</div>
              </div>
            </div>
          </div>
        </div>

        {/* Strategy Desk widget */}
        <div className="absolute bottom-6 right-6 bg-white/15 backdrop-blur-lg border border-white/20 rounded-[20px] p-3 pr-6 flex items-center gap-4 z-20 hover:bg-white/20 transition cursor-pointer shadow-lg">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
            </svg>
          </div>
          <div>
            <div className="text-base font-medium mb-1">Strategy Desk</div>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <img src="https://i.pravatar.cc/100?img=5" alt="Member" className="w-6 h-6 rounded-full border border-[rgba(46,160,67,1)]" />
                <img src="https://i.pravatar.cc/100?img=9" alt="Member" className="w-6 h-6 rounded-full border border-[rgba(46,160,67,1)] z-10" />
              </div>
              <span className="text-xs text-white/70 italic">Live now...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
