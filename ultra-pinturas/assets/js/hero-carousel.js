// Hero Carousel Functionality
class HeroCarousel {
    constructor() {
        this.slides = null;
        this.indicators = null;
        this.prevBtn = null;
        this.nextBtn = null;
        this.currentSlide = 0;
        this.autoplayInterval = null;
        this.isInitialized = false;
        
        console.log('🎠 Hero Carousel: Iniciando...');
        this.waitForElements();
    }
    
    waitForElements() {
        let attempts = 0;
        const maxAttempts = 20; // 10 segundos máximo
        
        // Aguarda os elementos estarem disponíveis
        const checkElements = () => {
            attempts++;
            this.slides = document.querySelectorAll('.carousel-slide');
            this.indicators = document.querySelectorAll('.carousel-indicator');
            this.prevBtn = document.getElementById('prevSlide');
            this.nextBtn = document.getElementById('nextSlide');
            
            console.log(`🔍 Verificando elementos (tentativa ${attempts}):`, {
                slides: this.slides.length,
                indicators: this.indicators.length,
                prevBtn: !!this.prevBtn,
                nextBtn: !!this.nextBtn
            });
            
            if (this.slides.length > 0 && this.indicators.length > 0 && this.prevBtn && this.nextBtn) {
                console.log('✅ Todos os elementos encontrados, inicializando carousel...');
                this.init();
            } else if (attempts < maxAttempts) {
                console.log(`⏳ Aguardando elementos serem carregados... (${attempts}/${maxAttempts})`);
                setTimeout(checkElements, 500);
            } else {
                console.error('❌ Timeout: Elementos do carousel não foram encontrados após 10 segundos');
                console.log('Elementos encontrados:', {
                    carouselContainer: !!document.querySelector('.carousel-container'),
                    heroSection: !!document.querySelector('section'),
                    allDivs: document.querySelectorAll('div').length
                });
            }
        };
        
        checkElements();
    }
    
    init() {
        if (this.isInitialized) {
            console.log('⚠️ Carousel já inicializado');
            return;
        }
        
        if (this.slides.length === 0) {
            console.error('❌ Nenhum slide encontrado');
            return;
        }
        
        console.log(`🎠 Inicializando carousel com ${this.slides.length} slides`);
        
        // Configurar estado inicial
        this.setupInitialState();
        
        // Adicionar event listeners
        this.setupEventListeners();
        
        // Iniciar autoplay imediatamente
        setTimeout(() => {
            this.startAutoplay();
        }, 100); // Pequeno delay para garantir que tudo esteja renderizado
        
        this.isInitialized = true;
        console.log('✅ Carousel inicializado com sucesso!');
    }
    
    setupInitialState() {
        // Definir primeiro slide como ativo
        this.slides.forEach((slide, index) => {
            slide.classList.remove('active');
            slide.style.opacity = '0';
            slide.style.zIndex = '1';
        });
        
        this.indicators.forEach(indicator => {
            indicator.classList.remove('active', 'bg-white/70');
            indicator.classList.add('bg-white/30');
        });
        
        // Ativar primeiro slide
        this.goToSlide(0);
    }
    
    setupEventListeners() {
        // Event listeners para botões de navegação
        this.prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('⬅️ Botão anterior clicado');
            this.prevSlide();
            this.resetAutoplay();
        });
        
        this.nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('➡️ Botão próximo clicado');
            this.nextSlide();
            this.resetAutoplay();
        });
        
        // Event listeners para indicadores
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', (e) => {
                e.preventDefault();
                console.log(`🎯 Indicador ${index} clicado`);
                this.goToSlide(index);
                this.resetAutoplay();
            });
        });
        
        // Pausar autoplay quando hover
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', () => {
                console.log('🖱️ Mouse entrou no carousel, pausando autoplay');
                this.stopAutoplay();
            });
            
            carouselContainer.addEventListener('mouseleave', () => {
                console.log('🖱️ Mouse saiu do carousel, retomando autoplay');
                this.startAutoplay();
            });
        }
    }
    
    goToSlide(slideIndex) {
        if (slideIndex < 0 || slideIndex >= this.slides.length) {
            console.error(`❌ Índice de slide inválido: ${slideIndex}`);
            return;
        }
        
        console.log(`🎠 Mudando para slide ${slideIndex}`);
        
        // Remover classes ativas de todos os slides
        this.slides.forEach((slide) => {
            slide.classList.remove('active');
            slide.style.opacity = '0';
            slide.style.zIndex = '1';
        });
        
        // Remover classes ativas de todos os indicadores
        this.indicators.forEach(indicator => {
            indicator.classList.remove('active', 'bg-white/70');
            indicator.classList.add('bg-white/30');
        });
        
        // Ativar slide atual
        const currentSlide = this.slides[slideIndex];
        currentSlide.classList.add('active');
        currentSlide.style.opacity = '1';
        currentSlide.style.zIndex = '2';
        
        // Ativar indicador atual
        const currentIndicator = this.indicators[slideIndex];
        currentIndicator.classList.add('active');
        currentIndicator.classList.remove('bg-white/30');
        currentIndicator.classList.add('bg-white/70');
        
        this.currentSlide = slideIndex;
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }
    
    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }
    
    startAutoplay() {
        if (!this.isInitialized) return;
        
        this.stopAutoplay();
        console.log('▶️ Iniciando autoplay');
        this.autoplayInterval = setInterval(() => {
            console.log('🔄 Autoplay: próximo slide');
            this.nextSlide();
        }, 2500); // Mudança a cada 2.5 segundos
    }
    
    stopAutoplay() {
        if (this.autoplayInterval) {
            console.log('⏸️ Parando autoplay');
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }
    
    resetAutoplay() {
        this.stopAutoplay();
        setTimeout(() => {
            console.log('🔄 Reiniciando autoplay após interação');
            this.startAutoplay();
        }, 3000); // Reinicia após 3 segundos de interação
    }
}

// Variável global para o carousel
let heroCarousel = null;

// Função para inicializar o carousel
function initHeroCarousel() {
    if (!heroCarousel) {
        heroCarousel = new HeroCarousel();
    }
}

// Tentar inicializar imediatamente se DOM já estiver carregado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroCarousel);
} else {
    initHeroCarousel();
}

// Também exportar função para ser chamada após carregamento dos componentes
window.initHeroCarousel = initHeroCarousel; 