import { EventEmitter } from '../../stencil.core';
import { DateElement } from './DateElement';
import { IPlusConfig, DateString, IScopeController } from '../../datepicker-plus';
export declare class DatepickerPlus {
    /**
     * date picker plus config passed as a prop.
     */
    plusConfig: IPlusConfig;
    /**
     * register new created date objects for reuse
     */
    private dateRegistry;
    /**
     * reactive state to update view elements
     */
    viewElements: DateElement[][];
    /**
     * a list of isoString formated dates to be
     * selected.
     */
    private selected;
    /**
     * a list of isoString formated dates to be
     * disabled
     */
    disabled: DateString[];
    /**
     * a list of isoString formated dates to be
     * highlighted
     */
    highlighted: DateString[];
    /**
     * scope controller object to enable/disable
     * selection scope
     */
    activeScope: IScopeController;
    /**
     * emits when a date is selected.
     * use it to react to date selected
     */
    onDateSelect: EventEmitter<DateString[]>;
    /**
     * emits when a date is deselected
     * use it to react to date deselected
     */
    onDeselect: EventEmitter<DateString[]>;
    /**
     * emits when a complete date range is selected
     * use it to react to a complete date range selected
     */
    onRangeSelect: EventEmitter<DateString[]>;
    /**
     * emits when a date or more is highlighted as
     * potential select candidate
     */
    onHighlight: EventEmitter<DateString[]>;
    /**
     * emits when date highlight is cleared after
     * dates deselect
     */
    onHighlightClear: EventEmitter<void>;
    componentWillLoad(): void;
    /**
     * prepare configuration for initialization
     * fill in necessary data
     */
    private patchConfigLists;
    componentDidLoad(): void;
    /**
     * checks for valid select conditions before
     * applying date select
     */
    private checkDatesBeforeSelect;
    /**
     * dynamic dates can be achieved through a date attribute
     *
     * some examples of currently available date attributes are:
     * ( today - tomorrow - yesterday - past - future )
     *
     * this methods unfolds registered date attributes to it's corresponding dateString(s)
     * a date attribute might be unfolded to a list of corresponding dateStrings
     */
    private unfoldDateStringListAttributes;
    /**
     * given two dates this method will return
     * the dates in between formatted for view
     */
    unfoldViewRange([start, end]: [DateString, DateString]): string[][];
    /**
     * selects a date in different selection modes
     */
    select: (dateString: string) => DateElement[][];
    /**
     * deselect a list of dates
     */
    deselect: (dateStringList: string[]) => void;
    /**
     * generates a selection constraint scope
     */
    generateScope(disabledSnapshot: DateString[]): IScopeController;
    /**
     * highlight potential select candidates
     */
    highlightON(dateString: DateString): void;
    /**
     * clear highlighted dates
     */
    clearHighlighted(): void;
    /**
     * checks if selected contains a disabled date
     */
    checkIfHasDisabled(selected: DateString[], disabled: DateString[]): boolean;
    /**
     * returns a date element using it's dateString
     */
    getDateElement: (dateString: string) => DateElement;
    /**
     * select multiple dates and applies
     * required attributes
     */
    selectMultipleDates(dateStringList: DateString[]): void;
    /**
     * disable multiple dates
     */
    disableMultipleDates(dateStringList: DateString[]): void;
    /**
     * enables multiple dates
     */
    enableMultipleDates(dateStringList: DateString[]): void;
    /**
     * unfolds a date attribute within the
     * current active view.
     */
    unfoldAttribute: (attr: string) => string[];
    /**
     * registers a date for later use
     */
    registerDate: (dateString: string) => DateElement;
    /**
     * RENDER... 👀
     *
     */
    render(): any;
}
