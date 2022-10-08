import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
    it('should display the events page', () => {
        const screen = render(<App />);
        expect(screen.getByText('Events for')).toBeDefined();
    });
})