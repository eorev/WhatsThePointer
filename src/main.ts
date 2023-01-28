
import Phaser from 'phaser'
import GameScene from './scenes/GameScene'
import InstructionsScene from './scenes/InstructionsScene'
import MenuScene from './scenes/MenuScene'

// Variables game levels
import Variables1 from './scenes/Variables1'
import Variables2 from './scenes/Variables2'
//import Variables3 from './scenes/Variables3'

// Pointers game levels
import Pointers1 from './scenes/Pointers1'
import Pointers2 from './scenes/Pointers2'
import Pointers3 from './scenes/Pointers3'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: 'app',
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
		width: 800,
		height: 600,
	},

	scene: [MenuScene,GameScene,InstructionsScene,Pointers1,Pointers2,Pointers3,Variables1],

}

export default new Phaser.Game(config)