var Vec = (function () {
    function Vec(x, y, z, w) {
        this.x = x;
        this.y = y;
        this.z = z | 0;
        this.w = w | 0;
    }
    Vec.prototype.set = function (x, y, z, w) {
        this.x = x;
        this.y = y;
        this.z = z | 0;
        this.w = w | 0;
    };
    Vec.prototype.add = function (x, y, z, w) {
        this.x += x;
        this.y += y;
        this.z = z | 0;
        this.w = w | 0;
    };
    return Vec;
}());
export { Vec };
//# sourceMappingURL=Vec.js.map