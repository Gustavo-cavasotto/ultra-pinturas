// ==========================================
// GALLERY CAROUSEL FUNCTIONALITY
// ==========================================

class GalleryCarousel {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = 0;
        this.isAutoPlaying = false;
        this.autoPlayInterval = null;
        this.touchStartX = 0;
        this.touchEndX = 0;
        
        this.carousel = null;
        this.slides = null;
        this.prevBtn = null;
        this.nextBtn = null;
        this.indicators = null;
        
        this.init();
    }
    
    init() {
        this.carousel = document.getElementById('galleryCarousel');
        this.slides = this.carousel?.querySelectorAll('.flex-shrink-0');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.indicators = document.getElementById('carouselIndicators');
        
        if (!this.carousel || !this.slides.length) {
            console.error('Gallery carousel elements not found');
            return;
        }
        
        // Detect screen size and set appropriate total slides
        this.updateTotalSlides();
        this.setupEventListeners();
        this.createIndicators();
        this.updateCarousel();
        this.startAutoPlay();
        
        console.log('Gallery Carousel initialized with', this.totalSlides, 'slides for', this.isDesktop() ? 'desktop' : 'mobile/tablet');
    }
    
    // Detect if we're on desktop (md+ breakpoint)
    isDesktop() {
        return window.innerWidth >= 768; // md breakpoint
    }
    
    // Update total slides based on screen size
    updateTotalSlides() {
        if (this.isDesktop()) {
            // Desktop: count only the main slide groups (2 groups of 6 images)
            this.totalSlides = 2;
        } else {
            // Mobile/Tablet: count all individual slides (12 slides of 1 image each)
            this.totalSlides = this.slides.length;
        }
    }
    
    setupEventListeners() {
        // Navigation buttons
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.previousSlide());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.previousSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
            }
        });
        
        // Touch events for mobile
        this.carousel.addEventListener('touchstart', (e) => {
            this.touchStartX = e.changedTouches[0].screenX;
        });
        
        this.carousel.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        });
        
        // Pause autoplay on hover
        this.carousel.addEventListener('mouseenter', () => this.pauseAutoPlay());
        this.carousel.addEventListener('mouseleave', () => this.startAutoPlay());
        
        // Pause autoplay on focus
        this.carousel.addEventListener('focusin', () => this.pauseAutoPlay());
        this.carousel.addEventListener('focusout', () => this.startAutoPlay());
        
        // Handle resize events to update indicators
        window.addEventListener('resize', () => {
            this.updateTotalSlides();
            this.createIndicators();
            this.updateCarousel();
        });
    }
    
    createIndicators() {
        if (!this.indicators) return;
        
        this.indicators.innerHTML = '';
        
        for (let i = 0; i < this.totalSlides; i++) {
            const indicator = document.createElement('button');
            indicator.className = `w-3 h-3 rounded-full transition-all duration-300 ${
                i === 0 ? 'bg-secondary' : 'bg-gray-300 dark:bg-gray-600'
            }`;
            
            // Set appropriate aria-label based on screen size
            if (this.isDesktop()) {
                indicator.setAttribute('aria-label', `Ir para grupo ${i + 1} (6 imagens)`);
            } else {
                indicator.setAttribute('aria-label', `Ir para imagem ${i + 1}`);
            }
            
            indicator.addEventListener('click', () => this.goToSlide(i));
            
            this.indicators.appendChild(indicator);
        }
    }
    
    updateIndicators() {
        const indicatorButtons = this.indicators?.querySelectorAll('button');
        if (!indicatorButtons) return;
        
        indicatorButtons.forEach((indicator, index) => {
            if (index === this.currentSlide) {
                indicator.className = 'w-3 h-3 rounded-full transition-all duration-300 bg-secondary';
            } else {
                indicator.className = 'w-3 h-3 rounded-full transition-all duration-300 bg-gray-300 dark:bg-gray-600';
            }
        });
    }
    
    updateCarousel() {
        if (!this.carousel) return;
        
        const translateX = -this.currentSlide * 100;
        this.carousel.style.transform = `translateX(${translateX}%)`;
        
        this.updateIndicators();
        this.updateNavigationButtons();
        
        // Update ARIA labels based on screen size
        if (this.isDesktop()) {
            this.carousel.setAttribute('aria-label', `Grupo ${this.currentSlide + 1} de ${this.totalSlides} (6 imagens por grupo)`);
        } else {
            this.carousel.setAttribute('aria-label', `Imagem ${this.currentSlide + 1} de ${this.totalSlides}`);
        }
    }
    
    updateNavigationButtons() {
        if (this.prevBtn) {
            this.prevBtn.disabled = this.currentSlide === 0;
            this.prevBtn.style.opacity = this.currentSlide === 0 ? '0.5' : '1';
        }
        
        if (this.nextBtn) {
            this.nextBtn.disabled = this.currentSlide === this.totalSlides - 1;
            this.nextBtn.style.opacity = this.currentSlide === this.totalSlides - 1 ? '0.5' : '1';
        }
    }
    
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateCarousel();
        this.resetAutoPlay();
    }
    
    previousSlide() {
        this.currentSlide = this.currentSlide === 0 ? this.totalSlides - 1 : this.currentSlide - 1;
        this.updateCarousel();
        this.resetAutoPlay();
    }
    
    goToSlide(index) {
        if (index >= 0 && index < this.totalSlides) {
            this.currentSlide = index;
            this.updateCarousel();
            this.resetAutoPlay();
        }
    }
    
    handleSwipe() {
        const swipeThreshold = 50;
        const diff = this.touchStartX - this.touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.nextSlide();
            } else {
                this.previousSlide();
            }
        }
    }
    
    startAutoPlay() {
        if (this.isAutoPlaying) return;
        
        this.isAutoPlaying = true;
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000); // Change slide every 5 seconds
    }
    
    pauseAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
        this.isAutoPlaying = false;
    }
    
    resetAutoPlay() {
        this.pauseAutoPlay();
        this.startAutoPlay();
    }
    
    // Public methods for external control
    play() {
        this.startAutoPlay();
    }
    
    pause() {
        this.pauseAutoPlay();
    }
    
    getCurrentSlide() {
        return this.currentSlide;
    }
    
    getTotalSlides() {
        return this.totalSlides;
    }
    
    // Get current display mode
    getDisplayMode() {
        return this.isDesktop() ? 'desktop' : 'mobile/tablet';
    }
}

