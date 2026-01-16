/**
 * Main entry point for Tiny Recursive Model Tutorial
 */

import Navigation from './navigation.js';
import { initTreeAnimation } from './animations/treeAnimation.js';
import { initRecursiveFlowAnimation } from './animations/recursiveFlowAnimation.js';
import { initBackpropAnimation } from './animations/backpropAnimation.js';
import { initTrainingSimulation } from './animations/trainingSimulation.js';
import { initTreeBuilder } from './animations/treeBuilder.js';

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

        document.getElementById('stepForward')?.addEventListener('click', () => {
            // Manual step functionality could be added here
            app.animations.forward.play();
        });
    }

    // Backpropagation animation
    const backpropCanvas = document.getElementById('backpropCanvas');
    if (backpropCanvas) {
        app.animations.backprop = initBackpropAnimation(backpropCanvas);

        document.getElementById('playBackprop')?.addEventListener('click', () => {
            app.animations.backprop.play();
        });

        document.getElementById('resetBackprop')?.addEventListener('click', () => {
            app.animations.backprop.reset();
        });
    }

    // Training simulation
    const trainingCanvas = document.getElementById('trainingCanvas');
    if (trainingCanvas) {
        app.animations.training = initTrainingSimulation(trainingCanvas);

        document.getElementById('startTraining')?.addEventListener('click', () => {
            app.animations.training.start();
        });

        document.getElementById('stopTraining')?.addEventListener('click', () => {
            app.animations.training.stop();
        });
    }

    // Interactive tree builder
    const builderCanvas = document.getElementById('builderCanvas');
    if (builderCanvas) {
        app.animations.builder = initTreeBuilder(builderCanvas);

        document.getElementById('buildTree')?.addEventListener('click', () => {
            const input = document.getElementById('wordInput');
            if (input) {
                const words = input.value.split(',').map(w => w.trim());
                const info = app.animations.builder.buildTree(words);

                // Display tree info
                const resultDiv = document.getElementById('builderResult');
                if (resultDiv && info.nodeCount > 0) {
                    resultDiv.innerHTML = `
                        <div style="margin-top: 1rem; padding: 1rem; background: rgba(255,255,255,0.05); border-radius: 0.5rem;">
                            <h4 style="color: #00d4ff; margin-bottom: 0.5rem;">Tree Statistics:</h4>
                            <p style="color: #b4b9d6;">📊 Total Nodes: <strong>${info.nodeCount}</strong></p>
                            <p style="color: #b4b9d6;">📏 Tree Depth: <strong>${info.depth}</strong></p>
                            <p style="color: #b4b9d6;">🍃 Leaf Nodes: <strong>${info.leafCount}</strong></p>
                            <p style="color: #b4b9d6;">📝 Words: <strong>${info.words.join(', ')}</strong></p>
                        </div>
                    `;
                }
            }
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
