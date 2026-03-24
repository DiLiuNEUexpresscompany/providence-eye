import { useState, useRef, type CSSProperties } from 'react'

interface Metric {
  label: string
  value: string
  trend: 'up' | 'down' | 'neutral'
}

interface CardData {
  id: string
  title: string | null
  subtitle?: string
  percentage?: number
  backMetrics?: Metric[]
  backNote?: string
}

const CARDS: CardData[] = [
  {
    id: 'derivatives', title: 'Derivatives', subtitle: 'Options · Swaps', percentage: 83,
    backMetrics: [
      { label: 'Implied Vol', value: '18.4%', trend: 'down' },
      { label: 'Open Interest', value: '$2.1T', trend: 'up' },
      { label: 'Put/Call Ratio', value: '0.82', trend: 'down' },
      { label: 'Term Structure', value: 'Contango', trend: 'neutral' },
    ],
    backNote: 'Options flow skewing bullish across major indices'
  },
  {
    id: 'reits', title: 'REITs', subtitle: 'Global · Domestic', percentage: 77,
    backMetrics: [
      { label: 'Avg Yield', value: '4.2%', trend: 'up' },
      { label: 'Cap Rate', value: '5.8%', trend: 'neutral' },
      { label: 'FFO Growth', value: '+6.1%', trend: 'up' },
      { label: 'Occupancy', value: '91.3%', trend: 'down' },
    ],
    backNote: 'Industrial & data center REITs outperforming'
  },
  {
    id: 'etf', title: 'ETFs', subtitle: 'Equity · Bond · Multi', percentage: 89,
    backMetrics: [
      { label: 'AUM Total', value: '$9.7T', trend: 'up' },
      { label: 'Avg Spread', value: '0.04%', trend: 'neutral' },
      { label: 'Net Inflow', value: '$42B', trend: 'up' },
      { label: 'Active ETFs', value: '1,240', trend: 'up' },
    ],
    backNote: 'Equity ETFs seeing record weekly inflows'
  },
  {
    id: 'macro', title: 'Macro', subtitle: 'GDP · CPI · PMI', percentage: 92,
    backMetrics: [
      { label: 'US GDP QoQ', value: '+2.4%', trend: 'up' },
      { label: 'CPI YoY', value: '3.1%', trend: 'down' },
      { label: 'PMI Composite', value: '52.3', trend: 'up' },
      { label: 'Unemployment', value: '3.7%', trend: 'neutral' },
    ],
    backNote: 'Soft landing scenario gaining probability'
  },
  {
    id: 'alt-data', title: 'Alt Data', subtitle: 'Sentiment · Flow', percentage: 68,
    backMetrics: [
      { label: 'Sentiment Score', value: '64/100', trend: 'up' },
      { label: 'Retail Flow', value: '+$8.2B', trend: 'up' },
      { label: 'News Signal', value: 'Bullish', trend: 'up' },
      { label: 'Social Vol', value: '+22%', trend: 'neutral' },
    ],
    backNote: 'Social media momentum aligning with price action'
  },
  {
    id: 'fixed-income', title: 'Fixed Income', subtitle: 'Bonds · Treasuries', percentage: 94,
    backMetrics: [
      { label: '10Y Yield', value: '4.28%', trend: 'down' },
      { label: '2Y Yield', value: '4.71%', trend: 'down' },
      { label: 'Spread (IG)', value: '112 bps', trend: 'neutral' },
      { label: 'Duration', value: '6.4 yrs', trend: 'neutral' },
    ],
    backNote: 'Yield curve inversion narrowing, watch for normalization'
  },
  {
    id: 'equities', title: 'Equities', subtitle: 'NYSE · NASDAQ', percentage: 99,
    backMetrics: [
      { label: 'S&P 500', value: '5,204', trend: 'up' },
      { label: 'P/E (fwd)', value: '21.3x', trend: 'neutral' },
      { label: 'EPS Growth', value: '+9.2%', trend: 'up' },
      { label: 'Breadth', value: '68%', trend: 'up' },
    ],
    backNote: 'Mega-cap tech driving outsized index contribution'
  },
  {
    id: 'crypto', title: 'Crypto', subtitle: 'Spot · Futures', percentage: 87,
    backMetrics: [
      { label: 'BTC Dominance', value: '52.4%', trend: 'up' },
      { label: '24h Volume', value: '$94B', trend: 'up' },
      { label: 'Funding Rate', value: '+0.012%', trend: 'up' },
      { label: 'Fear & Greed', value: '72 Greed', trend: 'neutral' },
    ],
    backNote: 'BTC ETF inflows sustaining above $200M/day'
  },
  {
    id: 'forex', title: 'Forex', subtitle: 'Major · Minor Pairs', percentage: 96,
    backMetrics: [
      { label: 'DXY Index', value: '104.2', trend: 'up' },
      { label: 'EUR/USD', value: '1.0841', trend: 'down' },
      { label: 'USD/JPY', value: '151.8', trend: 'up' },
      { label: 'Vol (1M)', value: '6.8%', trend: 'neutral' },
    ],
    backNote: 'BOJ intervention risk elevated above 152 USD/JPY'
  },
  {
    id: 'commodities', title: 'Commodities', subtitle: 'Energy · Metals', percentage: 91,
    backMetrics: [
      { label: 'WTI Crude', value: '$82.4', trend: 'up' },
      { label: 'Gold Spot', value: '$2,341', trend: 'up' },
      { label: 'Nat Gas', value: '$1.74', trend: 'down' },
      { label: 'Copper', value: '$4.38/lb', trend: 'up' },
    ],
    backNote: 'Gold hitting ATH on central bank demand surge'
  },
  {
    id: 'vol', title: 'Volatility', subtitle: 'VIX · SKEW · Term', percentage: 85,
    backMetrics: [
      { label: 'VIX Spot', value: '14.2', trend: 'down' },
      { label: 'VVIX', value: '89.4', trend: 'neutral' },
      { label: 'SKEW Index', value: '148.6', trend: 'up' },
      { label: 'Term (1M/3M)', value: '0.91', trend: 'down' },
    ],
    backNote: 'Low VIX masking tail risk in options skew'
  },
  {
    id: 'credit', title: 'Credit', subtitle: 'IG · HY · CDS', percentage: 79,
    backMetrics: [
      { label: 'IG Spread', value: '112 bps', trend: 'neutral' },
      { label: 'HY Spread', value: '338 bps', trend: 'down' },
      { label: 'CDX IG', value: '58.3', trend: 'neutral' },
      { label: 'Default Rate', value: '1.8%', trend: 'up' },
    ],
    backNote: 'HY spreads at post-pandemic tights, caution warranted'
  },
  {
    id: 'rates', title: 'Rates', subtitle: 'Fed · ECB · BOJ', percentage: 97,
    backMetrics: [
      { label: 'Fed Funds', value: '5.25–5.5%', trend: 'neutral' },
      { label: 'ECB Rate', value: '4.50%', trend: 'down' },
      { label: 'BOJ Rate', value: '0.10%', trend: 'up' },
      { label: 'SOFR', value: '5.31%', trend: 'neutral' },
    ],
    backNote: 'Market pricing 2–3 Fed cuts by year-end'
  },
  {
    id: 'quant', title: 'Quant Factors', subtitle: 'Alpha · Beta · Risk', percentage: 88,
    backMetrics: [
      { label: 'Momentum', value: '+1.4σ', trend: 'up' },
      { label: 'Value Factor', value: '+0.6σ', trend: 'up' },
      { label: 'Low Vol', value: '-0.3σ', trend: 'down' },
      { label: 'Quality', value: '+1.1σ', trend: 'up' },
    ],
    backNote: 'Momentum + Quality combo showing strongest Sharpe'
  },
]

