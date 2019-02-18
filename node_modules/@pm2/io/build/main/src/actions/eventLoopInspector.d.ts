import ActionsFeature from '../features/actions';
import ActionsInterface from './actionsInterface';
export default class Inspector implements ActionsInterface {
    private actionFeature;
    constructor(actionFeature: ActionsFeature);
    init(): Promise<void | {}>;
    private exposeActions;
}
