import { configureStore } from '@reduxjs/toolkit'
import pdfViewerReducer from './slices/pdfViewerSlice'
import themeReducer from './slices/themeSlice'

const store = configureStore({
  reducer: {
    pdfViewer: pdfViewerReducer,
    theme: themeReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
