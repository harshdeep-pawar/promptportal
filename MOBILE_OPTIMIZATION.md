# Mobile Optimization Guide for PromptPortal

## Overview

This guide provides best practices for maintaining and improving mobile performance and usability of PromptPortal.

## Mobile-First Development

### Principle 1: Mobile is the Base
Start development with mobile (320px) as the base, then enhance for larger screens.

```css
/* ✅ Good: Mobile first */
.component { /* 320px base styles */ }
@media (min-width: 768px) { /* Enhanced for tablets */ }
@media (min-width: 1024px) { /* Enhanced for desktop */ }

/* ❌ Bad: Desktop first (will be complex) */
.component { /* Desktop styles */ }
@media (max-width: 1023px) { /* Remove things for mobile */ }
```

### Principle 2: Progressive Enhancement
Enhance functionality as screen space allows:

```jsx
/* Mobile: Show essential features */
/* Tablet: Show secondary features */
/* Desktop: Show all features + advanced options */
```

## Touch-Friendly Design

### Button & Link Sizing

✅ **Minimum 44x44px** for touch targets

```css
.btn {
  min-height: 44px;
  min-width: 44px;
  padding: 10px 14px;
}

.iconBtn {
  height: 40px;
  width: 40px;
}
```

### Spacing for Touch

Add padding around interactive elements to prevent accidental taps:

```css
.navLink {
  padding: 8px 12px;  /* Larger touch area */
  margin: 4px;        /* Space between items */
}
```

### Touch Feedback

Provide immediate visual feedback on touch:

```css
.btn:active {
  transform: scale(0.98);
  background: var(--bg);
}

.iconBtn:active {
  transform: scale(0.95);
  background: var(--surface-hover);
}
```

### No Hover on Touch Devices

```css
@media (hover: hover) {
  /* Only apply hover styles on hover-capable devices */
  .btn:hover { transform: translateY(-1px); }
}

@media (hover: none) {
  /* On touch devices, use active state instead */
  .btn:first-child { margin-top: 0; }
}
```

## Performance Optimization

### Code Splitting

```javascript
// Load heavy components only on desktop
const HeavyComponent = lazy(() => import('./HeavyComponent'))

function App() {
  const isDesktop = window.innerWidth >= 1024
  
  return isDesktop ? <HeavyComponent /> : null
}
```

### Lazy Loading

```html
<!-- Images load only when visible -->
<img 
  loading="lazy" 
  src="image.jpg" 
  alt="Description"
/>
```

### Responsive Images

```html
<!-- Load appropriate image size for device -->
<img 
  srcset="
    image-small.jpg 480w,    /* Mobile */
    image-medium.jpg 768w,   /* Tablet */
    image-large.jpg 1024w    /* Desktop */
  "
  sizes="
    (max-width: 480px) 100vw,
    (max-width: 768px) 80vw,
    50vw
  "
  src="image-large.jpg"
  alt="Description"
/>
```

## Common Mobile Issues & Solutions

### Issue 1: Horizontal Scrolling

❌ **Problem:**
```css
.container { width: 500px; }  /* Larger than 480px mobile */
```

✅ **Solution:**
```css
.container { 
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
}
```

### Issue 2: Text Too Small

❌ **Problem:**
```css
body { font-size: 10px; }
```

✅ **Solution:**
```css
body { font-size: clamp(14px, 2vw, 16px); }
```

### Issue 3: Touch Target Too Small

❌ **Problem:**
```css
.btn { padding: 4px 8px; }  /* Only 22px height */
```

✅ **Solution:**
```css
.btn { 
  padding: 10px 14px;  /* 40px+ height */
  min-height: 44px;
}
```

### Issue 4: Form Inputs Not Mobile-Friendly

❌ **Problem:**
```html
<input type="text" />  <!-- Shows large keyboard, hard to submit -->
```

✅ **Solution:**
```html
<input 
  type="search"
  inputmode="search"
  autocomplete="off"
/>
<button type="submit">Search</button>
```

