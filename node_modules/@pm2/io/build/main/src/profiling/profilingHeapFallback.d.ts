import ProfilingType from './profilingType';
export default class ProfilingHeapFallback implements ProfilingType {
    private profiler;
    private snapshot;
    private MODULE_NAME;
    private FALLBACK_MODULE_NAME;
    init(): Promise<void>;
    destroy(): void;
    start(): void;
    stop(): Promise<{}>;
    takeSnapshot(): Promise<{}>;
    private getProfileInfo;
}
