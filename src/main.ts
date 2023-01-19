import Phaser from 'phaser'
import MenuScence from './scenes/MenuScene'
import GameScence from './scenes/GameScene'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: 'app',
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
		width: 800,
		height: 600,
	},
	scene: [MenuScence, GameScence],
}

export default new Phaser.Game(config)
