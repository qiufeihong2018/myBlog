import { Feature } from './featureTypes';
import Meter from '../utils/metrics/meter';
import Counter from '../utils/metrics/counter';
import Histogram from '../utils/metrics/histogram';
export default class MetricsFeature implements Feature {
    private _var;
    private defaultAggregation;
    private _started;
    private _alreadySentData;
    private timer;
    private metricService;
    private AVAILABLE_MEASUREMENTS;
    constructor();
    init(config?: any, force?: any): any;
    transpose(variableName: any, reporter?: any): any;
    meter(opts: any): Meter | undefined;
    counter(opts?: any): Counter | undefined;
    histogram(opts?: any): Histogram | void;
    metric(opts: any): any;
    deleteMetric(name: string): void;
    destroy(): void;
    /** -----------------------------------------
     * Private Methods
     * ------------------------------------------
     */
    /**
     * Check if metric is historic or not
     *
     * @param historic
     * @returns {boolean}
     * @private
     */
    _historicEnabled(historic: any): boolean;
    /**
     * Only for tests
     *
     * @returns {Object}
     */
    _getVar(): Map<string, any>;
    /**
     * Data that will be sent to Keymetrics
     */
    _cookData(data: any): {};
    _getValue(value: any): any;
}
