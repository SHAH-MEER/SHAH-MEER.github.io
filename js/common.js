// Intersection Observer for section animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100); // Staggered delay
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Mobile menu handling
const mobileBtn = document.querySelector('.mobile-menu-btn');
const quickNav = document.querySelector('.quick-nav');
const mainNavUl = document.querySelector('.navbar ul');

if (mobileBtn && mainNavUl) {
    mobileBtn.addEventListener('click', () => {
        mainNavUl.classList.toggle('active');
    });
}

// Scroll progress handling
window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = (window.scrollY / windowHeight) * 100;
    const progressBar = document.querySelector('.scroll-progress-bar');
    if (progressBar) {
        progressBar.style.width = scrollProgress + '%';
    }
});

// Highlight active navigation link
document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.navbar a');

    navLinks.forEach(link => {
        const linkPath = link.href.split('/').pop();
        if (currentPath === linkPath || (currentPath === '' && linkPath === 'index.html')) {
            link.classList.add('active');
        }
    });
}); 