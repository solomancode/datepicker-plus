'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const __chunk_1 = require('./chunk-a0b8771d.js');

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
const getCurrentMonthRange = () => {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return [dateToString(firstDay), dateToString(lastDay)];
};
const unfoldRange = (dateString0, dateString1) => {
    if (dateString0 === dateString1)
        return [];
    const [start, end] = sortDates([dateString0, dateString1]);
    let rangeDates = [];
    let currentDateString = getNextDay(start);
    while (currentDateString !== end) {
        if (rangeDates.length > 3000)
            openGithubIssue({ title: 'Memory leak @ getDatesBetween', label: 'bug', body: JSON.stringify({ dateString0, dateString1 }, null, 2) });
        rangeDates.push(currentDateString);
        currentDateString = getNextDay(currentDateString);
    }
    return [start, ...rangeDates, end];
};
const sortDates = ([dateString0, dateString1]) => {
    const dt0 = stringToDate(dateString0);
    const dt1 = stringToDate(dateString1);
    return (dt0.valueOf() - dt1.valueOf()) > 0 ? [dateString1, dateString0] : [dateString0, dateString1];
};
const dateOffset = (date0, date1) => {
    return Math.ceil((date0.getTime() - date1.getTime()) / 86400000);
};
const patchArray = (target = [], source) => {
    return source.map((itm, i) => target[i] || itm);
};
const groupByMonth = (dateString) => {
    const map = Object.create({
        flatten() {
            const flat = [];
            for (let index = 1; index <= 12; index++) {
                if (index in this)
                    flat.push(map[index]);
            }
            return flat;
        }
    });
    dateString.forEach(dateString => {
        const [, month] = getDateComponents(dateString);
        if (month in map) {
            map[month].push(dateString);
        }
        else {
            map[month] = [dateString];
        }
    });
    return map;
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
const generateDateClass = (dateElement) => {
    let tags = Object.keys(dateElement.tags);
    const classes = [
        DEFAULT_CLASSES.day,
        dateElement.checked ? DEFAULT_CLASSES.selected : null,
        dateElement.disabled ? DEFAULT_CLASSES.disabled : null,
        ...tags.filter(tag => dateElement.tags[tag] === true)
    ];
    return classes.filter(c => c).join(' ');
};
const openGithubIssue = ({ title, body, label }) => {
    const tl = 'title=' + encodeURIComponent(title);
    const lb = 'labels=' + encodeURIComponent(label);
    const bd = 'body=' + encodeURIComponent(body);
    throw ("Stopped to prevent memory leak.\n\n🐞 Create a new issue:\n" +
        `https://github.com/solomancode/datepicker-plus/issues/new?${lb}&${tl}&${bd}`);
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
    year: 'year',
    disabled: 'disabled',
    selected: 'selected',
    month: 'month',
    monthName: 'month-name',
    monthHeader: 'month-header',
    monthContent: 'month-content',
    week: 'week',
    empty: 'empty',
    weekHeader: 'week-header',
    weekContent: 'week-content',
    weekend: 'weekend',
    checkbox: 'checkbox',
    singleHeader: 'single-header',
    highlight: 'highlight'
};
const DEFAULT_CONFIG = {
    selectMode: 'range',
    selected: [],
    disabled: [],
    selectScope: 0,
    weekHeader: 'per-month',
    viewRange: getCurrentMonthRange(),
    i18n: {
        months: DEFAULT_MONTHS,
        weekDays: DEFAULT_WEEK_DAYS
    }
};

function registerDate(created, dateString) {
    const dayOfWeek = new Date(dateString).getDay();
    const [year, month, day] = getDateComponents(dateString);
    const dateElement = Object.create({
        tags: {},
        checked: false,
        disabled: false,
        year,
        month,
        day,
        dateString,
        dayOfWeek
    });
    if (dateString in created)
        return created;
    return Object.assign({}, created, { [dateString]: dateElement });
}

function renderDate(date) {
    const onChange = (e) => {
        return e.target.checked ? this.select(date.dateString) : this.deselect(date.dateString);
    };
    return (__chunk_1.h("time", { part: "day", class: generateDateClass(date), dateTime: date.dateString },
        __chunk_1.h("label", null,
            date.day,
            __chunk_1.h("input", { checked: date.checked, disabled: date.disabled, onChange: onChange.bind(this), class: DEFAULT_CLASSES.checkbox, type: "checkbox", value: date.dateString }))));
}
function renderWeekHeader(weekDays) {
    return (__chunk_1.h("header", { class: DEFAULT_CLASSES.weekHeader, part: "week-header" }, weekDays.map(({ name, abbr, isWeekend }) => __chunk_1.h("abbr", { class: isWeekend && DEFAULT_CLASSES.weekend, title: name }, abbr))));
}
function renderEmpty(offset) {
    const nodes = [];
    while (offset) {
        nodes.push(__chunk_1.h("span", { class: DEFAULT_CLASSES.empty }));
        offset--;
    }
    return nodes;
}
function renderWeek(week, renderHeader, weekDays) {
    return (__chunk_1.h("section", { part: "week", class: DEFAULT_CLASSES.week },
        renderHeader && renderWeekHeader(weekDays),
        __chunk_1.h("section", { class: DEFAULT_CLASSES.weekContent },
            renderEmpty(week[0].dayOfWeek),
            week.map(renderDate.bind(this)),
            renderEmpty(6 - week[week.length - 1].dayOfWeek))));
}
function renderMonthHeader(dayFirst, months) {
    return (__chunk_1.h("header", { class: DEFAULT_CLASSES.monthHeader, part: "month-header" },
        __chunk_1.h("span", { class: DEFAULT_CLASSES.monthName }, months[dayFirst.month - 1].name),
        dayFirst.month - 1 === 0 && __chunk_1.h("span", { class: DEFAULT_CLASSES.year }, dayFirst.year)));
}
function renderMonth(month, config) {
    const renderHeader = (i) => config.weekHeader === 'per-month' && i === 0;
    return (__chunk_1.h("section", { part: "month", class: DEFAULT_CLASSES.month },
        renderMonthHeader(month[0], config.i18n.months),
        __chunk_1.h("section", { class: DEFAULT_CLASSES.monthContent }, monthToWeeks(month).map((week, i) => renderWeek.call(this, week, renderHeader(i), config.i18n.weekDays)))));
}
function renderContainer(dates, config) {
    const renderSingleHeader = () => config.weekHeader === 'single' && __chunk_1.h("header", { class: DEFAULT_CLASSES.singleHeader }, renderWeekHeader(config.i18n.weekDays));
    return ([
        // theme stylesheet
        config.stylesheetUrl ? __chunk_1.h("link", { rel: "stylesheet", type: "text/css", href: config.stylesheetUrl }) : null,
        // contents
        __chunk_1.h("section", { class: "dpp-container", part: "dpp-container" }, [
            renderSingleHeader() || null,
            dates.map((month) => renderMonth.call(this, month, config))
        ])
    ]);
}

const offsetFromToday = (dateString) => dateOffset(new Date(dateString), new Date());
const today = (dateElement) => {
    const isToday = offsetFromToday(dateElement.dateString) === 0;
    return isToday;
};
const tomorrow = (dateElement) => offsetFromToday(dateElement.dateString) === 1;
const yesterday = (dateElement) => offsetFromToday(dateElement.dateString) === -1;
const past = (dateElement) => offsetFromToday(dateElement.dateString) < 0;
const future = (dateElement) => offsetFromToday(dateElement.dateString) > 0;
/**
 * Range start date
 */
const rangeStart = (dateElement) => {
    const rangeStart = dateElement.rangeIndex === 0;
    return rangeStart;
};
/**
 * Range end date
 */
const rangeEnd = (dateElement) => {
    const { rangeIndex, rangeEndIndex } = dateElement;
    return (rangeEndIndex > 0 && rangeIndex === rangeEndIndex);
};
/**
 * A connector is a date between date start and date end
 * in a range select mode.
 */
const connector = (dateElement) => {
    const isConnector = dateElement.rangeIndex > 0 && (dateElement.rangeEndIndex !== dateElement.rangeIndex);
    return isConnector;
};
const tags = {
    today,
    rangeStart,
    rangeEnd,
    connector,
    tomorrow,
    yesterday,
    past,
    future
};

class DatepickerPlus {
    constructor(hostRef) {
        __chunk_1.registerInstance(this, hostRef);
        this.plusConfig = DEFAULT_CONFIG;
        this.registered = {
        /** LOOKUP ELEMENTS */
        };
        this.viewElements = [];
        this.selected = [
        /** SELECTED */
        ];
        this.disabled = [
        /** DISABLED */
        ];
        this.viewList = [];
        this.patchConfigLists = () => {
            const { months: default_months, weekDays: default_weekDays } = DEFAULT_CONFIG.i18n;
            const { months, weekDays } = this.plusConfig.i18n;
            this.plusConfig.i18n.months = patchArray(months, default_months);
            this.plusConfig.i18n.weekDays = patchArray(weekDays, default_weekDays);
        };
        // mutable(this.selected, this.disabled, this.viewElements)
        this.select = (dateString) => {
            const { selectMode } = this.plusConfig;
            let selectList = [];
            if (selectMode === 'single') {
                selectList = [dateString];
            }
            else if (selectMode === 'multiple') {
                selectList = [...this.selected, dateString];
            }
            else if (selectMode === 'range') {
                if (this.selected.length === 1) {
                    selectList = unfoldRange(this.selected[0], dateString);
                }
                else {
                    selectList = [dateString];
                }
            }
            const hasDisabled = this.checkIfHasDisabled(selectList, this.disabled);
            if (hasDisabled)
                return this.viewElements;
            const selectedViewElements = this.selectMultipleDates(selectList, this.viewElements);
            this.viewElements = this.updateTags(tags, selectedViewElements);
            this.selected = selectList;
            this.onDateSelect.emit(this.selected);
            if (selectMode === 'range' && this.selected.length > 1)
                this.onRangeSelect.emit(this.selected);
        };
        // mutable(this.selected)
        this.deselect = (dateString) => {
            const { selectMode } = this.plusConfig;
            let selectList = [];
            if (selectMode === 'multiple') {
                selectList = this.selected.filter(s => s !== dateString);
            }
            this.viewElements = this.selectMultipleDates(selectList, this.viewElements);
            this.selected = selectList;
        };
        this.unfoldTag = (tag, tags) => {
            if (!(tag in tags))
                return [tag];
            return this.viewElements.map((month) => month.filter(dateElement => dateElement.tags[tag] === true)).reduce((p, n) => [...p, ...n]).map(dateElement => dateElement.dateString);
        };
        this.onDateSelect = __chunk_1.createEvent(this, "onDateSelect", 7);
        this.onDateDeselect = __chunk_1.createEvent(this, "onDateDeselect", 7);
        this.onRangeSelect = __chunk_1.createEvent(this, "onRangeSelect", 7);
    }
    updateViewElements(next) {
        this.registerViewDates(next);
        this.viewElements = next.map(month => month.map(dateString => {
            return this.registered[dateString];
        }));
    }
    componentWillLoad() {
        this.plusConfig = Object.assign({}, DEFAULT_CONFIG, this.plusConfig);
        this.patchConfigLists();
        this.viewList = this.createViewList(this.plusConfig.viewRange);
        this.viewElements = this.updateTags(tags, this.viewElements);
        this.plusConfig.disabled = this.plusConfig.disabled.map(tag => this.unfoldTag(tag, tags)).reduce((p, n) => [...p, ...n]);
        this.viewElements = this.disableMultipleDates(this.plusConfig.disabled, this.viewElements);
        this.plusConfig.selected.forEach(this.select);
    }
    createViewList([start, end]) {
        const dates = unfoldRange(start, end);
        return groupByMonth(dates).flatten();
    }
    registerViewDates(viewList) {
        return viewList.forEach(month => month.forEach(dateString => {
            const registered = registerDate(this.registered, dateString);
            this.registered = registered;
        }));
    }
    checkIfHasDisabled(selected, disabled) {
        const map = {};
        disabled.forEach(d => map[d] = true);
        return selected.some(s => (s in map));
    }
    selectMultipleDates(dateStringList, viewElements) {
        return viewElements.map(month => month.map((dateElement) => {
            dateElement.checked = dateStringList.includes(dateElement.dateString);
            dateElement.rangeIndex = dateElement.checked ? dateStringList.indexOf(dateElement.dateString) : null;
            dateElement.rangeEndIndex = dateElement.checked ? dateStringList.length - 1 : null;
            return dateElement;
        }));
    }
    // mutable(this.disabled)
    disableMultipleDates(dateStringList, viewElements) {
        let disabled = [];
        const withDisabled = viewElements.map(month => month.map(dateElement => {
            const isDisabled = dateStringList.includes(dateElement.dateString);
            dateElement.disabled = isDisabled;
            if (isDisabled)
                disabled.push(dateElement.dateString);
            return dateElement;
        }));
        this.disabled = disabled;
        return withDisabled;
    }
    updateTags(tags, viewElements) {
        console.count('TAG UPDATE --------------------------------');
        return viewElements.map(month => month.map((dateElement) => {
            for (const tag in tags) {
                dateElement.tags[tag] = tags[tag](dateElement);
            }
            return dateElement;
        }));
    }
    render() {
        console.count('🎨 RENDER ');
        return renderContainer.call(this, this.viewElements, this.plusConfig);
    }
    static get watchers() { return {
        "viewList": ["updateViewElements"]
    }; }
    static get style() { return ".dpp-container{font-family:monospace}.month{border:1px solid #ccc;padding:20px}.month-header{text-transform:uppercase;font-weight:700;margin-bottom:5px}.day.selected.rangeStart{background-color:#cddc39}.day.selected.rangeEnd{background-color:#ff9800}.week-header{display:-ms-flexbox;display:flex}.single-header{padding:5px 20px}.week-header abbr{-ms-flex-positive:1;flex-grow:1;text-align:center}.week-content{display:-ms-flexbox;display:flex}.week-content>.day,.week-content>.empty{-ms-flex-positive:1;flex-grow:1;-ms-flex-preferred-size:80px;flex-basis:80px;text-align:center}.day{position:relative;line-height:30px}.day>label{display:block;width:100%;height:100%;cursor:pointer;-webkit-box-sizing:border-box;box-sizing:border-box}.day.disabled{color:#ccc;background-color:#f8f8f8}.day.selected{background-color:gold}.day.highlight{background-color:#7e5}.day.today{outline:1px solid #ccc}.checkbox{display:none}.month-header{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between}"; }
}

exports.datepicker_plus = DatepickerPlus;
