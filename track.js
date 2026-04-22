class Track {
    constructor() {
        this.walls = this.createWalls();
    }

    createWalls() {
        // Simple oval track
        const centerX = 400;
        const centerY = 300;
        const innerRadiusX = 200;
        const innerRadiusY = 100;
        const outerRadiusX = 300;
        const outerRadiusY = 150;

        let walls = [];

        // Inner oval
        for (let i = 0; i < 100; i++) {
            const angle1 = (i / 100) * Math.PI * 2;
            const angle2 = ((i + 1) / 100) * Math.PI * 2;
            const x1 = centerX + Math.cos(angle1) * innerRadiusX;
            const y1 = centerY + Math.sin(angle1) * innerRadiusY;
            const x2 = centerX + Math.cos(angle2) * innerRadiusX;
            const y2 = centerY + Math.sin(angle2) * innerRadiusY;
            walls.push([{x: x1, y: y1}, {x: x2, y: y2}]);
        }

        // Outer oval
        for (let i = 0; i < 100; i++) {
            const angle1 = (i / 100) * Math.PI * 2;
            const angle2 = ((i + 1) / 100) * Math.PI * 2;
            const x1 = centerX + Math.cos(angle1) * outerRadiusX;
            const y1 = centerY + Math.sin(angle1) * outerRadiusY;
            const x2 = centerX + Math.cos(angle2) * outerRadiusX;
            const y2 = centerY + Math.sin(angle2) * outerRadiusY;
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