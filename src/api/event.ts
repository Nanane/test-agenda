import { faker } from "@faker-js/faker";
import { generateFakeId } from "../helpers/faker";
import { ApiEvent } from "./types";

/**
 * This file mocks calls to the /events backend with a local storage
 */

function getLocalStorageKey(day: Date) {
    day.setHours(0,0,0,0);
    return 'events-'+day.toISOString();
}

export async function fetchEvents(day: Date): Promise<ApiEvent[]> {
    const key = getLocalStorageKey(day);
    const json = localStorage.getItem(key) || '[]'; // default to nothing
    return JSON.parse(json);
}

export async function createEvent(eventData: Omit<ApiEvent, 'id'>): Promise<ApiEvent> {
    const key = getLocalStorageKey(eventData.startDatetime);
    const events = await fetchEvents(eventData.startDatetime);
    const fakeEvent = {
        id: generateFakeId(),
        ...eventData
    };
    events.push(fakeEvent);
    localStorage.setItem(key, JSON.stringify(events));
    return fakeEvent;
}

export async function deleteEvent(event: ApiEvent): Promise<ApiEvent> {
    const key = getLocalStorageKey(event.startDatetime);
    const events = await fetchEvents(event.startDatetime);
    const eventIndex = events.findIndex(e => e.id === event.id);
    if (eventIndex === -1) {
        throw new Error('event could not be deleted');
    }
    const newEvents = events.splice(eventIndex, 1);
    localStorage.setItem(key, JSON.stringify(newEvents));
    return event;
}