import Phaser from "phaser";

class Pond{
    pond:string;
    fish:string;
    image:Phaser.GameObjects.Image;

    constructor(pond:string,fish:string,image:Phaser.GameObjects.Image){
        this.pond=pond;
        this.fish=fish;
        this.image=image;
    }
}

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
        let questions = ["If the fisher wants to catch the Moorish \nIdol, what pond do they need to go to?","If the fisher is at pond 2, what fish can \nthey catch?","If the fisher is at pond 1, what fish can\n they catch?"];
        let answers = ["Pond 3","Pennant Butterflyfish","Racoon Butterflyfish"];
        let counter = 0;
        let question = this.add.text(0,0,questions[counter]);
        question.setFont("32px")

        let pond1 = this.add.text(225,150,"Pond 1");
        let rbfPond = new Pond("Pond 1","Racoon Butterflyfish",this.add.image(250,250,'RBF Pond'));
        rbfPond.image.setInteractive();
        rbfPond.image.on("pointerdown",()=>{
            if (rbfPond.fish===answers[counter] || rbfPond.pond===answers[counter]){
                counter++;
                question.setText(questions[counter]);
                if (counter==3){
                    this.scene.start('game')
                }
            }
        })
        
        let pond2 = this.add.text(475,150,"Pond 2");
        let pbfPond = new Pond("Pond 2","Pennant Butterflyfish",this.add.image(500,250,'PBF Pond'));
        pbfPond.image.setInteractive();
        pbfPond.image.on("pointerdown",()=>{
            if (pbfPond.fish===answers[counter] || pbfPond.pond===answers[counter]){
                counter++;
                question.setText(questions[counter]);
                if (counter==3){
                    this.scene.start('game')
                }
            }
        })
        
        let pond3 = this.add.text(350,400,"Pond 3");
        let miPond = new Pond("Pond 3","Moorish Idol",this.add.image(375,500,'MI Pond'));
        miPond.image.setInteractive();
        miPond.image.on("pointerdown",()=>{
            if (miPond.fish===answers[counter] || miPond.pond===answers[counter]){
                counter++;
                question.setText(questions[counter]);
                if (counter==3){
                    this.scene.start('game')
                }
            }
        })

    }
}