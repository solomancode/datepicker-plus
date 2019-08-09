import { h, r as registerInstance, c as createEvent } from './chunk-c8f9ca54.js';

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
const DEFAULT_CONFIG = {
    selectMode: 'range',
    selected: [],
    disabled: [],
    viewRange: getCurrentMonthRange()
};

function renderDate(date) {
    const toggleSelected = () => {
        date.checked ? date.deselect() : date.select();
    };
    return (h("time", { part: "day", class: date.classList(), dateTime: date.dateString() },
        h("label", null,
            date.day,
            h("input", { ref: el => date.el = el, onChange: toggleSelected.bind(this), checked: date.checked, disabled: date.disabled, class: DEFAULT_CLASSES.checkbox, type: "checkbox", value: date.dateString() }))));
}
function renderWeekHeader(weekDays = DEFAULT_WEEK_DAYS) {
    return (h("header", { class: DEFAULT_CLASSES.weekHeader, part: "week-header" }, weekDays.map(({ name, abbr, isWeekend }) => h("abbr", { class: isWeekend && DEFAULT_CLASSES.weekend, title: name }, abbr))));
}
function renderEmpty(offset) {
    const nodes = [];
    while (offset) {
        nodes.push(h("span", { class: DEFAULT_CLASSES.empty }));
        offset--;
    }
    return nodes;
}
function renderWeek(week, renderHeader = false) {
    return (h("section", { part: "week", class: DEFAULT_CLASSES.week },
        renderHeader && renderWeekHeader(),
        h("section", { class: DEFAULT_CLASSES.weekContent },
            renderEmpty(week[0].dayOfWeek),
            week.map(renderDate),
            renderEmpty(6 - week[week.length - 1].dayOfWeek))));
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
    updateDateClassList() {
        if (this.el) {
            this.el.parentElement.parentElement.setAttribute('class', this.classList());
        }
    },
    select() {
        this.checked = true;
        if (this.el) {
            this.el.checked = true;
        }
        this.events.onDateSelect.emit(this);
        this.updateDateClassList();
    },
    deselect() {
        this.checked = false;
        this.el && (this.el.checked = false);
        this.events.onDateDeselect.emit(this);
        this.updateDateClassList();
    },
    enable() {
        this.disabled = false;
        this.el && (this.el.disabled = false);
        this.updateDateClassList();
    },
    disable() {
        this.disabled = true;
        this.el && (this.el.disabled = true);
        this.updateDateClassList();
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
        const classList = DEFAULT_CLASSES.day + disabled + selected + today;
        return classList;
    }
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
function createDateElement({ dateString, options, events = {} }) {
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
}

class SelectDateRange {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.plusConfig = DEFAULT_CONFIG;
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
            if (this.plusConfig.selectMode === 'range') {
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
            debugger;
            const dateElement = createDateElement({
                dateString,
                events: this.events
            });
            return dateElement;
        };
        this.onDateSelect = createEvent(this, "onDateSelect", 7);
        this.onDateDeselect = createEvent(this, "onDateDeselect", 7);
    }
    parseConfig() {
        // TODO: handle config update
    }
    get events() {
        return {
            onDateSelect: this.onDateSelect,
            onDateDeselect: this.onDateDeselect
        };
    }
    componentWillLoad() {
        this.plusConfig = Object.assign({}, DEFAULT_CONFIG, this.plusConfig);
    }
    clearSelected() {
        this.plusConfig.selected.forEach(dateString => {
            const dateElement = this.getDateElement(dateString);
            dateElement && dateElement.deselect();
        });
        if (this.plusConfig.selectMode === 'range') {
            const [start, end] = this.plusConfig.selected;
            let dates = getDatesBetween(start, end);
            dates.forEach(dateString => {
                const dateElement = this.getDateElement(dateString);
                dateElement && dateElement.deselect();
            });
        }
        this.plusConfig.selected = [];
    }
    updateViewOptions() {
        this.selectDates(this.plusConfig.selected);
        this.disableDates(this.plusConfig.disabled);
    }
    updateViewList(config = this.plusConfig) {
        let lastIndex = null;
        let monthDates = [];
        const viewList = [];
        let [currentDate, endDate] = config.viewRange.map(stringToDate);
        let stopDate = getNextDay(endDate);
        while (!isSameDate(currentDate, stopDate)) {
            const date = this.createDate(currentDate);
            if (lastIndex !== null && lastIndex !== date.month) {
                viewList.push(monthDates);
                monthDates = [];
            }
            else {
                monthDates.push(date);
                currentDate = getNextDay(currentDate);
            }
            lastIndex = date.month;
        }
        viewList.push(monthDates);
        this.updateViewOptions();
        return Object.create({
            render: () => renderContainer(viewList)
        });
    }
    updateConfig(config) {
        if (config)
            Object.assign(this.plusConfig, config);
    }
    loadStylesheet() {
        const { stylesheetUrl } = this.plusConfig;
        return stylesheetUrl ? h("link", { rel: "stylesheet", type: "text/css", href: stylesheetUrl }) : null;
    }
    render() {
        return [
            this.loadStylesheet(),
            this.updateViewList().render()
        ];
    }
    static get watchers() { return {
        "plusConfig": ["parseConfig"]
    }; }
    static get style() { return ".sdr-container {\n    font-family: monospace;\n}\n\n.month {\n    border: 1px solid #ccc;\n    padding: 20px;\n}\n\n.month-header {\n    text-transform: uppercase;\n    font-weight: bold;\n    margin-bottom: 5px;\n}\n\n.week {\n    \n}\n\n.week-header {\n    display: -ms-flexbox;\n    display: flex;\n}\n\n.week-header abbr {\n    -ms-flex-positive: 1;\n    flex-grow: 1;\n    text-align: center;\n}\n\n.week-content {\n    display: -ms-flexbox;\n    display: flex;\n}\n\n.week-content > .day, .week-content > .empty {\n    -ms-flex-positive: 1;\n    flex-grow: 1;\n    -ms-flex-preferred-size: 80px;\n    flex-basis: 80px;\n    text-align: center;\n}\n\n.day {\n\n}\n\n.day.disabled {\n    background-color: #ccc;\n}\n\n.day.selected {\n    background-color: gold;\n}\n\n.day.today {\n    background-color: #e45;\n}\n\n.checkbox {}"; }
}

export { SelectDateRange as datepicker_plus };
