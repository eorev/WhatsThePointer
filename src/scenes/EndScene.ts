import Phaser from "phaser";
import { MuteButton, ScoreDisplay } from "../GlobalObjects";

export default class EndScene extends Phaser.Scene {
    constructor() {
        super('end')
    }

    preload() {
        this.load.image('background', 'assets/game_background.jpg')
    }

    create() {
        let background = this.add.image(0, 0, 'background')
        //centers the image
        background.setOrigin(0, 0)

        let variables = this.add.text(300,200,"Replay?");
        let pointers = this.add.text(300,400,"Exit?");

        variables.setInteractive();
        variables.on("pointerdown",()=>{
            this.scene.start('Pointers1');
        })
        variables.setFontSize(40)

        pointers.setInteractive();
        pointers.on('pointerdown',()=>{
            this.scene.start('game');
        })
        pointers.setFontSize(40);


        //changes the style when hovered over
        let style = {fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        let selectedStyle = {fill: "#5271FF", boundsAlignH: "center", boundsAlignV: "middle" };
        variables.setStyle(style);
        pointers.setStyle(style);
        
        variables.on('pointerover', () => {
            variables.setStyle(selectedStyle);
        });
        variables.on('pointerout', () => {
            variables.setStyle(style);
        });

        pointers.on('pointerover', () => {
            pointers.setStyle(selectedStyle);
        });
        pointers.on('pointerout', () => {
            pointers.setStyle(style);
        });

        //add mute button
        new MuteButton(this)

        //add score display
        new ScoreDisplay(this, 25, 15)

    }

}
