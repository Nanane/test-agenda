import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
    it('should display hello world', () => {
        const screen = render(<App />);
        expect(screen.getByText('Hello world')).toBeDefined();
    });
})