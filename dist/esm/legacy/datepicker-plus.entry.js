import { h, r as registerInstance, c as createEvent } from './chunk-fcdf5eaf.js';
var dateToString = function (date) {
    var yyyy = date.getFullYear();
    var month = date.getMonth();
    var mm = (month + 1);
    var dd = date.getDate();
    return NormDt(yyyy + "-" + mm + "-" + dd);
};
var getNextDayString = function (dateString) {
    var next = new Date(dateString);
    next.setDate(next.getDate() + 1);
    return dateToString(next);
};
var getCurrentMonthRange = function () {
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return [dateToString(firstDay), dateToString(lastDay)];
};
// Normalize Date String
var NormDt = function (dateString) {
    return dateString.split('-').map(function (s) { return s.padStart(2, '0'); }).join('-');
};
var unfoldRange = function (dateString0, dateString1) {
    if (dateString0 === dateString1)
        return [];
    var _a = sortDates([dateString0, dateString1]).map(NormDt), start = _a[0], end = _a[1];
    var rangeDates = [];
    var currentDateString = getNextDayString(start);
    while (currentDateString !== end) {
        if (rangeDates.length > 3000)
            openGithubIssue({ title: 'Memory leak @ utils.unfoldRange()', label: 'bug', body: JSON.stringify({ dateString0: dateString0, dateString1: dateString1 }, null, 2) });
        rangeDates.push(currentDateString);
        currentDateString = getNextDayString(currentDateString);
    }
    return [start].concat(rangeDates, [end]);
};
var sortDates = function (_a) {
    var dateString0 = _a[0], dateString1 = _a[1];
    var dt0 = new Date(dateString0);
    var dt1 = new Date(dateString1);
    return (dt0.valueOf() - dt1.valueOf()) > 0 ? [dateString1, dateString0] : [dateString0, dateString1];
};
var dateOffset = function (date0, date1) {
    return Math.ceil((date0.getTime() - date1.getTime()) / 86400000);
};
var patchArray = function (target, source) {
    if (target === void 0) { target = []; }
    return source.map(function (itm, i) { return target[i] || itm; });
};
var groupDates = function (dateStringList) {
    var group = Object.create({
        sorted: { years: [], months: {} },
        // [key: year]: { month: [...days] },
        toArray: function () {
            var _this = this;
            var sorted = [];
            this.sorted.years.forEach(function (year) {
                var month = Object.values(_this[year]);
                if (month.length)
                    sorted = sorted.concat(month);
            });
            return sorted;
        }
    });
    dateStringList.forEach(function (dateString) {
        var date = new Date(dateString);
        var year = date.getFullYear(), month = date.getMonth() + 1;
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
    group.sorted.years = group.sorted.years.sort(function (a, b) { return a - b; });
    for (var year in group.sorted.months) {
        group.sorted.months[year] = group.sorted.months[year].sort(function (a, b) { return a - b; });
    }
    return group;
};
var checkIfValidDateString = function (dateString) {
    var date = new Date(dateString);
    return isNaN(date.getDate()) ? false : true;
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
    },
    layout: 'vertical'
};
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
    var rangeStart = dateElement.getAttr('rangeIndex') === 0;
    return rangeStart;
};
/**
 * Range end date
 */
var rangeEnd = function (dateElement) {
    var rangeIndex = dateElement.getAttr('rangeIndex');
    var rangeEndIndex = dateElement.getAttr('rangeEndIndex');
    return (rangeEndIndex > 0 && rangeIndex === rangeEndIndex);
};
/**
 * A connector is a date between date start and date end
 * in a range select mode.
 */
