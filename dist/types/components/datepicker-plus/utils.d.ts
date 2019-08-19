import { IDateElement } from "./registerDate";
export declare const dateToString: (date: Date) => string;
export declare const getDateComponents: (dateString: string) => number[];
export declare const stringToDate: (dateString: string) => Date;
export declare const getNextDay: (date: string | Date) => string | Date;
export declare const isSameDate: (date1: Date, date2: Date) => boolean;
export declare const dateStringInRange: (dateString: string, dateRange: [string, string]) => boolean;
export declare const getCurrentMonthRange: () => string[];
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
export declare const groupByMonth: (dateString: string[]) => any;
export declare const monthToWeeks: (month: IDateElement[]) => any[];
export declare const generateDateClass: (dateElement: IDateElement) => string;
export declare const openGithubIssue: ({ title, body, label }: IGithubIssueParams) => never;
export {};
