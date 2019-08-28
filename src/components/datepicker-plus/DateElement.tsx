import { DateString } from "./datepicker-plus";
import { DEFAULT_CLASSES } from "./config";
import { AttributeCheckFn, attributeChecks } from "./attributes";

export class DateElement {

    private pendingQueue: (() => boolean)[] = []

    /**
     * DOM ELEMENT REFERENCE
     */
    private DateDOMElement: HTMLTimeElement
    private checkboxDOMElement: HTMLInputElement

    hookDOMElement(element: HTMLTimeElement | HTMLInputElement): void {
        if (element instanceof HTMLTimeElement) {
            this.DateDOMElement = element
        } else if (element instanceof HTMLInputElement) {
            this.checkboxDOMElement = element
        }
        this.pendingQueue = this.pendingQueue.filter(fn=>fn.call(this) === false)
    }

    updateDateClasses() {
        if (this.DateDOMElement) {
            this.DateDOMElement.setAttribute(
                'class',
                DEFAULT_CLASSES.day + ' ' +
                Object.keys(this.attributes)
                .filter(attr => this.attributes[attr] === true).join(' ')
            )
            return true;
        } else {
            this.pendingQueue.push(this.updateDateClasses)
        }
        return true; // success, remove from queue
    }
    
    /**
     * DATE COMPONENTS
     */
    year: number; month: number; day: number; dayOfWeek: number

    /**
     * DATE ATTRIBUTES
     */
    private attributes: { [key: string]: any } = {} = {
        /**
         * DATE ATTRIBUTES
         */
    }

    private updateCheckboxAttribute(attr: string, value: any) {
        if (this.checkboxDOMElement) {
            this.checkboxDOMElement[attr] = value;
        } else {
            this.pendingQueue.push(() => {
                if (!this.checkboxDOMElement) return false;
                this.checkboxDOMElement[attr] = value;
                this.updateDateClasses()
                return true; // success, remove from queue
            })
        }
        this.updateDateClasses()
    }
    
    private updateDOMAttribute(attr: string, value: any) {
        if (attr==='checked'||attr==='disabled') {
            this.updateCheckboxAttribute(attr, value);
        }
        this.updateDateClasses()

    }
    
    setAttr(attr: string, value: any): void {
        this.attributes[attr] = value
        this.updateDOMAttribute(attr, value)
    }

    getAttr(attr: string): any {
        return this.attributes[attr]
    }

    hasAttr(attr: string): boolean {
        return attr in this.attributes
    }

    removeAttr(attr: string) {
        delete this.attributes[attr]
    }

    resetRangeAttributes() {
        this.removeAttr('rangeIndex')
        this.removeAttr('rangeEndIndex')
        this.removeAttr('rangeStart')
        this.removeAttr('rangeEnd')
        this.removeAttr('connector')
    }

    updateAttributes(attributes: {[key: string]: AttributeCheckFn}) {
        for (const attr in attributes) {
            if (attributes.hasOwnProperty(attr)) {
                const attributeCheck = attributes[attr];
                if (attributeCheck(this) === true) {
                    this.setAttr(attr, true)
                }
            }
        }
    }

    /**
     * DATE OBJECT
     */
    date: Date;
    
    constructor(public dateString: DateString) {
        this.date = new Date(dateString);
        this.day = this.date.getDate();
        this.month = this.date.getMonth() + 1;
        this.year = this.date.getFullYear();
        this.dayOfWeek = this.date.getDay();
        this.updateAttributes(attributeChecks)
    }
}