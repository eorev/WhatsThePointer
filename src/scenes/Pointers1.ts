import Phaser from "phaser";
import { BackButton, MuteButton, ScoreDisplay } from "../GlobalObjects";

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

export default class Pointers1 extends Phaser.Scene{

    private code1!: Phaser.GameObjects.Text;
    private code2!: Phaser.GameObjects.Text;
    private code1lock!: boolean;
    private code2lock!: boolean;

    private question!: Phaser.GameObjects.Text;
    private answer!: string;
    
    private answers!: Array<string>;
    private questions!: Array<string>;

    private counter!: number;

    private feedback!: Phaser.GameObjects.Text;
    private popup!: Phaser.GameObjects.Image;

    private scoreboard!: ScoreDisplay;
    private muted!: MuteButton;

    private splashSound!: Phaser.Sound.BaseSound;
    private buttonSound!: Phaser.Sound.BaseSound;
    private correctSound!: Phaser.Sound.BaseSound;
    private wrongSound!: Phaser.Sound.BaseSound;
    private nextLevelSound!: Phaser.Sound.BaseSound;

    constructor(){
        super('Pointers1');
        this.answer = '';
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
        this.load.image('Popup','assets/popup.png');

        this.load.audio('splash', '/assets/sounds/splash.mp3')
        this.load.audio('correct', '/assets/sounds/correct.mp3')
        this.load.audio('button', '/assets/sounds/button.mp3')
        this.load.audio('wrong', '/assets/sounds/wrong.mp3')
        this.load.audio('nextLevel', '/assets/sounds/nextLevel.mp3')
    }

    create(){
        //adding the sounds
        this.splashSound = this.sound.add('splash');
        this.correctSound = this.sound.add('correct');
        this.buttonSound = this.sound.add('button');
        this.wrongSound = this.sound.add('wrong');
        this.nextLevelSound = this.sound.add('nextLevel');

        // ~ Evan
        //field background
        let field = this.add.image(0,0,'field')
        field.setOrigin(0, 0)

        //rock background behind question text
        let rocks = this.add.image(0,0,'rocks')
        rocks.setOrigin(0, 0)

        this.questions = [
            "If we want the pointer to point to the Moorish \nIdol, which address does it need to hold?",
            "If the pointer holds the address of pond 2, \nwhat fish does it point to?",
            "If the pointer holds the address of pond 1, \nwhat fish does it point to?"
        ];
        this.answers = [
            "Pond 3",
            "Pennant Butterflyfish",
            "Racoon Butterflyfish"
        ];

        this.counter = 0;
        this.question = this.add.text(8,6,this.questions[this.counter]);
        this.question.setFont("28px") 


        //add back button
        new BackButton(this, 'game')

        //add mute button
        new MuteButton(this)

        //scores
        this.scoreboard = new ScoreDisplay(this, 15, 80)

        //Address and Data Value Title
        this.code1 = this.add.text(500,250,"Pointer = ");
        this.code2 = this.add.text(500,300,"Pointer* = ");

        //Create check code button
        let checkCode = this.add.text(500,400,"Check Code").setInteractive();
        checkCode.on("pointerdown",this.checkAnswer,this)

        //Creates first pond and allows it to be clicked
        let rbfPond = new Pond("Pond 1",this.add.image(175,200,'RBF Pond'));
        rbfPond.image.setInteractive();
        rbfPond.image.on("pointerdown",()=>{
            if (!this.code1lock){
                this.answer = "Pond 1";
                this.code1.setText("Pointer = " + this.answer);
                if(!this.muted.isMuted())
                    this.splashSound.play();
            }
        })
        
        //Creates the second pond and allows it to be clicked as an answer
        let pbfPond = new Pond("Pond 2",this.add.image(175,350,'PBF Pond'));
        pbfPond.image.setInteractive();
        pbfPond.image.on("pointerdown",()=>{
            if (!this.code1lock){
                this.answer = "Pond 2";
                this.code1.setText("Pointer = " + this.answer);
                if(!this.muted.isMuted())
                    this.splashSound.play();
            }
        })

        //Creates the third pond and allows it to be clicked as an answer
        let miPond = new Pond("Pond 3",this.add.image(175,500,'MI Pond'));
        miPond.image.setInteractive();
        miPond.image.on("pointerdown",()=>{
            if (!this.code1lock){
                this.answer = "Pond 3";
                this.code1.setText("Pointer = " + this.answer);
                if(!this.muted.isMuted())
                    this.splashSound.play();
            }
        })

        //Creates the first fish and allows it to be clicked as an answer
        let rbf = new Fish("Racoon Butterflyfish", this.add.image(350,200,'RBF'))
        this.add.text(300,125,'Racoon Butterflyfish')
        rbf.image.setInteractive();
        rbf.image.on("pointerdown",()=>{
            if (!this.code2lock){
                this.answer = "Racoon Butterflyfish";
                this.code2.setText("Pointer* = " + this.answer);
                if(!this.muted.isMuted())
                    this.splashSound.play();
            }
            
        })

        //Creates the second fish and allows it to be clicked as an answer
        let pbf = new Fish('Pennant Butterflyfish',this.add.image(350,350,'PBF'))
        this.add.text(300,275,'Pennant Butterflyfish')
        pbf.image.setInteractive();
        pbf.image.on("pointerdown",()=>{
            if (!this.code2lock){
                this.answer = "Pennant Butterflyfish";
                this.code2.setText("Pointer* = " + this.answer);
                if(!this.muted.isMuted())
                    this.splashSound.play();
            }
            
        })

        //Creates the third fish and allows it to be clicked as an answer
        let mi = new Fish("Moorish Idol",this.add.image(350,500,'MI'))
        this.add.text(300,425,'Moorish Idol')
        mi.image.setInteractive();
        mi.image.on("pointerdown",()=>{
            if (!this.code2lock){
                this.answer = "Moorish Idol";
                this.code2.setText("Pointer* = " + this.answer);
                if(!this.muted.isMuted())
                    this.splashSound.play();
            }
            
        })

        //Initiate feedback window
        this.popup = this.add.image(375,350,'Popup');
        this.popup.alpha=0;
        this.popup.depth = 2

        this.feedback = this.add.text(275,300,"");
        this.feedback.alpha=0;
        this.feedback.depth = 2
    }

