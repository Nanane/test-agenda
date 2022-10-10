import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ApiEvent } from '../api/types'


export interface AppState {
  currentDate: Date;
}

const initialState: AppState = {
    currentDate: new Date(),
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
      setCurrentDate: (state, action: PayloadAction<Date>) => {
        state.currentDate = action.payload;
      }
  },
})

// Action creators are generated for each case reducer function
export const { setCurrentDate } = appSlice.actions

export default appSlice.reducer