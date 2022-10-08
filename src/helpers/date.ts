import { differenceInMinutes } from "date-fns";
import { SLOT_SIZE_IN_MINUTES, OPENING_HOUR, OPENING_MINUTE, CLOSING_HOUR, CLOSING_MINUTE } from "../constants";

export function getOpeningDatetime(day: Date) {
    const openingDatetime = new Date(day);
    openingDatetime.setHours(OPENING_HOUR, OPENING_MINUTE,0,0);
    return openingDatetime;
}

export function getClosingDatetime(day: Date) {
    const closingDatetime = new Date(day);
    closingDatetime.setHours(CLOSING_HOUR, CLOSING_MINUTE,0,0);
    return closingDatetime;
}

export function getNumberOfSlots(dateFrom: Date, dateTo: Date) {
    return Math.ceil(differenceInMinutes(dateTo, dateFrom, { roundingMethod: 'ceil' }) / SLOT_SIZE_IN_MINUTES);
}