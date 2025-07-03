// ==========================================
// FORM VALIDATION FUNCTIONALITY
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    initializeFormValidation();
});

// Make sure the function is also available globally for re-initialization
window.initializeFormValidation = initializeFormValidation;

// ==========================================
// INITIALIZATION
// ==========================================
function initializeFormValidation() {
    setupContactFormValidation();
    setupNewsletterValidation();
    setupRealTimeValidation();
    
    console.log('Form Validation - Initialized');
}

// ==========================================
// CONTACT FORM VALIDATION
// ==========================================
function setupContactFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateContactForm()) {
                submitContactForm();
            }
        });
    }
}

// ==========================================
// VALIDATE CONTACT FORM
// ==========================================
function validateContactForm() {
    const form = document.getElementById('contactForm');
    const formData = new FormData(form);
    let isValid = true;
    
    // Clear previous errors
    clearFormErrors();
    
    // Name validation
    const name = formData.get('name');
    if (!name || name.trim().length < 2) {
        showFieldError('name', 'Nome deve ter pelo menos 2 caracteres');
        isValid = false;
    }
    
    // Email validation
    const email = formData.get('email');
    if (!email || !isValidEmail(email)) {
        showFieldError('email', 'E-mail inválido');
        isValid = false;
    }
    
    // Phone validation
    const phone = formData.get('phone');
    if (!phone || !isValidPhone(phone)) {
        showFieldError('phone', 'Telefone inválido (formato: (51) 99527-3661)');
        isValid = false;
    }
    
    // Service validation
    const service = formData.get('service');
    if (!service) {
        showFieldError('service', 'Selecione um tipo de serviço');
        isValid = false;
    }
    
    // Message validation
    const message = formData.get('message');
    if (!message || message.trim().length < 10) {
        showFieldError('message', 'Descrição deve ter pelo menos 10 caracteres');
        isValid = false;
    }
    
    // Privacy checkbox validation
    const privacy = formData.get('privacy');
    if (!privacy) {
        showFieldError('privacy', 'Você deve aceitar os termos de privacidade');
        isValid = false;
    }
    
    return isValid;
}

// ==========================================
// SUBMIT CONTACT FORM
// ==========================================
function submitContactForm() {
    const submitBtn = document.getElementById('submitForm');
    const formStatus = document.getElementById('formStatus');
    const statusMessage = document.getElementById('statusMessage');
    
    // Show loading state
    showFormLoading(submitBtn);
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Hide loading state
        hideFormLoading(submitBtn);
        
        // Show success message
        if (formStatus && statusMessage) {
            formStatus.classList.remove('hidden', 'bg-red-100', 'text-red-700');
            formStatus.classList.add('bg-green-100', 'text-green-700');
            statusMessage.innerHTML = `
                <i class="fas fa-check-circle mr-2"></i>
                <span>Mensagem enviada com sucesso! Entraremos em contato em breve.</span>
            `;
        }
        
        // Clear form
        document.getElementById('contactForm').reset();
        
        // Show toast
        showToast('Formulário enviado com sucesso!', 'success');
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            if (formStatus) {
                formStatus.classList.add('hidden');
            }
        }, 5000);
        
    }, 2000); // Simulate 2 second delay
}

// ==========================================
// NEWSLETTER VALIDATION
// ==========================================
function setupNewsletterValidation() {
    const newsletterForm = document.querySelector('.newsletter-form');
    const newsletterInput = document.querySelector('input[type="email"][placeholder="Seu e-mail"]');
    const newsletterBtn = document.querySelector('.newsletter-form button');
    
    if (newsletterBtn) {
        newsletterBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (newsletterInput) {
                const email = newsletterInput.value.trim();
                
                if (!email) {
                    showToast('Digite seu e-mail para se inscrever', 'warning');
                    newsletterInput.focus();
                    return;
                }
                
                if (!isValidEmail(email)) {
                    showToast('E-mail inválido', 'error');
                    newsletterInput.focus();
                    return;
                }
                
                // Simulate newsletter subscription
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Inscrevendo...';
                this.disabled = true;
                
                setTimeout(() => {
                    showToast('Inscrição realizada com sucesso!', 'success');
                    newsletterInput.value = '';
                    this.innerHTML = originalText;
                    this.disabled = false;
                }, 1500);
            }
        });
    }
}

// ==========================================
// REAL-TIME VALIDATION
// ==========================================
function setupRealTimeValidation() {
    const formFields = document.querySelectorAll('#contactForm input, #contactForm select, #contactForm textarea');
    
    formFields.forEach(field => {
        field.addEventListener('blur', function() {
            validateField(this);
        });
        
        field.addEventListener('input', function() {
            // Clear error state on input
            clearFieldError(this.name);
            
            // Real-time phone formatting
            if (this.type === 'tel') {
                this.value = formatPhone(this.value);
            }
        });
    });
}

