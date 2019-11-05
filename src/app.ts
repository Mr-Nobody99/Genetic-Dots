import { Scene, HemisphereLight, AmbientLight, DirectionalLight, PerspectiveCamera, WebGLRenderer, Clock, Vector3, Frustum, Matrix4, SphereBufferGeometry, MeshPhongMaterial, Mesh} from 'three';
import { Population } from './Classes/Population';

const clock = new Clock();
let deltaTime = clock.getDelta();

// Make scene and add lights
const scene = new Scene();
scene.add(new HemisphereLight(0x008077, 0x4b1f5e, 1.25));
scene.add(new AmbientLight(0xdedede, 1));
let light = new DirectionalLight(0xdefcf6, 0.5);
light.position.set(20,-5,10);
scene.add(light);

// Make camera and frustrum
const camera = new PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 100);
const frustrum = new Frustum();
camera.position.set(0,0,50);

// Make renderer and set animation loop
const renderer = new WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setAnimationLoop( ()=>{ update(); } );
renderer.setClearColor(0xffffff);

//Add render canvas element to document body
document.body.appendChild(renderer.domElement);

const population = new Population(100, scene);

const goal = makeGoal();

let block = false;

function update(){
    deltaTime = clock.getDelta();
    frustrum.setFromMatrix(new Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse));
    population.isAllDead() ? 
        (
            population.calcFitness(),
            population.makeNewGeneration(),
            population.mutate()
        ) : (
            population.update(deltaTime, frustrum)
        )
    render();
}

function render(){
    renderer.render(scene, camera);
}

function makeGoal(){
    let geo = new SphereBufferGeometry(0.5, 12, 12);
    let mat = new MeshPhongMaterial({color: 'green'});

    let mesh = new Mesh(geo, mat);
    mesh.name = 'goal';
    mesh.position.set(0, 19, 0);
    scene.add(mesh);
    return mesh;
}

//Window resizing
window.addEventListener('resize', onWindowResize);
function onWindowResize(){
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}