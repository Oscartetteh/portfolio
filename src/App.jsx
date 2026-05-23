import { useEffect, useMemo, useState } from 'react';

const resumePdf = '/files/2026-05-22-Resume_Oscar_Tetteh.pdf';
const profileImage = '/images/Oscar Tetteh_Photo.png';
const externalProfile = 'https://smart-training.ca/blog/2023/06/27/oscar-bismark-tetteh/';

function LinkedInIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.94 8.9H3.78v10.05h3.16V8.9ZM5.36 5.05c-1.02 0-1.69.67-1.69 1.54 0 .86.65 1.54 1.65 1.54h.02c1.04 0 1.68-.68 1.68-1.54-.02-.87-.64-1.54-1.66-1.54Zm5.32 13.9h3.16v-5.62c0-.3.02-.6.11-.82.24-.6.8-1.22 1.73-1.22 1.22 0 1.71.92 1.71 2.28v5.38h3.16v-5.75c0-3.08-1.65-4.51-3.85-4.51-1.8 0-2.58 1-3.02 1.68h.02V8.9h-3.02c.04.94 0 10.05 0 10.05Z" /></svg>;
}

function GitHubIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.01 2.5a9.5 9.5 0 0 0-3 18.52c.47.08.64-.2.64-.45v-1.68c-2.61.57-3.16-1.11-3.16-1.11-.43-1.09-1.05-1.38-1.05-1.38-.86-.58.07-.57.07-.57.94.07 1.44.97 1.44.97.84 1.43 2.2 1.02 2.74.78.08-.6.33-1.02.6-1.25-2.08-.24-4.27-1.04-4.27-4.63 0-1.02.37-1.86.97-2.52-.1-.24-.42-1.2.09-2.49 0 0 .79-.25 2.6.96a8.92 8.92 0 0 1 4.73 0c1.8-1.21 2.59-.96 2.59-.96.51 1.29.19 2.25.09 2.49.61.66.97 1.5.97 2.52 0 3.6-2.19 4.39-4.28 4.62.34.29.64.86.64 1.74v2.58c0 .25.17.54.65.45A9.5 9.5 0 0 0 12.01 2.5Z" /></svg>;
}

function EmailIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.25 5.75h15.5c.97 0 1.75.78 1.75 1.75v9c0 .97-.78 1.75-1.75 1.75H4.25c-.97 0-1.75-.78-1.75-1.75v-9c0-.97.78-1.75 1.75-1.75Zm.24 1.5 7.1 5.08c.25.18.57.18.82 0l7.1-5.08H4.49Zm15.51 1.44-6.72 4.8a2.22 2.22 0 0 1-2.56 0L4 8.69v7.81c0 .14.11.25.25.25h15.5c.14 0 .25-.11.25-.25V8.69Z" /></svg>;
}

function Aurora({ count = 4 }) {
  return (
    <div className="aurora">
      {Array.from({ length: count }, (_, i) => <div key={i} className={`orb orb-${i + 1}`} />)}
    </div>
  );
}

function SocialLinks({ rail = false }) {
  const className = rail ? 'side-rail' : 'footer-socials';
  const linkClass = rail ? undefined : 'social-link';
  return (
    <div className={className} aria-label={rail ? 'Quick links' : undefined}>
      <a className={linkClass} href="https://www.linkedin.com/in/oscar-bismark-tetteh-93a1351a7" target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedInIcon /></a>
      <a className={linkClass} href="https://github.com/Oscartetteh" target="_blank" rel="noreferrer" aria-label="GitHub"><GitHubIcon /></a>
      <a className={linkClass} href="mailto:oscar.tetteh@ct.gov" aria-label="Email"><EmailIcon /></a>
    </div>
  );
}

function routeFromLocation() {
  const path = window.location.pathname.replace(/\/$/, '');
  if (path === '/projects') return 'projects';
  if (path === '/resume') return 'resume';
  return 'home';
}

function navigate(route, hash) {
  const path = route === 'home' ? '/' : `/${route}`;
  window.history.pushState({}, '', `${path}${hash || ''}`);
  window.dispatchEvent(new PopStateEvent('popstate'));
  if (hash) setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' }), 40);
  else window.scrollTo({ top: 0, behavior: 'smooth' });
}

function Nav({ page }) {
  const [open, setOpen] = useState(false);
  const go = (route, hash) => (event) => {
    event.preventDefault();
    setOpen(false);
    navigate(route, hash);
  };

  return (
    <nav id="navbar" className={page === 'home' ? 'nav-light' : 'scrolled'}>
      <a className="nav-logo" href="/" onClick={go('home')}>OBT.</a>
      <ul className={`nav-links ${open ? 'open' : ''}`} id="navLinks">
        <li><a href="/" className={page === 'home' ? 'active' : ''} onClick={go('home')}>Home</a></li>
        <li><a href="/#about" onClick={go('home', '#about')}>About</a></li>
        <li><a href="/#skills" onClick={go('home', '#skills')}>Skills</a></li>
        <li><a href="/projects" className={page === 'projects' ? 'active' : ''} onClick={go('projects')}>Projects</a></li>
        <li><a href="/resume" className={page === 'resume' ? 'active' : ''} onClick={go('resume')}>Resume</a></li>
        <li><a href="/#contact" onClick={go('home', '#contact')}>Contact</a></li>
      </ul>
      <button className="hamburger" id="hamburger" aria-label="Toggle menu" onClick={() => setOpen(!open)}>
        <span></span><span></span><span></span>
      </button>
    </nav>
  );
}

