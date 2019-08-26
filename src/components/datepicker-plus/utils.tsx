import { IDateElement } from "./registerDate";
import { DateString } from "./datepicker-plus";
import { DEFAULT_CLASSES } from "./config";

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

export const dateStringInRange = (dateString: string, dateRange: [string, string]) => {
    const [ start, end ] = sortDates(dateRange)
    const targetDate = new Date(dateString)
    const startOffset = dateOffset(targetDate, new Date(start))
    const endOffset = dateOffset(targetDate, new Date(end))
    return startOffset >= 0 && endOffset <= 0;
}

export const getCurrentMonthRange = () => {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return [ dateToString(firstDay), dateToString(lastDay) ]
}

export const unfoldRange = (dateString0: string, dateString1: string): string[] => {
    if (dateString0===dateString1) return [];
    const [start, end] = sortDates([dateString0, dateString1])
    let rangeDates = []
    let currentDateString = getNextDay(start) as string;
    while (currentDateString!==end) {
        if (rangeDates.length>3000) openGithubIssue({ title: 'Memory leak @ getDatesBetween', label: 'bug', body: JSON.stringify({dateString0,dateString1},null,2)})
        rangeDates.push(currentDateString)
        currentDateString = getNextDay(currentDateString) as string;
    }
    return [start, ...rangeDates, end];
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

interface IDateGroup {
    sorted: {
        years: number[],
        months: { [key: number]: number[] }
    }
    toArray(): DateString[][]
}

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
        const [year, month] = getDateComponents(dateString)
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

export const checkIfValidDateString = (dateString: DateString) => {
    let date = new Date(dateString);
    return isNaN(date.getDate()) ? false : true; 
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

export const getScopeRange = (scopeCenter: DateString, scopeSize: number) => {
    const start = new Date(scopeCenter)
    const startDay = start.getDate()
    start.setDate(startDay-scopeSize)
    const end = new Date(scopeCenter)
    const endDate = end.getDate()
    end.setDate(endDate + scopeSize)
    return [start, end].map(date => dateToString(date)) as [DateString, DateString]
}

export const generateDateClass = (dateElement: IDateElement) => {
    let tags = Object.keys(dateElement.tags)
    const classes = [
        DEFAULT_CLASSES.day,
        dateElement.checked ? DEFAULT_CLASSES.selected : null,
        dateElement.disabled ? DEFAULT_CLASSES.disabled : null,
        ...tags.filter(tag => dateElement.tags[tag]===true)
    ];
    return classes.filter(c=>c).join(' ')
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