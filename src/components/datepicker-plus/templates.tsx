import { h } from '@stencil/core';
import { monthToWeeks } from './utils';
import { DEFAULT_CLASSES } from "./config";
import { DateElement } from './DateElement';
import { IPlusConfig, IWeekDay, IMonth } from '../../datepicker-plus';

/**
 * ------------------------------
 * JSX, fancy templates goes here.
 * -------------------------------
 */

/**
 * renders the interactive date element
 */
export function renderDate (dateElement: DateElement) {
    const onChange = (e: any) => {
        return e.target.checked ? this.select(dateElement.dateString) : this.deselect([dateElement.dateString])
    }
    const onEnter = () => !dateElement.getAttr(DEFAULT_CLASSES.disabled) && this.highlightON(dateElement.dateString);
    return (
        <time part="day"
              dateTime={dateElement.dateString}
              onMouseEnter={onEnter.bind(this)}
              ref={element => dateElement.hookDOMElement(element)}>
             <label>
                {dateElement.day}
                <input
                    ref={element => dateElement.hookDOMElement(element)}
                    onChange={onChange.bind(this)}
                    class={DEFAULT_CLASSES.checkbox}
                    type="checkbox" value={dateElement.dateString}/>
            </label>
        </time>
    )
}

/**
 * week header, renders week days.
 */
export function renderWeekHeader (weekDays: IWeekDay[]) {
    return (
        <header class={DEFAULT_CLASSES.weekHeader} part="week-header">
            { weekDays.map(({ name, abbr, isWeekend }) => <abbr class={isWeekend&&DEFAULT_CLASSES.weekend} title={name}>{abbr}</abbr>) }
        </header>
    )
}

/**
 * of course we need an empty placeholder
 */
export function renderEmpty (offset: number) {
    const nodes = []
    while (offset) {
        nodes.push(<span class={DEFAULT_CLASSES.empty}></span>)
        offset--;
    }
    return nodes;
}

/**
 * it renders the whole week 24/7
 */
export function renderWeek (week: DateElement[], renderHeader: boolean, weekDays: IWeekDay[]) {
    return (
        <section part="week" class={DEFAULT_CLASSES.week}>
            { renderHeader && renderWeekHeader(weekDays) }
            <section class={DEFAULT_CLASSES.weekContent}>
                { renderEmpty(week[0].dayOfWeek) }
                { week.map(renderDate.bind(this)) }
                { renderEmpty(6-week[week.length-1].dayOfWeek) }
            </section>
        </section>
    )
}

/**
 * renders a month header
 */
export function renderMonthHeader(dayFirst: DateElement, months: IMonth[]) {
    return (
        <header class={DEFAULT_CLASSES.monthHeader} part="month-header">
            <span class={DEFAULT_CLASSES.monthName}>{months[dayFirst.month-1].name}</span>
            {dayFirst.month-1 === 0 && <span class={DEFAULT_CLASSES.year}>{dayFirst.year}</span>}
        </header>
    )
}

/**
 * renders a month
 */
export function renderMonth (month: DateElement[], config: IPlusConfig) {
    const styles = config.layout === 'horizontal' ? {
        width: (window.innerWidth - 60) + 'px'
    } : {}
    const renderHeader = (i: number) => config.weekHeader === 'per-month' && i === 0;
    return (
        <section style={styles} part="month" class={DEFAULT_CLASSES.month}>
            { renderMonthHeader(month[0], config.i18n.months) }
            <section class={DEFAULT_CLASSES.monthContent}>
                { monthToWeeks(month).map( (week, i) => renderWeek.call(this, week, renderHeader(i), config.i18n.weekDays )) }
            </section>
        </section>
    )
}

/**
 * render date picker container.
 * and handles multiple layout options.
 */
export function renderContainer(dates: DateElement[][], config: IPlusConfig) {
    const styles = config.layout === 'horizontal' ? {
        width: (window.innerWidth * dates.length) + 'px'
    } : {}
    const renderSingleHeader = () => config.weekHeader === 'single' && <header class={DEFAULT_CLASSES.singleHeader}>{ renderWeekHeader(config.i18n.weekDays) }</header>;
    return ([
        // theme stylesheet
        config.stylesheetUrl ? <link rel="stylesheet" type="text/css" href={config.stylesheetUrl}/> : null,
        // contents
        <section class={(config.stylesheetUrl ? 'dpp-custom ' : 'dpp ') + config.layout} part="dpp-container">
            <section style={styles} class="viewport">
                {[
                    renderSingleHeader() || null,
                    dates.map((month)=>renderMonth.call(this, month, config))
                ]}
            </section>
        </section>
    ])
}