function Footer() {
  return (
    <footer>
      <SocialLinks />
      <p>Designed &amp; built by <span>Oscar Bismark Tetteh</span> &mdash; &copy; 2026</p>
    </footer>
  );
}

function useHomepageEffects(page) {
  useEffect(() => {
    const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const animatedCounters = new WeakSet();

    function animateCounter(el) {
      if (animatedCounters.has(el)) return;
      animatedCounters.add(el);
      const target = Number(el.dataset.target || 0);
      let count = 0;
      const step = Math.ceil(target / 40);
      const timer = window.setInterval(() => {
        count = Math.min(count + step, target);
        el.textContent = `${count}+`;
        if (count >= target) window.clearInterval(timer);
      }, 40);
    }

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          const counter = entry.target.querySelector('[data-target]');
          if (counter) animateCounter(counter);
          if (entry.target.dataset.target) animateCounter(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach((el) => revealObserver.observe(el));

    const compGrid = document.getElementById('competencies-grid');
    let compAnimated = false;
    const compObserver = compGrid ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !compAnimated) {
          compAnimated = true;
          compGrid.querySelectorAll('.comp-item').forEach((item) => {
            const fill = item.querySelector('.comp-fill');
            if (fill) requestAnimationFrame(() => { fill.style.width = `${item.dataset.pct}%`; });
          });
        }
      });
    }, { threshold: 0.2 }) : null;
    if (compGrid && compObserver) compObserver.observe(compGrid);

    return () => {
      revealObserver.disconnect();
      compObserver?.disconnect();
    };
  }, [page]);

  useEffect(() => {
    const navbar = document.getElementById('navbar');
    const heroSection = document.getElementById('home');
    if (!navbar) return;

    function updateNav() {
      if (page !== 'home') {
        navbar.classList.add('scrolled');
        navbar.classList.remove('nav-light');
        return;
      }
      const heroHeight = heroSection ? heroSection.offsetHeight : window.innerHeight;
      if (window.scrollY < heroHeight - 68) {
        navbar.classList.add('nav-light');
        navbar.classList.remove('scrolled');
      } else {
        navbar.classList.remove('nav-light');
        navbar.classList.add('scrolled');
      }
    }

    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
    return () => window.removeEventListener('scroll', updateNav);
  }, [page]);
}

function useHeroCanvas(page) {
  useEffect(() => {
    if (page !== 'home') return undefined;
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    let frame = 0;
    let nodes = [];
    let mouse = { x: -999, y: -999 };
    const nodeCount = 46;
    const connectDist = 150;
    const mouseDist = 120;

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function initNodes() {
      nodes = Array.from({ length: nodeCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        baseR: Math.random() * 1.2 + 1,
        phase: Math.random() * Math.PI * 2
      }));
    }

    function drawFrame() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.hypot(dx, dy);
        if (dist < mouseDist && dist > 0) {
          const force = ((mouseDist - dist) / mouseDist) * 0.012;
          node.vx += (dx / dist) * force;
          node.vy += (dy / dist) * force;
        }

        const speed = Math.hypot(node.vx, node.vy);
        if (speed > 0.34) {
          node.vx = (node.vx / speed) * 0.34;
          node.vy = (node.vy / speed) * 0.34;
        }

        node.phase += 0.01;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.baseR + Math.sin(node.phase) * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(96,165,250,0.34)';
        ctx.fill();
      });

      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i];
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < connectDist) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(96,165,250,${(1 - d / connectDist) * 0.09})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      frame = requestAnimationFrame(drawFrame);
    }

    const onMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      mouse = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };
    const onMouseLeave = () => { mouse = { x: -999, y: -999 }; };
    const onResize = () => { resize(); initNodes(); };

    resize();
    initNodes();
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('resize', onResize);
    frame = requestAnimationFrame(drawFrame);

    return () => {
      cancelAnimationFrame(frame);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', onResize);
    };
  }, [page]);
}

