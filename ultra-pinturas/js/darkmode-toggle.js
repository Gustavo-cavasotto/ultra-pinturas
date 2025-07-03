// ==========================================
// DARK MODE TOGGLE FUNCTIONALITY
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    initializeDarkMode();
});

// Make sure the function is also available globally for re-initialization
window.initializeDarkMode = initializeDarkMode;

// ==========================================
// INITIALIZATION
// ==========================================
function initializeDarkMode() {
    setupDarkModeToggle();
    loadDarkModePreference();
    setupSystemThemeDetection();
    
    console.log('Dark Mode - Initialized');
}

// ==========================================
// SETUP DARK MODE TOGGLE
// ==========================================
function setupDarkModeToggle() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            toggleDarkMode();
            updateToggleIcon();
            saveDarkModePreference();
        });
    }
}

// ==========================================
// TOGGLE DARK MODE
// ==========================================
function toggleDarkMode() {
    const html = document.documentElement;
    
    if (html.classList.contains('dark')) {
        // Switch to light mode
        html.classList.remove('dark');
        setTheme('light');
    } else {
        // Switch to dark mode
        html.classList.add('dark');
        setTheme('dark');
    }
    
    // Trigger custom event for other components
    window.dispatchEvent(new CustomEvent('themeChanged', {
        detail: { theme: getCurrentTheme() }
    }));
}

// ==========================================
// SET THEME
// ==========================================
function setTheme(theme) {
    const html = document.documentElement;
    
    if (theme === 'dark') {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }
    
    // Update meta theme-color for mobile browsers
    updateMetaThemeColor(theme);
    
    // Update any theme-dependent elements
    updateThemeDependentElements(theme);
}

// ==========================================
// GET CURRENT THEME
// ==========================================
function getCurrentTheme() {
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

// ==========================================
// UPDATE TOGGLE ICON
// ==========================================
function updateToggleIcon() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const icon = darkModeToggle?.querySelector('i');
    
    if (icon) {
        const isDark = document.documentElement.classList.contains('dark');
        
        if (isDark) {
            icon.className = 'fas fa-sun';
            darkModeToggle.title = 'Alternar para modo claro';
            darkModeToggle.setAttribute('aria-label', 'Alternar para modo claro');
        } else {
            icon.className = 'fas fa-moon';
            darkModeToggle.title = 'Alternar para modo escuro';
            darkModeToggle.setAttribute('aria-label', 'Alternar para modo escuro');
        }
    }
}

// ==========================================
// SAVE DARK MODE PREFERENCE
// ==========================================
function saveDarkModePreference() {
    const theme = getCurrentTheme();
    
    try {
        localStorage.setItem('ultrapinturas_theme', theme);
    } catch (error) {
        console.error('Error saving theme preference:', error);
    }
}

// ==========================================
// LOAD DARK MODE PREFERENCE
// ==========================================
function loadDarkModePreference() {
    try {
        const savedTheme = localStorage.getItem('ultrapinturas_theme');
        
        if (savedTheme) {
            setTheme(savedTheme);
        } else {
            // If no preference saved, use system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setTheme(prefersDark ? 'dark' : 'light');
        }
        
        updateToggleIcon();
    } catch (error) {
        console.error('Error loading theme preference:', error);
        setTheme('light'); // Fallback to light theme
        updateToggleIcon();
    }
}

// ==========================================
// SYSTEM THEME DETECTION
// ==========================================
function setupSystemThemeDetection() {
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    mediaQuery.addEventListener('change', function(e) {
        // Only update if user hasn't set a preference
        const savedTheme = localStorage.getItem('ultrapinturas_theme');
        
        if (!savedTheme) {
            setTheme(e.matches ? 'dark' : 'light');
            updateToggleIcon();
        }
    });
}

// ==========================================
// UPDATE META THEME COLOR
// ==========================================
function updateMetaThemeColor(theme) {
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    
    if (!metaThemeColor) {
        metaThemeColor = document.createElement('meta');
        metaThemeColor.name = 'theme-color';
        document.head.appendChild(metaThemeColor);
    }
    
    // Set theme color based on current theme
    if (theme === 'dark') {
        metaThemeColor.content = '#0F1F3D'; // Primary dark color
    } else {
        metaThemeColor.content = '#FFFFFF'; // Light color
    }
}

// ==========================================
// UPDATE THEME DEPENDENT ELEMENTS
// ==========================================
function updateThemeDependentElements(theme) {
    // Update any elements that need special handling for theme changes
    
    // Update syntax highlighting if present
    updateSyntaxHighlighting(theme);
    
    // Update charts if present
    updateCharts(theme);
    
    // Update any embedded iframes that support theme
    updateEmbeddedContent(theme);
}

