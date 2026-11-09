import { Route, Routes } from 'react-router-dom'
import GamePage from './GamePage.tsx'
import Home from './Home.tsx'
import NewGamePage from './NewGamePage.tsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/games/new" element={<NewGamePage />} />
      <Route path="/games/:id" element={<GamePage />} />
    </Routes>
  )
}
