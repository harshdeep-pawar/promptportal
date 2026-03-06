import { useEffect, useMemo, useState } from 'react'
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom'

import Navbar from './components/Navbar.jsx'
import Sidebar from './components/Sidebar.jsx'
import Footer from './components/Footer.jsx'

import Home from './pages/Home.jsx'
import Introduction from './pages/Introduction.jsx'
import PromptTypes from './pages/PromptTypes.jsx'
import Examples from './pages/Examples.jsx'
import BestPractices from './pages/BestPractices.jsx'
import AITools from './pages/AITools.jsx'

function ScrollToTop() {
  const location = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [location.pathname, location.hash])
  return null
}

function useTheme() {
  const [theme, setTheme] = useState(() => {
    const saved = window.localStorage.getItem('pp_theme')
    return saved === 'light' ? 'light' : 'dark'
  })

  useEffect(() => {
    const html = document.documentElement
    html.classList.toggle('theme-light', theme === 'light')
    window.localStorage.setItem('pp_theme', theme)
  }, [theme])

  return { theme, setTheme }
}

function AppShell() {
  const { theme, setTheme } = useTheme()
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  const onToggleTheme = () =>
    setTheme((t) => (t === 'light' ? 'dark' : 'light'))

  const normalizedQuery = useMemo(() => searchQuery.trim(), [searchQuery])

  return (
    <div className="appShell">
      <Navbar
        theme={theme}
        onToggleTheme={onToggleTheme}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
      />

      {mobileSidebarOpen ? (
        <div
          className="overlay"
          role="button"
          tabIndex={0}
          aria-label="Close sidebar overlay"
          onClick={() => setMobileSidebarOpen(false)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setMobileSidebarOpen(false)
          }}
        >
          <div
            className="sidebar sidebarMobile"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar
              searchQuery={normalizedQuery}
              onNavigate={() => setMobileSidebarOpen(false)}
            />
          </div>
        </div>
      ) : null}

      <div className="contentGrid">
        <Sidebar searchQuery={normalizedQuery} />

        <main className="main">
          <div className="page">
            <div className="pageInner">
              <ScrollToTop />

              <Routes>
                <Route
                  path="/"
                  element={<Home searchQuery={normalizedQuery} />}
                />
                <Route path="/introduction" element={<Introduction />} />
                <Route path="/prompt-types" element={<PromptTypes />} />
                <Route
                  path="/examples"
                  element={<Examples searchQuery={normalizedQuery} />}
                />
                <Route path="/best-practices" element={<BestPractices />} />
                <Route path="/ai-tools" element={<AITools />} />
              </Routes>
            </div>
          </div>

          <Footer />
        </main>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <HashRouter>
      <AppShell />
    </HashRouter>
  )
}
