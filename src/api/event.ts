import { generateFakeId } from "../specific-IGNORE-/faker";
import { ApiEvent } from "./types";

/**
 * This file mocks calls to the /events backend with a local storage
 */

 function hydrate(eventFromLocalStorage: any): ApiEvent {
    return {
        ...eventFromLocalStorage,
        startDatetime: new Date(eventFromLocalStorage.startDatetime),
        endDatetime: new Date(eventFromLocalStorage.endDatetime),
    }
}
function extract(event: ApiEvent): any {
    return {
        ...event,
        startDatetime: event.startDatetime.toISOString(),
        endDatetime: event.endDatetime.toISOString(),
    }
}

function getLocalStorageKey(day: Date) {
    const keyDate = new Date(day);
    keyDate.setHours(0,0,0,0);
    return 'events-'+keyDate.toISOString();
}

export async function fetchEvents(day: Date): Promise<ApiEvent[]> {
    const key = getLocalStorageKey(day);
    const json = window.localStorage.getItem(key) || '[]'; // default to nothing
    return JSON.parse(json).map(hydrate);
}

export async function createEvent(eventData: Omit<ApiEvent, 'id'>): Promise<ApiEvent> {
    const key = getLocalStorageKey(eventData.startDatetime);
    const events = await fetchEvents(eventData.startDatetime);
    const fakeEvent = {
        id: generateFakeId(),
        ...eventData
    };
    events.push(fakeEvent);
    const eventsForStorage = events.map(extract);
    window.localStorage.setItem(key, JSON.stringify(eventsForStorage));
    return fakeEvent;
}

export async function deleteEvent(event: ApiEvent): Promise<ApiEvent> {
    const key = getLocalStorageKey(event.startDatetime);
    const events = await fetchEvents(event.startDatetime);
    const eventIndex = events.findIndex(e => e.id === event.id);
    if (eventIndex === -1) {
        throw new Error('event could not be deleted');
    }
    const deletedEvent = events.splice(eventIndex, 1);
    window.localStorage.setItem(key, JSON.stringify(events.map(extract)));
    return deletedEvent[0];
}