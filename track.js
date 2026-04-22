class Track {
    constructor() {
        this.walls = this.createWalls();
    }

    createWalls() {
        // Simple circular track
        const centerX = 400;
        const centerY = 300;
        const innerRadius = 150;
        const outerRadius = 250;

        let walls = [];

        // Inner circle
        for (let i = 0; i < 100; i++) {
            const angle1 = (i / 100) * Math.PI * 2;
            const angle2 = ((i + 1) / 100) * Math.PI * 2;
            const x1 = centerX + Math.cos(angle1) * innerRadius;
            const y1 = centerY + Math.sin(angle1) * innerRadius;
            const x2 = centerX + Math.cos(angle2) * innerRadius;
            const y2 = centerY + Math.sin(angle2) * innerRadius;
            walls.push([{x: x1, y: y1}, {x: x2, y: y2}]);
        }

        // Outer circle
        for (let i = 0; i < 100; i++) {
            const angle1 = (i / 100) * Math.PI * 2;
            const angle2 = ((i + 1) / 100) * Math.PI * 2;
            const x1 = centerX + Math.cos(angle1) * outerRadius;
            const y1 = centerY + Math.sin(angle1) * outerRadius;
            const x2 = centerX + Math.cos(angle2) * outerRadius;
            const y2 = centerY + Math.sin(angle2) * outerRadius;
            walls.push([{x: x1, y: y1}, {x: x2, y: y2}]);
        }

        return walls;
    }

    draw(ctx) {
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        for (let wall of this.walls) {
            ctx.beginPath();
            ctx.moveTo(wall[0].x, wall[0].y);
            ctx.lineTo(wall[1].x, wall[1].y);
            ctx.stroke();
        }
    }
}