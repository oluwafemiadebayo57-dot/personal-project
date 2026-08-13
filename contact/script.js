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

  // ---------- CONTACT FORM WITH WEB3FORMS ----------
  const form = document.getElementById('contactForm');

  if (!form) return;

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form data
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const subjectField = document.getElementById('subjectField').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validation
    if (!firstName || !lastName || !email || !subjectField || !message) {
      alert('Please fill in all fields before sending.');
      return;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Prepare data for Web3Forms
    const formData = new FormData();
    formData.append('access_key', '34e7250a-911c-401b-af9e-caf27137ac01');
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('subject', subjectField);
    formData.append('message', message);
    formData.append('from_name', 'Benedict Portfolio Contact Form');

    try {
      // Show loading state
      const submitBtn = form.querySelector('.send-btn');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      
      const result = await response.json();
      
      if (result.success) {
        alert('✅ Message sent successfully! I\'ll get back to you soon.');
        form.reset();
      } else {
        alert('❌ Something went wrong. Please try again.');
        console.error('Web3Forms Error:', result);
      }

      // Reset button state
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;

    } catch (error) {
      alert('❌ Error sending message. Please check your internet connection and try again.');
      console.error('Fetch Error:', error);
      
      // Reset button state
      const submitBtn = form.querySelector('.send-btn');
      submitBtn.textContent = 'Send Message';
      submitBtn.disabled = false;
    }
  });

  console.log('Contact page ready with Web3Forms integration.');
})();