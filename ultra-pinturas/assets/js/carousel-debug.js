// Carousel Debug Script
console.log('🔧 Iniciando diagnóstico do carousel...');

// Função para diagnóstico
function diagnoseCarousel() {
    console.log('\n=== DIAGNÓSTICO DO CAROUSEL ===');
    
    // Verificar elementos HTML
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.carousel-indicator');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    const container = document.querySelector('.carousel-container');
    
    console.log('📊 Elementos encontrados:');
    console.log('- Slides:', slides.length);
    console.log('- Indicadores:', indicators.length);
    console.log('- Botão anterior:', !!prevBtn);
    console.log('- Botão próximo:', !!nextBtn);
    console.log('- Container:', !!container);
    
    // Verificar estilos CSS
    if (slides.length > 0) {
        const firstSlide = slides[0];
        const computedStyle = window.getComputedStyle(firstSlide);
        
        console.log('\n🎨 Estilos do primeiro slide:');
        console.log('- Position:', computedStyle.position);
        console.log('- Opacity:', computedStyle.opacity);
        console.log('- Z-index:', computedStyle.zIndex);
        console.log('- Display:', computedStyle.display);
        console.log('- Width:', computedStyle.width);
        console.log('- Height:', computedStyle.height);
        
        // Verificar se tem classe active
        console.log('- Tem classe active:', firstSlide.classList.contains('active'));
        console.log('- Classes:', Array.from(firstSlide.classList).join(', '));
    }
    
    // Verificar se o carousel global existe
    console.log('\n🌐 Estado global:');
    console.log('- window.initHeroCarousel:', typeof window.initHeroCarousel);
    console.log('- heroCarousel global:', typeof window.heroCarousel);
    
    // Verificar imagens
    console.log('\n🖼️ Verificando imagens:');
    slides.forEach((slide, index) => {
        const bgImage = slide.style.backgroundImage;
        if (bgImage) {
            const url = bgImage.match(/url\(["']?([^"']*)["']?\)/);
            if (url) {
                console.log(`- Slide ${index}: ${url[1]}`);
                
                // Testar se a imagem carrega
                const img = new Image();
                img.onload = () => console.log(`  ✅ Imagem ${index} carregou`);
                img.onerror = () => console.log(`  ❌ Imagem ${index} falhou`);
                img.src = url[1];
            }
        }
    });
    
    // Teste manual dos botões
    console.log('\n🧪 Testando funcionalidade:');
    
    if (prevBtn && nextBtn) {
        console.log('Botões disponíveis para teste manual.');
        
        // Adicionar event listeners de teste
        prevBtn.addEventListener('click', () => {
            console.log('🔄 Teste: Botão anterior clicado!');
        });
        
        nextBtn.addEventListener('click', () => {
            console.log('🔄 Teste: Botão próximo clicado!');
        });
        
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                console.log(`🔄 Teste: Indicador ${index} clicado!`);
            });
        });
    }
    
    console.log('\n=== FIM DO DIAGNÓSTICO ===\n');
}

// Executar diagnóstico após um delay
setTimeout(() => {
    diagnoseCarousel();
}, 2000);

// Também executar quando chamado manualmente
window.diagnoseCarousel = diagnoseCarousel;

// Teste simples para forçar mudança de slide
window.testCarousel = function() {
    console.log('🧪 Teste manual do carousel...');
    
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.carousel-indicator');
    
    if (slides.length === 0) {
        console.log('❌ Nenhum slide encontrado para teste');
        return;
    }
    
    let currentIndex = 0;
    
    // Função para mudar slide manualmente
    function changeSlide(index) {
        slides.forEach(slide => {
            slide.style.opacity = '0';
            slide.style.zIndex = '1';
            slide.classList.remove('active');
        });
        
        indicators.forEach(indicator => {
            indicator.classList.remove('active', 'bg-white/70');
            indicator.classList.add('bg-white/30');
        });
        
        slides[index].style.opacity = '1';
        slides[index].style.zIndex = '2';
        slides[index].classList.add('active');
        
        if (indicators[index]) {
            indicators[index].classList.add('active');
            indicators[index].classList.remove('bg-white/30');
            indicators[index].classList.add('bg-white/70');
        }
        
        console.log(`✅ Mudança forçada para slide ${index}`);
    }
    
    // Testar mudança automática
    changeSlide(0);
    
    setTimeout(() => changeSlide(1), 2500);
    setTimeout(() => changeSlide(2), 5000);
    setTimeout(() => changeSlide(0), 7500);
    
    console.log('🔄 Iniciando teste automático de 7.5 segundos (2.5s por slide)...');
}; 