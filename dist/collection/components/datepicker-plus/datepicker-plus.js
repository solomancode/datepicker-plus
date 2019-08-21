import { DEFAULT_CONFIG } from './config';
import { registerDate } from './registerDate';
import { tags } from './tags';
import { renderContainer } from './templates';
import { dateStringInRange, getScopeRange, groupByMonth, patchArray, unfoldRange } from './utils';
export class DatepickerPlus {
    constructor() {
        this.plusConfig = DEFAULT_CONFIG;
        this.registered = {
        /** LOOKUP ELEMENTS */
        };
        this.viewElements = [];
        this.selected = [
        /** SELECTED */
        ];
        this.disabled = [
        /** DISABLED */
        ];
        this.viewList = [];
        this.activeScope = null;
        this.unfoldDisabledList = (disabled) => {
            if (!disabled.length)
                return [];
            return disabled.map(tag => this.unfoldTag(tag, tags)).reduce((p, n) => [...p, ...n]);
        };
        this.patchConfigLists = () => {
            const { months: default_months, weekDays: default_weekDays } = DEFAULT_CONFIG.i18n;
            const { months, weekDays } = this.plusConfig.i18n;
            this.plusConfig.i18n.months = patchArray(months, default_months);
            this.plusConfig.i18n.weekDays = patchArray(weekDays, default_weekDays);
        };
        this.select = (dateString) => {
            const { selectMode } = this.plusConfig;
            let selectList = [];
            if (selectMode === 'single') {
                selectList = [dateString];
            }
            else if (selectMode === 'multiple') {
                selectList = [...this.selected, dateString];
            }
            else if (selectMode === 'range') {
                if (this.selected.includes(dateString)) {
                    selectList = [];
                }
                else if (this.selected.length === 1) {
                    selectList = unfoldRange(this.selected[0], dateString);
                }
                else {
                    selectList = [dateString];
                }
            }
            const hasDisabled = this.checkIfHasDisabled(selectList, this.disabled);
            if (hasDisabled)
                return this.viewElements;
            const scopeSize = this.plusConfig.selectScopeSize;
            if (selectMode === 'range' && scopeSize > 0) {
                if (!this.activeScope) {
                    this.activeScope = this.generateScope(this.viewElements, this.disabled);
                    this.activeScope.activate(dateString, scopeSize);
                }
                else {
                    this.activeScope.deactivate();
                }
            }
            const selectedViewElements = this.selectMultipleDates(selectList, this.viewElements);
            this.viewElements = this.updateTags(tags, selectedViewElements);
            this.selected = selectList;
            this.onDateSelect.emit(this.selected);
            if (selectMode === 'range' && this.selected.length > 1)
                this.onRangeSelect.emit(this.selected);
        };
        this.deselect = (dateString) => {
            const { selectMode } = this.plusConfig;
            let selectList = [];
            if (selectMode === 'multiple') {
                selectList = this.selected.filter(s => s !== dateString);
            }
            if (selectMode === 'range') {
                if (this.activeScope)
                    this.activeScope.deactivate();
            }
            const selected = this.selectMultipleDates(selectList, this.viewElements);
            this.viewElements = this.updateTags(tags, selected);
            this.selected = selectList;
        };
        this.unfoldTag = (tag, tags) => {
            if (!(tag in tags))
                return [tag];
            return this.viewElements.map((month) => month.filter(dateElement => dateElement.tags[tag] === true)).reduce((p, n) => [...p, ...n]).map(dateElement => dateElement.dateString);
        };
    }
    updateViewElements(next) {
        this.registerViewDates(next);
        this.viewElements = next.map(month => month.map(dateString => {
            return this.registered[dateString];
        }));
    }
    componentWillLoad() {
        this.plusConfig = Object.assign({}, DEFAULT_CONFIG, this.plusConfig);
        this.patchConfigLists();
        this.viewList = this.createViewList(this.plusConfig.viewRange);
        this.updateTags(tags, this.viewElements);
        this.plusConfig.disabled = this.unfoldDisabledList(this.plusConfig.disabled);
        this.disableMultipleDates(this.plusConfig.disabled, this.viewElements);
        this.plusConfig.selected.forEach(this.select);
        if (this.plusConfig.layout === 'horizontal') {
            this.plusConfig.weekHeader = 'per-month';
        }
    }
    createViewList([start, end]) {
        const dates = unfoldRange(start, end);
        return groupByMonth(dates).flatten();
    }
    registerViewDates(viewList) {
        return viewList.forEach(month => month.forEach(dateString => {
            const registered = registerDate(this.registered, dateString);
            this.registered = registered;
        }));
    }
    generateScope(viewElements, disabledCache) {
        let disabled = [];
        return {
            activate: (dateString, scopeSize) => {
                const scopeRange = getScopeRange(dateString, scopeSize);
                return viewElements.map(month => month.map((dateElement) => {
                    const inScope = dateStringInRange(dateElement.dateString, scopeRange);
                    if (inScope) {
                        dateElement.disabled = false;
                    }
                    else {
                        dateElement.disabled = true;
                        this.disabled.push(dateElement.dateString);
                    }
                    this.disabled = disabled;
                    return dateElement;
                }));
            },
            deactivate: () => {
                const disabled = this.disableMultipleDates(disabledCache, this.viewElements);
                this.activeScope = null;
                return disabled;
            }
        };
    }
    checkIfHasDisabled(selected, disabled) {
        const map = {};
        disabled.forEach(d => map[d] = true);
        return selected.some(s => (s in map));
    }
    selectMultipleDates(dateStringList, viewElements) {
        return viewElements.map(month => month.map((dateElement) => {
            dateElement.checked = dateStringList.includes(dateElement.dateString);
            if (dateStringList.length > 1) {
                dateElement.rangeIndex = dateElement.checked ? dateStringList.indexOf(dateElement.dateString) : null;
                dateElement.rangeEndIndex = dateElement.checked ? dateStringList.length - 1 : null;
            }
            return dateElement;
        }));
    }
    disableMultipleDates(dateStringList, viewElements) {
        let disabled = [];
        const withDisabled = viewElements.map(month => month.map(dateElement => {
            const isDisabled = dateStringList.includes(dateElement.dateString);
            dateElement.disabled = isDisabled;
            if (isDisabled)
                disabled.push(dateElement.dateString);
            return dateElement;
        }));
        this.disabled = disabled;
        return withDisabled;
    }
    updateTags(tags, viewElements) {
        return viewElements.map(month => month.map((dateElement) => {
            for (const tag in tags) {
                dateElement.tags[tag] = tags[tag](dateElement);
            }
            return dateElement;
        }));
    }
    render() {
        return renderContainer.call(this, this.viewElements, this.plusConfig);
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
        "viewElements": {},
        "viewList": {}
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
                "original": "DateString[]",
                "resolved": "string[]",
                "references": {
                    "DateString": {
                        "location": "local"
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
                "original": "DateString[]",
                "resolved": "string[]",
                "references": {
                    "DateString": {
                        "location": "local"
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
            "propName": "viewList",
            "methodName": "updateViewElements"
        }]; }
}
