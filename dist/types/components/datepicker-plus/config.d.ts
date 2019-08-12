import { IPlusConfig } from "./datepicker-plus";
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
    monthHeader: string;
    monthContent: string;
    week: string;
    empty: string;
    weekHeader: string;
    weekContent: string;
    weekend: string;
    today: string;
    checkbox: string;
};
export declare type SelectMode = 'single' | 'multiple' | 'range';
export declare const DEFAULT_CONFIG: IPlusConfig;