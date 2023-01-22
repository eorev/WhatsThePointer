class ScoreTracker {
    public score: number = 0;
    public correctQuestions: number = 0;

    public addScore() {
        this.score += 1;
        this.correctQuestions += 1;
    }

    public getScore() {
        return this.score;
    }

    public getQuestionCount() {
        return this.correctQuestions;
    }
}

const scoreTracker = new ScoreTracker();

export default scoreTracker;