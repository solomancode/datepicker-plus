import { h } from '@stencil/core';
import { IDateElement } from './createDateElement';
import { monthToWeeks } from './utils';
import { DEFAULT_MONTHS, DEFAULT_WEEK_DAYS, DEFAULT_CLASSES, IWeekDay } from "./config";
import { DatepickerPlusDate } from './datepicker-plus-date';
import { WeekHeader, IPlusConfig } from './datepicker-plus';

export function renderDate (date: IDateElement) {
    return <DatepickerPlusDate date={date}></DatepickerPlusDate>
}

export function renderWeekHeader (weekDays: IWeekDay[] = DEFAULT_WEEK_DAYS) {
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

export function renderWeek (week: IDateElement[], renderHeader: boolean) {
    return (
        <section part="week" class={DEFAULT_CLASSES.week}>
            { renderHeader && renderWeekHeader() }
            <section class={DEFAULT_CLASSES.weekContent}>
                { renderEmpty(week[0].dayOfWeek) }
                { week.map(renderDate) }
                { renderEmpty(6-week[week.length-1].dayOfWeek) }
            </section>
        </section>
    )
}

export function renderMonth (month: IDateElement[], weekHeader: WeekHeader) {
    const renderHeader = (i: number) => weekHeader === 'per-month' && i === 0;
    return (
        <section part="month" class={DEFAULT_CLASSES.month}>
            <header class={DEFAULT_CLASSES.monthHeader} part="month-header">{DEFAULT_MONTHS[month[0].month-1].name}</header>
            <section class={DEFAULT_CLASSES.monthContent}>
                { monthToWeeks(month).map( (week, i) => renderWeek(week, renderHeader(i) )) }
            </section>
        </section>
    )
}

export function renderContainer(dates: IDateElement[][], config: IPlusConfig) {
    return ([
        // theme stylesheet
        config.stylesheetUrl ? <link rel="stylesheet" type="text/css" href={config.stylesheetUrl}/> : null,
        // contents
        config.weekHeader === 'single' ? <header class={DEFAULT_CLASSES.singleHeader}>{ renderWeekHeader() }</header> : null,
        <section class="dpp-container" part="dpp-container">
            {dates.map((month)=>renderMonth(month, config.weekHeader))}
        </section>
    ])
}