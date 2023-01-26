import Phaser from "phaser";
import BackButton from "../GlobalObjects";

export default class InstructionsScene extends Phaser.Scene {

    private mi!: Phaser.GameObjects.Image;
    private pbf!: Phaser.GameObjects.Image;
    private rbf!: Phaser.GameObjects.Image;
    private pond!: Phaser.GameObjects.Image;
    private popup!: Phaser.GameObjects.Image;
    private textBub!: Phaser.GameObjects.Image
    private instruct!: Phaser.GameObjects.Text

    private feedback!: Phaser.GameObjects.Text;
    private question!: Phaser.GameObjects.Text;
    private code!: Phaser.GameObjects.Text;

    private count!: number;
    private answer!: string;
    private answers!: Array<string>;
    private questions!: Array<string>;
    private dragObj: any;

    constructor() {
        super('instructions')
    }

    preload() {
<<<<<<< HEAD
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
=======
        this.load.image('background', 'assets/game_background.jpg')
    }

    create() {
        let background = this.add.image(0, 0, 'background')
        //centers the image
        background.setOrigin(0, 0)
>>>>>>> main

        //list of questions and answers 
        this.questions = [
            "Make the variable Pond hold the \nMoorish Idol",
            "Make the variable Pond hold the \nPennant Butterflyfish",
            "Make the variable Pond hold the \nRacoon Butterflyfish"
        ]
        this.answers = ["Moorish Idol","Pennant Butterflyfish","Racoon Butterflyfish"]

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

        //create fisherman
        this.add.image(550, 500, 'fishMan')
        
        //create text bubble popup
        this.textBub = this.add.image(700, 350, 'TB')
        this.textBub.alpha=0
        this.instruct = this.add.text(700, 350, "")
        this.instruct.alpha =1

        //explain question and how to answer it
        this.textBub.alpha=1;
            this.instruct.alpha=1;
            this.instruct.setText('Click on the correct \npond of fish when you \nare asked a question.\n The more questions you\n answer, the more you\n level up. Keep playing\n to upgrade your fishing\n poles or unlock\n new places to fish\n with new fish.\n Good luck!')
            this.instruct.setTint(0xFF0000);
            this.instruct.setFontSize(20)
        

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
        });
        //changed style when hovering
        let ixStyle = { font: "bold 50px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        let selectedixStyle = { font: "bold 50px Arial", fill: "#5271FF", boundsAlignH: "center", boundsAlignV: "middle" };
        ixButton.setStyle(ixStyle);
        ixButton.on('pointerover', () => {
            ixButton.setStyle(selectedixStyle);
        });
        ixButton.on('pointerout', () => {
            ixButton.setStyle(ixStyle);
        });


<<<<<<< HEAD

        //exit how to play button creation
        let xButton = this.add.text(725, 25, 'X');

        //allows user to click on the X
        xButton.setInteractive();
        xButton.on('pointerdown', () => {
            this.scene.start('menu');
        });

        //changes the style of the X when hovered over
        let xStyle = { font: "bold 50px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        let selectedXStyle = { font: "bold 50px Arial", fill: "#5271FF", boundsAlignH: "center", boundsAlignV: "middle" };
        xButton.setStyle(xStyle);
        xButton.on('pointerover', () => {
            xButton.setStyle(selectedXStyle);
        });
        xButton.on('pointerout', () => {
            xButton.setStyle(xStyle);
        });
=======
        //add back button
        new BackButton(this, 'menu')
>>>>>>> main

        //Create view of students code
        this.add.text(500,175,"Code:").setFontSize(40);
        this.code = this.add.text(500,225,"Pond = ").setFontSize(15);







    }

    update() {

    }

}
