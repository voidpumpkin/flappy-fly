class Fly {
    htmlElemnt: HTMLDivElement;
    constructor() {
        this.htmlElemnt = document.createElement('div');
        this.htmlElemnt.id = 'fly';
        this.htmlElemnt.className = 'fly';
    }
    render(parent): void {
        parent.appendChild(this.htmlElemnt);
    }
}
export { Fly };
