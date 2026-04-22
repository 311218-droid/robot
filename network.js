class NeuralNetwork {
    constructor(inputSize, hiddenSize, outputSize) {
        this.inputSize = inputSize;
        this.hiddenSize = hiddenSize;
        this.outputSize = outputSize;

        // Initialize weights and biases
        this.weightsIH = this.randomMatrix(hiddenSize, inputSize);
        this.weightsHO = this.randomMatrix(outputSize, hiddenSize);
        this.biasH = this.randomArray(hiddenSize);
        this.biasO = this.randomArray(outputSize);
    }

    randomMatrix(rows, cols) {
        let matrix = [];
        for (let i = 0; i < rows; i++) {
            matrix[i] = [];
            for (let j = 0; j < cols; j++) {
                matrix[i][j] = Math.random() * 2 - 1; // -1 to 1
            }
        }
        return matrix;
    }

    randomArray(size) {
        let array = [];
        for (let i = 0; i < size; i++) {
            array[i] = Math.random() * 2 - 1;
        }
        return array;
    }

    feedForward(inputs) {
        // Hidden layer
        let hidden = [];
        for (let i = 0; i < this.hiddenSize; i++) {
            let sum = 0;
            for (let j = 0; j < this.inputSize; j++) {
                sum += this.weightsIH[i][j] * inputs[j];
            }
            sum += this.biasH[i];
            hidden[i] = this.sigmoid(sum);
        }

        // Output layer
        let outputs = [];
        for (let i = 0; i < this.outputSize; i++) {
            let sum = 0;
            for (let j = 0; j < this.hiddenSize; j++) {
                sum += this.weightsHO[i][j] * hidden[j];
            }
            sum += this.biasO[i];
            outputs[i] = this.sigmoid(sum);
        }

        return outputs;
    }

    sigmoid(x) {
        return 1 / (1 + Math.exp(-x));
    }

    copy() {
        let copy = new NeuralNetwork(this.inputSize, this.hiddenSize, this.outputSize);
        copy.weightsIH = this.copyMatrix(this.weightsIH);
        copy.weightsHO = this.copyMatrix(this.weightsHO);
        copy.biasH = [...this.biasH];
        copy.biasO = [...this.biasO];
        return copy;
    }

    copyMatrix(matrix) {
        return matrix.map(row => [...row]);
    }

    mutate(rate) {
        this.mutateMatrix(this.weightsIH, rate);
        this.mutateMatrix(this.weightsHO, rate);
        this.mutateArray(this.biasH, rate);
        this.mutateArray(this.biasO, rate);
    }

    mutateMatrix(matrix, rate) {
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                if (Math.random() < rate) {
                    matrix[i][j] += (Math.random() * 2 - 1) * 0.1; // small jitter
                }
            }
        }
    }

    mutateArray(array, rate) {
        for (let i = 0; i < array.length; i++) {
            if (Math.random() < rate) {
                array[i] += (Math.random() * 2 - 1) * 0.1;
            }
        }
    }
}