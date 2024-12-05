import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'

interface PdfViewerState {
  selectedFileId: number | null
  pageNumber: number
  numPages: number
  fileObjectUrl: string | null
  selectedText: { id: string; text: string } | null
  sentences: string[]
}

const initialState: PdfViewerState = {
  selectedFileId: null,
  pageNumber: 0,
  numPages: 0,
  fileObjectUrl: null,
  selectedText: null,
  sentences: []
}

const pdfViewerSlice = createSlice({
  name: 'pdfViewer',
  initialState,
  reducers: {
    setSelectedFileId(state, action: PayloadAction<number | null>) {
      state.selectedFileId = action.payload
      state.pageNumber = 1
      state.selectedText = null
    },
    setPageNumber(state, action: PayloadAction<number>) {
      state.pageNumber = action.payload
      state.selectedText = null
    },
    setNumPages(state, action: PayloadAction<number>) {
      state.numPages = action.payload
    },
    resetViewer(state) {
      state.selectedFileId = null
      state.pageNumber = 1
      state.sentences = []
    },
    setFileObjectUrl(state, action: PayloadAction<string>) {
      state.fileObjectUrl = action.payload
    },
    setSelectedText(state, action: PayloadAction<{ id: string; text: string } | null>) {
      state.selectedText = action.payload
    },
    setSentences(state, action: PayloadAction<string[]>) {
      state.sentences = action.payload
    }
  }
})

export const {
  setSelectedFileId,
  setPageNumber,
  resetViewer,
  setNumPages,
  setFileObjectUrl,
  setSelectedText,
  setSentences
} = pdfViewerSlice.actions

export const selectSelectedFileId = (state: RootState) => state.pdfViewer.selectedFileId
export const selectPageNumber = (state: RootState) => state.pdfViewer.pageNumber
export const selectNumPages = (state: RootState) => state.pdfViewer.numPages
export const selectFileObjectUrl = (state: RootState) => state.pdfViewer.fileObjectUrl
export const selectSelectedText = (state: RootState) => state.pdfViewer.selectedText
export const selectSentences = (state: RootState) => state.pdfViewer.sentences

export default pdfViewerSlice.reducer
