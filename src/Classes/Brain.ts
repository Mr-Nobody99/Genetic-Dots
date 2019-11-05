export class Brain{
    angles: number[] = [];
    step: number = 0;

    constructor(size: number){
        for(let i = 0; i < size; i++){
            let angle = Math.floor((Math.random()*90)-45) * Math.PI / 180;
            this.angles.push(angle);
        }
    }

    clone(){
        return this.angles;
    }

    mutate() {
        let mutationRate = 0.01;
        for(let i = 0; i < this.angles.length; i++){
            if(Math.random() < mutationRate){
                let angle = Math.floor((Math.random()*90)-45) * Math.PI / 180;
                this.angles[i] = angle;
                // this.angles[i] += Math.floor((Math.random()*50)-25) * Math.PI/180;
            }
        }
    }
}