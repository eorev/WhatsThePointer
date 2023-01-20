import Phaser from 'phaser'
import MenuScene from './scenes/MenuScene'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: 'app',
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
		width: 800,
		height: 600,
	},
	scene: [MenuScene],
}

export default new Phaser.Game(config)
