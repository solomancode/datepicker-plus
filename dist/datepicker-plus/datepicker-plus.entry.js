import { h, r as registerInstance, c as createEvent } from './chunk-3bfffd8a.js';

/**
 * takes a date, returns a dateString
 */
const dateToString = (date) => {
    const yyyy = date.getFullYear();
    const month = date.getMonth();
    const mm = (month + 1);
    const dd = date.getDate();
    return NormDt(`${yyyy}-${mm}-${dd}`);
};
/**
 * given a dateString, return the next day dateString
 */
const getNextDayString = (dateString) => {
    const next = new Date(dateString);
    next.setDate(next.getDate() + 1);
    return dateToString(next);
};
/**
 * check if a pair of dates are equal.
 */
const isSameDate = (date1, date2) => {
    if (date1.getDate() !== date2.getDate())
        return false;
    if (date1.getUTCMonth() !== date2.getUTCMonth())
        return false;
    if (date1.getFullYear() !== date2.getFullYear())
        return false;
    return true;
};
/**
 * checks if a certain dateString exists in a range of dates
 */
const dateStringInRange = (dateString, dateRange) => {
    const [start, end] = sortDates(dateRange);
    const targetDate = new Date(dateString);
    const startOffset = dateOffset(targetDate, new Date(start));
    const endOffset = dateOffset(targetDate, new Date(end));
    return startOffset >= 0 && endOffset <= 0;
};
/**
 * current month start and end dates
 */
const getCurrentMonthRange = () => {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return [dateToString(firstDay), dateToString(lastDay)];
};
// Normalize Date String (use it everywhere)
const NormDt = (dateString) => {
    return dateString.split('-').map(s => s.padStart(2, '0')).join('-');
};
/**
 * given a pair of dateStrings, this function will
 * generate all the dates in between.
 */
