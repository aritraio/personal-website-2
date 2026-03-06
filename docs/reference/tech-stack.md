# TechStack

## Why this document is detailed
This portfolio is intentionally built without frameworks, so implementation quality comes from clean structure, strong CSS architecture, and disciplined JavaScript patterns. A detailed document helps future updates stay consistent and prevents regressions in performance, accessibility, and UX.

---

## 1) Technology Stack Used in This Website

### Core Web Technologies
- **HTML5** for semantic structure (`header`, `nav`, `main`, `section`, `footer`) and content hierarchy.
- **CSS3** for theming, layout, motion, and responsive behavior.
- **Vanilla JavaScript (ES6+)** for interactions and progressive enhancement.

### No Framework / No Build Tool Strategy
- No React/Vue/Angular.
- No CSS framework.
- No bundler/transpiler requirement for runtime.
- Benefits: smaller runtime overhead, direct control, easier deploy to static hosts.

### Typography & Assets
- Google Fonts:
  - `Inter` (UI/body headings)
  - `JetBrains Mono` (terminal/code style accents)
- Static assets served from `assets/` (`css/`, `js/`, and `files/resume.pdf`).

### Hosting Model
- Static site architecture (compatible with GitHub Pages / Netlify / Vercel static hosting).

---

## 2) HTML / Document-Level Architecture

### SEO & Sharing Metadata
Implemented metadata includes:
- canonical URL
- robots (`index, follow`)
- Open Graph (`og:title`, `og:description`, `og:image`, `og:url`, etc.)
- Twitter card metadata
- Structured data with JSON-LD (`@type: Person`)

### Accessibility in Markup
- Skip link (`Skip to main content`) for keyboard users.
- ARIA labels in navigation and controls.
- `aria-live` support in role cycling text for assistive tech-friendly updates.
- `aria-expanded` state management in mobile navigation controls.
- Download CTA uses `download` attribute for one-click resume action.

### Content Sections
Current structure:
1. Hero
2. About
3. Skills
4. Experience
5. Projects
6. Contact

---

## 3) CSS System and Styling Strategy

### Design Token System (CSS Custom Properties)
The CSS is token-driven using `:root` and theme scopes:
- Typography scale (`--fs-*`, `--fw-*`, `--ff-*`)
- Spacing scale (`--space-*`)
- Radius and shadow tokens (`--radius-*`, `--shadow-*`)
- Duration/easing tokens (`--duration-*`, `--ease-*`)
- Color tokens by theme (`--color-*`)

### Theme Strategy
- Two explicit theme contexts:
  - `[data-theme="dark"]`
  - `[data-theme="light"]`
- Theme switch is variable-driven (not duplicated component CSS).
- Smooth visual transitions handled via tokenized transition durations/easing.

### Layout Strategy
- Mobile-first CSS baseline.
- `min-width` breakpoints for progressive desktop enhancements.
- CSS Grid for section-level composition.
- Flexbox for internal alignment (buttons, nav controls, card rows, etc.).

### Visual System Strategy
- Strong separation between base, components, utilities, animations, responsive blocks, print styles, and reduced-motion rules.
- Reusable component classes (`.btn`, `.skill-card`, `.project-card`, `.contact-card`, etc.) reduce style duplication.

---

## 4) JavaScript Architecture and Interaction Strategy

### Module-Style Initialization Pattern
`script.js` uses an IIFE wrapper and initializes feature modules through an `init()` bootstrap. This avoids global namespace pollution and keeps behavior segmented.

Main modules include:
- `initThemeToggle()`
- `initHeaderScroll()`
- `initMobileNav()`
- `initRevealAnimations()`
- `initActiveNav()`
- `initSmoothScroll()`
- `initTypingEffect()`
- `initRoleCycling()`
- `initCardTilt()`
- `initBackToTop()`
- `initStatCounters()`
- `initEyeTracking()`

### Progressive Enhancement Strategy
- Site content remains readable without JavaScript.
- JavaScript adds enhancements (reveals, nav behavior, motion, counters, role typing, eye tracking).
- DOM-ready bootstrap handles both loading and already-loaded document states.

### State & Preference Strategy
- Theme preference stored in `localStorage`.
- Safe wrappers are used for storage access (`try/catch`) to avoid errors in restrictive environments.
- System color scheme changes are observed with `matchMedia`.

