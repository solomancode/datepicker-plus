import { DEFAULT_CONFIG, DEFAULT_CLASSES } from './config';
import { DateElement } from './DateElement';
import { renderContainer } from './templates';
import { checkIfValidDateString, getScopeRange, groupDates, patchArray, unfoldRange, NormDt } from './utils';
import { attributeChecks } from './attributes';
export class DatepickerPlus {
    constructor() {
        /**
         * date picker plus config passed as a prop.
         */
        this.plusConfig = DEFAULT_CONFIG;
        /**
         * register new created date objects for reuse
         */
        this.dateRegistry = {
        /** LOOKUP ELEMENTS */
        };
        /**
         * reactive state to update view elements
         */
        this.viewElements = [];
        /**
         * a list of isoString formated dates to be
         * selected.
         */
        this.selected = [
        /** SELECTED */
        ];
        /**
         * a list of isoString formated dates to be
         * disabled
         */
        this.disabled = [
        /** DISABLED */
        ];
        /**
         * a list of isoString formated dates to be
         * highlighted
         */
        this.highlighted = [
        /** HIGHLIGHTED */
        ];
        /**
         * scope controller object to enable/disable
         * selection scope
         */
        this.activeScope = null;
        /**
         * prepare configuration for initialization
         * fill in necessary data
         */
        this.patchConfigLists = () => {
            const { months: default_months, weekDays: default_weekDays } = DEFAULT_CONFIG.i18n;
            const { months, weekDays } = this.plusConfig.i18n;
            this.plusConfig.i18n.months = patchArray(months, default_months);
            this.plusConfig.i18n.weekDays = patchArray(weekDays, default_weekDays);
        };
        /**
         * dynamic dates can be achieved through a date attribute
         *
         * some examples of currently available date attributes are:
         * ( today - tomorrow - yesterday - past - future )
         *
         * this methods unfolds registered date attributes to it's corresponding dateString(s)
         * a date attribute might be unfolded to a list of corresponding dateStrings
         */
        this.unfoldDateStringListAttributes = (dateStringList) => {
            if (!dateStringList.length)
                return [];
            return dateStringList.map(dateString => {
                return checkIfValidDateString(dateString) ? [dateString] : this.unfoldAttribute(dateString);
            }).reduce((p, n) => [...p, ...n]);
        };
        /**
         * selects a date in different selection modes
         */
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
        /**
         * deselect a list of dates
         */
        this.deselect = (dateStringList) => {
            const { selectMode } = this.plusConfig;
            if (selectMode === 'range') {
                dateStringList = this.selected;
                if (this.activeScope && dateStringList.length === 1)
                    this.activeScope.deactivate();
            }
            dateStringList.forEach(dateString => {
                const dateElement = this.getDateElement(dateString);
                dateElement.setAttr(DEFAULT_CLASSES.checked, false);
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
        /**
         * returns a date element using it's dateString
         */
        this.getDateElement = (dateString) => {
            const NDStr = NormDt(dateString);
            return this.dateRegistry[NDStr];
        };
        /**
         * unfolds a date attribute within the
         * current active view.
         */
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
        /**
         * registers a date for later use
         */
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
        // unfold view dateString pair
        const viewRange = this.unfoldViewRange(this.plusConfig.viewRange);
        // create a date element for each dateString
        const createdElements = viewRange.map(month => month.map(this.registerDate));
        // set view elements, reactive prop. will trigger a re-render.
        this.viewElements = createdElements;
        // disable
        const disabled = this.unfoldDateStringListAttributes(this.plusConfig.disabled);
        this.disableMultipleDates(disabled);
        // select
        const selected = this.unfoldDateStringListAttributes(this.plusConfig.selected);
        this.checkDatesBeforeSelect(selected);
    }
    /**
     * checks for valid select conditions before
     * applying date select
     */
    checkDatesBeforeSelect(selected) {
        if (this.plusConfig.selectMode === 'range' && selected.length < 2) {
            console.info('%c— Date selection will be cancelled —\n', 'color: #e52', 'Range select mode requires a minimum of two dates to select.');
        }
        else {
            selected.forEach(this.select);
        }
    }
    /**
     * given two dates this method will return
     * the dates in between formatted for view
     */
    unfoldViewRange([start, end]) {
        const dates = unfoldRange(start, end);
        return groupDates(dates).toArray();
    }
    /**
     * generates a selection constraint scope
     */
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
    /**
     * highlight potential select candidates
     */
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
    /**
     * clear highlighted dates
     */
    clearHighlighted() {
        this.highlighted.forEach(dateString => {
            const dateElement = this.getDateElement(dateString);
            if (dateElement)
                dateElement.removeAttr('highlighted');
        });
        this.highlighted = [];
        this.onHighlightClear.emit(void 0);
    }
    /**
     * checks if selected contains a disabled date
     */
    checkIfHasDisabled(selected, disabled) {
        const map = {};
        disabled.forEach(d => map[d] = true);
        return selected.some(s => (s in map));
    }
    /**
     * select multiple dates and applies
     * required attributes
     */
    selectMultipleDates(dateStringList) {
        dateStringList.forEach(dateString => {
            const dateElement = this.getDateElement(dateString);
            if (!dateElement)
                return;
            dateElement.setAttr(DEFAULT_CLASSES.checked, true);
            if (dateStringList.length > 1) {
                const checked = dateElement.getAttr(DEFAULT_CLASSES.checked);
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
    /**
     * disable multiple dates
     */
    disableMultipleDates(dateStringList) {
        this.disabled = dateStringList.filter(dateString => {
            const dateElement = this.getDateElement(dateString);
            if (!dateElement)
                return false;
            dateElement.setAttr(DEFAULT_CLASSES.disabled, true);
            return true;
        });
    }
    /**
     * enables multiple dates
     */
    enableMultipleDates(dateStringList) {
        dateStringList.forEach(dateString => {
            const dateElement = this.getDateElement(dateString);
            if (!dateElement)
                return;
            dateElement.setAttr(DEFAULT_CLASSES.disabled, false);
        });
        this.disabled = this.disabled.filter(dateString => !dateStringList.includes(dateString));
    }
    /**
     * RENDER... 👀
     *
     */
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
                        "location": "import",
                        "path": "../../datepicker-plus"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "date picker plus config passed as a prop."
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
                "text": "emits when a date is selected.\nuse it to react to date selected"
            },
            "complexType": {
                "original": "DateString[]",
                "resolved": "string[]",
                "references": {
                    "DateString": {
                        "location": "import",
                        "path": "../../datepicker-plus"
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
                "text": "emits when a date is deselected\nuse it to react to date deselected"
            },
            "complexType": {
                "original": "DateString[]",
                "resolved": "string[]",
                "references": {
                    "DateString": {
                        "location": "import",
                        "path": "../../datepicker-plus"
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
                "text": "emits when a complete date range is selected\nuse it to react to a complete date range selected"
            },
            "complexType": {
                "original": "DateString[]",
                "resolved": "string[]",
                "references": {
                    "DateString": {
                        "location": "import",
                        "path": "../../datepicker-plus"
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
                "text": "emits when a date or more is highlighted as\npotential select candidate"
            },
            "complexType": {
                "original": "DateString[]",
                "resolved": "string[]",
                "references": {
                    "DateString": {
                        "location": "import",
                        "path": "../../datepicker-plus"
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
                "text": "emits when date highlight is cleared after\ndates deselect"
            },
            "complexType": {
                "original": "void",
                "resolved": "void",
                "references": {}
            }
        }]; }
}
