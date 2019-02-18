import ActionsFeature from '../features/actions';
import ActionsInterface from './actionsInterface';
export default class ProfilingHeapAction implements ActionsInterface {
    private actionFeature;
    private profilingFeature;
    private config;
    private uuid;
    private profilings;
    constructor(actionFeature: ActionsFeature, config?: any);
    init(): Promise<void>;
    destroy(): void;
    private stopProfiling;
    private exposeActions;
}
