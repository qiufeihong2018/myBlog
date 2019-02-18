import ProfilingType from './profilingType';
export default class ProfilingCPU implements ProfilingType {
    private inspectorService;
    constructor();
    init(): Promise<{}>;
    destroy(): void;
    start(): Promise<{}>;
    stop(): Promise<{}>;
    private _convertTimeDeltas;
    private getProfileInfo;
}
