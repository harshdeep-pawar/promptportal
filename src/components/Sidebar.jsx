import { NavLink } from 'react-router-dom'

const topics = [
  { to: '/introduction', label: 'Introduction', badge: 'Basics' },
  { to: '/prompt-types', label: 'Prompt Types', badge: 'Patterns' },
  { to: '/examples', label: 'Examples', badge: 'Cards' },
  { to: '/best-practices', label: 'Best Practices', badge: 'Tips' },
  { to: '/ai-tools', label: 'AI Tools', badge: 'Ecosystem' },
]

const sideClass = ({ isActive }) =>
  `sideLink ${isActive ? 'sideLinkActive' : ''}`

export default function Sidebar({ onNavigate }) {

  return (
    <aside className="sidebar" aria-label="Documentation sidebar">
      <div className="sidebarHeader">
        <div>
          <div className="sidebarTitle">Docs</div>
          <div className="muted" style={{ fontSize: 12 }}>
            Browse topics
          </div>
        </div>
      </div>

      <div className="sidebarBody">
        {topics.map((t) => (
          <NavLink
            key={t.to}
            to={t.to}
            className={sideClass}
            onClick={onNavigate}
          >
            <span>{t.label}</span>
            <span className="chip">{t.badge}</span>
          </NavLink>
        ))}
      </div>
    </aside>
  )
}

