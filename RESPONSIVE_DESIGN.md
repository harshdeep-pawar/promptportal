# PromptPortal Responsive Design Guide

## Overview

PromptPortal now features a fully responsive design with optimized breakpoints and mobile-first approach. The website works seamlessly on all screen sizes from 320px (mobile) to 1400px+ (desktop).

## Responsive Breakpoints

The website uses four main breakpoints for responsive design:

```
Mobile:       up to 479px    (phones, small devices)
Tablet:       480px - 767px  (tablets, small screens)
Tablet+:      768px - 1023px (larger tablets, iPads)
Desktop:      1024px+        (desktops, large screens)
```

### CSS Variables
```css
--bp-mobile: 480px
--bp-tablet: 768px
--bp-desktop: 1024px
```

## Key Responsive Features

### 1. Fixed Navbar Height

**Desktop (1024px+):**
```css
--navH: 64px
```

**Tablet (768px - 1023px):**
```css
--navH: 56px
```

**Mobile (up to 767px):**
```css
--navH: 52px
```

### 2. Mobile Hamburger Menu

- ✅ Slides up smoothly with animation (0.3s)
- ✅ Dark overlay with blur effect
- ✅ Closes on Escape key
- ✅ Closes when navigating
- ✅ Touch-friendly interaction

```jsx
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### 3. Responsive Search Bar

**Desktop:** 260px min-width
**Tablet:** 180-220px max-width
**Mobile:** Hidden or full-width on focus

```css
/* Desktop */
.searchWrap { min-width: 260px; }

/* Tablet */
@media (max-width: 768px) {
  .searchWrap { max-width: 220px; }
}

/* Mobile */
@media (max-width: 767px) {
  .searchWrap { max-width: 180px; }
}

/* Extra small */
@media (max-width: 479px) {
  .searchWrap { display: none; }
}
```

### 4. Touch-Friendly Components

#### Button Touch Targets
```css
.btn {
  min-height: 44px;  /* Minimum touch target size */
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.iconBtn {
  height: 40px;      /* 40x40 minimum */
  width: 40px;
}
```

#### Touch Feedback (no hover)
```css
@media (hover: hover) {
  /* Hover effects only on devices that support hover */
  .btn:hover { /* ... */ }
}

/* Touch-friendly active state */
.btn:active {
  transform: scale(0.98);
  background: var(--bg);
}

.iconBtn:active {
  transform: scale(0.95);
  background: var(--surface-hover);
}
```

### 5. Prevent Horizontal Scrolling

```css
html,
body {
  width: 100%;
  overflow-x: hidden;
}
```

### 6. Responsive Typography

Headings scale smoothly across screen sizes:

```css
/* Desktop */
.heroTitle { font-size: 40px; }

/* Tablet */
@media (max-width: 768px) {
  .heroTitle { font-size: 32px; }
}

/* Mobile */
@media (max-width: 767px) {
  .heroTitle { 
    font-size: clamp(20px, 5vw, 28px);
  }
}
```

### 7. Responsive Spacing

Adaptive padding and margins for each breakpoint:

**Desktop:** 22px padding
**Tablet:** 18px padding
**Mobile:** 14px padding
**Extra Small:** 12px padding

```css
.pageInner {
  padding: 22px;  /* Desktop */
}

@media (max-width: 768px) {
  .pageInner { padding: 18px; }
}

@media (max-width: 767px) {
  .pageInner { padding: 14px; }
}

@media (max-width: 479px) {
  .pageInner { padding: 12px; }
}
```

## Component Responsiveness

### Navbar

| Component | Desktop | Tablet | Mobile |
|-----------|---------|--------|--------|
| Brand | Full text | Full text | Icon only |
| Nav links | Visible | Hidden | Hidden |
| Search | Full | Reduced | Hidden |
| Hamburger | Hidden | Visible | Visible |
| Height | 64px | 56px | 52px |

### Sidebar

| Screen | Display | Mode |
|--------|---------|------|
| Desktop | Visible | Fixed |
| Tablet+ | Hidden | Mobile overlay |
| Mobile | Hidden | Mobile overlay |

### Cards/Grid

| Screen | Columns | Width |
|--------|---------|-------|
| Desktop | 6 + 6 | Full |
| Tablet+ | Full | 100% |
| Mobile | Full | 100% |
| Extra small | Full | 100% |

### Search Bar

| Screen | Display | Width | Font size |
|--------|---------|-------|-----------|
| Desktop | Visible | 260px | 14px |
| Tablet | Visible | 220px | 14px |
| Mobile | Hidden | - | - |
| Extra small | Hidden | - | - |

## CSS Media Query Patterns

### Basic Responsive Pattern
```css
/* Desktop First (desktop as base) */
.component {
  /* Desktop styles */
}

@media (max-width: 1023px) {
  /* Tablet+ */
  .component { /* ... */ }
}

@media (max-width: 767px) {
  /* Mobile */
  .component { /* ... */ }
}

@media (max-width: 479px) {
  /* Extra small */
  .component { /* ... */ }
}
```

### Touch-Aware Styling
```css
/* Devices that don't support hover (touch devices) */
@media (hover: none) {
  .component:hover { display: none; }
  .component:active { /* Touch feedback */ }
}

/* Desktop with hover support */
@media (hover: hover) {
  .component:hover { /* Hover effects */ }
}
```

### High Density Displays
```css
@media (min-width: 1440px) {
  /* Extra large screens */
  .container { max-width: 1440px; }
}
```

## Mobile Optimization Checklist

### Viewport
- [x] Proper viewport meta tag (set in index.html)
- [x] Width = device-width
- [x] Initial-scale = 1.0
- [x] No zoom on input (mobile)

```html
<meta name="viewport" 
      content="width=device-width, initial-scale=1.0, 
               maximum-scale=5.0, user-scalable=yes">
```

### Touch Targets
- [x] All buttons ≥ 44x44px
- [x] All clickable elements properly spaced
- [x] No small, hard-to-tap elements

### Typography
- [x] Font size ≥ 14px base
- [x] Line height ≥ 1.6
- [x] Proper contrast on all backgrounds
- [x] Scales smoothly with viewport

### Performance
- [x] No horizontal scrolling
- [x] Minimal animations on mobile
- [x] Optimized images
- [x] Lazy loading where applicable

### Accessibility
- [x] Focus indicators visible
- [x] Keyboard navigation works
- [x] Screen reader friendly
- [x] Proper heading hierarchy

### Testing
- [x] Tested on 320px - 2560px
- [x] Tested on iOS and Android
- [x] Tested in Chrome, Firefox, Safari
- [x] Touch interactions work smoothly
- [x] No layout shifts or jank

## Implementation Tips

### 1. Mobile-First Approach
Start with mobile styles, then add complexity for larger screens:

```css
/* Mobile base (up to 479px) */
.component { /* mobile styles */ }

/* Add tablet styles */
@media (min-width: 480px) { /* ... */ }

/* Add desktop styles */
@media (min-width: 768px) { /* ... */ }
```

### 2. Use Flexible Layouts
```css
/* Use flexbox instead of fixed widths */
.container {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

/* Use grid with auto-fit */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}
```

### 3. Responsive Images
```css
img {
  max-width: 100%;
  height: auto;
}

.hero-image {
  width: 100%;
  object-fit: cover;
}
```

### 4. Text Scaling
```css
h1 {
  font-size: clamp(20px, 5vw, 40px);
}

p {
  font-size: clamp(14px, 2vw, 16px);
}
```

### 5. Spacing Scale
```css
:root {
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 12px;
  --space-lg: 16px;
  --space-xl: 24px;
}

@media (max-width: 767px) {
  /* Reduce spacing on mobile */
  :root {
    --space-lg: 12px;
    --space-xl: 16px;
  }
}
```

## Common Responsive Patterns

### Sidebar Toggle
```jsx
const [sidebarOpen, setSidebarOpen] = useState(false)

// Hide on desktop, show as overlay on mobile
return (
  <>
    <button onClick={() => setSidebarOpen(!sidebarOpen)}>
      Menu
    </button>
    {sidebarOpen && <Sidebar />}
  </>
)
```

### Responsive Grid
```css
.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 12px;
}

