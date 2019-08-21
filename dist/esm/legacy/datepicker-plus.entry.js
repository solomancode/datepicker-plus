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
var dateStringInRange = function (dateString, dateRange) {
    var _a = sortDates(dateRange), start = _a[0], end = _a[1];
    var targetDate = new Date(dateString);
    var startOffset = dateOffset(targetDate, new Date(start));
    var endOffset = dateOffset(targetDate, new Date(end));
    return startOffset >= 0 && endOffset <= 0;
};
var getCurrentMonthRange = function () {
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return [dateToString(firstDay), dateToString(lastDay)];
};
var unfoldRange = function (dateString0, dateString1) {
    if (dateString0 === dateString1)
        return [];
    var _a = sortDates([dateString0, dateString1]), start = _a[0], end = _a[1];
    var rangeDates = [];
    var currentDateString = getNextDay(start);
    while (currentDateString !== end) {
        if (rangeDates.length > 3000)
            openGithubIssue({ title: 'Memory leak @ getDatesBetween', label: 'bug', body: JSON.stringify({ dateString0: dateString0, dateString1: dateString1 }, null, 2) });
        rangeDates.push(currentDateString);
        currentDateString = getNextDay(currentDateString);
    }
    return [start].concat(rangeDates, [end]);
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
var patchArray = function (target, source) {
    if (target === void 0) { target = []; }
    return source.map(function (itm, i) { return target[i] || itm; });
};
var groupByMonth = function (dateString) {
    var map = Object.create({
        flatten: function () {
            var flat = [];
            for (var index = 1; index <= 12; index++) {
                if (index in this)
                    flat.push(map[index]);
            }
            return flat;
        }
    });
    dateString.forEach(function (dateString) {
        var _a = getDateComponents(dateString), month = _a[1];
        if (month in map) {
            map[month].push(dateString);
        }
        else {
            map[month] = [dateString];
        }
    });
    return map;
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
var getScopeRange = function (scopeCenter, scopeSize) {
    var start = new Date(scopeCenter);
    var startDay = start.getDate();
    start.setDate(startDay - scopeSize);
    var end = new Date(scopeCenter);
    var endDate = end.getDate();
    end.setDate(endDate + scopeSize);
    return [start, end].map(function (date) { return dateToString(date); });
};
var generateDateClass = function (dateElement) {
    var tags = Object.keys(dateElement.tags);
    var classes = [
        DEFAULT_CLASSES.day,
        dateElement.checked ? DEFAULT_CLASSES.selected : null,
        dateElement.disabled ? DEFAULT_CLASSES.disabled : null
    ].concat(tags.filter(function (tag) { return dateElement.tags[tag] === true; }));
    return classes.filter(function (c) { return c; }).join(' ');
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
var DEFAULT_CONFIG = {
    selectMode: 'range',
    selected: [],
    disabled: [],
    selectScopeSize: 0,
    weekHeader: 'per-month',
    viewRange: getCurrentMonthRange(),
    i18n: {
        months: DEFAULT_MONTHS,
        weekDays: DEFAULT_WEEK_DAYS
    }
};
function registerDate(created, dateString) {
    var _a;
    var dayOfWeek = new Date(dateString).getDay();
    var _b = getDateComponents(dateString), year = _b[0], month = _b[1], day = _b[2];
    var dateElement = Object.create({
        tags: {},
        checked: false,
        disabled: false,
        year: year,
        month: month,
        day: day,
        dateString: dateString,
        dayOfWeek: dayOfWeek
    });
    if (dateString in created)
        return created;
    return Object.assign({}, created, (_a = {}, _a[dateString] = dateElement, _a));
}
var offsetFromToday = function (dateString) { return dateOffset(new Date(dateString), new Date()); };
var today = function (dateElement) { return offsetFromToday(dateElement.dateString) === 0; };
var tomorrow = function (dateElement) { return offsetFromToday(dateElement.dateString) === 1; };
var yesterday = function (dateElement) { return offsetFromToday(dateElement.dateString) === -1; };
var past = function (dateElement) { return offsetFromToday(dateElement.dateString) < 0; };
var future = function (dateElement) { return offsetFromToday(dateElement.dateString) > 0; };
/**
 * Range start date
 */
var rangeStart = function (dateElement) {
    var rangeStart = dateElement.rangeIndex === 0;
    return rangeStart;
};
/**
 * Range end date
 */
var rangeEnd = function (dateElement) {
    var rangeIndex = dateElement.rangeIndex, rangeEndIndex = dateElement.rangeEndIndex;
    return (rangeEndIndex > 0 && rangeIndex === rangeEndIndex);
};
/**
 * A connector is a date between date start and date end
 * in a range select mode.
 */
var connector = function (dateElement) {
    var isConnector = dateElement.rangeIndex > 0 && (dateElement.rangeEndIndex !== dateElement.rangeIndex);
    return isConnector;
};
var tags = {
    today: today,
    rangeStart: rangeStart,
    rangeEnd: rangeEnd,
    connector: connector,
    tomorrow: tomorrow,
    yesterday: yesterday,
    past: past,
    future: future
};
function renderDate(date) {
    var _this = this;
    var onChange = function (e) {
        return e.target.checked ? _this.select(date.dateString) : _this.deselect(date.dateString);
    };
    return (h("time", { part: "day", class: generateDateClass(date), dateTime: date.dateString }, h("label", null, date.day, h("input", { checked: date.checked, disabled: date.disabled, onChange: onChange.bind(this), class: DEFAULT_CLASSES.checkbox, type: "checkbox", value: date.dateString }))));
}
function renderWeekHeader(weekDays) {
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
function renderWeek(week, renderHeader, weekDays) {
    return (h("section", { part: "week", class: DEFAULT_CLASSES.week }, renderHeader && renderWeekHeader(weekDays), h("section", { class: DEFAULT_CLASSES.weekContent }, renderEmpty(week[0].dayOfWeek), week.map(renderDate.bind(this)), renderEmpty(6 - week[week.length - 1].dayOfWeek))));
}
function renderMonthHeader(dayFirst, months) {
    return (h("header", { class: DEFAULT_CLASSES.monthHeader, part: "month-header" }, h("span", { class: DEFAULT_CLASSES.monthName }, months[dayFirst.month - 1].name), dayFirst.month - 1 === 0 && h("span", { class: DEFAULT_CLASSES.year }, dayFirst.year)));
}
function renderMonth(month, config) {
    var _this = this;
    var renderHeader = function (i) { return config.weekHeader === 'per-month' && i === 0; };
    return (h("section", { part: "month", class: DEFAULT_CLASSES.month }, renderMonthHeader(month[0], config.i18n.months), h("section", { class: DEFAULT_CLASSES.monthContent }, monthToWeeks(month).map(function (week, i) { return renderWeek.call(_this, week, renderHeader(i), config.i18n.weekDays); }))));
}
function renderContainer(dates, config) {
    var _this = this;
    var renderSingleHeader = function () { return config.weekHeader === 'single' && h("header", { class: DEFAULT_CLASSES.singleHeader }, renderWeekHeader(config.i18n.weekDays)); };
    return ([
        // theme stylesheet
        config.stylesheetUrl ? h("link", { rel: "stylesheet", type: "text/css", href: config.stylesheetUrl }) : null,
        // contents
        h("section", { class: config.stylesheetUrl ? '' : 'dpp', part: "dpp-container" }, [
            renderSingleHeader() || null,
            dates.map(function (month) { return renderMonth.call(_this, month, config); })
        ])
    ]);
}
var DatepickerPlus = /** @class */ (function () {
    function DatepickerPlus(hostRef) {
        var _this = this;
        registerInstance(this, hostRef);
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
        this.activeScope = null;
        this.unfoldDisabledList = function (disabled) {
            if (!disabled.length)
                return [];
            return disabled.map(function (tag) { return _this.unfoldTag(tag, tags); }).reduce(function (p, n) { return p.concat(n); });
        };
        this.patchConfigLists = function () {
            var _a = DEFAULT_CONFIG.i18n, default_months = _a.months, default_weekDays = _a.weekDays;
            var _b = _this.plusConfig.i18n, months = _b.months, weekDays = _b.weekDays;
            _this.plusConfig.i18n.months = patchArray(months, default_months);
            _this.plusConfig.i18n.weekDays = patchArray(weekDays, default_weekDays);
        };
        this.select = function (dateString) {
            var selectMode = _this.plusConfig.selectMode;
            var selectList = [];
            if (selectMode === 'single') {
                selectList = [dateString];
            }
            else if (selectMode === 'multiple') {
                selectList = _this.selected.concat([dateString]);
            }
            else if (selectMode === 'range') {
                if (_this.selected.includes(dateString)) {
                    selectList = [];
                }
                else if (_this.selected.length === 1) {
                    selectList = unfoldRange(_this.selected[0], dateString);
                }
                else {
                    selectList = [dateString];
                }
            }
            var hasDisabled = _this.checkIfHasDisabled(selectList, _this.disabled);
            if (hasDisabled)
                return _this.viewElements;
            var scopeSize = _this.plusConfig.selectScopeSize;
            if (selectMode === 'range' && scopeSize > 0) {
                if (!_this.activeScope) {
                    _this.activeScope = _this.generateScope(_this.viewElements, _this.disabled);
                    _this.activeScope.activate(dateString, scopeSize);
                }
                else {
                    _this.activeScope.deactivate();
                }
            }
            var selectedViewElements = _this.selectMultipleDates(selectList, _this.viewElements);
            _this.viewElements = _this.updateTags(tags, selectedViewElements);
            _this.selected = selectList;
            _this.onDateSelect.emit(_this.selected);
            if (selectMode === 'range' && _this.selected.length > 1)
                _this.onRangeSelect.emit(_this.selected);
        };
        this.deselect = function (dateString) {
            var selectMode = _this.plusConfig.selectMode;
            var selectList = [];
            if (selectMode === 'multiple') {
                selectList = _this.selected.filter(function (s) { return s !== dateString; });
            }
            if (selectMode === 'range') {
                if (_this.activeScope)
                    _this.activeScope.deactivate();
            }
            _this.viewElements = _this.selectMultipleDates(selectList, _this.viewElements);
            _this.selected = selectList;
        };
        this.unfoldTag = function (tag, tags) {
            if (!(tag in tags))
                return [tag];
            return _this.viewElements.map(function (month) { return month.filter(function (dateElement) { return dateElement.tags[tag] === true; }); }).reduce(function (p, n) { return p.concat(n); }).map(function (dateElement) { return dateElement.dateString; });
        };
        this.onDateSelect = createEvent(this, "onDateSelect", 7);
        this.onDateDeselect = createEvent(this, "onDateDeselect", 7);
        this.onRangeSelect = createEvent(this, "onRangeSelect", 7);
    }
    DatepickerPlus.prototype.updateViewElements = function (next) {
        var _this = this;
        this.registerViewDates(next);
        this.viewElements = next.map(function (month) { return month.map(function (dateString) {
            return _this.registered[dateString];
        }); });
    };
    DatepickerPlus.prototype.componentWillLoad = function () {
        this.plusConfig = Object.assign({}, DEFAULT_CONFIG, this.plusConfig);
        this.patchConfigLists();
        this.viewList = this.createViewList(this.plusConfig.viewRange);
        this.updateTags(tags, this.viewElements);
        this.plusConfig.disabled = this.unfoldDisabledList(this.plusConfig.disabled);
        this.disableMultipleDates(this.plusConfig.disabled, this.viewElements);
        this.plusConfig.selected.forEach(this.select);
    };
    DatepickerPlus.prototype.createViewList = function (_a) {
        var start = _a[0], end = _a[1];
        var dates = unfoldRange(start, end);
        return groupByMonth(dates).flatten();
    };
    DatepickerPlus.prototype.registerViewDates = function (viewList) {
        var _this = this;
        return viewList.forEach(function (month) { return month.forEach(function (dateString) {
            var registered = registerDate(_this.registered, dateString);
            _this.registered = registered;
        }); });
    };
    DatepickerPlus.prototype.generateScope = function (viewElements, disabledCache) {
        var _this = this;
        var disabled = [];
        return {
            activate: function (dateString, scopeSize) {
                var scopeRange = getScopeRange(dateString, scopeSize);
                return viewElements.map(function (month) { return month.map(function (dateElement) {
                    var inScope = dateStringInRange(dateElement.dateString, scopeRange);
                    if (inScope) {
                        dateElement.disabled = false;
                    }
                    else {
                        dateElement.disabled = true;
                        _this.disabled.push(dateElement.dateString);
                    }
                    _this.disabled = disabled;
                    return dateElement;
                }); });
            },
            deactivate: function () {
                var disabled = _this.disableMultipleDates(disabledCache, _this.viewElements);
                _this.activeScope = null;
                return disabled;
            }
        };
    };
    DatepickerPlus.prototype.checkIfHasDisabled = function (selected, disabled) {
        var map = {};
        disabled.forEach(function (d) { return map[d] = true; });
        return selected.some(function (s) { return (s in map); });
    };
    DatepickerPlus.prototype.selectMultipleDates = function (dateStringList, viewElements) {
        return viewElements.map(function (month) { return month.map(function (dateElement) {
            dateElement.checked = dateStringList.includes(dateElement.dateString);
            dateElement.rangeIndex = dateElement.checked ? dateStringList.indexOf(dateElement.dateString) : null;
            dateElement.rangeEndIndex = dateElement.checked ? dateStringList.length - 1 : null;
            return dateElement;
        }); });
    };
    DatepickerPlus.prototype.disableMultipleDates = function (dateStringList, viewElements) {
        var disabled = [];
        var withDisabled = viewElements.map(function (month) { return month.map(function (dateElement) {
            var isDisabled = dateStringList.includes(dateElement.dateString);
            dateElement.disabled = isDisabled;
            if (isDisabled)
                disabled.push(dateElement.dateString);
            return dateElement;
        }); });
        this.disabled = disabled;
        return withDisabled;
    };
    DatepickerPlus.prototype.updateTags = function (tags, viewElements) {
        return viewElements.map(function (month) { return month.map(function (dateElement) {
            for (var tag in tags) {
                dateElement.tags[tag] = tags[tag](dateElement);
            }
            return dateElement;
        }); });
    };
    DatepickerPlus.prototype.render = function () {
        return renderContainer.call(this, this.viewElements, this.plusConfig);
    };
    Object.defineProperty(DatepickerPlus, "watchers", {
        get: function () {
            return {
                "viewList": ["updateViewElements"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatepickerPlus, "style", {
        get: function () { return ".dpp{font-family:monospace}.month{border:1px solid #ccc;padding:20px}.dpp .month-header{text-transform:uppercase;font-weight:700;margin-bottom:5px}.dpp .day.selected.rangeStart{background-color:#cddc39}.dpp .day.selected.rangeEnd{background-color:#ff9800}.week-header{display:-ms-flexbox;display:flex}.single-header{padding:5px 20px}.week-header abbr{-ms-flex-positive:1;flex-grow:1;text-align:center}.week-content{display:-ms-flexbox;display:flex}.week-content>.day,.week-content>.empty{-ms-flex-positive:1;flex-grow:1;-ms-flex-preferred-size:80px;flex-basis:80px;text-align:center}.day{position:relative;line-height:30px}.day>label{display:block;width:100%;height:100%;cursor:pointer;-webkit-box-sizing:border-box;box-sizing:border-box}.day.disabled{color:#ccc;background-color:#f8f8f8}.dpp .day.selected{background-color:gold}.dpp .day.highlight{background-color:#7e5}.dpp .day.today{outline:1px solid #ccc}.checkbox{display:none}.month-header{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between}"; },
        enumerable: true,
        configurable: true
    });
    return DatepickerPlus;
}());
export { DatepickerPlus as datepicker_plus };
