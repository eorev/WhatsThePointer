import Phaser from 'phaser'

export default class MenuScence extends Phaser.Scene {
	constructor() {
		super('menu')
	}

	preload() {
		this.load.image('background', 'https://picsum.photos/800/600')
		this.load.image('logo', './logo.png')
	}

	create() {
		let background = this.add.image(0, 0, 'background')
		//centers the image
		background.setOrigin(0, 0)

		let title = this.add.image(225, 0, 'logo')
		title.setScale(0.75)
		title.setOrigin(0, 0);


		//creates the menu buttons
		let menuButtons = this.add.group();
		let playButton = this.add.text(200, 300, 'Play');
		let optionsButton = this.add.text(200, 350, 'Options');
		let exitButton = this.add.text(200, 400, 'Exit');
		menuButtons.add(playButton); 
		menuButtons.add(optionsButton); 
		menuButtons.add(exitButton);

		//changes the style of the selected button to show it is selected
		let selectedButton = 0;
		let buttonStyle = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
		let selectedButtonStyle = { font: "bold 32px Arial", fill: "#f00", boundsAlignH: "center", boundsAlignV: "middle" };
		playButton.setStyle(selectedButtonStyle);
		optionsButton.setStyle(buttonStyle);
		exitButton.setStyle(buttonStyle);

		//changes the selected button when the up or down arrow keys are pressed
		this.input.keyboard.on('keydown', (event: any) => {
			if (event.key === 'ArrowUp') {
				if (selectedButton > 0) {
					selectedButton--;
				}
			} else if (event.key === 'ArrowDown') {
				if (selectedButton < 2) {
					selectedButton++;
				}
			}

			//changes the style of the selected button to show it is selected
			switch (selectedButton) {
				case 0:
					playButton.setStyle(selectedButtonStyle);
					optionsButton.setStyle(buttonStyle);
					exitButton.setStyle(buttonStyle);
					break;
				case 1:
					playButton.setStyle(buttonStyle);
					optionsButton.setStyle(selectedButtonStyle);
					exitButton.setStyle(buttonStyle);
					break;
				case 2:
					playButton.setStyle(buttonStyle);
					optionsButton.setStyle(buttonStyle);
					exitButton.setStyle(selectedButtonStyle);
					break;
			}
		});

		//changes the scene when the enter key is pressed
		this.input.keyboard.on('keydown', (event: any) => {
			if (event.key === 'Enter') {
				switch (selectedButton) {
					case 0:
						this.scene.start('game');
						break;
					case 1:
						this.scene.start('options');
						break;
					case 2:
						this.scene.start('exit');
						break;
				}
			}
		});
	}

	update() {

	}
}
