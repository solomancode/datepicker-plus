import { DateElement } from './DateElement';
import { IPlusConfig, IWeekDay, IMonth } from '../../datepicker-plus';
/**
 * ------------------------------
 * JSX, fancy templates goes here.
 * -------------------------------
 */
/**
 * renders the interactive date element
 */
export declare function renderDate(dateElement: DateElement): any;
/**
 * week header, renders week days.
 */
export declare function renderWeekHeader(weekDays: IWeekDay[]): any;
/**
 * of course we need an empty placeholder
 */
export declare function renderEmpty(offset: number): any[];
/**
 * it renders the whole week 24/7
 */
export declare function renderWeek(week: DateElement[], renderHeader: boolean, weekDays: IWeekDay[]): any;
/**
 * renders a month header
 */
export declare function renderMonthHeader(dayFirst: DateElement, months: IMonth[]): any;
/**
 * renders a month
 */
export declare function renderMonth(month: DateElement[], config: IPlusConfig): any;
/**
 * render date picker container.
 * and handles multiple layout options.
 */
export declare function renderContainer(dates: DateElement[][], config: IPlusConfig): any[];
