import { GameElement } from './GameElement.class';

const MAX_Y = 100;
const MIN_Y = 0;

class Fly extends GameElement {
    private _ySpeed = 0;
    private _yPosition = 50;
    private _rotation = 0;
    private _rotationSpeed = -50;
    private _gravity = 0.015;
    private _flyPower = 0.6;
    constructor() {
        super('fly', 'fly');
    }
    private runPhysics(): void {
        const isInFlyingZone = this._yPosition >= MIN_Y && this._yPosition <= MAX_Y;
        if (isInFlyingZone) {
            this._ySpeed -= this._gravity;
            const positionAfterGravity = this._yPosition + this._ySpeed;
            const isBellowGround = positionAfterGravity < MIN_Y;
            const isAboveFlyingZone = positionAfterGravity > MAX_Y;
            if (isBellowGround) {
                this.onBellowGround();
            } else if (isAboveFlyingZone) {
                this.onAboveFlyingZone();
            } else {
                this.onInFlyingZone(positionAfterGravity);
            }
        }
    }
    private onInFlyingZone(positionAfterGravity: number): void {
        this._yPosition = positionAfterGravity;
        this._rotation = this._ySpeed * this._rotationSpeed;
    }
    private onAboveFlyingZone(): void {
        this._ySpeed = MIN_Y;
        this._yPosition = MAX_Y;
        this._rotation = this._ySpeed * this._rotationSpeed;
    }
    private onBellowGround(): void {
        this._ySpeed = MIN_Y;
        this._yPosition = MIN_Y;
        this._rotation = -1 * this._rotationSpeed;
    }
    onBoardClick(): void {
        this._ySpeed = this._flyPower;
    }
    render(): void {
        super.render();
    }
    onFrame(): void {
        this.runPhysics();
        this.htmlElement.style.bottom = this._yPosition + '%';
        this.htmlElement.style.transform = `rotate(${this._rotation}deg)`;
        super.onFrame();
    }
}
export { Fly };
