import { DEFAULT_CONFIG } from './config';
import { DateElement } from './DateElement';
import { renderContainer } from './templates';
import { checkIfValidDateString, getScopeRange, groupDates, patchArray, unfoldRange, NormDt } from './utils';
import { attributeChecks } from './attributes';
export class DatepickerPlus {
    constructor() {
        this.plusConfig = DEFAULT_CONFIG;
        this.dateRegistry = {
        /** LOOKUP ELEMENTS */
        };
        this.viewElements = [];
        this.selected = [
        /** SELECTED */
        ];
        this.disabled = [
        /** DISABLED */
        ];
        this.highlighted = [
        /** HIGHLIGHTED */
        ];
        this.activeScope = null;
        this.unfoldDateStringList = (disabled) => {
            if (!disabled.length)
                return [];
            return disabled.map(dateString => {
                return checkIfValidDateString(dateString) ? [dateString] : this.unfoldAttribute(dateString);
            }).reduce((p, n) => [...p, ...n]);
        };
        this.patchConfigLists = () => {
            const { months: default_months, weekDays: default_weekDays } = DEFAULT_CONFIG.i18n;
            const { months, weekDays } = this.plusConfig.i18n;
            this.plusConfig.i18n.months = patchArray(months, default_months);
            this.plusConfig.i18n.weekDays = patchArray(weekDays, default_weekDays);
        };
        this.select = (dateString) => {
            const { selectMode } = this.plusConfig;
            // generate selected list
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
            // check if has disabled or return prev. state
            const hasDisabled = this.checkIfHasDisabled(selectList, this.disabled);
            if (hasDisabled)
                return this.viewElements;
            // generate select scope if range mode active
            const scopeSize = this.plusConfig.selectScopeSize;
            if (selectMode === 'range' && scopeSize > 0) {
                if (!this.activeScope) {
                    this.activeScope = this.generateScope(this.disabled);
                    this.activeScope.activate(dateString, scopeSize);
                }
                else {
                    this.activeScope.deactivate();
                }
            }
            // reset selected
            this.deselect(this.selected);
            // apply selected
            this.selectMultipleDates(selectList);
            // emit
            this.onDateSelect.emit(this.selected);
            if (selectMode === 'range' && this.selected.length > 1)
                this.onRangeSelect.emit(this.selected);
        };
        this.deselect = (dateStringList) => {
            const { selectMode } = this.plusConfig;
            if (selectMode === 'range') {
                dateStringList = this.selected;
                if (this.activeScope && dateStringList.length === 1)
                    this.activeScope.deactivate();
            }
            dateStringList.forEach(dateString => {
                const dateElement = this.getDateElement(dateString);
                dateElement.setAttr('checked', false);
                // clean range attributes
                if (selectMode === 'range') {
                    dateElement.resetRangeAttributes();
                }
                dateElement.updateDateClasses();
            });
            this.selected = this.selected.filter(s => !(dateStringList.includes(s)));
            this.clearHighlighted();
            this.onDeselect.emit(dateStringList);
        };
        this.getDateElement = (dateString) => {
            const NDStr = NormDt(dateString);
            return this.dateRegistry[NDStr];
        };
        this.unfoldAttribute = (attr) => {
            const unfolded = [];
            this.viewElements
                .reduce((p, n) => [...p, ...n])
                .forEach(dateElement => {
                if (dateElement.getAttr(attr)) {
                    unfolded.push(dateElement.dateString);
                }
            });
            return unfolded;
        };
        this.registerDate = (dateString) => {
            const NDStr = NormDt(dateString);
            if (NDStr in this.dateRegistry)
                return this.dateRegistry[NDStr];
            const dateElement = new DateElement(NDStr);
            this.dateRegistry[NDStr] = dateElement;
            return dateElement;
        };
    }
    componentWillLoad() {
        this.plusConfig = Object.assign({}, DEFAULT_CONFIG, this.plusConfig);
        this.patchConfigLists();
        if (this.plusConfig.layout === 'horizontal') {
            this.plusConfig.weekHeader = 'per-month';
        }
    }
    componentDidLoad() {
        /**
         * UNFOLD DATE STRING RANGE
         * CREATE & REGISTER
         * UPDATE VIEW ELEMENTS
         */
        const viewRange = this.unfoldViewRange(this.plusConfig.viewRange);
        const createdElements = viewRange.map(month => month.map(this.registerDate));
        this.viewElements = createdElements;
        // disable
        const disabled = this.unfoldDateStringList(this.plusConfig.disabled);
        this.disableMultipleDates(disabled);
        // select
        this.plusConfig.selected.forEach(this.select);
    }
    unfoldViewRange([start, end]) {
        const dates = unfoldRange(start, end);
        return groupDates(dates).toArray();
    }
    generateScope(disabledSnapshot) {
        return {
            activate: (dateString, scopeSize) => {
                const [scopeStart, scopeEnd] = getScopeRange(dateString, scopeSize);
                const [viewStart, viewEnd] = this.plusConfig.viewRange;
                const disableTargets = [
                    ...unfoldRange(viewStart, scopeStart),
                    ...unfoldRange(scopeEnd, viewEnd)
                ];
                this.disableMultipleDates(disableTargets);
            },
            deactivate: () => {
                this.enableMultipleDates(this.disabled);
                this.disableMultipleDates(disabledSnapshot);
                this.activeScope = null;
            }
        };
    }
    highlightON(dateString) {
        if (this.plusConfig.selectMode === 'range' && this.selected.length === 1) {
            this.clearHighlighted();
            this.highlighted = unfoldRange(this.selected[0], dateString);
            this.highlighted.forEach(dateString => {
                const dateElement = this.getDateElement(dateString);
                dateElement.setAttr('highlighted', true);
            });
            this.onHighlight.emit(this.highlighted);
        }
    }
    clearHighlighted() {
        this.highlighted.forEach(dateString => {
            const dateElement = this.getDateElement(dateString);
            if (dateElement)
                dateElement.removeAttr('highlighted');
        });
        this.highlighted = [];
        this.onHighlightClear.emit(void 0);
    }
    checkIfHasDisabled(selected, disabled) {
        const map = {};
        disabled.forEach(d => map[d] = true);
        return selected.some(s => (s in map));
    }
    selectMultipleDates(dateStringList) {
        dateStringList.forEach(dateString => {
            const dateElement = this.getDateElement(dateString);
            if (!dateElement)
                return;
            dateElement.setAttr('checked', true);
            if (dateStringList.length > 1) {
                const checked = dateElement.getAttr('checked');
                dateElement.setAttr('rangeIndex', checked ? dateStringList.indexOf(dateElement.dateString) : null);
                dateElement.setAttr('rangeEndIndex', checked ? dateStringList.length - 1 : null);
            }
            if (this.plusConfig.selectMode === 'range') {
                const { rangeStart, rangeEnd, connector } = attributeChecks;
                dateElement.updateAttributes({ rangeStart, rangeEnd, connector });
            }
        });
        this.selected = dateStringList;
    }
    disableMultipleDates(dateStringList) {
        this.disabled = dateStringList.filter(dateString => {
            const dateElement = this.getDateElement(dateString);
            if (!dateElement)
                return false;
            dateElement.setAttr('disabled', true);
            return true;
        });
    }
    enableMultipleDates(dateStringList) {
        dateStringList.forEach(dateString => {
            const dateElement = this.getDateElement(dateString);
            if (!dateElement)
                return;
            dateElement.setAttr('disabled', false);
        });
        this.disabled = this.disabled.filter(dateString => !dateStringList.includes(dateString));
    }
    render() {
        console.count('RENDER...');
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
        "viewElements": {}
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
            "method": "onDeselect",
            "name": "onDeselect",
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
        }, {
            "method": "onHighlight",
            "name": "onHighlight",
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
            "method": "onHighlightClear",
            "name": "onHighlightClear",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "void",
                "resolved": "void",
                "references": {}
            }
        }]; }
}
