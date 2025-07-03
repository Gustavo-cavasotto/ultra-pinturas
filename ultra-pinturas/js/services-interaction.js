// ==========================================
// SERVICES INTERACTION FUNCTIONALITY
// ==========================================

// Selected services storage
let selectedServices = [];

document.addEventListener('DOMContentLoaded', function() {
    initializeServicesInteraction();
});

// Make sure the function is also available globally for re-initialization
window.initializeServicesInteraction = initializeServicesInteraction;

// ==========================================
// INITIALIZATION
// ==========================================
function initializeServicesInteraction() {
    setupServiceButtons();
    setupSelectedServicesPanel();
    setupWhatsAppIntegration();
    loadSelectedServices();
    
    console.log('Services Interaction - Initialized');
}

// ==========================================
// SERVICE BUTTONS SETUP
// ==========================================
function setupServiceButtons() {
    const serviceButtons = document.querySelectorAll('.add-service-btn');
    
    serviceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const serviceName = this.getAttribute('data-service');
            const serviceDescription = this.getAttribute('data-description');
            
            if (serviceName) {
                addServiceToRequest(serviceName, serviceDescription);
                animateButton(this);
                showServiceToast();
            }
        });
    });
}

// ==========================================
// ADD SERVICE TO REQUEST
// ==========================================
function addServiceToRequest(serviceName, serviceDescription) {
    // Check if service is already added
    const existingService = selectedServices.find(service => service.name === serviceName);
    
    if (!existingService) {
        const newService = {
            id: Date.now(),
            name: serviceName,
            description: serviceDescription || '',
            addedAt: new Date().toISOString()
        };
        
        selectedServices.push(newService);
        updateSelectedServicesDisplay();
        saveSelectedServices();
        updateServicesPanelVisibility();
    } else {
        showToast('Este serviço já foi adicionado à sua solicitação!', 'warning');
    }
}

// ==========================================
// REMOVE SERVICE FROM REQUEST
// ==========================================
function removeServiceFromRequest(serviceId) {
    selectedServices = selectedServices.filter(service => service.id !== serviceId);
    updateSelectedServicesDisplay();
    saveSelectedServices();
    updateServicesPanelVisibility();
    
    showToast('Serviço removido da solicitação!', 'info');
}

// ==========================================
// CLEAR ALL SERVICES
// ==========================================
function clearAllServices() {
    selectedServices = [];
    updateSelectedServicesDisplay();
    saveSelectedServices();
    updateServicesPanelVisibility();
    
    showToast('Todos os serviços foram removidos!', 'info');
}

// ==========================================
// UPDATE SERVICES DISPLAY
// ==========================================
function updateSelectedServicesDisplay() {
    const servicesList = document.getElementById('selectedServicesList');
    
    if (servicesList) {
        if (selectedServices.length === 0) {
            servicesList.innerHTML = '<li class="text-gray-500 text-sm">Nenhum serviço selecionado</li>';
        } else {
            servicesList.innerHTML = selectedServices.map(service => `
                <li class="flex items-center justify-between py-1">
                    <span class="text-sm">${service.name}</span>
                    <button onclick="removeServiceFromRequest(${service.id})" 
                            class="text-red-500 hover:text-red-700 ml-2">
                        <i class="fas fa-times"></i>
                    </button>
                </li>
            `).join('');
        }
    }
}

// ==========================================
// UPDATE PANEL VISIBILITY
// ==========================================
function updateServicesPanelVisibility() {
    if (selectedServices.length > 0) {
        showServicesPanel();
    } else {
        hideServicesPanel();
    }
}

// ==========================================
// SERVICES PANEL SETUP
// ==========================================
function setupSelectedServicesPanel() {
    // Send WhatsApp button
    const sendWhatsAppBtn = document.getElementById('sendWhatsApp');
    if (sendWhatsAppBtn) {
        sendWhatsAppBtn.addEventListener('click', function() {
            if (selectedServices.length > 0) {
                sendServicesViaWhatsApp();
            } else {
                showToast('Adicione pelo menos um serviço antes de enviar!', 'warning');
            }
        });
    }
    
    // Clear services button
    const clearServicesBtn = document.getElementById('clearServices');
    if (clearServicesBtn) {
        clearServicesBtn.addEventListener('click', function() {
            if (selectedServices.length > 0) {
                if (confirm('Tem certeza que deseja limpar todos os serviços selecionados?')) {
                    clearAllServices();
                }
            }
        });
    }
    
    // Close panel button
    const closePanelBtn = document.getElementById('closePanelBtn');
    if (closePanelBtn) {
        closePanelBtn.addEventListener('click', function() {
            hideServicesPanel();
        });
    }
}

