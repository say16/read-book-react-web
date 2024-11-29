import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { useSelector, useDispatch } from 'react-redux'
import { selectFile, selectNumPages, setPage } from '@/store/slices/pdfViewerSlice'

import { Document } from 'react-pdf'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import ThumbnailItem from '@/components/atoms/thumbnail-item'

function ThumbnailSection() {
  const dispatch = useDispatch()
  const file = useSelector(selectFile)
  const numPages = useSelector(selectNumPages)

  const handleThumbnailClick = (pageNumber: number) => {
    dispatch(setPage(pageNumber))
  }

  return (
    numPages > 0 && (
      <div className='group relative w-full'>
        <div className='absolute hidden size-full items-center justify-between group-hover:flex'>
          <div className='z-10 flex h-full w-8 cursor-pointer items-center justify-center bg-muted/75'>
            <IconChevronLeft />
          </div>
          <div className='z-10 flex h-full w-8 cursor-pointer items-center justify-center bg-muted/75'>
            <IconChevronRight />
          </div>
        </div>

        <ScrollArea className='w-full'>
          <Document file={file} className='w-full'>
            <div className='flex items-center gap-1'>
              {Array.from({ length: numPages }, (_, index) => (
                <ThumbnailItem key={index} pageNumber={index + 1} onClick={() => handleThumbnailClick(index + 1)} />
              ))}
            </div>
          </Document>
          <ScrollBar orientation='horizontal' />
        </ScrollArea>
      </div>
    )
  )
}

export default ThumbnailSection
