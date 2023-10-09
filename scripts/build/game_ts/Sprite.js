var Sprite = (function () {
    function Sprite(ctx, args) {
        this.ctx = ctx;
        this.image = new Image(args.size.x, args.size.y);
        this.position = args.position;
        this.size = args.size;
        this.selected = false;
        this.image.src = args.image;
    }
    Sprite.prototype.draw = function () {
        if (this.selected) {
            this.drawBorder();
        }
        this.ctx.drawImage(this.image, this.position.x - this.size.x / 2, this.position.y - this.size.y / 2, this.size.x, this.size.y);
    };
    Sprite.prototype.drawBorder = function () {
        this.ctx.beginPath();
        this.ctx.fillStyle = "#ff888855";
        this.ctx.strokeStyle = '#f88';
        this.ctx.lineWidth = 3;
        this.ctx.rect(this.position.x - ((this.size.x / 2) + 3), this.position.y - ((this.size.y / 2) + 3), this.size.x + 6, this.size.y + 6);
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();
    };
    Sprite.prototype.touching = function (other) {
        if ("size" in other) {
            other = other;
            return (this.position.x < other.position.x + other.size.x &&
                this.position.x + this.size.x > other.position.x &&
                this.position.y < other.position.y + other.size.y &&
                this.position.y + this.size.y > other.position.y);
        }
        other = other;
        return (this.position.x - (this.size.x / 2) < other.x &&
            this.position.x + (this.size.x / 2) > other.x &&
            this.position.y - (this.size.y / 2) < other.y &&
            this.position.y + (this.size.y / 2) > other.y);
    };
    return Sprite;
}());
export { Sprite };
//# sourceMappingURL=Sprite.js.map