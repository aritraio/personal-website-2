# Portfolio Website Requirements (Current + Maintenance)

## 1) Purpose
Define the requirements used to maintain and evolve this portfolio site built with HTML, CSS, and Vanilla JavaScript.

## 2) Scope
### In Scope
- Single-page professional portfolio
- Sections: Hero, About, Skills, Experience, Projects, Contact
- Dark/light theme support
- Reveal animations and subtle interactions
- Resume download and external profile links
- SEO and social metadata

### Out of Scope
- SPA frameworks and component libraries
- Backend services/CMS
- Heavy animation frameworks for core UX

---

## 3) Technical Constraints (Mandatory)
1. Stack remains:
   - HTML5
   - CSS3 (custom properties)
   - Vanilla JavaScript (ES6+)
2. Viewport reveal effects must use `IntersectionObserver`.
3. Avoid heavy scroll polling for animation effects.
4. Layout uses CSS Grid for macro layout and Flexbox for component alignment.
5. Site must remain fully usable without JavaScript (progressive enhancement baseline).

---

## 4) Functional Requirements

### FR-1 Site Structure and Navigation
- Top navigation links to section anchors.
- A skip link to main content is present.
- Section order is logical and recruiter-friendly.

### FR-2 Hero and CTAs
- Hero includes name, specialization statement, and summary.
- Primary action provides resume download.
- Secondary actions link to GitHub and LinkedIn.

### FR-3 Core Content Sections
- About section explains technical focus and approach.
- Skills section groups capabilities by category.
- Experience and Projects sections highlight implementation depth and outcomes.
- Contact section provides direct communication channels.

### FR-4 Theme and Interaction
- Theme toggle supports dark/light mode.
- Theme preference persists via browser storage.
- Mobile navigation is accessible and keyboard-operable.

### FR-5 Metadata and Discoverability
- Document includes canonical URL and robots policy.
- Open Graph and Twitter metadata are present.
- Structured data (`Person` JSON-LD) is included.

### FR-6 External Links and Assets
- Resume download points to a valid PDF file.
- GitHub and LinkedIn links are valid and current.
- Social preview image path is valid in production.

---

## 5) Non-Functional Requirements

### NFR-1 Performance
- Fast initial load on mobile conditions.
- Animations remain lightweight (opacity/transform preferred).
- No unnecessary JavaScript execution during idle browsing.

### NFR-2 Accessibility
- Semantic landmarks and heading hierarchy are preserved.
- Interactive elements are keyboard accessible.
- Visible focus styles remain enabled.
- Contrast remains readable in both themes.

### NFR-3 Responsiveness
- Mobile-first base styles.
- `min-width` breakpoints for larger layouts.
- No horizontal overflow at common viewport sizes.

### NFR-4 Maintainability
- Separation of concerns across `index.html`, `css/styles.css`, and `js/script.js`.
- Reusable values centralized through CSS variables.
- Documentation in `docs/` stays in sync with shipped behavior.

---

## 6) Acceptance Checklist
- Semantic HTML structure is valid and navigable.
- Theme toggle works and persists across reloads.
- Reveal animations trigger correctly and do not block reading.
- Resume and social links work.
- Metadata renders correct social previews after deploy.
- Mobile and desktop layouts remain stable.

---

## 7) Definition of Done
- All required sections and links are complete.
- No placeholder copy remains in production.
- Accessibility and responsiveness checks pass.
- Documentation and implementation are aligned.
