// ── DARK MODE ──
const toggle = document.getElementById('themeToggle');
const html = document.documentElement;

function setTheme(t) {
  html.setAttribute('data-theme', t);
  try { 
    localStorage.setItem('theme', t); 
  } catch(e) {
    console.error("Could not save theme to local storage", e);
  }
}

// Load saved preference
try {
  const saved = localStorage.getItem('theme');
  if (saved) {
    setTheme(saved);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setTheme('dark');
  }
} catch(e) {
  console.error("Error loading theme", e);
}

toggle.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme');
  setTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

toggle.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    toggle.click();
  }
});

// ── SCROLL PROGRESS ──
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const total = document.body.scrollHeight - window.innerHeight;
  const progressBar = document.getElementById('progress-bar');
  if (progressBar) {
    progressBar.style.width = (scrolled / total * 100) + '%';
  }
}, { passive: true });

// ── SCROLL REVEAL ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('up');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── MOBILE NAV ──
function openMobileNav() {
  document.getElementById('mobileNav').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMobileNav() {
  document.getElementById('mobileNav').classList.remove('open');
  document.body.style.overflow = '';
}

// ── ACTIVE NAV LINK ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) {
      current = s.id;
    }
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current
      ? 'var(--text-1)' : '';
  });
}, { passive: true });

// ── FORM SUBMIT ──
function handleSubmit() {
  const name = document.getElementById('fname').value.trim();
  const email = document.getElementById('femail').value.trim();
  const biz = document.getElementById('fbiz').value.trim();
  const msg = document.getElementById('fmsg').value.trim();

  if (!name || !email || !msg) {
    alert('Please fill in your name, email, and message.');
    return;
  }

  const waMsg = encodeURIComponent(
    `Hi Huzaifa! I filled out your contact form.\n\nName: ${name}\nBusiness: ${biz || 'N/A'}\nEmail: ${email}\n\nMessage: ${msg}`
  );
  
  // Replace the placeholder with your real WhatsApp number
  window.open(`https://wa.me/60XXXXXXXXX?text=${waMsg}`, '_blank');
}