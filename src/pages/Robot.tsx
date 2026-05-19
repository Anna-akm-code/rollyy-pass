import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bot } from 'lucide-react'

export default function Robot() {
  const navigate = useNavigate()
  const [seconds, setSeconds] = useState(10)

  useEffect(() => {
    if (seconds <= 0) {
      navigate('/charge')
      return
    }
    const id = setInterval(() => setSeconds((s) => s - 1), 1000)
    return () => clearInterval(id)
  }, [seconds, navigate])

  const mm = Math.floor(seconds / 60)
  const ss = String(seconds % 60).padStart(2, '0')

  return (
    <div className="flex h-full flex-col px-5 pb-6 pt-4">
      <header>
        <h1 className="text-2xl font-semibold text-text-primary">Robot is on the way</h1>
        <p className="mt-2 text-sm text-text-muted">
          Your Rollyy charging robot is heading to your vehicle
        </p>
      </header>

      <Map />

      <section
        className="mt-4 flex items-center gap-3 rounded-2xl border border-bg-border bg-bg-card p-4"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-dark text-purple-light">
          <Bot className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-text-primary">Robot RB-07</p>
          <p className="truncate text-xs text-text-muted">22 kW · autonomous charger</p>
        </div>
      </section>

      <section className="mt-4 grid grid-cols-3 gap-3">
        <Metric label="Arrival" value={`${mm}:${ss}`} unit="" />
        <Metric label="Distance" value="120" unit="m" />
        <Metric label="Power" value="22" unit="kW" />
      </section>

      <div className="mt-4 flex items-center gap-2 rounded-xl border border-teal/30 bg-teal/10 px-3 py-2.5 text-sm text-teal">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
        </span>
        Robot is navigating to your vehicle…
      </div>

      <button
        type="button"
        onClick={() => navigate('/scan')}
        className="mt-auto w-full rounded-full border border-purple-primary py-3 text-sm font-semibold text-purple-light transition-colors hover:bg-purple-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-light"
      >
        Cancel robot
      </button>
    </div>
  )
}

function Map() {
  return (
    <div
      className="relative mt-5 h-[200px] w-full overflow-hidden rounded-2xl border border-bg-border"
      style={{
        backgroundColor: '#0f0d20',
        backgroundImage:
          'linear-gradient(rgba(124,58,237,0.08) 1px, transparent 1px),' +
          'linear-gradient(90deg, rgba(124,58,237,0.08) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <line
          x1="18"
          y1="28"
          x2="78"
          y2="72"
          stroke="#7c3aed"
          strokeWidth="0.6"
          strokeDasharray="2 2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <Marker
        className="left-[14%] top-[20%]"
        label="RB-07"
        labelClass="text-purple-light"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-primary text-text-primary shadow-[0_0_0_4px_rgba(124,58,237,0.25)]">
          <Bot className="h-4 w-4" />
        </span>
      </Marker>

      <Marker
        className="right-[14%] bottom-[20%]"
        label="You"
        labelClass="text-teal"
      >
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-60" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-teal ring-4 ring-teal/25" />
        </span>
      </Marker>
    </div>
  )
}

function Marker({
  className,
  label,
  labelClass,
  children,
}: {
  className: string
  label: string
  labelClass: string
  children: React.ReactNode
}) {
  return (
    <div className={`absolute flex flex-col items-center gap-1 ${className}`}>
      {children}
      <span className={`text-[10px] font-semibold uppercase tracking-wide ${labelClass}`}>
        {label}
      </span>
    </div>
  )
}

function Metric({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="rounded-xl border border-bg-border bg-bg-card px-3 py-3 text-center">
      <p className="text-lg font-semibold text-text-primary">
        {value}
        {unit && <span className="ml-1 text-xs font-medium text-text-muted">{unit}</span>}
      </p>
      <p className="mt-0.5 text-[11px] uppercase tracking-wide text-text-muted">{label}</p>
    </div>
  )
}
