import { getDateComponents, stringToDate } from "./utils";
import { EventEmitter } from "@stencil/core";

type DateEvents = 'onDateSelect'

export interface IDateEvents {
    onDateSelect?: EventEmitter
}

export interface IDateTags {
    isToday(): boolean
    isTomorrow(): boolean
    isYesterday(): boolean
    isPastDate(): boolean
    isFutureDate(): boolean
}

export interface IDateHelperMethods {
    dateObject(): Date
    dateString(): string
    select(): void
    deselect(): void
    enable(): void
    disable(): void
    offset(): void
    bindEvent(event: DateEvents, emitter: EventEmitter): void
}

export interface IDateOptions {
    checked?: boolean,
    disabled?: boolean
}

export interface IDateElement extends IDateOptions, IDateHelperMethods, IDateEvents, IDateTags {
    day: number
    month: number
    year: number
    dayOfWeek: number
    events: {[key: string]: EventEmitter}
    el: HTMLInputElement
}

export interface IDateParams {
    dateString: string
    options?: IDateOptions
    events?: IDateEvents
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
    select() {
        this.checked = true;
        this.el && (this.el.checked = true)
        this.events.onDateSelect.emit(this)
    },
    deselect() {
        this.checked = false;
        this.el && (this.el.checked = false)
        this.events.onDateDeselect.emit(this)
    },
    enable() {
        this.disabled = false;
        this.el && (this.el.disabled = false)
    },
    disable() {
        this.disabled = true;
        this.el && (this.el.disabled = true)
    },
    offset() {
        const date = (this as IDateElement).dateObject().getTime()
        const now = new Date().getTime()
        return Math.ceil((date-now)/86400000)
    },
    bindEvent(event: string, emitter: EventEmitter) { this.events[event] = emitter }
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

export const createdDateElements: {[key: string]: IDateElement} = {}

const isCreatedDateElement = (dateString: string) => {
    return (dateString in createdDateElements)
}

export const createDateElement = ({ dateString, options, events = {} }: IDateParams): IDateElement => {
    
    const [year, month, day] = getDateComponents(dateString)

    const dateOptions = Object.create({
        events,
        createdDateElements,
        ...composeDateOptions(options),
        ...composeDateHelpers(dateString),
        ...composeDateTags()
    })

    if ( isCreatedDateElement(dateString) ) {
        const dateElement = createdDateElements[dateString]
        Object.assign(dateElement, dateOptions)
        return dateElement;
    }
    
    const dayOfWeek = new Date(dateString).getDay()
    const props = { year, month, day, dayOfWeek }
    const dateElement = Object.assign(dateOptions, props)
    Object.defineProperty(createdDateElements, dateString, { value: dateElement })

    return dateElement
}