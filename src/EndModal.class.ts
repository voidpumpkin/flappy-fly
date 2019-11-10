import { GameElement } from './GameElement.class';
import { TryAgainButton } from './TryAgainButton.class';

class EndModal extends GameElement {
    startGameClb: Function = (): void => {};
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
        this.children.modalContainer.children.tryAgainButton.startGameClb = (): void => {
            this.onStartGame();
        };
        this.hide();
    }
    setFinalScore(finalScore: number): void {
        this.children.modalContainer.children.gameOverFinalScore.htmlElement.textContent = `Final score: ${finalScore}`;
    }
    private onStartGame(): void {
        this.hide();
        this.startGameClb();
    }
    public show(): void {
        this.htmlElement.style.display = null;
    }
    public hide(): void {
        this.htmlElement.style.display = 'none';
    }
}
export { EndModal };
