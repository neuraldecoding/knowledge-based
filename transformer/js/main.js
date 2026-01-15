/**
 * Main entry point for Transformer Tutorial
 * Initializes all modules and sets up the application
 */

import Navigation from './navigation.js';
import { initAttentionAnimation } from './animations/attentionAnimation.js';
import { initTokenFlowAnimation } from './animations/tokenFlowAnimation.js';
import { initPositionalEncodingAnimation } from './animations/positionalEncodingAnimation.js';
import { initTransformerAnimation } from './animations/transformerAnimation.js';
import { initAttentionDemo } from './interactive/attentionDemo.js';

// Application state
const app = {
    navigation: null,
    animations: {},
    currentSection: 'intro'
};

/**
 * Initialize the application
 */
function init() {
    console.log('🤖 Initializing Transformer Tutorial...');
    
    // Initialize navigation
    app.navigation = new Navigation();
    
    // Initialize animations when sections become active
    setupAnimationInitializers();
    
    // Setup scroll animations
    setupScrollAnimations();
    
    // Setup interactive elements
    setupInteractiveElements();
    
    console.log('✅ Transformer Tutorial ready!');
}

/**
 * Setup animation initializers for each section
 */
function setupAnimationInitializers() {
    // Attention Animation (Section 3)
    const attentionCanvas = document.getElementById('attentionCanvas');
    if (attentionCanvas) {
        app.animations.attention = initAttentionAnimation(attentionCanvas);
    }
    
    // Token Flow Animation (Section 4)
    const tokenFlowCanvas = document.getElementById('selfAttentionDemo');
    if (tokenFlowCanvas) {
        app.animations.tokenFlow = initTokenFlowAnimation();
    }
    
    // Multi-head Animation (Section 5)
    const multiheadCanvas = document.getElementById('multiheadCanvas');
    if (multiheadCanvas) {
        app.animations.multihead = initTransformerAnimation(multiheadCanvas, 'multihead');
    }
    
    // Positional Encoding Animation (Section 6)
    const positionalCanvas = document.getElementById('positionalCanvas');
    if (positionalCanvas) {
        app.animations.positional = initPositionalEncodingAnimation(positionalCanvas);
    }
    
    // Full Architecture Animation (Section 7)
    const architectureCanvas = document.getElementById('architectureCanvas');
    if (architectureCanvas) {
        app.animations.architecture = initTransformerAnimation(architectureCanvas, 'full');
    }
}

/**
 * Setup scroll-triggered animations
 */
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all cards
    const cards = document.querySelectorAll('.content-card');
    cards.forEach(card => {
        card.classList.add('scroll-fade-in');
        observer.observe(card);
    });
}

/**
 * Setup interactive elements
 */
function setupInteractiveElements() {
    // Word box click handlers for self-attention demo
    const wordBoxes = document.querySelectorAll('.word-box');
    wordBoxes.forEach(box => {
        box.addEventListener('click', handleWordClick);
    });
    
    // Positional encoding slider
    const posSlider = document.getElementById('posSlider');
    if (posSlider) {
        posSlider.addEventListener('input', handlePositionalSlider);
    }
    
    // Animation control buttons
    setupAnimationControls();
}

/**
 * Handle word click in self-attention demo
 */
function handleWordClick(event) {
    const wordBoxes = document.querySelectorAll('.word-box');
    wordBoxes.forEach(box => box.classList.remove('selected'));
    
    event.target.classList.add('selected');
    
    const word = event.target.dataset.word;
    if (app.animations.tokenFlow && app.animations.tokenFlow.showAttention) {
        app.animations.tokenFlow.showAttention(word);
    }
    
    // Initialize attention demo if needed
    const demoContainer = document.getElementById('attentionHeatmap');
    if (demoContainer && !app.animations.attentionDemo) {
        app.animations.attentionDemo = initAttentionDemo(demoContainer);
    }
    
    if (app.animations.attentionDemo) {
        app.animations.attentionDemo.highlightWord(word);
    }
}

/**
 * Handle positional encoding slider
 */
function handlePositionalSlider(event) {
    const position = parseInt(event.target.value);
    const valueSpan = document.getElementById('posValue');
    if (valueSpan) {
        valueSpan.textContent = position;
    }
    
    if (app.animations.positional && app.animations.positional.updatePosition) {
        app.animations.positional.updatePosition(position);
    }
}

/**
 * Setup animation control buttons
 */
function setupAnimationControls() {
    // Attention animation controls
    const playAttention = document.getElementById('playAttention');
    const resetAttention = document.getElementById('resetAttention');
    
    if (playAttention) {
        playAttention.addEventListener('click', () => {
            if (app.animations.attention && app.animations.attention.play) {
                app.animations.attention.play();
            }
        });
    }
    
    if (resetAttention) {
        resetAttention.addEventListener('click', () => {
            if (app.animations.attention && app.animations.attention.reset) {
                app.animations.attention.reset();
            }
        });
    }
    
    // Multi-head animation controls
    const playMultihead = document.getElementById('playMultihead');
    const headSelector = document.getElementById('headSelector');
    
    if (playMultihead) {
        playMultihead.addEventListener('click', () => {
            if (app.animations.multihead && app.animations.multihead.play) {
                const selectedHead = headSelector ? headSelector.value : 'all';
                app.animations.multihead.play(selectedHead);
            }
        });
    }
    
    // Positional encoding animation
    const animatePositional = document.getElementById('animatePositional');
    if (animatePositional) {
        animatePositional.addEventListener('click', () => {
            if (app.animations.positional && app.animations.positional.animate) {
                app.animations.positional.animate();
            }
        });
    }
    
    // Architecture animation
    const playArchitecture = document.getElementById('playArchitecture');
    if (playArchitecture) {
        playArchitecture.addEventListener('click', () => {
            if (app.animations.architecture && app.animations.architecture.play) {
                app.animations.architecture.play();
            }
        });
    }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

export default app;
