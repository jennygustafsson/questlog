import { NavLink, Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
      <header className="site-header">
        <NavLink to="/" className="brand" end>
          Questlog
        </NavLink>
        <nav className="site-nav">
          <NavLink to="/" end>
            Spel
          </NavLink>
          <NavLink to="/games/new">Lägg till spel</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}
