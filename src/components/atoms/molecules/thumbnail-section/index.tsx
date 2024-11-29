import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { useSelector, useDispatch } from 'react-redux'
import { selectFile, selectNumPages, setPage } from '@/store/slices/pdfViewerSlice'

import { Document } from 'react-pdf'
import ThumbnailItem from '@/components/atoms/thumbnail-item'
import { cn } from '@/utils/shadcnUtils'

type Props = {
  orientation: 'vertical' | 'horizontal'
}

function ThumbnailSection(props: Props) {
  const { orientation } = props

  const dispatch = useDispatch()
  const file = useSelector(selectFile)
  const numPages = useSelector(selectNumPages)

  const handleThumbnailClick = (pageNumber: number) => {
    dispatch(setPage(pageNumber))
  }

  return (
    numPages > 0 && (
      <div className='group relative h-full w-full'>
        <ScrollArea className='size-full'>
          <Document file={file} className='size-full p-4'>
            <div
              className={cn('flex items-center gap-1', {
                'flex-col': orientation === 'vertical'
              })}
            >
              {Array.from({ length: numPages }, (_, index) => (
                <ThumbnailItem key={index} pageNumber={index + 1} onClick={() => handleThumbnailClick(index + 1)} />
              ))}
            </div>
          </Document>
          <ScrollBar orientation={orientation} />
        </ScrollArea>
      </div>
    )
  )
}

export default ThumbnailSection
