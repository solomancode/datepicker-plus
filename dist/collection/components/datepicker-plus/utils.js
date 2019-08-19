import { DEFAULT_CLASSES } from "./config";
export const dateToString = (date) => {
    const yyyy = date.getFullYear();
    const month = date.getMonth();
    const mm = (month + 1);
    const dd = date.getDate();
    return `${yyyy}-${mm}-${dd}`;
};
export const getDateComponents = (dateString) => {
    return dateString.split('-').map(s => parseInt(s));
};
export const stringToDate = (dateString) => {
    const [year, month, day] = getDateComponents(dateString);
    const date = new Date();
    date.setFullYear(year);
    date.setMonth(month - 1);
    date.setDate(day);
    return date;
};
export const getNextDay = (date) => {
    const isStringDate = typeof date === 'string';
    const nextDay = isStringDate ? stringToDate(date) : new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    return isStringDate ? dateToString(nextDay) : nextDay;
};
export const isSameDate = (date1, date2) => {
    if (date1.getDate() !== date2.getDate())
        return false;
    if (date1.getUTCMonth() !== date2.getUTCMonth())
        return false;
    if (date1.getFullYear() !== date2.getFullYear())
        return false;
    return true;
};
export const dateStringInRange = (dateString, dateRange) => {
    const [year, month, day] = getDateComponents(dateString);
    const [year0, month0, day0] = getDateComponents(dateRange[0]);
    const [year1, month1, day1] = getDateComponents(dateRange[1]);
    if (day < day0 || day > day1)
        return false;
    if (month < month0 || month > month1)
        return false;
    if (year < year0 || year > year1)
        return false;
    return true;
};
export const getCurrentMonthRange = () => {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return [dateToString(firstDay), dateToString(lastDay)];
};
export const unfoldRange = (dateString0, dateString1) => {
    if (dateString0 === dateString1)
        return [];
    const [start, end] = sortDates([dateString0, dateString1]);
    let rangeDates = [];
    let currentDateString = getNextDay(start);
    while (currentDateString !== end) {
        if (rangeDates.length > 3000)
            openGithubIssue({ title: 'Memory leak @ getDatesBetween', label: 'bug', body: JSON.stringify({ dateString0, dateString1 }, null, 2) });
        rangeDates.push(currentDateString);
        currentDateString = getNextDay(currentDateString);
    }
    return [start, ...rangeDates, end];
};
export const parsePropJSON = (prop) => {
    return JSON.parse(prop.replace(/'/g, '"'));
};
export const sortDates = ([dateString0, dateString1]) => {
    const dt0 = stringToDate(dateString0);
    const dt1 = stringToDate(dateString1);
    return (dt0.valueOf() - dt1.valueOf()) > 0 ? [dateString1, dateString0] : [dateString0, dateString1];
};
export const dateOffset = (date0, date1) => {
    return Math.ceil((date0.getTime() - date1.getTime()) / 86400000);
};
export const patchArray = (target = [], source) => {
    return source.map((itm, i) => target[i] || itm);
};
export const groupByMonth = (dateString) => {
    const map = Object.create({
        flatten() {
            const flat = [];
            for (let index = 1; index <= 12; index++) {
                if (index in this)
                    flat.push(map[index]);
            }
            return flat;
        }
    });
    dateString.forEach(dateString => {
        const [, month] = getDateComponents(dateString);
        if (month in map) {
            map[month].push(dateString);
        }
        else {
            map[month] = [dateString];
        }
    });
    return map;
};
export const monthToWeeks = (month) => {
    let week = [];
    let weeks = [];
    month.forEach(day => {
        if (day.dayOfWeek === 6) {
            week.push(day);
            weeks.push(week);
            week = [];
        }
        else {
            week.push(day);
        }
    });
    if (week.length) {
        weeks.push(week);
    }
    return weeks;
};
export const generateDateClass = (dateElement) => [
    DEFAULT_CLASSES.day,
    dateElement.checked ? DEFAULT_CLASSES.selected : null
].filter(c => c).join(' ');
export const openGithubIssue = ({ title, body, label }) => {
    const tl = 'title=' + encodeURIComponent(title);
    const lb = 'labels=' + encodeURIComponent(label);
    const bd = 'body=' + encodeURIComponent(body);
    throw ("Stopped to prevent memory leak.\n\n🐞 Create a new issue:\n" +
        `https://github.com/solomancode/datepicker-plus/issues/new?${lb}&${tl}&${bd}`);
};
