import { EventEmitter } from "../../stencil.core";
import { DatepickerPlus } from "./datepicker-plus";
export interface IDateTags {
    isToday(): boolean;
    isTomorrow(): boolean;
    isYesterday(): boolean;
    isPastDate(): boolean;
    isFutureDate(): boolean;
}
export interface IDateClassList {
    classListString: string;
    updateClassListString(): string;
}
export interface IDateHelperMethods {
    dateObject(): Date;
    dateString(): string;
    offset(): void;
}
export interface IDateOptions {
    checked?: boolean;
    disabled?: boolean;
}
export interface IDateElement extends IDateOptions, IDateHelperMethods, IDateTags, IDateClassList {
    day: number;
    month: number;
    year: number;
    dayOfWeek: number;
    events: {
        [key: string]: EventEmitter;
    };
    el: HTMLInputElement;
    datepickerPlus: DatepickerPlus;
}
export interface IDateParams {
    dateString: string;
    datepickerPlus: DatepickerPlus;
    options?: IDateOptions;
}
export declare const createdDateElements: {
    [key: string]: IDateElement;
};
export declare function createDateElement({ dateString, options, datepickerPlus }: IDateParams): IDateElement;
