"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EDS_1 = require("../EDS");
class Histogram {
    constructor(opts) {
        this._sample = new EDS_1.default();
        this._count = 0;
        this._sum = 0;
        // These are for the Welford algorithm for calculating running variance
        // without floating-point doom.
        this._varianceM = 0;
        this._varianceS = 0;
        this._ema = 0;
        opts = opts || {};
        this._measurement = opts.measurement;
        this._callFn = null;
        const methods = {
            min: this.getMin,
            max: this.getMax,
            sum: this.getSum,
            count: this.getCount,
            variance: this._calculateVariance,
            mean: this._calculateMean,
            // stddev   : this._calculateStddev,
            ema: this.getEma()
        };
        if (methods.hasOwnProperty(this._measurement)) {
            this._callFn = methods[this._measurement];
        }
        else {
            this._callFn = function () {
                const percentiles = this.percentiles([0.5, 0.75, 0.95, 0.99, 0.999]);
                const medians = {
                    median: percentiles[0.5],
                    p75: percentiles[0.75],
                    p95: percentiles[0.95],
                    p99: percentiles[0.99],
                    p999: percentiles[0.999]
                };
                return medians[this._measurement];
            };
        }
    }
    update(value) {
        this._count++;
        this._sum += value;
        this._sample.update(value);
        this._updateMin(value);
        this._updateMax(value);
        this._updateVariance(value);
        this._updateEma(value);
    }
    percentiles(percentiles) {
        const values = this._sample
            .toArray()
            .sort(function (a, b) {
            return (a === b)
                ? 0
                : a - b;
        });
        const results = {};
        for (let i = 0; i < percentiles.length; i++) {
            const percentile = percentiles[i];
            if (!values.length) {
                results[percentile] = null;
                continue;
            }
            const pos = percentile * (values.length + 1);
            if (pos < 1) {
                results[percentile] = values[0];
            }
            else if (pos >= values.length) {
                results[percentile] = values[values.length - 1];
            }
            else {
                const lower = values[Math.floor(pos) - 1];
                const upper = values[Math.ceil(pos) - 1];
                results[percentile] = lower + (pos - Math.floor(pos)) * (upper - lower);
            }
        }
        return results;
    }
    val() {
        if (typeof (this._callFn) === 'function') {
            return this._callFn();
        }
        else {
            return this._callFn;
        }
    }
    getMin() {
        return this._min;
    }
    getMax() {
        return this._max;
    }
    getSum() {
        return this._sum;
    }
    getCount() {
        return this._count;
    }
    getEma() {
        return this._ema;
    }
    fullResults() {
        const percentiles = this.percentiles([0.5, 0.75, 0.95, 0.99, 0.999]);
        return {
            min: this._min,
            max: this._max,
            sum: this._sum,
            variance: this._calculateVariance(),
            mean: this._calculateMean(),
            // stddev   : this._calculateStddev(),
            count: this._count,
            median: percentiles[0.5],
            p75: percentiles[0.75],
            p95: percentiles[0.95],
            p99: percentiles[0.99],
            p999: percentiles[0.999],
            ema: this._ema
        };
    }
    _updateMin(value) {
        if (this._min === undefined || value < this._min) {
            this._min = value;
        }
    }
    _updateMax(value) {
        if (this._max === undefined || value > this._max) {
            this._max = value;
        }
    }
    _updateVariance(value) {
        if (this._count === 1)
            return this._varianceM = value;
        const oldM = this._varianceM;
        this._varianceM += ((value - oldM) / this._count);
        this._varianceS += ((value - oldM) * (value - this._varianceM));
    }
    _updateEma(value) {
        if (this._count <= 1)
            return this._ema = this._calculateMean();
        const alpha = 2 / (1 + this._count);
        this._ema = value * alpha + this._ema * (1 - alpha);
    }
    _calculateMean() {
        return (this._count === 0)
            ? 0
            : this._sum / this._count;
    }
    _calculateVariance() {
        return (this._count <= 1)
            ? null
            : this._varianceS / (this._count - 1);
    }
}
exports.default = Histogram;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9ncmFtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3V0aWxzL21ldHJpY3MvaGlzdG9ncmFtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsZ0NBQXdCO0FBRXhCO0lBZ0JFLFlBQWEsSUFBSztRQVpWLFlBQU8sR0FBRyxJQUFJLGFBQUcsRUFBRSxDQUFBO1FBR25CLFdBQU0sR0FBVyxDQUFDLENBQUE7UUFDbEIsU0FBSSxHQUFXLENBQUMsQ0FBQTtRQUV4Qix1RUFBdUU7UUFDdkUsK0JBQStCO1FBQ3ZCLGVBQVUsR0FBVyxDQUFDLENBQUE7UUFDdEIsZUFBVSxHQUFXLENBQUMsQ0FBQTtRQUN0QixTQUFJLEdBQVcsQ0FBQyxDQUFBO1FBR3RCLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFBO1FBRWpCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQTtRQUNwQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQTtRQUVuQixNQUFNLE9BQU8sR0FBRztZQUNkLEdBQUcsRUFBUSxJQUFJLENBQUMsTUFBTTtZQUN0QixHQUFHLEVBQVEsSUFBSSxDQUFDLE1BQU07WUFDdEIsR0FBRyxFQUFRLElBQUksQ0FBQyxNQUFNO1lBQ3RCLEtBQUssRUFBTSxJQUFJLENBQUMsUUFBUTtZQUN4QixRQUFRLEVBQUcsSUFBSSxDQUFDLGtCQUFrQjtZQUNsQyxJQUFJLEVBQU8sSUFBSSxDQUFDLGNBQWM7WUFDOUIsb0NBQW9DO1lBQ3BDLEdBQUcsRUFBUSxJQUFJLENBQUMsTUFBTSxFQUFFO1NBQ3pCLENBQUE7UUFFRCxJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQzdDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQTtTQUMxQzthQUFNO1lBQ0wsSUFBSSxDQUFDLE9BQU8sR0FBRztnQkFDYixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUE7Z0JBRXBFLE1BQU0sT0FBTyxHQUFHO29CQUNkLE1BQU0sRUFBSyxXQUFXLENBQUMsR0FBRyxDQUFDO29CQUMzQixHQUFHLEVBQVEsV0FBVyxDQUFDLElBQUksQ0FBQztvQkFDNUIsR0FBRyxFQUFRLFdBQVcsQ0FBQyxJQUFJLENBQUM7b0JBQzVCLEdBQUcsRUFBUSxXQUFXLENBQUMsSUFBSSxDQUFDO29CQUM1QixJQUFJLEVBQU8sV0FBVyxDQUFDLEtBQUssQ0FBQztpQkFDOUIsQ0FBQTtnQkFFRCxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUE7WUFDbkMsQ0FBQyxDQUFBO1NBQ0Y7SUFDSCxDQUFDO0lBRUQsTUFBTSxDQUFFLEtBQWE7UUFDbkIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFBO1FBQ2IsSUFBSSxDQUFDLElBQUksSUFBSSxLQUFLLENBQUE7UUFFbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUN0QixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ3RCLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDM0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUN4QixDQUFDO0lBRUQsV0FBVyxDQUFFLFdBQVc7UUFDdEIsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU87YUFDeEIsT0FBTyxFQUFFO2FBQ1QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7WUFDbEIsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2QsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDWCxDQUFDLENBQUMsQ0FBQTtRQUVKLE1BQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQTtRQUNsQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMzQyxNQUFNLFVBQVUsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDakMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUU7Z0JBQ2xCLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUE7Z0JBQzFCLFNBQVE7YUFDVDtZQUVELE1BQU0sR0FBRyxHQUFHLFVBQVUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUE7WUFFNUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFO2dCQUNYLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUE7YUFDaEM7aUJBQU0sSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRTtnQkFDL0IsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFBO2FBQ2hEO2lCQUFNO2dCQUNMLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO2dCQUN6QyxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtnQkFFeEMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEtBQUssR0FBRyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUE7YUFDeEU7U0FDRjtRQUVELE9BQU8sT0FBTyxDQUFBO0lBQ2hCLENBQUM7SUFFRCxHQUFHO1FBQ0QsSUFBSSxPQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLFVBQVUsRUFBRTtZQUN2QyxPQUFPLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtTQUN0QjthQUFNO1lBQ0wsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFBO1NBQ3BCO0lBQ0gsQ0FBQztJQUVELE1BQU07UUFDSixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUE7SUFDbEIsQ0FBQztJQUVELE1BQU07UUFDSixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUE7SUFDbEIsQ0FBQztJQUVELE1BQU07UUFDSixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUE7SUFDbEIsQ0FBQztJQUVELFFBQVE7UUFDTixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUE7SUFDcEIsQ0FBQztJQUVELE1BQU07UUFDSixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUE7SUFDbEIsQ0FBQztJQUVELFdBQVc7UUFDVCxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUE7UUFFcEUsT0FBTztZQUNMLEdBQUcsRUFBUSxJQUFJLENBQUMsSUFBSTtZQUNwQixHQUFHLEVBQVEsSUFBSSxDQUFDLElBQUk7WUFDcEIsR0FBRyxFQUFRLElBQUksQ0FBQyxJQUFJO1lBQ3BCLFFBQVEsRUFBRyxJQUFJLENBQUMsa0JBQWtCLEVBQUU7WUFDcEMsSUFBSSxFQUFPLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDaEMsc0NBQXNDO1lBQ3RDLEtBQUssRUFBTSxJQUFJLENBQUMsTUFBTTtZQUN0QixNQUFNLEVBQUssV0FBVyxDQUFDLEdBQUcsQ0FBQztZQUMzQixHQUFHLEVBQVEsV0FBVyxDQUFDLElBQUksQ0FBQztZQUM1QixHQUFHLEVBQVEsV0FBVyxDQUFDLElBQUksQ0FBQztZQUM1QixHQUFHLEVBQVEsV0FBVyxDQUFDLElBQUksQ0FBQztZQUM1QixJQUFJLEVBQU8sV0FBVyxDQUFDLEtBQUssQ0FBQztZQUM3QixHQUFHLEVBQVEsSUFBSSxDQUFDLElBQUk7U0FDckIsQ0FBQTtJQUNILENBQUM7SUFFRCxVQUFVLENBQUUsS0FBSztRQUNmLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDaEQsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUE7U0FDbEI7SUFDSCxDQUFDO0lBRUQsVUFBVSxDQUFFLEtBQUs7UUFDZixJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2hELElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFBO1NBQ2xCO0lBQ0gsQ0FBQztJQUVELGVBQWUsQ0FBRSxLQUFLO1FBQ3BCLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDO1lBQUUsT0FBTyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQTtRQUVyRCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFBO1FBRTVCLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDakQsSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFBO0lBQ2pFLENBQUM7SUFFRCxVQUFVLENBQUUsS0FBSztRQUNmLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDO1lBQUUsT0FBTyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQTtRQUM5RCxNQUFNLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQ25DLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFBO0lBQ3JELENBQUM7SUFFRCxjQUFjO1FBQ1osT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDO1lBQ3hCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQTtJQUM3QixDQUFDO0lBRUQsa0JBQWtCO1FBQ2hCLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQztZQUN2QixDQUFDLENBQUMsSUFBSTtZQUNOLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQTtJQUN6QyxDQUFDO0NBUUY7QUE5TEQsNEJBOExDIn0=