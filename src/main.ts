
import Phaser from 'phaser'
import MenuScene from './scenes/MenuScene'
import GameScene from './scenes/GameScene'
import InstructionsScene from './scenes/InstructionsScene'
import Variables1 from './scenes/Variables1'
import Pointers1 from './scenes/Pointers1'
import Variables2 from './scenes/Variables2'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: 'app',
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
		width: 800,
		height: 600,
	},
	scene: [MenuScene,GameScene,InstructionsScene,Pointers1,Variables1, Variables2],
}

export default new Phaser.Game(config)