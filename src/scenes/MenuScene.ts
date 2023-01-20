import Phaser from 'phaser'
import MenuStyles from '../styles/MenuStyles'

export default class MenuScene extends Phaser.Scene {
	constructor() {
		super('menu')
	}

	preload() {
		this.load.image('background', MenuStyles.background.url)
	}

	create() {
		let background = this.add.image(0, 0, 'background')
		//centers the image
		background.setOrigin(0, 0)

		//creates title and centers it above the menu buttons
		let title = this.add.text(MenuStyles.title.x, MenuStyles.title.y, MenuStyles.title.text);
		title.setStyle(MenuStyles.title.style);

		//creates the menu buttons
		let menuButtons = this.add.group();
		let playButton = this.add.text(MenuStyles.menuButtons.x, MenuStyles.menuButtons.y, 'Play');
		let optionsButton = this.add.text(MenuStyles.menuButtons.x, MenuStyles.menuButtons.y + 75, 'Options');
		let exitButton = this.add.text(MenuStyles.menuButtons.x, MenuStyles.menuButtons.y + 150, 'Exit');
		menuButtons.add(playButton); 
		menuButtons.add(optionsButton); 
		menuButtons.add(exitButton);

		//changes the style of the selected button to show it is selected
		let selectedButton = 0;
		let buttonStyle = MenuStyles.menuButtons.style;
		let selectedButtonStyle = MenuStyles.selectedButtonStyle;
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
						window.close();
						break;
				}
			}
		});

		//allows the user to also hover over the game options and click to enter the scene
		playButton.setInteractive();
		playButton.on('pointerover', () => {
			playButton.setStyle(selectedButtonStyle);
			optionsButton.setStyle(buttonStyle);
			exitButton.setStyle(buttonStyle);
			selectedButton = 0;
		});

		playButton.on('pointerdown', () => {
			this.scene.start('game');
		});
		
		optionsButton.setInteractive();
		optionsButton.on('pointerover', () => {
			playButton.setStyle(buttonStyle);
			optionsButton.setStyle(selectedButtonStyle);
			exitButton.setStyle(buttonStyle);
			selectedButton = 1;
		});

		optionsButton.on('pointerdown', () => {
			this.scene.start('options');
		});

		exitButton.setInteractive();
		exitButton.on('pointerover', () => {
			playButton.setStyle(buttonStyle);
			optionsButton.setStyle(buttonStyle);
			exitButton.setStyle(selectedButtonStyle);
			selectedButton = 2;
		});

		exitButton.on('pointerdown', () => {
			window.close();
		});

	}

	update() {

	}
}
