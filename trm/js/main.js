/**
 * Main entry point for Tiny Recursive Model Tutorial
 */

import Navigation from './navigation.js';
import { initTreeAnimation } from './animations/treeAnimation.js';
import { initRecursiveFlowAnimation } from './animations/recursiveFlowAnimation.js';

const app = {
    navigation: null,
    animations: {}
};

function init() {
    console.log('🌳 Initializing Tiny Recursive Model Tutorial...');

    // Initialize navigation
    app.navigation = new Navigation();

    // Initialize animations
    setupAnimations();

    // Setup scroll animations
    setupScrollAnimations();

    console.log('✅ Tutorial ready!');
}

function setupAnimations() {
    // Basic tree visualization
    const basicTreeCanvas = document.getElementById('basicTreeCanvas');
    if (basicTreeCanvas) {
        app.animations.basicTree = initTreeAnimation(basicTreeCanvas);
    }

    // Architecture visualization
    const archCanvas = document.getElementById('architectureCanvas');
    if (archCanvas) {
        const playBtn = document.getElementById('playArchitecture');
        if (playBtn) {
            playBtn.addEventListener('click', () => {
                if (!app.animations.architecture) {
                    app.animations.architecture = initTreeAnimation(archCanvas, 'architecture');
                }
                app.animations.architecture.draw();
            });
        }
    }

    // Forward pass animation
    const forwardCanvas = document.getElementById('forwardCanvas');
    if (forwardCanvas) {
        app.animations.forward = initRecursiveFlowAnimation(forwardCanvas);

        document.getElementById('playForward')?.addEventListener('click', () => {
            app.animations.forward.play();
        });

        document.getElementById('resetForward')?.addEventListener('click', () => {
            app.animations.forward.reset();
        });
    }
}

function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.content-card').forEach(card => {
        card.classList.add('scroll-fade-in');
        observer.observe(card);
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

export default app;
