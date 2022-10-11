import { areIntervalsOverlapping } from 'date-fns';
import { isAfter } from 'date-fns/esm';
import { object, string, number, date, ValidationError, ref } from 'yup';
import { ApiEvent } from '../../../api/types';
import { getDateFromTime } from '../../../technical/helpers/date';

export type ErrorsFor<T> = Partial<{[k in keyof T]: string[];}>

export interface EventFormData {
    title: string;
    buyerId: number;
    vendorId: number;
    startTime: string;
    endTime: string;
}

let eventSchema = object({
    title: string().required().min(1),
    buyerId: number().required().positive().integer(),
    vendorId: number().required().positive().integer(),
    startTime: string().required(),
    endTime: string().required().test('endTime>startTime', 'endTime should be after startTime', (endTime, context) => {
        if (!endTime) {
            return false;
        }
        const startTime = context.parent.startTime;
        return isAfter(getDateFromTime(endTime), getDateFromTime(startTime));
    }),
});

export function validate(formData: EventFormData): ErrorsFor<EventFormData> {
    const errors: ErrorsFor<EventFormData> = {};
    try {
        eventSchema.validateSync(formData);
    } catch (e) {
        if (e instanceof ValidationError && e.path) {
            return {
                [e.path]: e.errors,
            };
        }
    }
    return {};
}

export function detectOverlaps(event: Omit<ApiEvent, 'id'>, events: ApiEvent[]) {
    return events.find(e => 
        areIntervalsOverlapping(
            { start: event.startDatetime, end: event.endDatetime },
            { start: e.startDatetime, end: e.endDatetime }
        )
    ) !== undefined;
}