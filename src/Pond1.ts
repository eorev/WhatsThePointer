import Phaser from "phaser";

export default class Pond1 extends Phaser.Scene{
    constructor(){
        super('Pond1');
    }

    preload(){
        this.load.image('RBF Pond','assets/RBF_Pond.png');
        this.load.image('PBF Pond','assets/PBF_Pond.png');
        this.load.image('MI Pond','assets/MI_Pond.png');
    }

    create(){
        let rbfPond = this.add.image(250,250,'RBF Pond');
        let pbfPond = this.add.image(500,250,'PBF Pond');
        let miPond = this.add.image(375,500,'MI Pond');
    }
}