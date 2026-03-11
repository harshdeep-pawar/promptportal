import { useEffect, useState, useRef } from 'react'

/**
 * Navigation Items Configuration
 * Each item includes: label (display text), path (route), and id (for scroll detection)
 */
export const NAV_ITEMS = [
  { label: 'Home', path: '/', id: 'home' },
  { label: 'Introduction', path: '/introduction', id: 'introduction' },
  { label: 'Prompt Types', path: '/prompt-types', id: 'prompt-types' },
  { label: 'Examples', path: '/examples', id: 'examples' },
  { label: 'Best Practices', path: '/best-practices', id: 'best-practices' },
  { label: 'AI Tools', path: '/ai-tools', id: 'ai-tools' },
]

/**
 * useScrollSpy Hook
 * Detects which section is currently in view and returns its ID
 * Useful for highlighting active navigation items
 * 
 * @returns {string} The ID of the currently visible section
 */
export function useScrollSpy() {
  const [activeId, setActiveId] = useState('')
  const observerRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first visible entry (in viewport)
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
            break
          }
        }
      },
      {
        // Root margin: negative top and bottom to trigger when 66% of element is visible
        rootMargin: '-80px 0px -66%',
        threshold: 0,
      }
    )

    observerRef.current = observer

    // Observe all page sections
    const sections = NAV_ITEMS.map((item) => 
      document.getElementById(item.id)
    ).filter(Boolean)
    
    sections.forEach((section) => observer.observe(section))

    return () => {
      sections.forEach((section) => observer.unobserve(section))
    }
  }, [])

  return activeId
}

/**
 * smoothScroll Function
 * Smoothly scrolls to a specific element by ID
 * Accounts for fixed navbar height
 * 
 * @param {string} elementId - The ID of the element to scroll to
 * @param {number} navHeight - The height of the fixed navbar (default: 64px)
 */
export function smoothScroll(elementId, navHeight = 64) {
  const element = document.getElementById(elementId)
  if (element) {
    const elementPosition = element.offsetTop - navHeight
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth',
    })
  }
}

/**
 * useNavigationState Hook
 * Manages navigation state including mobile menu visibility
 * 
 * @returns {object} Object containing navigation state and handlers
 */
export function useNavigationState() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const activeId = useScrollSpy()

  const toggleMobileNav = () => {
    setMobileNavOpen(!mobileNavOpen)
  }

  const closeMobileNav = () => {
    setMobileNavOpen(false)
  }

  const openMobileNav = () => {
    setMobileNavOpen(true)
  }

  return {
    mobileNavOpen,
    toggleMobileNav,
    closeMobileNav,
    openMobileNav,
    activeId,
  }
}

/**
 * useScrollToSection Hook
 * Handles scrolling to a section when navigating
 * Closes mobile menu if open
 * 
 * @param {boolean} mobileNavOpen - Whether mobile nav is open
 * @param {function} onCloseMobileNav - Callback to close mobile nav
 * 
 * @returns {function} Handler function for navigation clicks
 */
export function useScrollToSection(mobileNavOpen, onCloseMobileNav) {
  return (path, id) => {
    // Close mobile menu when navigating
    if (mobileNavOpen) {
      onCloseMobileNav()
    }

    // If on the same page, scroll to section
    if (window.location.pathname === path) {
      smoothScroll(id)
    }
  }
}