    update(_time: number, _delta: number): void {
        if (this.counter===0){
            this.code2.setText("Pointer* = Moorish Idol");
            this.code2lock = true;
            this.code1lock = false;
        }
        else if (this.counter==1){
            this.code1.setText("Pointer = Pond 2");
            this.code1lock = true;
            this.code2lock = false;
        }
        else{
            this.code1.setText("Pointer = Pond 1");
            this.code1lock = true;
            this.code2lock = false;
        }
    }

    //Checks if the user's answer is correct
    checkAnswer(){
        if (this.answer === this.answers[this.counter]){
            this.scoreboard.addScore();

            //if(!this.muted.isMuted())
                //this.correctSound.play();

            //displays feedback window
            this.popup.alpha = 1;
            this.feedback.alpha=1;

            //congrats message
            this.feedback.setText("Congratulations, you \nset the variable \nto the correct value!")
            this.feedback.setTint(0x00FF00);
            this.feedback.setFontSize(20);
            
            //Close button to exit window
            let close = this.add.text(325,450,"Close").setInteractive();
            close.setTint(0xff0000);
            close.setFontSize(26)
            this.popup.setDepth(1);
            this.feedback.setDepth(1);
            close.setDepth(1);
            close.on("pointerdown",()=>{
                this.feedback.alpha=0;
                this.popup.alpha=0;
                //if(!this.muted.isMuted())
                    //this.buttonSound.play();
                close.destroy();
            });

            //Controls the flow of the questions
            if (this.counter<2){
                this.counter++;
                this.question.setText(this.questions[this.counter])
            }
            //If the user has completed all the questions, they are taken to the next level
            else{
                //if(!this.muted.isMuted())
                    //this.nextLevelSound.play();
                this.scene.start('Pointers2');
        }}
        else if (this.answer === ""){
            this.popup.alpha=1;
            this.feedback.alpha=1;
            this.feedback.setText("I'm sorry, you didn't \nset the variable to \nanything. Please try \nagain.")
            this.feedback.setTint(0xFF0000);
            this.feedback.setFontSize(20)

            let close = this.add.text(325,450,"Close").setInteractive();
            close.setTint(0xff0000);
            close.setFontSize(26)
            this.popup.setDepth(1);
            this.feedback.setDepth(1);
            close.setDepth(1);
            close.on("pointerdown",()=>{
                this.feedback.alpha=0;
                this.popup.alpha=0;
                if(!this.muted.isMuted())
                    this.buttonSound.play();
                close.destroy();
            });
        }
        else{
            this.scoreboard.deductScore();
            if(!this.muted.isMuted())
                this.wrongSound.play();
            //Display feedback window
            this.popup.alpha=1;
            this.feedback.alpha=1;
            this.feedback.setText("I'm sorry, you set \nthe variable to \n" + this.answer + "\nbut you need to set \nthe variable to \n" + this.answers[this.counter])
            this.feedback.setTint(0xFF0000);
            this.feedback.setFontSize(20)
            //make the popup appear above the fish
            this.popup.setDepth(1);
            this.feedback.setDepth(2);

            //Close button to exit feedback
            let close = this.add.text(325,450,"Close").setInteractive();
            close.setTint(0xff0000);
            close.setFontSize(26)
            this.popup.setDepth(1);
            this.feedback.setDepth(1);
            close.setDepth(1);
            close.on("pointerdown",()=>{
                this.feedback.alpha=0;
                this.popup.alpha=0;
                if(!this.muted.isMuted())
                    this.buttonSound.play();
                close.destroy();
            });
        }
    }
}

