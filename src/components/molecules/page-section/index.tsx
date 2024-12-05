import { Document, Page } from 'react-pdf'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectFileObjectUrl,
  selectPageNumber,
  selectSelectedFileMetadata,
  setNumPages,
  setSentences
} from '@/store/slices/pdfViewerSlice'
import { Card } from '@/components/ui/card'
import { IconFileTypePdf } from '@tabler/icons-react'
import { useTheme } from '@/utils/theme-provider'

function PageSection() {
  const { theme } = useTheme()
  const dispatch = useDispatch()
  const page = useSelector(selectPageNumber)
  const fileObjectUrl = useSelector(selectFileObjectUrl)
  const fileMetadata = useSelector(selectSelectedFileMetadata)

  const onDocumentLoadSuccess = ({ numPages }) => {
    dispatch(setNumPages(numPages))
  }

  const onPageLoadSuccess = async pdfPage => {
    const textContent = await pdfPage.getTextContent()
    const textItems = textContent.items
    const fullText = textItems.map(item => item.str).join(' ')
    const splitSentences = fullText.split(/(?<=[.!?])\s+/)
    dispatch(setSentences(splitSentences))
  }

  return (
    <>
      {fileObjectUrl && (
        <Card className='flex flex-1 flex-col gap-4'>
          <h2 className='inline-flex w-full items-center gap-1 border-b p-4 text-lg font-bold'>
            <IconFileTypePdf />
            <span>{fileMetadata?.name}</span>
          </h2>
          <div className='flex flex-1 items-center justify-center p-4'>
            <Document
              file={fileObjectUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={error => console.error('Error loading document:', error)}
            >
              <Page
                pageNumber={page}
                canvasBackground={theme === 'light' ? 'white' : '#060818'}
                onLoadSuccess={onPageLoadSuccess}
                height={600}
                customTextRenderer={({ str, itemIndex }) => {
                  return `<span id="${str}-${itemIndex}" class="!text-foreground !bg-background">${str}</span>`
                }}
              />
            </Document>
          </div>
        </Card>
      )}
      {!fileObjectUrl && (
        <Card className='mx-auto flex h-[46rem] w-[34rem] items-center justify-center'>
          <div className='flex flex-col items-center justify-center gap-2 text-xl text-muted-foreground'>
            <IconFileTypePdf className='size-8' />
            <p>No files selected yet...</p>
          </div>
        </Card>
      )}
    </>
  )
}

export default PageSection
