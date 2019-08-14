import { IDateElement } from './createDateElement';
import { IWeekDay } from "./config";
import { WeekHeader, IPlusConfig } from './datepicker-plus';
export declare function renderDate(date: IDateElement): any;
export declare function renderWeekHeader(weekDays?: IWeekDay[]): any;
export declare function renderEmpty(offset: number): any[];
export declare function renderWeek(week: IDateElement[], renderHeader: boolean): any;
export declare function renderMonth(month: IDateElement[], weekHeader: WeekHeader): any;
export declare function renderContainer(dates: IDateElement[][], config: IPlusConfig): any[];
