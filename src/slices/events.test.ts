import { describe, it, beforeAll, expect } from "vitest";
import { configureStore, Store } from '@reduxjs/toolkit'
import eventsReducer, { addEvent, deleteEvent, EventsState } from './events';

describe('events reducer', () => {
    let store: Store<{ events: EventsState }>;
    beforeAll(() => {
        store = configureStore({
            reducer: {
                events: eventsReducer
            }
        })
    });

    it('should store fetched events in the state', () => {
        store.dispatch(addEvent({
            id: 1,
            title: 'mon event',
            buyerId: 1,
            vendorId: 1,
            startDatetime: new Date(),
            endDatetime: new Date(),
        }));

        const state = store.getState();
        expect(state.events.events.length).toEqual(1);
    });

    it.todo('should add a freshly created event in the state', () => {});

    it.todo('should remove a deleted event from the state', () => {})
})