var connector = function (dateElement) {
    return dateElement.getAttr('rangeIndex') > 0 && (dateElement.getAttr('rangeEndIndex') !== dateElement.getAttr('rangeIndex'));
};
var attributeChecks = {
    today: today,
    rangeStart: rangeStart,
    rangeEnd: rangeEnd,
    connector: connector,
    tomorrow: tomorrow,
    yesterday: yesterday,
    past: past,
    future: future
};
var DateElement = /** @class */ (function () {
    function DateElement(dateString) {
        this.dateString = dateString;
        this.pendingQueue = [];
        /**
         * DATE ATTRIBUTES
         */
        this.attributes = {
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
    DateElement.prototype.hookDOMElement = function (element) {
        var _this = this;
        if (element instanceof HTMLTimeElement) {
            this.DateDOMElement = element;
        }
        else if (element instanceof HTMLInputElement) {
            this.checkboxDOMElement = element;
        }
        this.pendingQueue = this.pendingQueue.filter(function (fn) { return fn.call(_this) === false; });
    };
    DateElement.prototype.updateDateClasses = function () {
        var _this = this;
        if (this.DateDOMElement) {
            this.DateDOMElement.setAttribute('class', DEFAULT_CLASSES.day + ' ' +
                Object.keys(this.attributes)
                    .filter(function (attr) { return _this.attributes[attr] === true; }).join(' '));
            return true;
        }
        else {
            this.pendingQueue.push(this.updateDateClasses);
        }
        return true; // success, remove from queue
    };
    DateElement.prototype.updateCheckboxAttribute = function (attr, value) {
        var _this = this;
        if (this.checkboxDOMElement) {
            this.checkboxDOMElement[attr] = value;
        }
        else {
            this.pendingQueue.push(function () {
                if (!_this.checkboxDOMElement)
                    return false;
                _this.checkboxDOMElement[attr] = value;
                _this.updateDateClasses();
                return true; // success, remove from queue
            });
        }
        this.updateDateClasses();
    };
    DateElement.prototype.updateDOMAttribute = function (attr, value) {
        if (attr === 'checked' || attr === 'disabled') {
            this.updateCheckboxAttribute(attr, value);
        }
        this.updateDateClasses();
    };
    DateElement.prototype.setAttr = function (attr, value) {
        this.attributes[attr] = value;
        this.updateDOMAttribute(attr, value);
    };
    DateElement.prototype.getAttr = function (attr) {
        return this.attributes[attr];
    };
    DateElement.prototype.hasAttr = function (attr) {
        return attr in this.attributes;
    };
    DateElement.prototype.removeAttr = function (attr) {
        delete this.attributes[attr];
        this.updateDateClasses();
    };
    DateElement.prototype.resetRangeAttributes = function () {
        this.removeAttr('rangeIndex');
        this.removeAttr('rangeEndIndex');
        this.removeAttr('rangeStart');
        this.removeAttr('rangeEnd');
        this.removeAttr('connector');
    };
    DateElement.prototype.updateAttributes = function (attributes) {
        for (var attr in attributes) {
            if (attributes.hasOwnProperty(attr)) {
                var attributeCheck = attributes[attr];
                if (attributeCheck(this) === true) {
                    this.setAttr(attr, true);
                }
            }
        }
    };
    return DateElement;
}());
function renderDate(dateElement) {
    var _this = this;
    var onChange = function (e) {
        return e.target.checked ? _this.select(dateElement.dateString) : _this.deselect([dateElement.dateString]);
    };
    var onEnter = function () { return dateElement.getAttr('disabled') === false && _this.highlightON(dateElement.dateString); };
    return (h("time", { part: "day", dateTime: dateElement.dateString, onMouseEnter: onEnter.bind(this), ref: function (element) { return dateElement.hookDOMElement(element); } }, h("label", null, dateElement.day, h("input", { ref: function (element) { return dateElement.hookDOMElement(element); }, onChange: onChange.bind(this), class: DEFAULT_CLASSES.checkbox, type: "checkbox", value: dateElement.dateString }))));
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
    var styles = config.layout === 'horizontal' ? {
        width: (window.innerWidth - 60) + 'px'
    } : {};
    var renderHeader = function (i) { return config.weekHeader === 'per-month' && i === 0; };
    return (h("section", { style: styles, part: "month", class: DEFAULT_CLASSES.month }, renderMonthHeader(month[0], config.i18n.months), h("section", { class: DEFAULT_CLASSES.monthContent }, monthToWeeks(month).map(function (week, i) { return renderWeek.call(_this, week, renderHeader(i), config.i18n.weekDays); }))));
}
function renderContainer(dates, config) {
    var _this = this;
    var styles = config.layout === 'horizontal' ? {
        width: (window.innerWidth * dates.length) + 'px'
    } : {};
    var renderSingleHeader = function () { return config.weekHeader === 'single' && h("header", { class: DEFAULT_CLASSES.singleHeader }, renderWeekHeader(config.i18n.weekDays)); };
    return ([
        // theme stylesheet
        config.stylesheetUrl ? h("link", { rel: "stylesheet", type: "text/css", href: config.stylesheetUrl }) : null,
        // contents
        h("section", { class: (config.stylesheetUrl ? '' : 'dpp ') + config.layout, part: "dpp-container" }, h("section", { style: styles, class: "viewport" }, [
            renderSingleHeader() || null,
            dates.map(function (month) { return renderMonth.call(_this, month, config); })
        ]))
    ]);
}
var DatepickerPlus = /** @class */ (function () {
    function DatepickerPlus(hostRef) {
        var _this = this;
        registerInstance(this, hostRef);
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
        this.unfoldDateStringList = function (disabled) {
            if (!disabled.length)
                return [];
            return disabled.map(function (dateString) {
                return checkIfValidDateString(dateString) ? [dateString] : _this.unfoldAttribute(dateString);
            }).reduce(function (p, n) { return p.concat(n); });
        };
        this.patchConfigLists = function () {
            var _a = DEFAULT_CONFIG.i18n, default_months = _a.months, default_weekDays = _a.weekDays;
            var _b = _this.plusConfig.i18n, months = _b.months, weekDays = _b.weekDays;
            _this.plusConfig.i18n.months = patchArray(months, default_months);
            _this.plusConfig.i18n.weekDays = patchArray(weekDays, default_weekDays);
        };
        this.select = function (dateString) {
            var selectMode = _this.plusConfig.selectMode;
            // generate selected list
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
            // check if has disabled or return prev. state
            var hasDisabled = _this.checkIfHasDisabled(selectList, _this.disabled);
            if (hasDisabled)
                return _this.viewElements;
            // generate select scope if range mode active
            var scopeSize = _this.plusConfig.selectScopeSize;
            if (selectMode === 'range' && scopeSize > 0) {
                if (!_this.activeScope) {
                    _this.activeScope = _this.generateScope(_this.disabled);
                    _this.activeScope.activate(dateString, scopeSize);
                }
                else {
                    _this.activeScope.deactivate();
                }
            }
            // reset selected
            _this.deselect(_this.selected);
            // apply selected
            _this.selectMultipleDates(selectList);
            // emit
            _this.onDateSelect.emit(_this.selected);
            if (selectMode === 'range' && _this.selected.length > 1)
                _this.onRangeSelect.emit(_this.selected);
        };
        this.deselect = function (dateStringList) {
            var selectMode = _this.plusConfig.selectMode;
            if (selectMode === 'range') {
                dateStringList = _this.selected;
                if (_this.activeScope && dateStringList.length === 1)
                    _this.activeScope.deactivate();
            }
            dateStringList.forEach(function (dateString) {
                var dateElement = _this.getDateElement(dateString);
                dateElement.setAttr('checked', false);
                // clean range attributes
                if (selectMode === 'range') {
                    dateElement.resetRangeAttributes();
                }
                dateElement.updateDateClasses();
            });
            _this.selected = _this.selected.filter(function (s) { return !(dateStringList.includes(s)); });
            _this.clearHighlighted();
        };
        this.getDateElement = function (dateString) {
            return _this.dateRegistry[dateString];
        };
        this.unfoldAttribute = function (attr) {
            var unfolded = [];
            _this.viewElements
                .reduce(function (p, n) { return p.concat(n); })
                .forEach(function (dateElement) {
                if (dateElement.getAttr(attr)) {
                    unfolded.push(dateElement.dateString);
                }
            });
            return unfolded;
        };
        this.registerDate = function (dateString) {
            if (dateString in _this.dateRegistry)
                return _this.dateRegistry[dateString];
            var dateElement = new DateElement(dateString);
            _this.dateRegistry[dateString] = dateElement;
            return dateElement;
        };
        this.onDateSelect = createEvent(this, "onDateSelect", 7);
        this.onDateDeselect = createEvent(this, "onDateDeselect", 7);
        this.onRangeSelect = createEvent(this, "onRangeSelect", 7);
    }
    DatepickerPlus.prototype.componentWillLoad = function () {
        this.plusConfig = Object.assign({}, DEFAULT_CONFIG, this.plusConfig);
        this.patchConfigLists();
        if (this.plusConfig.layout === 'horizontal') {
            this.plusConfig.weekHeader = 'per-month';
        }
    };
    DatepickerPlus.prototype.componentDidLoad = function () {
        var _this = this;
        /**
         * UNFOLD DATE STRING RANGE
         * CREATE & REGISTER
         * UPDATE VIEW ELEMENTS
         */
        var viewRange = this.unfoldViewRange(this.plusConfig.viewRange);
        var createdElements = viewRange.map(function (month) { return month.map(_this.registerDate); });
        this.viewElements = createdElements;
        // disable
        var disabled = this.unfoldDateStringList(this.plusConfig.disabled);
        this.disableMultipleDates(disabled);
        // select
        this.plusConfig.selected.forEach(this.select);
    };
    DatepickerPlus.prototype.unfoldViewRange = function (_a) {
        var start = _a[0], end = _a[1];
        var dates = unfoldRange(start, end);
        return groupDates(dates).toArray();
    };
    DatepickerPlus.prototype.generateScope = function (disabledSnapshot) {
        var _this = this;
        return {
            activate: function (dateString, scopeSize) {
                var _a = getScopeRange(dateString, scopeSize), scopeStart = _a[0], scopeEnd = _a[1];
                var _b = _this.plusConfig.viewRange, viewStart = _b[0], viewEnd = _b[1];
                var disableTargets = unfoldRange(viewStart, scopeStart).concat(unfoldRange(scopeEnd, viewEnd));
                _this.disableMultipleDates(disableTargets);
            },
            deactivate: function () {
                _this.enableMultipleDates(_this.disabled);
                _this.disableMultipleDates(disabledSnapshot);
                _this.activeScope = null;
            }
        };
    };
    DatepickerPlus.prototype.highlightON = function (dateString) {
        var _this = this;
        if (this.plusConfig.selectMode === 'range' && this.selected.length === 1) {
            this.clearHighlighted();
            this.highlighted = unfoldRange(this.selected[0], dateString);
            this.highlighted.forEach(function (dateString) {
                var dateElement = _this.getDateElement(dateString);
                dateElement.setAttr('highlighted', true);
            });
        }
    };
    DatepickerPlus.prototype.clearHighlighted = function () {
        var _this = this;
        this.highlighted.forEach(function (dateString) {
            var dateElement = _this.getDateElement(dateString);
            if (dateElement)
                dateElement.removeAttr('highlighted');
        });
        this.highlighted = [];
    };
    DatepickerPlus.prototype.checkIfHasDisabled = function (selected, disabled) {
        var map = {};
        disabled.forEach(function (d) { return map[d] = true; });
        return selected.some(function (s) { return (s in map); });
    };
    DatepickerPlus.prototype.selectMultipleDates = function (dateStringList) {
        var _this = this;
        dateStringList.forEach(function (dateString) {
            var dateElement = _this.getDateElement(dateString);
            if (!dateElement)
                return;
            dateElement.setAttr('checked', true);
            if (dateStringList.length > 1) {
                var checked = dateElement.getAttr('checked');
                dateElement.setAttr('rangeIndex', checked ? dateStringList.indexOf(dateElement.dateString) : null);
                dateElement.setAttr('rangeEndIndex', checked ? dateStringList.length - 1 : null);
            }
            if (_this.plusConfig.selectMode === 'range') {
                var rangeStart_1 = attributeChecks.rangeStart, rangeEnd_1 = attributeChecks.rangeEnd, connector_1 = attributeChecks.connector;
                dateElement.updateAttributes({ rangeStart: rangeStart_1, rangeEnd: rangeEnd_1, connector: connector_1 });
            }
        });
        this.selected = dateStringList;
    };
    DatepickerPlus.prototype.disableMultipleDates = function (dateStringList) {
        var _this = this;
        this.disabled = dateStringList.filter(function (dateString) {
            var dateElement = _this.getDateElement(dateString);
            if (!dateElement)
                return false;
            dateElement.setAttr('disabled', true);
            return true;
        });
    };
    DatepickerPlus.prototype.enableMultipleDates = function (dateStringList) {
        var _this = this;
        dateStringList.forEach(function (dateString) {
            var dateElement = _this.getDateElement(dateString);
            if (!dateElement)
                return;
            dateElement.setAttr('disabled', false);
        });
        this.disabled = this.disabled.filter(function (dateString) { return !dateStringList.includes(dateString); });
    };
    DatepickerPlus.prototype.render = function () {
        console.count('RENDER...');
        return renderContainer.call(this, this.viewElements, this.plusConfig);
    };
    Object.defineProperty(DatepickerPlus, "style", {
        get: function () { return ".dpp{font-family:monospace}.horizontal{overflow-x:scroll}.horizontal .month{display:inline-block}.month{border:1px solid #ccc;padding:20px}.dpp .month-header{text-transform:uppercase;font-weight:700;margin-bottom:5px}.dpp .day.checked.rangeStart{background-color:#cddc39}.dpp .day.checked.rangeEnd{background-color:#ff9800}.week-header{display:-ms-flexbox;display:flex}.single-header{padding:5px 20px}.week-header abbr{-ms-flex-positive:1;flex-grow:1;text-align:center}.week-content{display:-ms-flexbox;display:flex}.week-content>.day,.week-content>.empty{-ms-flex-positive:1;flex-grow:1;-ms-flex-preferred-size:80px;flex-basis:80px;text-align:center}.day{position:relative;line-height:30px}.day>label{display:block;width:100%;height:100%;cursor:pointer;-webkit-box-sizing:border-box;box-sizing:border-box}.day.disabled{color:#ccc;background-color:#f8f8f8}.dpp .day.checked,.dpp .day.highlighted{background-color:gold}.dpp .day.today{outline:1px solid #ccc}.checkbox{display:none}.month-header{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between}"; },
        enumerable: true,
        configurable: true
    });
    return DatepickerPlus;
}());
export { DatepickerPlus as datepicker_plus };
