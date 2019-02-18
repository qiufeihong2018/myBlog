"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Counter {
    constructor(opts) {
        opts = opts || {};
        this._count = opts.count || 0;
    }
    val() {
        return this._count;
    }
    inc(n) {
        this._count += (n || 1);
    }
    dec(n) {
        this._count -= (n || 1);
    }
    reset(count) {
        this._count = count || 0;
    }
}
exports.default = Counter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291bnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy91dGlscy9tZXRyaWNzL2NvdW50ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtJQUdFLFlBQWEsSUFBSztRQUNoQixJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQTtRQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFBO0lBQy9CLENBQUM7SUFFRCxHQUFHO1FBQ0QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFBO0lBQ3BCLENBQUM7SUFFRCxHQUFHLENBQUUsQ0FBVTtRQUNiLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7SUFDekIsQ0FBQztJQUVELEdBQUcsQ0FBRSxDQUFVO1FBQ2IsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtJQUN6QixDQUFDO0lBRUQsS0FBSyxDQUFFLEtBQWM7UUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLElBQUksQ0FBQyxDQUFBO0lBQzFCLENBQUM7Q0FDRjtBQXZCRCwwQkF1QkMifQ==