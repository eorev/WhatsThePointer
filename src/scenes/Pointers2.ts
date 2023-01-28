import Phaser from "phaser";
import ScoreTracker from "../ScoreTracker";

class Pond{

    pond:string;
    image:Phaser.GameObjects.Image;

    constructor(pond:string,image:Phaser.GameObjects.Image){
        this.pond=pond;
        this.image=image;
    }
}

class Fish{
    fish: string;
    image: Phaser.GameObjects.Image;

    constructor(fish:string,image:Phaser.GameObjects.Image){
        this.fish=fish;
        this.image=image;
    }
}

export default class Pointers2 extends Phaser.Scene{

    private code1!: Phaser.GameObjects.Text;
    private code2!: Phaser.GameObjects.Text;
    private scoreText!: Phaser.GameObjects.Text;
    private code1lock!: boolean;
    private code2lock!: boolean;

    private question!: Phaser.GameObjects.Text;
    private answer!: string;
    
    private answers!: Array<string>;
    private questions!: Array<string>;

    private counter!: number;

    private feedback!: Phaser.GameObjects.Text;
    private popup!: Phaser.GameObjects.Image;

    constructor(){
        super('Pointers2');
        this.answer = '';
        
        this.questions = [
            "If we want the pointer to point to the Reef\nTriggerfish, which address does it need to hold?",
            "If the pointer holds the address of pond 1, \nwhat fish does it point to?",
            "If the pointer holds the address of pond 2, \nwhat fish does it point to?"
        ];
        
        this.answers = [
            "Pond 3",
            "Crown Toby",
            "Black Triggerfish"
        ];
    }

    preload(){
        this.load.image('BTF Pond','assets/BTF_Pond.png');
        this.load.image('CTF Pond','assets/CTF_Pond.png');
        this.load.image('RTF Pond','assets/RTF_Pond.png');
        this.load.image('SWF Pond','assets/SWF_Pond.png');
        this.load.image('field','assets/field.png');
        this.load.image('rocks','assets/rocks.png');
        this.load.image('BTF','assets/BTF.png')
        this.load.image('CTF','assets/CTF.png')
        this.load.image('RTF','assets/RTF.png')
        this.load.image('SWF','assets/SWF.png')
        this.load.image('Popup','assets/popup.png');
    }

