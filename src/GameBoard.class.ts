class GameBoard {
    htmlElemnt: HTMLDivElement;
    constructor() {
        this.htmlElemnt = document.createElement('div');
        this.htmlElemnt.id = 'game-board';
        this.htmlElemnt.className = 'game-board';
    }
    render(parent): void {
        parent.appendChild(this.htmlElemnt);
    }
}
export { GameBoard };
