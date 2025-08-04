// ==========================================
// ULTRA PINTURAS - MAIN JAVASCRIPT
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all main functionalities
    initializeApp();
});

// ==========================================
// APP INITIALIZATION
// ==========================================
function initializeApp() {
    setupSmoothScrolling();
    setupProgressBar();
    setupBackToTop();
    setupMobileMenu();
    setupNavbarScrollEffect();
    setupGalleryFilter();
    setupFAQAccordion();
    setupAnimations();
    hideAllPopups(); // Ensure all popups are hidden initially
}

// ==========================================
// SMOOTH SCROLLING
// ==========================================
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 80; // Height of fixed navbar
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobileMenu');
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });
}

// ==========================================
// PROGRESS BAR
// ==========================================
function setupProgressBar() {
    const progressBar = document.getElementById('progressBar');
    
    if (progressBar) {
        window.addEventListener('scroll', function() {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            
            progressBar.style.width = scrolled + '%';
        });
    }
}

// ==========================================
// BACK TO TOP BUTTON
// ==========================================
function setupBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.remove('hidden');
            } else {
                backToTopBtn.classList.add('hidden');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ==========================================
// MOBILE MENU
// ==========================================
function setupMobileMenu() {
    console.log('🔧 Configurando menu mobile...');
    
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    console.log('Menu toggle encontrado:', !!mobileMenuToggle);
    console.log('Menu mobile encontrado:', !!mobileMenu);
    
    if (mobileMenuToggle && mobileMenu) {
        // Remove event listeners existentes para evitar duplicações
        const newToggle = mobileMenuToggle.cloneNode(true);
        mobileMenuToggle.parentNode.replaceChild(newToggle, mobileMenuToggle);
        
        newToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('🍔 Botão hambúrguer clicado!');
            
            mobileMenu.classList.toggle('hidden');
            
            // Toggle hamburger icon
            const icon = this.querySelector('i');
            if (icon) {
                if (mobileMenu.classList.contains('hidden')) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                    console.log('🍔 Menu fechado - ícone: bars');
                } else {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                    console.log('🍔 Menu aberto - ícone: times');
                }
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!newToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
                const icon = newToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
        
        // Close menu when clicking on nav links
        const mobileNavLinks = mobileMenu.querySelectorAll('a[href^="#"]');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                const icon = newToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
        
        console.log('✅ Menu mobile configurado com sucesso!');
    } else {
        console.error('❌ Elementos do menu mobile não encontrados!');
        console.log('Tentando novamente em 500ms...');
        setTimeout(setupMobileMenu, 500);
    }
}

// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================
function setupNavbarScrollEffect() {
    const navbar = document.querySelector('nav');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('shadow-xl');
            } else {
                navbar.classList.remove('shadow-xl');
            }
        });
    }
}

// ==========================================
// GALLERY FILTER
// ==========================================
function setupGalleryFilter() {
    const filterButtons = document.querySelectorAll('.gallery-filter');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-secondary', 'text-accent');
                btn.classList.add('bg-gray-200', 'dark:bg-gray-700', 'text-gray-600', 'dark:text-gray-300');
            });
            
            this.classList.add('active', 'bg-secondary', 'text-accent');
            this.classList.remove('bg-gray-200', 'dark:bg-gray-700', 'text-gray-600', 'dark:text-gray-300');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ==========================================
// FAQ ACCORDION
// ==========================================
function setupFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    console.log('🔍 FAQ: Encontrados', faqQuestions.length, 'elementos de pergunta');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            const icon = this.querySelector('i');
            console.log('🔍 FAQ: Clique detectado, answer:', answer, 'active:', answer.classList.contains('active'));
            
            // Close other open items
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== question) {
                    const otherItem = otherQuestion.parentElement;
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherIcon = otherQuestion.querySelector('i');
                    
                    // Animate close
                    otherAnswer.style.maxHeight = '0px';
                    otherAnswer.style.paddingTop = '0px';
                    otherAnswer.style.paddingBottom = '0px';
                    otherAnswer.style.opacity = '0';
                    otherIcon.style.transform = 'rotate(0deg)';
                    
                    // Remove active class after animation
                    setTimeout(() => {
                        otherAnswer.classList.remove('active');
                    }, 300);
                }
            });
            
            // Toggle current item
            if (!answer.classList.contains('active')) {
                // Open
                answer.classList.add('active');
                answer.style.maxHeight = 'none'; // Remover limite de altura
                answer.style.height = 'auto'; // Altura automática
                answer.style.paddingTop = '1.5rem';
                answer.style.paddingBottom = '1.5rem';
                answer.style.opacity = '1';
                answer.style.overflow = 'visible';
                icon.style.transform = 'rotate(180deg)';
            } else {
                // Close
                answer.style.maxHeight = '0px';
                answer.style.paddingTop = '0px';
                answer.style.paddingBottom = '0px';
                answer.style.opacity = '0';
                icon.style.transform = 'rotate(0deg)';
                
                // Remove active class after animation
                setTimeout(() => {
                    answer.classList.remove('active');
                }, 300);
            }
        });
    });
}

