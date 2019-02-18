import { NotifyFeature } from './notify';
export declare const features: {
    name: string;
    module: typeof NotifyFeature;
}[];
export interface Feature {
    init(): Object;
}
