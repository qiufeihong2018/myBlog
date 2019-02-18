import MetricsFeature from '../features/metrics';
import MetricsInterface from './metricsInterface';
export default class EventLoopDelayMetric implements MetricsInterface {
    private timer;
    private metricFeature;
    private TIME_INTERVAL;
    constructor(metricFeature: MetricsFeature);
    init(config?: any | boolean): void;
    destroy(): void;
}
