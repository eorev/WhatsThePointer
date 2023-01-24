
import Phaser from 'phaser'
import MenuScene from './scenes/MenuScene'
import Pond1 from './scenes/Pond1'
import Pond2 from './scenes/Pond2'
import Pond3 from './scenes/Pond3'
import Pond4 from './scenes/Pond4'
import Pond5 from './scenes/Pond5'
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
	scene: [MenuScene,GameScene,InstructionsScene,Pond1, Pond2, Pond3, Pond4, Pond5],
}

export default new Phaser.Game(config)