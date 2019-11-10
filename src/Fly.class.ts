import { GameElement } from './GameElement.class';

class Fly extends GameElement {
    private ySpeed = 0;
    private yPosition = 50;
    private rotation = 0;
    private rotationSpeed = -50;
    private gravity = 0.015;
    private flyPower = 0.6;
    constructor() {
        super('fly', 'fly');
    }
    public render(): void {
        super.render();
    }
    public onFrame(): void {
        this.runPhysics();
        this.htmlElement.style.bottom = this.yPosition + '%';
        this.htmlElement.style.transform = `rotate(${this.rotation}deg)`;
        super.onFrame();
    }
    private runPhysics(): void {
        const isInFlyingZone = this.yPosition >= 0 && this.yPosition <= 100;
        if (isInFlyingZone) {
            this.ySpeed -= this.gravity;
            const positionAfterGravity = this.yPosition + this.ySpeed;
            const isBellowGround = positionAfterGravity < 0;
            const isAboveFlyingZone = positionAfterGravity > 100;
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
        this.yPosition = positionAfterGravity;
        this.rotation = this.ySpeed * this.rotationSpeed;
    }

    private onAboveFlyingZone(): void {
        this.ySpeed = 0;
        this.yPosition = 100;
        this.rotation = this.ySpeed * this.rotationSpeed;
    }

    private onBellowGround(): void {
        this.ySpeed = 0;
        this.yPosition = 0;
        this.rotation = -1 * this.rotationSpeed;
    }

    public onBoardClick(): void {
        this.ySpeed = this.flyPower;
    }
}
export { Fly };
