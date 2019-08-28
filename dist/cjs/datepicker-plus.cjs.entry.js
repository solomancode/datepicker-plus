'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const __chunk_1 = require('./chunk-0703591e.js');

const dateToString = (date) => {
    const yyyy = date.getFullYear();
    const month = date.getMonth();
    const mm = (month + 1);
    const dd = date.getDate();
    return `${yyyy}-${mm}-${dd}`;
};
const getNextDayString = (dateString) => {
    const next = new Date(dateString);
    next.setDate(next.getDate() + 1);
    return dateToString(next);
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
    let currentDateString = getNextDayString(start);
    while (currentDateString !== end) {
        if (rangeDates.length > 3000)
            openGithubIssue({ title: 'Memory leak @ utils.unfoldRange()', label: 'bug', body: JSON.stringify({ dateString0, dateString1 }, null, 2) });
        rangeDates.push(currentDateString);
        currentDateString = getNextDayString(currentDateString);
    }
    return [start, ...rangeDates, end];
};
const sortDates = ([dateString0, dateString1]) => {
    const dt0 = new Date(dateString0);
    const dt1 = new Date(dateString1);
    return (dt0.valueOf() - dt1.valueOf()) > 0 ? [dateString1, dateString0] : [dateString0, dateString1];
};
const dateOffset = (date0, date1) => {
    return Math.ceil((date0.getTime() - date1.getTime()) / 86400000);
};
const patchArray = (target = [], source) => {
    return source.map((itm, i) => target[i] || itm);
};
const groupDates = (dateStringList) => {
    const group = Object.create({
        sorted: { years: [], months: {} },
        // [key: year]: { month: [...days] },
        toArray() {
            let sorted = [];
            this.sorted.years.forEach(year => {
                const month = Object.values(this[year]);
                if (month.length)
                    sorted = [...sorted, ...month];
            });
            return sorted;
        }
    });
    dateStringList.forEach(dateString => {
        const date = new Date(dateString);
        const year = date.getFullYear(), month = date.getMonth() + 1;
        if (group.hasOwnProperty(year) === false) {
            group[year] = {};
            group.sorted.years.push(year);
        }
        if (group[year].hasOwnProperty(month) === false) {
            group[year][month] = [];
            if (group.sorted.months.hasOwnProperty(year)) {
                group.sorted.months[year].push(month);
            }
            else {
                group.sorted.months[year] = [month];
            }
        }
        group[year][month].push(dateString);
    });
    group.sorted.years = group.sorted.years.sort((a, b) => a - b);
    for (const year in group.sorted.months) {
        group.sorted.months[year] = group.sorted.months[year].sort((a, b) => a - b);
    }
    return group;
};
const checkIfValidDateString = (dateString) => {
    let date = new Date(dateString);
    return isNaN(date.getDate()) ? false : true;
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
const getScopeRange = (scopeCenter, scopeSize) => {
    const start = new Date(scopeCenter);
    const startDay = start.getDate();
    start.setDate(startDay - scopeSize);
    const end = new Date(scopeCenter);
    const endDate = end.getDate();
    end.setDate(endDate + scopeSize);
    return [start, end].map(date => dateToString(date));
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
    months: 'months',
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
    selectScopeSize: 0,
    weekHeader: 'per-month',
    viewRange: getCurrentMonthRange(),
    i18n: {
        months: DEFAULT_MONTHS,
        weekDays: DEFAULT_WEEK_DAYS
    },
    layout: 'vertical'
};

const offsetFromToday = (dateString) => dateOffset(new Date(dateString), new Date());
const today = (dateElement) => offsetFromToday(dateElement.dateString) === 0;
const tomorrow = (dateElement) => offsetFromToday(dateElement.dateString) === 1;
const yesterday = (dateElement) => offsetFromToday(dateElement.dateString) === -1;
const past = (dateElement) => offsetFromToday(dateElement.dateString) < 0;
const future = (dateElement) => offsetFromToday(dateElement.dateString) > 0;
/**
 * Range start date
 */
const rangeStart = (dateElement) => {
    const rangeStart = dateElement.getAttr('rangeIndex') === 0;
    return rangeStart;
};
/**
 * Range end date
 */
const rangeEnd = (dateElement) => {
    const rangeIndex = dateElement.getAttr('rangeIndex');
    const rangeEndIndex = dateElement.getAttr('rangeEndIndex');
    return (rangeEndIndex > 0 && rangeIndex === rangeEndIndex);
};
/**
 * A connector is a date between date start and date end
 * in a range select mode.
 */
const connector = (dateElement) => {
    return dateElement.getAttr('rangeIndex') > 0 && (dateElement.getAttr('rangeEndIndex') !== dateElement.getAttr('rangeIndex'));
};
const attributeChecks = {
    today,
    rangeStart,
    rangeEnd,
    connector,
    tomorrow,
    yesterday,
    past,
    future
};

class DateElement {
    constructor(dateString) {
        this.dateString = dateString;
        this.pendingQueue = [];
        /**
         * DATE ATTRIBUTES
         */
        this.attributes = {} = {
        /**
         * DATE ATTRIBUTES
         */
        };
        this.date = new Date(dateString);
        this.day = this.date.getDate();
        this.month = this.date.getMonth() + 1;
        this.year = this.date.getFullYear();
        this.dayOfWeek = this.date.getDay();
        this.updateAttributes(attributeChecks);
    }
    hookDOMElement(element) {
        if (element instanceof HTMLTimeElement) {
            this.DateDOMElement = element;
        }
        else if (element instanceof HTMLInputElement) {
            this.checkboxDOMElement = element;
        }
        this.pendingQueue = this.pendingQueue.filter(fn => fn.call(this) === false);
    }
    updateDateClasses() {
        if (this.DateDOMElement) {
            this.DateDOMElement.setAttribute('class', DEFAULT_CLASSES.day + ' ' +
                Object.keys(this.attributes)
                    .filter(attr => this.attributes[attr] === true).join(' '));
            return true;
        }
        else {
            this.pendingQueue.push(this.updateDateClasses);
        }
        return true; // success, remove from queue
    }
    updateCheckboxAttribute(attr, value) {
        if (this.checkboxDOMElement) {
            this.checkboxDOMElement[attr] = value;
        }
        else {
            this.pendingQueue.push(() => {
                if (!this.checkboxDOMElement)
                    return false;
                this.checkboxDOMElement[attr] = value;
                this.updateDateClasses();
                return true; // success, remove from queue
            });
        }
        this.updateDateClasses();
    }
    updateDOMAttribute(attr, value) {
        if (attr === 'checked' || attr === 'disabled') {
            this.updateCheckboxAttribute(attr, value);
        }
        this.updateDateClasses();
    }
    setAttr(attr, value) {
        this.attributes[attr] = value;
        this.updateDOMAttribute(attr, value);
    }
    getAttr(attr) {
        return this.attributes[attr];
    }
    hasAttr(attr) {
        return attr in this.attributes;
    }
    removeAttr(attr) {
        delete this.attributes[attr];
        this.updateDateClasses();
    }
    resetRangeAttributes() {
        this.removeAttr('rangeIndex');
        this.removeAttr('rangeEndIndex');
        this.removeAttr('rangeStart');
        this.removeAttr('rangeEnd');
        this.removeAttr('connector');
    }
    updateAttributes(attributes) {
        for (const attr in attributes) {
            if (attributes.hasOwnProperty(attr)) {
                const attributeCheck = attributes[attr];
                if (attributeCheck(this) === true) {
                    this.setAttr(attr, true);
                }
            }
        }
    }
}

function renderDate(dateElement) {
    const onChange = (e) => {
        return e.target.checked ? this.select(dateElement.dateString) : this.deselect([dateElement.dateString]);
    };
    const onEnter = () => dateElement.getAttr('disabled') === false && this.highlightON(dateElement.dateString);
    return (__chunk_1.h("time", { part: "day", dateTime: dateElement.dateString, onMouseEnter: onEnter.bind(this), ref: element => dateElement.hookDOMElement(element) },
        __chunk_1.h("label", null,
            dateElement.day,
            __chunk_1.h("input", { ref: element => dateElement.hookDOMElement(element), onChange: onChange.bind(this), class: DEFAULT_CLASSES.checkbox, type: "checkbox", value: dateElement.dateString }))));
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
    const styles = config.layout === 'horizontal' ? {
        width: (window.innerWidth - 60) + 'px'
    } : {};
    const renderHeader = (i) => config.weekHeader === 'per-month' && i === 0;
    return (__chunk_1.h("section", { style: styles, part: "month", class: DEFAULT_CLASSES.month },
        renderMonthHeader(month[0], config.i18n.months),
        __chunk_1.h("section", { class: DEFAULT_CLASSES.monthContent }, monthToWeeks(month).map((week, i) => renderWeek.call(this, week, renderHeader(i), config.i18n.weekDays)))));
}
function renderContainer(dates, config) {
    const styles = config.layout === 'horizontal' ? {
        width: (window.innerWidth * dates.length) + 'px'
    } : {};
    const renderSingleHeader = () => config.weekHeader === 'single' && __chunk_1.h("header", { class: DEFAULT_CLASSES.singleHeader }, renderWeekHeader(config.i18n.weekDays));
    return ([
        // theme stylesheet
        config.stylesheetUrl ? __chunk_1.h("link", { rel: "stylesheet", type: "text/css", href: config.stylesheetUrl }) : null,
        // contents
        __chunk_1.h("section", { class: (config.stylesheetUrl ? '' : 'dpp ') + config.layout, part: "dpp-container" },
            __chunk_1.h("section", { style: styles, class: "viewport" }, [
                renderSingleHeader() || null,
                dates.map((month) => renderMonth.call(this, month, config))
            ]))
    ]);
}

class DatepickerPlus {
    constructor(hostRef) {
        __chunk_1.registerInstance(this, hostRef);
        this.plusConfig = DEFAULT_CONFIG;
        this.dateRegistry = {
        /** LOOKUP ELEMENTS */
        };
        this.viewElements = [];
        this.selected = [
        /** SELECTED */
        ];
        this.disabled = [
        /** DISABLED */
        ];
        this.highlighted = [
        /** HIGHLIGHTED */
        ];
        this.activeScope = null;
        this.unfoldDateStringList = (disabled) => {
            if (!disabled.length)
                return [];
            return disabled.map(dateString => {
                return checkIfValidDateString(dateString) ? [dateString] : this.unfoldAttribute(dateString);
            }).reduce((p, n) => [...p, ...n]);
        };
        this.patchConfigLists = () => {
            const { months: default_months, weekDays: default_weekDays } = DEFAULT_CONFIG.i18n;
            const { months, weekDays } = this.plusConfig.i18n;
            this.plusConfig.i18n.months = patchArray(months, default_months);
            this.plusConfig.i18n.weekDays = patchArray(weekDays, default_weekDays);
        };
        this.select = (dateString) => {
            const { selectMode } = this.plusConfig;
            // generate selected list
            let selectList = [];
            if (selectMode === 'single') {
                selectList = [dateString];
            }
            else if (selectMode === 'multiple') {
                selectList = [...this.selected, dateString];
            }
            else if (selectMode === 'range') {
                if (this.selected.includes(dateString)) {
                    selectList = [];
                }
                else if (this.selected.length === 1) {
                    selectList = unfoldRange(this.selected[0], dateString);
                }
                else {
                    selectList = [dateString];
                }
            }
            // check if has disabled or return prev. state
            const hasDisabled = this.checkIfHasDisabled(selectList, this.disabled);
            if (hasDisabled)
                return this.viewElements;
            // generate select scope if range mode active
            const scopeSize = this.plusConfig.selectScopeSize;
            if (selectMode === 'range' && scopeSize > 0) {
                if (!this.activeScope) {
                    this.activeScope = this.generateScope(this.disabled);
                    this.activeScope.activate(dateString, scopeSize);
                }
                else {
                    this.activeScope.deactivate();
                }
            }
            // reset selected
            this.deselect(this.selected);
            // apply selected
            this.selectMultipleDates(selectList);
            // emit
            this.onDateSelect.emit(this.selected);
            if (selectMode === 'range' && this.selected.length > 1)
                this.onRangeSelect.emit(this.selected);
        };
        this.deselect = (dateStringList) => {
            const { selectMode } = this.plusConfig;
            if (selectMode === 'range') {
                dateStringList = this.selected;
                if (this.activeScope && dateStringList.length === 1)
                    this.activeScope.deactivate();
            }
            dateStringList.forEach(dateString => {
                const dateElement = this.getDateElement(dateString);
                dateElement.setAttr('checked', false);
                // clean range attributes
                if (selectMode === 'range') {
                    dateElement.resetRangeAttributes();
                }
                dateElement.updateDateClasses();
            });
            this.selected = this.selected.filter(s => !(dateStringList.includes(s)));
            this.clearHighlighted();
        };
        this.getDateElement = (dateString) => {
            return this.dateRegistry[dateString];
        };
        this.unfoldAttribute = (attr) => {
            const unfolded = [];
            this.viewElements
                .reduce((p, n) => [...p, ...n])
                .forEach(dateElement => {
                if (dateElement.getAttr(attr)) {
                    unfolded.push(dateElement.dateString);
                }
            });
            return unfolded;
        };
        this.registerDate = (dateString) => {
            if (dateString in this.dateRegistry)
                return this.dateRegistry[dateString];
            const dateElement = new DateElement(dateString);
            this.dateRegistry[dateString] = dateElement;
            return dateElement;
        };
        this.onDateSelect = __chunk_1.createEvent(this, "onDateSelect", 7);
        this.onDateDeselect = __chunk_1.createEvent(this, "onDateDeselect", 7);
        this.onRangeSelect = __chunk_1.createEvent(this, "onRangeSelect", 7);
    }
    componentWillLoad() {
        this.plusConfig = Object.assign({}, DEFAULT_CONFIG, this.plusConfig);
        this.patchConfigLists();
        if (this.plusConfig.layout === 'horizontal') {
            this.plusConfig.weekHeader = 'per-month';
        }
    }
    componentDidLoad() {
        /**
         * UNFOLD DATE STRING RANGE
         * CREATE & REGISTER
         * UPDATE VIEW ELEMENTS
         */
        const viewRange = this.unfoldViewRange(this.plusConfig.viewRange);
        const createdElements = viewRange.map(month => month.map(this.registerDate));
        this.viewElements = createdElements;
        // disable
        const disabled = this.unfoldDateStringList(this.plusConfig.disabled);
        this.disableMultipleDates(disabled);
        // select
        this.plusConfig.selected.forEach(this.select);
    }
    unfoldViewRange([start, end]) {
        const dates = unfoldRange(start, end);
        return groupDates(dates).toArray();
    }
    generateScope(disabledSnapshot) {
        return {
            activate: (dateString, scopeSize) => {
                const [scopeStart, scopeEnd] = getScopeRange(dateString, scopeSize);
                const [viewStart, viewEnd] = this.plusConfig.viewRange;
                const disableTargets = [
                    ...unfoldRange(viewStart, scopeStart),
                    ...unfoldRange(scopeEnd, viewEnd)
                ];
                this.disableMultipleDates(disableTargets);
            },
            deactivate: () => {
                this.enableMultipleDates(this.disabled);
                this.disableMultipleDates(disabledSnapshot);
                this.activeScope = null;
            }
        };
    }
    highlightON(dateString) {
        if (this.plusConfig.selectMode === 'range' && this.selected.length === 1) {
            this.clearHighlighted();
            this.highlighted = unfoldRange(this.selected[0], dateString);
            this.highlighted.forEach(dateString => {
                const dateElement = this.getDateElement(dateString);
                dateElement.setAttr('highlighted', true);
            });
        }
    }
    clearHighlighted() {
        this.highlighted.forEach(dateString => {
            const dateElement = this.getDateElement(dateString);
            if (dateElement)
                dateElement.removeAttr('highlighted');
        });
        this.highlighted = [];
    }
    checkIfHasDisabled(selected, disabled) {
        const map = {};
        disabled.forEach(d => map[d] = true);
        return selected.some(s => (s in map));
    }
    selectMultipleDates(dateStringList) {
        dateStringList.forEach(dateString => {
            const dateElement = this.getDateElement(dateString);
            if (!dateElement)
                return;
            dateElement.setAttr('checked', true);
            if (dateStringList.length > 1) {
                const checked = dateElement.getAttr('checked');
                dateElement.setAttr('rangeIndex', checked ? dateStringList.indexOf(dateElement.dateString) : null);
                dateElement.setAttr('rangeEndIndex', checked ? dateStringList.length - 1 : null);
            }
            if (this.plusConfig.selectMode === 'range') {
                const { rangeStart, rangeEnd, connector } = attributeChecks;
                dateElement.updateAttributes({ rangeStart, rangeEnd, connector });
            }
        });
        this.selected = dateStringList;
    }
    disableMultipleDates(dateStringList) {
        this.disabled = dateStringList.filter(dateString => {
            const dateElement = this.getDateElement(dateString);
            if (!dateElement)
                return false;
            dateElement.setAttr('disabled', true);
            return true;
        });
    }
    enableMultipleDates(dateStringList) {
        dateStringList.forEach(dateString => {
            const dateElement = this.getDateElement(dateString);
            if (!dateElement)
                return;
            dateElement.setAttr('disabled', false);
        });
        this.disabled = this.disabled.filter(dateString => !dateStringList.includes(dateString));
    }
    render() {
        console.count('RENDER...');
        return renderContainer.call(this, this.viewElements, this.plusConfig);
    }
    static get style() { return ".dpp{font-family:monospace}.horizontal{overflow-x:scroll}.horizontal .month{display:inline-block}.month{border:1px solid #ccc;padding:20px}.dpp .month-header{text-transform:uppercase;font-weight:700;margin-bottom:5px}.dpp .day.checked.rangeStart{background-color:#cddc39}.dpp .day.checked.rangeEnd{background-color:#ff9800}.week-header{display:-ms-flexbox;display:flex}.single-header{padding:5px 20px}.week-header abbr{-ms-flex-positive:1;flex-grow:1;text-align:center}.week-content{display:-ms-flexbox;display:flex}.week-content>.day,.week-content>.empty{-ms-flex-positive:1;flex-grow:1;-ms-flex-preferred-size:80px;flex-basis:80px;text-align:center}.day{position:relative;line-height:30px}.day>label{display:block;width:100%;height:100%;cursor:pointer;-webkit-box-sizing:border-box;box-sizing:border-box}.day.disabled{color:#ccc;background-color:#f8f8f8}.dpp .day.checked,.dpp .day.highlighted{background-color:gold}.dpp .day.today{outline:1px solid #ccc}.checkbox{display:none}.month-header{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between}"; }
}

exports.datepicker_plus = DatepickerPlus;
