import MetricsFeature from '../features/metrics';
export default class MetricsService {
    private services;
    private metricsFeature;
    private defaultConf;
    constructor(metricsFeature: MetricsFeature);
    init(config?: any, force?: any): void;
    destroyAll(): void;
    get(name: string): any;
}
