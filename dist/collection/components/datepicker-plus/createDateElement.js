import { getDateComponents, stringToDate } from "./utils";
import { DEFAULT_CLASSES } from "./config";
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
    updateDateClassList() {
        if (this.el) {
            this.el.parentElement.parentElement.setAttribute('class', this.classList());
        }
    },
    select() {
        this.checked = true;
        if (this.el) {
            this.el.checked = true;
        }
        this.events.onDateSelect.emit(this);
        this.updateDateClassList();
    },
    deselect() {
        this.checked = false;
        this.el && (this.el.checked = false);
        this.events.onDateDeselect.emit(this);
        this.updateDateClassList();
    },
    enable() {
        this.disabled = false;
        this.el && (this.el.disabled = false);
        this.updateDateClassList();
    },
    disable() {
        this.disabled = true;
        this.el && (this.el.disabled = true);
        this.updateDateClassList();
    },
    selectRangeStart() {
        // TODO:
    },
    selectRangeEnd() {
        // TODO:
    },
    offset() {
        const date = this.dateObject().getTime();
        const now = new Date().getTime();
        return Math.ceil((date - now) / 86400000);
    },
    classList() {
        const date = this;
        const SEP = ' ';
        const disabled = date.disabled ? SEP + DEFAULT_CLASSES.disabled : '';
        const selected = date.checked ? SEP + DEFAULT_CLASSES.selected : '';
        const today = date.isToday() ? SEP + DEFAULT_CLASSES.today : '';
        const classList = DEFAULT_CLASSES.day + disabled + selected + today;
        return classList;
    }
});
const composeDateTags = () => ({
    isToday() {
        return this.offset() === 0;
    },
    isTomorrow() {
        return this.offset() === 1;
    },
    isYesterday() {
        return this.offset() === -1;
    },
    isPastDate() {
        return this.offset() < 0;
    },
    isFutureDate() {
        return this.offset() > 0;
    }
});
export const createdDateElements = {};
const isCreatedDateElement = (dateString) => {
    return (dateString in createdDateElements);
};
export const createDateElement = ({ dateString, options, events = {} }) => {
    const [year, month, day] = getDateComponents(dateString);
    const dateOptions = Object.create(Object.assign({ events,
        createdDateElements }, composeDateOptions(options), composeDateHelpers(dateString), composeDateTags()));
    if (isCreatedDateElement(dateString)) {
        const dateElement = createdDateElements[dateString];
        Object.assign(dateElement, dateOptions);
        return dateElement;
    }
    const dayOfWeek = new Date(dateString).getDay();
    const props = { year, month, day, dayOfWeek };
    const dateElement = Object.assign(dateOptions, props);
    Object.defineProperty(createdDateElements, dateString, { value: dateElement });
    return dateElement;
};
