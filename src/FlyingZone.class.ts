import { GameElement } from './GameElement.class';
import { Fly } from './Fly.class';
import { Obstacle } from './Obstacle.class';
import { Observarable } from './Observerable.interface';
import { Observer } from './Observer.interface';

enum FlyingZoneObservarableMessages {
    BAR_PASSED = 'BAR_PASSED',
    END_GAME = 'END_GAME'
}

enum classNameByToggleEnum {
    true = 'flyingZoneBackgroundImage1',
    false = 'flyingZoneBackgroundImage2'
}

class FlyingZone extends GameElement implements Observarable {
    private _observers: Observer[] = [];
    private _obstacleCount = 0;
    private _framesSinceLastObstacle = 0;
    private _obstacleAppieringSpeed = 4;
    private _framesForObstacleAppiernace = 272;
    children: {
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
        window.setInterval(() => {
            this.htmlElement.classList.remove(classNameByToggleEnum[toggle.toString()]);
            toggle = !toggle;
            this.htmlElement.classList.add(classNameByToggleEnum[toggle.toString()]);
        }, 150);
    }
    private runObjectInteractions(): void {
        this.getObstacles().forEach((e: Obstacle) => {
            this.runObstacleFlyInteractions(e);
            this.runObstacleFlyZoneInteractions(e);
        });
    }
    private runObstacleFlyZoneInteractions(e: Obstacle): void {
        if (e.isGivenElementAhead(this)) {
            this.removeObstacle(e.id);
        }
    }
    private runObstacleFlyInteractions(e: Obstacle): void {
        const { topBar, bottomBar } = e.children;
        const { fly } = this.children;
        if (topBar.isColliding(fly) || bottomBar.isColliding(fly)) {
            this.notifyObservers(FlyingZoneObservarableMessages.END_GAME);
        } else if (e.isGivenElementAhead(fly) && !e.isPassed) {
            this.notifyObservers(FlyingZoneObservarableMessages.BAR_PASSED);
            e.isPassed = true;
        }
    }
    private getObstacles(): GameElement[] {
        return Object.keys(this.children).reduce(
            (obstacles: GameElement[], key: string): GameElement[] => [
                ...obstacles,
                ...(key.includes('obstacle') ? [this.children[key]] : [])
            ],
            []
        );
    }
    private spawnObstacle(): void {
        this.fastenObstacleAppierance();
        const newObstacles = {
            [`obstacle${this._obstacleCount}`]: new Obstacle(this._obstacleCount)
        };
        this._obstacleCount++;
        this.addChildren(newObstacles);
        this._framesSinceLastObstacle = 0;
    }
    private fastenObstacleAppierance(): void {
        const newFramesForObstacleAppiernace =
            this._framesForObstacleAppiernace - this._obstacleAppieringSpeed;
        this._framesForObstacleAppiernace =
            newFramesForObstacleAppiernace > 100 ? newFramesForObstacleAppiernace : 100;
    }
    onGameBoardClick(): void {
        this.children.fly.onBoardClick();
    }
    onFrame(): void {
        this.runObjectInteractions();
        if (this._framesSinceLastObstacle > this._framesForObstacleAppiernace) {
            this.spawnObstacle();
        }
        this._framesSinceLastObstacle++;
        super.onFrame();
    }

    removeObstacle(id: number): void {
        this.children[`obstacle${id}`].unrender();
        delete this.children[`obstacle${id}`];
    }
    subscribe(observer: Observer): void {
        this._observers.push(observer);
    }
    unsubscribe(observer: Observer): void {
        const observerId = this._observers.indexOf(observer);
        this._observers.splice(observerId);
    }
    notifyObservers(message: FlyingZoneObservarableMessages): void {
        this._observers.forEach((e: Observer): void => e.notify(message));
    }
}

export { FlyingZone, FlyingZoneObservarableMessages };
