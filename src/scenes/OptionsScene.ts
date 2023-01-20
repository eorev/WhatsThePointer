import Phaser from "phaser";

export default class OptionsScene extends Phaser.Scene {

    constructor() {
        super('game')
    }

    preload() {
        this.load.image('background', 'https://picsum.photos/800/600')
    }

    create() {
        let background = this.add.image(0, 0, 'background')
        //centers the image
        background.setOrigin(0, 0)

        //creates an instructions option that the player can click on
        let options = this.add.group();
        let instructions = this.add.text(50, 100, 'How to Play');
        options.add(instructions);

        //allows the user to click on the option to enter the scene
        instructions.setInteractive();
        instructions.on('pointerdown', () => {
            this.scene.start('How to Play');
        });
        
        //changes the style of the option when hovered over
        let optionsStyle = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        let selectedOptionStyle = { font: "bold 32px Arial", fill: "#5271FF", boundsAlignH: "center", boundsAlignV: "middle" };
        
        instructions.setStyle(optionsStyle);
        
        instructions.on('pointerover', () => {
            instructions.setStyle(selectedOptionStyle);
        });
        instructions.on('pointerout', () => {
            instructions.setStyle(optionsStyle);
        });

    }


    

    update() {

    }
}
