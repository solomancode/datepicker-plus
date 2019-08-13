import { getDateComponents, stringToDate } from "./utils";
import { DEFAULT_CLASSES } from "./config";
import * as tags from "./tags";
const composeDateOptions = (options) => {
    return Object.assign({ checked: false, disabled: false }, options);
};
const composeDateHelpers = (dateString) => ({
    dateObject() {
        return stringToDate(dateString);
    },
    dateString() {
        return dateString;
    },
    offset() {
        const date = this.dateObject().getTime();
        const now = new Date().getTime();
        return Math.ceil((date - now) / 86400000);
    }
});
const composeDateClassList = () => ({
    classListString: DEFAULT_CLASSES.day,
    updateClassListString() {
        const date = this;
        const classList = [
            DEFAULT_CLASSES.day,
            date.disabled && DEFAULT_CLASSES.disabled,
            date.checked && DEFAULT_CLASSES.selected
        ];
        for (const tag in tags) {
            const assertion = tags[tag];
            assertion(date, (c) => classList.push(c)) && Object.defineProperty(date.tags, tag, { value: true });
        }
        return this.classListString = classList.filter(c => c).join(' ');
    }
});
export const createdDateElements = {
/**
 * CREATED DATE ELEMENTS...
 */
};
export function createDateElement({ dateString, options, datepickerPlus }) {
    const [year, month, day] = getDateComponents(dateString);
    const dateOptions = Object.create(Object.assign({ tags: {}, datepickerPlus,
        createdDateElements }, composeDateOptions(options), composeDateHelpers(dateString), composeDateClassList()));
    if (dateString in createdDateElements) {
        const dateElement = createdDateElements[dateString];
        Object.assign(dateElement, dateOptions);
        return dateElement;
    }
    const dayOfWeek = new Date(dateString).getDay();
    const props = { year, month, day, dayOfWeek };
    const dateElement = Object.assign(dateOptions, props);
    dateElement.updateClassListString();
    Object.defineProperty(createdDateElements, dateString, { value: dateElement });
    return dateElement;
}
