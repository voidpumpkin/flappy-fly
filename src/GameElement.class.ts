/* eslint-disable @typescript-eslint/no-explicit-any */
class GameElement {
    htmlElement: HTMLElement;
    parent: HTMLElement;
    children: Record<string, any>;
    constructor(
        id: string,
        className: string,
        children: Record<string, any> = {},
        elementType = 'div',
        text = ''
    ) {
        this.htmlElement = document.createElement(elementType);
        this.htmlElement.id = id;
        this.htmlElement.className = className;
        this.htmlElement.textContent = text;
        this.children = children;
        this.setChildrenParentToThis();
    }
    private setChildrenParentToThis(): void {
        const { children: children } = this;
        Object.keys(children).forEach(key => {
            children[key].parent = this.htmlElement;
        });
    }
    render(): void {
        const { parent, htmlElement: element, children: children } = this;
        parent.appendChild(element);
        Object.keys(children).forEach(key => children[key].render());
    }
    onFrame(): void {
        const { children: children } = this;
        Object.keys(children).forEach(key => children[key].onFrame());
    }
    addChildren(children: Record<string, any>): void {
        this.children = { ...this.children, ...children };
        this.setChildrenParentToThis();
        Object.keys(children).forEach(key => children[key].render());
    }
    isColliding(e: GameElement): boolean {
        const thisRect = this.htmlElement.getBoundingClientRect();
        const eRect = e.htmlElement.getBoundingClientRect();
        return !(
            thisRect.top + thisRect.height < eRect.top ||
            thisRect.top > eRect.top + eRect.height ||
            thisRect.left + thisRect.width < eRect.left ||
            thisRect.left > eRect.left + eRect.width
        );
    }
}
export { GameElement };
