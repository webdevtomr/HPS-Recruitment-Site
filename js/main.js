// HPS Recruitment Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }

    // Pricing Calculator
    const hourlyRateInput = document.getElementById('hourly-rate');
    const serviceTypeSelect = document.getElementById('service-type');
    const totalCostElement = document.getElementById('total-cost');
    const dailyCostElement = document.getElementById('daily-cost');
    const weeklyCostElement = document.getElementById('weekly-cost');

    function calculatePricing() {
        if (!hourlyRateInput || !serviceTypeSelect || !totalCostElement) return;

        const baseRate = parseFloat(hourlyRateInput.value) || 35;
        const markup = parseFloat(serviceTypeSelect.value) || 32.5;
        const totalHourlyRate = baseRate * (1 + markup / 100);
        
        totalCostElement.textContent = `$${totalHourlyRate.toFixed(2)}`;
        
        if (dailyCostElement) {
            const dailyRate = totalHourlyRate * 8;
            dailyCostElement.textContent = `$${dailyRate.toFixed(2)}`;
        }
        
        if (weeklyCostElement) {
            const weeklyRate = totalHourlyRate * 40;
            weeklyCostElement.textContent = `$${weeklyRate.toFixed(2)}`;
        }
    }

    if (hourlyRateInput && serviceTypeSelect) {
        hourlyRateInput.addEventListener('input', calculatePricing);
        serviceTypeSelect.addEventListener('change', calculatePricing);
        
        // Initialize calculator
        calculatePricing();
    }

    // Contact Form Handler
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formObject = {};
            
            for (let [key, value] of formData.entries()) {
                formObject[key] = value;
            }
            
            // Validate required fields
            const requiredFields = ['company-name', 'contact-person', 'phone', 'email', 'service-needed', 'message'];
            let isValid = true;
            
            requiredFields.forEach(field => {
                const input = document.getElementById(field);
                if (input && !input.value.trim()) {
                    input.style.borderColor = '#d32f2f';
                    isValid = false;
                } else if (input) {
                    input.style.borderColor = '#ddd';
                }
            });
            
            // Email validation
            const email = document.getElementById('email');
            if (email && email.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email.value)) {
                    email.style.borderColor = '#d32f2f';
                    isValid = false;
                } else {
                    email.style.borderColor = '#ddd';
                }
            }
            
            if (!isValid) {
                showNotification('Please fill in all required fields correctly.', 'error');
                return;
            }
            
            // Simulate form submission (in real implementation, this would send to a server)
            showNotification('Processing your request...', 'info');
            
            setTimeout(() => {
                // Hide form and show success message
                contactForm.style.display = 'none';
                if (formSuccess) {
                    formSuccess.style.display = 'block';
                }
                
                // If urgent request, show additional message
                const urgentCheckbox = document.getElementById('urgent');
                if (urgentCheckbox && urgentCheckbox.checked) {
                    showNotification('Urgent request received! Harvey will call you within 1 hour.', 'success');
                }
                
                // Scroll to success message
                if (formSuccess) {
                    formSuccess.scrollIntoView({ behavior: 'smooth' });
                }
            }, 1500);
        });
    }

    // Phone number formatting
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.startsWith('61')) {
                value = value.substring(2);
            }
            if (value.startsWith('0')) {
                value = value.substring(1);
            }
            if (value.length > 0) {
                if (value.length <= 3) {
                    value = value;
                } else if (value.length <= 6) {
                    value = value.substring(0, 3) + ' ' + value.substring(3);
                } else {
                    value = value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6, 9);
                }
                e.target.value = '0' + value;
            }
        });
    });

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add loading animation to external links
    const externalLinks = document.querySelectorAll('a[href^="http"], a[href^="tel:"], a[href^="mailto:"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Add a small delay and loading indication for tel: and mailto: links
            if (this.href.startsWith('tel:') || this.href.startsWith('mailto:')) {
                this.style.opacity = '0.7';
                setTimeout(() => {
                    this.style.opacity = '1';
                }, 1000);
            }
        });
    });

    // Statistics counter animation
    const statNumbers = document.querySelectorAll('.stat-item h3, .stat-large h3');
    
    function animateNumber(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Format numbers appropriately
            if (target >= 1000) {
                element.textContent = Math.floor(current).toLocaleString();
            } else {
                element.textContent = Math.floor(current) + '%';
            }
        }, 16);
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate statistics
                if (entry.target.matches('.stat-item h3, .stat-large h3')) {
                    const text = entry.target.textContent;
                    const number = parseInt(text.replace(/[^\d]/g, ''));
                    if (number > 0) {
                        animateNumber(entry.target, number);
                    }
                }
                
                // Add fade-in animation to cards
                if (entry.target.matches('.value-item, .service-item, .pricing-card, .industry-card')) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(20px)';
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 100);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.stat-item h3, .stat-large h3, .value-item, .service-item, .pricing-card, .industry-card');
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Back to top button
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.setAttribute('aria-label', 'Back to top');
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: rgb(78,101,168);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(backToTop);

    // Show/hide back to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    });

    // Scroll to top functionality
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add hover effect to back to top button
    backToTop.addEventListener('mouseenter', () => {
        backToTop.style.background = 'rgb(68,91,158)';
        backToTop.style.transform = 'scale(1.1)';
    });

    backToTop.addEventListener('mouseleave', () => {
        backToTop.style.background = 'rgb(78,101,168)';
        backToTop.style.transform = 'scale(1)';
    });
});

// Utility function for notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        z-index: 10000;
        max-width: 300px;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    // Set background color based on type
    switch(type) {
        case 'success':
            notification.style.background = '#28a745';
            break;
        case 'error':
            notification.style.background = '#dc3545';
            break;
        case 'warning':
            notification.style.background = '#ffc107';
            notification.style.color = '#333';
            break;
        default:
            notification.style.background = 'rgb(78,101,168)';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Form validation utilities
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^(\+61|0)[2-9]\d{8}$/;
    return re.test(phone.replace(/\s/g, ''));
}

// Emergency call tracking (for analytics if needed)
function trackEmergencyCall() {
    console.log('Emergency call initiated:', new Date().toISOString());
    // In a real implementation, this would send analytics data
}