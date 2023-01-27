export class BackButton extends Phaser.GameObjects.Container {
  private location: string;

  constructor(scene: Phaser.Scene, location: string) {
    super(scene);

    this.location = location;
    this.button();
  }

  button() {
    let button = this.scene.add.text(25, 550, "← Back");

    //make button clickable
    button.setInteractive();

    //button styles
    let buttonStyle = {
      font: "bold 25px Arial",
      fill: "#03f0fc",
    };
    let selectedButtonStyle = {
      font: "bold 25px Arial",
      fill: "#5271FF",
    };

    button.setStyle(buttonStyle);
    button.depth = 3

    button.on("pointerover", () => {
      button.setStyle(selectedButtonStyle);
    });

    button.on("pointerdown", () => {
      this.scene.scene.start(this.location);
    });

    button.on("pointerout", () => {
      button.setStyle(buttonStyle);
    });
  }
}

//🔇🔊
import soundManager from "../src/SoundManager";
export class MuteButton extends Phaser.GameObjects.Container {

  constructor(scene: Phaser.Scene) {
    super(scene);

    this.button();
  }

  button() {
    let muted = soundManager.isMuted()
    let button = this.scene.add.text(130, 552, this.text(muted)).setFont('Arial').setFontSize(24)

    //make button clickable
    button.setInteractive();
    button.depth = 3

    button.on("pointerdown", () => {
      let status: boolean = soundManager.toggle()
      button.setText(this.text(status));
    });

  }

  text(status: boolean) {
    return status ? '🔇' : '🔊'
  }

  isMuted() {
    return soundManager.isMuted()
  }
}

import scoreTracker from "../src/ScoreTracker";
export class ScoreDisplay extends Phaser.GameObjects.Container {
  private score!: Phaser.GameObjects.Text;
  private xPos!: number;
  private yPos!: number;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene);

    this.xPos = x
    this.yPos = y
    this.show();
  }

  show() {
    this.score = this.scene.add.text(
      this.xPos,
      this.yPos,
      `Score: ${scoreTracker.getScore()}`
    );

    //button styles
    let scoreStyle = {
      font: "28px Arial",
      fill: "#67b82b",
    };

    this.score.setStyle(scoreStyle);
  }

  update() {
    this.score.setText(`Score: ${scoreTracker.getScore()}`);
  }

  addScore() {
    scoreTracker.addScore();
    this.update();
  }

  deductScore() {
    scoreTracker.deductScore();
    this.update();
  }
}
