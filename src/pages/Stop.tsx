import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const RATE_EUR_PER_KWH = 0.35
const KWH_PER_TICK = 0.1 / 3
const BATTERY_PER_KWH = 2
const START_BATTERY = 36

export default function Stop() {
  const navigate = useNavigate()
  const [seconds, setSeconds] = useState(0)
  const [energy, setEnergy] = useState(0)
  const [confirmOpen, setConfirmOpen] = useState(false)

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds((s) => s + 1)
      setEnergy((kwh) => kwh + KWH_PER_TICK)
    }, 1000)
    return () => clearInterval(id)
  }, [])

  const battery = Math.min(100, START_BATTERY + energy * BATTERY_PER_KWH)
  const cost = energy * RATE_EUR_PER_KWH
  const mm = String(Math.floor(seconds / 60)).padStart(2, '0')
  const ss = String(seconds % 60).padStart(2, '0')

  return (
    <div className="flex h-full flex-col px-5 pb-6 pt-4">
      <header className="flex items-center gap-2">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-70" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-teal" />
        </span>
        <h1 className="text-2xl font-semibold text-text-primary">Charging</h1>
      </header>

      <div className="mt-5 flex justify-center">
        <BatteryRing percent={battery} />
      </div>

      <section className="mt-6 grid grid-cols-3 gap-3">
        <Metric label="Energy" value={energy.toFixed(1)} unit="kWh" />
        <Metric label="Duration" value={`${mm}:${ss}`} unit="" />
        <Metric label="Cost" value={`€${cost.toFixed(2)}`} unit="" />
      </section>

      <section className="mt-4 rounded-2xl border border-bg-border bg-bg-card p-4">
        <Row label="Est. to 100%" value="1 hr 18 min" />
        <div className="my-2 h-px bg-bg-border" />
        <Row label="Est. total cost" value="~€12.40" />
      </section>

      <button
        type="button"
        onClick={() => setConfirmOpen(true)}
        className="mt-auto w-full rounded-full py-3.5 text-base font-semibold transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink"
        style={{ backgroundColor: '#3b1525', color: '#ed93b1' }}
      >
        Stop charging
      </button>

      {confirmOpen && (
        <ConfirmStop
          onCancel={() => setConfirmOpen(false)}
          onConfirm={() =>
            navigate('/complete', { state: { energy, seconds, cost } })
          }
        />
      )}
    </div>
  )
}

function BatteryRing({ percent }: { percent: number }) {
  const size = 120
  const stroke = 10
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const offset = c - (percent / 100) * c
  const display = Math.round(percent)

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#1e1a35"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#7c3aed"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 800ms ease-out' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-semibold text-text-primary">{display}%</span>
        <span className="text-[10px] uppercase tracking-wide text-text-muted">Battery</span>
      </div>
    </div>
  )
}

function Metric({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="rounded-xl border border-bg-border bg-bg-card px-3 py-3 text-center">
      <p className="text-lg font-semibold text-text-primary tabular-nums">
        {value}
        {unit && <span className="ml-1 text-xs font-medium text-text-muted">{unit}</span>}
      </p>
      <p className="mt-0.5 text-[11px] uppercase tracking-wide text-text-muted">{label}</p>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-text-muted">{label}</span>
      <span className="text-sm font-medium text-text-primary">{value}</span>
    </div>
  )
}

function ConfirmStop({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void
  onConfirm: () => void
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 sm:items-center"
      onClick={onCancel}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-mobile rounded-t-2xl border border-bg-border bg-bg-card p-5 animate-slide-up sm:rounded-2xl"
      >
        <h2 className="text-lg font-semibold text-text-primary">Stop charging?</h2>
        <p className="mt-1 text-sm text-text-muted">
          Your session will end and the robot will disconnect.
        </p>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-bg-border py-3 text-sm font-semibold text-text-primary hover:bg-bg"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-full py-3 text-sm font-semibold"
            style={{ backgroundColor: '#3b1525', color: '#ed93b1' }}
          >
            Stop
          </button>
        </div>
      </div>
    </div>
  )
}
