import { h } from '@stencil/core';
import { monthToWeeks } from './utils';
import { DEFAULT_MONTHS, DEFAULT_WEEK_DAYS, DEFAULT_CLASSES } from "./config";
export const renderDate = (date) => {
    const onValueChange = (event) => {
        event.target.checked && date.select();
    };
    return (h("time", { dateTime: date.dateString() },
        h("label", null,
            date.day,
            h("input", { onChange: (event) => onValueChange(event), checked: date.checked, type: "checkbox", value: date.dateString() }))));
};
export const renderWeekHeader = (weekDays = DEFAULT_WEEK_DAYS) => (h("header", null, weekDays.map(({ name, abbr, isWeekend }) => h("abbr", { class: isWeekend && DEFAULT_CLASSES.weekend, title: name }, abbr))));
export const renderWeek = (week, renderHeader = false) => (h("section", { class: DEFAULT_CLASSES.week },
    renderHeader && renderWeekHeader(),
    week.map(renderDate)));
export const renderMonth = (month) => {
    return (h("section", { class: DEFAULT_CLASSES.month },
        h("header", null, DEFAULT_MONTHS[month[0].month - 1].name),
        monthToWeeks(month).map((week, i) => renderWeek(week, i === 0))));
};
