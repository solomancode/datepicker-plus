'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const __chunk_1 = require('./chunk-a5da1c9b.js');

const dateToString = (date) => {
    const yyyy = date.getFullYear();
    const month = date.getMonth();
    const mm = (month + 1);
    const dd = date.getDate();
    return `${yyyy}-${mm}-${dd}`;
};
const getDateComponents = (dateString) => {
    return dateString.split('-').map(s => parseInt(s));
};
const stringToDate = (dateString) => {
    const [year, month, day] = getDateComponents(dateString);
    const date = new Date();
    date.setFullYear(year);
    date.setMonth(month - 1);
    date.setDate(day);
    return date;
};
const getNextDay = (date) => {
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay;
};
const getDateRange = (start, end) => {
    let startDate = stringToDate(start);
    let endDate = stringToDate(end);
    endDate = getNextDay(endDate);
    return [startDate, endDate];
};
const isSameDate = (date1, date2) => {
    if (date1.getDate() !== date2.getDate())
        return false;
    if (date1.getUTCMonth() !== date2.getUTCMonth())
        return false;
    if (date1.getFullYear() !== date2.getFullYear())
        return false;
    return true;
};
const monthToWeeks = (month) => {
    let week = [];
    let weeks = [];
    month.forEach(day => {
        if (day.dayOfWeek === 6) {
            week.push(day);
            weeks.push(week);
            week = [];
        }
        else {
            week.push(day);
        }
    });
    if (week.length) {
        weeks.push(week);
    }
    return weeks;
};
const dateStringInRange = (dateString, dateRange) => {
    const [year, month, day] = getDateComponents(dateString);
    const [year0, month0, day0] = getDateComponents(dateRange[0]);
    const [year1, month1, day1] = getDateComponents(dateRange[1]);
    if (day < day0 || day > day1)
        return false;
    if (month < month0 || month > month1)
        return false;
    if (year < year0 || year > year1)
        return false;
    return true;
};
const getCurrentMonthRange = () => {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return [dateToString(firstDay), dateToString(lastDay)];
};

const DEFAULT_WEEK_DAYS = [
    { name: 'Sunday', abbr: 'Sun', isWeekend: true },
    { name: 'Monday', abbr: 'Mon ' },
    { name: 'Tuesday', abbr: 'Tue' },
    { name: 'Wednesday', abbr: 'Wed' },
    { name: 'Thursday', abbr: 'Thu' },
    { name: 'Friday', abbr: 'Fri' },
    { name: 'Saturday', abbr: 'Sat', isWeekend: true }
];
const DEFAULT_MONTHS = [
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
];
/**
 * CSS Classes
 */
const DEFAULT_CLASSES = {
    month: 'month',
    week: 'week',
    weekend: 'weekend'
};
const [DEFAULT_VIEW_RANGE_START, DEFAULT_VIEW_RANGE_END] = getCurrentMonthRange();
const DEFAULT_CONFIG = {
    selectMode: 'single',
    checkedDates: '',
    viewRangeStart: DEFAULT_VIEW_RANGE_START,
    viewRangeEnd: DEFAULT_VIEW_RANGE_END
};

const renderDate = (date) => {
    const onValueChange = (event) => {
        event.target.checked && date.select();
    };
    return (__chunk_1.h("time", { dateTime: date.dateString() },
        __chunk_1.h("label", null,
            date.day,
            __chunk_1.h("input", { onChange: (event) => onValueChange(event), checked: date.checked, type: "checkbox", value: date.dateString() }))));
};
const renderWeekHeader = (weekDays = DEFAULT_WEEK_DAYS) => (__chunk_1.h("header", null, weekDays.map(({ name, abbr, isWeekend }) => __chunk_1.h("abbr", { class: isWeekend && DEFAULT_CLASSES.weekend, title: name }, abbr))));
const renderWeek = (week, renderHeader = false) => (__chunk_1.h("section", { class: DEFAULT_CLASSES.week },
    renderHeader && renderWeekHeader(),
    week.map(renderDate)));
