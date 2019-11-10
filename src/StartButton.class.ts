import { GameElement } from './GameElement.class';

class StartButton extends GameElement {
    startGameClb: Function = (): void => {};
    constructor() {
        super('start-button', 'startButton', undefined, 'a', 'Start');
        this.htmlElement.addEventListener('click', () => {
            this.onClick();
        });
    }
    onClick(): void {
        this.startGameClb();
    }
}

export { StartButton };
