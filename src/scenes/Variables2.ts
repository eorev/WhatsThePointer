import Phaser from "phaser";
import { BackButton, ScoreDisplay } from "../GlobalObjects";

export default class Variables2 extends Phaser.Scene{
    
    private mi!: Phaser.GameObjects.Image; //Moorish Idol
    private pbf!: Phaser.GameObjects.Image; //Pennant Butterflyfish
    private rbf!: Phaser.GameObjects.Image; //Racoon Butterflyfish
    private pond!: Phaser.GameObjects.Image;
    private popup!: Phaser.GameObjects.Image;

    private feedback!: Phaser.GameObjects.Text;
    private question!: Phaser.GameObjects.Text;
    private code!: Phaser.GameObjects.Text;

    private count!: number;
    private answer!: string;
    private answers!: Array<string>;
    private questions!: Array<string>;
    private dragObj: any;

    private splashSound!: Phaser.Sound.BaseSound;
    private buttonSound!: Phaser.Sound.BaseSound;
    private correctSound!: Phaser.Sound.BaseSound;
    private wrongSound!: Phaser.Sound.BaseSound;
    private nextLevelSound!: Phaser.Sound.BaseSound;
    private resetButtonSound!: Phaser.Sound.BaseSound;

    private draggable!: Array<Phaser.GameObjects.Image>;

    private scoreboard!: ScoreDisplay;

    constructor(){
        super('Variables2');
        this.draggable = [this.mi, this.pbf, this.rbf];
    }

    preload(){
        this.load.image('Pond','assets/Pond.png');
        this.load.image('MI','assets/MI.png');
        this.load.image('PBF','assets/PBF.png');
        this.load.image('RBF','assets/RBF.png');
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
        this.mi = this.add.image(275,150,'MI').setInteractive();
        
        this.add.text(200,225,'Pennant Butterflyfish');
        this.pbf = this.add.image(275,300,'PBF').setInteractive();
        
        this.add.text(200,375,'Racoon Butterflyfish')
        this.rbf = this.add.image(275,450,'RBF').setInteractive();


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
        this.input.on("pointerdown",this.startDrag,this);

        //creates reset fish button
        let resetFish = this.add.text(600,30,"Reset Fish").setInteractive().setFontSize(30)

        resetFish.on("pointerdown",this.resetFishPosition,this);

       //add back button
        new BackButton(this, 'game')

        //scores
        this.scoreboard = new ScoreDisplay(this, 15, 80)
    }

    update(): void {
        //checks the counter of questions right if all correct then goes to the next scene
        if(this.count == 3){
            this.nextLevelSound.play();
            this.scene.start('Variables2');
        }

        //Check for collision of fish and pond to change code respectively
        if(Phaser.Geom.Intersects.RectangleToRectangle(this.pond.getBounds(),this.mi.getBounds())){
            this.answer="Moorish Idol";
            this.code.setText("Pond = "+this.answer);
        }     
        
        else if(Phaser.Geom.Intersects.RectangleToRectangle(this.pond.getBounds(),this.pbf.getBounds())){
            this.answer="Pennant Butterflyfish";
            this.code.setText("Pond = " + this.answer);
        }     

        else if(Phaser.Geom.Intersects.RectangleToRectangle(this.pond.getBounds(),this.rbf.getBounds())){
            this.answer="Racoon Butterflyfish";
            this.code.setText("Pond = " + this.answer);
        }     

        //Check if no fish are touching pond
        else{
            this.code.setText("Pond = ");
            this.answer="";
        }
    }

    //Checks if the user's answer is correct
    checkAnswer(){
        if (this.answer === this.answers[this.count]){
            this.scoreboard.addScore();
            this.correctSound.play();
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
            close.on("pointerdown",()=>{
                this.feedback.alpha=0;
                this.popup.alpha=0;
                this.buttonSound.play();
                close.destroy();
            });

            if (this.count<2){
                this.count++;
                this.question.setText(this.questions[this.count])
            }
            else{
                this.count=0;
                this.question.setText(this.questions[this.count])
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
            close.on("pointerdown",()=>{
                this.feedback.alpha=0;
                this.popup.alpha=0;
                this.buttonSound.play();
                close.destroy();
            });
        }
        else{
            this.scoreboard.deductScore();
            this.wrongSound.play();
            //Display feedback window
            this.popup.alpha=1;
            this.feedback.alpha=1;
            this.feedback.setText("I'm sorry, you set \nthe variable to \n" + this.answer + "\nbut you need to set \nthe variable to \n" + this.answers[this.count])
            this.feedback.setTint(0xFF0000);
            this.feedback.setFontSize(20)

            //Close button to exit feedback
            let close = this.add.text(325,450,"Close").setInteractive();
            close.setTint(0xff0000);
            close.setFontSize(26)
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

    startDrag(pointer: Phaser.Input.Pointer, targets: Phaser.GameObjects.GameObject[]){
        this.input.off('pointerdown', this.startDrag, this);
        this.dragObj=targets[0];
        this.input.on('pointermove', this.doDrag, this);
        this.input.on('pointerup', this.stopDrag, this);
    }
    doDrag(pointer: Phaser.Input.Pointer){
        this.dragObj.x=pointer.x;
        this.dragObj.y=pointer.y;
    }
    
      stopDrag() {

        this.input.on('pointerdown', this.startDrag, this);
        this.input.off('pointermove', this.doDrag, this);
        this.input.off('pointerup', this.stopDrag, this);

        if(Phaser.Geom.Intersects.RectangleToRectangle(this.pond.getBounds(),this.mi.getBounds()) ||
        Phaser.Geom.Intersects.RectangleToRectangle(this.pond.getBounds(),this.pbf.getBounds()) ||
        Phaser.Geom.Intersects.RectangleToRectangle(this.pond.getBounds(),this.rbf.getBounds())){
            //TODO: splash sound
            this.splashSound.play();
        }

      }

}
