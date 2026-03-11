# Responsive Design Troubleshooting Guide

## Quick Fixes for Common Mobile Issues

### Issue 1: Horizontal Scrolling on Mobile

**Symptoms:** User can scroll left/right on mobile, extra space on the right

**Causes:**
- Element wider than viewport
- Padding/margin pushing content beyond 100vw
- Fixed-width containers
- Table overflow
- Images without max-width

**Solutions:**

```css
/* 1. Set overflow-x hidden on body */
html, body {
  overflow-x: hidden;
  width: 100%;
}

/* 2. Ensure all containers are responsive */
.container {
  width: 100%;
  max-width: 100%;
  padding: 0 16px;
}

/* 3. Make images responsive */
img {
  max-width: 100%;
  height: auto;
  display: block;
}

/* 4. Handle tables on mobile */
@media (max-width: 767px) {
  table {
    font-size: 13px;
    width: 100%;
    overflow-x: auto;
  }
}

/* 5. Check for margin/padding issues */
* {
  box-sizing: border-box;
}
```

**Debug:** Open DevTools → Right-click element → Check computed width

---

### Issue 2: Text Too Small to Read

**Symptoms:** Font size is 10-12px, hard to read on mobile

**Causes:**
- Fixed small font sizes
- Misunderstanding of viewport meta tag
- No responsive font scaling

**Solutions:**

```css
/* 1. Use minimum readable size */
body {
  font-size: 14px;  /* Minimum on mobile */
}

/* 2. Scale headings responsively */
h1 {
  font-size: clamp(20px, 5vw, 40px);
}

h2 {
  font-size: clamp(18px, 4vw, 32px);
}

h3 {
  font-size: clamp(16px, 3vw, 24px);
}

/* 3. Use relative sizing */
body { font-size: 16px; }
h1 { font-size: 2.5em; }  /* 40px */
h2 { font-size: 2em; }    /* 32px */

/* 4. Adjust by breakpoint */
@media (max-width: 480px) {
  h1 { font-size: 20px; }
  h2 { font-size: 18px; }
  p { font-size: 14px; }
}
```

**Debug:** DevTools → Element → Check font-size in computed styles

---

### Issue 3: Buttons/Links Too Small to Tap

**Symptoms:** Users complain about difficulty tapping buttons, accidentally tap wrong element

**Causes:**
- Touch target < 44x44 pixels
- Insufficient padding
- Button content takes up all space

**Solutions:**

```css
/* 1. Minimum touch target size */
.btn, a, button {
  min-height: 44px;
  min-width: 44px;
  padding: 10px 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* 2. Increase padding for small elements */
.iconBtn {
  height: 44px;
  width: 44px;
}

/* 3. Add space between elements */
.btn + .btn {
  margin-left: 8px;
}

/* 4. Ensure proper line-height for text buttons */
.btn {
  line-height: 1.5;
  padding: 10px 16px;
}

/* 5. Test with inspection */
.btn {
  /* Show visual guide on mobile */
  @media (max-width: 767px) {
    outline: 1px solid red;  /* Temporary debug outline */
  }
}
```

**Debug:** 
1. DevTools → Pointer Events: Check hover target size
2. Manually test on actual device
3. Use Chrome DevTools device emulation and test tapping

---

### Issue 4: Search Bar Breaking Layout on Mobile

**Symptoms:** Search bar is too wide, pushes content down, overlaps navbar on mobile

**Causes:**
- Fixed min-width on mobile
- No responsive resizing
- Flex layout not accounting for mobile

**Solutions:**

```css
/* 1. Responsive search width */
.searchWrap {
  min-width: 260px;  /* Desktop */
}

@media (max-width: 1023px) {
  .searchWrap {
    min-width: 0;
    flex: 1;
    max-width: 280px;
  }
}

@media (max-width: 768px) {
  .searchWrap {
    max-width: 220px;
  }
}

@media (max-width: 767px) {
  .searchWrap {
    max-width: 180px;
  }
}

@media (max-width: 479px) {
  .searchWrap {
    display: none;  /* Hide on extra small phones */
  }
}

/* 2. Ensure input doesn't overflow */
.searchInput {
  width: 100%;
  max-width: 100%;
}

/* 3. Use flex for navbar */
.navbar {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.searchWrap {
  flex-shrink: 0;
}
```

**Debug:** Open DevTools, toggle device toolbar, resize and watch layout

---

### Issue 5: Mobile Menu Doesn't Open/Close

**Symptoms:** Hamburger menu button doesn't respond, menu gets stuck