const renderMonth = (month) => {
    return (__chunk_1.h("section", { class: DEFAULT_CLASSES.month },
        __chunk_1.h("header", null, DEFAULT_MONTHS[month[0].month - 1].name),
        monthToWeeks(month).map((week, i) => renderWeek(week, i === 0))));
};

const composeDateOptions = (options) => {
    return Object.assign({ checked: false, disabled: false }, options);
};
const composeDateHelpers = (dateString) => ({
    dateObject: () => undefined.stringToDate(dateString),
    dateString: () => dateString,
    select() { this.checked = true; },
    bindEvent(event, fn) { this.events[event] = fn; }
});
const createDateElement = (dateString, options) => {
    const [year, month, day] = getDateComponents(dateString);
    const dateOptions = Object.create(Object.assign({ events: {} }, composeDateOptions(options), composeDateHelpers(dateString)));
    const dayOfWeek = new Date(dateString).getDay();
    const props = { year, month, day, dayOfWeek };
    return Object.assign(dateOptions, props);
};

class SelectDateRange {
    constructor(hostRef) {
        __chunk_1.registerInstance(this, hostRef);
        this.viewList = [];
        this.config = DEFAULT_CONFIG;
        this.checked = {};
    }
    parseCheckedDates(dates) {
        if (typeof dates === 'string') {
            dates = JSON.parse(dates);
        }
        dates.forEach(date => this.checked[date] = true);
    }
    componentWillLoad() {
        this.parseCheckedDates(this.checkedDates);
        this.updateConfig();
    }
    isCheckedDate(dateString) {
        if (this.config.selectMode === 'range') {
            let range = Object.keys(this.checked);
            return dateStringInRange(dateString, range);
        }
        else {
            return (dateString in this.checked);
        }
    }
    dispatchOnSelect(target, dateString, date) {
        if ('onSelect' in target.events) {
            return target.events.onSelect(dateString, date);
        }
    }
    bindOnSelect(date) {
        if (this.onDateSelect) {
            date.bindEvent('onSelect', this.onDateSelect);
        }
    }
    createDate(date) {
        const dateString = dateToString(date);
        const dateElement = createDateElement(dateString);
        this.bindOnSelect(dateElement);
        let isChecked = this.isCheckedDate(dateString);
        if (isChecked) {
            const canSelect = this.dispatchOnSelect(dateElement, dateString, date);
            if (canSelect !== false)
                dateElement.select();
        }
        return dateElement;
    }
    updateViewList(config = this.config) {
        let lastIndex = null;
        let monthDates = [];
        this.viewList = [];
        let [currentDate, endDate] = getDateRange(config.viewRangeStart, config.viewRangeEnd);
        while (!isSameDate(currentDate, endDate)) {
            const date = this.createDate(currentDate);
            if (lastIndex !== null && lastIndex !== date.month) {
                this.viewList.push(monthDates);
                monthDates = [];
            }
            else {
                monthDates.push(date);
                currentDate = getNextDay(currentDate);
            }
            lastIndex = date.month;
        }
        this.viewList.push(monthDates);
        return Object.create({
            render: () => this.viewList.map(renderMonth)
        });
    }
    updateConfig(config) {
        if (config) {
            Object.assign(this.config, config);
        }
        else {
            const { viewRangeStart, viewRangeEnd, checkedDates, selectMode } = this;
            if (viewRangeStart)
                this.config.viewRangeStart = viewRangeStart;
            if (viewRangeEnd)
                this.config.viewRangeEnd = viewRangeEnd;
            if (checkedDates)
                this.config.checkedDates = checkedDates;
            if (this.selectMode)
                this.config.selectMode = selectMode;
        }
    }
    render() {
        return this.updateViewList().render();
    }
    static get watchers() { return {
        "checkedDates": ["parseCheckedDates"]
    }; }
    static get style() { return ".month{border:1px double;margin-bottom:2px}"; }
}

exports.select_date_range = SelectDateRange;
