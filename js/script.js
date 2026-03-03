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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id')
            navLinks.forEach((link) => {
              link.classList.toggle(
                'nav__link--active',
                link.getAttribute('href') === `#${id}`
              )
            })
          }
        })
      },
      {
        threshold: 0.3,
        rootMargin: '-80px 0px -40% 0px',
      }
    )

    sections.forEach((section) => observer.observe(section))
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
  }

  /* ============================================================
     5. Theme Toggle (Dark / Light)
     ============================================================ */
  function initThemeToggle() {
    if (!themeToggle) return

    const STORAGE_KEY = 'portfolio-theme'
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    // Check saved preference or system preference
    function getPreferredTheme() {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) return saved
      return window.matchMedia('(prefers-color-scheme: light)').matches
        ? 'light'
        : 'dark'
    }

    function setTheme(theme) {
      html.setAttribute('data-theme', theme)
      localStorage.setItem(STORAGE_KEY, theme)
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
        if (!localStorage.getItem(STORAGE_KEY)) {
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
     9. Performance: Lazy-load non-critical animations
     ============================================================ */
  function initParticleBackground() {
    // Subtle floating particles in the hero — CSS-only via pseudo-elements
    // This function is a placeholder hook if canvas particles are desired later
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
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
})()
