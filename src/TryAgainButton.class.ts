import { GameElement } from './GameElement.class';

class TryAgainButton extends GameElement {
    startGameClb: Function = (): void => {};
    constructor() {
        super('try-again-button', 'tryAgainButton', undefined, 'a');
        this.htmlElement.textContent = 'Try again';
        this.htmlElement.addEventListener('click', () => {
            this.onClick();
        });
    }
    onClick(): void {
        this.startGameClb();
    }
}

export { TryAgainButton };
