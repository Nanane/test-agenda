import userEvent from '@testing-library/user-event'
import { render, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import Events from ".";

describe('Events page', () => {
    beforeAll(() => {
        const startDatetime = new Date();
        const endDatetime = new Date();

        startDatetime.setHours(11,0,0,0);
        endDatetime.setHours(12,30,0,0);

        vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify([
            {
                title: 'event 1',
                buyerId: 1,
                vendorId: 1,
                startDatetime,
                endDatetime,
            }
        ]));
    })

    it('should allow for creating an appointment', async () => {
        const screen = render(<Events />);
        await userEvent.click(screen.getByTestId('btn-show-create-event-modal'));

        expect(screen.queryByTestId('submit')).toBeDefined();
        expect(screen.queryByTestId('input-title')).toBeDefined();

        await userEvent.type(screen.getByTestId('input-title'), 'Mon event');
        await userEvent.click(screen.getByTestId('submit'));

        expect(screen.queryByTestId('submit')).toBeNull();
    });

    it('should display current events', async () => {
        const screen = render(<Events />);
        await userEvent.click(screen.getByTestId('btn-show-create-event-modal'));

        expect(screen.queryByTestId('submit')).toBeDefined();
        expect(screen.queryByTestId('input-title')).toBeDefined();

        await userEvent.type(screen.getByTestId('input-title'), 'Mon event');
        await userEvent.click(screen.getByTestId('submit'));

        expect(screen.queryByTestId('submit')).toBeNull();
        waitFor(() => expect(screen.getByText('Mon event')).toBeDefined());
    });

    it.todo('should allow event deletion', () => {});

    it.todo('should allow to change the current date', () => {});

    it.todo('should allow to edit events', () => {});
    
    it.todo('should allow to move events', () => {});

})