import { addMinutes, differenceInMinutes, format, Interval, isBefore, isEqual } from "date-fns";
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

export function getNextTimeslot(datetime: Date) {
    return addMinutes(datetime, SLOT_SIZE_IN_MINUTES);
}

export function getTimeSlots(openingHour: number, openingMinute: number, closingHour: number, closingMinute: number)
{
    const timeSlots = [];

    const openingDatetime = getOpeningDatetime(new Date());
    const closingDatetime = getClosingDatetime(new Date());

    let timeslotStart = new Date(openingDatetime);
    let timeslotEnd = getNextTimeslot(openingDatetime);

    while(isBefore(timeslotEnd, closingDatetime) || isEqual(timeslotEnd, closingDatetime)) {
        timeSlots.push({
            start: timeslotStart,
            end: timeslotEnd
        });

        timeslotStart = new Date(timeslotEnd);
        timeslotEnd = getNextTimeslot(timeslotEnd);
    }
    
    return timeSlots;
}

export function combineTimeAndDate(timeStr: string, date: Date = new Date()): Date {
    const segments = timeStr.split(':');
    const time = {
        hours: parseInt(segments[0]),
        minutes: parseInt(segments[1]),
    };
    const returnedDate = new Date(date);
    returnedDate.setHours(time.hours, time.minutes, 0, 0);
    return returnedDate;
}