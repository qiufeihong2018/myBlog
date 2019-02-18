import MetricsFeature from '../features/metrics';
import MetricsInterface from './metricsInterface';
export default class V8Metric implements MetricsInterface {
    private timer;
    private metricFeature;
    private TIME_INTERVAL;
    private unitKB;
    private allPossibleMetrics;
    private allPossibleMetricsGC;
    private defaultConf;
    constructor(metricFeature: MetricsFeature);
    init(config?: any | boolean): void;
    destroy(): void;
    private _sendGCStats;
}
