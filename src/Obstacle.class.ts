import { GameElement } from './GameElement.class';

class Obstacle extends GameElement {
    private _xSpeed = 0.3;
    private _xPosition = 120;
    private _yPosition = -10;
    isPassed = false;
    id: number;
    children: {
        topBar: GameElement;
        bottomBar: GameElement;
    };
    constructor(id: number) {
        super(`obstacle-${id}`, 'obstacle', {
            topBar: new GameElement(`bar-top-${id}`, 'barTop'),
            bottomBar: new GameElement(`bar-bottom-${id}`, 'barBottom')
        });
        this.id = id;
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
