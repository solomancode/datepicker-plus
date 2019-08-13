const DYNAMIC_CLASSES = {
    today: 'today',
    rangeStart: 'range-start',
    rangeEnd: 'range-end',
    connector: 'connector'
};
export const today = (dateElement, setClass) => {
    const isToday = dateElement.offset() === 0;
    if (isToday)
        setClass(DYNAMIC_CLASSES.today);
    return isToday;
};
export const tomorrow = (dateElement) => dateElement.offset() === 1;
export const yesterday = (dateElement) => dateElement.offset() === -1;
export const past = (dateElement) => dateElement.offset() < 0;
export const future = (dateElement) => dateElement.offset() > 0;
/**
 * Range start date
 */
export const rangeStart = (dateElement, setClass) => {
    const rangeStart = dateElement.rangeIndex === 0;
    if (rangeStart)
        setClass(DYNAMIC_CLASSES.rangeStart);
    return rangeStart;
};
/**
 * Range end date
 */
export const rangeEnd = (dateElement, setClass) => {
    if (dateElement.rangeEnd)
        setClass(DYNAMIC_CLASSES.rangeEnd);
    return dateElement.rangeEnd;
};
/**
 * A connector is a date between date start and date end
 * in a range select mode.
 */
export const connector = (dateElement, setClass) => {
    const isConnector = dateElement.rangeIndex > 0 && (!dateElement.rangeEnd);
    if (isConnector)
        setClass(DYNAMIC_CLASSES.connector);
    return isConnector;
};
