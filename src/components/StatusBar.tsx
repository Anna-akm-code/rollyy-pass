import { Wifi, BatteryMedium } from 'lucide-react'

export function StatusBar() {
  const time = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  return (
    <div className="flex h-11 items-center justify-between px-6 text-text-primary text-sm font-medium">
      <span>{time}</span>
      <div className="flex items-center gap-1.5">
        <Wifi className="h-4 w-4" />
        <BatteryMedium className="h-5 w-5" />
      </div>
    </div>
  )
}
