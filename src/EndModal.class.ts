import { GameElement } from './GameElement.class';
import { TryAgainButton } from './TryAgainButton.class';
import { Observarable } from './Observerable.interface';
import { Observer } from './Observer.interface';

enum EndModalObservarableMessages {
    START_GAME = 'START_GAME'
}

class EndModal extends GameElement implements Observarable, Observer {
    private _observers: Observer[] = [];
    children: {
        modalContainer: GameElement & {
            children: {
                gameOverHeader: GameElement;
                gameOverFinalScore: GameElement;
                tryAgainButton: TryAgainButton;
            };
        };
    };
    constructor() {
        super('end-modal', 'modal', {
            modalContainer: new GameElement('modal-container', 'modalContainer', {
                gameOverHeader: new GameElement(
                    'game-over-header',
                    'gameOverHeader',
                    undefined,
                    'h1',
                    'Game over!'
                ),
                gameOverFinalScore: new GameElement(
                    'game-over-final-score',
                    'gameOverFinalScore',
                    undefined,
                    'h2',
                    'Final score: 0'
                ),
                tryAgainButton: new TryAgainButton()
            })
        });
        this.hide();
        this.children.modalContainer.children.tryAgainButton.subscribe(this);
    }
    private onStartGame(): void {
        this.hide();
        this.notifyObservers(EndModalObservarableMessages.START_GAME);
    }
    set finalScore(finalScore: number) {
        this.children.modalContainer.children.gameOverFinalScore.htmlElement.textContent = `Final score: ${finalScore}`;
    }
    hide(): void {
        this.htmlElement.style.display = 'none';
    }
    show(): void {
        this.htmlElement.style.display = null;
    }
    subscribe(observer: Observer): void {
        this._observers.push(observer);
    }
    unsubscribe(observer: Observer): void {
        const observerId = this._observers.indexOf(observer);
        this._observers.splice(observerId);
    }
    notifyObservers(message: EndModalObservarableMessages): void {
        this._observers.forEach((e: Observer): void => e.notify(message));
    }
    notify(): void {
        this.onStartGame();
    }
}
export { EndModal, EndModalObservarableMessages };
