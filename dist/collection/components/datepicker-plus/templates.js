import { h } from '@stencil/core';
import { monthToWeeks } from './utils';
import { DEFAULT_CLASSES } from "./config";
/**
 * ------------------------------
 * JSX, fancy templates goes here.
 * -------------------------------
 */
/**
 * renders the interactive date element
 */
export function renderDate(dateElement) {
    const onChange = (e) => {
        return e.target.checked ? this.select(dateElement.dateString) : this.deselect([dateElement.dateString]);
    };
    const onEnter = () => !dateElement.getAttr(DEFAULT_CLASSES.disabled) && this.highlightON(dateElement.dateString);
    return (h("time", { part: "day", dateTime: dateElement.dateString, onMouseEnter: onEnter.bind(this), ref: element => dateElement.hookDOMElement(element) },
        h("label", null,
            dateElement.day,
            h("input", { ref: element => dateElement.hookDOMElement(element), onChange: onChange.bind(this), class: DEFAULT_CLASSES.checkbox, type: "checkbox", value: dateElement.dateString }))));
}
/**
 * week header, renders week days.
 */
export function renderWeekHeader(weekDays) {
    return (h("header", { class: DEFAULT_CLASSES.weekHeader, part: "week-header" }, weekDays.map(({ name, abbr, isWeekend }) => h("abbr", { class: isWeekend && DEFAULT_CLASSES.weekend, title: name }, abbr))));
}
/**
 * of course we need an empty placeholder
 */
export function renderEmpty(offset) {
    const nodes = [];
    while (offset) {
        nodes.push(h("span", { class: DEFAULT_CLASSES.empty }));
        offset--;
    }
    return nodes;
}
/**
 * it renders the whole week 24/7
 */
export function renderWeek(week, renderHeader, weekDays) {
    return (h("section", { part: "week", class: DEFAULT_CLASSES.week },
        renderHeader && renderWeekHeader(weekDays),
        h("section", { class: DEFAULT_CLASSES.weekContent },
            renderEmpty(week[0].dayOfWeek),
            week.map(renderDate.bind(this)),
            renderEmpty(6 - week[week.length - 1].dayOfWeek))));
}
/**
 * renders a month header
 */
export function renderMonthHeader(dayFirst, months) {
    return (h("header", { class: DEFAULT_CLASSES.monthHeader, part: "month-header" },
        h("span", { class: DEFAULT_CLASSES.monthName }, months[dayFirst.month - 1].name),
        dayFirst.month - 1 === 0 && h("span", { class: DEFAULT_CLASSES.year }, dayFirst.year)));
}
/**
 * renders a month
 */
export function renderMonth(month, config) {
    const styles = config.layout === 'horizontal' ? {
        width: (window.innerWidth - 60) + 'px'
    } : {};
    const renderHeader = (i) => config.weekHeader === 'per-month' && i === 0;
    return (h("section", { style: styles, part: "month", class: DEFAULT_CLASSES.month },
        renderMonthHeader(month[0], config.i18n.months),
        h("section", { class: DEFAULT_CLASSES.monthContent }, monthToWeeks(month).map((week, i) => renderWeek.call(this, week, renderHeader(i), config.i18n.weekDays)))));
}
/**
 * render date picker container.
 * and handles multiple layout options.
 */
export function renderContainer(dates, config) {
    const styles = config.layout === 'horizontal' ? {
        width: (window.innerWidth * dates.length) + 'px'
    } : {};
    const renderSingleHeader = () => config.weekHeader === 'single' && h("header", { class: DEFAULT_CLASSES.singleHeader }, renderWeekHeader(config.i18n.weekDays));
    return ([
        // theme stylesheet
        config.stylesheetUrl ? h("link", { rel: "stylesheet", type: "text/css", href: config.stylesheetUrl }) : null,
        // contents
        h("section", { class: (config.stylesheetUrl ? 'dpp-custom ' : 'dpp ') + config.layout, part: "dpp-container" },
            h("section", { style: styles, class: "viewport" }, [
                renderSingleHeader() || null,
                dates.map((month) => renderMonth.call(this, month, config))
            ]))
    ]);
}
