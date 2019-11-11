import { GameElement } from './GameElement.class';
import { FlyingZone, FlyingZoneObservarableMessages } from './FlyingZone.class';
import { Observer } from './Observer.interface';

class ScoreCounter extends GameElement implements Observer {
    private _score = 0;
    private _flyingZone: FlyingZone;
    constructor() {
        super('score-couter', 'scoreCounter');
    }
    get score(): number {
        return this._score;
    }
    set flyingZone(observable: FlyingZone) {
        this._flyingZone = observable;
        this._flyingZone.subscribe(this);
    }
    onFrame(): void {
        this.htmlElement.textContent = this._score.toString();
        super.onFrame();
    }
    notify(message: FlyingZoneObservarableMessages): void {
        if (message === FlyingZoneObservarableMessages.BAR_PASSED) {
            this._score++;
        }
    }
}

export { ScoreCounter };
