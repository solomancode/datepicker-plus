import { EventEmitter } from '../../stencil.core';
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
    disabledDates: string;
    stylesheetUrl: string;
    config: string;
    /**
     * Parsed date list...
     */
    private checkedDatesInput;
    private disabledDatesInput;
    onDateSelect: EventEmitter<IDateElement>;
    onDateDeselect: EventEmitter<IDateElement>;
    readonly events: {
        onDateSelect: EventEmitter<IDateElement>;
        onDateDeselect: EventEmitter<IDateElement>;
    };
    _config: IConfig;
    dayClassList: string;
    parseCheckedDates(dates: string | string[]): void;
    parseDisabledDates(dates: string | string[]): void;
    componentWillLoad(): void;
    getDateElement: (dateString: string) => IDateElement;
    selectDate: (dateString: string) => void;
    selectDates: (dateString: string[]) => void;
    disableDates: (dateString: string[]) => void;
    isSelectedDate: (dateString: string) => void;
    clearSelected(): void;
    private createDate;
    private updateViewList;
    updateConfig(config?: IConfig): void;
    loadStylesheet(): any;
    render(): any[];
}
