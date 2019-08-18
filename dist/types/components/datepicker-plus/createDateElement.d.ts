import { EventEmitter } from "../../stencil.core";
import { DatepickerPlus } from "./datepicker-plus";
export interface IDateClassList {
    classListString: string;
    updateClassListString(): string;
}
export interface IDateHelperMethods {
    dateObject(): Date;
    dateString(): string;
    offset(): number;
}
export interface IDateOptions {
    checked?: boolean;
    disabled?: boolean;
    rangeIndex?: number;
    rangeEnd?: boolean;
    highlight?: boolean;
}
export interface IDateElement extends IDateOptions, IDateHelperMethods, IDateClassList {
    day: number;
    month: number;
    year: number;
    dayOfWeek: number;
    events: {
        [key: string]: EventEmitter;
    };
    el?: HTMLInputElement;
    datepickerPlus: DatepickerPlus;
    tags: {
        [key: string]: string;
    };
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
