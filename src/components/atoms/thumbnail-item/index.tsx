import React from 'react'
import { Page } from 'react-pdf'
import { cn } from '@/utils/shadcnUtils'
import { useSelector } from 'react-redux'
import { selectPage } from '@/store/slices/pdfViewerSlice'

interface ThumbnailItemProps {
  pageNumber: number
  onClick: () => void
}

const ThumbnailItem: React.FC<ThumbnailItemProps> = ({ pageNumber, onClick }) => {
  const page = useSelector(selectPage)
  const isSelected = page === pageNumber

  return (
    <div
      onMouseDown={onClick}
      className={cn('cursor-pointer select-none border border-gray-300 p-1 hover:border-primary', {
        'border-2 border-primary': isSelected
      })}
    >
      <Page pageNumber={pageNumber} height={80} />
    </div>
  )
}

export default ThumbnailItem
