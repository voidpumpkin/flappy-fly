import { GameElement } from './GameElement.class';
import { Fly } from './Fly.class';
import { Obstacle } from './Obstacle.class';

enum classNameByToggleEnum {
    true = 'flyingZoneBackgroundImage1',
    false = 'flyingZoneBackgroundImage2'
}

class FlyingZone extends GameElement {
    private obstacleCount = 0;
    private framesSinceLastObstacle = 0;
    private obstacleAppieringSpeed = 4;
    private framesForObstacleAppiernace = 272;
    public gameOverClb: Function = (): void => {};
    public passBarClb: Function = (): void => {};
    public children: {
        fly: Fly;
    };
    constructor() {
        super('flying-zone', 'flyingZone', {
            fly: new Fly()
        });
        this.addBackground();
    }
    private addBackground(): void {
        let toggle = false;
        setInterval(() => {
            this.htmlElement.classList.remove(classNameByToggleEnum[toggle.toString()]);
            toggle = !toggle;
            this.htmlElement.classList.add(classNameByToggleEnum[toggle.toString()]);
        }, 150);
    }
    public onBoardClick(): void {
        this.children.fly.onBoardClick();
    }
    public onFrame(): void {
        this.checkCollisions();
        //FIXME:
        this.obstacleSpawning();
        super.onFrame();
    }
    private checkCollisions(): void {
        const obstacles = Object.keys(this.children).reduce(
            (obstacles: Array<GameElement>, key: string): Array<GameElement> => {
                if (key.includes('obstacle')) {
                    obstacles.push(this.children[key]);
                }
                return obstacles;
            },
            []
        );
        obstacles.forEach((e: Obstacle) => {
            if (
                e.children.topBar.isColliding(this.children.fly) ||
                e.children.bottomBar.isColliding(this.children.fly)
            ) {
                this.gameOverClb();
            } else if (e.isElementAhead(this.children.fly) && !e.isPassed) {
                this.passBarClb();
                e.isPassed = true;
            }
        });
    }
    private obstacleSpawning(): void {
        if (this.framesSinceLastObstacle > this.framesForObstacleAppiernace) {
            const newFramesForObstacleAppiernace =
                this.framesForObstacleAppiernace - this.obstacleAppieringSpeed;
            this.framesForObstacleAppiernace =
                newFramesForObstacleAppiernace > 100 ? newFramesForObstacleAppiernace : 100;
            const newObstacles = {};
            newObstacles[`obstacle${this.obstacleCount}`] = new Obstacle(
                this.obstacleCount,
                (id: number): void => this.removeObstacle(id)
            );
            this.obstacleCount++;
            this.framesSinceLastObstacle = 0;
            this.addChildren(newObstacles);
        }
        this.framesSinceLastObstacle++;
    }
    public removeObstacle(id: number): void {
        delete this.children[`obstacle${id}`];
    }
}

export { FlyingZone };
