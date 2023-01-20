import Phaser from 'phaser'
import MenuStyles from '../styles/MenuStyles'

export default class MenuScence extends Phaser.Scene {
	constructor() {
		super('menu')
	}

	preload() {
		this.load.image('background', "https://picsum.photos/800/600")
	}

	create() {
		let background = this.add.image(0, 0, 'background')
		//centers the image
		background.setOrigin(0, 0)

		
	}

	update() {

	}
}
