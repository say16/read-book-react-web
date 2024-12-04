import PageSection from '@/components/atoms/molecules/page-section'
import DictionaryInfoSection from '@/components/atoms/molecules/dictionary-info-section'

function PDFViewer() {
  return (
    <div className='flex size-full flex-1 items-start justify-center gap-4'>
      <PageSection />
      <div className='flex-1'>
        <DictionaryInfoSection />
      </div>
    </div>
  )
}

export default PDFViewer
