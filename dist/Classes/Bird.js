"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var three_1 = require("three");
var Brain_1 = require("./Brain");
var Bird = /** @class */ (function (_super) {
    __extends(Bird, _super);
    function Bird(scene, position) {
        var _this = _super.call(this) || this;
        _this.loaded = false;
        _this.alive = true;
        _this.speed = 5;
        _this.best = false;
        _this.goalReached = false;
        _this.fitness = 0;
        _this.scene = scene;
        _this.brain = new Brain_1.Brain(500);
        _this.position.set(position.x, position.y, position.z);
        _this.initMesh();
        return _this;
    }
    Bird.prototype.update = function (deltaTime, frustrum) {
        this.checkGoal();
        this.translateY(0.25);
        if (this.brain.step < this.brain.angles.length) {
            this.rotateZ(this.brain.angles[this.brain.step]);
            this.brain.step++;
        }
        else {
            this.destroy();
        }
        if (!frustrum.containsPoint(this.position) && this.loaded) {
            this.destroy();
        }
        if (!this.loaded) {
            this.loaded = true;
        }
    };
    Bird.prototype.checkGoal = function () {
        var goal = this.scene.getObjectByName('goal');
        if (this.position.distanceTo(goal.position) < 1) {
            this.goalReached = true;
            this.alive = false;
        }
    };
    Bird.prototype.calcFitness = function () {
        if (this.goalReached) {
            this.fitness = 1 / 16 + 10000 / (Math.pow(this.brain.step, 2));
        }
        else {
            var distance = this.position.distanceTo(this.scene.getObjectByName('goal').position);
            this.fitness = 1.0 / (Math.pow(distance, 2));
        }
    };
    Bird.prototype.getBaby = function () {
        var baby = new Bird(this.scene, new three_1.Vector3(0, -15, 0));
        baby.brain = new Brain_1.Brain(this.brain.angles.length);
        baby.brain.angles = this.brain.clone();
        return baby;
    };
    Bird.prototype.destroy = function () {
        this.scene.remove(this);
        this.alive = false;
    };
    Bird.prototype.initMesh = function () {
        var geo = new three_1.SphereBufferGeometry(0.25, 10, 10);
        var mat = new three_1.MeshPhongMaterial({ color: 0xeb4034, wireframe: false });
        this.mesh = new three_1.Mesh(geo, mat);
        this.add(this.mesh);
        this.scene.add(this);
    };
    return Bird;
}(three_1.Object3D));
exports.Bird = Bird;
//# sourceMappingURL=Bird.js.map