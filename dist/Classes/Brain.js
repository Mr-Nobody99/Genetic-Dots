"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Brain = /** @class */ (function () {
    function Brain(size) {
        this.angles = [];
        this.step = 0;
        for (var i = 0; i < size; i++) {
            var angle = Math.floor((Math.random() * 90) - 45) * Math.PI / 180;
            this.angles.push(angle);
        }
    }
    Brain.prototype.clone = function () {
        return this.angles;
    };
    Brain.prototype.mutate = function () {
        var mutationRate = 0.1;
        for (var i = 0; i < this.angles.length; i++) {
            if (Math.random() < mutationRate) {
                // let angle = Math.floor((Math.random()*90)-45) * Math.PI / 180;
                // this.angles[i] = angle;
                this.angles[i] += Math.floor((Math.random() * 50) - 25) * Math.PI / 180;
            }
        }
    };
    return Brain;
}());
exports.Brain = Brain;
//# sourceMappingURL=Brain.js.map