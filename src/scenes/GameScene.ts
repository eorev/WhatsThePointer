import Phaser from "phaser";
import scoreTracker from "../ScoreTracker";

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('game')
    }

    preload() {
        this.load.image('background', 'assets/game_background.jpg')
    }

    create() {
        let background = this.add.image(0, 0, 'background')
        //centers the image
        background.setOrigin(0, 0)

        //creates a list of ponds displayed left to right that the player can click on
        /*let ponds = this.add.group();
        let pond1 = this.add.text(50, 100, 'Pond 1');
        let pond2 = this.add.text(200, 100, 'Pond 2');
        let pond3 = this.add.text(350, 100, 'Pond 3');
        let pond4 = this.add.text(500, 100, 'Pond 4');
        let pond5 = this.add.text(650, 100, 'Pond 5');
        ponds.add(pond1);
        ponds.add(pond2);
        ponds.add(pond3);
        ponds.add(pond4);
        ponds.add(pond5);*/

        let variables = this.add.text(300,200,"Variables");
        let pointers = this.add.text(300,400,"Pointers");

        variables.setInteractive();
        variables.on("pointerdown",()=>{
            this.scene.start('Variables1');
        })
        variables.setFontSize(40)

        pointers.setInteractive();
        pointers.on('pointerdown',()=>{
            this.scene.start("Pointers1")
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


        //exit button creation
        let xButton = this.add.text(25, 550, '<- back');

        //allows user to click on the X
        xButton.setInteractive();
        xButton.on('pointerdown', () => {
            this.scene.start('menu');
        });

        //changes the style of the X when hovered over
        let xStyle = { fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        let selectedXStyle = { fill: "#5271FF", boundsAlignH: "center", boundsAlignV: "middle" };
        xButton.setStyle(xStyle);
        xButton.on('pointerover', () => {
            xButton.setStyle(selectedXStyle);
        });
        xButton.on('pointerout', () => {
            xButton.setStyle(xStyle);
        });

        //score board
        let scoreText = this.add.text(16, 16, `Score: ${scoreTracker.getScore()}`, {
        fontSize: '32px',
        color: '#fff' })

    }

    update() {

    }

}
