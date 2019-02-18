import ActionsFeature from '../features/actions';
import ActionsInterface from './actionsInterface';
export default class ProfilingCPUAction implements ActionsInterface {
    private actionFeature;
    private profilingFeature;
    private uuid;
    private profilings;
    constructor(actionFeature: ActionsFeature);
    init(): Promise<void>;
    destroy(): void;
    private stopProfiling;
    private exposeActions;
}
