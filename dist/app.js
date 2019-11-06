"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var three_1 = require("three");
var Population_1 = require("./Classes/Population");
var clock = new three_1.Clock();
var deltaTime = clock.getDelta();
// Make scene and add lights
var scene = new three_1.Scene();
scene.add(new three_1.HemisphereLight(0x008077, 0x4b1f5e, 1.25));
scene.add(new three_1.AmbientLight(0xdedede, 1));
var light = new three_1.DirectionalLight(0xdefcf6, 0.5);
light.position.set(20, -5, 10);
scene.add(light);
// Make camera and frustrum
var camera = new three_1.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
var frustrum = new three_1.Frustum();
camera.position.set(0, 0, 50);
// Make renderer and set animation loop
var renderer = new three_1.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setAnimationLoop(function () { update(); });
renderer.setClearColor(0xffffff);
//Add render canvas element to document body
document.body.appendChild(renderer.domElement);
var population = new Population_1.Population(200, scene);
var goal = makeGoal();
var block = false;
function update() {
    deltaTime = clock.getDelta();
    frustrum.setFromMatrix(new three_1.Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse));
    population.isAllDead() ?
        (population.calcFitness(),
            population.makeNewGeneration(),
            population.mutate()) : (population.update(deltaTime, frustrum));
    render();
}
function render() {
    renderer.render(scene, camera);
}
function makeGoal() {
    var geo = new three_1.SphereBufferGeometry(0.5, 12, 12);
    var mat = new three_1.MeshPhongMaterial({ color: 'green' });
    var mesh = new three_1.Mesh(geo, mat);
    mesh.name = 'goal';
    mesh.position.set(0, 19, 0);
    scene.add(mesh);
    return mesh;
}
//Window resizing
window.addEventListener('resize', onWindowResize);
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
//# sourceMappingURL=app.js.map