---

## 5) Animation System: What Types Are Used

This website uses a **hybrid animation model**: CSS keyframe animations + JavaScript-triggered motion.

### A) CSS Keyframe Animations (declarative)
Defined keyframes include:
- `eyeBlink` — natural eyelid blink cycle
- `lashFlutter` — synchronized eyelash motion
- `eyeMicroSaccade` — subtle eye jitter for realism
- `cursorBlink` / `blink` — caret blinking effects
- `scrollPulse` — hero scroll hint pulse
- `heroGlowFloat` — floating background glow
- `heroCardFloat` — floating hero code card
- `nameGradientShift` — animated gradient on hero name
- `sectionTitleBounce` — small bounce feedback on title/link hover
- `themeReveal` + `themeFadeOut` — theme switch visual transition

### B) Transition-Based Micro-Interactions
Used widely for:
- hover/focus states
- button elevation
- nav underline reveals
- icon state changes
- menu open/close transforms

### C) JavaScript-Driven Motion
- Typing/retyping role text with timed loops (`setTimeout`).
- Number counter animation using `requestAnimationFrame` and cubic ease-out.
- Eye tracking follows cursor with distance damping and RAF scheduling.
- Back-to-top visibility toggled with IntersectionObserver.

### D) View Transition API (Advanced)
- Theme switching attempts `document.startViewTransition()` when available.
- Fallback gracefully applies theme without advanced transition.
- Transition origin is computed from toggle button position for radial reveal effect.

---

## 6) Animation Trigger Strategy

### IntersectionObserver First
Used instead of heavy scroll-driven loops for:
- section reveal visibility
- reveal-item stagger behavior
- header state (top sentinel observation)
- back-to-top visibility after hero section
- stat counter start-on-visibility

### Controlled Scroll Logic
- Active nav highlighting uses scroll listener with `passive: true` + `requestAnimationFrame` throttling.
- This balances responsiveness with reduced layout thrashing risk.

---

## 7) Performance Strategy

### Runtime Efficiency Decisions
- Observer-based visibility events reduce continuous scroll calculations.
- `requestAnimationFrame` used for frame-synced updates.
- Eye-tracking updates scheduled on demand and paused when page is hidden.
- Coarse pointer devices skip expensive cursor-based effects.

### CSS Efficiency Decisions
- Tokenized transitions/durations prevent random animation timings.
- Transform/opacity-heavy motion avoids expensive layout reflow animations.

### Delivery Strategy
- Static hosting model keeps deployment and delivery simple.
- Asset footprint is manageable and framework-free.

---

## 8) Accessibility Strategy (A11y)

### Motion Accessibility
- Full `prefers-reduced-motion: reduce` support:
  - nearly all animation/transition duration collapsed
  - reveal content shown immediately
  - decorative animation disabled
  - smooth scroll disabled for users requesting reduced motion

### Keyboard & Focus Accessibility
- Skip link for direct content access.
- Focus-visible styling enabled.
- Mobile nav supports keyboard interaction and Escape to close.
- Tab management inside open nav state improves usability.

### Semantic & Assistive Support
- Semantic landmarks and heading structure.
- ARIA attributes for control state and dynamic content behavior.

---

## 9) Responsive Strategy

- Mobile-first base styles.
- Progressive enhancements for tablet/desktop via `@media (min-width: ...)`.
- Components are designed to stack on small screens and expand with available width.
- Navigation changes behavior based on viewport constraints (drawer model on small screens).

---

## 10) Maintainability Strategy

- Clear separation by concern:
  - structure/content in `index.html` and `terminal/index.html`
  - presentation in `assets/css/main.css` and `assets/css/terminal.css`
  - behavior in `assets/js/main.js` and `assets/js/terminal.js`
- Design tokens avoid hard-coded repetition.
- Modular initialization makes it easy to disable/extend single features.
- Documentation-first approach in `docs/planning/` and `docs/reference/` supports future iteration.

---

## 11) Summary
This portfolio uses a lightweight but advanced front-end strategy: semantic HTML, token-driven CSS, and modular Vanilla JS with observer-first interactions. The animation system is expressive but constrained by performance and accessibility safeguards, making the site both visually engaging and production-practical.
