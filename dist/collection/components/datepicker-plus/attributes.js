import { dateOffset } from "./utils";
/**
 * calculate date offset starting from today
 */
const offsetFromToday = (dateString) => dateOffset(new Date(dateString), new Date());
/**
 * available date dynamic attributes
 */
const today = (dateElement) => offsetFromToday(dateElement.dateString) === 0;
const tomorrow = (dateElement) => offsetFromToday(dateElement.dateString) === 1;
const yesterday = (dateElement) => offsetFromToday(dateElement.dateString) === -1;
const past = (dateElement) => offsetFromToday(dateElement.dateString) < 0;
const future = (dateElement) => offsetFromToday(dateElement.dateString) > 0;
/**
 * Range start date
 */
const rangeStart = (dateElement) => {
    const rangeStart = dateElement.getAttr('rangeIndex') === 0;
    return rangeStart;
};
/**
 * Range end date
 */
const rangeEnd = (dateElement) => {
    const rangeIndex = dateElement.getAttr('rangeIndex');
    const rangeEndIndex = dateElement.getAttr('rangeEndIndex');
    return (rangeEndIndex > 0 && rangeIndex === rangeEndIndex);
};
/**
 * A connector is a date between date start and date end
 * in a range select mode.
 */
const connector = (dateElement) => {
    return dateElement.getAttr('rangeIndex') > 0 && (dateElement.getAttr('rangeEndIndex') !== dateElement.getAttr('rangeIndex'));
};
export const attributeChecks = {
    today,
    rangeStart,
    rangeEnd,
    connector,
    tomorrow,
    yesterday,
    past,
    future
};
