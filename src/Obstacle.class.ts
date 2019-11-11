import { GameElement } from './GameElement.class';

const MIN_OBSTACLE_APPIERANCE = 100;
const MIN_OF_MAX_Y_APPIERANCE_DIFF = 5;
class Obstacle extends GameElement {
    private _xSpeed = 0.3;
    private _xPosition = 120;
    private _yPosition = -10;
    private static _yAppiernaceDiffSpeed = -2;
    private static _maxYAppiernaceDiff = 30;
    private static _obstacleAppieringSpeed = -4;
    private static _framesForObstacleAppiernace = 272;
    isPassed = false;
    id: number;
    children: {
        topBar: GameElement;
        bottomBar: GameElement;
    };
    constructor(id: number, lastObstacle?: Obstacle) {
        super(`obstacle-${id}`, 'obstacle', {
            topBar: new GameElement(`bar-top-${id}`, 'barTop'),
            bottomBar: new GameElement(`bar-bottom-${id}`, 'barBottom')
        });
        this.id = id;
        if (lastObstacle) {
            this.calcYPosition(lastObstacle);
        }
    }
    private calcYPosition(lastObstacle: Obstacle): void {
        let max = lastObstacle.yPosition + Obstacle._maxYAppiernaceDiff;
        max = max > 33 ? 33 : max;
        let min = lastObstacle.yPosition - Obstacle._maxYAppiernaceDiff;
        min = min < -35 ? -35 : min;
        this._yPosition = Math.floor(Math.random() * (max - min)) + min;
    }

    static applyObstacleAppieranceSpeed(): void {
        const newFramesForObstacleAppiernace =
            this._framesForObstacleAppiernace + this._obstacleAppieringSpeed;
        this._framesForObstacleAppiernace =
            newFramesForObstacleAppiernace > MIN_OBSTACLE_APPIERANCE
                ? newFramesForObstacleAppiernace
                : MIN_OBSTACLE_APPIERANCE;
    }
    static applyyAppiernaceDiffSpeed(): void {
        const newMaxYDiffObstacleAppiernace = this._maxYAppiernaceDiff + this._yAppiernaceDiffSpeed;
        this._maxYAppiernaceDiff =
            newMaxYDiffObstacleAppiernace > MIN_OF_MAX_Y_APPIERANCE_DIFF
                ? newMaxYDiffObstacleAppiernace
                : MIN_OF_MAX_Y_APPIERANCE_DIFF;
    }
    get yPosition(): number {
        return this._yPosition;
    }
    static get framesForObstacleAppiernace(): number {
        return this._framesForObstacleAppiernace;
    }
    onFrame(): void {
        this._xPosition -= this._xSpeed;
        this.htmlElement.style.left = this._xPosition + '%';
        this.htmlElement.style.top = this._yPosition + '%';
        super.onFrame();
    }
    unrender(): void {
        this.htmlElement.remove();
    }
    isGivenElementAhead(e: GameElement): boolean {
        const thisRect = this.htmlElement.getBoundingClientRect();
        const eRect = e.htmlElement.getBoundingClientRect();
        return eRect.left > thisRect.left + thisRect.width;
    }
}
export { Obstacle };
