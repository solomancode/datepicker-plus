import { h, r as registerInstance } from './chunk-bd497683.js';
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
    var nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay;
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
var dateStringInRange = function (dateString, dateRange) {
    var _a = getDateComponents(dateString), year = _a[0], month = _a[1], day = _a[2];
    var _b = getDateComponents(dateRange[0]), year0 = _b[0], month0 = _b[1], day0 = _b[2];
    var _c = getDateComponents(dateRange[1]), year1 = _c[0], month1 = _c[1], day1 = _c[2];
    if (day < day0 || day > day1)
        return false;
    if (month < month0 || month > month1)
        return false;
    if (year < year0 || year > year1)
        return false;
    return true;
};
var getCurrentMonthRange = function () {
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return [dateToString(firstDay), dateToString(lastDay)];
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
    month: 'month',
    week: 'week',
    weekend: 'weekend'
};
var _a = getCurrentMonthRange(), DEFAULT_VIEW_RANGE_START = _a[0], DEFAULT_VIEW_RANGE_END = _a[1];
var DEFAULT_CONFIG = {
    selectMode: 'single',
    checkedDates: '',
    viewRangeStart: DEFAULT_VIEW_RANGE_START,
    viewRangeEnd: DEFAULT_VIEW_RANGE_END
};
var renderDate = function (date) {
    var onValueChange = function (event) {
        event.target.checked && date.select();
    };
    return (h("time", { dateTime: date.dateString() }, h("label", null, date.day, h("input", { onChange: function (event) { return onValueChange(event); }, checked: date.checked, type: "checkbox", value: date.dateString() }))));
};
var renderWeekHeader = function (weekDays) {
    if (weekDays === void 0) { weekDays = DEFAULT_WEEK_DAYS; }
    return (h("header", null, weekDays.map(function (_a) {
        var name = _a.name, abbr = _a.abbr, isWeekend = _a.isWeekend;
        return h("abbr", { class: isWeekend && DEFAULT_CLASSES.weekend, title: name }, abbr);
    })));
};
var renderWeek = function (week, renderHeader) {
    if (renderHeader === void 0) { renderHeader = false; }
    return (h("section", { class: DEFAULT_CLASSES.week }, renderHeader && renderWeekHeader(), week.map(renderDate)));
};
var renderMonth = function (month) {
    return (h("section", { class: DEFAULT_CLASSES.month }, h("header", null, DEFAULT_MONTHS[month[0].month - 1].name), monthToWeeks(month).map(function (week, i) { return renderWeek(week, i === 0); })));
};
var composeDateOptions = function (options) {
    return Object.assign({ checked: false, disabled: false }, options);
};
var composeDateHelpers = function (dateString) { return ({
    dateObject: function () { return undefined.stringToDate(dateString); },
    dateString: function () { return dateString; },
    select: function () { this.checked = true; },
    bindEvent: function (event, fn) { this.events[event] = fn; }
}); };
var createDateElement = function (dateString, options) {
    var _a = getDateComponents(dateString), year = _a[0], month = _a[1], day = _a[2];
    var dateOptions = Object.create(Object.assign({ events: {} }, composeDateOptions(options), composeDateHelpers(dateString)));
    var dayOfWeek = new Date(dateString).getDay();
    var props = { year: year, month: month, day: day, dayOfWeek: dayOfWeek };
    return Object.assign(dateOptions, props);
};
var SelectDateRange = /** @class */ (function () {
    function SelectDateRange(hostRef) {
        registerInstance(this, hostRef);
        this.viewList = [];
        this.config = DEFAULT_CONFIG;
        this.checked = {};
    }
    SelectDateRange.prototype.parseCheckedDates = function (dates) {
        var _this = this;
        if (typeof dates === 'string') {
            dates = JSON.parse(dates);
        }
        dates.forEach(function (date) { return _this.checked[date] = true; });
    };
    SelectDateRange.prototype.componentWillLoad = function () {
        this.parseCheckedDates(this.checkedDates);
        this.updateConfig();
    };
    SelectDateRange.prototype.isCheckedDate = function (dateString) {
        if (this.config.selectMode === 'range') {
            var range = Object.keys(this.checked);
            return dateStringInRange(dateString, range);
        }
        else {
            return (dateString in this.checked);
        }
    };
    SelectDateRange.prototype.dispatchOnSelect = function (target, dateString, date) {
        if ('onSelect' in target.events) {
            return target.events.onSelect(dateString, date);
        }
    };
    SelectDateRange.prototype.bindOnSelect = function (date) {
        if (this.onDateSelect) {
            date.bindEvent('onSelect', this.onDateSelect);
        }
    };
    SelectDateRange.prototype.createDate = function (date) {
        var dateString = dateToString(date);
        var dateElement = createDateElement(dateString);
        this.bindOnSelect(dateElement);
        var isChecked = this.isCheckedDate(dateString);
        if (isChecked) {
            var canSelect = this.dispatchOnSelect(dateElement, dateString, date);
            if (canSelect !== false)
                dateElement.select();
        }
        return dateElement;
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
        this.viewList.push(monthDates);
        return Object.create({
            render: function () { return _this.viewList.map(renderMonth); }
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
    SelectDateRange.prototype.render = function () {
        return this.updateViewList().render();
    };
    Object.defineProperty(SelectDateRange, "watchers", {
        get: function () {
            return {
                "checkedDates": ["parseCheckedDates"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectDateRange, "style", {
        get: function () { return ".month{border:1px double;margin-bottom:2px}"; },
        enumerable: true,
        configurable: true
    });
    return SelectDateRange;
}());
export { SelectDateRange as select_date_range };
