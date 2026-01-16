/**
 * Backpropagation Animation - shows gradient flow from root to leaves
 */

export function initBackpropAnimation(canvas) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    let currentStep = 0;
    let isPlaying = false;
    let animationId = null;

    const colors = {
        leaf: '#f59e0b',
        internal: '#3b82f6',
        root: '#8b5cf6',
        gradient: '#ff006e',
        active: '#00d4ff'
    };

    const steps = [
        'Loss computed at root',
        'Gradient flows to internal nodes',
        'Gradient propagates to children',
        'Leaf gradients computed',
        'Parameters updated'
    ];

    function draw() {
        ctx.fillStyle = '#0a0e27';
        ctx.fillRect(0, 0, width, height);

        drawTreeStructure();
        highlightBackpropStep(currentStep);
        showStepDescription();
    }

    function drawTreeStructure() {
        const centerX = width / 2;
        const topY = 80;
        const nodeSize = 30;
        const levelGap = 100;
        const hGap = 120;

        // Root
        drawNode(centerX, topY, nodeSize, colors.root, 'ROOT', currentStep >= 0);

        // Level 2
        const l2Y = topY + levelGap;
        drawNode(centerX - hGap, l2Y, nodeSize, colors.internal, 'Left', currentStep >= 1);
        drawNode(centerX + hGap, l2Y, nodeSize, colors.internal, 'Right', currentStep >= 1);

        // Edges level 1-2 with gradient arrows
        if (currentStep >= 1) {
            drawGradientArrow(centerX, topY + nodeSize, centerX - hGap, l2Y - nodeSize);
            drawGradientArrow(centerX, topY + nodeSize, centerX + hGap, l2Y - nodeSize);
        } else {
            drawEdge(centerX, topY + nodeSize, centerX - hGap, l2Y - nodeSize);
            drawEdge(centerX, topY + nodeSize, centerX + hGap, l2Y - nodeSize);
        }

        // Leaves
        const l3Y = l2Y + levelGap;
        drawNode(centerX - hGap - 60, l3Y, nodeSize, colors.leaf, 'very', currentStep >= 3);
        drawNode(centerX - hGap + 60, l3Y, nodeSize, colors.leaf, 'bad', currentStep >= 3);
        drawNode(centerX + hGap - 60, l3Y, nodeSize, colors.leaf, 'very', currentStep >= 3);
        drawNode(centerX + hGap + 60, l3Y, nodeSize, colors.leaf, 'good', currentStep >= 3);

        // Edges level 2-3 with gradient arrows
        if (currentStep >= 2) {
            drawGradientArrow(centerX - hGap, l2Y + nodeSize, centerX - hGap - 60, l3Y - nodeSize);
            drawGradientArrow(centerX - hGap, l2Y + nodeSize, centerX - hGap + 60, l3Y - nodeSize);
            drawGradientArrow(centerX + hGap, l2Y + nodeSize, centerX + hGap - 60, l3Y - nodeSize);
            drawGradientArrow(centerX + hGap, l2Y + nodeSize, centerX + hGap + 60, l3Y - nodeSize);
        } else {
            drawEdge(centerX - hGap, l2Y + nodeSize, centerX - hGap - 60, l3Y - nodeSize);
            drawEdge(centerX - hGap, l2Y + nodeSize, centerX - hGap + 60, l3Y - nodeSize);
            drawEdge(centerX + hGap, l2Y + nodeSize, centerX + hGap - 60, l3Y - nodeSize);
            drawEdge(centerX + hGap, l2Y + nodeSize, centerX + hGap + 60, l3Y - nodeSize);
        }

        // Loss display at root
        if (currentStep === 0) {
            ctx.fillStyle = colors.gradient;
            ctx.font = '16px Inter';
            ctx.textAlign = 'center';
            ctx.fillText('Loss = 0.45', centerX, topY - 40);
        }
    }

    function drawNode(x, y, r, color, text, active) {
        // Glow effect for active nodes
        if (active) {
            ctx.shadowBlur = 20;
            ctx.shadowColor = colors.gradient;
        }

        ctx.fillStyle = active ? colors.gradient : color;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0;

        if (active) {
            ctx.strokeStyle = colors.gradient;
            ctx.lineWidth = 4;
            ctx.stroke();
        }

        // Node label
        ctx.fillStyle = '#ffffff';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, x, y);

        // Gradient value
        if (active && currentStep > 0) {
            ctx.fillStyle = colors.gradient;
            ctx.font = '10px JetBrains Mono';
            ctx.fillText('∇' + (Math.random() * 0.5).toFixed(2), x, y + r + 15);
        }
    }

    function drawEdge(x1, y1, x2, y2) {
        ctx.strokeStyle = '#00d4ff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    function drawGradientArrow(x1, y1, x2, y2) {
        // Gradient line
        const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
        gradient.addColorStop(0, colors.gradient);
        gradient.addColorStop(1, colors.active);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        // Arrowhead pointing down
        const angle = Math.atan2(y2 - y1, x2 - x1);
        const headLength = 12;

        ctx.fillStyle = colors.gradient;
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
    }

    function highlightBackpropStep(step) {
        // Highlighting is done in drawNode
    }

    function showStepDescription() {
        ctx.fillStyle = '#ffffff';
        ctx.font = '16px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(
            currentStep < steps.length ? `Step ${currentStep + 1}: ${steps[currentStep]}` : 'Backprop Complete!',
            width / 2,
            height - 30
        );
    }

    function play() {
        if (isPlaying) return;
        isPlaying = true;
        currentStep = 0;
        animate();
    }

    function animate() {
        if (!isPlaying || currentStep >= steps.length) {
            isPlaying = false;
            return;
        }

        draw();
        currentStep++;

        setTimeout(() => {
            animationId = requestAnimationFrame(animate);
        }, 1500);
    }

    function reset() {
        isPlaying = false;
        currentStep = 0;
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        draw();
    }

    draw();

    return { play, reset, draw };
}
