var Sprite = (function () {
    function Sprite(ctx, args) {
        this.ctx = ctx;
        this.image = new Image(args.size, args.size);
        this.position = args.position;
        this.size = args.size;
        this.rotation = args.rotation;
        this.selected = false;
        this.image.src = args.image;
    }
    Sprite.prototype.draw = function () {
        this.ctx.beginPath();
        this.ctx.rotate(this.rotation * Math.PI / 180);
        if (this.selected) {
            this.drawBorder();
        }
        this.ctx.drawImage(this.image, this.position.x - this.size / 2, this.position.y - this.size / 2, this.size, this.size);
        this.ctx.closePath();
    };
    Sprite.prototype.drawBorder = function () {
        this.ctx.beginPath();
        this.ctx.fillStyle = "#ff888855";
        this.ctx.strokeStyle = '#f88';
        this.ctx.lineWidth = 3;
        this.ctx.rect(this.position.x - ((this.size / 2) + 3), this.position.y - ((this.size / 2) + 3), this.size + 6, this.size + 6);
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();
    };
    Sprite.prototype.touching = function (other) {
        if ("size" in other) {
            other = other;
            return (this.position.x < other.position.x + other.size &&
                this.position.x + this.size > other.position.x &&
                this.position.y < other.position.y + other.size &&
                this.position.y + this.size > other.position.y);
        }
        other = other;
        return (this.position.x - (this.size / 2) < other.x &&
            this.position.x + (this.size / 2) > other.x &&
            this.position.y - (this.size / 2) < other.y &&
            this.position.y + (this.size / 2) > other.y);
    };
    return Sprite;
}());
export { Sprite };
//# sourceMappingURL=Sprite.js.map