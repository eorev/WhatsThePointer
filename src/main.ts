import Phaser from 'phaser'
import MenuScene from './scenes/MenuScene'
import Pond1 from './Pond1'
import GameScene from './scenes/GameScene'
import InstructionsScene from './scenes/InstructionsScene'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: 'app',
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
		width: 800,
		height: 600,
	},
	scene: [MenuScene,GameScene,InstructionsScene,Pond1],
}

export default new Phaser.Game(config)
