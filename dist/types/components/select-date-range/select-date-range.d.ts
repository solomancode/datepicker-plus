import { IDateElement } from './createDateElement';
import { SelectMode } from './config';
export declare type DateString = string;
export interface IConfig {
    viewRangeStart?: DateString;
    viewRangeEnd?: DateString;
    checkedDates?: DateString;
    selectMode?: SelectMode;
}
export declare class SelectDateRange {
    private viewList;
    selectMode: string;
    viewRangeStart: string;
    viewRangeEnd: string;
    checkedDates: string;
    private checkedDatesList;
    /**
     * On Select date
     * if false is returned date select will cancel
     */
    onDateSelect: (dateString: string, date: Date) => void | boolean;
    config: IConfig;
    parseCheckedDates(dates: string | string[]): void;
    componentWillLoad(): void;
    getDateElement: (dateString: string) => any;
    selectDate: (dateString: string) => void;
    isSelectedDate: (dateString: string) => void;
    private isCheckedDate;
    dispatchOnSelect(target: IDateElement, dateString: string, date: Date): any;
    bindOnSelect(date: IDateElement): void;
    private createDate;
    private updateViewList;
    updateConfig(config?: IConfig): void;
    render(): any;
}
