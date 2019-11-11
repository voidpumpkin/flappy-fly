import { GameElement } from './GameElement.class';
import { StartModal, StartModalObservarableMessages } from './StartModal.class';
import { EndModal, EndModalObservarableMessages } from './EndModal.class';
import { FlyingZone, FlyingZoneObservarableMessages } from './FlyingZone.class';
import { Ground } from './Ground.class';
import { ScoreCounter } from './ScoreCounter.class';
import { Observer } from './Observer.interface';

class FlappyFlyGame extends GameElement implements Observer {
    private static _instance: FlappyFlyGame;
    private _runningGameIntervalId: number;
    private _frameTimeOut = 10;
    children: {
        startModal: StartModal;
        endModal: EndModal;
        scoreCounter: ScoreCounter;
        flyingZone: FlyingZone;
        ground: Ground;
    };
    private constructor(parent: HTMLElement) {
        super('flappy-fly-game', 'flappyFlyGame', {
            startModal: new StartModal(),
            endModal: new EndModal(),
            scoreCounter: new ScoreCounter(),
            flyingZone: new FlyingZone(),
            ground: new Ground()
        });
        this.parent = parent;
        this.htmlElement.addEventListener('click', () => this.onClick());
        this.children.startModal.subscribe(this);
        this.children.endModal.subscribe(this);
    }
    private onClick(): void {
        this.children.flyingZone.onGameBoardClick();
    }
    static getInstance(parent?: HTMLElement): FlappyFlyGame {
        return this._instance || (this._instance = new this(parent));
    }
    private recreateChildren(): void {
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
        this.children.scoreCounter.flyingZone = this.children.flyingZone;
        this.children.flyingZone.subscribe(this);
    }
    start(): void {
        this.recreateChildren();
        this._runningGameIntervalId = window.setInterval(() => this.onFrame(), this._frameTimeOut);
    }
    gameOver(): void {
        clearInterval(this._runningGameIntervalId);
        this.children.endModal.finalScore = this.children.scoreCounter.score;
        this.children.endModal.show();
    }
    notify(
        message:
            | StartModalObservarableMessages
            | EndModalObservarableMessages
            | FlyingZoneObservarableMessages
    ): void {
        if (
            message === StartModalObservarableMessages.START_GAME ||
            message === EndModalObservarableMessages.START_GAME
        ) {
            this.start();
        } else if (message === FlyingZoneObservarableMessages.END_GAME) {
            // this.gameOver();
        }
    }
}
export { FlappyFlyGame };
