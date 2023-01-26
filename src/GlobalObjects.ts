export default class BackButton extends Phaser.GameObjects.Container {

    private location: string

    constructor(scene: Phaser.Scene, location: string) {
        super(scene)

        this.location = location
        this.button()
    }

    button() {
        let button = this.scene.add.text(25, 550, '<- back');

        //make button clickable
        button.setInteractive();
        
        //button styles
        let buttonStyle = { font: "bold 25px Arial", fill: "#03f0fc", boundsAlignH: "center", boundsAlignV: "middle" };
        let selectedButtonStyle = { font: "bold 25px Arial", fill: "#5271FF", boundsAlignH: "center", boundsAlignV: "middle" };
        
        button.setStyle(buttonStyle);

        button.on('pointerover', () => {
            button.setStyle(selectedButtonStyle);
        });

        button.on('pointerdown', () => {
            this.scene.scene.start(this.location);
        });

        button.on('pointerout', () => {
            button.setStyle(buttonStyle);
        });
    }
    

}