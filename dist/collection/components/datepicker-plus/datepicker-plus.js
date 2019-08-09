import { h } from '@stencil/core';
import { renderContainer } from './templates';
import { createDateElement, createdDateElements } from './createDateElement';
import { dateToString, isSameDate, getNextDay, getDatesBetween, stringToDate } from './utils';
import { DEFAULT_CONFIG } from './config';
export class SelectDateRange {
    constructor() {
        this.plusConfig = DEFAULT_CONFIG;
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
            if (this.plusConfig.selectMode === 'range') {
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
            debugger;
            const dateElement = createDateElement({
                dateString,
                events: this.events
            });
            return dateElement;
        };
    }
    parseConfig() {
        // TODO: handle config update
    }
    get events() {
        return {
            onDateSelect: this.onDateSelect,
            onDateDeselect: this.onDateDeselect
        };
    }
    componentWillLoad() {
        this.plusConfig = Object.assign({}, DEFAULT_CONFIG, this.plusConfig);
    }
    clearSelected() {
        this.plusConfig.selected.forEach(dateString => {
            const dateElement = this.getDateElement(dateString);
            dateElement && dateElement.deselect();
        });
        if (this.plusConfig.selectMode === 'range') {
            const [start, end] = this.plusConfig.selected;
            let dates = getDatesBetween(start, end);
            dates.forEach(dateString => {
                const dateElement = this.getDateElement(dateString);
                dateElement && dateElement.deselect();
            });
        }
        this.plusConfig.selected = [];
    }
    updateViewOptions() {
        this.selectDates(this.plusConfig.selected);
        this.disableDates(this.plusConfig.disabled);
    }
    updateViewList(config = this.plusConfig) {
        let lastIndex = null;
        let monthDates = [];
        const viewList = [];
        let [currentDate, endDate] = config.viewRange.map(stringToDate);
        let stopDate = getNextDay(endDate);
        while (!isSameDate(currentDate, stopDate)) {
            const date = this.createDate(currentDate);
            if (lastIndex !== null && lastIndex !== date.month) {
                viewList.push(monthDates);
                monthDates = [];
            }
            else {
                monthDates.push(date);
                currentDate = getNextDay(currentDate);
            }
            lastIndex = date.month;
        }
        viewList.push(monthDates);
        this.updateViewOptions();
        return Object.create({
            render: () => renderContainer(viewList)
        });
    }
    updateConfig(config) {
        if (config)
            Object.assign(this.plusConfig, config);
    }
    loadStylesheet() {
        const { stylesheetUrl } = this.plusConfig;
        return stylesheetUrl ? h("link", { rel: "stylesheet", type: "text/css", href: stylesheetUrl }) : null;
    }
    render() {
        return [
            this.loadStylesheet(),
            this.updateViewList().render()
        ];
    }
    static get is() { return "datepicker-plus"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["datepicker-plus.css"]
    }; }
    static get styleUrls() { return {
        "$": ["datepicker-plus.css"]
    }; }
    static get properties() { return {
        "plusConfig": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "IPlusConfig",
                "resolved": "IPlusConfig",
                "references": {
                    "IPlusConfig": {
                        "location": "local"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "defaultValue": "DEFAULT_CONFIG"
        }
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
            "propName": "plusConfig",
            "methodName": "parseConfig"
        }]; }
}
