/**
 * Transformer Architecture Animation
 * Visualizes complete transformer or multi-head attention
 */

export function initTransformerAnimation(canvas, type = 'full') {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    let isPlaying = false;
    let animationId = null;
    let progress = 0;

    const colors = {
        encoder: '#3b82f6',
        decoder: '#8b5cf6',
        attention: '#00d4ff',
        ffn: '#10b981',
        layer: '#f59e0b'
    };

    /**
     * Draw function based on type
     */
    function draw() {
        ctx.fillStyle = '#0a0e27';
        ctx.fillRect(0, 0, width, height);

        if (type === 'multihead') {
            drawMultiHeadAttention();
        } else {
            drawFullArchitecture();
        }
    }

    /**
     * Draw multi-head attention
     */
    function drawMultiHeadAttention() {
        const centerX = width / 2;
        const numHeads = 8;
        const headWidth = 60;
        const headHeight = 80;
        const spacing = 10;
        const totalWidth = numHeads * headWidth + (numHeads - 1) * spacing;
        const startX = centerX - totalWidth / 2;

        // Draw input
        drawBox(centerX - 100, 50, 200, 40, colors.encoder, 'Input Embeddings');

        // Draw split lines
        if (progress > 0.2) {
            for (let i = 0; i < numHeads; i++) {
                const headX = startX + i * (headWidth + spacing);
                const headY = 150;

                drawArrow(centerX, 90, headX + headWidth / 2, headY, colors.attention, Math.min((progress - 0.2) * 2, 1));
            }
        }

        // Draw heads
        if (progress > 0.4) {
            for (let i = 0; i < numHeads; i++) {
                const headX = startX + i * (headWidth + spacing);
                const headY = 150;
                const headProgress = Math.min(Math.max((progress - 0.4 - i * 0.05) * 3, 0), 1);

                if (headProgress > 0) {
                    ctx.globalAlpha = headProgress;
                    drawBox(headX, headY, headWidth, headHeight, colors.attention, `H${i + 1}`, 0.7);
                    ctx.globalAlpha = 1;
                }
            }
        }

        // Draw concat
        if (progress > 0.7) {
            const concatY = 280;
            drawBox(centerX - 100, concatY, 200, 40, colors.ffn, 'Concatenate');

            // Draw lines from heads to concat
            for (let i = 0; i < numHeads; i++) {
                const headX = startX + i * (headWidth + spacing);
                drawArrow(headX + headWidth / 2, 230, centerX, concatY, colors.ffn, Math.min((progress - 0.7) * 2, 1));
            }
        }

        // Draw output
        if (progress > 0.85) {
            drawBox(centerX - 100, 360, 200, 40, colors.encoder, 'Output');
            drawArrow(centerX, 320, centerX, 360, colors.encoder, Math.min((progress - 0.85) * 3, 1));
        }
    }

    /**
     * Draw full transformer architecture
     */
    function drawFullArchitecture() {
        const leftX = width * 0.25;
        const rightX = width * 0.75;
        const blockWidth = 180;
        const blockHeight = 60;
        const spacing = 40;

        let currentY = 50;

        // Encoder side
        ctx.fillStyle = '#ffffff';
        ctx.font = '18px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('ENCODER', leftX, 30);

        // Input embedding
        if (progress > 0.1) {
            drawBox(leftX - blockWidth / 2, currentY, blockWidth, blockHeight, colors.encoder, 'Input\nEmbedding + PE');
        }
        currentY += blockHeight + spacing;

        // Encoder layers
        if (progress > 0.2) {
            drawBox(leftX - blockWidth / 2, currentY, blockWidth, blockHeight, colors.attention, 'Multi-Head\nAttention');
        }
        currentY += blockHeight + 20;

        if (progress > 0.3) {
            drawBox(leftX - blockWidth / 2, currentY, blockWidth, blockHeight, colors.ffn, 'Feed Forward\nNetwork');
        }
        currentY += blockHeight + spacing;

        if (progress > 0.4) {
            drawBox(leftX - blockWidth / 2, currentY, blockWidth, blockHeight, colors.layer, 'Layer Norm\n& Residual');
        }

        // Decoder side
        currentY = 50;
        ctx.fillStyle = '#ffffff';
        ctx.font = '18px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('DECODER', rightX, 30);

        // Output embedding
        if (progress > 0.5) {
            drawBox(rightX - blockWidth / 2, currentY, blockWidth, blockHeight, colors.decoder, 'Output\nEmbedding + PE');
        }
        currentY += blockHeight + spacing;

        // Decoder layers
        if (progress > 0.6) {
            drawBox(rightX - blockWidth / 2, currentY, blockWidth, blockHeight, colors.attention, 'Masked\nSelf-Attention');
        }
        currentY += blockHeight + 20;

        if (progress > 0.7) {
            drawBox(rightX - blockWidth / 2, currentY, blockWidth, blockHeight, colors.encoder, 'Cross\nAttention');

            // Draw connection from encoder to decoder
            const encoderY = 150;
            drawArrow(leftX + blockWidth / 2, encoderY, rightX - blockWidth / 2, currentY + blockHeight / 2, colors.encoder, 0.5);
        }
        currentY += blockHeight + 20;

        if (progress > 0.8) {
            drawBox(rightX - blockWidth / 2, currentY, blockWidth, blockHeight, colors.ffn, 'Feed Forward\nNetwork');
        }
        currentY += blockHeight + spacing;

        // Final output
        if (progress > 0.9) {
            drawBox(rightX - blockWidth / 2, currentY + 20, blockWidth, blockHeight, colors.decoder, 'Linear +\nSoftmax');
        }
    }

    /**
     * Helper: Draw box
     */
    function drawBox(x, y, w, h, color, text, fontSize = 1) {
        // Draw box with gradient
        const gradient = ctx.createLinearGradient(x, y, x, y + h);
        gradient.addColorStop(0, color + '40');
        gradient.addColorStop(1, color + '10');

        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, w, h);

        // Draw border
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, w, h);

        // Draw text
        if (text) {
            ctx.fillStyle = '#ffffff';
            ctx.font = `${14 * fontSize}px Inter`;
            ctx.textAlign = 'center';

            const lines = text.split('\n');
            const lineHeight = 18 * fontSize;
            const startY = y + h / 2 - (lines.length - 1) * lineHeight / 2;

            lines.forEach((line, i) => {
                ctx.fillText(line, x + w / 2, startY + i * lineHeight);
            });
        }
    }

    /**
     * Helper: Draw arrow
     */
    function drawArrow(x1, y1, x2, y2, color, alpha = 1) {
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineWidth = 2;

        // Draw line
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        // Draw arrowhead
        const angle = Math.atan2(y2 - y1, x2 - x1);
        const headLength = 10;

        ctx.beginPath();
        ctx.moveTo(x2, y2);
        ctx.lineTo(
            x2 - headLength * Math.cos(angle - Math.PI / 6),
            y2 - headLength * Math.sin(angle - Math.PI / 6)
        );
        ctx.lineTo(
            x2 - headLength * Math.cos(angle + Math.PI / 6),
            y2 - headLength * Math.sin(angle + Math.PI / 6)
        );
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }

    /**
     * Animation loop
     */
    function animate() {
        if (!isPlaying) return;

        progress += 0.005;
        if (progress > 1) progress = 0;

        draw();
        animationId = requestAnimationFrame(animate);
    }

    /**
     * Play animation
     */
    function play(selectedHead = 'all') {
        isPlaying = true;
        progress = 0;
        animate();
    }

    /**
     * Stop animation
     */
    function stop() {
        isPlaying = false;
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    }

    /**
     * Reset
     */
    function reset() {
        stop();
        progress = 0;
        draw();
    }

    // Initial draw
    draw();

    return {
        play,
        stop,
        reset,
        draw
    };
}
