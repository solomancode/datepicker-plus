import { DEFAULT_CLASSES } from "./config";
import { attributeChecks } from "./attributes";
export class DateElement {
    constructor(dateString) {
        this.dateString = dateString;
        /**
         * pending operations to be called in
         * later time when a certain condition
         * is met.
         */
        this.pendingQueue = [];
        /**
         * DATE ATTRIBUTES
         */
        this.attributes = {} = {
        /**
         * DATE ATTRIBUTES
         */
        };
        this.date = new Date(dateString);
        this.day = this.date.getDate();
        this.month = this.date.getMonth() + 1;
        this.year = this.date.getFullYear();
        this.dayOfWeek = this.date.getDay();
        this.updateAttributes(attributeChecks);
    }
    /**
     * hooks a DOM element reference and applies
     * pending operations.
     */
    hookDOMElement(element) {
        if (element instanceof HTMLTimeElement) {
            this.DateDOMElement = element;
        }
        else if (element instanceof HTMLInputElement) {
            this.checkboxDOMElement = element;
        }
        this.pendingQueue = this.pendingQueue.filter(fn => fn.call(this) === false);
    }
    /**
     * update date class-list
     */
    updateDateClasses() {
        if (this.DateDOMElement) {
            this.DateDOMElement.setAttribute('class', DEFAULT_CLASSES.day + ' ' +
                Object.keys(this.attributes)
                    .filter(attr => this.attributes[attr] === true).join(' '));
            return true;
        }
        else {
            this.pendingQueue.push(this.updateDateClasses);
        }
        return true; // success, remove from queue
    }
    /**
     * updates a date attribute
     */
    updateCheckboxAttribute(attr, value) {
        if (this.checkboxDOMElement) {
            this.checkboxDOMElement[attr] = value;
        }
        else {
            this.pendingQueue.push(() => {
                if (!this.checkboxDOMElement)
                    return false;
                this.checkboxDOMElement[attr] = value;
                this.updateDateClasses();
                return true; // success, remove from queue
            });
        }
        this.updateDateClasses();
    }
    /**
     * updates a DOM attribute
     */
    updateDOMAttribute(attr, value) {
        if (attr === DEFAULT_CLASSES.checked || attr === DEFAULT_CLASSES.disabled) {
            this.updateCheckboxAttribute(attr, value);
        }
        this.updateDateClasses();
    }
    setAttr(attr, value) {
        this.attributes[attr] = value;
        this.updateDOMAttribute(attr, value);
    }
    getAttr(attr) {
        return this.attributes[attr];
    }
    hasAttr(attr) {
        return attr in this.attributes;
    }
    removeAttr(attr) {
        delete this.attributes[attr];
        this.updateDateClasses();
    }
    /**
     * resets range attributes
     */
    resetRangeAttributes() {
        this.removeAttr('rangeIndex');
        this.removeAttr('rangeEndIndex');
        this.removeAttr('rangeStart');
        this.removeAttr('rangeEnd');
        this.removeAttr('connector');
    }
    /**
     * update date attributes
     */
    updateAttributes(attributes) {
        for (const attr in attributes) {
            if (attributes.hasOwnProperty(attr)) {
                const attributeCheck = attributes[attr];
                if (attributeCheck(this) === true) {
                    this.setAttr(attr, true);
                }
            }
        }
    }
}
