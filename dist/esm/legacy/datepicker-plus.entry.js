import { h, r as registerInstance, c as createEvent } from './chunk-4f500da2.js';
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
    var _a = sortDates([dateString0, dateString1]), start = _a[0], end = _a[1];
    var rangeDates = [];
    var currentDateString = getNextDay(start);
    while (currentDateString !== end) {
        if (rangeDates.length > 3000)
            openGithubIssue({ title: 'Memory leak @ getDatesBetween', label: 'bug', body: JSON.stringify({ dateString0: dateString0, dateString1: dateString1 }, null, 2) });
        rangeDates.push(currentDateString);
        currentDateString = getNextDay(currentDateString);
    }
    return rangeDates;
};
var sortDates = function (_a) {
    var dateString0 = _a[0], dateString1 = _a[1];
    var dt0 = stringToDate(dateString0);
    var dt1 = stringToDate(dateString1);
    return (dt0.valueOf() - dt1.valueOf()) > 0 ? [dateString1, dateString0] : [dateString0, dateString1];
};
var dateOffset = function (date0, date1) {
    return Math.ceil((date0.getTime() - date1.getTime()) / 86400000);
};
var openGithubIssue = function (_a) {
    var title = _a.title, body = _a.body, label = _a.label;
    var tl = 'title=' + encodeURIComponent(title);
    var lb = 'labels=' + encodeURIComponent(label);
    var bd = 'body=' + encodeURIComponent(body);
    throw ("Stopped to prevent memory leak.\n\n🐞 Create a new issue:\n" +
        ("https://github.com/solomancode/datepicker-plus/issues/new?" + lb + "&" + tl + "&" + bd));
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
    checkbox: 'checkbox'
};
var DEFAULT_CONFIG = {
    selectMode: 'range',
    selected: [],
    disabled: [],
    selectScope: 0,
    viewRange: getCurrentMonthRange()
};
var DatepickerPlusDate = function (_a) {
    var date = _a.date;
    var onChange = function (e) {
        var dateString = date.dateString();
        var _a = date.datepickerPlus, select = _a.select, deselect = _a.deselect;
        if (e.target.checked) {
            date.datepickerPlus.activateSelectScope(date);
            select(dateString);
        }
        else {
            date.datepickerPlus.deactivateSelectScope();
            deselect(dateString);
        }
    };
    return (h("time", { part: "day", class: date.classListString, dateTime: date.dateString() }, h("label", null, date.day, h("input", { ref: function (el) { return date.el = el; }, onChange: function (e) { return onChange(e); }, checked: date.checked, disabled: date.disabled, class: DEFAULT_CLASSES.checkbox, type: "checkbox", value: date.dateString() }))));
};
function renderDate(date) {
    return h(DatepickerPlusDate, { date: date });
}
function renderWeekHeader(weekDays) {
    if (weekDays === void 0) { weekDays = DEFAULT_WEEK_DAYS; }
    return (h("header", { class: DEFAULT_CLASSES.weekHeader, part: "week-header" }, weekDays.map(function (_a) {
        var name = _a.name, abbr = _a.abbr, isWeekend = _a.isWeekend;
        return h("abbr", { class: isWeekend && DEFAULT_CLASSES.weekend, title: name }, abbr);
    })));
}
function renderEmpty(offset) {
    var nodes = [];
    while (offset) {
        nodes.push(h("span", { class: DEFAULT_CLASSES.empty }));
        offset--;
    }
    return nodes;
}
function renderWeek(week, renderHeader) {
    if (renderHeader === void 0) { renderHeader = false; }
    return (h("section", { part: "week", class: DEFAULT_CLASSES.week }, renderHeader && renderWeekHeader(), h("section", { class: DEFAULT_CLASSES.weekContent }, renderEmpty(week[0].dayOfWeek), week.map(renderDate), renderEmpty(6 - week[week.length - 1].dayOfWeek))));
}
function renderMonth(month) {
    return (h("section", { part: "month", class: DEFAULT_CLASSES.month }, h("header", { class: DEFAULT_CLASSES.monthHeader, part: "month-header" }, DEFAULT_MONTHS[month[0].month - 1].name), h("section", { class: DEFAULT_CLASSES.monthContent }, monthToWeeks(month).map(function (week, i) { return renderWeek(week, i === 0); }))));
}
function renderContainer(dates, stylesheetUrl) {
    return ([
        // theme stylesheet
        stylesheetUrl ? h("link", { rel: "stylesheet", type: "text/css", href: stylesheetUrl }) : null,
        // contents
        h("section", { class: "dpp-container", part: "dpp-container" }, dates.map(function (month) { return renderMonth(month); }))
    ]);
}
var DYNAMIC_CLASSES = {
    today: 'today',
    rangeStart: 'range-start',
    rangeEnd: 'range-end',
    connector: 'connector'
};
var today = function (dateElement, setClass) {
    var isToday = dateElement.offset() === 0;
    if (isToday)
        setClass(DYNAMIC_CLASSES.today);
    return isToday;
};
var tomorrow = function (dateElement) { return dateElement.offset() === 1; };
var yesterday = function (dateElement) { return dateElement.offset() === -1; };
var past = function (dateElement) { return dateElement.offset() < 0; };
var future = function (dateElement) { return dateElement.offset() > 0; };
/**
 * Range start date
 */
