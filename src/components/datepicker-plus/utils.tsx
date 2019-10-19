import { DateElement } from "./DateElement";
import { DateString } from "../../datepicker-plus";

/**
 * takes a date, returns a dateString
 */
export const dateToString = (date: Date) => {
    const yyyy = date.getFullYear()
    const month = date.getMonth()
    const mm = (month + 1)
    const dd = date.getDate()
    return NormDt(`${yyyy}-${mm}-${dd}`)
}

/**
 * given a dateString, return the next day dateString
 */
export const getNextDayString = (dateString: DateString) => {
    const next = new Date(dateString)
    next.setDate(next.getDate() + 1);
    return dateToString(next);
}

/**
 * check if a pair of dates are equal.
 */
export const isSameDate = (date1: Date, date2: Date) => {
    if (date1.getDate() !== date2.getDate()) return false;
    if (date1.getUTCMonth() !== date2.getUTCMonth()) return false;
    if (date1.getFullYear() !== date2.getFullYear()) return false;
    return true;
}

/**
 * checks if a certain dateString exists in a range of dates
 */
export const dateStringInRange = (dateString: string, dateRange: [string, string]) => {
    const [ start, end ] = sortDates(dateRange)
    const targetDate = new Date(dateString)
    const startOffset = dateOffset(targetDate, new Date(start))
    const endOffset = dateOffset(targetDate, new Date(end))
    return startOffset >= 0 && endOffset <= 0;
}

/**
 * current month start and end dates
 */
export const getCurrentMonthRange = () => {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return [ dateToString(firstDay), dateToString(lastDay) ]
}

// Normalize Date String (use it everywhere)
export const NormDt = (dateString: DateString) => {
    return dateString.split('-').map(s=>s.padStart(2,'0')).join('-');
}

/**
 * given a pair of dateStrings, this function will
 * generate all the dates in between.
 */
export const unfoldRange = (dateString0: string, dateString1: string): string[] => {
    const [start, end] = sortDates([dateString0, dateString1]).map(NormDt);
    if (start===end) return [];
    let rangeDates = []
    let currentDateString = getNextDayString(start);
    while (currentDateString !== end) {
        if (rangeDates.length>3000) openGithubIssue({ title: 'Memory leak @ utils.unfoldRange()', label: 'bug', body: JSON.stringify({dateString0,dateString1},null,2)})
        rangeDates.push(currentDateString)
        currentDateString = getNextDayString(currentDateString);
    }
    return [start, ...rangeDates, end];
}

/**
 * parse props JSON, usually props are
 * given in string format
 */
export const parsePropJSON = (prop: string) => {
    return JSON.parse(prop.replace(/'/g,'"'))
}

/**
 * sort a pair of dates
 */
export const sortDates = ([dateString0, dateString1]: [DateString, DateString]) => {
    const dt0 = new Date(dateString0)
    const dt1 = new Date(dateString1)
    return (dt0.valueOf() - dt1.valueOf()) > 0 ? [dateString1, dateString0] : [dateString0, dateString1];
}

interface IGithubIssueParams {
    title: string
    body: string
    label: string
}

/**
 * calculate the offset between two dates
 */
export const dateOffset = (date0: Date, date1: Date) => {
    return Math.ceil((date0.getTime()-date1.getTime())/86400000)
}

/**
 * fills an array's empty slots
 */
export const patchArray = (target: any[] = [], source: any) => {
    return source.map((itm: any, i: any) => target[i] || itm)
}

interface IDateGroup {
    sorted: {
        years: number[],
        months: { [key: number]: number[] }
    }
    toArray(): DateString[][]
}

/**
 * group dates for view.
 * TODO: elaborate more...
 */
export const groupDates = (dateStringList: DateString[]): IDateGroup => {
    const group: IDateGroup = Object.create({
        sorted: { years: [], months: {} },
        // [key: year]: { month: [...days] },
        toArray() {
            let sorted = [];
            this.sorted.years.forEach(year => {
                const month = Object.values(this[year]);
                if (month.length) sorted = [...sorted, ...month]
            });
            return sorted
        }
    });
    dateStringList.forEach(dateString => {
        const date = new Date(dateString)
        const year = date.getFullYear(), month = date.getMonth() + 1;
        if (group.hasOwnProperty(year) === false) {
            group[year] = {}
            group.sorted.years.push(year)
        }
        if (group[year].hasOwnProperty(month) === false) {
            group[year][month] = []
            if (group.sorted.months.hasOwnProperty(year)) {
                group.sorted.months[year].push(month)
            } else {
                group.sorted.months[year] = [month]
            }
        }
        group[year][month].push(dateString)
    })
    group.sorted.years = group.sorted.years.sort((a,b) => a-b)
    for (const year in group.sorted.months) {
        group.sorted.months[year] = group.sorted.months[year].sort((a,b) => a-b)
    }
    return group;
}

/**
 * checks if a given dateString is valid
 */
export const checkIfValidDateString = (dateString: DateString) => {
    let date = new Date(dateString);
    return isNaN(date.getDate()) ? false : true; 
}

/**
 * convert a month to weeks
 */
export const monthToWeeks = (month: DateElement[]) => {
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

/**
 * given scope center and size, this function will
 * calculate all the dates required to generate that scope
 */
export const getScopeRange = (scopeCenter: DateString, scopeSize: number) => {
    const start = new Date(scopeCenter)
    const startDay = start.getDate()
    start.setDate(startDay-scopeSize)
    const end = new Date(scopeCenter)
    const endDate = end.getDate()
    end.setDate(endDate + scopeSize)
    return [start, end].map(date => dateToString(date)) as [DateString, DateString]
}

/**
 * auto-open an issue if something weird happens.
 */
export const openGithubIssue = ({ title, body, label }: IGithubIssueParams) => {
    const tl = 'title=' + encodeURIComponent(title)
    const lb = 'labels=' + encodeURIComponent(label)
    const bd = 'body=' + encodeURIComponent(body)
    throw (
    "Stopped to prevent memory leak.\n\n🐞 Create a new issue:\n"+
    `https://github.com/solomancode/datepicker-plus/issues/new?${lb}&${tl}&${bd}`
    );
}