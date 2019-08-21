import { EventEmitter } from '../../stencil.core';
import { IMonth, IWeekDay, SelectMode } from './config';
import { IDateElement } from './registerDate';
import { TagPredicate } from './tags';
export declare type DateString = string;
export declare type WeekHeader = 'single' | 'per-month';
export interface IScopeController {
    activate: (dateString: DateString, scopeSize: number) => IDateElement[][];
    deactivate: () => IDateElement[][];
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
}
export declare class DatepickerPlus {
    plusConfig: IPlusConfig;
    private registered;
    viewElements: IDateElement[][];
    private selected;
    disabled: DateString[];
    viewList: DateString[][];
    activeScope: IScopeController;
    onDateSelect: EventEmitter<DateString[]>;
    onDateDeselect: EventEmitter<DateString[]>;
    onRangeSelect: EventEmitter<DateString[]>;
    updateViewElements(next: DateString[][]): void;
    componentWillLoad(): void;
    private unfoldDisabledList;
    private patchConfigLists;
    createViewList([start, end]: [DateString, DateString]): any;
    registerViewDates(viewList: DateString[][]): void;
    select: (dateString: string) => IDateElement[][];
    deselect: (dateString: string) => void;
    generateScope(viewElements: IDateElement[][], disabledCache: DateString[]): IScopeController;
    checkIfHasDisabled(selected: DateString[], disabled: DateString[]): boolean;
    selectMultipleDates(dateStringList: DateString[], viewElements: IDateElement[][]): IDateElement[][];
    disableMultipleDates(dateStringList: DateString[], viewElements: IDateElement[][]): IDateElement[][];
    unfoldTag: (tag: string, tags: {
        [key: string]: TagPredicate;
    }) => string[];
    updateTags(tags: {
        [key: string]: TagPredicate;
    }, viewElements: IDateElement[][]): IDateElement[][];
    render(): any;
}
