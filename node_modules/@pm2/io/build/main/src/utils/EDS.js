"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BinaryHeap_1 = require("./BinaryHeap");
const units_1 = require("./units");
class ExponentiallyDecayingSample {
    constructor(options) {
        this.RESCALE_INTERVAL = 1 * units_1.default.HOURS;
        this.ALPHA = 0.015;
        this.SIZE = 1028;
        options = options || {};
        this._elements = new BinaryHeap_1.default({
            score: function (element) {
                return -element.priority;
            }
        });
        this._rescaleInterval = options.rescaleInterval || this.RESCALE_INTERVAL;
        this._alpha = options.alpha || this.ALPHA;
        this._size = options.size || this.SIZE;
        this._random = options.random || this._random;
        this._landmark = null;
        this._nextRescale = null;
        this._mean = null;
    }
    update(value, timestamp) {
        const now = Date.now();
        if (!this._landmark) {
            this._landmark = now;
            this._nextRescale = this._landmark + this._rescaleInterval;
        }
        timestamp = timestamp || now;
        const newSize = this._elements.size() + 1;
        const element = {
            priority: this._priority(timestamp - this._landmark),
            value: value
        };
        if (newSize <= this._size) {
            this._elements.add(element);
        }
        else if (element.priority > this._elements.first().priority) {
            this._elements.removeFirst();
            this._elements.add(element);
        }
        if (now >= this._nextRescale)
            this._rescale(now);
    }
    toSortedArray() {
        return this._elements
            .toSortedArray()
            .map(function (element) {
            return element.value;
        });
    }
    toArray() {
        return this._elements
            .toArray()
            .map(function (element) {
            return element.value;
        });
    }
    _weight(age) {
        // We divide by 1000 to not run into huge numbers before reaching a
        // rescale event.
        return Math.exp(this._alpha * (age / 1000));
    }
    _priority(age) {
        return this._weight(age) / this._random();
    }
    _random() {
        return Math.random();
    }
    _rescale(now) {
        now = now || Date.now();
        const self = this;
        const oldLandmark = this._landmark;
        this._landmark = now || Date.now();
        this._nextRescale = now + this._rescaleInterval;
        const factor = self._priority(-(self._landmark - oldLandmark));
        this._elements
            .toArray()
            .forEach(function (element) {
            element.priority *= factor;
        });
    }
    avg(now) {
        let sum = 0;
        this._elements
            .toArray()
            .forEach(function (element) {
            sum += element.value;
        });
        return (sum / this._elements.size());
    }
}
exports.default = ExponentiallyDecayingSample;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRURTLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3V0aWxzL0VEUy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZDQUFxQztBQUNyQyxtQ0FBMkI7QUFFM0I7SUFhRSxZQUFhLE9BQVE7UUFaYixxQkFBZ0IsR0FBRyxDQUFDLEdBQUcsZUFBSyxDQUFDLEtBQUssQ0FBQTtRQUNsQyxVQUFLLEdBQUcsS0FBSyxDQUFBO1FBQ2IsU0FBSSxHQUFHLElBQUksQ0FBQTtRQVdqQixPQUFPLEdBQUcsT0FBTyxJQUFJLEVBQUUsQ0FBQTtRQUV2QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksb0JBQVUsQ0FBQztZQUM5QixLQUFLLEVBQUUsVUFBVSxPQUFPO2dCQUN0QixPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQTtZQUMxQixDQUFDO1NBQ0YsQ0FBQyxDQUFBO1FBRUYsSUFBSSxDQUFDLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxlQUFlLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFBO1FBQ3hFLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFBO1FBQ3pDLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFBO1FBQ3RDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFBO1FBQzdDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFBO1FBQ3JCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFBO1FBQ3hCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFBO0lBQ25CLENBQUM7SUFFRCxNQUFNLENBQUUsS0FBSyxFQUFFLFNBQVU7UUFDdkIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFBO1FBQ3RCLElBQUksQ0FB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