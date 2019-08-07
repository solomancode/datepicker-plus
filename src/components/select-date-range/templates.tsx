import { h } from '@stencil/core';
import { IDateElement } from './createDateElement';
import { monthToWeeks } from './utils';
import { DEFAULT_MONTHS, DEFAULT_WEEK_DAYS, DEFAULT_CLASSES, IWeekDay } from "./config";

export const renderDate = (date: IDateElement) => {
    const toggleSelected = () => date.checked ? date.deselect() : date.select();
    const getClassList = () => {
        const SEP = ' '
        const disabled = date.disabled ? SEP + DEFAULT_CLASSES.disabled : ''
        const selected = date.checked ? SEP + DEFAULT_CLASSES.selected : ''
        return DEFAULT_CLASSES.day + disabled + selected;
    }
    return (<time class={getClassList()} dateTime={date.dateString()}>
        <label>
            { date.day }
            <input
                ref={el=>date.el=el}
                onChange={toggleSelected.bind(this)}
                checked={date.checked} disabled={date.disabled}
                type="checkbox" value={date.dateString()}/>
        </label>
    </time>)
}

export const renderWeekHeader = (weekDays: IWeekDay[] = DEFAULT_WEEK_DAYS) => (
    <header>
        { weekDays.map(({ name, abbr, isWeekend }) => <abbr class={isWeekend&&DEFAULT_CLASSES.weekend} title={name}>{abbr}</abbr>) }
    </header>
)

export const renderWeek = (week: IDateElement[], renderHeader: boolean = false) => (
    <section class={DEFAULT_CLASSES.week}>
        { renderHeader && renderWeekHeader() }
        { week.map(renderDate) }
    </section>
)

export const renderMonth = (month: IDateElement[]) => {
    return (
        <section class={DEFAULT_CLASSES.month}>
            <header>{DEFAULT_MONTHS[month[0].month-1].name}</header>
            { monthToWeeks(month).map( (week, i) => renderWeek(week, i===0)) }
        </section>
    )
}