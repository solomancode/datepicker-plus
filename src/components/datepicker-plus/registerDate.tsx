import { getDateComponents } from "./utils";
import { DateString } from "./datepicker-plus";

export interface IDateElement {
    dateString,
    tags: {[key: string]: string}
    checked: boolean
    disabled: boolean
    year: number
    month: number
    day: number
    dayOfWeek: number
}

export function registerDate(created: {[key: string]: IDateElement}, dateString: DateString): {[key: string]: IDateElement} {
    
    const dayOfWeek = new Date(dateString).getDay()
    const [year, month, day] = getDateComponents(dateString)

    const dateElement = Object.create({
        tags: {},
        checked: false,
        disabled: false,
        year,
        month,
        day,
        dateString,
        dayOfWeek
    })
    
    if (dateString in created) return created;
    
    return { ...created, [dateString]: dateElement }
}