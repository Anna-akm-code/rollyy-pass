import { Outlet } from 'react-router-dom'
import { StatusBar } from './StatusBar'
import { BottomNav } from './BottomNav'

export function AppLayout() {
  return (
    <div className="min-h-screen w-full bg-bg flex justify-center">
      <div className="flex w-full max-w-mobile flex-col bg-bg min-h-screen border-x border-bg-border">
        <StatusBar />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
        <BottomNav />
      </div>
    </div>
  )
}
