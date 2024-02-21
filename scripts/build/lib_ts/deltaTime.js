var Time = (function () {
    function Time() {
        this.dt = 0;
    }
    Time.prototype.deltaTime = function () {
        return this.dt;
    };
    Time.prototype.setDT = function (time) {
        this.dt = time;
    };
    return Time;
}());
export { Time };
//# sourceMappingURL=deltaTime.js.map