const INITIAL_ACTIVE = 6 // index of 'equities'

// Visual properties keyed by offset from active card
const OFFSET_STYLES: Record<number, {
  tx: number; tz: number; ry: number; rz?: number
  scale: number; opacity: number; z: number; w: number; h: number
}> = {
  '-6': { tx: -530, tz: -300, ry: 35,  scale: 0.6,  opacity: 0.05, z: 1,  w: 165, h: 220 },
  '-5': { tx: -468, tz: -250, ry: 30,  scale: 0.65, opacity: 0.1,  z: 2,  w: 165, h: 220 },
  '-4': { tx: -395, tz: -200, ry: 25,  scale: 0.7,  opacity: 0.2,  z: 3,  w: 165, h: 220 },
  '-3': { tx: -308, tz: -150, ry: 20,  scale: 0.75, opacity: 0.3,  z: 4,  w: 168, h: 224 },
  '-2': { tx: -205, tz: -100, ry: 15,  scale: 0.8,  opacity: 0.5,  z: 5,  w: 178, h: 248 },
  '-1': { tx:  -92, tz:  -50, ry: 10,  scale: 0.9,  opacity: 0.8,  z: 6,  w: 192, h: 268 },
   '0': { tx:   22, tz:   50, ry: -5, rz: -3, scale: 1.1, opacity: 1, z: 20, w: 242, h: 322 },
   '1': { tx:  138, tz:    0, ry: -15, scale: 0.95, opacity: 0.9,  z: 15, w: 192, h: 268 },
   '2': { tx:  192, tz:  -20, ry: -20, scale: 0.9,  opacity: 0.8,  z: 14, w: 178, h: 255 },
   '3': { tx:  238, tz:  -40, ry: -25, scale: 0.85, opacity: 0.7,  z: 13, w: 165, h: 242 },
   '4': { tx:  275, tz:  -60, ry: -30, scale: 0.8,  opacity: 0.6,  z: 12, w: 158, h: 232 },
   '5': { tx:  308, tz:  -80, ry: -35, scale: 0.75, opacity: 0.5,  z: 11, w: 148, h: 222 },
   '6': { tx:  338, tz: -100, ry: -40, scale: 0.7,  opacity: 0.4,  z: 10, w: 142, h: 215 },
   '7': { tx:  364, tz: -120, ry: -45, scale: 0.65, opacity: 0.3,  z: 9,  w: 135, h: 208 },
   '8': { tx:  388, tz: -140, ry: -50, scale: 0.6,  opacity: 0.2,  z: 8,  w: 128, h: 200 },
   '9': { tx:  408, tz: -160, ry: -55, scale: 0.55, opacity: 0.1,  z: 7,  w: 122, h: 194 },
  '10': { tx:  425, tz: -180, ry: -60, scale: 0.5,  opacity: 0.05, z: 6,  w: 116, h: 188 },
}

