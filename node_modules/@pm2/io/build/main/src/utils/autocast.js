"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Autocast {
    constructor() {
        /**
         * Common strings to cast
         */
        this.commonStrings = {
            'true': true,
            'false': false,
            'undefined': undefined,
            'null': null,
            'NaN': NaN
        };
    }
    process(key, value, o) {
        if (typeof (value) === 'object')
            return;
        o[key] = this._cast(value);
    }
    traverse(o, func) {
        for (let i in o) {
            func.apply(this, [i, o[i], o]);
            if (o[i] !== null && typeof (o[i]) === 'object') {
                // going on step down in the object tree!!
                this.traverse(o[i], func);
            }
        }
    }
    /**
     * Given a value, try and cast it
     */
    autocast(s) {
        if (typeof (s) === 'object') {
            this.traverse(s, this.process);
            return s;
        }
        return this._cast(s);
    }
    _cast(s) {
        let key;
        // Don't cast Date objects
        if (s instanceof Date)
            return s;
        if (typeof s === 'boolean')
            return s;
        // Try to cast it to a number
        if (!isNaN(s))
            return Number(s);
        // Try to make it a common string
        for (key in this.commonStrings) {
            if (s === key)
                return this.commonStrings[key];
        }
        // Give up
        return s;
    }
}
exports.default = Autocast;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2Nhc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdXRpbHMvYXV0b2Nhc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtJQUFBO1FBQ0U7O1dBRUc7UUFDSCxrQkFBYSxHQUFHO1lBQ2QsTUFBTSxFQUFFLElBQUk7WUFDWixPQUFPLEVBQUUsS0FBSztZQUNkLFdBQVcsRUFBRSxTQUFTO1lBQ3RCLE1BQU0sRUFBRSxJQUFJO1lBQ1osS0FBSyxFQUFFLEdBQUc7U0FDWCxDQUFBO0lBK0NILENBQUM7SUE3Q0MsT0FBTyxDQUFFLEdBQUcsRUFBQyxLQUFLLEVBQUUsQ0FBQztRQUNuQixJQUFJLE9BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxRQUFRO1lBQUUsT0FBTTtRQUN0QyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUM1QixDQUFDO0lBRUQsUUFBUSxDQUFFLENBQUMsRUFBQyxJQUFJO1FBQ2QsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDZixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUM1QixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLElBQUksT0FBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVEsRUFBRTtnQkFDOUMsMENBQTBDO2dCQUMxQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQTthQUN6QjtTQUNGO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0gsUUFBUSxDQUFFLENBQUM7UUFDVCxJQUFJLE9BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLEVBQUU7WUFDMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQzlCLE9BQU8sQ0FBQyxDQUFBO1NBQ1Q7UUFFRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDdEIsQ0FBQztJQUVPLEtBQUssQ0FBRSxDQUFDO1FBQ2QsSUFBSSxHQUFHLENBQUE7UUFFUCwwQkFBMEI7UUFDMUIsSUFBSSxDQUFDLFlBQVksSUFBSTtZQUFFLE9BQU8sQ0FBQyxDQUFBO1FBQy9CLElBQUksT0FBTyxDQUFDLEtBQUssU0FBUztZQUFFLE9BQU8sQ0FBQyxDQUFBO1FBRXBDLDZCQUE2QjtRQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUFFLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBRS9CLGlDQUFpQztRQUNqQyxLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQzlCLElBQUksQ0FBQyxLQUFLLEdBQUc7Z0JBQUUsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1NBQzlDO1FBRUQsVUFBVTtRQUNWLE9BQU8sQ0FBQyxDQUFBO0lBQ1YsQ0FBQztDQUNGO0FBekRELDJCQXlEQyJ9