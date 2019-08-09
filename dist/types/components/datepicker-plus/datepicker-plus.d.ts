import { EventEmitter } from '../../stencil.core';
import { IDateElement } from './createDateElement';
import { SelectMode } from './config';
export declare type DateString = string;
export interface IPlusConfig {
    selectMode: SelectMode;
    viewRange: [DateString, DateString];
    selected: DateString[];
    disabled: DateString[];
    stylesheetUrl?: string;
}
export declare class SelectDateRange {
    plusConfig: IPlusConfig;
    parseConfig(): void;
    onDateSelect: EventEmitter<IDateElement>;
    onDateDeselect: EventEmitter<IDateElement>;
    readonly events: {
        onDateSelect: EventEmitter<IDateElement>;
        onDateDeselect: EventEmitter<IDateElement>;
    };
    componentWillLoad(): void;
    getDateElement: (dateString: string) => IDateElement;
    selectDate: (dateString: string) => void;
    selectDates: (dateString: string[]) => void;
    disableDates: (dateString: string[]) => void;
    isSelectedDate: (dateString: string) => void;
    clearSelected(): void;
    private createDate;
    private updateViewOptions;
    private updateViewList;
    updateConfig(config?: IPlusConfig): void;
    loadStylesheet(): any;
    render(): any[];
}
