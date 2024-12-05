import React, { memo } from 'react'
import { Page } from 'react-pdf'
import { cn } from '@/utils/shadcnUtils'

interface ThumbnailItemProps {
  pageNumber: number
  currentPageNumber: number
  onClick: () => void
  theme: 'light' | 'dark' | 'system'
}

const ThumbnailItem: React.FC<ThumbnailItemProps> = ({ currentPageNumber, pageNumber, onClick, theme }) => {
  const isSelected = currentPageNumber === pageNumber

  return (
    <div
      onMouseDown={onClick}
      className={cn('cursor-pointer select-none border border-gray-300 p-1 hover:border-primary', {
        'border-primary': isSelected
      })}
    >
      <Page
        pageNumber={pageNumber}
        canvasBackground={theme === 'light' ? 'white' : '#060818'}
        height={80}
        customTextRenderer={({ str, itemIndex }) => {
          return `<span id="${str}-${itemIndex}" class="!text-foreground !bg-background">${str}</span>`
        }}
        renderMode='canvas'
      />
    </div>
  )
}

export default memo(ThumbnailItem)