const unfoldRange = (dateString0, dateString1) => {
    const [start, end] = sortDates([dateString0, dateString1]).map(NormDt);
    if (start === end)
        return [];
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
/**
 * parse props JSON, usually props are
 * given in string format
 */
const parsePropJSON = (prop) => {
    return JSON.parse(prop.replace(/'/g, '"'));
};
/**
 * sort a pair of dates
 */
const sortDates = ([dateString0, dateString1]) => {
    const dt0 = new Date(dateString0);
    const dt1 = new Date(dateString1);
    return (dt0.valueOf() - dt1.valueOf()) > 0 ? [dateString1, dateString0] : [dateString0, dateString1];
};
/**
 * calculate the offset between two dates
 */
const dateOffset = (date0, date1) => {
    return Math.ceil((date0.getTime() - date1.getTime()) / 86400000);
};
/**
 * fills an array's empty slots
 */
const patchArray = (target = [], source) => {
    return source.map((itm, i) => target[i] || itm);
};
/**
 * group dates for view.
 * TODO: elaborate more...
 */
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
/**
 * checks if a given dateString is valid
 */
const checkIfValidDateString = (dateString) => {
    let date = new Date(dateString);
    return isNaN(date.getDate()) ? false : true;
};
/**
 * convert a month to weeks
 */
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
/**
 * given scope center and size, this function will
 * calculate all the dates required to generate that scope
 */
const getScopeRange = (scopeCenter, scopeSize) => {
    const start = new Date(scopeCenter);
    const startDay = start.getDate();
    start.setDate(startDay - scopeSize);
    const end = new Date(scopeCenter);
    const endDate = end.getDate();
    end.setDate(endDate + scopeSize);
    return [start, end].map(date => dateToString(date));
};
/**
 * auto-open an issue if something weird happens.
 */
const openGithubIssue = ({ title, body, label }) => {
    const tl = 'title=' + encodeURIComponent(title);
    const lb = 'labels=' + encodeURIComponent(label);
    const bd = 'body=' + encodeURIComponent(body);
    throw ("Stopped to prevent memory leak.\n\n🐞 Create a new issue:\n" +
        `https://github.com/solomancode/datepicker-plus/issues/new?${lb}&${tl}&${bd}`);
};

/**
 * Common Configuration Defaults
 */
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
    checked: 'checked',
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

/**
 * calculate date offset starting from today
 */
const offsetFromToday = (dateString) => dateOffset(new Date(dateString), new Date());
/**
 * available date dynamic attributes
 */
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
        /**
         * pending operations to be called in
         * later time when a certain condition
         * is met.
         */
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
    /**
     * hooks a DOM element reference and applies
     * pending operations.
     */
    hookDOMElement(element) {
        if (element instanceof HTMLTimeElement) {
            this.DateDOMElement = element;
        }
        else if (element instanceof HTMLInputElement) {
            this.checkboxDOMElement = element;
        }
        this.pendingQueue = this.pendingQueue.filter(fn => fn.call(this) === false);
    }
    /**
     * update date class-list
     */
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
    /**
     * updates a date attribute
     */
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
    /**
     * updates a DOM attribute
     */
    updateDOMAttribute(attr, value) {
        if (attr === DEFAULT_CLASSES.checked || attr === DEFAULT_CLASSES.disabled) {
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
    /**
     * resets range attributes
     */
    resetRangeAttributes() {
        this.removeAttr('rangeIndex');
        this.removeAttr('rangeEndIndex');
        this.removeAttr('rangeStart');
        this.removeAttr('rangeEnd');
        this.removeAttr('connector');
    }
    /**
     * update date attributes
     */
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

/**
 * ------------------------------
 * JSX, fancy templates goes here.
 * -------------------------------
 */
/**
 * renders the interactive date element
 */
function renderDate(dateElement) {
    const onChange = (e) => {
        return e.target.checked ? this.select(dateElement.dateString) : this.deselect([dateElement.dateString]);
    };
    const onEnter = () => !dateElement.getAttr(DEFAULT_CLASSES.disabled) && this.highlightON(dateElement.dateString);
    return (h("time", { part: "day", dateTime: dateElement.dateString, onMouseEnter: onEnter.bind(this), ref: element => dateElement.hookDOMElement(element) },
        h("label", null,
            dateElement.day,
            h("input", { ref: element => dateElement.hookDOMElement(element), onChange: onChange.bind(this), class: DEFAULT_CLASSES.checkbox, type: "checkbox", value: dateElement.dateString }))));
}
/**
 * week header, renders week days.
 */
function renderWeekHeader(weekDays) {
    return (h("header", { class: DEFAULT_CLASSES.weekHeader, part: "week-header" }, weekDays.map(({ name, abbr, isWeekend }) => h("abbr", { class: isWeekend && DEFAULT_CLASSES.weekend, title: name }, abbr))));
}
/**
 * of course we need an empty placeholder
 */
function renderEmpty(offset) {
    const nodes = [];
    while (offset) {
        nodes.push(h("span", { class: DEFAULT_CLASSES.empty }));
        offset--;
    }
    return nodes;
}
/**
 * it renders the whole week 24/7
 */
function renderWeek(week, renderHeader, weekDays) {
    return (h("section", { part: "week", class: DEFAULT_CLASSES.week },
        renderHeader && renderWeekHeader(weekDays),
        h("section", { class: DEFAULT_CLASSES.weekContent },
            renderEmpty(week[0].dayOfWeek),
            week.map(renderDate.bind(this)),
            renderEmpty(6 - week[week.length - 1].dayOfWeek))));
}
/**
 * renders a month header
 */
function renderMonthHeader(dayFirst, months) {
    return (h("header", { class: DEFAULT_CLASSES.monthHeader, part: "month-header" },
        h("span", { class: DEFAULT_CLASSES.monthName }, months[dayFirst.month - 1].name),
        dayFirst.month - 1 === 0 && h("span", { class: DEFAULT_CLASSES.year }, dayFirst.year)));
}
/**
 * renders a month
 */
function renderMonth(month, config) {
    const styles = config.layout === 'horizontal' ? {
        width: (window.innerWidth - 60) + 'px'
    } : {};
    const renderHeader = (i) => config.weekHeader === 'per-month' && i === 0;
    return (h("section", { style: styles, part: "month", class: DEFAULT_CLASSES.month },
        renderMonthHeader(month[0], config.i18n.months),
        h("section", { class: DEFAULT_CLASSES.monthContent }, monthToWeeks(month).map((week, i) => renderWeek.call(this, week, renderHeader(i), config.i18n.weekDays)))));
}
/**
 * render date picker container.
 * and handles multiple layout options.
 */
function renderContainer(dates, config) {
    const styles = config.layout === 'horizontal' ? {
        width: (window.innerWidth * dates.length) + 'px'
    } : {};
    const renderSingleHeader = () => config.weekHeader === 'single' && h("header", { class: DEFAULT_CLASSES.singleHeader }, renderWeekHeader(config.i18n.weekDays));
    return ([
        // theme stylesheet
        config.stylesheetUrl ? h("link", { rel: "stylesheet", type: "text/css", href: config.stylesheetUrl }) : null,
        // contents
        h("section", { class: (config.stylesheetUrl ? 'dpp-custom ' : 'dpp ') + config.layout, part: "dpp-container" },
            h("section", { style: styles, class: "viewport" }, [
                renderSingleHeader() || null,
                dates.map((month) => renderMonth.call(this, month, config))
            ]))
    ]);
}

class DatepickerPlus {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /**
         * date picker plus config passed as a prop.
         */
        this.plusConfig = DEFAULT_CONFIG;
        /**
         * register new created date objects for reuse
         */
        this.dateRegistry = {
        /** LOOKUP ELEMENTS */
        };
        /**
         * reactive state to update view elements
         */
        this.viewElements = [];
        /**
         * a list of isoString formated dates to be
         * selected.
         */
        this.selected = [
        /** SELECTED */
        ];
        /**
         * a list of isoString formated dates to be
         * disabled
         */
        this.disabled = [
        /** DISABLED */
        ];
        /**
         * a list of isoString formated dates to be
         * highlighted
         */
        this.highlighted = [
        /** HIGHLIGHTED */
        ];
        /**
         * scope controller object to enable/disable
         * selection scope
         */
        this.activeScope = null;
        /**
         * prepare configuration for initialization
         * fill in necessary data
         */
        this.patchConfigLists = () => {
            const { months: default_months, weekDays: default_weekDays } = DEFAULT_CONFIG.i18n;
            const { months, weekDays } = this.plusConfig.i18n;
            this.plusConfig.i18n.months = patchArray(months, default_months);
            this.plusConfig.i18n.weekDays = patchArray(weekDays, default_weekDays);
        };
        /**
         * dynamic dates can be achieved through a date attribute
         *
         * some examples of currently available date attributes are:
         * ( today - tomorrow - yesterday - past - future )
         *
         * this methods unfolds registered date attributes to it's corresponding dateString(s)
         * a date attribute might be unfolded to a list of corresponding dateStrings
         */
        this.unfoldDateStringListAttributes = (dateStringList) => {
            if (!dateStringList.length)
                return [];
            return dateStringList.map(dateString => {
                return checkIfValidDateString(dateString) ? [dateString] : this.unfoldAttribute(dateString);
            }).reduce((p, n) => [...p, ...n]);
        };
        /**
         * selects a date in different selection modes
         */
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
        /**
         * deselect a list of dates
         */
        this.deselect = (dateStringList) => {
            const { selectMode } = this.plusConfig;
            if (selectMode === 'range') {
                dateStringList = this.selected;
                if (this.activeScope && dateStringList.length === 1)
                    this.activeScope.deactivate();
            }
            dateStringList.forEach(dateString => {
                const dateElement = this.getDateElement(dateString);
                dateElement.setAttr(DEFAULT_CLASSES.checked, false);
                // clean range attributes
                if (selectMode === 'range') {
                    dateElement.resetRangeAttributes();
                }
                dateElement.updateDateClasses();
            });
            this.selected = this.selected.filter(s => !(dateStringList.includes(s)));
            this.clearHighlighted();
            this.onDeselect.emit(dateStringList);
        };
        /**
         * returns a date element using it's dateString
         */
        this.getDateElement = (dateString) => {
            const NDStr = NormDt(dateString);
            return this.dateRegistry[NDStr];
        };
        /**
         * unfolds a date attribute within the
         * current active view.
         */
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
        /**
         * registers a date for later use
         */
        this.registerDate = (dateString) => {
            const NDStr = NormDt(dateString);
            if (NDStr in this.dateRegistry)
                return this.dateRegistry[NDStr];
            const dateElement = new DateElement(NDStr);
            this.dateRegistry[NDStr] = dateElement;
            return dateElement;
        };
        this.onDateSelect = createEvent(this, "onDateSelect", 7);
        this.onDeselect = createEvent(this, "onDeselect", 7);
        this.onRangeSelect = createEvent(this, "onRangeSelect", 7);
        this.onHighlight = createEvent(this, "onHighlight", 7);
        this.onHighlightClear = createEvent(this, "onHighlightClear", 7);
    }
    componentWillLoad() {
        this.plusConfig = Object.assign({}, DEFAULT_CONFIG, this.plusConfig);
        this.patchConfigLists();
        if (this.plusConfig.layout === 'horizontal') {
            this.plusConfig.weekHeader = 'per-month';
        }
    }
    componentDidLoad() {
        // unfold view dateString pair
        const viewRange = this.unfoldViewRange(this.plusConfig.viewRange);
        // create a date element for each dateString
        const createdElements = viewRange.map(month => month.map(this.registerDate));
        // set view elements, reactive prop. will trigger a re-render.
        this.viewElements = createdElements;
        // disable
        const disabled = this.unfoldDateStringListAttributes(this.plusConfig.disabled);
        this.disableMultipleDates(disabled);
        // select
        const selected = this.unfoldDateStringListAttributes(this.plusConfig.selected);
        this.checkDatesBeforeSelect(selected);
    }
    /**
     * checks for valid select conditions before
     * applying date select
     */
    checkDatesBeforeSelect(selected) {
        if (this.plusConfig.selectMode === 'range' && selected.length < 2) {
            console.info('%c— Date selection will be cancelled —\n', 'color: #e52', 'Range select mode requires a minimum of two dates to select.');
        }
        else {
            selected.forEach(this.select);
        }
    }
    /**
     * given two dates this method will return
     * the dates in between formatted for view
     */
    unfoldViewRange([start, end]) {
        const dates = unfoldRange(start, end);
        return groupDates(dates).toArray();
    }
    /**
     * generates a selection constraint scope
     */
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
    /**
     * highlight potential select candidates
     */
    highlightON(dateString) {
        if (this.plusConfig.selectMode === 'range' && this.selected.length === 1) {
            this.clearHighlighted();
            this.highlighted = unfoldRange(this.selected[0], dateString);
            this.highlighted.forEach(dateString => {
                const dateElement = this.getDateElement(dateString);
                dateElement.setAttr('highlighted', true);
            });
            this.onHighlight.emit(this.highlighted);
        }
    }
    /**
     * clear highlighted dates
     */
    clearHighlighted() {
        this.highlighted.forEach(dateString => {
            const dateElement = this.getDateElement(dateString);
            if (dateElement)
                dateElement.removeAttr('highlighted');
        });
        this.highlighted = [];
        this.onHighlightClear.emit(void 0);
    }
    /**
     * checks if selected contains a disabled date
     */
    checkIfHasDisabled(selected, disabled) {
        const map = {};
        disabled.forEach(d => map[d] = true);
        return selected.some(s => (s in map));
    }
    /**
     * select multiple dates and applies
     * required attributes
     */
    selectMultipleDates(dateStringList) {
        dateStringList.forEach(dateString => {
            const dateElement = this.getDateElement(dateString);
            if (!dateElement)
                return;
            dateElement.setAttr(DEFAULT_CLASSES.checked, true);
            if (dateStringList.length > 1) {
                const checked = dateElement.getAttr(DEFAULT_CLASSES.checked);
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
    /**
     * disable multiple dates
     */
    disableMultipleDates(dateStringList) {
        this.disabled = dateStringList.filter(dateString => {
            const dateElement = this.getDateElement(dateString);
            if (!dateElement)
                return false;
            dateElement.setAttr(DEFAULT_CLASSES.disabled, true);
            return true;
        });
    }
    /**
     * enables multiple dates
     */
    enableMultipleDates(dateStringList) {
        dateStringList.forEach(dateString => {
            const dateElement = this.getDateElement(dateString);
            if (!dateElement)
                return;
            dateElement.setAttr(DEFAULT_CLASSES.disabled, false);
        });
        this.disabled = this.disabled.filter(dateString => !dateStringList.includes(dateString));
    }
    /**
     * RENDER... 👀
     *
     */
    render() {
        return renderContainer.call(this, this.viewElements, this.plusConfig);
    }
    static get style() { return ".dpp {\n    font-family: monospace;\n}\n\n.horizontal {\n    overflow-x: scroll;\n}\n\n.horizontal .month {\n    display: inline-block;\n}\n\n.month {\n    border: 1px solid #ccc;\n    padding: 20px;\n}\n\n.dpp .month-header {\n    text-transform: uppercase;\n    font-weight: bold;\n    margin-bottom: 5px;\n}\n\n.dpp .day.checked.rangeStart {\n    background-color: #cddc39;\n}\n\n.dpp .day.checked.rangeEnd {\n    background-color: #ff9800;\n}\n\n.week-header {\n    display: -ms-flexbox;\n    display: flex;\n}\n\n.single-header {\n    padding: 5px 20px;\n}\n\n.week-header abbr {\n    -ms-flex-positive: 1;\n    flex-grow: 1;\n    text-align: center;\n}\n\n.week-content {\n    display: -ms-flexbox;\n    display: flex;\n}\n\n.week-content > .day, .week-content > .empty {\n    -ms-flex-positive: 1;\n    flex-grow: 1;\n    -ms-flex-preferred-size: 80px;\n    flex-basis: 80px;\n    text-align: center;\n}\n\n.day {\n    position: relative;\n    line-height: 30px;\n}\n\n.day > label {\n    display: block;\n    width: 100%;\n    height: 100%;\n    cursor: pointer;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n}\n\n.day.disabled {\n    color: #ccc;\n    background-color: #f8f8f8;\n}\n\n.dpp .day.checked {\n    background-color: gold;\n}\n\n.dpp .day.highlighted {\n    background-color: gold;\n}\n\n.dpp .day.today {\n    outline: 1px solid #ccc;\n}\n\n.checkbox {\n    display: none;\n}\n\n.month-header {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-pack: justify;\n    justify-content: space-between;\n}"; }
}

export { DatepickerPlus as datepicker_plus };
