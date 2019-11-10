import { GameElement } from './GameElement.class';
import { StartModal } from './StartModal.class';
import { EndModal } from './EndModal.class';
import { FlyingZone } from './FlyingZone.class';
import { Ground } from './Ground.class';
import { ScoreCounter } from './ScoreCounter.class';

class FlappyFlyGame extends GameElement {
    runningGameIntervalId: number;
    children: {
        startModal: StartModal;
        endModal: EndModal;
        scoreCounter: ScoreCounter;
        flyingZone: FlyingZone;
        ground: Ground;
    };
    constructor(parent: HTMLElement) {
        super('flappy-fly-game', 'flappyFlyGame', {
            startModal: new StartModal(),
            endModal: new EndModal(),
            scoreCounter: new ScoreCounter(),
            flyingZone: new FlyingZone(),
            ground: new Ground()
        });
        this.parent = parent;
        this.htmlElement.addEventListener('click', () => {
            this.onClick();
        });
        this.children.startModal.startGameClb = (): void => {
            this.start();
        };
        this.children.endModal.startGameClb = (): void => {
            this.start();
        };
    }
    start(): void {
        this.recreateChildren();
        this.runningGameIntervalId = setInterval(() => this.onFrame(), 10);
    }
    gameOver(): void {
        clearInterval(this.runningGameIntervalId);
        this.children.endModal.setFinalScore(this.children.scoreCounter.score);
        this.children.endModal.show();
    }
    onClick(): void {
        this.children.flyingZone.onBoardClick();
    }
    onPassBar(): void {
        this.children.scoreCounter.addScore();
    }
    recreateChildren(): void {
        this.children.scoreCounter.htmlElement.remove();
        this.children.flyingZone.htmlElement.remove();
        this.children.ground.htmlElement.remove();
        delete this.children.scoreCounter;
        delete this.children.flyingZone;
        delete this.children.ground;

        this.addChildren({
            scoreCounter: new ScoreCounter(),
            flyingZone: new FlyingZone(),
            ground: new Ground()
        });
        this.children.flyingZone.gameOverClb = (): void => this.gameOver();
        this.children.flyingZone.passBarClb = (): void => this.onPassBar();
    }
}
export { FlappyFlyGame };
