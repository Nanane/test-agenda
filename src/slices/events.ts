import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ApiEvent } from '../api/types'
import { fetchEvents } from '../api/event'
import { RootState } from '../store'
import { isSameDay } from 'date-fns'

export const fetchEventsThunk = createAsyncThunk('events/fetch', async (currentDate: Date) => {
    return await fetchEvents(currentDate);
  })

export interface EventsState {
  events: ApiEvent[];
}

const initialState: EventsState = {
  events: []
}

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<ApiEvent>) => {
        state.events.push(action.payload)
    },
    deleteEvent: (state, action: PayloadAction<ApiEvent>) => {
        const eventIndex = state.events.findIndex(e => e.id === action.payload.id);
        state.events.splice(eventIndex, 1);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEventsThunk.fulfilled, (state, action) => {
      const fetchedEventsIds = action.payload.map(e => e.id); // list fetched events IDs 
      state.events = state.events.filter(e => !fetchedEventsIds.includes(e.id)).concat(action.payload); // filter out events with same ID and replace them with fetched events
    })
  },
})

export const selectEventsForDay = (date: Date) => (state: RootState) => {
  return state.events.events.filter(e => isSameDay(e.startDatetime, date));
}

// Action creators are generated for each case reducer function
export const { addEvent, deleteEvent } = eventsSlice.actions

export default eventsSlice.reducer