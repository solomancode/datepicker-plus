import { renderContainer } from './templates';
import { createDateElement, createdDateElements } from './createDateElement';
import { dateToString, isSameDate, getNextDay, getDatesBetween, stringToDate, openGithubIssue, dateOffset } from './utils';
import { DEFAULT_CONFIG } from './config';
import * as tags from "./tags";
export class DatepickerPlus {
    constructor() {
        this.plusConfig = DEFAULT_CONFIG;
        this.selected = [];
        this.disabled = [];
        this.rangeStart = null;
        /**
         * Backup disabled before scoping...
         */
        this._disabled = [];
        this.unfoldTag = (tag) => {
            if (!(tag in tags))
                return [tag];
            return this.viewList.map((month) => month.filter(dateElement => (tag in dateElement.tags))).reduce((p, n) => [...p, ...n]).map(el => el.dateString());
        };
        this.addRangeMark = (dateString) => {
            if (this.rangeStart === null) {
                this.rangeStart = dateString;
                this.selected = [dateString];
                this.onDateSelect.emit(this.getDateElement(dateString));
            }
            else if (this.rangeStart !== dateString) {
                const start = this.rangeStart;
                const end = dateString;
                const inBetween = getDatesBetween(start, end);
                // TODO: inBetween +class 'connector'
                const fullRange = [start, ...inBetween, end];
                let hasDisabled = fullRange.some((dt) => {
                    const dateElement = this.getDateElement(dt);
                    if (dateElement && dateElement.disabled)
                        return true;
                });
                if (hasDisabled) {
                    this.rangeStart = end;
                    this.selected = [end];
                    this.onDateSelect.emit(this.getDateElement(end));
                }
                else {
                    this.rangeStart = null;
                    this.selected = fullRange;
                    this.onRangeSelect.emit(fullRange);
                }
            }
        };
        this.activateSelectScope = (dateElement) => {
            const selectedDate = dateElement.dateObject();
            const scope = this.plusConfig.selectScope;
            if (scope > 0 && !this.rangeStart) {
                this._disabled = this.plusConfig.disabled;
                const locked = this.viewList.reduce((p, n) => [...p, ...n]).map(dateElement => {
                    const offset = dateOffset(selectedDate, dateElement.dateObject());
                    return Math.abs(offset) > scope ? dateElement.dateString() : false;
                }).filter(d => d);
                this.disabled = locked;
            }
        };
        this.deactivateSelectScope = () => {
            this.disabled = this._disabled;
        };
        this.resetRangeMarks = () => {
            this.rangeStart = null;
            this.selected = [];
        };
        this.select = (dateString) => {
            const dateElement = this.getDateElement(dateString);
            if (dateElement) {
                switch (this.plusConfig.selectMode) {
                    case 'single':
                        this.selected = [dateString];
                        this.onDateSelect.emit(dateElement);
                        break;
                    case 'multiple':
                        this.selected = [...this.selected, dateString];
                        this.onDateSelect.emit(dateElement);
                        break;
                    case 'range':
                        this.addRangeMark(dateString);
                        break;
                }
            }
        };
        this.deselect = (dateString) => {
            const dateElement = this.getDateElement(dateString);
            if (dateElement) {
                if (this.plusConfig.selectMode === 'range') {
                    this.resetRangeMarks();
                }
                else {
                    this.selected = this.selected.filter(dt => dt !== dateString);
                }
                this.onDateDeselect.emit(dateElement);
            }
        };
        this.unfoldSelected = (selected, selectMode) => {
            if (!selected.length)
                return [];
            let unfolded = selected.map(this.unfoldTag).reduce((p, n) => [...p, ...n]);
            return selectMode === 'range' ? [unfolded[0], unfolded[unfolded.length - 1]] : unfolded;
        };
        this.getDateElement = (dateString) => {
            if (dateString in createdDateElements) {
                return createdDateElements[dateString];
            }
            else {
                return null;
            }
        };
        this.MemProtect = 0;
        this.createDate = (date) => {
            const dateString = dateToString(date);
            const dateElement = createDateElement({
                dateString,
                datepickerPlus: this
            });
            return dateElement;
        };
    }
    parseSelected(next, current) {
        const rangeMode = this.plusConfig.selectMode === 'range';
        const currentLastIndex = current.length - 1;
        const nextLastIndex = next.length - 1;
        // DESELECT CURRENT
        current.forEach((dateString, index) => {
            const rangeEnd = index === currentLastIndex ? { rangeEnd: null } : {};
            this.updateDateOptions(dateString, Object.assign({ checked: false }, (rangeMode ? Object.assign({ rangeIndex: null }, rangeEnd) : {})));
        });
        const isReversed = dateOffset(new Date(next[0]), new Date(next[next.length - 1])) > 0;
        // SELECT NEXT
        next.forEach((dateString, index) => {
            const chronoIndex = isReversed ? (next.length - index) - 1 : index;
            const rangeEnd = chronoIndex === nextLastIndex ? { rangeEnd: true } : {};
            this.updateDateOptions(dateString, Object.assign({ checked: true }, (rangeMode ? Object.assign({ rangeIndex: chronoIndex }, rangeEnd) : {})));
        });
    }
    parseDisabled(next, current) {
        // ENABLE CURRENT
        current.forEach(dateString => this.updateDateOptions(dateString, { disabled: false }));
        // DISABLE NEXT
        next = next.length ? next.map(tag => this.unfoldTag(tag)).reduce((p, n) => [...p, ...n]) : [];
        next.forEach(dateString => this.updateDateOptions(dateString, { disabled: true }));
    }
    updateDateOptions(dateString, options) {
        const dateElement = this.getDateElement(dateString);
        if (dateElement) {
            Object.assign(dateElement, options);
            dateElement.updateClassListString();
        }
    }
    updateConfig(config) {
        this.parseViewRange(config.viewRange);
        this.unfoldSelected(config.selected, config.selectMode).forEach(this.select);
        this.disabled = this.plusConfig.disabled;
        this._disabled = this.plusConfig.disabled;
    }
    componentWillLoad() {
        this.plusConfig = Object.assign({}, DEFAULT_CONFIG, this.plusConfig);
    }
    protectMemLeak() {
        this.MemProtect++;
        if (this.MemProtect > 3000) {
            const now = '#### ' + new Date().toDateString();
            const CB = '\`\`\`';
            const config = JSON.stringify(this.plusConfig, null, 2);
            const body = now + '\n' + CB + config + CB;
            openGithubIssue({
                title: 'Memory leak @ render while loop',
                body,
                label: 'bug'
            });
        }
    }
    parseViewRange(viewRange) {
        let lastIndex = null;
        let monthDates = [];
        const viewList = [];
        let [currentDate, endDate] = viewRange.map(stringToDate);
        let stopDate = getNextDay(endDate);
        while (!isSameDate(currentDate, stopDate)) {
            this.protectMemLeak();
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
        this.viewList = viewList;
        this.MemProtect = 0;
    }
    render() {
        console.count('RENDER:');
        return renderContainer(this.viewList, this.plusConfig);
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
    static get states() { return {
        "viewList": {},
        "selected": {},
        "disabled": {}
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
        }, {
            "method": "onRangeSelect",
            "name": "onRangeSelect",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "DateString[]",
                "resolved": "string[]",
                "references": {
                    "DateString": {
                        "location": "local"
                    }
                }
            }
        }]; }
    static get watchers() { return [{
            "propName": "selected",
            "methodName": "parseSelected"
        }, {
            "propName": "disabled",
            "methodName": "parseDisabled"
        }, {
            "propName": "plusConfig",
            "methodName": "updateConfig"
        }]; }
}
