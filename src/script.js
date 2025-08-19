// ---------- Mobile Navigation ----------
(() => {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    }));
  }
})();

// ---------- Navbar background on scroll ----------
(() => {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  });
})();

// ---------- Smooth scrolling for navigation link ----------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ---------- Intersection Observer for animations ----------
(() => {
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('animate'); });
  }, observerOptions);

  const elementsToObserve = document.querySelectorAll('.stat-card, .feature-card, .space-card, .contact-item');
  elementsToObserve.forEach(el => observer.observe(el));

  // Add CSS animation classes
  const style = document.createElement('style');
  style.textContent = `
    .stat-card, .feature-card, .space-card, .contact-item {
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.6s ease;
    }
    .stat-card.animate, .feature-card.animate, .space-card.animate, .contact-item.animate {
      opacity: 1;
      transform: translateY(0);
    }
    .hamburger.active span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
    .hamburger.active span:nth-child(2) { opacity: 0; }
    .hamburger.active span:nth-child(3) { transform: rotate(-45deg) translate(7px, -6px); }
  `;
  document.head.appendChild(style);
})();

// ---------- CTA Button interaction ----------
(() => {
  const ctaButton = document.querySelector('.cta-button');
  const about = document.querySelector('#about');
  if (ctaButton && about) {
    ctaButton.addEventListener('click', () => {
      about.scrollIntoView({ behavior: 'smooth' });
    });
  }
})();

// ---------- Stats counter animation ----------
(() => {
  const statsNumbers = document.querySelectorAll('.stat-number');
  if (!statsNumbers.length) return;
  let counted = false;

  const countStats = () => {
    if (counted) return;
    statsNumbers.forEach(stat => {
      const raw = stat.textContent.trim();
      const plus = raw.includes('+');
      const target = parseInt(raw.replace(/\D/g, ''), 10) || 0;
      let current = 0;
      const steps = 100;
      const increment = target / steps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        stat.textContent = Math.floor(current) + (plus ? '+' : '');
      }, 20);
    });
    counted = true;
  };

  const statsSection = document.querySelector('.stats-section');
  if (!statsSection) return;

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) countStats(); });
  }, { threshold: 0.5 });

  statsObserver.observe(statsSection);
})();

// ---------- Parallax effect for hero section ----------
(() => {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset || document.documentElement.scrollTop;
    // Light transform to avoid layout shift
    hero.style.transform = `translateY(${scrolled * 0.2}px)`; // 0.2 is gentler than 0.5
  });
})();

// ---------- Page loaded class ----------
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// ---------- Smooth reveal animations ----------
(() => {
  const revealElements = document.querySelectorAll('.intro-text, .about-text p, .space-content');
  if (!revealElements.length) return;

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    revealObserver.observe(el);
  });
})();

// ---------- Click ripple effect (fixed size & positioning) ----------
(() => {
  // Add ripple effect CSS once
  const rippleStyle = document.createElement('style');
  rippleStyle.textContent = `
    .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.6);
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
      width: 20px;
      height: 20px;
      margin-left: -10px; /* center 20px circle */
      margin-top: -10px;
    }
    @keyframes ripple {
      to { transform: scale(12); opacity: 0; }
    }
    button, .cta-button { position: relative; overflow: hidden; }
  `;
  document.head.appendChild(rippleStyle);

  document.querySelectorAll('button, .cta-button').forEach(button => {
    button.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 650);
    });
  });
})();

// ---------- Simple slider (guards added) ----------
document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("sliderTrack");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");

  if (!track) return;

  const images = track.querySelectorAll("img");
  const total = images.length || 1;
  let index = 0;

  function updateSlider() {
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  if (nextBtn) nextBtn.addEventListener("click", () => {
    index = (index + 1) % total;
    updateSlider();
  });

  if (prevBtn) prevBtn.addEventListener("click", () => {
    index = (index - 1 + total) % total;
    updateSlider();
  });

  // Auto-slide every 5s
  setInterval(() => {
    index = (index + 1) % total;
    updateSlider();
  }, 5000);
});

// ---------- Typing effect for the H1 (.hero-title) ----------
document.addEventListener("DOMContentLoaded", () => {
  const el = document.querySelector(".hero-title");
  if (!el) return;

  const fullText = (el.getAttribute("data-text") || el.textContent || "").trim();
  if (!fullText) return;

  el.textContent = ""; // clear current text
  let i = 0;
  const speed = 80; // ms per character

  (function type() {
    if (i < fullText.length) {
      el.textContent += fullText.charAt(i++);
      setTimeout(type, speed);
    }
  })();
});


