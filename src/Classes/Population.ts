import { Bird } from "./Bird";
import { Scene, Vector3, Frustum, Material, MeshPhongMaterial, Color} from "three";

export class Population{
    birds: Array<Bird> = [];

    minSteps: number = 1000;
    fitnessSum: number = 0;
    gen: number = 1;

    constructor(size: number, scene: Scene){
        for(let i = 0; i < size; i++){
            this.birds.push(new Bird(scene, new Vector3(0,-15,0)));
        }
    }

    update(deltaTime:number, frustrum: Frustum){
        this.birds.forEach( bird => {
            if(bird.alive){ bird.update(deltaTime, frustrum); }
        })
    }

    calcFitness(){
        this.birds.forEach(bird => {
            bird.calcFitness();
        })
    }

    isAllDead(){
        for(let i = 0; i < this.birds.length; i++){
            if(this.birds[i].alive){
                return false;
            }
        }
        return true;
    }

    makeNewGeneration(){
        let newBirds = [];
        let best = this.getBest().getBaby();
        newBirds.push(best);
        this.calcFitnessSum();
        this.birds.forEach(bird => {
            bird.destroy();
        });


        for(let i = 0; i < this.birds.length; i++){
            let parent: Bird;
            while(!parent){
                parent = this.selectParent();
            }
            newBirds.push(parent.getBaby());
        }

        best.mesh.material = new MeshPhongMaterial({color: 'blue'});
        best.best = true;
        newBirds[0];

        this.birds = newBirds.slice();
        this.gen++;
    }

    calcFitnessSum(){
        this.fitnessSum = 0;
        for(let i = 0; i < this.birds.length; i++){
            this.fitnessSum += this.birds[i].fitness;
        }
        console.log(`Generation: ${this.gen}\nFitness Sum: ${this.fitnessSum}`);
    }

    selectParent():Bird{
        let r = Math.random()*this.fitnessSum;
        let sum = 0;

        for(let i = 0; i < this.birds.length; i++){
            sum += this.birds[i].fitness;
            if(sum > r){
                return this.birds[i];
            }
        }
    }

    mutate(){
        for(let i = 0; i < this.birds.length; i++){
            if(!this.birds[i].best){
                this.birds[i].brain.mutate();
            }
        }
    }

    getBest(){
        let high = 0;
        let index = 0;
        for(let i = 1; i < this.birds.length; i++){
            if(this.birds[i].fitness > high){
                high = this.birds[i].fitness;
                index = i;
            }
        }
        return this.birds[index];
    }
}