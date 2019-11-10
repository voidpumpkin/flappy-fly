import { GameElement } from './GameElement.class';

class Obstacle extends GameElement {
    xSpeed = 0.3;
    xPosition = 120;
    yPosition = -10;
    isPassed = false;
    id: number;
    onUnrenderClb: Function;
    children: {
        topBar: GameElement;
        bottomBar: GameElement;
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    constructor(id: number, onUnrenderClb = (id: number): void => {}) {
        super(`obstacle-${id}`, 'obstacle', {
            topBar: new GameElement(`bar-top-${id}`, 'barTop'),
            bottomBar: new GameElement(`bar-bottom-${id}`, 'barBottom')
        });
        this.id = id;
        this.onUnrenderClb = onUnrenderClb;
    }
    public onFrame(): void {
        this.xPosition -= this.xSpeed;
        this.htmlElement.style.left = this.xPosition + '%';
        this.htmlElement.style.top = this.yPosition + '%';
        if (this.xPosition < -10) {
            this.unrender();
        }
        super.onFrame();
    }
    public unrender(): void {
        this.htmlElement.remove();
        this.onUnrenderClb(this.id);
    }
    public isElementAhead(e: GameElement): boolean {
        const thisRect = this.htmlElement.getBoundingClientRect();
        const eRect = e.htmlElement.getBoundingClientRect();
        return eRect.left > thisRect.left + thisRect.width;
    }
}
export { Obstacle };
