/* ========================================
    POWERHOUSE DEMO GYM - JavaScript Interactions
======================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');

    // Navbar Scroll Effect
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on load

    // Mobile Menu Toggle
    mobileToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.classList.toggle('active');

        // Animate hamburger to X
        const spans = this.querySelectorAll('span');
        if (this.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileToggle.classList.remove('active');
            const spans = mobileToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // Smooth Scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Intersection Observer for Animations
    const animateOnScroll = function() {
        const elements = document.querySelectorAll(
            '.service-card, .testimonial-card, .why-item, .women-feature, .stat, .highlight'
        );

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    };

    animateOnScroll();

    // Section Headers Animation
    const sectionHeaders = document.querySelectorAll('.section-header, .about-content, .women-content, .contact-info');

    const headerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.2
    });

    sectionHeaders.forEach(header => {
        header.style.opacity = '0';
        header.style.transform = 'translateY(30px)';
        header.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        headerObserver.observe(header);
    });

    // Stagger animation for grid items
    const staggerGrids = document.querySelectorAll('.services-grid, .testimonials-grid, .women-features, .why-us-list');

    staggerGrids.forEach(grid => {
        const items = grid.children;
        Array.from(items).forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.1}s`;
        });
    });

    // Counter Animation for Stats
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);

        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + '+';
            }
        }

        updateCounter();
    }

    // Trigger counter animation when stats are visible
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.textContent);
                if (!isNaN(target)) {
                    animateCounter(entry.target, target);
                }
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Add loading state removal
    document.body.classList.add('loaded');

    // Parallax effect for hero background (subtle)
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg && window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
        });
    }

    // Active nav link highlighting
    const sections = document.querySelectorAll('section[id]');

    function highlightNavLink() {
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector(`.nav-links a[href="#${sectionId}"]`)?.classList.add('active');
            } else {
                document.querySelector(`.nav-links a[href="#${sectionId}"]`)?.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);

    console.log('POWERHOUSE DEMO GYM website loaded successfully!');
});
