import Phaser from 'phaser'
//import MenuScene from './scenes/MenuScene'
import MenuScence from './MenuScene'
import Pond1 from './Pond1'
import GameScene from './GameScene'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: 'app',
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
		width: 800,
		height: 600,
	},
	scene: [MenuScence,GameScene,Pond1],
}

export default new Phaser.Game(config)
