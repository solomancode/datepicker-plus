import { h } from '@stencil/core';
import { renderContainer } from './templates';
import { createDateElement, createdDateElements } from './createDateElement';
import { getDateRange, dateToString, isSameDate, getNextDay, getDatesBetween, parsePropJSON } from './utils';
import { DEFAULT_CONFIG, DEFAULT_CLASSES } from './config';
export class SelectDateRange {
    constructor() {
        this.viewList = [];
        /**
         * Parsed date list...
         */
        this.checkedDatesInput = [];
        this.disabledDatesInput = [];
        this.config = DEFAULT_CONFIG;
        this.dayClassList = DEFAULT_CLASSES.day;
        this.getDateElement = (dateString) => {
            if (dateString in createdDateElements) {
                return createdDateElements[dateString];
            }
            else {
                return null;
            }
        };
        this.selectDate = (dateString) => {
            const dateElement = this.getDateElement(dateString);
            dateElement && dateElement.select();
        };
        this.selectDates = (dateString) => {
            if (this.config.selectMode === 'range') {
                const datesRange = getDatesBetween(dateString[0], dateString[1]);
                [dateString[0], ...datesRange, dateString[1]].forEach(this.selectDate);
            }
            else {
                dateString.forEach(this.selectDate);
            }
        };
        this.disableDates = (dateString) => {
            dateString.forEach(dateStr => {
                const dateElement = this.getDateElement(dateStr);
                dateElement && dateElement.disable();
            });
        };
        this.isSelectedDate = (dateString) => {
            this.getDateElement(dateString).checked;
        };
        this.createDate = (date) => {
            const dateString = dateToString(date);
            return createDateElement({
                dateString,
                events: this.events
            });
        };
    }
    get events() {
        return {
            onDateSelect: this.onDateSelect,
            onDateDeselect: this.onDateDeselect
        };
    }
    parseCheckedDates(dates) {
        if (typeof dates === 'string') {
            dates = parsePropJSON(dates);
        }
        this.selectDates(dates);
        this.checkedDatesInput = dates || [];
    }
    parseDisabledDates(dates) {
        if (typeof dates === 'string') {
            dates = parsePropJSON(dates);
        }
        this.disableDates(dates);
        this.disabledDatesInput = dates || [];
    }
    componentWillLoad() {
        this.parseCheckedDates(this.checkedDates);
        this.parseDisabledDates(this.disabledDates);
        this.updateConfig();
    }
    clearSelected() {
        this.checkedDatesInput.forEach(dateString => {
            const dateElement = this.getDateElement(dateString);
            dateElement && dateElement.deselect();
        });
        if (this.config.selectMode === 'range') {
            const [start, end] = this.checkedDatesInput;
            let dates = getDatesBetween(start, end);
            dates.forEach(dateString => {
                const dateElement = this.getDateElement(dateString);
                dateElement && dateElement.deselect();
            });
        }
        this.checkedDatesInput = [];
    }
    updateViewList(config = this.config) {
        let lastIndex = null;
        let monthDates = [];
        this.viewList = [];
        let [currentDate, endDate] = getDateRange(config.viewRangeStart, config.viewRangeEnd);
        while (!isSameDate(currentDate, endDate)) {
            const date = this.createDate(currentDate);
            if (lastIndex !== null && lastIndex !== date.month) {
                this.viewList.push(monthDates);
                monthDates = [];
            }
            else {
                monthDates.push(date);
                currentDate = getNextDay(currentDate);
            }
            lastIndex = date.month;
        }
        this.selectDates(this.checkedDatesInput);
        this.disableDates(this.disabledDatesInput);
        this.viewList.push(monthDates);
        return Object.create({
            render: () => renderContainer(this.viewList)
        });
    }
    updateConfig(config) {
        if (config) {
            Object.assign(this.config, config);
        }
        else {
            const { viewRangeStart, viewRangeEnd, checkedDates, selectMode } = this;
            if (viewRangeStart)
                this.config.viewRangeStart = viewRangeStart;
            if (viewRangeEnd)
                this.config.viewRangeEnd = viewRangeEnd;
            if (checkedDates)
                this.config.checkedDates = checkedDates;
            if (this.selectMode)
                this.config.selectMode = selectMode;
        }
    }
    loadStylesheet() {
        return this.stylesheetUrl ? h("link", { rel: "stylesheet", type: "text/css", href: this.stylesheetUrl }) : null;
    }
    render() {
        return [
            this.loadStylesheet(),
            this.updateViewList().render()
        ];
    }
    static get is() { return "select-date-range"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["select-date-range.css"]
    }; }
    static get styleUrls() { return {
        "$": ["select-date-range.css"]
    }; }
    static get properties() { return {
        "selectMode": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "select-mode",
            "reflect": false
        },
        "viewRangeStart": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "view-range-start",
            "reflect": false
        },
        "viewRangeEnd": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "view-range-end",
            "reflect": false
        },
        "checkedDates": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "checked-dates",
            "reflect": false
        },
        "disabledDates": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "disabled-dates",
            "reflect": false
        },
        "stylesheetUrl": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "stylesheet-url",
            "reflect": false
        }
    }; }
    static get states() { return {
        "config": {},
        "dayClassList": {}
    }; }
    static get events() { return [{
            "method": "onDateSelect",
            "name": "onDateSelect",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "IDateElement",
                "resolved": "IDateElement",
                "references": {
                    "IDateElement": {
                        "location": "import",
                        "path": "./createDateElement"
                    }
                }
            }
        }, {
            "method": "onDateDeselect",
            "name": "onDateDeselect",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "IDateElement",
                "resolved": "IDateElement",
                "references": {
                    "IDateElement": {
                        "location": "import",
                        "path": "./createDateElement"
                    }
                }
            }
        }]; }
    static get watchers() { return [{
            "propName": "checkedDates",
            "methodName": "parseCheckedDates"
        }, {
            "propName": "disabledDates",
            "methodName": "parseDisabledDates"
        }]; }
}
