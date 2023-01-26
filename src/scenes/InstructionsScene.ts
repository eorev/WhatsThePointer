import Phaser from "phaser";
import { BackButton } from "../GlobalObjects";

export default class InstructionsScene extends Phaser.Scene {

    constructor() {
        super('instructions')
    }

    preload() {
        this.load.image('background', 'assets/game_background.jpg')
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

        //add back button
        new BackButton(this, 'menu')

    }

    update() {

    }

}