// ==========================================
// PANEL VISIBILITY FUNCTIONS
// ==========================================
function showServicesPanel() {
    const panel = document.getElementById('selectedServicesPanel');
    if (panel) {
        // Mover para posição visível com margem
        panel.style.right = '1.5rem'; // equivalent to right-6
        panel.style.opacity = '1';
        panel.style.pointerEvents = 'auto';
        panel.classList.remove('translate-x-full');
        panel.classList.add('translate-x-0');
    }
}

function hideServicesPanel() {
    const panel = document.getElementById('selectedServicesPanel');
    if (panel) {
        // Mover para fora da tela completamente
        panel.style.right = '0';
        panel.style.opacity = '0';
        panel.style.pointerEvents = 'none';
        panel.classList.add('translate-x-full');
        panel.classList.remove('translate-x-0');
    }
}

// ==========================================
// WHATSAPP INTEGRATION
// ==========================================
function setupWhatsAppIntegration() {
    // Direct WhatsApp button in contact form
    const directWhatsAppBtn = document.getElementById('sendWhatsAppDirect');
    if (directWhatsAppBtn) {
        directWhatsAppBtn.addEventListener('click', function() {
            sendContactFormViaWhatsApp();
        });
    }
}

// ==========================================
// SEND SERVICES VIA WHATSAPP
// ==========================================
function sendServicesViaWhatsApp() {
    const phone = '5551995273661'; // WhatsApp number
    
    let message = `🎨 *SOLICITAÇÃO DE ORÇAMENTO - ULTRA PINTURAS*\n\n`;
    message += `Olá! Gostaria de solicitar um orçamento para os seguintes serviços:\n\n`;
    
    selectedServices.forEach((service, index) => {
        message += `${index + 1}. *${service.name}*\n`;
        if (service.description) {
            message += `   ${service.description}\n`;
        }
        message += `\n`;
    });
    
    message += `📅 Data da solicitação: ${new Date().toLocaleDateString('pt-BR')}\n`;
    message += `🕒 Horário: ${new Date().toLocaleTimeString('pt-BR')}\n\n`;
    message += `Por favor, me enviem um orçamento detalhado para estes serviços.\n\n`;
    message += `Muito obrigado!`;
    
    const whatsappURL = generateWhatsAppURL(phone, message);
    window.open(whatsappURL, '_blank');
    
    // Clear services after sending
    setTimeout(() => {
        clearAllServices();
    }, 1000);
}

// ==========================================
// SEND CONTACT FORM VIA WHATSAPP
// ==========================================
function sendContactFormViaWhatsApp() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const formData = new FormData(form);
    const phone = '5551995273661';
    
    let message = `🎨 *CONTATO - ULTRA PINTURAS*\n\n`;
    message += `*Nome:* ${formData.get('name') || 'Não informado'}\n`;
    message += `*E-mail:* ${formData.get('email') || 'Não informado'}\n`;
    message += `*Telefone:* ${formData.get('phone') || 'Não informado'}\n`;
    
    if (formData.get('company')) {
        message += `*Empresa:* ${formData.get('company')}\n`;
    }
    
    message += `*Tipo de Serviço:* ${formData.get('service') || 'Não especificado'}\n\n`;
    message += `*Descrição do Projeto:*\n${formData.get('message') || 'Não informado'}\n\n`;
    message += `📅 Data: ${new Date().toLocaleDateString('pt-BR')}\n`;
    message += `🕒 Horário: ${new Date().toLocaleTimeString('pt-BR')}`;
    
    const whatsappURL = generateWhatsAppURL(phone, message);
    window.open(whatsappURL, '_blank');
}

// ==========================================
// BUTTON ANIMATION
// ==========================================
function animateButton(button) {
    const originalText = button.innerHTML;
    const originalClasses = button.className;
    
    // Change button appearance
    button.innerHTML = '<i class="fas fa-check mr-2"></i>Adicionado!';
    button.className = button.className.replace('bg-secondary', 'bg-green-500');
    button.disabled = true;
    
    // Reset after 2 seconds
    setTimeout(() => {
        button.innerHTML = originalText;
        button.className = originalClasses;
        button.disabled = false;
    }, 2000);
}

