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
        date.datepickerPlus.highlighted = 'rangeSelect';
    };
    const onEnter = () => date.datepickerPlus.highlighted = date.dateString();
    const onLeave = () => date.datepickerPlus.highlighted = null;
    return (h("time", { part: "day", class: date.classListString, dateTime: date.dateString() },
        h("label", { onMouseEnter: onEnter.bind(this), onMouseLeave: onLeave.bind(this) },
            date.day,
            h("input", { ref: el => date.el = el, onChange: (e) => onChange(e), checked: date.checked, disabled: date.disabled, class: DEFAULT_CLASSES.checkbox, type: "checkbox", value: date.dateString() }))));
};
