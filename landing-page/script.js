// script.js - Optimized animations for Benedict's portfolio

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // ============================================================
    // 1. INTERSECTION OBSERVER – Fade & Slide Up
    // ============================================================
    const animateElements = document.querySelectorAll(
        '.project-card, .tech-stack > div, .contact-section'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optionally unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -20px 0px'
    });

    animateElements.forEach((el) => observer.observe(el));

    // ============================================================
    // 2. SMOOTH PARALLAX ON HERO (mouse move)
    // ============================================================
    const hero = document.querySelector('.hero-section');
    if (hero) {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            hero.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
    }

    // ============================================================
    // 3. NAVBAR GLOW ON SCROLL
    // ============================================================
    const nav = document.querySelector('.nav-bar');
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const current = window.scrollY;
        if (current > 80) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        lastScroll = current;
    });

    // ============================================================
    // 4. CARD HOVER 3D TILT (with requestAnimationFrame)
    // ============================================================
    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform =
                `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`;
            card.style.transition = 'transform 0.1s ease-out';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform =
                'perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)';
            card.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
        });
    });

    // ============================================================
    // 5. TYPEWRITER EFFECT FOR HERO SUBTEXT (optional)
    // ============================================================
    const heroText = document.querySelector('.hero-text');
    if (heroText) {
        const original = heroText.textContent;
        heroText.textContent = '';
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < original.length) {
                heroText.textContent += original.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
            }
        }, 30);
    }

    // ============================================================
    // 6. BUTTON RIPPLE EFFECT
    // ============================================================
    const btns = document.querySelectorAll('.hero-btn');
    btns.forEach((btn) => {
        btn.addEventListener('click', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // ============================================================
    // 7. LAZY LOADING IMAGES (with blur-up)
    // ============================================================
    const images = document.querySelectorAll('.card-img img');
    images.forEach((img) => {
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
        if (img.complete) {
            img.classList.add('loaded');
        }
    });

    // ============================================================
    // 8. THEME TOGGLE (moon icon) – localStorage support
    // ============================================================
    const modeToggle = document.querySelector('.mode');
    if (modeToggle) {
        modeToggle.addEventListener('click', () => {
            // Toggle between dark-mode and light-mode
            const isDark = document.body.classList.contains('dark-mode');
            if (isDark) {
                document.body.classList.remove('dark-mode');
                document.body.classList.add('light-mode');
                localStorage.setItem('theme', 'light');
            } else {
                document.body.classList.remove('light-mode');
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            }
            
            // update icon
            const icon = modeToggle.querySelector('i');
            if (icon) {
                const isNowDark = document.body.classList.contains('dark-mode');
                icon.className = isNowDark ? 'fa-regular fa-sun' : 'fa-regular fa-moon';
            }
        });

        // load saved theme
        const saved = localStorage.getItem('theme');
        if (saved === 'light') {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            const icon = modeToggle.querySelector('i');
            if (icon) icon.className = 'fa-regular fa-moon';
        } else if (saved === 'dark') {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
            const icon = modeToggle.querySelector('i');
            if (icon) icon.className = 'fa-regular fa-sun';
        } else {
            // Default: dark mode
            document.body.classList.add('dark-mode');
            const icon = modeToggle.querySelector('i');
            if (icon) icon.className = 'fa-regular fa-sun';
        }
    }

    // ============================================================
    // 9. SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================================
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ============================================================
    // 10. DYNAMIC YEAR IN FOOTER (if any)
    // ============================================================
    const yearSpan = document.querySelector('.year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // ============================================================
    // 11. COUNTER ANIMATION FOR STATS (if you add numbers later)
    // ============================================================
    // example: document.querySelectorAll('.stat-number')...

    console.log('✨ Benedict portfolio animations initialized');
});

// ============================================================
// ADDITIONAL CSS CLASSES (injected via JS for animations)
// ============================================================
const style = document.createElement('style');
style.textContent = `
    /* Fade & slide up */
    .project-card, .tech-stack > div, .contact-section {
        opacity: 0;
        transform: translateY(40px);
        transition: opacity 0.7s cubic-bezier(0.23, 1, 0.32, 1),
                    transform 0.7s cubic-bezier(0.23, 1, 0.32, 1);
    }
    .project-card.visible,
    .tech-stack > div.visible,
    .contact-section.visible {
        opacity: 1;
        transform: translateY(0);
    }

    /* Navbar scrolled effect */
    .nav-bar.scrolled .nav-links {
        background: rgba(26, 26, 26, 0.85);
        backdrop-filter: blur(12px);
        box-shadow: 0 8px 32px rgba(0,0,0,0.4);
        transition: background 0.3s, box-shadow 0.3s;
    }

    /* Ripple effect */
    .hero-btn {
        position: relative;
        overflow: hidden;
    }
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255,255,255,0.4);
        width: 100px;
        height: 100px;
        margin-left: -50px;
        margin-top: -50px;
        transform: scale(0);
        animation: rippleAnim 0.6s ease-out forwards;
        pointer-events: none;
    }
    @keyframes rippleAnim {
        to { transform: scale(4); opacity: 0; }
    }

    /* Image load blur-up */
    .card-img img {
        filter: blur(8px);
        transition: filter 0.6s ease, transform 0.4s ease;
    }
    .card-img img.loaded {
        filter: blur(0);
        transform: scale(1.01);
    }

    /* ============================================================
       DARK MODE (default)
       ============================================================ */
    body.dark-mode {
        background: #0a0a0a;
        color: #f0f0f0;
    }
    body.dark-mode .project-card,
    body.dark-mode .tech-stack,
    body.dark-mode .nav-links {
        background: #141414;
    }
    body.dark-mode .card-desc {
        background: #141414;
    }
    body.dark-mode .card-desc p {
        color: #b0b8c5;
    }
    body.dark-mode .hero-text {
        color: #c0c8d5;
    }
    body.dark-mode .hero-main {
        background: linear-gradient(135deg, #ffffff 0%, #b0c7ff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
    body.dark-mode .hero-btn {
        background: #ffffff;
        color: #0b0b0b;
    }
    body.dark-mode .hero-btn:hover {
        background: #f0f4ff;
    }
    body.dark-mode .tech-stack h3 {
        color: #b0bbd0;
    }
    body.dark-mode .tool-grid span {
        background: #25272e;
        color: #d5def0;
    }
    body.dark-mode .contact-section {
        border-top-color: #25272e;
    }
    body.dark-mode .contact-inner p {
        color: #b0bbd0;
    }
    body.dark-mode .bg-black {
        background: #000000;
    }
    body.dark-mode .bg-overlay {
        background: radial-gradient(circle at 30% 40%, rgba(40,40,50,0.3) 0%, transparent 70%);
    }
    body.dark-mode .card-desc h3 {
        color: #fff;
    }
    body.dark-mode .nav-links a {
        color: #eaeef5;
    }
    body.dark-mode .nav-links a:hover {
        color: #000;
        background: #ffffff;
    }
    body.dark-mode .mode {
        background: #2a2a2a;
        color: #ccc;
    }
    body.dark-mode .mode:hover {
        background: #3a3a3a;
        color: #fff;
    }
    body.dark-mode ::-webkit-scrollbar-track {
        background: #0b0b0b;
    }
    body.dark-mode ::-webkit-scrollbar-thumb {
        background: #2a2a2a;
    }

    /* ============================================================
       LIGHT MODE (white background)
       ============================================================ */
    body.light-mode {
        background: #ffffff;
        color: #111318;
    }
    body.light-mode .bg-black {
        background: #f5f7fc;
    }
    body.light-mode .bg-overlay {
        background: radial-gradient(circle at 30% 40%, rgba(200,215,255,0.15) 0%, transparent 70%);
    }
    body.light-mode .nav-links {
        background: #ffffff;
        border-color: rgba(0,0,0,0.08);
        box-shadow: 0 8px 24px rgba(0,0,0,0.06);
    }
    body.light-mode .nav-links a {
        color: #1a1f2a;
    }
    body.light-mode .nav-links a:hover {
        background: #1a1f2a;
        color: #ffffff;
        padding: 4px 14px;
    }
    body.light-mode .mode {
        background: #eef2f7;
        color: #1a1f2a;
    }
    body.light-mode .mode:hover {
        background: #dce3ef;
        color: #000;
    }
    body.light-mode .hero-main {
        background: linear-gradient(135deg, #1a1f2a 0%, #4a5a7a 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
    body.light-mode .hero-text {
        color: #2d3440;
    }
    body.light-mode .hero-btn {
        background: #1a1f2a;
        color: #ffffff;
        box-shadow: 0 6px 20px rgba(0,0,0,0.08);
    }
    body.light-mode .hero-btn:hover {
        background: #2a3140;
        box-shadow: 0 12px 32px rgba(0,0,0,0.12);
        transform: scale(1.04);
    }
    body.light-mode .project-card,
    body.light-mode .tech-stack {
        background: #f5f7fc;
        border-color: rgba(0,0,0,0.06);
        box-shadow: 0 10px 30px -10px rgba(0,0,0,0.08);
    }
    body.light-mode .card-desc {
        background: #f5f7fc;
    }
    body.light-mode .card-desc h3 {
        color: #111318;
    }
    body.light-mode .card-desc p {
        color: #2d3440;
    }
    body.light-mode .card-link {
        color: #4a7ab8;
    }
    body.light-mode .card-link:hover {
        color: #2a5a98;
    }
    body.light-mode .tech-stack h3 {
        color: #2d3440;
    }
    body.light-mode .tool-grid span {
        background: #e8ecf5;
        color: #1a1f2a;
        border-color: rgba(0,0,0,0.04);
    }
    body.light-mode .tool-grid span:hover {
        background: #dce3ef;
        border-color: rgba(0,0,0,0.08);
    }
    body.light-mode .tool-grid i {
        color: #4a7ab8;
    }
    body.light-mode .contact-section {
        border-top-color: #e8ecf5;
    }
    body.light-mode .contact-inner p {
        color: #2d3440;
    }
    body.light-mode .contact-inner .contact-text {
        color: #4a5268;
    }
    body.light-mode .nav-bar.scrolled .nav-links {
        background: rgba(255, 255, 255, 0.92);
        backdrop-filter: blur(12px);
        box-shadow: 0 8px 32px rgba(0,0,0,0.08);
    }
    body.light-mode ::-webkit-scrollbar-track {
        background: #f5f7fc;
    }
    body.light-mode ::-webkit-scrollbar-thumb {
        background: #d0d6e5;
    }
    body.light-mode ::-webkit-scrollbar-thumb:hover {
        background: #b8c0d5;
    }

    /* Hero parallax container */
    .hero-section {
        transition: transform 0.15s ease-out;
        will-change: transform;
    }

    /* Card 3D tilt base */
    .project-card {
        transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        will-change: transform;
        transform-style: preserve-3d;
        backface-visibility: hidden;
    }

    /* Responsive touch-ups */
    @media (max-width: 768px) {
        .project-card {
            transform: none !important;
        }
        .hero-section {
            transform: none !important;
        }
        .project-card.visible {
            transform: translateY(0) !important;
        }
        body.light-mode .nav-links {
            padding: 8px 16px;
        }
    }
`;
document.head.appendChild(style);