import { IMonth, IWeekDay, SelectMode } from './config';
import { IDateElement } from './registerDate';
export declare type DateString = string;
export declare type WeekHeader = 'single' | 'per-month';
export interface IPlusConfig {
    selectMode?: SelectMode;
    viewRange?: [DateString, DateString];
    selected?: DateString[];
    disabled?: DateString[];
    weekHeader?: WeekHeader;
    selectScope?: number;
    stylesheetUrl?: string;
    i18n?: {
        weekDays?: IWeekDay[];
        months?: IMonth[];
    };
}
export declare class DatepickerPlus {
    plusConfig: IPlusConfig;
    private registered;
    viewElements: IDateElement[][];
    selected: DateString[];
    updateViewSelectedElements(next: DateString[]): void;
    viewList: DateString[][];
    updateViewElements(next: DateString[][]): void;
    componentWillLoad(): void;
    private patchConfigLists;
    createViewList([start, end]: [DateString, DateString]): any;
    registerViewDates(viewList: DateString[][]): void;
    selectDate(dateString: DateString, viewElements: IDateElement[][]): IDateElement[][];
    render(): any;
}
