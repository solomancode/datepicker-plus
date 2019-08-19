import { h, r as registerInstance } from './chunk-74afa921.js';

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
const parsePropJSON = (prop) => {
    return JSON.parse(prop.replace(/'/g, '"'));
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
const generateDateClass = (dateElement) => [
    DEFAULT_CLASSES.day,
    dateElement.checked ? DEFAULT_CLASSES.selected : null
].filter(c => c).join(' ');
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
        return e.target.checked ? this.selected = [date.dateString] : this.selected = [];
    };
    return (h("time", { part: "day", class: generateDateClass(date), dateTime: date.dateString },
        h("label", null,
            date.day,
            h("input", { checked: date.checked, disabled: date.disabled, onChange: onChange.bind(this), class: DEFAULT_CLASSES.checkbox, type: "checkbox", value: date.dateString }))));
}
function renderWeekHeader(weekDays) {
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
function renderWeek(week, renderHeader, weekDays) {
    return (h("section", { part: "week", class: DEFAULT_CLASSES.week },
        renderHeader && renderWeekHeader(weekDays),
        h("section", { class: DEFAULT_CLASSES.weekContent },
            renderEmpty(week[0].dayOfWeek),
            week.map(renderDate.bind(this)),
            renderEmpty(6 - week[week.length - 1].dayOfWeek))));
}
function renderMonthHeader(dayFirst, months) {
    return (h("header", { class: DEFAULT_CLASSES.monthHeader, part: "month-header" },
        h("span", { class: DEFAULT_CLASSES.monthName }, months[dayFirst.month - 1].name),
        dayFirst.month - 1 === 0 && h("span", { class: DEFAULT_CLASSES.year }, dayFirst.year)));
}
function renderMonth(month, config) {
    const renderHeader = (i) => config.weekHeader === 'per-month' && i === 0;
    return (h("section", { part: "month", class: DEFAULT_CLASSES.month },
        renderMonthHeader(month[0], config.i18n.months),
        h("section", { class: DEFAULT_CLASSES.monthContent }, monthToWeeks(month).map((week, i) => renderWeek.call(this, week, renderHeader(i), config.i18n.weekDays)))));
}
function renderContainer(dates, config) {
    const renderSingleHeader = () => config.weekHeader === 'single' && h("header", { class: DEFAULT_CLASSES.singleHeader }, renderWeekHeader(config.i18n.weekDays));
    return ([
        // theme stylesheet
        config.stylesheetUrl ? h("link", { rel: "stylesheet", type: "text/css", href: config.stylesheetUrl }) : null,
        // contents
        h("section", { class: "dpp-container", part: "dpp-container" }, [
            renderSingleHeader() || null,
            dates.map((month) => renderMonth.call(this, month, config))
        ])
    ]);
}

class DatepickerPlus {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.plusConfig = DEFAULT_CONFIG;
        this.registered = {
        /** LOOKUP ELEMENTS */
        };
        this.viewElements = [];
        this.selected = [
        /** SELECTED DATES */
        ];
        this.viewList = [];
        this.patchConfigLists = () => {
            const { months: default_months, weekDays: default_weekDays } = DEFAULT_CONFIG.i18n;
            const { months, weekDays } = this.plusConfig.i18n;
            this.plusConfig.i18n.months = patchArray(months, default_months);
            this.plusConfig.i18n.weekDays = patchArray(weekDays, default_weekDays);
        };
    }
    updateViewSelectedElements(next) {
        switch (this.plusConfig.selectMode) {
            case 'single':
                this.viewElements = this.selectDate(next[next.length - 1], this.viewElements);
                break;
            default:
                break;
        }
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
        this.selected = this.plusConfig.selected;
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
    selectDate(dateString, viewElements) {
        return viewElements.map(month => month.map(dateElement => {
            dateElement.checked = dateElement.dateString === dateString;
            return dateElement;
        }));
    }
    render() {
        console.count('RENDER:');
        return renderContainer.call(this, this.viewElements, this.plusConfig);
    }
    static get watchers() { return {
        "selected": ["updateViewSelectedElements"],
        "viewList": ["updateViewElements"]
    }; }
    static get style() { return ".dpp-container {\n    font-family: monospace;\n}\n\n.month {\n    border: 1px solid #ccc;\n    padding: 20px;\n}\n\n.month-header {\n    text-transform: uppercase;\n    font-weight: bold;\n    margin-bottom: 5px;\n}\n\n.week {\n    \n}\n\n.week-header {\n    display: -ms-flexbox;\n    display: flex;\n}\n\n.single-header {\n    padding: 5px 20px;\n}\n\n.week-header abbr {\n    -ms-flex-positive: 1;\n    flex-grow: 1;\n    text-align: center;\n}\n\n.week-content {\n    display: -ms-flexbox;\n    display: flex;\n}\n\n.week-content > .day, .week-content > .empty {\n    -ms-flex-positive: 1;\n    flex-grow: 1;\n    -ms-flex-preferred-size: 80px;\n    flex-basis: 80px;\n    text-align: center;\n}\n\n.day {\n    line-height: 30px;\n}\n\n.day > label {\n    display: block;\n    width: 100%;\n    height: 100%;\n    cursor: pointer;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n}\n\n.day.disabled {\n    background-color: #ccc;\n}\n\n.day.selected {\n    background-color: gold;\n}\n\n.day.highlight {\n    background-color: #7e5;\n}\n\n.day.today {\n    background-color: #e45;\n}\n\n.checkbox {\n    display: none;\n}\n\n.month-header {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-pack: justify;\n    justify-content: space-between;\n}"; }
}

export { DatepickerPlus as datepicker_plus };
