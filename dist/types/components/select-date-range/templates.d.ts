import { IDateElement } from './createDateElement';
import { IWeekDay } from "./config";
export declare const renderDate: (date: IDateElement) => any;
export declare const renderWeekHeader: (weekDays?: IWeekDay[]) => any;
export declare const renderWeek: (week: IDateElement[], renderHeader?: boolean) => any;
export declare const renderMonth: (month: IDateElement[]) => any;
