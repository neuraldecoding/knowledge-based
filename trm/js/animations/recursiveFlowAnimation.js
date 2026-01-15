/**
 * Recursive Flow Animation - shows forward pass through tree
 */

export function initRecursiveFlowAnimation(canvas) {
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
        active: '#00d4ff'
    };

    const steps = [
        'Leaf nodes: Get word embeddings',
        'Combine left children',
        'Combine right children',
        'Compute root representation',
        'Classification at root'
    ];

    function draw() {
        ctx.fillStyle = '#0a0e27';
        ctx.fillRect(0, 0, width, height);

        // Draw tree structure
        drawTreeStructure();

        // Highlight current step
        highlightStep(currentStep);

        // Show step description
        showStepDescription();
    }

    function drawTreeStructure() {
        const centerX = width / 2;
        const topY = 80;
        const nodeSize = 30;
        const levelGap = 100;
        const hGap = 120;

        // Root
        drawNode(centerX, topY, nodeSize, colors.root, 'ROOT', currentStep >= 3);

        // Level 2
        const l2Y = topY + levelGap;
        drawNode(centerX - hGap, l2Y, nodeSize, colors.internal, 'Left', currentStep >= 1);
        drawNode(centerX + hGap, l2Y, nodeSize, colors.internal, 'Right', currentStep >= 2);

        // Edges level 1-2
        drawEdge(centerX, topY + nodeSize, centerX - hGap, l2Y - nodeSize);
        drawEdge(centerX, topY + nodeSize, centerX + hGap, l2Y - nodeSize);

        // Leaves
        const l3Y = l2Y + levelGap;
        drawNode(centerX - hGap - 60, l3Y, nodeSize, colors.leaf, 'very', currentStep >= 0);
        drawNode(centerX - hGap + 60, l3Y, nodeSize, colors.leaf, 'bad', currentStep >= 0);
        drawNode(centerX + hGap - 60, l3Y, nodeSize, colors.leaf, 'very', currentStep >= 0);
        drawNode(centerX + hGap + 60, l3Y, nodeSize, colors.leaf, 'good', currentStep >= 0);

        // Edges level 2-3
        drawEdge(centerX - hGap, l2Y + nodeSize, centerX - hGap - 60, l3Y - nodeSize);
        drawEdge(centerX - hGap, l2Y + nodeSize, centerX - hGap + 60, l3Y - nodeSize);
        drawEdge(centerX + hGap, l2Y + nodeSize, centerX + hGap - 60, l3Y - nodeSize);
        drawEdge(centerX + hGap, l2Y + nodeSize, centerX + hGap + 60, l3Y - nodeSize);
    }

    function drawNode(x, y, r, color, text, active) {
        ctx.fillStyle = active ? colors.active : color;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();

        if (active) {
            ctx.strokeStyle = colors.active;
            ctx.lineWidth = 4;
            ctx.stroke();
        }

        ctx.fillStyle = '#ffffff';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, x, y);
    }

    function drawEdge(x1, y1, x2, y2) {
        ctx.strokeStyle = '#00d4ff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    function highlightStep(step) {
        // Visual highlighting is done in drawNode with active flag
    }

    function showStepDescription() {
        const statusEl = document.getElementById('forwardStatus');
        if (statusEl && currentStep < steps.length) {
            statusEl.textContent = `Step ${currentStep + 1}: ${steps[currentStep]}`;
        }
    }

    function play() {
        if (isPlaying) return;
        isPlaying = true;
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
