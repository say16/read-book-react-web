import ThumbnailSection from './thumbnail-section'
import PageSection from './page-section'

function PDFViewer() {
  return (
    <div className='flex size-full flex-1 flex-col items-center justify-center gap-4'>
      <PageSection />
      <ThumbnailSection />
    </div>
  )
}

export default PDFViewer
