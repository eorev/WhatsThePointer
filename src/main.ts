import Phaser from 'phaser'

import HelloWorldScene from './MenuScene'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: 'app',
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
		width: 800,
		height: 600,
	},
	scene: [HelloWorldScene],
}

export default new Phaser.Game(config)
