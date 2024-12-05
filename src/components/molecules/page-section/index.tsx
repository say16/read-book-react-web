import { Document, Page } from 'react-pdf'
import { useDispatch, useSelector } from 'react-redux'
import { selectFileObjectUrl, selectPageNumber, setNumPages, setSentences } from '@/store/slices/pdfViewerSlice'
import { Card } from '@/components/ui/card'
import { IconFileTypePdf } from '@tabler/icons-react'
import useMarkClick from '@/utils/mark/useMarkClick'
import { useTheme } from '@/utils/theme-provider'

function PageSection() {
  const dispatch = useDispatch()
  const { customTextRenderer } = useMarkClick()
  const { theme } = useTheme()
  const page = useSelector(selectPageNumber)
  const fileObjectUrl = useSelector(selectFileObjectUrl)

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
    <Card className='flex size-fit min-h-[52rem] min-w-[40rem] items-center justify-center p-2'>
      {fileObjectUrl ? (
        <Document
          file={fileObjectUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={error => console.error('Error loading document:', error)}
        >
          <Page
            pageNumber={page}
            customTextRenderer={customTextRenderer}
            canvasBackground={theme === 'light' ? 'white' : '#060818'}
            onLoadSuccess={onPageLoadSuccess}
          />
        </Document>
      ) : (
        <div className='flex flex-col items-center justify-center gap-2 text-xl text-muted-foreground'>
          <IconFileTypePdf className='size-12' />
          <p>No files uploaded yet...</p>
        </div>
      )}
    </Card>
  )
}

export default PageSection
