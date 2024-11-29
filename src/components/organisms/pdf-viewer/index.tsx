import PageSection from '@/components/atoms/molecules/page-section'
import ThumbnailSection from '@/components/atoms/molecules/thumbnail-section'

function PDFViewer() {
  return (
    <div className='flex size-full flex-1 flex-col items-center justify-center gap-4'>
      <PageSection />
      <ThumbnailSection />
    </div>
  )
}

export default PDFViewer
