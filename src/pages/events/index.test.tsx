import userEvent from '@testing-library/user-event'
import { render, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Events from ".";

describe('Events page', () => {
    it('should allow for creating an appointment', async () => {
        const screen = render(<Events />);
        await userEvent.click(screen.getByTestId('btn-show-create-event-modal'));

        expect(screen.queryByTestId('submit')).toBeDefined();
        expect(screen.queryByTestId('input-title')).toBeDefined();

        await userEvent.type(screen.getByTestId('input-title'), 'Mon event');
        await userEvent.click(screen.getByTestId('submit'));

        expect(screen.queryByTestId('submit')).toBeNull();
    })
})