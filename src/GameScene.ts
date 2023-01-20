import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {

    //score and question count
    public score = 0;
    public scoreText?: Phaser.GameObjects.Text
    public questionCount = 0
    public questionCountText?: Phaser.GameObjects.Text

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

        //creates a list of ponds displayed left to right that the player can click on
        let ponds = this.add.group();
        let pond1 = this.add.text(50, 100, 'Pond 1');
        let pond2 = this.add.text(200, 100, 'Pond 2');
        let pond3 = this.add.text(350, 100, 'Pond 3');
        let pond4 = this.add.text(500, 100, 'Pond 4');
        let pond5 = this.add.text(650, 100, 'Pond 5');
        ponds.add(pond1);
        ponds.add(pond2);
        ponds.add(pond3);
        ponds.add(pond4);
        ponds.add(pond5);

        //allows the user to click on the pond to enter the pond scence
        pond1.setInteractive();
        pond1.on('pointerdown', () => {
            this.scene.start('pond');
        });
        pond2.setInteractive();
        pond2.on('pointerdown', () => {
            this.scene.start('pond');
        });
        pond3.setInteractive();
        pond3.on('pointerdown', () => {
            this.scene.start('pond');
        });
        pond4.setInteractive();
        pond4.on('pointerdown', () => {
            this.scene.start('pond');
        });
        pond5.setInteractive();
        pond5.on('pointerdown', () => {
            this.scene.start('pond');
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
        });

        //score board
        this.scoreText = this.add.text(16, 16, 'score: 0', {
        fontSize: '32px',
        color: '#000' })

        //question count
        this.questionCountText = this.add.text(450, 16, 'question #: 0', {
        fontSize: '32px',
        color: '#000' })

    }


    

    update() {

    }
}
