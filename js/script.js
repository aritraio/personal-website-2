/* ============================================================
   PORTFOLIO — Interaction Layer
   IntersectionObserver reveals • Theme toggle • Mobile nav
   Progressive enhancement — content works without JS
   ============================================================ */

;(function () {
  'use strict'

  /* ── Utilities ──────────────────────────────────────────── */
  const $ = (sel, ctx = document) => ctx.querySelector(sel)
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)]

  /* ── DOM References ─────────────────────────────────────── */
  const html = document.documentElement
  const header = $('#site-header')
  const navToggle = $('#nav-toggle')
  const navList = $('#nav-list')
  const themeToggle = $('#theme-toggle')

  /* ============================================================
     1. IntersectionObserver — Reveal on Scroll
     ============================================================ */
  function initRevealAnimations() {
    const reveals = $$('.reveal')
    const revealItems = $$('.reveal-item')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target) // animate once
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    )

    reveals.forEach((el) => observer.observe(el))

    // Observe individual skill items with a slightly tighter threshold
    const itemObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            itemObserver.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -20px 0px',
      }
    )

    revealItems.forEach((el) => itemObserver.observe(el))
  }

  /* ============================================================
     2. Header — Scroll-based Background
     ============================================================ */
  function initHeaderScroll() {
    if (!header) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        header.classList.toggle('scrolled', !entry.isIntersecting)
      },
      {
        threshold: 0,
        rootMargin: `-${getComputedStyle(html).getPropertyValue('--header-height') || '64px'} 0px 0px 0px`,
      }
    )

    // Observe a sentinel element at the top of the page
    const sentinel = document.createElement('div')
    sentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:1px;pointer-events:none;'
    sentinel.setAttribute('aria-hidden', 'true')
    document.body.prepend(sentinel)
    observer.observe(sentinel)
  }

  /* ============================================================
     3. Active Navigation Highlight
     ============================================================ */
  function initActiveNav() {
    const sections = $$('section[id]')
    const navLinks = $$('.nav__link')
    if (!sections.length || !navLinks.length) return

    let ticking = false

    function setActiveLinkBySectionId(activeId) {
      navLinks.forEach((link) => {
        link.classList.toggle(
          'nav__link--active',
          link.getAttribute('href') === `#${activeId}`
        )
      })
    }

    function getCurrentSectionId() {
      const headerHeight = parseInt(
        getComputedStyle(html).getPropertyValue('--header-height') || '64',
        10
      )
      const checkpoint = window.scrollY + headerHeight + 120

      let currentSectionId = sections[0].id
      sections.forEach((section) => {
        if (checkpoint >= section.offsetTop) {
          currentSectionId = section.id
        }
      })

      return currentSectionId
    }

    function updateActiveLink() {
      setActiveLinkBySectionId(getCurrentSectionId())
      ticking = false
    }

    function onScroll() {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(updateActiveLink)
    }

    let resizeTimer
    function onResize() {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(updateActiveLink, 150)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)

    // Set correctly on initial load
    updateActiveLink()
  }

  /* ============================================================
     4. Mobile Navigation
     ============================================================ */
  function initMobileNav() {
    if (!navToggle || !navList) return

    // Create overlay
    const overlay = document.createElement('div')
    overlay.classList.add('nav-overlay')
    overlay.setAttribute('aria-hidden', 'true')
    document.body.appendChild(overlay)

    function openNav() {
      navToggle.classList.add('active')
      navToggle.setAttribute('aria-expanded', 'true')
      navList.classList.add('open')
      overlay.classList.add('active')
      document.body.style.overflow = 'hidden'
    }

    function closeNav() {
      navToggle.classList.remove('active')
      navToggle.setAttribute('aria-expanded', 'false')
      navList.classList.remove('open')
      overlay.classList.remove('active')
      document.body.style.overflow = ''
    }

    function toggleNav() {
      navList.classList.contains('open') ? closeNav() : openNav()
    }

    navToggle.addEventListener('click', toggleNav)
    overlay.addEventListener('click', closeNav)

    // Close on nav link click
    $$('.nav__link', navList).forEach((link) => {
      link.addEventListener('click', closeNav)
    })

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navList.classList.contains('open')) {
        closeNav()
        navToggle.focus()
      }
    })

    // Trap focus within nav when open (a11y)
    navList.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab' || !navList.classList.contains('open')) return
      const focusable = $$('a, button', navList)
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    })
  }

  /* ============================================================
     5. Theme Toggle (Dark / Light)
     ============================================================ */
  function initThemeToggle() {
    if (!themeToggle) return

    const STORAGE_KEY = 'portfolio-theme'
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    // Safe localStorage wrapper
    function safeGetItem(key) {
      try { return localStorage.getItem(key) } catch { return null }
    }
    function safeSetItem(key, value) {
      try { localStorage.setItem(key, value) } catch { /* quota/privacy */ }
    }

    // Check saved preference or system preference
    function getPreferredTheme() {
      const saved = safeGetItem(STORAGE_KEY)
      if (saved) return saved
      return window.matchMedia('(prefers-color-scheme: light)').matches
        ? 'light'
        : 'dark'
    }

    function setTheme(theme) {
      html.setAttribute('data-theme', theme)
      safeSetItem(STORAGE_KEY, theme)
      themeToggle.setAttribute(
        'aria-label',
        `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`
      )
    }

    function getNextTheme() {
      return html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
    }

    function cleanupThemeTransitionVars() {
      html.style.removeProperty('--theme-transition-x')
      html.style.removeProperty('--theme-transition-y')
      html.style.removeProperty('--theme-transition-radius')
    }

    function pulseThemeToggle() {
      themeToggle.classList.add('is-switching')
      window.setTimeout(() => {
        themeToggle.classList.remove('is-switching')
      }, 420)
    }

    async function toggleThemeWithTransition(source) {
      const nextTheme = getNextTheme()
      const supportsViewTransition =
        typeof document.startViewTransition === 'function' && !reducedMotion.matches

      if (!supportsViewTransition) {
        setTheme(nextTheme)
        pulseThemeToggle()
        return
      }

      const rect = source?.getBoundingClientRect()
      const originX = rect ? rect.left + rect.width / 2 : window.innerWidth / 2
      const originY = rect ? rect.top + rect.height / 2 : 0

      const maxX = Math.max(originX, window.innerWidth - originX)
      const maxY = Math.max(originY, window.innerHeight - originY)
      const endRadius = Math.hypot(maxX, maxY)

      html.style.setProperty('--theme-transition-x', `${originX}px`)
      html.style.setProperty('--theme-transition-y', `${originY}px`)
      html.style.setProperty('--theme-transition-radius', `${endRadius}px`)

      const transition = document.startViewTransition(() => {
        setTheme(nextTheme)
      })

      pulseThemeToggle()

      try {
        await transition.finished
      } finally {
        cleanupThemeTransitionVars()
      }
    }

    // Apply saved/system theme on load
    setTheme(getPreferredTheme())

    themeToggle.addEventListener('click', () => {
      toggleThemeWithTransition(themeToggle)
    })

    // Listen for system preference changes
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        if (!safeGetItem(STORAGE_KEY)) {
          setTheme(e.matches ? 'dark' : 'light')
        }
      })
  }

  /* ============================================================
     6. Smooth scroll for anchor links (fallback for older browsers)
     ============================================================ */
  function initSmoothScroll() {
    $$('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href')
        if (targetId === '#') return
        const target = $(targetId)
        if (!target) return

        e.preventDefault()
        const headerH = parseInt(
          getComputedStyle(html).getPropertyValue('--header-height') || '64'
        )
        const top = target.getBoundingClientRect().top + window.scrollY - headerH

        window.scrollTo({ top, behavior: 'smooth' })
      })
    })
  }

  /* ============================================================
     7. Typing Effect for Hero Greeting (optional enhancement)
     ============================================================ */
  function initTypingEffect() {
    const greeting = $('.hero__greeting')
    if (!greeting) return

    const text = greeting.textContent
    greeting.textContent = ''
    greeting.classList.add('typing-cursor')
    greeting.style.opacity = '1'
    greeting.style.transform = 'none'

    let i = 0
    function type() {
      if (i < text.length) {
        greeting.textContent += text.charAt(i)
        i++
        setTimeout(type, 80)
      } else {
        greeting.classList.remove('typing-cursor')
      }
    }

    // Start typing after a brief delay
    setTimeout(type, 600)
  }

  /* ============================================================
     8. Card Tilt Micro-interaction (desktop only)
     ============================================================ */

  /* ============================================================
     8b. Role Cycling Animation
     ============================================================ */
  function initRoleCycling() {
    const el = $('#role-cycling')
    if (!el) return

    const roles = [
      'Software Developer',
      'AI Engineer',
      'Backend Engineer',
      'ML Enthusiast',
      'API Architect',
      'Problem Solver',
      'Good Communicator',
      'Open Source Contributor',
    ]

    let roleIndex = 0
    let charIndex = 0
    let isDeleting = false
    const typeSpeed = 70
    const deleteSpeed = 40
    const pauseAfterType = 2000
    const pauseAfterDelete = 400

    function tick() {
      const current = roles[roleIndex]

      if (!isDeleting) {
        // Typing
        el.textContent = current.substring(0, charIndex + 1)
        charIndex++

        if (charIndex === current.length) {
          // Finished typing — pause then start deleting
          isDeleting = true
          setTimeout(tick, pauseAfterType)
          return
        }
        setTimeout(tick, typeSpeed)
      } else {
        // Deleting
        el.textContent = current.substring(0, charIndex - 1)
        charIndex--

        if (charIndex === 0) {
          // Finished deleting — move to next role
          isDeleting = false
          roleIndex = (roleIndex + 1) % roles.length
          setTimeout(tick, pauseAfterDelete)
          return
        }
        setTimeout(tick, deleteSpeed)
      }
    }

    // Start after a brief delay
    setTimeout(tick, 1000)
  }

  function initCardTilt() {
    if (window.matchMedia('(pointer: coarse)').matches) return // skip on touch

    const cards = $$('.project-card, .skill-card, .contact-card')
    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        const rotateX = ((y - centerY) / centerY) * -3
        const rotateY = ((x - centerX) / centerX) * 3

        card.style.transform = `translateY(-4px) perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
      })

      card.addEventListener('mouseleave', () => {
        card.style.transform = ''
      })
    })
  }

  /* ============================================================
     9. Back to Top — Visibility API integration
     ============================================================ */
  function initBackToTop() {
    const btn = $('#back-to-top')
    if (!btn) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = !entry.isIntersecting
        btn.classList.toggle('visible', isVisible)
        btn.setAttribute('aria-hidden', isVisible ? 'false' : 'true')
        btn.tabIndex = isVisible ? 0 : -1
      },
      { threshold: 0, rootMargin: '0px' }
    )

    // Show after scrolling past the hero
    const hero = $('#hero')
    if (hero) observer.observe(hero)

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }

  /* ============================================================
     11. Animated Stat Counters
     ============================================================ */
  function initStatCounters() {
    const counters = $$('.stat-card__number[data-target]')
    if (!counters.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 }
    )

    counters.forEach((el) => observer.observe(el))

    function animateCounter(el) {
      const target = parseInt(el.getAttribute('data-target'), 10)
      const duration = 1500
      const start = performance.now()

      function step(now) {
        const elapsed = now - start
        const progress = Math.min(elapsed / duration, 1)
        // Ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3)
        el.textContent = Math.round(eased * target)
        if (progress < 1) requestAnimationFrame(step)
      }

      requestAnimationFrame(step)
    }
  }

  /* ============================================================
     12. Eye Logo — Mouse Tracking (with visibility optimization)
     ============================================================ */
  function initEyeTracking() {
    const eyes = $$('.eye-logo')
    if (!eyes.length) return
    if (window.matchMedia('(pointer: coarse)').matches) return // skip on touch devices

    // Limit how far the pupil/iris can move (in SVG units)
    const MAX_IRIS = 5
    const MAX_PUPIL = 6
    const MAX_SHINE = 4

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let rafId = null
    let isPageVisible = true

    // Pause tracking when tab is not visible
    document.addEventListener('visibilitychange', () => {
      isPageVisible = !document.hidden
    })

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!rafId && isPageVisible) {
        rafId = requestAnimationFrame(updateEyes)
      }
    })

    function updateEyes() {
      rafId = null
      eyes.forEach((svg) => {
        const rect = svg.getBoundingClientRect()
        const eyeCX = rect.left + rect.width / 2
        const eyeCY = rect.top + rect.height / 2

        const dx = mouseX - eyeCX
        const dy = mouseY - eyeCY
        const dist = Math.hypot(dx, dy) || 1

        // Normalise direction, then scale by distance (logarithmic damping)
        const factor = Math.min(1, Math.log2(dist / 40 + 1))
        const nx = (dx / dist) * factor
        const ny = (dy / dist) * factor

        // Move iris + iris ring
        const iris = svg.querySelector('.eye-logo__iris')
        const irisRing = svg.querySelector('.eye-logo__iris-ring')
        if (iris) {
          iris.setAttribute('cx', 40 + nx * MAX_IRIS)
          iris.setAttribute('cy', 24 + ny * MAX_IRIS)
        }
        if (irisRing) {
          irisRing.setAttribute('cx', 40 + nx * MAX_IRIS)
          irisRing.setAttribute('cy', 24 + ny * MAX_IRIS)
        }

        // Move pupil (slightly more)
        const pupil = svg.querySelector('.eye-logo__pupil')
        if (pupil) {
          pupil.setAttribute('cx', 40 + nx * MAX_PUPIL)
          pupil.setAttribute('cy', 24 + ny * MAX_PUPIL)
        }

        // Move shine highlights
        const shines = svg.querySelectorAll('.eye-logo__shine')
        if (shines.length) {
          shines[0].setAttribute('cx', 35 + nx * MAX_SHINE * 0.5)
          shines[0].setAttribute('cy', 20 + ny * MAX_SHINE * 0.5)
          if (shines[1]) {
            shines[1].setAttribute('cx', 45 + nx * MAX_SHINE * 0.3)
            shines[1].setAttribute('cy', 28 + ny * MAX_SHINE * 0.3)
          }
        }
      })
    }
  }

  /* ============================================================
     Eye Logo — 5-Click Easter Egg → Terminal
     ============================================================ */
  function initEyeEasterEgg() {
    const logo = $('.nav__logo')
    if (!logo) return

    // Inject animation styles dynamically (no change to styles.css)
    const s = document.createElement('style')
    s.textContent = [
      '.nav__logo .eye-logo{transition:filter .18s ease,transform .18s ease}',
      '@keyframes _eye_ping{0%{filter:brightness(1);transform:scale(1)}40%{filter:brightness(2.8) drop-shadow(0 0 10px #00ff41);transform:scale(1.18)}100%{filter:brightness(1);transform:scale(1)}}',
      '@keyframes _eye_go{0%{filter:brightness(1) hue-rotate(0deg);transform:scale(1) rotate(0deg)}28%{filter:brightness(4) hue-rotate(100deg) saturate(6);transform:scale(1.45) rotate(14deg)}58%{filter:brightness(7) hue-rotate(220deg);transform:scale(1.75) rotate(-10deg)}82%{filter:brightness(9);transform:scale(2)}100%{filter:brightness(0);transform:scale(0);opacity:0}}',
      '.eye-logo.egg-ping{animation:_eye_ping .34s ease forwards}',
      '.eye-logo.egg-go{animation:_eye_go .62s ease forwards}',
    ].join('\n')
    document.head.appendChild(s)

    const eye = logo.querySelector('.eye-logo')
    let count = 0
    let resetTimer = null

    logo.addEventListener('click', function (e) {
      count++
      clearTimeout(resetTimer)

      // Visual ping feedback on every click
      if (eye) {
        eye.classList.remove('egg-ping', 'egg-go')
        void eye.offsetWidth
        eye.classList.add('egg-ping')
        setTimeout(() => eye.classList.remove('egg-ping'), 360)
      }

      if (count >= 5) {
        // Easter egg triggered — launch terminal
        count = 0
        if (eye) {
          eye.classList.remove('egg-ping')
          void eye.offsetWidth
          eye.classList.add('egg-go')
        }
        setTimeout(() => { window.location.href = 'terminal.html' }, 650)
        return
      }

      resetTimer = setTimeout(() => { count = 0 }, 2500)
    })
  }

  /* ============================================================
     INIT — Bootstrap all modules
     ============================================================ */
  function init() {
    initThemeToggle()
    initHeaderScroll()
    initMobileNav()
    initRevealAnimations()
    initActiveNav()
    initSmoothScroll()
    initTypingEffect()
    initRoleCycling()
    initCardTilt()
    initBackToTop()
    initStatCounters()
    initEyeTracking()
    initEyeEasterEgg()
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
})()
