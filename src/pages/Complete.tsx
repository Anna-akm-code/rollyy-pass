import { Check, Mail } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

type SessionState = {
  energy?: number
  seconds?: number
  cost?: number
}

const DEFAULTS = {
  energyKwh: 12.4,
  durationMin: 34,
  cost: 4.34,
}

export default function Complete() {
  const navigate = useNavigate()
  const { state } = useLocation() as { state: SessionState | null }

  const energy = state?.energy && state.energy > 0 ? state.energy : DEFAULTS.energyKwh
  const durationMin =
    state?.seconds && state.seconds > 0
      ? Math.max(1, Math.round(state.seconds / 60))
      : DEFAULTS.durationMin
  const cost = state?.cost && state.cost > 0 ? state.cost : DEFAULTS.cost

  return (
    <div className="flex h-full flex-col items-center px-5 pb-6 pt-8">
      <div
        className="flex h-20 w-20 items-center justify-center rounded-full bg-purple-primary animate-pop-in"
        style={{ animationDelay: '0ms' }}
      >
        <Check className="h-10 w-10 text-white" strokeWidth={3} />
      </div>

      <h1
        className="mt-6 text-[28px] font-bold leading-tight text-white animate-fade-up"
        style={{ animationDelay: '350ms' }}
      >
        Thank you!
      </h1>
      <p
        className="mt-1 text-base text-text-muted animate-fade-up"
        style={{ animationDelay: '500ms' }}
      >
        Keep rollyying!
      </p>

      <section
        className="mt-7 w-full rounded-2xl border border-bg-border bg-bg-card p-5 animate-fade-up"
        style={{ animationDelay: '650ms' }}
      >
        <Row label="Energy" value={`${energy.toFixed(1)} kWh`} />
        <div className="my-3 h-px bg-bg-border" />
        <Row label="Duration" value={`${durationMin} min`} />
        <div className="my-3 h-px bg-bg-border" />
        <Row label="Total cost" value={`€${cost.toFixed(2)}`} bold />
      </section>

      <div
        className="mt-5 grid w-full grid-cols-2 gap-3 animate-fade-up"
        style={{ animationDelay: '800ms' }}
      >
        <button
          type="button"
          onClick={() => navigate('/history')}
          className="rounded-full border py-3 text-sm font-semibold transition-colors hover:bg-bg-card focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-light"
          style={{ borderColor: '#2a2450', color: '#c4b5fd' }}
        >
          View history
        </button>
        <button
          type="button"
          onClick={() => navigate('/scan')}
          className="rounded-full bg-purple-primary py-3 text-sm font-semibold text-text-primary transition-colors hover:bg-purple-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-light"
        >
          Charge again
        </button>
      </div>

      <p
        className="mt-auto flex items-center gap-1.5 pt-6 text-xs text-text-muted animate-fade-up"
        style={{ animationDelay: '950ms' }}
      >
        <Mail className="h-3.5 w-3.5" />
        Receipt sent to your email
      </p>
    </div>
  )
}

function Row({
  label,
  value,
  bold = false,
}: {
  label: string
  value: string
  bold?: boolean
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-text-muted">{label}</span>
      <span
        className={[
          'tabular-nums',
          bold
            ? 'text-base font-semibold text-text-primary'
            : 'text-sm font-medium text-text-primary',
        ].join(' ')}
      >
        {value}
      </span>
    </div>
  )
}
