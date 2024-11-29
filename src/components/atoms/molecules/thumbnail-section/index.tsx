import { useSelector, useDispatch } from 'react-redux'
import { selectFileObjectUrl, selectNumPages, setPage } from '@/store/slices/pdfViewerSlice'
import { Document } from 'react-pdf'
import ThumbnailItem from '@/components/atoms/thumbnail-item'
import { ScrollArea } from '@/components/ui/scroll-area'

function ThumbnailSection() {
  const dispatch = useDispatch()
  const numPages = useSelector(selectNumPages)
  const fileObjectUrl = useSelector(selectFileObjectUrl)

  const handleThumbnailClick = pageNumber => {
    dispatch(setPage(pageNumber))
  }

  console.log(fileObjectUrl, 'fileObjectUrl')

  return (
    numPages > 0 &&
    fileObjectUrl && (
      <ScrollArea>
        <Document file={fileObjectUrl} className='p-4'>
          <div className='grid grid-cols-2 gap-1'>
            {Array.from({ length: numPages }, (_, index) => (
              <ThumbnailItem key={index} pageNumber={index + 1} onClick={() => handleThumbnailClick(index + 1)} />
            ))}
          </div>
        </Document>
      </ScrollArea>
    )
  )
}

export default ThumbnailSection