// ==========================================
// INITIALIZATION
// ==========================================

let galleryCarousel = null;

function initializeGalleryCarousel() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            galleryCarousel = new GalleryCarousel();
        });
    } else {
        galleryCarousel = new GalleryCarousel();
    }
}

// Make it available globally
window.initializeGalleryCarousel = initializeGalleryCarousel;
window.GalleryCarousel = GalleryCarousel;

// Auto-initialize if this script is loaded directly
if (typeof document !== 'undefined') {
    initializeGalleryCarousel();
}

// ==========================================
// ACCESSIBILITY FEATURES
// ==========================================

function setupGalleryAccessibility() {
    const carousel = document.getElementById('galleryCarousel');
    if (!carousel) return;
    
    // Add ARIA attributes
    carousel.setAttribute('role', 'region');
    carousel.setAttribute('aria-label', 'Galeria de Projetos');
    carousel.setAttribute('aria-live', 'polite');
    
    // Add focus management
    const slides = carousel.querySelectorAll('.flex-shrink-0');
    slides.forEach((slide, index) => {
        slide.setAttribute('tabindex', '0');
        slide.setAttribute('role', 'tabpanel');
        slide.setAttribute('aria-label', `Slide ${index + 1}`);
        
        // Focus management on slide change
        slide.addEventListener('focus', () => {
            if (galleryCarousel) {
                galleryCarousel.goToSlide(index);
            }
        });
    });
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', setupGalleryAccessibility);

// ==========================================
// RESPONSIVE BEHAVIOR
// ==========================================

function handleResize() {
    if (galleryCarousel) {
        // Update total slides and indicators based on new screen size
        galleryCarousel.updateTotalSlides();
        galleryCarousel.createIndicators();
        galleryCarousel.updateCarousel();
    }
}

// Remove duplicate resize listener since it's now handled in the class
// window.addEventListener('resize', handleResize);

// ==========================================
// EXPORT FOR EXTERNAL USE
// ==========================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GalleryCarousel, initializeGalleryCarousel };
}
