import { useEffect, useState, useRef } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import DarkModeToggle from './DarkModeToggle.jsx'
import SearchBar from './SearchBar.jsx'
import logoUrl from '/prompt-logo.png'
import { NAV_ITEMS, useScrollSpy, smoothScroll } from '../hooks/useNavigation.js'

const linkClass = ({ isActive }) =>
  `navLink ${isActive ? 'navLinkActive' : ''}`

export default function Navbar({
  theme,
  onToggleTheme,
  searchQuery,
  setSearchQuery,
  onOpenMobileSidebar,
}) {
  const location = useLocation()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const activeId = useScrollSpy()

  const handleNavClick = (path, id) => {
    setMobileNavOpen(false)
    
    // If on same page, smooth scroll to section
    if (window.location.pathname === path) {
      smoothScroll(id)
    }
  }

  return (
    <header className="topbar">
      <div className="topbarInner">
        <button
          type="button"
          className={`iconBtn mobileOnly hamburger ${mobileNavOpen ? 'active' : ''}`}
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileNavOpen}
          title="Menu"
        >
          <svg
            aria-hidden="true"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <NavLink to="/" className="brand" aria-label="PromptPortal home">
          <img
            src={logoUrl}
            alt="PromptPortal logo"
            width="32"
            height="32"
            style={{
              borderRadius: 12,
              display: 'block',
            }}
          />
          <span>PromptPortal</span>
        </NavLink>

        <nav
          className={`navLinks ${mobileNavOpen ? 'navLinksOpen' : ''}`}
          aria-label="Top navigation"
        >
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `navLink ${isActive || activeId === item.id ? 'navLinkActive' : ''}`
              }
              end={item.path === '/'}
              onClick={() => handleNavClick(item.path, item.id)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="grow" />

        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <DarkModeToggle theme={theme} onToggle={onToggleTheme} />
      </div>

      {mobileNavOpen && (
        <div
          className="navOverlay"
          onClick={() => setMobileNavOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  )
}

