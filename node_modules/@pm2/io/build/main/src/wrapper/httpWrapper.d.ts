import MetricsFeature from '../features/metrics';
export default class HttpWrapper {
    private metricFeature;
    constructor(metricFeature: MetricsFeature);
    init(opts: any, http: any): any;
}
