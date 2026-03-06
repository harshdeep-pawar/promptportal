import { NavLink } from 'react-router-dom'
import DarkModeToggle from './DarkModeToggle.jsx'
import SearchBar from './SearchBar.jsx'
import logoUrl from '/prompt-logo.png'

const linkClass = ({ isActive }) =>
  `navLink ${isActive ? 'navLinkActive' : ''}`

export default function Navbar({
  theme,
  onToggleTheme,
  searchQuery,
  setSearchQuery,
  onOpenMobileSidebar,
}) {
  return (
    <header className="topbar">
      <div className="topbarInner">
        <button
          type="button"
          className="iconBtn mobileOnly"
          onClick={onOpenMobileSidebar}
          aria-label="Open sidebar"
          title="Menu"
        >
          <svg
            aria-hidden="true"
            width="18"
            height="18"
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

        <nav className="navLinks" aria-label="Top navigation">
          <NavLink to="/" className={linkClass} end>
            Home
          </NavLink>
          <NavLink to="/introduction" className={linkClass}>
            Introduction
          </NavLink>
          <NavLink to="/prompt-types" className={linkClass}>
            Prompt Types
          </NavLink>
          <NavLink to="/examples" className={linkClass}>
            Examples
          </NavLink>
          <NavLink to="/best-practices" className={linkClass}>
            Best Practices
          </NavLink>
          <NavLink to="/ai-tools" className={linkClass}>
            AI Tools
          </NavLink>
        </nav>

        <div className="grow" />

        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <DarkModeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </header>
  )
}

