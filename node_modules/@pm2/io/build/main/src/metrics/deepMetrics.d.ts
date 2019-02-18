import MetricsInterface from './metricsInterface';
import MetricsFeature from '../features/metrics';
export default class DeepMetrics implements MetricsInterface {
    private metricFeature;
    private allPossibleMetrics;
    private defaultConf;
    constructor(metricFeature: MetricsFeature);
    init(config?: any | boolean): void;
    destroy(): void;
}
