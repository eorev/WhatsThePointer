//Class ScoreTracker is used to keep track of the score and the number of correct questions answered by the user.
//The score is increased by 100 points for each correct answer and the number of correct questions is increased by 1 for each correct answer.

class ScoreTracker {
    private score: number = 0;

    public addScore() {
        this.score += 100;
    }

    public deductScore() {
        this.score > 0 ? this.score -= 100 : this.score = 0;
    }

    public getScore() {
        return this.score;
    }

}

const scoreTracker = new ScoreTracker();

export default scoreTracker;