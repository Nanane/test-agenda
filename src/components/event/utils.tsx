import { isAfter } from 'date-fns/esm';
import { object, string, number, date, ValidationError, ref } from 'yup';
import { combineTimeAndDate } from '../../helpers/date';

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
        return isAfter(combineTimeAndDate(endTime), combineTimeAndDate(startTime));
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
