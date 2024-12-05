import { Document, Page } from 'react-pdf'
import { useDispatch, useSelector } from 'react-redux'
import { selectFileObjectUrl, selectPage, setNumPages } from '@/store/slices/pdfViewerSlice'
import { Card } from '@/components/ui/card'
import { IconFileTypePdf } from '@tabler/icons-react'
import useMarkClick from '@/utils/mark/useMarkClick'
import { useTheme } from '@/utils/theme-provider'

function PageSection() {
  const dispatch = useDispatch()
  const { customTextRenderer } = useMarkClick()
  const { theme } = useTheme()
  const page = useSelector(selectPage)
  const fileObjectUrl = useSelector(selectFileObjectUrl)

  const onDocumentLoadSuccess = ({ numPages }) => {
    dispatch(setNumPages(numPages))
  }

  return (
    <Card className='flex size-fit min-h-[50rem] min-w-[40rem] items-center justify-center p-2'>
      {fileObjectUrl ? (
        <Document file={fileObjectUrl} onLoadSuccess={onDocumentLoadSuccess}>
          <Page
            pageNumber={page}
            customTextRenderer={customTextRenderer}
            canvasBackground={theme === 'light' ? 'white' : '#060818'}
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
