import { getDateComponents, stringToDate, dateOffset } from "./utils";
import { EventEmitter } from "@stencil/core";
import { DEFAULT_CLASSES } from "./config";
import { DatepickerPlus } from "./datepicker-plus";
import * as tags from "./tags";

export interface IDateClassList {
    classListString: string,
    updateClassListString(): string
}

export interface IDateHelperMethods {
    dateObject(): Date
    dateString(): string
    offset(): number
}

export interface IDateOptions {
    checked?: boolean
    disabled?: boolean
    rangeIndex?: number
    rangeEnd?: boolean
    highlight?: boolean
}

export interface IDateElement extends IDateOptions, IDateHelperMethods, IDateClassList {
    day: number
    month: number
    year: number
    dayOfWeek: number
    events: {[key: string]: EventEmitter}
    el?: HTMLInputElement
    datepickerPlus: DatepickerPlus
    tags: {[key: string]: string}
}

export interface IDateParams {
    dateString: string
    datepickerPlus: DatepickerPlus
    options?: IDateOptions
}

const composeDateOptions = (options?: IDateOptions): IDateOptions => {
    return { checked: false, disabled: false, ...options }
}

const composeDateHelpers = (dateString: string): IDateHelperMethods => ({
    dateObject() {
        return stringToDate(dateString)
    },
    dateString() {
        return dateString
    },
    offset() {
        const date = (this as IDateElement).dateObject()
        const now = new Date()
        return dateOffset(date, now)
    }
})

const composeDateClassList = () => ({
    classListString: DEFAULT_CLASSES.day,
    updateClassListString() {
        const date = (this as IDateElement)
        const classList = [
            DEFAULT_CLASSES.day,
            date.highlight && DEFAULT_CLASSES.highlight,
            date.disabled && DEFAULT_CLASSES.disabled,
            date.checked && DEFAULT_CLASSES.selected
        ]
        for (const tag in tags) {
            const assertion = tags[tag];
            assertion(date, (c: string) => classList.push(c)) && Object.defineProperty(date.tags, tag, { value: true });
        }
        const classListString = classList.filter(c=>c).join(' ')
        date.el && date.el.setAttribute('class', classListString)
        return this.classListString = classListString
    }
})

export const createdDateElements: {[key: string]: IDateElement} = {
    /**
     * CREATED DATE ELEMENTS...
     */
}

export function createDateElement({ dateString, options, datepickerPlus }: IDateParams): IDateElement {
    
    const [year, month, day] = getDateComponents(dateString)

    const dateOptions = Object.create({
        tags: {},
        datepickerPlus,
        createdDateElements,
        ...composeDateOptions(options),
        ...composeDateHelpers(dateString),
        ...composeDateClassList()
    })

    if (dateString in createdDateElements) {
        const dateElement = createdDateElements[dateString]
        Object.assign(dateElement, dateOptions)
        return dateElement;
    }
    
    const dayOfWeek = new Date(dateString).getDay()
    const props = { year, month, day, dayOfWeek }
    const dateElement = Object.assign(dateOptions, props)
    dateElement.updateClassListString()
    Object.defineProperty(createdDateElements, dateString, { value: dateElement })

    return dateElement
}