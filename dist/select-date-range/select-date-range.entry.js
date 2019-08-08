import { h, r as registerInstance, c as createEvent } from './chunk-20af2f18.js';

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
    const isStringDate = typeof date === 'string';
    const nextDay = isStringDate ? stringToDate(date) : new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    return isStringDate ? dateToString(nextDay) : nextDay;
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
const getDatesBetween = (dateString0, dateString1) => {
    let rangeDates = [];
    let currentDateString = getNextDay(dateString0);
    while (currentDateString !== dateString1) {
        rangeDates.push(currentDateString);
        currentDateString = getNextDay(currentDateString);
    }
    return rangeDates;
};
const parsePropJSON = (prop) => {
    return JSON.parse(prop.replace(/'/g, '"'));
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
};
const [DEFAULT_VIEW_RANGE_START, DEFAULT_VIEW_RANGE_END] = getCurrentMonthRange();
const DEFAULT_CONFIG = {
    selectMode: 'single',
    checkedDates: '',
    viewRangeStart: DEFAULT_VIEW_RANGE_START,
    viewRangeEnd: DEFAULT_VIEW_RANGE_END
};

function renderDate(date) {
    const toggleSelected = () => {
        date.checked ? date.deselect() : date.select();
    };
    return (h("time", { part: "day", class: date.classList(), dateTime: date.dateString() },
        h("label", null,
            date.day,
            h("input", { ref: el => date.el = el, onChange: toggleSelected.bind(this), onMouseDown: () => date.selectRangeStart(), onMouseEnter: () => date.selectRangeEnd(), checked: date.checked, disabled: date.disabled, class: DEFAULT_CLASSES.checkbox, type: "checkbox", value: date.dateString() }))));
}
function renderWeekHeader(weekDays = DEFAULT_WEEK_DAYS) {
    return (h("header", { class: DEFAULT_CLASSES.weekHeader, part: "week-header" }, weekDays.map(({ name, abbr, isWeekend }) => h("abbr", { class: isWeekend && DEFAULT_CLASSES.weekend, title: name }, abbr))));
}
function renderPadStart(offset) {
    if (offset === 0)
        return null;
    const nodes = [];
    let count = 8 - offset;
    while (count) {
        nodes.push(h("span", { class: DEFAULT_CLASSES.empty }));
        count--;
    }
    return nodes;
}
function renderWeek(week, renderHeader = false) {
    return (h("section", { part: "week", class: DEFAULT_CLASSES.week },
        renderHeader && renderWeekHeader(),
        h("section", { class: DEFAULT_CLASSES.weekContent },
            renderPadStart(week[0].dayOfWeek),
            week.map(renderDate))));
}
function renderMonth(month) {
    return (h("section", { part: "month", class: DEFAULT_CLASSES.month },
        h("header", { class: DEFAULT_CLASSES.monthHeader, part: "month-header" }, DEFAULT_MONTHS[month[0].month - 1].name),
        h("section", { class: DEFAULT_CLASSES.monthContent }, monthToWeeks(month).map((week, i) => renderWeek(week, i === 0)))));
}
function renderContainer(dates) {
    return (h("section", { class: "sdr-container", part: "sdr-container" }, dates.map(month => renderMonth(month))));
}

const composeDateOptions = (options) => {
    return Object.assign({ checked: false, disabled: false }, options);
};
const composeDateHelpers = (dateString) => ({
    dateObject() {
        return stringToDate(dateString);
    },
    dateString() {
        return dateString;
    },
    select() {
        this.checked = true;
        this.el && (this.el.checked = true);
        this.events.onDateSelect.emit(this);
    },
    deselect() {
        this.checked = false;
        this.el && (this.el.checked = false);
        this.events.onDateDeselect.emit(this);
    },
    enable() {
        this.disabled = false;
        this.el && (this.el.disabled = false);
    },
    disable() {
        this.disabled = true;
        this.el && (this.el.disabled = true);
    },
    selectRangeStart() {
        // TODO:
    },
    selectRangeEnd() {
        // TODO:
    },
    offset() {
        const date = this.dateObject().getTime();
        const now = new Date().getTime();
        return Math.ceil((date - now) / 86400000);
    },
    classList() {
        const date = this;
        const SEP = ' ';
        const disabled = date.disabled ? SEP + DEFAULT_CLASSES.disabled : '';
        const selected = date.checked ? SEP + DEFAULT_CLASSES.selected : '';
        const today = date.isToday() ? SEP + DEFAULT_CLASSES.today : '';
        return DEFAULT_CLASSES.day + disabled + selected + today;
    },
    bindEvent(event, emitter) { this.events[event] = emitter; }
});
const composeDateTags = () => ({
    isToday() {
        return this.offset() === 0;
    },
    isTomorrow() {
        return this.offset() === 1;
    },
    isYesterday() {
        return this.offset() === -1;
    },
    isPastDate() {
        return this.offset() < 0;
    },
    isFutureDate() {
        return this.offset() > 0;
    }
});
const createdDateElements = {};
const isCreatedDateElement = (dateString) => {
    return (dateString in createdDateElements);
};
const createDateElement = ({ dateString, options, events = {} }) => {
    const [year, month, day] = getDateComponents(dateString);
    const dateOptions = Object.create(Object.assign({ events,
        createdDateElements }, composeDateOptions(options), composeDateHelpers(dateString), composeDateTags()));
    if (isCreatedDateElement(dateString)) {
        const dateElement = createdDateElements[dateString];
        Object.assign(dateElement, dateOptions);
        return dateElement;
    }
    const dayOfWeek = new Date(dateString).getDay();
    const props = { year, month, day, dayOfWeek };
    const dateElement = Object.assign(dateOptions, props);
    Object.defineProperty(createdDateElements, dateString, { value: dateElement });
    return dateElement;
};

class SelectDateRange {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.viewList = [];
        /**
         * Parsed date list...
         */
        this.checkedDatesInput = [];
        this.disabledDatesInput = [];
        this.config = DEFAULT_CONFIG;
        this.dayClassList = DEFAULT_CLASSES.day;
        this.getDateElement = (dateString) => {
            if (dateString in createdDateElements) {
                return createdDateElements[dateString];
            }
            else {
                return null;
            }
        };
        this.selectDate = (dateString) => {
            const dateElement = this.getDateElement(dateString);
            dateElement && dateElement.select();
        };
        this.selectDates = (dateString) => {
            if (this.config.selectMode === 'range') {
                const datesRange = getDatesBetween(dateString[0], dateString[1]);
                [dateString[0], ...datesRange, dateString[1]].forEach(this.selectDate);
            }
            else {
                dateString.forEach(this.selectDate);
            }
        };
        this.disableDates = (dateString) => {
            dateString.forEach(dateStr => {
                const dateElement = this.getDateElement(dateStr);
                dateElement && dateElement.disable();
            });
        };
        this.isSelectedDate = (dateString) => {
            this.getDateElement(dateString).checked;
        };
        this.createDate = (date) => {
            const dateString = dateToString(date);
            return createDateElement({
                dateString,
                events: this.events
            });
        };
        this.onDateSelect = createEvent(this, "onDateSelect", 7);
        this.onDateDeselect = createEvent(this, "onDateDeselect", 7);
    }
    get events() {
        return {
            onDateSelect: this.onDateSelect,
            onDateDeselect: this.onDateDeselect
        };
    }
    parseCheckedDates(dates) {
        if (typeof dates === 'string') {
            dates = parsePropJSON(dates);
        }
        this.selectDates(dates);
        this.checkedDatesInput = dates || [];
    }
    parseDisabledDates(dates) {
        if (typeof dates === 'string') {
            dates = parsePropJSON(dates);
        }
        this.disableDates(dates);
        this.disabledDatesInput = dates || [];
    }
    componentWillLoad() {
        this.parseCheckedDates(this.checkedDates);
        this.parseDisabledDates(this.disabledDates);
        this.updateConfig();
    }
    clearSelected() {
        this.checkedDatesInput.forEach(dateString => {
            const dateElement = this.getDateElement(dateString);
            dateElement && dateElement.deselect();
        });
        if (this.config.selectMode === 'range') {
            const [start, end] = this.checkedDatesInput;
            let dates = getDatesBetween(start, end);
            dates.forEach(dateString => {
                const dateElement = this.getDateElement(dateString);
                dateElement && dateElement.deselect();
            });
        }
        this.checkedDatesInput = [];
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
        this.selectDates(this.checkedDatesInput);
        this.disableDates(this.disabledDatesInput);
        this.viewList.push(monthDates);
        return Object.create({
            render: () => renderContainer(this.viewList)
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
    loadStylesheet() {
        return this.stylesheetUrl ? h("link", { rel: "stylesheet", type: "text/css", href: this.stylesheetUrl }) : null;
    }
    render() {
        return [
            this.loadStylesheet(),
            this.updateViewList().render()
        ];
    }
    static get watchers() { return {
        "checkedDates": ["parseCheckedDates"],
        "disabledDates": ["parseDisabledDates"]
    }; }
    static get style() { return ".sdr-container {\n    font-family: monospace;\n}\n\n.month {\n    border: 1px solid #ccc;\n    padding: 20px;\n}\n\n.month-header {\n    text-transform: uppercase;\n    font-weight: bold;\n    margin-bottom: 5px;\n}\n\n.week {\n    \n}\n\n.week-header {\n    display: -ms-flexbox;\n    display: flex;\n}\n\n.week-header abbr {\n    -ms-flex-positive: 1;\n    flex-grow: 1;\n    text-align: center;\n}\n\n.week-content {\n    display: -ms-flexbox;\n    display: flex;\n}\n\n.week-content > .day, .week-content > .empty {\n    -ms-flex-positive: 1;\n    flex-grow: 1;\n    -ms-flex-preferred-size: 80px;\n    flex-basis: 80px;\n    text-align: center;\n}\n\n.day {\n\n}\n\n.day.disabled {\n    background-color: #ccc;\n}\n\n.day.selected {\n    background-color: gold;\n}\n\n.day.today {\n    background-color: #e45;\n}\n\n.checkbox {}"; }
}

export { SelectDateRange as select_date_range };
