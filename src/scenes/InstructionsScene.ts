import Phaser from "phaser";

export default class InstructionsScene extends Phaser.Scene {

    constructor() {
        super('instructions')
    }

    preload() {
        this.load.image('background', 'https://picsum.photos/800/600')
    }

    create() {
        let background = this.add.image(0, 0, 'background')
        //centers the image
        background.setOrigin(0, 0)

        //creates a text for the instructions
        let instructions = this.add.text(50, 100, 'Click on the correct pond of fish when \nyou are asked a question. The more questions \nyou answer, the more you level up. Keep playing \nto upgrade your fishing poles or unlock new \nplaces to fish with new fish. Good luck!');

        //changes font size
        let instructionsStyle = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        instructions.setStyle(instructionsStyle);

    }

    update() {

    }
}
