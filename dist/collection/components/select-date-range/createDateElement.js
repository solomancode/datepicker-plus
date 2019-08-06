import { getDateComponents } from "./utils";
const composeDateOptions = (options) => {
    return Object.assign({ checked: false, disabled: false }, options);
};
const composeDateHelpers = (dateString) => ({
    dateObject: () => this.stringToDate(dateString),
    dateString: () => dateString,
    select() { this.checked = true; },
    bindEvent(event, fn) { this.events[event] = fn; }
});
export const createDateElement = (dateString, options) => {
    const [year, month, day] = getDateComponents(dateString);
    const dateOptions = Object.create(Object.assign({ events: {} }, composeDateOptions(options), composeDateHelpers(dateString)));
    const dayOfWeek = new Date(dateString).getDay();
    const props = { year, month, day, dayOfWeek };
    return Object.assign(dateOptions, props);
};
