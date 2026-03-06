/* ============================================================
   TERMINAL PORTFOLIO — Interaction Engine
   Commands, output renderer, history, matrix rain, boot seq
   ============================================================ */

;(function () {
  'use strict'

  /* ── DATA ─────────────────────────────────────────────────── */
  const DATA = {
    name:    'Aritra Saha',
    title:   'Software Developer & AI Engineer',
    email:   'aritra.saha@outlook.in',
    github:  'https://github.com/aritraio',
    linkedin:'https://www.linkedin.com/in/aritra404/',
    resume:  'assets/resume.pdf',

    summary: [
      'Focused on backend engineering and AI-driven applications.',
      'Building scalable APIs, real-time processing workflows,',
      'and machine learning-enabled systems using Python, Go, and JavaScript.',
    ],

    about: [
      "I'm a software developer with a deep focus on backend engineering",
      'and AI-driven applications. I enjoy building systems that are not',
      'just functional, but scalable, reliable, and thoughtfully designed.',
      '',
      'My work spans from designing RESTful APIs and real-time data pipelines',
      'to implementing ML models that solve real problems. I believe in writing',
      'clean, maintainable code and continuously learning from the evolving',
      'tech landscape.',
      '',
      "When I'm not coding, you'll find me exploring new AI research papers,",
      'contributing to open source, or diving into system design challenges.',
    ],

    stats: [
      { label: 'Projects Built',    value: '10+' },
      { label: 'Technologies',      value: '5+' },
      { label: 'Languages',         value: '3+' },
      { label: 'Passion for Code',  value: '100%' },
    ],

    skills: {
      'Languages':           ['Python', 'Go', 'JavaScript', 'C', 'C++'],
      'Backend & Databases': ['FastAPI', 'REST API Development', 'MySQL'],
      'ML & Data':           ['NumPy', 'Pandas', 'Scikit-learn', 'Matplotlib', 'Seaborn'],
      'Tools & Platforms':   ['Git', 'GitHub', 'Linux'],
      'Core Competencies':   ['Backend Development', 'API Architecture', 'Machine Learning',
                              'Real-Time Systems', 'DSA', 'System Design'],
    },

    experience: [
      {
        title:   'Software Developer & AI Engineer',
        period:  '2024 — Present',
        company: 'Freelance / Independent Projects',
        details: [
          'Building scalable backend APIs with FastAPI and Python',
          'Developing AI-driven applications with ML pipelines',
          'Designing real-time processing systems and data workflows',
          'Contributing to open-source projects on GitHub',
        ],
      },
      {
        title:   'Computer Science Education',
        period:  '2021 — Present',
        company: "Bachelor's in Computer Science",
        details: [
          'Deep focus on data structures, algorithms, and system design',
          'Coursework in machine learning, databases, and software engineering',
          'Personal projects in backend engineering and AI applications',
        ],
      },
    ],

    projects: [
      {
        num:     '01',
        title:   'Driver Wellness Monitoring System',
        problem: 'Driver fatigue and health risks often go undetected until too late. Need for a real-time system to assess driver alertness and flag health risk indicators proactively.',
        details: [
          'Built backend data pipelines for physiological/behavioral signal processing',
          'Applied ML models (Scikit-learn) for fatigue and risk detection',
          'Implemented proactive alerting logic for safety intervention',
          'Designed for low-latency, reliable real-time response',
        ],
        impact: 'Enables proactive safety intervention by continuously monitoring driver wellness indicators, reducing risk of fatigue-related incidents.',
        tech: ['Python', 'FastAPI', 'Scikit-learn', 'MySQL'],
        link: 'https://github.com/aritraio',
      },
      {
        num:     '02',
        title:   'Multi-Agent AI Travel Assistant',
        problem: 'Travel planning is complex — flights, accommodations, activities, constraints. A single-model approach cannot handle the delegation required effectively.',
        details: [
          'Designed agent-based architecture with task orchestration and delegation',
          'Developed backend services for itinerary generation and constraint handling',
          'Integrated decision logic for optimized travel recommendations',
          'Structured maintainable APIs and modular service components',
        ],
        impact: 'Demonstrates scalable multi-agent orchestration for complex domain problems with clean separation of concerns.',
        tech: ['Python', 'FastAPI', 'Git', 'Linux'],
        link: 'https://github.com/aritraio',
      },
      {
        num:     '03',
        title:   'Real-Time Localized SOS Alert System',
        problem: 'In emergencies, getting alerts to nearby responders quickly is critical. Traditional alerting systems lack real-time, location-aware targeting.',
        details: [
          'Implemented geolocation-based alert routing for nearby response targeting',
          'Built backend APIs for real-time communication and notification delivery',
          'Optimized service flow for low-latency alert handling',
          'Designed database schemas for event logging and incident tracking',
        ],
        impact: 'Provides a fast, reliable emergency communication layer that routes alerts based on proximity, enabling faster response.',
        tech: ['FastAPI', 'MySQL', 'JavaScript', 'Linux'],
        link: 'https://github.com/aritraio',
      },
    ],

    contact: [
      { label: 'Email',    value: 'aritra.saha@outlook.in',          href: 'mailto:aritra.saha@outlook.in' },
      { label: 'GitHub',   value: 'github.com/aritraio',             href: 'https://github.com/aritraio' },
      { label: 'LinkedIn', value: 'linkedin.com/in/aritra404',       href: 'https://www.linkedin.com/in/aritra404/' },
      { label: 'Resume',   value: 'Download resume.pdf',             href: 'assets/resume.pdf', download: true },
    ],
  }

  /* ── ASCII BANNER ─────────────────────────────────────────── */
  const ASCII_BANNER = [
    ' █████╗ ██████╗ ██╗████████╗██████╗  █████╗ ',
    '██╔══██╗██╔══██╗██║╚══██╔══╝██╔══██╗██╔══██╗',
    '███████║██████╔╝██║   ██║   ██████╔╝███████║',
    '██╔══██║██╔══██╗██║   ██║   ██╔══██╗██╔══██║',
    '██║  ██║██║  ██║██║   ██║   ██║  ██║██║  ██║',
    '╚═╝  ╚═╝╚═╝  ╚═╝╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝',
  ]

  /* ── COMMAND REGISTRY ─────────────────────────────────────── */
  const COMMANDS = {
    help:       cmdHelp,
    whoami:     cmdWhoami,
    about:      cmdAbout,
    skills:     cmdSkills,
    experience: cmdExperience,
    projects:   cmdProjects,
    project:    cmdProjectDetail,
    contact:    cmdContact,
    github:     cmdGithub,
    linkedin:   cmdLinkedin,
    resume:     cmdResume,
    email:      cmdEmail,
    stats:      cmdStats,
    ls:         cmdLs,
    cat:        cmdCat,
    clear:      cmdClear,
    cls:        cmdClear,
    pwd:        cmdPwd,
    echo:       cmdEcho,
    date:       cmdDate,
    uname:      cmdUname,
    neofetch:   cmdNeofetch,
    man:        cmdMan,
    exit:       cmdExit,
    theme:      cmdTheme,
    matrix:     cmdMatrix,
    banner:     cmdBanner,
    social:     cmdContact,
  }

  const COMMAND_HINTS = {
    help:       'Show available commands',
    whoami:     'Who is Aritra Saha',
    about:      'About section',
    skills:     'Technical skills',
    experience: 'Work experience & education',
    projects:   'List all projects',
    'project [n]': 'Show project detail (1-3)',
    contact:    'Contact information & social links',
    github:     'Open GitHub profile',
    linkedin:   'Open LinkedIn profile',
    resume:     'Download resume',
    email:      'Compose email',
    stats:      'Statistics overview',
    ls:         'List available sections',
    'cat [file]': 'Read a section file',
    clear:      'Clear the terminal',
    pwd:        'Print working directory',
    'echo [text]': 'Echo text to terminal',
    date:       'Show current date/time',
    uname:      'System information',
    neofetch:   'System + profile overview',
    banner:     'Show ASCII banner',
    matrix:     'Toggle matrix rain intensity',
    exit:       'Exit terminal (go to main site)',
  }

  /* ── STATE ────────────────────────────────────────────────── */
  let history = []
  let historyIndex = -1
  let matrixIntensity = 1
  let sessionTheme = 'green' // could be extended

  /* ── ELEMENT REFS ─────────────────────────────────────────── */
  const output     = document.getElementById('terminal-output')
  const input      = document.getElementById('terminal-input')
  const body       = document.getElementById('terminal-body')
  const cursor     = document.getElementById('terminal-cursor')
  const promptPath = document.getElementById('prompt-path')
  const bootScreen = document.getElementById('boot-screen')
  const termWrap   = document.getElementById('terminal-wrap')
  const canvas     = document.getElementById('matrix-bg')

  /* ════════════════════════════════════════════════════════════
     MATRIX RAIN
     ════════════════════════════════════════════════════════════ */
  function initMatrix() {
    const ctx = canvas.getContext('2d')
    let cols, drops, raf

    function resize() {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      cols  = Math.floor(canvas.width / 18)
      drops = Array(cols).fill(1)
    }

    function draw() {
      ctx.fillStyle = 'rgba(0,0,0,0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#00ff41'
      ctx.font = '14px JetBrains Mono, monospace'

      for (let i = 0; i < cols; i++) {
        const char = String.fromCharCode(0x30a0 + Math.random() * 96) // katakana
        ctx.fillText(char, i * 18, drops[i] * 18)
        if (drops[i] * 18 > canvas.height && Math.random() > (0.975 - matrixIntensity * 0.01)) {
          drops[i] = 0
        }
        drops[i]++
      }
      raf = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    draw()

    return {
      stop:  () => cancelAnimationFrame(raf),
      start: () => { raf = requestAnimationFrame(draw) },
      setSpeed: (v) => { matrixIntensity = v },
    }
  }

  /* ════════════════════════════════════════════════════════════
     BOOT SEQUENCE — Cinematic multi-phase animation
     ════════════════════════════════════════════════════════════ */
  const BOOT_ASCII_ART = [
    ' █████╗ ██████╗ ██╗████████╗██████╗  █████╗ ',
    '██╔══██╗██╔══██╗██║╚══██╔══╝██╔══██╗██╔══██╗',
    '███████║██████╔╝██║   ██║   ██████╔╝███████║',
    '██╔══██║██╔══██╗██║   ██║   ██╔══██╗██╔══██║',
    '██║  ██║██║  ██║██║   ██║   ██║  ██║██║  ██║',
    '╚═╝  ╚═╝╚═╝  ╚═╝╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝',
  ]

  const BOOT_LOG_LINES = [
    { tag: '[  OK  ]', msg: 'Loading BIOS v3.1.4',                cls: 'log-ok'   },
    { tag: '[  OK  ]', msg: 'Initializing memory controller',    cls: 'log-ok'   },
    { tag: '[  OK  ]', msg: 'Detected 16384MB DDR5 RAM',         cls: 'log-ok'   },
    { tag: '[  OK  ]', msg: 'Loading kernel modules',            cls: 'log-ok'   },
    { tag: '[  OK  ]', msg: 'Starting entropy daemon',           cls: 'log-ok'   },
    { tag: '[ WARN ]', msg: 'Filesystem check skipped',          cls: 'log-warn' },
    { tag: '[  OK  ]', msg: 'Mounting /home/aritra/portfolio',   cls: 'log-ok'   },
    { tag: '[  OK  ]', msg: 'Starting AI inference engine v3.1', cls: 'log-ok'   },
    { tag: '[  OK  ]', msg: 'Compiling portfolio data',          cls: 'log-ok'   },
    { tag: '[  OK  ]', msg: 'Launching interactive terminal',    cls: 'log-ok'   },
  ]

  const TOTAL_SEGS  = 24
  const BOOT_GLYPHS = '░▒▓█║╔╗╚╝═╠╣╦╩╬│─┼┐┌└┘▀▄■'

  function buildBootSegments() {
    const container = document.getElementById('boot-segments')
    if (!container) return
    container.innerHTML = ''
    for (let i = 0; i < TOTAL_SEGS; i++) {
      const seg = document.createElement('div')
      seg.className = 'boot-seg'
      seg.id = `boot-seg-${i}`
      container.appendChild(seg)
    }
  }

  function runBoot(onDone) {
    const bootGlitch = document.getElementById('boot-glitch-overlay')
    const bootAscii  = document.getElementById('boot-ascii')
    const bootLog    = document.getElementById('boot-log')
    const bootBarPct = document.getElementById('boot-bar-pct')
    const bootHex    = document.getElementById('boot-hex')
    const bootMsgEl  = document.getElementById('boot-msg')
    const bootSweep  = document.getElementById('boot-scanline-sweep')

    buildBootSegments()

    // ── Phase 1: Power-on CRT flicker (0–450ms) ──────────────
    bootScreen.classList.add('power-on')
    if (bootGlitch) bootGlitch.classList.add('active')

    setTimeout(() => {
      if (bootGlitch) bootGlitch.classList.remove('active')

      // ── Phase 2: Matrix-decode ASCII art (450–1550ms) ───────
      const joined   = BOOT_ASCII_ART.join('\n')
      const chars    = joined.split('')
      const locked   = new Array(chars.length).fill(false)
      const positions = []
      chars.forEach((ch, i) => { if (ch !== '\n' && ch !== ' ') positions.push(i) })

      function renderAscii() {
        return chars.map((ch, i) => {
          if (ch === '\n' || ch === ' ' || locked[i]) return ch
          return BOOT_GLYPHS[Math.floor(Math.random() * BOOT_GLYPHS.length)]
        }).join('')
      }

      if (bootAscii) bootAscii.textContent = renderAscii()

      let posIdx       = 0
      const lockPerTick = Math.max(1, Math.ceil(positions.length / 55))

      const asciiTimer = setInterval(() => {
        for (let k = 0; k < lockPerTick && posIdx < positions.length; k++) {
          locked[positions[posIdx++]] = true
        }
        if (bootAscii) bootAscii.textContent = renderAscii()

        if (posIdx >= positions.length) {
          clearInterval(asciiTimer)
          if (bootAscii) bootAscii.textContent = joined

          // ── Phase 3: Scrolling log lines (1550–2450ms) ──────
          if (bootMsgEl) bootMsgEl.textContent = 'Running system checks...'
          let logIdx = 0

          function nextLog() {
            if (logIdx >= BOOT_LOG_LINES.length) {
              // ── Phase 4: Fill segments (2450–2980ms) ────────
              if (bootMsgEl) bootMsgEl.textContent = 'Loading portfolio modules...'
              let segIdx = 0

              const segTimer = setInterval(() => {
                const seg = document.getElementById(`boot-seg-${segIdx}`)
                if (seg) seg.classList.add('lit')
                segIdx++
                const pct = Math.round((segIdx / TOTAL_SEGS) * 100)
                if (bootBarPct) bootBarPct.textContent = pct + '%'
                if (bootHex)    bootHex.textContent    = '0x' + pct.toString(16).padStart(8, '0').toUpperCase()

                if (segIdx >= TOTAL_SEGS) {
                  clearInterval(segTimer)
                  if (bootMsgEl)  bootMsgEl.textContent  = '[ SYSTEM READY ]'
                  if (bootBarPct) bootBarPct.textContent = '100%'

                  // ── Phase 5: Scanline sweep (2980–3480ms) ───
                  setTimeout(() => {
                    if (bootSweep) bootSweep.classList.add('sweeping')

                    // ── Phase 6: Fade & reveal (3480ms+) ────────
                    setTimeout(() => {
                      bootScreen.classList.add('fade-out')
                      setTimeout(() => {
                        bootScreen.style.display = 'none'
                        termWrap.classList.add('visible')
                        onDone()
                      }, 650)
                    }, 500)
                  }, 300)
                }
              }, 22)
              return
            }

            const { tag, msg, cls } = BOOT_LOG_LINES[logIdx++]
            if (bootLog) {
              const logLine = document.createElement('span')
              logLine.className = 'boot-log-line'
              logLine.innerHTML = `<span class="${cls}">${tag}</span> ${msg}`
              bootLog.appendChild(logLine)
              bootLog.scrollTop = bootLog.scrollHeight
            }
            setTimeout(nextLog, 82 + Math.random() * 45)
          }

          setTimeout(nextLog, 150)
        }
      }, 20)
    }, 450)
  }

  /* ════════════════════════════════════════════════════════════
     OUTPUT RENDERER
     ════════════════════════════════════════════════════════════ */

  // Low-level: append a single DOM element to output
  function appendEl(el) {
    output.appendChild(el)
    scrollToBottom()
  }

  // Create a span line
  function line(text = '', cls = 't-line--green') {
    const s = document.createElement('span')
    s.className = `t-line ${cls}`
    s.textContent = text
    return s
  }

  function emptyLine() {
    const s = document.createElement('span')
    s.className = 't-line t-line--empty'
    s.innerHTML = '&nbsp;'
    return s
  }

  // Append a plain line
  function print(text = '', cls = 't-line--green') {
    appendEl(line(text, cls))
  }

  function printEmpty() { appendEl(emptyLine()) }

  // Append a divider
  function printDivider(char = '─', len = 52) {
    print(char.repeat(len), 't-line t-line--muted t-divider')
  }

  // Append a section header
  function printSection(title) {
    printEmpty()
    const s = document.createElement('span')
    s.className = 't-line t-section'
    s.textContent = `── ${title} ${'─'.repeat(Math.max(0, 46 - title.length))}`
    appendEl(s)
  }

  // Append key-value pair
  function printKV(key, value, valCls = 't-kv__val') {
    const row = document.createElement('div')
    row.className = 't-line t-kv'
    row.innerHTML = `<span class="t-kv__key">${escHtml(key)}</span><span class="t-kv__sep">:</span><span class="${valCls}">${escHtml(value)}</span>`
    appendEl(row)
  }

  // Append tag list
  function printTags(tags) {
    const wrap = document.createElement('div')
    wrap.className = 't-line'
    const inner = document.createElement('div')
    inner.className = 't-tags'
    tags.forEach(t => {
      const span = document.createElement('span')
      span.className = 't-tag'
      span.textContent = t
      inner.appendChild(span)
    })
    wrap.appendChild(inner)
    appendEl(wrap)
  }

  // Append a clickable link
  function printLink(label, href, download = false) {
    const wrap = document.createElement('span')
    wrap.className = 't-line t-line--green'
    const a = document.createElement('a')
    a.className = 't-link'
    a.textContent = label
    a.href = href
    if (download) {
      a.download = ''
    } else {
      a.target = '_blank'
      a.rel = 'noopener noreferrer'
    }
    wrap.appendChild(a)
    appendEl(wrap)
  }

  // Echo user command back to output
  function echoCmd(cmd) {
    const wrap = document.createElement('span')
    wrap.className = 't-line t-line--white t-echo'
    wrap.innerHTML = `<span class="echo-prompt">aritra@portfolio:~$ </span>${escHtml(cmd)}`
    appendEl(wrap)
  }

  function scrollToBottom() {
    requestAnimationFrame(() => {
      body.scrollTop = body.scrollHeight
    })
  }

  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
  }

  /* ════════════════════════════════════════════════════════════
     COMMANDS
     ════════════════════════════════════════════════════════════ */

  function cmdHelp() {
    printSection('Available Commands')
    Object.entries(COMMAND_HINTS).forEach(([cmd, desc]) => {
      const row = document.createElement('div')
      row.className = 't-line t-kv'
      row.innerHTML = `<span class="t-kv__key" style="color:var(--cyan);">${escHtml(cmd.padEnd(18))}</span><span class="t-kv__sep"> </span><span class="t-kv__val" style="color:var(--white);">${escHtml(desc)}</span>`
      appendEl(row)
    })
    printEmpty()
    print('TIP  Type any command above and press Enter.', 't-line t-line--muted')
    print('TIP  Use ↑ / ↓ to navigate command history.', 't-line t-line--muted')
    print('TIP  Press Tab to autocomplete.', 't-line t-line--muted')
  }

  function cmdWhoami() {
    printSection('Identity')
    printKV('Name',     DATA.name)
    printKV('Role',     DATA.title)
    printKV('Focus',    'Backend Engineering & AI Applications')
    printKV('Location', 'India')
    printKV('Status',   'Open to opportunities')
    printEmpty()
    DATA.summary.forEach(l => print(l, 't-line t-line--white'))
  }

  function cmdAbout() {
    printSection('About Me')
    DATA.about.forEach(l => {
      if (l === '') printEmpty()
      else print(l, 't-line t-line--white')
    })
  }

  function cmdSkills() {
    printSection('Technical Skills')
    Object.entries(DATA.skills).forEach(([cat, items]) => {
      printEmpty()
      print(`[ ${cat} ]`, 't-line t-line--cyan')
      printTags(items)
    })
  }

  function cmdExperience() {
    printSection('Experience & Education')
    DATA.experience.forEach((exp, i) => {
      if (i > 0) printEmpty()
      print(`${exp.title}`, 't-line t-line--green')
      print(`  ${exp.period}  |  ${exp.company}`, 't-line t-line--cyan')
      exp.details.forEach(d => print(`  › ${d}`, 't-line t-line--white'))
    })
  }

  function cmdProjects() {
    printSection('Featured Projects')
    DATA.projects.forEach(p => {
      printEmpty()
      print(`[${p.num}] ${p.title}`, 't-line t-line--green')
      printTags(p.tech)
      print(`  Run: project ${p.num}  to see full details`, 't-line t-line--muted')
    })
    printEmpty()
    print('Use  project [1|2|3]  to view full project details.', 't-line t-line--amber')
  }

  function cmdProjectDetail(args) {
    const n = parseInt((args[0] || '').replace(/^0+/, ''), 10)
    const p = DATA.projects.find(x => parseInt(x.num, 10) === n)

    if (!p) {
      print('Usage: project [1|2|3]', 't-line t-line--error')
      return
    }

    printSection(`Project ${p.num}: ${p.title}`)

    print('PROBLEM', 't-line t-line--cyan')
    print('  ' + p.problem, 't-line t-line--white')

    printEmpty()
    print('IMPLEMENTATION', 't-line t-line--cyan')
    p.details.forEach(d => print(`  › ${d}`, 't-line t-line--white'))

    printEmpty()
    print('IMPACT', 't-line t-line--cyan')
    print('  ' + p.impact, 't-line t-line--white')

    printEmpty()
    print('TECH STACK', 't-line t-line--cyan')
    printTags(p.tech)

    printEmpty()
    printLink('[ View on GitHub → ]', p.link)
  }

  function cmdContact() {
    printSection('Contact & Social')
    DATA.contact.forEach(c => {
      printEmpty()
      print(c.label, 't-line t-line--cyan')
      printLink(`  ${c.value}`, c.href, c.download || false)
    })
    printEmpty()
    print("I'm open to opportunities, collaborations, and interesting conversations.", 't-line t-line--white')
  }

  function cmdGithub() {
    print('Opening GitHub profile...', 't-line t-line--dim')
    printLink('→ github.com/aritraio', DATA.github)
    window.open(DATA.github, '_blank', 'noopener,noreferrer')
  }

  function cmdLinkedin() {
    print('Opening LinkedIn profile...', 't-line t-line--dim')
    printLink('→ linkedin.com/in/aritra404', DATA.linkedin)
    window.open(DATA.linkedin, '_blank', 'noopener,noreferrer')
  }

  function cmdResume() {
    print('Downloading resume.pdf...', 't-line t-line--dim')
    const a = document.createElement('a')
    a.href = DATA.resume
    a.download = 'Aritra_Saha_Resume.pdf'
    a.click()
    print('Done. Check your downloads folder.', 't-line t-line--green')
  }

  function cmdEmail() {
    print('Opening email client...', 't-line t-line--dim')
    printLink(`→ ${DATA.email}`, `mailto:${DATA.email}`)
    window.location.href = `mailto:${DATA.email}`
  }

  function cmdStats() {
    printSection('Statistics')
    DATA.stats.forEach(s => printKV(s.label, s.value))
  }

  function cmdLs() {
    const dirs = [
      'about/       skills/      experience/',
      'projects/    contact/     resume.pdf',
    ]
    printEmpty()
    dirs.forEach(d => print(d, 't-line t-line--cyan'))
    printEmpty()
    print('Use  cat [dirname]  to read a section.', 't-line t-line--muted')
  }

  const CAT_MAP = {
    about:      cmdAbout,
    skills:     cmdSkills,
    experience: cmdExperience,
    projects:   cmdProjects,
    contact:    cmdContact,
    'resume.pdf': cmdResume,
  }

  function cmdCat(args) {
    const target = (args[0] || '').toLowerCase().replace(/\/$/, '')
    const fn = CAT_MAP[target]
    if (fn) {
      fn([])
    } else if (!target) {
      print('Usage: cat [about|skills|experience|projects|contact|resume.pdf]', 't-line t-line--error')
    } else {
      print(`cat: ${escHtml(target)}: No such file or directory`, 't-line t-line--error')
    }
  }

  function cmdClear() {
    while (output.firstChild) output.removeChild(output.firstChild)
  }

  function cmdPwd() {
    print('/home/aritra/portfolio', 't-line t-line--cyan')
  }

  function cmdEcho(args) {
    print(args.join(' '), 't-line t-line--white')
  }

  function cmdDate() {
    print(new Date().toString(), 't-line t-line--cyan')
  }

  function cmdUname(args) {
    const flag = args[0] || ''
    if (flag === '-a') {
      print('ARITRA-OS 2.0.26 portfolio-kernel #1 SMP Mon Mar 6 2026 x86_64 GNU/Portfolio', 't-line t-line--white')
    } else {
      print('ARITRA-OS', 't-line t-line--white')
    }
  }

  function cmdNeofetch() {
    const art = [
      '      .___.',
      '     /     \\',
      '    | () () |',
      '     \\  ^  /',
      '      |||||',
    ]
    const info = [
      `${DATA.name}`,
      `─────────────────────────`,
      `OS       : ARITRA-OS v2.0.26`,
      `Shell    : portfolio-bash`,
      `Role     : ${DATA.title}`,
      `Focus    : Backend & AI`,
      `Stack    : Python / Go / JavaScript`,
      `GitHub   : aritraio`,
      `Email    : aritra.saha@outlook.in`,
    ]

    printEmpty()
    const maxRows = Math.max(art.length, info.length)
    for (let i = 0; i < maxRows; i++) {
      const artPart  = (art[i]  || '').padEnd(28)
      const infoPart = info[i] || ''
      const row = document.createElement('div')
      row.className = 't-line'
      row.innerHTML = `<span style="color:var(--green);text-shadow:0 0 6px var(--green-glow);">${escHtml(artPart)}</span><span style="color:var(--cyan);">${escHtml(infoPart)}</span>`
      appendEl(row)
    }
    printEmpty()
    // colour palette blocks
    const pal = document.createElement('span')
    pal.className = 't-line'
    pal.innerHTML = ['#000','#00ff41','#00cc33','#00e5ff','#ffb300','#ff4444','#e8ffe8','#ffffff']
      .map(c => `<span style="background:${c};color:transparent;user-select:none;">███</span>`)
      .join(' ')
    appendEl(pal)
  }

  function cmdBanner() {
    printEmpty()
    ASCII_BANNER.forEach(l => {
      const s = document.createElement('span')
      s.className = 't-line t-ascii t-line--banner'
      s.textContent = l
      appendEl(s)
    })
    printEmpty()
    print(`${DATA.title}`, 't-line t-line--cyan')
    print(`Type  help  to see available commands.`, 't-line t-line--muted')
  }

  function cmdMan(args) {
    const cmd = args[0]
    if (!cmd) {
      print('Usage: man [command]', 't-line t-line--error')
      return
    }
    const desc = COMMAND_HINTS[cmd]
    if (desc) {
      printSection(`Manual: ${cmd}`)
      printKV('Command', cmd)
      printKV('Description', desc)
    } else {
      print(`No manual entry for '${escHtml(cmd)}'`, 't-line t-line--error')
    }
  }

  function cmdExit() {
    print('Launching main portfolio...', 't-line t-line--dim')
    setTimeout(() => {
      window.location.href = 'index.html'
    }, 800)
  }

  function cmdTheme(args) {
    print('Only cyber-green theme is available in this build.', 't-line t-line--amber')
    print('  cyber-green  (active)', 't-line t-line--green')
  }

  function cmdMatrix(args) {
    const val = args[0]
    if (val === 'off') {
      canvas.style.opacity = '0'
      print('Matrix rain: OFF', 't-line t-line--dim')
    } else if (val === 'on') {
      canvas.style.opacity = '0.18'
      print('Matrix rain: ON', 't-line t-line--green')
    } else if (val === 'high') {
      canvas.style.opacity = '0.35'
      matrixIntensity = 3
      print('Matrix rain: HIGH', 't-line t-line--green')
    } else {
      print('Usage: matrix [on|off|high]', 't-line t-line--error')
    }
  }

  const UNKNOWN_RESPONSES = [
    'command not found',
    'unknown command — try  help  for a list of commands',
    'bash: {cmd}: command not found',
    '-bash: {cmd}: No such file or directory',
    'ERROR 404: Command not found. Have you tried  help ?',
  ]

  function cmdUnknown(cmd) {
    const tmpl = UNKNOWN_RESPONSES[Math.floor(Math.random() * UNKNOWN_RESPONSES.length)]
    const msg  = tmpl.replace('{cmd}', cmd)
    print(msg, 't-line t-line--error')
  }

  /* ════════════════════════════════════════════════════════════
     COMMAND DISPATCH
     ════════════════════════════════════════════════════════════ */
  function dispatch(raw) {
    const trimmed = raw.trim()
    if (!trimmed) return

    echoCmd(trimmed)

    const parts = trimmed.split(/\s+/)
    const cmd   = parts[0].toLowerCase()
    const args  = parts.slice(1)

    if (COMMANDS[cmd]) {
      COMMANDS[cmd](args)
    } else {
      cmdUnknown(cmd)
    }

    printEmpty()
  }

  /* ════════════════════════════════════════════════════════════
     INPUT HANDLING
     ════════════════════════════════════════════════════════════ */
  function initInput() {

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = input.value
        if (val.trim()) {
          history.unshift(val)
          if (history.length > 100) history.pop()
          historyIndex = -1
        }
        dispatch(val)
        input.value = ''
        showCursor(true)
        return
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault()
        if (historyIndex < history.length - 1) {
          historyIndex++
          input.value = history[historyIndex]
          // move cursor to end
          requestAnimationFrame(() => {
            input.setSelectionRange(input.value.length, input.value.length)
          })
        }
        return
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        if (historyIndex > 0) {
          historyIndex--
          input.value = history[historyIndex]
        } else {
          historyIndex = -1
          input.value = ''
        }
        return
      }

      if (e.key === 'Tab') {
        e.preventDefault()
        handleAutocomplete()
        return
      }

      if (e.key === 'l' && e.ctrlKey) {
        e.preventDefault()
        cmdClear()
        return
      }

      if (e.key === 'c' && e.ctrlKey) {
        e.preventDefault()
        print('^C', 't-line t-line--red')
        input.value = ''
        return
      }
    })

    input.addEventListener('input', () => {
      showCursor(input.value.length === 0)
    })

    // Click anywhere on terminal body → focus input
    body.addEventListener('click', () => input.focus())
  }

  function showCursor(show) {
    cursor.classList.toggle('hidden', !show)
  }

  /* ── Autocomplete ─────────────────────────────────────────── */
  function handleAutocomplete() {
    const val      = input.value.toLowerCase().trim()
    if (!val) return

    const parts    = val.split(/\s+/)
    const cmdPart  = parts[0]
    const argPart  = parts[1] || ''

    // If typing the command name
    if (parts.length === 1) {
      const matches = Object.keys(COMMANDS).filter(c => c.startsWith(cmdPart))
      if (matches.length === 1) {
        input.value = matches[0] + ' '
      } else if (matches.length > 1) {
        echoCmd(input.value)
        const row = document.createElement('div')
        row.className = 't-line t-autocomplete'
        matches.forEach(m => {
          const span = document.createElement('span')
          span.textContent = m
          row.appendChild(span)
        })
        appendEl(row)
        printEmpty()
      }
      return
    }

    // project command arg autocomplete
    if (cmdPart === 'project') {
      const nums = ['1','2','3']
      const m = nums.filter(n => n.startsWith(argPart))
      if (m.length === 1) input.value = `project ${m[0]}`
    }

    // cat command arg autocomplete
    if (cmdPart === 'cat') {
      const names = Object.keys(CAT_MAP)
      const m = names.filter(n => n.startsWith(argPart))
      if (m.length === 1) input.value = `cat ${m[0]}`
      else if (m.length > 1) {
        echoCmd(input.value)
        const row = document.createElement('div')
        row.className = 't-line t-autocomplete'
        m.forEach(n => { const s = document.createElement('span'); s.textContent = n; row.appendChild(s) })
        appendEl(row)
        printEmpty()
      }
    }
  }

  /* ════════════════════════════════════════════════════════════
     STARTUP SEQUENCE
     ════════════════════════════════════════════════════════════ */
  function printWelcome() {
    cmdBanner()

    printEmpty()
    printDivider()
    print(' Welcome to the interactive terminal portfolio!', 't-line t-line--white')
    printDivider()
    printEmpty()
    print("Type  help   to see all commands.", 't-line t-line--green')
    print("Type  about  to learn about me.  ", 't-line t-line--green')
    print("Type  exit   to go to the regular portfolio.", 't-line t-line--green')
    printEmpty()
    print(`Session started: ${new Date().toLocaleString()}`, 't-line t-line--muted')
    printEmpty()

    input.focus()
  }

  /* ── INIT ─────────────────────────────────────────────────── */
  const matrixFx = initMatrix()
  initInput()
  runBoot(printWelcome)

  // Always refocus input when typing anywhere
  document.addEventListener('keydown', (e) => {
    if (
      document.activeElement === input ||
      e.ctrlKey || e.metaKey || e.altKey ||
      ['F1','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11','F12','Tab'].includes(e.key)
    ) return
    input.focus()
  })

})()
