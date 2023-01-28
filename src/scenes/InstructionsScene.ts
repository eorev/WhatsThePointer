import Phaser from "phaser";
import ScoreTracker from "../ScoreTracker";

export default class InstructionsScene extends Phaser.Scene {

    private mi!: Phaser.GameObjects.Image;
    private pbf!: Phaser.GameObjects.Image;
    private rbf!: Phaser.GameObjects.Image;
    private pond!: Phaser.GameObjects.Image;
    private popup!: Phaser.GameObjects.Image;
    private textBub!: Phaser.GameObjects.Image
    private instruct!: Phaser.GameObjects.Text

    private code!: Phaser.GameObjects.Text;
    private score!: Phaser.GameObjects.Text;

    private feedback!: Phaser.GameObjects.Text;
    private question!: Phaser.GameObjects.Text;
  
    private count!: number;
    private answer!: string;
    private answers!: Array<string>;
    private questions!: Array<string>;
    private dragObj: any;

    private splashSound!: Phaser.Sound.BaseSound;

    constructor() {
        super('instructions')
    }

    preload() {
        //this.load.image('instructionsBackground', '/assets/black.png')
        this.load.image('Pond','assets/Pond.png');
        this.load.image('MI','assets/MI.png');
        this.load.image('PBF','assets/PBF.png');
        this.load.image('RBF','assets/RBF.png');
        this.load.image('Field','assets/field.png');
        this.load.image('Rocks','assets/rocks.png');
        this.load.image('Popup','assets/popup.png')

        //fisher man
        this.load.image('fishMan', 'assets/FishMan.jfif')
        //thought bubble
        this.load.image('TB', 'assets/TB.png')

    }

    create() {
        this.count = 0;
        //list of questions and answers 
        this.questions = [
            "Drag the Morish Idol into the pond",
            "Congratudations! You are now ready to\nexit and play the real game. Click the\ntop right X to go back to the menu"
        ]
        this.answers = ["Moorish Idol", "n/a"]

        //Create Background of level
        this.add.image(0,0,'Field').setOrigin(0,0);
        this.add.image(0,0,'Rocks').setOrigin(0,0);

        this.question= this.add.text(8,6,this.questions[this.count]);
        this.question.setFontSize(24);

        //create pond
        this.pond = this.add.image(75,300,'Pond');

        //Create drag and drop fish
        this.add.text(200,75,"Moorish Idol");
        this.mi = this.add.image(275,150,'MI').setInteractive();
        
        this.add.text(200,225,'Pennant Butterflyfish');
        this.pbf = this.add.image(275,300,'PBF').setInteractive();
        
        this.add.text(200,375,'Racoon Butterflyfish')
        this.rbf = this.add.image(275,450,'RBF').setInteractive();

        //create fisherman
        this.add.image(550, 500, 'fishMan')
        
        //create text bubble popup
        this.textBub = this.add.image(700, 350, 'TB')
        this.textBub.alpha=0
        this.instruct = this.add.text(600, 300, "")
        this.instruct.alpha =1
        this.instruct.setFontSize(10)

        //Create check code button
        let checkCode = this.add.text(500,250,"Check Code").setInteractive();
        checkCode.on("pointerdown",this.checkAnswer,this)
        

        //popup for instructions 
        this.popup = this.add.image(375,350,'Popup');
        this.popup.alpha=0;
        this.feedback = this.add.text(250,250,"");
        this.feedback.alpha=1;
        //creates a text for the instructions
        this.popup.alpha=1;
            this.feedback.alpha=1;
            this.feedback.setText('Click on the correct \npond of fish when you \nare asked a question.\n The more questions you\n answer, the more you\n level up. Keep playing\n to upgrade your fishing\n poles or unlock\n new places to fish\n with new fish.\n Good luck!')
            this.feedback.setTint(0xFF0000);
            this.feedback.setFontSize(20)
            
        //exit instructions button created
        let ixButton = this.add.text(500, 500, 'X');
        ixButton.setInteractive();
        ixButton.on('pointerdown', () => {
            this.feedback.alpha=0;
            this.popup.alpha=0;
            ixButton.destroy();
            //popup on where to start
            this.textBub.alpha=1;
            this.instruct.alpha=1;
            this.instruct.setText('Answer the first\nquestion in the\ntop left corner')
        });
        //changed style when hovering
        let ixStyle = { font: "bold 50px Arial", fill: "#0xFF0000", boundsAlignH: "center", boundsAlignV: "middle" };
        let selectedixStyle = { font: "bold 50px Arial", fill: "#5271FF", boundsAlignH: "center", boundsAlignV: "middle" };
        ixButton.setStyle(ixStyle);
        ixButton.on('pointerover', () => {
            ixButton.setStyle(selectedixStyle);
        });
        ixButton.on('pointerout', () => {
            ixButton.setStyle(ixStyle);
        });

        //Initiate drag and drop
        this.input.on("pointerdown",this.startDrag,this);

        //Creates a score tracker
        this.score = this.add.text(600, 5, `Score: ${ScoreTracker.getScore().toString()}`).setFontSize(30)

        //creates reset fish button
        let resetFish = this.add.text(600,30,"Reset Fish").setInteractive().setFontSize(30)

        resetFish.on("pointerdown",this.resetFishPosition,this);

        //let fxButton = this.add.text(25, 550, '<- back');
        
        //walk through question...

        //instruct popup setup 
        this.textBub.alpha=0;
        this.instruct.alpha=0;
            //this.instruct.setText('First, drag the \nMorish Idol into\n the pond.')
            this.instruct.setTint(0xFFFFFF);
            this.instruct.setFontSize(20)



        //exit how to play button creation
        let xButton = this.add.text(725, 75, 'X');

        //allows user to click on the X
        xButton.setInteractive();
        xButton.on('pointerdown', () => {
            this.scene.start('menu');
        });

        //changes the style of the X when hovered over
        let xStyle = { font: "bold 50px Arial", fill: "#0xff0000", boundsAlignH: "center", boundsAlignV: "middle" };
        let selectedXStyle = { font: "bold 50px Arial", fill: "#5271FF", boundsAlignH: "center", boundsAlignV: "middle" };
        xButton.setStyle(xStyle);
        xButton.on('pointerover', () => {
            xButton.setStyle(selectedXStyle);
        });
        xButton.on('pointerout', () => {
            xButton.setStyle(xStyle);
        });

        //Create view of students code
        this.add.text(500,175,"Code:").setFontSize(40);
        this.code = this.add.text(500,225,"Pond = ").setFontSize(15);

    }


