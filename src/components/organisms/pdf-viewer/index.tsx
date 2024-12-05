import PageSection from '@/components/molecules/page-section'
import DictionaryInfoSection from '@/components/molecules/dictionary-info-section'
import SentenceSection from '@/components/molecules/sentence-section'
import { useSelector } from 'react-redux'
import { selectFileObjectUrl } from '@/store/slices/pdfViewerSlice'

function PDFViewer() {
  const fileObjectUrl = useSelector(selectFileObjectUrl)

  return (
    <div className='flex size-full flex-1 items-start justify-center gap-4'>
      <PageSection />
      {fileObjectUrl && (
        <div className='flex h-[52rem] flex-1 gap-4'>
          <SentenceSection />
          <DictionaryInfoSection />
        </div>
      )}
    </div>
  )
}

export default PDFViewer
