class Car {
    constructor(x, y, angle, track, brain = null) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.track = track;

        this.width = 20;
        this.height = 10;

        this.speed = 0;
        this.acceleration = 0;
        this.steering = 0;

        this.maxSpeed = 3;
        this.friction = 0.95;

        this.alive = true;
        this.fitness = 0;
        this.distance = 0;

        this.brain = brain ? brain.copy() : new NeuralNetwork(5, 6, 2);
        this.sensor = new Sensor(this, track);
    }

    update() {
        if (!this.alive) return;

        this.sensor.update();

        // Get sensor readings
        let inputs = [];
        for (let reading of this.sensor.readings) {
            inputs.push(reading ? reading.offset : 0);
        }

        // Feed forward neural network
        let outputs = this.brain.feedForward(inputs);

        // Set controls
        this.steering = outputs[0] * 2 - 1; // -1 to 1
        this.acceleration = outputs[1] * 2 - 1; // -1 to 1

        // Update physics
        this.speed += this.acceleration * 0.1;
        this.speed = Math.max(-this.maxSpeed / 2, Math.min(this.maxSpeed, this.speed));
        this.speed *= this.friction;

        this.angle += this.steering * 0.1;

        this.x += Math.sin(this.angle) * this.speed;
        this.y += Math.cos(this.angle) * this.speed;

        this.distance += Math.abs(this.speed);

        // Check collision
        if (this.checkCollision()) {
            this.alive = false;
        }

        this.fitness = this.distance;
    }

    checkCollision() {
        // Simple collision detection with track walls
        for (let wall of this.track.walls) {
            if (this.lineIntersect(this.x, this.y, this.x + Math.sin(this.angle) * this.width / 2, this.y + Math.cos(this.angle) * this.width / 2, wall[0].x, wall[0].y, wall[1].x, wall[1].y) ||
                this.lineIntersect(this.x, this.y, this.x - Math.sin(this.angle) * this.width / 2, this.y - Math.cos(this.angle) * this.width / 2, wall[0].x, wall[0].y, wall[1].x, wall[1].y)) {
                return true;
            }
        }
        return false;
    }

    lineIntersect(x1, y1, x2, y2, x3, y3, x4, y4) {
        const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if (denom === 0) return false;

        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denom;
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denom;

        return t >= 0 && t <= 1 && u >= 0 && u <= 1;
    }

    draw(ctx, isBest = false) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(-this.angle);

        ctx.fillStyle = isBest ? "blue" : "rgba(128, 128, 128, 0.5)";
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);

        ctx.restore();

        if (isBest) {
            this.sensor.draw(ctx);
        }
    }
}