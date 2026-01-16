/**
 * Interactive Tree Builder - allows users to build and visualize their own trees
 */

export function initTreeBuilder(canvas) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    let words = ['very', 'good'];
    let tree = null;

    const colors = {
        leaf: '#f59e0b',
        internal: '#3b82f6',
        root: '#8b5cf6',
        edge: '#00d4ff',
        text: '#ffffff'
    };

    class TreeNode {
        constructor(value, isLeaf = false) {
            this.value = value;
            this.isLeaf = isLeaf;
            this.left = null;
            this.right = null;
        }
    }

    function buildBinaryTree(words) {
        if (words.length === 0) return null;
        if (words.length === 1) {
            return new TreeNode(words[0], true);
        }

        // Build balanced binary tree
        const mid = Math.floor(words.length / 2);
        const root = new TreeNode(`h${words.length}`);
        root.left = buildBinaryTree(words.slice(0, mid));
        root.right = buildBinaryTree(words.slice(mid));
        return root;
    }

    function draw() {
        ctx.fillStyle = '#0a0e27';
        ctx.fillRect(0, 0, width, height);

        if (!tree) {
            drawEmptyState();
            return;
        }

        const startX = width / 2;
        const startY = 60;
        const levelGap = 80;
        const nodeRadius = 25;

        drawNode(startX, startY, tree, 0, levelGap, nodeRadius, Math.min(width / 2 - 50, 250));
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
        ctx.font = node.isLeaf ? '12px Inter' : 'bold 12px Inter';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.value, x, y);

        // Draw vector representation
        if (node.isLeaf) {
            ctx.font = '10px JetBrains Mono';
            ctx.fillStyle = colors.leaf;
            ctx.fillText(`E[${node.value}]`, x, y + radius + 15);
        }
    }

    function drawEdge(x1, y1, x2, y2) {
        ctx.strokeStyle = colors.edge;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    function drawEmptyState() {
        ctx.fillStyle = colors.text;
        ctx.font = '16px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('Enter words above to build a tree', width / 2, height / 2);
    }

    function buildTree(newWords) {
        words = newWords.filter(w => w.trim().length > 0);
        if (words.length === 0) {
            tree = null;
        } else {
            tree = buildBinaryTree(words);
        }
        draw();
        return getTreeInfo();
    }

    function getTreeInfo() {
        if (!tree) {
            return {
                nodeCount: 0,
                depth: 0,
                leafCount: 0
            };
        }

        function countNodes(node) {
            if (!node) return 0;
            return 1 + countNodes(node.left) + countNodes(node.right);
        }

        function getDepth(node) {
            if (!node) return 0;
            return 1 + Math.max(getDepth(node.left), getDepth(node.right));
        }

        function countLeaves(node) {
            if (!node) return 0;
            if (node.isLeaf) return 1;
            return countLeaves(node.left) + countLeaves(node.right);
        }

        return {
            nodeCount: countNodes(tree),
            depth: getDepth(tree),
            leafCount: countLeaves(tree),
            words: words
        };
    }

    // Initial build
    tree = buildBinaryTree(words);
    draw();

    return { buildTree, draw, getTreeInfo };
}
