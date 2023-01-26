import Phaser from "phaser";
import { BackButton } from "../GlobalObjects";
import ScoreTracker from "../ScoreTracker";

export default class Variables1 extends Phaser.Scene{
    
    private mi!: Phaser.GameObjects.Image; //Moorish Idol
    private pbf!: Phaser.GameObjects.Image; //Pennant Butterflyfish
    private rbf!: Phaser.GameObjects.Image; //Racoon Butterflyfish
    private pond!: Phaser.GameObjects.Image;
    private popup!: Phaser.GameObjects.Image;

    private feedback!: Phaser.GameObjects.Text;
    private question!: Phaser.GameObjects.Text;
    private code!: Phaser.GameObjects.Text;
    private score!: Phaser.GameObjects.Text;

    private count!: number;
    private answer!: string;
    private answers!: Array<string>;
    private questions!: Array<string>;

    private splashSound!: Phaser.Sound.BaseSound;
    private buttonSound!: Phaser.Sound.BaseSound;
    private correctSound!: Phaser.Sound.BaseSound;
    private wrongSound!: Phaser.Sound.BaseSound;
    private nextLevelSound!: Phaser.Sound.BaseSound;
    private resetButtonSound!: Phaser.Sound.BaseSound;

    constructor(){
        super('Variables1');
    }

    preload(){
        this.load.image('Pond','assets/Pond.png');
        this.load.image('Moorish Idol','assets/MI.png');
        this.load.image('Pennant Butterflyfish','assets/PBF.png');
        this.load.image('Racoon Butterflyfish','assets/RBF.png');
        this.load.image('Field','assets/field.png');
        this.load.image('Rocks','assets/rocks.png');
        this.load.image('Popup','assets/popup.png')

        this.load.audio('splash', '/assets/sounds/splash.mp3')
        this.load.audio('correct', '/assets/sounds/correct.mp3')
        this.load.audio('button', '/assets/sounds/button.mp3')
        this.load.audio('wrong', '/assets/sounds/wrong.mp3')
        this.load.audio('nextLevel', '/assets/sounds/nextLevel.mp3')
        this.load.audio('resetButton', '/assets/sounds/resetButton.mp3')
        
    }

    create(){
        this.splashSound = this.sound.add('splash');
        this.correctSound = this.sound.add('correct');
        this.buttonSound = this.sound.add('button');
        this.wrongSound = this.sound.add('wrong');
        this.nextLevelSound = this.sound.add('nextLevel');
        this.resetButtonSound = this.sound.add('resetButton');

        this.count = 0;
        this.questions = [
            "Make the variable Pond hold the \nMoorish Idol",
            "Make the variable Pond hold the \nPennant Butterflyfish",
            "Make the variable Pond hold the \nRacoon Butterflyfish"
        ]
        this.answers = [
            "Moorish Idol",
            "Pennant Butterflyfish",
            "Racoon Butterflyfish"
        ]

        //Create Background of level
        this.add.image(0,0,'Field').setOrigin(0,0);
        this.add.image(0,0,'Rocks').setOrigin(0,0);

        this.question= this.add.text(8,6,this.questions[this.count]);
        this.question.setFontSize(30);

        //create pond
        this.pond = this.add.image(75,300,'Pond');

        //Create drag and drop fish
        this.add.text(200,75,"Moorish Idol");
        this.mi = this.add.image(275,150,'Moorish Idol').setInteractive();
        this.mi.depth = 0
        
        this.add.text(200,225,'Pennant Butterflyfish');
        this.pbf = this.add.image(275,300,'Pennant Butterflyfish').setInteractive();
        this.pbf.depth = 0
        
        this.add.text(200,375,'Racoon Butterflyfish')
        this.rbf = this.add.image(275,450,'Racoon Butterflyfish').setInteractive();
        this.rbf.depth = 0

        this.input.setDraggable(this.mi);
        this.input.setDraggable(this.pbf);
        this.input.setDraggable(this.rbf);

        this.input.on('drag', (pointer: any, gameObject: {x: number, y: number, depth: number}, dragX: number, dragY: number) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
            gameObject.depth = 1;
        });

        //when the fish is on top of the pond it plays the splash sound
        this.input.on('dragend', (pointer: any, gameObject: {x: number, y: number, depth: number, texture: any}) => {
            if(gameObject.x > 50 && gameObject.x < 100 && gameObject.y > 275 && gameObject.y < 325){
                this.splashSound.play();
                gameObject.depth = 0;
                this.code.setText(`Pond = ${gameObject.texture.key}`);
                this.answer = gameObject.texture.key;
            }
            else {
                this.code.setText("Pond = ");
                this.answer = "";
            }
        });

        //Create view of students code
        this.add.text(500,175,"Code:").setFontSize(40);
        this.code = this.add.text(500,225,"Pond = ").setFontSize(15);

        //Create check code button
        let checkCode = this.add.text(500,400,"Check Code").setInteractive();
        checkCode.on("pointerdown",this.checkAnswer,this)

        //Initiate feedback window
        this.popup = this.add.image(375,350,'Popup');
        this.popup.alpha=0;

        this.feedback = this.add.text(275,300,"");
        this.feedback.alpha=0;

        //Initiate drag and drop
        //this.input.on("pointerdown",this.startDrag,this);

        //Creates a score tracker
        this.score = this.add.text(600, 5, `Score: ${ScoreTracker.getScore().toString()}`).setFontSize(30)

        //creates reset fish button
        let resetFish = this.add.text(600,30,"Reset Fish").setInteractive().setFontSize(30)

        resetFish.on("pointerdown",this.resetFishPosition,this);

        //add back button
        new BackButton(this, 'game')


        var zone = this.add.zone(75, 300, 100, 100).setRectangleDropZone(100, 100);

        this.input.on('drop', function (pointer: any, gameObject: any, dropZone: any) {
            gameObject.x = dropZone.x;
            gameObject.y = dropZone.y;
        });

    }

    update(): void {
        
    }

    //Checks if the user's answer is correct
    checkAnswer(){
        if (this.answer === this.answers[this.count]){
            ScoreTracker.addScore();
            this.correctSound.play();
            this.resetFishPosition();
            this.score.setText(`Score: ${ScoreTracker.getScore().toString()}`)
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
                this.buttonSound.play();
                close.destroy();
            });

            //Controls the flow of the questions
            if (this.count<2){
                this.count++;
                this.question.setText(this.questions[this.count])
            }
            //If the user has completed all the questions, they are taken to the next level
            else{
                this.nextLevelSound.play();
                this.scene.start('Variables2');
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
                this.buttonSound.play();
                close.destroy();
            });
        }
        else{
            ScoreTracker.deductScore();
            this.wrongSound.play();
            this.score.setText(`Score: ${ScoreTracker.getScore().toString()}`)
            //Display feedback window
            this.popup.alpha=1;
            this.feedback.alpha=1;
            this.feedback.setText("I'm sorry, you set \nthe variable to \n" + this.answer + "\nbut you need to set \nthe variable to \n" + this.answers[this.count])
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
                this.buttonSound.play();
                close.destroy();
            });
        }
    }

    resetFishPosition() {
        this.resetButtonSound.play();
        this.mi.x = 275;
        this.mi.y = 150;
        this.pbf.x = 275;
        this.pbf.y = 300;
        this.rbf.x = 275;
        this.rbf.y = 450;
    }

    

}
