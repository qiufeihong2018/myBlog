import { Feature } from './featureTypes';
export default class Events implements Feature {
    init(): Promise<Object>;
    emit(name: any, data: any): false | void;
}
