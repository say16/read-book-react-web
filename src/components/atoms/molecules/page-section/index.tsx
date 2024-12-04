import { useState } from 'react'
import { Document, Page } from 'react-pdf'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectFileObjectUrl,
  selectPage,
  selectSelectedText,
  setNumPages,
  setSelectedText
} from '@/store/slices/pdfViewerSlice'
import { Card } from '@/components/ui/card'
import { IconFileTypePdf } from '@tabler/icons-react'
import { cn } from '@/utils/shadcnUtils'

function PageSection() {
  const dispatch = useDispatch()
  const selectedText = useSelector(selectSelectedText)
  const page = useSelector(selectPage)
  const fileObjectUrl = useSelector(selectFileObjectUrl)
  const [pdfRows, setPdfRows] = useState([])

  const onDocumentLoadSuccess = ({ numPages }) => {
    dispatch(setNumPages(numPages))
  }

  const onPageLoadSuccess = async pdfPage => {
    const textContent = await pdfPage.getTextContent()
    const textItems = textContent.items
    setPdfRows(textItems)
  }

  const handleWordClick = data => {
    const cleanedText = data.text.replace(/[^\w\s]|_/g, '').trim()
    dispatch(setSelectedText({ ...data, text: cleanedText }))
  }

  return (
    <Card className='flex size-fit min-h-[20rem] min-w-[20rem] items-center justify-center p-2'>
      {fileObjectUrl ? (
        <div id='page-section-document-container' className='flex divide-x-2'>
          <Document file={fileObjectUrl} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={page} onLoadSuccess={onPageLoadSuccess} width={500} />
          </Document>
          <div className='flex-1 p-4'>
            <div className='flex flex-col text-sm'>
              {pdfRows.map((rowItem, rowIndex) => {
                const rowWords = rowItem?.str.split(' ')
                return (
                  <div key={`row-${rowIndex}`}>
                    {rowWords.map((word, wordIndex) => (
                      <span
                        id={`word-${rowIndex}-${wordIndex}`}
                        key={`word-${rowIndex}-${wordIndex}`}
                        className={cn('cursor-pointer hover:underline', {
                          'bg-primary text-primary-foreground': selectedText?.id === `word-${rowIndex}-${wordIndex}`,
                          'hover:text-primary': selectedText?.id !== `word-${rowIndex}-${wordIndex}`
                        })}
                        onClick={() =>
                          handleWordClick({
                            id: `word-${rowIndex}-${wordIndex}`,
                            text: word
                          })
                        }
                      >
                        {word}{' '}
                      </span>
                    ))}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
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
