import { NavLink, Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
      <header className="site-header">
        <div className="site-header-inner">
          <NavLink to="/" className="brand" end>
            Spelbacklog
          </NavLink>
          <nav className="site-nav">
            <NavLink to="/" end>
              Spel
            </NavLink>
            <NavLink to="/games/new">Lägg till spel</NavLink>
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}
