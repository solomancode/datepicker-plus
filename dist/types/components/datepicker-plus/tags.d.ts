import { IDateElement } from "./createDateElement";
declare type ClassSetter = (c: string) => void;
declare type TagAssertion = (dateElement: IDateElement, setClass?: ClassSetter) => boolean;
export declare const today: TagAssertion;
export declare const tomorrow: TagAssertion;
export declare const yesterday: TagAssertion;
export declare const past: TagAssertion;
export declare const future: TagAssertion;
/**
 * Range start date
 */
export declare const rangeStart: TagAssertion;
/**
 * Range end date
 */
export declare const rangeEnd: TagAssertion;
/**
 * A connector is a date between date start and date end
 * in a range select mode.
 */
export declare const connector: TagAssertion;
export {};
