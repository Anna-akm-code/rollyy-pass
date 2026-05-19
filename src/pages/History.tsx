import { useMemo, useState } from 'react'
import { Plus, Zap, ParkingCircle, CreditCard } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type Kind = 'charging' | 'parking' | 'payment'
type Filter = 'all' | Kind

type Tx = {
  id: string
  kind: Kind
  title: string
  detail: string
  amount: number
  day: 'Today' | 'Yesterday'
}

const TXS: Tx[] = [
  {
    id: 't1',
    kind: 'charging',
    title: 'Charging · HD-0042',
    detail: '10:12 – 11:57 · 12.4 kWh',
    amount: -4.34,
    day: 'Today',
  },
  {
    id: 't2',
    kind: 'payment',
    title: 'Top-up · Visa ••4821',
    detail: '09:40',
    amount: 50,
    day: 'Today',
  },
  {
    id: 't3',
    kind: 'charging',
    title: 'Charging · HD-0018',
    detail: '09:15 – 10:30 · 28.1 kWh',
    amount: -9.83,
    day: 'Yesterday',
  },
]

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'charging', label: 'Charging' },
  { id: 'parking', label: 'Parking' },
  { id: 'payment', label: 'Payments' },
]

const ICONS: Record<Kind, LucideIcon> = {
  charging: Zap,
  parking: ParkingCircle,
  payment: Plus,
}

export default function History() {
  const [filter, setFilter] = useState<Filter>('all')

  const filtered = useMemo(
    () => (filter === 'all' ? TXS : TXS.filter((t) => t.kind === filter)),
    [filter],
  )

  const grouped = useMemo(() => {
    const days: ('Today' | 'Yesterday')[] = ['Today', 'Yesterday']
    return days
      .map((day) => ({ day, items: filtered.filter((t) => t.day === day) }))
      .filter((g) => g.items.length > 0)
  }, [filtered])

  return (
    <div className="flex h-full flex-col px-5 pb-6 pt-4">
      <header>
        <h1 className="text-2xl font-semibold text-text-primary">Transaction history</h1>
        <p className="mt-2 text-sm text-text-muted">All sessions in one place</p>
      </header>

      <div className="mt-4 -mx-5 overflow-x-auto px-5">
        <div className="flex gap-2">
          {FILTERS.map((f) => {
            const active = f.id === filter
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={[
                  'shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
                  active
                    ? 'border-purple-primary bg-purple-primary text-text-primary'
                    : 'border-bg-border bg-bg-card text-text-muted hover:text-text-primary',
                ].join(' ')}
              >
                {f.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-5">
        {grouped.length === 0 ? (
          <p className="rounded-2xl border border-bg-border bg-bg-card px-4 py-6 text-center text-sm text-text-muted">
            No transactions
          </p>
        ) : (
          grouped.map(({ day, items }) => (
            <section key={day}>
              <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-muted">
                {day}
              </h2>
              <div className="overflow-hidden rounded-2xl border border-bg-border bg-bg-card">
                {items.map((tx, i) => (
                  <Row key={tx.id} tx={tx} divider={i > 0} />
                ))}
              </div>
            </section>
          ))
        )}
      </div>

      <div className="mt-auto flex items-center justify-between rounded-2xl border border-bg-border bg-bg-card px-4 py-3.5">
        <div className="flex items-center gap-2 text-sm text-text-muted">
          <CreditCard className="h-4 w-4" />
          Balance
        </div>
        <span className="text-base font-semibold text-text-primary">€33.87</span>
      </div>
    </div>
  )
}

function Row({ tx, divider }: { tx: Tx; divider: boolean }) {
  const Icon = ICONS[tx.kind]
  const negative = tx.amount < 0
  const amountText = `${negative ? '-' : '+'}€${Math.abs(tx.amount).toFixed(2)}`

  return (
    <div
      className={[
        'flex items-center gap-3 px-4 py-3',
        divider ? 'border-t border-bg-border' : '',
      ].join(' ')}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-dark text-purple-light">
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-text-primary">{tx.title}</p>
        <p className="truncate text-xs text-text-muted">{tx.detail}</p>
      </div>
      <span
        className={[
          'shrink-0 text-sm font-semibold tabular-nums',
          negative ? 'text-pink' : 'text-teal',
        ].join(' ')}
      >
        {amountText}
      </span>
    </div>
  )
}
