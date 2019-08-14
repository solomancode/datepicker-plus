import { EventEmitter } from '../../stencil.core';
import { IDateElement, IDateOptions } from './createDateElement';
import { SelectMode } from './config';
export declare type DateString = string;
export interface IPlusConfig {
    selectMode: SelectMode;
    viewRange: [DateString, DateString];
    selected: DateString[];
    disabled: DateString[];
    stylesheetUrl?: string;
}
export declare class DatepickerPlus {
    plusConfig: IPlusConfig;
    viewList: IDateElement[][];
    selected: DateString[];
    disabled: DateString[];
    private rangeStart;
    parseSelected(next: DateString[], current: DateString[]): void;
    parseDisabled(next: DateString[], current: DateString[]): void;
    unfoldTag: (tag: string) => string[];
    addRangeMark: (dateString: string) => void;
    resetRangeMarks: () => void;
    updateDateOptions(dateString: DateString, options: IDateOptions): void;
    select: (dateString: string) => void;
    deselect: (dateString: string) => void;
    updateConfig(config: IPlusConfig): void;
    onDateSelect: EventEmitter<IDateElement>;
    onDateDeselect: EventEmitter<IDateElement>;
    onRangeSelect: EventEmitter<DateString[]>;
    componentWillLoad(): void;
    private unfoldSelected;
    getDateElement: (dateString: string) => IDateElement;
    private MemProtect;
    protectMemLeak(): void;
    parseViewRange(viewRange: [DateString, DateString]): void;
    private createDate;
    render(): any[];
}
