import { Routes, Route } from 'react-router-dom'
import Home from '../App'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/create" element={<CreateInvite />} /> */}

      {/* fallback */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  )
}
