import Phaser from "phaser";

export default class InstructionsScene extends Phaser.Scene {

    constructor() {
        super('instructions')
    }

    preload() {
        this.load.image('instructionsBackground', '/assets/black.png')
    }

    create() {
        let background = this.add.image(0, 0, 'instructionsBackground')
        //centers the image
        background.setOrigin(0, 0)

        //creates a text for the instructions
        let instructions = this.add.text(50, 100, 'Click on the correct pond of fish when \nyou are asked a question. The more questions \nyou answer, the more you level up. Keep playing \nto upgrade your fishing poles or unlock new \nplaces to fish with new fish. Good luck!');

        //changes font size
        let instructionsStyle = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        instructions.setStyle(instructionsStyle);

        //exit button creation
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

    }

    update() {

    }
}