    startDrag(_pointer: Phaser.Input.Pointer, targets: Phaser.GameObjects.GameObject[]){
        this.input.off('pointerdown', this.startDrag, this);
        this.dragObj=targets[0];
        this.input.on('pointermove', this.doDrag, this);
        this.input.on('pointerup', this.stopDrag, this);
        this.textBub.alpha=0
        this.instruct.alpha=0
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
    
        //this.textBub.alpha=1;
        //this.instruct.alpha=1;
        //this.instruct.setText('Answer the first\nquestion in the\ntop left corner')

      }
      resetFishPosition() {
        this.mi.x = 275;
        this.mi.y = 150;
        this.pbf.x = 275;
        this.pbf.y = 300;
        this.rbf.x = 275;
        this.rbf.y = 450;
    }
    //Checks if the user's answer is correct
    checkAnswer(){
        if (this.answer === this.answers[this.count]){
            ScoreTracker.addScore();
            this.score.setText(`Score: ${ScoreTracker.getScore().toString()}`)

            //displays feedback window
            this.popup.alpha = 1;
            this.feedback.alpha=1;

            //congrats message
            this.feedback.setText("Congratulations, you \nset the variable \nto the correct value!\n\n Now, to reset the fish\nclick the 'reset fish'\nbutton in the top right.\nNext, close this popup\nand follow the\ninstructions up top")
            this.feedback.setTint(0x00FF00);
            this.feedback.setFontSize(20);
            
            //Close button to exit window
            let close = this.add.text(325,450,"Close").setInteractive();
            close.setTint(0xff0000);
            close.setFontSize(26)
            close.on("pointerdown",()=>{
                this.feedback.alpha=0;
                this.popup.alpha=0;
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
                close.destroy();
            });
        }
        else{
            ScoreTracker.deductScore();
            this.score.setText(`Score: ${ScoreTracker.getScore().toString()}`)
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
                close.destroy();
            });
        }
        
    }

    update() {
        //Check for collision of fish and pond to change code respectively
        if(Phaser.Geom.Intersects.RectangleToRectangle(this.pond.getBounds(),this.mi.getBounds())){
            this.answer="Moorish Idol";
            this.code.setText("Pond = "+this.answer)
            //popup to click check code button
            this.textBub.alpha=1;
            this.instruct.alpha=1;
            this.instruct.setText('Now, click on\n the "check code"\nbutton.');
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
    
    
}