function getCardStyle(offset: number): CSSProperties | null {
  const p = OFFSET_STYLES[offset]
  if (!p) return null // hidden
  const transform = `translateX(${p.tx}px) translateZ(${p.tz}px) rotateY(${p.ry}deg)${p.rz ? ` rotateZ(${p.rz}deg)` : ''} scale(${p.scale})`
  return {
    width: p.w,
    height: p.h,
    transform,
    opacity: p.opacity,
    zIndex: p.z,
  }
}

function GhostCard({ offset }: { offset: number }) {
  const absOffset = Math.abs(offset)
  const alpha = Math.max(0.01, 0.22 - absOffset * 0.025)
  const borderAlpha = Math.max(0.03, 0.3 - absOffset * 0.04)
  return (
    <div
      className="w-full h-full rounded-2xl relative overflow-hidden"
      style={{
        background: `rgba(255,255,255,${alpha})`,
        backdropFilter: `blur(${Math.max(2, 14 - absOffset * 2)}px)`,
        border: `1px solid rgba(255,255,255,${borderAlpha})`,
      }}
    >
      {absOffset <= 2 && (
        <div className="w-full h-8 border-b border-white/10 flex items-center px-3 justify-between">
          <div className="w-8 h-2 bg-white/30 rounded" />
          <div className="w-3 h-3 rounded-full bg-white/10" />
        </div>
      )}
      {absOffset <= 1 && (
        <div className="p-3 space-y-2 mt-2">
          <div className="w-full h-1.5 bg-white/20 rounded" />
          <div className="w-3/4 h-1.5 bg-white/20 rounded" />
        </div>
      )}
    </div>
  )
}

