import { renderMonth } from './templates';
import { createDateElement } from './createDateElement';
import { getDateRange, dateToString, isSameDate, getNextDay, dateStringInRange } from './utils';
import { DEFAULT_CONFIG } from './config';
export class SelectDateRange {
    constructor() {
        this.viewList = [];
        this.config = DEFAULT_CONFIG;
        this.checked = {};
    }
    parseCheckedDates(dates) {
        if (typeof dates === 'string') {
            dates = JSON.parse(dates);
        }
        dates.forEach(date => this.checked[date] = true);
    }
    componentWillLoad() {
        this.parseCheckedDates(this.checkedDates);
        this.updateConfig();
    }
    isCheckedDate(dateString) {
        if (this.config.selectMode === 'range') {
            let range = Object.keys(this.checked);
            return dateStringInRange(dateString, range);
        }
        else {
            return (dateString in this.checked);
        }
    }
    dispatchOnSelect(target, dateString, date) {
        if ('onSelect' in target.events) {
            return target.events.onSelect(dateString, date);
        }
    }
    bindOnSelect(date) {
        if (this.onDateSelect) {
            date.bindEvent('onSelect', this.onDateSelect);
        }
    }
    createDate(date) {
        const dateString = dateToString(date);
        const dateElement = createDateElement(dateString);
        this.bindOnSelect(dateElement);
        let isChecked = this.isCheckedDate(dateString);
        if (isChecked) {
            const canSelect = this.dispatchOnSelect(dateElement, dateString, date);
            if (canSelect !== false)
                dateElement.select();
        }
        return dateElement;
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
        this.viewList.push(monthDates);
        return Object.create({
            render: () => this.viewList.map(renderMonth)
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
    render() {
        return this.updateViewList().render();
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
        "onDateSelect": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "(dateString: string, date: Date) => void | boolean",
                "resolved": "(dateString: string, date: Date) => boolean | void",
                "references": {
                    "Date": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "On Select date\nif false is returned date select will cancel"
            }
        }
    }; }
    static get states() { return {
        "config": {},
        "checked": {}
    }; }
    static get watchers() { return [{
            "propName": "checkedDates",
            "methodName": "parseCheckedDates"
        }]; }
}