function useGlobeCanvas(page) {
  useEffect(() => {
    if (page !== 'home') return undefined;
    const canvas = document.getElementById('globe-canvas');
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const points = [];
    const arcs = [];
    const particles = [];
    let size = 0;
    let rotation = 0;
    let frame = 0;

    function latLonToPoint(lat, lon, radius) {
      const phi = (90 - lat) * Math.PI / 180;
      const theta = (lon + rotation) * Math.PI / 180;
      return {
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.cos(phi),
        z: radius * Math.sin(phi) * Math.sin(theta)
      };
    }

    function resizeGlobe() {
      const rect = canvas.getBoundingClientRect();
      size = Math.max(280, rect.width || 460);
      canvas.width = Math.floor(size * dpr);
      canvas.height = Math.floor(size * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function seedGlobe() {
      points.length = 0;
      arcs.length = 0;
      particles.length = 0;
      const hubs = [[41.76, -72.67], [51.5, -0.12], [5.56, -0.2], [1.35, 103.8], [35.68, 139.69], [40.71, -74], [52.52, 13.4], [-33.87, 151.2], [25.2, 55.27], [43.65, -79.38], [6.52, 3.37], [-1.29, 36.82]];
      hubs.forEach(([lat, lon], index) => points.push({ lat, lon, phase: Math.random() * Math.PI * 2, major: index < 5 }));
      for (let i = 0; i < 42; i += 1) points.push({ lat: -58 + Math.random() * 116, lon: -180 + Math.random() * 360, phase: Math.random() * Math.PI * 2, major: false });
      for (let i = 0; i < 18; i += 1) {
        const a = points[Math.floor(Math.random() * 12)];
        const b = points[Math.floor(Math.random() * points.length)];
        if (a !== b) arcs.push({ a, b, phase: Math.random(), speed: 0.0012 + Math.random() * 0.001 });
      }
      for (let i = 0; i < 30; i += 1) particles.push({ lat: -70 + Math.random() * 140, lon: -180 + Math.random() * 360, drift: 0.05 + Math.random() * 0.11, phase: Math.random() * Math.PI * 2 });
    }

    function drawArc(a, b, radius, t) {
      const steps = 32;
      let previous = null;
      ctx.beginPath();
      for (let i = 0; i <= steps; i += 1) {
        const p = i / steps;
        const point = latLonToPoint(a.lat + (b.lat - a.lat) * p + Math.sin(p * Math.PI) * 10, a.lon + (b.lon - a.lon) * p, radius + Math.sin(p * Math.PI) * 12);
        if (point.z < -radius * 0.35) {
          previous = null;
        } else {
          const scale = 1 + point.z / (radius * 3.4);
          const x = size / 2 + point.x * scale;
          const y = size / 2 - point.y * scale;
          if (!previous) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
          previous = { x, y };
        }
      }
      ctx.strokeStyle = `rgba(96,165,250,${0.06 + 0.11 * t})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    function drawGlobe(ts) {
      ctx.clearRect(0, 0, size, size);
      const radius = size * 0.34;
      const cx = size / 2;
      const cy = size / 2;
      rotation += 0.022;

      const grad = ctx.createRadialGradient(cx - radius * 0.25, cy - radius * 0.32, radius * 0.08, cx, cy, radius * 1.28);
      grad.addColorStop(0, 'rgba(96,165,250,.24)');
      grad.addColorStop(0.42, 'rgba(37,99,235,.08)');
      grad.addColorStop(1, 'rgba(2,9,23,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.18, 0, Math.PI * 2);
      ctx.fill();

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.clip();

      for (let lat = -60; lat <= 60; lat += 20) {
        ctx.beginPath();
        for (let lon = -180; lon <= 180; lon += 4) {
          const p = latLonToPoint(lat, lon, radius);
          const scale = 1 + p.z / (radius * 3.3);
          const x = cx + p.x * scale;
          const y = cy - p.y * scale;
          if (lon === -180) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = 'rgba(96,165,250,.08)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      for (let lon = -150; lon <= 180; lon += 30) {
        ctx.beginPath();
        for (let lat = -80; lat <= 80; lat += 4) {
          const p = latLonToPoint(lat, lon, radius);
          const scale = 1 + p.z / (radius * 3.3);
          const x = cx + p.x * scale;
          const y = cy - p.y * scale;
          if (lat === -80) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = 'rgba(96,165,250,.065)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      arcs.forEach((arc) => {
        arc.phase = (arc.phase + arc.speed) % 1;
        drawArc(arc.a, arc.b, radius, Math.sin(arc.phase * Math.PI));
      });

      points.forEach((point) => {
        const p = latLonToPoint(point.lat, point.lon, radius);
        if (p.z < -radius * 0.42) return;
        const scale = 1 + p.z / (radius * 3);
        const alpha = 0.18 + Math.max(0, p.z / radius) * 0.45;
        const pulse = Math.sin(ts * 0.0012 + point.phase) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.arc(cx + p.x * scale, cy - p.y * scale, (point.major ? 2.4 : 1.35) + pulse * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = point.major ? `rgba(6,214,160,${alpha + 0.25})` : `rgba(96,165,250,${alpha})`;
        ctx.fill();
      });

      particles.forEach((particle) => {
        particle.lon += particle.drift;
        const p = latLonToPoint(particle.lat, particle.lon, radius * 1.14);
        if (p.z < -radius * 0.2) return;
        const alpha = 0.08 + (Math.sin(ts * 0.001 + particle.phase) * 0.5 + 0.5) * 0.18;
        ctx.beginPath();
        ctx.arc(cx + p.x, cy - p.y, 1.1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(125,211,252,${alpha})`;
        ctx.fill();
      });

      ctx.restore();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(96,165,250,.28)';
      ctx.lineWidth = 1.1;
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(cx, cy, radius * 1.12, radius * 0.34, -0.42, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(6,214,160,.18)';
      ctx.lineWidth = 1;
      ctx.stroke();
      frame = requestAnimationFrame(drawGlobe);
    }

    resizeGlobe();
    seedGlobe();
    window.addEventListener('resize', resizeGlobe);
    frame = requestAnimationFrame(drawGlobe);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resizeGlobe);
    };
  }, [page]);
}

