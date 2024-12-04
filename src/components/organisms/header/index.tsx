import FileUploadSection from '@/components/atoms/molecules/file-upload-section'
import PageNumberSection from '@/components/atoms/molecules/page-number-section'
import { Card } from '@/components/ui/card'
import UploadedFilesButtonSection from './uploaded-files-button-section'

function Header() {
  return (
    <header className='sticky top-4 z-30'>
      <Card className='p-4'>
        <div className='flex items-end justify-between gap-4'>
          <PageNumberSection />
          <div className='flex items-center justify-end gap-4'>
            <UploadedFilesButtonSection />
            <FileUploadSection />
          </div>
        </div>
      </Card>
    </header>
  )
}

export default Header