function NamedGhostCard({ card, offset }: { card: CardData; offset: number }) {
  const absOffset = Math.abs(offset)
  const alpha = Math.max(0.05, 0.22 - absOffset * 0.025)
  const borderAlpha = Math.max(0.05, 0.3 - absOffset * 0.04)
  return (
    <div
      className="w-full h-full rounded-2xl relative overflow-hidden"
      style={{
        background: `rgba(255,255,255,${alpha})`,
        backdropFilter: `blur(${Math.max(4, 14 - absOffset * 2)}px)`,
        border: `1px solid rgba(255,255,255,${borderAlpha})`,
      }}
    >
      {absOffset <= 2 && (
        <div className="w-full h-10 border-b border-white/20 flex items-center px-3 justify-end">
          <div className="w-4 h-4 rounded-full bg-white/20" />
        </div>
      )}
      {absOffset <= 2 && (
        <div className="p-4 space-y-2 mt-2 opacity-50">
          <div className="w-full h-2 bg-white/40 rounded" />
          <div className="w-3/4 h-2 bg-white/40 rounded" />
        </div>
      )}
      {card.title && (
        <div
          className="absolute bottom-2 right-3 font-medium tracking-wide"
          style={{
            fontSize: 10,
            color: `rgba(255,255,255,${Math.max(0.3, 0.7 - absOffset * 0.1)})`,
            transform: 'rotate(-90deg)',
            transformOrigin: 'bottom right',
          }}
        >
          {card.title}
        </div>
      )}
    </div>
  )
}

