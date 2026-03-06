import { useEffect, useRef } from 'react'

export default function SearchBar({ value, onChange }) {
  const inputRef = useRef(null)

  useEffect(() => {
    const onKeyDown = (e) => {
      // Quick-focus search like developer docs (press "/")
      if (e.key === '/' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const tag = document.activeElement?.tagName?.toLowerCase()
        if (tag !== 'input' && tag !== 'textarea') {
          e.preventDefault()
          inputRef.current?.focus()
        }
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <div className="searchWrap">
      <input
        ref={inputRef}
        className="searchInput"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search topics & prompts…"
        aria-label="Search topics and prompts"
      />
      <span className="kbd" aria-hidden="true">
        /
      </span>
    </div>
  )
}

