/**
 * Token Flow Animation
 * Visualizes self-attention interactions between tokens
 */

export function initTokenFlowAnimation() {
    const sentence = ['Kucing', 'itu', 'makan', 'ikan', 'di', 'dapur'];

    // Simulated attention weights (each row = one token attending to all others)
    const attentionWeights = [
        [0.6, 0.2, 0.1, 0.05, 0.03, 0.02], // Kucing
        [0.8, 0.1, 0.05, 0.03, 0.01, 0.01], // itu -> mostly to Kucing
        [0.2, 0.1, 0.5, 0.15, 0.03, 0.02], // makan
        [0.05, 0.02, 0.3, 0.6, 0.02, 0.01], // ikan -> mostly to makan
        [0.02, 0.01, 0.05, 0.05, 0.4, 0.47], // di -> to dapur
        [0.03, 0.01, 0.04, 0.05, 0.4, 0.47]  // dapur
    ];

    let currentWord = null;

    /**
     * Show attention for a specific word
     */
    function showAttention(word) {
        const wordIndex = sentence.indexOf(word);
        if (wordIndex === -1) return;

        currentWord = word;
        const weights = attentionWeights[wordIndex];

        // Create heatmap
        createHeatmap(wordIndex, weights);
    }

    /**
     * Create attention heatmap
     */
    function createHeatmap(sourceIndex, weights) {
        const container = document.getElementById('attentionHeatmap');
        if (!container) return;

        // Clear previous heatmap
        container.innerHTML = '';

        // Create explanation
        const explanation = document.createElement('div');
        explanation.className = 'attention-explanation';
        explanation.style.cssText = `
            margin-bottom: 1rem;
            padding: 1rem;
            background: rgba(0, 212, 255, 0.1);
            border-radius: 0.5rem;
            color: #b4b9d6;
        `;
        explanation.innerHTML = `
            <strong style="color: #00d4ff;">${sentence[sourceIndex]}</strong> memperhatikan kata-kata lain dengan bobot:
        `;
        container.appendChild(explanation);

        // Create heatmap grid
        const grid = document.createElement('div');
        grid.style.cssText = `
            display: grid;
            grid-template-columns: auto 1fr;
            gap: 0.5rem;
            align-items: center;
        `;

        sentence.forEach((word, i) => {
            const weight = weights[i];

            // Word label
            const label = document.createElement('div');
            label.textContent = word;
            label.style.cssText = `
                color: ${i === sourceIndex ? '#00d4ff' : '#ffffff'};
                font-weight: ${i === sourceIndex ? '600' : '400'};
                font-size: 0.9375rem;
            `;
            grid.appendChild(label);

            // Weight bar
            const barContainer = document.createElement('div');
            barContainer.style.cssText = `
                position: relative;
                height: 30px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 0.25rem;
                overflow: hidden;
            `;

            const bar = document.createElement('div');
            bar.style.cssText = `
                height: 100%;
                width: ${weight * 100}%;
                background: linear-gradient(90deg, #3b82f6, #8b5cf6);
                display: flex;
                align-items: center;
                justify-content: flex-end;
                padding-right: 0.5rem;
                color: white;
                font-family: 'JetBrains Mono', monospace;
                font-size: 0.75rem;
                font-weight: 600;
                transition: width 0.5s ease-out;
                animation: expandBar 0.5s ease-out;
            `;
            bar.textContent = weight.toFixed(2);

            barContainer.appendChild(bar);
            grid.appendChild(barContainer);
        });

        container.appendChild(grid);

        // Add animation keyframe
        if (!document.getElementById('heatmap-animation')) {
            const style = document.createElement('style');
            style.id = 'heatmap-animation';
            style.textContent = `
                @keyframes expandBar {
                    from { width: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    return {
        showAttention
    };
}
