const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const generationSpan = document.getElementById('generation');
const bestFitnessSpan = document.getElementById('bestFitness');

const track = new Track();
const ga = new GeneticAlgorithm(200);
ga.initialize(track);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    track.draw(ctx);
    ga.update();
    ga.draw(ctx);

    generationSpan.textContent = ga.generation;
    bestFitnessSpan.textContent = Math.floor(ga.bestFitness);

    requestAnimationFrame(animate);
}

animate();