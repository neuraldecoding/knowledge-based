// Main Entry Point for Diffusion Models Tutorial

import Navigation from './navigation.js';

// Global app state
const app = {
    navigation: null,
    animations: {}
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌊 Diffusion Models Tutorial Loading...');

    // Initialize navigation
    app.navigation = new Navigation();

    // Setup animations
    setupAnimations();

    // Setup schedule selector
    setupScheduleSelector();

    console.log('✅ Diffusion Models Tutorial Ready!');
});

// Setup all animations
function setupAnimations() {
    // Forward Diffusion Animation (Section 2)
    const forwardCanvas = document.getElementById('forwardCanvas');
    if (forwardCanvas) {
        const playBtn = document.getElementById('playForward');
        const resetBtn = document.getElementById('resetForward');

        if (playBtn) {
            playBtn.addEventListener('click', () => {
                console.log('Forward animation: Play (placeholder)');
                document.getElementById('forwardStatus').textContent = 'Showing gradual noise addition...';
            });
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                console.log('Forward animation: Reset');
                document.getElementById('forwardStatus').textContent = 'Watch image gradually become pure noise';
            });
        }
    }

    // Reverse Diffusion Animation (Section 3)
    const reverseCanvas = document.getElementById('reverseCanvas');
    if (reverseCanvas) {
        const playBtn = document.getElementById('playReverse');
        const resetBtn = document.getElementById('resetReverse');

        if (playBtn) {
            playBtn.addEventListener('click', () => {
                console.log('Reverse animation: Play (placeholder)');
                document.getElementById('reverseStatus').textContent = 'Showing gradual denoising...';
            });
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                console.log('Reverse animation: Reset');
                document.getElementById('reverseStatus').textContent = 'Watch noise gradually become a clean image';
            });
        }
    }
}

// Setup schedule selector (Section 5)
function setupScheduleSelector() {
    const scheduleButtons = document.querySelectorAll('.schedule-btn');

    scheduleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all
            scheduleButtons.forEach(b => b.classList.remove('active'));

            // Add active to clicked
            btn.classList.add('active');

            const schedule = btn.textContent;
            console.log(`Schedule selected: ${schedule}`);
        });
    });
}

// Global function for navigation (called from HTML buttons)
window.navigateToSection = function (sectionId) {
    if (app.navigation) {
        app.navigation.navigateTo(sectionId);
    }
};

// Export app for potential external use
export default app;
