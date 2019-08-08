import { IConfig } from "./select-date-range";
import { getCurrentMonthRange } from "./utils";

export interface IWeekDay {
    name: string,
    abbr: string,
    isWeekend?: boolean
}

export interface IMonth {
    name: string,
    abbr: string
}

export const DEFAULT_WEEK_DAYS: IWeekDay[] = [
    { name: 'Sunday', abbr: 'Sun', isWeekend: true },
    { name: 'Monday', abbr: 'Mon '},
    { name: 'Tuesday', abbr: 'Tue' },
    { name: 'Wednesday', abbr: 'Wed' },
    { name: 'Thursday', abbr: 'Thu' },
    { name: 'Friday', abbr: 'Fri' },
    { name: 'Saturday', abbr: 'Sat', isWeekend: true }
]

export const DEFAULT_MONTHS: IMonth[] = [
    { name: 'January', abbr: 'Jan' },
    { name: 'February', abbr: 'Feb' },
    { name: 'March', abbr: 'Mar' },
    { name: 'April', abbr: 'Apr' },
    { name: 'May', abbr: 'May' },
    { name: 'June', abbr: 'Jun' },
    { name: 'July', abbr: 'Jul' },
    { name: 'August', abbr: 'Aug' },
    { name: 'September', abbr: 'Sep' },
    { name: 'October', abbr: 'Oct' },
    { name: 'November', abbr: 'Nov' },
    { name: 'December', abbr: 'Dec' }
]

/**
 * CSS Classes
 */
export const DEFAULT_CLASSES = {
    day: 'day',
    disabled: 'disabled',
    selected: 'selected',
    month: 'month',
    monthHeader: 'month-header',
    monthContent: 'month-content',
    week: 'week',
    empty: 'empty',
    weekHeader: 'week-header',
    weekContent: 'week-content',
    weekend: 'weekend',
    today: 'today',
    checkbox: 'checkbox'
}

export type SelectMode = 'single' | 'multiple' | 'range'

export const [
    DEFAULT_VIEW_RANGE_START,
    DEFAULT_VIEW_RANGE_END
] = getCurrentMonthRange()

export const DEFAULT_CONFIG: IConfig = {
    selectMode: 'single',
    checkedDates: '',
    viewRangeStart: DEFAULT_VIEW_RANGE_START,
    viewRangeEnd: DEFAULT_VIEW_RANGE_END
}