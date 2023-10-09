export class Time {
    dt: number;

    constructor() {
        this.dt = 0;
    }

    public deltaTime(): number {
        return this.dt;
    }

    public frameRate(): number {
        return 1 / this.dt;
    }

    public setDT(delta: number): void {
        this.dt = delta;
    }
}