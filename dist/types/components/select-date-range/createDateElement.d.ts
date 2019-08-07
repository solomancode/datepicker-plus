import { EventEmitter } from "../../stencil.core";
declare type DateEvents = 'onDateSelect';
export interface IDateEvents {
    onDateSelect?: EventEmitter;
}
export interface IDateTags {
    isToday(): boolean;
    isTomorrow(): boolean;
    isYesterday(): boolean;
    isPastDate(): boolean;
    isFutureDate(): boolean;
}
export interface IDateHelperMethods {
    dateObject(): Date;
    dateString(): string;
    select(): void;
    deselect(): void;
    enable(): void;
    disable(): void;
    offset(): void;
    bindEvent(event: DateEvents, emitter: EventEmitter): void;
}
export interface IDateOptions {
    checked?: boolean;
    disabled?: boolean;
}
export interface IDateElement extends IDateOptions, IDateHelperMethods, IDateEvents, IDateTags {
    day: number;
    month: number;
    year: number;
    dayOfWeek: number;
    events: {
        [key: string]: EventEmitter;
    };
    el: HTMLInputElement;
}
export interface IDateParams {
    dateString: string;
    options?: IDateOptions;
    events?: IDateEvents;
}
export declare const createdDateElements: {
    [key: string]: IDateElement;
};
export declare const createDateElement: ({ dateString, options, events }: IDateParams) => IDateElement;
export {};
