import { GameElement } from './GameElement.class';

class ScoreCounter extends GameElement {
    score = 0;
    constructor() {
        super('score-couter', 'scoreCounter');
    }
    onFrame(): void {
        this.htmlElement.textContent = this.score.toString();
        super.onFrame();
    }
    addScore(): void {
        this.score++;
    }
}

export { ScoreCounter };