function useTypewriter(page) {
  useEffect(() => {
    if (page !== 'home') return undefined;
    const twEl = document.getElementById('typewriter');
    if (!twEl) return undefined;
    const roles = ['Data Scientist', 'Quantitative Economist', 'Statistician', 'Policy Analyst', 'Research Analyst'];
    let ri = 0;
    let ci = 0;
    let deleting = false;
    let timer = 0;

    function type() {
      const word = roles[ri];
      twEl.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
      let delay = deleting ? 42 : 78 + Math.random() * 28;
      if (!deleting && ci > word.length) {
        delay = 1900;
        deleting = true;
      } else if (deleting && ci < 0) {
        deleting = false;
        ri = (ri + 1) % roles.length;
        ci = 0;
        delay = 420;
      }
      timer = window.setTimeout(type, delay);
    }

    timer = window.setTimeout(type, 1200);
    return () => window.clearTimeout(timer);
  }, [page]);
}

const competencies = [
  ['Python', 95], ['SQL', 90], ['Statistical Analysis', 95], ['R', 88],
  ['Econometrics', 92], ['Power BI', 85], ['Machine Learning', 80], ['Research Analytics', 94]
];

const skills = [
  ['Data Analysis & Programming', '📊', ['Python', 'R', 'Pandas', 'NumPy', 'SciPy', 'Statsmodels', 'Excel']],
  ['Data Visualization & Reporting', '📈', ['Power BI', 'Matplotlib', 'Seaborn', 'Plotly', 'Excel', 'Visio']],
  ['Databases & Pipelines', '🗄️', ['SQL', 'ETL Pipelines', 'ELT Pipelines', 'PostgreSQL', 'SQLite', 'BigQuery']],
  ['Statistical & Econometric Methods', '🔬', ['Forecasting', 'Econometrics', 'Regression Analysis', 'Time Series', 'Survival Analysis', 'Bootstrap & Monte Carlo', 'Hypothesis Testing']],
  ['Spatial & Policy Analysis', '🗺️', ['QGIS', 'Spatial Analysis (R)', 'Policy Impact Assessment', 'Regulatory Analysis', 'Jurisdictional Scans', 'Survey Design']],
  ['Tools & Environment', '☁️', ['Git', 'GitHub', 'Jupyter', 'VS Code', 'pyenv', 'venv', 'conda', 'SPSS']]
];

function HomePage() {
  return (
    <>
      <section className="hero" id="home">
        <canvas id="hero-canvas"></canvas>
        <SocialLinks rail />
        <div className="hero-shell">
          <div className="hero-content">
            <div className="hero-tag fade-in">Available for opportunities</div>
            <h1 className="fade-in delay-1">Oscar Bismark<br /><span className="gradient-text">Tetteh</span></h1>
            <div className="hero-typewriter fade-in delay-2">
              <span>I am a&nbsp;</span><span className="typewriter-text" id="typewriter"></span><span className="cursor">|</span>
            </div>
            <p className="hero-desc fade-in delay-3">Turning complex data into clear, decision-ready insights through rigorous statistical analysis, forecasting, and evidence-based research &mdash; with over six years of experience across the public, private, and academic sectors.</p>
            <div className="hero-btns fade-in delay-4">
              <a href="/projects" className="btn btn-primary" onClick={(event) => { event.preventDefault(); navigate('projects'); }}>View My Work</a>
              <a href={resumePdf} className="btn btn-outline" download="Oscar_Tetteh_Resume.pdf">⬇ Download Resume</a>
            </div>
          </div>
          <div className="globe-wrap fade-in delay-3" aria-hidden="true">
            <canvas id="globe-canvas"></canvas>
            <div className="globe-halo"></div>
            <div className="globe-caption"><span>Global analytics layer</span><strong>AI intelligence network</strong></div>
          </div>
        </div>
      </section>
      <div className="section-wave"></div>
      <AboutSection />
      <SkillsSection />
      <ContactSection />
    </>
  );
}

