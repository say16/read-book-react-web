import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'

interface ThemeSliceState {
  isHistoryDrawerOpen: boolean
}

const initialState: ThemeSliceState = {
  isHistoryDrawerOpen: false
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setIsHistoryDrawerOpen(state, action: PayloadAction<boolean>) {
      state.isHistoryDrawerOpen = action.payload
    }
  }
})

export const { setIsHistoryDrawerOpen } = themeSlice.actions

export const selectIsHistoryDrawerOpen = (state: RootState) => state.theme.isHistoryDrawerOpen

export default themeSlice.reducer
