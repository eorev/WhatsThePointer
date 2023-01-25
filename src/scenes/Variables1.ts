import Phaser from "phaser";
import ScoreTracker from "../ScoreTracker";

export default class Variables1 extends Phaser.Scene{
    
    private count: number;
    private answers: any;
    private questions: any;
    private dragObj: any;
    private mi: any;
    private pbf: any;
    private rbf: any;
    private pond: any;
    private code: any;
    private answer: string;
    private feedback: any;
    private popup: any;
    private question: any;

    constructor(){
        super('Variables1');
    }

    preload(){
        this.load.image('Pond','assets/Pond.png');
        this.load.image('MI','assets/MI.png');
        this.load.image('PBF','assets/PBF.png');
        this.load.image('RBF','assets/RBF.png');
        this.load.image('Field','assets/field.png');
        this.load.image('Rocks','assets/rocks.png');
        this.load.image('Popup','assets/popup.png')
    }

    create(){
        this.count = 0;
        this.questions = [
            "Make the variable pond equal to the \nMoorish Idol",
            "Make the variable pond equal to the \nPennant Butterflyfish",
            "Make the variable pond equal to the \nRacoon Butterflyfish"
        ]
        this.answers = ["Moorish Idol","Pennant Butterflyfish","Racoon Butterflyfish"]

        //Create Background of level
        this.add.image(0,0,'Field').setOrigin(0,0);
        this.add.image(0,0,'Rocks').setOrigin(0,0);

        this.question= this.add.text(8,6,this.questions[this.count]);
        this.question.setFontSize(30);

        this.pond = this.add.image(75,300,'Pond');

        //Create drag and drop fish
        this.add.text(200,75,"Moorish Idol");
        this.mi = this.add.image(275,150,'MI').setInteractive();
        
        this.add.text(200,225,'Pennant Butterflyfish');
        this.pbf = this.add.image(275,300,'PBF').setInteractive();
        
        this.add.text(200,375,'Racoon Butterflyfish')
        this.rbf = this.add.image(275,450,'RBF').setInteractive();

        this.add.text(500,175,"Code:");
        this.code = this.add.text(500,225,"Pond = ");

        //Create check code button
        let checkCode = this.add.text(500,400,"Check Code").setInteractive();

        //Initiate feedback window
        this.popup = this.add.image(375,350,'Popup');
        this.popup.alpha=0;

        this.feedback = this.add.text(275,300,"");
        this.feedback.alpha=0;

        checkCode.on("pointerdown",this.checkAnswer,this)

        //Initiate drag and drop
        this.input.on("pointerdown",this.startDrag,this);
    }

    update(time: number, delta: number): void {
        //Check for collision of fish and pond to change code respectively
        if(Phaser.Geom.Intersects.RectangleToRectangle(this.pond.getBounds(),this.mi.getBounds())){
            this.code.setText("Pond = Moorish Idol")
            this.answer="Moorish Idol";
        }     
        
        if(Phaser.Geom.Intersects.RectangleToRectangle(this.pond.getBounds(),this.pbf.getBounds())){
            this.code.setText("Pond = Pennant Butterflyfish")
            this.answer="Pennant Butterflyfish";
        }     

        if(Phaser.Geom.Intersects.RectangleToRectangle(this.pond.getBounds(),this.rbf.getBounds())){
            this.code.setText("Pond = Racoon Butterflyfish")
            this.answer="Racoon Butterflyfish";
        }     

        //Check if no fish are touching pond
        if(!(Phaser.Geom.Intersects.RectangleToRectangle(this.pond.getBounds(),this.rbf.getBounds()) || Phaser.Geom.Intersects.RectangleToRectangle(this.pond.getBounds(),this.pbf.getBounds()) || Phaser.Geom.Intersects.RectangleToRectangle(this.pond.getBounds(),this.mi.getBounds()))){
            this.code.setText("Pond = ");
            this.answer="";
        }
    }

    //Checks if the user's answer is correct
    checkAnswer(){
        if (this.answer === this.answers[this.count]){
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
                close.destroy();
            });

            if (this.count<2){
                this.count++;
                this.question.setText(this.questions[this.count])
            }
            else{
                this.count=0;
                this.question.setText(this.questions[this.count])
            }
            
        }
        else{
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

    startDrag(pointer, targets){
        this.input.off('pointerdown', this.startDrag, this);
        this.dragObj=targets[0];
        this.input.on('pointermove', this.doDrag, this);
        this.input.on('pointerup', this.stopDrag, this);
    
      }
      doDrag(pointer){
        this.dragObj.x=pointer.x;
        this.dragObj.y=pointer.y;
      }
    
      stopDrag(){
        this.input.on('pointerdown', this.startDrag, this);
        this.input.off('pointermove', this.doDrag, this);
        this.input.off('pointerup', this.stopDrag, this);
      }

}