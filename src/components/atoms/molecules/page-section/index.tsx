import { Card } from '@/components/ui/card'
import { Document, Page } from 'react-pdf'
import { useDispatch, useSelector } from 'react-redux'
import { selectFile, selectPage, setNumPages } from '@/store/slices/pdfViewerSlice'
import { IconFileTypePdf } from '@tabler/icons-react'

function PageSection() {
  const dispatch = useDispatch()
  const file = useSelector(selectFile)
  const page = useSelector(selectPage)

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    dispatch(setNumPages(numPages))
  }

  return (
    <Card className='flex h-full min-h-[40rem] min-w-[30rem] items-center justify-center p-1'>
      {file ? (
        <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={page} />
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
