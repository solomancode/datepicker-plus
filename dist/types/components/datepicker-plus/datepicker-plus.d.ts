import { EventEmitter } from '../../stencil.core';
import { IDateElement, IDateOptions } from './createDateElement';
import { SelectMode, IWeekDay, IMonth } from './config';
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
    viewList: IDateElement[][];
    selected: DateString[];
    disabled: DateString[];
    highlighted: DateString;
    highlight(next: DateString, current: DateString): void;
    private rangeStart;
    /**
     * Backup disabled before scoping...
     */
    private _disabled;
    parseSelected(next: DateString[], current: DateString[]): void;
    parseDisabled(next: DateString[], current: DateString[]): void;
    private setHighlight;
    unfoldTag: (tag: string) => string[];
    addRangeMark: (dateString: string) => void;
    activateSelectScope: (dateElement: IDateElement) => void;
    deactivateSelectScope: () => void;
    resetRangeMarks: () => void;
    updateDateOptions(dateString: DateString, options: IDateOptions): void;
    select: (dateString: string) => void;
    deselect: (dateString: string) => void;
    updateConfig(config: IPlusConfig): void;
    onDateSelect: EventEmitter<IDateElement>;
    onDateDeselect: EventEmitter<IDateElement>;
    onRangeSelect: EventEmitter<DateString[]>;
    componentWillLoad(): void;
    private patchConfigLists;
    private unfoldSelected;
    getDateElement: (dateString: string) => IDateElement;
    private MemProtect;
    protectMemLeak(): void;
    parseViewRange(viewRange: [DateString, DateString]): void;
    private createDate;
    render(): any[];
}
