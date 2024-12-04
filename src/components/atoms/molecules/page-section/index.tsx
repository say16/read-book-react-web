import { useEffect } from 'react'
import { Document, Page } from 'react-pdf'
import { useDispatch, useSelector } from 'react-redux'
import { selectFileObjectUrl, selectPage, setNumPages, setSelectedText } from '@/store/slices/pdfViewerSlice'
import { Card } from '@/components/ui/card'
import { IconFileTypePdf } from '@tabler/icons-react'

function PageSection() {
  const dispatch = useDispatch()
  const page = useSelector(selectPage)
  const fileObjectUrl = useSelector(selectFileObjectUrl)

  const onDocumentLoadSuccess = ({ numPages }) => {
    dispatch(setNumPages(numPages))
  }

  const handleWordClick = data => {
    const cleanedText = data.text.replace(/[^\w\s]|_/g, '').trim()
    dispatch(setSelectedText({ ...data, text: cleanedText }))

    const previousSelected = document.querySelector('.bg-primary.text-primary-foreground')
    if (previousSelected) {
      previousSelected.classList.remove('bg-primary', 'text-primary-foreground')
    }

    const currentSelected = document.getElementById(data.id)
    if (currentSelected) {
      currentSelected.classList.remove('bg-backgorund', 'text-foreground')
      currentSelected.classList.add('bg-primary', 'text-primary-foreground')
    }
  }

  useEffect(() => {
    const container = document.getElementById('page-section-document-container')
    if (container) {
      container.addEventListener('click', event => {
        const target = event.target
        if (target.tagName === 'MARK') {
          const word = target.textContent
          handleWordClick({
            id: target.id,
            text: word
          })
        }
      })
    }

    return () => {
      if (container) {
        container.removeEventListener('click', () => {})
      }
    }
  }, [])

  return (
    <Card className='flex size-fit min-h-[20rem] min-w-[20rem] items-center justify-center p-2'>
      {fileObjectUrl ? (
        <div id='page-section-document-container' className='flex divide-x-2'>
          <Document file={fileObjectUrl} onLoadSuccess={onDocumentLoadSuccess}>
            <Page
              pageNumber={page}
              customTextRenderer={({ str, itemIndex }) => {
                return str
                  .split(' ')
                  .map(
                    (word, index) =>
                      `<mark id="word-${itemIndex}-${index}" class="text-foreground bg-background cursor-pointer hover:bg-primary hover:text-primary-foreground">${word}</mark>`
                  )
                  .join(' ')
              }}
            />
          </Document>
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