// ==========================================
// SCROLL ANIMATIONS
// ==========================================
function setupAnimations() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// ==========================================
// MAP FUNCTIONALITY
// ==========================================
function setupMapActions() {
    // Get directions button
    const getDirectionsBtn = document.getElementById('getDirections');
    if (getDirectionsBtn) {
        getDirectionsBtn.addEventListener('click', function() {
            const address = 'R. Archimedes Manenti, 442 - Centenário, Caxias do Sul - RS, 95045-175';
            const encodedAddress = encodeURIComponent(address);
            window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`, '_blank');
        });
    }

    
    
    // Share location button
    const shareLocationBtn = document.getElementById('shareLocation');
        if (shareLocationBtn) {
            shareLocationBtn.addEventListener('click', function() {
            const address = 'Ultra Pinturas Especiais - R. Archimedes Manenti, 442 - Centenário, Caxias do Sul - RS, 95045-175';
            const url = `https://maps.google.com/?q=${encodeURIComponent(address)}`;
            
            if (navigator.share) {
                navigator.share({
                    title: 'Ultra Pinturas Especiais - Localização',
                    text: 'Veja nossa localização no mapa',
                    url: url
                });
            } else {
                // Fallback: copy to clipboard
                navigator.clipboard.writeText(url).then(() => {
                    showToast('Link copiado para a área de transferência!');
                });
            }
        });
    }
    
    }

// ==========================================
// HIDE ALL POPUPS INITIALLY
// ==========================================
function hideAllPopups() {
    console.log('🔄 Escondendo todos os popups...');
    
    // Hide services panel
    const servicesPanel = document.getElementById('selectedServicesPanel');
    if (servicesPanel) {
        servicesPanel.style.right = '0';
        servicesPanel.style.opacity = '0';
        servicesPanel.style.pointerEvents = 'none';
        servicesPanel.classList.add('translate-x-full');
        servicesPanel.classList.remove('translate-x-0');
        console.log('✅ Painel de serviços escondido');
    }
    
    // Hide service toast
    const serviceToast = document.getElementById('serviceToast');
    if (serviceToast) {
        serviceToast.style.right = '0';
        serviceToast.style.opacity = '0';
        serviceToast.style.pointerEvents = 'none';
        serviceToast.classList.add('translate-x-full');
        serviceToast.classList.remove('translate-x-0');
        console.log('✅ Toast de serviços escondido');
    }
    
    // Hide any other potential popups
    const allPopups = document.querySelectorAll('[id*="popup"], [id*="modal"], [id*="toast"]');
    allPopups.forEach(popup => {
        if (popup.classList.contains('fixed')) {
            popup.classList.add('translate-x-full', 'hidden');
            popup.classList.remove('translate-x-0');
        }
    });
    
    console.log('✅ Todos os popups foram escondidos');
}

// ==========================================
// TOAST NOTIFICATIONS
// ==========================================
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `fixed top-20 right-4 px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300 ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white`;
    
    toast.innerHTML = `
        <div class="flex items-center">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} mr-2"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.classList.remove('translate-x-full');
    }, 100);
    
    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// Format phone number
function formatPhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
}

// Validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Generate WhatsApp URL
function generateWhatsAppURL(phone, message) {
    const cleanPhone = phone.replace(/\D/g, '');
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/55${cleanPhone}?text=${encodedMessage}`;
}

// ==========================================
// KEYBOARD SHORTCUTS (ACCESSIBILITY)
// ==========================================
document.addEventListener('keydown', function(e) {
    // Alt + H = Home
    if (e.altKey && e.key === 'h') {
        e.preventDefault();
        document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Alt + S = Services
    if (e.altKey && e.key === 's') {
        e.preventDefault();
        document.getElementById('servicos')?.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Alt + C = Contact
    if (e.altKey && e.key === 'c') {
        e.preventDefault();
        document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Escape = Close mobile menu
    if (e.key === 'Escape') {
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    }
});

// ==========================================
// LOAD MAP ACTIONS AFTER DOM IS READY
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    setupMapActions();
});

// ==========================================
// MAKE FUNCTIONS AVAILABLE GLOBALLY
// ==========================================
window.setupMobileMenu = setupMobileMenu;
window.setupSmoothScrolling = setupSmoothScrolling;
window.setupFAQAccordion = setupFAQAccordion;
window.setupMapActions = setupMapActions;
window.hideAllPopups = hideAllPopups;
