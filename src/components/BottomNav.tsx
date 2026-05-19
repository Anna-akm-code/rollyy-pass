import { NavLink } from 'react-router-dom'
import { Home, Zap, ParkingCircle, History } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type Tab = { to: string; label: string; icon: LucideIcon }

const tabs: Tab[] = [
  { to: '/scan', label: 'Home', icon: Home },
  { to: '/charge', label: 'Charge', icon: Zap },
  { to: '/robot', label: 'Park', icon: ParkingCircle },
  { to: '/history', label: 'History', icon: History },
]

export function BottomNav() {
  return (
    <nav className="border-t border-bg-border bg-bg-card">
      <ul className="grid grid-cols-4">
        {tabs.map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                [
                  'flex flex-col items-center justify-center gap-1 py-3 text-xs transition-colors',
                  isActive ? 'text-purple-primary' : 'text-text-muted hover:text-text-primary',
                ].join(' ')
              }
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