function AboutSection() {
  return (
    <section id="about">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Get to know me</span>
          <h2 className="section-title">About <span>Me</span></h2>
          <p className="section-subtitle">Data scientist, statistician, and quantitative economist passionate about evidence-based analysis.</p>
        </div>
        <div className="about-grid">
          <div className="about-img-wrap reveal-left">
            <div className="profile-orbit"></div>
            <div className="profile-glow-ring"><div className="profile-photo-inner"><img src={profileImage} alt="Oscar Bismark Tetteh" /></div></div>
            <div className="about-badge"><span className="about-badge-num">6+</span><span className="about-badge-label">Years</span></div>
          </div>
          <div className="about-text reveal-right">
            <h3>Data Scientist, Statistician &amp;<br />Quantitative Economist</h3>
            <p>I am a data scientist, statistician, and quantitative economist with over six years of experience across academia, the private sector, and the public sector. I specialize in forecasting, statistical analysis, data modelling, and applied research.</p>
            <p>With strong experience using Python, R, SQL, and data pipelines, I turn complex data into clear, decision-ready insights. My work spans child welfare analytics, educational policy funding models, economic research, and commodity market analysis.</p>
            <p>My approach is grounded in analytical rigour, attention to detail, and a practical commitment to solving problems through evidence-based analysis.</p>
            <div className="about-stats">
              <div className="stat-box reveal delay-100"><span className="stat-num" data-target="6">0</span><span className="stat-label">Years Experience</span></div>
              <div className="stat-box reveal delay-200"><span className="stat-num" data-target="7">0</span><span className="stat-label">Roles &amp; Sectors</span></div>
              <div className="stat-box reveal delay-300"><span className="stat-num" data-target="15">0</span><span className="stat-label">Tools Mastered</span></div>
            </div>
            <div className="button-row">
              <a href="/resume" className="btn btn-primary btn-sm" onClick={(event) => { event.preventDefault(); navigate('resume'); }}>View Resume</a>
              <a href="#contact" className="btn btn-outline btn-sm">Get in Touch</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section id="skills">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">What I work with</span>
          <h2 className="section-title">Skills &amp; <span>Tools</span></h2>
          <p className="section-subtitle">A versatile toolkit built across years of applied research and data work.</p>
        </div>
        <div className="competencies-grid" id="competencies-grid">
          {competencies.map(([label, pct]) => (
            <div className="comp-item" data-pct={pct} key={label}>
              <div className="comp-header"><span className="comp-label">{label}</span><span className="comp-pct">{pct}%</span></div>
              <div className="comp-bar"><div className="comp-fill"></div></div>
            </div>
          ))}
        </div>
        <div className="skills-grid">
          {skills.map(([title, icon, tags], index) => (
            <div className={`skill-category reveal delay-${((index % 3) + 1) * 100}`} key={title}>
              <div className="skill-cat-icon">{icon}</div>
              <div className="skill-cat-title">{title}</div>
              <div className="skill-tags">{tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const openGmailCompose = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim() || 'Portfolio inquiry';
    const message = form.message.value.trim();
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      '',
      message
    ].join('\n');
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=bismarktetteh25@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  return (
    <section id="contact">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Let's connect</span>
          <h2 className="section-title">Get In <span>Touch</span></h2>
          <p className="section-subtitle">Open to opportunities, collaborations, and research conversations.</p>
        </div>
        <div className="contact-grid">
          <div className="reveal-left">
            <div className="contact-info"><h3>Let's work together</h3><p>Whether you have a research question, a data project, or want to discuss policy analytics, feel free to reach out. I'll get back to you as soon as I can.</p></div>
            <div className="contact-cards">
              <ContactCard icon="✉️" label="Work Email"><a href="mailto:oscar.tetteh@ct.gov">oscar.tetteh@ct.gov</a></ContactCard>
              <ContactCard icon="📱" label="Phone">+1 (959) 256 6411</ContactCard>
              <ContactCard icon="📍" label="Location">Hartford, Connecticut, USA</ContactCard>
              <ContactCard icon="💼" label="LinkedIn"><a href="https://www.linkedin.com/in/oscar-bismark-tetteh-93a1351a7" target="_blank" rel="noreferrer">oscar-bismark-tetteh</a></ContactCard>
              <ContactCard icon="⌘" label="GitHub"><a href="https://github.com/Oscartetteh" target="_blank" rel="noreferrer">Oscartetteh</a></ContactCard>
              <ContactCard icon="↗" label="Profile"><a href={externalProfile} target="_blank" rel="noreferrer">SMART Training feature</a></ContactCard>
            </div>
          </div>
          <div className="contact-form-wrap reveal-right">
            <h4>Send a Message</h4>
            <form
              className="contact-form"
              onSubmit={openGmailCompose}
            >
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input type="text" id="name" name="name" placeholder="Jane Smith" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input type="email" id="email" name="email" placeholder="jane@example.com" required />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" name="subject" placeholder="Project Inquiry" />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="5" placeholder="Tell me about your project or question..." required></textarea>
              </div>
              <button type="submit" className="btn btn-primary full-button">Send Message ✉️</button>
              {submitted && <p className="form-feedback">Gmail compose opened in a new tab. Please click Send there.</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactCard({ icon, label, children }) {
  return <div className="contact-card"><div className="contact-icon">{icon}</div><div className="contact-detail"><span>{label}</span>{children}</div></div>;
}

const projects = [
  ['Project 01', ['Econometrics', "Master's Thesis", 'R'], 'Economic Determinants of Food Security in the Northwest Territories', "Master's thesis investigating the economic factors driving food security outcomes in Canada's Northwest Territories. Applied advanced econometric methods to panel data, identifying key socio-economic and geographic determinants to support evidence-based policy recommendations for remote and Indigenous communities.", ['R', 'Econometrics', 'Panel Data', 'Policy Analysis', 'ggplot2', 'Statistics Canada'], 'Read Thesis', '/files/Economic Determinants of Food Security in Northwest Territories.pdf'],
  ['Project 02', ['Simulation', 'Statistical Inference', 'R'], 'Bootstrap & Monte Carlo Inference — Exchange Rate & Commodity Prices', 'Applied simulation-based inference using bootstrap and Monte Carlo techniques to analyze the relationship between the US exchange rate and commodity prices. Assessed the statistical properties of estimators and constructed confidence intervals under non-standard distributions.', ['R', 'Bootstrap', 'Monte Carlo', 'Time Series', 'Statistical Inference'], 'View Analysis', '/files/Simulation-Based Inference Using Bootstrap and Monte Carlo.pdf'],
  ['Project 03', ['International Trade', 'Panel Data', 'R'], 'Gravity Models of Trade — EU Panel Data', 'Estimated gravity models of bilateral trade for European Union member states using panel data methods. Analyzed the role of economic size, distance, and trade agreements in determining trade flows, with results informing understanding of post-Brexit trade pattern shifts.', ['R', 'Gravity Model', 'Panel Data', 'International Trade', 'Econometrics'], 'View Paper', '/files/Gravity Models of Trade for EU Panel Data.pdf'],
  ['Project 04', ['Econometrics', 'Commodity Prices', 'R'], 'Canada-US Exchange Rate and Commodity Prices — Project I', 'Analyzed the relationship between Canada-US exchange rate movements and commodity price dynamics using applied econometric methods, statistical interpretation, and research-focused reporting.', ['R', 'Econometrics', 'Exchange Rates', 'Commodity Prices', 'Regression'], 'View Paper', '/files/Canada-US Exchange Rate and Commodity Prices - Project I.pdf'],
  ['Project 05', ['Econometrics', 'Commodity Prices', 'R'], 'Canada-US Exchange Rate and Commodity Prices — Project II', 'Extended the exchange rate and commodity price analysis through additional modelling, robustness checks, and quantitative interpretation of market relationships.', ['R', 'Econometrics', 'Time Series', 'Commodity Prices', 'Research'], 'View Paper', '/files/Canada-US Exchange Rate and Commodity Prices - Project II.pdf'],
  ['Project 06', ['Child Welfare', 'Risk Modelling', 'Python'], 'SDM Model Re-evaluation — Child Welfare Risk Assessment', 'Re-evaluated the Structured Decision Making (SDM) model used in Connecticut child welfare to measure predictive performance using actuarial risk modelling and survival analysis. Built SQL- and Python-based workflows to clean and prepare case-level administrative data for model validation across population subgroups.', ['Python', 'SQL', 'Survival Analysis', 'Pandas', 'NumPy', 'Risk Modelling'], 'View Report', null],
  ['Project 07', ['Public Policy', 'Forecasting', 'R'], 'Education Funding Forecast & Policy Scenario Analysis — Alberta', 'Developed statistical models, scenario analyses, and sensitivity analyses to forecast funding requirements and assess the impact of policy changes on budget allocations and educational equity for the Alberta Ministry of Education. Researched comparative approaches across Canadian and international jurisdictions.', ['R', 'Python', 'Forecasting', 'Scenario Analysis', 'Policy Research', 'Power BI'], 'View Brief', null],
  ['Project 08', ['Market Analysis', 'Forecasting', 'Python'], 'Alberta iGaming & Liquor Markup Trend Forecasting', 'Conducted quantitative forecasting and analysis of iGaming revenue and liquor markup pricing trends in Alberta. Integrated multi-source datasets for dashboard development and tracked retail price movements across provinces to inform economic planning and policy decisions at the provincial level.', ['Python', 'Forecasting', 'SQL', 'Power BI', 'Market Analysis', 'Dashboard'], 'View Dashboard', null]
];

function ProjectsPage() {
  return (
    <div className="projects-page">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">My work</span>
          <h1 className="section-title">Projects &amp; <span>Research</span></h1>
          <p className="section-subtitle">Research, data modelling, and analytical projects spanning public policy, economics, child welfare, and commodity markets.</p>
        </div>
        <div className="projects-grid">
          {projects.map(([number, types, title, desc, tags, cta, pdf], index) => (
            <div className={`project-card reveal delay-${((index % 3) + 1) * 100}`} key={title}>
              <div className="project-banner"></div>
              <div className="project-body">
                <div className="project-number">{number}</div>
                <div className="project-type">{types.map((type) => <span className="project-type-tag" key={type}>{type}</span>)}</div>
                <h3 className="project-title">{title}</h3>
                <p className="project-desc">{desc}</p>
                <div className="project-tags">{tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
                <div className="project-links">
                  <a href={pdf || '#'} className="btn btn-outline btn-sm" target={pdf ? '_blank' : undefined} rel={pdf ? 'noreferrer' : undefined}>📄 {cta}</a>
                  <a href={externalProfile} className="btn btn-ghost btn-sm" target="_blank" rel="noreferrer">Profile</a>
                  <a href="https://github.com/Oscartetteh" className="btn btn-ghost btn-sm" target="_blank" rel="noreferrer">GitHub</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const experience = [
  ['Associate Analyst', 'State of Connecticut — Dept. of Children and Family, Bureau of Continuous Improvement — Hartford, CT', 'Jan 2026 – Present', ['Re-evaluated the Structured Decision Making (SDM) model in child welfare using actuarial risk modelling, survival analysis, and applied statistical methods.', 'Built SQL- and Python-based workflows to extract, join, clean, and prepare administrative and case-level data for model validation.', 'Used pandas and NumPy to transform large datasets and support risk modelling, subgroup analysis, and research reporting.', 'Conducted exploratory data analysis and statistical testing to evaluate how well the model identified future high-risk outcomes across population subgroups.', 'Communicated technical findings through reports, summaries, and presentations to support evidence-based improvements in child welfare tools.']],
  ['Senior Policy and Data Analyst', 'Government of Alberta — Ministry of Education, Office of Statistical Information (OSI) — Edmonton, Canada', 'Sep 2024 – Dec 2025', ['Developed statistical models, scenario analyses, and sensitivity analyses to forecast funding requirements and assess policy impact on budget allocations and educational equity.', 'Analyzed large policy and financial datasets to identify trends, quantify outcomes, and support evidence-based decision-making.', "Researched funding policy approaches across Canadian and international jurisdictions to inform Alberta's funding framework.", 'Produced analytical summaries, reports, and briefing materials for decision-makers.']],
  ['Policy and Data Analyst', 'Government of Alberta — Service Alberta and Red Tape Reduction, Economic & Data Unit — Edmonton, Canada', 'May 2024 – Sep 2024', ['Conducted forecasting and quantitative analysis on Alberta iGaming and liquor markup trends to support policy and planning decisions.', 'Integrated and analyzed data from multiple sources for dashboard development, forecasting, and market analysis.', 'Tracked retail price movements across Alberta and comparator provinces to inform economic reporting.', 'Prepared policy briefs, technical summaries, and presentations for diverse audiences.']],
  ['Research & Data Analyst', 'University of Saskatchewan — Department of Economics — Canada', 'Sep 2022 – Apr 2024', ['Collected, extracted, cleaned, and analyzed data from Statistics Canada, the U.S. Bureau of Labor Statistics, and other databases.', 'Worked with multi-source datasets to support labour market and energy price research.', 'Conducted statistical analysis and produced research outputs and summaries for academic and policy audiences.']],
  ['Economic Policy and Data Analyst', 'Institute of Statistical & Social Economic Research (ISSER) — Economic Policy Department', 'May 2021 – May 2022', ['Conducted in-depth analysis of economic trends with a focus on agriculture, rural transformation, and economic sustainability.', 'Utilized quantitative and qualitative methods to model policy scenarios and assess the impact of policy interventions.', 'Prepared policy briefs, reports, and presentations for policymakers, donors, and the public.']],
  ['Junior Economic and Data Policy Analyst', 'Institute of Statistical & Social Economic Research (ISSER) — Economic Policy Department', 'Apr 2020 – Apr 2021', ['Assisted senior analysts in economic policy research on agriculture, rural transformation, and economic sustainability.', 'Cleaned, organized, and analyzed quantitative datasets; assisted with econometric analysis and regression modelling.', 'Contributed to evidence-based policy recommendations through structured data analysis and literature review.']],
  ['Data Analyst', 'Ghana Cocoa Marketing Company — Government of Ghana', 'May 2018 – Aug 2019', ['Gathered, cleaned, validated, and analyzed operational and market data on cocoa production, sales, and distribution.', 'Conducted exploratory data analysis to identify trends, patterns, and anomalies in commodity datasets.', 'Analyzed supply and demand patterns to support market trend monitoring and reporting.']]
];

const education = [
  ["Master's in Applied Economics", 'University of Saskatchewan, Canada', 'August 2024', ['Relevant Courses: Econometrics, International Trade, Development Economics, Advanced Quantitative Methods, Microeconomic & Macroeconomic Theory, Time Series Analysis.', 'Thesis: Economic Determinants of Food Security in the Northwest Territories, Canada']],
  ['Certificate in Circular Economy & Implementation Science', 'University of Guelph, Canada', 'May 2022', []],
  ['B.A. Economics, Statistics and Mathematics', 'University of Ghana, Ghana', 'June 2020', ['Relevant Courses: Data Analysis, Actuarial Statistics, Statistical Inference, Probability Distributions, Non-Parametric Statistics, Cost Benefit Analysis, Analysis of Experiments, Micro and Macroeconomics.']]
];

function Timeline({ items }) {
  return (
    <div className="timeline">
      {items.map(([title, org, date, bullets], index) => (
        <div className={`timeline-item reveal delay-${((index % 3) + 1) * 100}`} key={`${title}-${date}`}>
          <div className="timeline-dot"></div>
          <div className="timeline-card">
            <div className="timeline-header"><div><div className="timeline-title">{title}</div><div className="timeline-org">{org}</div></div><span className="timeline-date">{date}</span></div>
            {bullets.length > 0 && <ul>{bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
          </div>
        </div>
      ))}
    </div>
  );
}

function ResumePage() {
  const resumeSkills = ['Python', 'R', 'SQL', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Power BI', 'Excel / VBA', 'Visio', 'ETL / ELT Pipelines', 'PostgreSQL', 'BigQuery', 'QGIS', 'Spatial Analysis', 'Time Series', 'Forecasting', 'Survival Analysis', 'Econometrics', 'Bootstrap & Monte Carlo', 'Git / GitHub', 'Jupyter', 'VS Code', 'pyenv / venv / conda', 'SPSS'];
  const research = ['Canada–US Exchange Rate & Commodity Prices', 'Gravity Models of Trade — EU Panel Data', 'Bootstrap & Monte Carlo Simulation-Based Inference', "Master's Thesis: Food Security in the Northwest Territories"];
  return (
    <div className="resume-page">
      <div className="container">
        <div className="resume-header-bar reveal">
          <div><span className="section-tag">Curriculum Vitae</span><h1 className="section-title resume-title">Oscar Bismark <span>Tetteh</span></h1><p className="resume-meta">Data Scientist &amp; Quantitative Economist &nbsp;·&nbsp; Hartford, CT &nbsp;·&nbsp; +1 (959) 256 6411</p></div>
          <a href={resumePdf} className="btn btn-primary" download="Oscar_Tetteh_Resume.pdf">⬇ Download PDF</a>
        </div>
        <div className="resume-block reveal"><div className="resume-section-title">Professional Summary</div><p className="resume-summary">Data scientist, statistician, and quantitative economist with over six years of experience across academia, the private sector, and the public sector. Specializes in forecasting, statistical analysis, data modelling, and applied research, with strong experience using Python, R, SQL, and data pipelines to turn complex data into clear, decision-ready insights. Work is grounded in analytical rigour, attention to detail, and a practical approach to solving problems through evidence-based analysis.</p></div>
        <div className="resume-block reveal"><div className="resume-section-title">Work Experience</div><Timeline items={experience} /></div>
        <div className="resume-block reveal"><div className="resume-section-title">Education</div><Timeline items={education} /></div>
        <div className="resume-block reveal"><div className="resume-section-title">Research Projects</div><div className="resume-research-grid">{research.map((item) => <div className="timeline-card" key={item}><div className="timeline-title research-title">{item}</div><p className="research-desc">Quantitative analysis using econometric methods, simulation, policy research, and applied statistical modelling.</p></div>)}</div></div>
        <div className="resume-block reveal"><div className="resume-section-title">Technical Skills</div><div className="resume-skills-wrap">{resumeSkills.map((skill) => <span className="tag" key={skill}>{skill}</span>)}</div></div>
      </div>
    </div>
  );
}

function App() {
  const [page, setPage] = useState(routeFromLocation);
  const pageTitle = useMemo(() => ({
    home: 'Oscar Bismark Tetteh | Data Scientist & Quantitative Economist',
    projects: 'Projects | Oscar Bismark Tetteh',
    resume: 'Resume | Oscar Bismark Tetteh'
  }[page]), [page]);

  useEffect(() => {
    const onPop = () => setPage(routeFromLocation());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    document.title = pageTitle;
    setTimeout(() => {
      if (window.location.hash && page === 'home') document.querySelector(window.location.hash)?.scrollIntoView();
    }, 0);
  }, [page, pageTitle]);

  useHomepageEffects(page);
  useHeroCanvas(page);
  useGlobeCanvas(page);
  useTypewriter(page);

  return (
    <>
      <Aurora count={page === 'home' ? 4 : 3} />
      <Nav page={page} />
      {page === 'projects' ? <ProjectsPage /> : page === 'resume' ? <ResumePage /> : <HomePage />}
      <Footer />
    </>
  );
}

export default App;
