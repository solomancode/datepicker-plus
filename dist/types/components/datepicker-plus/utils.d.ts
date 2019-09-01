import { DateString } from "./datepicker-plus";
import { DateElement } from "./DateElement";
export declare const dateToString: (date: Date) => string;
export declare const getNextDayString: (dateString: string) => string;
export declare const isSameDate: (date1: Date, date2: Date) => boolean;
export declare const dateStringInRange: (dateString: string, dateRange: [string, string]) => boolean;
export declare const getCurrentMonthRange: () => string[];
export declare const NormDt: (dateString: string) => string;
export declare const unfoldRange: (dateString0: string, dateString1: string) => string[];
export declare const parsePropJSON: (prop: string) => any;
export declare const sortDates: ([dateString0, dateString1]: [string, string]) => string[];
interface IGithubIssueParams {
    title: string;
    body: string;
    label: string;
}
export declare const dateOffset: (date0: Date, date1: Date) => number;
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
export declare const groupDates: (dateStringList: string[]) => IDateGroup;
export declare const checkIfValidDateString: (dateString: string) => boolean;
export declare const monthToWeeks: (month: DateElement[]) => any[];
export declare const getScopeRange: (scopeCenter: string, scopeSize: number) => [string, string];
export declare const openGithubIssue: ({ title, body, label }: IGithubIssueParams) => never;
export {};
