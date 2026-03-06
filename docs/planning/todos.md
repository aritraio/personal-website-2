# Portfolio Todos

Working backlog captured from the review.

## Fix First

- [ ] Broken social preview image
  - `og:image` and `twitter:image` point to `assets/images/og-preview.png`, but that asset does not exist in the repo.
  - Impact: shared links can render without a proper preview image.

- [ ] Progressive enhancement gap on main page
  - `.reveal` and `.reveal-item` are hidden by default and only become visible after JavaScript runs.
  - Impact: if JavaScript fails after load, important content stays invisible even though the site is intended to remain usable without JavaScript.

- [ ] Terminal matrix intensity state bug
  - After `matrix high`, switching back to `matrix on` changes opacity but does not reset internal intensity.
  - Impact: UI reports one state while rendering another.

## Good Next Steps

- [ ] Add reduced-motion handling to terminal mode
  - The terminal page has continuous animation, a boot sequence, and a matrix canvas effect without a clear reduced-motion path.

- [ ] Replace generic GitHub links with project-specific destinations
  - Featured projects currently route to the same profile page instead of project repos or case studies.

- [ ] Move duplicated portfolio content into a shared data source
  - Content is maintained in both `index.html` and `assets/js/terminal.js`, which increases drift risk.

## Notes

- This file is intended as a lightweight staging area for follow-up work.
- Keep entries concrete: what is wrong, why it matters, and where the fix starts.