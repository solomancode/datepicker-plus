import { dateOffset } from "./utils";
const offsetFromToday = (dateString) => dateOffset(new Date(dateString), new Date());
const today = (dateElement) => offsetFromToday(dateElement.dateString) === 0;
const tomorrow = (dateElement) => offsetFromToday(dateElement.dateString) === 1;
const yesterday = (dateElement) => offsetFromToday(dateElement.dateString) === -1;
const past = (dateElement) => offsetFromToday(dateElement.dateString) < 0;
const future = (dateElement) => offsetFromToday(dateElement.dateString) > 0;
/**
 * Range start date
 */
const rangeStart = (dateElement) => {
    const rangeStart = dateElement.rangeIndex === 0;
    return rangeStart;
};
/**
 * Range end date
 */
const rangeEnd = (dateElement) => {
    const { rangeIndex, rangeEndIndex } = dateElement;
    return (rangeEndIndex > 0 && rangeIndex === rangeEndIndex);
};
/**
 * A connector is a date between date start and date end
 * in a range select mode.
 */
const connector = (dateElement) => {
    const isConnector = dateElement.rangeIndex > 0 && (dateElement.rangeEndIndex !== dateElement.rangeIndex);
    return isConnector;
};
export const tags = {
    today,
    rangeStart,
    rangeEnd,
    connector,
    tomorrow,
    yesterday,
    past,
    future
};