var rangeStart = function (dateElement, setClass) {
    var rangeStart = dateElement.rangeIndex === 0;
    if (rangeStart)
        setClass(DYNAMIC_CLASSES.rangeStart);
    return rangeStart;
};
/**
 * Range end date
 */
var rangeEnd = function (dateElement, setClass) {
    if (dateElement.rangeEnd)
        setClass(DYNAMIC_CLASSES.rangeEnd);
    return dateElement.rangeEnd;
};
/**
 * A connector is a date between date start and date end
 * in a range select mode.
 */
var connector = function (dateElement, setClass) {
    var isConnector = dateElement.rangeIndex > 0 && (!dateElement.rangeEnd);
    if (isConnector)
        setClass(DYNAMIC_CLASSES.connector);
    return isConnector;
};
var tags = /*#__PURE__*/ Object.freeze({
    today: today,
    tomorrow: tomorrow,
    yesterday: yesterday,
    past: past,
    future: future,
    rangeStart: rangeStart,
    rangeEnd: rangeEnd,
    connector: connector
});
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
    offset: function () {
        var date = this.dateObject();
        var now = new Date();
        return dateOffset(date, now);
    }
}); };
var composeDateClassList = function () { return ({
    classListString: DEFAULT_CLASSES.day,
    updateClassListString: function () {
        var date = this;
        var classList = [
            DEFAULT_CLASSES.day,
            date.disabled && DEFAULT_CLASSES.disabled,
            date.checked && DEFAULT_CLASSES.selected
        ];
        for (var tag in tags) {
            var assertion = tags[tag];
            assertion(date, function (c) { return classList.push(c); }) && Object.defineProperty(date.tags, tag, { value: true });
        }
        return this.classListString = classList.filter(function (c) { return c; }).join(' ');
    }
}); };
var createdDateElements = {
/**
 * CREATED DATE ELEMENTS...
 */
};
function createDateElement(_a) {
    var dateString = _a.dateString, options = _a.options, datepickerPlus = _a.datepickerPlus;
    var _b = getDateComponents(dateString), year = _b[0], month = _b[1], day = _b[2];
    var dateOptions = Object.create(Object.assign({ tags: {}, datepickerPlus: datepickerPlus,
        createdDateElements: createdDateElements }, composeDateOptions(options), composeDateHelpers(dateString), composeDateClassList()));
    if (dateString in createdDateElements) {
        var dateElement_1 = createdDateElements[dateString];
        Object.assign(dateElement_1, dateOptions);
        return dateElement_1;
    }
    var dayOfWeek = new Date(dateString).getDay();
    var props = { year: year, month: month, day: day, dayOfWeek: dayOfWeek };
    var dateElement = Object.assign(dateOptions, props);
    dateElement.updateClassListString();
    Object.defineProperty(createdDateElements, dateString, { value: dateElement });
    return dateElement;
}
var DatepickerPlus = /** @class */ (function () {
    function DatepickerPlus(hostRef) {
        var _this = this;
        registerInstance(this, hostRef);
        this.plusConfig = DEFAULT_CONFIG;
        this.selected = [];
        this.disabled = [];
        this.rangeStart = null;
        /**
         * Backup disabled before scoping...
         */
        this._disabled = [];
        this.unfoldTag = function (tag) {
            if (!(tag in tags))
                return [tag];
            return _this.viewList.map(function (month) { return month.filter(function (dateElement) { return (tag in dateElement.tags); }); }).reduce(function (p, n) { return p.concat(n); }).map(function (el) { return el.dateString(); });
        };
        this.addRangeMark = function (dateString) {
            if (_this.rangeStart === null) {
                _this.rangeStart = dateString;
                _this.selected = [dateString];
                _this.onDateSelect.emit(_this.getDateElement(dateString));
            }
            else if (_this.rangeStart !== dateString) {
                var start = _this.rangeStart;
                var end = dateString;
                var inBetween = getDatesBetween(start, end);
                // TODO: inBetween +class 'connector'
                var fullRange = [start].concat(inBetween, [end]);
                var hasDisabled = fullRange.some(function (dt) {
                    var dateElement = _this.getDateElement(dt);
                    if (dateElement && dateElement.disabled)
                        return true;
                });
                if (hasDisabled) {
                    _this.rangeStart = end;
                    _this.selected = [end];
                    _this.onDateSelect.emit(_this.getDateElement(end));
                }
                else {
                    _this.rangeStart = null;
                    _this.selected = fullRange;
                    _this.onRangeSelect.emit(fullRange);
                }
            }
        };
        this.activateSelectScope = function (dateElement) {
            var selectedDate = dateElement.dateObject();
            var scope = _this.plusConfig.selectScope;
            if (scope > 0 && !_this.rangeStart) {
                _this._disabled = _this.disabled;
                var locked = _this.viewList.reduce(function (p, n) { return p.concat(n); }).map(function (dateElement) {
                    var offset = dateOffset(selectedDate, dateElement.dateObject());
                    return Math.abs(offset) > scope ? dateElement.dateString() : false;
                }).filter(function (d) { return d; });
                _this.disabled = locked;
            }
        };
        this.deactivateSelectScope = function () {
            _this.disabled = _this._disabled;
        };
        this.resetRangeMarks = function () {
            _this.rangeStart = null;
            _this.selected = [];
        };
        this.select = function (dateString) {
            var dateElement = _this.getDateElement(dateString);
            if (dateElement) {
                switch (_this.plusConfig.selectMode) {
                    case 'single':
                        _this.selected = [dateString];
                        _this.onDateSelect.emit(dateElement);
                        break;
                    case 'multiple':
                        _this.selected = _this.selected.concat([dateString]);
                        _this.onDateSelect.emit(dateElement);
                        break;
                    case 'range':
                        _this.addRangeMark(dateString);
                        break;
                }
            }
        };
        this.deselect = function (dateString) {
            var dateElement = _this.getDateElement(dateString);
            if (dateElement) {
                if (_this.plusConfig.selectMode === 'range') {
                    _this.resetRangeMarks();
                }
                else {
                    _this.selected = _this.selected.filter(function (dt) { return dt !== dateString; });
                }
                _this.onDateDeselect.emit(dateElement);
            }
        };
        this.unfoldSelected = function (selected, selectMode) {
            var unfolded = selected.map(_this.unfoldTag).reduce(function (p, n) { return p.concat(n); });
            return selectMode === 'range' ? [unfolded[0], unfolded[unfolded.length - 1]] : unfolded;
        };
        this.getDateElement = function (dateString) {
            if (dateString in createdDateElements) {
                return createdDateElements[dateString];
            }
            else {
                return null;
            }
        };
        this.MemProtect = 0;
        this.createDate = function (date) {
            var dateString = dateToString(date);
            var dateElement = createDateElement({
                dateString: dateString,
                datepickerPlus: _this
            });
            return dateElement;
        };
        this.onDateSelect = createEvent(this, "onDateSelect", 7);
        this.onDateDeselect = createEvent(this, "onDateDeselect", 7);
        this.onRangeSelect = createEvent(this, "onRangeSelect", 7);
    }
    DatepickerPlus.prototype.parseSelected = function (next, current) {
        var _this = this;
        var rangeMode = this.plusConfig.selectMode === 'range';
        var currentLastIndex = current.length - 1;
        var nextLastIndex = next.length - 1;
        // DESELECT CURRENT
        current.forEach(function (dateString, index) {
            var rangeEnd = index === currentLastIndex ? { rangeEnd: null } : {};
            _this.updateDateOptions(dateString, Object.assign({ checked: false }, (rangeMode ? Object.assign({ rangeIndex: null }, rangeEnd) : {})));
        });
        // SELECT NEXT
        next.forEach(function (dateString, index) {
            var rangeEnd = index === nextLastIndex ? { rangeEnd: true } : {};
            _this.updateDateOptions(dateString, Object.assign({ checked: true }, (rangeMode ? Object.assign({ rangeIndex: index }, rangeEnd) : {})));
        });
    };
    DatepickerPlus.prototype.parseDisabled = function (next, current) {
        var _this = this;
        // ENABLE CURRENT
        current.forEach(function (dateString) { return _this.updateDateOptions(dateString, { disabled: false }); });
        // DISABLE NEXT
        next = next.map(function (tag) { return _this.unfoldTag(tag); }).reduce(function (p, n) { return p.concat(n); });
        next.forEach(function (dateString) { return _this.updateDateOptions(dateString, { disabled: true }); });
    };
    DatepickerPlus.prototype.updateDateOptions = function (dateString, options) {
        var dateElement = this.getDateElement(dateString);
        if (dateElement) {
            Object.assign(dateElement, options);
            dateElement.updateClassListString();
        }
    };
    DatepickerPlus.prototype.updateConfig = function (config) {
        this.parseViewRange(config.viewRange);
        this.unfoldSelected(config.selected, config.selectMode).forEach(this.select);
        this.disabled = this.plusConfig.disabled;
        this._disabled = this.plusConfig.disabled;
    };
    DatepickerPlus.prototype.componentWillLoad = function () {
        this.plusConfig = Object.assign({}, DEFAULT_CONFIG, this.plusConfig);
    };
    DatepickerPlus.prototype.protectMemLeak = function () {
        this.MemProtect++;
        if (this.MemProtect > 3000) {
            var now = '#### ' + new Date().toDateString();
            var CB = '\`\`\`';
            var config = JSON.stringify(this.plusConfig, null, 2);
            var body = now + '\n' + CB + config + CB;
            openGithubIssue({
                title: 'Memory leak @ render while loop',
                body: body,
                label: 'bug'
            });
        }
    };
    DatepickerPlus.prototype.parseViewRange = function (viewRange) {
        var lastIndex = null;
        var monthDates = [];
        var viewList = [];
        var _a = viewRange.map(stringToDate), currentDate = _a[0], endDate = _a[1];
        var stopDate = getNextDay(endDate);
        while (!isSameDate(currentDate, stopDate)) {
            this.protectMemLeak();
            var date = this.createDate(currentDate);
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
    };
    DatepickerPlus.prototype.render = function () {
        console.count('RENDER:');
        return renderContainer(this.viewList, this.plusConfig.stylesheetUrl);
    };
    Object.defineProperty(DatepickerPlus, "watchers", {
        get: function () {
            return {
                "selected": ["parseSelected"],
                "disabled": ["parseDisabled"],
                "plusConfig": ["updateConfig"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatepickerPlus, "style", {
        get: function () { return ".dpp-container{font-family:monospace}.month{border:1px solid #ccc;padding:20px}.month-header{text-transform:uppercase;font-weight:700;margin-bottom:5px}.week-header{display:-ms-flexbox;display:flex}.week-header abbr{-ms-flex-positive:1;flex-grow:1;text-align:center}.week-content{display:-ms-flexbox;display:flex}.week-content>.day,.week-content>.empty{-ms-flex-positive:1;flex-grow:1;-ms-flex-preferred-size:80px;flex-basis:80px;text-align:center}.day.disabled{background-color:#ccc}.day.selected{background-color:gold}.day.today{background-color:#e45}"; },
        enumerable: true,
        configurable: true
    });
    return DatepickerPlus;
}());
export { DatepickerPlus as datepicker_plus };
