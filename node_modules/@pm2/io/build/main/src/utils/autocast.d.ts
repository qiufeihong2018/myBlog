export default class Autocast {
    /**
     * Common strings to cast
     */
    commonStrings: {
        'true': boolean;
        'false': boolean;
        'undefined': undefined;
        'null': null;
        'NaN': number;
    };
    process(key: any, value: any, o: any): void;
    traverse(o: any, func: any): void;
    /**
     * Given a value, try and cast it
     */
    autocast(s: any): any;
    private _cast;
}