**Causes:**
- Missing onClick handler
- z-index conflict
- Event propagation issues
- Overlay blocking clicks

**Solutions:**

```jsx
/* React Component Fix */
const [menuOpen, setMenuOpen] = useState(false)

return (
  <>
    {/* Hamburger button - ensure it's clickable */}
    <button
      type="button"
      className="iconBtn mobileOnly"
      onClick={() => setMenuOpen(!menuOpen)}
      aria-label="Toggle menu"
      aria-expanded={menuOpen}
    >
      ☰
    </button>

    {/* Overlay - ensure it closes menu */}
    {menuOpen && (
      <div
        className="overlay"
        onClick={() => setMenuOpen(false)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Escape') setMenuOpen(false)
        }}
      >
        {/* Menu - stop propagation */}
        <nav
          className="sidebar sidebarMobile"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Menu items */}
        </nav>
      </div>
    )}
  </>
)
```

```css
/* CSS Fix */
.overlay {
  position: fixed;
  inset: 0;
  z-index: 60;
  background: rgba(0, 0, 0, 0.5);
  animation: fadeIn 200ms ease forwards;
}

.sidebarMobile {
  position: fixed;
  z-index: 70;  /* Higher than overlay */
  animation: slideUp 300ms ease forwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

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

**Debug:**
1. Check React DevTools: is state changing?
2. Check z-index: is menu behind overlay?
3. Check event listeners: is onClick firing?
4. Check CSS: is menu hidden by overflow or display?

---

### Issue 6: Layout Shifts on Mobile (Cumulative Layout Shift - CLS)

**Symptoms:** Content jumps around as page loads, text moves unexpectedly

**Causes:**
- Lazy-loaded images without dimensions
- Fonts loading and changing size
- Ads loading and pushing content
- Scrollbar appearing/disappearing

**Solutions:**

```css
/* 1. Reserve space for images */
img {
  aspect-ratio: 16 / 9;
  width: 100%;
  height: auto;
}

/* 2. Use width and height attributes */
<img 
  src="image.jpg"
  width="1200"
  height="675"
  alt="Description"
/>

/* 3. Avoid dynamic content shifts */
@media (max-width: 767px) {
  /* Mobile: no side effects from layout changes */
  .sidebar { display: none; }
}

/* 4. Use content-visibility to prevent reflows */
.card {
  contain: layout;
}

/* 5. Reserve space for dynamic elements */
.ad-space {
  min-height: 60px;
}

/* 6. Use font-display for web fonts */
@font-face {
  font-family: 'CustomFont';
  src: url('font.woff2') format('woff2');
  font-display: swap;  /* Swap immediately */
}

/* 7. Avoid margin collapse */
.container {
  overflow: hidden;  /* Prevents margin collapse */
}
```

**Debug:**
1. Run Lighthouse: Check CLS score in Performance
2. DevTools → Performance → Record
3. Look for layout shifts in main thread activity

---

### Issue 7: Focus Visible States Not Showing

**Symptoms:** Keyboard users can't see which element is focused

**Causes:**
- Browser default removed with outline: none
- No focus-visible state defined
- Focus not visible on dark background

**Solutions:**

```css
/* 1. Define proper focus states */
button, a, input {
  outline: none;  /* Remove browser default */
}

button:focus-visible,
a:focus-visible,
input:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

