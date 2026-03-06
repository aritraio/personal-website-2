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
├── terminal/
│   └── index.html
├── assets/
│   ├── css/
│   │   ├── main.css
│   │   └── terminal.css
│   ├── files/
│   │   └── resume.pdf
│   └── js/
│       ├── main.js
│       └── terminal.js
├── docs/
│   ├── planning/
│   │   ├── content-plan.md
│   │   ├── improvements.md
│   │   └── workflow.md
│   └── reference/
│       ├── portfolio-website-vanilla-js.pdf
│       ├── requirements.md
│       └── tech-stack.md
├── LICENSE
└── README.md
```

## Local Development

### Option 1: Open directly

Open `index.html` in any modern browser.

### Option 2: Live Server (recommended)

Use the VS Code Live Server extension and run the project from the workspace root.

## Customization Guide

- Content and sections: `index.html`
- Main site styling and animations: `assets/css/main.css`
- Terminal styling: `assets/css/terminal.css`
- Main site behavior and interactions: `assets/js/main.js`
- Terminal behavior and interactions: `assets/js/terminal.js`
- Resume file used by download buttons: `assets/files/resume.pdf`

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