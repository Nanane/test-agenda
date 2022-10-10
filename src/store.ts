import { configureStore } from '@reduxjs/toolkit'
import eventsReducer from './slices/events'
import appReducer from './slices/app';

export const store = configureStore({
  reducer: {
      app: appReducer,
      events: eventsReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