/* 2. Custom focus ring */
.btn:focus-visible {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

/* 3. Ensure contrast */
html.theme-light .btn:focus-visible {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}

/* 4. For complex elements */
.card:focus-within {
  box-shadow: inset 0 0 0 2px var(--primary);
}

/* 5. Testing focus states */
@media (prefers-reduced-motion: reduce) {
  * {
    transition-duration: 0.01ms !important;
  }
}
```

**Debug:**
1. Press Tab key: Can you see highlighted element?
2. DevTools → Styles: Check :focus-visible styles
3. Use axe DevTools: Check focus indicators

---

### Issue 8: Text Selection Issues on Mobile

**Symptoms:** User can't select/copy text easily, triple-tap doesn't work

**Causes:**
- user-select: none applied too broadly
- Poor styling of selected text
- Font rendering issues

**Solutions:**

```css
/* 1. Allow text selection */
* {
  user-select: text !important;  /* Override if needed */
}

/* 2. Style selected text for readability */
::selection {
  background: var(--primary);
  color: white;
}

/* 3. Don't disable selection on interactive elements */
.btn {
  user-select: none;  /* OK for buttons */
}

.text-content {
  user-select: text;  /* OK for content */
}

/* 4. Improve font rendering */
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
```

**Debug:** Try to select text on mobile device, use long-press menu

---

### Issue 9: Input Zooms on Focus (iOS)

**Symptoms:** Tapping an input field causes iOS to zoom in

**Causes:**
- Font size < 16px on input
- Safari accessibility feature

**Solutions:**

```css
/* 1. Use 16px minimum font size on inputs */
input, textarea, select {
  font-size: 16px;  /* Prevents iOS zoom */
}

/* 2. Prevent zoom on form inputs */
@media screen and (max-device-width: 667px) {
  input, textarea, select {
    font-size: 16px;
  }
}

/* 3. Don't disable zoom entirely */
/* Keep user-scalable=yes in viewport meta tag */
```

**Fix in index.html:**
```html
<meta name="viewport" 
      content="width=device-width, initial-scale=1.0, 
               maximum-scale=5.0, user-scalable=yes">
```

**Debug:** Test on actual iOS device or simulator

---

### Issue 10: Slow Performance on Mobile

**Symptoms:** Page loads slowly, interactions are sluggish, animations stutter

**Causes:**
- Large unoptimized images
- Heavy JavaScript
- Inefficient CSS (too many selectors)
- Layout thrashing
- Missing hardware acceleration

**Solutions:**

```css
/* 1. Optimize animations */
.animated {
  will-change: transform;  /* Hint to browser */
  transform: translateZ(0);  /* Enable GPU acceleration */
}

/* 2. Reduce animation complexity */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
  }
}

/* 3. Lazy load non-critical content */
img { loading: lazy; }

/* 4. Use transform over position */
.element {
  transform: translateX(10px);  /* Better than left: 10px */
}

/* 5. Optimize paint operations */
.sticky-header {
  contain: layout paint;
}

/* 6. Reduce bundle size */
/* Remove unused CSS, minify, code split */

/* 7. Remove jank (JavaScript) */
// Debounce scroll events
function debounce(fn, delay) {
  let timeout
  return function(...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), delay)
  }
}

window.addEventListener('scroll', debounce(() => {
  // scroll handler
}, 200))
```

**Debug:**
1. Lighthouse → Performance: Check metrics
2. DevTools → Performance: Record and analyze
3. WebPageTest: Detailed performance breakdown

---

## Quick Diagnostics Checklist

Run through this when mobile issues occur:

```
□ Is horizontal scrolling prevented?
  html, body { overflow-x: hidden; }

□ Is viewport meta tag correct?
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

□ Are font sizes responsive?
  body { font-size: clamp(14px, 2vw, 16px); }

□ Are touch targets 44x44px minimum?
  .btn { min-height: 44px; min-width: 44px; }

□ Are images responsive?
  img { max-width: 100%; height: auto; }

□ Are media queries correct?
  @media (max-width: 767px) { ... }

□ Are focus states visible?
  :focus-visible { box-shadow: var(--ring); }

□ Is animation performance good?
  @media (prefers-reduced-motion: reduce) { ... }

□ Is content readable on small screens?
  Font ≥ 14px, contrast ≥ 4.5:1

□ Does menu open and close?
  Check onClick, z-index, overlay
```

---

## Testing on Real Devices

### iPhone Testing
1. Safari: Settings → Developer → Enable remote debugging
2. Chrome: chrome://inspect on desktop
3. Test with network throttling: Settings → Throttling

### Android Testing
1. Enable USB debugging
2. Connect to computer
3. Chrome DevTools → Remote devices
4. Test with Developer Options settings

### Network Simulation
```javascript
// Simulate slow 3G
DevTools → Network → Throttling → Slow 3G

// Simulate offline
DevTools → Network → Offline
```

---

## Browser Console Utilities

```javascript
// Check if mobile
const isMobile = window.innerWidth < 768
console.log('Is mobile:', isMobile)

// Get viewport dimensions
console.log('Width:', window.innerWidth)
console.log('Height:', window.innerHeight)
console.log('DPR:', window.devicePixelRatio)

// Get page metrics
console.log('CLS:', window.CLS || 'not available')
console.log('FCP:', performance.getEntriesByName('first-contentful-paint')[0])
console.log('LCP:', performance.getEntriesByName('largest-contentful-paint')[0])

// Get memory usage
console.log('Memory:', performance.memory)

// Measure action performance
console.time('action')
// ... do something ...
console.timeEnd('action')
```

---

**Last Updated**: March 2026
**Status**: Troubleshooting Reference
