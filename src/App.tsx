import { Route, Routes } from 'react-router-dom'
import { API_BASE, HANDLE } from './config.ts'

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <main>
            <h1>Questlog</h1>
            <p>Projektet är igång.</p>
            <p>
              Handle: <code>{HANDLE}</code>
            </p>
            <p>
              API: <code>{API_BASE}</code>
            </p>
          </main>
        }
      />
    </Routes>
  )
}
