import { IDateElement } from "./registerDate";
import { dateOffset } from "./utils";
import { DateString } from "./datepicker-plus";

export type TagPredicate = (dateElement: IDateElement) => boolean

const offsetFromToday = (dateString: DateString) => dateOffset(new Date(dateString), new Date())

const today: TagPredicate = (dateElement: IDateElement) => {
    const isToday = offsetFromToday(dateElement.dateString) === 0;
    return isToday
}

const tomorrow: TagPredicate = (dateElement: IDateElement) => offsetFromToday(dateElement.dateString) === 1;
const yesterday: TagPredicate = (dateElement: IDateElement) => offsetFromToday(dateElement.dateString) === -1;
const past: TagPredicate = (dateElement: IDateElement) => offsetFromToday(dateElement.dateString) < 0;
const future: TagPredicate = (dateElement: IDateElement) => offsetFromToday(dateElement.dateString) > 0;

/**
 * Range start date
 */
const rangeStart: TagPredicate = (dateElement: IDateElement) => {
    const rangeStart = dateElement.rangeIndex === 0;
    return rangeStart
}

/**
 * Range end date
 */
const rangeEnd: TagPredicate = (dateElement: IDateElement) => {
    const { rangeIndex, rangeEndIndex } = dateElement
    return (rangeEndIndex > 0 && rangeIndex === rangeEndIndex )
}

/**
 * A connector is a date between date start and date end
 * in a range select mode.
 */
const connector: TagPredicate = (dateElement: IDateElement) => {
    const isConnector = dateElement.rangeIndex > 0 && (dateElement.rangeEndIndex !== dateElement.rangeIndex)
    return isConnector
}

export const tags = {
    today,
    rangeStart,
    rangeEnd,
    connector,
    tomorrow,
    yesterday,
    past,
    future
}