export class Vec {
    x: number;
    y: number;
    z: number;
    w: number;

    constructor(x: number, y: number, z?: number, w?: number) {
        this.x = x;
        this.y = y;
        this.z = z | 0;
        this.w = w | 0;
    }

    public set(x: number, y: number, z?: number, w?: number) {
        this.x = x;
        this.y = y;
        this.z = z | 0;
        this.w = w | 0;
    }

    public add(x: number, y: number, z?: number, w?: number) {
        this.x += x;
        this.y += y;
        this.z = z | 0;
        this.w = w | 0;
    }
}