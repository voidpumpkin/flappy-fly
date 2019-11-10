import { GameElement } from './GameElement.class';

class Ground extends GameElement {
    children: {
        groundWater: GameElement;
        groundBackground: GameElement;
    };
    constructor() {
        super('ground', 'ground', {
            groundWater: new GameElement('ground-water', 'groundWater'),
            groundBackground: new GameElement('ground-background', 'groundBackground')
        });
    }
}
export { Ground };
