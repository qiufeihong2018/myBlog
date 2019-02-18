export default class MetricConfig {
    static getConfig(config: any, defaultConf: any): any;
    static initProbes(allPossibleMetrics: any, config: any, metricFeature: any): {};
    static setProbesValue(allPossibleMetrics: any, metrics: any, probes: any, defaultUnit: any): void;
    static buildConfig(config: any): any;
}
