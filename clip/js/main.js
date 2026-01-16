// Main Entry Point for CLIP Tutorial

import Navigation from './navigation.js';

// Global app state
const app = {
    navigation: null,
    animations: {}
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎨 CLIP Tutorial Loading...');

    // Initialize navigation
    app.navigation = new Navigation();

    // Setup animations
    setupAnimations();

    console.log('✅ CLIP Tutorial Ready!');
});

// Setup all animations
function setupAnimations() {
    // Contrastive Learning Animation (Section 2)
    const contrastiveCanvas = document.getElementById('contrastiveCanvas');
    if (contrastiveCanvas) {
        const playBtn = document.getElementById('playContrastive');
        const resetBtn = document.getElementById('resetContrastive');

        if (playBtn) {
            playBtn.addEventListener('click', () => {
                console.log('Contrastive animation: Play (placeholder)');
                document.getElementById('contrastiveStatus').textContent = 'Showing positive & negative pairs...';
            });
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                console.log('Contrastive animation: Reset');
                document.getElementById('contrastiveStatus').textContent = 'Visualize positive & negative pairs';
            });
        }
    }

    // Dual Encoders Animation (Section 3)
    const encoderCanvas = document.getElementById('encoderCanvas');
    if (encoderCanvas) {
        const playBtn = document.getElementById('playEncoder');
        const resetBtn = document.getElementById('resetEncoder');

        if (playBtn) {
            playBtn.addEventListener('click', () => {
                console.log('Encoder animation: Play (placeholder)');
                document.getElementById('encoderStatus').textContent = 'Encoders processing inputs...';
            });
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                console.log('Encoder animation: Reset');
                document.getElementById('encoderStatus').textContent = 'See how encoders process inputs';
            });
        }
    }

    // Training Batch Animation (Section 4)
    const trainingCanvas = document.getElementById('trainingCanvas');
    if (trainingCanvas) {
        const playBtn = document.getElementById('playTraining');
        const resetBtn = document.getElementById('resetTraining');

        if (playBtn) {
            playBtn.addEventListener('click', () => {
                console.log('Training animation: Play (placeholder)');
                document.getElementById('trainingStatus').textContent = 'Processing batch & computing similarity matrix...';
            });
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                console.log('Training animation: Reset');
                document.getElementById('trainingStatus').textContent = 'Visualize batch processing & similarity matrix';
            });
        }
    }

    // Zero-Shot Demo (Section 5)
    const zeroshotCanvas = document.getElementById('zeroshotCanvas');
    if (zeroshotCanvas) {
        const playBtn = document.getElementById('playZeroshot');
        const resetBtn = document.getElementById('resetZeroshot');

        if (playBtn) {
            playBtn.addEventListener('click', () => {
                console.log('Zero-shot demo: Play (placeholder)');
                document.getElementById('zeroshotStatus').textContent = 'Running zero-shot classification...';
            });
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                console.log('Zero-shot demo: Reset');
                document.getElementById('zeroshotStatus').textContent = 'Try zero-shot classification interactively';
            });
        }
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
