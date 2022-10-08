import { describe, expect, it } from "vitest";
import { getClosingDatetime, getNumberOfSlots, getOpeningDatetime } from "./date";

describe('date helper - getOpeningDatetime', () => {
    it('should return the opening date for any day', () => {
        const dates = [
            new Date('2022-10-10 12:15:31'),
            new Date('2022-10-10 23:59:59'),
            new Date('2022-10-11 00:00:00'),
        ];
        const expectedResults = [
            new Date('2022-10-10 09:00:00'),
            new Date('2022-10-10 09:00:00'),
            new Date('2022-10-11 09:00:00'),
        ];

        dates.forEach((date, index) => {
            expect(getOpeningDatetime(date).toISOString()).toEqual(expectedResults[index].toISOString());
        })
    })
});


describe('date helper - getClosingDatetime', () => {
    it('should return the opening date for any day', () => {
        const dates = [
            new Date('2022-10-10 12:15:31'),
            new Date('2022-10-10 23:59:59'),
            new Date('2022-10-11 00:00:00'),
        ];
        const expectedResults = [
            new Date('2022-10-10 18:00:00'),
            new Date('2022-10-10 18:00:00'),
            new Date('2022-10-11 18:00:00'),
        ];

        dates.forEach((date, index) => {
            expect(getClosingDatetime(date).toISOString()).toEqual(expectedResults[index].toISOString());
        })
    })
});

describe('date helper - getNumberOfSlots', () => {
    it('should return the opening date for any day', () => {
        const ranges = [
            [new Date('2022-10-10 09:00:00'), new Date('2022-10-10 09:15:00')],
            [new Date('2022-10-10 09:00:00'), new Date('2022-10-10 09:30:00')],
            [new Date('2022-10-10 09:00:00'), new Date('2022-10-10 09:45:00')],
            [new Date('2022-10-10 09:00:00'), new Date('2022-10-10 10:00:00')],
        ];
        const expectedResults = [
            1,
            2,
            3,
            4
        ];

        ranges.forEach((range, index) => {
            expect(getNumberOfSlots(range[0], range[1])).toEqual(expectedResults[index]);
        })
    })
});

