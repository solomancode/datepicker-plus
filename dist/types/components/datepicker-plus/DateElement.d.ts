import { AttributeCheckFn } from "./attributes";
import { DateString } from "../../datepicker-plus";
export declare class DateElement {
    dateString: DateString;
    /**
     * pending operations to be called in
     * later time when a certain condition
     * is met.
     */
    private pendingQueue;
    /**
     * DOM ELEMENT REFERENCE
     */
    private DateDOMElement;
    private checkboxDOMElement;
    /**
     * hooks a DOM element reference and applies
     * pending operations.
     */
    hookDOMElement(element: HTMLTimeElement | HTMLInputElement): void;
    /**
     * update date class-list
     */
    updateDateClasses(): boolean;
    /**
     * DATE COMPONENTS
     */
    year: number;
    month: number;
    day: number;
    dayOfWeek: number;
    /**
     * DATE ATTRIBUTES
     */
    private attributes;
    /**
     * updates a date attribute
     */
    private updateCheckboxAttribute;
    /**
     * updates a DOM attribute
     */
    private updateDOMAttribute;
    setAttr(attr: string, value: any): void;
    getAttr(attr: string): any;
    hasAttr(attr: string): boolean;
    removeAttr(attr: string): void;
    /**
     * resets range attributes
     */
    resetRangeAttributes(): void;
    /**
     * update date attributes
     */
    updateAttributes(attributes: {
        [key: string]: AttributeCheckFn;
    }): void;
    /**
     * DATE OBJECT
     */
    date: Date;
    constructor(dateString: DateString);
}