// ==========================================
// VALIDATE INDIVIDUAL FIELD
// ==========================================
function validateField(field) {
    const fieldName = field.name;
    const fieldValue = field.value.trim();
    
    switch (fieldName) {
        case 'name':
            if (fieldValue.length > 0 && fieldValue.length < 2) {
                showFieldError(fieldName, 'Nome muito curto');
            }
            break;
            
        case 'email':
            if (fieldValue.length > 0 && !isValidEmail(fieldValue)) {
                showFieldError(fieldName, 'E-mail inválido');
            }
            break;
            
        case 'phone':
            if (fieldValue.length > 0 && !isValidPhone(fieldValue)) {
                showFieldError(fieldName, 'Telefone inválido');
            }
            break;
            
        case 'message':
            if (fieldValue.length > 0 && fieldValue.length < 10) {
                showFieldError(fieldName, 'Descrição muito curta (mínimo 10 caracteres)');
            }
            break;
    }
}

// ==========================================
// VALIDATION HELPERS
// ==========================================
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const cleanPhone = phone.replace(/\D/g, '');
    return cleanPhone.length >= 10 && cleanPhone.length <= 11;
}

function formatPhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    
    if (cleaned.length <= 10) {
        return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else {
        return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
}

// ==========================================
// ERROR DISPLAY FUNCTIONS
// ==========================================
function showFieldError(fieldName, message) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    const errorElement = field?.parentElement.querySelector('.error-message');
    
    if (field && errorElement) {
        // Add error styling to field
        field.classList.add('border-red-500', 'focus:ring-red-500');
        field.classList.remove('border-gray-300', 'focus:ring-secondary');
        
        // Show error message
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
    }
}

function clearFieldError(fieldName) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    const errorElement = field?.parentElement.querySelector('.error-message');
    
    if (field && errorElement) {
        // Remove error styling
        field.classList.remove('border-red-500', 'focus:ring-red-500');
        field.classList.add('border-gray-300', 'focus:ring-secondary');
        
        // Hide error message
        errorElement.classList.add('hidden');
    }
}

function clearFormErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    const formFields = document.querySelectorAll('#contactForm input, #contactForm select, #contactForm textarea');
    
    errorMessages.forEach(error => {
        error.classList.add('hidden');
    });
    
    formFields.forEach(field => {
        field.classList.remove('border-red-500', 'focus:ring-red-500');
        field.classList.add('border-gray-300', 'focus:ring-secondary');
    });
}

// ==========================================
// LOADING STATES
// ==========================================
function showFormLoading(button) {
    if (button) {
        const originalText = button.innerHTML;
        button.dataset.originalText = originalText;
        button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Enviando...';
        button.disabled = true;
        button.classList.add('opacity-75');
    }
}

function hideFormLoading(button) {
    if (button && button.dataset.originalText) {
        button.innerHTML = button.dataset.originalText;
        button.disabled = false;
        button.classList.remove('opacity-75');
        delete button.dataset.originalText;
    }
}

// ==========================================
// FORM ANALYTICS
// ==========================================
function trackFormInteraction(action, field = null) {
    // Track form interactions for analytics
    const eventData = {
        action: action,
        field: field,
        timestamp: new Date().toISOString(),
        page: window.location.pathname
    };
    
    // Log to console (replace with actual analytics service)
    console.log('Form Analytics:', eventData);
    
    // Example: Send to Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': 'Form',
            'event_label': field,
            'value': 1
        });
    }
}

// ==========================================
// FORM AUTO-SAVE
// ==========================================
function setupFormAutoSave() {
    const form = document.getElementById('contactForm');
    const formFields = form?.querySelectorAll('input, select, textarea');
    
    if (formFields) {
        formFields.forEach(field => {
            field.addEventListener('input', function() {
                saveFormData();
            });
        });
        
        // Load saved data on page load
        loadFormData();
    }
}

function saveFormData() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const formData = new FormData(form);
    const data = {};
    
    for (const [key, value] of formData.entries()) {
        if (key !== 'privacy') { // Don't save privacy checkbox
            data[key] = value;
        }
    }
    
    try {
        localStorage.setItem('ultrapinturas_form_data', JSON.stringify(data));
    } catch (error) {
        console.error('Error saving form data:', error);
    }
}

function loadFormData() {
    try {
        const savedData = localStorage.getItem('ultrapinturas_form_data');
        if (savedData) {
            const data = JSON.parse(savedData);
            
            Object.keys(data).forEach(key => {
                const field = document.querySelector(`[name="${key}"]`);
                if (field && data[key]) {
                    field.value = data[key];
                }
            });
        }
    } catch (error) {
        console.error('Error loading form data:', error);
    }
}

function clearSavedFormData() {
    try {
        localStorage.removeItem('ultrapinturas_form_data');
    } catch (error) {
        console.error('Error clearing form data:', error);
    }
}

// ==========================================
// INITIALIZE AUTO-SAVE ON DOM READY
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    setupFormAutoSave();
    
    // Clear saved data when form is successfully submitted
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function() {
            setTimeout(() => {
                clearSavedFormData();
            }, 3000); // Clear after 3 seconds
        });
    }
});
