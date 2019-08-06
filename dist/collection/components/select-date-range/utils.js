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
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay;
};
export const getDateRange = (start, end) => {
    let startDate = stringToDate(start);
    let endDate = stringToDate(end);
    endDate = getNextDay(endDate);
    return [startDate, endDate];
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
