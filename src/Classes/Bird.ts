import { Object3D, Scene, SphereBufferGeometry, MeshBasicMaterial, Mesh, MeshPhongMaterial, Vector3, Vector2, Frustum } from "three";
import { Brain } from "./Brain";

export class Bird extends Object3D{
    scene: Scene;
    mesh: Mesh;
    brain: Brain;
    loaded: boolean = false;
    alive: boolean = true;
    speed: number = 5;

    best:boolean = false;
    goalReached: boolean = false;
    fitness: number = 0;

    constructor(scene: THREE.Scene, position: Vector3) {
        super();
        this.scene = scene;
        this.brain = new Brain(500);
        this.position.set(position.x, position.y, position.z);
        this.initMesh();
    }

    update(deltaTime: number, frustrum: Frustum){
        
        this.checkGoal();

        this.translateY(0.25);

        if(this.brain.step < this.brain.angles.length){
            this.rotateZ(this.brain.angles[this.brain.step]);
            this.brain.step++;
        } else {
            this.destroy();
        }

        if(!frustrum.containsPoint(this.position) && this.loaded){
            this.destroy();
        }

        if(!this.loaded){ this.loaded = true; }
    }

    checkGoal(){
        let goal = this.scene.getObjectByName('goal');
        if(this.position.distanceTo(goal.position) < 1){
            this.goalReached = true;
            this.alive = false;
        }
    }

    calcFitness(){
        if(this.goalReached) {
            this.fitness = 1 / 16 + 10000/(this.brain.step**2); 
        } else {
            let distance = this.position.distanceTo(this.scene.getObjectByName('goal').position);
            this.fitness = 1.0/(distance**2);
        }
    }

    getBaby():Bird{
        let baby = new Bird(this.scene, new Vector3(0, -15, 0));
        baby.brain = new Brain(this.brain.angles.length);
        baby.brain.angles = this.brain.clone();
        return baby;
    }

    destroy(){
        this.scene.remove(this);
        this.alive = false;
    }
    
    initMesh(){
        let geo = new SphereBufferGeometry(0.25, 10, 10);
        let mat = new MeshPhongMaterial({color: 0xeb4034, wireframe: false});
        
        this.mesh = new Mesh(geo, mat);

        this.add(this.mesh);
        this.scene.add(this);
    }
}
