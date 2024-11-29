import { configureStore } from '@reduxjs/toolkit'
import pdfViewerReducer from './slices/pdfViewerSlice'

const store = configureStore({
  reducer: {
    pdfViewer: pdfViewerReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
