import { h } from '@stencil/core';
import { monthToWeeks } from './utils';
import { DEFAULT_MONTHS, DEFAULT_WEEK_DAYS, DEFAULT_CLASSES } from "./config";
import { DatepickerPlusDate } from './datepicker-plus-date';
export function renderDate(date) {
    return h(DatepickerPlusDate, { date: date });
}
export function renderWeekHeader(weekDays = DEFAULT_WEEK_DAYS) {
    return (h("header", { class: DEFAULT_CLASSES.weekHeader, part: "week-header" }, weekDays.map(({ name, abbr, isWeekend }) => h("abbr", { class: isWeekend && DEFAULT_CLASSES.weekend, title: name }, abbr))));
}
export function renderEmpty(offset) {
    const nodes = [];
    while (offset) {
        nodes.push(h("span", { class: DEFAULT_CLASSES.empty }));
        offset--;
    }
    return nodes;
}
export function renderWeek(week, renderHeader) {
    return (h("section", { part: "week", class: DEFAULT_CLASSES.week },
        renderHeader && renderWeekHeader(),
        h("section", { class: DEFAULT_CLASSES.weekContent },
            renderEmpty(week[0].dayOfWeek),
            week.map(renderDate),
            renderEmpty(6 - week[week.length - 1].dayOfWeek))));
}
export function renderMonthHeader(dayFirst) {
    return (h("header", { class: DEFAULT_CLASSES.monthHeader, part: "month-header" },
        h("span", { class: DEFAULT_CLASSES.monthName }, DEFAULT_MONTHS[dayFirst.month - 1].name),
        dayFirst.month - 1 === 0 && h("span", { class: DEFAULT_CLASSES.year }, dayFirst.year)));
}
export function renderMonth(month, weekHeader) {
    const renderHeader = (i) => weekHeader === 'per-month' && i === 0;
    return (h("section", { part: "month", class: DEFAULT_CLASSES.month },
        renderMonthHeader(month[0]),
        h("section", { class: DEFAULT_CLASSES.monthContent }, monthToWeeks(month).map((week, i) => renderWeek(week, renderHeader(i))))));
}
export function renderContainer(dates, config) {
    const renderSingleHeader = () => config.weekHeader === 'single' && h("header", { class: DEFAULT_CLASSES.singleHeader }, renderWeekHeader());
    return ([
        // theme stylesheet
        config.stylesheetUrl ? h("link", { rel: "stylesheet", type: "text/css", href: config.stylesheetUrl }) : null,
        // contents
        h("section", { class: "dpp-container", part: "dpp-container" }, [
            renderSingleHeader() || null,
            dates.map((month) => renderMonth(month, config.weekHeader))
        ])
    ]);
}
