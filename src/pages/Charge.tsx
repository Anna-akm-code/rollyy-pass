import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ChevronRight, Clock, Zap } from 'lucide-react'

const TIME_OPTIONS = ['30 min', '1 hr', '2 hr', 'Custom'] as const
type TimeOption = (typeof TIME_OPTIONS)[number]

export default function Charge() {
  const navigate = useNavigate()
  const [limitOpen, setLimitOpen] = useState(false)
  const [limit, setLimit] = useState<TimeOption>('1 hr')

  return (
    <div className="flex h-full flex-col px-5 pb-6 pt-4">
      <header>
        <h1 className="text-2xl font-semibold text-text-primary">Ready to charge</h1>
        <p className="mt-2 text-sm text-text-muted">Robot connected. Swipe to begin.</p>
      </header>

      <section className="mt-5 rounded-2xl border border-bg-border bg-bg-card p-5">
        <p className="text-xs uppercase tracking-wide text-text-muted">Estimated to full</p>
        <p className="mt-1 text-2xl font-semibold text-text-primary">1 hr 45 min</p>
        <p className="mt-1 text-sm text-text-muted">~€12.40 at €0.35/kWh</p>

        <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <BatteryBox label="Current" value="36%" tone="muted" />
          <ArrowRight className="h-5 w-5 text-text-muted" />
          <BatteryBox label="Target" value="100%" tone="accent" />
        </div>
      </section>

      <section className="mt-4 rounded-2xl border border-bg-border bg-bg-card">
        <button
          type="button"
          onClick={() => setLimitOpen((v) => !v)}
          className="flex w-full items-center justify-between px-4 py-3 text-left"
        >
          <span className="flex items-center gap-2 text-sm font-medium text-text-primary">
            <Clock className="h-4 w-4 text-purple-light" />
            Set time limit
          </span>
          <span className="flex items-center gap-2 text-xs text-text-muted">
            {limit}
            <ChevronRight
              className={[
                'h-4 w-4 transition-transform',
                limitOpen ? 'rotate-90' : '',
              ].join(' ')}
            />
          </span>
        </button>

        {limitOpen && (
          <div className="grid grid-cols-4 gap-2 px-4 pb-4">
            {TIME_OPTIONS.map((opt) => {
              const active = opt === limit
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setLimit(opt)}
                  className={[
                    'rounded-full border px-2 py-1.5 text-xs font-medium transition-colors',
                    active
                      ? 'border-purple-primary bg-purple-primary text-text-primary'
                      : 'border-bg-border bg-bg text-text-muted hover:text-text-primary',
                  ].join(' ')}
                >
                  {opt}
                </button>
              )
            })}
          </div>
        )}
      </section>

      <div className="mt-auto pt-6">
        <SwipeToStart onComplete={() => navigate('/stop')} />
      </div>
    </div>
  )
}

function BatteryBox({
  label,
  value,
  tone,
}: {
  label: string
  value: string
  tone: 'muted' | 'accent'
}) {
  return (
    <div
      className={[
        'rounded-xl border px-3 py-3 text-center',
        tone === 'accent'
          ? 'border-purple-primary/60 bg-purple-dark/40'
          : 'border-bg-border bg-bg',
      ].join(' ')}
    >
      <p
        className={[
          'text-xl font-semibold',
          tone === 'accent' ? 'text-purple-light' : 'text-text-primary',
        ].join(' ')}
      >
        {value}
      </p>
      <p className="mt-0.5 text-[11px] uppercase tracking-wide text-text-muted">{label}</p>
    </div>
  )
}

const THUMB = 56
const THRESHOLD = 0.8

function SwipeToStart({ onComplete }: { onComplete: () => void }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [x, setX] = useState(0)
  const [dragging, setDragging] = useState(false)
  const startRef = useRef({ pointerX: 0, startX: 0 })

  const maxX = () => {
    const w = trackRef.current?.getBoundingClientRect().width ?? 0
    return Math.max(0, w - THUMB - 8)
  }

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    startRef.current = { pointerX: e.clientX, startX: x }
    setDragging(true)
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return
    const delta = e.clientX - startRef.current.pointerX
    const next = Math.max(0, Math.min(maxX(), startRef.current.startX + delta))
    setX(next)
  }

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return
    e.currentTarget.releasePointerCapture(e.pointerId)
    setDragging(false)
    const m = maxX()
    if (m > 0 && x / m >= THRESHOLD) {
      setX(m)
      onComplete()
    } else {
      setX(0)
    }
  }

  const progress = (() => {
    const m = maxX()
    return m > 0 ? x / m : 0
  })()

  return (
    <div
      ref={trackRef}
      className="relative h-16 w-full overflow-hidden rounded-full border border-bg-border bg-bg-card"
    >
      <div
        className="absolute inset-y-0 left-0 bg-purple-primary/25"
        style={{ width: `${x + THUMB / 2 + 4}px` }}
      />
      <div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-text-muted">
        <span style={{ opacity: 1 - progress }}>Swipe to start charging</span>
      </div>
      <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center gap-1 text-purple-light/60">
        <ChevronRight className="h-4 w-4" />
        <ChevronRight className="-ml-2 h-4 w-4" />
        <ChevronRight className="-ml-2 h-4 w-4" />
      </div>
      <div
        role="slider"
        aria-label="Swipe to start charging"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="absolute top-1 flex h-[56px] w-[56px] cursor-grab items-center justify-center rounded-full bg-purple-primary text-text-primary shadow-lg shadow-purple-primary/40 active:cursor-grabbing"
        style={{
          left: `${x + 4}px`,
          transition: dragging ? 'none' : 'left 220ms ease-out',
          touchAction: 'none',
        }}
      >
        <Zap className="h-6 w-6" fill="currentColor" strokeWidth={0} />
      </div>
    </div>
  )
}
