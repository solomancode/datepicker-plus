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
    parseSelected(next: DateString[], current: DateString[]): void;
    disableAll(disabled: DateString[]): void;
    addRangeMark: (rangeMark: string) => void;
    checkRangeDeselect: (dateString: string) => void;
    updateConfig(config: IPlusConfig): void;
    onDateSelect: EventEmitter<IDateElement>;
    onDateDeselect: EventEmitter<IDateElement>;
    componentWillLoad(): void;
    getDateElement: (dateString: string) => IDateElement;
    private MemProtect;
    protectMemLeak(): void;
    parseViewRange(viewRange: [DateString, DateString]): void;
    private createDate;
    render(): any[];
}