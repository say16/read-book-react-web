import { useRef, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectFileObjectUrl, selectNumPages, setPageNumber } from '@/store/slices/pdfViewerSlice'
import { Document } from 'react-pdf'
import ThumbnailItem from '@/components/atoms/thumbnail-item'
import { VList } from 'virtua'

function ThumbnailSection() {
  const dispatch = useDispatch()
  const numPages = useSelector(selectNumPages)
  const fileObjectUrl = useSelector(selectFileObjectUrl)

  const containerRef = useRef(null)
  const [containerHeight, setContainerHeight] = useState(0)
  const listRef = useRef(null)

  const handleThumbnailClick = pageNumber => {
    dispatch(setPageNumber(pageNumber))
    if (listRef.current) {
      // listRef.current.scrollToIndex(pageNumber - 1)
    }
  }

  const updateHeight = () => {
    if (containerRef.current) {
      const { height } = containerRef.current.getBoundingClientRect()
      setContainerHeight(height)
    }
  }

  useEffect(() => {
    updateHeight()
    window.addEventListener('resize', updateHeight)
    return () => {
      window.removeEventListener('resize', updateHeight)
    }
  }, [])

  return (
    <div ref={containerRef} className='h-full'>
      {numPages > 0 && fileObjectUrl && (
        <Document file={fileObjectUrl} className='h-full'>
          <VList ref={listRef} style={{ height: containerHeight }} className='p-4'>
            {Array.from({ length: numPages }, (_, index) => (
              <ThumbnailItem key={index} pageNumber={index + 1} onClick={() => handleThumbnailClick(index + 1)} />
            ))}
          </VList>
        </Document>
      )}
    </div>
  )
}

export default ThumbnailSection
