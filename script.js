const nav = document.getElementById('mainNav');

// Navbar scroll state on init & scroll
function updateNav() {
    nav.classList.toggle('scrolled', window.scrollY > 40);
}
updateNav();
window.addEventListener('scroll', updateNav, { passive: true });

// Active nav link tracking
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('a.nav-link[href^="#"]');

if (sections.length > 0) {
    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
                });
            }
        });
    }, { threshold: 0.35 });

    sections.forEach(s => sectionObserver.observe(s));
}

// Fade-in on scroll
const fadeEls = document.querySelectorAll('.fade-in');
const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.08 });

fadeEls.forEach(el => fadeObserver.observe(el));

// Language bar fill animation
const langBars = document.querySelectorAll('.lang-bar-fill');
const langObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.width = entry.target.dataset.width;
            langObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

langBars.forEach(bar => langObserver.observe(bar));

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const offset = 72;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });

            // Close mobile menu if open
            const navCollapse = document.getElementById('navMenu');
            if (navCollapse && navCollapse.classList.contains('show')) {
                bootstrap.Collapse.getInstance(navCollapse)?.hide();
            }
        }
    });
});
