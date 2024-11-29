import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'

interface PdfViewerState {
  file: string | null
  page: number
  numPages: number
}

const initialState: PdfViewerState = {
  file: null,
  page: 0,
  numPages: 0
}

const pdfViewerSlice = createSlice({
  name: 'pdfViewer',
  initialState,
  reducers: {
    setFile(state, action: PayloadAction<string | null>) {
      state.page = 1
      state.file = action.payload
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload
    },
    setNumPages(state, action: PayloadAction<number>) {
      state.numPages = action.payload
    },
    resetViewer(state) {
      state.file = null
      state.page = 1
    }
  }
})

export const { setFile, setPage, resetViewer, setNumPages } = pdfViewerSlice.actions

export const selectFile = (state: RootState) => state.pdfViewer.file
export const selectPage = (state: RootState) => state.pdfViewer.page
export const selectNumPages = (state: RootState) => state.pdfViewer.numPages

export default pdfViewerSlice.reducer
