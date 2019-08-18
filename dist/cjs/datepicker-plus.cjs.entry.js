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
const getCurrentMonthRange = () => {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return [dateToString(firstDay), dateToString(lastDay)];
};
const getDatesBetween = (dateString0, dateString1) => {
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
    return rangeDates;
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

const DatepickerPlusDate = ({ date }) => {
    const onChange = (e) => {
        const dateString = date.dateString();
        const { select, deselect } = date.datepickerPlus;
        if (e.target.checked) {
            date.datepickerPlus.activateSelectScope(date);
            select(dateString);
        }
        else {
            date.datepickerPlus.deactivateSelectScope();
            deselect(dateString);
        }
        date.datepickerPlus.highlighted = 'rangeSelect';
    };
    const onEnter = () => date.datepickerPlus.highlighted = date.dateString();
    const onLeave = () => date.datepickerPlus.highlighted = null;
    return (__chunk_1.h("time", { part: "day", class: date.classListString, dateTime: date.dateString() },
        __chunk_1.h("label", { onMouseEnter: onEnter.bind(undefined), onMouseLeave: onLeave.bind(undefined) },
            date.day,
            __chunk_1.h("input", { ref: el => date.el = el, onChange: (e) => onChange(e), checked: date.checked, disabled: date.disabled, class: DEFAULT_CLASSES.checkbox, type: "checkbox", value: date.dateString() }))));
};

function renderDate(date) {
    return __chunk_1.h(DatepickerPlusDate, { date: date });
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
            week.map(renderDate),
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
        __chunk_1.h("section", { class: DEFAULT_CLASSES.monthContent }, monthToWeeks(month).map((week, i) => renderWeek(week, renderHeader(i), config.i18n.weekDays)))));
}
function renderContainer(dates, config) {
    const renderSingleHeader = () => config.weekHeader === 'single' && __chunk_1.h("header", { class: DEFAULT_CLASSES.singleHeader }, renderWeekHeader(config.i18n.weekDays));
    return ([
        // theme stylesheet
        config.stylesheetUrl ? __chunk_1.h("link", { rel: "stylesheet", type: "text/css", href: config.stylesheetUrl }) : null,
        // contents
        __chunk_1.h("section", { class: "dpp-container", part: "dpp-container" }, [
            renderSingleHeader() || null,
            dates.map((month) => renderMonth(month, config))
        ])
    ]);
}

const DYNAMIC_CLASSES = {
    today: 'today',
    rangeStart: 'range-start',
    rangeEnd: 'range-end',
    connector: 'connector'
};
const today = (dateElement, setClass) => {
    const isToday = dateElement.offset() === 0;
    if (isToday)
        setClass(DYNAMIC_CLASSES.today);
    return isToday;
};
const tomorrow = (dateElement) => dateElement.offset() === 1;
const yesterday = (dateElement) => dateElement.offset() === -1;
const past = (dateElement) => dateElement.offset() < 0;
const future = (dateElement) => dateElement.offset() > 0;
/**
 * Range start date
 */
const rangeStart = (dateElement, setClass) => {
    const rangeStart = dateElement.rangeIndex === 0;
    if (rangeStart)
        setClass(DYNAMIC_CLASSES.rangeStart);
    return rangeStart;
};
/**
 * Range end date
 */
const rangeEnd = (dateElement, setClass) => {
    if (dateElement.rangeEnd)
        setClass(DYNAMIC_CLASSES.rangeEnd);
    return dateElement.rangeEnd;
};
/**
 * A connector is a date between date start and date end
 * in a range select mode.
 */
const connector = (dateElement, setClass) => {
    const isConnector = dateElement.rangeIndex > 0 && (!dateElement.rangeEnd);
    if (isConnector)
        setClass(DYNAMIC_CLASSES.connector);
    return isConnector;
};

const tags = /*#__PURE__*/Object.freeze({
    today: today,
    tomorrow: tomorrow,
    yesterday: yesterday,
    past: past,
    future: future,
    rangeStart: rangeStart,
    rangeEnd: rangeEnd,
    connector: connector
});

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
    offset() {
        const date = this.dateObject();
        const now = new Date();
        return dateOffset(date, now);
    }
});
const composeDateClassList = () => ({
    classListString: DEFAULT_CLASSES.day,
    updateClassListString() {
        const date = this;
        const classList = [
            DEFAULT_CLASSES.day,
            date.highlight && DEFAULT_CLASSES.highlight,
            date.disabled && DEFAULT_CLASSES.disabled,
            date.checked && DEFAULT_CLASSES.selected
        ];
        for (const tag in tags) {
            const assertion = tags[tag];
            assertion(date, (c) => classList.push(c)) && Object.defineProperty(date.tags, tag, { value: true });
        }
        const classListString = classList.filter(c => c).join(' ');
        date.el && date.el.parentElement.parentElement.setAttribute('class', classListString);
        return this.classListString = classListString;
    }
});
const createdDateElements = {
/**
 * CREATED DATE ELEMENTS...
 */
};
function createDateElement({ dateString, options, datepickerPlus }) {
    const [year, month, day] = getDateComponents(dateString);
    const dateOptions = Object.create(Object.assign({ tags: {}, datepickerPlus,
        createdDateElements }, composeDateOptions(options), composeDateHelpers(dateString), composeDateClassList()));
    if (dateString in createdDateElements) {
        const dateElement = createdDateElements[dateString];
        Object.assign(dateElement, dateOptions);
        return dateElement;
    }
    const dayOfWeek = new Date(dateString).getDay();
    const props = { year, month, day, dayOfWeek };
    const dateElement = Object.assign(dateOptions, props);
    dateElement.updateClassListString();
    Object.defineProperty(createdDateElements, dateString, { value: dateElement });
    return dateElement;
}

