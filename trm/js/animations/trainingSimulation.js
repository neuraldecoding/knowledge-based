/**
 * Training Progress Animation - visualizes training metrics
 */

export function initTrainingSimulation(canvas) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    let isTraining = false;
    let epoch = 0;
    let maxEpochs = 50;
    let lossHistory = [];
    let accuracyHistory = [];

    const colors = {
        loss: '#ff006e',
        accuracy: '#00d4ff',
        grid: 'rgba(255, 255, 255, 0.1)',
        text: '#ffffff',
        textMuted: '#b4b9d6'
    };

    function draw() {
        ctx.fillStyle = '#0a0e27';
        ctx.fillRect(0, 0, width, height);

        drawGrid();
        drawAxes();
        drawMetrics();
        drawLegend();
        drawEpochInfo();
    }

    function drawGrid() {
        ctx.strokeStyle = colors.grid;
        ctx.lineWidth = 1;

        // Horizontal lines
        for (let i = 0; i <= 10; i++) {
            const y = 50 + (height - 150) * (i / 10);
            ctx.beginPath();
            ctx.moveTo(60, y);
            ctx.lineTo(width - 40, y);
            ctx.stroke();
        }

        // Vertical lines
        for (let i = 0; i <= 10; i++) {
            const x = 60 + (width - 100) * (i / 10);
            ctx.beginPath();
            ctx.moveTo(x, 50);
            ctx.lineTo(x, height - 100);
            ctx.stroke();
        }
    }

    function drawAxes() {
        ctx.strokeStyle = colors.text;
        ctx.lineWidth = 2;

        // Y-axis
        ctx.beginPath();
        ctx.moveTo(60, 50);
        ctx.lineTo(60, height - 100);
        ctx.stroke();

        // X-axis
        ctx.beginPath();
        ctx.moveTo(60, height - 100);
        ctx.lineTo(width - 40, height - 100);
        ctx.stroke();

        // Labels
        ctx.fillStyle = colors.textMuted;
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';

        // Y-axis label
        ctx.save();
        ctx.translate(20, height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('Loss / Accuracy', 0, 0);
        ctx.restore();

        // X-axis label
        ctx.fillText('Epoch', width / 2, height - 65);

        // Y-axis ticks
        ctx.textAlign = 'right';
        for (let i = 0; i <= 10; i++) {
            const y = 50 + (height - 150) * (i / 10);
            const value = (1 - i / 10).toFixed(1);
            ctx.fillText(value, 50, y + 4);
        }

        // X-axis ticks
        ctx.textAlign = 'center';
        for (let i = 0; i <= 5; i++) {
            const x = 60 + (width - 100) * (i / 5);
            const value = Math.floor((maxEpochs * i) / 5);
            ctx.fillText(value, x, height - 85);
        }
    }

    function drawMetrics() {
        if (lossHistory.length < 2) return;

        const xScale = (width - 100) / maxEpochs;
        const yScale = height - 150;

        // Draw loss line
        ctx.strokeStyle = colors.loss;
        ctx.lineWidth = 3;
        ctx.beginPath();
        lossHistory.forEach((loss, i) => {
            const x = 60 + i * xScale;
            const y = 50 + yScale * (1 - loss);
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.stroke();

        // Draw accuracy line
        ctx.strokeStyle = colors.accuracy;
        ctx.lineWidth = 3;
        ctx.beginPath();
        accuracyHistory.forEach((acc, i) => {
            const x = 60 + i * xScale;
            const y = 50 + yScale * (1 - acc);
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.stroke();

        // Draw points
        lossHistory.forEach((loss, i) => {
            const x = 60 + i * xScale;
            const y = 50 + yScale * (1 - loss);
            ctx.fillStyle = colors.loss;
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fill();
        });

        accuracyHistory.forEach((acc, i) => {
            const x = 60 + i * xScale;
            const y = 50 + yScale * (1 - acc);
            ctx.fillStyle = colors.accuracy;
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    function drawLegend() {
        const legendX = width - 200;
        const legendY = 70;

        // Loss
        ctx.fillStyle = colors.loss;
        ctx.fillRect(legendX, legendY, 20, 3);
        ctx.fillStyle = colors.text;
        ctx.font = '14px Inter';
        ctx.textAlign = 'left';
        ctx.fillText('Loss', legendX + 30, legendY + 4);

        // Accuracy
        ctx.fillStyle = colors.accuracy;
        ctx.fillRect(legendX, legendY + 25, 20, 3);
        ctx.fillStyle = colors.text;
        ctx.fillText('Accuracy', legendX + 30, legendY + 29);
    }

    function drawEpochInfo() {
        if (lossHistory.length === 0) return;

        const currentLoss = lossHistory[lossHistory.length - 1];
        const currentAcc = accuracyHistory[accuracyHistory.length - 1];

        ctx.fillStyle = colors.text;
        ctx.font = 'bold 16px Inter';
        ctx.textAlign = 'left';
        ctx.fillText(`Epoch: ${epoch}/${maxEpochs}`, 70, 30);

        ctx.font = '14px Inter';
        ctx.fillStyle = colors.loss;
        ctx.fillText(`Loss: ${currentLoss.toFixed(4)}`, width - 200, 120);
        ctx.fillStyle = colors.accuracy;
        ctx.fillText(`Acc: ${(currentAcc * 100).toFixed(1)}%`, width - 200, 140);
    }

    function start() {
        if (isTraining) return;

        isTraining = true;
        epoch = 0;
        lossHistory = [];
        accuracyHistory = [];

        train();
    }

    function train() {
        if (!isTraining || epoch >= maxEpochs) {
            isTraining = false;
            return;
        }

        // Simulate training with realistic curves
        const progress = epoch / maxEpochs;

        // Loss decreases with some noise
        const baseLoss = 0.8 * Math.exp(-3 * progress) + 0.1;
        const noise = (Math.random() - 0.5) * 0.05;
        const loss = Math.max(0.05, Math.min(1, baseLoss + noise));

        // Accuracy increases with some noise
        const baseAcc = 1 - 0.7 * Math.exp(-3 * progress);
        const accNoise = (Math.random() - 0.5) * 0.03;
        const accuracy = Math.max(0, Math.min(1, baseAcc + accNoise));

        lossHistory.push(loss);
        accuracyHistory.push(accuracy);

        epoch++;
        draw();

        setTimeout(train, 100);
    }

    function stop() {
        isTraining = false;
    }

    function reset() {
        isTraining = false;
        epoch = 0;
        lossHistory = [];
        accuracyHistory = [];
        draw();
    }

    draw();

    return { start, stop, reset, draw };
}
