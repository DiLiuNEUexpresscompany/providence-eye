import { useState, useRef, type CSSProperties } from 'react'

interface CardData {
  id: string
  title: string | null
  subtitle?: string
  percentage?: number
}

const CARDS: CardData[] = [
  { id: 'derivatives', title: 'Derivatives', subtitle: 'Options · Swaps', percentage: 83 },
  { id: 'reits', title: 'REITs', subtitle: 'Global · Domestic', percentage: 77 },
  { id: 'etf', title: 'ETFs', subtitle: 'Equity · Bond · Multi', percentage: 89 },
  { id: 'macro', title: 'Macro', subtitle: 'GDP · CPI · PMI', percentage: 92 },
  { id: 'alt-data', title: 'Alt Data', subtitle: 'Sentiment · Flow', percentage: 68 },
  { id: 'fixed-income', title: 'Fixed Income', subtitle: 'Bonds · Treasuries', percentage: 94 },
  { id: 'equities', title: 'Equities', subtitle: 'NYSE · NASDAQ', percentage: 99 },
  { id: 'crypto', title: 'Crypto', subtitle: 'Spot · Futures', percentage: 87 },
  { id: 'forex', title: 'Forex', subtitle: 'Major · Minor Pairs', percentage: 96 },
  { id: 'commodities', title: 'Commodities', subtitle: 'Energy · Metals', percentage: 91 },
  { id: 'vol', title: 'Volatility', subtitle: 'VIX · SKEW · Term', percentage: 85 },
  { id: 'credit', title: 'Credit', subtitle: 'IG · HY · CDS', percentage: 79 },
  { id: 'rates', title: 'Rates', subtitle: 'Fed · ECB · BOJ', percentage: 97 },
  { id: 'quant', title: 'Quant Factors', subtitle: 'Alpha · Beta · Risk', percentage: 88 },
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

function FeaturedCard({ card }: { card: CardData }) {
  return (
    <>
      {/* Inner card — stopPropagation prevents fan switching while mouse is on active card */}
      <div
        className="w-full h-full rounded-[24px] shadow-green-glow border border-white/40 flex flex-col justify-between overflow-hidden relative featured-card-bg"
        onMouseMove={e => e.stopPropagation()}
        style={{ backdropFilter: 'blur(20px)' }}
      >
        <div className="p-5 flex justify-between items-start">
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
        <div className="p-5 flex items-end justify-between relative">
          <div className="text-5xl font-light text-black tracking-tighter">
            {card.percentage ?? '—'}<span className="text-3xl text-black/60">%</span>
          </div>
          <div className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,1)]" />
          <div className="absolute bottom-0 right-0 w-28 h-28 bg-white/20 rounded-tl-[100px] -z-10 blur-xl" />
        </div>
      </div>
      {/* Side label — outside inner overflow-hidden so it's not clipped */}
      <div className="absolute right-[-32px] top-[38%] transform rotate-90 text-white/90 font-medium tracking-widest text-xs uppercase drop-shadow-md pointer-events-none z-30">
        Live Data
      </div>
    </>
  )
}

export default function DocFan() {
  const [activeIndex, setActiveIndex] = useState(INITIAL_ACTIVE)
  const lastIndexRef = useRef(INITIAL_ACTIVE)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const mouseX = e.clientX - (rect.left + rect.width / 2)
    // fanRadius = half the container width so the full range maps end-to-end
    const fanRadius = rect.width / 2
    const fraction = Math.max(-1, Math.min(1, mouseX / fanRadius))
    const idx = Math.round(INITIAL_ACTIVE + fraction * (CARDS.length / 2))
    const clamped = Math.max(0, Math.min(CARDS.length - 1, idx))

    // Only fire when the mouse has moved far enough to reach a NEW card zone
    if (clamped === lastIndexRef.current) return
    lastIndexRef.current = clamped

    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => setActiveIndex(clamped), 60)
  }

  return (
    <main className="flex-1 relative w-full flex justify-center items-center mt-[-100px]">
      {/* Curved arc — decorative only */}
      <div className="absolute top-[10%] w-[600px] h-[200px] border-t border-white/5 rounded-[100%] z-0 pointer-events-none" />

      {/* Interaction zone — narrower than full container, centred on the fan */}
      <div
        className="fan-container w-[700px] h-[600px] relative flex justify-center items-center mt-16"
        onMouseMove={handleMouseMove}
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
                <FeaturedCard card={card} />
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
