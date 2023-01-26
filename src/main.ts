
import Phaser from 'phaser'
import MenuScene from './scenes/MenuScene'
import Pointer1 from './scenes/Pointer1'
import Pointer2 from './scenes/Pointer2'
import Pointer3 from './scenes/Pointer3'
//import Pond4 from './scenes/Pond4'
//import Pond5 from './scenes/Pond5'
import GameScene from './scenes/GameScene'
import InstructionsScene from './scenes/InstructionsScene'
import Variables1 from './scenes/Variables1'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: 'app',
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
		width: 800,
		height: 600,
	},
	scene: [MenuScene,GameScene,InstructionsScene,Pointer1,Pointer2,Pointer3, Variables1],
}

export default new Phaser.Game(config)