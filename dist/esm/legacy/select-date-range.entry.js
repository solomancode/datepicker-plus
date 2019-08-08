import { h, r as registerInstance, c as createEvent } from './chunk-c703814f.js';
var dateToString = function (date) {
    var yyyy = date.getFullYear();
    var month = date.getMonth();
    var mm = (month + 1);
    var dd = date.getDate();
    return yyyy + "-" + mm + "-" + dd;
};
var getDateComponents = function (dateString) {
    return dateString.split('-').map(function (s) { return parseInt(s); });
};
var stringToDate = function (dateString) {
    var _a = getDateComponents(dateString), year = _a[0], month = _a[1], day = _a[2];
    var date = new Date();
    date.setFullYear(year);
    date.setMonth(month - 1);
    date.setDate(day);
    return date;
};
var getNextDay = function (date) {
    var isStringDate = typeof date === 'string';
    var nextDay = isStringDate ? stringToDate(date) : new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    return isStringDate ? dateToString(nextDay) : nextDay;
};
var getDateRange = function (start, end) {
    var startDate = stringToDate(start);
    var endDate = stringToDate(end);
    endDate = getNextDay(endDate);
    return [startDate, endDate];
};
var isSameDate = function (date1, date2) {
    if (date1.getDate() !== date2.getDate())
        return false;
    if (date1.getUTCMonth() !== date2.getUTCMonth())
        return false;
    if (date1.getFullYear() !== date2.getFullYear())
        return false;
    return true;
};
var monthToWeeks = function (month) {
    var week = [];
    var weeks = [];
    month.forEach(function (day) {
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
var getCurrentMonthRange = function () {
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return [dateToString(firstDay), dateToString(lastDay)];
};
var getDatesBetween = function (dateString0, dateString1) {
    var rangeDates = [];
    var currentDateString = getNextDay(dateString0);
    while (currentDateString !== dateString1) {
        rangeDates.push(currentDateString);
        currentDateString = getNextDay(currentDateString);
    }
    return rangeDates;
};
var parsePropJSON = function (prop) {
    return JSON.parse(prop.replace(/'/g, '"'));
};
var DEFAULT_WEEK_DAYS = [
    { name: 'Sunday', abbr: 'Sun', isWeekend: true },
    { name: 'Monday', abbr: 'Mon ' },
    { name: 'Tuesday', abbr: 'Tue' },
    { name: 'Wednesday', abbr: 'Wed' },
    { name: 'Thursday', abbr: 'Thu' },
    { name: 'Friday', abbr: 'Fri' },
    { name: 'Saturday', abbr: 'Sat', isWeekend: true }
];
var DEFAULT_MONTHS = [
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
var DEFAULT_CLASSES = {
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
var _a = getCurrentMonthRange(), DEFAULT_VIEW_RANGE_START = _a[0], DEFAULT_VIEW_RANGE_END = _a[1];
var DEFAULT_CONFIG = {
    selectMode: 'single',
    checkedDates: '',
    viewRangeStart: DEFAULT_VIEW_RANGE_START,
    viewRangeEnd: DEFAULT_VIEW_RANGE_END
};
function renderDate(date) {
    var toggleSelected = function () {
        date.checked ? date.deselect() : date.select();
    };
    return (h("time", { part: "day", class: date.classList(), dateTime: date.dateString() }, h("label", null, date.day, h("input", { ref: function (el) { return date.el = el; }, onChange: toggleSelected.bind(this), onMouseDown: function () { return date.selectRangeStart(); }, onMouseEnter: function () { return date.selectRangeEnd(); }, checked: date.checked, disabled: date.disabled, class: DEFAULT_CLASSES.checkbox, type: "checkbox", value: date.dateString() }))));
}
function renderWeekHeader(weekDays) {
    if (weekDays === void 0) { weekDays = DEFAULT_WEEK_DAYS; }
    return (h("header", { class: DEFAULT_CLASSES.weekHeader, part: "week-header" }, weekDays.map(function (_a) {
        var name = _a.name, abbr = _a.abbr, isWeekend = _a.isWeekend;
        return h("abbr", { class: isWeekend && DEFAULT_CLASSES.weekend, title: name }, abbr);
    })));
}
function renderPadStart(offset) {
    if (offset === 0)
        return null;
    var nodes = [];
    var count = 8 - offset;
    while (count) {
        nodes.push(h("span", { class: DEFAULT_CLASSES.empty }));
        count--;
    }
    return nodes;
}
function renderWeek(week, renderHeader) {
    if (renderHeader === void 0) { renderHeader = false; }
    return (h("section", { part: "week", class: DEFAULT_CLASSES.week }, renderHeader && renderWeekHeader(), h("section", { class: DEFAULT_CLASSES.weekContent }, renderPadStart(week[0].dayOfWeek), week.map(renderDate))));
}
function renderMonth(month) {
    return (h("section", { part: "month", class: DEFAULT_CLASSES.month }, h("header", { class: DEFAULT_CLASSES.monthHeader, part: "month-header" }, DEFAULT_MONTHS[month[0].month - 1].name), h("section", { class: DEFAULT_CLASSES.monthContent }, monthToWeeks(month).map(function (week, i) { return renderWeek(week, i === 0); }))));
}
function renderContainer(dates) {
    return (h("section", { class: "sdr-container", part: "sdr-container" }, dates.map(function (month) { return renderMonth(month); })));
}
var composeDateOptions = function (options) {
    return Object.assign({ checked: false, disabled: false }, options);
};
var composeDateHelpers = function (dateString) { return ({
    dateObject: function () {
        return stringToDate(dateString);
    },
    dateString: function () {
        return dateString;
    },
    select: function () {
        this.checked = true;
        this.el && (this.el.checked = true);
        this.events.onDateSelect.emit(this);
    },
    deselect: function () {
        this.checked = false;
        this.el && (this.el.checked = false);
        this.events.onDateDeselect.emit(this);
    },
    enable: function () {
        this.disabled = false;
        this.el && (this.el.disabled = false);
    },
    disable: function () {
        this.disabled = true;
        this.el && (this.el.disabled = true);
    },
    selectRangeStart: function () {
        // TODO:
    },
    selectRangeEnd: function () {
        // TODO:
    },
    offset: function () {
        var date = this.dateObject().getTime();
        var now = new Date().getTime();
        return Math.ceil((date - now) / 86400000);
    },
    classList: function () {
        var date = this;
        var SEP = ' ';
        var disabled = date.disabled ? SEP + DEFAULT_CLASSES.disabled : '';
        var selected = date.checked ? SEP + DEFAULT_CLASSES.selected : '';
        var today = date.isToday() ? SEP + DEFAULT_CLASSES.today : '';
        return DEFAULT_CLASSES.day + disabled + selected + today;
    },
    bindEvent: function (event, emitter) { this.events[event] = emitter; }
}); };
var composeDateTags = function () { return ({
    isToday: function () {
        return this.offset() === 0;
    },
    isTomorrow: function () {
        return this.offset() === 1;
    },
    isYesterday: function () {
        return this.offset() === -1;
    },
    isPastDate: function () {
        return this.offset() < 0;
    },
    isFutureDate: function () {
        return this.offset() > 0;
    }
}); };
var createdDateElements = {};
var isCreatedDateElement = function (dateString) {
    return (dateString in createdDateElements);
};
var createDateElement = function (_a) {
    var dateString = _a.dateString, options = _a.options, _b = _a.events, events = _b === void 0 ? {} : _b;
    var _c = getDateComponents(dateString), year = _c[0], month = _c[1], day = _c[2];
    var dateOptions = Object.create(Object.assign({ events: events,
        createdDateElements: createdDateElements }, composeDateOptions(options), composeDateHelpers(dateString), composeDateTags()));
    if (isCreatedDateElement(dateString)) {
        var dateElement_1 = createdDateElements[dateString];
        Object.assign(dateElement_1, dateOptions);
        return dateElement_1;
    }
    var dayOfWeek = new Date(dateString).getDay();
    var props = { year: year, month: month, day: day, dayOfWeek: dayOfWeek };
    var dateElement = Object.assign(dateOptions, props);
    Object.defineProperty(createdDateElements, dateString, { value: dateElement });
    return dateElement;
};
var SelectDateRange = /** @class */ (function () {
    function SelectDateRange(hostRef) {
        var _this = this;
        registerInstance(this, hostRef);
        this.viewList = [];
        /**
         * Parsed date list...
         */
        this.checkedDatesInput = [];
        this.disabledDatesInput = [];
        this.config = DEFAULT_CONFIG;
        this.dayClassList = DEFAULT_CLASSES.day;
        this.getDateElement = function (dateString) {
            if (dateString in createdDateElements) {
                return createdDateElements[dateString];
            }
            else {
                return null;
            }
        };
        this.selectDate = function (dateString) {
            var dateElement = _this.getDateElement(dateString);
            dateElement && dateElement.select();
        };
        this.selectDates = function (dateString) {
            if (_this.config.selectMode === 'range') {
                var datesRange = getDatesBetween(dateString[0], dateString[1]);
                [dateString[0]].concat(datesRange, [dateString[1]]).forEach(_this.selectDate);
            }
            else {
                dateString.forEach(_this.selectDate);
            }
        };
        this.disableDates = function (dateString) {
            dateString.forEach(function (dateStr) {
                var dateElement = _this.getDateElement(dateStr);
                dateElement && dateElement.disable();
            });
        };
        this.isSelectedDate = function (dateString) {
            _this.getDateElement(dateString).checked;
        };
        this.createDate = function (date) {
            var dateString = dateToString(date);
            return createDateElement({
                dateString: dateString,
                events: _this.events
            });
        };
        this.onDateSelect = createEvent(this, "onDateSelect", 7);
        this.onDateDeselect = createEvent(this, "onDateDeselect", 7);
    }
    Object.defineProperty(SelectDateRange.prototype, "events", {
        get: function () {
            return {
                onDateSelect: this.onDateSelect,
                onDateDeselect: this.onDateDeselect
            };
        },
        enumerable: true,
        configurable: true
    });
    SelectDateRange.prototype.parseCheckedDates = function (dates) {
        if (typeof dates === 'string') {
            dates = parsePropJSON(dates);
        }
        this.selectDates(dates);
        this.checkedDatesInput = dates || [];
    };
    SelectDateRange.prototype.parseDisabledDates = function (dates) {
        if (typeof dates === 'string') {
            dates = parsePropJSON(dates);
        }
        this.disableDates(dates);
        this.disabledDatesInput = dates || [];
    };
    SelectDateRange.prototype.componentWillLoad = function () {
        this.parseCheckedDates(this.checkedDates);
        this.parseDisabledDates(this.disabledDates);
        this.updateConfig();
    };
    SelectDateRange.prototype.clearSelected = function () {
        var _this = this;
        this.checkedDatesInput.forEach(function (dateString) {
            var dateElement = _this.getDateElement(dateString);
            dateElement && dateElement.deselect();
        });
        if (this.config.selectMode === 'range') {
            var _a = this.checkedDatesInput, start = _a[0], end = _a[1];
            var dates = getDatesBetween(start, end);
            dates.forEach(function (dateString) {
                var dateElement = _this.getDateElement(dateString);
                dateElement && dateElement.deselect();
            });
        }
        this.checkedDatesInput = [];
    };
    SelectDateRange.prototype.updateViewList = function (config) {
        var _this = this;
        if (config === void 0) { config = this.config; }
        var lastIndex = null;
        var monthDates = [];
        this.viewList = [];
        var _a = getDateRange(config.viewRangeStart, config.viewRangeEnd), currentDate = _a[0], endDate = _a[1];
        while (!isSameDate(currentDate, endDate)) {
            var date = this.createDate(currentDate);
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
            render: function () { return renderContainer(_this.viewList); }
        });
    };
    SelectDateRange.prototype.updateConfig = function (config) {
        if (config) {
            Object.assign(this.config, config);
        }
        else {
            var _a = this, viewRangeStart = _a.viewRangeStart, viewRangeEnd = _a.viewRangeEnd, checkedDates = _a.checkedDates, selectMode = _a.selectMode;
            if (viewRangeStart)
                this.config.viewRangeStart = viewRangeStart;
            if (viewRangeEnd)
                this.config.viewRangeEnd = viewRangeEnd;
            if (checkedDates)
                this.config.checkedDates = checkedDates;
            if (this.selectMode)
                this.config.selectMode = selectMode;
        }
    };
    SelectDateRange.prototype.loadStylesheet = function () {
        return this.stylesheetUrl ? h("link", { rel: "stylesheet", type: "text/css", href: this.stylesheetUrl }) : null;
    };
    SelectDateRange.prototype.render = function () {
        return [
            this.loadStylesheet(),
            this.updateViewList().render()
        ];
    };
    Object.defineProperty(SelectDateRange, "watchers", {
        get: function () {
            return {
                "checkedDates": ["parseCheckedDates"],
                "disabledDates": ["parseDisabledDates"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectDateRange, "style", {
        get: function () { return ".sdr-container{font-family:monospace}.month{border:1px solid #ccc;padding:20px}.month-header{text-transform:uppercase;font-weight:700;margin-bottom:5px}.week-header{display:-ms-flexbox;display:flex}.week-header abbr{-ms-flex-positive:1;flex-grow:1;text-align:center}.week-content{display:-ms-flexbox;display:flex}.week-content>.day,.week-content>.empty{-ms-flex-positive:1;flex-grow:1;-ms-flex-preferred-size:80px;flex-basis:80px;text-align:center}.day.disabled{background-color:#ccc}.day.selected{background-color:gold}.day.today{background-color:#e45}"; },
        enumerable: true,
        configurable: true
    });
    return SelectDateRange;
}());
export { SelectDateRange as select_date_range };
