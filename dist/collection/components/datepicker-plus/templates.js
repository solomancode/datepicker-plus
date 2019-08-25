import { h } from '@stencil/core';
import { monthToWeeks, generateDateClass } from './utils';
import { DEFAULT_CLASSES } from "./config";
import { tags } from './tags';
export function renderDate(date) {
    const onChange = (e) => {
        return e.target.checked ? this.select(date.dateString) : this.deselect(date.dateString);
    };
    const genDateClass = () => {
        this.updateTags(tags, this.viewElements);
        return generateDateClass(date);
    };
    return (h("time", { part: "day", class: genDateClass(), dateTime: date.dateString },
        h("label", null,
            date.day,
            h("input", { checked: date.checked, disabled: date.disabled, onChange: onChange.bind(this), class: DEFAULT_CLASSES.checkbox, type: "checkbox", value: date.dateString }))));
}
export function renderWeekHeader(weekDays) {
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
export function renderWeek(week, renderHeader, weekDays) {
    return (h("section", { part: "week", class: DEFAULT_CLASSES.week },
        renderHeader && renderWeekHeader(weekDays),
        h("section", { class: DEFAULT_CLASSES.weekContent },
            renderEmpty(week[0].dayOfWeek),
            week.map(renderDate.bind(this)),
            renderEmpty(6 - week[week.length - 1].dayOfWeek))));
}
export function renderMonthHeader(dayFirst, months) {
    return (h("header", { class: DEFAULT_CLASSES.monthHeader, part: "month-header" },
        h("span", { class: DEFAULT_CLASSES.monthName }, months[dayFirst.month - 1].name),
        dayFirst.month - 1 === 0 && h("span", { class: DEFAULT_CLASSES.year }, dayFirst.year)));
}
export function renderMonth(month, config) {
    const styles = config.layout === 'horizontal' ? {
        width: (window.innerWidth - 60) + 'px'
    } : {};
    const renderHeader = (i) => config.weekHeader === 'per-month' && i === 0;
    return (h("section", { style: styles, part: "month", class: DEFAULT_CLASSES.month },
        renderMonthHeader(month[0], config.i18n.months),
        h("section", { class: DEFAULT_CLASSES.monthContent }, monthToWeeks(month).map((week, i) => renderWeek.call(this, week, renderHeader(i), config.i18n.weekDays)))));
}
export function renderContainer(dates, config) {
    const styles = config.layout === 'horizontal' ? {
        width: (window.innerWidth * dates.length) + 'px'
    } : {};
    const renderSingleHeader = () => config.weekHeader === 'single' && h("header", { class: DEFAULT_CLASSES.singleHeader }, renderWeekHeader(config.i18n.weekDays));
    return ([
        // theme stylesheet
        config.stylesheetUrl ? h("link", { rel: "stylesheet", type: "text/css", href: config.stylesheetUrl }) : null,
        // contents
        h("section", { class: (config.stylesheetUrl ? '' : 'dpp ') + config.layout, part: "dpp-container" },
            h("section", { style: styles, class: "viewport" }, [
                renderSingleHeader() || null,
                dates.map((month) => renderMonth.call(this, month, config))
            ]))
    ]);
}
