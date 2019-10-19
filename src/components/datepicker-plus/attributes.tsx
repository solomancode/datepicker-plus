import { dateOffset } from "./utils";
import { DateElement } from "./DateElement";
import { DateString } from "../../datepicker-plus";

/**
 * Date attributes provide a way to set dates dynamically
 * by providing a string that is mapped to a date or more.
 * 
 * example:
 * given 'past' as an input to the disabled property will result in
 * disabling all dates up to today.
 * 
 */

/**
 * attribute check predicate 
 */
export type AttributeCheckFn = (dateElement: DateElement) => boolean

/**
 * calculate date offset starting from today
 */
const offsetFromToday = (dateString: DateString) => dateOffset(new Date(dateString), new Date());

/**
 * available date dynamic attributes
 */
const today: AttributeCheckFn = (dateElement: DateElement) => offsetFromToday(dateElement.dateString) === 0;
const tomorrow: AttributeCheckFn = (dateElement: DateElement) => offsetFromToday(dateElement.dateString) === 1;
const yesterday: AttributeCheckFn = (dateElement: DateElement) => offsetFromToday(dateElement.dateString) === -1;
const past: AttributeCheckFn = (dateElement: DateElement) => offsetFromToday(dateElement.dateString) < 0;
const future: AttributeCheckFn = (dateElement: DateElement) => offsetFromToday(dateElement.dateString) > 0;

/**
 * Range start date
 */
const rangeStart: AttributeCheckFn = (dateElement: DateElement) => {
    const rangeStart = dateElement.getAttr('rangeIndex') === 0;
    return rangeStart
}

/**
 * Range end date
 */
const rangeEnd: AttributeCheckFn = (dateElement: DateElement) => {
    const rangeIndex = dateElement.getAttr('rangeIndex')
    const rangeEndIndex = dateElement.getAttr('rangeEndIndex')
    return (rangeEndIndex > 0 && rangeIndex === rangeEndIndex )
}

/**
 * A connector is a date between date start and date end
 * in a range select mode.
 */
const connector: AttributeCheckFn = (dateElement: DateElement) => {
    return dateElement.getAttr('rangeIndex') > 0 && (dateElement.getAttr('rangeEndIndex') !== dateElement.getAttr('rangeIndex'))
}

export const attributeChecks = {
    today,
    rangeStart,
    rangeEnd,
    connector,
    tomorrow,
    yesterday,
    past,
    future
}