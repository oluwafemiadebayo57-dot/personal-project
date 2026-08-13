// script.js - Animations for Allwell portfolio

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // ============================================================
    // 1. INTERSECTION OBSERVER – Fade & Slide Up
    // ============================================================
    const animateElements = document.querySelectorAll(
        '.pillar, .callout, .story, .footer'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
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
    const hero = document.querySelector('.hero-header');
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
    window.addEventListener('scroll', () => {
        const current = window.scrollY;
        if (current > 80) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // ============================================================
    // 4. THEME TOGGLE (moon/sun icon) – localStorage support
    // ============================================================
    const modeToggle = document.querySelector('.mode');
    if (modeToggle) {
        modeToggle.addEventListener('click', () => {
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
    // 5. BUTTON RIPPLE EFFECT
    // ============================================================
    const btns = document.querySelectorAll('.cta-link');
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
    // 6. SMOOTH SCROLL FOR ANCHOR LINKS
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
    // 7. DYNAMIC YEAR IN FOOTER (if any)
    // ============================================================
    const yearSpan = document.querySelector('.year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    console.log('✨ Allwell portfolio animations initialized');
});

// ============================================================
// ADDITIONAL CSS CLASSES (injected via JS for animations)
// ============================================================
const style = document.createElement('style');
style.textContent = `
    /* Fade & slide up */
    .pillar, .callout, .story, .footer {
        opacity: 0;
        transform: translateY(40px);
        transition: opacity 0.7s cubic-bezier(0.23, 1, 0.32, 1),
                    transform 0.7s cubic-bezier(0.23, 1, 0.32, 1);
    }
    .pillar.visible,
    .callout.visible,
    .story.visible,
    .footer.visible {
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

    body.light-mode .nav-bar.scrolled .nav-links {
        background: rgba(255, 255, 255, 0.92);
        backdrop-filter: blur(12px);
        box-shadow: 0 8px 32px rgba(0,0,0,0.08);
    }

    /* Ripple effect */
    .cta-link {
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
    body.light-mode .ripple {
        background: rgba(0,0,0,0.15);
    }
    @keyframes rippleAnim {
        to { transform: scale(4); opacity: 0; }
    }

    /* Hero parallax container */
    .hero-header {
        transition: transform 0.15s ease-out;
        will-change: transform;
    }

    /* Responsive touch-ups */
    @media (max-width: 768px) {
        .hero-header {
            transform: none !important;
        }
        .pillar.visible {
            transform: translateY(0) !important;
        }
    }
`;
document.head.appendChild(style);