.card { grid-column: span 6; }

@media (max-width: 768px) {
  .card { grid-column: span 12; }
}
```

### Mobile Menu
```jsx
const [isOpen, setIsOpen] = useState(false)

return (
  <nav>
    <button 
      className="mobileOnly"
      onClick={() => setIsOpen(!isOpen)}
    >
      ☰
    </button>
    {isOpen && <Menu />}
  </nav>
)
```

## Performance Considerations

### Image Optimization
```html
<img 
  src="image-mobile.jpg"
  srcset="image-tablet.jpg 768w, image-desktop.jpg 1024w"
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

### Critical CSS
Load only the CSS needed for initial render, load the rest later.

### Lazy Loading
```html
<img loading="lazy" src="..." />
```

### Viewport-Aware Loading
```javascript
const isMobile = window.innerWidth < 768
if (!isMobile) loadHeavyAssets()
```

## Debugging Responsive Design

### Chrome DevTools
1. Press F12
2. Click toggle device toolbar (Ctrl+Shift+M)
3. Select device or custom dimensions
4. Test at different breakpoints

### Testing Tools
- [Responsively App](https://responsively.app/)
- [BrowserStack](https://www.browserstack.com/)
- [Lambdatest](https://www.lambdatest.com/)
- [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)

### Common Issues
- Horizontal scrolling: Check for fixed-width elements
- Overflow text: Add word-break: break-word
- Small touch targets: Ensure ≥ 44px height/width
- Layout shifts: Use aspect-ratio for known dimensions

## Browser Support

✅ Chrome 90+
✅ Firefox 88+
✅ Safari 14+
✅ Edge 90+
✅ iOS Safari 14+
✅ Android Chrome 90+

## Lighthouse Mobile Scores

Current performance targets:
- Performance: ≥ 90
- Accessibility: ≥ 95
- Best Practices: ≥ 95
- SEO: ≥ 95

## Resources

- [MDN: Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [Web.dev: Responsive Design](https://web.dev/responsive-web-design-basics/)
- [CSS Tricks: Media Queries](https://css-tricks.com/a-complete-guide-to-media-queries/)
- [A List Apart: Responsive Design](https://alistapart.com/article/responsive-web-design/)

## Quick Reference

```css
/* Mobile first base */
.component { /* mobile: 320-479px */ }

/* Tablet */
@media (min-width: 480px) { /* 480-767px */ }

/* Tablet Plus */
@media (min-width: 768px) { /* 768-1023px */ }

/* Desktop */
@media (min-width: 1024px) { /* 1024px+ */ }

/* Large Desktop */
@media (min-width: 1440px) { /* 1440px+ */ }

/* Touch device */
@media (hover: none) { /* Touch-only */ }

/* Hover capable */
@media (hover: hover) { /* Hover support */ }

/* High DPI */
@media (-webkit-min-device-pixel-ratio: 2) { /* Retina */ }
```

---

**Last Updated**: March 2026
**Status**: Production Ready
