# Portfolio Website Workflow (Vanilla JS)

## 1) Goal and Constraints
Build a professional portfolio website using **only HTML, CSS, and Vanilla JavaScript** with:
- Mobile-first, high-performance UX
- Semantic and accessible markup
- Minimal, purposeful animation
- Strong project storytelling
- Production-ready deployment and sharing metadata

---

## 2) Delivery Phases

## Phase 0 — Planning (0.5 day)
### Outputs
- Content outline
- Site map and section order
- Wireframe (mobile-first)

### Tasks
1. Define single-page information architecture:
   - Hero
   - Skills
   - Projects
   - Resume/Contact
2. Confirm CTA priorities:
   - Resume download
   - GitHub profile
   - LinkedIn profile
3. Define project-card template fields:
   - Problem
   - Tech (include DS/Algo where relevant)
   - Impact + repo/demo links

### Exit Criteria
- Every section has purpose, heading, and content owner (you)
- No placeholder/unclear content dependencies

---

## Phase 1 — Semantic HTML Foundation (0.5–1 day)
### Outputs
- `index.html` with semantic structure

### Tasks
1. Create document structure with semantic landmarks:
   - `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
2. Add clear heading hierarchy (`h1` to `h3` as needed)
3. Add accessible navigation links for section anchors
4. Add metadata baseline:
   - title
   - description
   - viewport
   - Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`)

### Exit Criteria
- Keyboard navigation works across links/buttons
- Document outline is logical and readable by screen readers

---

## Phase 2 — Mobile-First Styling System (1–1.5 days)
### Outputs
- `styles.css` with tokenized design system and layout primitives

### Tasks
1. Define CSS Custom Properties (variables):
   - color palette
   - typography scale
   - spacing scale
   - border radius
2. Implement base styles:
   - reset/normalize strategy
   - body text readability
   - consistent link/button states
3. Build layout:
   - CSS Grid for page/section layout
   - Flexbox for component internals (nav rows, card headers, button groups)
4. Add responsive breakpoints using **min-width media queries** only

### Exit Criteria
- Mobile view is complete before desktop enhancements
- No hardcoded repeated values where variables should be used

---

## Phase 3 — Interaction Layer (Vanilla JS) (0.5–1 day)
### Outputs
- `script.js` with modular, minimal JS

### Tasks
1. Implement reveal-on-scroll with `IntersectionObserver`
2. Keep animations lightweight:
   - opacity/transform transitions
   - no heavy scroll listeners for visual effects
3. Add progressive enhancement:
   - content visible without JS
   - JS only augments UX
4. Keep JS modular:
   - section-specific functions
   - small init/bootstrap function

### Exit Criteria
- No `window.onscroll`-driven animation loops
- Animations do not block interaction or readability

---

## Phase 4 — Content Finalization (0.5 day)
### Outputs
- Production content replacing all placeholders

### Tasks
1. Hero:
   - Name
   - Role/specialization
   - Strong CTA buttons
2. Skills:
   - Categorized groups (Languages, Frameworks, Tools)
3. Projects:
   - 3–6 strong projects with technical depth
   - each includes problem, tech, impact, links
4. Resume & Contact:
   - one-click PDF resume download
   - visible email + LinkedIn + GitHub

### Exit Criteria
- No lorem ipsum / TODO markers
- Every project card has repo or demo link

---

## Phase 5 — Performance, A11y, and Quality Pass (0.5 day)
### Outputs
- QA checklist completion

### Tasks
1. Accessibility:
   - color contrast check
   - focus visible on interactive elements
   - meaningful alt text for images
2. Performance:
   - compress images
   - defer non-critical JS
   - avoid blocking assets
3. UX sanity:
   - test mobile usability first
   - verify tap target sizes and spacing

### Exit Criteria
- Fast first paint on mobile network conditions
- Site is fully navigable without mouse

---

## Phase 6 — Deployment and Professional Packaging (0.5 day)
### Outputs
- Live URL + production metadata

### Tasks
1. Deploy to GitHub Pages / Netlify / Vercel
2. Configure custom domain (`yourname.dev` or similar)
3. Validate Open Graph preview in social share tools
4. Verify continuous deployment from repository main branch

### Exit Criteria
- Public HTTPS URL is stable and shareable
- Link previews show expected title/description/image

---

## 3) Suggested Folder Structure

```text
/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   ├── images/
│   └── resume.pdf
└── README.md
```

---

## 4) Execution Checklist (Quick)
- [ ] Semantic HTML scaffolding complete
- [ ] Mobile-first CSS complete
- [ ] IntersectionObserver reveals complete
- [ ] Project cards include problem/tech/impact
- [ ] Resume direct-download works
- [ ] Open Graph tags validated
- [ ] Live deployment + custom domain configured

---

## 5) Timebox (Recommended)
- Day 1: Phase 0–2
- Day 2: Phase 3–5
- Day 3: Phase 6 + polish + portfolio review iteration
