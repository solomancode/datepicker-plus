import { getDateComponents } from "./utils";

type DateEvents = 'onSelect'

export interface IDateEvents {
    onSelect?: (dateString: string, date: Date) => void | boolean
}

export interface IDateHelperMethods {
    dateObject(): Date
    dateString(): string
    select(): void
    bindEvent(event: DateEvents, fn: Function): void
}

export interface IDateOptions {
    checked?: boolean,
    disabled?: boolean
}

export interface IDateElement extends IDateOptions, IDateHelperMethods, IDateEvents {
    day: number,
    month: number,
    year: number,
    dayOfWeek: number,
    events: {[key: string]: Function}
}

const composeDateOptions = (options?: IDateOptions): IDateOptions => {
    return { checked: false, disabled: false, ...options }
}

const composeDateHelpers = (dateString: string): IDateHelperMethods => ({
    dateObject: () => this.stringToDate(dateString),
    dateString: () => dateString,
    select() { this.checked = true },
    bindEvent(event: string, fn: Function) { this.events[event] = fn }
})

export const createDateElement = (dateString: string, options?: IDateOptions): IDateElement => {
    const [year, month, day] = getDateComponents(dateString)
    const dateOptions = Object.create({
        events: {},
        ...composeDateOptions(options),
        ...composeDateHelpers(dateString),
    })
    const dayOfWeek = new Date(dateString).getDay()
    const props = { year, month, day, dayOfWeek }
    return Object.assign(dateOptions, props)
}