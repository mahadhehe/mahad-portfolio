// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 2000);
});

// Scroll Progress
window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById('progress-bar').style.width = scrolled + '%';
});

// Particles.js Config
particlesJS('particles-js', {
    particles: {
        number: { value: 100, density: { enable: true, value_area: 800 } },
        color: { value: '#00d4ff' },
        shape: { type: 'circle' },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: '#00d4ff', opacity: 0.4, width: 1 },
        move: { enable: true, speed: 3, direction: 'none', random: true }
    },
    interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' } },
        modes: { grab: { distance: 200 }, push: { particles_nb: 4 } }
    }
});

// Custom Cursor
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
});

// Navbar Animation
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('visible', window.scrollY > 50);
});

// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Smooth Scrolling
document.querySelectorAll('a[href*="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.location.href = targetId; // Fallback for cross-page links
        }
        if (navLinks.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});

// Live Clock
function updateClock() {
    const now = new Date();
    document.getElementById('live-clock').textContent = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);

// Typing Effect (Home)
if (document.getElementById('typing-text')) {
    const typingText = document.getElementById('typing-text');
    const phrases = ['Web Developer', 'Creative Coder', 'Tech Enthusiast'];
    let i = 0, j = 0, isDeleting = false;

    function type() {
        const current = phrases[i];
        typingText.textContent = current.substring(0, j);
        if (!isDeleting && j < current.length) {
            j++;
        } else if (isDeleting && j > 0) {
            j--;
        } else if (!isDeleting && j === current.length) {
            isDeleting = true;
            setTimeout(type, 1000);
            return;
        } else if (isDeleting && j === 0) {
            isDeleting = false;
            i = (i + 1) % phrases.length;
        }
        setTimeout(type, isDeleting ? 50 : 100);
    }
    type();
}

// Project Filter (Home)
if (document.querySelector('.filter-btn')) {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.dataset.filter;
            projectCards.forEach(card => {
                card.classList.add('hidden');
                if (filter === 'all' || card.dataset.category === filter) {
                    card.classList.remove('hidden');
                }
            });
        });
    });
}

// FAQ Accordion (Services)
if (document.querySelector('.faq-question')) {
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', () => {
            const answer = button.nextElementSibling;
            answer.classList.toggle('active');
        });
    });
}

// Back to Top
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Contact Form (Contact)
if (document.getElementById('contact-form')) {
    const form = document.getElementById('contact-form');
    const successMessage = document.querySelector('.success-message');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (name && emailRegex.test(email) && subject && message) {
            // Hide form and show success message
            form.classList.add('hidden');
            successMessage.classList.remove('hidden');
            successMessage.classList.add('active');
            // Reset form after animation
            setTimeout(() => {
                form.reset();
                form.classList.remove('hidden');
                successMessage.classList.remove('active');
                successMessage.classList.add('hidden');
            }, 3000);
        } else {
            // Trigger shake animation
            form.classList.add('invalid');
            setTimeout(() => {
                form.classList.remove('invalid');
            }, 300);
        }
    });
}