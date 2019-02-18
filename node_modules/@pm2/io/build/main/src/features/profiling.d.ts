import { Feature } from './featureTypes';
export default class ProfilingFeature implements Feature {
    private profilings;
    init(forceFallback?: boolean): any;
    destroy(): void;
}
