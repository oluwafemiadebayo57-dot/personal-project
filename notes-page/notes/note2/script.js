(function() {
  'use strict';

  // ---------- DARK / LIGHT MODE TOGGLE ----------
  const modeToggle = document.getElementById('modeToggle');
  const body = document.body;

  // Check for saved preference
  const savedMode = localStorage.getItem('mode');
  if (savedMode === 'light') {
    body.classList.add('light-mode');
    modeToggle.innerHTML = '<i class="fa-regular fa-sun"></i>';
  }

  modeToggle.addEventListener('click', function() {
    body.classList.toggle('light-mode');
    
    if (body.classList.contains('light-mode')) {
      modeToggle.innerHTML = '<i class="fa-regular fa-sun"></i>';
      localStorage.setItem('mode', 'light');
    } else {
      modeToggle.innerHTML = '<i class="fa-regular fa-moon"></i>';
      localStorage.setItem('mode', 'dark');
    }
  });

  console.log('Blog page ready.');
})();