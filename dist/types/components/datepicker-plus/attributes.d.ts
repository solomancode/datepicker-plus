import { DateElement } from "./DateElement";
/**
 * Date attributes provide a way to set dates dynamically
 * by providing a string that is mapped to a date or more.
 *
 * example:
 * given 'past' as an input to the disabled property will result in
 * disabling all dates up to today.
 *
 */
/**
 * attribute check predicate
 */
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
