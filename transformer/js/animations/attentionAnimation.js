/**
 * Attention Mechanism Animation
 * Visualizes the attention calculation process
 */

export function initAttentionAnimation(canvas) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    let animationFrame = 0;
    let isPlaying = false;
    let animationId = null;

    // Sample data
    const tokens = ['Kucing', 'itu', 'makan', 'ikan'];
    const colors = {
        query: '#3b82f6',
        key: '#10b981',
        value: '#8b5cf6',
        attention: '#00d4ff'
    };

    // Animation state
    const state = {
        step: 0, // 0: QKV, 1: Dot Product, 2: Softmax, 3: Weighted Sum
        progress: 0
    };

    /**
     * Draw the canvas
     */
    function draw() {
        // Clear canvas
        ctx.fillStyle = '#0a0e27';
        ctx.fillRect(0, 0, width, height);

        if (state.step === 0) {
            drawQKVStep();
        } else if (state.step === 1) {
            drawDotProductStep();
        } else if (state.step === 2) {
            drawSoftmaxStep();
        } else if (state.step === 3) {
            drawWeightedSumStep();
        }
    }

    /**
     * Draw QKV transformation step
     */
    function drawQKVStep() {
        const centerY = height / 2;
        const spacing = width / 5;

        // Draw token
        ctx.fillStyle = '#ffffff';
        ctx.font = '18px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('Token: "makan"', spacing, centerY - 60);

        // Draw embeddings
        drawVector(spacing, centerY, [0.2, -0.5, 0.8], '#ffffff', 'Embedding');

        // Draw transformations with animation
        const progress = Math.min(state.progress, 1);

        if (progress > 0.2) {
            const qX = spacing * 2;
            drawVector(qX, centerY, [0.3, -0.2, 0.9], colors.query, 'Query (Q)');
            drawArrow(spacing + 50, centerY, qX - 50, centerY, colors.query, progress);
        }

        if (progress > 0.5) {
            const kX = spacing * 3;
            drawVector(kX, centerY, [-0.1, 0.6, 0.4], colors.key, 'Key (K)');
            drawArrow(spacing + 50, centerY, kX - 50, centerY, colors.key, progress - 0.3);
        }

        if (progress > 0.8) {
            const vX = spacing * 4;
            drawVector(vX, centerY, [0.5, 0.2, -0.3], colors.value, 'Value (V)');
            drawArrow(spacing + 50, centerY, vX - 50, centerY, colors.value, progress - 0.6);
        }
    }

    /**
     * Draw dot product step
     */
    function drawDotProductStep() {
        const centerY = height / 2;

        ctx.fillStyle = '#ffffff';
        ctx.font = '20px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('Score = Q · Kᵀ', width / 2, 60);

        // Draw attention scores matrix
        const matrixSize = 4;
        const cellSize = 60;
        const startX = width / 2 - (matrixSize * cellSize) / 2;
        const startY = centerY - (matrixSize * cellSize) / 2;

        const scores = [
            [0.8, 0.3, 0.9, 0.2],
            [0.2, 0.7, 0.4, 0.3],
            [0.5, 0.1, 0.6, 0.8],
            [0.3, 0.5, 0.2, 0.7]
        ];

        for (let i = 0; i < matrixSize; i++) {
            for (let j = 0; j < matrixSize; j++) {
                const x = startX + j * cellSize;
                const y = startY + i * cellSize;
                const score = scores[i][j];

                // Animate cells appearing
                const cellProgress = Math.min(Math.max((state.progress - (i * 0.2 + j * 0.05)) * 2, 0), 1);

                if (cellProgress > 0) {
                    const alpha = cellProgress;
                    ctx.fillStyle = `rgba(0, 212, 255, ${score * alpha * 0.3})`;
                    ctx.fillRect(x, y, cellSize - 2, cellSize - 2);

                    ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.3})`;
                    ctx.strokeRect(x, y, cellSize - 2, cellSize - 2);

                    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
                    ctx.font = '16px JetBrains Mono';
                    ctx.textAlign = 'center';
                    ctx.fillText(score.toFixed(1), x + cellSize / 2, y + cellSize / 2 + 5);
                }
            }
        }

        // Draw labels
        ctx.fillStyle = '#b4b9d6';
        ctx.font = '14px Inter';
        for (let i = 0; i < matrixSize; i++) {
            ctx.fillText(tokens[i], startX - 40, startY + i * cellSize + cellSize / 2 + 5);
            ctx.fillText(tokens[i], startX + i * cellSize + cellSize / 2, startY - 20);
        }
    }

    /**
     * Draw softmax step
     */
    function drawSoftmaxStep() {
        const centerY = height / 2;

        ctx.fillStyle = '#ffffff';
        ctx.font = '20px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('Attention Weights = softmax(Score / √dₖ)', width / 2, 60);

        // Draw attention weights as bars
        const barWidth = 80;
        const barSpacing = 120;
        const startX = width / 2 - (tokens.length * barSpacing) / 2;

        const weights = [0.45, 0.15, 0.35, 0.05];
        const maxHeight = 200;

        tokens.forEach((token, i) => {
            const x = startX + i * barSpacing;
            const barHeight = weights[i] * maxHeight;
            const animatedHeight = barHeight * Math.min(state.progress * 1.5, 1);

            // Draw bar
            const gradient = ctx.createLinearGradient(x, centerY, x, centerY - animatedHeight);
            gradient.addColorStop(0, colors.attention);
            gradient.addColorStop(1, colors.value);

            ctx.fillStyle = gradient;
            ctx.fillRect(x, centerY, barWidth, -animatedHeight);

            // Draw border
            ctx.strokeStyle = '#00d4ff';
            ctx.lineWidth = 2;
            ctx.strokeRect(x, centerY, barWidth, -animatedHeight);

            // Draw value
            ctx.fillStyle = '#ffffff';
            ctx.font = '16px JetBrains Mono';
            ctx.textAlign = 'center';
            ctx.fillText(weights[i].toFixed(2), x + barWidth / 2, centerY - animatedHeight - 10);

            // Draw token label
            ctx.fillStyle = '#b4b9d6';
            ctx.font = '14px Inter';
            ctx.fillText(token, x + barWidth / 2, centerY + 30);
        });
    }

    /**
     * Draw weighted sum step
     */
    function drawWeightedSumStep() {
        const centerY = height / 2;

        ctx.fillStyle = '#ffffff';
        ctx.font = '20px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('Output = Σ (Attention × Value)', width / 2, 60);

        // Draw final output
        const progress = Math.min(state.progress, 1);

        if (progress > 0.3) {
            drawVector(width / 2, centerY, [0.4, 0.3, -0.1, 0.6, 0.2], colors.attention, 'Attention Output', 1.5);
        }

        // Draw contribution arrows
        const contributions = [
            { weight: 0.45, color: colors.query, label: 'Kucing (45%)' },
            { weight: 0.15, color: colors.key, label: 'itu (15%)' },
            { weight: 0.35, color: colors.value, label: 'makan (35%)' },
            { weight: 0.05, color: '#f59e0b', label: 'ikan (5%)' }
        ];

        contributions.forEach((c, i) => {
            const y = 150 + i * 50;
            const barWidth = c.weight * 200;
            const animatedWidth = barWidth * Math.min(progress * 1.5, 1);

            ctx.fillStyle = c.color;
            ctx.fillRect(50, y, animatedWidth, 30);

            ctx.fillStyle = '#ffffff';
            ctx.font = '14px Inter';
            ctx.textAlign = 'left';
            ctx.fillText(c.label, 260, y + 20);
        });
    }

    /**
     * Helper: Draw vector representation
     */
    function drawVector(x, y, values, color, label, scale = 1) {
        const boxWidth = 40 * scale;
        const boxHeight = 25 * scale;
        const spacing = 5 * scale;

        values.forEach((val, i) => {
            const vx = x + (i - values.length / 2) * (boxWidth + spacing);

            const alpha = Math.abs(val);
            ctx.fillStyle = `rgba(${hexToRgb(color)}, ${alpha})`;
            ctx.fillRect(vx, y, boxWidth, boxHeight);

            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.strokeRect(vx, y, boxWidth, boxHeight);

            ctx.fillStyle = '#ffffff';
            ctx.font = `${12 * scale}px JetBrains Mono`;
            ctx.textAlign = 'center';
            ctx.fillText(val.toFixed(1), vx + boxWidth / 2, y + boxHeight / 2 + 4);
        });

        // Draw label
        ctx.fillStyle = '#b4b9d6';
        ctx.font = `${14 * scale}px Inter`;
        ctx.textAlign = 'center';
        ctx.fillText(label, x, y + boxHeight + 25);
    }

    /**
     * Helper: Draw arrow
     */
    function drawArrow(x1, y1, x2, y2, color, progress = 1) {
        const dx = (x2 - x1) * progress;
        const dy = (y2 - y1) * progress;

        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x1 + dx, y1 + dy);
        ctx.stroke();

        // Arrow head
        const angle = Math.atan2(dy, dx);
        const headLength = 10;

        ctx.beginPath();
        ctx.moveTo(x1 + dx, y1 + dy);
        ctx.lineTo(
            x1 + dx - headLength * Math.cos(angle - Math.PI / 6),
            y1 + dy - headLength * Math.sin(angle - Math.PI / 6)
        );
        ctx.moveTo(x1 + dx, y1 + dy);
        ctx.lineTo(
            x1 + dx - headLength * Math.cos(angle + Math.PI / 6),
            y1 + dy - headLength * Math.sin(angle + Math.PI / 6)
        );
        ctx.stroke();
    }

    /**
     * Helper: Convert hex to RGB
     */
    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
            : '255, 255, 255';
    }

    /**
     * Animation loop
     */
    function animate() {
        if (!isPlaying) return;

        state.progress += 0.01;

        if (state.progress >= 1) {
            state.progress = 0;
            state.step = (state.step + 1) % 4;
        }

        draw();
        animationId = requestAnimationFrame(animate);
    }

    /**
     * Play animation
     */
    function play() {
        isPlaying = true;
        animate();
    }

    /**
     * Pause animation
     */
    function pause() {
        isPlaying = false;
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    }

    /**
     * Reset animation
     */
    function reset() {
        pause();
        state.step = 0;
        state.progress = 0;
        draw();
    }

    // Initial draw
    draw();

    return {
        play,
        pause,
        reset,
        draw
    };
}
