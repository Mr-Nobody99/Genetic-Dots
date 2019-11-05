"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Bird_1 = require("./Bird");
var three_1 = require("three");
var Population = /** @class */ (function () {
    function Population(size, scene) {
        this.birds = [];
        this.minSteps = 1000;
        this.fitnessSum = 0;
        this.gen = 1;
        for (var i = 0; i < size; i++) {
            this.birds.push(new Bird_1.Bird(scene, new three_1.Vector3(0, -15, 0)));
        }
    }
    Population.prototype.update = function (deltaTime, frustrum) {
        this.birds.forEach(function (bird) {
            if (bird.alive) {
                bird.update(deltaTime, frustrum);
            }
        });
    };
    Population.prototype.calcFitness = function () {
        this.birds.forEach(function (bird) {
            bird.calcFitness();
        });
    };
    Population.prototype.isAllDead = function () {
        for (var i = 0; i < this.birds.length; i++) {
            if (this.birds[i].alive) {
                return false;
            }
        }
        return true;
    };
    Population.prototype.makeNewGeneration = function () {
        this.calcFitnessSum();
        this.birds.forEach(function (bird) {
            bird.destroy();
        });
        var newBirds = [];
        for (var i = 0; i < this.birds.length; i++) {
            var parent_1 = void 0;
            while (!parent_1) {
                parent_1 = this.selectParent();
            }
            newBirds.push(parent_1.getBaby());
        }
        this.birds = newBirds.slice();
        this.gen++;
    };
    Population.prototype.calcFitnessSum = function () {
        this.fitnessSum = 0;
        for (var i = 0; i < this.birds.length; i++) {
            this.fitnessSum += this.birds[i].fitness;
        }
        console.log("Generation: " + this.gen + "\nFitness Sum: " + this.fitnessSum);
    };
    Population.prototype.selectParent = function () {
        var r = Math.random() * this.fitnessSum;
        var sum = 0;
        for (var i = 0; i < this.birds.length; i++) {
            sum += this.birds[i].fitness;
            if (sum > r) {
                return this.birds[i];
            }
        }
    };
    Population.prototype.mutate = function () {
        for (var i = 0; i < this.birds.length; i++) {
            this.birds[i].brain.mutate();
        }
    };
    return Population;
}());
exports.Population = Population;
//# sourceMappingURL=Population.js.map