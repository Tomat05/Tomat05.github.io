import * as Tools from "../tools/index.js"

export class Sprite {

    ctx: CanvasRenderingContext2D;
    image: HTMLImageElement;
    position: Tools.Vec;
    size: number;
    rotation: number;
    selected: boolean;

    constructor(ctx: CanvasRenderingContext2D, args: {
            image: string,
            position: Tools.Vec,
            size: number,
            rotation: number,
    }) {
        this.ctx = ctx;
        this.image = new Image(args.size, args.size);
        this.position = args.position;
        this.size = args.size;
        this.rotation = args.rotation;
        this.selected = false;

        this.image.src = args.image;
    }

    public draw() {
        this.ctx.beginPath();
        this.ctx.rotate(this.rotation * Math.PI / 180);
        if (this.selected) {
            this.drawBorder();
        }
        this.ctx.drawImage(
            this.image, 
            this.position.x - this.size / 2,
            this.position.y - this.size / 2,
            this.size,
            this.size
        )
        this.ctx.closePath();
    }

    private drawBorder() {
        this.ctx.beginPath();
        this.ctx.fillStyle = "#ff888855";
        this.ctx.strokeStyle = '#f88'
        this.ctx.lineWidth = 3;
        this.ctx.rect(
            this.position.x - ((this.size / 2) + 3),
            this.position.y - ((this.size / 2) + 3),
            this.size + 6,
            this.size + 6
        )
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();
    }

    public touching(other: Sprite | Tools.Vec): boolean {
        if ("size" in other) {
            other = other as Sprite;
            return (
                this.position.x < other.position.x + other.size &&
                this.position.x + this.size > other.position.x &&
                this.position.y < other.position.y + other.size &&
                this.position.y + this.size > other.position.y
            );
        }
        other = other as Tools.Vec;
        return (
            this.position.x - (this.size / 2) < other.x &&
            this.position.x + (this.size / 2) > other.x &&
            this.position.y - (this.size / 2) < other.y &&
            this.position.y + (this.size / 2) > other.y
        )
    }
}