// ==========================================
// UPDATE SYNTAX HIGHLIGHTING
// ==========================================
function updateSyntaxHighlighting(theme) {
    // Update code blocks if any exist
    const codeBlocks = document.querySelectorAll('pre[class*="language-"]');
    
    codeBlocks.forEach(block => {
        if (theme === 'dark') {
            block.classList.add('dark-theme');
        } else {
            block.classList.remove('dark-theme');
        }
    });
}

// ==========================================
// UPDATE CHARTS
// ==========================================
function updateCharts(theme) {
    // If using Chart.js or similar, update chart themes
    if (typeof Chart !== 'undefined') {
        Chart.defaults.color = theme === 'dark' ? '#ffffff' : '#333333';
        Chart.defaults.borderColor = theme === 'dark' ? '#374151' : '#e5e7eb';
        
        // Re-render existing charts
        Chart.instances.forEach(chart => {
            chart.update();
        });
    }
}

// ==========================================
// UPDATE EMBEDDED CONTENT
// ==========================================
function updateEmbeddedContent(theme) {
    // Update Google Maps if present
    const mapIframes = document.querySelectorAll('iframe[src*="google.com/maps"]');
    mapIframes.forEach(iframe => {
        const src = iframe.src;
        if (theme === 'dark' && !src.includes('&style=feature:all|element:all|hue:0x000000')) {
            // Add dark style to map (this is a simplified example)
            iframe.src = src + '&style=feature:all|element:all|hue:0x000000|saturation:-100|lightness:-25';
        }
    });
}

// ==========================================
// THEME TRANSITION EFFECTS
// ==========================================
function enableThemeTransitions() {
    const style = document.createElement('style');
    style.textContent = `
        * {
            transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease !important;
        }
        
        *:before,
        *:after {
            transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease !important;
        }
    `;
    
    document.head.appendChild(style);
    
    // Remove transitions after theme change is complete
    setTimeout(() => {
        document.head.removeChild(style);
    }, 300);
}

// ==========================================
// KEYBOARD SHORTCUT FOR THEME TOGGLE
// ==========================================
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Shift + D to toggle dark mode
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        toggleDarkMode();
        updateToggleIcon();
        saveDarkModePreference();
        
        // Show feedback
        showToast(`Modo ${getCurrentTheme() === 'dark' ? 'escuro' : 'claro'} ativado`, 'info');
    }
});

// ==========================================
// AUTO THEME BASED ON TIME
// ==========================================
function setupAutoThemeSchedule() {
    const now = new Date();
    const hour = now.getHours();
    
    // Auto dark mode from 6 PM to 6 AM
    const shouldBeDark = hour >= 18 || hour < 6;
    
    // Only apply if user hasn't set a preference
    const savedTheme = localStorage.getItem('ultrapinturas_theme');
    if (!savedTheme) {
        setTheme(shouldBeDark ? 'dark' : 'light');
        updateToggleIcon();
    }
}

// ==========================================
// THEME ANALYTICS
// ==========================================
function trackThemeUsage(theme) {
    // Track theme usage for analytics
    const eventData = {
        action: 'theme_change',
        theme: theme,
        timestamp: new Date().toISOString(),
        user_agent: navigator.userAgent
    };
    
    console.log('Theme Analytics:', eventData);
    
    // Send to analytics service
    if (typeof gtag !== 'undefined') {
        gtag('event', 'theme_change', {
            'event_category': 'UI',
            'event_label': theme,
            'value': 1
        });
    }
}

// ==========================================
// EXPORT THEME UTILITIES
// ==========================================
window.themeUtils = {
    getCurrentTheme,
    setTheme,
    toggleDarkMode,
    saveDarkModePreference,
    loadDarkModePreference
};

// ==========================================
// LISTEN FOR THEME CHANGES
// ==========================================
window.addEventListener('themeChanged', function(e) {
    trackThemeUsage(e.detail.theme);
    enableThemeTransitions();
});

// ==========================================
// ADVANCED THEME FEATURES
// ==========================================

// High contrast mode toggle
function toggleHighContrast() {
    const html = document.documentElement;
    html.classList.toggle('high-contrast');
    
    // Save preference
    const isHighContrast = html.classList.contains('high-contrast');
    localStorage.setItem('ultrapinturas_high_contrast', isHighContrast);
}

// Reduced motion preference
function respectReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        document.documentElement.classList.add('reduce-motion');
    }
}

// Initialize advanced features
document.addEventListener('DOMContentLoaded', function() {
    respectReducedMotion();
    
    // Load high contrast preference
    const highContrastPref = localStorage.getItem('ultrapinturas_high_contrast');
    if (highContrastPref === 'true') {
        document.documentElement.classList.add('high-contrast');
    }
});
