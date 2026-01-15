/**
 * Positional Encoding Animation
 * Visualizes sine/cosine positional encoding patterns
 */

export function initPositionalEncodingAnimation(canvas) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    let currentPosition = 0;
    let isAnimating = false;
    let animationId = null;

    const dModel = 64; // Model dimension for visualization
    const maxPosition = 50;

    /**
     * Calculate positional encoding
     */
    function getPositionalEncoding(pos, i) {
        const angle = pos / Math.pow(10000, (2 * i) / dModel);
        return i % 2 === 0 ? Math.sin(angle) : Math.cos(angle);
    }

    /**
     * Draw the visualization
     */
    function draw(position = currentPosition) {
        // Clear canvas
        ctx.fillStyle = '#0a0e27';
        ctx.fillRect(0, 0, width, height);

        // Draw heatmap of positional encoding
        const cellWidth = width / dModel;
        const cellHeight = 30;

        // Draw for multiple positions to show pattern
        const numPositions = Math.min(10, maxPosition);
        const rowHeight = height / numPositions;

        for (let pos = 0; pos < numPositions; pos++) {
            for (let dim = 0; dim < dModel; dim++) {
                const value = getPositionalEncoding(pos, dim);
                const normalized = (value + 1) / 2; // Map [-1, 1] to [0, 1]

                const x = dim * cellWidth;
                const y = pos * rowHeight;

                // Color based on value
                const hue = normalized * 240; // Blue to Red
                const alpha = 0.8;

                ctx.fillStyle = `hsla(${hue}, 70%, 50%, ${alpha})`;
                ctx.fillRect(x, y, cellWidth - 1, rowHeight - 1);
            }

            // Draw position label
            ctx.fillStyle = '#ffffff';
            ctx.font = '12px Inter';
            ctx.textAlign = 'left';
            ctx.fillText(`pos=${pos}`, 5, y + rowHeight / 2 + 4);
        }

        // Highlight current position
        if (position < numPositions) {
            ctx.strokeStyle = '#00d4ff';
            ctx.lineWidth = 3;
            ctx.strokeRect(0, position * rowHeight, width, rowHeight);
        }

        // Draw legend
        drawLegend();
    }

    /**
     * Draw legend
     */
    function drawLegend() {
        const legendY = height - 30;
        const legendWidth = 200;
        const legendX = width - legendWidth - 20;

        // Draw gradient bar
        const gradient = ctx.createLinearGradient(legendX, 0, legendX + legendWidth, 0);
        gradient.addColorStop(0, 'hsl(0, 70%, 50%)');
        gradient.addColorStop(0.5, 'hsl(120, 70%, 50%)');
        gradient.addColorStop(1, 'hsl(240, 70%, 50%)');

        ctx.fillStyle = gradient;
        ctx.fillRect(legendX, legendY, legendWidth, 15);

        // Draw labels
        ctx.fillStyle = '#b4b9d6';
        ctx.font = '11px Inter';
        ctx.textAlign = 'left';
        ctx.fillText('-1', legendX - 15, legendY + 12);
        ctx.fillText('0', legendX + legendWidth / 2 - 5, legendY + 12);
        ctx.fillText('1', legendX + legendWidth + 5, legendY + 12);
    }

    /**
     * Update position
     */
    function updatePosition(pos) {
        currentPosition = pos;
        draw(pos);
    }

    /**
     * Animate through positions
     */
    function animatePositions() {
        if (!isAnimating) return;

        currentPosition = (currentPosition + 1) % maxPosition;
        draw(currentPosition);

        // Update slider if exists
        const slider = document.getElementById('posSlider');
        const valueSpan = document.getElementById('posValue');
        if (slider) slider.value = currentPosition;
        if (valueSpan) valueSpan.textContent = currentPosition;

        setTimeout(() => {
            animationId = requestAnimationFrame(animatePositions);
        }, 200);
    }

    /**
     * Start animation
     */
    function animate() {
        isAnimating = true;
        animatePositions();
    }

    /**
     * Stop animation
     */
    function stop() {
        isAnimating = false;
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    }

    // Initial draw
    draw();

    return {
        updatePosition,
        animate,
        stop,
        draw
    };
}
