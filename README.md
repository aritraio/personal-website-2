# Personal Portfolio Website

A responsive, single-page personal portfolio built with semantic HTML, modern CSS, and vanilla JavaScript.

## Highlights

- Dark/light theme with smooth animated switching
- Responsive layout across mobile, tablet, and desktop
- Animated hero and interactive navigation effects
- Section reveal animations on scroll
- One-click resume download

## Tech Stack

- HTML5
- CSS3 (custom properties, transitions, keyframes)
- Vanilla JavaScript (IntersectionObserver, theme persistence, micro-interactions)

## Project Structure

```text
.
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   ├── images/
│   └── resume.pdf
├── docs/
│   ├── requirements.md
│   ├── workflow.md
│   ├── content-plan.md
│   ├── improvements.md
│   └── portfolio-website-vanilla-js.pdf
└── LICENSE
```

## Local Development

### Option 1: Open directly

Open `index.html` in any modern browser.

### Option 2: Live Server (recommended)

Use the VS Code Live Server extension and run the project from the workspace root.

## Customization Guide

- Content and sections: `index.html`
- Visual styling and animations: `css/styles.css`
- Behavior and interactions: `js/script.js`
- Resume file used by download buttons: `assets/resume.pdf`

## Deployment

This is a static site and can be deployed to:

- GitHub Pages
- Netlify
- Vercel (static)
- Any static file host

Deploy the repository root as the site root.

## Notes

- Theme preference is saved in `localStorage`.
- Reduced-motion users are respected via `prefers-reduced-motion`.