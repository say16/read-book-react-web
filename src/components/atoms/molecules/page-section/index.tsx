import { Document, Page } from 'react-pdf'
import { useDispatch, useSelector } from 'react-redux'
import { selectFileObjectUrl, selectPage, setNumPages } from '@/store/slices/pdfViewerSlice'
import { Card } from '@/components/ui/card'
import { IconFileTypePdf } from '@tabler/icons-react'
import { customTextRenderer } from '@/utils/mark/customTextRenderer'
import useMarkClickListener from '@/utils/mark/useMarkClickListener'

function PageSection() {
  useMarkClickListener()
  const dispatch = useDispatch()
  const page = useSelector(selectPage)
  const fileObjectUrl = useSelector(selectFileObjectUrl)

  const onDocumentLoadSuccess = ({ numPages }) => {
    dispatch(setNumPages(numPages))
  }

  return (
    <Card className='flex size-fit min-h-[20rem] min-w-[20rem] items-center justify-center p-2'>
      {fileObjectUrl ? (
        <Document file={fileObjectUrl} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={page} customTextRenderer={customTextRenderer} />
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
