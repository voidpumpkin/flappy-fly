import { GameElement } from './GameElement.class';
import { StartButton } from './StartButton.class';
import { Observer } from './Observer.interface';
import { Observable } from './Observable.interface';

enum StartModalObservarableMessages {
    START_GAME = 'START_GAME'
}

class StartModal extends GameElement implements Observable, Observer {
    private _observers: Observer[] = [];
    children: {
        modalContainer: GameElement & {
            children: {
                startButton: StartButton;
            };
        };
    };
    constructor() {
        super('start-modal', 'modal', {
            modalContainer: new GameElement('modal-container', 'modalContainer', {
                startButton: new StartButton()
            })
        });
        this.children.modalContainer.children.startButton.subscribe(this);
    }
    private onStartGame(): void {
        this.hide();
        this.notifyObservers(StartModalObservarableMessages.START_GAME);
    }
    hide(): void {
        this.htmlElement.style.display = 'none';
    }
    subscribe(observer: Observer): void {
        this._observers.push(observer);
    }
    unsubscribe(observer: Observer): void {
        const observerId = this._observers.indexOf(observer);
        this._observers.splice(observerId);
    }
    notifyObservers(message: StartModalObservarableMessages): void {
        this._observers.forEach((e: Observer): void => e.notify(message));
    }
    notify(): void {
        this.onStartGame();
    }
}
export { StartModal, StartModalObservarableMessages };
