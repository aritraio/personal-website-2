# Portfolio Maintenance Workflow

## Purpose
Provide a repeatable workflow for updating this portfolio site without breaking design, accessibility, or performance.

## Working Model
- Keep changes small and section-focused.
- Update docs and implementation together.
- Validate locally before deployment.

---

## Phase 1 — Plan the Change
### Inputs
- Change request (new project, copy update, design tweak, bug fix)
- Relevant docs in `docs/`

### Tasks
1. Define scope in one sentence.
2. Identify affected files (`index.html`, `css/styles.css`, `js/script.js`, docs).
3. Note acceptance criteria before editing.

### Exit Criteria
- Clear scope and success conditions
- No ambiguous “maybe” requirements

---

## Phase 2 — Implement
### Content Changes
- Update section copy in `index.html`.
- Ensure messaging follows `docs/content-plan.md`.

### Styling Changes
- Use existing CSS custom properties before adding new tokens.
- Keep responsive behavior mobile-first.

### Interaction Changes
- Keep JS modular and progressive.
- Use `IntersectionObserver` for reveal behavior when needed.

### Exit Criteria
- Feature/content update is complete in code
- No unrelated refactors introduced

---

## Phase 3 — Verify
### Functional Checks
- Navigation links and skip link work.
- Theme toggle works and persists.
- Mobile nav opens/closes and supports keyboard use.
- Resume download and profile links work.

### UI/A11y Checks
- No text contrast regressions in light/dark themes.
- Focus states remain visible.
- Layout works on mobile and desktop widths.

### Performance Checks
- No large unoptimized assets introduced.
- Animations remain smooth and unobtrusive.

### Exit Criteria
- All checks pass locally
- No obvious visual or functional regressions

---

## Phase 4 — Document and Ship
### Tasks
1. Update affected docs in `docs/`.
2. Update `README.md` if setup/features changed.
3. Deploy to static host (GitHub Pages/Netlify/Vercel).
4. Validate social metadata preview after deployment.

### Exit Criteria
- Docs and code are consistent
- Live site is accessible over HTTPS

---

## Quick Release Checklist
- [ ] Scope defined
- [ ] Code changes complete
- [ ] Local validation complete
- [ ] Docs updated
- [ ] Deploy verified