function TrendArrow({ trend }: { trend: 'up' | 'down' | 'neutral' }) {
  if (trend === 'up') return (
    <svg className="w-3 h-3 text-emerald-400 inline ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
    </svg>
  )
  if (trend === 'down') return (
    <svg className="w-3 h-3 text-red-400 inline ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  )
  return <span className="text-white/30 inline ml-1 text-[10px]">—</span>
}

function FeaturedCard({ card, onLock, onUnlock }: { card: CardData; onLock: () => void; onUnlock: () => void }) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <>
      <div
        className="featured-flip-outer cursor-pointer"
        onClick={() => setIsFlipped(f => !f)}
        onMouseEnter={onLock}
        onMouseLeave={onUnlock}
        onMouseMove={e => e.stopPropagation()}
      >
        <div className={`featured-flip-inner${isFlipped ? ' is-flipped' : ''}`}>

          {/* ── FRONT ── */}
          <div className="featured-flip-face featured-card-bg border border-white/40 flex flex-col justify-between">
            {/* Shimmer sheen */}
            <div className="card-sheen" />

            <div className="p-5 flex justify-between items-start relative z-10">
              <div>
                <h3 className="text-gray-900 font-semibold text-xl leading-tight">
                  {card.title ?? '—'}
                </h3>
                <p className="text-gray-600 text-xs mt-1 font-medium">{card.subtitle ?? ''}</p>
              </div>
              <div className="w-6 h-6 rounded-full bg-black/5 flex items-center justify-center">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            <div className="p-5 flex items-end justify-between relative z-10">
              <div className="text-5xl font-light text-black tracking-tighter">
                {card.percentage ?? '—'}<span className="text-3xl text-black/60">%</span>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,1)]" />
                <p className="text-[9px] text-black/40 font-medium tracking-wide">tap to flip</p>
              </div>
              <div className="absolute bottom-0 right-0 w-28 h-28 bg-white/20 rounded-tl-[100px] -z-10 blur-xl" />
            </div>
          </div>

          {/* ── BACK ── */}
          <div
            className="featured-flip-face featured-flip-back-face featured-card-back-bg flex flex-col"
          >
            {/* Noise texture */}
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
            />

            {/* Header */}
            <div className="px-4 pt-4 pb-2 border-b border-white/10 flex justify-between items-center relative z-10">
              <div>
                <p className="text-white/40 text-[9px] uppercase tracking-widest font-medium">Coverage Feed</p>
                <p className="text-white font-semibold text-sm tracking-wide mt-0.5">{card.title}</p>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 text-[9px] font-semibold tracking-widest uppercase">Live</span>
              </div>
            </div>

            {/* Metrics 2×2 grid */}
            <div className="grid grid-cols-2 gap-px flex-1 relative z-10">
              {(card.backMetrics ?? []).slice(0, 4).map((m, i) => (
                <div
                  key={i}
                  className="px-3 py-2.5 flex flex-col justify-center"
                  style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                  <p className="text-white/35 text-[8px] uppercase tracking-widest mb-0.5">{m.label}</p>
                  <p className="text-white text-sm font-semibold leading-none">
                    {m.value}
                    <TrendArrow trend={m.trend} />
                  </p>
                </div>
              ))}
            </div>

            {/* Coverage bar */}
            <div className="px-4 py-3 border-t border-white/10 relative z-10">
              <div className="flex justify-between items-center mb-1">
                <p className="text-white/30 text-[8px] uppercase tracking-widest">Data Coverage</p>
                <p className="text-white/60 text-[9px] font-semibold">{card.percentage}%</p>
              </div>
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${card.percentage}%`,
                    background: 'linear-gradient(90deg, #68e78e, #22d3ee)',
                  }}
                />
              </div>
              {card.backNote && (
                <p className="text-white/25 text-[8px] mt-1.5 leading-snug">{card.backNote}</p>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Side label — outside flip wrapper so it doesn't rotate */}
      <div className="absolute right-[-32px] top-[38%] transform rotate-90 text-white/90 font-medium tracking-widest text-xs uppercase drop-shadow-md pointer-events-none z-30">
        Live Data
      </div>
    </>
  )
}

const HYSTERESIS_PX = 28 // must move this many px from last switch to trigger next

export default function DocFan() {
  const [activeIndex, setActiveIndex] = useState(INITIAL_ACTIVE)
  const lastIndexRef = useRef(INITIAL_ACTIVE)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lockRef = useRef(false)
  // Track absolute mouseX within container at the moment of last card switch
  const lastSwitchXRef = useRef<number | null>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (lockRef.current) return

    const rect = e.currentTarget.getBoundingClientRect()
    const mouseX = e.clientX - rect.left                  // absolute X in container
    const relX   = mouseX - rect.width / 2                // relative to center
    const fraction = Math.max(-1, Math.min(1, relX / (rect.width / 2)))
    const idx = Math.round(INITIAL_ACTIVE + fraction * (CARDS.length / 2))
    const clamped = Math.max(0, Math.min(CARDS.length - 1, idx))

    if (clamped === lastIndexRef.current) return

    // Hysteresis: ignore small movements near the boundary
    if (lastSwitchXRef.current !== null &&
        Math.abs(mouseX - lastSwitchXRef.current) < HYSTERESIS_PX) return

    lastIndexRef.current = clamped
    lastSwitchXRef.current = mouseX

    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => setActiveIndex(clamped), 60)
  }

  const handleMouseLeave = () => {
    lockRef.current = false
    lastSwitchXRef.current = null // reset so first move after re-entry is always responsive
  }

  return (
    <main className="flex-1 relative w-full flex justify-center items-center mt-[-100px]">
      {/* Curved arc — decorative only */}
      <div className="absolute top-[10%] w-[600px] h-[200px] border-t border-white/5 rounded-[100%] z-0 pointer-events-none" />

      {/* Interaction zone */}
      <div
        className="fan-container w-[700px] h-[600px] relative flex justify-center items-center mt-16"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {CARDS.map((card, idx) => {
          const offset = idx - activeIndex
          const posStyle = getCardStyle(offset)
          if (!posStyle) return null

          const isActive = offset === 0
          const hasTitle = !!card.title

          return (
            <div
              key={card.id}
              className="doc-card relative"
              style={posStyle}
            >
              {isActive ? (
                <FeaturedCard
                  card={card}
                  onLock={() => { lockRef.current = true }}
                  onUnlock={() => { lockRef.current = false }}
                />
              ) : hasTitle ? (
                <NamedGhostCard card={card} offset={offset} />
              ) : (
                <GhostCard offset={offset} />
              )}
            </div>
          )
        })}
      </div>
    </main>
  )
}