// ==========================================
// SHOW SERVICE TOAST
// ==========================================
function showServiceToast() {
    // Use the main toast function if available, otherwise use simple alert
    if (typeof showToast === 'function') {
        showToast('Serviço adicionado à solicitação!', 'success');
    } else {
        // Fallback toast using the existing element
        const toast = document.getElementById('serviceToast');
        
        if (toast) {
            // Show toast with proper positioning
            toast.style.right = '1rem'; // equivalent to right-4
            toast.style.opacity = '1';
            toast.style.pointerEvents = 'auto';
            toast.classList.remove('translate-x-full');
            toast.classList.add('translate-x-0');
            
            // Hide after 3 seconds
            setTimeout(() => {
                toast.style.right = '0'; // move off-screen
                toast.style.opacity = '0';
                toast.style.pointerEvents = 'none';
                toast.classList.add('translate-x-full');
                toast.classList.remove('translate-x-0');
            }, 3000);
        }
    }
}

// ==========================================
// LOCAL STORAGE MANAGEMENT
// ==========================================
function saveSelectedServices() {
    try {
        localStorage.setItem('ultrapinturas_selected_services', JSON.stringify(selectedServices));
    } catch (error) {
        console.error('Error saving selected services:', error);
    }
}

function loadSelectedServices() {
    try {
        const saved = localStorage.getItem('ultrapinturas_selected_services');
        if (saved) {
            selectedServices = JSON.parse(saved);
            updateSelectedServicesDisplay();
            updateServicesPanelVisibility();
        }
    } catch (error) {
        console.error('Error loading selected services:', error);
        selectedServices = [];
    }
}

// ==========================================
// SERVICE CATALOG SEARCH
// ==========================================
function setupServiceSearch() {
    const searchInput = document.getElementById('serviceSearch');
    const serviceCards = document.querySelectorAll('.service-card');
    
    if (searchInput && serviceCards.length > 0) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            serviceCards.forEach(card => {
                const serviceName = card.querySelector('h3').textContent.toLowerCase();
                const serviceDescription = card.querySelector('p').textContent.toLowerCase();
                
                if (serviceName.includes(searchTerm) || serviceDescription.includes(searchTerm)) {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => {
                        if (card.style.opacity === '0') {
                            card.style.display = 'none';
                        }
                    }, 300);
                }
            });
        });
    }
}

// ==========================================
// QUICK SERVICE TEMPLATES
// ==========================================
const serviceTemplates = {
    industrial: {
        name: 'Pintura Industrial Completa',
        items: ['Preparação de superfície', 'Primer anticorrosivo', 'Tinta de acabamento', 'Controle de qualidade']
    },
    automotive: {
        name: 'Pintura Automotiva Premium',
        items: ['Preparação da carroceria', 'Primer', 'Tinta base', 'Verniz', 'Polimento']
    },
    plastic: {
        name: 'Pintura Plásticos Técnicos',
        items: ['Tratamento de superfície', 'Primer específico', 'Tinta especializada', 'Acabamento técnico']
    }
};

function addServiceTemplate(templateType) {
    const template = serviceTemplates[templateType];
    if (template) {
        const description = `Pacote completo incluindo: ${template.items.join(', ')}`;
        addServiceToRequest(template.name, description);
        showServiceToast();
    }
}

// ==========================================
// EXPORT TO OTHER PLATFORMS
// ==========================================
function exportServicesToEmail() {
    if (selectedServices.length === 0) {
        showToast('Adicione pelo menos um serviço antes de exportar!', 'warning');
        return;
    }
    
    const subject = 'Solicitação de Orçamento - Ultra Pinturas';
    let body = 'Olá,\n\nGostaria de solicitar um orçamento para os seguintes serviços:\n\n';
    
    selectedServices.forEach((service, index) => {
        body += `${index + 1}. ${service.name}\n`;
        if (service.description) {
            body += `   ${service.description}\n`;
        }
        body += '\n';
    });
    
    body += `Data da solicitação: ${new Date().toLocaleDateString('pt-BR')}\n`;
    body += 'Aguardo retorno.\n\nAtenciosamente,';
    
    const emailURL = `mailto:contato@ultrapinturas.com.br?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = emailURL;
}

// ==========================================
// MAKE FUNCTIONS GLOBALLY AVAILABLE
// ==========================================
window.removeServiceFromRequest = removeServiceFromRequest;
window.addServiceTemplate = addServiceTemplate;
window.exportServicesToEmail = exportServicesToEmail;
