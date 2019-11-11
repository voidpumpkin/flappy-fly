import { GameElement } from './GameElement.class';
import { Observarable } from './Observerable.interface';
import { Observer } from './Observer.interface';

class TryAgainButton extends GameElement implements Observarable {
    private _observers: Observer[] = [];
    constructor() {
        super('try-again-button', 'tryAgainButton', undefined, 'a');
        this.htmlElement.textContent = 'Try again';
        this.htmlElement.addEventListener('click', () => {
            this.notifyObservers();
        });
    }
    subscribe(observer: Observer): void {
        this._observers.push(observer);
    }
    unsubscribe(observer: Observer): void {
        const observerId = this._observers.indexOf(observer);
        this._observers.splice(observerId);
    }
    notifyObservers(): void {
        this._observers.forEach((e: Observer): void => e.notify());
    }
}

export { TryAgainButton };
