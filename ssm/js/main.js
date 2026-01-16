// Main Entry Point for SSM Tutorial

import Navigation from './navigation.js';

// Global app state
const app = {
    navigation: null,
    animations: {}
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 SSM Tutorial Loading...');

    // Initialize navigation
    app.navigation = new Navigation();

    // Setup animations
    setupAnimations();

    console.log('✅ SSM Tutorial Ready!');
});

// Setup all animations
function setupAnimations() {
    // State Transition Animation (Section 2)
    const stateCanvas = document.getElementById('stateCanvas');
    if (stateCanvas) {
        const playBtn = document.getElementById('playState');
        const resetBtn = document.getElementById('resetState');

        if (playBtn) {
            playBtn.addEventListener('click', () => {
                console.log('State animation: Play (placeholder)');
                document.getElementById('stateStatus').textContent = 'State transition animation playing...';
                // Animation will be implemented in stateTransition.js
            });
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                console.log('State animation: Reset');
                document.getElementById('stateStatus').textContent = 'Press Play to see state evolution over time';
            });
        }
    }

    // Discretization Animation (Section 3)
    const discretizationCanvas = document.getElementById('discretizationCanvas');
    if (discretizationCanvas) {
        const playBtn = document.getElementById('playDiscretization');
        const resetBtn = document.getElementById('resetDiscretization');

        if (playBtn) {
            playBtn.addEventListener('click', () => {
                console.log('Discretization animation: Play (placeholder)');
                document.getElementById('discretizationStatus').textContent = 'Showing continuous→discrete conversion...';
            });
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                console.log('Discretization animation: Reset');
                document.getElementById('discretizationStatus').textContent = 'Visualize continuous→discrete conversion';
            });
        }
    }

    // Recurrent Animation (Section 4)
    const recurrentCanvas = document.getElementById('recurrentCanvas');
    if (recurrentCanvas) {
        const playBtn = document.getElementById('playRecurrent');
        const stepBtn = document.getElementById('stepRecurrent');
        const resetBtn = document.getElementById('resetRecurrent');

        if (playBtn) {
            playBtn.addEventListener('click', () => {
                console.log('Recurrent animation: Play (placeholder)');
                document.getElementById('recurrentStatus').textContent = 'Sequential processing in progress...';
            });
        }

        if (stepBtn) {
            stepBtn.addEventListener('click', () => {
                console.log('Recurrent animation: Step');
                document.getElementById('recurrentStatus').textContent = 'Step-by-step mode active';
            });
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                console.log('Recurrent animation: Reset');
                document.getElementById('recurrentStatus').textContent = 'Step-by-step sequential processing';
            });
        }
    }

    // Convolution Animation (Section 5)
    const convolutionCanvas = document.getElementById('convolutionCanvas');
    if (convolutionCanvas) {
        const playBtn = document.getElementById('playConvolution');
        const resetBtn = document.getElementById('resetConvolution');

        if (playBtn) {
            playBtn.addEventListener('click', () => {
                console.log('Convolution animation: Play (placeholder)');
                document.getElementById('convolutionStatus').textContent = 'Parallel convolution operation in progress...';
            });
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                console.log('Convolution animation: Reset');
                document.getElementById('convolutionStatus').textContent = 'Visualize parallel convolution operation';
            });
        }
    }

    // Training Simulation (Section 6)
    const trainingCanvas = document.getElementById('trainingCanvas');
    if (trainingCanvas) {
        const startBtn = document.getElementById('startTraining');
        const pauseBtn = document.getElementById('pauseTraining');

        if (startBtn) {
            startBtn.addEventListener('click', () => {
                console.log('Training simulation: Start (placeholder)');
                document.getElementById('trainingStatus').textContent = 'Training simulation running...';
            });
        }

        if (pauseBtn) {
            pauseBtn.addEventListener('click', () => {
                console.log('Training simulation: Pause');
                document.getElementById('trainingStatus').textContent = 'Training paused';
            });
        }
    }

    // Selective SSM Animation (Section 7)
    const selectiveCanvas = document.getElementById('selectiveCanvas');
    if (selectiveCanvas) {
        const playBtn = document.getElementById('playSelective');
        const resetBtn = document.getElementById('resetSelective');

        if (playBtn) {
            playBtn.addEventListener('click', () => {
                console.log('Selective animation: Play (placeholder)');
                document.getElementById('selectiveStatus').textContent = 'Selective mechanism visualization active...';
            });
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                console.log('Selective animation: Reset');
                document.getElementById('selectiveStatus').textContent = 'See how Δ, B, C adapt per token';
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
