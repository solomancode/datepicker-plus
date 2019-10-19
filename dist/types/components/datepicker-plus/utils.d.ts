import { DateElement } from "./DateElement";
import { DateString } from "../../datepicker-plus";
/**
 * takes a date, returns a dateString
 */
export declare const dateToString: (date: Date) => string;
/**
 * given a dateString, return the next day dateString
 */
export declare const getNextDayString: (dateString: string) => string;
/**
 * check if a pair of dates are equal.
 */
export declare const isSameDate: (date1: Date, date2: Date) => boolean;
/**
 * checks if a certain dateString exists in a range of dates
 */
export declare const dateStringInRange: (dateString: string, dateRange: [string, string]) => boolean;
/**
 * current month start and end dates
 */
export declare const getCurrentMonthRange: () => string[];
export declare const NormDt: (dateString: string) => string;
/**
 * given a pair of dateStrings, this function will
 * generate all the dates in between.
 */
export declare const unfoldRange: (dateString0: string, dateString1: string) => string[];
/**
 * parse props JSON, usually props are
 * given in string format
 */
export declare const parsePropJSON: (prop: string) => any;
/**
 * sort a pair of dates
 */
export declare const sortDates: ([dateString0, dateString1]: [string, string]) => string[];
interface IGithubIssueParams {
    title: string;
    body: string;
    label: string;
}
/**
 * calculate the offset between two dates
 */
export declare const dateOffset: (date0: Date, date1: Date) => number;
/**
 * fills an array's empty slots
 */
export declare const patchArray: (target: any[], source: any) => any;
interface IDateGroup {
    sorted: {
        years: number[];
        months: {
            [key: number]: number[];
        };
    };
    toArray(): DateString[][];
}
/**
 * group dates for view.
 * TODO: elaborate more...
 */
export declare const groupDates: (dateStringList: string[]) => IDateGroup;
/**
 * checks if a given dateString is valid
 */
export declare const checkIfValidDateString: (dateString: string) => boolean;
/**
 * convert a month to weeks
 */
export declare const monthToWeeks: (month: DateElement[]) => any[];
/**
 * given scope center and size, this function will
 * calculate all the dates required to generate that scope
 */
export declare const getScopeRange: (scopeCenter: string, scopeSize: number) => [string, string];
/**
 * auto-open an issue if something weird happens.
 */
export declare const openGithubIssue: ({ title, body, label }: IGithubIssueParams) => never;
export {};
