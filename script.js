// Mobile menu toggle
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
            mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
        });
        
        // Scroll header style change
        const header = document.querySelector('#header');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (!targetElement) return;
                
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                    mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                }
            });
        });
        
        // Animations on scroll
        const featureCards = document.querySelectorAll('.feature-card');
        const securityImage = document.querySelector('.security-image');
        const securityText = document.querySelector('.security-text');
        const pricingCards = document.querySelectorAll('.pricing-card');
        const contactInfo = document.querySelector('.contact-info');
        const contactForm = document.querySelector('.contact-form');
        
        // Intersection Observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    
                    if (entry.target.classList.contains('feature-card')) {
                        entry.target.style.animation = `fadeIn 0.6s ease forwards ${entry.target.dataset.delay || '0s'}`;
                    } else if (entry.target.classList.contains('security-image')) {
                        entry.target.style.animation = 'slideInLeft 0.8s ease forwards';
                    } else if (entry.target.classList.contains('security-text')) {
                        entry.target.style.animation = 'slideInRight 0.8s ease forwards';
                    } else if (entry.target.classList.contains('pricing-card')) {
                        entry.target.style.animation = 'fadeIn 0.6s ease forwards';
                        entry.target.style.transform = 'translateY(0)';
                    } else if (entry.target.classList.contains('contact-info')) {
                        entry.target.style.animation = 'slideInLeft 0.8s ease forwards';
                    } else if (entry.target.classList.contains('contact-form')) {
                        entry.target.style.animation = 'slideInRight 0.8s ease forwards';
                    }
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        // Set animation delays for staggered effect
        featureCards.forEach((card, index) => {
            card.dataset.delay = `${index * 0.1}s`;
            observer.observe(card);
        });
        
        pricingCards.forEach((card, index) => {
            card.dataset.delay = `${index * 0.1}s`;
            observer.observe(card);
        });
        
        // Observe other elements
        observer.observe(securityImage);
        observer.observe(securityText);
        observer.observe(contactInfo);
        observer.observe(contactForm);
        
        // Form validation
        const contactFormElement = document.getElementById('contactForm');
        const formInputs = contactFormElement.querySelectorAll('.form-input');
        
        contactFormElement.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            
            formInputs.forEach(input => {
                const errorElement = input.nextElementSibling;
                
                if (!input.value.trim()) {
                    input.style.borderColor = '#ef4444';
                    errorElement.style.display = 'block';
                    isValid = false;
                } else {
                    input.style.borderColor = '#e2e8f0';
                    errorElement.style.display = 'none';
                    
                    // Email validation
                    if (input.type === 'email') {
                        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailPattern.test(input.value)) {
                            input.style.borderColor = '#ef4444';
                            errorElement.style.display = 'block';
                            isValid = false;
                        }
                    }
                }
            });
            
            if (isValid) {
                // Would typically send form data to server here
                alert('Thank you for your message! We will get back to you soon.');
                contactFormElement.reset();
            }
        });