    create(){
        // ~ Evan
        //field background
        let field = this.add.image(0,0,'field')
        field.setOrigin(0, 0)

        //rock background behind question text
        let rocks = this.add.image(0,0,'rocks')
        rocks.setOrigin(0, 0)

        //back button - returns to level select
        let backBtn = this.add.text(8, 80, '<- Back');
        backBtn.setInteractive();
        backBtn.setColor("red")
        backBtn.setFont("20px") 
        backBtn.on('pointerdown', () => {
            this.scene.start('game');
        });
        // ~~

        this.counter = 0;
        this.question = this.add.text(8,6,this.questions[this.counter]);
        this.question.setFont("28px") 

        //score board
        this.scoreText = this.add.text(16, 550, `Score: ${ScoreTracker.getScore()}`, {
        fontSize: '32px',
        color: '#FFFFFF' })

        //Address and Data Value Title

        this.code1 = this.add.text(500,250,"Pointer = ");
        this.code2 = this.add.text(500,300,"Pointer* = ");
        let checkCode = this.add.text(500,400,"Check Code").setInteractive();
        checkCode.on("pointerdown",this.checkAnswer,this);

        //Creates first pond and allows it to be clicked
        let rbfPond = new Pond("Pond 1",this.add.image(175,200,'CTF Pond'));
        rbfPond.image.setInteractive();
        rbfPond.image.on("pointerdown",()=>{
            if (!this.code1lock){
                this.answer = "Pond 1";
                this.code1.setText("Pointer = " + this.answer);
            }
        })
        
        //Creates the second pond and allows it to be clicked as an answer
        let pbfPond = new Pond("Pond 2",this.add.image(175,350,'BTF Pond'));
        pbfPond.image.setInteractive();
        pbfPond.image.on("pointerdown",()=>{
            if (!this.code1lock){
                this.answer = "Pond 2";
                this.code1.setText("Pointer = " + this.answer);
            }
        })

        //Creates the third pond and allows it to be clicked as an answer
        let miPond = new Pond("Pond 3",this.add.image(175,500,'RTF Pond'));
        miPond.image.setInteractive();
        miPond.image.on("pointerdown",()=>{
            if (!this.code1lock){
                this.answer = "Pond 3";
                this.code1.setText("Pointer = " + this.answer);
            }
        })

        //Creates the first fish and allows it to be clicked as an answer
        let rbf = new Fish("Crown Toby", this.add.image(350,200,'CTF'))
        this.add.text(300,125,'Crown Toby')
        rbf.image.setInteractive();
        rbf.image.on("pointerdown",()=>{
            if (!this.code2lock){
                this.answer = "Crown Toby";
                this.code2.setText("Pointer* = " + this.answer);
            }
        })

        //Creates the second fish and allows it to be clicked as an answer
        let pbf = new Fish('Black Triggerfish',this.add.image(350,350,'BTF'))
        this.add.text(300,275,'Black Triggerfish')
        pbf.image.setInteractive();
        pbf.image.on("pointerdown",()=>{
            if (!this.code2lock){
                this.answer = "Black Triggerfish";
                this.code2.setText("Pointer* = " + this.answer);
            }
        })

        //Creates the third fish and allows it to be clicked as an answer
        let mi = new Fish("Reef triggerfish",this.add.image(350,500,'RTF'))
        this.add.text(300,425,'Reef triggerfish')
        mi.image.setInteractive();
        mi.image.on("pointerdown",()=>{
            if (!this.code2lock){
                this.answer = "Reef triggerfish";
                this.code2.setText("Pointer* = " + this.answer);
            }
        })

        //create and hide feedback
        this.popup = this.add.image(375,350,'Popup');
        this.popup.alpha=0;
        this.feedback = this.add.text(275,300,'');
        this.feedback.alpha=0;
    }

    update(_time: number, _delta: number): void {
        if (this.counter===0){
            this.code2.setText("Pointer* = Reef triggerfish");
            this.code2lock = true;
            this.code1lock = false;
        }
        else if (this.counter==1){
            this.code1.setText("Pointer = Pond 1");
            this.code1lock = true;
            this.code2lock = false;
        }
        else{
            this.code1.setText("Pointer = Pond 2");
            this.code1lock = true;
            this.code2lock = false;
        }
    }

    //Checks if the user's answer is correct
    checkAnswer(){
        if (this.answer === this.answers[this.counter]){
            //displays feedback window
            this.popup.alpha = 1;
            this.feedback.alpha=1;
    
            //congrats message
            this.feedback.setText("Congratulations, you \nset the variable \nto the correct value!")
            this.feedback.setTint(0x00FF00);
            this.feedback.setFontSize(20);
                
            //Close button to exit window
            let close = this.add.text(325,450,"Close").setInteractive();
            close.setTint(0xff0000);
            close.setFontSize(26)
            close.on("pointerdown",()=>{
                this.feedback.alpha=0;
                this.popup.alpha=0;
                close.destroy();
            });

            ScoreTracker.addScore();
            this.scoreText.setText(`Score: ${ScoreTracker.getScore()}`)
    
            if (this.counter<2){
                this.counter++;
                this.question.setText(this.questions[this.counter])
            }
            else{
                this.scene.start('Pointers3')
            } 
        }   
            else{
                //Display feedback window
                this.popup.alpha=1;
                this.feedback.alpha=1;
                this.feedback.setText("I'm sorry, you set \nthe variable to \n" + this.answer + "\nbut you need to set \nthe variable to \n" + this.answers[this.counter])
                this.feedback.setTint(0xFF0000);
                this.feedback.setFontSize(20)
    
                //Close button to exit feedback
                let close = this.add.text(325,450,"Close").setInteractive();
                close.setTint(0xff0000);
                close.setFontSize(26)
                close.on("pointerdown",()=>{
                    this.feedback.alpha=0;
                    this.popup.alpha=0;
                    close.destroy();
                });
            }
        }
}

