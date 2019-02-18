export declare class InspectorService {
    private session;
    private isConnected;
    createSession(): any;
    post(action: any, params?: any): Promise<{}>;
    on(eventName: any, callback: any): void;
    connect(): void;
    disconnect(): void;
}
