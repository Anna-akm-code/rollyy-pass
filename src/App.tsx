import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/AppLayout'
import Scan from './pages/Scan'
import Payment from './pages/Payment'
import Robot from './pages/Robot'
import Charge from './pages/Charge'
import Stop from './pages/Stop'
import Complete from './pages/Complete'
import History from './pages/History'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/scan" replace />} />
          <Route path="/scan" element={<Scan />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/robot" element={<Robot />} />
          <Route path="/charge" element={<Charge />} />
          <Route path="/stop" element={<Stop />} />
          <Route path="/complete" element={<Complete />} />
          <Route path="/history" element={<History />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
