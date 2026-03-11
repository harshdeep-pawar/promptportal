# PromptPortal UI - Quick Reference

## Color Variables Reference

### Primary Colors
```
--bg:          #0f172a   Dark navy (main background)
--bg2:         #111827   Darker navy (accents)
--surface:     #1e293b   Blue-slate (cards/surfaces)
--border:      #334155   Slate (borders)
```

### Text Colors
```
--text:        #f1f5f9   Primary text (off-white)
--muted:       #94a3b8   Secondary text (blue-gray)
--muted-2:     #64748b   Tertiary text (darker gray)
```

### Accents
```
--primary:     #3b82f6   Blue (main CTA/links)
--accent:      #6366f1   Indigo (secondary accents)
--success:     #22c55e   Green (confirmations)
--danger:      #ef4444   Red (errors/warnings)
```

## Spacing & Sizing

```
--radius-lg:   12px    (cards, sections)
--radius-md:   8px     (buttons, inputs)
--radius-sm:   6px     (chips, badges)

--container:   1200px  (max-width for layouts)
--sidebar:     280px   (sidebar width)
--navH:        64px    (navbar height)
```

## Shadows

```
--shadow:      0 12px 28px rgba(0,0,0,0.35)   (large/prominent)
--shadow-soft: 0 4px 12px rgba(0,0,0,0.2)     (medium/cards)
--shadow-sm:   0 2px 6px rgba(0,0,0,0.15)     (small/subtle)
```

## Common Patterns

### Text Styling
```css
/* Primary heading */
font-weight: 700;
color: var(--text);

/* Body text */
color: var(--muted);
line-height: 1.6;

/* Secondary/help text */
color: var(--muted-2);
font-size: 14px;
```

### Button Styling
```css
/* Base button */
padding: 10px 14px;
border-radius: var(--radius-md);
border: 1px solid var(--border);
background: var(--surface-hover);
color: var(--text);
cursor: pointer;
transition: 180ms ease;

/* On hover */
transform: translateY(-1px);
background: var(--bg);
border-color: var(--primary);
box-shadow: var(--shadow-sm);

/* Primary variant */
background: var(--primary);
color: white;

.btn:hover {
  background: var(--primary-dark);
  box-shadow: 0 8px 16px rgba(59,130,246,0.3);
}
```

### Card Styling
```css
/* Container */
padding: 14px;
border-radius: var(--radius-lg);
border: 1px solid var(--border);
background: var(--bg);
box-shadow: var(--shadow-soft);

/* On hover */
transform: translateY(-3px);
background: var(--surface);
border-color: var(--primary);
box-shadow: 0 12px 24px rgba(59,130,246,0.15);
```

### Input Styling
```css
padding: 10px 12px;
border-radius: var(--radius-md);
border: 1px solid var(--border);
background: var(--bg);
color: var(--text);

&:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: var(--ring);
  background: var(--surface);
}
```

## State Indicators

```css
/* Disabled */
opacity: 0.6;
pointer-events: none;

/* Hover/Active */
background: var(--surface-hover);
border-color: var(--primary);

/* Focus/Keyboard */
box-shadow: var(--ring);

/* Error */
border-color: var(--danger);
box-shadow: 0 0 0 3px rgba(239,68,68,0.1);

/* Success */
border-color: var(--success);
color: var(--success);
```

## Responsive Breakpoints

```css
/* Desktop: 1200px+ */
/* Tablet: 980px - 1199px */
@media (max-width: 980px) {
  .navLinks { display: none; }
  .sidebar { display: none; }
  .mobileOnly { display: inline-grid; }
}

/* Mobile: < 720px */
@media (max-width: 720px) {
  .card { grid-column: span 12; }
  .pageInner { padding: 16px; }
  .searchWrap { min-width: 100%; }
}
```

## Focus Ring

```css
/* Standard focus for keyboard navigation */
box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
outline: none;
```

## Transitions

```css
/* Standard timing */
transition: 180ms-200ms ease;

/* Fast micro-interactions */
transition: 160ms ease;

/* Slow animations */
transition: 300ms ease;
```

