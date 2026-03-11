# PromptPortal Design System

## Overview
PromptPortal now features a modern, clean developer-style dark theme inspired by platforms like Vercel, GitHub, and Stripe. The design emphasizes readability, accessibility, and a professional appearance.

## Color Palette

### Dark Theme (Default)
```css
--bg: #0f172a;           /* Primary background */
--bg2: #111827;          /* Secondary background (gradients) */
--surface: #1e293b;      /* Cards, sections, surfaces */
--surface-hover: #334155; /* Surface hover state */
--border: #334155;       /* Borders and dividers */
--text: #f1f5f9;         /* Primary text */
--text-secondary: #cbd5e1; /* Secondary text */
--muted: #94a3b8;        /* Tertiary text (muted) */
--muted-2: #64748b;      /* Muted secondary */
```

### Accent Colors
```css
--primary: #3b82f6;      /* Blue - Main CTA, links, accents */
--primary-dark: #1e40af; /* Dark blue - Hover state */
--accent: #6366f1;       /* Indigo - Alternative accent */
--accent-light: #818cf8; /* Light indigo */
--success: #22c55e;      /* Green - Success states */
--danger: #ef4444;       /* Red - Error states */
```

### Light Theme
The light theme uses inverse colors with similar structure:
- `--bg: #f9fafb` (Light background)
- `--surface: #f3f4f6` (Light surfaces)
- `--text: #111827` (Dark text)
- Same accent colors as dark theme

## Design Principles

### 1. **Solid Backgrounds**
- No gradients behind text or interactive elements
- Use solid colors for clarity and readability
- Gradients allowed only for decorative accent bars and buttons

### 2. **Subtle Hover Effects**
Instead of colorful highlights:
- Vertical translate: `transform: translateY(-2px)`
- Background color change to `--surface-hover`
- Border color change to `--primary`
- Soft shadow for depth: `var(--shadow-sm)`

### 3. **Typography**
- **Font Family**: System fonts for performance and native look
- **Heading**: Font-weight 700, tracking -0.6px
- **Body**: Font-weight 400-500, line-height 1.6
- **Labels**: Font-weight 500, font-size 14px
- **Code**: Monospace font at 13px

### 4. **Spacing**
- **Base unit**: 4px
- **Cards**: 14px padding
- **Sections**: 22px padding
- **Gap between elements**: 10-12px

### 5. **Border Radius**
```
--radius-lg: 12px  /* Large elements (cards, modals) */
--radius-md: 8px   /* Medium elements (buttons, inputs) */
--radius-sm: 6px   /* Small elements (chips, badges) */
```

## Components

### Buttons
**Primary Button**
```css
background: var(--primary);
color: white;
border: 1px solid var(--primary);
```

**Secondary Button**
```css
background: rgba(99, 102, 241, 0.1);
color: var(--accent);
border: 1px solid var(--accent);
```

**Ghost Button**
```css
background: transparent;
border: 1px solid var(--border);
color: var(--text);
```

### Cards
- Background: `var(--bg)` or `var(--surface)`
- Border: `1px solid var(--border)`
- No shadow by default
- On hover: shift up 3px, border to primary, add shadow

### Input Fields
- Background: `var(--bg)`
- Border: `1px solid var(--border)`
- Focus: Blue border + ring shadow
- Placeholder: `var(--muted-2)`

### Navigation Links
- Default color: `var(--muted)`
- Active state: Blue background with 10% opacity, primary text
- Underline indicator on hover/active

## Shadow System

```css
--shadow: 0 12px 28px rgba(0, 0, 0, 0.35);      /* Large shadows */
--shadow-soft: 0 4px 12px rgba(0, 0, 0, 0.2);   /* Medium shadows */
--shadow-sm: 0 2px 6px rgba(0, 0, 0, 0.15);     /* Small shadows */
```

## Focus States
All interactive elements use:
```css
box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
```

## Transitions
Standard transition timing:
```css
transition: 180ms-200ms ease
```

## Accessibility

### Contrast
- Primary text on background: WCAG AAA compliant
- Secondary text meets WCAG AA standard
- Minimum 4.5:1 ratio for text

### Focus Indicators
- Blue ring on all interactive elements
- Visible at 3px radius
- High contrast against background

### Motion
Respects `prefers-reduced-motion`:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.001ms !important;
    transition-duration: 0.001ms !important;
  }
}
```

## Responsive Design

### Breakpoints
- **Desktop**: 1200px+ (full layout)
- **Tablet**: 980px (hide nav, show mobile menu)
- **Mobile**: 720px (single column)

### Mobile Considerations
- Touch targets minimum 44x44px
- Full-width search on mobile
- Single column grid
- Sidebar converted to overlay

## Theming Implementation

The theme is toggled via CSS classes on `<html>` element:
```javascript
// Dark theme (default)
document.documentElement.classList.remove('theme-light')

// Light theme
document.documentElement.classList.add('theme-light')
```

## Best Practices

### 1. When Adding New Components
- Use CSS custom properties (variables)
- Follow the shadow system
- Implement proper focus states
- Test contrast ratios
- Ensure mobile responsiveness

### 2. When Modifying Existing Styles
- Preserve the solid background approach
- Use accent colors sparingly
- Maintain 180-200ms transition times
- Keep animations subtle

### 3. Color Usage Guidelines
- **Primary accent** (#3b82f6): Links, CTAs, active states
- **Accent** (#6366f1): Secondary actions, alternative highlights
- **Success** (#22c55e): Confirmations, success messages
- **Danger** (#ef4444): Errors, warnings, destructive actions

## Code Blocks & Pre-formatted Text
```css
background: var(--code-bg);  /* #1e293b */
border: 1px solid var(--code-border); /* #334155 */
color: var(--text-secondary);
font-family: 'Fira Code', monospace;
```

## Animation

### Smooth Entrance
```css
animation: fadeIn 220ms ease both;

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Hover Effects
- Translate Y: `-2px` to `-3px`
- No scaling (removed to avoid distortion)
- Add soft shadow for depth

## Maintenance

### Updating the Theme
All theme variables are defined in `:root` selector in `/src/css/style.css`. Modify the variables there and all components will automatically update.

### Light Theme Updates
Make corresponding changes in `html.theme-light` selector to maintain consistency.

### Testing
- Test both dark and light themes
- Verify focus states on keyboard navigation
- Check contrast ratios with a tool like WebAIM
- Test on mobile devices and different screen sizes
- Verify animations respect `prefers-reduced-motion`

## Resources
- [Tailwind CSS Colors](https://tailwindcss.com/docs/customizing-colors)
- [WCAG Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [WebAIM Accessibility](https://webaim.org/)
- [Design System Resources](https://www.designsystems.com/)
