import PageSection from '@/components/molecules/page-section'
import DictionaryInfoSection from '@/components/molecules/dictionary-info-section'
import SentenceSection from '@/components/molecules/sentence-section'
import { useSelector } from 'react-redux'
import { selectFileObjectUrl } from '@/store/slices/pdfViewerSlice'

function PDFViewer() {
  const fileObjectUrl = useSelector(selectFileObjectUrl)

  return (
    <div className='flex h-full max-h-[46em] flex-1 gap-4'>
      <PageSection />
      {fileObjectUrl && (
        <>
          <SentenceSection />
          <DictionaryInfoSection />
        </>
      )}
    </div>
  )
}

export default PDFViewer
