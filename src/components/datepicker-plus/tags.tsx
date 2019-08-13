import { IDateElement } from "./createDateElement";

type ClassSetter = (c: string) => void
type TagAssertion = (dateElement: IDateElement, setClass?: ClassSetter) => boolean

const DYNAMIC_CLASSES = {
    today: 'today',
    rangeStart: 'range-start',
    rangeEnd: 'range-end',
    connector: 'connector'
}

export const today: TagAssertion = (dateElement: IDateElement, setClass: ClassSetter) => {
    const isToday = dateElement.offset() === 0;
    if (isToday) setClass(DYNAMIC_CLASSES.today)
    return isToday
}

export const tomorrow: TagAssertion = (dateElement: IDateElement) => dateElement.offset() === 1;
export const yesterday: TagAssertion = (dateElement: IDateElement) => dateElement.offset() === -1;
export const past: TagAssertion = (dateElement: IDateElement) => dateElement.offset() < 0;
export const future: TagAssertion = (dateElement: IDateElement) => dateElement.offset() > 0;

/**
 * Range start date
 */
export const rangeStart: TagAssertion = (dateElement: IDateElement, setClass: ClassSetter) => {
    const rangeStart = dateElement.rangeIndex === 0;
    if (rangeStart) setClass(DYNAMIC_CLASSES.rangeStart)
    return rangeStart
}

/**
 * Range end date
 */
export const rangeEnd: TagAssertion = (dateElement: IDateElement, setClass: ClassSetter) => {
    if (dateElement.rangeEnd) setClass(DYNAMIC_CLASSES.rangeEnd)
    return dateElement.rangeEnd
}

/**
 * A connector is a date between date start and date end
 * in a range select mode.
 */
export const connector: TagAssertion = (dateElement: IDateElement, setClass: ClassSetter) => {
    const isConnector = dateElement.rangeIndex > 0 && (!dateElement.rangeEnd)
    if (isConnector) setClass(DYNAMIC_CLASSES.connector)
    return isConnector
}
