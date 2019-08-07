declare type DateEvents = 'onSelect';
export interface IDateEvents {
    onSelect?: (dateString: string, date: Date) => void | boolean;
}
export interface IDateHelperMethods {
    dateObject(): Date;
    dateString(): string;
    select(): void;
    bindEvent(event: DateEvents, fn: Function): void;
}
export interface IDateOptions {
    checked?: boolean;
    disabled?: boolean;
}
export interface IDateElement extends IDateOptions, IDateHelperMethods, IDateEvents {
    day: number;
    month: number;
    year: number;
    dayOfWeek: number;
    events: {
        [key: string]: Function;
    };
}
export declare const createdDateElements: {
    [key: string]: IDateElement;
};
export declare const createDateElement: (dateString: string, options?: IDateOptions) => IDateElement;
export {};
