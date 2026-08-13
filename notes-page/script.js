// ============================================================
// NOTES PAGE - FILTER & ANIMATIONS (Optimized)
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // ============================================================
    // 1. FILTER SYSTEM - Developer, FUTO Life, Thoughts
    // ============================================================
    const tabs = document.querySelectorAll('.tab');
    const noteItems = document.querySelectorAll('.note-item');
    
    // Filter function
    function filterNotes(category) {
        let visibleIndex = 0;
        
        noteItems.forEach((item) => {
            const itemCategory = item.dataset.category || '';
            
            // Show ALL notes only when 'all' is selected
            if (category === 'all') {
                item.classList.remove('hidden');
                // Reset and animate
                item.classList.remove('visible');
                void item.offsetWidth;
                setTimeout(() => {
                    item.classList.add('visible');
                }, 50 + (visibleIndex * 80));
                visibleIndex++;
            } 
            // Show only matching category
            else if (itemCategory === category) {
                item.classList.remove('hidden');
                item.classList.remove('visible');
                void item.offsetWidth;
                setTimeout(() => {
                    item.classList.add('visible');
                }, 50 + (visibleIndex * 80));
                visibleIndex++;
            } 
            // Hide non-matching
            else {
                item.classList.add('hidden');
                item.classList.remove('visible');
            }
        });
    }

    // Tab click handlers
    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Get filter value
            const filter = this.dataset.filter || 'all';
            filterNotes(filter);
        });
    });

    // ============================================================
    // 2. INTERSECTION OBSERVER - Initial load animation
    // ============================================================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const delay = index * 80;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -20px 0px'
    });

    // Observe all note items initially
    noteItems.forEach((item) => {
        observer.observe(item);
    });

    // ============================================================
    // 3. NAVBAR GLOW ON SCROLL
    // ============================================================
    const nav = document.querySelector('.nav-bar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }, { passive: true });

    // ============================================================
    // 4. THEME TOGGLE (moon/sun)
    // ============================================================
    const modeToggle = document.querySelector('.mode');
    if (modeToggle) {
        const icon = modeToggle.querySelector('i');
        
        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            if (icon) icon.className = 'fa-regular fa-moon';
        } else {
            document.body.classList.add('dark-mode');
            if (icon) icon.className = 'fa-regular fa-sun';
        }

        // Toggle theme
        modeToggle.addEventListener('click', () => {
            const isDark = document.body.classList.contains('dark-mode');
            
            if (isDark) {
                document.body.classList.remove('dark-mode');
                document.body.classList.add('light-mode');
                if (icon) icon.className = 'fa-regular fa-moon';
                localStorage.setItem('theme', 'light');
            } else {
                document.body.classList.remove('light-mode');
                document.body.classList.add('dark-mode');
                if (icon) icon.className = 'fa-regular fa-sun';
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // ============================================================
    // 5. FOOTER ANIMATION
    // ============================================================
    const footer = document.querySelector('.footer');
    if (footer) {
        const footerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        
        footerObserver.observe(footer);
    }

    // ============================================================
    // 6. DYNAMIC YEAR IN FOOTER
    // ============================================================
    const footerText = document.querySelector('.footer-text');
    if (footerText) {
        const year = new Date().getFullYear();
        footerText.textContent = `© ${year} Benedict · Built with love and late-night commits`;
    }

    // ============================================================
    // 7. SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    console.log('✨ Notes page initialized with filters & animations');
});

// ============================================================
// INJECTED STYLES FOR ANIMATIONS
// ============================================================
const style = document.createElement('style');
style.textContent = `
    /* Base hidden state */
    .note-item {
        opacity: 0;
        transform: translateY(30px) scale(0.97);
        transition: opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1),
                    transform 0.6s cubic-bezier(0.23, 1, 0.32, 1),
                    padding-left 0.3s ease,
                    border-color 0.3s ease;
        will-change: transform, opacity;
    }
    
    /* Visible state */
    .note-item.visible {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
    
    /* Hidden state for filter */
    .note-item.hidden {
        display: none;
    }
    
    /* Navbar scrolled */
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
    
    /* Footer animation */
    .footer {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.7s ease, transform 0.7s ease;
    }
    
    .footer.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Note item hover effect */
    .note-item:hover {
        border-left-color: #8870e6;
        padding-left: 1.2rem;
    }
    
    body.light-mode .note-item:hover {
        border-left-color: #6f52d9;
    }
`;
document.head.appendChild(style);