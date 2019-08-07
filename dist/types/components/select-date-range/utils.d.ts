import { IDateElement } from "./createDateElement";
export declare const dateToString: (date: Date) => string;
export declare const getDateComponents: (dateString: string) => number[];
export declare const stringToDate: (dateString: string) => Date;
export declare const getNextDay: (date: string | Date) => string | Date;
export declare const getDateRange: (start: string, end: string) => [Date, Date];
export declare const isSameDate: (date1: Date, date2: Date) => boolean;
export declare const monthToWeeks: (month: IDateElement[]) => any[];
export declare const dateStringInRange: (dateString: string, dateRange: [string, string]) => boolean;
export declare const getCurrentMonthRange: () => string[];
export declare const getDatesBetween: (dateString0: string, dateString1: string) => any[];
