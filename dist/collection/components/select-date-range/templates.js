import { h } from '@stencil/core';
import { monthToWeeks } from './utils';
import { DEFAULT_MONTHS, DEFAULT_WEEK_DAYS, DEFAULT_CLASSES } from "./config";
export function renderDate(date) {
    const toggleSelected = () => {
        date.checked ? date.deselect() : date.select();
    };
    return (h("time", { part: "day", class: date.classList(), dateTime: date.dateString() },
        h("label", null,
            date.day,
            h("input", { ref: el => date.el = el, onChange: toggleSelected.bind(this), onMouseDown: () => date.selectRangeStart(), onMouseEnter: () => date.selectRangeEnd(), checked: date.checked, disabled: date.disabled, class: DEFAULT_CLASSES.checkbox, type: "checkbox", value: date.dateString() }))));
}
export function renderWeekHeader(weekDays = DEFAULT_WEEK_DAYS) {
    return (h("header", { class: DEFAULT_CLASSES.weekHeader, part: "week-header" }, weekDays.map(({ name, abbr, isWeekend }) => h("abbr", { class: isWeekend && DEFAULT_CLASSES.weekend, title: name }, abbr))));
}
export function renderPadStart(offset) {
    if (offset === 0)
        return null;
    const nodes = [];
    let count = 8 - offset;
    while (count) {
        nodes.push(h("span", { class: DEFAULT_CLASSES.empty }));
        count--;
    }
    return nodes;
}
export function renderWeek(week, renderHeader = false) {
    return (h("section", { part: "week", class: DEFAULT_CLASSES.week },
        renderHeader && renderWeekHeader(),
        h("section", { class: DEFAULT_CLASSES.weekContent },
            renderPadStart(week[0].dayOfWeek),
            week.map(renderDate))));
}
export function renderMonth(month) {
    return (h("section", { part: "month", class: DEFAULT_CLASSES.month },
        h("header", { class: DEFAULT_CLASSES.monthHeader, part: "month-header" }, DEFAULT_MONTHS[month[0].month - 1].name),
        h("section", { class: DEFAULT_CLASSES.monthContent }, monthToWeeks(month).map((week, i) => renderWeek(week, i === 0)))));
}
export function renderContainer(dates) {
    return (h("section", { class: "sdr-container", part: "sdr-container" }, dates.map(month => renderMonth(month))));
}
