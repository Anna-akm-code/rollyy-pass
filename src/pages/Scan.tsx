import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { QrCode } from 'lucide-react'

export default function Scan() {
  const navigate = useNavigate()
  const [detected, setDetected] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setDetected(true), 2000)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="flex h-full flex-col px-5 pb-6 pt-4">
      <header className="text-center">
        <h1 className="text-2xl font-semibold text-text-primary">Scan QR to start</h1>
        <p className="mt-2 text-sm text-text-muted">
          Point your camera at the QR code on the charger
        </p>
      </header>

      <div className="flex flex-1 flex-col items-center justify-center">
        <Viewfinder />
        <p className="mt-6 text-sm text-text-muted">
          {detected ? 'Station found' : 'Scanning for Rollyy station…'}
        </p>
      </div>

      {detected && (
        <div className="rounded-2xl border border-bg-border bg-bg-card p-4 animate-slide-up">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-wide text-teal">Station detected</p>
              <p className="mt-1 truncate text-base font-semibold text-text-primary">
                HD-0042 · 22 kW AC
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/payment')}
              className="shrink-0 rounded-full bg-purple-primary px-5 py-2.5 text-sm font-semibold text-text-primary transition-colors hover:bg-purple-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-light"
            >
              Connect
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function Viewfinder() {
  return (
    <div className="relative h-[250px] w-[250px]">
      <div className="absolute inset-0 rounded-2xl border-2 border-purple-primary/40" />
      <Corner className="left-0 top-0 border-l-4 border-t-4 rounded-tl-2xl" />
      <Corner className="right-0 top-0 border-r-4 border-t-4 rounded-tr-2xl" />
      <Corner className="bottom-0 left-0 border-b-4 border-l-4 rounded-bl-2xl" />
      <Corner className="bottom-0 right-0 border-b-4 border-r-4 rounded-br-2xl" />
      <div className="absolute inset-0 flex items-center justify-center">
        <QrCode className="h-24 w-24 text-purple-light" strokeWidth={1.25} />
      </div>
    </div>
  )
}

function Corner({ className }: { className: string }) {
  return (
    <span
      className={`absolute h-8 w-8 border-purple-primary ${className}`}
      aria-hidden="true"
    />
  )
}
