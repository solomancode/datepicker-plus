import { h } from '@stencil/core';
import { IDateElement } from './createDateElement';
import { monthToWeeks } from './utils';
import { DEFAULT_MONTHS, DEFAULT_WEEK_DAYS, DEFAULT_CLASSES, IWeekDay } from "./config";

export function renderDate (date: IDateElement) {
    const toggleSelected = () => {
        date.checked ? date.deselect() : date.select()
    };
    return (<time part="day" class={date.classList()} dateTime={date.dateString()}>
        <label>
            {date.day}
            <input
                ref={el=>date.el=el}
                onChange={toggleSelected.bind(this)}
                onMouseDown={()=>date.selectRangeStart()}
                onMouseEnter={()=>date.selectRangeEnd()}
                checked={date.checked} disabled={date.disabled}
                class={DEFAULT_CLASSES.checkbox}
                type="checkbox" value={date.dateString()}/>
        </label>
    </time>)
}

export function renderWeekHeader (weekDays: IWeekDay[] = DEFAULT_WEEK_DAYS) {
    return (
        <header class={DEFAULT_CLASSES.weekHeader} part="week-header">
            { weekDays.map(({ name, abbr, isWeekend }) => <abbr class={isWeekend&&DEFAULT_CLASSES.weekend} title={name}>{abbr}</abbr>) }
        </header>
    )
}

export function renderPadStart (offset: number) {
    if (offset===0) return null;
    const nodes = []
    let count = 8 - offset;
    while (count) {
        nodes.push(<span class={DEFAULT_CLASSES.empty}></span>)
        count--;
    }
    return nodes;
}

export function renderWeek (week: IDateElement[], renderHeader: boolean = false) {
    return (
        <section part="week" class={DEFAULT_CLASSES.week}>
            { renderHeader && renderWeekHeader() }
            <section class={DEFAULT_CLASSES.weekContent}>
                { renderPadStart(week[0].dayOfWeek) }
                { week.map(renderDate) }
            </section>
        </section>
    )
}

export function renderMonth (month: IDateElement[]) {
    return (
        <section part="month" class={DEFAULT_CLASSES.month}>
            <header class={DEFAULT_CLASSES.monthHeader} part="month-header">{DEFAULT_MONTHS[month[0].month-1].name}</header>
            <section class={DEFAULT_CLASSES.monthContent}>
                { monthToWeeks(month).map( (week, i) => renderWeek(week, i===0)) }
            </section>
        </section>
    )
}

export function renderContainer(dates: IDateElement[][]) {
    return (
        <section class="sdr-container" part="sdr-container">
            {dates.map(month=>renderMonth(month))}
        </section>
    )
}