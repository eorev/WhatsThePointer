//Class ScoreTracker is used to keep track of the score and the number of correct questions answered by the user.
//The score is increased by 100 points for each correct answer and the number of correct questions is increased by 1 for each correct answer.

class SoundManager {
    private muted: boolean = false;

    public toggle() {
        this.muted = !this.muted;
    }

    public isMuted() {
        return this.muted;
    }

}

const soundManager = new SoundManager();

export default soundManager;