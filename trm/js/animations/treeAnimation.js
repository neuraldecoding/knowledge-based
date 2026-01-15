/**
 * Tree Animation - visualizes tree structures
 */

export function initTreeAnimation(canvas, mode = 'basic') {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    const colors = {
        leaf: '#f59e0b',
        internal: '#3b82f6',
        root: '#8b5cf6',
        edge: '#00d4ff'
    };

    // Sample tree structure
    const tree = {
        value: 'root',
        left: {
            value: 'left',
            left: { value: 'L1', isLeaf: true },
            right: { value: 'L2', isLeaf: true }
        },
        right: {
            value: 'right',
            left: { value: 'R1', isLeaf: true },
            right: { value: 'R2', isLeaf: true }
        }
    };

    function draw() {
        ctx.fillStyle = '#0a0e27';
        ctx.fillRect(0, 0, width, height);

        if (mode === 'basic') {
            drawBasicTree();
        } else {
            drawArchitectureTree();
        }
    }

    function drawBasicTree() {
        const startX = width / 2;
        const startY = 50;
        const levelGap = 80;
        const nodeRadius = 25;

        drawNode(startX, startY, tree, 0, levelGap, nodeRadius, 150);
    }

    function drawNode(x, y, node, level, levelGap, radius, hSpacing) {
        if (!node) return;

        // Draw edges to children
        if (node.left) {
            const childX = x - hSpacing / (level + 1);
            const childY = y + levelGap;
            drawEdge(x, y + radius, childX, childY - radius);
            drawNode(childX, childY, node.left, level + 1, levelGap, radius, hSpacing);
        }

        if (node.right) {
            const childX = x + hSpacing / (level + 1);
            const childY = y + levelGap;
            drawEdge(x, y + radius, childX, childY - radius);
            drawNode(childX, childY, node.right, level + 1, levelGap, radius, hSpacing);
        }

        // Draw node
        const color = node.isLeaf ? colors.leaf : (level === 0 ? colors.root : colors.internal);

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw label
        ctx.fillStyle = '#ffffff';
        ctx.font = '14px Inter';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.value, x, y);
    }

    function drawEdge(x1, y1, x2, y2) {
        ctx.strokeStyle = colors.edge;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    function drawArchitectureTree() {
        // Draw example showing word embeddings + composition
        const startY = 80;
        const nodeSize = 30;

        // Title
        ctx.fillStyle = '#ffffff';
        ctx.font = '18px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('Tiny Recursive Model Architecture', width / 2, 30);

        // Leaves (words)
        const words = ['very', 'good'];
        const leafY = startY + 150;
        const spacing = 200;
        const startX = width / 2 - spacing / 2;

        words.forEach((word, i) => {
            const x = startX + i * spacing;

            // Leaf node
            drawCircle(x, leafY, nodeSize, colors.leaf, word);

            // Embedding arrow
            drawArrow(x, leafY - nodeSize, x, leaf Y - 60);

            // Embedding box
            ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.fillRect(x - 40, leafY - 90, 80, 20);
            ctx.strokeStyle = colors.leaf;
            ctx.strokeRect(x - 40, leafY - 90, 80, 20);

            ctx.fillStyle = '#ffffff';
            ctx.font = '12px JetBrains Mono';
            ctx.fillText('E[' + word + ']', x, leafY - 80);
        });

        // Parent node
        const parentY = startY + 50;
        const parentX = width / 2;

        drawCircle(parentX, parentY, nodeSize, colors.internal, 'h');

        // Edges from leaves to parent
        words.forEach((_, i) => {
            const x = startX + i * spacing;
            drawEdge(x, leafY - nodeSize, parentX, parentY + nodeSize);
        });

        // Composition function label
        ctx.fillStyle = colors.internal;
        ctx.font = '14px Inter';
        ctx.fillText('tanh(W[h₁;h₂] + b)', parentX, parentY - 50);
    }

    function drawCircle(x, y, r, color, text) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();

        if (text) {
            ctx.fillStyle = '#ffffff';
            ctx.font = '14px Inter';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(text, x, y);
        }
    }

    function drawArrow(x1, y1, x2, y2) {
        ctx.strokeStyle = colors.edge;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        // Arrowhead
        const angle = Math.atan2(y2 - y1, x2 - x1);
        const headLength = 10;

        ctx.beginPath();
        ctx.moveTo(x2, y2);
        ctx.lineTo(
            x2 - headLength * Math.cos(angle - Math.PI / 6),
            y2 - headLength * Math.sin(angle - Math.PI / 6)
        );
        ctx.moveTo(x2, y2);
        ctx.lineTo(
            x2 - headLength * Math.cos(angle + Math.PI / 6),
            y2 - headLength * Math.sin(angle + Math.PI / 6)
        );
        ctx.stroke();
    }

    draw();

    return { draw };
}