## Gradients (Use Sparingly)

```css
/* Top progress bar */
background: linear-gradient(90deg, var(--primary), var(--accent));

/* Primary button hover */
box-shadow: 0 8px 16px rgba(59, 130, 246, 0.3);

/* Logo backgrounds */
background: linear-gradient(135deg, var(--primary), var(--accent));
```

## Light Theme Overrides

Add these to `html.theme-light`:
```css
--bg: #f9fafb;
--surface: #f3f4f6;
--text: #111827;
--border: #e5e7eb;
--muted: #6b7280;
--shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
/* Keep accent colors same */
```

## Typography Scales

```
h1:  font-size: clamp(28px, 3vw, 40px);  font-weight: 700;
h2:  font-size: 24px;                    font-weight: 700;
h3:  font-size: 18px;                    font-weight: 700;
p:   font-size: 16px;                    font-weight: 400;
sm:  font-size: 14px;                    font-weight: 500;
xs:  font-size: 12px;                    font-weight: 600;
```

## Do's and Don'ts

### ✅ DO
- Use CSS variables for all colors
- Apply 180-200ms transition times
- Add focus states to interactive elements
- Test with both dark and light themes
- Use solid backgrounds
- Provide visual feedback on hover

### ❌ DON'T
- Hardcode colors (use variables)
- Use gradients for text backgrounds
- Skip focus states
- Add multiple animations simultaneously
- Mix borderless and bordered styles
- Use low contrast color combinations

## Testing Checklist

- [ ] Contrast ratio is 4.5:1 or better
- [ ] Focus states visible on Tab key
- [ ] Animations respect prefers-reduced-motion
- [ ] Responsive on mobile (320px+)
- [ ] Works in light and dark themes
- [ ] Touch targets are 44x44px minimum
- [ ] Shadows consistent across components
- [ ] Font sizes readable at actual size
- [ ] Color works in grayscale (not color-only)
- [ ] No hardcoded colors

## File Locations

```
/src/css/style.css          ← Main styles (edit here)
/src/App.css                ← App-level overrides
/src/index.css              ← Global baseline
/DESIGN_SYSTEM.md           ← Full documentation
/UI_ENHANCEMENT_GUIDE.md    ← Developer guide
```

## Theme Switching Example

```jsx
import { useState, useEffect } from 'react'

function useTheme() {
  const [theme, setTheme] = useState(() => {
    return window.localStorage.getItem('pp_theme') || 'dark'
  })

  useEffect(() => {
    document.documentElement.classList.toggle(
      'theme-light', 
      theme === 'light'
    )
    window.localStorage.setItem('pp_theme', theme)
  }, [theme])

  return { 
    theme, 
    toggleTheme: () => setTheme(t => t === 'dark' ? 'light' : 'dark')
  }
}

export default useTheme
```

## Useful Tools

- **Contrast Checker**: https://webaim.org/resources/contrastchecker/
- **Color Tool**: https://colorhexa.com/
- **Responsive Test**: https://responsivedesignchecker.com/
- **Accessibility**: https://www.a11y-101.com/

## Quick Example: New Component

```jsx
// Component.jsx
export default function MyComponent() {
  return (
    <div className="myComponent">
      <h3 className="myComponentTitle">Title</h3>
      <p className="myComponentText">Description</p>
      <button className="btn btnPrimary">Action</button>
    </div>
  )
}
```

```css
/* style.css */
.myComponent {
  padding: 14px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  background: var(--bg);
  transition: 200ms ease;
}

.myComponent:hover {
  transform: translateY(-2px);
  background: var(--surface);
  border-color: var(--primary);
  box-shadow: var(--shadow-soft);
}

.myComponentTitle {
  margin: 0;
  font-weight: 700;
  color: var(--text);
}

.myComponentText {
  margin: 8px 0 0;
  color: var(--muted);
}
```

---

**Last Updated**: March 2026  
**Version**: 2.0 (Modern Dark Theme)
