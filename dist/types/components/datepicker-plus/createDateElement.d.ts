import { EventEmitter } from "../../stencil.core";
export interface IDateEvents {
    onDateSelect?: EventEmitter;
    onDateDeselect?: EventEmitter;
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
    classList(): string;
    select(): void;
    updateDateClassList(): void;
    deselect(): void;
    enable(): void;
    disable(): void;
    offset(): void;
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
export declare function createDateElement({ dateString, options, events }: IDateParams): IDateElement;
