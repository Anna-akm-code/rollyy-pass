import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, Lock } from 'lucide-react'

export default function Payment() {
  const navigate = useNavigate()
  const [number, setNumber] = useState('4242 4242 4242 4821')
  const [expiry, setExpiry] = useState('09/28')
  const [cvc, setCvc] = useState('123')
  const [save, setSave] = useState(true)

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        navigate('/robot')
      }}
      className="flex h-full flex-col px-5 pb-6 pt-4"
    >
      <header>
        <h1 className="text-2xl font-semibold text-text-primary">Add your card</h1>
        <p className="mt-2 text-sm text-text-muted">Required for your first session</p>
      </header>

      <section
        className="mt-6 rounded-[14px] border bg-bg-card p-5"
        style={{ borderColor: '#2a2450' }}
      >
        <Field label="Card number">
          <input
            inputMode="numeric"
            autoComplete="cc-number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="w-full rounded-lg bg-bg px-3 py-2.5 text-base text-text-primary outline-none ring-1 ring-bg-border focus:ring-2 focus:ring-purple-primary"
          />
        </Field>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <Field label="Expiry">
            <input
              inputMode="numeric"
              autoComplete="cc-exp"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              className="w-full rounded-lg bg-bg px-3 py-2.5 text-base text-text-primary outline-none ring-1 ring-bg-border focus:ring-2 focus:ring-purple-primary"
            />
          </Field>
          <Field label="CVC">
            <input
              inputMode="numeric"
              autoComplete="cc-csc"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
              className="w-full rounded-lg bg-bg px-3 py-2.5 text-base text-text-primary outline-none ring-1 ring-bg-border focus:ring-2 focus:ring-purple-primary"
            />
          </Field>
        </div>

        <label className="mt-5 flex cursor-pointer select-none items-center gap-3">
          <span
            className={[
              'flex h-5 w-5 items-center justify-center rounded-md border transition-colors',
              save
                ? 'border-purple-primary bg-purple-primary'
                : 'border-bg-border bg-bg',
            ].join(' ')}
          >
            {save && <Check className="h-3.5 w-3.5 text-text-primary" strokeWidth={3} />}
          </span>
          <input
            type="checkbox"
            checked={save}
            onChange={(e) => setSave(e.target.checked)}
            className="sr-only"
          />
          <span className="text-sm text-text-primary">Save card for future payments</span>
        </label>
      </section>

      <button
        type="submit"
        className="mt-6 w-full rounded-full bg-purple-primary py-3.5 text-base font-semibold text-text-primary transition-colors hover:bg-purple-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-light"
      >
        Continue
      </button>

      <p className="mt-auto flex items-center justify-center gap-1.5 pt-6 text-xs text-text-muted">
        <Lock className="h-3.5 w-3.5" />
        Secured by Stripe
      </p>
    </form>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-wide text-text-muted">
        {label}
      </span>
      {children}
    </label>
  )
}
