import { describe, expect, it } from "vitest";
import { EventFormData, validate } from "./utils";

describe('event form utils - validate', () => {
    it('should accept a valid event', () => {
        const ev: EventFormData = {
            title: 'mon event',
            buyerId: 1,
            vendorId: 1,
            startTime: '09:00',
            endTime: '17:00',
        };
        const errors = validate(ev);
        expect(errors).toEqual({});
    });
    it('should reject an event with invalid title', () => {
        const ev: EventFormData = {
            title: '',
            buyerId: 1,
            vendorId: 1,
            startTime: '09:00',
            endTime: '17:00',
        };
        const errors = validate(ev);
        expect(errors.title).length(1);
    });
    it('should reject an event without buyer', () => {
        const ev: EventFormData = {
            title: 'event title',
            buyerId: -1,
            vendorId: 1,
            startTime: '09:00',
            endTime: '17:00',
        };
        const errors = validate(ev);
        expect(errors.buyerId).length(1);
    });
    it('should reject an event without vendor', () => {
        const ev: EventFormData = {
            title: 'event title',
            buyerId: 1,
            vendorId: -1,
            startTime: '09:00',
            endTime: '17:00',
        };
        const errors = validate(ev);
        expect(errors.vendorId).length(1);
    });
    it('should reject an event with an endTime inferior to the startTime', () => {
        const ev: EventFormData = {
            title: 'event title',
            buyerId: 1,
            vendorId: 1,
            startTime: '18:00',
            endTime: '17:00',
        };
        const errors = validate(ev);
        expect(errors.endTime).length(1);
    });
})