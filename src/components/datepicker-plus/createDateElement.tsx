import { getDateComponents, stringToDate } from "./utils";
import { EventEmitter } from "@stencil/core";
import { DEFAULT_CLASSES } from "./config";
import { DatepickerPlus } from "./datepicker-plus";

export interface IDateTags {
    isToday(): boolean
    isTomorrow(): boolean
    isYesterday(): boolean
    isPastDate(): boolean
    isFutureDate(): boolean
}

export interface IDateClassList {
    classListString: string,
    updateClassListString(): string
}

export interface IDateHelperMethods {
    dateObject(): Date
    dateString(): string
    offset(): void
}

export interface IDateOptions {
    checked?: boolean
    disabled?: boolean
}

export interface IDateElement extends IDateOptions, IDateHelperMethods, IDateTags, IDateClassList {
    day: number
    month: number
    year: number
    dayOfWeek: number
    events: {[key: string]: EventEmitter}
    el: HTMLInputElement
    datepickerPlus: DatepickerPlus
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
        const date = (this as IDateElement).dateObject().getTime()
        const now = new Date().getTime()
        return Math.ceil((date-now)/86400000)
    }
})

const composeDateTags = () => ({
    isToday() {
        return this.offset() === 0;
    },
    isTomorrow() {
        return this.offset() === 1;
    },
    isYesterday() {
        return this.offset() === -1;
    },
    isPastDate() {
        return this.offset() < 0;
    },
    isFutureDate() {
        return this.offset() > 0
    }
})

const composeDateClassList = () => ({
    classListString: DEFAULT_CLASSES.day,
    updateClassListString() {
        const date = (this as IDateElement)
        const SEP = ' '
        const disabled = date.disabled ? SEP + DEFAULT_CLASSES.disabled : ''
        const selected = date.checked ? SEP + DEFAULT_CLASSES.selected : ''
        const today = date.isToday() ? SEP + DEFAULT_CLASSES.today : ''
        const classList = DEFAULT_CLASSES.day + disabled + selected + today;
        this.classListString = classList
        return classList
    }
})

export const createdDateElements: {[key: string]: IDateElement} = {}

const isCreatedDateElement = (dateString: string) => {
    return (dateString in createdDateElements)
}

export function createDateElement({ dateString, options, datepickerPlus }: IDateParams): IDateElement {
    
    const [year, month, day] = getDateComponents(dateString)

    const dateOptions = Object.create({
        datepickerPlus,
        createdDateElements,
        ...composeDateOptions(options),
        ...composeDateHelpers(dateString),
        ...composeDateTags(),
        ...composeDateClassList()
    })

    if ( isCreatedDateElement(dateString) ) {
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