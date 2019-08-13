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
export function renderWeek(week, renderHeader = false) {
    return (h("section", { part: "week", class: DEFAULT_CLASSES.week },
        renderHeader && renderWeekHeader(),
        h("section", { class: DEFAULT_CLASSES.weekContent },
            renderEmpty(week[0].dayOfWeek),
            week.map(renderDate),
            renderEmpty(6 - week[week.length - 1].dayOfWeek))));
}
export function renderMonth(month) {
    return (h("section", { part: "month", class: DEFAULT_CLASSES.month },
        h("header", { class: DEFAULT_CLASSES.monthHeader, part: "month-header" }, DEFAULT_MONTHS[month[0].month - 1].name),
        h("section", { class: DEFAULT_CLASSES.monthContent }, monthToWeeks(month).map((week, i) => renderWeek(week, i === 0)))));
}
export function renderContainer(dates, stylesheetUrl) {
    return ([
        // theme stylesheet
        stylesheetUrl ? h("link", { rel: "stylesheet", type: "text/css", href: stylesheetUrl }) : null,
        // contents
        h("section", { class: "dpp-container", part: "dpp-container" }, dates.map(month => renderMonth(month)))
    ]);
}
