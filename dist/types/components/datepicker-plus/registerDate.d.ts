import { DateString } from "./datepicker-plus";
export interface IDateElement {
    dateString: any;
    tags: {
        [key: string]: string;
    };
    checked: boolean;
    disabled: boolean;
    year: number;
    month: number;
    day: number;
    dayOfWeek: number;
}
export declare function registerDate(created: {
    [key: string]: IDateElement;
}, dateString: DateString): {
    [key: string]: IDateElement;
};
