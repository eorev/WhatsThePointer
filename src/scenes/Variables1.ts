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
    }

    create(){
        this.count = 0;
        this.questions = [
            "Make the variable pond equal to the Moorish Idol",
            "Make the variable pond equal to the Pennant Butterflyfish",
            "Make the variable pond equal to the Racoon Butterflyfish"
        ]
        this.answers = ["Moorish Idol","Pennant Butterflyfish","Racoon Butterflyfish"]

        this.add.image(0,0,'Field').setOrigin(0,0);
        this.add.image(0,0,'Rocks').setOrigin(0,0);

        this.pond = this.add.image(75,300,'Pond');

        this.add.text(200,75,"Moorish Idol");
        this.mi = this.add.image(275,150,'MI').setInteractive();
        
        this.add.text(200,225,'Pennant Butterflyfish');
        this.pbf = this.add.image(275,300,'PBF').setInteractive();
        
        this.add.text(200,375,'Racoon Butterflyfish')
        this.rbf = this.add.image(275,450,'RBF').setInteractive();

        this.add.text(500,175,"Code:");
        this.code = this.add.text(500,225,"Pond = ");

        this.feedback = this.add.text(500,350,"");
        let checkCode = this.add.text(500,400,"Check Code").setInteractive();

        checkCode.on("pointerdown",this.checkAnswer,this)

        this.input.on("pointerdown",this.startDrag,this);
    }

    update(time: number, delta: number): void {
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

        if(!(Phaser.Geom.Intersects.RectangleToRectangle(this.pond.getBounds(),this.rbf.getBounds()) || Phaser.Geom.Intersects.RectangleToRectangle(this.pond.getBounds(),this.pbf.getBounds()) || Phaser.Geom.Intersects.RectangleToRectangle(this.pond.getBounds(),this.mi.getBounds()))){
            this.code.setText("Pond = ");
            this.answer="";
        }
    }

    checkAnswer(){
        if (this.answer === this.answers[this.count]){
            this.feedback.setText("Congratulations, you set the variable");
        }
        else{
            this.feedback.setText("I'm sorry, you set the variable \nto " + this.answer + " but you \nneed to set the variable to " + this.answers[this.count])
            this.feedback.setTint(0xFF0000);
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