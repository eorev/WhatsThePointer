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
		var currentSelection = playButton;

		//creates the menu button selection
		this.input.keyboard.on('keydown',  (event: any) => {
			if (event.key == "ArrowDown") {
				if (currentSelection == playButton) {
					currentSelection = optionsButton;
				} else if (currentSelection == optionsButton) {
					currentSelection = exitButton;
				}
			} else if (event.key == "ArrowUp") {
				if (currentSelection == exitButton) {
					currentSelection = optionsButton;
				} else if (currentSelection == optionsButton) {
					currentSelection = playButton;
				}
			} else if (event.key == "Enter") {
				if (currentSelection == playButton) {
					this.scene.start('game')
					console.log("play")
				} else if (currentSelection == optionsButton) {
					this.scene.start('options')
					console.log("options")
				} else if (currentSelection == exitButton) {
					this.scene.start('exit')
					console.log("exit")
				}
			}
		});
	}

	update() {
		
	}
}
