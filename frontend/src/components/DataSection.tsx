const ENDPOINTS = [
  { method: 'GET', path: '/v2/equities/snapshot', latency: '12ms', status: 'live', desc: 'Real-time quotes for 4,218 US equities' },
  { method: 'GET', path: '/v2/crypto/orderbook', latency: '8ms', status: 'live', desc: 'Level 2 order book depth, BTC/ETH/SOL+' },
  { method: 'WS',  path: '/stream/forex/tick',   latency: '4ms',  status: 'live', desc: 'Streaming FX tick data, 47 pairs' },
  { method: 'GET', path: '/v2/macro/indicators',  latency: '—',    status: 'scheduled', desc: 'GDP, CPI, PMI — next release Jan 29' },
  { method: 'GET', path: '/v2/rates/yield-curve', latency: '18ms', status: 'live', desc: 'US Treasury curve, 2Y–30Y' },
  { method: 'WS',  path: '/stream/options/flow',  latency: '6ms',  status: 'live', desc: 'Unusual options activity scanner' },
]

const METRICS = [
  { label: 'API Uptime', value: '99.97%', sub: 'Last 30 days' },
  { label: 'Avg Latency', value: '9ms', sub: 'P50 across all endpoints' },
  { label: 'Symbols Covered', value: '14,200+', sub: 'Equities · Crypto · FX · Futures' },
  { label: 'Daily Messages', value: '2.1B', sub: 'WebSocket throughput' },
]

export default function DataSection() {
  return (
    <div className="w-full px-8 pb-32 space-y-8">

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-white/5" />
        <span className="text-xs text-white/20 tracking-widest uppercase font-medium">API Reference</span>
        <div className="flex-1 h-px bg-white/5" />
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-4 gap-4">
        {METRICS.map(m => (
          <div key={m.label} className="glass-panel rounded-2xl p-5">
            <div className="text-2xl font-light text-app-green tracking-tight">{m.value}</div>
            <div className="text-sm font-medium text-white mt-1">{m.label}</div>
            <div className="text-xs text-white/30 mt-0.5">{m.sub}</div>
          </div>
        ))}
      </div>

      {/* Endpoint table */}
      <div className="glass-panel rounded-[28px] overflow-hidden">
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
          <div>
            <h3 className="text-base font-medium">Endpoints</h3>
            <p className="text-xs text-white/30 mt-0.5">Live production · v2.4.1</p>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-app-green animate-pulse" />
            <span className="text-xs text-app-green font-medium">All systems operational</span>
          </div>
        </div>

        <div className="divide-y divide-white/5">
          {ENDPOINTS.map(ep => (
            <div key={ep.path} className="px-6 py-4 flex items-center gap-6 hover:bg-white/[0.02] transition group cursor-pointer">
              {/* Method badge */}
              <span className={`shrink-0 text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-md ${
                ep.method === 'WS'
                  ? 'bg-app-green/15 text-app-green border border-app-green/20'
                  : 'bg-white/5 text-white/50 border border-white/10'
              }`}>
                {ep.method}
              </span>

              {/* Path */}
              <code className="text-sm font-mono text-white/80 w-56 shrink-0">{ep.path}</code>

              {/* Description */}
              <span className="text-sm text-white/40 flex-1 truncate">{ep.desc}</span>

              {/* Latency */}
              <span className="text-xs text-white/30 shrink-0 w-12 text-right">{ep.latency}</span>

              {/* Status */}
              <div className={`shrink-0 flex items-center gap-1.5 ${ep.status === 'live' ? 'text-app-green' : 'text-white/30'}`}>
                <div className={`w-1.5 h-1.5 rounded-full ${ep.status === 'live' ? 'bg-app-green' : 'bg-white/20'}`} />
                <span className="text-[10px] font-medium capitalize">{ep.status}</span>
              </div>

              {/* Arrow on hover */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                className="text-white/0 group-hover:text-white/30 transition shrink-0">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
