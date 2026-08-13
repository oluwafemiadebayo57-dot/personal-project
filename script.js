// script.js – subtle interactive touches for the Allwell portfolio

document.addEventListener('DOMContentLoaded', () => {
  // 1. Terminal cursor blink is already handled via CSS, 
  //    but we add a small interactive "command" effect.

  const commandSpan = document.querySelector('.command');
  const statusDot = document.querySelector('.status-dot');
  const statusItems = document.querySelectorAll('.status-item');

  // 2. Simulate a "system ready" sequence – just for delight.
  if (commandSpan) {
    const originalText = commandSpan.textContent;
    // small glitch: change command text after a moment, then revert
    setTimeout(() => {
      commandSpan.textContent = '--profile loaded';
      commandSpan.style.color = '#b1e6b0';
    }, 1200);

    setTimeout(() => {
      commandSpan.textContent = originalText;
      commandSpan.style.color = '#c8d6f0';
    }, 2800);
  }

  // 3. Interactive status dot pulse – already animated,
  //    but we add a subtle hover effect on status items.
  statusItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.color = '#c8daf5';
      item.style.transition = 'color 0.2s';
    });
    item.addEventListener('mouseleave', () => {
      item.style.color = '#778aa8';
    });
  });

  // 4. Console greeting (developer easter egg)
  console.log('%c Allwell Azubike · Full-Stack ', 'background: #1c2533; color: #b7cbff; font-size: 1.2rem; padding: 0.4rem 0.8rem; border-radius: 8px; font-weight: 600;');
  console.log('%c ⚡ system initialized · allwell.click ', 'color: #8aa3c9; font-size: 0.9rem;');

  // 5. Optional: add a small "ripple" on button clicks (just for demo)
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      // only if it's not a real link (for demo)
      if (this.getAttribute('href') === '#') {
        e.preventDefault();
        // subtle feedback
        this.style.transform = 'scale(0.96)';
        setTimeout(() => { this.style.transform = ''; }, 150);
        // show a tiny notification (optional)
        const originalText = this.textContent;
        if (this.classList.contains('primary')) {
          this.textContent = '✨ message sent';
          setTimeout(() => { this.textContent = originalText; }, 1000);
        } else {
          this.textContent = '📄 opening...';
          setTimeout(() => { this.textContent = originalText; }, 1000);
        }
      }
    });
  });
});