import { DateString } from "./datepicker-plus";
export interface IDateElement {
    dateString: DateString;
    tags: {
        [key: string]: boolean;
    };
    checked: boolean;
    disabled: boolean;
    highlighted: boolean;
    rangeIndex: number;
    rangeEndIndex: number;
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
