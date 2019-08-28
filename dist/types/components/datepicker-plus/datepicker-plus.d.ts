import { EventEmitter } from '../../stencil.core';
import { IMonth, IWeekDay, SelectMode } from './config';
import { DateElement } from './DateElement';
export declare type DateString = string;
export declare type WeekHeader = 'single' | 'per-month';
export interface IScopeController {
    activate: (dateString: DateString, scopeSize: number) => void;
    deactivate: () => void;
}
export interface IPlusConfig {
    selectMode?: SelectMode;
    viewRange?: [DateString, DateString];
    selected?: DateString[];
    disabled?: DateString[];
    weekHeader?: WeekHeader;
    selectScopeSize?: number;
    stylesheetUrl?: string;
    i18n?: {
        weekDays?: IWeekDay[];
        months?: IMonth[];
    };
    layout?: 'vertical' | 'horizontal';
}
export declare class DatepickerPlus {
    plusConfig: IPlusConfig;
    private dateRegistry;
    viewElements: DateElement[][];
    private selected;
    disabled: DateString[];
    activeScope: IScopeController;
    onDateSelect: EventEmitter<DateString[]>;
    onDateDeselect: EventEmitter<DateString[]>;
    onRangeSelect: EventEmitter<DateString[]>;
    componentWillLoad(): void;
    componentDidLoad(): void;
    private unfoldDateStringList;
    private patchConfigLists;
    unfoldViewRange([start, end]: [DateString, DateString]): string[][];
    select: (dateString: string) => DateElement[][];
    deselect: (dateStringList: string[]) => void;
    generateScope(disabledSnapshot: DateString[]): IScopeController;
    checkIfHasDisabled(selected: DateString[], disabled: DateString[]): boolean;
    getDateElement: (dateString: string) => DateElement;
    selectMultipleDates(dateStringList: DateString[]): void;
    disableMultipleDates(dateStringList: DateString[]): void;
    enableMultipleDates(dateStringList: DateString[]): void;
    unfoldAttribute: (attr: string) => string[];
    registerDate: (dateString: string) => DateElement;
    render(): any;
}
