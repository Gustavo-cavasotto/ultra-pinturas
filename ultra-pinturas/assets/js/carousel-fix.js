// Carousel Navigation Fix - Ultra Pinturas
// Garante que os botões de navegação funcionem corretamente em todos os dispositivos

document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Inicializando correção dos botões do carrossel...');
    
    // Aguardar carregamento completo dos componentes
    setTimeout(function() {
        fixCarouselButtons();
    }, 500);
    
    // Re-aplicar fix quando a tela for redimensionada
    window.addEventListener('resize', function() {
        setTimeout(fixCarouselButtons, 100);
    });
});

function fixCarouselButtons() {
    const prevButton = document.getElementById('prevSlide');
    const nextButton = document.getElementById('nextSlide');
    
    if (!prevButton || !nextButton) {
        console.warn('⚠️ Botões do carrossel não encontrados');
        return;
    }
    
    console.log('✅ Botões do carrossel encontrados, aplicando correções...');
    
    // Garantir que os botões tenham z-index adequado
    prevButton.style.zIndex = '35';
    nextButton.style.zIndex = '35';
    
    // Garantir posicionamento correto
    prevButton.style.position = 'absolute';
    nextButton.style.position = 'absolute';
    
    // Aplicar estilos específicos para mobile
    if (window.innerWidth <= 768) {
        console.log('📱 Aplicando estilos mobile aos botões');
        
        // Botão anterior
        prevButton.style.left = '1rem';
        prevButton.style.top = '50%';
        prevButton.style.transform = 'translateY(-50%)';
        prevButton.style.width = '3rem';
        prevButton.style.height = '3rem';
        prevButton.style.display = 'flex';
        prevButton.style.alignItems = 'center';
        prevButton.style.justifyContent = 'center';
        prevButton.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
        prevButton.style.border = '1px solid rgba(255, 255, 255, 0.6)';
        prevButton.style.borderRadius = '50%';
        prevButton.style.backdropFilter = 'blur(8px)';
        
        // Botão próximo
        nextButton.style.right = '1rem';
        nextButton.style.top = '50%';
        nextButton.style.transform = 'translateY(-50%)';
        nextButton.style.width = '3rem';
        nextButton.style.height = '3rem';
        nextButton.style.display = 'flex';
        nextButton.style.alignItems = 'center';
        nextButton.style.justifyContent = 'center';
        nextButton.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
        nextButton.style.border = '1px solid rgba(255, 255, 255, 0.6)';
        nextButton.style.borderRadius = '50%';
        nextButton.style.backdropFilter = 'blur(8px)';
        
        // Para telas muito pequenas
        if (window.innerWidth <= 480) {
            prevButton.style.left = '0.5rem';
            nextButton.style.right = '0.5rem';
            prevButton.style.width = '2.5rem';
            prevButton.style.height = '2.5rem';
            nextButton.style.width = '2.5rem';
            nextButton.style.height = '2.5rem';
        }
    } else {
        console.log('🖥️ Aplicando estilos desktop aos botões');
        
        // Resetar para estilos desktop
        prevButton.style.left = '1.5rem';
        nextButton.style.right = '1.5rem';
        prevButton.style.width = 'auto';
        nextButton.style.width = 'auto';
        prevButton.style.height = 'auto';
        nextButton.style.height = 'auto';
    }
    
    // Melhorar touch events para mobile
    if ('ontouchstart' in window) {
        console.log('👆 Otimizando eventos touch para mobile');
        
        [prevButton, nextButton].forEach(button => {
            // Adicionar área de toque maior
            button.style.minWidth = '44px';
            button.style.minHeight = '44px';
            
            // Feedback visual para touch
            button.addEventListener('touchstart', function() {
                this.style.transform = this.style.transform + ' scale(0.95)';
                this.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
            });
            
            button.addEventListener('touchend', function() {
                this.style.transform = this.style.transform.replace(' scale(0.95)', '');
                this.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
            });
        });
    }
    
    console.log('✅ Correção dos botões aplicada com sucesso!');
}

// Debug function
function debugCarouselButtons() {
    const prevButton = document.getElementById('prevSlide');
    const nextButton = document.getElementById('nextSlide');
    
    console.log('🔍 Debug dos botões do carrossel:');
    console.log('Prev button:', prevButton);
    console.log('Next button:', nextButton);
    
    if (prevButton) {
        console.log('Prev button styles:', {
            position: prevButton.style.position,
            left: prevButton.style.left,
            top: prevButton.style.top,
            zIndex: prevButton.style.zIndex,
            display: getComputedStyle(prevButton).display
        });
    }
    
    if (nextButton) {
        console.log('Next button styles:', {
            position: nextButton.style.position,
            right: nextButton.style.right,
            top: nextButton.style.top,
            zIndex: nextButton.style.zIndex,
            display: getComputedStyle(nextButton).display
        });
    }
}

// Tornar disponível globalmente para debug
window.debugCarouselButtons = debugCarouselButtons;
window.fixCarouselButtons = fixCarouselButtons; 