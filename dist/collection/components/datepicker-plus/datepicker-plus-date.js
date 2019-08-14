import { h } from '@stencil/core';
import { DEFAULT_CLASSES } from './config';
export const DatepickerPlusDate = ({ date }) => {
    const onChange = (e) => {
        const dateString = date.dateString();
        const { select, deselect } = date.datepickerPlus;
        if (e.target.checked) {
            date.datepickerPlus.activateSelectScope(date);
            select(dateString);
        }
        else {
            date.datepickerPlus.deactivateSelectScope();
            deselect(dateString);
        }
    };
    return (h("time", { part: "day", class: date.classListString, dateTime: date.dateString() },
        h("label", null,
            date.day,
            h("input", { ref: el => date.el = el, onChange: (e) => onChange(e), checked: date.checked, disabled: date.disabled, class: DEFAULT_CLASSES.checkbox, type: "checkbox", value: date.dateString() }))));
};
