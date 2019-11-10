import { GameElement } from './GameElement.class';
import { StartButton } from './StartButton.class';

class StartModal extends GameElement {
    startGameClb: Function = (): void => {};
    protected children: {
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
        this.children.modalContainer.children.startButton.startGameClb = (): void => {
            this.onStartGame();
        };
    }
    onStartGame(): void {
        this.hide();
        this.startGameClb();
    }
    hide(): void {
        this.htmlElement.style.display = 'none';
    }
}
export { StartModal };
