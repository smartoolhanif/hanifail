import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaUser, FaChartBar, FaCog } from 'react-icons/fa'

interface DashboardProps {
  children: ReactNode
}

export function Dashboard({ children }: DashboardProps) {
  const location = useLocation()

  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : ''
  }

  return (
    <div className="dashboard">
      <nav className="sidebar">
        <div className="logo">
          <h2>Fire Fire Info</h2>
        </div>
        <ul>
          <li className={isActive('/')}>
            <Link to="/">
              <FaUser /> Player Info
            </Link>
          </li>
          <li className={isActive('/statistics')}>
            <Link to="/statistics">
              <FaChartBar /> Statistics
            </Link>
          </li>
          <li className={isActive('/settings')}>
            <Link to="/settings">
              <FaCog /> Settings
            </Link>
          </li>
        </ul>
      </nav>
      <main className="content">
        {children}
      </main>
    </div>
  )
}