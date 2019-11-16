import { GameElement } from './GameElement.class';
import { Observable } from './Observable.interface';
import { Observer } from './Observer.interface';

class StartButton extends GameElement implements Observable {
    private _observers: Observer[] = [];
    constructor() {
        super('start-button', 'startButton', undefined, 'a', 'Start');
        this.htmlElement.addEventListener('click', () => {
            this.onClick();
        });
    }
    onClick(): void {
        this.notifyObservers();
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

export { StartButton };
