import Phaser from "phaser";
import ScoreTracker from "../ScoreTracker";

class Pond{
    pond:string;
    image:Phaser.GameObjects.Image;


    constructor(pond:string,image:Phaser.GameObjects.Image){
        this.pond=pond;
        this.image=image;
    }
}

class Fish{
    fish: string;
    image: Phaser.GameObjects.Image;

    constructor(fish:string,image:Phaser.GameObjects.Image){
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
        this.load.image('field','assets/field.png');
        this.load.image('rocks','assets/rocks.png');
        this.load.image('RBF','assets/RBF.png')
        this.load.image('MI','assets/MI.png')
        this.load.image('PBF','assets/PBF.png')
    }

    create(){

        let questions = [
            "If the fisher wants to catch the Moorish \nIdol, what pond do they need to go to?",
            "If the fisher is at pond 2, what fish can\n they catch?",
            "If the fisher is at pond 1, what fish can\n they catch?"
        ];
        
        let answers = [
            "Pond 3",
            "Pennant Butterflyfish",
            "Racoon Butterflyfish"
        ];

        // ~ Evan
        //field background
        let field = this.add.image(0,0,'field')
        field.setOrigin(0, 0)

        //rock background behind question text
        let rocks = this.add.image(0,0,'rocks')
        rocks.setOrigin(0, 0)

        //back button - returns to level select
        let backBtn = this.add.text(8, 80, '<- Back');
        backBtn.setInteractive();
        backBtn.setColor("red")
        backBtn.setFont("20px") 
        backBtn.on('pointerdown', () => {
            this.scene.start('game');
        });
        // ~~
    

        let counter = 0;
        let question = this.add.text(8,6,questions[counter]);
        question.setFont("32px") 

        //score board
        let scoreText = this.add.text(16, 550, `Score: ${ScoreTracker.getScore()}`, {
        fontSize: '32px',
        color: '#FFFFFF' })
    
        //Address and Data Value Title
        let addrTitle = this.add.text(200,100,"Addresses")
        let dataTitle = this.add.text(550,100,"Data Values")

        //Creates first pond and allows it to be clicked
        let pond1 = this.add.text(225,125,"Pond 1");
        let rbfPond = new Pond("Pond 1",this.add.image(250,200,'RBF Pond'));
        rbfPond.image.setInteractive();
        rbfPond.image.on("pointerdown",()=>{
            if ( rbfPond.pond===answers[counter]){
                counter++; 
                ScoreTracker.addScore();
                scoreText.setText(`Score: ${ScoreTracker.getScore()}`)
                if (counter==3){
                    this.scene.start('game')
                }
            }
            scoreText.setText(`Score: ${ScoreTracker.getScore()}`)
        })
        
        //Creates the first fish and allows it to be clicked as an answer
        let rbf = new Fish("Racoon Butterflyfish", this.add.image(600,200,'RBF'))
        rbf.image.setInteractive();
        rbf.image.on("pointerdown",()=>{
            if (rbf.fish === answers[counter]){
                counter++; 
                ScoreTracker.addScore();
                scoreText.setText(`Score: ${ScoreTracker.getScore()}`)
                if (counter==3){
                    this.scene.start('game')
                }
            }
        })

        //Creates the second pond and allows it to be clicked as an answer
        let pond2 = this.add.text(225,275,"Pond 2");
        let pbfPond = new Pond("Pond 2",this.add.image(250,350,'PBF Pond'));
        pbfPond.image.setInteractive();
        pbfPond.image.on("pointerdown",()=>{
            if (pbfPond.pond===answers[counter]){
                counter++;
                ScoreTracker.addScore();
                scoreText.setText(`Score: ${ScoreTracker.getScore()}`)
                question.setText(questions[counter]);
                if (counter==3){
                    this.scene.start('game')
                }
            }
        })

        //Creates the first fish and allows it to be clicked as an answer
        let pbf = new Fish('Pennant Butterflyfish',this.add.image(600,350,'PBF'))
        pbf.image.setInteractive();
        pbf.image.on("pointerdown",()=>{
            if (pbf.fish === answers[counter]){
                counter++; 
                ScoreTracker.addScore();
                scoreText.setText(`Score: ${ScoreTracker.getScore()}`)
                question.setText(questions[counter]);
                if (counter==3){
                    this.scene.start('game')
                }
            }
        })

        
        //Creates the third pond and allows it to be clicked as an answer
        let pond3 = this.add.text(225,425,"Pond 3");
        let miPond = new Pond("Pond 3",this.add.image(250,500,'MI Pond'));
        miPond.image.setInteractive();
        miPond.image.on("pointerdown",()=>{
            if (miPond.pond===answers[counter]){
                counter++;
                ScoreTracker.addScore();
                scoreText.setText(`Score: ${ScoreTracker.getScore()}`)
                question.setText(questions[counter]);
                if (counter==3){
                    this.scene.start('game')
                }
            }
        })

        //Creates the first fish and allows it to be clicked as an answer
        let mi = new Fish("Moorish Idol",this.add.image(600,500,'MI'))
        mi.image.setInteractive();
        mi.image.on("pointerdown",()=>{
            if (mi.fish === answers[counter]){
                counter++; 
                ScoreTracker.addScore();
                scoreText.setText(`Score: ${ScoreTracker.getScore()}`)
                question.setText(questions[counter]);
                if (counter==3){
                    this.scene.start('game')
                }
            }
        })
    }
}
