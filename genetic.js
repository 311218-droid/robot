class GeneticAlgorithm {
    constructor(populationSize) {
        this.populationSize = populationSize;
        this.population = [];
        this.generation = 1;
        this.bestFitness = 0;
        this.mutationRate = 0.1;
    }

    initialize(track) {
        for (let i = 0; i < this.populationSize; i++) {
            this.population.push(new Car(400, 500, 3.14159, track));
        }
    }

    update() {
        let allDead = true;
        for (let car of this.population) {
            if (car.alive) {
            if (car.alive) {
                car.update();
                allDead = false;
        }

        if (allDead) {
            this.nextGeneration();
        }
    }

    nextGeneration() {
        // Find best car
        let bestCar = this.population.reduce((best, car) => car.fitness > best.fitness ? car : best);

        this.bestFitness = bestCar.fitness;

        // Create new population
        let newPopulation = [];
        for (let i = 0; i < this.populationSize; i++) {
            let newBrain = bestCar.brain.copy();
            newBrain.mutate(this.mutationRate);
            newPopulation.push(new Car(400, 500, 3.14159, bestCar.track, newBrain));
        }

        this.population = newPopulation;
        this.generation++;
    }

    draw(ctx) {
        let bestCar = this.population.reduce((best, car) => car.fitness > best.fitness ? car : best);

        for (let car of this.population) {
            if (car.alive) {
                car.draw(ctx, car === bestCar);
            }
        }
    }
}
