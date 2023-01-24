import Phaser from "phaser";
import ScoreTracker from "../ScoreTracker";

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

export default class Pond2 extends Phaser.Scene{


    constructor(){
        super('Pond2');
    }

    preload(){
        this.load.image('RBF Pond','assets/RBF_Pond.png');
        this.load.image('PBF Pond','assets/PBF_Pond.png');
        this.load.image('MI Pond','assets/MI_Pond.png');
        this.load.image('field','assets/field.png');
        this.load.image('rocks','assets/rocks.png');
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
    
        //question count
        let questionCountText = this.add.text(550, 550, `Questions: ${ScoreTracker.getQuestionCount()}`, {
        fontSize: '32px',
        color: '#FFFFFF' })

        let pond1 = this.add.text(225,150,"Pond 1");
        let rbfPond = new Pond("Pond 1","Racoon Butterflyfish",this.add.image(250,250,'RBF Pond'));
        rbfPond.image.setInteractive();
        rbfPond.image.on("pointerdown",()=>{
            if (rbfPond.fish===answers[counter] || rbfPond.pond===answers[counter]){
                counter++; 
                ScoreTracker.addScore();
                ScoreTracker.addQuestion();
                scoreText.setText(`Score: ${ScoreTracker.getScore()}`)
                questionCountText.setText(`Questions: ${ScoreTracker.getQuestionCount()}`)
                question.setText(questions[counter]);
                if (counter==3){
                    this.scene.start('game')
                }
            }
            scoreText.setText(`Score: ${ScoreTracker.getScore()}`)
        })
        
        let pond2 = this.add.text(475,150,"Pond 2");
        let pbfPond = new Pond("Pond 2","Pennant Butterflyfish",this.add.image(500,250,'PBF Pond'));
        pbfPond.image.setInteractive();
        pbfPond.image.on("pointerdown",()=>{
            if (pbfPond.fish===answers[counter] || pbfPond.pond===answers[counter]){
                counter++;
                ScoreTracker.addScore();
                ScoreTracker.addQuestion();
                scoreText.setText(`Score: ${ScoreTracker.getScore()}`)
                questionCountText.setText(`Questions: ${ScoreTracker.getQuestionCount()}`)
                question.setText(questions[counter]);
                if (counter==3){
                    this.scene.start('game')
                }
            }
        })
        
        let pond3 = this.add.text(350,350,"Pond 3");
        let miPond = new Pond("Pond 3","Moorish Idol",this.add.image(375,450,'MI Pond'));
        miPond.image.setInteractive();
        miPond.image.on("pointerdown",()=>{
            if (miPond.fish===answers[counter] || miPond.pond===answers[counter]){
                counter++;
                ScoreTracker.addScore();
                ScoreTracker.addQuestion();
                scoreText.setText(`Score: ${ScoreTracker.getScore()}`)
                questionCountText.setText(`Questions: ${ScoreTracker.getQuestionCount()}`)
                question.setText(questions[counter]);
                if (counter==3){
                    this.scene.start('game')
                }
            }
        })

    }
}