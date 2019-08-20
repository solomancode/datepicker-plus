import { h } from '@stencil/core';
import { IDateElement } from './registerDate';
import { monthToWeeks, generateDateClass } from './utils';
import { DEFAULT_CLASSES, IWeekDay, IMonth } from "./config";
import { IPlusConfig } from './datepicker-plus';

export function renderDate (date: IDateElement) {
    const onChange = (e: any) => {
        return e.target.checked ? this.select(date.dateString) : this.deselect(date.dateString)
    }
    return (
        <time part="day" class={generateDateClass(date)} dateTime={date.dateString}>
            <label>
                {date.day}
                <input
                checked={date.checked}
                disabled={date.disabled}
                onChange={onChange.bind(this)}
                class={DEFAULT_CLASSES.checkbox}
                type="checkbox" value={date.dateString}/>
            </label>
        </time>
    )
}

export function renderWeekHeader (weekDays: IWeekDay[]) {
    return (
        <header class={DEFAULT_CLASSES.weekHeader} part="week-header">
            { weekDays.map(({ name, abbr, isWeekend }) => <abbr class={isWeekend&&DEFAULT_CLASSES.weekend} title={name}>{abbr}</abbr>) }
        </header>
    )
}

export function renderEmpty (offset: number) {
    const nodes = []
    while (offset) {
        nodes.push(<span class={DEFAULT_CLASSES.empty}></span>)
        offset--;
    }
    return nodes;
}

export function renderWeek (week: IDateElement[], renderHeader: boolean, weekDays: IWeekDay[]) {
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

export function renderMonthHeader(dayFirst: IDateElement, months: IMonth[]) {
    return (
        <header class={DEFAULT_CLASSES.monthHeader} part="month-header">
            <span class={DEFAULT_CLASSES.monthName}>{months[dayFirst.month-1].name}</span>
            {dayFirst.month-1 === 0 && <span class={DEFAULT_CLASSES.year}>{dayFirst.year}</span>}
        </header>
    )
}

export function renderMonth (month: IDateElement[], config: IPlusConfig) {
    const renderHeader = (i: number) => config.weekHeader === 'per-month' && i === 0;
    return (
        <section part="month" class={DEFAULT_CLASSES.month}>
            { renderMonthHeader(month[0], config.i18n.months) }
            <section class={DEFAULT_CLASSES.monthContent}>
                { monthToWeeks(month).map( (week, i) => renderWeek.call(this, week, renderHeader(i), config.i18n.weekDays )) }
            </section>
        </section>
    )
}

export function renderContainer(dates: IDateElement[][], config: IPlusConfig) {
    const renderSingleHeader = () => config.weekHeader === 'single' && <header class={DEFAULT_CLASSES.singleHeader}>{ renderWeekHeader(config.i18n.weekDays) }</header>;
    return ([
        // theme stylesheet
        config.stylesheetUrl ? <link rel="stylesheet" type="text/css" href={config.stylesheetUrl}/> : null,
        // contents
        <section class="dpp-container" part="dpp-container">
            {[
                renderSingleHeader() || null,
                dates.map((month)=>renderMonth.call(this, month, config))
            ]}
        </section>
    ])
}