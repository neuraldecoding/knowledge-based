/**
 * Interactive Attention Demo
 * Allows users to input their own sentences and see attention
 */

export function initAttentionDemo(container) {
    let selectedWord = null;

    // Sample attention patterns for demo
    const demoSentences = {
        'Kucing': { words: ['Kucing', 'itu', 'makan', 'ikan'], weights: [0.6, 0.2, 0.1, 0.1] },
        'itu': { words: ['Kucing', 'itu', 'makan', 'ikan'], weights: [0.8, 0.1, 0.05, 0.05] },
        'makan': { words: ['Kucing', 'itu', 'makan', 'ikan'], weights: [0.2, 0.1, 0.5, 0.2] },
        'ikan': { words: ['Kucing', 'itu', 'makan', 'ikan'], weights: [0.05, 0.02, 0.3, 0.63] }
    };

    /**
     * Highlight a word and show its attention
     */
    function highlightWord(word) {
        selectedWord = word;
        const data = demoSentences[word];

        if (!data) {
            console.warn(`No attention data for word: ${word}`);
            return;
        }

        // Create visualization
        createVisualization(word, data);
    }

    /**
     * Create attention visualization
     */
    function createVisualization(sourceWord, data) {
        container.innerHTML = '';

        // Create title
        const title = document.createElement('div');
        title.style.cssText = `
            margin-bottom: 1rem;
            font-size: 1rem;
            color: #00d4ff;
            font-weight: 600;
        `;
        title.textContent = `Attention dari "${sourceWord}":`;
        container.appendChild(title);

        // Create attention matrix
        const matrix = document.createElement('div');
        matrix.style.cssText = `
            display: grid;
            gap: 0.5rem;
        `;

        data.words.forEach((targetWord, i) => {
            const weight = data.weights[i];

            // Create row
            const row = document.createElement('div');
            row.style.cssText = `
                display: grid;
                grid-template-columns: 100px 1fr 60px;
                gap: 0.75rem;
                align-items: center;
            `;

            // Word label
            const label = document.createElement('div');
            label.textContent = targetWord;
            label.style.cssText = `
                color: ${targetWord === sourceWord ? '#00d4ff' : '#ffffff'};
                font-weight: ${targetWord === sourceWord ? '600' : '400'};
            `;

            // Weight bar
            const barContainer = document.createElement('div');
            barContainer.style.cssText = `
                height: 28px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 0.25rem;
                overflow: hidden;
                position: relative;
            `;

            const bar = document.createElement('div');
            const hue = 200 + weight * 80; // Blue to purple
            bar.style.cssText = `
                height: 100%;
                width: 0;
                background: linear-gradient(90deg, hsl(${hue}, 70%, 50%), hsl(${hue + 40}, 70%, 50%));
                transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            `;

            // Animate bar
            setTimeout(() => {
                bar.style.width = `${weight * 100}%`;
            }, i * 100);

            barContainer.appendChild(bar);

            // Weight value
            const value = document.createElement('div');
            value.textContent = weight.toFixed(2);
            value.style.cssText = `
                font-family: 'JetBrains Mono', monospace;
                color: #b4b9d6;
                text-align: right;
                font-size: 0.875rem;
            `;

            row.appendChild(label);
            row.appendChild(barContainer);
            row.appendChild(value);
            matrix.appendChild(row);
        });

        container.appendChild(matrix);

        // Add explanation
        const explanation = document.createElement('div');
        explanation.style.cssText = `
            margin-top: 1rem;
            padding: 0.75rem;
            background: rgba(0, 212, 255, 0.05);
            border-left: 3px solid #00d4ff;
            border-radius: 0.25rem;
            color: #b4b9d6;
            font-size: 0.875rem;
        `;

        const maxWeightIdx = data.weights.indexOf(Math.max(...data.weights));
        const maxWord = data.words[maxWeightIdx];

        explanation.innerHTML = `
            💡 <strong>${sourceWord}</strong> paling memperhatikan 
            <strong style="color: #00d4ff;">${maxWord}</strong> 
            dengan bobot <strong>${data.weights[maxWeightIdx].toFixed(2)}</strong>
        `;

        container.appendChild(explanation);
    }

    /**
     * Initialize with default word
     */
    function init() {
        highlightWord('itu');
    }

    // Initialize
    init();

    return {
        highlightWord
    };
}
