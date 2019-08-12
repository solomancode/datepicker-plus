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
export declare class DatepickerPlus {
    plusConfig: IPlusConfig;
    viewList: IDateElement[][];
    selected: DateString[];
    disabled: DateString[];
    private rangeStart;
    disableAll(disabled: DateString[]): void;
    private addRangeMark;
    updateConfig(config: IPlusConfig): void;
    onDateSelect: EventEmitter<IDateElement>;
    onDateDeselect: EventEmitter<IDateElement>;
    /**
     * Internal event onClick...
     */
    onDateClick: EventEmitter<IDateElement>;
    componentWillLoad(): void;
    getDateElement: (dateString: string) => IDateElement;
    selectDate: (dateString: string) => void;
    deselectDate: (dateString: string) => void;
    private MemProtect;
    protectMemLeak(): void;
    parseViewRange(viewRange: [DateString, DateString]): void;
    clearSelected(): void;
    resetDisabled(): void;
    private createDate;
    private c;
    render(): any[];
}
