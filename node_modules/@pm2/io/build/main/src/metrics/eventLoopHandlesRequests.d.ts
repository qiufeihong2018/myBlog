import MetricsFeature from '../features/metrics';
import MetricsInterface from './metricsInterface';
export default class EventLoopHandlesRequestsMetric implements MetricsInterface {
    private metricFeature;
    constructor(metricFeature: MetricsFeature);
    init(config?: any | boolean): void;
    destroy(): void;
    private getProcess;
}
