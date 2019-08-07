import { IConfig } from "./select-date-range";
export interface IWeekDay {
    name: string;
    abbr: string;
    isWeekend?: boolean;
}
export interface IMonth {
    name: string;
    abbr: string;
}
export declare const DEFAULT_WEEK_DAYS: IWeekDay[];
export declare const DEFAULT_MONTHS: IMonth[];
/**
 * CSS Classes
 */
export declare const DEFAULT_CLASSES: {
    day: string;
    disabled: string;
    selected: string;
    month: string;
    week: string;
    weekend: string;
    today: string;
};
export declare type SelectMode = 'single' | 'multiple' | 'range';
export declare const DEFAULT_VIEW_RANGE_START: string, DEFAULT_VIEW_RANGE_END: string;
export declare const DEFAULT_CONFIG: IConfig;
