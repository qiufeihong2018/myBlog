import ActionsFeature from '../features/actions';
export default class ActionsService {
    private defaultConf;
    private services;
    constructor(actionsFeature: ActionsFeature);
    init(config?: any, force?: any): void;
    destroy(): void;
    get(name: string): any;
}
