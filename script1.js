// ============================================
// MODERN PORTFOLIO JAVASCRIPT - SHREENATH UBALE
// ============================================

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollAnimations();
    initSkillBars();
    initSmoothScroll();
    initTypingEffect();
    initParallax();
    initCursorEffect();
    initScrollProgress();
});

// === NAVIGATION ===
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    
    // Sticky navbar on scroll
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Close mobile menu when clicking nav item
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (hamburger) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Active section highlighting
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavigation() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink?.classList.add('active');
            } else {
                navLink?.classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);
}

// === SCROLL ANIMATIONS ===
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll(`
        .about-content,
        .skill-category,
        .project-card,
        .timeline-item,
        .education-card,
        .achievement-item,
        .contact-container
    `);
    
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// === SKILL BARS ANIMATION ===
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-level');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.getPropertyValue('--skill-percent');
                
                // Reset and animate
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
                
                observer.unobserve(bar);
            }
        });
    }, observerOptions);
    
    skillBars.forEach(bar => observer.observe(bar));
}

// === SMOOTH SCROLL ===
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// === TYPING EFFECT ===
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-content h1');
    if (!heroTitle) return;
    
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.opacity = '1';
    
    let index = 0;
    const speed = 100;
    
    function typeWriter() {
        if (index < text.length) {
            heroTitle.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, speed);
        }
    }
    
    // Start typing after a short delay
    setTimeout(typeWriter, 500);
}

// === PARALLAX EFFECT ===
function initParallax() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        if (heroSection) {
            heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
}

// === CUSTOM CURSOR EFFECT ===
function initCursorEffect() {
    // Only on desktop
    if (window.innerWidth < 768) return;
    
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    const cursorFollower = document.createElement('div');
    cursorFollower.className = 'custom-cursor-follower';
    document.body.appendChild(cursorFollower);
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });
    
    function animateFollower() {
        const distX = mouseX - followerX;
        const distY = mouseY - followerY;
        
        followerX += distX * 0.1;
        followerY += distY * 0.1;
        
        cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px)`;
        
        requestAnimationFrame(animateFollower);
    }
    
    animateFollower();
    
    // Add styles for custom cursor
    const style = document.createElement('style');
    style.textContent = `
        .custom-cursor,
        .custom-cursor-follower {
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: difference;
        }
        
        .custom-cursor {
            width: 10px;
            height: 10px;
            background: white;
            border-radius: 50%;
            transform: translate(-50%, -50%);
        }
        
        .custom-cursor-follower {
            width: 40px;
            height: 40px;
            border: 2px solid white;
            border-radius: 50%;
            transform: translate(-50%, -50%);
            transition: width 0.3s, height 0.3s;
        }
        
        a:hover ~ .custom-cursor-follower,
        button:hover ~ .custom-cursor-follower {
            width: 60px;
            height: 60px;
        }
    `;
    document.head.appendChild(style);
}

// === SCROLL PROGRESS BAR ===
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
    
    // Add styles for progress bar
    const style = document.createElement('style');
    style.textContent = `
        .scroll-progress {
            position: fixed;
            top: 0;
            left: 0;
            height: 4px;
            background: linear-gradient(90deg, #6366f1, #0ea5e9);
            z-index: 10000;
            transition: width 0.1s ease;
        }
    `;
    document.head.appendChild(style);
}

// === FORM VALIDATION & SUBMISSION ===
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // The form will be handled by Formspree
        // After submission, show success message
        setTimeout(() => {
            submitBtn.textContent = 'Message Sent!';
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 3000);
        }, 1000);
    });
}

// === PROJECT CARD TILT EFFECT ===
function initTiltEffect() {
    const cards = document.querySelectorAll('.project-card, .education-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// Initialize tilt effect after DOM is loaded
setTimeout(initTiltEffect, 1000);

// === PARTICLE BACKGROUND ===
function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    document.body.appendChild(particleContainer);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particleContainer.appendChild(particle);
    }
    
    const style = document.createElement('style');
    style.textContent = `
        .particle-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
            overflow: hidden;
        }
        
        .particle {
            position: absolute;
            width: 3px;
            height: 3px;
            background: rgba(99, 102, 241, 0.5);
            border-radius: 50%;
            animation: float-particle linear infinite;
        }
        
        @keyframes float-particle {
            0% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(50px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

createParticles();

// === LAZY LOADING IMAGES ===
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

initLazyLoading();

// === TEXT REVEAL ANIMATION ===
function initTextReveal() {
    const textElements = document.querySelectorAll('.section-title, .hero-content p');
    
    textElements.forEach(el => {
        const text = el.textContent;
        el.innerHTML = '';
        
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.opacity = '0';
            span.style.display = 'inline-block';
            span.style.animation = `fadeInChar 0.5s ease forwards ${index * 0.02}s`;
            el.appendChild(span);
        });
    });
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInChar {
            to {
                opacity: 1;
                transform: translateY(0);
            }
            from {
                opacity: 0;
                transform: translateY(20px);
            }
        }
    `;
    document.head.appendChild(style);
}

// === NUMBER COUNTER ANIMATION ===
function initCounterAnimation() {
    const counters = document.querySelectorAll('[data-count]');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.count);
                let current = 0;
                const increment = target / 100;
                const duration = 2000;
                const stepTime = duration / 100;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counter.textContent = target;
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current);
                    }
                }, stepTime);
                
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

initCounterAnimation();

// === SCROLL TO TOP BUTTON ===
function initScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    const style = document.createElement('style');
    style.textContent = `
        .scroll-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #6366f1, #0ea5e9);
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 1.2rem;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 999;
            box-shadow: 0 4px 16px rgba(99, 102, 241, 0.4);
        }
        
        .scroll-to-top.visible {
            opacity: 1;
            visibility: visible;
        }
        
        .scroll-to-top:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 24px rgba(99, 102, 241, 0.6);
        }
    `;
    document.head.appendChild(style);
}

initScrollToTop();

// === CONSOLE MESSAGE ===
console.log('%c🚀 Portfolio by Shreenath Ubale', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%c💻 Software Engineer | Backend & AI Specialist', 'color: #0ea5e9; font-size: 14px;');
console.log('%c📧 Contact: shriubale06@gmail.com', 'color: #10b981; font-size: 12px;');