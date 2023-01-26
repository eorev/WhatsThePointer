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
            this.scene.start("Pond1")
        })
        pointers.setFontSize(40);


        //allows the user to click on the pond to enter the pond scence
        /*pond1.setInteractive();
        pond1.on('pointerdown', () => {
            this.scene.start('Pond1');
        });
        pond2.setInteractive();
        pond2.on('pointerdown', () => {
            this.scene.start('Pond2');
        });
        pond3.setInteractive();
        pond3.on('pointerdown', () => {
            this.scene.start('Pond3');
        });
        pond4.setInteractive();
        pond4.on('pointerdown', () => {
            this.scene.start('Pond4');
        });
        pond5.setInteractive();
        pond5.on('pointerdown', () => {
            this.scene.start('Pond5');
        });

        //changes the style of the pond when hovered over
        let pondStyle = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        let selectedPondStyle = { font: "bold 32px Arial", fill: "#5271FF", boundsAlignH: "center", boundsAlignV: "middle" };
        pond1.setStyle(pondStyle);
        pond2.setStyle(pondStyle);
        pond3.setStyle(pondStyle);
        pond4.setStyle(pondStyle);
        pond5.setStyle(pondStyle);
        pond1.on('pointerover', () => {
            pond1.setStyle(selectedPondStyle);
        });
        pond1.on('pointerout', () => {
            pond1.setStyle(pondStyle);
        });
        pond2.on('pointerover', () => {
            pond2.setStyle(selectedPondStyle);
        });
        pond2.on('pointerout', () => {
            pond2.setStyle(pondStyle);
        });
        pond3.on('pointerover', () => {
            pond3.setStyle(selectedPondStyle);
        });
        pond3.on('pointerout', () => {
            pond3.setStyle(pondStyle);
        });
        pond4.on('pointerover', () => {
            pond4.setStyle(selectedPondStyle);
        });
        pond4.on('pointerout', () => {
            pond4.setStyle(pondStyle);
        });
        pond5.on('pointerover', () => {
            pond5.setStyle(selectedPondStyle);
        });
        pond5.on('pointerout', () => {
            pond5.setStyle(pondStyle);
        });*/


        //exit button creation
        let xButton = this.add.text(25, 550, '<- back');

        //allows user to click on the X
        xButton.setInteractive();
        xButton.on('pointerdown', () => {
            this.scene.start('menu');
        });

        //changes the style of the X when hovered over
        let xStyle = { font: "bold 25px Arial", fill: "#03f0fc", boundsAlignH: "center", boundsAlignV: "middle" };
        let selectedXStyle = { font: "bold 25px Arial", fill: "#5271FF", boundsAlignH: "center", boundsAlignV: "middle" };
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
