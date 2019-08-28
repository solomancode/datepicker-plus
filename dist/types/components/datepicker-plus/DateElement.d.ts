import { DateString } from "./datepicker-plus";
import { AttributeCheckFn } from "./attributes";
export declare class DateElement {
    dateString: DateString;
    private pendingQueue;
    /**
     * DOM ELEMENT REFERENCE
     */
    private DateDOMElement;
    private checkboxDOMElement;
    hookDOMElement(element: HTMLTimeElement | HTMLInputElement): void;
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
    private updateCheckboxAttribute;
    private updateDOMAttribute;
    setAttr(attr: string, value: any): void;
    getAttr(attr: string): any;
    hasAttr(attr: string): boolean;
    removeAttr(attr: string): void;
    resetRangeAttributes(): void;
    updateAttributes(attributes: {
        [key: string]: AttributeCheckFn;
    }): void;
    /**
     * DATE OBJECT
     */
    date: Date;
    constructor(dateString: DateString);
}
