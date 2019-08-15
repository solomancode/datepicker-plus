import { IDateElement } from "./createDateElement";
import { DateString } from "./datepicker-plus";

export const dateToString = (date: Date) => {
    const yyyy = date.getFullYear()
    const month = date.getMonth()
    const mm = (month + 1)
    const dd = date.getDate()
    return `${yyyy}-${mm}-${dd}`
}

export const getDateComponents = (dateString: string) => {
    return dateString.split('-').map(s => parseInt(s))
}

export const stringToDate = (dateString: string) => {
    const [year, month, day] = getDateComponents(dateString)
    const date = new Date()
    date.setFullYear(year)
    date.setMonth(month - 1)
    date.setDate(day)
    return date;
}

export const getNextDay = (date: Date | string) => {
    const isStringDate = typeof date === 'string';
    const nextDay = isStringDate ? stringToDate(date as string) : new Date(date);
    nextDay.setDate(nextDay.getDate() + 1)
    return isStringDate ? dateToString(nextDay) : nextDay
}
  
export const isSameDate = (date1: Date, date2: Date) => {
    if (date1.getDate() !== date2.getDate()) return false;
    if (date1.getUTCMonth() !== date2.getUTCMonth()) return false;
    if (date1.getFullYear() !== date2.getFullYear()) return false;
    return true;
}

export const monthToWeeks = (month: IDateElement[]) => {
    let week = [];
    let weeks = [];
    month.forEach(day => {
        if (day.dayOfWeek===6) {
            week.push(day)
            weeks.push(week)
            week = []
        } else {
            week.push(day)
        }
    })
    if (week.length) {
        weeks.push(week)
    }
    return weeks;
}

export const dateStringInRange = (dateString: string, dateRange: [string, string]) => {
    const [year, month, day] = getDateComponents(dateString)
    const [year0, month0, day0] = getDateComponents(dateRange[0])
    const [year1, month1, day1] = getDateComponents(dateRange[1])
    if (day < day0 || day > day1) return false;
    if (month < month0 || month > month1) return false;
    if (year < year0 || year > year1) return false;
    return true;
}

export const getCurrentMonthRange = () => {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return [ dateToString(firstDay), dateToString(lastDay) ]
}

export const getDatesBetween = (dateString0: string, dateString1: string): string[] => {
    if (dateString0===dateString1) return [];
    const [start, end] = sortDates([dateString0, dateString1])
    let rangeDates = []
    let currentDateString = getNextDay(start) as string;
    while (currentDateString!==end) {
        if (rangeDates.length>3000) openGithubIssue({ title: 'Memory leak @ getDatesBetween', label: 'bug', body: JSON.stringify({dateString0,dateString1},null,2)})
        rangeDates.push(currentDateString)
        currentDateString = getNextDay(currentDateString) as string;
    }
    return rangeDates;
}

export const parsePropJSON = (prop: string) => {
    return JSON.parse(prop.replace(/'/g,'"'))
}

export const sortDates = ([dateString0, dateString1]: [DateString, DateString]) => {
    const dt0 = stringToDate(dateString0)
    const dt1 = stringToDate(dateString1)
    return (dt0.valueOf() - dt1.valueOf()) > 0 ? [dateString1, dateString0] : [dateString0, dateString1];
}

interface IGithubIssueParams {
    title: string
    body: string
    label: string
}

export const dateOffset = (date0: Date, date1: Date) => {
    return Math.ceil((date0.getTime()-date1.getTime())/86400000)
}

export const patchArray = (target: any[] = [], source: any) => {
    return source.map((itm: any, i: any) => target[i] || itm)
}

export const openGithubIssue = ({ title, body, label }: IGithubIssueParams) => {
    const tl = 'title=' + encodeURIComponent(title)
    const lb = 'labels=' + encodeURIComponent(label)
    const bd = 'body=' + encodeURIComponent(body)
    throw (
    "Stopped to prevent memory leak.\n\n🐞 Create a new issue:\n"+
    `https://github.com/solomancode/datepicker-plus/issues/new?${lb}&${tl}&${bd}`
    );
}