### Issue 5: No Visible Focus States

❌ **Problem:**
```css
button {
  border: none;
  outline: none;  /* Removes all focus indicator */
}
```

✅ **Solution:**
```css
button {
  outline: none;  /* Remove browser default */
  box-shadow: var(--ring);  /* Add custom focus ring */
}

button:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}
```

## Navigation Patterns

### Mobile Hamburger Menu

```jsx
const [isOpen, setIsOpen] = useState(false)

return (
  <>
    {/* Menu button - only on mobile */}
    <button 
      className="iconBtn mobileOnly"
      onClick={() => setIsOpen(!isOpen)}
      aria-label="Open menu"
    >
      <svg>Menu icon</svg>
    </button>

    {/* Mobile menu - slides from side */}
    {isOpen && (
      <div className="overlay" onClick={() => setIsOpen(false)}>
        <nav className="sidebar sidebarMobile">
          {/* Navigation items */}
        </nav>
      </div>
    )}
  </>
)
```

### Tab Navigation

```css
.tabs {
  display: flex;
  gap: 0;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;  /* Smooth scroll on iOS */
}

.tab {
  white-space: nowrap;
  padding: 12px 14px;
  min-height: 44px;
}
```

### Bottom Navigation (for apps)

```css
.bottomNav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  height: 56px;
  background: var(--surface);
}
```

## Form Optimization

### Input Types

```html
<!-- Email input - shows @ keyboard -->
<input type="email" />

<!-- Search input - shows search keyboard -->
<input type="search" />

<!-- Number input - shows number keyboard -->
<input type="number" />

<!-- Phone input - shows phone keyboard -->
<input type="tel" />

<!-- URL input - shows URL keyboard -->
<input type="url" />
```

### Input Sizing

```css
input[type="text"],
input[type="email"],
input[type="search"] {
  font-size: 16px;  /* Prevents zoom on iOS input focus */
  padding: 10px 12px;
  min-height: 44px;
}
```

### Labels

```html
<!-- Proper labels improve mobile UX -->
<label for="email">Email address</label>
<input id="email" type="email" />
```

## Testing on Mobile

### Physical Devices

Test on actual devices:
- iPhone 13 Mini (320px)
- iPhone 13/14 Pro (390px)
- iPhone 6/7/8 Plus (414px)
- iPad Mini (768px)
- iPad Pro (1024px+)

### Browser DevTools

Chrome DevTools can simulate mobile:

1. Open DevTools (F12)
2. Click "Toggle device toolbar" (Ctrl+Shift+M)
3. Select device or custom dimensions
4. Test at different breakpoints

### Common Breakpoints to Test

```
320px   - Smallest phones
375px   - iPhone 6/7/8
480px   - Larger phones
600px   - Small tablets
768px   - Medium tablets
1024px  - Large tablets/desktop
1440px  - Desktop
2560px  - Ultra-wide
```

### Performance Testing

```javascript
// Measure page load time
console.time('page-load')
window.addEventListener('load', () => {
  console.timeEnd('page-load')
})

// Check memory usage
console.log(performance.memory)

// Measure paint timing
try {
  const entries = performance.getEntriesByType('paint')
  entries.forEach(entry => {
    console.log(`${entry.name}: ${entry.startTime}ms`)
  })
} catch (e) {}
```

## Accessibility on Mobile

### Touch Alternative for Hover

```css
/* Hide hover-dependent content on touch devices */
@media (hover: none) {
  .tooltip {
    display: none;
  }
}
```

### Screen Reader Testing

- Test with VoiceOver (iOS)
- Test with TalkBack (Android)
- Ensure proper heading hierarchy
- Use semantic HTML

### Color Contrast

Ensure sufficient contrast as mobile screens are often used in bright environments:

- Text: 4.5:1 minimum (4.5:1 AA, 7:1 AAA)
- Graphics: 3:1 minimum

## Mobile Analytics

Track mobile-specific metrics:

