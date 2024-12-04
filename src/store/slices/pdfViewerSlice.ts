import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'

interface PdfViewerState {
  selectedFileId: number | null
  page: number
  numPages: number
  fileObjectUrl: string | null
  selectedText: { id: string; text: string } | null
}

const initialState: PdfViewerState = {
  selectedFileId: null,
  page: 0,
  numPages: 0,
  fileObjectUrl: null,
  selectedText: null
}

const pdfViewerSlice = createSlice({
  name: 'pdfViewer',
  initialState,
  reducers: {
    setSelectedFileId(state, action: PayloadAction<number | null>) {
      state.selectedFileId = action.payload
      state.page = 1
      state.selectedText = null
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload
      state.selectedText = null
    },
    setNumPages(state, action: PayloadAction<number>) {
      state.numPages = action.payload
    },
    resetViewer(state) {
      state.selectedFileId = null
      state.page = 1
    },
    setFileObjectUrl(state, action: PayloadAction<string>) {
      state.fileObjectUrl = action.payload
    },
    setSelectedText(state, action: PayloadAction<{ id: string; text: string } | null>) {
      state.selectedText = action.payload
    }
  }
})

export const { setSelectedFileId, setPage, resetViewer, setNumPages, setFileObjectUrl, setSelectedText } =
  pdfViewerSlice.actions

export const selectSelectedFileId = (state: RootState) => state.pdfViewer.selectedFileId
export const selectPage = (state: RootState) => state.pdfViewer.page
export const selectNumPages = (state: RootState) => state.pdfViewer.numPages
export const selectFileObjectUrl = (state: RootState) => state.pdfViewer.fileObjectUrl
export const selectSelectedText = (state: RootState) => state.pdfViewer.selectedText

export default pdfViewerSlice.reducer
