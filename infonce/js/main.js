// Main Entry Point for InfoNCE Tutorial

import Navigation from './navigation.js';

// Global app state
const app = {
    navigation: null,
    animations: {}
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🔥 InfoNCE Tutorial Loading...');

    // Initialize navigation
    app.navigation = new Navigation();

    // Setup animations
    setupAnimations();

    // Setup temperature slider
    setupTemperatureSlider();

    console.log('✅ InfoNCE Tutorial Ready!');
});

// Setup all animations
function setupAnimations() {
    // Contrastive Forces Animation (Section 3)
    const contrastiveCanvas = document.getElementById('contrastiveCanvas');
    if (contrastiveCanvas) {
        const playBtn = document.getElementById('playContrastive');
        const resetBtn = document.getElementById('resetContrastive');

        if (playBtn) {
            playBtn.addEventListener('click', () => {
                console.log('Contrastive animation: Play (placeholder)');
                document.getElementById('contrastiveStatus').textContent = 'Showing pull/push forces...';
            });
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                console.log('Contrastive animation: Reset');
                document.getElementById('contrastiveStatus').textContent = 'Visualize pull/push forces in embedding space';
            });
        }
    }

    // Symmetric Loss Animation (Section 5)
    const symmetricCanvas = document.getElementById('symmetricCanvas');
    if (symmetricCanvas) {
        const playBtn = document.getElementById('playSymmetric');
        const resetBtn = document.getElementById('resetSymmetric');

        if (playBtn) {
            playBtn.addEventListener('click', () => {
                console.log('Symmetric animation: Play (placeholder)');
                document.getElementById('symmetricStatus').textContent = 'Showing row-wise and column-wise softmax...';
            });
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                console.log('Symmetric animation: Reset');
                document.getElementById('symmetricStatus').textContent = 'Visualize row-wise and column-wise softmax';
            });
        }
    }
}

// Setup temperature slider (Section 4)
function setupTemperatureSlider() {
    const slider = document.getElementById('tempSlider');
    const valueDisplay = document.getElementById('tempValue');

    if (slider && valueDisplay) {
        slider.addEventListener('input', (e) => {
            const temp = parseFloat(e.target.value);
            valueDisplay.textContent = temp.toFixed(2);

            // Update temperature status
            const statusEl = document.getElementById('temperatureStatus');
            if (statusEl) {
                if (temp < 0.1) {
                    statusEl.textContent = `τ = ${temp.toFixed(2)}: Very sharp distribution (confident)`;
                } else if (temp < 0.5) {
                    statusEl.textContent = `τ = ${temp.toFixed(2)}: Moderately sharp distribution`;
                } else {
                    statusEl.textContent = `τ = ${temp.toFixed(2)}: Smooth distribution (less confident)`;
                }
            }

            console.log(`Temperature changed: ${temp.toFixed(2)}`);
        });
    }
}

// Global function for navigation (called from HTML buttons)
window.navigateToSection = function (sectionId) {
    if (app.navigation) {
        app.navigation.navigateTo(sectionId);
    }
};

// Export app for potential external use
export default app;
