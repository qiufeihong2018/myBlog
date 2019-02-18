export default class ModuleUtils {
    static getModulePath(moduleName: any): Promise<{}>;
    static loadModule(modulePath: any, moduleName: any, args?: any): any;
    static detectModule(moduleName: any, cb: any): void;
    static _getModule(): any;
    static _lookForModule(requirePaths: any, moduleName: any, cb: any): any;
}
