// ========================================
// SAFICUS - Modern Animations & Interactions
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all animations and interactions
  initScrollAnimations();
  initHeaderScroll();
  initCountUp();
  initProgressBars();
  initParallax();

  console.log('✨ Saficus animations initialized');
});

// ========================================
// Scroll-triggered Animations
// ========================================
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add staggered delay for multiple elements
        setTimeout(() => {
          entry.target.classList.add('animate-fadeInUp');
        }, index * 100);

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all cards and feature elements
  const elements = document.querySelectorAll('.feature-card, .course-card, .achievement, .stat-card');
  elements.forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
}

// ========================================
// Header Scroll Effect
// ========================================
function initHeaderScroll() {
  const header = document.querySelector('header');
  if (!header) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });
}

// ========================================
// Count-up Animation for Statistics
// ========================================
function initCountUp() {
  const statValues = document.querySelectorAll('.stat-value');
  if (statValues.length === 0) return;

  const observerOptions = {
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const finalValue = parseInt(target.textContent);

        animateValue(target, 0, finalValue, 1500);
        observer.unobserve(target);
      }
    });
  }, observerOptions);

  statValues.forEach(stat => {
    observer.observe(stat);
  });
}

function animateValue(element, start, end, duration) {
  const range = end - start;
  const increment = range / (duration / 16); // 60fps
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= end) {
      element.textContent = Math.round(end);
      clearInterval(timer);
    } else {
      element.textContent = Math.round(current);
    }
  }, 16);
}

// ========================================
// Animated Progress Bars
// ========================================
function initProgressBars() {
  const progressBars = document.querySelectorAll('.progress-value');
  if (progressBars.length === 0) return;

  const observerOptions = {
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBar = entry.target;
        const width = progressBar.style.width || '0%';

        // Reset and animate
        progressBar.style.width = '0%';
        setTimeout(() => {
          progressBar.style.width = width;
        }, 100);

        observer.unobserve(progressBar);
      }
    });
  }, observerOptions);

  progressBars.forEach(bar => {
    observer.observe(bar);
  });
}

// ========================================
// Parallax Effect for Hero Section
// ========================================
function initParallax() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = scrolled * 0.5;

    hero.style.transform = `translateY(${parallax}px)`;
  });
}

// ========================================
// Smooth Scroll for Anchor Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));

    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ========================================
// Card Tilt Effect (3D Hover)
// ========================================
function initCardTilt() {
  const cards = document.querySelectorAll('.card, .feature-card, .course-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  });
}

// Initialize card tilt effect after a short delay
setTimeout(initCardTilt, 1000);

// ========================================
// Mobile Menu Toggle Enhancement
// ========================================
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    mainNav.classList.toggle('active');
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    const isClickInside = menuToggle.contains(event.target) || mainNav.contains(event.target);

    if (!isClickInside && mainNav.classList.contains('active')) {
      menuToggle.classList.remove('active');
      mainNav.classList.remove('active');
    }
  });
}

// ========================================
// Loading Animation
// ========================================
window.addEventListener('load', () => {
  document.body.classList.add('loaded');

  // Trigger entrance animations
  setTimeout(() => {
    const hero = document.querySelector('.hero');
    if (hero) {
      hero.style.opacity = '1';
    }
  }, 100);
});

// ========================================
// Cursor Trail Effect (Optional - Desktop Only)
// ========================================
if (window.innerWidth > 768) {
  const coords = { x: 0, y: 0 };
  const circles = document.querySelectorAll('.cursor-circle');

  // Create cursor circles if they don't exist
  if (circles.length === 0) {
    for (let i = 0; i < 12; i++) {
      const circle = document.createElement('div');
      circle.className = 'cursor-circle';
      circle.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        pointer-events: none;
        z-index: 9999;
        opacity: ${1 - i * 0.08};
        transform: scale(${1 - i * 0.08});
        transition: all 0.1s ease;
      `;
      document.body.appendChild(circle);
    }
  }

  const allCircles = document.querySelectorAll('.cursor-circle');

  window.addEventListener('mousemove', (e) => {
    coords.x = e.clientX;
    coords.y = e.clientY;
  });

  function animateCircles() {
    let x = coords.x;
    let y = coords.y;

    allCircles.forEach((circle, index) => {
      circle.style.left = x - 5 + 'px';
      circle.style.top = y - 5 + 'px';

      const nextCircle = allCircles[index + 1] || allCircles[0];
      x += (nextCircle.offsetLeft - x) * 0.3;
      y += (nextCircle.offsetTop - y) * 0.3;
    });

    requestAnimationFrame(animateCircles);
  }

  animateCircles();
}

// ========================================
// Form Input Animations
// ========================================
const formInputs = document.querySelectorAll('input, textarea');
formInputs.forEach(input => {
  input.addEventListener('focus', function() {
    this.parentElement.classList.add('focused');
  });

  input.addEventListener('blur', function() {
    if (this.value === '') {
      this.parentElement.classList.remove('focused');
    }
  });
});

// ========================================
// Easter Egg: Konami Code
// ========================================
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.key);
  konamiCode.splice(-konamiSequence.length - 1, konamiCode.length - konamiSequence.length);

  if (konamiCode.join('').includes(konamiSequence.join(''))) {
    activateEasterEgg();
  }
});

function activateEasterEgg() {
  document.body.style.animation = 'rainbow 2s linear infinite';

  const style = document.createElement('style');
  style.textContent = `
    @keyframes rainbow {
      0% { filter: hue-rotate(0deg); }
      100% { filter: hue-rotate(360deg); }
    }
  `;
  document.head.appendChild(style);

  setTimeout(() => {
    document.body.style.animation = '';
  }, 5000);

  console.log('🎮 Konami Code activated! 🎉');
}

// ========================================
// Performance: Reduce animations on low-end devices
// ========================================
if (navigator.hardwareConcurrency < 4) {
  document.documentElement.classList.add('reduce-motion');
}
