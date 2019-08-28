import { DateElement } from "./DateElement";
export declare type AttributeCheckFn = (dateElement: DateElement) => boolean;
export declare const attributeChecks: {
    today: AttributeCheckFn;
    rangeStart: AttributeCheckFn;
    rangeEnd: AttributeCheckFn;
    connector: AttributeCheckFn;
    tomorrow: AttributeCheckFn;
    yesterday: AttributeCheckFn;
    past: AttributeCheckFn;
    future: AttributeCheckFn;
};