class DatepickerPlus {
    constructor(hostRef) {
        __chunk_1.registerInstance(this, hostRef);
        this.plusConfig = DEFAULT_CONFIG;
        this.selected = [];
        this.disabled = [];
        this.rangeStart = null;
        /**
         * Backup disabled before scoping...
         */
        this._disabled = [];
        this.setHighlight = (dateString, highlight) => {
            const dateElement = this.getDateElement(dateString);
            if (dateElement && !dateElement.disabled)
                dateElement.highlight = highlight;
            dateElement.updateClassListString();
        };
        this.unfoldTag = (tag) => {
            if (!(tag in tags))
                return [tag];
            return this.viewList.map((month) => month.filter(dateElement => (tag in dateElement.tags))).reduce((p, n) => [...p, ...n]).map(el => el.dateString());
        };
        this.addRangeMark = (dateString) => {
            if (this.rangeStart === null) {
                this.rangeStart = dateString;
                this.selected = [dateString];
                this.onDateSelect.emit(this.getDateElement(dateString));
            }
            else if (this.rangeStart !== dateString) {
                const start = this.rangeStart;
                const end = dateString;
                const inBetween = getDatesBetween(start, end);
                // TODO: inBetween +class 'connector'
                const fullRange = [start, ...inBetween, end];
                let hasDisabled = fullRange.some((dt) => {
                    const dateElement = this.getDateElement(dt);
                    if (dateElement && dateElement.disabled)
                        return true;
                });
                if (hasDisabled) {
                    this.rangeStart = end;
                    this.selected = [end];
                    this.onDateSelect.emit(this.getDateElement(end));
                }
                else {
                    this.rangeStart = null;
                    this.selected = fullRange;
                    this.onRangeSelect.emit(fullRange);
                }
            }
        };
        this.activateSelectScope = (dateElement) => {
            const selectedDate = dateElement.dateObject();
            const scope = this.plusConfig.selectScope;
            if (scope > 0 && !this.rangeStart) {
                this._disabled = this.plusConfig.disabled;
                const locked = this.viewList.reduce((p, n) => [...p, ...n]).map(dateElement => {
                    const offset = dateOffset(selectedDate, dateElement.dateObject());
                    return Math.abs(offset) > scope ? dateElement.dateString() : false;
                }).filter(d => d);
                this.disabled = locked;
            }
        };
        this.deactivateSelectScope = () => {
            this.disabled = this._disabled;
        };
        this.resetRangeMarks = () => {
            this.rangeStart = null;
            this.selected = [];
        };
        this.select = (dateString) => {
            const dateElement = this.getDateElement(dateString);
            if (dateElement) {
                switch (this.plusConfig.selectMode) {
                    case 'single':
                        this.selected = [dateString];
                        this.onDateSelect.emit(dateElement);
                        break;
                    case 'multiple':
                        this.selected = [...this.selected, dateString];
                        this.onDateSelect.emit(dateElement);
                        break;
                    case 'range':
                        this.addRangeMark(dateString);
                        break;
                }
            }
        };
        this.deselect = (dateString) => {
            const dateElement = this.getDateElement(dateString);
            if (dateElement) {
                if (this.plusConfig.selectMode === 'range') {
                    this.resetRangeMarks();
                }
                else {
                    this.selected = this.selected.filter(dt => dt !== dateString);
                }
                this.onDateDeselect.emit(dateElement);
            }
        };
        this.patchConfigLists = () => {
            const { months: default_months, weekDays: default_weekDays } = DEFAULT_CONFIG.i18n;
            const { months, weekDays } = this.plusConfig.i18n;
            this.plusConfig.i18n.months = patchArray(months, default_months);
            this.plusConfig.i18n.weekDays = patchArray(weekDays, default_weekDays);
        };
        this.unfoldSelected = (selected, selectMode) => {
            if (!selected.length)
                return [];
            let unfolded = selected.map(this.unfoldTag).reduce((p, n) => [...p, ...n]);
            return selectMode === 'range' ? [unfolded[0], unfolded[unfolded.length - 1]] : unfolded;
        };
        this.getDateElement = (dateString) => {
            if (dateString in createdDateElements) {
                return createdDateElements[dateString];
            }
            else {
                return null;
            }
        };
        this.MemProtect = 0;
        this.createDate = (date) => {
            const dateString = dateToString(date);
            const dateElement = createDateElement({
                dateString,
                datepickerPlus: this
            });
            return dateElement;
        };
        this.onDateSelect = __chunk_1.createEvent(this, "onDateSelect", 7);
        this.onDateDeselect = __chunk_1.createEvent(this, "onDateDeselect", 7);
        this.onRangeSelect = __chunk_1.createEvent(this, "onRangeSelect", 7);
    }
    highlight(next, current) {
        if (current === 'rangeSelect')
            return;
        const target = next === null ? current : next;
        let start = this.rangeStart;
        if (next === 'rangeSelect') {
            this.selected.length && this.selected.forEach(dateString => this.setHighlight(dateString, false));
        }
        else if (start) {
            [start, ...getDatesBetween(start, target), target]
                .forEach(dateString => this.setHighlight(dateString, next !== null));
        }
    }
    parseSelected(next, current) {
        const rangeMode = this.plusConfig.selectMode === 'range';
        const currentLastIndex = current.length - 1;
        const nextLastIndex = next.length - 1;
        // DESELECT CURRENT
        current.forEach((dateString, index) => {
            const rangeEnd = index === currentLastIndex ? { rangeEnd: null } : {};
            this.updateDateOptions(dateString, Object.assign({ checked: false }, (rangeMode ? Object.assign({ rangeIndex: null }, rangeEnd) : {})));
        });
        const isReversed = dateOffset(new Date(next[0]), new Date(next[next.length - 1])) > 0;
        // SELECT NEXT
        next.forEach((dateString, index) => {
            const chronoIndex = isReversed ? (next.length - index) - 1 : index;
            const rangeEnd = chronoIndex === nextLastIndex && nextLastIndex !== 0 ? { rangeEnd: true } : {};
            this.updateDateOptions(dateString, Object.assign({ checked: true }, (rangeMode ? Object.assign({ rangeIndex: chronoIndex }, rangeEnd) : {})));
        });
    }
    parseDisabled(next, current) {
        // ENABLE CURRENT
        current.forEach(dateString => this.updateDateOptions(dateString, { disabled: false }));
        // DISABLE NEXT
        next = next.length ? next.map(tag => this.unfoldTag(tag)).reduce((p, n) => [...p, ...n]) : [];
        next.forEach(dateString => this.updateDateOptions(dateString, { disabled: true }));
    }
    updateDateOptions(dateString, options) {
        const dateElement = this.getDateElement(dateString);
        if (dateElement) {
            Object.assign(dateElement, options);
            dateElement.updateClassListString();
        }
    }
    updateConfig(config) {
        this.parseViewRange(config.viewRange);
        this.unfoldSelected(config.selected, config.selectMode).forEach(this.select);
        this.disabled = this.plusConfig.disabled;
        this._disabled = this.plusConfig.disabled;
    }
    componentWillLoad() {
        this.plusConfig = Object.assign({}, DEFAULT_CONFIG, this.plusConfig);
        this.patchConfigLists();
    }
    protectMemLeak() {
        this.MemProtect++;
        if (this.MemProtect > 3000) {
            const now = '#### ' + new Date().toDateString();
            const CB = '\`\`\`';
            const config = JSON.stringify(this.plusConfig, null, 2);
            const body = now + '\n' + CB + config + CB;
            openGithubIssue({
                title: 'Memory leak @ render while loop',
                body,
                label: 'bug'
            });
        }
    }
    parseViewRange(viewRange) {
        let lastIndex = null;
        let monthDates = [];
        const viewList = [];
        let [currentDate, endDate] = viewRange.map(stringToDate);
        let stopDate = getNextDay(endDate);
        while (!isSameDate(currentDate, stopDate)) {
            this.protectMemLeak();
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
        this.viewList = viewList;
        this.MemProtect = 0;
    }
    render() {
        console.count('RENDER:');
        return renderContainer(this.viewList, this.plusConfig);
    }
    static get watchers() { return {
        "highlighted": ["highlight"],
        "selected": ["parseSelected"],
        "disabled": ["parseDisabled"],
        "plusConfig": ["updateConfig"]
    }; }
    static get style() { return ".dpp-container{font-family:monospace}.month{border:1px solid #ccc;padding:20px}.month-header{text-transform:uppercase;font-weight:700;margin-bottom:5px}.week-header{display:-ms-flexbox;display:flex}.single-header{padding:5px 20px}.week-header abbr{-ms-flex-positive:1;flex-grow:1;text-align:center}.week-content{display:-ms-flexbox;display:flex}.week-content>.day,.week-content>.empty{-ms-flex-positive:1;flex-grow:1;-ms-flex-preferred-size:80px;flex-basis:80px;text-align:center}.day{line-height:30px}.day>label{display:block;width:100%;height:100%;cursor:pointer;-webkit-box-sizing:border-box;box-sizing:border-box}.day.disabled{background-color:#ccc}.day.selected{background-color:gold}.day.highlight{background-color:#7e5}.day.today{background-color:#e45}.checkbox{display:none}.month-header{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between}"; }
}

exports.datepicker_plus = DatepickerPlus;
