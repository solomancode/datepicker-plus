import { getDateComponents } from "./utils";
export function registerDate(created, dateString) {
    const dayOfWeek = new Date(dateString).getDay();
    const [year, month, day] = getDateComponents(dateString);
    const dateElement = Object.create({
        tags: {},
        checked: false,
        disabled: false,
        year,
        month,
        day,
        dateString,
        dayOfWeek
    });
    if (dateString in created)
        return created;
    return Object.assign({}, created, { [dateString]: dateElement });
}
