import { Routes, Route } from 'react-router-dom'
import Home from '../App'
import Wishes from '../page/Wishes' // เปลี่ยนชื่อให้ตรงกับหน้า

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/wishes" element={<Wishes />} />
    </Routes>
  )
}