```javascript
// Page load time
performance.timing.loadEventEnd - performance.timing.navigationStart

// Time to interactive
performance.getEntriesByName('first-contentful-paint')[0]

// Mobile device detect
const isMobile = /iPhone|iPad|Android|webOS/.test(navigator.userAgent)

// Screen size
window.innerWidth
window.innerHeight
window.devicePixelRatio
```

## Best Practices Checklist

### Content
- [ ] Text is readable without zoom (16px base)
- [ ] Links are properly spaced (minimum 44x44px)
- [ ] Images are responsive and optimized
- [ ] No horizontal scrolling

### Navigation
- [ ] Hamburger menu works smoothly
- [ ] Back button is easily accessible
- [ ] Links have clear states (normal, hover, active)
- [ ] Focus indicators are visible

### Forms
- [ ] Inputs are easy to tap (min 44x44px)
- [ ] Proper input types for keyboards
- [ ] Clear submit button
- [ ] Error messages are visible
- [ ] Labels are associated with inputs

### Performance
- [ ] Page loads in under 3 seconds
- [ ] Images optimized for mobile
- [ ] No unnecessary JavaScript
- [ ] CSS is minified
- [ ] Critical resources prioritized

### Testing
- [ ] Works on 320px - 768px
- [ ] Touch interactions smooth
- [ ] Works on iOS and Android
- [ ] Works in Chrome, Firefox, Safari
- [ ] No layout shifts (CLS < 0.1)
- [ ] Lighthouse score ≥ 90

## Tools & Resources

### Testing Tools
- [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Responsively App](https://responsively.app/)

### Browser Support
- [caniuse.com](https://caniuse.com/)
- [MDN Browser Compatibility](https://developer.mozilla.org/en-US/)

### Performance
- [WebPageTest](https://www.webpagetest.org/)
- [Speedcurve](https://www.speedcurve.com/)

### Emulation
- [BrowserStack](https://www.browserstack.com/)
- [LambdaTest](https://www.lambdatest.com/)

## Common Mobile Pitfalls to Avoid

### ❌ Don't
- Use hover-only interactions
- Make touch targets < 44x44px
- Use fixed-width containers
- Make text too small
- Auto-play audio or video
- Use Flash or Java applets
- Require scroll in multiple directions
- Use large images without optimization
- Block the main thread with heavy JS
- Ignore keyboard navigation

### ✅ Do
- Use progressive enhancement
- Make everything touch-friendly
- Use flexible, responsive layouts
- Use readable font sizes (14px+)
- Require user interaction for media
- Use modern web standards
- Optimize for single-direction scroll
- Optimize and lazy-load images
- Keep main thread responsive
- Support full keyboard navigation

## Future Improvements

Potential enhancements to consider:

1. **Dark Mode Detection**: Auto-detect system dark mode preference
2. **Offline Support**: Add service worker for offline functionality
3. **Install Prompt**: Allow web app installation on home screen
4. **Notification API**: Push notifications for saved content
5. **Share API**: Native share button on supported devices
6. **Camera API**: QR code scanner for prompts
7. **Storage API**: Store user preferences locally
8. **Geolocation**: Location-based content recommendations

## Quick Reference

```css
/* Mobile viewport setup */
html, body { 
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}

/* Touch-friendly button */
.btn {
  min-height: 44px;
  padding: 10px 14px;
}

/* Responsive text */
body { font-size: clamp(14px, 2vw, 16px); }

/* Responsive breakpoints */
@media (max-width: 479px) { /* Mobile */ }
@media (max-width: 767px) { /* Mobile+ */ }
@media (max-width: 1023px) { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }

/* Touch feedback */
@media (hover: none) {
  .btn:active { transform: scale(0.98); }
}

/* Hide on mobile */
@media (max-width: 767px) {
  .desktopOnly { display: none; }
}

/* Show only on mobile */
@media (max-width: 767px) {
  .mobileOnly { display: block; }
}
```

---

**Last Updated**: March 2026
**Status**: Ready for Implementation
