import { DEFAULT_CONFIG } from './config';
import { registerDate } from './registerDate';
import { renderContainer } from './templates';
import { groupByMonth, patchArray, unfoldRange } from './utils';
export class DatepickerPlus {
    constructor() {
        this.plusConfig = DEFAULT_CONFIG;
        this.registered = {
        /** LOOKUP ELEMENTS */
        };
        this.viewElements = [];
        this.selected = [
        /** SELECTED DATES */
        ];
        this.viewList = [];
        this.patchConfigLists = () => {
            const { months: default_months, weekDays: default_weekDays } = DEFAULT_CONFIG.i18n;
            const { months, weekDays } = this.plusConfig.i18n;
            this.plusConfig.i18n.months = patchArray(months, default_months);
            this.plusConfig.i18n.weekDays = patchArray(weekDays, default_weekDays);
        };
    }
    updateViewSelectedElements(next) {
        switch (this.plusConfig.selectMode) {
            case 'single':
                this.viewElements = this.selectDate(next[next.length - 1], this.viewElements);
                break;
            default:
                break;
        }
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
        this.selected = this.plusConfig.selected;
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
    selectDate(dateString, viewElements) {
        return viewElements.map(month => month.map(dateElement => {
            dateElement.checked = dateElement.dateString === dateString;
            return dateElement;
        }));
    }
    render() {
        console.count('RENDER:');
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
        "selected": {},
        "viewList": {}
    }; }
    static get watchers() { return [{
            "propName": "selected",
            "methodName": "updateViewSelectedElements"
        }, {
            "propName": "viewList",
            "methodName": "updateViewElements"
        }]; }
}
