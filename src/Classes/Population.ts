import { Bird } from "./Bird";
import { Scene, Vector3, Frustum } from "three";

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
        this.calcFitnessSum();
        this.birds.forEach(bird => {
            bird.destroy();
        });

        let newBirds = [];

        for(let i = 0; i < this.birds.length; i++){
            let parent: Bird;
            while(!parent){
                parent = this.selectParent();
            }
            newBirds.push(parent.getBaby());
        }

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
            this.birds[i].brain.mutate();
        }
    }
}